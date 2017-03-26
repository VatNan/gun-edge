export function timed(node, opts = {}) {
  if (typeof opts === 'function') {
    opts = {
      cb: opts
    }
  }

  let {
    cb,
    nextObj,
    nextOpts,
    stopCondition,
    operation,
    logging,
    interval = 100,
    num = 0,
    maxNum = 10
  } = opts

  if (logging) console.log('timed', num)

  let defaultStop = ({
    num
  }, opts) => {
    return num > maxNum
  }
  let defaultNextObj = (num, opts) => {
    return {
      num: num + 1
    }
  }

  let defaultNextOpts = (opts, num) => {
    return Object.assign(opts, {
      num
    })
  }

  let defaultOp = (node, obj, opts) => {
    node.put(obj)
  }

  nextObj = nextObj || defaultNextObj
  nextOpts = nextOpts || defaultNextOpts
  stopCondition = stopCondition || defaultStop
  operation = operation || defaultOp

  setTimeout(() => {
    let obj = Object.assign(nextObj(num, opts))
    operation(node, obj, opts)
    if (stopCondition(obj, opts)) {
      if (cb) {
        cb(num)
      } else {
        console.error('timed: Missing cb to stop', opts)
        // process.exit(1)
      }
    }

    timed(node, nextOpts(opts, obj.num))
  }, interval)
}

export function addTimed({
  chain
}) {
  chain.timed = function (opts) {
    return timed(this, opts)
  }
  return chain
}