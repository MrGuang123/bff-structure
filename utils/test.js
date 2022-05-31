(function () {
  var root = (typeof self === 'object' && self.self === self && self) ||
    (typeof global === 'object' && global.global === global && global) || this || {}

  var _ = function (obj) {
    // 如果传入的是库的实例 直接返回
    if (obj instanceof _) return obj;
    // 如果不是实例  new一个实例返回
    if (!(this instanceof _)) return new _(obj);

    // 如果都不是，将数据记录在this._wrapped， 后续会当做参数被用来执行任意方法
    this._wrapped = obj;
  }

  _.each = function (array, fn) {
    for (let i = 0, l = array.length; i < l; i++) {
      fn(array[i], i)
    }

    return array
  }

  _.throttle = function (callback, delay) {
    let isFirst = true
    let preDate = +new Date()
    let throttleId = null

    return function () {
      if (isFirst) {
        callback()
        preDate = +new Date()
        isFirst = false
      } else {
        const currentDate = +new Date()

        if (currentDate - preDate >= delay) {
          callback()
          preDate = +new Date()
        } else {
          if (throttleId) {
            clearTimeout(throttleId)
          }

          const waitTime = preDate + delay - (+new Date())

          throttleId = setTimeout(() => {
            callback()
            preDate = +new Date()
          }, waitTime);
        }
      }
    }
  }

  // 判断是否是函数
  _.isFunction = function (obj) {
    return typeof obj === 'function' || false
  }

  // obj就是库_本身，
  _.functions = function (obj) {
    var names = []

    for (var key in obj) {
      if (_.isFunction(obj[key])) {
        names.push(key)
      }
    }

    return names.sort()
  }

  _.mixin = function (obj) {
    _.each(_.functions(obj), function (name) {
      var func = (_[name] = obj[name])
      _.prototype[name] = function () {
        var args = [this._wrapped]
        Array.prototype.push.apply(args, arguments)
        return func.apply(_, args)
      }
    })

    return _
  }

  _.mixin(_)

  root._ = _
})()