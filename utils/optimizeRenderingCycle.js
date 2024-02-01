const compareValue = (node1, node2) => {
  if (node1.value !== node2.value) {
    return true
  }

  if (node1.checked !== node2.checked) {
    return true
  }

  return false
}

const compareAttributeLength = (node1, node2) => {
  const n1Attributes = node1.attributes
  const n2Attributes = node2.attributes

  return n1Attributes.length !== n2Attributes.length
}
const compareAttribute = (node1, node2) => {
  const n1Attributes = node1.attributes

  return Array.from(n1Attributes).find(
    ({ name }) => node1.getAttribute(name) !== node2.getAttribute(name),
  )
}

const compareTextcontent = (node1, node2) => {
  return (
    node1.children.length === 0 &&
    node2.children.length === 0 &&
    node1.textContent !== node2.textContent
  )
}

const isNodeChanged = (node1, node2) => {
  // TODO 수정필요
  // 이벤트 핸들러를 갱신하는 로직
  if (node1.onclick !== node2.onclick) {
    node2.onclick = node1.onclick
  }

  const isChangedAttributeLength = compareAttributeLength(node1, node2)
  if (isChangedAttributeLength) {
    return true
  }

  const isChangedAttribute = compareAttribute(node1, node2)

  if (isChangedAttribute) {
    return true
  }

  const isChangedValue = compareValue(node1, node2)

  if (isChangedValue) {
    return true
  }

  const isChangedTextcontent = compareTextcontent(node1, node2)
  if (isChangedTextcontent) {
    return true
  }

  return false
}

const evaluateNodeDifferences = (parentNode, realNode, virtualNode) => {
  if (!parentNode) return
  if (realNode && !virtualNode) {
    realNode.remove()
    return
  }

  if (!realNode && virtualNode) {
    parentNode.appendChild(virtualNode)
    return
  }

  if (isNodeChanged(virtualNode, realNode)) {
    realNode.replaceWith(virtualNode)
    return
  }
}

const applyDiff = (parentNode, realNode, virtualNode) => {
  evaluateNodeDifferences(parentNode, realNode, virtualNode)

  const realNodeChildren = realNode ? Array.from(realNode.children) : []
  const virtualNodeChildren = virtualNode
    ? Array.from(virtualNode.children)
    : []

  const max = Math.max(realNodeChildren.length, virtualNodeChildren.length)
  for (let i = 0; i < max; i++) {
    applyDiff(realNode, realNodeChildren[i], virtualNodeChildren[i])
  }
}

export default applyDiff
