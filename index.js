import { addComponent, removeComponent } from './utils/processRenderTasks.js'
import headerComponent from './components/header.js'
import notfoundComponent from './components/page404.js'
import postsComponent from './components/posts.js'
import createRouter from './router.js'
import detailComponent from './components/detail.js'
import model from './model/state.js'
import { NAV_BTN_SELECTOR } from './utils/constant.js'
import './css/index.css'
import './css/layout.css'
import './css/header.css'
import './css/post.css'
import './css/detail.css'

const dispatch = async (key) => await model(key)

const redirect = (path) => {
  window.location.hash = path
}

addComponent('header', headerComponent)

const router = createRouter()
router
  .addRoute('#/posts', (root) => {
    addComponent('posts', postsComponent)
    removeComponent('detail', root)
    removeComponent('404', root)
  })
  .addRoute('#/posts/:id', (root, { id }) => {
    addComponent('detail', (...args) => detailComponent(id, ...args))
    removeComponent('posts', root)
    removeComponent('404', root)
  })
  .setNotFound(() => {
    notfoundComponent()
  })
  .start(dispatch, redirect)

document.body.addEventListener('click', (e) => {
  const { target } = e
  if (target.matches(NAV_BTN_SELECTOR)) {
    const { navigate } = target.dataset
    router.navigate(navigate)
  }
})
