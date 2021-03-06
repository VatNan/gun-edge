import Gun from 'gun/gun'
import test from 'ava'

import {
  $zen
} from '../../src/observable/zen'

import edge from '../../src'
edge(Gun)

const gun = Gun();
const log = console.log

test('$zen', async t => {
  let cols = gun.get('colors')
  cols.put({
    violet: true,
    red: true,
    green: false
  })

  // https://github.com/zenparsing/zen-observable
  function doLive(node) {
    log(node)

    return new Promise(function (resolve, reject) {
      let obs = $zen(node, {
        log: true,
        op: 'live'
      })

      let subscription = obs
        .subscribe(x => {
          log('sub', x)
          resolve()
        })

      node.timed({
        maxNum: 2,
        logging: true,
        cb: resolve
      })
    })
  }

  await doLive(cols)
})