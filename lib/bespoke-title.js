module.exports = function() {
  return function(deck) {
    var originalTitle = document.title,
      presentationTitle = originalTitle,
      getSlideTitle = function(slide) {
        var title = slide.getAttribute('data-title');
        if (title === null && (title = slide.querySelector('h1,h2')) !== null) title = title.textContent;
        return title === null || title.length === 0 ? null : title;
      },
      onActivate = function(e) {
        var slideTitle = getSlideTitle(e.slide);
        document.title = slideTitle !== null ? slideTitle + ' — ' + presentationTitle : presentationTitle;
      };
    deck.on('destroy', function() { document.title = originalTitle; });
    deck.on('activate', onActivate);
  };
};
