var Drawable = require('drawable'),
    Canvas = require('canvas'),
    is = require('helpers').is;

function Renderer() {
  this.canvas = null;
}

// --- canvas switching ---

Renderer.prototype.getCanvas = function() {
  if (this.canvas) {
    return this.canvas;
  } else {
    throw new Error('no canvas set');
  }
};

Renderer.prototype.setCanvas = function(canvas) {
  if (canvas instanceof Canvas) {
    this.canvas = canvas;
  } else {
    throw new Error('object is not an instance of Canvas');
  }
};

Renderer.prototype.ctx = function() {
  return this.getCanvas().context;
}

// --- shapes ---

Renderer.prototype.rectangle = function(mode, x, y, w, h) {
  var fn = this.ctx()[mode + 'Rect'];

  if (fn == null)
    throw new Error('invalid mode: ' + mode);

  if (!is.number(x) || !is.number(y))
    throw new Error('invalid position: ' + x + ';' + y);

  if (!is.number(w) || !is.number(h))
    throw new Error('invalid dimensions: ' + w + 'x' + h);

  fn.call(this.ctx(), x, y, w, h);
};

Renderer.prototype.line = function(x1, y1) {
  this.ctx().moveTo(x1, y1);

  var i = 2,
      x, y;

  while (i < arguments.length) {
    x = arguments[i++];
    y = arguments[i++];

    this.ctx().lineTo(x, y);
  }

  this.ctx().stroke();
};

// --- canvas manipulation ---

Renderer.prototype.clear = function() {
  var canvas = this.getCanvas(),
      width = canvas.getWidth(),
      height = canvas.getHeight();

  this.ctx().clearRect(0, 0, width, height);
};

// --- drawing objects ---

Renderer.prototype.draw = function(obj, x, y) {
  if (obj instanceof Drawable) {
    obj.draw(this.ctx(), x, y);
  } else {
    throw new Error('this object is not drawable');
  }
};

Renderer.prototype.drawRect = function(obj, rect, x, y) {
  if (obj instanceof Drawable) {
    obj.drawRect(ctx(), rect, x, y);
  } else {
    throw new Error('this object is not drawable');
  }
};
