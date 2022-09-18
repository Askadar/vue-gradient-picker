var q = Object.defineProperty;
var z = (e, t, r) => t in e ? q(e, t, { enumerable: !0, configurable: !0, writable: !0, value: r }) : e[t] = r;
var y = (e, t, r) => (z(e, typeof t != "symbol" ? t + "" : t, r), r);
import { Sketch as Y } from "@ckpack/vue-color";
import { defineComponent as Z, resolveComponent as J, openBlock as R, createElementBlock as A, createVNode as K, createElementVNode as d, normalizeStyle as E, withModifiers as C, Fragment as Q, renderList as tt, normalizeClass as et, withDirectives as O, vModelText as P, pushScopeId as rt, popScopeId as nt } from "vue";
function u(e, t) {
  it(e) && (e = "100%");
  var r = st(e);
  return e = t === 360 ? e : Math.min(t, Math.max(0, parseFloat(e))), r && (e = parseInt(String(e * t), 10) / 100), Math.abs(e - t) < 1e-6 ? 1 : (t === 360 ? e = (e < 0 ? e % t + t : e % t) / parseFloat(String(t)) : e = e % t / parseFloat(String(t)), e);
}
function M(e) {
  return Math.min(1, Math.max(0, e));
}
function it(e) {
  return typeof e == "string" && e.indexOf(".") !== -1 && parseFloat(e) === 1;
}
function st(e) {
  return typeof e == "string" && e.indexOf("%") !== -1;
}
function U(e) {
  return e = parseFloat(e), (isNaN(e) || e < 0 || e > 1) && (e = 1), e;
}
function k(e) {
  return e <= 1 ? "".concat(Number(e) * 100, "%") : e;
}
function g(e) {
  return e.length === 1 ? "0" + e : String(e);
}
function at(e, t, r) {
  return {
    r: u(e, 255) * 255,
    g: u(t, 255) * 255,
    b: u(r, 255) * 255
  };
}
function B(e, t, r) {
  e = u(e, 255), t = u(t, 255), r = u(r, 255);
  var n = Math.max(e, t, r), i = Math.min(e, t, r), s = 0, a = 0, o = (n + i) / 2;
  if (n === i)
    a = 0, s = 0;
  else {
    var h = n - i;
    switch (a = o > 0.5 ? h / (2 - n - i) : h / (n + i), n) {
      case e:
        s = (t - r) / h + (t < r ? 6 : 0);
        break;
      case t:
        s = (r - e) / h + 2;
        break;
      case r:
        s = (e - t) / h + 4;
        break;
    }
    s /= 6;
  }
  return { h: s, s: a, l: o };
}
function T(e, t, r) {
  return r < 0 && (r += 1), r > 1 && (r -= 1), r < 1 / 6 ? e + (t - e) * (6 * r) : r < 1 / 2 ? t : r < 2 / 3 ? e + (t - e) * (2 / 3 - r) * 6 : e;
}
function ot(e, t, r) {
  var n, i, s;
  if (e = u(e, 360), t = u(t, 100), r = u(r, 100), t === 0)
    i = r, s = r, n = r;
  else {
    var a = r < 0.5 ? r * (1 + t) : r + t - r * t, o = 2 * r - a;
    n = T(o, a, e + 1 / 3), i = T(o, a, e), s = T(o, a, e - 1 / 3);
  }
  return { r: n * 255, g: i * 255, b: s * 255 };
}
function L(e, t, r) {
  e = u(e, 255), t = u(t, 255), r = u(r, 255);
  var n = Math.max(e, t, r), i = Math.min(e, t, r), s = 0, a = n, o = n - i, h = n === 0 ? 0 : o / n;
  if (n === i)
    s = 0;
  else {
    switch (n) {
      case e:
        s = (t - r) / o + (t < r ? 6 : 0);
        break;
      case t:
        s = (r - e) / o + 2;
        break;
      case r:
        s = (e - t) / o + 4;
        break;
    }
    s /= 6;
  }
  return { h: s, s: h, v: a };
}
function ht(e, t, r) {
  e = u(e, 360) * 6, t = u(t, 100), r = u(r, 100);
  var n = Math.floor(e), i = e - n, s = r * (1 - t), a = r * (1 - i * t), o = r * (1 - (1 - i) * t), h = n % 6, m = [r, a, s, s, o, r][h], x = [o, r, r, a, s, s][h], F = [s, s, o, r, r, a][h];
  return { r: m * 255, g: x * 255, b: F * 255 };
}
function D(e, t, r, n) {
  var i = [
    g(Math.round(e).toString(16)),
    g(Math.round(t).toString(16)),
    g(Math.round(r).toString(16))
  ];
  return n && i[0].startsWith(i[0].charAt(1)) && i[1].startsWith(i[1].charAt(1)) && i[2].startsWith(i[2].charAt(1)) ? i[0].charAt(0) + i[1].charAt(0) + i[2].charAt(0) : i.join("");
}
function ut(e, t, r, n, i) {
  var s = [
    g(Math.round(e).toString(16)),
    g(Math.round(t).toString(16)),
    g(Math.round(r).toString(16)),
    g(ft(n))
  ];
  return i && s[0].startsWith(s[0].charAt(1)) && s[1].startsWith(s[1].charAt(1)) && s[2].startsWith(s[2].charAt(1)) && s[3].startsWith(s[3].charAt(1)) ? s[0].charAt(0) + s[1].charAt(0) + s[2].charAt(0) + s[3].charAt(0) : s.join("");
}
function ft(e) {
  return Math.round(parseFloat(e) * 255).toString(16);
}
function G(e) {
  return f(e) / 255;
}
function f(e) {
  return parseInt(e, 16);
}
function dt(e) {
  return {
    r: e >> 16,
    g: (e & 65280) >> 8,
    b: e & 255
  };
}
var V = {
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
function ct(e) {
  var t = { r: 0, g: 0, b: 0 }, r = 1, n = null, i = null, s = null, a = !1, o = !1;
  return typeof e == "string" && (e = gt(e)), typeof e == "object" && (l(e.r) && l(e.g) && l(e.b) ? (t = at(e.r, e.g, e.b), a = !0, o = String(e.r).substr(-1) === "%" ? "prgb" : "rgb") : l(e.h) && l(e.s) && l(e.v) ? (n = k(e.s), i = k(e.v), t = ht(e.h, n, i), a = !0, o = "hsv") : l(e.h) && l(e.s) && l(e.l) && (n = k(e.s), s = k(e.l), t = ot(e.h, n, s), a = !0, o = "hsl"), Object.prototype.hasOwnProperty.call(e, "a") && (r = e.a)), r = U(r), {
    ok: a,
    format: e.format || o,
    r: Math.min(255, Math.max(t.r, 0)),
    g: Math.min(255, Math.max(t.g, 0)),
    b: Math.min(255, Math.max(t.b, 0)),
    a: r
  };
}
var lt = "[-\\+]?\\d+%?", pt = "[-\\+]?\\d*\\.\\d+%?", p = "(?:".concat(pt, ")|(?:").concat(lt, ")"), H = "[\\s|\\(]+(".concat(p, ")[,|\\s]+(").concat(p, ")[,|\\s]+(").concat(p, ")\\s*\\)?"), $ = "[\\s|\\(]+(".concat(p, ")[,|\\s]+(").concat(p, ")[,|\\s]+(").concat(p, ")[,|\\s]+(").concat(p, ")\\s*\\)?"), c = {
  CSS_UNIT: new RegExp(p),
  rgb: new RegExp("rgb" + H),
  rgba: new RegExp("rgba" + $),
  hsl: new RegExp("hsl" + H),
  hsla: new RegExp("hsla" + $),
  hsv: new RegExp("hsv" + H),
  hsva: new RegExp("hsva" + $),
  hex3: /^#?([0-9a-fA-F]{1})([0-9a-fA-F]{1})([0-9a-fA-F]{1})$/,
  hex6: /^#?([0-9a-fA-F]{2})([0-9a-fA-F]{2})([0-9a-fA-F]{2})$/,
  hex4: /^#?([0-9a-fA-F]{1})([0-9a-fA-F]{1})([0-9a-fA-F]{1})([0-9a-fA-F]{1})$/,
  hex8: /^#?([0-9a-fA-F]{2})([0-9a-fA-F]{2})([0-9a-fA-F]{2})([0-9a-fA-F]{2})$/
};
function gt(e) {
  if (e = e.trim().toLowerCase(), e.length === 0)
    return !1;
  var t = !1;
  if (V[e])
    e = V[e], t = !0;
  else if (e === "transparent")
    return { r: 0, g: 0, b: 0, a: 0, format: "name" };
  var r = c.rgb.exec(e);
  return r ? { r: r[1], g: r[2], b: r[3] } : (r = c.rgba.exec(e), r ? { r: r[1], g: r[2], b: r[3], a: r[4] } : (r = c.hsl.exec(e), r ? { h: r[1], s: r[2], l: r[3] } : (r = c.hsla.exec(e), r ? { h: r[1], s: r[2], l: r[3], a: r[4] } : (r = c.hsv.exec(e), r ? { h: r[1], s: r[2], v: r[3] } : (r = c.hsva.exec(e), r ? { h: r[1], s: r[2], v: r[3], a: r[4] } : (r = c.hex8.exec(e), r ? {
    r: f(r[1]),
    g: f(r[2]),
    b: f(r[3]),
    a: G(r[4]),
    format: t ? "name" : "hex8"
  } : (r = c.hex6.exec(e), r ? {
    r: f(r[1]),
    g: f(r[2]),
    b: f(r[3]),
    format: t ? "name" : "hex"
  } : (r = c.hex4.exec(e), r ? {
    r: f(r[1] + r[1]),
    g: f(r[2] + r[2]),
    b: f(r[3] + r[3]),
    a: G(r[4] + r[4]),
    format: t ? "name" : "hex8"
  } : (r = c.hex3.exec(e), r ? {
    r: f(r[1] + r[1]),
    g: f(r[2] + r[2]),
    b: f(r[3] + r[3]),
    format: t ? "name" : "hex"
  } : !1)))))))));
}
function l(e) {
  return Boolean(c.CSS_UNIT.exec(String(e)));
}
var j = function() {
  function e(t, r) {
    t === void 0 && (t = ""), r === void 0 && (r = {});
    var n;
    if (t instanceof e)
      return t;
    typeof t == "number" && (t = dt(t)), this.originalInput = t;
    var i = ct(t);
    this.originalInput = t, this.r = i.r, this.g = i.g, this.b = i.b, this.a = i.a, this.roundA = Math.round(100 * this.a) / 100, this.format = (n = r.format) !== null && n !== void 0 ? n : i.format, this.gradientType = r.gradientType, this.r < 1 && (this.r = Math.round(this.r)), this.g < 1 && (this.g = Math.round(this.g)), this.b < 1 && (this.b = Math.round(this.b)), this.isValid = i.ok;
  }
  return e.prototype.isDark = function() {
    return this.getBrightness() < 128;
  }, e.prototype.isLight = function() {
    return !this.isDark();
  }, e.prototype.getBrightness = function() {
    var t = this.toRgb();
    return (t.r * 299 + t.g * 587 + t.b * 114) / 1e3;
  }, e.prototype.getLuminance = function() {
    var t = this.toRgb(), r, n, i, s = t.r / 255, a = t.g / 255, o = t.b / 255;
    return s <= 0.03928 ? r = s / 12.92 : r = Math.pow((s + 0.055) / 1.055, 2.4), a <= 0.03928 ? n = a / 12.92 : n = Math.pow((a + 0.055) / 1.055, 2.4), o <= 0.03928 ? i = o / 12.92 : i = Math.pow((o + 0.055) / 1.055, 2.4), 0.2126 * r + 0.7152 * n + 0.0722 * i;
  }, e.prototype.getAlpha = function() {
    return this.a;
  }, e.prototype.setAlpha = function(t) {
    return this.a = U(t), this.roundA = Math.round(100 * this.a) / 100, this;
  }, e.prototype.toHsv = function() {
    var t = L(this.r, this.g, this.b);
    return { h: t.h * 360, s: t.s, v: t.v, a: this.a };
  }, e.prototype.toHsvString = function() {
    var t = L(this.r, this.g, this.b), r = Math.round(t.h * 360), n = Math.round(t.s * 100), i = Math.round(t.v * 100);
    return this.a === 1 ? "hsv(".concat(r, ", ").concat(n, "%, ").concat(i, "%)") : "hsva(".concat(r, ", ").concat(n, "%, ").concat(i, "%, ").concat(this.roundA, ")");
  }, e.prototype.toHsl = function() {
    var t = B(this.r, this.g, this.b);
    return { h: t.h * 360, s: t.s, l: t.l, a: this.a };
  }, e.prototype.toHslString = function() {
    var t = B(this.r, this.g, this.b), r = Math.round(t.h * 360), n = Math.round(t.s * 100), i = Math.round(t.l * 100);
    return this.a === 1 ? "hsl(".concat(r, ", ").concat(n, "%, ").concat(i, "%)") : "hsla(".concat(r, ", ").concat(n, "%, ").concat(i, "%, ").concat(this.roundA, ")");
  }, e.prototype.toHex = function(t) {
    return t === void 0 && (t = !1), D(this.r, this.g, this.b, t);
  }, e.prototype.toHexString = function(t) {
    return t === void 0 && (t = !1), "#" + this.toHex(t);
  }, e.prototype.toHex8 = function(t) {
    return t === void 0 && (t = !1), ut(this.r, this.g, this.b, this.a, t);
  }, e.prototype.toHex8String = function(t) {
    return t === void 0 && (t = !1), "#" + this.toHex8(t);
  }, e.prototype.toRgb = function() {
    return {
      r: Math.round(this.r),
      g: Math.round(this.g),
      b: Math.round(this.b),
      a: this.a
    };
  }, e.prototype.toRgbString = function() {
    var t = Math.round(this.r), r = Math.round(this.g), n = Math.round(this.b);
    return this.a === 1 ? "rgb(".concat(t, ", ").concat(r, ", ").concat(n, ")") : "rgba(".concat(t, ", ").concat(r, ", ").concat(n, ", ").concat(this.roundA, ")");
  }, e.prototype.toPercentageRgb = function() {
    var t = function(r) {
      return "".concat(Math.round(u(r, 255) * 100), "%");
    };
    return {
      r: t(this.r),
      g: t(this.g),
      b: t(this.b),
      a: this.a
    };
  }, e.prototype.toPercentageRgbString = function() {
    var t = function(r) {
      return Math.round(u(r, 255) * 100);
    };
    return this.a === 1 ? "rgb(".concat(t(this.r), "%, ").concat(t(this.g), "%, ").concat(t(this.b), "%)") : "rgba(".concat(t(this.r), "%, ").concat(t(this.g), "%, ").concat(t(this.b), "%, ").concat(this.roundA, ")");
  }, e.prototype.toName = function() {
    if (this.a === 0)
      return "transparent";
    if (this.a < 1)
      return !1;
    for (var t = "#" + D(this.r, this.g, this.b, !1), r = 0, n = Object.entries(V); r < n.length; r++) {
      var i = n[r], s = i[0], a = i[1];
      if (t === a)
        return s;
    }
    return !1;
  }, e.prototype.toString = function(t) {
    var r = Boolean(t);
    t = t != null ? t : this.format;
    var n = !1, i = this.a < 1 && this.a >= 0, s = !r && i && (t.startsWith("hex") || t === "name");
    return s ? t === "name" && this.a === 0 ? this.toName() : this.toRgbString() : (t === "rgb" && (n = this.toRgbString()), t === "prgb" && (n = this.toPercentageRgbString()), (t === "hex" || t === "hex6") && (n = this.toHexString()), t === "hex3" && (n = this.toHexString(!0)), t === "hex4" && (n = this.toHex8String(!0)), t === "hex8" && (n = this.toHex8String()), t === "name" && (n = this.toName()), t === "hsl" && (n = this.toHslString()), t === "hsv" && (n = this.toHsvString()), n || this.toHexString());
  }, e.prototype.toNumber = function() {
    return (Math.round(this.r) << 16) + (Math.round(this.g) << 8) + Math.round(this.b);
  }, e.prototype.clone = function() {
    return new e(this.toString());
  }, e.prototype.lighten = function(t) {
    t === void 0 && (t = 10);
    var r = this.toHsl();
    return r.l += t / 100, r.l = M(r.l), new e(r);
  }, e.prototype.brighten = function(t) {
    t === void 0 && (t = 10);
    var r = this.toRgb();
    return r.r = Math.max(0, Math.min(255, r.r - Math.round(255 * -(t / 100)))), r.g = Math.max(0, Math.min(255, r.g - Math.round(255 * -(t / 100)))), r.b = Math.max(0, Math.min(255, r.b - Math.round(255 * -(t / 100)))), new e(r);
  }, e.prototype.darken = function(t) {
    t === void 0 && (t = 10);
    var r = this.toHsl();
    return r.l -= t / 100, r.l = M(r.l), new e(r);
  }, e.prototype.tint = function(t) {
    return t === void 0 && (t = 10), this.mix("white", t);
  }, e.prototype.shade = function(t) {
    return t === void 0 && (t = 10), this.mix("black", t);
  }, e.prototype.desaturate = function(t) {
    t === void 0 && (t = 10);
    var r = this.toHsl();
    return r.s -= t / 100, r.s = M(r.s), new e(r);
  }, e.prototype.saturate = function(t) {
    t === void 0 && (t = 10);
    var r = this.toHsl();
    return r.s += t / 100, r.s = M(r.s), new e(r);
  }, e.prototype.greyscale = function() {
    return this.desaturate(100);
  }, e.prototype.spin = function(t) {
    var r = this.toHsl(), n = (r.h + t) % 360;
    return r.h = n < 0 ? 360 + n : n, new e(r);
  }, e.prototype.mix = function(t, r) {
    r === void 0 && (r = 50);
    var n = this.toRgb(), i = new e(t).toRgb(), s = r / 100, a = {
      r: (i.r - n.r) * s + n.r,
      g: (i.g - n.g) * s + n.g,
      b: (i.b - n.b) * s + n.b,
      a: (i.a - n.a) * s + n.a
    };
    return new e(a);
  }, e.prototype.analogous = function(t, r) {
    t === void 0 && (t = 6), r === void 0 && (r = 30);
    var n = this.toHsl(), i = 360 / r, s = [this];
    for (n.h = (n.h - (i * t >> 1) + 720) % 360; --t; )
      n.h = (n.h + i) % 360, s.push(new e(n));
    return s;
  }, e.prototype.complement = function() {
    var t = this.toHsl();
    return t.h = (t.h + 180) % 360, new e(t);
  }, e.prototype.monochromatic = function(t) {
    t === void 0 && (t = 6);
    for (var r = this.toHsv(), n = r.h, i = r.s, s = r.v, a = [], o = 1 / t; t--; )
      a.push(new e({ h: n, s: i, v: s })), s = (s + o) % 1;
    return a;
  }, e.prototype.splitcomplement = function() {
    var t = this.toHsl(), r = t.h;
    return [
      this,
      new e({ h: (r + 72) % 360, s: t.s, l: t.l }),
      new e({ h: (r + 216) % 360, s: t.s, l: t.l })
    ];
  }, e.prototype.onBackground = function(t) {
    var r = this.toRgb(), n = new e(t).toRgb();
    return new e({
      r: n.r + (r.r - n.r) * r.a,
      g: n.g + (r.g - n.g) * r.a,
      b: n.b + (r.b - n.b) * r.a
    });
  }, e.prototype.triad = function() {
    return this.polyad(3);
  }, e.prototype.tetrad = function() {
    return this.polyad(4);
  }, e.prototype.polyad = function(t) {
    for (var r = this.toHsl(), n = r.h, i = [this], s = 360 / t, a = 1; a < t; a++)
      i.push(new e({ h: (n + a * s) % 360, s: r.s, l: r.l }));
    return i;
  }, e.prototype.equals = function(t) {
    return this.toRgbString() === new e(t).toRgbString();
  }, e;
}();
function W(e, t) {
  return e === void 0 && (e = ""), t === void 0 && (t = {}), new j(e, t);
}
class b extends Error {
  constructor(t) {
    super(t), this.name = "GradientError";
  }
}
const vt = [
  ["#0359b5", 0],
  ["#f6ce01", 1]
], bt = 0, mt = 1;
class I {
  constructor(t = {}) {
    y(this, "_stops", []);
    y(this, "_limit");
    const { stops: r = vt, limit: n } = t;
    this._stops = r, this._limit = n;
  }
  get stops() {
    return this._stops;
  }
  set stops(t) {
    const r = I._stopArrayValidator(t);
    if (r)
      throw new b(`Wrong stops format, ${r}`);
    this._stops = t;
  }
  get limit() {
    return this._limit;
  }
  addStop(t) {
    if (this._limit && this._stops.length >= this._limit)
      throw new b("Too many stop points");
    const r = I._stopPointValidator(t);
    if (r)
      throw new b(`Wrong stop format, ${r}`);
    this.stops.push(t);
  }
  removeStopByIndex(t) {
    if (this._stops.length < 3)
      throw new b("Can't remove stop point");
    if (this._stops.length <= t)
      throw new b("Can't remove stop point");
    this._stops.splice(t, 1);
  }
  static _stopPointValidator(t) {
    if (!Array.isArray(t))
      return "point must be an array";
    if (t.length !== 2)
      return "wrong point format";
    const r = t[mt];
    return typeof r != "number" || r !== Number(r) ? "position must be a number" : r < 0 || r > 1 ? "position must be between 0 and 1" : new j(t[bt]).isValid ? null : "color is invalid";
  }
  static _stopArrayValidator(t) {
    return Array.isArray(t) ? t.length < 2 ? "wrong array format" : null : "must be an array";
  }
}
const N = 0, w = 1;
class S extends I {
  constructor(r = {}) {
    const { angle: n = 0, stops: i = void 0, limit: s = void 0 } = r;
    super({ stops: i, limit: s });
    y(this, "_type", "linear");
    y(this, "_angle", 0);
    this._angle = n;
  }
  get angle() {
    return this._angle;
  }
  set angle(r) {
    const n = S._angleValidator(r);
    if (n)
      throw new b(`Wrong angle value, ${n}`);
    this._angle = r;
  }
  get type() {
    return this._type;
  }
  static _angleValidator(r) {
    return typeof r != "number" || r !== Number(r) ? "must be a number" : r < 0 || r > 360 ? "must be between 0 and 360" : null;
  }
  toString(r = "hex8") {
    const n = this.stops.slice().sort((i, s) => i[w] - s[w]).map(
      (i) => `${W(i[N]).toString(r)} ${(i[w] * 100).toFixed()}%`
    ).join(", ");
    return `linear-gradient(${this.angle}deg, ${n})`;
  }
  toRaw(r = "hex8") {
    const n = this.stops.slice().sort((i, s) => i[w] - s[w]).map((i) => (i[N] = W(i[N]).toString(r), i));
    return {
      type: this.type,
      angle: this.angle,
      stops: n,
      limit: this.limit
    };
  }
}
const _ = 0, v = 1, yt = 50, wt = Z({
  components: {
    colorPicker: Y
  },
  props: {
    modelValue: {
      type: S,
      default: () => new S()
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
      set(e) {
        let t = parseInt(e, 10) || 0;
        for (t < 0 && (t = 0); t > 360; )
          t = 360;
        this.emitInput(t, this.stops, this.limit);
      }
    },
    stops() {
      return this.modelValue.stops.slice().map((e) => [...e]);
    },
    previewStyle() {
      return { background: this.getGradientString(this.angle) };
    },
    stopsPreviewStyle() {
      return { background: this.getGradientString(90) };
    },
    currentColor: {
      get() {
        return this.stops[this.currentStopIdx][_];
      },
      set(e) {
        console.log("weird type", e), this.stops[this.currentStopIdx][_] = e.hex8, this.emitInput(this.angle, this.stops, this.limit);
      }
    },
    orderedStops() {
      return this.stops.slice().sort((e, t) => e[v] - t[v]);
    },
    limit() {
      return this.modelValue.limit;
    }
  },
  beforeUnmount() {
    this.unbindEventListeners();
  },
  methods: {
    emitInput(e, t, r) {
      this.$emit("update:modelValue", new S({ angle: e, stops: t, limit: r }));
    },
    getGradientString(e) {
      const t = this.orderedStops.map((r) => `${r[_].toString()} ${r[v] * 100}%`).join(",");
      return `linear-gradient(${e}deg, ${t})`;
    },
    setCurrentStopIdx(e) {
      this.currentStopIdx = e;
    },
    stopStyle(e) {
      const t = this.stops[e];
      return { left: `${t[v] * 100}%`, color: t[_].toString() };
    },
    addStop(e) {
      const t = e.target;
      if (this.limit && this.stops.length >= this.limit)
        return;
      const r = Math.round(e.offsetX * 100 / t.offsetWidth) / 100, n = this.stops.length;
      this.stops.push([this.currentColor, r]), this.setCurrentStopIdx(n), this.emitInput(this.angle, this.stops, this.limit);
    },
    removeCurrentStop() {
      this.stops.splice(this.currentStopIdx, 1), this.currentStopIdx > 0 && this.setCurrentStopIdx(this.currentStopIdx - 1), this.unbindEventListeners(), this.emitInput(this.angle, this.stops, this.limit);
    },
    setContainerBoundingClientRectangle() {
      this.containerBoundingClientRectangle = this.$refs.stopsContainer.getBoundingClientRect();
    },
    handleMouseDown(e) {
      this.setCurrentStopIdx(e), this.setContainerBoundingClientRectangle(), window.addEventListener("mousemove", this.handleChange), window.addEventListener("mouseup", this.handleMouseUp);
    },
    handleMouseUp() {
      this.unbindEventListeners();
    },
    unbindEventListeners() {
      window.removeEventListener("mousemove", this.handleChange), window.removeEventListener("mouseup", this.handleMouseUp), window.removeEventListener("touchmove", this.handleChange), window.removeEventListener("touchend", this.handleTouchend), window.removeEventListener("touchcancel", this.handleTouchend);
    },
    handleTouchstart(e) {
      this.setCurrentStopIdx(e), this.setContainerBoundingClientRectangle(), window.addEventListener("touchmove", this.handleChange, { passive: !1 }), window.addEventListener("touchend", this.handleTouchend), window.addEventListener("touchcancel", this.handleTouchend);
    },
    handleTouchend() {
      this.unbindEventListeners();
    },
    getClickPosition(e) {
      return e instanceof TouchEvent ? { x: e.touches[0].clientX, y: e.touches[0].clientY } : { x: e.clientX, y: e.clientY };
    },
    handleChange(e) {
      var x;
      e.preventDefault(), e.stopPropagation();
      const { x: t, y: r } = this.getClickPosition(e), { bottom: n, left: i, width: s } = (x = this.containerBoundingClientRectangle) != null ? x : {
        bottom: 0,
        left: 0,
        width: 0
      };
      if (this.stops.length > 2 && Math.abs(r - n) > yt) {
        this.removeCurrentStop();
        return;
      }
      const a = t - i, o = s;
      let h;
      a < 0 ? h = 0 : a > o ? h = 1 : h = Math.round(a * 100 / o) / 100;
      const m = this.stops[this.currentStopIdx][v];
      this.stops[this.currentStopIdx][v] = h, m != h && this.emitInput(this.angle, this.stops, this.limit);
    }
  }
});
const St = (e, t) => {
  const r = e.__vccOpts || e;
  for (const [n, i] of t)
    r[n] = i;
  return r;
}, X = (e) => (rt("data-v-01ddcd79"), e = e(), nt(), e), xt = { class: "vue-gpickr" }, Mt = { class: "vue-gpickr-inner-container" }, kt = { class: "vue-gpickr-preview-container" }, _t = {
  ref: "stopsContainer",
  class: "vue-gpickr-stops-container"
}, It = { class: "vue-gpickr-stops-preview-container" }, Rt = ["onMousedown", "onTouchstart"], At = { class: "vue-gpickr-controls-container" }, Et = { class: "vue-gpickr-slider-container" }, Ct = /* @__PURE__ */ X(() => /* @__PURE__ */ d("div", { class: "label" }, "Angle", -1)), Tt = { class: "vue-gpickr-input-container" }, Ht = /* @__PURE__ */ X(() => /* @__PURE__ */ d("div", { class: "label" }, "Deg\xB0", -1));
function $t(e, t, r, n, i, s) {
  const a = J("color-picker");
  return R(), A("div", xt, [
    K(a, {
      modelValue: e.currentColor,
      "onUpdate:modelValue": t[0] || (t[0] = (o) => e.currentColor = o),
      "preset-colors": null
    }, null, 8, ["modelValue"]),
    d("div", Mt, [
      d("div", kt, [
        d("div", {
          class: "vue-gpickr-preview",
          style: E(e.previewStyle)
        }, null, 4)
      ]),
      d("div", _t, [
        d("div", It, [
          d("div", {
            class: "vue-gpickr-stops-preview",
            style: E(e.stopsPreviewStyle),
            onClick: t[1] || (t[1] = C((o) => e.addStop(o), ["stop", "prevent"]))
          }, null, 4)
        ]),
        (R(!0), A(Q, null, tt(e.stops, (o, h) => (R(), A("div", {
          key: h,
          class: et(["vue-gpickr-stop", { active: h == e.currentStopIdx }]),
          style: E(e.stopStyle(h)),
          onMousedown: C((m) => e.handleMouseDown(h), ["stop"]),
          onTouchstart: C((m) => e.handleTouchstart(h), ["stop"])
        }, null, 46, Rt))), 128))
      ], 512),
      d("div", At, [
        d("div", Et, [
          O(d("input", {
            "onUpdate:modelValue": t[2] || (t[2] = (o) => e.angle = o),
            type: "range",
            min: "0",
            max: "360",
            step: "1"
          }, null, 512), [
            [P, e.angle]
          ]),
          Ct
        ]),
        d("div", Tt, [
          O(d("input", {
            "onUpdate:modelValue": t[3] || (t[3] = (o) => e.angle = o),
            type: "text"
          }, null, 512), [
            [P, e.angle]
          ]),
          Ht
        ])
      ])
    ])
  ]);
}
const Ot = /* @__PURE__ */ St(wt, [["render", $t], ["__scopeId", "data-v-01ddcd79"]]);
export {
  Ot as GradientPicker,
  S as LinearGradient
};
