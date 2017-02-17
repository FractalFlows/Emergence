import normalizeArticle from './normalizeArticle'
import { deburr } from 'lodash'

export default function getDataCiteSearcher(){
  return {
    url: 'https://api.datacite.org/works?rows=10&include=description&query',
    queryHandler: ({ search, url }) => `${url}=${normalizeQuery(search)}`,
    responseHandler(data){
      if(!data.data){
        console.log('Error while fetching query from DataCite', data)
        return []
      }

      return data.data.map(article => normalizeArticle({
        article,
        source: 'DataCite',
      }))
    },
  }
}

function normalizeQuery(query){
  return escape(deburr(query.replace(/\s+/, '+').toLowerCase()))
}
