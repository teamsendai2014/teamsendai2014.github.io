/*
 * Scroll-up-bar plugin v0.0.1
 * https://github.com/eduardomb/scroll-up-bar
*/
(function($) {
  'use strict';

  $.fn.scrollupbar = function() {
    var $window = $(window),
        $document = $(document),
        $topbar = this,
        topbarHeight = $topbar.outerHeight(),
        lastY = 0, // Keep track of the last Y to detect scroll direction.
        revealing = false, // Indicate if the bar's reveal is in progress.
        timeout,
        scrollstart=-1;
        this.css('position','fixed');

    $window.scroll(function() {
      var y = $window.scrollTop();

      // Cancel the event fired by the previous scroll.
      if (timeout) {
        clearTimeout(timeout);
      }

      // Ignore elastic scrolling.
      if (y < 0 || y > ($document.height() - $window.height())) {
        return;
      }

      if (y < lastY) { // Scrolling up
        // The first scroll up places the bar right above the top frame.
        if (!revealing) {
          revealing = true;
          if (y > topbarHeight) {
           scrollstart=lastY - topbarHeight;
          }
        }

        // Scrolls up bigger than the bar's height fixes the bar on top.
        if (scrollstart < 0 || scrollstart > y) {
          $topbar.css('top', 0);
          scrollstart=-1;
        }else{
          $topbar.css('top', scrollstart - y);
        }

        // Fire an event to reveal the entire bar after 400ms if the scroll
        // wasn't big enough.
        timeout = setTimeout(function() {
          if (scrollstart > 0 && scrollstart < y) {
            $topbar.css({
              'top': scrollstart - y
            });
            $topbar.animate({'top': 0}, 100);
            scrollstart=-1;
          }
        }, 400);
      } else { // Scrolling down
        revealing = false;

        // The first scroll down unfixes the bar allowing it to scroll with the
        // page.
        if (scrollstart < 0) {
          scrollstart=lastY;
        }
        $topbar.css('top',scrollstart - y);

        // Fire an event to hide the entire bar after 400ms if the scroll
        // wasn't big enough.
        timeout = setTimeout(function() {
          if (y < scrollstart + topbarHeight) {
            if (y > topbarHeight) {
              $topbar.animate({'top': - topbarHeight}, 100);
              scrollstart=lastY-topbarHeight;
            }
          }
        }, 400);
      }

      lastY = y;
    });

    return this;
  };
})(jQuery);
