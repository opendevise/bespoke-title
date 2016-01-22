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
