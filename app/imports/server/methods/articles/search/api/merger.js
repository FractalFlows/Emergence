import {
  groupBy,
  flow,
  mapValues,
  flatten,
  values,
  omitBy,
  isUndefined,
  isNull,
  uniqBy
} from 'lodash/fp'

const isNothing = v => isUndefined(v) || isNull(v)
export default function merger(results){
  return flow(
    flatten,
    groupBy('DOI'),
    mapValues(sameDOIArticles => {
      const cleanedUpArticles = sameDOIArticles.map(omitBy(isNothing))
      return Object.assign(...cleanedUpArticles)
    }),
    values,
    uniqBy('DOI')
  )(results)
}
