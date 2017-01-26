export default function(host, article){
  browser.url(`${host}/article/${article.slug}`)
}
