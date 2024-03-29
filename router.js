import { renderDOM } from './utils/processRenderTasks.js'
import {
  ROUTE_PARAMETER_REGEXP,
  URL_FRAGMENT_REGEXP,
} from './utils/constant.js'

const isHashFalsy = (hash) => {
  const cleanedHash = hash.replace(/^#\/?/, '')
  return cleanedHash === 'undefined' || cleanedHash.trim() === ''
}

const extractUrlParams = (route, windowHash) => {
  const params = {}

  if (route.params.length === 0) {
    return params
  }

  const matches = windowHash.match(route.testRegExp)

  matches.shift()

  matches.forEach((paramValue, index) => {
    const paramName = route.params[index]
    params[paramName] = paramValue
  })

  return params
}

const notFoundRouteHandler = (notFound) => {
  if (isHashFalsy(window.location.hash)) {
    window.location.hash = '#/posts'
    return
  }
  notFound()
}

export default () => {
  const routes = []
  let notFound = () => {}
  let prevHash = null
  const router = {}

  const checkRoutes = (dispatch, redirect) => {
    const { hash } = window.location
    if (prevHash === hash) {
      return
    }

    prevHash = hash

    const root = document.getElementById('root')
    const currentRoute = routes.find((route) => {
      const { testRegExp } = route
      return testRegExp.test(hash)
    })

    if (!currentRoute) {
      notFoundRouteHandler(notFound)
      return
    }

    const urlParams = extractUrlParams(currentRoute, window.location.hash)

    currentRoute.component(root, urlParams)

    renderDOM(root, dispatch, redirect)
  }

  // fragment에서 매개변수 이름 추출
  router.addRoute = (fragment, component) => {
    const params = []

    const parsedFragment = fragment
      .replace(ROUTE_PARAMETER_REGEXP, (match, paramName) => {
        params.push(paramName)
        return URL_FRAGMENT_REGEXP
      })
      .replace(/\//g, '\\/')

    routes.push({
      testRegExp: new RegExp(`^${parsedFragment}$`),
      component,
      params,
    })

    return router
  }

  router.setNotFound = (callback) => {
    notFound = callback
    return router
  }

  router.navigate = (fragment) => {
    window.location.hash = fragment
  }

  router.start = (dispatch, redirect) => {
    window.addEventListener('hashchange', () => {
      console.log('hash changed !')
      checkRoutes(dispatch, redirect)
    })

    if (isHashFalsy(window.location.hash)) {
      window.location.hash = '#/posts'
    }

    checkRoutes(dispatch, redirect)
  }

  return router
}
