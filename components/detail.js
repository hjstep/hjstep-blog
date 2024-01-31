const NOT_FOUND_POST = {
  attributes: {
    title: '존재하지않는 포스트입니다.',
  },
  htmlBody: '',
}
const createDetailNode = () => {
  const template = document.getElementById('template-detail')
  return template.content.firstElementChild.cloneNode(true)
}

export default async (id, element, dispatch) => {
  const posts = await dispatch('posts')
  const extractedPost = posts[Number(id) - 1]
  const { attributes, htmlBody } = extractedPost || NOT_FOUND_POST

  const detailElement = createDetailNode()
  detailElement.querySelector('.markdown-body').innerHTML = htmlBody
  detailElement.querySelector('.title').textContent = attributes.title
  detailElement.querySelector('.date').textContent = attributes.date?.slice(
    0,
    10,
  )
  const newElement = element.cloneNode(true)
  newElement.innerHTML = ''
  newElement.appendChild(detailElement)
  return newElement
}
