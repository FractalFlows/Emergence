/*
 * Built by Astrocoders
 * @flow
 */

import user from './Pages/User/logic'
import articles from './Pages/Article/logic'
import search from './Pages/Search/logic'

const logics = [
  ...search,
  ...articles,
]

export default logics
