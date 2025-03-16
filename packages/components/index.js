import * as components from "./components";

const FUNCTION_COMP = ["IfMessage"];

export default {
  install(app) {
    // Object.entries(components) // ['TButton', { install, name, render, setup }]
    Object.entries(components).forEach(([key, value]) => {
      if (!FUNCTION_COMP.includes(key)) app.component(key, value);
    });
  },
};

export const IfMessage = components.IfMessage;
