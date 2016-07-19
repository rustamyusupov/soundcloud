(function webpackUniversalModuleDefinition(root, factory) {
	if(typeof exports === 'object' && typeof module === 'object')
		module.exports = factory();
	else if(typeof define === 'function' && define.amd)
		define([], factory);
	else {
		var a = factory();
		for(var i in a) (typeof exports === 'object' ? exports : root)[i] = a[i];
	}
})(this, function() {
return (function(modules) {

  var installedModules = {};

  function __webpack_require__(moduleId) {
    if(installedModules[moduleId])
      return installedModules[moduleId].exports;

    var module = installedModules[moduleId] = {
      exports: {},
      id: moduleId,
      loaded: false
    };

    modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);

    module.loaded = true;

    return module.exports;
  }

  __webpack_require__.m = modules;

  __webpack_require__.c = installedModules;

  __webpack_require__.p = "";

  return __webpack_require__(0);
})

([
function(module, exports, __webpack_require__) {

	module.exports = __webpack_require__(1);

},
function(module, exports, __webpack_require__) {

  'use strict';

	Object.defineProperty(exports, "__esModule", {
	    value: true
	});

	var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; /* globals jQuery */

	exports.lory = lory;

	var _detectPrefixes = __webpack_require__(2);

	var _detectPrefixes2 = _interopRequireDefault(_detectPrefixes);

	var _dispatchEvent = __webpack_require__(3);

	var _dispatchEvent2 = _interopRequireDefault(_dispatchEvent);

	var _defaults = __webpack_require__(5);

	var _defaults2 = _interopRequireDefault(_defaults);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	var slice = Array.prototype.slice;

	function lory(slider, opts) {
	    var position = void 0;
	    var slidesWidth = void 0;
	    var frameWidth = void 0;
	    var slides = void 0;

	    var frame = void 0;
	    var slideContainer = void 0;
	    var prevCtrl = void 0;
	    var nextCtrl = void 0;
	    var prefixes = void 0;
	    var transitionEndCallback = void 0;

	    var index = 0;
	    var options = {};

	    if (typeof jQuery !== 'undefined' && slider instanceof jQuery) {
	        slider = slider[0];
	    }

	    function setActiveElement(slides, currentIndex) {
	        var _options = options;
	        var classNameActiveSlide = _options.classNameActiveSlide;


	        slides.forEach(function (element, index) {
	            if (element.classList.contains(classNameActiveSlide)) {
	                element.classList.remove(classNameActiveSlide);
	            }
	        });

	        slides[currentIndex].classList.add(classNameActiveSlide);
	    }

	    function setupInfinite(slideArray) {
	        var _options2 = options;
	        var infinite = _options2.infinite;


	        var front = slideArray.slice(0, infinite);
	        var back = slideArray.slice(slideArray.length - infinite, slideArray.length);

	        front.forEach(function (element) {
	            var cloned = element.cloneNode(true);

	            slideContainer.appendChild(cloned);
	        });

	        back.reverse().forEach(function (element) {
	            var cloned = element.cloneNode(true);

	            slideContainer.insertBefore(cloned, slideContainer.firstChild);
	        });

	        slideContainer.addEventListener(prefixes.transitionEnd, onTransitionEnd);

	        return slice.call(slideContainer.children);
	    }

	    function dispatchSliderEvent(phase, type, detail) {
	        (0, _dispatchEvent2.default)(slider, phase + '.lory.' + type, detail);
	    }

	    function translate(to, duration, ease) {
	        var style = slideContainer && slideContainer.style;

	        if (style) {
	            style[prefixes.transition + 'TimingFunction'] = ease;
	            style[prefixes.transition + 'Duration'] = duration + 'ms';

	            if (prefixes.hasTranslate3d) {
	                style[prefixes.transform] = 'translate3d(' + to + 'px, 0, 0)';
	            } else {
	                style[prefixes.transform] = 'translate(' + to + 'px, 0)';
	            }
	        }
	    }

	    function slide(nextIndex, direction) {
	        var _options3 = options;
	        var slideSpeed = _options3.slideSpeed;
	        var slidesToScroll = _options3.slidesToScroll;
	        var infinite = _options3.infinite;
	        var rewind = _options3.rewind;
	        var rewindSpeed = _options3.rewindSpeed;
	        var ease = _options3.ease;
	        var classNameActiveSlide = _options3.classNameActiveSlide;


	        var duration = slideSpeed;

	        var nextSlide = direction ? index + 1 : index - 1;
	        var maxOffset = Math.round(slidesWidth - frameWidth);

	        dispatchSliderEvent('before', 'slide', {
	            index: index,
	            nextSlide: nextSlide
	        });

	        if (typeof nextIndex !== 'number') {
	            if (direction) {
	                nextIndex = index + slidesToScroll;
	            } else {
	                nextIndex = index - slidesToScroll;
	            }
	        }

	        nextIndex = Math.min(Math.max(nextIndex, 0), slides.length - 1);

	        if (infinite && direction === undefined) {
	            nextIndex += infinite;
	        }

	        var nextOffset = Math.min(Math.max(slides[nextIndex].offsetLeft * -1, maxOffset * -1), 0);

	        if (rewind && Math.abs(position.x) === maxOffset && direction) {
	            nextOffset = 0;
	            nextIndex = 0;
	            duration = rewindSpeed;
	        }

	        translate(nextOffset, duration, ease);

	        position.x = nextOffset;

	        if (slides[nextIndex].offsetLeft <= maxOffset) {
	            index = nextIndex;
	        }

	        if (infinite && (Math.abs(nextOffset) === maxOffset || Math.abs(nextOffset) === 0)) {
	            if (direction) {
	                index = infinite;
	            }

	            if (!direction) {
	                index = slides.length - infinite * 2;
	            }

	            position.x = slides[index].offsetLeft * -1;

	            transitionEndCallback = function transitionEndCallback() {
	                translate(slides[index].offsetLeft * -1, 0, undefined);
	            };
	        }

	        if (classNameActiveSlide) {
	            setActiveElement(slice.call(slides), index);
	        }

	        dispatchSliderEvent('after', 'slide', {
	            currentSlide: index
	        });
	    }

	    function setup() {
	        dispatchSliderEvent('before', 'init');

	        prefixes = (0, _detectPrefixes2.default)();
	        options = _extends({}, _defaults2.default, opts);

	        var _options4 = options;
	        var classNameFrame = _options4.classNameFrame;
	        var classNameSlideContainer = _options4.classNameSlideContainer;
	        var classNamePrevCtrl = _options4.classNamePrevCtrl;
	        var classNameNextCtrl = _options4.classNameNextCtrl;
	        var enableMouseEvents = _options4.enableMouseEvents;
	        var classNameActiveSlide = _options4.classNameActiveSlide;


	        frame = slider.getElementsByClassName(classNameFrame)[0];
	        slideContainer = frame.getElementsByClassName(classNameSlideContainer)[0];
	        prevCtrl = slider.getElementsByClassName(classNamePrevCtrl)[0];
	        nextCtrl = slider.getElementsByClassName(classNameNextCtrl)[0];

	        position = {
	            x: slideContainer.offsetLeft,
	            y: slideContainer.offsetTop
	        };

	        if (options.infinite) {
	            slides = setupInfinite(slice.call(slideContainer.children));
	        } else {
	            slides = slice.call(slideContainer.children);
	        }

	        reset();

	        if (classNameActiveSlide) {
	            setActiveElement(slides, index);
	        }

	        if (prevCtrl && nextCtrl) {
	            prevCtrl.addEventListener('click', prev);
	            nextCtrl.addEventListener('click', next);
	        }

	        slideContainer.addEventListener('touchstart', onTouchstart);

	        if (enableMouseEvents) {
	            slideContainer.addEventListener('mousedown', onTouchstart);
	            slideContainer.addEventListener('click', onClick);
	        }

	        options.window.addEventListener('resize', onResize);

	        dispatchSliderEvent('after', 'init');
	    }

	    function reset() {
	        var _options5 = options;
	        var infinite = _options5.infinite;
	        var ease = _options5.ease;
	        var rewindSpeed = _options5.rewindSpeed;


	        slidesWidth = slideContainer.getBoundingClientRect().width || slideContainer.offsetWidth;
	        frameWidth = frame.getBoundingClientRect().width || frame.offsetWidth;

	        if (frameWidth === slidesWidth) {
	            slidesWidth = slides.reduce(function (previousValue, slide) {
	                return previousValue + slide.getBoundingClientRect().width || slide.offsetWidth;
	            }, 0);
	        }

	        index = 0;

	        if (infinite) {
	            translate(slides[index + infinite].offsetLeft * -1, 0, null);

	            index = index + infinite;
	            position.x = slides[index].offsetLeft * -1;
	        } else {
	            translate(0, rewindSpeed, ease);
	        }
	    }

	    function slideTo(index) {
	        slide(index);
	    }

	    function returnIndex() {
	        return index - options.infinite || 0;
	    }

	    function prev() {
	        slide(false, false);
	    }

	    function next() {
	        slide(false, true);
	    }

	    function destroy() {
	        dispatchSliderEvent('before', 'destroy');

	        slideContainer.removeEventListener(prefixes.transitionEnd, onTransitionEnd);
	        slideContainer.removeEventListener('touchstart', onTouchstart);
	        slideContainer.removeEventListener('touchmove', onTouchmove);
	        slideContainer.removeEventListener('touchend', onTouchend);
	        slideContainer.removeEventListener('mousemove', onTouchmove);
	        slideContainer.removeEventListener('mousedown', onTouchstart);
	        slideContainer.removeEventListener('mouseup', onTouchend);
	        slideContainer.removeEventListener('mouseleave', onTouchend);
	        slideContainer.removeEventListener('click', onClick);

	        options.window.removeEventListener('resize', onResize);

	        if (prevCtrl) {
	            prevCtrl.removeEventListener('click', prev);
	        }

	        if (nextCtrl) {
	            nextCtrl.removeEventListener('click', next);
	        }

	        dispatchSliderEvent('after', 'destroy');
	    }

	    var touchOffset = void 0;
	    var delta = void 0;
	    var isScrolling = void 0;

	    function onTransitionEnd() {
	        if (transitionEndCallback) {
	            transitionEndCallback();

	            transitionEndCallback = undefined;
	        }
	    }

	    function onTouchstart(event) {
	        var _options6 = options;
	        var enableMouseEvents = _options6.enableMouseEvents;

	        var touches = event.touches ? event.touches[0] : event;

	        if (enableMouseEvents) {
	            slideContainer.addEventListener('mousemove', onTouchmove);
	            slideContainer.addEventListener('mouseup', onTouchend);
	            slideContainer.addEventListener('mouseleave', onTouchend);
	        }

	        slideContainer.addEventListener('touchmove', onTouchmove);
	        slideContainer.addEventListener('touchend', onTouchend);

	        var pageX = touches.pageX;
	        var pageY = touches.pageY;


	        touchOffset = {
	            x: pageX,
	            y: pageY,
	            time: Date.now()
	        };

	        isScrolling = undefined;

	        delta = {};

	        dispatchSliderEvent('on', 'touchstart', {
	            event: event
	        });
	    }

	    function onTouchmove(event) {
	        var touches = event.touches ? event.touches[0] : event;
	        var pageX = touches.pageX;
	        var pageY = touches.pageY;


	        delta = {
	            x: pageX - touchOffset.x,
	            y: pageY - touchOffset.y
	        };

	        if (typeof isScrolling === 'undefined') {
	            isScrolling = !!(isScrolling || Math.abs(delta.x) < Math.abs(delta.y));
	        }

	        if (!isScrolling && touchOffset) {
	            event.preventDefault();
	            translate(position.x + delta.x, 0, null);
	        }

	        dispatchSliderEvent('on', 'touchmove', {
	            event: event
	        });
	    }

	    function onTouchend(event) {

	        var duration = touchOffset ? Date.now() - touchOffset.time : undefined;

	        var isValid = Number(duration) < 300 && Math.abs(delta.x) > 25 || Math.abs(delta.x) > frameWidth / 3;

	        var isOutOfBounds = !index && delta.x > 0 || index === slides.length - 1 && delta.x < 0;

	        var direction = delta.x < 0;

	        if (!isScrolling) {
	            if (isValid && !isOutOfBounds) {
	                slide(false, direction);
	            } else {
	                translate(position.x, options.snapBackSpeed);
	            }
	        }

	        touchOffset = undefined;

	        slideContainer.removeEventListener('touchmove', onTouchmove);
	        slideContainer.removeEventListener('touchend', onTouchend);
	        slideContainer.removeEventListener('mousemove', onTouchmove);
	        slideContainer.removeEventListener('mouseup', onTouchend);
	        slideContainer.removeEventListener('mouseleave', onTouchend);

	        dispatchSliderEvent('on', 'touchend', {
	            event: event
	        });
	    }

	    function onClick(event) {
	        if (delta.x) {
	            event.preventDefault();
	        }
	    }

	    function onResize(event) {
	        reset();

	        dispatchSliderEvent('on', 'resize', {
	            event: event
	        });
	    }

	    setup();

	    return {
	        setup: setup,
	        reset: reset,
	        slideTo: slideTo,
	        returnIndex: returnIndex,
	        prev: prev,
	        next: next,
	        destroy: destroy
	    };
	}

},
function(module, exports) {

	(function(global) {'use strict';

	Object.defineProperty(exports, "__esModule", {
	    value: true
	});
	exports.default = detectPrefixes;

	function detectPrefixes() {
	    var transform = void 0;
	    var transition = void 0;
	    var transitionEnd = void 0;
	    var hasTranslate3d = void 0;

	    (function () {
	        var el = document.createElement('_');
	        var style = el.style;

	        var prop = void 0;

	        if (style[prop = 'webkitTransition'] === '') {
	            transitionEnd = 'webkitTransitionEnd';
	            transition = prop;
	        }

	        if (style[prop = 'transition'] === '') {
	            transitionEnd = 'transitionend';
	            transition = prop;
	        }

	        if (style[prop = 'webkitTransform'] === '') {
	            transform = prop;
	        }

	        if (style[prop = 'msTransform'] === '') {
	            transform = prop;
	        }

	        if (style[prop = 'transform'] === '') {
	            transform = prop;
	        }

	        document.body.insertBefore(el, null);
	        style[transform] = 'translate3d(0, 0, 0)';
	        hasTranslate3d = !!global.getComputedStyle(el).getPropertyValue(transform);
	        document.body.removeChild(el);
	    })();

	    return {
	        transform: transform,
	        transition: transition,
	        transitionEnd: transitionEnd,
	        hasTranslate3d: hasTranslate3d
	    };
	}
	}.call(exports, (function() { return this; }())))

},
function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	    value: true
	});
	exports.default = dispatchEvent;

	var _customEvent = __webpack_require__(4);

	var _customEvent2 = _interopRequireDefault(_customEvent);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	function dispatchEvent(target, type, detail) {
	    var event = new _customEvent2.default(type, {
	        bubbles: true,
	        cancelable: true,
	        detail: detail
	    });

	    target.dispatchEvent(event);
	}

},
function(module, exports) {

	(function(global) {
	var NativeCustomEvent = global.CustomEvent;

	function useNative () {
	  try {
	    var p = new NativeCustomEvent('cat', { detail: { foo: 'bar' } });
	    return  'cat' === p.type && 'bar' === p.detail.foo;
	  } catch (e) {
	  }
	  return false;
	}


	module.exports = useNative() ? NativeCustomEvent :

	'function' === typeof document.createEvent ? function CustomEvent (type, params) {
	  var e = document.createEvent('CustomEvent');
	  if (params) {
	    e.initCustomEvent(type, params.bubbles, params.cancelable, params.detail);
	  } else {
	    e.initCustomEvent(type, false, false, void 0);
	  }
	  return e;
	} :

	function CustomEvent (type, params) {
	  var e = document.createEventObject();
	  e.type = type;
	  if (params) {
	    e.bubbles = Boolean(params.bubbles);
	    e.cancelable = Boolean(params.cancelable);
	    e.detail = params.detail;
	  } else {
	    e.bubbles = false;
	    e.cancelable = false;
	    e.detail = void 0;
	  }
	  return e;
	}

	}.call(exports, (function() { return this; }())))

},
function(module, exports) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	exports.default = {
	  slidesToScroll: 1,
	  slideSpeed: 300,
	  rewindSpeed: 600,
	  snapBackSpeed: 200,
	  ease: 'ease',
	  rewind: false,
	  infinite: false,
	  classNameFrame: 'js-frame',
	  classNameSlideContainer: 'js-slides',
	  classNamePrevCtrl: 'js-prev',
	  classNameNextCtrl: 'js-next',
	  classNameActiveSlide: 'active',
	  enableMouseEvents: false,
	  window: window
	};

}
])
});
;
