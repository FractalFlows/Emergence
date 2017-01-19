import normalizeArticle from './normalizeArticle'

export default function getCrossRefWorkSearcherForParam({ param }){
  return {
    url: `https://api.crossref.org/works?${param}`,
    queryHandler: ({ search, url }) => `${url}=${search.replace(/\s+/, '+').toLowerCase()}&rows=10&filter=has-abstract:true`,
    responseHandler(data){
      if(data.status === 'failed'){
        console.log(data)
        return []
      }

      return data.message.items.map(article => normalizeArticle({
        article,
        source: 'CrossRef',
      }))
    },
  }
}
