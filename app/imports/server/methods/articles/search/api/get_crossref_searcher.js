import normalizeArticle from './normalizeArticle'
import { deburr } from 'lodash'

export default function getCrossRefWorkSearcherForParam({ param }){
  return {
    url: `https://api.crossref.org/works?${param}`,
    queryHandler: ({ search, url }) => `${url}=${normalizeQuery(search)}&rows=10&filter=has-abstract:true`,
    responseHandler(data){
      if(!data.message || !data.message.items){
        return []
      }

      return data.message.items.map(article => normalizeArticle({
        article,
        source: 'CrossRef',
      }))
    },
  }
}

function normalizeQuery(query){
  return escape(deburr(query.replace(/\s+/, '+').toLowerCase()))
}
