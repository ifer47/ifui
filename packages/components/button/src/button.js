const BUTTON_TYPE = [
  "default",
  "primary",
  "success",
  "warning",
  "info",
  "danger",
];
const BUTTON_SIZE = ["", "small", "mini"];

export const ButtonProps = {
  // 类型
  type: {
    type: String,
    default: "default",
    validator(value) {
      return BUTTON_TYPE.includes(value);
    },
  },
  // 尺寸
  size: {
    type: String,
    default: "",
    validator(value) {
      return BUTTON_SIZE.includes(value);
    },
  },
  plain: {
    type: Boolean,
    default: false,
  },
  // 圆角
  round: {
    type: Boolean,
    default: false,
  },
  // 图标
  icon: {
    type: String,
    default: "",
  },
  // 是否禁用
  disabled: {
    type: Boolean,
    default: false,
  },
  // 加载
  loading: {
    type: Boolean,
    default: false,
  },
};