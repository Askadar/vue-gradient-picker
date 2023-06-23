var __defProp = Object.defineProperty;
var __defNormalProp = (obj, key, value) => key in obj ? __defProp(obj, key, { enumerable: true, configurable: true, writable: true, value }) : obj[key] = value;
var __publicField = (obj, key, value) => {
  __defNormalProp(obj, typeof key !== "symbol" ? key + "" : key, value);
  return value;
};
import { openBlock, createElementBlock, normalizeStyle, resolveComponent, createElementVNode, createVNode, withDirectives, vModelText, toDisplayString, normalizeClass, createCommentVNode, Fragment, renderList, defineComponent, withModifiers, pushScopeId, popScopeId } from "vue";
const prefix = "";
function styleInject(css, ref) {
  if (ref === void 0)
    ref = {};
  var insertAt = ref.insertAt;
  if (!css || typeof document === "undefined") {
    return;
  }
  var head = document.head || document.getElementsByTagName("head")[0];
  var style = document.createElement("style");
  style.type = "text/css";
  if (insertAt === "top") {
    if (head.firstChild) {
      head.insertBefore(style, head.firstChild);
    } else {
      head.appendChild(style);
    }
  } else {
    head.appendChild(style);
  }
  if (style.styleSheet) {
    style.styleSheet.cssText = css;
  } else {
    style.appendChild(document.createTextNode(css));
  }
}
const install = function(app, options) {
  const { componentPrefix = prefix } = options || {};
  app.component(`${componentPrefix}${this.name}`, this);
};
const _checkboardCache = {};
var script$5 = {
  name: "Checkboard",
  props: {
    size: {
      type: [Number, String],
      default: 8
    },
    white: {
      type: String,
      default: "#fff"
    },
    grey: {
      type: String,
      default: "#e6e6e6"
    }
  },
  computed: {
    bgStyle() {
      return {
        "background-image": `url(${getCheckboard(this.white, this.grey, this.size)})`
      };
    }
  }
};
function renderCheckboard(c1, c2, size) {
  if (typeof document === "undefined") {
    return null;
  }
  const canvas = document.createElement("canvas");
  canvas.width = canvas.height = size * 2;
  const ctx = canvas.getContext("2d");
  if (!ctx) {
    return null;
  }
  ctx.fillStyle = c1;
  ctx.fillRect(0, 0, canvas.width, canvas.height);
  ctx.fillStyle = c2;
  ctx.fillRect(0, 0, size, size);
  ctx.translate(size, size);
  ctx.fillRect(0, 0, size, size);
  return canvas.toDataURL();
}
function getCheckboard(c1, c2, size) {
  const key = `${c1},${c2},${size}`;
  if (_checkboardCache[key]) {
    return _checkboardCache[key];
  }
  const checkboard = renderCheckboard(c1, c2, size);
  _checkboardCache[key] = checkboard;
  return checkboard;
}
function render$5(_ctx, _cache, $props, $setup, $data, $options) {
  return openBlock(), createElementBlock("div", {
    class: "vc-checkerboard",
    style: normalizeStyle($options.bgStyle)
  }, null, 4);
}
var css_248z$5 = ".vc-checkerboard{background-size:contain;bottom:0;left:0;position:absolute;right:0;top:0}";
styleInject(css_248z$5);
script$5.render = render$5;
script$5.__file = "src/components/checkboard/checkboard.vue";
script$5.install = install;
var script$4 = {
  name: "Alpha",
  props: {
    value: Object,
    onChange: Function
  },
  components: {
    checkboard: script$5
  },
  computed: {
    colors() {
      return this.value;
    },
    gradientColor() {
      const { rgba } = this.colors;
      const rgbStr = [rgba.r, rgba.g, rgba.b].join(",");
      return `linear-gradient(to right, rgba(${rgbStr}, 0) 0%, rgba(${rgbStr}, 1) 100%)`;
    }
  },
  methods: {
    handleChange(e, skip) {
      !skip && e.preventDefault();
      const { container } = this.$refs;
      if (!container) {
        return;
      }
      const containerWidth = container.clientWidth;
      const xOffset = container.getBoundingClientRect().left + window.pageXOffset;
      const pageX = e.pageX || (e.touches ? e.touches[0].pageX : 0);
      const left = pageX - xOffset;
      let a;
      if (left < 0) {
        a = 0;
      } else if (left > containerWidth) {
        a = 1;
      } else {
        a = Math.round(left * 100 / containerWidth) / 100;
      }
      if (this.colors.a !== a) {
        this.$emit("change", {
          h: this.colors.hsl.h,
          s: this.colors.hsl.s,
          l: this.colors.hsl.l,
          a,
          source: "rgba"
        });
      }
    },
    handleMouseDown(e) {
      this.handleChange(e, true);
      window.addEventListener("mousemove", this.handleChange);
      window.addEventListener("mouseup", this.handleMouseUp);
    },
    handleMouseUp() {
      this.unbindEventListeners();
    },
    unbindEventListeners() {
      window.removeEventListener("mousemove", this.handleChange);
      window.removeEventListener("mouseup", this.handleMouseUp);
    }
  }
};
const _hoisted_1$5 = { class: "vc-alpha" };
const _hoisted_2$5 = { class: "vc-alpha-checkboard-wrap" };
const _hoisted_3$5 = /* @__PURE__ */ createElementVNode("div", { class: "vc-alpha-picker" }, null, -1);
const _hoisted_4$4 = [
  _hoisted_3$5
];
function render$4(_ctx, _cache, $props, $setup, $data, $options) {
  const _component_checkboard = resolveComponent("checkboard");
  return openBlock(), createElementBlock("div", _hoisted_1$5, [
    createElementVNode("div", _hoisted_2$5, [
      createVNode(_component_checkboard)
    ]),
    createElementVNode("div", {
      class: "vc-alpha-gradient",
      style: normalizeStyle({ background: $options.gradientColor })
    }, null, 4),
    createElementVNode("div", {
      class: "vc-alpha-container",
      ref: "container",
      onMousedown: _cache[0] || (_cache[0] = (...args) => $options.handleMouseDown && $options.handleMouseDown(...args)),
      onTouchmove: _cache[1] || (_cache[1] = (...args) => $options.handleChange && $options.handleChange(...args)),
      onTouchstart: _cache[2] || (_cache[2] = (...args) => $options.handleChange && $options.handleChange(...args))
    }, [
      createElementVNode("div", {
        class: "vc-alpha-pointer",
        style: normalizeStyle({ left: $options.colors.a * 100 + "%" })
      }, _hoisted_4$4, 4)
    ], 544)
  ]);
}
var css_248z$4 = ".vc-alpha,.vc-alpha-checkboard-wrap{bottom:0;left:0;position:absolute;right:0;top:0}.vc-alpha-checkboard-wrap{overflow:hidden}.vc-alpha-gradient{bottom:0;left:0;position:absolute;right:0;top:0}.vc-alpha-container{cursor:pointer;height:100%;margin:0 3px;position:relative;z-index:2}.vc-alpha-pointer{position:absolute;z-index:2}.vc-alpha-picker{background:#fff;border-radius:1px;box-shadow:0 0 2px rgba(0,0,0,.6);cursor:pointer;height:8px;margin-top:1px;transform:translateX(-2px);width:4px}";
styleInject(css_248z$4);
script$4.render = render$4;
script$4.__file = "src/components/alpha/alpha.vue";
script$4.install = install;
function bound01(n, max) {
  if (isOnePointZero(n)) {
    n = "100%";
  }
  var isPercent = isPercentage(n);
  n = max === 360 ? n : Math.min(max, Math.max(0, parseFloat(n)));
  if (isPercent) {
    n = parseInt(String(n * max), 10) / 100;
  }
  if (Math.abs(n - max) < 1e-6) {
    return 1;
  }
  if (max === 360) {
    n = (n < 0 ? n % max + max : n % max) / parseFloat(String(max));
  } else {
    n = n % max / parseFloat(String(max));
  }
  return n;
}
function clamp01(val) {
  return Math.min(1, Math.max(0, val));
}
function isOnePointZero(n) {
  return typeof n === "string" && n.indexOf(".") !== -1 && parseFloat(n) === 1;
}
function isPercentage(n) {
  return typeof n === "string" && n.indexOf("%") !== -1;
}
function boundAlpha(a) {
  a = parseFloat(a);
  if (isNaN(a) || a < 0 || a > 1) {
    a = 1;
  }
  return a;
}
function convertToPercentage(n) {
  if (n <= 1) {
    return "".concat(Number(n) * 100, "%");
  }
  return n;
}
function pad2(c) {
  return c.length === 1 ? "0" + c : String(c);
}
function rgbToRgb(r, g, b) {
  return {
    r: bound01(r, 255) * 255,
    g: bound01(g, 255) * 255,
    b: bound01(b, 255) * 255
  };
}
function rgbToHsl(r, g, b) {
  r = bound01(r, 255);
  g = bound01(g, 255);
  b = bound01(b, 255);
  var max = Math.max(r, g, b);
  var min = Math.min(r, g, b);
  var h = 0;
  var s = 0;
  var l = (max + min) / 2;
  if (max === min) {
    s = 0;
    h = 0;
  } else {
    var d = max - min;
    s = l > 0.5 ? d / (2 - max - min) : d / (max + min);
    switch (max) {
      case r:
        h = (g - b) / d + (g < b ? 6 : 0);
        break;
      case g:
        h = (b - r) / d + 2;
        break;
      case b:
        h = (r - g) / d + 4;
        break;
    }
    h /= 6;
  }
  return { h, s, l };
}
function hue2rgb(p, q, t) {
  if (t < 0) {
    t += 1;
  }
  if (t > 1) {
    t -= 1;
  }
  if (t < 1 / 6) {
    return p + (q - p) * (6 * t);
  }
  if (t < 1 / 2) {
    return q;
  }
  if (t < 2 / 3) {
    return p + (q - p) * (2 / 3 - t) * 6;
  }
  return p;
}
function hslToRgb(h, s, l) {
  var r;
  var g;
  var b;
  h = bound01(h, 360);
  s = bound01(s, 100);
  l = bound01(l, 100);
  if (s === 0) {
    g = l;
    b = l;
    r = l;
  } else {
    var q = l < 0.5 ? l * (1 + s) : l + s - l * s;
    var p = 2 * l - q;
    r = hue2rgb(p, q, h + 1 / 3);
    g = hue2rgb(p, q, h);
    b = hue2rgb(p, q, h - 1 / 3);
  }
  return { r: r * 255, g: g * 255, b: b * 255 };
}
function rgbToHsv(r, g, b) {
  r = bound01(r, 255);
  g = bound01(g, 255);
  b = bound01(b, 255);
  var max = Math.max(r, g, b);
  var min = Math.min(r, g, b);
  var h = 0;
  var v = max;
  var d = max - min;
  var s = max === 0 ? 0 : d / max;
  if (max === min) {
    h = 0;
  } else {
    switch (max) {
      case r:
        h = (g - b) / d + (g < b ? 6 : 0);
        break;
      case g:
        h = (b - r) / d + 2;
        break;
      case b:
        h = (r - g) / d + 4;
        break;
    }
    h /= 6;
  }
  return { h, s, v };
}
function hsvToRgb(h, s, v) {
  h = bound01(h, 360) * 6;
  s = bound01(s, 100);
  v = bound01(v, 100);
  var i = Math.floor(h);
  var f = h - i;
  var p = v * (1 - s);
  var q = v * (1 - f * s);
  var t = v * (1 - (1 - f) * s);
  var mod = i % 6;
  var r = [v, q, p, p, t, v][mod];
  var g = [t, v, v, q, p, p][mod];
  var b = [p, p, t, v, v, q][mod];
  return { r: r * 255, g: g * 255, b: b * 255 };
}
function rgbToHex(r, g, b, allow3Char) {
  var hex = [
    pad2(Math.round(r).toString(16)),
    pad2(Math.round(g).toString(16)),
    pad2(Math.round(b).toString(16))
  ];
  if (allow3Char && hex[0].startsWith(hex[0].charAt(1)) && hex[1].startsWith(hex[1].charAt(1)) && hex[2].startsWith(hex[2].charAt(1))) {
    return hex[0].charAt(0) + hex[1].charAt(0) + hex[2].charAt(0);
  }
  return hex.join("");
}
function rgbaToHex(r, g, b, a, allow4Char) {
  var hex = [
    pad2(Math.round(r).toString(16)),
    pad2(Math.round(g).toString(16)),
    pad2(Math.round(b).toString(16)),
    pad2(convertDecimalToHex(a))
  ];
  if (allow4Char && hex[0].startsWith(hex[0].charAt(1)) && hex[1].startsWith(hex[1].charAt(1)) && hex[2].startsWith(hex[2].charAt(1)) && hex[3].startsWith(hex[3].charAt(1))) {
    return hex[0].charAt(0) + hex[1].charAt(0) + hex[2].charAt(0) + hex[3].charAt(0);
  }
  return hex.join("");
}
function convertDecimalToHex(d) {
  return Math.round(parseFloat(d) * 255).toString(16);
}
function convertHexToDecimal(h) {
  return parseIntFromHex(h) / 255;
}
function parseIntFromHex(val) {
  return parseInt(val, 16);
}
function numberInputToObject(color) {
  return {
    r: color >> 16,
    g: (color & 65280) >> 8,
    b: color & 255
  };
}
var names = {
  aliceblue: "#f0f8ff",
  antiquewhite: "#faebd7",
  aqua: "#00ffff",
  aquamarine: "#7fffd4",
  azure: "#f0ffff",
  beige: "#f5f5dc",
  bisque: "#ffe4c4",
  black: "#000000",
  blanchedalmond: "#ffebcd",
  blue: "#0000ff",
  blueviolet: "#8a2be2",
  brown: "#a52a2a",
  burlywood: "#deb887",
  cadetblue: "#5f9ea0",
  chartreuse: "#7fff00",
  chocolate: "#d2691e",
  coral: "#ff7f50",
  cornflowerblue: "#6495ed",
  cornsilk: "#fff8dc",
  crimson: "#dc143c",
  cyan: "#00ffff",
  darkblue: "#00008b",
  darkcyan: "#008b8b",
  darkgoldenrod: "#b8860b",
  darkgray: "#a9a9a9",
  darkgreen: "#006400",
  darkgrey: "#a9a9a9",
  darkkhaki: "#bdb76b",
  darkmagenta: "#8b008b",
  darkolivegreen: "#556b2f",
  darkorange: "#ff8c00",
  darkorchid: "#9932cc",
  darkred: "#8b0000",
  darksalmon: "#e9967a",
  darkseagreen: "#8fbc8f",
  darkslateblue: "#483d8b",
  darkslategray: "#2f4f4f",
  darkslategrey: "#2f4f4f",
  darkturquoise: "#00ced1",
  darkviolet: "#9400d3",
  deeppink: "#ff1493",
  deepskyblue: "#00bfff",
  dimgray: "#696969",
  dimgrey: "#696969",
  dodgerblue: "#1e90ff",
  firebrick: "#b22222",
  floralwhite: "#fffaf0",
  forestgreen: "#228b22",
  fuchsia: "#ff00ff",
  gainsboro: "#dcdcdc",
  ghostwhite: "#f8f8ff",
  goldenrod: "#daa520",
  gold: "#ffd700",
  gray: "#808080",
  green: "#008000",
  greenyellow: "#adff2f",
  grey: "#808080",
  honeydew: "#f0fff0",
  hotpink: "#ff69b4",
  indianred: "#cd5c5c",
  indigo: "#4b0082",
  ivory: "#fffff0",
  khaki: "#f0e68c",
  lavenderblush: "#fff0f5",
  lavender: "#e6e6fa",
  lawngreen: "#7cfc00",
  lemonchiffon: "#fffacd",
  lightblue: "#add8e6",
  lightcoral: "#f08080",
  lightcyan: "#e0ffff",
  lightgoldenrodyellow: "#fafad2",
  lightgray: "#d3d3d3",
  lightgreen: "#90ee90",
  lightgrey: "#d3d3d3",
  lightpink: "#ffb6c1",
  lightsalmon: "#ffa07a",
  lightseagreen: "#20b2aa",
  lightskyblue: "#87cefa",
  lightslategray: "#778899",
  lightslategrey: "#778899",
  lightsteelblue: "#b0c4de",
  lightyellow: "#ffffe0",
  lime: "#00ff00",
  limegreen: "#32cd32",
  linen: "#faf0e6",
  magenta: "#ff00ff",
  maroon: "#800000",
  mediumaquamarine: "#66cdaa",
  mediumblue: "#0000cd",
  mediumorchid: "#ba55d3",
  mediumpurple: "#9370db",
  mediumseagreen: "#3cb371",
  mediumslateblue: "#7b68ee",
  mediumspringgreen: "#00fa9a",
  mediumturquoise: "#48d1cc",
  mediumvioletred: "#c71585",
  midnightblue: "#191970",
  mintcream: "#f5fffa",
  mistyrose: "#ffe4e1",
  moccasin: "#ffe4b5",
  navajowhite: "#ffdead",
  navy: "#000080",
  oldlace: "#fdf5e6",
  olive: "#808000",
  olivedrab: "#6b8e23",
  orange: "#ffa500",
  orangered: "#ff4500",
  orchid: "#da70d6",
  palegoldenrod: "#eee8aa",
  palegreen: "#98fb98",
  paleturquoise: "#afeeee",
  palevioletred: "#db7093",
  papayawhip: "#ffefd5",
  peachpuff: "#ffdab9",
  peru: "#cd853f",
  pink: "#ffc0cb",
  plum: "#dda0dd",
  powderblue: "#b0e0e6",
  purple: "#800080",
  rebeccapurple: "#663399",
  red: "#ff0000",
  rosybrown: "#bc8f8f",
  royalblue: "#4169e1",
  saddlebrown: "#8b4513",
  salmon: "#fa8072",
  sandybrown: "#f4a460",
  seagreen: "#2e8b57",
  seashell: "#fff5ee",
  sienna: "#a0522d",
  silver: "#c0c0c0",
  skyblue: "#87ceeb",
  slateblue: "#6a5acd",
  slategray: "#708090",
  slategrey: "#708090",
  snow: "#fffafa",
  springgreen: "#00ff7f",
  steelblue: "#4682b4",
  tan: "#d2b48c",
  teal: "#008080",
  thistle: "#d8bfd8",
  tomato: "#ff6347",
  turquoise: "#40e0d0",
  violet: "#ee82ee",
  wheat: "#f5deb3",
  white: "#ffffff",
  whitesmoke: "#f5f5f5",
  yellow: "#ffff00",
  yellowgreen: "#9acd32"
};
function inputToRGB(color) {
  var rgb = { r: 0, g: 0, b: 0 };
  var a = 1;
  var s = null;
  var v = null;
  var l = null;
  var ok = false;
  var format = false;
  if (typeof color === "string") {
    color = stringInputToObject(color);
  }
  if (typeof color === "object") {
    if (isValidCSSUnit(color.r) && isValidCSSUnit(color.g) && isValidCSSUnit(color.b)) {
      rgb = rgbToRgb(color.r, color.g, color.b);
      ok = true;
      format = String(color.r).substr(-1) === "%" ? "prgb" : "rgb";
    } else if (isValidCSSUnit(color.h) && isValidCSSUnit(color.s) && isValidCSSUnit(color.v)) {
      s = convertToPercentage(color.s);
      v = convertToPercentage(color.v);
      rgb = hsvToRgb(color.h, s, v);
      ok = true;
      format = "hsv";
    } else if (isValidCSSUnit(color.h) && isValidCSSUnit(color.s) && isValidCSSUnit(color.l)) {
      s = convertToPercentage(color.s);
      l = convertToPercentage(color.l);
      rgb = hslToRgb(color.h, s, l);
      ok = true;
      format = "hsl";
    }
    if (Object.prototype.hasOwnProperty.call(color, "a")) {
      a = color.a;
    }
  }
  a = boundAlpha(a);
  return {
    ok,
    format: color.format || format,
    r: Math.min(255, Math.max(rgb.r, 0)),
    g: Math.min(255, Math.max(rgb.g, 0)),
    b: Math.min(255, Math.max(rgb.b, 0)),
    a
  };
}
var CSS_INTEGER = "[-\\+]?\\d+%?";
var CSS_NUMBER = "[-\\+]?\\d*\\.\\d+%?";
var CSS_UNIT = "(?:".concat(CSS_NUMBER, ")|(?:").concat(CSS_INTEGER, ")");
var PERMISSIVE_MATCH3 = "[\\s|\\(]+(".concat(CSS_UNIT, ")[,|\\s]+(").concat(CSS_UNIT, ")[,|\\s]+(").concat(CSS_UNIT, ")\\s*\\)?");
var PERMISSIVE_MATCH4 = "[\\s|\\(]+(".concat(CSS_UNIT, ")[,|\\s]+(").concat(CSS_UNIT, ")[,|\\s]+(").concat(CSS_UNIT, ")[,|\\s]+(").concat(CSS_UNIT, ")\\s*\\)?");
var matchers = {
  CSS_UNIT: new RegExp(CSS_UNIT),
  rgb: new RegExp("rgb" + PERMISSIVE_MATCH3),
  rgba: new RegExp("rgba" + PERMISSIVE_MATCH4),
  hsl: new RegExp("hsl" + PERMISSIVE_MATCH3),
  hsla: new RegExp("hsla" + PERMISSIVE_MATCH4),
  hsv: new RegExp("hsv" + PERMISSIVE_MATCH3),
  hsva: new RegExp("hsva" + PERMISSIVE_MATCH4),
  hex3: /^#?([0-9a-fA-F]{1})([0-9a-fA-F]{1})([0-9a-fA-F]{1})$/,
  hex6: /^#?([0-9a-fA-F]{2})([0-9a-fA-F]{2})([0-9a-fA-F]{2})$/,
  hex4: /^#?([0-9a-fA-F]{1})([0-9a-fA-F]{1})([0-9a-fA-F]{1})([0-9a-fA-F]{1})$/,
  hex8: /^#?([0-9a-fA-F]{2})([0-9a-fA-F]{2})([0-9a-fA-F]{2})([0-9a-fA-F]{2})$/
};
function stringInputToObject(color) {
  color = color.trim().toLowerCase();
  if (color.length === 0) {
    return false;
  }
  var named = false;
  if (names[color]) {
    color = names[color];
    named = true;
  } else if (color === "transparent") {
    return { r: 0, g: 0, b: 0, a: 0, format: "name" };
  }
  var match = matchers.rgb.exec(color);
  if (match) {
    return { r: match[1], g: match[2], b: match[3] };
  }
  match = matchers.rgba.exec(color);
  if (match) {
    return { r: match[1], g: match[2], b: match[3], a: match[4] };
  }
  match = matchers.hsl.exec(color);
  if (match) {
    return { h: match[1], s: match[2], l: match[3] };
  }
  match = matchers.hsla.exec(color);
  if (match) {
    return { h: match[1], s: match[2], l: match[3], a: match[4] };
  }
  match = matchers.hsv.exec(color);
  if (match) {
    return { h: match[1], s: match[2], v: match[3] };
  }
  match = matchers.hsva.exec(color);
  if (match) {
    return { h: match[1], s: match[2], v: match[3], a: match[4] };
  }
  match = matchers.hex8.exec(color);
  if (match) {
    return {
      r: parseIntFromHex(match[1]),
      g: parseIntFromHex(match[2]),
      b: parseIntFromHex(match[3]),
      a: convertHexToDecimal(match[4]),
      format: named ? "name" : "hex8"
    };
  }
  match = matchers.hex6.exec(color);
  if (match) {
    return {
      r: parseIntFromHex(match[1]),
      g: parseIntFromHex(match[2]),
      b: parseIntFromHex(match[3]),
      format: named ? "name" : "hex"
    };
  }
  match = matchers.hex4.exec(color);
  if (match) {
    return {
      r: parseIntFromHex(match[1] + match[1]),
      g: parseIntFromHex(match[2] + match[2]),
      b: parseIntFromHex(match[3] + match[3]),
      a: convertHexToDecimal(match[4] + match[4]),
      format: named ? "name" : "hex8"
    };
  }
  match = matchers.hex3.exec(color);
  if (match) {
    return {
      r: parseIntFromHex(match[1] + match[1]),
      g: parseIntFromHex(match[2] + match[2]),
      b: parseIntFromHex(match[3] + match[3]),
      format: named ? "name" : "hex"
    };
  }
  return false;
}
function isValidCSSUnit(color) {
  return Boolean(matchers.CSS_UNIT.exec(String(color)));
}
var TinyColor = function() {
  function TinyColor2(color, opts) {
    if (color === void 0) {
      color = "";
    }
    if (opts === void 0) {
      opts = {};
    }
    var _a;
    if (color instanceof TinyColor2) {
      return color;
    }
    if (typeof color === "number") {
      color = numberInputToObject(color);
    }
    this.originalInput = color;
    var rgb = inputToRGB(color);
    this.originalInput = color;
    this.r = rgb.r;
    this.g = rgb.g;
    this.b = rgb.b;
    this.a = rgb.a;
    this.roundA = Math.round(100 * this.a) / 100;
    this.format = (_a = opts.format) !== null && _a !== void 0 ? _a : rgb.format;
    this.gradientType = opts.gradientType;
    if (this.r < 1) {
      this.r = Math.round(this.r);
    }
    if (this.g < 1) {
      this.g = Math.round(this.g);
    }
    if (this.b < 1) {
      this.b = Math.round(this.b);
    }
    this.isValid = rgb.ok;
  }
  TinyColor2.prototype.isDark = function() {
    return this.getBrightness() < 128;
  };
  TinyColor2.prototype.isLight = function() {
    return !this.isDark();
  };
  TinyColor2.prototype.getBrightness = function() {
    var rgb = this.toRgb();
    return (rgb.r * 299 + rgb.g * 587 + rgb.b * 114) / 1e3;
  };
  TinyColor2.prototype.getLuminance = function() {
    var rgb = this.toRgb();
    var R;
    var G;
    var B;
    var RsRGB = rgb.r / 255;
    var GsRGB = rgb.g / 255;
    var BsRGB = rgb.b / 255;
    if (RsRGB <= 0.03928) {
      R = RsRGB / 12.92;
    } else {
      R = Math.pow((RsRGB + 0.055) / 1.055, 2.4);
    }
    if (GsRGB <= 0.03928) {
      G = GsRGB / 12.92;
    } else {
      G = Math.pow((GsRGB + 0.055) / 1.055, 2.4);
    }
    if (BsRGB <= 0.03928) {
      B = BsRGB / 12.92;
    } else {
      B = Math.pow((BsRGB + 0.055) / 1.055, 2.4);
    }
    return 0.2126 * R + 0.7152 * G + 0.0722 * B;
  };
  TinyColor2.prototype.getAlpha = function() {
    return this.a;
  };
  TinyColor2.prototype.setAlpha = function(alpha) {
    this.a = boundAlpha(alpha);
    this.roundA = Math.round(100 * this.a) / 100;
    return this;
  };
  TinyColor2.prototype.toHsv = function() {
    var hsv = rgbToHsv(this.r, this.g, this.b);
    return { h: hsv.h * 360, s: hsv.s, v: hsv.v, a: this.a };
  };
  TinyColor2.prototype.toHsvString = function() {
    var hsv = rgbToHsv(this.r, this.g, this.b);
    var h = Math.round(hsv.h * 360);
    var s = Math.round(hsv.s * 100);
    var v = Math.round(hsv.v * 100);
    return this.a === 1 ? "hsv(".concat(h, ", ").concat(s, "%, ").concat(v, "%)") : "hsva(".concat(h, ", ").concat(s, "%, ").concat(v, "%, ").concat(this.roundA, ")");
  };
  TinyColor2.prototype.toHsl = function() {
    var hsl = rgbToHsl(this.r, this.g, this.b);
    return { h: hsl.h * 360, s: hsl.s, l: hsl.l, a: this.a };
  };
  TinyColor2.prototype.toHslString = function() {
    var hsl = rgbToHsl(this.r, this.g, this.b);
    var h = Math.round(hsl.h * 360);
    var s = Math.round(hsl.s * 100);
    var l = Math.round(hsl.l * 100);
    return this.a === 1 ? "hsl(".concat(h, ", ").concat(s, "%, ").concat(l, "%)") : "hsla(".concat(h, ", ").concat(s, "%, ").concat(l, "%, ").concat(this.roundA, ")");
  };
  TinyColor2.prototype.toHex = function(allow3Char) {
    if (allow3Char === void 0) {
      allow3Char = false;
    }
    return rgbToHex(this.r, this.g, this.b, allow3Char);
  };
  TinyColor2.prototype.toHexString = function(allow3Char) {
    if (allow3Char === void 0) {
      allow3Char = false;
    }
    return "#" + this.toHex(allow3Char);
  };
  TinyColor2.prototype.toHex8 = function(allow4Char) {
    if (allow4Char === void 0) {
      allow4Char = false;
    }
    return rgbaToHex(this.r, this.g, this.b, this.a, allow4Char);
  };
  TinyColor2.prototype.toHex8String = function(allow4Char) {
    if (allow4Char === void 0) {
      allow4Char = false;
    }
    return "#" + this.toHex8(allow4Char);
  };
  TinyColor2.prototype.toRgb = function() {
    return {
      r: Math.round(this.r),
      g: Math.round(this.g),
      b: Math.round(this.b),
      a: this.a
    };
  };
  TinyColor2.prototype.toRgbString = function() {
    var r = Math.round(this.r);
    var g = Math.round(this.g);
    var b = Math.round(this.b);
    return this.a === 1 ? "rgb(".concat(r, ", ").concat(g, ", ").concat(b, ")") : "rgba(".concat(r, ", ").concat(g, ", ").concat(b, ", ").concat(this.roundA, ")");
  };
  TinyColor2.prototype.toPercentageRgb = function() {
    var fmt = function(x) {
      return "".concat(Math.round(bound01(x, 255) * 100), "%");
    };
    return {
      r: fmt(this.r),
      g: fmt(this.g),
      b: fmt(this.b),
      a: this.a
    };
  };
  TinyColor2.prototype.toPercentageRgbString = function() {
    var rnd = function(x) {
      return Math.round(bound01(x, 255) * 100);
    };
    return this.a === 1 ? "rgb(".concat(rnd(this.r), "%, ").concat(rnd(this.g), "%, ").concat(rnd(this.b), "%)") : "rgba(".concat(rnd(this.r), "%, ").concat(rnd(this.g), "%, ").concat(rnd(this.b), "%, ").concat(this.roundA, ")");
  };
  TinyColor2.prototype.toName = function() {
    if (this.a === 0) {
      return "transparent";
    }
    if (this.a < 1) {
      return false;
    }
    var hex = "#" + rgbToHex(this.r, this.g, this.b, false);
    for (var _i = 0, _a = Object.entries(names); _i < _a.length; _i++) {
      var _b = _a[_i], key = _b[0], value = _b[1];
      if (hex === value) {
        return key;
      }
    }
    return false;
  };
  TinyColor2.prototype.toString = function(format) {
    var formatSet = Boolean(format);
    format = format !== null && format !== void 0 ? format : this.format;
    var formattedString = false;
    var hasAlpha = this.a < 1 && this.a >= 0;
    var needsAlphaFormat = !formatSet && hasAlpha && (format.startsWith("hex") || format === "name");
    if (needsAlphaFormat) {
      if (format === "name" && this.a === 0) {
        return this.toName();
      }
      return this.toRgbString();
    }
    if (format === "rgb") {
      formattedString = this.toRgbString();
    }
    if (format === "prgb") {
      formattedString = this.toPercentageRgbString();
    }
    if (format === "hex" || format === "hex6") {
      formattedString = this.toHexString();
    }
    if (format === "hex3") {
      formattedString = this.toHexString(true);
    }
    if (format === "hex4") {
      formattedString = this.toHex8String(true);
    }
    if (format === "hex8") {
      formattedString = this.toHex8String();
    }
    if (format === "name") {
      formattedString = this.toName();
    }
    if (format === "hsl") {
      formattedString = this.toHslString();
    }
    if (format === "hsv") {
      formattedString = this.toHsvString();
    }
    return formattedString || this.toHexString();
  };
  TinyColor2.prototype.toNumber = function() {
    return (Math.round(this.r) << 16) + (Math.round(this.g) << 8) + Math.round(this.b);
  };
  TinyColor2.prototype.clone = function() {
    return new TinyColor2(this.toString());
  };
  TinyColor2.prototype.lighten = function(amount) {
    if (amount === void 0) {
      amount = 10;
    }
    var hsl = this.toHsl();
    hsl.l += amount / 100;
    hsl.l = clamp01(hsl.l);
    return new TinyColor2(hsl);
  };
  TinyColor2.prototype.brighten = function(amount) {
    if (amount === void 0) {
      amount = 10;
    }
    var rgb = this.toRgb();
    rgb.r = Math.max(0, Math.min(255, rgb.r - Math.round(255 * -(amount / 100))));
    rgb.g = Math.max(0, Math.min(255, rgb.g - Math.round(255 * -(amount / 100))));
    rgb.b = Math.max(0, Math.min(255, rgb.b - Math.round(255 * -(amount / 100))));
    return new TinyColor2(rgb);
  };
  TinyColor2.prototype.darken = function(amount) {
    if (amount === void 0) {
      amount = 10;
    }
    var hsl = this.toHsl();
    hsl.l -= amount / 100;
    hsl.l = clamp01(hsl.l);
    return new TinyColor2(hsl);
  };
  TinyColor2.prototype.tint = function(amount) {
    if (amount === void 0) {
      amount = 10;
    }
    return this.mix("white", amount);
  };
  TinyColor2.prototype.shade = function(amount) {
    if (amount === void 0) {
      amount = 10;
    }
    return this.mix("black", amount);
  };
  TinyColor2.prototype.desaturate = function(amount) {
    if (amount === void 0) {
      amount = 10;
    }
    var hsl = this.toHsl();
    hsl.s -= amount / 100;
    hsl.s = clamp01(hsl.s);
    return new TinyColor2(hsl);
  };
  TinyColor2.prototype.saturate = function(amount) {
    if (amount === void 0) {
      amount = 10;
    }
    var hsl = this.toHsl();
    hsl.s += amount / 100;
    hsl.s = clamp01(hsl.s);
    return new TinyColor2(hsl);
  };
  TinyColor2.prototype.greyscale = function() {
    return this.desaturate(100);
  };
  TinyColor2.prototype.spin = function(amount) {
    var hsl = this.toHsl();
    var hue = (hsl.h + amount) % 360;
    hsl.h = hue < 0 ? 360 + hue : hue;
    return new TinyColor2(hsl);
  };
  TinyColor2.prototype.mix = function(color, amount) {
    if (amount === void 0) {
      amount = 50;
    }
    var rgb1 = this.toRgb();
    var rgb2 = new TinyColor2(color).toRgb();
    var p = amount / 100;
    var rgba = {
      r: (rgb2.r - rgb1.r) * p + rgb1.r,
      g: (rgb2.g - rgb1.g) * p + rgb1.g,
      b: (rgb2.b - rgb1.b) * p + rgb1.b,
      a: (rgb2.a - rgb1.a) * p + rgb1.a
    };
    return new TinyColor2(rgba);
  };
  TinyColor2.prototype.analogous = function(results, slices) {
    if (results === void 0) {
      results = 6;
    }
    if (slices === void 0) {
      slices = 30;
    }
    var hsl = this.toHsl();
    var part = 360 / slices;
    var ret = [this];
    for (hsl.h = (hsl.h - (part * results >> 1) + 720) % 360; --results; ) {
      hsl.h = (hsl.h + part) % 360;
      ret.push(new TinyColor2(hsl));
    }
    return ret;
  };
  TinyColor2.prototype.complement = function() {
    var hsl = this.toHsl();
    hsl.h = (hsl.h + 180) % 360;
    return new TinyColor2(hsl);
  };
  TinyColor2.prototype.monochromatic = function(results) {
    if (results === void 0) {
      results = 6;
    }
    var hsv = this.toHsv();
    var h = hsv.h;
    var s = hsv.s;
    var v = hsv.v;
    var res = [];
    var modification = 1 / results;
    while (results--) {
      res.push(new TinyColor2({ h, s, v }));
      v = (v + modification) % 1;
    }
    return res;
  };
  TinyColor2.prototype.splitcomplement = function() {
    var hsl = this.toHsl();
    var h = hsl.h;
    return [
      this,
      new TinyColor2({ h: (h + 72) % 360, s: hsl.s, l: hsl.l }),
      new TinyColor2({ h: (h + 216) % 360, s: hsl.s, l: hsl.l })
    ];
  };
  TinyColor2.prototype.onBackground = function(background) {
    var fg = this.toRgb();
    var bg = new TinyColor2(background).toRgb();
    return new TinyColor2({
      r: bg.r + (fg.r - bg.r) * fg.a,
      g: bg.g + (fg.g - bg.g) * fg.a,
      b: bg.b + (fg.b - bg.b) * fg.a
    });
  };
  TinyColor2.prototype.triad = function() {
    return this.polyad(3);
  };
  TinyColor2.prototype.tetrad = function() {
    return this.polyad(4);
  };
  TinyColor2.prototype.polyad = function(n) {
    var hsl = this.toHsl();
    var h = hsl.h;
    var result = [this];
    var increment = 360 / n;
    for (var i = 1; i < n; i++) {
      result.push(new TinyColor2({ h: (h + i * increment) % 360, s: hsl.s, l: hsl.l }));
    }
    return result;
  };
  TinyColor2.prototype.equals = function(color) {
    return this.toRgbString() === new TinyColor2(color).toRgbString();
  };
  return TinyColor2;
}();
function tinycolor$1(color, opts) {
  if (color === void 0) {
    color = "";
  }
  if (opts === void 0) {
    opts = {};
  }
  return new TinyColor(color, opts);
}
function tinycolor(...args) {
  return new TinyColor(...args);
}
function _colorChange(data, oldHue) {
  const alpha = data && data.a;
  let color;
  if (data && data.hsl) {
    color = tinycolor(data.hsl);
  } else if (data && data.hex && data.hex.length > 0) {
    color = tinycolor(data.hex);
  } else if (data && data.hsv) {
    color = tinycolor(data.hsv);
  } else if (data && data.rgba) {
    color = tinycolor(data.rgba);
  } else if (data && data.rgb) {
    color = tinycolor(data.rgb);
  } else {
    color = tinycolor(data);
  }
  if (color && (color._a === void 0 || color._a === null)) {
    color.setAlpha(alpha || color.getAlpha());
  }
  const hsl = color.toHsl();
  const hsv = color.toHsv();
  if (hsl.s === 0) {
    hsv.h = hsl.h = data.h || data.hsl && data.hsl.h || oldHue || 0;
  }
  return {
    hsl,
    hex: color.toHexString().toUpperCase(),
    hex8: color.toHex8String().toUpperCase(),
    rgba: color.toRgb(),
    hsv,
    oldHue: data.h || oldHue || hsl.h,
    source: data.source,
    a: color.getAlpha()
  };
}
var colorMixin = {
  model: {
    prop: "modelValue",
    event: "update:modelValue"
  },
  props: ["modelValue"],
  data() {
    return {
      val: _colorChange(this.modelValue)
    };
  },
  computed: {
    colors: {
      get() {
        return this.val;
      },
      set(newVal) {
        this.val = newVal;
        this.$emit("update:modelValue", newVal);
      }
    }
  },
  watch: {
    modelValue(newVal) {
      this.val = _colorChange(newVal);
    }
  },
  methods: {
    colorChange(data, oldHue) {
      this.oldHue = this.colors.hsl.h;
      this.colors = _colorChange(data, oldHue || this.oldHue);
    },
    isValidHex(hex) {
      return tinycolor(hex).isValid;
    },
    simpleCheckForValidColor(data) {
      const keysToCheck = ["r", "g", "b", "a", "h", "s", "l", "v"];
      let checked = 0;
      let passed = 0;
      for (let i = 0; i < keysToCheck.length; i++) {
        const letter = keysToCheck[i];
        if (data[letter]) {
          checked++;
          if (!isNaN(data[letter])) {
            passed++;
          }
        }
      }
      if (checked === passed) {
        return data;
      }
    },
    paletteUpperCase(palette) {
      return palette.map((c) => c.toUpperCase());
    },
    isTransparent(color) {
      return tinycolor(color).getAlpha() === 0;
    }
  }
};
var script$3 = {
  name: "editableInput",
  props: {
    label: String,
    labelText: String,
    desc: String,
    value: [String, Number],
    max: Number,
    min: Number,
    arrowOffset: {
      type: Number,
      default: 1
    }
  },
  computed: {
    val: {
      get() {
        return this.value;
      },
      set(v) {
        if (!(this.max === void 0) && +v > this.max) {
          this.$refs.input.value = this.max;
        } else {
          return v;
        }
      }
    },
    labelId() {
      return `input__label__${this.label}__${Math.random().toString().slice(2, 5)}`;
    },
    labelSpanText() {
      return this.labelText || this.label;
    }
  },
  methods: {
    update(e) {
      this.handleChange(e.target.value);
    },
    handleChange(newVal) {
      const data = {};
      data[this.label] = newVal;
      if (data.hex === void 0 && data["#"] === void 0) {
        this.$emit("change", data);
      } else if (newVal.length > 5) {
        this.$emit("change", data);
      }
    },
    handleKeyDown(e) {
      let { val } = this;
      const number = Number(val);
      if (number) {
        const amount = this.arrowOffset || 1;
        if (e.keyCode === 38) {
          val = number + amount;
          this.handleChange(val);
          e.preventDefault();
        }
        if (e.keyCode === 40) {
          val = number - amount;
          this.handleChange(val);
          e.preventDefault();
        }
      }
    }
  }
};
const _hoisted_1$4 = { class: "vc-editable-input" };
const _hoisted_2$4 = ["aria-labelledby"];
const _hoisted_3$4 = ["for", "id"];
const _hoisted_4$3 = { class: "vc-input__desc" };
function render$3(_ctx, _cache, $props, $setup, $data, $options) {
  return openBlock(), createElementBlock("div", _hoisted_1$4, [
    withDirectives(createElementVNode("input", {
      "aria-labelledby": $options.labelId,
      class: "vc-input__input",
      "onUpdate:modelValue": _cache[0] || (_cache[0] = ($event) => $options.val = $event),
      onKeydown: _cache[1] || (_cache[1] = (...args) => $options.handleKeyDown && $options.handleKeyDown(...args)),
      onInput: _cache[2] || (_cache[2] = (...args) => $options.update && $options.update(...args)),
      ref: "input"
    }, null, 40, _hoisted_2$4), [
      [vModelText, $options.val]
    ]),
    createElementVNode("span", {
      for: $props.label,
      class: "vc-input__label",
      id: $options.labelId
    }, toDisplayString($options.labelSpanText), 9, _hoisted_3$4),
    createElementVNode("span", _hoisted_4$3, toDisplayString($props.desc), 1)
  ]);
}
var css_248z$3 = ".vc-editable-input{position:relative}.vc-input__input{border:0;outline:none;padding:0}.vc-input__label{text-transform:capitalize}";
styleInject(css_248z$3);
script$3.render = render$3;
script$3.__file = "src/components/editable-input/editable-input.vue";
script$3.install = install;
var freeGlobal = typeof global == "object" && global && global.Object === Object && global;
const freeGlobal$1 = freeGlobal;
var freeSelf = typeof self == "object" && self && self.Object === Object && self;
var root = freeGlobal$1 || freeSelf || Function("return this")();
const root$1 = root;
var Symbol$1 = root$1.Symbol;
const Symbol$2 = Symbol$1;
var objectProto$1 = Object.prototype;
var hasOwnProperty = objectProto$1.hasOwnProperty;
var nativeObjectToString$1 = objectProto$1.toString;
var symToStringTag$1 = Symbol$2 ? Symbol$2.toStringTag : void 0;
function getRawTag(value) {
  var isOwn = hasOwnProperty.call(value, symToStringTag$1), tag = value[symToStringTag$1];
  try {
    value[symToStringTag$1] = void 0;
    var unmasked = true;
  } catch (e) {
  }
  var result = nativeObjectToString$1.call(value);
  if (unmasked) {
    if (isOwn) {
      value[symToStringTag$1] = tag;
    } else {
      delete value[symToStringTag$1];
    }
  }
  return result;
}
var objectProto = Object.prototype;
var nativeObjectToString = objectProto.toString;
function objectToString(value) {
  return nativeObjectToString.call(value);
}
var nullTag = "[object Null]", undefinedTag = "[object Undefined]";
var symToStringTag = Symbol$2 ? Symbol$2.toStringTag : void 0;
function baseGetTag(value) {
  if (value == null) {
    return value === void 0 ? undefinedTag : nullTag;
  }
  return symToStringTag && symToStringTag in Object(value) ? getRawTag(value) : objectToString(value);
}
function isObjectLike(value) {
  return value != null && typeof value == "object";
}
var symbolTag = "[object Symbol]";
function isSymbol(value) {
  return typeof value == "symbol" || isObjectLike(value) && baseGetTag(value) == symbolTag;
}
var reWhitespace = /\s/;
function trimmedEndIndex(string) {
  var index = string.length;
  while (index-- && reWhitespace.test(string.charAt(index))) {
  }
  return index;
}
var reTrimStart = /^\s+/;
function baseTrim(string) {
  return string ? string.slice(0, trimmedEndIndex(string) + 1).replace(reTrimStart, "") : string;
}
function isObject(value) {
  var type = typeof value;
  return value != null && (type == "object" || type == "function");
}
var NAN = 0 / 0;
var reIsBadHex = /^[-+]0x[0-9a-f]+$/i;
var reIsBinary = /^0b[01]+$/i;
var reIsOctal = /^0o[0-7]+$/i;
var freeParseInt = parseInt;
function toNumber(value) {
  if (typeof value == "number") {
    return value;
  }
  if (isSymbol(value)) {
    return NAN;
  }
  if (isObject(value)) {
    var other = typeof value.valueOf == "function" ? value.valueOf() : value;
    value = isObject(other) ? other + "" : other;
  }
  if (typeof value != "string") {
    return value === 0 ? value : +value;
  }
  value = baseTrim(value);
  var isBinary = reIsBinary.test(value);
  return isBinary || reIsOctal.test(value) ? freeParseInt(value.slice(2), isBinary ? 2 : 8) : reIsBadHex.test(value) ? NAN : +value;
}
var now = function() {
  return root$1.Date.now();
};
const now$1 = now;
var FUNC_ERROR_TEXT$1 = "Expected a function";
var nativeMax = Math.max, nativeMin = Math.min;
function debounce(func, wait, options) {
  var lastArgs, lastThis, maxWait, result, timerId, lastCallTime, lastInvokeTime = 0, leading = false, maxing = false, trailing = true;
  if (typeof func != "function") {
    throw new TypeError(FUNC_ERROR_TEXT$1);
  }
  wait = toNumber(wait) || 0;
  if (isObject(options)) {
    leading = !!options.leading;
    maxing = "maxWait" in options;
    maxWait = maxing ? nativeMax(toNumber(options.maxWait) || 0, wait) : maxWait;
    trailing = "trailing" in options ? !!options.trailing : trailing;
  }
  function invokeFunc(time) {
    var args = lastArgs, thisArg = lastThis;
    lastArgs = lastThis = void 0;
    lastInvokeTime = time;
    result = func.apply(thisArg, args);
    return result;
  }
  function leadingEdge(time) {
    lastInvokeTime = time;
    timerId = setTimeout(timerExpired, wait);
    return leading ? invokeFunc(time) : result;
  }
  function remainingWait(time) {
    var timeSinceLastCall = time - lastCallTime, timeSinceLastInvoke = time - lastInvokeTime, timeWaiting = wait - timeSinceLastCall;
    return maxing ? nativeMin(timeWaiting, maxWait - timeSinceLastInvoke) : timeWaiting;
  }
  function shouldInvoke(time) {
    var timeSinceLastCall = time - lastCallTime, timeSinceLastInvoke = time - lastInvokeTime;
    return lastCallTime === void 0 || timeSinceLastCall >= wait || timeSinceLastCall < 0 || maxing && timeSinceLastInvoke >= maxWait;
  }
  function timerExpired() {
    var time = now$1();
    if (shouldInvoke(time)) {
      return trailingEdge(time);
    }
    timerId = setTimeout(timerExpired, remainingWait(time));
  }
  function trailingEdge(time) {
    timerId = void 0;
    if (trailing && lastArgs) {
      return invokeFunc(time);
    }
    lastArgs = lastThis = void 0;
    return result;
  }
  function cancel() {
    if (timerId !== void 0) {
      clearTimeout(timerId);
    }
    lastInvokeTime = 0;
    lastArgs = lastCallTime = lastThis = timerId = void 0;
  }
  function flush() {
    return timerId === void 0 ? result : trailingEdge(now$1());
  }
  function debounced() {
    var time = now$1(), isInvoking = shouldInvoke(time);
    lastArgs = arguments;
    lastThis = this;
    lastCallTime = time;
    if (isInvoking) {
      if (timerId === void 0) {
        return leadingEdge(lastCallTime);
      }
      if (maxing) {
        clearTimeout(timerId);
        timerId = setTimeout(timerExpired, wait);
        return invokeFunc(lastCallTime);
      }
    }
    if (timerId === void 0) {
      timerId = setTimeout(timerExpired, wait);
    }
    return result;
  }
  debounced.cancel = cancel;
  debounced.flush = flush;
  return debounced;
}
var FUNC_ERROR_TEXT = "Expected a function";
function throttle(func, wait, options) {
  var leading = true, trailing = true;
  if (typeof func != "function") {
    throw new TypeError(FUNC_ERROR_TEXT);
  }
  if (isObject(options)) {
    leading = "leading" in options ? !!options.leading : leading;
    trailing = "trailing" in options ? !!options.trailing : trailing;
  }
  return debounce(func, wait, {
    "leading": leading,
    "maxWait": wait,
    "trailing": trailing
  });
}
function clamp(value, min, max) {
  return min < max ? value < min ? min : value > max ? max : value : value < max ? max : value > min ? min : value;
}
var script$2 = {
  name: "Saturation",
  props: {
    value: Object
  },
  computed: {
    colors() {
      return this.value;
    },
    bgColor() {
      return `hsl(${this.colors.hsv.h}, 100%, 50%)`;
    },
    pointerTop() {
      return `${-(this.colors.hsv.v * 100) + 1 + 100}%`;
    },
    pointerLeft() {
      return `${this.colors.hsv.s * 100}%`;
    }
  },
  methods: {
    throttle: throttle(
      (fn, data) => {
        fn(data);
      },
      20,
      {
        leading: true,
        trailing: false
      }
    ),
    handleChange(e, skip) {
      !skip && e.preventDefault();
      const { container } = this.$refs;
      if (!container) {
        return;
      }
      const containerWidth = container.clientWidth;
      const containerHeight = container.clientHeight;
      const xOffset = container.getBoundingClientRect().left + window.pageXOffset;
      const yOffset = container.getBoundingClientRect().top + window.pageYOffset;
      const pageX = e.pageX || (e.touches ? e.touches[0].pageX : 0);
      const pageY = e.pageY || (e.touches ? e.touches[0].pageY : 0);
      const left = clamp(pageX - xOffset, 0, containerWidth);
      const top = clamp(pageY - yOffset, 0, containerHeight);
      const saturation = left / containerWidth;
      const bright = clamp(-(top / containerHeight) + 1, 0, 1);
      this.throttle(this.onChange, {
        h: this.colors.hsv.h,
        s: saturation,
        v: bright,
        a: this.colors.hsv.a,
        source: "hsva"
      });
    },
    onChange(param) {
      this.$emit("change", param);
    },
    handleMouseDown(e) {
      window.addEventListener("mousemove", this.handleChange);
      window.addEventListener("mouseup", this.handleChange);
      window.addEventListener("mouseup", this.handleMouseUp);
    },
    handleMouseUp(e) {
      this.unbindEventListeners();
    },
    unbindEventListeners() {
      window.removeEventListener("mousemove", this.handleChange);
      window.removeEventListener("mouseup", this.handleChange);
      window.removeEventListener("mouseup", this.handleMouseUp);
    }
  }
};
const _hoisted_1$3 = /* @__PURE__ */ createElementVNode("div", { class: "vc-saturation--white" }, null, -1);
const _hoisted_2$3 = /* @__PURE__ */ createElementVNode("div", { class: "vc-saturation--black" }, null, -1);
const _hoisted_3$3 = /* @__PURE__ */ createElementVNode("div", { class: "vc-saturation-circle" }, null, -1);
const _hoisted_4$2 = [
  _hoisted_3$3
];
function render$2(_ctx, _cache, $props, $setup, $data, $options) {
  return openBlock(), createElementBlock("div", {
    class: "vc-saturation",
    style: normalizeStyle({ background: $options.bgColor }),
    ref: "container",
    onMousedown: _cache[0] || (_cache[0] = (...args) => $options.handleMouseDown && $options.handleMouseDown(...args)),
    onTouchmove: _cache[1] || (_cache[1] = (...args) => $options.handleChange && $options.handleChange(...args)),
    onTouchstart: _cache[2] || (_cache[2] = (...args) => $options.handleChange && $options.handleChange(...args))
  }, [
    _hoisted_1$3,
    _hoisted_2$3,
    createElementVNode("div", {
      class: "vc-saturation-pointer",
      style: normalizeStyle({ top: $options.pointerTop, left: $options.pointerLeft })
    }, _hoisted_4$2, 4)
  ], 36);
}
var css_248z$2 = ".vc-saturation,.vc-saturation--black,.vc-saturation--white{bottom:0;cursor:pointer;left:0;position:absolute;right:0;top:0}.vc-saturation--white{background:linear-gradient(90deg,#fff,hsla(0,0%,100%,0))}.vc-saturation--black{background:linear-gradient(0deg,#000,transparent)}.vc-saturation-pointer{cursor:pointer;position:absolute}.vc-saturation-circle{border-radius:50%;box-shadow:0 0 0 1.5px #fff,inset 0 0 1px 1px rgba(0,0,0,.3),0 0 1px 2px rgba(0,0,0,.4);cursor:head;height:4px;transform:translate(-2px,-2px);width:4px}";
styleInject(css_248z$2);
script$2.render = render$2;
script$2.__file = "src/components/saturation/saturation.vue";
script$2.install = install;
var script$1 = {
  name: "Hue",
  props: {
    value: Object,
    direction: {
      type: String,
      default: "horizontal"
    }
  },
  data() {
    return {
      oldHue: 0,
      pullDirection: ""
    };
  },
  computed: {
    colors() {
      const { h } = this.value.hsl;
      if (h !== 0 && h - this.oldHue > 0)
        this.pullDirection = "right";
      if (h !== 0 && h - this.oldHue < 0)
        this.pullDirection = "left";
      this.oldHue = h;
      return this.value;
    },
    directionClass() {
      return {
        "vc-hue--horizontal": this.direction === "horizontal",
        "vc-hue--vertical": this.direction === "vertical"
      };
    },
    pointerTop() {
      if (this.direction === "vertical") {
        if (this.colors.hsl.h === 0 && this.pullDirection === "right")
          return 0;
        return `${-(this.colors.hsl.h * 100 / 360) + 100}%`;
      }
      return 0;
    },
    pointerLeft() {
      if (this.direction === "vertical") {
        return 0;
      }
      if (this.colors.hsl.h === 0 && this.pullDirection === "right")
        return "100%";
      return `${this.colors.hsl.h * 100 / 360}%`;
    }
  },
  methods: {
    handleChange(e, skip) {
      !skip && e.preventDefault();
      const { container } = this.$refs;
      if (!container) {
        return;
      }
      const containerWidth = container.clientWidth;
      const containerHeight = container.clientHeight;
      const xOffset = container.getBoundingClientRect().left + window.pageXOffset;
      const yOffset = container.getBoundingClientRect().top + window.pageYOffset;
      const pageX = e.pageX || (e.touches ? e.touches[0].pageX : 0);
      const pageY = e.pageY || (e.touches ? e.touches[0].pageY : 0);
      const left = pageX - xOffset;
      const top = pageY - yOffset;
      let h;
      let percent;
      if (this.direction === "vertical") {
        if (top < 0) {
          h = 360;
        } else if (top > containerHeight) {
          h = 0;
        } else {
          percent = -(top * 100 / containerHeight) + 100;
          h = 360 * percent / 100;
        }
        if (this.colors.hsl.h !== h) {
          this.$emit("change", {
            h,
            s: this.colors.hsl.s,
            l: this.colors.hsl.l,
            a: this.colors.hsl.a,
            source: "hsl"
          });
        }
      } else {
        if (left < 0) {
          h = 0;
        } else if (left > containerWidth) {
          h = 360;
        } else {
          percent = left * 100 / containerWidth;
          h = 360 * percent / 100;
        }
        if (this.colors.hsl.h !== h) {
          this.$emit("change", {
            h,
            s: this.colors.hsl.s,
            l: this.colors.hsl.l,
            a: this.colors.hsl.a,
            source: "hsl"
          });
        }
      }
    },
    handleMouseDown(e) {
      this.handleChange(e, true);
      window.addEventListener("mousemove", this.handleChange);
      window.addEventListener("mouseup", this.handleChange);
      window.addEventListener("mouseup", this.handleMouseUp);
    },
    handleMouseUp(e) {
      this.unbindEventListeners();
    },
    unbindEventListeners() {
      window.removeEventListener("mousemove", this.handleChange);
      window.removeEventListener("mouseup", this.handleChange);
      window.removeEventListener("mouseup", this.handleMouseUp);
    }
  }
};
const _hoisted_1$2 = ["aria-valuenow"];
const _hoisted_2$2 = /* @__PURE__ */ createElementVNode("div", { class: "vc-hue-picker" }, null, -1);
const _hoisted_3$2 = [
  _hoisted_2$2
];
function render$1(_ctx, _cache, $props, $setup, $data, $options) {
  return openBlock(), createElementBlock("div", {
    class: normalizeClass(["vc-hue", $options.directionClass])
  }, [
    createElementVNode("div", {
      class: "vc-hue-container",
      role: "slider",
      "aria-valuenow": $options.colors.hsl.h,
      "aria-valuemin": "0",
      "aria-valuemax": "360",
      ref: "container",
      onMousedown: _cache[0] || (_cache[0] = (...args) => $options.handleMouseDown && $options.handleMouseDown(...args)),
      onTouchmove: _cache[1] || (_cache[1] = (...args) => $options.handleChange && $options.handleChange(...args)),
      onTouchstart: _cache[2] || (_cache[2] = (...args) => $options.handleChange && $options.handleChange(...args))
    }, [
      createElementVNode("div", {
        class: "vc-hue-pointer",
        style: normalizeStyle({ top: $options.pointerTop, left: $options.pointerLeft }),
        role: "presentation"
      }, _hoisted_3$2, 4)
    ], 40, _hoisted_1$2)
  ], 2);
}
var css_248z$1 = ".vc-hue{border-radius:2px;bottom:0;left:0;position:absolute;right:0;top:0}.vc-hue--horizontal{background:linear-gradient(90deg,red 0,#ff0 17%,#0f0 33%,#0ff 50%,#00f 67%,#f0f 83%,red)}.vc-hue--vertical{background:linear-gradient(0deg,red 0,#ff0 17%,#0f0 33%,#0ff 50%,#00f 67%,#f0f 83%,red)}.vc-hue-container{cursor:pointer;height:100%;margin:0 2px;position:relative}.vc-hue-pointer{position:absolute;z-index:2}.vc-hue-picker{background:#fff;border-radius:1px;box-shadow:0 0 2px rgba(0,0,0,.6);cursor:pointer;height:8px;margin-top:1px;transform:translateX(-2px);width:4px}";
styleInject(css_248z$1);
script$1.render = render$1;
script$1.__file = "src/components/hue/hue.vue";
script$1.install = install;
const presetColors = [
  "#D0021B",
  "#F5A623",
  "#F8E71C",
  "#8B572A",
  "#7ED321",
  "#417505",
  "#BD10E0",
  "#9013FE",
  "#4A90E2",
  "#50E3C2",
  "#B8E986",
  "#000000",
  "#4A4A4A",
  "#9B9B9B",
  "#FFFFFF",
  "rgba(0,0,0,0)"
];
var script = {
  name: "Sketch",
  mixins: [colorMixin],
  components: {
    saturation: script$2,
    hue: script$1,
    alpha: script$4,
    "ed-in": script$3,
    checkboard: script$5
  },
  props: {
    presetColors: {
      type: Array,
      default() {
        return presetColors;
      }
    },
    disableAlpha: {
      type: Boolean,
      default: false
    },
    disableFields: {
      type: Boolean,
      default: false
    }
  },
  computed: {
    hex() {
      let hex;
      if (this.colors.a < 1) {
        hex = this.colors.hex8;
      } else {
        hex = this.colors.hex;
      }
      return hex.replace("#", "");
    },
    activeColor() {
      const { rgba } = this.colors;
      return `rgba(${[rgba.r, rgba.g, rgba.b, rgba.a].join(",")})`;
    }
  },
  methods: {
    handlePreset(c) {
      this.colorChange(c);
    },
    childChange(data) {
      this.colorChange(data);
    },
    inputChange(data) {
      if (!data) {
        return;
      }
      if (data.hex) {
        this.isValidHex(data.hex) && this.colorChange({
          hex: data.hex,
          source: "hex"
        });
      } else if (data.r || data.g || data.b || data.a) {
        this.colorChange({
          r: data.r || this.colors.rgba.r,
          g: data.g || this.colors.rgba.g,
          b: data.b || this.colors.rgba.b,
          a: data.a || this.colors.rgba.a,
          source: "rgba"
        });
      }
    }
  }
};
const _hoisted_1$1 = { class: "vc-sketch-saturation-wrap" };
const _hoisted_2$1 = { class: "vc-sketch-controls" };
const _hoisted_3$1 = { class: "vc-sketch-sliders" };
const _hoisted_4$1 = { class: "vc-sketch-hue-wrap" };
const _hoisted_5$1 = {
  key: 0,
  class: "vc-sketch-alpha-wrap"
};
const _hoisted_6$1 = { class: "vc-sketch-color-wrap" };
const _hoisted_7$1 = ["aria-label"];
const _hoisted_8$1 = {
  key: 0,
  class: "vc-sketch-field"
};
const _hoisted_9$1 = { class: "vc-sketch-field--double" };
const _hoisted_10$1 = { class: "vc-sketch-field--single" };
const _hoisted_11$1 = { class: "vc-sketch-field--single" };
const _hoisted_12 = { class: "vc-sketch-field--single" };
const _hoisted_13 = {
  key: 0,
  class: "vc-sketch-field--single"
};
const _hoisted_14 = {
  class: "vc-sketch-presets",
  role: "group",
  "aria-label": "A color preset, pick one to set as current color"
};
const _hoisted_15 = ["aria-label", "onClick"];
const _hoisted_16 = ["aria-label", "onClick"];
function render(_ctx, _cache, $props, $setup, $data, $options) {
  const _component_saturation = resolveComponent("saturation");
  const _component_hue = resolveComponent("hue");
  const _component_alpha = resolveComponent("alpha");
  const _component_checkboard = resolveComponent("checkboard");
  const _component_ed_in = resolveComponent("ed-in");
  return openBlock(), createElementBlock("div", {
    role: "application",
    "aria-label": "Sketch color picker",
    class: normalizeClass(["vc-sketch", $props.disableAlpha ? "vc-sketch__disable-alpha" : ""])
  }, [
    createElementVNode("div", _hoisted_1$1, [
      createVNode(_component_saturation, {
        value: _ctx.colors,
        onChange: $options.childChange
      }, null, 8, ["value", "onChange"])
    ]),
    createElementVNode("div", _hoisted_2$1, [
      createElementVNode("div", _hoisted_3$1, [
        createElementVNode("div", _hoisted_4$1, [
          createVNode(_component_hue, {
            value: _ctx.colors,
            onChange: $options.childChange
          }, null, 8, ["value", "onChange"])
        ]),
        !$props.disableAlpha ? (openBlock(), createElementBlock("div", _hoisted_5$1, [
          createVNode(_component_alpha, {
            value: _ctx.colors,
            onChange: $options.childChange
          }, null, 8, ["value", "onChange"])
        ])) : createCommentVNode("v-if", true)
      ]),
      createElementVNode("div", _hoisted_6$1, [
        createElementVNode("div", {
          "aria-label": `Current color is ${$options.activeColor}`,
          class: "vc-sketch-active-color",
          style: normalizeStyle({ background: $options.activeColor })
        }, null, 12, _hoisted_7$1),
        createVNode(_component_checkboard)
      ])
    ]),
    !$props.disableFields ? (openBlock(), createElementBlock("div", _hoisted_8$1, [
      createCommentVNode(" rgba "),
      createElementVNode("div", _hoisted_9$1, [
        createVNode(_component_ed_in, {
          label: "hex",
          value: $options.hex,
          onChange: $options.inputChange
        }, null, 8, ["value", "onChange"])
      ]),
      createElementVNode("div", _hoisted_10$1, [
        createVNode(_component_ed_in, {
          label: "r",
          value: _ctx.colors.rgba.r,
          onChange: $options.inputChange
        }, null, 8, ["value", "onChange"])
      ]),
      createElementVNode("div", _hoisted_11$1, [
        createVNode(_component_ed_in, {
          label: "g",
          value: _ctx.colors.rgba.g,
          onChange: $options.inputChange
        }, null, 8, ["value", "onChange"])
      ]),
      createElementVNode("div", _hoisted_12, [
        createVNode(_component_ed_in, {
          label: "b",
          value: _ctx.colors.rgba.b,
          onChange: $options.inputChange
        }, null, 8, ["value", "onChange"])
      ]),
      !$props.disableAlpha ? (openBlock(), createElementBlock("div", _hoisted_13, [
        createVNode(_component_ed_in, {
          label: "a",
          value: _ctx.colors.a,
          "arrow-offset": 0.01,
          max: 1,
          onChange: $options.inputChange
        }, null, 8, ["value", "arrow-offset", "onChange"])
      ])) : createCommentVNode("v-if", true)
    ])) : createCommentVNode("v-if", true),
    createElementVNode("div", _hoisted_14, [
      (openBlock(true), createElementBlock(Fragment, null, renderList($props.presetColors, (c) => {
        return openBlock(), createElementBlock(Fragment, null, [
          !_ctx.isTransparent(c) ? (openBlock(), createElementBlock("div", {
            key: `!${c}`,
            class: "vc-sketch-presets-color",
            "aria-label": "Color:" + c,
            style: normalizeStyle({ background: c }),
            onClick: ($event) => $options.handlePreset(c)
          }, null, 12, _hoisted_15)) : (openBlock(), createElementBlock("div", {
            key: c,
            "aria-label": "Color:" + c,
            class: "vc-sketch-presets-color",
            onClick: ($event) => $options.handlePreset(c)
          }, [
            createVNode(_component_checkboard)
          ], 8, _hoisted_16))
        ], 64);
      }), 256))
    ])
  ], 2);
}
var css_248z = ".vc-sketch{background:#fff;border-radius:4px;box-shadow:0 0 0 1px rgba(0,0,0,.15),0 8px 16px rgba(0,0,0,.15);box-sizing:initial;padding:10px 10px 0;position:relative;width:200px}.vc-sketch-saturation-wrap{overflow:hidden;padding-bottom:75%;position:relative;width:100%}.vc-sketch-controls{display:flex}.vc-sketch-sliders{flex:1;padding:4px 0}.vc-sketch-sliders .vc-alpha-gradient,.vc-sketch-sliders .vc-hue{border-radius:2px}.vc-sketch-alpha-wrap,.vc-sketch-hue-wrap{height:10px;position:relative}.vc-sketch-alpha-wrap{margin-top:4px;overflow:hidden}.vc-sketch-color-wrap{border-radius:3px;height:24px;margin-left:4px;margin-top:4px;position:relative;width:24px}.vc-sketch-active-color{border-radius:2px;bottom:0;box-shadow:inset 0 0 0 1px rgba(0,0,0,.15),inset 0 0 4px rgba(0,0,0,.25);left:0;position:absolute;right:0;top:0;z-index:2}.vc-sketch-color-wrap .vc-checkerboard{background-size:auto}.vc-sketch-field{display:flex;padding-top:4px}.vc-sketch-field .vc-input__input{border:none;box-shadow:inset 0 0 0 1px #ccc;font-size:10px;padding:4px 0 3px 10%;width:90%}.vc-sketch-field .vc-input__label{color:#222;display:block;font-size:11px;padding-bottom:4px;padding-top:3px;text-align:center;text-transform:capitalize}.vc-sketch-field--single{flex:1;padding-left:6px}.vc-sketch-field--double{flex:2}.vc-sketch-presets{border-top:1px solid #eee;margin-left:-10px;margin-right:-10px;padding-left:10px;padding-top:10px}.vc-sketch-presets-color{cursor:pointer;display:inline-block;height:16px;margin:0 10px 10px 0;overflow:hidden;position:relative;vertical-align:top;width:16px}.vc-sketch-presets-color,.vc-sketch-presets-color .vc-checkerboard{border-radius:3px;box-shadow:inset 0 0 0 1px rgba(0,0,0,.15)}.vc-sketch__disable-alpha .vc-sketch-color-wrap{height:10px}";
styleInject(css_248z);
script.render = render;
script.__file = "src/components/sketch/sketch.vue";
script.install = install;
class GradientError extends Error {
  constructor(message) {
    super(message);
    this.name = "GradientError";
  }
}
const defaultStops = [
  ["#0359b5", 0],
  ["#f6ce01", 1]
];
const COLOR_INDEX$2 = 0;
const POSITION_INDEX$2 = 1;
class Gradient {
  constructor(params = {}) {
    __publicField(this, "_stops", []);
    __publicField(this, "_limit");
    const { stops = defaultStops, limit } = params;
    this._stops = stops;
    this._limit = limit;
  }
  get stops() {
    return this._stops;
  }
  set stops(value) {
    const error = Gradient._stopArrayValidator(value);
    if (error) {
      throw new GradientError(`Wrong stops format, ${error}`);
    }
    this._stops = value;
  }
  get limit() {
    return this._limit;
  }
  addStop(value) {
    if (this._limit && this._stops.length >= this._limit) {
      throw new GradientError("Too many stop points");
    }
    const error = Gradient._stopPointValidator(value);
    if (error) {
      throw new GradientError(`Wrong stop format, ${error}`);
    }
    this.stops.push(value);
  }
  removeStopByIndex(index) {
    if (this._stops.length < 3) {
      throw new GradientError("Can't remove stop point");
    }
    if (this._stops.length <= index) {
      throw new GradientError("Can't remove stop point");
    }
    this._stops.splice(index, 1);
  }
  static _stopPointValidator(value) {
    if (!Array.isArray(value)) {
      return "point must be an array";
    }
    if (value.length !== 2) {
      return "wrong point format";
    }
    const position = value[POSITION_INDEX$2];
    if (typeof position !== "number") {
      return "position must be a number";
    }
    if (position !== Number(position)) {
      return "position must be a number";
    }
    if (position < 0) {
      return "position must be between 0 and 1";
    }
    if (position > 1) {
      return "position must be between 0 and 1";
    }
    const color = new TinyColor(value[COLOR_INDEX$2]);
    if (!color.isValid) {
      return "color is invalid";
    }
    return null;
  }
  static _stopArrayValidator(value) {
    if (!Array.isArray(value)) {
      return "must be an array";
    }
    if (value.length < 2) {
      return "wrong array format";
    }
    return null;
  }
}
const COLOR_INDEX$1 = 0;
const POSITION_INDEX$1 = 1;
class LinearGradient extends Gradient {
  constructor(params = {}) {
    const { angle = 0, stops = void 0, limit = void 0 } = params;
    super({ stops, limit });
    __publicField(this, "_type", "linear");
    __publicField(this, "_angle", 0);
    this._angle = angle;
  }
  get angle() {
    return this._angle;
  }
  set angle(value) {
    const error = LinearGradient._angleValidator(value);
    if (error) {
      throw new GradientError(`Wrong angle value, ${error}`);
    }
    this._angle = value;
  }
  get type() {
    return this._type;
  }
  static _angleValidator(value) {
    if (typeof value !== "number") {
      return "must be a number";
    }
    if (value !== Number(value)) {
      return "must be a number";
    }
    if (value < 0) {
      return "must be between 0 and 360";
    }
    if (value > 360) {
      return "must be between 0 and 360";
    }
    return null;
  }
  toString(colorFormat = "hex8") {
    const stops = this.stops.slice().sort((a, b) => a[POSITION_INDEX$1] - b[POSITION_INDEX$1]).map(
      (stop) => `${tinycolor$1(stop[COLOR_INDEX$1]).toString(colorFormat)} ${(stop[POSITION_INDEX$1] * 100).toFixed()}%`
    ).join(", ");
    return `linear-gradient(${this.angle}deg, ${stops})`;
  }
  toRaw(colorFormat = "hex8") {
    const stops = this.stops.slice().sort((a, b) => a[POSITION_INDEX$1] - b[POSITION_INDEX$1]).map((stop) => {
      stop[COLOR_INDEX$1] = tinycolor$1(stop[COLOR_INDEX$1]).toString(colorFormat);
      return stop;
    });
    return {
      type: this.type,
      angle: this.angle,
      stops,
      limit: this.limit
    };
  }
}
const COLOR_INDEX = 0;
const POSITION_INDEX = 1;
const REMOVE_TRESHOLD = 50;
const _sfc_main = defineComponent({
  components: {
    colorPicker: script
  },
  props: {
    modelValue: {
      type: LinearGradient,
      default: () => new LinearGradient()
    }
  },
  emits: ["update:modelValue"],
  data: () => ({
    currentStopIdx: 0,
    containerBoundingClientRectangle: null
  }),
  computed: {
    angle: {
      get() {
        return this.modelValue.angle;
      },
      set(val) {
        let degrees = parseInt(val, 10) || 0;
        if (degrees < 0) {
          degrees = 0;
        }
        while (degrees > 360) {
          degrees = 360;
        }
        this.emitInput(degrees, this.stops, this.limit);
      }
    },
    stops() {
      return this.modelValue.stops.slice().map((stop) => [...stop]);
    },
    previewStyle() {
      return { background: this.getGradientString(this.angle) };
    },
    stopsPreviewStyle() {
      return { background: this.getGradientString(90) };
    },
    currentColor: {
      get() {
        return this.stops[this.currentStopIdx][COLOR_INDEX];
      },
      set(val) {
        this.stops[this.currentStopIdx][COLOR_INDEX] = val.hex8;
        this.emitInput(this.angle, this.stops, this.limit);
      }
    },
    orderedStops() {
      return this.stops.slice().sort((a, b) => a[POSITION_INDEX] - b[POSITION_INDEX]);
    },
    limit() {
      return this.modelValue.limit;
    }
  },
  beforeUnmount() {
    this.unbindEventListeners();
  },
  methods: {
    emitInput(angle, stops, limit) {
      this.$emit("update:modelValue", new LinearGradient({ angle, stops, limit }));
    },
    getGradientString(angle) {
      const stops = this.orderedStops.map((stop) => `${stop[COLOR_INDEX].toString()} ${stop[POSITION_INDEX] * 100}%`).join(",");
      return `linear-gradient(${angle}deg, ${stops})`;
    },
    setCurrentStopIdx(index) {
      this.currentStopIdx = index;
    },
    stopStyle(index) {
      const stop = this.stops[index];
      return { left: `${stop[POSITION_INDEX] * 100}%`, color: stop[COLOR_INDEX].toString() };
    },
    addStop(event) {
      const target = event.target;
      if (this.limit && this.stops.length >= this.limit) {
        return;
      }
      const position = Math.round(event.offsetX * 100 / target.offsetWidth) / 100;
      const index = this.stops.length;
      this.stops.push([this.currentColor, position]);
      this.setCurrentStopIdx(index);
      this.emitInput(this.angle, this.stops, this.limit);
    },
    removeCurrentStop() {
      this.stops.splice(this.currentStopIdx, 1);
      if (this.currentStopIdx > 0) {
        this.setCurrentStopIdx(this.currentStopIdx - 1);
      }
      this.unbindEventListeners();
      this.emitInput(this.angle, this.stops, this.limit);
    },
    setContainerBoundingClientRectangle() {
      this.containerBoundingClientRectangle = this.$refs.stopsContainer.getBoundingClientRect();
    },
    handleMouseDown(index) {
      this.setCurrentStopIdx(index);
      this.setContainerBoundingClientRectangle();
      window.addEventListener("mousemove", this.handleChange);
      window.addEventListener("mouseup", this.handleMouseUp);
    },
    handleMouseUp() {
      this.unbindEventListeners();
    },
    unbindEventListeners() {
      window.removeEventListener("mousemove", this.handleChange);
      window.removeEventListener("mouseup", this.handleMouseUp);
      window.removeEventListener("touchmove", this.handleChange);
      window.removeEventListener("touchend", this.handleTouchend);
      window.removeEventListener("touchcancel", this.handleTouchend);
    },
    handleTouchstart(index) {
      this.setCurrentStopIdx(index);
      this.setContainerBoundingClientRectangle();
      window.addEventListener("touchmove", this.handleChange, { passive: false });
      window.addEventListener("touchend", this.handleTouchend);
      window.addEventListener("touchcancel", this.handleTouchend);
    },
    handleTouchend() {
      this.unbindEventListeners();
    },
    isTouchEvent(event) {
      return Object.prototype.hasOwnProperty.call(event, "touches");
    },
    getClickPosition(event) {
      if (this.isTouchEvent(event)) {
        return { x: event.touches[0].clientX, y: event.touches[0].clientY };
      } else {
        return { x: event.clientX, y: event.clientY };
      }
    },
    handleChange(event) {
      var _a;
      event.preventDefault();
      event.stopPropagation();
      const { x, y } = this.getClickPosition(event);
      const { bottom, left, width } = (_a = this.containerBoundingClientRectangle) != null ? _a : {
        bottom: 0,
        left: 0,
        width: 0
      };
      if (this.stops.length > 2) {
        const verticalDistance = Math.abs(y - bottom);
        if (verticalDistance > REMOVE_TRESHOLD) {
          this.removeCurrentStop();
          return;
        }
      }
      const leftOffset = x - left;
      const containerWidth = width;
      let position;
      if (leftOffset < 0) {
        position = 0;
      } else if (leftOffset > containerWidth) {
        position = 1;
      } else {
        position = Math.round(leftOffset * 100 / containerWidth) / 100;
      }
      const previousPosition = this.stops[this.currentStopIdx][POSITION_INDEX];
      this.stops[this.currentStopIdx][POSITION_INDEX] = position;
      if (previousPosition != position) {
        this.emitInput(this.angle, this.stops, this.limit);
      }
    }
  }
});
const GradientPicker_vue_vue_type_style_index_0_scoped_96d4eaf7_lang = "";
const _export_sfc = (sfc, props) => {
  const target = sfc.__vccOpts || sfc;
  for (const [key, val] of props) {
    target[key] = val;
  }
  return target;
};
const _withScopeId = (n) => (pushScopeId("data-v-96d4eaf7"), n = n(), popScopeId(), n);
const _hoisted_1 = { class: "vue-gpickr" };
const _hoisted_2 = { class: "vue-gpickr-inner-container" };
const _hoisted_3 = { class: "vue-gpickr-preview-container" };
const _hoisted_4 = {
  ref: "stopsContainer",
  class: "vue-gpickr-stops-container"
};
const _hoisted_5 = { class: "vue-gpickr-stops-preview-container" };
const _hoisted_6 = ["onMousedown", "onTouchstart"];
const _hoisted_7 = { class: "vue-gpickr-controls-container" };
const _hoisted_8 = { class: "vue-gpickr-slider-container" };
const _hoisted_9 = /* @__PURE__ */ _withScopeId(() => /* @__PURE__ */ createElementVNode("div", { class: "label" }, "Angle", -1));
const _hoisted_10 = { class: "vue-gpickr-input-container" };
const _hoisted_11 = /* @__PURE__ */ _withScopeId(() => /* @__PURE__ */ createElementVNode("div", { class: "label" }, "Deg\xB0", -1));
function _sfc_render(_ctx, _cache, $props, $setup, $data, $options) {
  const _component_color_picker = resolveComponent("color-picker");
  return openBlock(), createElementBlock("div", _hoisted_1, [
    createVNode(_component_color_picker, {
      modelValue: _ctx.currentColor,
      "onUpdate:modelValue": _cache[0] || (_cache[0] = ($event) => _ctx.currentColor = $event),
      "preset-colors": null
    }, null, 8, ["modelValue"]),
    createElementVNode("div", _hoisted_2, [
      createElementVNode("div", _hoisted_3, [
        createElementVNode("div", {
          class: "vue-gpickr-preview",
          style: normalizeStyle(_ctx.previewStyle)
        }, null, 4)
      ]),
      createElementVNode("div", _hoisted_4, [
        createElementVNode("div", _hoisted_5, [
          createElementVNode("div", {
            class: "vue-gpickr-stops-preview",
            style: normalizeStyle(_ctx.stopsPreviewStyle),
            onClick: _cache[1] || (_cache[1] = withModifiers(($event) => _ctx.addStop($event), ["stop", "prevent"]))
          }, null, 4)
        ]),
        (openBlock(true), createElementBlock(Fragment, null, renderList(_ctx.stops, (_, index) => {
          return openBlock(), createElementBlock("div", {
            key: index,
            class: normalizeClass(["vue-gpickr-stop", { active: index == _ctx.currentStopIdx }]),
            style: normalizeStyle(_ctx.stopStyle(index)),
            onMousedown: withModifiers(($event) => _ctx.handleMouseDown(index), ["stop"]),
            onTouchstart: withModifiers(($event) => _ctx.handleTouchstart(index), ["stop"])
          }, null, 46, _hoisted_6);
        }), 128))
      ], 512),
      createElementVNode("div", _hoisted_7, [
        createElementVNode("div", _hoisted_8, [
          withDirectives(createElementVNode("input", {
            "onUpdate:modelValue": _cache[2] || (_cache[2] = ($event) => _ctx.angle = $event),
            type: "range",
            min: "0",
            max: "360",
            step: "1"
          }, null, 512), [
            [vModelText, _ctx.angle]
          ]),
          _hoisted_9
        ]),
        createElementVNode("div", _hoisted_10, [
          withDirectives(createElementVNode("input", {
            "onUpdate:modelValue": _cache[3] || (_cache[3] = ($event) => _ctx.angle = $event),
            type: "text"
          }, null, 512), [
            [vModelText, _ctx.angle]
          ]),
          _hoisted_11
        ])
      ])
    ])
  ]);
}
const GradientPicker = /* @__PURE__ */ _export_sfc(_sfc_main, [["render", _sfc_render], ["__scopeId", "data-v-96d4eaf7"]]);
export {
  Gradient,
  GradientPicker,
  LinearGradient
};
