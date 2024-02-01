import optimizeRenderingCycle from './optimizeRenderingCycle.js'

const vdom = {}
const addComponent = (name, component) => {
  vdom[name] = component
}
const removeComponent = (name, root) => {
  vdom[name] = undefined
  if (root.querySelector(`[data-component="${name}"]`)) {
    root.querySelector(`[data-component="${name}"]`).innerHTML = ''
  }
}

function nextFrame() {
  return new Promise((resolve) => {
    window.requestAnimationFrame(resolve)
  })
}

const render = async (element, dispatch, redirect, name) => {
  await nextFrame() // 다음 프레임까지 기다림

  const cloneComponent = !name
    ? element.cloneNode(true)
    : await vdom[name](element, dispatch, redirect)
  const childComponents = cloneComponent.querySelectorAll('[data-component]')

  for (const childNode of childComponents) {
    const { component: childName } = childNode.dataset
    if (vdom[childName] !== undefined) {
      const newChildNode = await render(
        childNode,
        dispatch,
        redirect,
        childName,
      )
      childNode.replaceWith(newChildNode)
    }
  }

  return cloneComponent
}

const renderDOM = async (rootElement, dispatch, redirect) => {
  const newRootElement = await render(rootElement, dispatch, redirect)
  // rootElement.replaceWith(newRootElement)
  optimizeRenderingCycle(
    document.getElementById('root'),
    rootElement,
    newRootElement,
  )
}

export { renderDOM, addComponent, removeComponent }
