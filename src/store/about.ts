import { Store } from '../core/core'

interface State {
  photo: string
  name: string
  email: string
  github: string
  repository: string
}
export default new Store<State>({
  photo: 'https://avatars.githubusercontent.com/u/22386965?v=4',
  name: 'SPARK',
  email: 'test1234@email.com',
  github: 'https://github.com/sh827kim',
  repository: 'https://github.com/sh827kim/movie-search-example',
})
