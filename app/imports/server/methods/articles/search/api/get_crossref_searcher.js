export default function getCrossRefWorkSearcherForParam({ param }){
  return {
    url: `https://api.crossref.org/works?${param}`,
    queryHandler: ({ search, url }) => `${url}=${search.replace(/\s+/, '+').toLowerCase()}&rows=10&filter=has-abstract:true`,
    responseHandler(data){
      if(data.status === 'failed'){
        console.log(data)
        return []
      }

      return data.message.items.map(article => ({
        DOI: article.DOI,
        title: article['title'][0] ||article['container-title'][0] || article['original-title'][0],
        type: article.type,
        createdAt: article.created.timestamp,
        abstract: article.abstract,
        url: article.URL,
        authors: (article.author || []).map(author => author.literal || `${author.given} ${author.family}`),
      }))
    },
  }
}
