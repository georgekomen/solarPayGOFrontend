$(document).ready(function () {
  var trigger = $('.hamburger'),
    overlay = $('.overlay'),
    cont = $('.container-fluid'),
    isClosed = false;

  trigger.click(function () {
    hamburger_cross();
  });

  function hamburger_cross() {

    if (isClosed == true) {
      //overlay.hide();
      trigger.removeClass('is-open');
      trigger.addClass('is-closed');
      cont.removeClass('lesscont');
      cont.addClass('fullcont');
      isClosed = false;
    } else {
      //overlay.show();
      trigger.removeClass('is-closed');
      trigger.addClass('is-open');
      cont.removeClass('fullcont');
      cont.addClass('lesscont');
      isClosed = true;
    }
  }

  $('[data-toggle="offcanvas"]').click(function () {
    $('#wrapper').toggleClass('toggled');
  });
});