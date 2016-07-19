document.addEventListener('DOMContentLoaded', function() {
  'use strict';

  let menuTrigger = document.querySelector('.menu__trigger');
  let menuItems = document.querySelectorAll('.menu__link');
  let btnLearnMore = document.querySelector('.btn--more');
  let btnDownload = document.querySelector('.btn--download');
  let btnShowMore = document.querySelector('.btn--show');
  let btnSubmit = document.querySelector('.btn--submit');
  let slider = document.querySelector('.screenshots__slider');

  menuTrigger.addEventListener('click', showMenu);
  btnLearnMore.addEventListener('click', scrollPage);
  btnDownload.addEventListener('click', scrollPage);
  btnShowMore.addEventListener('click', showTwees);
  btnSubmit.addEventListener('click', sendEmail);

  menuItems = Array.prototype.slice.call(menuItems, 0);
  menuItems.forEach(function(item) {
    item.addEventListener('click', scrollPage);
  });

  var screenshotsSlider = lory(slider, {
    infinite: 4,
    slidesToScroll: 1,
    slideSpeed: 1000,
    ease: 'cubic-bezier(0.455, 0.03, 0.515, 0.955)',
    classNameFrame: 'screenshots__frame',
    classNameSlideContainer: 'screenshots__list',
    classNamePrevCtrl: 'btn--prev',
    classNameNextCtrl: 'btn--next'
  });

  function showMenu() {
    let menu = document.querySelector('.menu');

    menu.classList.toggle('menu--show');
  }

  function scrollPage(event) {
    event.preventDefault();

    let offset = 0;
    let elem = document.querySelector(this.hash);

    jump.jump(elem, {
      duration: 1500,
      offset: offset,
      easing: (function (t, b, c, d) {
        t /= d / 2;
        if (t < 1) return c / 2 * t * t + b;
        t--;
        return -c / 2 * (t * (t - 2) - 1) + b;
      })
    })
  }

  function showTwees(event) {
    event.preventDefault();

    let tweetsList = document.querySelector('.tweets__list');

    tweetsList.classList.toggle('tweets__list--show');
  }

  function sendEmail(event) {
    event.preventDefault();
  }
});
