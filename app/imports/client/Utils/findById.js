// @flow
import {
  find,
} from 'lodash/fp'

export default function findById(id:number|string, collection:Array<*>):any {
  return find(doc => doc.id === id, collection)
}
