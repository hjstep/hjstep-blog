import { addComponent, removeComponent, renderDOM } from "./render.js";
import appComponent from "./components/app.js";
import postsComponent from "./components/posts.js";
import createRouter from "./router.js";
import detailComponent from "./components/detail.js";
import model from "./model/state.js";
import "./css/index.css";
import "./css/layout.css";
import "./css/header.css";
import "./css/post.css";
import "./css/detail.css";

const dispatch = async (key) => await model(key);

const redirect = (path) => {
  window.location.hash = path;
};

addComponent("app", appComponent);

const router = createRouter();
router
  .addRoute("#/posts", (root) => {
    addComponent("posts", postsComponent);
    removeComponent("detail", root);
  })
  .addRoute("#/posts/:id", (root, { id }) => {
    addComponent("detail", (...args) => detailComponent(id, ...args));
    removeComponent("posts", root);
  })
  .setNotFound(() => (document.getElementById("root").innerHTML = "Not found"))
  .start(dispatch, redirect);

const NAV_BTN_SELECTOR = "a[data-navigation]";
document.body.addEventListener("click", (e) => {
  const { target } = e;
  if (target.matches(NAV_BTN_SELECTOR)) {
    const { navigate } = target.dataset;
    router.navigate(navigate);
  }
});
