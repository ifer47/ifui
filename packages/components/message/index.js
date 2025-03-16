import Message from "./src/message.vue";
import { h, render } from "vue";

let messageInstaceList = [];

const MESSAGE_START_TOP = 56; // 起始的高度
const MESSAGE_HEIGHT = 44; // 组件高度
const MESSAGE_GAP = 16; // 间隔高度

const setDestoryClock = (element, time = 3000) => {
  setTimeout(() => {
    destoryMessageElement(element);
  }, time);
};

const destoryMessageElement = (element) => {
  if (!element.parentElement?.contains(element)) return;
  element.parentElement?.removeChild(element);
  messageInstaceList = messageInstaceList.filter((item) => item !== element);
  messageInstaceList.forEach((item, index) => {
    item.style.top =
      MESSAGE_START_TOP + index * (MESSAGE_HEIGHT + MESSAGE_GAP) + "px";
  });
};

// #1
export const IfMessage = (config) => {
  const VNode = h(Message, {
    ...config,
    onClose(element) {
      destoryMessageElement(element);
    },
  });
  const container = document.createElement("div");
  container.setAttribute("class", "if-message-container");
  document.body.append(container);
  messageInstaceList.push(container);
  container.style.top =
    MESSAGE_START_TOP +
    (messageInstaceList.length - 1) * (MESSAGE_HEIGHT + MESSAGE_GAP) +
    "px";
  render(VNode, container);
  setDestoryClock(container, config.duration);
};

export default IfMessage;
