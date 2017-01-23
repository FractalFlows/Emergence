import striptags from 'striptags'

const normalizers = {
  CrossRef(article, source){
    return {
      title: article['title'][0] ||article['container-title'][0] || article['original-title'][0],
      abstract: striptags(article.abstract),
      authors: article.author.map(author => author.literal || `${author.given} ${author.family}`),
      DOI: article.DOI,
      source,
    }
  },

  DataCite({ attributes: article }, source){
    return {
      title: article.title,
      abstract: striptags(article.description),
      authors: article.author.map(author => author.literal || `${author.given} ${author.family}`),
      DOI: article.doi,
      source,
    }
  },
}

export default function normalizeArticle({ source, article }){
  return normalizers[source](article, source)
}
