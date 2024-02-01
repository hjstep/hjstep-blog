import { applyTemplateWithCallback } from '../utils/common.js'

const TEMPLATE_NAME = '404'
const initLayout = (root) => {
  root.querySelector('[data-component="header"]').innerHTML = ''
  root.querySelector('[data-component="detail"]').innerHTML = ''
  root.querySelector('[data-component="posts"]').innerHTML = ''
}

export default () => {
  const root = document.getElementById('root')
  return applyTemplateWithCallback(
    root,
    TEMPLATE_NAME,
  )((_, templateNode) => {
    const parentNode = root
      .querySelector(`[data-component="${TEMPLATE_NAME}"]`)
      .cloneNode(true)
    initLayout(root)
    parentNode.innerHTML = ''
    parentNode.appendChild(templateNode)
    root
      .querySelector(`[data-component="${TEMPLATE_NAME}"]`)
      .replaceWith(parentNode)
  })
}
