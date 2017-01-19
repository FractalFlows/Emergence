import striptags from 'striptags'

export default function normalizeArticle({ source, article }){
  const normalizers = {
    CrossRef(article){
      return {
        title: article['title'][0] ||article['container-title'][0] || article['original-title'][0],
        abstract: striptags(article.abstract),
        authors: article.author.map(author => author.literal || `${author.given} ${author.family}`),
        DOI: article.DOI,
      }
    },

    DataCite({ attributes: article }){
      return {
        title: article.title,
        abstract: striptags(article.description),
        authors: article.author.map(author => author.literal || `${author.given} ${author.family}`),
        DOI: article.doi,
      }
    },
  }

  return normalizers[source](article)
}
