import { applyTemplateWithCallback } from '../utils/common.js'

const STATE_KEY = 'posts'
const TEMPLATE_NAME = 'posts'
const bindDataToNode = ({ attributes }, index, templateNode) => {
  const clonedTemplateNode = templateNode.cloneNode(true) // 복제하지않으면 동기화됨 live node
  attributes.tag.forEach((tag) => {
    clonedTemplateNode.querySelector('.tag').innerHTML +=
      `<label><mark>#${tag}&nbsp;&nbsp;</mark></label>`
  })

  clonedTemplateNode.querySelector('.post').dataset.index = index + 1
  clonedTemplateNode.querySelector('.title').textContent = attributes.title
  clonedTemplateNode.querySelector('.summary').textContent = attributes.summary
  // clonedTemplateNode.querySelector('.date').textContent = attributes.date.slice(
  //   0,
  //   10,
  // )
  return clonedTemplateNode
}

export default async (element, dispatch, redirect) => {
  const posts = await dispatch(STATE_KEY)

  return applyTemplateWithCallback(
    element,
    TEMPLATE_NAME,
  )((parentNode, templateNode) => {
    posts
      .map((post, index) => bindDataToNode(post, index, templateNode))
      .forEach((node) => parentNode.appendChild(node))
    parentNode.onclick = (e) => {
      const $post = e.target.closest('article.post')

      if ($post) {
        const id = $post.getAttribute('data-index')
        redirect(`/posts/${id}`)
      }
    }

    return parentNode
  })
}
