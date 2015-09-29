Function.prototype.bind = Function.prototype.bind || require('function-bind');

var bespoke = require('bespoke'),
  title = require('../../lib/bespoke-title.js');

describe('bespoke-title', function() {
  var deck,
    setup = function() {
      document.title = 'bespoke-title tests';
    },
    createDeck = function(opts) {
      var parent = document.createElement('article');
      for (var i = 1; i <= 5; i++) {
        var section = document.createElement('section');
        var slideTitle = document.createElement('h2');
        slideTitle.appendChild(document.createTextNode('Slide ' + i));
        section.appendChild(slideTitle);
        if (i === 1) {
          section.setAttribute('data-title', '');
        }
        else if (i % 2 !== 0) {
          section.setAttribute('data-title', 'Override Slide ' + i);
        }
        parent.appendChild(section);
      }

      document.body.appendChild(parent);

      deck = bespoke.from(parent, [
        title(opts)
      ]);
    },
    destroyDeck = function() {
      deck.fire('destroy');
      if (deck.parent.parentNode) deck.parent.parentNode.removeChild(deck.parent);
      deck = null;
    };

  beforeAll(setup);

  describe('restores title', function() {
    it('should restore original title when deck is destroyed', function() {
      expect(document.title).toBe('bespoke-title tests');
      createDeck();
      deck.next();
      expect(document.title).not.toBe('bespoke-title tests');
      destroyDeck();
      expect(document.title).toBe('bespoke-title tests');
    });
  });

  describe('slide change', function() {
    beforeEach(function() { createDeck(); });
    afterEach(destroyDeck);

    it('should set title to h2 text when slide without data-title attribute is activated', function() {
      expect(document.title).toBe('bespoke-title tests');
      deck.next();
      expect(document.title).toBe('Slide 2 — bespoke-title tests');
    });

    it('should set title to data-title when slide with data-title attribute is activated', function() {
      expect(document.title).toBe('bespoke-title tests');
      deck.slide(2);
      expect(document.title).toBe('Override Slide 3 — bespoke-title tests');
    });
  });

  describe('custom options', function() {
    describe('separator option', function() {
      beforeEach(function() { createDeck({ separator: ': ' }); });
      afterEach(destroyDeck);

      it('should use the separator specified by the separator option', function() {
        expect(document.title).toBe('bespoke-title tests');
        deck.slide(2);
        expect(document.title).toBe('Override Slide 3: bespoke-title tests');
      });
    });
  });
});
