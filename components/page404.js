const getTemplate = () => {
  const template = document.getElementById('template-404')
  return template.content.firstElementChild.cloneNode(true)
}

export default () => {
  const root = document.getElementById('root')
  const newElement = root
    .querySelector('[data-component="404"]')
    .cloneNode(true)
  root.querySelector('[data-component="app"]').innerHTML = ''
  root.querySelector('[data-component="detail"]').innerHTML = ''
  root.querySelector('[data-component="posts"]').innerHTML = ''
  newElement.innerHTML = ''
  newElement.appendChild(getTemplate())

  root.querySelector('[data-component="404"]').replaceWith(newElement)
}
