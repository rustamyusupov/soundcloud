document.addEventListener('DOMContentLoaded', function() {
  'use strict';

  let menuTrigger = document.querySelector('.menu__trigger');
  let menuItems = document.querySelectorAll('.menu__link');
  let btnLearnMore = document.querySelector('.btn--more');
  let btnDownload = document.querySelector('.btn--download');

  menuTrigger.addEventListener('click', showMenu);
  btnLearnMore.addEventListener('click', jump.scroll);
  btnDownload.addEventListener('click', jump.scroll);

  menuItems = Array.prototype.slice.call(menuItems, 0);
  menuItems.forEach(function(item) {
    item.addEventListener('click', jump.scroll);
  });


  function showMenu() {
    let menu = document.querySelector('.menu');

    menu.classList.toggle('menu--show');
  }
});
