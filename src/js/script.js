document.addEventListener('DOMContentLoaded', function() {
  'use strict';

  var menuTrigger = document.querySelector('.menu__trigger');

  menuTrigger.addEventListener('click', showMenu);

  function showMenu() {
    var menu = document.querySelector('.menu');

    menu.classList.toggle('menu--show');
  }
});
