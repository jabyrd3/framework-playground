import _ from 'lodash'
// todo: figure out singleton / instantion so we can have local state
// todo: pick sane names for api service
// todo: add proxy logic
// todo: figure out how to get apiservice loaded in via webpack properly
// todo: custom header support
// todo: fetch, fallback to xhr instead of always relying on xhr

/* globals XMLHttpRequest, Promise */
// apiUrl
// endpoints
// legacy
// use fetch/xhr
let options = {}
export const config = function (configVals) {
  if (options.set) {
    return console.warn('only set the config options once, during the startup phase of your app!')
  }
  // handles all http reqs
  options = configVals
  options.set = true
}
class ApiRequest {
  constructor () {
    if (!options.set) {
      return console.warn('you need to set call api.config first!')
    }
    this.map = {}
    this.bodyObj = {}
    if (options.legacy) {
      utils.iterLegacy(this)
    }
  }
  post (passObj) {
    if (passObj) {
      this.bodyObj = passObj
    }
    return utils.genericHttp('POST', null, this)
  }
  get (querystring) {
    if (typeof querystring === 'string') {
      return utils.genericHttp('GET', querystring, this)
    } else if (querystring) {
      return utils.genericHttp('GET', utils.queryStringBuilder(
        querystring), this)
    }
    return utils.genericHttp('GET', false, this)
  }
  delete (passObj) {
    if (passObj) {
      this.bodyObj = passObj
    }
    return utils.genericHttp('DELETE', false, this)
  }
  put (passObj) {
    if (passObj) {
      this.bodyObj = passObj
    }
    return utils.genericHttp('PUT', false, this)
  }
  patch (passObj) {
    if (passObj) {
      this.bodyObj = passObj
    }
    return utils.genericHttp('PATCH', false, this)
  }
}

export let apiService = function () { return new ApiRequest() }

const utils = {
  iterLegacy: (request) => {
    _.each(options.endpoints, function (endpoint) {
      request[endpoint] = function (inp) {
        // inp needs to be an int or a string,
        // advance datatypes will just make a broken url
        // there should be some validation eventually.
        if (inp) {
          request.map[endpoint] = inp
        } else {
          request.map[endpoint] = false
        }
        return request
      }
    })
  },
  // concatenates obj into proper url, adds querystring if present
  concatenator: (map, query) => {
    let concat = ''
    if (Object.keys(map)
      .length > 0) {
      _.each(map, function (val, key) {
        if (val) {
          concat += '/' + key + '/' + val
        } else {
          concat += '/' + key
        }
      })
    }
    if (query) {
      concat += query
    }
    return concat
  },
  reset: (context) => {
    context.bodyObj = {}
    context.map = {}
  },
  queryStringBuilder: function (obj) {
    let retString = '?'
    let strings = []
    _.each(obj, function (value, key) {
      strings.push(key + '=' + value)
    })
    retString += strings.join('&')
    return retString
  },
  genericHttp: function (method, data, request) {
    // clone vars to scope and reset so that we don't get collisions
    let local = {
      bodyObj: _.clone(request.bodyObj),
      map: _.clone(request.map)
    }
    // clear service for subsequent reqs
    utils.reset(request)
    let deferred = new Promise(function (resolve, reject) {
      let xhr = new XMLHttpRequest()
      xhr.open(method, options.apiUrl + utils.concatenator(local.map, data),
          true)
      if (typeof data === 'string') {
        // has querystring
        xhr.send(null)
      } else {
        // has data body
        xhr.setRequestHeader('Content-Type', 'application/jsoncharset=UTF-8')
        xhr.send(JSON.stringify(data))
      }
      xhr.onreadystatechange = function () {
        if (xhr.readyState === 4 && xhr.status === 200) {
          resolve(JSON.parse(xhr.response))
        } else if (xhr.readyState === 4 && (xhr.status === 500 || xhr
            .status === 404)) {
          reject(xhr.status)
        }
      }
    })
    return deferred
  }
}
