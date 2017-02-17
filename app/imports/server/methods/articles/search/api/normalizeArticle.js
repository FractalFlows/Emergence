import striptags from 'striptags'
import { escape, map } from 'lodash/fp'

const normalizers = {
  CrossRef(article, source){
    return {
      title: article['title'][0] || article['container-title'][0] || article['original-title'][0],
      abstract: normalizeAbstract(article.abstract),
      authors: normalizeAuthors(article.author),
      DOI: article.DOI,
      source,
    }
  },

  DataCite({ attributes: article }, source){
    return {
      title: article.title,
      abstract: normalizeAbstract(article.description),
      authors: normalizeAuthors(article.author),
      DOI: article.doi,
      source,
    }
  },
}

function normalizeAuthors(authors){
  return map(author => author.literal || `${author.given} ${author.family}`, authors)
}

function normalizeAbstract(abstract){
  return striptags(escape(abstract))
}

export default function normalizeArticle({ source, article }){
  return normalizers[source](article, source)
}
