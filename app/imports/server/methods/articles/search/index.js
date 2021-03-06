import { Meteor } from 'meteor/meteor'
import { SimpleSchema } from 'meteor/aldeed:simple-schema'
import { escape } from 'lodash/fp'
import ArticleSearcher from './api'
import Future from 'fibers/future'
import Articles, {
  ELASTIC_SEARCH_INDEX as ARTICLES_INDEX,
  ELASTIC_SEARCH_TYPE as ARTICLES_INDEX_TYPE,
} from '/imports/both/collections/articles'
import Searches from '/imports/both/collections/searches'
import indexArticleToElastic from '/imports/server/helpers/articles/indexToElastic'
import elasticSearch from '/imports/server/helpers/elasticSearch'
import moment from 'moment'

Meteor.methods({
  'article/search'(params){
    this.unblock()
    const future = new Future()

    new SimpleSchema({
      searchText: {
        type: String,
      },
    }).validate(params)

    const useLastSearch = Searches.find({
      text: params.searchText,
      nextUpdate: {
        $gt: new Date(),
      },
    }).count()

    if(useLastSearch){
      Searches.update({
        text: params.searchText,
      }, {
        $set: {
          lastSearchedAt: new Date(),
        },
      })

      // TODO: Find out why elasticArticleSearcher doesn't work but this inline version does
      elasticSearch.search({
        index: ARTICLES_INDEX,
        type: ARTICLES_INDEX_TYPE,
        size: 30,
        body: {
          query: {
            multi_match: {
              query: params.searchText,
              fields: ['title^3', 'abstract^2', 'DOI', 'authors'],
            },
          },
        },
      }).then(response => {
        const articles = response.hits.hits.map(({ _source: article }) => ({
          ...article,
          source: 'ElasticSearch'
        }))
        future.return(articles)
      })
    } else {
      Searches.upsert({
        text: params.searchText,
      }, {
        $setOnInsert: {
          text: params.searchText,
        },
        $set: {
          lastSearchedAt: new Date(),
          nextUpdate: moment().add(2, 'days').toDate(),
        },
      })

      ArticleSearcher
        .search(params.searchText)
        .then(results => {
          results.forEach(indexArticleToElastic)
          future.return(results)
        })
        .catch(error => {
          console.log(error.stack)
          future.throw(new Meteor.Error(500, error.message))
        })
    }
    return future.wait()
  },

  'articles/searchForRelateds'(params){
    this.unblock()

    const article = Articles.findOne({
      slug: params.articleSlug,
    }, {
      fields: {
        DOI: 1,
        relatedArticles: 1,
      },
    })

    const normalSearchResults = Meteor.call('article/search', {
      searchText: params.searchText,
    })

    const excludedDOIs = [article.DOI, ...(article.relatedArticles || [])]

    return normalSearchResults.filter(({ DOI }) => !excludedDOIs.includes(DOI))
  },
})
