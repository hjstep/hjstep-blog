const createPostsNode = () => {
  const template = document.getElementById("template-post");
  return template.content.firstElementChild.cloneNode(true);
};

const getTemplate = ({ attributes }, index) => {

  const element = createPostsNode();

  element.querySelector(".post").dataset.index = index + 1;
  element.querySelector(".title").textContent = attributes.title;
  element.querySelector(".summary").textContent = attributes.summary;
  element.querySelector(".date").textContent = attributes.date.slice(0, 10);
  return element;
};

export default async (element, dispatch, redirect) => {
  const posts = await dispatch("posts");

  const newElement = element.cloneNode(true);
  posts
    .map((post, index) => getTemplate(post, index))
    .forEach((node) => newElement.appendChild(node));


  newElement.addEventListener("click", (e) => {
    const $post = e.target.closest("article.post");

    if ($post) {
      const id = $post.getAttribute("data-index");
      redirect(`/posts/${id}`);
    }
  });

  return newElement;
};
