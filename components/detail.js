import { applyTemplateWithCallback } from '../utils/common.js'
import { NOT_FOUND_POST } from '../utils/constant.js'

const STATE_KEY = 'posts'
const TEMPLATE_NAME = 'detail'
const bindDataToNode = ({ attributes, htmlBody }, templateNode) => {
  const clonedTemplateNode = templateNode.cloneNode(true)
  clonedTemplateNode.querySelector('.markdown-body').innerHTML = htmlBody
  clonedTemplateNode.querySelector('.title').textContent = attributes.title
  clonedTemplateNode.querySelector('.detail-image').style.backgroundImage = `url(${attributes.imgSrc})`
  // clonedTemplateNode.querySelector('.date').textContent =
  //   attributes.date?.slice(0, 10)
  return clonedTemplateNode
}

export default async (paramId, element, dispatch) => {
  const posts = await dispatch(STATE_KEY)
  const extractedPost = posts[Number(paramId) - 1]
  const { attributes, htmlBody } = extractedPost || NOT_FOUND_POST
  return applyTemplateWithCallback(
    element,
    TEMPLATE_NAME,
  )((parentNode, templateNode) => {
    const bindedTemplateNode = bindDataToNode({ attributes, htmlBody }, templateNode)
    parentNode.appendChild(bindedTemplateNode)
    return parentNode
  })
}
