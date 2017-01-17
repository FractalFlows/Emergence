export default function getDataCiteSearcher(){
  return {
    url: 'https://api.datacite.org/works?rows=10&include=description&query',
    queryHandler: ({ search, url }) => `${url}=${search.replace(/\s+/, '+').toLowerCase()}`,
    responseHandler(data){
      return data.data.map(article => ({
        DOI: article.attributes.doi,
        title: article.attributes.title,
        authors: article.attributes.author.map(author => author.literal || `${author.given} ${author.family}`),
        abstract: article.attributes.description || '',
        createdAt: article.attributes.deposited,
        url: article.url || article.id,
      }))
    },
  }
}
