const getTemplate = () => {
  const template = document.getElementById("template-header");
  return template.content.firstElementChild.cloneNode(true);
};

export default (element) => {
  const newElement = element.cloneNode(true);
  newElement.innerHTML = "";
  newElement.appendChild(getTemplate());

  return newElement;
};
