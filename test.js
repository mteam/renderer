var expect = require('expect.js'),
    sham = require('sham'),
    Canvas = require('canvas'),
    Drawable = require('drawable'),
    Renderer = require('./index');

describe('Renderer', function() {

  describe('#setCanvas', function() {

    it('should set canvas', function() {
      var renderer = new Renderer,
          canvas = sham.mock(Canvas);

      renderer.setCanvas(canvas);
      expect(renderer.getCanvas()).to.be(canvas);
    });

  });

  describe('#rectangle', function() {

    it('should draw a filled rectangle', function() {
      var renderer = new Renderer,
          canvas = sham.mock(Canvas);

      canvas.mock('context')
        .spy('fillRect')
          .args(10, 20, 300, 400)
          .called();

      renderer.setCanvas(canvas);
      renderer.rectangle('fill', 10, 20, 300, 400);

      canvas.check();
    });

    it('should draw an outlined rectangle', function() {
      var renderer = new Renderer,
          canvas = sham.mock(Canvas);

      canvas.mock('context')
        .spy('strokeRect')
          .args(10, 20, 300, 400)
          .called();

      renderer.setCanvas(canvas);
      renderer.rectangle('stroke', 10, 20, 300, 400);

      canvas.check();
    });

    it('should not accept invalid parameters', function() {
      var renderer = new Renderer,
          canvas = sham.mock(Canvas);

      canvas.mock('context')
        .spy('fillRect')
          .called(0);

      renderer.setCanvas(canvas);

      expect(function() {
        renderer.rectangle('foo', 10, 20, 300, 400);
      }).to.throwError(/invalid mode/);

      expect(function() {
        renderer.rectangle('fill', 10 / 0, 20, 300, 400);
      }).to.throwError(/invalid position/);

      expect(function() {
        renderer.rectangle('fill', 10, 20, 300 / 0, 400);
      }).to.throwError(/invalid dimensions/);

      canvas.check();
    });

  });

  describe('#clear', function() {

    it('should clear canvas', function() {
      var renderer = new Renderer,
          canvas = sham.mock(Canvas);

      canvas.spy('getWidth').return(100);
      canvas.spy('getHeight').return(200);

      canvas.mock('context')
        .spy('clearRect')
          .args(0, 0, 100, 200)
          .called();

      renderer.setCanvas(canvas);
      renderer.clear();

      canvas.check();
    });

  });

  describe('#line', function() {
    it('should draw a line', function() {
      var renderer = new Renderer,
          canvas = sham.mock(Canvas);

      var ctx = canvas.mock('context');

      ctx.spy('moveTo')
        .args(10, 20);

      ctx.spy('lineTo')
        .args(20, 30)
        .args(30, 40)
        .args(40, 50)
        .called(3);

      ctx.spy('stroke')
        .called();

      renderer.setCanvas(canvas);
      renderer.line(10, 20, 20, 30, 30, 40, 40, 50);

      canvas.check();
    });
  });
  
  describe('#draw', function() {
    it('should draw object', function() {
      var renderer = new Renderer,
          canvas = sham.mock(Canvas),
          drawable = sham.mock(Drawable);

      drawable
        .spy('draw')
          .args(canvas.context, 10, 20)
          .called();
          
      renderer.setCanvas(canvas);      
      renderer.draw(drawable, 10, 20);
      
      drawable.check();
    });
  });
  
  describe('#drawRect', function() {
    it('should draw object', function() {
      var renderer = new Renderer,
          canvas = sham.mock(Canvas),
          drawable = sham.mock(Drawable),
          rect = {};
          
      drawable
        .spy('drawRect')
          .args(canvas.context, rect, 10, 20)
          .called();

      renderer.setCanvas(canvas);
      renderer.drawRect(drawable, rect, 10, 20);
      
      drawable.check();
    });
  });

});
