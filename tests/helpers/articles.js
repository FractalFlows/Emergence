export default function Articles(method, ...args){
  return server.execute((method, args) => {
    const ArticlesCol = require('/imports/both/collections/articles').default

    return ArticlesCol[method].apply(ArticlesCol, args)
  }, method, args)
}
