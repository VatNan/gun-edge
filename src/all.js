import {
  $addAll
}
from './async'

import {
  addCopy
} from './copy'
import {
  addDate
} from './date'
import {
  addEach
} from './each'
// import { addEdge } from './edge'

import {
  addFields
} from './fields'
import {
  addFilter
} from './filter'
import {
  addInspect
} from './inspect'
import {
  addLive
} from './live'
import {
  addLocal
} from './local'
import {
  addMapReduce
} from './map-reduce'
import {
  addNo
} from './no'
// import {
//   addOut
// } from './out'
import {
  addRecurse
} from './recurse'
import {
  addValue
} from './value'

const chains = {
  $addAll,
  addCopy,
  addCreate,
  addEach,
  addFields,
  addInspect,
  addLive,
  addLocal,
  addMapReduce,
  addNo,
  addRecurse,
  addValue
}

function capitalize(str) {
  return str.charAt(0).toUpperCase() + str.slice(1);
}

export function add(Gun, ...names) {
  names.forEach(name => {
    let nameCap = capitalize(name)
    chains['add' + nameCap](Gun.chain, Gun)
  })
  return Gun
}

const allNames = [
  'async',
  'copy',
  'date',
  'each',
  'fields',
  'filter',
  'inspect',
  'live',
  'local',
  'mapReduce',
  'no',
  // 'out',
  'recurse',
  'value'
]

export {
  addAsync,
  addCopy,
  addDate,
  addEach,
  addFields,
  addFilter,
  addInspect,
  addLive,
  addLocal,
  addMapReduce,
  addNo,
  addOut,
  addRecurse,
  addValue
}

export default function (Gun) {
  return add(Gun, ...allNames)
}