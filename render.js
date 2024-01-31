

const vdom = {};
const addComponent = (name, component) => {
  vdom[name] = component;
};
const removeComponent = (name, root)  => {
    vdom[name] = undefined;
    root.querySelector(`[data-component="${name}"]`).innerHTML = '';
};

const render = async (element, dispatch, redirect, name) => {
    console.log(vdom);
  const cloneComponent = !name
    ? element.cloneNode(true)
    : await vdom[name](element, dispatch, redirect);
  const childComponents = cloneComponent.querySelectorAll("[data-component]");

  [...childComponents].forEach(async (childNode) => {
    const { component: name } = childNode.dataset;
    if (vdom[name] !== undefined) {
      const newChildNode = await render(childNode, dispatch, redirect, name);
      childNode.replaceWith(newChildNode);
    }
  });

  return cloneComponent;
};

const renderDOM = (rootElement, dispatch, redirect) => {
    window.requestAnimationFrame(async () => {
     console.log("원본 rootElement >>>> ", rootElement);
     const newRootElement = await render(rootElement, dispatch, redirect);
     console.log("교체 newRootElement >>>>>>>>>>>>>>>  ", newRootElement);
    rootElement.replaceWith(newRootElement);
  });
};

export { renderDOM, addComponent, removeComponent };
