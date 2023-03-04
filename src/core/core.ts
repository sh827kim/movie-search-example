//// Component
interface ComponentPayload {
  tagName?: string
  props?: {
    [key: string]: unknown
  }
  state?: {
    [key: string]: unknown
  }
}

interface Route {
  path: string
  component: typeof Component
}

type Routes = Route[]

interface Query {
  [key: string]: string
}
export class Component {
  public el
  public state
  public props
  constructor(payload: ComponentPayload = {}) {
    const { tagName = 'div', state = {}, props = {} } = payload
    this.el = document.createElement(tagName)
    this.state = state
    this.props = props
    this.render()
  }

  render() {}
}
function routeRender(routes: Routes) {
  if (!location.hash) {
    history.replaceState(null, '', '/#/')
  }

  const routerView = document.querySelector('router-view')
  const [hash, queryString = ''] = location.hash.split('?')

  const query = queryString.split('&').reduce((acc, cur) => {
    const [key, value] = cur.split('=')
    acc[key] = value
    return acc
  }, {} as Query)
  history.replaceState(query, '')

  const currentRoute = routes.find((route) =>
    new RegExp(`${route.path}/?$`).test(hash)
  )
  if (routerView) {
    routerView.innerHTML = ''
    currentRoute && routerView.append(new currentRoute.component().el)
  }

  window.scrollTo(0, 0)
}
export function createRouter(routes: Routes) {
  return function () {
    window.addEventListener('popstate', () => {
      routeRender(routes)
    })
    routeRender(routes)
  }
}

////// store //////

interface StoreObservers {
  [key: string]: SubscribeCallback[]
}

interface SubscribeCallback {
  (arg: unknown): void
}

export class Store<S> {
  public state = {} as S
  public observers = {} as StoreObservers
  constructor(state: S) {
    for (const key in state) {
      Object.defineProperty(this.state, key, {
        get: () => state[key],
        set: (val) => {
          state[key] = val
          if (Array.isArray(this.observers[key])) {
            this.observers[key].forEach((observer) => observer(val))
          }
        },
      })
    }
  }
  subscribe(key: string, callback: SubscribeCallback) {
    Array.isArray(this.observers[key])
      ? this.observers[key].push(callback)
      : (this.observers[key] = [callback])
  }
}
