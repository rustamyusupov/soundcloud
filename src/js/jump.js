let jump = (function() {
  'use strict';

  let start, options, target, distance, duration, timeStart, timeElapsed, next;

  function jump(target, opts) {
    start = window.pageYOffset;

    options = {
      duration: opts.duration,
      offset: opts.offset || 0,
      callback: opts.callback,
      easing: opts.easing || _ease
    } || {};

    target = typeof target === 'string'
      ? document.querySelector(target)
      : target;

    distance = typeof target === 'number'
      ? target
      : options.offset + target.getBoundingClientRect().top;

    duration = typeof options.duration === 'function'
      ? options.duration(distance)
      : options.duration

      requestAnimationFrame(function(time) {
        return _loop(time);
      });
  }

  function _ease(pos) {
    if ((pos /= 0.5) < 1) return (0.5 * Math.pow(pos, 2));
    return -0.5 * ((pos -= 2) * pos - 2);
  }

  function _loop(time) {
    if(!timeStart) {
      timeStart = time
    }

    timeElapsed = time - timeStart
    next = options.easing(timeElapsed, start, distance, duration)

    window.scrollTo(0, next)

    timeElapsed < duration
      ? requestAnimationFrame(function (time) {
          return _loop(time);
        })
      : _end()
  }

  function _end() {
    window.scrollTo(0, start + distance)

    typeof options.callback === 'function' && options.callback()
    timeStart = false
  }

  return {
    jump: jump
  }
})();
