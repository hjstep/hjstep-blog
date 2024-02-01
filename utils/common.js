const applyTemplateWithCallback = (element, name) => {
  const templateNode = document.getElementById('template-' + name)
  const clonedTemplateChildNode =
    templateNode.content.firstElementChild.cloneNode(true)
  const clonedParentNode = element.cloneNode(true)
  clonedParentNode.innerHTML = ''

  return (formatCallback) => {
    if (typeof formatCallback === 'function') {
      return formatCallback(clonedParentNode, clonedTemplateChildNode)
    }
    clonedParentNode.appendChild(clonedTemplateChildNode)
    return clonedParentNode
  }
}

export { applyTemplateWithCallback }
