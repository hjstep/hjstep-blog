const createDetailNode = () => {
  const template = document.getElementById("template-detail");
  return template.content.firstElementChild.cloneNode(true);
};

export default async (id, element, dispatch) => {
  const posts = await dispatch("posts");
  const { attributes, htmlBody } = posts[Number(id) - 1];

  //document.querySelector("[data-component=posts]").innerHTML = "";

  const detailElement = createDetailNode();
  detailElement.querySelector(".markdown-body").innerHTML = htmlBody;
  detailElement.querySelector(".title").textContent = attributes.title;
  detailElement.querySelector(".date").textContent = attributes.date.slice(
    0,
    10
  );
  const newElement = element.cloneNode(true);
  newElement.appendChild(detailElement);
  return newElement;
};
