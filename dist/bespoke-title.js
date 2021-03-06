/*!
 * bespoke-title v1.0.1-dev
 *
 * Copyright 2016, Dan Allen
 * This content is released under the MIT license
 */

(function(f){if(typeof exports==="object"&&typeof module!=="undefined"){module.exports=f()}else if(typeof define==="function"&&define.amd){define([],f)}else{var g;if(typeof window!=="undefined"){g=window}else if(typeof global!=="undefined"){g=global}else if(typeof self!=="undefined"){g=self}else{g=this}g=(g.bespoke||(g.bespoke = {}));g=(g.plugins||(g.plugins = {}));g.title = f()}})(function(){var define,module,exports;return (function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
module.exports = function(opts) {
  return function(deck) {
    opts = opts || {};
    var separator = typeof opts.separator === 'string' ? opts.separator : ' — ',
      documentTitle = document.title,
      presentationTitle = typeof opts.title === 'string' ? opts.title : documentTitle,
      getSlideTitle = function(slide) {
        var title = slide.getAttribute('data-title');
        if (title === null && (title = slide.querySelector('h1,h2')) !== null) title = title.textContent;
        return (title = (title || '').trim()).length === 0 ? null : title;
      },
      onActivate = function(e) {
        var slideTitle = getSlideTitle(e.slide);
        if (slideTitle !== null) document.title = slideTitle + separator + presentationTitle;
        else if (document.title !== presentationTitle) document.title = presentationTitle;
      };
    deck.on('destroy', function() { document.title = documentTitle; });
    deck.on('activate', onActivate);
  };
};

},{}]},{},[1])(1)
});