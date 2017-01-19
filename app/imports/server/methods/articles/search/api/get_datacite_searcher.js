import normalizeArticle from './normalizeArticle'

export default function getDataCiteSearcher(){
  return {
    url: 'https://api.datacite.org/works?rows=10&include=description&query',
    queryHandler: ({ search, url }) => `${url}=${search.replace(/\s+/, '+').toLowerCase()}`,
    responseHandler(data){
      return data.data.map(article => normalizeArticle({
        article,
        source: 'DataCite',
      }))
    },
  }
}