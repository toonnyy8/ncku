(() => {
  var __defProp = Object.defineProperty;
  var __export = (target, all) => {
    for (var name in all)
      __defProp(target, name, {get: all[name], enumerable: true});
  };
  var __toBinary = false ? (base64) => new Uint8Array(Buffer.from(base64, "base64")) : /* @__PURE__ */ (() => {
    var table = new Uint8Array(128);
    for (var i = 0; i < 64; i++)
      table[i < 26 ? i + 65 : i < 52 ? i + 71 : i < 62 ? i - 4 : i * 4 - 205] = i;
    return (base64) => {
      var n = base64.length, bytes = new Uint8Array((n - (base64[n - 1] == "=") - (base64[n - 2] == "=")) * 3 / 4 | 0);
      for (var i2 = 0, j = 0; i2 < n; ) {
        var c0 = table[base64.charCodeAt(i2++)], c1 = table[base64.charCodeAt(i2++)];
        var c2 = table[base64.charCodeAt(i2++)], c3 = table[base64.charCodeAt(i2++)];
        bytes[j++] = c0 << 2 | c1 >> 4;
        bytes[j++] = c1 << 4 | c2 >> 2;
        bytes[j++] = c2 << 6 | c3;
      }
      return bytes;
    };
  })();

  // node_modules/gl-matrix/esm/common.js
  var EPSILON = 1e-6;
  var ARRAY_TYPE = typeof Float32Array !== "undefined" ? Float32Array : Array;
  var RANDOM = Math.random;
  var degree = Math.PI / 180;
  if (!Math.hypot)
    Math.hypot = function() {
      var y = 0, i = arguments.length;
      while (i--) {
        y += arguments[i] * arguments[i];
      }
      return Math.sqrt(y);
    };

  // node_modules/gl-matrix/esm/mat3.js
  function create() {
    var out = new ARRAY_TYPE(9);
    if (ARRAY_TYPE != Float32Array) {
      out[1] = 0;
      out[2] = 0;
      out[3] = 0;
      out[5] = 0;
      out[6] = 0;
      out[7] = 0;
    }
    out[0] = 1;
    out[4] = 1;
    out[8] = 1;
    return out;
  }

  // node_modules/gl-matrix/esm/mat4.js
  var mat4_exports = {};
  __export(mat4_exports, {
    add: () => add,
    adjoint: () => adjoint,
    clone: () => clone,
    copy: () => copy,
    create: () => create2,
    determinant: () => determinant,
    equals: () => equals,
    exactEquals: () => exactEquals,
    frob: () => frob,
    fromQuat: () => fromQuat,
    fromQuat2: () => fromQuat2,
    fromRotation: () => fromRotation,
    fromRotationTranslation: () => fromRotationTranslation,
    fromRotationTranslationScale: () => fromRotationTranslationScale,
    fromRotationTranslationScaleOrigin: () => fromRotationTranslationScaleOrigin,
    fromScaling: () => fromScaling,
    fromTranslation: () => fromTranslation,
    fromValues: () => fromValues,
    fromXRotation: () => fromXRotation,
    fromYRotation: () => fromYRotation,
    fromZRotation: () => fromZRotation,
    frustum: () => frustum,
    getRotation: () => getRotation,
    getScaling: () => getScaling,
    getTranslation: () => getTranslation,
    identity: () => identity,
    invert: () => invert,
    lookAt: () => lookAt,
    mul: () => mul,
    multiply: () => multiply,
    multiplyScalar: () => multiplyScalar,
    multiplyScalarAndAdd: () => multiplyScalarAndAdd,
    ortho: () => ortho,
    perspective: () => perspective,
    perspectiveFromFieldOfView: () => perspectiveFromFieldOfView,
    rotate: () => rotate,
    rotateX: () => rotateX,
    rotateY: () => rotateY,
    rotateZ: () => rotateZ,
    scale: () => scale,
    set: () => set,
    str: () => str,
    sub: () => sub,
    subtract: () => subtract,
    targetTo: () => targetTo,
    translate: () => translate,
    transpose: () => transpose
  });
  function create2() {
    var out = new ARRAY_TYPE(16);
    if (ARRAY_TYPE != Float32Array) {
      out[1] = 0;
      out[2] = 0;
      out[3] = 0;
      out[4] = 0;
      out[6] = 0;
      out[7] = 0;
      out[8] = 0;
      out[9] = 0;
      out[11] = 0;
      out[12] = 0;
      out[13] = 0;
      out[14] = 0;
    }
    out[0] = 1;
    out[5] = 1;
    out[10] = 1;
    out[15] = 1;
    return out;
  }
  function clone(a) {
    var out = new ARRAY_TYPE(16);
    out[0] = a[0];
    out[1] = a[1];
    out[2] = a[2];
    out[3] = a[3];
    out[4] = a[4];
    out[5] = a[5];
    out[6] = a[6];
    out[7] = a[7];
    out[8] = a[8];
    out[9] = a[9];
    out[10] = a[10];
    out[11] = a[11];
    out[12] = a[12];
    out[13] = a[13];
    out[14] = a[14];
    out[15] = a[15];
    return out;
  }
  function copy(out, a) {
    out[0] = a[0];
    out[1] = a[1];
    out[2] = a[2];
    out[3] = a[3];
    out[4] = a[4];
    out[5] = a[5];
    out[6] = a[6];
    out[7] = a[7];
    out[8] = a[8];
    out[9] = a[9];
    out[10] = a[10];
    out[11] = a[11];
    out[12] = a[12];
    out[13] = a[13];
    out[14] = a[14];
    out[15] = a[15];
    return out;
  }
  function fromValues(m00, m01, m02, m03, m10, m11, m12, m13, m20, m21, m22, m23, m30, m31, m32, m33) {
    var out = new ARRAY_TYPE(16);
    out[0] = m00;
    out[1] = m01;
    out[2] = m02;
    out[3] = m03;
    out[4] = m10;
    out[5] = m11;
    out[6] = m12;
    out[7] = m13;
    out[8] = m20;
    out[9] = m21;
    out[10] = m22;
    out[11] = m23;
    out[12] = m30;
    out[13] = m31;
    out[14] = m32;
    out[15] = m33;
    return out;
  }
  function set(out, m00, m01, m02, m03, m10, m11, m12, m13, m20, m21, m22, m23, m30, m31, m32, m33) {
    out[0] = m00;
    out[1] = m01;
    out[2] = m02;
    out[3] = m03;
    out[4] = m10;
    out[5] = m11;
    out[6] = m12;
    out[7] = m13;
    out[8] = m20;
    out[9] = m21;
    out[10] = m22;
    out[11] = m23;
    out[12] = m30;
    out[13] = m31;
    out[14] = m32;
    out[15] = m33;
    return out;
  }
  function identity(out) {
    out[0] = 1;
    out[1] = 0;
    out[2] = 0;
    out[3] = 0;
    out[4] = 0;
    out[5] = 1;
    out[6] = 0;
    out[7] = 0;
    out[8] = 0;
    out[9] = 0;
    out[10] = 1;
    out[11] = 0;
    out[12] = 0;
    out[13] = 0;
    out[14] = 0;
    out[15] = 1;
    return out;
  }
  function transpose(out, a) {
    if (out === a) {
      var a01 = a[1], a02 = a[2], a03 = a[3];
      var a12 = a[6], a13 = a[7];
      var a23 = a[11];
      out[1] = a[4];
      out[2] = a[8];
      out[3] = a[12];
      out[4] = a01;
      out[6] = a[9];
      out[7] = a[13];
      out[8] = a02;
      out[9] = a12;
      out[11] = a[14];
      out[12] = a03;
      out[13] = a13;
      out[14] = a23;
    } else {
      out[0] = a[0];
      out[1] = a[4];
      out[2] = a[8];
      out[3] = a[12];
      out[4] = a[1];
      out[5] = a[5];
      out[6] = a[9];
      out[7] = a[13];
      out[8] = a[2];
      out[9] = a[6];
      out[10] = a[10];
      out[11] = a[14];
      out[12] = a[3];
      out[13] = a[7];
      out[14] = a[11];
      out[15] = a[15];
    }
    return out;
  }
  function invert(out, a) {
    var a00 = a[0], a01 = a[1], a02 = a[2], a03 = a[3];
    var a10 = a[4], a11 = a[5], a12 = a[6], a13 = a[7];
    var a20 = a[8], a21 = a[9], a22 = a[10], a23 = a[11];
    var a30 = a[12], a31 = a[13], a32 = a[14], a33 = a[15];
    var b00 = a00 * a11 - a01 * a10;
    var b01 = a00 * a12 - a02 * a10;
    var b02 = a00 * a13 - a03 * a10;
    var b03 = a01 * a12 - a02 * a11;
    var b04 = a01 * a13 - a03 * a11;
    var b05 = a02 * a13 - a03 * a12;
    var b06 = a20 * a31 - a21 * a30;
    var b07 = a20 * a32 - a22 * a30;
    var b08 = a20 * a33 - a23 * a30;
    var b09 = a21 * a32 - a22 * a31;
    var b10 = a21 * a33 - a23 * a31;
    var b11 = a22 * a33 - a23 * a32;
    var det = b00 * b11 - b01 * b10 + b02 * b09 + b03 * b08 - b04 * b07 + b05 * b06;
    if (!det) {
      return null;
    }
    det = 1 / det;
    out[0] = (a11 * b11 - a12 * b10 + a13 * b09) * det;
    out[1] = (a02 * b10 - a01 * b11 - a03 * b09) * det;
    out[2] = (a31 * b05 - a32 * b04 + a33 * b03) * det;
    out[3] = (a22 * b04 - a21 * b05 - a23 * b03) * det;
    out[4] = (a12 * b08 - a10 * b11 - a13 * b07) * det;
    out[5] = (a00 * b11 - a02 * b08 + a03 * b07) * det;
    out[6] = (a32 * b02 - a30 * b05 - a33 * b01) * det;
    out[7] = (a20 * b05 - a22 * b02 + a23 * b01) * det;
    out[8] = (a10 * b10 - a11 * b08 + a13 * b06) * det;
    out[9] = (a01 * b08 - a00 * b10 - a03 * b06) * det;
    out[10] = (a30 * b04 - a31 * b02 + a33 * b00) * det;
    out[11] = (a21 * b02 - a20 * b04 - a23 * b00) * det;
    out[12] = (a11 * b07 - a10 * b09 - a12 * b06) * det;
    out[13] = (a00 * b09 - a01 * b07 + a02 * b06) * det;
    out[14] = (a31 * b01 - a30 * b03 - a32 * b00) * det;
    out[15] = (a20 * b03 - a21 * b01 + a22 * b00) * det;
    return out;
  }
  function adjoint(out, a) {
    var a00 = a[0], a01 = a[1], a02 = a[2], a03 = a[3];
    var a10 = a[4], a11 = a[5], a12 = a[6], a13 = a[7];
    var a20 = a[8], a21 = a[9], a22 = a[10], a23 = a[11];
    var a30 = a[12], a31 = a[13], a32 = a[14], a33 = a[15];
    out[0] = a11 * (a22 * a33 - a23 * a32) - a21 * (a12 * a33 - a13 * a32) + a31 * (a12 * a23 - a13 * a22);
    out[1] = -(a01 * (a22 * a33 - a23 * a32) - a21 * (a02 * a33 - a03 * a32) + a31 * (a02 * a23 - a03 * a22));
    out[2] = a01 * (a12 * a33 - a13 * a32) - a11 * (a02 * a33 - a03 * a32) + a31 * (a02 * a13 - a03 * a12);
    out[3] = -(a01 * (a12 * a23 - a13 * a22) - a11 * (a02 * a23 - a03 * a22) + a21 * (a02 * a13 - a03 * a12));
    out[4] = -(a10 * (a22 * a33 - a23 * a32) - a20 * (a12 * a33 - a13 * a32) + a30 * (a12 * a23 - a13 * a22));
    out[5] = a00 * (a22 * a33 - a23 * a32) - a20 * (a02 * a33 - a03 * a32) + a30 * (a02 * a23 - a03 * a22);
    out[6] = -(a00 * (a12 * a33 - a13 * a32) - a10 * (a02 * a33 - a03 * a32) + a30 * (a02 * a13 - a03 * a12));
    out[7] = a00 * (a12 * a23 - a13 * a22) - a10 * (a02 * a23 - a03 * a22) + a20 * (a02 * a13 - a03 * a12);
    out[8] = a10 * (a21 * a33 - a23 * a31) - a20 * (a11 * a33 - a13 * a31) + a30 * (a11 * a23 - a13 * a21);
    out[9] = -(a00 * (a21 * a33 - a23 * a31) - a20 * (a01 * a33 - a03 * a31) + a30 * (a01 * a23 - a03 * a21));
    out[10] = a00 * (a11 * a33 - a13 * a31) - a10 * (a01 * a33 - a03 * a31) + a30 * (a01 * a13 - a03 * a11);
    out[11] = -(a00 * (a11 * a23 - a13 * a21) - a10 * (a01 * a23 - a03 * a21) + a20 * (a01 * a13 - a03 * a11));
    out[12] = -(a10 * (a21 * a32 - a22 * a31) - a20 * (a11 * a32 - a12 * a31) + a30 * (a11 * a22 - a12 * a21));
    out[13] = a00 * (a21 * a32 - a22 * a31) - a20 * (a01 * a32 - a02 * a31) + a30 * (a01 * a22 - a02 * a21);
    out[14] = -(a00 * (a11 * a32 - a12 * a31) - a10 * (a01 * a32 - a02 * a31) + a30 * (a01 * a12 - a02 * a11));
    out[15] = a00 * (a11 * a22 - a12 * a21) - a10 * (a01 * a22 - a02 * a21) + a20 * (a01 * a12 - a02 * a11);
    return out;
  }
  function determinant(a) {
    var a00 = a[0], a01 = a[1], a02 = a[2], a03 = a[3];
    var a10 = a[4], a11 = a[5], a12 = a[6], a13 = a[7];
    var a20 = a[8], a21 = a[9], a22 = a[10], a23 = a[11];
    var a30 = a[12], a31 = a[13], a32 = a[14], a33 = a[15];
    var b00 = a00 * a11 - a01 * a10;
    var b01 = a00 * a12 - a02 * a10;
    var b02 = a00 * a13 - a03 * a10;
    var b03 = a01 * a12 - a02 * a11;
    var b04 = a01 * a13 - a03 * a11;
    var b05 = a02 * a13 - a03 * a12;
    var b06 = a20 * a31 - a21 * a30;
    var b07 = a20 * a32 - a22 * a30;
    var b08 = a20 * a33 - a23 * a30;
    var b09 = a21 * a32 - a22 * a31;
    var b10 = a21 * a33 - a23 * a31;
    var b11 = a22 * a33 - a23 * a32;
    return b00 * b11 - b01 * b10 + b02 * b09 + b03 * b08 - b04 * b07 + b05 * b06;
  }
  function multiply(out, a, b) {
    var a00 = a[0], a01 = a[1], a02 = a[2], a03 = a[3];
    var a10 = a[4], a11 = a[5], a12 = a[6], a13 = a[7];
    var a20 = a[8], a21 = a[9], a22 = a[10], a23 = a[11];
    var a30 = a[12], a31 = a[13], a32 = a[14], a33 = a[15];
    var b0 = b[0], b1 = b[1], b2 = b[2], b3 = b[3];
    out[0] = b0 * a00 + b1 * a10 + b2 * a20 + b3 * a30;
    out[1] = b0 * a01 + b1 * a11 + b2 * a21 + b3 * a31;
    out[2] = b0 * a02 + b1 * a12 + b2 * a22 + b3 * a32;
    out[3] = b0 * a03 + b1 * a13 + b2 * a23 + b3 * a33;
    b0 = b[4];
    b1 = b[5];
    b2 = b[6];
    b3 = b[7];
    out[4] = b0 * a00 + b1 * a10 + b2 * a20 + b3 * a30;
    out[5] = b0 * a01 + b1 * a11 + b2 * a21 + b3 * a31;
    out[6] = b0 * a02 + b1 * a12 + b2 * a22 + b3 * a32;
    out[7] = b0 * a03 + b1 * a13 + b2 * a23 + b3 * a33;
    b0 = b[8];
    b1 = b[9];
    b2 = b[10];
    b3 = b[11];
    out[8] = b0 * a00 + b1 * a10 + b2 * a20 + b3 * a30;
    out[9] = b0 * a01 + b1 * a11 + b2 * a21 + b3 * a31;
    out[10] = b0 * a02 + b1 * a12 + b2 * a22 + b3 * a32;
    out[11] = b0 * a03 + b1 * a13 + b2 * a23 + b3 * a33;
    b0 = b[12];
    b1 = b[13];
    b2 = b[14];
    b3 = b[15];
    out[12] = b0 * a00 + b1 * a10 + b2 * a20 + b3 * a30;
    out[13] = b0 * a01 + b1 * a11 + b2 * a21 + b3 * a31;
    out[14] = b0 * a02 + b1 * a12 + b2 * a22 + b3 * a32;
    out[15] = b0 * a03 + b1 * a13 + b2 * a23 + b3 * a33;
    return out;
  }
  function translate(out, a, v) {
    var x = v[0], y = v[1], z = v[2];
    var a00, a01, a02, a03;
    var a10, a11, a12, a13;
    var a20, a21, a22, a23;
    if (a === out) {
      out[12] = a[0] * x + a[4] * y + a[8] * z + a[12];
      out[13] = a[1] * x + a[5] * y + a[9] * z + a[13];
      out[14] = a[2] * x + a[6] * y + a[10] * z + a[14];
      out[15] = a[3] * x + a[7] * y + a[11] * z + a[15];
    } else {
      a00 = a[0];
      a01 = a[1];
      a02 = a[2];
      a03 = a[3];
      a10 = a[4];
      a11 = a[5];
      a12 = a[6];
      a13 = a[7];
      a20 = a[8];
      a21 = a[9];
      a22 = a[10];
      a23 = a[11];
      out[0] = a00;
      out[1] = a01;
      out[2] = a02;
      out[3] = a03;
      out[4] = a10;
      out[5] = a11;
      out[6] = a12;
      out[7] = a13;
      out[8] = a20;
      out[9] = a21;
      out[10] = a22;
      out[11] = a23;
      out[12] = a00 * x + a10 * y + a20 * z + a[12];
      out[13] = a01 * x + a11 * y + a21 * z + a[13];
      out[14] = a02 * x + a12 * y + a22 * z + a[14];
      out[15] = a03 * x + a13 * y + a23 * z + a[15];
    }
    return out;
  }
  function scale(out, a, v) {
    var x = v[0], y = v[1], z = v[2];
    out[0] = a[0] * x;
    out[1] = a[1] * x;
    out[2] = a[2] * x;
    out[3] = a[3] * x;
    out[4] = a[4] * y;
    out[5] = a[5] * y;
    out[6] = a[6] * y;
    out[7] = a[7] * y;
    out[8] = a[8] * z;
    out[9] = a[9] * z;
    out[10] = a[10] * z;
    out[11] = a[11] * z;
    out[12] = a[12];
    out[13] = a[13];
    out[14] = a[14];
    out[15] = a[15];
    return out;
  }
  function rotate(out, a, rad, axis) {
    var x = axis[0], y = axis[1], z = axis[2];
    var len3 = Math.hypot(x, y, z);
    var s, c, t;
    var a00, a01, a02, a03;
    var a10, a11, a12, a13;
    var a20, a21, a22, a23;
    var b00, b01, b02;
    var b10, b11, b12;
    var b20, b21, b22;
    if (len3 < EPSILON) {
      return null;
    }
    len3 = 1 / len3;
    x *= len3;
    y *= len3;
    z *= len3;
    s = Math.sin(rad);
    c = Math.cos(rad);
    t = 1 - c;
    a00 = a[0];
    a01 = a[1];
    a02 = a[2];
    a03 = a[3];
    a10 = a[4];
    a11 = a[5];
    a12 = a[6];
    a13 = a[7];
    a20 = a[8];
    a21 = a[9];
    a22 = a[10];
    a23 = a[11];
    b00 = x * x * t + c;
    b01 = y * x * t + z * s;
    b02 = z * x * t - y * s;
    b10 = x * y * t - z * s;
    b11 = y * y * t + c;
    b12 = z * y * t + x * s;
    b20 = x * z * t + y * s;
    b21 = y * z * t - x * s;
    b22 = z * z * t + c;
    out[0] = a00 * b00 + a10 * b01 + a20 * b02;
    out[1] = a01 * b00 + a11 * b01 + a21 * b02;
    out[2] = a02 * b00 + a12 * b01 + a22 * b02;
    out[3] = a03 * b00 + a13 * b01 + a23 * b02;
    out[4] = a00 * b10 + a10 * b11 + a20 * b12;
    out[5] = a01 * b10 + a11 * b11 + a21 * b12;
    out[6] = a02 * b10 + a12 * b11 + a22 * b12;
    out[7] = a03 * b10 + a13 * b11 + a23 * b12;
    out[8] = a00 * b20 + a10 * b21 + a20 * b22;
    out[9] = a01 * b20 + a11 * b21 + a21 * b22;
    out[10] = a02 * b20 + a12 * b21 + a22 * b22;
    out[11] = a03 * b20 + a13 * b21 + a23 * b22;
    if (a !== out) {
      out[12] = a[12];
      out[13] = a[13];
      out[14] = a[14];
      out[15] = a[15];
    }
    return out;
  }
  function rotateX(out, a, rad) {
    var s = Math.sin(rad);
    var c = Math.cos(rad);
    var a10 = a[4];
    var a11 = a[5];
    var a12 = a[6];
    var a13 = a[7];
    var a20 = a[8];
    var a21 = a[9];
    var a22 = a[10];
    var a23 = a[11];
    if (a !== out) {
      out[0] = a[0];
      out[1] = a[1];
      out[2] = a[2];
      out[3] = a[3];
      out[12] = a[12];
      out[13] = a[13];
      out[14] = a[14];
      out[15] = a[15];
    }
    out[4] = a10 * c + a20 * s;
    out[5] = a11 * c + a21 * s;
    out[6] = a12 * c + a22 * s;
    out[7] = a13 * c + a23 * s;
    out[8] = a20 * c - a10 * s;
    out[9] = a21 * c - a11 * s;
    out[10] = a22 * c - a12 * s;
    out[11] = a23 * c - a13 * s;
    return out;
  }
  function rotateY(out, a, rad) {
    var s = Math.sin(rad);
    var c = Math.cos(rad);
    var a00 = a[0];
    var a01 = a[1];
    var a02 = a[2];
    var a03 = a[3];
    var a20 = a[8];
    var a21 = a[9];
    var a22 = a[10];
    var a23 = a[11];
    if (a !== out) {
      out[4] = a[4];
      out[5] = a[5];
      out[6] = a[6];
      out[7] = a[7];
      out[12] = a[12];
      out[13] = a[13];
      out[14] = a[14];
      out[15] = a[15];
    }
    out[0] = a00 * c - a20 * s;
    out[1] = a01 * c - a21 * s;
    out[2] = a02 * c - a22 * s;
    out[3] = a03 * c - a23 * s;
    out[8] = a00 * s + a20 * c;
    out[9] = a01 * s + a21 * c;
    out[10] = a02 * s + a22 * c;
    out[11] = a03 * s + a23 * c;
    return out;
  }
  function rotateZ(out, a, rad) {
    var s = Math.sin(rad);
    var c = Math.cos(rad);
    var a00 = a[0];
    var a01 = a[1];
    var a02 = a[2];
    var a03 = a[3];
    var a10 = a[4];
    var a11 = a[5];
    var a12 = a[6];
    var a13 = a[7];
    if (a !== out) {
      out[8] = a[8];
      out[9] = a[9];
      out[10] = a[10];
      out[11] = a[11];
      out[12] = a[12];
      out[13] = a[13];
      out[14] = a[14];
      out[15] = a[15];
    }
    out[0] = a00 * c + a10 * s;
    out[1] = a01 * c + a11 * s;
    out[2] = a02 * c + a12 * s;
    out[3] = a03 * c + a13 * s;
    out[4] = a10 * c - a00 * s;
    out[5] = a11 * c - a01 * s;
    out[6] = a12 * c - a02 * s;
    out[7] = a13 * c - a03 * s;
    return out;
  }
  function fromTranslation(out, v) {
    out[0] = 1;
    out[1] = 0;
    out[2] = 0;
    out[3] = 0;
    out[4] = 0;
    out[5] = 1;
    out[6] = 0;
    out[7] = 0;
    out[8] = 0;
    out[9] = 0;
    out[10] = 1;
    out[11] = 0;
    out[12] = v[0];
    out[13] = v[1];
    out[14] = v[2];
    out[15] = 1;
    return out;
  }
  function fromScaling(out, v) {
    out[0] = v[0];
    out[1] = 0;
    out[2] = 0;
    out[3] = 0;
    out[4] = 0;
    out[5] = v[1];
    out[6] = 0;
    out[7] = 0;
    out[8] = 0;
    out[9] = 0;
    out[10] = v[2];
    out[11] = 0;
    out[12] = 0;
    out[13] = 0;
    out[14] = 0;
    out[15] = 1;
    return out;
  }
  function fromRotation(out, rad, axis) {
    var x = axis[0], y = axis[1], z = axis[2];
    var len3 = Math.hypot(x, y, z);
    var s, c, t;
    if (len3 < EPSILON) {
      return null;
    }
    len3 = 1 / len3;
    x *= len3;
    y *= len3;
    z *= len3;
    s = Math.sin(rad);
    c = Math.cos(rad);
    t = 1 - c;
    out[0] = x * x * t + c;
    out[1] = y * x * t + z * s;
    out[2] = z * x * t - y * s;
    out[3] = 0;
    out[4] = x * y * t - z * s;
    out[5] = y * y * t + c;
    out[6] = z * y * t + x * s;
    out[7] = 0;
    out[8] = x * z * t + y * s;
    out[9] = y * z * t - x * s;
    out[10] = z * z * t + c;
    out[11] = 0;
    out[12] = 0;
    out[13] = 0;
    out[14] = 0;
    out[15] = 1;
    return out;
  }
  function fromXRotation(out, rad) {
    var s = Math.sin(rad);
    var c = Math.cos(rad);
    out[0] = 1;
    out[1] = 0;
    out[2] = 0;
    out[3] = 0;
    out[4] = 0;
    out[5] = c;
    out[6] = s;
    out[7] = 0;
    out[8] = 0;
    out[9] = -s;
    out[10] = c;
    out[11] = 0;
    out[12] = 0;
    out[13] = 0;
    out[14] = 0;
    out[15] = 1;
    return out;
  }
  function fromYRotation(out, rad) {
    var s = Math.sin(rad);
    var c = Math.cos(rad);
    out[0] = c;
    out[1] = 0;
    out[2] = -s;
    out[3] = 0;
    out[4] = 0;
    out[5] = 1;
    out[6] = 0;
    out[7] = 0;
    out[8] = s;
    out[9] = 0;
    out[10] = c;
    out[11] = 0;
    out[12] = 0;
    out[13] = 0;
    out[14] = 0;
    out[15] = 1;
    return out;
  }
  function fromZRotation(out, rad) {
    var s = Math.sin(rad);
    var c = Math.cos(rad);
    out[0] = c;
    out[1] = s;
    out[2] = 0;
    out[3] = 0;
    out[4] = -s;
    out[5] = c;
    out[6] = 0;
    out[7] = 0;
    out[8] = 0;
    out[9] = 0;
    out[10] = 1;
    out[11] = 0;
    out[12] = 0;
    out[13] = 0;
    out[14] = 0;
    out[15] = 1;
    return out;
  }
  function fromRotationTranslation(out, q, v) {
    var x = q[0], y = q[1], z = q[2], w = q[3];
    var x2 = x + x;
    var y2 = y + y;
    var z2 = z + z;
    var xx = x * x2;
    var xy = x * y2;
    var xz = x * z2;
    var yy = y * y2;
    var yz = y * z2;
    var zz = z * z2;
    var wx = w * x2;
    var wy = w * y2;
    var wz = w * z2;
    out[0] = 1 - (yy + zz);
    out[1] = xy + wz;
    out[2] = xz - wy;
    out[3] = 0;
    out[4] = xy - wz;
    out[5] = 1 - (xx + zz);
    out[6] = yz + wx;
    out[7] = 0;
    out[8] = xz + wy;
    out[9] = yz - wx;
    out[10] = 1 - (xx + yy);
    out[11] = 0;
    out[12] = v[0];
    out[13] = v[1];
    out[14] = v[2];
    out[15] = 1;
    return out;
  }
  function fromQuat2(out, a) {
    var translation = new ARRAY_TYPE(3);
    var bx = -a[0], by = -a[1], bz = -a[2], bw = a[3], ax = a[4], ay = a[5], az = a[6], aw = a[7];
    var magnitude = bx * bx + by * by + bz * bz + bw * bw;
    if (magnitude > 0) {
      translation[0] = (ax * bw + aw * bx + ay * bz - az * by) * 2 / magnitude;
      translation[1] = (ay * bw + aw * by + az * bx - ax * bz) * 2 / magnitude;
      translation[2] = (az * bw + aw * bz + ax * by - ay * bx) * 2 / magnitude;
    } else {
      translation[0] = (ax * bw + aw * bx + ay * bz - az * by) * 2;
      translation[1] = (ay * bw + aw * by + az * bx - ax * bz) * 2;
      translation[2] = (az * bw + aw * bz + ax * by - ay * bx) * 2;
    }
    fromRotationTranslation(out, a, translation);
    return out;
  }
  function getTranslation(out, mat) {
    out[0] = mat[12];
    out[1] = mat[13];
    out[2] = mat[14];
    return out;
  }
  function getScaling(out, mat) {
    var m11 = mat[0];
    var m12 = mat[1];
    var m13 = mat[2];
    var m21 = mat[4];
    var m22 = mat[5];
    var m23 = mat[6];
    var m31 = mat[8];
    var m32 = mat[9];
    var m33 = mat[10];
    out[0] = Math.hypot(m11, m12, m13);
    out[1] = Math.hypot(m21, m22, m23);
    out[2] = Math.hypot(m31, m32, m33);
    return out;
  }
  function getRotation(out, mat) {
    var scaling = new ARRAY_TYPE(3);
    getScaling(scaling, mat);
    var is1 = 1 / scaling[0];
    var is2 = 1 / scaling[1];
    var is3 = 1 / scaling[2];
    var sm11 = mat[0] * is1;
    var sm12 = mat[1] * is2;
    var sm13 = mat[2] * is3;
    var sm21 = mat[4] * is1;
    var sm22 = mat[5] * is2;
    var sm23 = mat[6] * is3;
    var sm31 = mat[8] * is1;
    var sm32 = mat[9] * is2;
    var sm33 = mat[10] * is3;
    var trace = sm11 + sm22 + sm33;
    var S = 0;
    if (trace > 0) {
      S = Math.sqrt(trace + 1) * 2;
      out[3] = 0.25 * S;
      out[0] = (sm23 - sm32) / S;
      out[1] = (sm31 - sm13) / S;
      out[2] = (sm12 - sm21) / S;
    } else if (sm11 > sm22 && sm11 > sm33) {
      S = Math.sqrt(1 + sm11 - sm22 - sm33) * 2;
      out[3] = (sm23 - sm32) / S;
      out[0] = 0.25 * S;
      out[1] = (sm12 + sm21) / S;
      out[2] = (sm31 + sm13) / S;
    } else if (sm22 > sm33) {
      S = Math.sqrt(1 + sm22 - sm11 - sm33) * 2;
      out[3] = (sm31 - sm13) / S;
      out[0] = (sm12 + sm21) / S;
      out[1] = 0.25 * S;
      out[2] = (sm23 + sm32) / S;
    } else {
      S = Math.sqrt(1 + sm33 - sm11 - sm22) * 2;
      out[3] = (sm12 - sm21) / S;
      out[0] = (sm31 + sm13) / S;
      out[1] = (sm23 + sm32) / S;
      out[2] = 0.25 * S;
    }
    return out;
  }
  function fromRotationTranslationScale(out, q, v, s) {
    var x = q[0], y = q[1], z = q[2], w = q[3];
    var x2 = x + x;
    var y2 = y + y;
    var z2 = z + z;
    var xx = x * x2;
    var xy = x * y2;
    var xz = x * z2;
    var yy = y * y2;
    var yz = y * z2;
    var zz = z * z2;
    var wx = w * x2;
    var wy = w * y2;
    var wz = w * z2;
    var sx = s[0];
    var sy = s[1];
    var sz = s[2];
    out[0] = (1 - (yy + zz)) * sx;
    out[1] = (xy + wz) * sx;
    out[2] = (xz - wy) * sx;
    out[3] = 0;
    out[4] = (xy - wz) * sy;
    out[5] = (1 - (xx + zz)) * sy;
    out[6] = (yz + wx) * sy;
    out[7] = 0;
    out[8] = (xz + wy) * sz;
    out[9] = (yz - wx) * sz;
    out[10] = (1 - (xx + yy)) * sz;
    out[11] = 0;
    out[12] = v[0];
    out[13] = v[1];
    out[14] = v[2];
    out[15] = 1;
    return out;
  }
  function fromRotationTranslationScaleOrigin(out, q, v, s, o) {
    var x = q[0], y = q[1], z = q[2], w = q[3];
    var x2 = x + x;
    var y2 = y + y;
    var z2 = z + z;
    var xx = x * x2;
    var xy = x * y2;
    var xz = x * z2;
    var yy = y * y2;
    var yz = y * z2;
    var zz = z * z2;
    var wx = w * x2;
    var wy = w * y2;
    var wz = w * z2;
    var sx = s[0];
    var sy = s[1];
    var sz = s[2];
    var ox = o[0];
    var oy = o[1];
    var oz = o[2];
    var out0 = (1 - (yy + zz)) * sx;
    var out1 = (xy + wz) * sx;
    var out2 = (xz - wy) * sx;
    var out4 = (xy - wz) * sy;
    var out5 = (1 - (xx + zz)) * sy;
    var out6 = (yz + wx) * sy;
    var out8 = (xz + wy) * sz;
    var out9 = (yz - wx) * sz;
    var out10 = (1 - (xx + yy)) * sz;
    out[0] = out0;
    out[1] = out1;
    out[2] = out2;
    out[3] = 0;
    out[4] = out4;
    out[5] = out5;
    out[6] = out6;
    out[7] = 0;
    out[8] = out8;
    out[9] = out9;
    out[10] = out10;
    out[11] = 0;
    out[12] = v[0] + ox - (out0 * ox + out4 * oy + out8 * oz);
    out[13] = v[1] + oy - (out1 * ox + out5 * oy + out9 * oz);
    out[14] = v[2] + oz - (out2 * ox + out6 * oy + out10 * oz);
    out[15] = 1;
    return out;
  }
  function fromQuat(out, q) {
    var x = q[0], y = q[1], z = q[2], w = q[3];
    var x2 = x + x;
    var y2 = y + y;
    var z2 = z + z;
    var xx = x * x2;
    var yx = y * x2;
    var yy = y * y2;
    var zx = z * x2;
    var zy = z * y2;
    var zz = z * z2;
    var wx = w * x2;
    var wy = w * y2;
    var wz = w * z2;
    out[0] = 1 - yy - zz;
    out[1] = yx + wz;
    out[2] = zx - wy;
    out[3] = 0;
    out[4] = yx - wz;
    out[5] = 1 - xx - zz;
    out[6] = zy + wx;
    out[7] = 0;
    out[8] = zx + wy;
    out[9] = zy - wx;
    out[10] = 1 - xx - yy;
    out[11] = 0;
    out[12] = 0;
    out[13] = 0;
    out[14] = 0;
    out[15] = 1;
    return out;
  }
  function frustum(out, left, right, bottom, top, near, far) {
    var rl = 1 / (right - left);
    var tb = 1 / (top - bottom);
    var nf = 1 / (near - far);
    out[0] = near * 2 * rl;
    out[1] = 0;
    out[2] = 0;
    out[3] = 0;
    out[4] = 0;
    out[5] = near * 2 * tb;
    out[6] = 0;
    out[7] = 0;
    out[8] = (right + left) * rl;
    out[9] = (top + bottom) * tb;
    out[10] = (far + near) * nf;
    out[11] = -1;
    out[12] = 0;
    out[13] = 0;
    out[14] = far * near * 2 * nf;
    out[15] = 0;
    return out;
  }
  function perspective(out, fovy, aspect, near, far) {
    var f = 1 / Math.tan(fovy / 2), nf;
    out[0] = f / aspect;
    out[1] = 0;
    out[2] = 0;
    out[3] = 0;
    out[4] = 0;
    out[5] = f;
    out[6] = 0;
    out[7] = 0;
    out[8] = 0;
    out[9] = 0;
    out[11] = -1;
    out[12] = 0;
    out[13] = 0;
    out[15] = 0;
    if (far != null && far !== Infinity) {
      nf = 1 / (near - far);
      out[10] = (far + near) * nf;
      out[14] = 2 * far * near * nf;
    } else {
      out[10] = -1;
      out[14] = -2 * near;
    }
    return out;
  }
  function perspectiveFromFieldOfView(out, fov, near, far) {
    var upTan = Math.tan(fov.upDegrees * Math.PI / 180);
    var downTan = Math.tan(fov.downDegrees * Math.PI / 180);
    var leftTan = Math.tan(fov.leftDegrees * Math.PI / 180);
    var rightTan = Math.tan(fov.rightDegrees * Math.PI / 180);
    var xScale = 2 / (leftTan + rightTan);
    var yScale = 2 / (upTan + downTan);
    out[0] = xScale;
    out[1] = 0;
    out[2] = 0;
    out[3] = 0;
    out[4] = 0;
    out[5] = yScale;
    out[6] = 0;
    out[7] = 0;
    out[8] = -((leftTan - rightTan) * xScale * 0.5);
    out[9] = (upTan - downTan) * yScale * 0.5;
    out[10] = far / (near - far);
    out[11] = -1;
    out[12] = 0;
    out[13] = 0;
    out[14] = far * near / (near - far);
    out[15] = 0;
    return out;
  }
  function ortho(out, left, right, bottom, top, near, far) {
    var lr = 1 / (left - right);
    var bt = 1 / (bottom - top);
    var nf = 1 / (near - far);
    out[0] = -2 * lr;
    out[1] = 0;
    out[2] = 0;
    out[3] = 0;
    out[4] = 0;
    out[5] = -2 * bt;
    out[6] = 0;
    out[7] = 0;
    out[8] = 0;
    out[9] = 0;
    out[10] = 2 * nf;
    out[11] = 0;
    out[12] = (left + right) * lr;
    out[13] = (top + bottom) * bt;
    out[14] = (far + near) * nf;
    out[15] = 1;
    return out;
  }
  function lookAt(out, eye, center, up) {
    var x0, x1, x2, y0, y1, y2, z0, z1, z2, len3;
    var eyex = eye[0];
    var eyey = eye[1];
    var eyez = eye[2];
    var upx = up[0];
    var upy = up[1];
    var upz = up[2];
    var centerx = center[0];
    var centery = center[1];
    var centerz = center[2];
    if (Math.abs(eyex - centerx) < EPSILON && Math.abs(eyey - centery) < EPSILON && Math.abs(eyez - centerz) < EPSILON) {
      return identity(out);
    }
    z0 = eyex - centerx;
    z1 = eyey - centery;
    z2 = eyez - centerz;
    len3 = 1 / Math.hypot(z0, z1, z2);
    z0 *= len3;
    z1 *= len3;
    z2 *= len3;
    x0 = upy * z2 - upz * z1;
    x1 = upz * z0 - upx * z2;
    x2 = upx * z1 - upy * z0;
    len3 = Math.hypot(x0, x1, x2);
    if (!len3) {
      x0 = 0;
      x1 = 0;
      x2 = 0;
    } else {
      len3 = 1 / len3;
      x0 *= len3;
      x1 *= len3;
      x2 *= len3;
    }
    y0 = z1 * x2 - z2 * x1;
    y1 = z2 * x0 - z0 * x2;
    y2 = z0 * x1 - z1 * x0;
    len3 = Math.hypot(y0, y1, y2);
    if (!len3) {
      y0 = 0;
      y1 = 0;
      y2 = 0;
    } else {
      len3 = 1 / len3;
      y0 *= len3;
      y1 *= len3;
      y2 *= len3;
    }
    out[0] = x0;
    out[1] = y0;
    out[2] = z0;
    out[3] = 0;
    out[4] = x1;
    out[5] = y1;
    out[6] = z1;
    out[7] = 0;
    out[8] = x2;
    out[9] = y2;
    out[10] = z2;
    out[11] = 0;
    out[12] = -(x0 * eyex + x1 * eyey + x2 * eyez);
    out[13] = -(y0 * eyex + y1 * eyey + y2 * eyez);
    out[14] = -(z0 * eyex + z1 * eyey + z2 * eyez);
    out[15] = 1;
    return out;
  }
  function targetTo(out, eye, target, up) {
    var eyex = eye[0], eyey = eye[1], eyez = eye[2], upx = up[0], upy = up[1], upz = up[2];
    var z0 = eyex - target[0], z1 = eyey - target[1], z2 = eyez - target[2];
    var len3 = z0 * z0 + z1 * z1 + z2 * z2;
    if (len3 > 0) {
      len3 = 1 / Math.sqrt(len3);
      z0 *= len3;
      z1 *= len3;
      z2 *= len3;
    }
    var x0 = upy * z2 - upz * z1, x1 = upz * z0 - upx * z2, x2 = upx * z1 - upy * z0;
    len3 = x0 * x0 + x1 * x1 + x2 * x2;
    if (len3 > 0) {
      len3 = 1 / Math.sqrt(len3);
      x0 *= len3;
      x1 *= len3;
      x2 *= len3;
    }
    out[0] = x0;
    out[1] = x1;
    out[2] = x2;
    out[3] = 0;
    out[4] = z1 * x2 - z2 * x1;
    out[5] = z2 * x0 - z0 * x2;
    out[6] = z0 * x1 - z1 * x0;
    out[7] = 0;
    out[8] = z0;
    out[9] = z1;
    out[10] = z2;
    out[11] = 0;
    out[12] = eyex;
    out[13] = eyey;
    out[14] = eyez;
    out[15] = 1;
    return out;
  }
  function str(a) {
    return "mat4(" + a[0] + ", " + a[1] + ", " + a[2] + ", " + a[3] + ", " + a[4] + ", " + a[5] + ", " + a[6] + ", " + a[7] + ", " + a[8] + ", " + a[9] + ", " + a[10] + ", " + a[11] + ", " + a[12] + ", " + a[13] + ", " + a[14] + ", " + a[15] + ")";
  }
  function frob(a) {
    return Math.hypot(a[0], a[1], a[2], a[3], a[4], a[5], a[6], a[7], a[8], a[9], a[10], a[11], a[12], a[13], a[14], a[15]);
  }
  function add(out, a, b) {
    out[0] = a[0] + b[0];
    out[1] = a[1] + b[1];
    out[2] = a[2] + b[2];
    out[3] = a[3] + b[3];
    out[4] = a[4] + b[4];
    out[5] = a[5] + b[5];
    out[6] = a[6] + b[6];
    out[7] = a[7] + b[7];
    out[8] = a[8] + b[8];
    out[9] = a[9] + b[9];
    out[10] = a[10] + b[10];
    out[11] = a[11] + b[11];
    out[12] = a[12] + b[12];
    out[13] = a[13] + b[13];
    out[14] = a[14] + b[14];
    out[15] = a[15] + b[15];
    return out;
  }
  function subtract(out, a, b) {
    out[0] = a[0] - b[0];
    out[1] = a[1] - b[1];
    out[2] = a[2] - b[2];
    out[3] = a[3] - b[3];
    out[4] = a[4] - b[4];
    out[5] = a[5] - b[5];
    out[6] = a[6] - b[6];
    out[7] = a[7] - b[7];
    out[8] = a[8] - b[8];
    out[9] = a[9] - b[9];
    out[10] = a[10] - b[10];
    out[11] = a[11] - b[11];
    out[12] = a[12] - b[12];
    out[13] = a[13] - b[13];
    out[14] = a[14] - b[14];
    out[15] = a[15] - b[15];
    return out;
  }
  function multiplyScalar(out, a, b) {
    out[0] = a[0] * b;
    out[1] = a[1] * b;
    out[2] = a[2] * b;
    out[3] = a[3] * b;
    out[4] = a[4] * b;
    out[5] = a[5] * b;
    out[6] = a[6] * b;
    out[7] = a[7] * b;
    out[8] = a[8] * b;
    out[9] = a[9] * b;
    out[10] = a[10] * b;
    out[11] = a[11] * b;
    out[12] = a[12] * b;
    out[13] = a[13] * b;
    out[14] = a[14] * b;
    out[15] = a[15] * b;
    return out;
  }
  function multiplyScalarAndAdd(out, a, b, scale5) {
    out[0] = a[0] + b[0] * scale5;
    out[1] = a[1] + b[1] * scale5;
    out[2] = a[2] + b[2] * scale5;
    out[3] = a[3] + b[3] * scale5;
    out[4] = a[4] + b[4] * scale5;
    out[5] = a[5] + b[5] * scale5;
    out[6] = a[6] + b[6] * scale5;
    out[7] = a[7] + b[7] * scale5;
    out[8] = a[8] + b[8] * scale5;
    out[9] = a[9] + b[9] * scale5;
    out[10] = a[10] + b[10] * scale5;
    out[11] = a[11] + b[11] * scale5;
    out[12] = a[12] + b[12] * scale5;
    out[13] = a[13] + b[13] * scale5;
    out[14] = a[14] + b[14] * scale5;
    out[15] = a[15] + b[15] * scale5;
    return out;
  }
  function exactEquals(a, b) {
    return a[0] === b[0] && a[1] === b[1] && a[2] === b[2] && a[3] === b[3] && a[4] === b[4] && a[5] === b[5] && a[6] === b[6] && a[7] === b[7] && a[8] === b[8] && a[9] === b[9] && a[10] === b[10] && a[11] === b[11] && a[12] === b[12] && a[13] === b[13] && a[14] === b[14] && a[15] === b[15];
  }
  function equals(a, b) {
    var a0 = a[0], a1 = a[1], a2 = a[2], a3 = a[3];
    var a4 = a[4], a5 = a[5], a6 = a[6], a7 = a[7];
    var a8 = a[8], a9 = a[9], a10 = a[10], a11 = a[11];
    var a12 = a[12], a13 = a[13], a14 = a[14], a15 = a[15];
    var b0 = b[0], b1 = b[1], b2 = b[2], b3 = b[3];
    var b4 = b[4], b5 = b[5], b6 = b[6], b7 = b[7];
    var b8 = b[8], b9 = b[9], b10 = b[10], b11 = b[11];
    var b12 = b[12], b13 = b[13], b14 = b[14], b15 = b[15];
    return Math.abs(a0 - b0) <= EPSILON * Math.max(1, Math.abs(a0), Math.abs(b0)) && Math.abs(a1 - b1) <= EPSILON * Math.max(1, Math.abs(a1), Math.abs(b1)) && Math.abs(a2 - b2) <= EPSILON * Math.max(1, Math.abs(a2), Math.abs(b2)) && Math.abs(a3 - b3) <= EPSILON * Math.max(1, Math.abs(a3), Math.abs(b3)) && Math.abs(a4 - b4) <= EPSILON * Math.max(1, Math.abs(a4), Math.abs(b4)) && Math.abs(a5 - b5) <= EPSILON * Math.max(1, Math.abs(a5), Math.abs(b5)) && Math.abs(a6 - b6) <= EPSILON * Math.max(1, Math.abs(a6), Math.abs(b6)) && Math.abs(a7 - b7) <= EPSILON * Math.max(1, Math.abs(a7), Math.abs(b7)) && Math.abs(a8 - b8) <= EPSILON * Math.max(1, Math.abs(a8), Math.abs(b8)) && Math.abs(a9 - b9) <= EPSILON * Math.max(1, Math.abs(a9), Math.abs(b9)) && Math.abs(a10 - b10) <= EPSILON * Math.max(1, Math.abs(a10), Math.abs(b10)) && Math.abs(a11 - b11) <= EPSILON * Math.max(1, Math.abs(a11), Math.abs(b11)) && Math.abs(a12 - b12) <= EPSILON * Math.max(1, Math.abs(a12), Math.abs(b12)) && Math.abs(a13 - b13) <= EPSILON * Math.max(1, Math.abs(a13), Math.abs(b13)) && Math.abs(a14 - b14) <= EPSILON * Math.max(1, Math.abs(a14), Math.abs(b14)) && Math.abs(a15 - b15) <= EPSILON * Math.max(1, Math.abs(a15), Math.abs(b15));
  }
  var mul = multiply;
  var sub = subtract;

  // node_modules/gl-matrix/esm/quat.js
  var quat_exports = {};
  __export(quat_exports, {
    add: () => add4,
    calculateW: () => calculateW,
    clone: () => clone4,
    conjugate: () => conjugate,
    copy: () => copy4,
    create: () => create5,
    dot: () => dot3,
    equals: () => equals4,
    exactEquals: () => exactEquals4,
    exp: () => exp,
    fromEuler: () => fromEuler,
    fromMat3: () => fromMat3,
    fromValues: () => fromValues4,
    getAngle: () => getAngle,
    getAxisAngle: () => getAxisAngle,
    identity: () => identity2,
    invert: () => invert2,
    len: () => len2,
    length: () => length3,
    lerp: () => lerp3,
    ln: () => ln,
    mul: () => mul3,
    multiply: () => multiply3,
    normalize: () => normalize3,
    pow: () => pow,
    random: () => random2,
    rotateX: () => rotateX3,
    rotateY: () => rotateY3,
    rotateZ: () => rotateZ3,
    rotationTo: () => rotationTo,
    scale: () => scale4,
    set: () => set4,
    setAxes: () => setAxes,
    setAxisAngle: () => setAxisAngle,
    slerp: () => slerp,
    sqlerp: () => sqlerp,
    sqrLen: () => sqrLen2,
    squaredLength: () => squaredLength3,
    str: () => str3
  });

  // node_modules/gl-matrix/esm/vec3.js
  var vec3_exports = {};
  __export(vec3_exports, {
    add: () => add2,
    angle: () => angle,
    bezier: () => bezier,
    ceil: () => ceil,
    clone: () => clone2,
    copy: () => copy2,
    create: () => create3,
    cross: () => cross,
    dist: () => dist,
    distance: () => distance,
    div: () => div,
    divide: () => divide,
    dot: () => dot,
    equals: () => equals2,
    exactEquals: () => exactEquals2,
    floor: () => floor,
    forEach: () => forEach,
    fromValues: () => fromValues2,
    hermite: () => hermite,
    inverse: () => inverse,
    len: () => len,
    length: () => length,
    lerp: () => lerp,
    max: () => max,
    min: () => min,
    mul: () => mul2,
    multiply: () => multiply2,
    negate: () => negate,
    normalize: () => normalize,
    random: () => random,
    rotateX: () => rotateX2,
    rotateY: () => rotateY2,
    rotateZ: () => rotateZ2,
    round: () => round,
    scale: () => scale2,
    scaleAndAdd: () => scaleAndAdd,
    set: () => set2,
    sqrDist: () => sqrDist,
    sqrLen: () => sqrLen,
    squaredDistance: () => squaredDistance,
    squaredLength: () => squaredLength,
    str: () => str2,
    sub: () => sub2,
    subtract: () => subtract2,
    transformMat3: () => transformMat3,
    transformMat4: () => transformMat4,
    transformQuat: () => transformQuat,
    zero: () => zero
  });
  function create3() {
    var out = new ARRAY_TYPE(3);
    if (ARRAY_TYPE != Float32Array) {
      out[0] = 0;
      out[1] = 0;
      out[2] = 0;
    }
    return out;
  }
  function clone2(a) {
    var out = new ARRAY_TYPE(3);
    out[0] = a[0];
    out[1] = a[1];
    out[2] = a[2];
    return out;
  }
  function length(a) {
    var x = a[0];
    var y = a[1];
    var z = a[2];
    return Math.hypot(x, y, z);
  }
  function fromValues2(x, y, z) {
    var out = new ARRAY_TYPE(3);
    out[0] = x;
    out[1] = y;
    out[2] = z;
    return out;
  }
  function copy2(out, a) {
    out[0] = a[0];
    out[1] = a[1];
    out[2] = a[2];
    return out;
  }
  function set2(out, x, y, z) {
    out[0] = x;
    out[1] = y;
    out[2] = z;
    return out;
  }
  function add2(out, a, b) {
    out[0] = a[0] + b[0];
    out[1] = a[1] + b[1];
    out[2] = a[2] + b[2];
    return out;
  }
  function subtract2(out, a, b) {
    out[0] = a[0] - b[0];
    out[1] = a[1] - b[1];
    out[2] = a[2] - b[2];
    return out;
  }
  function multiply2(out, a, b) {
    out[0] = a[0] * b[0];
    out[1] = a[1] * b[1];
    out[2] = a[2] * b[2];
    return out;
  }
  function divide(out, a, b) {
    out[0] = a[0] / b[0];
    out[1] = a[1] / b[1];
    out[2] = a[2] / b[2];
    return out;
  }
  function ceil(out, a) {
    out[0] = Math.ceil(a[0]);
    out[1] = Math.ceil(a[1]);
    out[2] = Math.ceil(a[2]);
    return out;
  }
  function floor(out, a) {
    out[0] = Math.floor(a[0]);
    out[1] = Math.floor(a[1]);
    out[2] = Math.floor(a[2]);
    return out;
  }
  function min(out, a, b) {
    out[0] = Math.min(a[0], b[0]);
    out[1] = Math.min(a[1], b[1]);
    out[2] = Math.min(a[2], b[2]);
    return out;
  }
  function max(out, a, b) {
    out[0] = Math.max(a[0], b[0]);
    out[1] = Math.max(a[1], b[1]);
    out[2] = Math.max(a[2], b[2]);
    return out;
  }
  function round(out, a) {
    out[0] = Math.round(a[0]);
    out[1] = Math.round(a[1]);
    out[2] = Math.round(a[2]);
    return out;
  }
  function scale2(out, a, b) {
    out[0] = a[0] * b;
    out[1] = a[1] * b;
    out[2] = a[2] * b;
    return out;
  }
  function scaleAndAdd(out, a, b, scale5) {
    out[0] = a[0] + b[0] * scale5;
    out[1] = a[1] + b[1] * scale5;
    out[2] = a[2] + b[2] * scale5;
    return out;
  }
  function distance(a, b) {
    var x = b[0] - a[0];
    var y = b[1] - a[1];
    var z = b[2] - a[2];
    return Math.hypot(x, y, z);
  }
  function squaredDistance(a, b) {
    var x = b[0] - a[0];
    var y = b[1] - a[1];
    var z = b[2] - a[2];
    return x * x + y * y + z * z;
  }
  function squaredLength(a) {
    var x = a[0];
    var y = a[1];
    var z = a[2];
    return x * x + y * y + z * z;
  }
  function negate(out, a) {
    out[0] = -a[0];
    out[1] = -a[1];
    out[2] = -a[2];
    return out;
  }
  function inverse(out, a) {
    out[0] = 1 / a[0];
    out[1] = 1 / a[1];
    out[2] = 1 / a[2];
    return out;
  }
  function normalize(out, a) {
    var x = a[0];
    var y = a[1];
    var z = a[2];
    var len3 = x * x + y * y + z * z;
    if (len3 > 0) {
      len3 = 1 / Math.sqrt(len3);
    }
    out[0] = a[0] * len3;
    out[1] = a[1] * len3;
    out[2] = a[2] * len3;
    return out;
  }
  function dot(a, b) {
    return a[0] * b[0] + a[1] * b[1] + a[2] * b[2];
  }
  function cross(out, a, b) {
    var ax = a[0], ay = a[1], az = a[2];
    var bx = b[0], by = b[1], bz = b[2];
    out[0] = ay * bz - az * by;
    out[1] = az * bx - ax * bz;
    out[2] = ax * by - ay * bx;
    return out;
  }
  function lerp(out, a, b, t) {
    var ax = a[0];
    var ay = a[1];
    var az = a[2];
    out[0] = ax + t * (b[0] - ax);
    out[1] = ay + t * (b[1] - ay);
    out[2] = az + t * (b[2] - az);
    return out;
  }
  function hermite(out, a, b, c, d, t) {
    var factorTimes2 = t * t;
    var factor1 = factorTimes2 * (2 * t - 3) + 1;
    var factor2 = factorTimes2 * (t - 2) + t;
    var factor3 = factorTimes2 * (t - 1);
    var factor4 = factorTimes2 * (3 - 2 * t);
    out[0] = a[0] * factor1 + b[0] * factor2 + c[0] * factor3 + d[0] * factor4;
    out[1] = a[1] * factor1 + b[1] * factor2 + c[1] * factor3 + d[1] * factor4;
    out[2] = a[2] * factor1 + b[2] * factor2 + c[2] * factor3 + d[2] * factor4;
    return out;
  }
  function bezier(out, a, b, c, d, t) {
    var inverseFactor = 1 - t;
    var inverseFactorTimesTwo = inverseFactor * inverseFactor;
    var factorTimes2 = t * t;
    var factor1 = inverseFactorTimesTwo * inverseFactor;
    var factor2 = 3 * t * inverseFactorTimesTwo;
    var factor3 = 3 * factorTimes2 * inverseFactor;
    var factor4 = factorTimes2 * t;
    out[0] = a[0] * factor1 + b[0] * factor2 + c[0] * factor3 + d[0] * factor4;
    out[1] = a[1] * factor1 + b[1] * factor2 + c[1] * factor3 + d[1] * factor4;
    out[2] = a[2] * factor1 + b[2] * factor2 + c[2] * factor3 + d[2] * factor4;
    return out;
  }
  function random(out, scale5) {
    scale5 = scale5 || 1;
    var r = RANDOM() * 2 * Math.PI;
    var z = RANDOM() * 2 - 1;
    var zScale = Math.sqrt(1 - z * z) * scale5;
    out[0] = Math.cos(r) * zScale;
    out[1] = Math.sin(r) * zScale;
    out[2] = z * scale5;
    return out;
  }
  function transformMat4(out, a, m) {
    var x = a[0], y = a[1], z = a[2];
    var w = m[3] * x + m[7] * y + m[11] * z + m[15];
    w = w || 1;
    out[0] = (m[0] * x + m[4] * y + m[8] * z + m[12]) / w;
    out[1] = (m[1] * x + m[5] * y + m[9] * z + m[13]) / w;
    out[2] = (m[2] * x + m[6] * y + m[10] * z + m[14]) / w;
    return out;
  }
  function transformMat3(out, a, m) {
    var x = a[0], y = a[1], z = a[2];
    out[0] = x * m[0] + y * m[3] + z * m[6];
    out[1] = x * m[1] + y * m[4] + z * m[7];
    out[2] = x * m[2] + y * m[5] + z * m[8];
    return out;
  }
  function transformQuat(out, a, q) {
    var qx = q[0], qy = q[1], qz = q[2], qw = q[3];
    var x = a[0], y = a[1], z = a[2];
    var uvx = qy * z - qz * y, uvy = qz * x - qx * z, uvz = qx * y - qy * x;
    var uuvx = qy * uvz - qz * uvy, uuvy = qz * uvx - qx * uvz, uuvz = qx * uvy - qy * uvx;
    var w2 = qw * 2;
    uvx *= w2;
    uvy *= w2;
    uvz *= w2;
    uuvx *= 2;
    uuvy *= 2;
    uuvz *= 2;
    out[0] = x + uvx + uuvx;
    out[1] = y + uvy + uuvy;
    out[2] = z + uvz + uuvz;
    return out;
  }
  function rotateX2(out, a, b, rad) {
    var p = [], r = [];
    p[0] = a[0] - b[0];
    p[1] = a[1] - b[1];
    p[2] = a[2] - b[2];
    r[0] = p[0];
    r[1] = p[1] * Math.cos(rad) - p[2] * Math.sin(rad);
    r[2] = p[1] * Math.sin(rad) + p[2] * Math.cos(rad);
    out[0] = r[0] + b[0];
    out[1] = r[1] + b[1];
    out[2] = r[2] + b[2];
    return out;
  }
  function rotateY2(out, a, b, rad) {
    var p = [], r = [];
    p[0] = a[0] - b[0];
    p[1] = a[1] - b[1];
    p[2] = a[2] - b[2];
    r[0] = p[2] * Math.sin(rad) + p[0] * Math.cos(rad);
    r[1] = p[1];
    r[2] = p[2] * Math.cos(rad) - p[0] * Math.sin(rad);
    out[0] = r[0] + b[0];
    out[1] = r[1] + b[1];
    out[2] = r[2] + b[2];
    return out;
  }
  function rotateZ2(out, a, b, rad) {
    var p = [], r = [];
    p[0] = a[0] - b[0];
    p[1] = a[1] - b[1];
    p[2] = a[2] - b[2];
    r[0] = p[0] * Math.cos(rad) - p[1] * Math.sin(rad);
    r[1] = p[0] * Math.sin(rad) + p[1] * Math.cos(rad);
    r[2] = p[2];
    out[0] = r[0] + b[0];
    out[1] = r[1] + b[1];
    out[2] = r[2] + b[2];
    return out;
  }
  function angle(a, b) {
    var ax = a[0], ay = a[1], az = a[2], bx = b[0], by = b[1], bz = b[2], mag1 = Math.sqrt(ax * ax + ay * ay + az * az), mag2 = Math.sqrt(bx * bx + by * by + bz * bz), mag = mag1 * mag2, cosine = mag && dot(a, b) / mag;
    return Math.acos(Math.min(Math.max(cosine, -1), 1));
  }
  function zero(out) {
    out[0] = 0;
    out[1] = 0;
    out[2] = 0;
    return out;
  }
  function str2(a) {
    return "vec3(" + a[0] + ", " + a[1] + ", " + a[2] + ")";
  }
  function exactEquals2(a, b) {
    return a[0] === b[0] && a[1] === b[1] && a[2] === b[2];
  }
  function equals2(a, b) {
    var a0 = a[0], a1 = a[1], a2 = a[2];
    var b0 = b[0], b1 = b[1], b2 = b[2];
    return Math.abs(a0 - b0) <= EPSILON * Math.max(1, Math.abs(a0), Math.abs(b0)) && Math.abs(a1 - b1) <= EPSILON * Math.max(1, Math.abs(a1), Math.abs(b1)) && Math.abs(a2 - b2) <= EPSILON * Math.max(1, Math.abs(a2), Math.abs(b2));
  }
  var sub2 = subtract2;
  var mul2 = multiply2;
  var div = divide;
  var dist = distance;
  var sqrDist = squaredDistance;
  var len = length;
  var sqrLen = squaredLength;
  var forEach = function() {
    var vec = create3();
    return function(a, stride, offset, count, fn, arg) {
      var i, l;
      if (!stride) {
        stride = 3;
      }
      if (!offset) {
        offset = 0;
      }
      if (count) {
        l = Math.min(count * stride + offset, a.length);
      } else {
        l = a.length;
      }
      for (i = offset; i < l; i += stride) {
        vec[0] = a[i];
        vec[1] = a[i + 1];
        vec[2] = a[i + 2];
        fn(vec, vec, arg);
        a[i] = vec[0];
        a[i + 1] = vec[1];
        a[i + 2] = vec[2];
      }
      return a;
    };
  }();

  // node_modules/gl-matrix/esm/vec4.js
  function create4() {
    var out = new ARRAY_TYPE(4);
    if (ARRAY_TYPE != Float32Array) {
      out[0] = 0;
      out[1] = 0;
      out[2] = 0;
      out[3] = 0;
    }
    return out;
  }
  function clone3(a) {
    var out = new ARRAY_TYPE(4);
    out[0] = a[0];
    out[1] = a[1];
    out[2] = a[2];
    out[3] = a[3];
    return out;
  }
  function fromValues3(x, y, z, w) {
    var out = new ARRAY_TYPE(4);
    out[0] = x;
    out[1] = y;
    out[2] = z;
    out[3] = w;
    return out;
  }
  function copy3(out, a) {
    out[0] = a[0];
    out[1] = a[1];
    out[2] = a[2];
    out[3] = a[3];
    return out;
  }
  function set3(out, x, y, z, w) {
    out[0] = x;
    out[1] = y;
    out[2] = z;
    out[3] = w;
    return out;
  }
  function add3(out, a, b) {
    out[0] = a[0] + b[0];
    out[1] = a[1] + b[1];
    out[2] = a[2] + b[2];
    out[3] = a[3] + b[3];
    return out;
  }
  function scale3(out, a, b) {
    out[0] = a[0] * b;
    out[1] = a[1] * b;
    out[2] = a[2] * b;
    out[3] = a[3] * b;
    return out;
  }
  function length2(a) {
    var x = a[0];
    var y = a[1];
    var z = a[2];
    var w = a[3];
    return Math.hypot(x, y, z, w);
  }
  function squaredLength2(a) {
    var x = a[0];
    var y = a[1];
    var z = a[2];
    var w = a[3];
    return x * x + y * y + z * z + w * w;
  }
  function normalize2(out, a) {
    var x = a[0];
    var y = a[1];
    var z = a[2];
    var w = a[3];
    var len3 = x * x + y * y + z * z + w * w;
    if (len3 > 0) {
      len3 = 1 / Math.sqrt(len3);
    }
    out[0] = x * len3;
    out[1] = y * len3;
    out[2] = z * len3;
    out[3] = w * len3;
    return out;
  }
  function dot2(a, b) {
    return a[0] * b[0] + a[1] * b[1] + a[2] * b[2] + a[3] * b[3];
  }
  function lerp2(out, a, b, t) {
    var ax = a[0];
    var ay = a[1];
    var az = a[2];
    var aw = a[3];
    out[0] = ax + t * (b[0] - ax);
    out[1] = ay + t * (b[1] - ay);
    out[2] = az + t * (b[2] - az);
    out[3] = aw + t * (b[3] - aw);
    return out;
  }
  function exactEquals3(a, b) {
    return a[0] === b[0] && a[1] === b[1] && a[2] === b[2] && a[3] === b[3];
  }
  function equals3(a, b) {
    var a0 = a[0], a1 = a[1], a2 = a[2], a3 = a[3];
    var b0 = b[0], b1 = b[1], b2 = b[2], b3 = b[3];
    return Math.abs(a0 - b0) <= EPSILON * Math.max(1, Math.abs(a0), Math.abs(b0)) && Math.abs(a1 - b1) <= EPSILON * Math.max(1, Math.abs(a1), Math.abs(b1)) && Math.abs(a2 - b2) <= EPSILON * Math.max(1, Math.abs(a2), Math.abs(b2)) && Math.abs(a3 - b3) <= EPSILON * Math.max(1, Math.abs(a3), Math.abs(b3));
  }
  var forEach2 = function() {
    var vec = create4();
    return function(a, stride, offset, count, fn, arg) {
      var i, l;
      if (!stride) {
        stride = 4;
      }
      if (!offset) {
        offset = 0;
      }
      if (count) {
        l = Math.min(count * stride + offset, a.length);
      } else {
        l = a.length;
      }
      for (i = offset; i < l; i += stride) {
        vec[0] = a[i];
        vec[1] = a[i + 1];
        vec[2] = a[i + 2];
        vec[3] = a[i + 3];
        fn(vec, vec, arg);
        a[i] = vec[0];
        a[i + 1] = vec[1];
        a[i + 2] = vec[2];
        a[i + 3] = vec[3];
      }
      return a;
    };
  }();

  // node_modules/gl-matrix/esm/quat.js
  function create5() {
    var out = new ARRAY_TYPE(4);
    if (ARRAY_TYPE != Float32Array) {
      out[0] = 0;
      out[1] = 0;
      out[2] = 0;
    }
    out[3] = 1;
    return out;
  }
  function identity2(out) {
    out[0] = 0;
    out[1] = 0;
    out[2] = 0;
    out[3] = 1;
    return out;
  }
  function setAxisAngle(out, axis, rad) {
    rad = rad * 0.5;
    var s = Math.sin(rad);
    out[0] = s * axis[0];
    out[1] = s * axis[1];
    out[2] = s * axis[2];
    out[3] = Math.cos(rad);
    return out;
  }
  function getAxisAngle(out_axis, q) {
    var rad = Math.acos(q[3]) * 2;
    var s = Math.sin(rad / 2);
    if (s > EPSILON) {
      out_axis[0] = q[0] / s;
      out_axis[1] = q[1] / s;
      out_axis[2] = q[2] / s;
    } else {
      out_axis[0] = 1;
      out_axis[1] = 0;
      out_axis[2] = 0;
    }
    return rad;
  }
  function getAngle(a, b) {
    var dotproduct = dot3(a, b);
    return Math.acos(2 * dotproduct * dotproduct - 1);
  }
  function multiply3(out, a, b) {
    var ax = a[0], ay = a[1], az = a[2], aw = a[3];
    var bx = b[0], by = b[1], bz = b[2], bw = b[3];
    out[0] = ax * bw + aw * bx + ay * bz - az * by;
    out[1] = ay * bw + aw * by + az * bx - ax * bz;
    out[2] = az * bw + aw * bz + ax * by - ay * bx;
    out[3] = aw * bw - ax * bx - ay * by - az * bz;
    return out;
  }
  function rotateX3(out, a, rad) {
    rad *= 0.5;
    var ax = a[0], ay = a[1], az = a[2], aw = a[3];
    var bx = Math.sin(rad), bw = Math.cos(rad);
    out[0] = ax * bw + aw * bx;
    out[1] = ay * bw + az * bx;
    out[2] = az * bw - ay * bx;
    out[3] = aw * bw - ax * bx;
    return out;
  }
  function rotateY3(out, a, rad) {
    rad *= 0.5;
    var ax = a[0], ay = a[1], az = a[2], aw = a[3];
    var by = Math.sin(rad), bw = Math.cos(rad);
    out[0] = ax * bw - az * by;
    out[1] = ay * bw + aw * by;
    out[2] = az * bw + ax * by;
    out[3] = aw * bw - ay * by;
    return out;
  }
  function rotateZ3(out, a, rad) {
    rad *= 0.5;
    var ax = a[0], ay = a[1], az = a[2], aw = a[3];
    var bz = Math.sin(rad), bw = Math.cos(rad);
    out[0] = ax * bw + ay * bz;
    out[1] = ay * bw - ax * bz;
    out[2] = az * bw + aw * bz;
    out[3] = aw * bw - az * bz;
    return out;
  }
  function calculateW(out, a) {
    var x = a[0], y = a[1], z = a[2];
    out[0] = x;
    out[1] = y;
    out[2] = z;
    out[3] = Math.sqrt(Math.abs(1 - x * x - y * y - z * z));
    return out;
  }
  function exp(out, a) {
    var x = a[0], y = a[1], z = a[2], w = a[3];
    var r = Math.sqrt(x * x + y * y + z * z);
    var et = Math.exp(w);
    var s = r > 0 ? et * Math.sin(r) / r : 0;
    out[0] = x * s;
    out[1] = y * s;
    out[2] = z * s;
    out[3] = et * Math.cos(r);
    return out;
  }
  function ln(out, a) {
    var x = a[0], y = a[1], z = a[2], w = a[3];
    var r = Math.sqrt(x * x + y * y + z * z);
    var t = r > 0 ? Math.atan2(r, w) / r : 0;
    out[0] = x * t;
    out[1] = y * t;
    out[2] = z * t;
    out[3] = 0.5 * Math.log(x * x + y * y + z * z + w * w);
    return out;
  }
  function pow(out, a, b) {
    ln(out, a);
    scale4(out, out, b);
    exp(out, out);
    return out;
  }
  function slerp(out, a, b, t) {
    var ax = a[0], ay = a[1], az = a[2], aw = a[3];
    var bx = b[0], by = b[1], bz = b[2], bw = b[3];
    var omega, cosom, sinom, scale0, scale1;
    cosom = ax * bx + ay * by + az * bz + aw * bw;
    if (cosom < 0) {
      cosom = -cosom;
      bx = -bx;
      by = -by;
      bz = -bz;
      bw = -bw;
    }
    if (1 - cosom > EPSILON) {
      omega = Math.acos(cosom);
      sinom = Math.sin(omega);
      scale0 = Math.sin((1 - t) * omega) / sinom;
      scale1 = Math.sin(t * omega) / sinom;
    } else {
      scale0 = 1 - t;
      scale1 = t;
    }
    out[0] = scale0 * ax + scale1 * bx;
    out[1] = scale0 * ay + scale1 * by;
    out[2] = scale0 * az + scale1 * bz;
    out[3] = scale0 * aw + scale1 * bw;
    return out;
  }
  function random2(out) {
    var u1 = RANDOM();
    var u2 = RANDOM();
    var u3 = RANDOM();
    var sqrt1MinusU1 = Math.sqrt(1 - u1);
    var sqrtU1 = Math.sqrt(u1);
    out[0] = sqrt1MinusU1 * Math.sin(2 * Math.PI * u2);
    out[1] = sqrt1MinusU1 * Math.cos(2 * Math.PI * u2);
    out[2] = sqrtU1 * Math.sin(2 * Math.PI * u3);
    out[3] = sqrtU1 * Math.cos(2 * Math.PI * u3);
    return out;
  }
  function invert2(out, a) {
    var a0 = a[0], a1 = a[1], a2 = a[2], a3 = a[3];
    var dot4 = a0 * a0 + a1 * a1 + a2 * a2 + a3 * a3;
    var invDot = dot4 ? 1 / dot4 : 0;
    out[0] = -a0 * invDot;
    out[1] = -a1 * invDot;
    out[2] = -a2 * invDot;
    out[3] = a3 * invDot;
    return out;
  }
  function conjugate(out, a) {
    out[0] = -a[0];
    out[1] = -a[1];
    out[2] = -a[2];
    out[3] = a[3];
    return out;
  }
  function fromMat3(out, m) {
    var fTrace = m[0] + m[4] + m[8];
    var fRoot;
    if (fTrace > 0) {
      fRoot = Math.sqrt(fTrace + 1);
      out[3] = 0.5 * fRoot;
      fRoot = 0.5 / fRoot;
      out[0] = (m[5] - m[7]) * fRoot;
      out[1] = (m[6] - m[2]) * fRoot;
      out[2] = (m[1] - m[3]) * fRoot;
    } else {
      var i = 0;
      if (m[4] > m[0])
        i = 1;
      if (m[8] > m[i * 3 + i])
        i = 2;
      var j = (i + 1) % 3;
      var k = (i + 2) % 3;
      fRoot = Math.sqrt(m[i * 3 + i] - m[j * 3 + j] - m[k * 3 + k] + 1);
      out[i] = 0.5 * fRoot;
      fRoot = 0.5 / fRoot;
      out[3] = (m[j * 3 + k] - m[k * 3 + j]) * fRoot;
      out[j] = (m[j * 3 + i] + m[i * 3 + j]) * fRoot;
      out[k] = (m[k * 3 + i] + m[i * 3 + k]) * fRoot;
    }
    return out;
  }
  function fromEuler(out, x, y, z) {
    var halfToRad = 0.5 * Math.PI / 180;
    x *= halfToRad;
    y *= halfToRad;
    z *= halfToRad;
    var sx = Math.sin(x);
    var cx = Math.cos(x);
    var sy = Math.sin(y);
    var cy = Math.cos(y);
    var sz = Math.sin(z);
    var cz = Math.cos(z);
    out[0] = sx * cy * cz - cx * sy * sz;
    out[1] = cx * sy * cz + sx * cy * sz;
    out[2] = cx * cy * sz - sx * sy * cz;
    out[3] = cx * cy * cz + sx * sy * sz;
    return out;
  }
  function str3(a) {
    return "quat(" + a[0] + ", " + a[1] + ", " + a[2] + ", " + a[3] + ")";
  }
  var clone4 = clone3;
  var fromValues4 = fromValues3;
  var copy4 = copy3;
  var set4 = set3;
  var add4 = add3;
  var mul3 = multiply3;
  var scale4 = scale3;
  var dot3 = dot2;
  var lerp3 = lerp2;
  var length3 = length2;
  var len2 = length3;
  var squaredLength3 = squaredLength2;
  var sqrLen2 = squaredLength3;
  var normalize3 = normalize2;
  var exactEquals4 = exactEquals3;
  var equals4 = equals3;
  var rotationTo = function() {
    var tmpvec3 = create3();
    var xUnitVec3 = fromValues2(1, 0, 0);
    var yUnitVec3 = fromValues2(0, 1, 0);
    return function(out, a, b) {
      var dot4 = dot(a, b);
      if (dot4 < -0.999999) {
        cross(tmpvec3, xUnitVec3, a);
        if (len(tmpvec3) < 1e-6)
          cross(tmpvec3, yUnitVec3, a);
        normalize(tmpvec3, tmpvec3);
        setAxisAngle(out, tmpvec3, Math.PI);
        return out;
      } else if (dot4 > 0.999999) {
        out[0] = 0;
        out[1] = 0;
        out[2] = 0;
        out[3] = 1;
        return out;
      } else {
        cross(tmpvec3, a, b);
        out[0] = tmpvec3[0];
        out[1] = tmpvec3[1];
        out[2] = tmpvec3[2];
        out[3] = 1 + dot4;
        return normalize3(out, out);
      }
    };
  }();
  var sqlerp = function() {
    var temp1 = create5();
    var temp2 = create5();
    return function(out, a, b, c, d, t) {
      slerp(temp1, a, d, t);
      slerp(temp2, b, c, t);
      slerp(out, temp1, temp2, 2 * t * (1 - t));
      return out;
    };
  }();
  var setAxes = function() {
    var matr = create();
    return function(out, view, right, up) {
      matr[0] = right[0];
      matr[3] = right[1];
      matr[6] = right[2];
      matr[1] = up[0];
      matr[4] = up[1];
      matr[7] = up[2];
      matr[2] = -view[0];
      matr[5] = -view[1];
      matr[8] = -view[2];
      return normalize3(out, fromMat3(out, matr));
    };
  }();

  // dev/hw3/shader.ts
  var createProgram = (gl, vsSource, fsSource) => {
    const vertexShader = compileShader(gl, gl.VERTEX_SHADER, vsSource);
    const fragmentShader = compileShader(gl, gl.FRAGMENT_SHADER, fsSource);
    const shaderProgram = gl.createProgram();
    gl.attachShader(shaderProgram, vertexShader);
    gl.attachShader(shaderProgram, fragmentShader);
    gl.linkProgram(shaderProgram);
    if (!gl.getProgramParameter(shaderProgram, gl.LINK_STATUS)) {
      console.log("Unable to initialize the shader program: " + gl.getProgramInfoLog(shaderProgram));
      return null;
    }
    return shaderProgram;
  };
  var compileShader = (gl, type, source) => {
    const shader2 = gl.createShader(type);
    gl.shaderSource(shader2, source);
    gl.compileShader(shader2);
    if (!gl.getShaderParameter(shader2, gl.COMPILE_STATUS)) {
      console.log("An error occurred compiling the shaders: " + gl.getShaderInfoLog(shader2));
      gl.deleteShader(shader2);
      return null;
    }
    return shader2;
  };

  // dev/hw3/gl-unit.ts
  var Primitive = class {
    constructor(gl, primitiveInfo, doc, bin, textures, bones) {
      const vao = gl.createVertexArray();
      gl.bindVertexArray(vao);
      let shader_info = Object.keys(primitiveInfo.attributes).map((attribute, loc) => {
        const accessor = doc.accessors[primitiveInfo.attributes[attribute]];
        const bufferView = doc.bufferViews[accessor.bufferView];
        gl.enableVertexAttribArray(loc);
        const vbo = gl.createBuffer();
        gl.bindBuffer(gl.ARRAY_BUFFER, vbo);
        gl.bufferData(gl.ARRAY_BUFFER, bin.slice(bufferView.byteOffset, bufferView.byteOffset + bufferView.byteLength).buffer, gl.STATIC_DRAW);
        let size = (() => {
          switch (accessor.type) {
            case "SCALAR":
              return 1;
            case "VEC2":
              return 2;
            case "VEC3":
              return 3;
            case "VEC4":
              return 4;
          }
        })();
        gl.vertexAttribPointer(loc, size, accessor.componentType, false, bufferView["byteStride"] || 0, accessor["byteOffset"] || 0);
        return {
          loc,
          type: accessor.type.toLowerCase(),
          attribute: attribute.toLowerCase(),
          vbo
        };
      });
      if (primitiveInfo.indices != void 0) {
        const accessor = doc.accessors[primitiveInfo.indices];
        const bufferView = doc.bufferViews[accessor.bufferView];
        const ebo = gl.createBuffer();
        gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, ebo);
        gl.bufferData(gl.ELEMENT_ARRAY_BUFFER, bin.slice(bufferView.byteOffset, bufferView.byteOffset + bufferView.byteLength).buffer, gl.STATIC_DRAW);
        this.count = accessor.count;
        this.type = accessor.componentType;
      } else {
        const accessor = doc.accessors[primitiveInfo.attributes.POSITION];
        this.count = accessor.count;
      }
      {
        this.gl = gl;
        this.vao = vao;
        this.mode = primitiveInfo["mode"] || gl.TRIANGLES;
        const baseColorTexture = doc.materials[primitiveInfo.material].pbrMetallicRoughness["baseColorTexture"];
        if (baseColorTexture != void 0) {
          this.baseColorTexture = textures[baseColorTexture.index];
        }
        const baseColorFactor = doc.materials[primitiveInfo.material].pbrMetallicRoughness["baseColorFactor"];
        if (baseColorFactor != void 0) {
          this.baseColorFactor = baseColorFactor;
        } else {
          this.baseColorFactor = [0, 0, 0, 0];
        }
      }
      let vs_in = shader_info.map(({loc, type, attribute}) => {
        return `layout (location = ${loc}) in ${type} a_${attribute};
`;
      });
      let vs_out = shader_info.map(({loc, type, attribute}) => {
        return `out ${type} v_${attribute};
`;
      });
      let vs_assign = shader_info.map(({loc, type, attribute}) => {
        return `v_${attribute} = a_${attribute};
`;
      });
      let vs_source = `#version 300 es
uniform mat4 u_mvp;
uniform mat4[${bones ?? 1}] u_jointMatrix;
` + vs_in.reduce((prev, curr) => prev + curr, ``) + vs_out.reduce((prev, curr) => prev + curr, ``) + `void main(void) {
` + vs_assign.reduce((prev, curr) => prev + `   ` + curr, ``) + `   mat4 skinMatrix =   v_weights_0.x * u_jointMatrix[int(v_joints_0.x)] +   v_weights_0.y * u_jointMatrix[int(v_joints_0.y)] +   v_weights_0.z * u_jointMatrix[int(v_joints_0.z)] +   v_weights_0.w * u_jointMatrix[int(v_joints_0.w)];   gl_Position = u_mvp * skinMatrix * vec4(a_position, 1.0);
}
`;
      console.log(vs_source);
      let fs_in = shader_info.map(({loc, type, attribute}) => {
        return `in ${type} v_${attribute};
`;
      });
      let fs_source = `#version 300 es
precision mediump float;
` + fs_in.reduce((prev, curr) => prev + curr, ``) + `out vec4 f_color;
uniform sampler2D u_texture;
uniform vec4 u_basecolor;
void main(void) {
` + (() => {
        let s = "";
        if (this.baseColorTexture != void 0) {
          s = `   vec4 texcolor = texture(u_texture, v_texcoord_0);
   f_color.a = texcolor.a + u_basecolor.a * (1.0 - texcolor.a);
   if (f_color.a == 0.) { f_color.rgb = vec3(0., 0., 0.); }
   else { f_color.rgb = texcolor.rgb * texcolor.a + u_basecolor.rgb * u_basecolor.a * (1. - texcolor.a); };
`;
        } else {
          s = `   f_color = u_basecolor;
`;
        }
        return s;
      })() + `}
`;
      console.log(fs_source);
      {
        this.program = createProgram(gl, vs_source, fs_source);
      }
    }
    draw(mvp) {
      const gl = this.gl;
      gl.useProgram(this.program);
      let u_basecolorLocation = gl.getUniformLocation(this.program, "u_basecolor");
      gl.uniform4fv(u_basecolorLocation, this.baseColorFactor);
      let u_textureLocation = gl.getUniformLocation(this.program, "u_texture");
      gl.uniform1i(u_textureLocation, 0);
      gl.activeTexture(gl.TEXTURE0);
      gl.bindTexture(gl.TEXTURE_2D, this.baseColorTexture);
      gl.bindVertexArray(this.vao);
      let u_mvp_loc = gl.getUniformLocation(this.program, "u_mvp");
      gl.uniformMatrix4fv(u_mvp_loc, false, mvp);
      if (this.type != void 0)
        gl.drawElements(this.mode, this.count, this.type, 0);
      else
        gl.drawArrays(this.mode, 0, this.count);
      gl.bindVertexArray(null);
    }
    drawAnim(mvp, bones) {
      const gl = this.gl;
      gl.useProgram(this.program);
      let u_basecolorLocation = gl.getUniformLocation(this.program, "u_basecolor");
      gl.uniform4fv(u_basecolorLocation, this.baseColorFactor);
      let u_textureLocation = gl.getUniformLocation(this.program, "u_texture");
      gl.uniform1i(u_textureLocation, 0);
      gl.activeTexture(gl.TEXTURE0);
      gl.bindTexture(gl.TEXTURE_2D, this.baseColorTexture);
      gl.bindVertexArray(this.vao);
      let u_mvp_loc = gl.getUniformLocation(this.program, "u_mvp");
      gl.uniformMatrix4fv(u_mvp_loc, false, mvp);
      bones.forEach((bone, idx) => {
        let u_jointMatrix_loc = gl.getUniformLocation(this.program, `u_jointMatrix[${idx}]`);
        gl.uniformMatrix4fv(u_jointMatrix_loc, false, bone);
      });
      if (this.type != void 0)
        gl.drawElements(this.mode, this.count, this.type, 0);
      else
        gl.drawArrays(this.mode, 0, this.count);
      gl.bindVertexArray(null);
    }
  };
  var primitive = (gl, primitiveInfo, doc, bin, textures, bones) => new Primitive(gl, primitiveInfo, doc, bin, textures, bones);

  // dev/hw3/gltf.ts
  var asModel = async (glbBytes) => {
    let doc = null;
    let bin = null;
    let offset = 12;
    for (let i = 0; offset < glbBytes.length; i++) {
      const len3 = glbBytes.slice(offset, offset + 4).reduce((prev, curr, idx) => {
        return prev + curr * 256 ** idx;
      }, 0);
      const type = String.fromCharCode(...glbBytes.slice(offset + 4, offset + 8));
      const data = glbBytes.slice(offset + 8, offset + 8 + len3);
      switch (type) {
        case "BIN\0": {
          bin = data;
          break;
        }
        case "JSON": {
          doc = JSON.parse(String.fromCharCode(...data));
          break;
        }
        default: {
          console.error(`chunk type : ${type} is not defined`);
        }
      }
      offset += 8 + len3;
    }
    let imgs = [];
    const images = doc.images || [];
    for (let image of images) {
      let img = await new Promise((resolve, reject) => {
        const bufferView = doc.bufferViews[image.bufferView];
        let imgBlob = new Blob([
          bin.slice(bufferView.byteOffset || 0, (bufferView.byteOffset || 0) + bufferView.byteLength)
        ], {type: image.mimeType});
        let imgUrl = URL.createObjectURL(imgBlob);
        let img2 = new Image();
        img2.onload = () => resolve(img2);
        img2.src = imgUrl;
      });
      imgs.push(img);
    }
    return {doc, bin, imgs};
  };
  var importFromArrayBuffer = (bytes) => {
    console.log(String.fromCharCode(...new Uint8Array(bytes.slice(0, 4))));
    console.log(`ver.${new Uint32Array(bytes.slice(4, 8))[0]}`);
    console.log(`Bytes : ${new Uint32Array(bytes.slice(8, 12))[0]}`);
    return asModel(new Uint8Array(bytes));
  };
  var createTexture = (gl, doc, imgs) => {
    return (doc.textures || []).map((texInfo) => {
      const texture = gl.createTexture();
      gl.bindTexture(gl.TEXTURE_2D, texture);
      if (texInfo["sampler"] != void 0) {
        const sampler = doc.samplers[texInfo.sampler];
        if (sampler["magFilter"] != void 0) {
          gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MAG_FILTER, sampler["magFilter"]);
        }
        if (sampler["minFilter"] != void 0) {
          gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MIN_FILTER, sampler["minFilter"]);
        }
        if (sampler["wrapS"] != void 0) {
          gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_S, sampler["wrapS"]);
        }
        if (sampler["wrapT"] != void 0) {
          gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_T, sampler["wrapT"]);
        }
      }
      const img = imgs[texInfo.source];
      gl.texStorage2D(gl.TEXTURE_2D, 1, gl.RGB8, img.width, img.height);
      gl.texSubImage2D(gl.TEXTURE_2D, 0, 0, 0, gl.RGB, gl.UNSIGNED_BYTE, img);
      gl.generateMipmap(gl.TEXTURE_2D);
      return texture;
    });
  };

  // dev/hw3/gltf-skeleton.ts
  var getGlobalJointTransforms = (idx, nodes, rotations, gMat, jointMats) => {
    let rotation = [...nodes[idx]["rotation"] ?? [0, 0, 0, 0]];
    rotation = quat_exports.rotateX(quat_exports.create(), rotation, rotations[idx].x);
    rotation = quat_exports.rotateY(quat_exports.create(), rotation, rotations[idx].y);
    rotation = quat_exports.rotateZ(quat_exports.create(), rotation, rotations[idx].z);
    jointMats[idx] = mat4_exports.mul(mat4_exports.create(), gMat, mat4_exports.fromRotationTranslationScale(mat4_exports.create(), rotation, nodes[idx]["translation"] || [0, 0, 0], nodes[idx]["scale"] || [1, 1, 1]));
    return nodes[idx].children?.reduce((jointMats2, child) => {
      return getGlobalJointTransforms(child, nodes, rotations, jointMats2[idx], Object.assign({}, jointMats2));
    }, jointMats) ?? jointMats;
  };
  var getAccessorBuff = (accessorIdx, doc, bin) => {
    const accessor = doc.accessors[accessorIdx];
    const bv = doc.bufferViews[accessor.bufferView];
    const buf = bin.slice(bv.byteOffset + (accessor?.byteOffset ?? 0), bv.byteOffset + bv.byteLength);
    const size = (() => {
      switch (accessor.type) {
        case "SCALAR":
          return 1;
        case "VEC2":
          return 2;
        case "VEC3":
          return 3;
        case "VEC4":
          return 4;
        case "MAT2":
          return 4;
        case "MAT3":
          return 9;
        case "MAT4":
          return 16;
      }
    })();
    const stride = bv.byteStride;
    return new Array(accessor.count).fill(0).map((_, idx) => {
      if (stride == void 0)
        return new Float32Array(buf.slice(4 * idx * size, 4 * (idx + 1) * size).buffer);
      else
        return new Float32Array(buf.slice(idx * stride, (idx + 1) * stride).slice(0, 4 * size).buffer);
    });
  };
  var getInverseBindMats = (skin, doc, bin) => {
    return getAccessorBuff(skin.inverseBindMatrices, doc, bin);
  };
  var getAnimStruct = (anim, doc, bin) => {
    return [
      anim.channels.map((ch) => {
        const {input, output} = anim.samplers[ch.sampler];
        return {
          ...ch.target,
          input: getAccessorBuff(input, doc, bin).reduce((prev, curr) => [...prev, ...curr], []),
          output: getAccessorBuff(output, doc, bin)
        };
      }),
      anim.channels.reduce((timeMax, ch) => {
        const {input} = anim.samplers[ch.sampler];
        return Math.max(timeMax, doc.accessors[input].max[0]);
      }, 0)
    ];
  };
  var getAnimNodes = (animStruct, time) => {
    let nodes = {};
    animStruct.map((animUnit) => {
      const idx = animUnit.input.findIndex((t) => t >= time);
      let total = animUnit.input[idx] - (animUnit.input[idx - 1] ?? 0);
      let a = (animUnit.input[idx] - time) / total;
      let b = (time - (animUnit.input[idx - 1] ?? 0)) / total;
      let vec_len = animUnit.path == "rotation" ? 4 : animUnit.path == "scale" ? 3 : 4;
      let vec = new Array(vec_len).fill(0).map((_, j) => {
        return animUnit.output[idx - 1]?.[j] * a + animUnit.output[idx]?.[j] * b;
      });
      if (nodes[animUnit.node] == void 0) {
        nodes[animUnit.node] = {[animUnit.path]: vec};
      } else {
        nodes[animUnit.node][animUnit.path] = vec;
      }
    });
    return nodes;
  };
  var getAnimGlobalJointTransforms = (idx, nodes, rotations, animNodes, gMat, jointMats) => {
    let rotation = [
      ...animNodes[idx]?.["rotation"] ?? nodes[idx]["rotation"] ?? [0, 0, 0, 0]
    ];
    rotation = quat_exports.rotateX(quat_exports.create(), rotation, rotations[idx].x);
    rotation = quat_exports.rotateY(quat_exports.create(), rotation, rotations[idx].y);
    rotation = quat_exports.rotateZ(quat_exports.create(), rotation, rotations[idx].z);
    jointMats[idx] = mat4_exports.mul(mat4_exports.create(), gMat, mat4_exports.fromRotationTranslationScale(mat4_exports.create(), rotation, animNodes[idx]?.["translation"] ?? nodes[idx]["translation"] ?? [0, 0, 0], animNodes[idx]?.["scale"] ?? nodes[idx]["scale"] ?? [1, 1, 1]));
    return nodes[idx].children?.reduce((jointMats2, child) => {
      return getAnimGlobalJointTransforms(child, nodes, rotations, animNodes, jointMats2[idx], Object.assign({}, jointMats2));
    }, jointMats) ?? jointMats;
  };

  // dev/hw3/assets/Fox.glb
  var Fox_default = __toBinary("Z2xURgIAAAAofAIAID8AAEpTT057ImFzc2V0Ijp7ImNvcHlyaWdodCI6IkNDLUJZIDQuMCBNb2RlbCBieSBQaXhlbE1hbm5lbiBodHRwczovL29wZW5nYW1lYXJ0Lm9yZy9jb250ZW50L2ZveC1hbmQtc2hpYmEgYW5kIEB0b21rcmFuaXMgaHR0cHM6Ly9za2V0Y2hmYWIuY29tLzNkLW1vZGVscy9sb3ctcG9seS1mb3gtYnktcGl4ZWxtYW5uZW4tYW5pbWF0ZWQtMzcxZGVhODhkN2UwNGE3NmFmNTc2M2YyYTM2ODY2YmMgYW5kIEBBc29ib1N0dWRpbyB3aXRoIEBzY3VyZXN0IGh0dHBzOi8vZ2l0aHViLmNvbS9LaHJvbm9zR3JvdXAvZ2xURi1TYW1wbGUtTW9kZWxzL3B1bGwvMTUwI2lzc3VlY29tbWVudC00MDYzMDAxMTgiLCJ2ZXJzaW9uIjoiMi4wIn0sImFjY2Vzc29ycyI6W3siYnVmZmVyVmlldyI6MCwiY29tcG9uZW50VHlwZSI6NTEyNiwiY291bnQiOjE3MjgsInR5cGUiOiJWRUMzIiwiYnl0ZU9mZnNldCI6MCwibWluIjpbLTEyLjU5MjcxODEyNDM4OTY0OCwtMC4xMjE3NDQ3NjY4MzEzOTgwMSwtODguMDk1MDAxMjIwNzAzMTJdLCJtYXgiOlsxMi41OTI3MTgxMjQzODk2NDgsNzguOTA3MTg4NDE1NTI3MzQsNjYuNjI0ODYyNjcwODk4NDRdfSx7ImJ1ZmZlclZpZXciOjEsImNvbXBvbmVudFR5cGUiOjUxMjYsImNvdW50IjoxNzI4LCJ0eXBlIjoiVkVDMiIsImJ5dGVPZmZzZXQiOjB9LHsiYnVmZmVyVmlldyI6MSwiY29tcG9uZW50VHlwZSI6NTEyMywiY291bnQiOjE3MjgsInR5cGUiOiJWRUM0IiwiYnl0ZU9mZnNldCI6MTM4MjR9LHsiYnVmZmVyVmlldyI6MiwiYnl0ZU9mZnNldCI6MCwiY29tcG9uZW50VHlwZSI6NTEyNiwiY291bnQiOjE3MjgsInR5cGUiOiJWRUM0In0seyJidWZmZXJWaWV3IjozLCJieXRlT2Zmc2V0IjowLCJjb21wb25lbnRUeXBlIjo1MTI2LCJjb3VudCI6MjQsInR5cGUiOiJNQVQ0In0seyJidWZmZXJWaWV3Ijo0LCJieXRlT2Zmc2V0IjowLCJjb21wb25lbnRUeXBlIjo1MTI2LCJjb3VudCI6ODMsInR5cGUiOiJTQ0FMQVIiLCJtaW4iOlswXSwibWF4IjpbMy40MTY2NjY3NDYxMzk1MjY0XX0seyJidWZmZXJWaWV3Ijo1LCJieXRlT2Zmc2V0IjowLCJjb21wb25lbnRUeXBlIjo1MTI2LCJjb3VudCI6ODMsInR5cGUiOiJWRUM0In0seyJidWZmZXJWaWV3Ijo1LCJieXRlT2Zmc2V0IjoxMzI4LCJjb21wb25lbnRUeXBlIjo1MTI2LCJjb3VudCI6ODMsInR5cGUiOiJWRUM0In0seyJidWZmZXJWaWV3Ijo1LCJieXRlT2Zmc2V0IjoyNjU2LCJjb21wb25lbnRUeXBlIjo1MTI2LCJjb3VudCI6ODMsInR5cGUiOiJWRUM0In0seyJidWZmZXJWaWV3Ijo1LCJieXRlT2Zmc2V0IjozOTg0LCJjb21wb25lbnRUeXBlIjo1MTI2LCJjb3VudCI6ODMsInR5cGUiOiJWRUM0In0seyJidWZmZXJWaWV3Ijo1LCJieXRlT2Zmc2V0Ijo1MzEyLCJjb21wb25lbnRUeXBlIjo1MTI2LCJjb3VudCI6ODMsInR5cGUiOiJWRUM0In0seyJidWZmZXJWaWV3Ijo1LCJieXRlT2Zmc2V0Ijo2NjQwLCJjb21wb25lbnRUeXBlIjo1MTI2LCJjb3VudCI6ODMsInR5cGUiOiJWRUM0In0seyJidWZmZXJWaWV3Ijo1LCJieXRlT2Zmc2V0Ijo3OTY4LCJjb21wb25lbnRUeXBlIjo1MTI2LCJjb3VudCI6ODMsInR5cGUiOiJWRUM0In0seyJidWZmZXJWaWV3Ijo1LCJieXRlT2Zmc2V0Ijo5Mjk2LCJjb21wb25lbnRUeXBlIjo1MTI2LCJjb3VudCI6ODMsInR5cGUiOiJWRUM0In0seyJidWZmZXJWaWV3Ijo1LCJieXRlT2Zmc2V0IjoxMDYyNCwiY29tcG9uZW50VHlwZSI6NTEyNiwiY291bnQiOjgzLCJ0eXBlIjoiVkVDNCJ9LHsiYnVmZmVyVmlldyI6NSwiYnl0ZU9mZnNldCI6MTE5NTIsImNvbXBvbmVudFR5cGUiOjUxMjYsImNvdW50Ijo4MywidHlwZSI6IlZFQzQifSx7ImJ1ZmZlclZpZXciOjUsImJ5dGVPZmZzZXQiOjEzMjgwLCJjb21wb25lbnRUeXBlIjo1MTI2LCJjb3VudCI6ODMsInR5cGUiOiJWRUM0In0seyJidWZmZXJWaWV3Ijo1LCJieXRlT2Zmc2V0IjoxNDYwOCwiY29tcG9uZW50VHlwZSI6NTEyNiwiY291bnQiOjgzLCJ0eXBlIjoiVkVDNCJ9LHsiYnVmZmVyVmlldyI6NSwiYnl0ZU9mZnNldCI6MTU5MzYsImNvbXBvbmVudFR5cGUiOjUxMjYsImNvdW50Ijo4MywidHlwZSI6IlZFQzQifSx7ImJ1ZmZlclZpZXciOjUsImJ5dGVPZmZzZXQiOjE3MjY0LCJjb21wb25lbnRUeXBlIjo1MTI2LCJjb3VudCI6ODMsInR5cGUiOiJWRUM0In0seyJidWZmZXJWaWV3Ijo1LCJieXRlT2Zmc2V0IjoxODU5MiwiY29tcG9uZW50VHlwZSI6NTEyNiwiY291bnQiOjgzLCJ0eXBlIjoiVkVDNCJ9LHsiYnVmZmVyVmlldyI6NSwiYnl0ZU9mZnNldCI6MTk5MjAsImNvbXBvbmVudFR5cGUiOjUxMjYsImNvdW50Ijo4MywidHlwZSI6IlZFQzQifSx7ImJ1ZmZlclZpZXciOjUsImJ5dGVPZmZzZXQiOjIxMjQ4LCJjb21wb25lbnRUeXBlIjo1MTI2LCJjb3VudCI6ODMsInR5cGUiOiJWRUM0In0seyJidWZmZXJWaWV3Ijo1LCJieXRlT2Zmc2V0IjoyMjU3NiwiY29tcG9uZW50VHlwZSI6NTEyNiwiY291bnQiOjgzLCJ0eXBlIjoiVkVDNCJ9LHsiYnVmZmVyVmlldyI6NSwiYnl0ZU9mZnNldCI6MjM5MDQsImNvbXBvbmVudFR5cGUiOjUxMjYsImNvdW50Ijo4MywidHlwZSI6IlZFQzQifSx7ImJ1ZmZlclZpZXciOjYsImJ5dGVPZmZzZXQiOjAsImNvbXBvbmVudFR5cGUiOjUxMjYsImNvdW50Ijo4MywidHlwZSI6IlZFQzMifSx7ImJ1ZmZlclZpZXciOjUsImJ5dGVPZmZzZXQiOjI1MjMyLCJjb21wb25lbnRUeXBlIjo1MTI2LCJjb3VudCI6ODMsInR5cGUiOiJWRUM0In0seyJidWZmZXJWaWV3Ijo0LCJieXRlT2Zmc2V0IjozMzIsImNvbXBvbmVudFR5cGUiOjUxMjYsImNvdW50IjoxOCwidHlwZSI6IlNDQUxBUiIsIm1pbiI6WzBdLCJtYXgiOlswLjcwODMzMzMxMzQ2NTExODRdfSx7ImJ1ZmZlclZpZXciOjUsImJ5dGVPZmZzZXQiOjI2NTYwLCJjb21wb25lbnRUeXBlIjo1MTI2LCJjb3VudCI6MTgsInR5cGUiOiJWRUM0In0seyJidWZmZXJWaWV3Ijo1LCJieXRlT2Zmc2V0IjoyNjg0OCwiY29tcG9uZW50VHlwZSI6NTEyNiwiY291bnQiOjE4LCJ0eXBlIjoiVkVDNCJ9LHsiYnVmZmVyVmlldyI6NSwiYnl0ZU9mZnNldCI6MjcxMzYsImNvbXBvbmVudFR5cGUiOjUxMjYsImNvdW50IjoxOCwidHlwZSI6IlZFQzQifSx7ImJ1ZmZlclZpZXciOjUsImJ5dGVPZmZzZXQiOjI3NDI0LCJjb21wb25lbnRUeXBlIjo1MTI2LCJjb3VudCI6MTgsInR5cGUiOiJWRUM0In0seyJidWZmZXJWaWV3Ijo1LCJieXRlT2Zmc2V0IjoyNzcxMiwiY29tcG9uZW50VHlwZSI6NTEyNiwiY291bnQiOjE4LCJ0eXBlIjoiVkVDNCJ9LHsiYnVmZmVyVmlldyI6NSwiYnl0ZU9mZnNldCI6MjgwMDAsImNvbXBvbmVudFR5cGUiOjUxMjYsImNvdW50IjoxOCwidHlwZSI6IlZFQzQifSx7ImJ1ZmZlclZpZXciOjUsImJ5dGVPZmZzZXQiOjI4Mjg4LCJjb21wb25lbnRUeXBlIjo1MTI2LCJjb3VudCI6MTgsInR5cGUiOiJWRUM0In0seyJidWZmZXJWaWV3Ijo1LCJieXRlT2Zmc2V0IjoyODU3NiwiY29tcG9uZW50VHlwZSI6NTEyNiwiY291bnQiOjE4LCJ0eXBlIjoiVkVDNCJ9LHsiYnVmZmVyVmlldyI6NSwiYnl0ZU9mZnNldCI6Mjg4NjQsImNvbXBvbmVudFR5cGUiOjUxMjYsImNvdW50IjoxOCwidHlwZSI6IlZFQzQifSx7ImJ1ZmZlclZpZXciOjUsImJ5dGVPZmZzZXQiOjI5MTUyLCJjb21wb25lbnRUeXBlIjo1MTI2LCJjb3VudCI6MTgsInR5cGUiOiJWRUM0In0seyJidWZmZXJWaWV3Ijo1LCJieXRlT2Zmc2V0IjoyOTQ0MCwiY29tcG9uZW50VHlwZSI6NTEyNiwiY291bnQiOjE4LCJ0eXBlIjoiVkVDNCJ9LHsiYnVmZmVyVmlldyI6NSwiYnl0ZU9mZnNldCI6Mjk3MjgsImNvbXBvbmVudFR5cGUiOjUxMjYsImNvdW50IjoxOCwidHlwZSI6IlZFQzQifSx7ImJ1ZmZlclZpZXciOjUsImJ5dGVPZmZzZXQiOjMwMDE2LCJjb21wb25lbnRUeXBlIjo1MTI2LCJjb3VudCI6MTgsInR5cGUiOiJWRUM0In0seyJidWZmZXJWaWV3Ijo1LCJieXRlT2Zmc2V0IjozMDMwNCwiY29tcG9uZW50VHlwZSI6NTEyNiwiY291bnQiOjE4LCJ0eXBlIjoiVkVDNCJ9LHsiYnVmZmVyVmlldyI6NSwiYnl0ZU9mZnNldCI6MzA1OTIsImNvbXBvbmVudFR5cGUiOjUxMjYsImNvdW50IjoxOCwidHlwZSI6IlZFQzQifSx7ImJ1ZmZlclZpZXciOjUsImJ5dGVPZmZzZXQiOjMwODgwLCJjb21wb25lbnRUeXBlIjo1MTI2LCJjb3VudCI6MTgsInR5cGUiOiJWRUM0In0seyJidWZmZXJWaWV3Ijo1LCJieXRlT2Zmc2V0IjozMTE2OCwiY29tcG9uZW50VHlwZSI6NTEyNiwiY291bnQiOjE4LCJ0eXBlIjoiVkVDNCJ9LHsiYnVmZmVyVmlldyI6NSwiYnl0ZU9mZnNldCI6MzE0NTYsImNvbXBvbmVudFR5cGUiOjUxMjYsImNvdW50IjoxOCwidHlwZSI6IlZFQzQifSx7ImJ1ZmZlclZpZXciOjUsImJ5dGVPZmZzZXQiOjMxNzQ0LCJjb21wb25lbnRUeXBlIjo1MTI2LCJjb3VudCI6MTgsInR5cGUiOiJWRUM0In0seyJidWZmZXJWaWV3Ijo2LCJieXRlT2Zmc2V0Ijo5OTYsImNvbXBvbmVudFR5cGUiOjUxMjYsImNvdW50IjoxOCwidHlwZSI6IlZFQzMifSx7ImJ1ZmZlclZpZXciOjUsImJ5dGVPZmZzZXQiOjMyMDMyLCJjb21wb25lbnRUeXBlIjo1MTI2LCJjb3VudCI6MTgsInR5cGUiOiJWRUM0In0seyJidWZmZXJWaWV3Ijo0LCJieXRlT2Zmc2V0Ijo0MDQsImNvbXBvbmVudFR5cGUiOjUxMjYsImNvdW50IjoyNSwidHlwZSI6IlNDQUxBUiIsIm1pbiI6WzBdLCJtYXgiOlsxLjE1ODMzMzMwMTU0NDE4OTVdfSx7ImJ1ZmZlclZpZXciOjUsImJ5dGVPZmZzZXQiOjMyMzIwLCJjb21wb25lbnRUeXBlIjo1MTI2LCJjb3VudCI6MjUsInR5cGUiOiJWRUM0In0seyJidWZmZXJWaWV3Ijo1LCJieXRlT2Zmc2V0IjozMjcyMCwiY29tcG9uZW50VHlwZSI6NTEyNiwiY291bnQiOjI1LCJ0eXBlIjoiVkVDNCJ9LHsiYnVmZmVyVmlldyI6NSwiYnl0ZU9mZnNldCI6MzMxMjAsImNvbXBvbmVudFR5cGUiOjUxMjYsImNvdW50IjoyNSwidHlwZSI6IlZFQzQifSx7ImJ1ZmZlclZpZXciOjUsImJ5dGVPZmZzZXQiOjMzNTIwLCJjb21wb25lbnRUeXBlIjo1MTI2LCJjb3VudCI6MjUsInR5cGUiOiJWRUM0In0seyJidWZmZXJWaWV3Ijo1LCJieXRlT2Zmc2V0IjozMzkyMCwiY29tcG9uZW50VHlwZSI6NTEyNiwiY291bnQiOjI1LCJ0eXBlIjoiVkVDNCJ9LHsiYnVmZmVyVmlldyI6NSwiYnl0ZU9mZnNldCI6MzQzMjAsImNvbXBvbmVudFR5cGUiOjUxMjYsImNvdW50IjoyNSwidHlwZSI6IlZFQzQifSx7ImJ1ZmZlclZpZXciOjUsImJ5dGVPZmZzZXQiOjM0NzIwLCJjb21wb25lbnRUeXBlIjo1MTI2LCJjb3VudCI6MjUsInR5cGUiOiJWRUM0In0seyJidWZmZXJWaWV3Ijo1LCJieXRlT2Zmc2V0IjozNTEyMCwiY29tcG9uZW50VHlwZSI6NTEyNiwiY291bnQiOjI1LCJ0eXBlIjoiVkVDNCJ9LHsiYnVmZmVyVmlldyI6NSwiYnl0ZU9mZnNldCI6MzU1MjAsImNvbXBvbmVudFR5cGUiOjUxMjYsImNvdW50IjoyNSwidHlwZSI6IlZFQzQifSx7ImJ1ZmZlclZpZXciOjUsImJ5dGVPZmZzZXQiOjM1OTIwLCJjb21wb25lbnRUeXBlIjo1MTI2LCJjb3VudCI6MjUsInR5cGUiOiJWRUM0In0seyJidWZmZXJWaWV3Ijo1LCJieXRlT2Zmc2V0IjozNjMyMCwiY29tcG9uZW50VHlwZSI6NTEyNiwiY291bnQiOjI1LCJ0eXBlIjoiVkVDNCJ9LHsiYnVmZmVyVmlldyI6NSwiYnl0ZU9mZnNldCI6MzY3MjAsImNvbXBvbmVudFR5cGUiOjUxMjYsImNvdW50IjoyNSwidHlwZSI6IlZFQzQifSx7ImJ1ZmZlclZpZXciOjUsImJ5dGVPZmZzZXQiOjM3MTIwLCJjb21wb25lbnRUeXBlIjo1MTI2LCJjb3VudCI6MjUsInR5cGUiOiJWRUM0In0seyJidWZmZXJWaWV3Ijo1LCJieXRlT2Zmc2V0IjozNzUyMCwiY29tcG9uZW50VHlwZSI6NTEyNiwiY291bnQiOjI1LCJ0eXBlIjoiVkVDNCJ9LHsiYnVmZmVyVmlldyI6NSwiYnl0ZU9mZnNldCI6Mzc5MjAsImNvbXBvbmVudFR5cGUiOjUxMjYsImNvdW50IjoyNSwidHlwZSI6IlZFQzQifSx7ImJ1ZmZlclZpZXciOjUsImJ5dGVPZmZzZXQiOjM4MzIwLCJjb21wb25lbnRUeXBlIjo1MTI2LCJjb3VudCI6MjUsInR5cGUiOiJWRUM0In0seyJidWZmZXJWaWV3Ijo1LCJieXRlT2Zmc2V0IjozODcyMCwiY29tcG9uZW50VHlwZSI6NTEyNiwiY291bnQiOjI1LCJ0eXBlIjoiVkVDNCJ9LHsiYnVmZmVyVmlldyI6NSwiYnl0ZU9mZnNldCI6MzkxMjAsImNvbXBvbmVudFR5cGUiOjUxMjYsImNvdW50IjoyNSwidHlwZSI6IlZFQzQifSx7ImJ1ZmZlclZpZXciOjUsImJ5dGVPZmZzZXQiOjM5NTIwLCJjb21wb25lbnRUeXBlIjo1MTI2LCJjb3VudCI6MjUsInR5cGUiOiJWRUM0In0seyJidWZmZXJWaWV3Ijo2LCJieXRlT2Zmc2V0IjoxMjEyLCJjb21wb25lbnRUeXBlIjo1MTI2LCJjb3VudCI6MjUsInR5cGUiOiJWRUMzIn0seyJidWZmZXJWaWV3Ijo1LCJieXRlT2Zmc2V0IjozOTkyMCwiY29tcG9uZW50VHlwZSI6NTEyNiwiY291bnQiOjI1LCJ0eXBlIjoiVkVDNCJ9XSwiYW5pbWF0aW9ucyI6W3siY2hhbm5lbHMiOlt7InNhbXBsZXIiOjAsInRhcmdldCI6eyJub2RlIjo4LCJwYXRoIjoicm90YXRpb24ifX0seyJzYW1wbGVyIjoxLCJ0YXJnZXQiOnsibm9kZSI6NywicGF0aCI6InJvdGF0aW9uIn19LHsic2FtcGxlciI6MiwidGFyZ2V0Ijp7Im5vZGUiOjExLCJwYXRoIjoicm90YXRpb24ifX0seyJzYW1wbGVyIjozLCJ0YXJnZXQiOnsibm9kZSI6MTAsInBhdGgiOiJyb3RhdGlvbiJ9fSx7InNhbXBsZXIiOjQsInRhcmdldCI6eyJub2RlIjo5LCJwYXRoIjoicm90YXRpb24ifX0seyJzYW1wbGVyIjo1LCJ0YXJnZXQiOnsibm9kZSI6MTQsInBhdGgiOiJyb3RhdGlvbiJ9fSx7InNhbXBsZXIiOjYsInRhcmdldCI6eyJub2RlIjoxMywicGF0aCI6InJvdGF0aW9uIn19LHsic2FtcGxlciI6NywidGFyZ2V0Ijp7Im5vZGUiOjEyLCJwYXRoIjoicm90YXRpb24ifX0seyJzYW1wbGVyIjo4LCJ0YXJnZXQiOnsibm9kZSI6NiwicGF0aCI6InJvdGF0aW9uIn19LHsic2FtcGxlciI6OSwidGFyZ2V0Ijp7Im5vZGUiOjUsInBhdGgiOiJyb3RhdGlvbiJ9fSx7InNhbXBsZXIiOjEwLCJ0YXJnZXQiOnsibm9kZSI6MTcsInBhdGgiOiJyb3RhdGlvbiJ9fSx7InNhbXBsZXIiOjExLCJ0YXJnZXQiOnsibm9kZSI6MTYsInBhdGgiOiJyb3RhdGlvbiJ9fSx7InNhbXBsZXIiOjEyLCJ0YXJnZXQiOnsibm9kZSI6MTUsInBhdGgiOiJyb3RhdGlvbiJ9fSx7InNhbXBsZXIiOjEzLCJ0YXJnZXQiOnsibm9kZSI6MjAsInBhdGgiOiJyb3RhdGlvbiJ9fSx7InNhbXBsZXIiOjE0LCJ0YXJnZXQiOnsibm9kZSI6MTksInBhdGgiOiJyb3RhdGlvbiJ9fSx7InNhbXBsZXIiOjE1LCJ0YXJnZXQiOnsibm9kZSI6MTgsInBhdGgiOiJyb3RhdGlvbiJ9fSx7InNhbXBsZXIiOjE2LCJ0YXJnZXQiOnsibm9kZSI6MjQsInBhdGgiOiJyb3RhdGlvbiJ9fSx7InNhbXBsZXIiOjE3LCJ0YXJnZXQiOnsibm9kZSI6MjMsInBhdGgiOiJyb3RhdGlvbiJ9fSx7InNhbXBsZXIiOjE4LCJ0YXJnZXQiOnsibm9kZSI6MjIsInBhdGgiOiJyb3RhdGlvbiJ9fSx7InNhbXBsZXIiOjE5LCJ0YXJnZXQiOnsibm9kZSI6NCwicGF0aCI6InRyYW5zbGF0aW9uIn19LHsic2FtcGxlciI6MjAsInRhcmdldCI6eyJub2RlIjo0LCJwYXRoIjoicm90YXRpb24ifX1dLCJzYW1wbGVycyI6W3siaW5wdXQiOjUsIm91dHB1dCI6Nn0seyJpbnB1dCI6NSwib3V0cHV0Ijo3fSx7ImlucHV0Ijo1LCJvdXRwdXQiOjh9LHsiaW5wdXQiOjUsIm91dHB1dCI6OX0seyJpbnB1dCI6NSwib3V0cHV0IjoxMH0seyJpbnB1dCI6NSwib3V0cHV0IjoxMX0seyJpbnB1dCI6NSwib3V0cHV0IjoxMn0seyJpbnB1dCI6NSwib3V0cHV0IjoxM30seyJpbnB1dCI6NSwib3V0cHV0IjoxNH0seyJpbnB1dCI6NSwib3V0cHV0IjoxNX0seyJpbnB1dCI6NSwib3V0cHV0IjoxNn0seyJpbnB1dCI6NSwib3V0cHV0IjoxN30seyJpbnB1dCI6NSwib3V0cHV0IjoxOH0seyJpbnB1dCI6NSwib3V0cHV0IjoxOX0seyJpbnB1dCI6NSwib3V0cHV0IjoyMH0seyJpbnB1dCI6NSwib3V0cHV0IjoyMX0seyJpbnB1dCI6NSwib3V0cHV0IjoyMn0seyJpbnB1dCI6NSwib3V0cHV0IjoyM30seyJpbnB1dCI6NSwib3V0cHV0IjoyNH0seyJpbnB1dCI6NSwib3V0cHV0IjoyNX0seyJpbnB1dCI6NSwib3V0cHV0IjoyNn1dLCJuYW1lIjoiU3VydmV5In0seyJjaGFubmVscyI6W3sic2FtcGxlciI6MCwidGFyZ2V0Ijp7Im5vZGUiOjgsInBhdGgiOiJyb3RhdGlvbiJ9fSx7InNhbXBsZXIiOjEsInRhcmdldCI6eyJub2RlIjo3LCJwYXRoIjoicm90YXRpb24ifX0seyJzYW1wbGVyIjoyLCJ0YXJnZXQiOnsibm9kZSI6MTEsInBhdGgiOiJyb3RhdGlvbiJ9fSx7InNhbXBsZXIiOjMsInRhcmdldCI6eyJub2RlIjoxMCwicGF0aCI6InJvdGF0aW9uIn19LHsic2FtcGxlciI6NCwidGFyZ2V0Ijp7Im5vZGUiOjksInBhdGgiOiJyb3RhdGlvbiJ9fSx7InNhbXBsZXIiOjUsInRhcmdldCI6eyJub2RlIjoxNCwicGF0aCI6InJvdGF0aW9uIn19LHsic2FtcGxlciI6NiwidGFyZ2V0Ijp7Im5vZGUiOjEzLCJwYXRoIjoicm90YXRpb24ifX0seyJzYW1wbGVyIjo3LCJ0YXJnZXQiOnsibm9kZSI6MTIsInBhdGgiOiJyb3RhdGlvbiJ9fSx7InNhbXBsZXIiOjgsInRhcmdldCI6eyJub2RlIjo2LCJwYXRoIjoicm90YXRpb24ifX0seyJzYW1wbGVyIjo5LCJ0YXJnZXQiOnsibm9kZSI6NSwicGF0aCI6InJvdGF0aW9uIn19LHsic2FtcGxlciI6MTAsInRhcmdldCI6eyJub2RlIjoxNywicGF0aCI6InJvdGF0aW9uIn19LHsic2FtcGxlciI6MTEsInRhcmdldCI6eyJub2RlIjoxNiwicGF0aCI6InJvdGF0aW9uIn19LHsic2FtcGxlciI6MTIsInRhcmdldCI6eyJub2RlIjoxNSwicGF0aCI6InJvdGF0aW9uIn19LHsic2FtcGxlciI6MTMsInRhcmdldCI6eyJub2RlIjoyMCwicGF0aCI6InJvdGF0aW9uIn19LHsic2FtcGxlciI6MTQsInRhcmdldCI6eyJub2RlIjoxOSwicGF0aCI6InJvdGF0aW9uIn19LHsic2FtcGxlciI6MTUsInRhcmdldCI6eyJub2RlIjoxOCwicGF0aCI6InJvdGF0aW9uIn19LHsic2FtcGxlciI6MTYsInRhcmdldCI6eyJub2RlIjoyNCwicGF0aCI6InJvdGF0aW9uIn19LHsic2FtcGxlciI6MTcsInRhcmdldCI6eyJub2RlIjoyMywicGF0aCI6InJvdGF0aW9uIn19LHsic2FtcGxlciI6MTgsInRhcmdldCI6eyJub2RlIjoyMiwicGF0aCI6InJvdGF0aW9uIn19LHsic2FtcGxlciI6MTksInRhcmdldCI6eyJub2RlIjo0LCJwYXRoIjoidHJhbnNsYXRpb24ifX0seyJzYW1wbGVyIjoyMCwidGFyZ2V0Ijp7Im5vZGUiOjQsInBhdGgiOiJyb3RhdGlvbiJ9fV0sInNhbXBsZXJzIjpbeyJpbnB1dCI6MjcsIm91dHB1dCI6Mjh9LHsiaW5wdXQiOjI3LCJvdXRwdXQiOjI5fSx7ImlucHV0IjoyNywib3V0cHV0IjozMH0seyJpbnB1dCI6MjcsIm91dHB1dCI6MzF9LHsiaW5wdXQiOjI3LCJvdXRwdXQiOjMyfSx7ImlucHV0IjoyNywib3V0cHV0IjozM30seyJpbnB1dCI6MjcsIm91dHB1dCI6MzR9LHsiaW5wdXQiOjI3LCJvdXRwdXQiOjM1fSx7ImlucHV0IjoyNywib3V0cHV0IjozNn0seyJpbnB1dCI6MjcsIm91dHB1dCI6Mzd9LHsiaW5wdXQiOjI3LCJvdXRwdXQiOjM4fSx7ImlucHV0IjoyNywib3V0cHV0IjozOX0seyJpbnB1dCI6MjcsIm91dHB1dCI6NDB9LHsiaW5wdXQiOjI3LCJvdXRwdXQiOjQxfSx7ImlucHV0IjoyNywib3V0cHV0Ijo0Mn0seyJpbnB1dCI6MjcsIm91dHB1dCI6NDN9LHsiaW5wdXQiOjI3LCJvdXRwdXQiOjQ0fSx7ImlucHV0IjoyNywib3V0cHV0Ijo0NX0seyJpbnB1dCI6MjcsIm91dHB1dCI6NDZ9LHsiaW5wdXQiOjI3LCJvdXRwdXQiOjQ3fSx7ImlucHV0IjoyNywib3V0cHV0Ijo0OH1dLCJuYW1lIjoiV2FsayJ9LHsiY2hhbm5lbHMiOlt7InNhbXBsZXIiOjAsInRhcmdldCI6eyJub2RlIjo4LCJwYXRoIjoicm90YXRpb24ifX0seyJzYW1wbGVyIjoxLCJ0YXJnZXQiOnsibm9kZSI6NywicGF0aCI6InJvdGF0aW9uIn19LHsic2FtcGxlciI6MiwidGFyZ2V0Ijp7Im5vZGUiOjExLCJwYXRoIjoicm90YXRpb24ifX0seyJzYW1wbGVyIjozLCJ0YXJnZXQiOnsibm9kZSI6MTAsInBhdGgiOiJyb3RhdGlvbiJ9fSx7InNhbXBsZXIiOjQsInRhcmdldCI6eyJub2RlIjo5LCJwYXRoIjoicm90YXRpb24ifX0seyJzYW1wbGVyIjo1LCJ0YXJnZXQiOnsibm9kZSI6MTQsInBhdGgiOiJyb3RhdGlvbiJ9fSx7InNhbXBsZXIiOjYsInRhcmdldCI6eyJub2RlIjoxMywicGF0aCI6InJvdGF0aW9uIn19LHsic2FtcGxlciI6NywidGFyZ2V0Ijp7Im5vZGUiOjEyLCJwYXRoIjoicm90YXRpb24ifX0seyJzYW1wbGVyIjo4LCJ0YXJnZXQiOnsibm9kZSI6NiwicGF0aCI6InJvdGF0aW9uIn19LHsic2FtcGxlciI6OSwidGFyZ2V0Ijp7Im5vZGUiOjUsInBhdGgiOiJyb3RhdGlvbiJ9fSx7InNhbXBsZXIiOjEwLCJ0YXJnZXQiOnsibm9kZSI6MTcsInBhdGgiOiJyb3RhdGlvbiJ9fSx7InNhbXBsZXIiOjExLCJ0YXJnZXQiOnsibm9kZSI6MTYsInBhdGgiOiJyb3RhdGlvbiJ9fSx7InNhbXBsZXIiOjEyLCJ0YXJnZXQiOnsibm9kZSI6MTUsInBhdGgiOiJyb3RhdGlvbiJ9fSx7InNhbXBsZXIiOjEzLCJ0YXJnZXQiOnsibm9kZSI6MjAsInBhdGgiOiJyb3RhdGlvbiJ9fSx7InNhbXBsZXIiOjE0LCJ0YXJnZXQiOnsibm9kZSI6MTksInBhdGgiOiJyb3RhdGlvbiJ9fSx7InNhbXBsZXIiOjE1LCJ0YXJnZXQiOnsibm9kZSI6MTgsInBhdGgiOiJyb3RhdGlvbiJ9fSx7InNhbXBsZXIiOjE2LCJ0YXJnZXQiOnsibm9kZSI6MjQsInBhdGgiOiJyb3RhdGlvbiJ9fSx7InNhbXBsZXIiOjE3LCJ0YXJnZXQiOnsibm9kZSI6MjMsInBhdGgiOiJyb3RhdGlvbiJ9fSx7InNhbXBsZXIiOjE4LCJ0YXJnZXQiOnsibm9kZSI6MjIsInBhdGgiOiJyb3RhdGlvbiJ9fSx7InNhbXBsZXIiOjE5LCJ0YXJnZXQiOnsibm9kZSI6NCwicGF0aCI6InRyYW5zbGF0aW9uIn19LHsic2FtcGxlciI6MjAsInRhcmdldCI6eyJub2RlIjo0LCJwYXRoIjoicm90YXRpb24ifX1dLCJzYW1wbGVycyI6W3siaW5wdXQiOjQ5LCJvdXRwdXQiOjUwfSx7ImlucHV0Ijo0OSwib3V0cHV0Ijo1MX0seyJpbnB1dCI6NDksIm91dHB1dCI6NTJ9LHsiaW5wdXQiOjQ5LCJvdXRwdXQiOjUzfSx7ImlucHV0Ijo0OSwib3V0cHV0Ijo1NH0seyJpbnB1dCI6NDksIm91dHB1dCI6NTV9LHsiaW5wdXQiOjQ5LCJvdXRwdXQiOjU2fSx7ImlucHV0Ijo0OSwib3V0cHV0Ijo1N30seyJpbnB1dCI6NDksIm91dHB1dCI6NTh9LHsiaW5wdXQiOjQ5LCJvdXRwdXQiOjU5fSx7ImlucHV0Ijo0OSwib3V0cHV0Ijo2MH0seyJpbnB1dCI6NDksIm91dHB1dCI6NjF9LHsiaW5wdXQiOjQ5LCJvdXRwdXQiOjYyfSx7ImlucHV0Ijo0OSwib3V0cHV0Ijo2M30seyJpbnB1dCI6NDksIm91dHB1dCI6NjR9LHsiaW5wdXQiOjQ5LCJvdXRwdXQiOjY1fSx7ImlucHV0Ijo0OSwib3V0cHV0Ijo2Nn0seyJpbnB1dCI6NDksIm91dHB1dCI6Njd9LHsiaW5wdXQiOjQ5LCJvdXRwdXQiOjY4fSx7ImlucHV0Ijo0OSwib3V0cHV0Ijo2OX0seyJpbnB1dCI6NDksIm91dHB1dCI6NzB9XSwibmFtZSI6IlJ1biJ9XSwiYnVmZmVyVmlld3MiOlt7ImJ1ZmZlciI6MCwiYnl0ZU9mZnNldCI6MCwiYnl0ZUxlbmd0aCI6MjA3MzYsImJ5dGVTdHJpZGUiOjEyfSx7ImJ1ZmZlciI6MCwiYnl0ZU9mZnNldCI6MjA3MzYsImJ5dGVMZW5ndGgiOjI3NjQ4LCJieXRlU3RyaWRlIjo4fSx7ImJ1ZmZlciI6MCwiYnl0ZU9mZnNldCI6NDgzODQsImJ5dGVMZW5ndGgiOjI3NjQ4LCJieXRlU3RyaWRlIjoxNn0seyJidWZmZXIiOjAsImJ5dGVPZmZzZXQiOjc2MDMyLCJieXRlTGVuZ3RoIjoxNTM2fSx7ImJ1ZmZlciI6MCwiYnl0ZU9mZnNldCI6Nzc1NjgsImJ5dGVMZW5ndGgiOjUwNCwiYnl0ZVN0cmlkZSI6NH0seyJidWZmZXIiOjAsImJ5dGVPZmZzZXQiOjc4MDcyLCJieXRlTGVuZ3RoIjo0MDMyMCwiYnl0ZVN0cmlkZSI6MTZ9LHsiYnVmZmVyIjowLCJieXRlT2Zmc2V0IjoxMTgzOTIsImJ5dGVMZW5ndGgiOjE1MTIsImJ5dGVTdHJpZGUiOjEyfSx7ImJ1ZmZlciI6MCwiYnl0ZU9mZnNldCI6MTE5OTA0LCJieXRlTGVuZ3RoIjoyNjc2NH1dLCJidWZmZXJzIjpbeyJieXRlTGVuZ3RoIjoxNDY2Njh9XSwiaW1hZ2VzIjpbeyJtaW1lVHlwZSI6ImltYWdlL3BuZyIsImJ1ZmZlclZpZXciOjd9XSwibWF0ZXJpYWxzIjpbeyJuYW1lIjoiZm94X21hdGVyaWFsIiwicGJyTWV0YWxsaWNSb3VnaG5lc3MiOnsiYmFzZUNvbG9yVGV4dHVyZSI6eyJpbmRleCI6MH0sIm1ldGFsbGljRmFjdG9yIjowLCJyb3VnaG5lc3NGYWN0b3IiOjAuNTh9fV0sIm1lc2hlcyI6W3sibmFtZSI6ImZveDEiLCJwcmltaXRpdmVzIjpbeyJhdHRyaWJ1dGVzIjp7IlBPU0lUSU9OIjowLCJURVhDT09SRF8wIjoxLCJKT0lOVFNfMCI6MiwiV0VJR0hUU18wIjozfSwibWF0ZXJpYWwiOjB9XX1dLCJub2RlcyI6W3siY2hpbGRyZW4iOlsxLDJdLCJuYW1lIjoicm9vdCJ9LHsibmFtZSI6ImZveCIsIm1lc2giOjAsInNraW4iOjB9LHsiY2hpbGRyZW4iOlszXSwibmFtZSI6Il9yb290Sm9pbnQifSx7ImNoaWxkcmVuIjpbNF0sIm5hbWUiOiJiX1Jvb3RfMDAiLCJyb3RhdGlvbiI6Wy0wLjcwNzEwODA5MjQ4NzUzOTEsMCwwLDAuNzA3MTA1NDY5ODgzMTI0Ml19LHsiY2hpbGRyZW4iOls1LDE1LDE4LDIyXSwibmFtZSI6ImJfSGlwXzAxIiwicm90YXRpb24iOlswLjEyNzY5MDk0MTc2MTc1NTQ3LC0wLjY5NTQ4MjAxOTIzOTM3NjIsLTAuMTI3NjkwMjI2NTA2MDE0NDQsMC42OTU0ODE4NDA0MjU0NDFdLCJ0cmFuc2xhdGlvbiI6WzAsMjYuNzQ4NDAzNTQ5MTk0MzM2LDQyLjkzODE3MTM4NjcxODc1XX0seyJjaGlsZHJlbiI6WzZdLCJuYW1lIjoiYl9TcGluZTAxXzAyIiwicm90YXRpb24iOlswLDAsLTAuNTkwNDE1NzYzODIzODMxNywwLjgwNzA5OTI2NjQwMzAzNzZdLCJ0cmFuc2xhdGlvbiI6WzEyLjg1MDYwMTE5NjI4OTA2MiwwLDBdfSx7ImNoaWxkcmVuIjpbNyw5LDEyXSwibmFtZSI6ImJfU3BpbmUwMl8wMyIsInJvdGF0aW9uIjpbMCwwLDAuMDE3NDExOTUyNDA0MjgxMDgyLDAuOTk5ODQ4NDAwNDY1NTI2MV0sInRyYW5zbGF0aW9uIjpbMjEuNjU1NzU0MDg5MzU1NDcsLTAuMDAwMTE4MjU1NjE1MjM0Mzc1LDBdfSx7ImNoaWxkcmVuIjpbOF0sIm5hbWUiOiJiX05lY2tfMDQiLCJyb3RhdGlvbiI6WzAsMCwwLjMwMzM3OTE0MDI4MjY0MzQ2LDAuOTUyODY5OTI2NzE2ODQ0M10sInRyYW5zbGF0aW9uIjpbMjUuNjQ5MTQzMjE4OTk0MTQsMCwwXX0seyJuYW1lIjoiYl9IZWFkXzA1Iiwicm90YXRpb24iOlswLDAsLTAuNDAwMjg1NDE1MTQ4NzM0OSwwLjkxNjM5MDUyMDY5NDc1NTVdLCJ0cmFuc2xhdGlvbiI6WzEzLjM3Njk2MDc1NDM5NDUzMSwwLDBdfSx7ImNoaWxkcmVuIjpbMTBdLCJuYW1lIjoiYl9SaWdodFVwcGVyQXJtXzA2Iiwicm90YXRpb24iOlswLjAwMDQ2NzMyNzMyNjIwMTE1NjIsLTAuMDAwNDQ2MTQ4NDY5MjI1NTkyOCwtMC43MTIxNzkyODgxMTEwNjkxLDAuNzAxOTk3MzI0ODgyNTk4NV0sInRyYW5zbGF0aW9uIjpbMTguNjc3OTEzNjY1NzcxNDg0LC00LjI5NzM0MDM5MzA2NjQwNiw2Ljk2NzU3NTA3MzI0MjE4NzVdfSx7ImNoaWxkcmVuIjpbMTFdLCJuYW1lIjoiYl9SaWdodEZvcmVBcm1fMDciLCJyb3RhdGlvbiI6WzAsMCwwLjAzNzEyNTg5OTc3MzQ4NzQ0LDAuOTk5MzEwNTk2MTQ0MTY2M10sInRyYW5zbGF0aW9uIjpbMjMuMDQ1MTI1OTYxMzAzNzEsMCwwXX0seyJuYW1lIjoiYl9SaWdodEhhbmRfMDgiLCJyb3RhdGlvbiI6Wy0wLjAxMjAzNzQwNjkxNDc5NzAxOCwtMC4wMDc4MjIyMTAxMjQ2NTI3NiwwLjQ2MDU2MjMyNzcxODUxNDgsMC44ODc1MTEyNzA5OTg4NzQxXSwidHJhbnNsYXRpb24iOlsxOS4zNTAwNTU2OTQ1ODAwNzgsLTAuMTQ1OTg2NTU3MDA2ODM1OTQsMF19LHsiY2hpbGRyZW4iOlsxM10sIm5hbWUiOiJiX0xlZnRVcHBlckFybV8wOSIsInJvdGF0aW9uIjpbMC4wMDA0OTcyNjE5MjIwOTQwMTc0LC0wLjAwMDg4MjE5MjMxNjY0NDI4NzUsLTAuNzEyMDg3NDkyOTkxNDY2MywwLjcwMjA5MDAwNjE5MDM5MjddLCJ0cmFuc2xhdGlvbiI6WzE4LjY3NzkxNzQ4MDQ2ODc1LC00LjI5NzM0NDIwNzc2MzY3MiwtNi45Njc5ODcwNjA1NDY4NzVdfSx7ImNoaWxkcmVuIjpbMTRdLCJuYW1lIjoiYl9MZWZ0Rm9yZUFybV8wMTAiLCJyb3RhdGlvbiI6WzAsMCwwLjAzNzEyNTg5OTc3MzQ4NzQ0LDAuOTk5MzEwNTk2MTQ0MTY2M10sInRyYW5zbGF0aW9uIjpbMjMuMDQ1MTI0MDUzOTU1MDc4LDAsMF19LHsibmFtZSI6ImJfTGVmdEhhbmRfMDExIiwicm90YXRpb24iOlswLjAxNjUxNzkxNDQwNzIxNTA3LDAuMDE0MDEzNzM5ODczOTk3NzgxLDAuNDYwMDc1NTc1MjEyNzEsMC44ODc2MTU0NzkwNzM2MDk5XSwidHJhbnNsYXRpb24iOlsxOS4zNTAwNTE4Nzk4ODI4MTIsLTAuMTQ1OTkwMzcxNzA0MTAxNTYsMF19LHsiY2hpbGRyZW4iOlsxNl0sIm5hbWUiOiJiX1RhaWwwMV8wMTIiLCJyb3RhdGlvbiI6WzAsMCwwLjk4MTg5Mjg5NDA2NTYyOTUsMC4xODk0MzY5MTQ1MjE0OTA0XSwidHJhbnNsYXRpb24iOls0LjI2MDM3NTk3NjU2MjUsMTUuOTU4NzcwNzUxOTUzMTI1LDBdfSx7ImNoaWxkcmVuIjpbMTddLCJuYW1lIjoiYl9UYWlsMDJfMDEzIiwicm90YXRpb24iOlswLDAsLTAuMDY5NjE3MTY2MzM4NzQ2NiwwLjk5NzU3Mzc4MTgwODEyNDRdLCJ0cmFuc2xhdGlvbiI6WzEyLjQxMTkxODY0MDEzNjcxOSwwLDBdfSx7Im5hbWUiOiJiX1RhaWwwM18wMTQiLCJyb3RhdGlvbiI6WzAsMCwtMC4wNTM4MzI3NDQ4NDIwNzY4NCwwLjk5ODU0OTk2NjQ5Mjc5NzldLCJ0cmFuc2xhdGlvbiI6WzI0LjI0MDMyMjExMzAzNzExLDAsMF19LHsiY2hpbGRyZW4iOlsxOV0sIm5hbWUiOiJiX0xlZnRMZWcwMV8wMTUiLCJyb3RhdGlvbiI6WzAsLTAuMDAwMTcxNzUyMjUzNjU1OTkzNiwwLjk3MDAxNTg4MzQwMjA2ODEsLTAuMjQzMDQxNDcwNjM1OTE2MV0sInRyYW5zbGF0aW9uIjpbNC44MTM3NzAyOTQxODk0NTMsNS4xNTQwMTg0MDIwOTk2MDksLTYuOTY4MDA2MTM0MDMzMjAzXX0seyJjaGlsZHJlbiI6WzIwXSwibmFtZSI6ImJfTGVmdExlZzAyXzAxNiIsInJvdGF0aW9uIjpbMCwwLC0wLjM2ODA0Mzc4ODU1NTExNjU1LDAuOTI5ODA4NDU4NjExNzcwNl0sInRyYW5zbGF0aW9uIjpbMTguOTQ0MTc1NzIwMjE0ODQ0LDAsMF19LHsiY2hpbGRyZW4iOlsyMV0sIm5hbWUiOiJiX0xlZnRGb290MDFfMDE3Iiwicm90YXRpb24iOlswLjAwMDI0ODQxMDU5Mjk2NjQ2NjYsMCwwLjQ1ODQ4NDExMjI1ODUwOTksMC44ODg3MDI1Njk1MzUzMzNdLCJ0cmFuc2xhdGlvbiI6WzE3Ljk0MjgxMTk2NTk0MjM4MywwLDBdfSx7Im5hbWUiOiJiX0xlZnRGb290MDJfMDE4Iiwicm90YXRpb24iOlswLDAsMC41NDcyODgyOTQ5MDkwMjQzLDAuODM2OTQ0MTU3MTkwNjUzM10sInRyYW5zbGF0aW9uIjpbMTUuNzc5OTM4Njk3ODE0OTQxLDAsMF19LHsiY2hpbGRyZW4iOlsyM10sIm5hbWUiOiJiX1JpZ2h0TGVnMDFfMDE5Iiwicm90YXRpb24iOlswLDAsMC45Njk5NTg1OTQyMDU0NTM1LC0wLjI0MzI3MDA2NzA1OTE4NTMzXSwidHJhbnNsYXRpb24iOls0LjgxMzc3NzkyMzU4Mzk4NCw1LjE1NDAyNjAzMTQ5NDE0MSw2Ljk2NzU2MzYyOTE1MDM5MV19LHsiY2hpbGRyZW4iOlsyNF0sIm5hbWUiOiJiX1JpZ2h0TGVnMDJfMDIwIiwicm90YXRpb24iOlswLDAsLTAuMzY4MDQzODE0MzIwNTI4ODUsMC45Mjk4MDg0NDg0MTMxMTA2XSwidHJhbnNsYXRpb24iOlsxOC45NDQxODMzNDk2MDkzNzUsMCwwXX0seyJjaGlsZHJlbiI6WzI1XSwibmFtZSI6ImJfUmlnaHRGb290MDFfMDIxIiwicm90YXRpb24iOlstMC4wMDAxNTM0NTQ1NTg3NjgwMzE2MywwLDAuNDU3OTA5Mzc0NjE2ODM0NiwwLjg4ODk5ODg2NDUwNDE3OF0sInRyYW5zbGF0aW9uIjpbMTcuOTQyODEwMDU4NTkzNzUsMCwwXX0seyJuYW1lIjoiYl9SaWdodEZvb3QwMl8wMjIiLCJyb3RhdGlvbiI6WzAsMCwwLjU0NzI4ODI5NDkwOTAyNDMsMC44MzY5NDQxNTcxOTA2NTMzXSwidHJhbnNsYXRpb24iOlsxNS43Nzk5MzU4MzY3OTE5OTIsMCwwXX1dLCJzYW1wbGVycyI6W3sibWFnRmlsdGVyIjo5NzI5LCJtaW5GaWx0ZXIiOjk5ODd9XSwic2NlbmUiOjAsInNjZW5lcyI6W3sibm9kZXMiOlswXX1dLCJza2lucyI6W3siaW52ZXJzZUJpbmRNYXRyaWNlcyI6NCwiam9pbnRzIjpbMiwzLDQsNSw2LDcsOCw5LDEwLDExLDEyLDEzLDE0LDE1LDE2LDE3LDE4LDE5LDIwLDIxLDIyLDIzLDI0LDI1XSwic2tlbGV0b24iOjJ9XSwidGV4dHVyZXMiOlt7InNhbXBsZXIiOjAsInNvdXJjZSI6MH1dfSAgIOw8AgBCSU4AnZsDQJHbDEJnXLjB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AgAQAAIAAgACABAAAgACAAIADQACAAIABAAFAAcACgAKAAQAAgACAAoAAgACAAIABgACAAIAAgAGAAIAAgACAAYAAgACAAIABgACAAIAAgAGAAIAAgACAAYAAgACAAIABgACAAIAAgAGAAIAAgACAAYAAgACAAIABgACAAIAAgAGAAIAAgACAAYAAgACAAIABgACAAIAAgAGAAIAAgACAAYAAgACAAIABgACAAIAAgAGAAIAAgACAAYAAgACAAIABQAEAAIAAgAKAAIAAgACAAUABAACAAIABgACAAIAAgAGAAIAAgACAAYAAgACAAIAAgAQAAIAAgADAAIAAgACAAIAEAARAAIABAAFAAcACgAEAAoABwACAAoABAACAAIAAgANAAIAAgACABAAAgACAAIADQACAAIAAwACAAIAAgADAAIAAgACAAIAEAACAAIAAgAQABEAAgADAAIAAgACAAIAAgACAAIACgACAAIAAgAKAAQAAgACAAoAAgACAAIADwACAAIAAgAPAA4AAgACAA8AAgACAAIADwACAAIAAgAPAAIAAgACAA8AAgACAAIADwACAAIAAgAPAAIAAgACAA8AAgACAAIADwACAAIAAgAPAAIAAgACAA8AAgACAAIADwACAAIAAgAPAAIAAgACAA8AAgACAAIAAgAUAAIAAgACAA0AAgACAAIAEAAUAAIACgACAAIAAgAFAAQAAgACAAUABAACAAIABQAEAAIAAgAEAAUABwAKAAoAAgACAAIABgACAAIAAgAGAAIAAgACAAYAAgACAAIABgACAAIAAgAGAAIAAgACAAYAAgACAAIABgACAAIAAgAGAAIAAgACAAYAAgACAAIABgACAAIAAgAGAAIAAgACAAYAAgACAAIABgACAAIAAgAGAAIAAgACAAYAAgACAAIABwACAAIAAgAHAAgAAgACAAcAAgACAAIABgACAAIAAgAGAAIAAgACAAYAAgACAAIABgACAAIAAgAGAAIAAgACAAYAAgACAAIABgACAAIAAgAGAAIAAgACAAYAAgACAAIABgACAAIAAgAGAAIAAgACAAYAAgACAAIAAgAUAAIAAgACAA0AAgACAAIAFAACAAIAAwACAAIAAgADAAIAAgACAAMAAgACAAIAAwACAAIAAgACABQAAgACAAMAAgACAAIAAgAQABQAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACABQAAgACAAIAEAAUAAIAAgAUAAIAAgAVABQAAgACAAIAFAACAAIABwACAAIAAgAIAAcAAgACAAcACAACAAIADwACAAIAAgAPAAIAAgACAA8AAgACAAIADwACAAIAAgAPAAIAAgACAA8AAgACAAIADwAOAAIAAgAPAAIAAgACAA8AAgACAAIADwACAAIAAgAPAAIAAgACAA8AAgACAAIAAwACAAIAAgAHAAQAAgACAAMAFAACAAIAAgAUAAIAAgACAA0AAgACAAIAFAACAAIABAAFAAcACgAHAAIAAgACAAcABAACAAIABgACAAIAAgAGAAIAAgACAAYAAgACAAIABgACAAIAAgAGAAIAAgACAAYAAgACAAIABgACAAIAAgAGAAIAAgACAAYAAgACAAIABgACAAIAAgAGAAIAAgACAAYAAgACAAIABgACAAIAAgAGAAIAAgACAAYAAgACAAIABgACAAIAAgAGAAIAAgACAAYAAgACAAIABQAEAAIAAgAFAAQAAgACAAcAAgACAAIABgACAAIAAgAGAAIAAgACAAYAAgACAAIAAgAUAAIAAgACABQAFQACAAMAAgACAAIABAAFAAcACgAHAAQAAgACAAQACgAHAAIAAgANAAIAAgACAA0AAgACAAIAFAACAAIAAwACAAIAAgACABQAAgACAAMAAgACAAIAAgAUABUAAgACABQAAgACAAIAAgACAAIABwACAAIAAgAHAAIAAgACAAcABAACAAIADwACAAIAAgAPAAIAAgACAA8ADgACAAIADwACAAIAAgAPAAIAAgACAA8AAgACAAIADwACAAIAAgAPAAIAAgACAA8AAgACAAIADwACAAIAAgAPAAIAAgACAA8AAgACAAIADwACAAIAAgAPAAIAAgACAA8AAgACAAIABwACAAIAAgAEAAUABwAKAAUABAACAAIABQAEAAIAAgAFAAQAAgACAAcAAgACAAIACgACAAIAAgAKAAIAAgACAAoAAgACAAIACgACAAIAAgAKAAQAAgACAAoAAgACAAIACgACAAIAAgALAAoAAgACAAoACwACAAIACgALAAIAAgAKAAIAAgACAAoAAgACAAIABwACAAIAAgAHAAQAAgACAAcAAgACAAIABwACAAIAAgAHAAIAAgACAAcAAgACAAIACgALAAIAAgAKAAIAAgACAAoABAACAAIACgAEAAIAAgAEAAoABwACAAoACwACAAIABwAIAAIAAgAEAAoABwACAAcABAACAAIABwAEAAIAAgAHAAIAAgACAAcACAACAAIABwACAAIAAgAHAAIAAgACAAcACAACAAIABwAIAAIAAgAIAAcAAgACAAcAAgACAAIAAwAUAAIAAgACABQAAgACAAIAFAACAAIAAgAUAAIAAgADAAIAAgACAAMAFAACAAIABAAKAAcAAgADAAIAAgACAAMAAgACAAIAAwACAAIAAgAEAAoABwACAAcABAACAAIABwAEAAIAAgADAAIAAgACAAMAAgACAAIAAwAQAAIAAgADAAIAAgACAAIAEAACAAIAAgAQAAIAAgACABAAAgACAAMAEAACAAIABAAKAAcAAgADAAIAAgACAAMAAgACAAIAAwACAAIAAgADAAIAAgACAAoABAACAAIACgAEAAIAAgAEAAoABwACAAMAAgACAAIAAwACAAIAAgACAAIAAgACAAIAAgACAAIAAwACAAIAAgACAAIAAgACAAIAAgACAAIAAwACAAIAAgACABQAFQACAAIAAgACAAIAAgAQAAIAAgACABAAEQACAAIAAgACAAIABQAEAAIAAgAFAAQAAgACAAYAAgACAAIABgACAAIAAgAGAAIAAgACAAUABAACAAIABQAEAAIAAgAFAAQAAgACAAYAAgACAAIABgACAAIAAgAGAAIAAgACAAUABAACAAIABQAEAAIAAgAGAAIAAgACAAYAAgACAAIABgACAAIAAgAFAAQAAgACAAUABAACAAIABQAEAAIAAgAGAAIAAgACAAYAAgACAAIABgACAAIAAgAFAAQAAgACAAUABAACAAIAAgANAAIAAgACAA0AAgACAA0ADgACAAIADQAOAAIAAgACAA0AAgACAA0ADgACAAIACgAEAAIAAgADABAAAgACAAMAEAACAAIAAwAQAAIAAgAKAAQAAgACAAoABAACAAIAAwACAAIAAgADAAIAAgACAAMAAgACAAIAAwACAAIAAgACAAIAAgACAAMAAgACAAIAAgANAAIAAgACABAAAgACAAIADQACAAIAAgACAAIAAgACABAAAgACAAIAEAACAAIAAgAQAAIAAgACABAAAgACAAIADQACAAIACgAEAAIAAgAKAAQAAgACAAoACwACAAIABAACAAIAAgAEAAIAAgACAAUABAACAAIABAACAAIAAgAEAAIAAgACAAUABAACAAIABgACAAIAAgAFAAQAAgACAAYAAgACAAIABgACAAIAAgAGAAIAAgACAAYAAgACAAIABgACAAIAAgAGAAIAAgACAAYAAgACAAIABQAEAAIAAgAFAAQAAgACAAYAAgACAAIABgACAAIAAgAGAAIAAgACAAYAAgACAAIABgACAAIAAgAGAAIAAgACAAYAAgACAAIABgACAAIAAgAGAAIAAgACAAYAAgACAAIABgACAAIAAgAGAAIAAgACAAYAAgACAAIABgACAAIAAgAGAAIAAgACAAYAAgACAAIABQAEAAIAAgAFAAQAAgACAAYAAgACAAIABgACAAIAAgAGAAIAAgACAAYAAgACAAIABgACAAIAAgAGAAIAAgACAAYAAgACAAIAAgANAAIAAgACAA0AAgACAA0ADgACAAIAAgAQAAIAAgACABAAAgACABEAEAACAAIADQAOAAIAAgANAA4AAgACAA8ADgACAAIABgACAAIAAgAGAAIAAgACAAYAAgACAAIABAACAAIAAgAEAAIAAgACAAQAAgACAAIAAgACAAIAAgACAAIAAgACAAIADQACAAIAAgANAAIAAgACAA0AAgACAAIADQACAAIAAgAQAAIAAgACABAAAgACABAAEQACAAIAAgAQAAIAAgACABAAAgACABEAEAACAAIAAgAQAAIAAgACABAAAgACABEAEAACAAIAAgAQAAIAAgACABAAAgACABEAEAACAAIAEQASAAIAAgARABIAAgACABEAEgACAAIAEQASAAIAAgARABIAAgACABEAEgACAAIAEQAQAAIAAgACABAAEQACABEAEgACAAIAEQASAAIAAgARABIAAgACABEAEgACAAIAEQASAAIAAgARABIAAgACABEAEgACAAIAEQAQAAIAAgARABAAAgACABEAAgACAAIAEAARAAIAAgARABAAAgACABEAAgACAAIAEQASAAIAAgARABIAAgACABEAEgACAAIACgALAAIAAgAKAAsAAgACAAsAAgACAAIACwAKAAIAAgAKAAsAAgACAAsAAgACAAIABwACAAIAAgAHAAIAAgACAAcAAgACAAIABwACAAIAAgAHAAIAAgACAAcAAgACAAIABAAKAAcAAgAKAAQAAgACAAoACwACAAIACgALAAIAAgAKAAsAAgACAAsAAgACAAIADQAOAAIAAgACAA0AAgACAA0ADgACAAIADQAOAAIAAgAPAA4AAgACAA0ADgACAAIAAgANAAIAAgACAA0AAgACAA0ADgACAAIADQAOAAIAAgANAA4AAgACAAIADQACAAIADwAOAAIAAgAPAA4AAgACAA8AAgACAAIADwAOAAIAAgAPAA4AAgACAA8AAgACAAIADwAOAAIAAgAPAA4AAgACAA8AAgACAAIADwAOAAIAAgAPAA4AAgACAA8AAgACAAIADwAOAAIAAgAPAA4AAgACAA8AAgACAAIAEQAQAAIAAgACABAAAgACAAIAEAARAAIAAwACAAIAAgACAAIAAgACAAIAAgACAAIAAgANAAIAAgACAA0AAgACAAIADQACAAIAAgANAAIAAgACAA0AAgACAAIADQACAAIAAgANAAIAAgACAAIAAgACAAIAEAACAAIABAACAAIAAgAEAAIAAgACAAQAAgACAAIAAgANAAIAAgACABAAAgACAAIADQACAAIABQAEAAIAAgAEAAIAAgACAAUABAACAAIABQAEAAIAAgAEAAIAAgACAAUABAACAAIACgALAAIAAgAKAAQAAgACAAoACwACAAIABgACAAIAAgAGAAIAAgACAAYAAgACAAIABgACAAIAAgAFAAQAAgACAAYAAgACAAIABgACAAIAAgAGAAIAAgACAAYAAgACAAIABgACAAIAAgAGAAIAAgACAAYAAgACAAIABgACAAIAAgAGAAIAAgACAAYAAgACAAIACgALAAIAAgAKAAQAAgACAAoACwACAAIACgACAAIAAgAKAAIAAgACAAoAAgACAAIAAwAQAAIAAgADAAIAAgACAAoABAACAAIADQAOAAIAAgACAA0AAgACAAIADQACAAIAEAARAAIAAgACABAAAgACABEAEAACAAIADwAOAAIAAgANAA4AAgACAA8ADgACAAIABgACAAIAAgAGAAIAAgACAAYAAgACAAIABAACAAIAAgAEAAIAAgACAAQAAgACAAIAAgANAAIAAgACAAIAAgACAAIADQACAAIAEQAQAAIAAgACABAAAgACABAAEQACAAIAAwACAAIAAgADAAIAAgACAAIAAgACAAIAEQAQAAIAAgACABAAAgACABEAEAACAAIAEQAQAAIAAgACABAAAgACABEAEAACAAIAEQAQAAIAAgACABAAAgACABEAEAACAAIAEQASAAIAAgACABAAEQACABEAEgACAAIACgALAAIAAgAEAAoABwACAAoACwACAAIACwACAAIAAgAKAAsAAgACAAsACgACAAIADwAOAAIAAgANAA4AAgACAA8ADgACAAIADwAOAAIAAgANAA4AAgACAA8ADgACAAIADwAOAAIAAgANAA4AAgACAA8ADgACAAIADwAOAAIAAgANAA4AAgACAA0ADgACAAIADwACAAIAAgAPAA4AAgACAA8AAgACAAIADwACAAIAAgAPAA4AAgACAA8AAgACAAIADwACAAIAAgAPAA4AAgACAA8AAgACAAIAAgANAAIAAgANAA4AAgACAAIADQACAAIADQAOAAIAAgANAA4AAgACAAIADQACAAIABwAEAAIAAgADABQAAgACAAMAFAACAAIAAwAUAAIAAgAHAAQAAgACAAcABAACAAIAAgACAAIAAgADAAIAAgACAAMAAgACAAIAAwACAAIAAgADAAIAAgACAAIAAgACAAIABAACAAIAAgAHAAIAAgACAAcAAgACAAIABwACAAIAAgAEAAIAAgACAAQAAgACAAIAAgANAAIAAgACAA0AAgACAAIAFAACAAIAAgACAAIAAgACABQAAgACAAIAFAACAAIAAgAUAAIAAgACAA0AAgACAAIAFAACAAIABwAEAAIAAgAHAAgAAgACAAcABAACAAIABAACAAIAAgAFAAQAAgACAAQAAgACAAIABAACAAIAAgAFAAQAAgACAAQAAgACAAIABgACAAIAAgAGAAIAAgACAAUABAACAAIABAACAAIAAgAFAAQAAgACAAUABAACAAIABQAEAAIAAgAKAAIAAgACAAQAAgACAAIABgACAAIAAgAGAAIAAgACAAYAAgACAAIABgACAAIAAgAGAAIAAgACAAYAAgACAAIABQAEAAIAAgAGAAIAAgACAAUABAACAAIABgACAAIAAgAGAAIAAgACAAYAAgACAAIABgACAAIAAgAGAAIAAgACAAYAAgACAAIABgACAAIAAgAGAAIAAgACAAYAAgACAAIABgACAAIAAgAGAAIAAgACAAYAAgACAAIABgACAAIAAgAGAAIAAgACAAYAAgACAAIABQAEAAIAAgAGAAIAAgACAAUABAACAAIABgACAAIAAgAGAAIAAgACAAYAAgACAAIABgACAAIAAgAGAAIAAgACAAYAAgACAAIAAgANAAIAAgANAA4AAgACAAIADQACAAIAAgAUAAIAAgAVABQAAgACAAIAFAACAAIADQAOAAIAAgAPAA4AAgACAA0ADgACAAIABgACAAIAAgAGAAIAAgACAAYAAgACAAIABAACAAIAAgAEAAIAAgACAAQAAgACAAIAAgACAAIAAgACAA0AAgACAAIAAgACAAIAAgANAAIAAgACAA0AAgACAAIADQACAAIAAgAUAAIAAgAUABUAAgACAAIAFAACAAIAAgAUAAIAAgAVABQAAgACAAIAFAACAAIAAgAUAAIAAgAVABQAAgACAAIAFAACAAIAAgAUAAIAAgAVABQAAgACAAIAFAACAAIAFQAWAAIAAgAVABYAAgACABUAFgACAAIAFQAUAAIAAgAVABYAAgACAAIAFAAVAAIAFQAWAAIAAgAVABYAAgACABUAFgACAAIAFQAWAAIAAgAVABYAAgACABUAFgACAAIAFQAUAAIAAgAVAAIAAgACABUAFAACAAIAFAAVAAIAAgAVAAIAAgACABUAFAACAAIAFQAWAAIAAgAVABYAAgACABUAFgACAAIABwAIAAIAAgAIAAIAAgACAAcACAACAAIACAAHAAIAAgAIAAIAAgACAAcACAACAAIABAAKAAcAAgAHAAgAAgACAAcABAACAAIABwAIAAIAAgAIAAIAAgACAAcACAACAAIADQAOAAIAAgAPAA4AAgACAA0ADgACAAIADQAOAAIAAgAPAA4AAgACAA0ADgACAAIADQAOAAIAAgAPAA4AAgACAA8ADgACAAIADwAOAAIAAgANAA4AAgACAA0ADgACAAIADwAOAAIAAgAPAAIAAgACAA8ADgACAAIADwAOAAIAAgAPAAIAAgACAA8ADgACAAIADwAOAAIAAgAPAAIAAgACAA8ADgACAAIADwAOAAIAAgAPAAIAAgACAA8ADgACAAIADwAOAAIAAgAPAAIAAgACAA8ADgACAAIAFQAUAAIAAgACABQAFQACAAIAFAACAAIAAwACAAIAAgACAAIAAgACAAIAAgACAAIAAgANAAIAAgACAA0AAgACAAIADQACAAIAAgANAAIAAgACAA0AAgACAAIADQACAAIAAgANAAIAAgACABQAAgACAAIAAgACAAIABAACAAIAAgAEAAIAAgACAAQAAgACAAIAAgANAAIAAgACAA0AAgACAAIAFAACAAIABQAEAAIAAgAFAAQAAgACAAQAAgACAAIABQAEAAIAAgAEAAIAAgACAAUABAACAAIABwAIAAIAAgAHAAgAAgACAAcABAACAAIABgACAAIAAgAGAAIAAgACAAYAAgACAAIABgACAAIAAgAGAAIAAgACAAUABAACAAIABgACAAIAAgAGAAIAAgACAAYAAgACAAIABgACAAIAAgAGAAIAAgACAAYAAgACAAIABgACAAIAAgAGAAIAAgACAAYAAgACAAIABwAIAAIAAgAHAAgAAgACAAcABAACAAIABwACAAIAAgAHAAIAAgACAAcAAgACAAIAAwAUAAIAAgAHAAQAAgACAAMAAgACAAIADQAOAAIAAgACAA0AAgACAAIADQACAAIAFAAVAAIAAgAVABQAAgACAAIAFAACAAIADwAOAAIAAgAPAA4AAgACAA0ADgACAAIABgACAAIAAgAGAAIAAgACAAYAAgACAAIABAACAAIAAgAEAAIAAgACAAQAAgACAAIAAgANAAIAAgACAA0AAgACAAIAAgACAAIAFQAUAAIAAgAUABUAAgACAAIAFAACAAIAAwACAAIAAgACAAIAAgACAAMAAgACAAIAFQAUAAIAAgAVABQAAgACAAIAFAACAAIAFQAUAAIAAgAVABQAAgACAAIAFAACAAIAFQAUAAIAAgAVABQAAgACAAIAFAACAAIAFQAWAAIAAgAVABYAAgACABUAFgACAAIABwAIAAIAAgAEAAoABwACAAcACAACAAIACAACAAIAAgAIAAcAAgACAAcACAACAAIADwAOAAIAAgAPAA4AAgACAA0ADgACAAIADwAOAAIAAgAPAA4AAgACAA0ADgACAAIADwAOAAIAAgAPAA4AAgACAA0ADgACAAIADQAOAAIAAgANAA4AAgACAA8ADgACAAIADwAOAAIAAgAPAA4AAgACAA0ADgACAAIADwACAAIAAgAPAAIAAgACAA8ADgACAAIADwACAAIAAgAPAAIAAgACAA8ADgACAAIADwACAAIAAgAPAAIAAgACAA8ADgACAAIAEQASAAIAAgARABIAAgACAAIAEAARAAIAAgAQABEAAgACABAAAgACABEAEgACAAIABAACAAIAAgADAAIAAgACAAMAAgACAAIAAwACAAIAAgAEAAIAAgACAAQAAgACAAIACgAEAAIAAgADAAIAAgACAAMAAgACAAIAAwACAAIAAgAEAAIAAgACAAoABAACAAIABwAEAAIAAgAHAAgAAgACAAcAAgACAAIABAACAAIAAgADAAIAAgACAAMAAgACAAIAAwACAAIAAgAHAAQAAgACAAQAAgACAAIABAACAAIAAgAEAAIAAgACAAMAAgACAAIAAwACAAIAAgADAAIAAgACAAQAAgACAAIACgACAAIAAgAKAAIAAgACAAoAAgACAAIACgACAAIAAgAKAAIAAgACAAoAAgACAAIABwAIAAIAAgAIAAcAAgACAAcAAgACAAIABwACAAIAAgAHAAIAAgACAAcACAACAAIABwAIAAIAAgAHAAgAAgACAAcAAgACAAIACgACAAIAAgAKAAsAAgACAAoACwACAAIACgALAAIAAgAKAAIAAgACAAoAAgACAAIACgACAAIAAgAKAAsAAgACAAsACgACAAIACwAKAAIAAgAKAAIAAgACAAoAAgACAAIABwACAAIAAgAHAAIAAgACAAgABwACAAIACAAHAAIAAgAHAAgAAgACAAcAAgACAAIACwAKAAIAAgAKAAsAAgACAAoACwACAAIACAAHAAIAAgAHAAgAAgACAAcACAACAAIACgALAAIAAgAKAAIAAgACAAsACgACAAIACgACAAIAAgAKAAsAAgACAAoAAgACAAIACgACAAIAAgAKAAIAAgACAAoAAgACAAIABAACAAIAAgAEAAIAAgACAAoAAgACAAIACgACAAIAAgAKAAIAAgACAAQAAgACAAIACgACAAIAAgAKAAQAAgACAAQAAgACAAIABAACAAIAAgAEAAIAAgACAAoAAgACAAIABAACAAIAAgAEAAIAAgACAAQAAgACAAIABAACAAIAAgAEAAIAAgACAAQAAgACAAIABAACAAIAAgAEAAIAAgACAAQAAgACAAIABAACAAIAAgAEAAIAAgACAAQAAgACAAIABwACAAIAAgAHAAIAAgACAAcACAACAAIABwAIAAIAAgAHAAIAAgACAAcAAgACAAIACgAEAAIAAgAKAAIAAgACAAoACwACAAIABAACAAIAAgAEAAIAAgACAAQAAgACAAIABAACAAIAAgAEAAIAAgACAAQAAgACAAIABAACAAIAAgAEAAIAAgACAAQAAgACAAIABAACAAIAAgAEAAIAAgACAAQAAgACAAIABAACAAIAAgAEAAIAAgACAAQAAgACAAIABAACAAIAAgAEAAIAAgACAAQAAgACAAIABAACAAIAAgAEAAIAAgACAAcABAACAAIABwAEAAIAAgAHAAIAAgACAAQAAgACAAIAEQASAAIAAgARABIAAgACABEAEAACAAIAEQAQAAIAAgARABAAAgACABEAEgACAAIAEQASAAIAAgARABIAAgACAAIAEAACAAIAAgAQAAIAAgARABAAAgACABEAEgACAAIAEQASAAIAAgARABIAAgACABEAEAACAAIAEQAQAAIAAgARABAAAgACABEAEgACAAIAFQAWAAIAAgAVABQAAgACABUAFAACAAIAFQAUAAIAAgAVABYAAgACABUAFgACAAIAFQAWAAIAAgAVABQAAgACABUAFAACAAIAFQAUAAIAAgAVABYAAgACABUAFgACAAIAFQAUAAIAAgAVABYAAgACABQAFQACAAIAEQAQAAIAAgAQABEAAgACABEAEgACAAIAFQAWAAIAAgACABQAAgACAAIAFAAVAAIAAgAUABUAAgAVABYAAgACABUAFgACAAIAFQAWAAIAAgAVABQAAgACAAIAFAACAAIAAgAUAAIAAgAVABYAAgACABUAFgACAAIAAgAUABUAAgAVABYAAgACABUAFgACAAIAAgANAAIAAgANAA4AAgACAA0ADgACAAIADQAOAAIAAgACAA0AAgACAAIADQACAAIAAgANAAIAAgANAA4AAgACAA0ADgACAAIAAgANAAIAAgANAA4AAgACAA0ADgACAAIAAgANAAIAAgANAA4AAgACAA0ADgACAAIABAACAAIAAgADAAIAAgACAAMAAgACAAIABAACAAIAAgADAAIAAgACAAMAAgACAAIAAwACAAIAAgADAAIAAgACAAQAAgACAAIABAACAAIAAgAEAAIAAgACAAMAAgACAAIAAwACAAIAAgADAAIAAgACAAIAEAACAAIAAgAQAAIAAgACAAIAAgACAAMAAgACAAIAAwACAAIAAgADABAAAgACAAIAEAACAAIAAgAQAAIAAgACABAAAgACAAMAAgACAAIAAgAQAAIAAgADAAIAAgACAAMAAgACAAIAAgAQAAIAAgADABAAAgACAAMAEAACAAIAAgAUAAIAAgADAAIAAgACAAMAAgACAAIAAwACAAIAAgAEAAIAAgACAAQAAgACAAIABAACAAIAAgADAAIAAgACAAMAAgACAAIAAwACAAIAAgACAAIAAgACAAIAFAACAAIAAgAUAAIAAgADAAIAAgACAAMAAgACAAIAAgAUAAIAAgADABQAAgACAAMAFAACAAIAAwACAAIAAgACABQAAgACAAIAFAACAAIAAgAUAAIAAgADABQAAgACAAMAAgACAAIABAACAAIAAgAHAAIAAgACAAUABAACAAIABQAEAAIAAgAFAAQAAgACAAQAAgACAAIABQAEAAIAAgAGAAIAAgACAAYAAgACAAIABgACAAIAAgAFAAQAAgACAAUABAACAAIABQAEAAIAAgAFAAQAAgACAAoAAgACAAIACgACAAIAAgAKAAIAAgACAAUABAACAAIABQAEAAIAAgAHAAIAAgACAAcAAgACAAIABwACAAIAAgAFAAQAAgACAAUABAACAAIABQAEAAIAAgAFAAQAAgACAAYAAgACAAIABgACAAIAAgAGAAIAAgACAAUABAACAAIABgACAAIAAgAFAAQAAgACAAUABAACAAIABgACAAIAAgAFAAQAAgACAAUABAACAAIAEQASAAIAAgARAAIAAgACABIAEQACAAIAEQASAAIAAgARABIAAgACABMAEgACAAIAEQASAAIAAgASABEAAgACABIAEwACAAIAEwASAAIAAgASABMAAgACABMAAgACAAIAEQASAAIAAgARABIAAgACABMAEgACAAIAEgARAAIAAgARABIAAgACABIAEwACAAIAEQASAAIAAgARABIAAgACABIAEwACAAIAEQASAAIAAgARABIAAgACABIAEwACAAIAEwACAAIAAgATABIAAgACABMAAgACAAIAEwACAAIAAgATAAIAAgACABMAAgACAAIAEwASAAIAAgATAAIAAgACABMAAgACAAIAEwACAAIAAgASABMAAgACABMAAgACAAIAEgATAAIAAgASABMAAgACABMAAgACAAIAEgATAAIAAgASABMAAgACABMAAgACAAIACwACAAIAAgALAAIAAgACAAwACwACAAIACwACAAIAAgAMAAsAAgACAAsAAgACAAIACwACAAIAAgALAAIAAgACAAwACwACAAIACwACAAIAAgALAAIAAgACAAwACwACAAIACwACAAIAAgALAAIAAgACAAwACwACAAIACwACAAIAAgALAAoAAgACAAsAAgACAAIADAACAAIAAgAMAAsAAgACAAwAAgACAAIADAACAAIAAgAMAAIAAgACAAwAAgACAAIADAALAAIAAgAMAAsAAgACAAwAAgACAAIADAALAAIAAgAMAAsAAgACAAwAAgACAAIADAALAAIAAgAMAAsAAgACAAwAAgACAAIADAALAAIAAgAMAAsAAgACAAwAAgACAAIADAALAAIAAgAMAAsAAgACAAwAAgACAAIAEQASAAIAAgARABAAAgACABEAEgACAAIAEQACAAIAAgARABAAAgACABEAEgACAAIAEQASAAIAAgARABAAAgACABEAEgACAAIAEgARAAIAAgARAAIAAgACABEAEgACAAIAEQASAAIAAgAQABEAAgACABEAAgACAAIAEgATAAIAAgARABIAAgACABMAEgACAAIAEgATAAIAAgASABEAAgACABIAEwACAAIAEwASAAIAAgARABIAAgACABMAEgACAAIAEgATAAIAAgASABEAAgACABIAEwACAAIAEwASAAIAAgARABIAAgACABIAEwACAAIAEwACAAIAAgATABIAAgACABMAEgACAAIAEwACAAIAAgATAAIAAgACABMAAgACAAIAEwASAAIAAgATAAIAAgACABMAAgACAAIAEwACAAIAAgATAAIAAgACABMAAgACAAIAEwACAAIAAgASABMAAgACABMAEgACAAIAEwACAAIAAgASABMAAgACABMAAgACAAIACwACAAIAAgAKAAsAAgACAAsAAgACAAIADAALAAIAAgALAAIAAgACAAwACwACAAIACwACAAIAAgALAAoAAgACAAsAAgACAAIACwACAAIAAgALAAoAAgACAAsAAgACAAIACwACAAIAAgAKAAsAAgACAAsAAgACAAIADAALAAIAAgALAAIAAgACAAwACwACAAIADAALAAIAAgALAAIAAgACAAwACwACAAIADAACAAIAAgAMAAsAAgACAAwAAgACAAIADAALAAIAAgAMAAsAAgACAAwACwACAAIADAACAAIAAgAMAAIAAgACAAwAAgACAAIADAACAAIAAgAMAAIAAgACAAwAAgACAAIADAACAAIAAgAMAAsAAgACAAwAAgACAAIADAACAAIAAgAMAAsAAgACAAwAAgACAAIADAACAAIAAgAMAAsAAgACAAwAAgACAAIAFQAWAAIAAgAWABUAAgACABUAAgACAAIAFQAWAAIAAgAXABYAAgACABUAFgACAAIAFQAWAAIAAgAWABcAAgACABYAFQACAAIAFwAWAAIAAgAXAAIAAgACABYAFwACAAIAFQAWAAIAAgAXABYAAgACABUAFgACAAIAFgAVAAIAAgAWABcAAgACABUAFgACAAIAFQAWAAIAAgAWABcAAgACABUAFgACAAIAFQAWAAIAAgAWABcAAgACABUAFgACAAIAFwACAAIAAgAXAAIAAgACABcAFgACAAIAFwACAAIAAgAXAAIAAgACABcAAgACAAIAFwAWAAIAAgAXAAIAAgACABcAAgACAAIAFwACAAIAAgAXAAIAAgACABYAFwACAAIAFgAXAAIAAgAXAAIAAgACABYAFwACAAIAFgAXAAIAAgAXAAIAAgACABYAFwACAAIACAACAAIAAgAJAAgAAgACAAgAAgACAAIACAACAAIAAgAJAAgAAgACAAgAAgACAAIACAACAAIAAgAJAAgAAgACAAgAAgACAAIACAACAAIAAgAJAAgAAgACAAgAAgACAAIACAACAAIAAgAJAAgAAgACAAgAAgACAAIACAACAAIAAgAJAAgAAgACAAgAAgACAAIACQACAAIAAgAJAAIAAgACAAkACAACAAIACQACAAIAAgAJAAIAAgACAAkAAgACAAIACQAIAAIAAgAJAAIAAgACAAkACAACAAIACQAIAAIAAgAJAAIAAgACAAkACAACAAIACQAIAAIAAgAJAAIAAgACAAkACAACAAIACQAIAAIAAgAJAAIAAgACAAkACAACAAIACQAIAAIAAgAJAAIAAgACAAkACAACAAIAFQAWAAIAAgAVABYAAgACABUAFAACAAIAFQACAAIAAgAVABYAAgACABUAFAACAAIAFQAWAAIAAgAVABYAAgACABUAFAACAAIAFgAVAAIAAgAVABYAAgACABUAAgACAAIAFQAWAAIAAgAVAAIAAgACABQAFQACAAIAFgAXAAIAAgAXABYAAgACABUAFgACAAIAFgAXAAIAAgAWABcAAgACABYAFQACAAIAFwAWAAIAAgAXABYAAgACABUAFgACAAIAFgAXAAIAAgAWABcAAgACABYAFQACAAIAFwAWAAIAAgAWABcAAgACABUAFgACAAIAFwACAAIAAgAXABYAAgACABcAFgACAAIAFwACAAIAAgAXAAIAAgACABcAAgACAAIAFwAWAAIAAgAXAAIAAgACABcAAgACAAIAFwACAAIAAgAXAAIAAgACABcAAgACAAIAFwACAAIAAgAXABYAAgACABYAFwACAAIAFwACAAIAAgAXAAIAAgACABYAFwACAAIACAACAAIAAgAIAAIAAgACAAcACAACAAIACQAIAAIAAgAJAAgAAgACAAgAAgACAAIACAACAAIAAgAIAAIAAgACAAgABwACAAIACAACAAIAAgAIAAIAAgACAAgABwACAAIACAACAAIAAgAIAAIAAgACAAcACAACAAIACQAIAAIAAgAJAAgAAgACAAgAAgACAAIACQAIAAIAAgAJAAgAAgACAAgAAgACAAIACQACAAIAAgAJAAIAAgACAAkACAACAAIACQAIAAIAAgAJAAgAAgACAAkACAACAAIACQACAAIAAgAJAAIAAgACAAkAAgACAAIACQACAAIAAgAJAAIAAgACAAkAAgACAAIACQACAAIAAgAJAAIAAgACAAkACAACAAIACQACAAIAAgAJAAIAAgACAAkACAACAAIACQACAAIAAgAJAAIAAgACAAkACAACAAIACwACAAIAAgAMAAsAAgACAAwACwACAAIADAALAAIAAgALAAIAAgACAAsAAgACAAIACAACAAIAAgAIAAIAAgACAAkACAACAAIACQAIAAIAAgAJAAgAAgACAAgAAgACAAIACAACAAIAAgAIAAIAAgACAAkACAACAAIACQAIAAIAAgAJAAgAAgACAAgAAgACAAIACwACAAIAAgALAAIAAgACAAsACgACAAIACwAKAAIAAgAKAAsAAgACAAsAAgACAAIACwACAAIAAgAMAAsAAgACAAwACwACAAIADAALAAIAAgALAAIAAgACAAsAAgACAAIACwACAAIAAgAMAAsAAgACAAwACwACAAIADAALAAIAAgALAAIAAgACAAsAAgACAAIACAACAAIAAgAHAAgAAgACAAcACAACAAIABwAIAAIAAgAIAAIAAgACAAgAAgACAAIACAACAAIAAgAIAAcAAgACAAcACAACAAIABwAIAAIAAgAIAAIAAgACAAgAAgACAAIACwACAAIAAgALAAIAAgACAAoACwACAAIACgALAAIAAgAKAAsAAgACAAsAAgACAAIACwACAAIAAgALAAIAAgACAAoACwACAAIACgALAAIAAgALAAoAAgACAAsAAgACAAIACAACAAIAAgAHAAgAAgACAAgABwACAAIACAAHAAIAAgAIAAIAAgACAAgAAgACAAIACAACAAIAAgAIAAIAAgACAAkACAACAAIACQAIAAIAAgAJAAgAAgACAAgAAgACAAIADAALAAIAAgALAAIAAgACAAsAAgACAAIACwAKAAIAAgALAAIAAgACAAsAAgACAAIACAAHAAIAAgAIAAIAAgACAAgAAgACAAIACAAHAAIAAgAIAAIAAgACAAgAAgACAAIAFQAWAAIAAgAVABYAAgACABUAFgACAAIAFQAWAAIAAgAVABYAAgACABUAFgACAAIAEQASAAIAAgARABIAAgACABEAEgACAAIAEQASAAIAAgARABIAAgACABEAEgACAAIAEQASAAIAAgARABIAAgACABEAEgACAAIAEQASAAIAAgARABIAAgACABEAEgACAAIAFQAWAAIAAgAVABYAAgACABUAFgACAAIAFQAWAAIAAgAVABYAAgACABUAFgACAAIAFQAWAAIAAgAVABYAAgACABUAFAACAAIAFQAWAAIAAgAVABYAAgACABUAFgACAAIAEQASAAIAAgARABAAAgACABEAEgACAAIAEQASAAIAAgARABIAAgACABEAEgACAAIABgACAAIAAgAGAAIAAgACAAYAAgACAAIABgACAAIAAgAGAAIAAgACAAYAAgACAAIAmpkZP83MzD4AAAAAAAAAANo/Mz+amRk+AmcZPgAAAAAK12M/rkfhPQAAAAAAAAAAAACAPwAAAAAAAAAAAAAAAAAAgD8AAAAAAAAAAAAAAAAAAIA/AAAAAAAAAAAAAAAAAACAPwAAAAAAAAAAAAAAAAAAgD8AAAAAAAAAAAAAAAAAAIA/AAAAAAAAAAAAAAAAAACAPwAAAAAAAAAAAAAAAAAAgD8AAAAAAAAAAAAAAAAAAIA/AAAAAAAAAAAAAAAAAACAPwAAAAAAAAAAAAAAAAAAgD8AAAAAAAAAAAAAAAAAAIA/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AACAPwAAAAAAAAAAAAAAAAAAgD8AAAAAAAAAAAAAAAAzM3M/zcxMPQAAAAAAAAAAAACAPwAAAAAAAAAAAAAAAAAAgD8AAAAAAAAAAAAAAAAzM3M/zcxMPQAAAAAAAAAAAACAPwAAAAAAAAAAAAAAADMzcz/NzEw9AAAAAAAAAAAAAIA/AAAAAAAAAAAAAAAAAACAPwAAAAAAAAAAAAAAAAAAgD8AAAAAAAAAAAAAAAAAAIA/AAAAAAAAAAAAAAAAAACAPwAAAAAAAAAAAAAAAAAAgD8AAAAAAAAAAAAAAAAAAIA/AAAAAAAAAAAAAAAAMzNzP83MTD0AAAAAAAAAADMzcz/NzEw9AAAAAAAAAAAAAIA/AAAAAAAAAAAAAAAAAACAPwAAAAAAAAAAAAAAAAAAgD8AAAAAAAAAAAAAAAAAAIA/AAAAAAAAAAAAAAAAAACAPwAAAAAAAAAAAAAAAAAAgD8AAAAAAAAAAAAAAAAAAIA/AAAAAAAAAAAAAAAAAACAPwAAAAAAAAAAAAAAAAAAgD8AAAAAAAAAAAAAAAAAAIA/AAAAAAAAAAAAAAAAAACAPwAAAAAAAAAAAAAAAAAAgD8AAAAAAAAAAAAAAAAAAIA/AAAAAAAAAAAAAAAAAACAPwAAAAAAAAAAAAAAAAAAgD8AAAAAAAAAAAAAAAAAAIA/AAAAAAAAAAAAAAAAMzNzP83MTD0AAAAAAAAAADMzcz/NzEw9AAAAAAAAAAAAAIA/AAAAAAAAAAAAAAAAAACAPwAAAAAAAAAAAAAAAAAAgD8AAAAAAAAAAAAAAAAAAIA/AAAAAAAAAAAAAAAAAACAPwAAAAAAAAAAAAAAAAAAgD8AAAAAAAAAAAAAAAAAAIA/AAAAAAAAAAAAAAAACtdjP65H4T0AAAAAAAAAAArXYz+uR+E9AAAAAAAAAAAAAAA/AAAAPwAAAAAAAAAAAABAPwAAgD4AAAAAAAAAAAAAAD8AAAA/AAAAAAAAAACZmRk/zszMPgAAAAAAAAAAAAAAPwAAAD8AAAAAAAAAAAAAAD8AAAA/AAAAAAAAAAAAAAA/AAAAPwAAAAAAAAAAAACAPwAAAAAAAAAAAAAAAAAAgD8AAAAAAAAAAAAAAAAAAIA/AAAAAAAAAAAAAAAAAACAPwAAAAAAAAAAAAAAAAAAgD8AAAAAAAAAAAAAAAAAAIA/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AAAAAAAAAAAAAIA/AAAAAAAAAAAAAAAAAAAAPwAAAD8AAAAAAAAAAGZmZj/NzMw9AAAAAAAAAABmZmY/zczMPQAAAAAAAAAAAABAPwAAgD4AAAAAAAAAAAAAgD8AAAAAAAAAAAAAAAAAAIA/AAAAAAAAAAAAAAAAwvUoP3sUrj4AAAAAAAAAAAAAgD8AAAAAAAAAAAAAAAAAAIA/AAAAAAAAAAAAAAAAAACAPwAAAAAAAAAAAAAAAFyPQj+PwnU+AAAAAAAAAADC9Sg/exSuPgAAAAAAAAAAwvUoP3sUrj4AAAAAAAAAAAAAgD8AAAAAAAAAAAAAAAAAAEA/AACAPgAAAAAAAAAAAABAPwAAgD4AAAAAAAAAAAAAgD8AAAAAAAAAAAAAAADC9Sg/exSuPgAAAAAAAAAAAAAAPwAAAD8AAAAAAAAAAGZmZj/NzMw9AAAAAAAAAABmZmY/zczMPQAAAAAAAAAAAACAPwAAAAAAAAAAAAAAAAAAQD8AAIA+AAAAAAAAAAAAAAA/AAAAPwAAAAAAAAAAAAAAPwAAAD8AAAAAAAAAAGZmZj/NzMw9AAAAAAAAAAAAAIA/AAAAAAAAAAAAAAAAAACAPwAAAAAAAAAAAAAAAAAAgD8AAAAAAAAAAAAAAAAzM3M/zcxMPQAAAAAAAAAAMzNzP83MTD0AAAAAAAAAADMzcz/NzEw9AAAAAAAAAAAAAIA/AAAAAAAAAAAAAAAAMzNzP83MTD0AAAAAAAAAAAAAgD8AAAAAAAAAAAAAAAAAAIA/AAAAAAAAAAAAAAAAAACAPwAAAAAAAAAAAAAAADMzcz/NzEw9AAAAAAAAAAAzM3M/zcxMPQAAAAAAAAAAMzNzP83MTD0AAAAAAAAAADMzcz/NzEw9AAAAAAAAAAAAAIA/AAAAAAAAAAAAAAAAAACAPwAAAAAAAAAAAAAAAAAAgD8AAAAAAAAAAAAAAAAzM3M/zcxMPQAAAAAAAAAAMzNzP83MTD0AAAAAAAAAAAAAgD8AAAAAAAAAAAAAAAAAAIA/AAAAAAAAAAAAAAAAAACAPwAAAAAAAAAAAAAAADMzcz/NzEw9AAAAAAAAAAAzM3M/zcxMPQAAAAAAAAAAMzNzP83MTD0AAAAAAAAAADMzcz/NzEw9AAAAAAAAAAAAAIA/AAAAAAAAAAAAAAAAAACAPwAAAAAAAAAA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Z8ECPhwLMr87wQK+GQsyP2nBAj4cCzK/PcECvhkLMj9pwQI+HAsyvz3BAr4ZCzI/acECPhwLMr89wQK+GQsyP2nBAj4cCzK/PcECvhkLMj9mwQI+HAsyvzrBAr4ZCzI/ZsECPhwLMr86wQK+GQsyP2bBAj4cCzK/OsECvhkLMj9pwQI+HAsyvz3BAr4ZCzI/Z8ECPhwLMr87wQK+GQsyP2bBAj4cCzK/OsECvhkLMj9pwQI+HAsyvz3BAr4ZCzI/aMECPhwLMr88wQK+GQsyP2bBAj4cCzK/OsECvhkLMj9owQI+HAsyvzzBAr4ZCzI/acECPhwLMr89wQK+GQsyP2nBAj4cCzK/PcECvhkLMj9pwQI+HAsyvz3BAr4ZCzI/acECPhwLMr89wQK+GQsyP2nBAj4cCzK/PcECvhkLMj9pwQI+HAsyvz3BAr4ZCzI/Z8ECPhwLMr87wQK+GQsyP2nBAj4cCzK/PcECvhkLMj9pwQI+HAsyvz3BAr4ZCzI/acECPhwLMr89wQK+GQsyP2nBAj4cCzK/PcECvhkLMj9pwQI+HAsyvz3BAr4ZCzI/acECPhwLMr89wQK+GQsyP2nBAj4cCzK/PcECvhkLMj9pwQI+HAsyvz3BAr4ZCzI/acECPhwLMr89wQK+GQsyP2bBAj4cCzK/OsECvhkLMj9pwQI+HAsyvz3BAr4ZCzI/acECPhwLMr89wQK+GQsyP2nBAj4cCzK/PcECvhkLMj9mwQI+HAsyvzrBAr4ZCzI/acECPhwLMr89wQK+GQsyP2bBAj4cCzK/OsECvhkLMj9nwQI+HAsyvzvBAr4ZCzI/ZsECPhwLMr86wQK+GQsyP2bBAj4cCzK/OsECvhkLMj9pwQI+HAsyvz3BAr4ZCzI/acECPhwLMr89wQK+GQsyP2bBAj4cCzK/OsECvhkLMj9owQI+HAsyvzzBAr4ZCzI/ZsECPhwLMr86wQK+GQsyP2bBAj4cCzK/OsECvhkLMj9mwQI+HAsyvzrBAr4ZCzI/ZsECPhwLMr86wQK+GQsyP2nBAj4cCzK/PcECvhkLMj9pwQI+HAsyvz3BAr4ZCzI/acECPhwLMr89wQK+GQsyP2nBAj4cCzK/PcECvhkLMj9nwQI+HAsyvzvBAr4ZCzI/Z8ECPhwLMr87wQK+GQsyP2nBAj4cCzK/PcECvhkLMj9nwQI+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");

  // dev/hw3/index.ts
  importFromArrayBuffer(Fox_default).then(({doc, bin, imgs}) => {
    console.log({doc, bin, imgs});
    const canvas = document.createElement("canvas");
    canvas.style.position = "absolute";
    canvas.style.zIndex = "0";
    canvas.width = 500;
    canvas.height = 400;
    document.body.append(canvas);
    const bone_canvas = document.createElement("canvas");
    bone_canvas.style.position = "absolute";
    bone_canvas.style.zIndex = "1";
    const ctx = bone_canvas.getContext("2d");
    bone_canvas.width = 500;
    bone_canvas.height = 400;
    document.body.append(bone_canvas);
    const gl = canvas.getContext("webgl2", {preserveDrawingBuffer: true});
    gl.clearColor(0, 0, 0, 1);
    gl.clearDepth(1);
    gl.viewport(0, 0, gl.canvas.width, gl.canvas.height);
    gl.enable(gl.CULL_FACE);
    gl.enable(gl.DEPTH_TEST);
    gl.depthMask(true);
    gl.depthFunc(gl.LEQUAL);
    gl.clear(gl.COLOR_BUFFER_BIT | gl.DEPTH_BUFFER_BIT);
    const fieldOfView = 60 * Math.PI / 180;
    const aspect = gl.canvas.width / gl.canvas.height;
    const zNear = 0.01;
    const zFar = 1e3;
    const projectionMatrix = mat4_exports.perspective(mat4_exports.create(), fieldOfView, aspect, zNear, zFar);
    let v = mat4_exports.lookAt(mat4_exports.create(), [150, 40, 0], [0, 40, 0], [0, 1, 0]);
    const textures = createTexture(gl, doc, imgs);
    const primitive2 = primitive(gl, doc.meshes[0].primitives[0], doc, bin, textures, doc.skins[0].joints.length);
    let nodes = JSON.parse(JSON.stringify(doc.nodes));
    const [animStruct0, timeMax0] = getAnimStruct(doc.animations[0], doc, bin);
    const [animStruct1, timeMax1] = getAnimStruct(doc.animations[1], doc, bin);
    const [animStruct2, timeMax2] = getAnimStruct(doc.animations[2], doc, bin);
    const animStructs = [animStruct0, animStruct1, animStruct2];
    const timeMaxs = [timeMax0, timeMax1, timeMax2];
    let mode = "z";
    let sele_bone_idx = 1;
    document.onkeydown = (e) => {
      switch (e.code) {
        case "KeyS": {
          sele_bone_idx -= 1;
          break;
        }
        case "KeyW": {
          sele_bone_idx += 1;
          break;
        }
        case "KeyA": {
          sele_bone_idx -= 1;
          break;
        }
        case "KeyD": {
          sele_bone_idx += 1;
          break;
        }
        case "KeyZ": {
          mode = "z";
          break;
        }
        case "KeyX": {
          mode = "x";
          break;
        }
        case "KeyY": {
          mode = "y";
          break;
        }
      }
      if (sele_bone_idx == 0) {
        sele_bone_idx = doc.skins[0].joints.length - 1;
      } else if (sele_bone_idx >= doc.skins[0].joints.length) {
        sele_bone_idx = 1;
      }
    };
    let rotations = doc.skins[0].joints.reduce((prev, jointIdx) => {
      prev[jointIdx] = {x: 0, y: 0, z: 0};
      return prev;
    }, {});
    let down = false;
    let mouseX = 0;
    let click = {x: -1, y: -1};
    bone_canvas.onmousedown = (e) => {
      down = true;
      let x = e.pageX - bone_canvas.offsetLeft;
      let y = e.pageY - bone_canvas.offsetTop;
      mouseX = x;
      click = {x, y};
    };
    bone_canvas.onmousemove = (e) => {
      if (down) {
        let x = e.pageX - bone_canvas.offsetLeft;
        let y = e.pageY - bone_canvas.offsetTop;
        rotations[doc.skins[0].joints[sele_bone_idx]][mode] += Math.PI * (x - mouseX) / 360;
        mouseX = x;
      }
    };
    bone_canvas.onmouseup = () => {
      down = false;
    };
    let animIdx = 0;
    let t = 1e-3;
    bone_canvas.onwheel = (e) => {
      if (e.deltaY < 0) {
        t = 1e-3;
        animIdx = Math.min(doc.animations.length - 1, animIdx + 1);
      } else {
        t = 1e-3;
        animIdx = Math.max(-1, animIdx - 1);
      }
    };
    const loop = () => {
      let mvp = mat4_exports.multiply(mat4_exports.create(), projectionMatrix, v);
      const globalJointTransforms = (() => {
        if (animIdx != -1) {
          const animNodes = getAnimNodes(animStructs[animIdx], t);
          return getAnimGlobalJointTransforms(2, nodes, rotations, animNodes, mat4_exports.create(), {});
        } else {
          return getGlobalJointTransforms(2, nodes, rotations, mat4_exports.create(), {});
        }
      })();
      const inverseBindMatrices = getInverseBindMats(doc.skins[0], doc, bin);
      let jointMats = doc.skins[0].joints.map((jointIdx, invIdx) => {
        return mat4_exports.mul(mat4_exports.create(), globalJointTransforms[jointIdx], inverseBindMatrices[invIdx]);
      });
      gl.clear(gl.COLOR_BUFFER_BIT | gl.DEPTH_BUFFER_BIT);
      primitive2.drawAnim(mvp, jointMats);
      ctx.clearRect(0, 0, 500, 400);
      let bones_vec = doc.skins[0].joints.map((jointIdx) => {
        let mat = mat4_exports.mul(mat4_exports.create(), v, globalJointTransforms[jointIdx]);
        let vec = vec3_exports.transformMat4(vec3_exports.create(), vec3_exports.create(), mat);
        return {id: jointIdx, vec};
      });
      bones_vec.sort((a, b) => a.vec[2] - b.vec[2]);
      let z_max = bones_vec.slice(-1)[0].vec[2];
      let z_min = bones_vec[0].vec[2];
      bones_vec = bones_vec.map(({id, vec}) => {
        let z = vec[2];
        z = (z - z_min) / (z_max - z_min);
        ctx.fillStyle = `rgb(${Math.round(100 * z / 2) + 155},${Math.round(200 * z)},${Math.round(255 * z)})`;
        let bone_vec = vec3_exports.transformMat4(vec3_exports.create(), vec, projectionMatrix);
        ctx.beginPath();
        ctx.arc(bone_vec[0] * 250 + 250, (1 - bone_vec[1]) * 200, 6, 0, 2 * Math.PI);
        ctx.fill();
        if (id == doc.skins[0].joints[sele_bone_idx]) {
          ctx.lineWidth = 2;
          ctx.strokeStyle = `rgb(100,255,255)`;
          ctx.beginPath();
          ctx.arc(bone_vec[0] * 250 + 250, (1 - bone_vec[1]) * 200, 10, 0, 2 * Math.PI);
          ctx.stroke();
        }
        return {id, vec: bone_vec};
      });
      if (click.x != -1 && click.y != -1) {
        let jointIdx = bones_vec.reverse().find(({id, vec}) => {
          let x = vec[0] * 250 + 250;
          let y = (1 - vec[1]) * 200;
          return ((x - click.x) ** 2 + (y - click.y) ** 2) ** 0.5 < 6;
        })?.id;
        let _idx = doc.skins[0].joints.findIndex((idx) => idx == jointIdx);
        sele_bone_idx = _idx == -1 ? sele_bone_idx : _idx;
        click = {x: -1, y: -1};
      }
      t += 0.0166;
      t %= timeMaxs[animIdx];
      requestAnimationFrame(loop);
    };
    loop();
  });
})();
//# sourceMappingURL=index.js.map