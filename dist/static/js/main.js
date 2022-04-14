"use strict";

;

(function () {
  cropText();
  hideBlock();
  var readMore = document.querySelectorAll('.js-read-more');
  readMore.forEach(function (el) {
    el.addEventListener('click', function () {
      var elText = el.innerText;
      var hiddenText = el.previousElementSibling;
      el.innerText = elText == 'read more >' ? 'hide' : 'read more >';
      hiddenText.classList.toggle('show');
    });
  });

  function cropText() {
    var max = 180;
    var text = document.querySelectorAll('.js-read-more-text');
    text.forEach(function (el) {
      var str = el.innerText.trim();

      if (str.length > max) {
        var subStr = str.substring(0, max);
        var hiddenStr = str.substring(max, str.length);
        el.innerText = subStr;
        el.innerHTML += "<span class=\"hidden-text js-hidden-text\">".concat(hiddenStr, "</span>");
        el.innerHTML += '<span class="read-more js-read-more">read more ></span>';
      }
    });
  }

  var showReview = document.querySelectorAll('.js-show-review');
  showReview.forEach(function (el) {
    el.addEventListener('click', function () {
      var elText = el.innerText;
      var hiddenText = el.previousElementSibling;
      var images = el.nextElementSibling;
      el.innerText = elText == 'read more >' ? '< hide' : 'read more >';
      hiddenText.classList.toggle('show');
      images.classList.toggle("show");
    });
  });

  function hideBlock() {
    var max = 128;
    var productReview = document.querySelectorAll('.js-hide-review');
    productReview.forEach(function (el) {
      var productText = el.querySelector(".page-text");
      var str = productText.innerText.trim();
      var images = el.querySelector('.product-review__images');

      if (str.length > max) {
        var subStr = str.substring(0, max);
        var hiddenStr = str.substring(max, str.length);
        productText.innerText = subStr;
        var hiddenText = document.createElement('span');
        hiddenText.classList.add('hidden-text', 'page-text', 'js-hidden-text');
        hiddenText.textContent = hiddenStr;
        productText.after(hiddenText);
      }

      var readMore = document.createElement('span');
      readMore.classList.add('read-more', 'js-show-review');
      readMore.textContent = 'read more >';
      images.before(readMore);
    });
  }

  var accordion = function accordion() {
    document.addEventListener('click', function (e) {
      if (e.target.classList.contains('js-accordion') || e.target.closest('.js-accordion')) {
        var _accordion = e.target.classList.contains('js-accordion') ? e.target : e.target.closest('.js-accordion');

        var accordionContent = _accordion.nextElementSibling;

        if (accordionContent.style.maxHeight || getComputedStyle(accordionContent).maxHeight == "max-content") {
          _accordion.parentElement.classList.remove("active");

          accordionContent.style.maxHeight = null;
        } else {
          _accordion.parentElement.classList.add("active");

          accordionContent.style.maxHeight = accordionContent.scrollHeight + "px";
        }
      }
    });
  };

  accordion();
  var sidebarLinks = document.querySelectorAll(".sidebar-menu__link");
  sidebarLinks.forEach(function (elem) {
    return elem.addEventListener("click", navbarLinkClick);
  });

  function navbarLinkClick(event) {
    smoothScroll(event);
  }

  function smoothScroll(event) {
    event.preventDefault();
    var targetId = event.currentTarget.getAttribute("href");

    if (window.screen.width > 1024) {
      window.scrollTo({
        top: targetId === "#" ? 0 : document.querySelector(targetId).offsetTop - 100,
        behavior: "smooth"
      });
    } else {
      window.scrollTo({
        top: targetId === "#" ? 0 : document.querySelector(targetId).offsetTop - 200,
        behavior: "smooth"
      });
    }
  }

  if (document.querySelector('.products-sticky') !== null) {
    window.addEventListener('optimizedResize', function () {
      toggleFixed('.products-sticky');
    });
    toggleFixed('.products-sticky');
    throttle("resize", "optimizedResize");
  }

  if (document.querySelector('.sticky-block') !== null) {
    var trackScroll = function trackScroll(elements) {
      var stickyBlocks = document.querySelectorAll(elements);
      stickyBlocks.forEach(function (el) {
        if (el.classList.contains('show') && window.pageYOffset < stickyBlockCoords) {
          el.classList.remove('show');
        } else if (window.pageYOffset > stickyBlockCoords) {
          el.classList.add('show');
        }
      });
    };

    var stickyBlockCoords = document.querySelector('.sticky-block').getBoundingClientRect().bottom + window.pageYOffset;
    window.addEventListener("scroll", function () {
      trackScroll('.sticky-block');
    });
  }

  function throttle(type, name, obj) {
    obj = obj || window;
    var running = false;

    var func = function func() {
      if (running) {
        return;
      }

      running = true;
      requestAnimationFrame(function () {
        obj.dispatchEvent(new CustomEvent(name));
        running = false;
      });
    };

    obj.addEventListener(type, func);
  }

  ;

  function toggleFixed(el) {
    var element = document.querySelector(el);
    var fixedWidth = window.screen.width > 1024 ? element.parentElement.clientWidth - 285 : element.parentElement.clientWidth;
    element.style.width = fixedWidth + 'px';
  }

  var showHideSidebarFilters = function showHideSidebarFilters() {
    if (document.querySelectorAll(".filter").length == 0) return false;
    window.addEventListener("load", showHideFilters);
    window.addEventListener("resize", showHideFilters);

    function showHideFilters() {
      var sidebarFilters = document.querySelectorAll(".filter");

      if (window.screen.width <= 1024) {
        sidebarFilters.forEach(function (filter) {
          filter.classList.remove("active");
        });
      } else {
        sidebarFilters.forEach(function (filter) {
          filter.classList.add("active");
        });
      }
    }
  };

  showHideSidebarFilters();

  var showMobileMenu = function showMobileMenu() {
    // hamburger open/close animation
    if (document.querySelector("#hamburger") == null) return false;
    var trigger = document.querySelector("#hamburger");
    var mobileNav = document.querySelector("#mobile-nav");
    var isClosed = true;
    trigger.addEventListener("click", burgerTime);

    function burgerTime() {
      if (isClosed == true) {
        trigger.classList.remove("is-open");
        trigger.classList.add("is-closed");
        mobileNav.classList.add('is-open');
        isClosed = false;
      } else {
        trigger.classList.remove("is-closed");
        trigger.classList.add("is-open");
        mobileNav.classList.remove('is-open');
        isClosed = true;
      }
    }
  };

  showMobileMenu();

  var openSearchForm = function openSearchForm() {
    // search form open/close animation
    if (document.querySelector(".search-form__btn") == null) return false;
    var searchBtn = document.querySelector(".search-form__btn");
    searchBtn.addEventListener("click", function () {
      this.classList.toggle("close");
      this.parentElement.classList.toggle("inclicked");
      this.previousElementSibling.value = "";
    });
    var productReviewStars = document.querySelectorAll(".js-product-review-rating");
    productReviewStars.forEach(function (el) {
      var dataRating = el.getAttribute("data-rating");
      var stars = el.children;

      for (var i = 0; i < dataRating; i++) {
        stars[i].classList.add("active");
      }
    });
  };

  openSearchForm();

  var chooseRating = function chooseRating() {
    if (document.querySelectorAll(".js-rating").length < 0) return false;
    var rating = document.querySelectorAll(".js-rating");
    rating.forEach(function (rate) {
      var ratingStars = rate.children;
      rate.addEventListener("click", function (e) {
        if (e.target.classList.contains("js-rating-star") || e.target.closest(".js-rating-star")) {
          var target = e.target.classList.contains("js-rating-star") ? e.target : e.target.closest(".js-rating-star");
          removeClass(ratingStars, "current-active");
          target.classList.add("active", "current-active");
        }
      });
      rate.addEventListener("mouseover", function (e) {
        if (e.target.classList.contains("js-rating-star") || e.target.closest(".js-rating-star")) {
          var target = e.target.classList.contains("js-rating-star") ? e.target : e.target.closest(".js-rating-star");
          removeClass(ratingStars, "active");
          target.classList.add("active");
          mouseOverActiveClass(ratingStars);
        }
      });
      rate.addEventListener("mouseout", function () {
        addClass(ratingStars, "active");
        mouseOutActiveClass(ratingStars);
      });

      function addClass(arr) {
        for (var i = 0, iLeng = arr.length; i < iLeng; i++) {
          for (var j = 1; j < arguments.length; j++) {
            ratingStars[i].classList.add(arguments[j]);
          }
        }
      }

      function removeClass(arr) {
        for (var i = 0, iLeng = arr.length; i < iLeng; i++) {
          for (var j = 1; j < arguments.length; j++) {
            ratingStars[i].classList.remove(arguments[j]);
          }
        }
      }

      function mouseOverActiveClass(arr) {
        for (var i = 0, iLen = arr.length; i < iLen; i++) {
          if (arr[i].classList.contains("active")) {
            break;
          } else {
            arr[i].classList.add("active");
          }
        }
      }

      function mouseOutActiveClass(arr) {
        for (var i = arr.length - 1; i >= 0; i--) {
          if (arr[i].classList.contains("current-active")) {
            break;
          } else {
            arr[i].classList.remove("active");
          }
        }
      }
    });
  };

  chooseRating();
  document.addEventListener("click", function (e) {
    if (e.target.classList.contains("js-open-dropdown") && window.screen.width <= 576) {
      var caretDropdown = e.target.firstElementChild;
      var dropdown = e.target.nextElementSibling;

      if (dropdown.style.maxHeight) {
        dropdown.style.maxHeight = null;
        dropdown.style.opacity = null;
        e.target.classList.remove("dropdown-active");
      } else {
        dropdown.style.maxHeight = dropdown.scrollHeight + "px";
        dropdown.style.opacity = 1;
        e.target.classList.add("dropdown-active");
      }
    }
  });

  var basicScrollTop = function basicScrollTop() {
    if (document.querySelector('.js-btn-go-top') == null) return false;
    var btnTop = document.querySelector('.js-btn-go-top');

    var btnReveal = function btnReveal() {
      if (window.scrollY >= 300) {
        btnTop.classList.add('is-visible');
      } else {
        btnTop.classList.remove('is-visible');
      }
    };

    var TopscrollTo = function TopscrollTo() {
      if (window.scrollY != 0) {
        setTimeout(function () {
          window.scrollTo(0, window.scrollY - 30);
          TopscrollTo();
        }, 10);
      }
    };

    window.addEventListener('scroll', btnReveal);
    btnTop.addEventListener('click', TopscrollTo);
  };

  basicScrollTop();

  var openModal = function openModal(btn, modal) {
    if (document.querySelector(btn) == null) return false;
    var modalBtn = document.querySelector(btn);
    var modalContainer = document.querySelector(modal);

    if (navigator.userAgent.match(/iPhone/i) || navigator.userAgent.match(/iPod/i)) {
      modalBtn.addEventListener("touchstart", function () {
        document.body.classList.add("modal-active");
        modalContainer.classList.remove("out");
        modalContainer.classList.add("opened");
      });
    } else {
      modalBtn.addEventListener("click", function () {
        document.body.classList.add("modal-active");
        modalContainer.classList.remove("out");
        modalContainer.classList.add("opened");
      });
    }

    document.addEventListener("click", function (e) {
      if (e.target.classList.contains("modal-container") || e.target.classList.contains("modal-close")) {
        document.body.classList.remove("modal-active");
        modalContainer.classList.remove("opened");
        modalContainer.classList.add("out");
      }
    });
    document.addEventListener("keydown", function (e) {
      if (e.keyCode == 27) {
        document.body.classList.remove("modal-active");
        modalContainer.classList.remove("opened");
        modalContainer.classList.add("out");
      }
    });
  };

  openModal(".js-product-compare", ".js-modal-product-compare");
  openModal(".js-product-compare-mobile", ".js-modal-product-compare");
  openModal(".js-add-review", ".js-modal-add-review");
  openModal(".js-add-question", ".js-modal-add-question");

  var seeMore = function seeMore(number, elements, button) {
    if (document.querySelector(button) == null) {
      return false;
    }

    window.addEventListener("load", function () {
      return showHideBlocks(number, elements, button);
    });
    window.addEventListener("resize", function () {
      return showHideBlocks(number, elements, button);
    });
    document.querySelector(button).addEventListener("click", function () {
      if (this.textContent == "See more") {
        this.textContent = "See less";
        this.classList.add("active");
      } else {
        this.textContent = "See more";
        this.classList.remove("active");
      }

      document.querySelectorAll(elements).forEach(function (elem, index) {
        if (elem.style.display == "none") {
          elem.style.display = null;
        } else {
          if (index > number) {
            elem.style.display = 'none';
          }
        }
      });
    });

    function showHideBlocks(number, elements, button) {
      var elems = document.querySelectorAll(elements);
      var btnShowHide = document.querySelector(button);

      if (window.screen.width <= 800 && elems.length > number) {
        elems.forEach(function (elem, index) {
          if (index > number) {
            elem.style.display = 'none';
            btnShowHide.style.display = null;
          }
        });
      } else {
        elems.forEach(function (elem, index) {
          elem.style.display = null;
          btnShowHide.style.display = 'none';
        });
      }
    }
  };

  seeMore(3, '.product-compare-top__item', '.js-see-more-products');
  seeMore(1, '.help-center__item', '.js-see-more-help');

  var showItems = function showItems(numberDesktop, numberMobile, items, button) {
    if (document.querySelectorAll(items).length == 0) return false;
    var btn = document.querySelector(button);
    window.addEventListener("load", showHideItems);
    window.addEventListener("resize", showHideItems);

    function showHideItems() {
      var els = document.querySelectorAll(items);
      var btn = document.querySelector(button);

      if (window.screen.width > 577) {
        if (els.length > numberDesktop) {
          btn.style.display = null;
          els.forEach(function (el, i) {
            if (i > numberDesktop - 1) {
              el.style.display = "none";
            } else {
              el.style.display = null;
            }
          });
        } else {
          btn.style.display = "none";
        }
      } else {
        if (els.length > numberMobile) {
          btn.style.display = null;
          els.forEach(function (el, i) {
            if (i > numberMobile - 1) {
              el.style.display = "none";
            } else {
              el.style.display = null;
            }
          });
        } else {
          btn.style.display = "none";
        }
      }
    }

    btn.addEventListener("click", function () {
      var elems = document.querySelectorAll(items);

      if (this.textContent == "See more") {
        this.textContent = "See less";
        this.classList.add("active");
      } else {
        this.textContent = "See more";
        this.classList.remove("active");
      }

      elems.forEach(function (elem, index) {
        if (elem.style.display == "none") {
          elem.style.display = null;
        } else {
          if (window.screen.width > 577 && index > numberDesktop - 1 || window.screen.width < 577 && index > numberMobile - 1) {
            elem.style.display = 'none';
          }
        }
      });
    });
  };

  showItems(8, 4, ".brands-list__item", ".js-see-more-brands");
  showItems(3, 2, ".seo-block", ".js-see-more-seo");
  showItems(3, 2, ".js-related-item", ".js-see-posts");

  var showFooterLinks = function showFooterLinks() {
    var footerTitle = document.querySelectorAll('.footer__title');
    var footerLinks = document.querySelectorAll('.footer__links'); // window.addEventListener('load', () => showHideLinks);

    window.addEventListener('resize', function () {
      if (window.screen.width <= 576) {
        footerLinks.forEach(function (footerLink) {
          footerLink.style.maxHeight = 0;
        });
      } else {
        footerLinks.forEach(function (footerLink) {
          footerLink.style.maxHeight = null;
        });
      }
    });
    footerTitle.forEach(function (title) {
      title.addEventListener('click', function () {
        var footerLinks = this.nextElementSibling;

        if (getComputedStyle(footerLinks).maxHeight == '0px') {
          this.classList.add('active');
          footerLinks.style.maxHeight = footerLinks.scrollHeight + "px";
          footerLinks.style.opacity = 1;
        } else {
          this.classList.remove('active');
          footerLinks.style.maxHeight = null;
          footerLinks.style.opacity = null;
        }
      });
    });
  };

  showFooterLinks();

  var showSidebarItems = function showSidebarItems() {
    if (document.querySelectorAll(".js-sidebar-see-more").length == 0) return false;
    var sidebarSeeMore = document.querySelectorAll(".js-sidebar-see-more");
    sidebarSeeMore.forEach(function (el) {
      var sidebarItems = el.previousElementSibling.children;

      if (sidebarItems.length > 3) {
        for (var i = 0, len = sidebarItems.length; i < len; i++) {
          if (i > 2) {
            sidebarItems[i].style.display = "none";
          }
        }

        el.addEventListener("click", function () {
          for (var _i = 0, _len = sidebarItems.length; _i < _len; _i++) {
            if (_i > 2) {
              if (sidebarItems[_i].style.display == "none") {
                sidebarItems[_i].style.display = null;
                el.textContent = "See less";
                el.classList.add("active");
              } else {
                sidebarItems[_i].style.display = "none";
                el.textContent = "See more";
                el.classList.remove("active");
              }
            }
          }
        });
      } else {
        el.style.display = "none";
      }
    });
  };

  showSidebarItems();

  var setPercent = function setPercent() {
    var circularProgress = document.querySelectorAll(".js-circular-progress");
    circularProgress.forEach(function (item) {
      var circle = item.querySelector('.circular-progress__percent');
      var text = item.querySelector('.circular-info__number');
      var dataPercent = item.getAttribute('data-percent');
      var percent = (100 - dataPercent) / 100;
      circle.style.strokeDashoffset = "calc(2*30*3.14*".concat(percent, ")");
      text.textContent = dataPercent;
    });
  };

  setPercent();
  document.addEventListener("blur", function (e) {
    if (e.target.classList.contains('contact-form__field') || e.target.classList.contains('contact-form__message')) {
      if (e.target.value.trim() != '') {
        e.target.nextElementSibling.classList.add('active');
      } else {
        e.target.nextElementSibling.classList.remove('active');
      }
    }
  }, true);

  var priceSlider = function priceSlider() {
    var rangeInputs = document.querySelectorAll(".price-range__input"),
        priceInputs = document.querySelectorAll(".price-input__field"),
        progress = document.querySelector(".price-slider__progress");
    var priceGap = 500;
    priceInputs.forEach(function (priceInput) {
      priceInput.addEventListener("input", function (e) {
        var minVal = parseInt(priceInputs[0].value),
            maxVal = parseInt(priceInputs[1].value);

        if (maxVal - minVal >= priceGap && maxVal <= 50000) {
          if (e.target.classList.contains("price-min")) {
            rangeInputs[0].value = minVal;
            progress.style.left = minVal / rangeInputs[0].max * 100 + "%";
          } else {
            rangeInputs[1].value = maxVal;
            progress.style.right = 100 - maxVal / rangeInputs[1].max * 100 + "%";
          }
        }
      });
    });
    rangeInputs.forEach(function (rangeInput) {
      rangeInput.addEventListener("input", function (e) {
        var minVal = parseInt(rangeInputs[0].value),
            maxVal = parseInt(rangeInputs[1].value);

        if (maxVal - minVal < priceGap) {
          if (e.target.classList.contains("range-min")) {
            rangeInputs[0].value = maxVal - priceGap;
          } else {
            rangeInputs[1].value = minVal + priceGap;
          }
        } else {
          priceInputs[0].value = minVal;
          priceInputs[1].value = maxVal;
          progress.style.left = minVal / rangeInputs[0].max * 100 + "%";
          progress.style.right = 100 - maxVal / rangeInputs[1].max * 100 + "%";
        }
      });
    });

    function addSpaces(value) {
      value = value.replace(/ /g, '');
      return value.replace(/\B(?=(\d{3})+(?!\d))/g, " ");
    }
  };

  priceSlider();

  var viewAll = function viewAll() {
    if (document.querySelectorAll(".filter-view-all").length == 0) return false;
    var filterList = document.querySelectorAll(".filter-list");
    var viewAll = document.querySelectorAll(".filter-view-all");
    filterList.forEach(function (list) {
      if (list.children.length > 5) {
        var items = list.children;
        var _viewAll = list.nextElementSibling;

        for (var i = 0, len = items.length; i < len; i++) {
          if (i >= 5) {
            items[i].style.display = "none";
          }
        }

        _viewAll.style.display = "block";
      }
    });
    viewAll.forEach(function (el) {
      el.addEventListener("click", function () {
        var filterItems = this.previousElementSibling.children;
        var filterContent = this.closest(".filter-content");

        for (var i = 0, len = filterItems.length; i < len; i++) {
          if (i >= 5) {
            if (filterItems[i].style.display) {
              filterItems[i].style.display = null;
              this.textContent = "Hide";
            } else {
              filterItems[i].style.display = "none";
              this.textContent = "View all";
            }
          }
        }

        filterContent.style.maxHeight = filterContent.scrollHeight + "px";
      });
    });
  };

  viewAll();

  var inputValue = function inputValue() {
    var inputField = document.querySelector(".product-compare-form__field");
    var addValueBtns = document.querySelectorAll(".js-compare");
    addValueBtns.forEach(function (addValueBtn) {
      addValueBtn.addEventListener("click", function () {
        var val = this.previousElementSibling.textContent;
        inputField.value = val;
      });
    });
  };

  inputValue();

  (function () {
    'use strict';

    var Greedy = function Greedy(options) {
      this.element = document.querySelector(options.element);
      this.visibleLinks = this.element.querySelector('ul');
      this.toggleButton = this.element.querySelector('.toggle-links');
      this.breakpoints = [];
      this.init();
    };

    window.Greedy = Greedy;

    Greedy.prototype.init = function () {
      this.setupMenu();
      this.calculateBreakpoints();
      this.updateMenu();
      this.addBindings();
    };
    /*
      Creates/returns a method bounded with 'this'. Used for creating
      named event listeners that can easily be removed
    */


    Greedy.prototype.bindMethod = function (name) {
      return this['_' + name + '_'] || Object.defineProperty(this, '_' + name + '_', {
        value: this[name].bind(this)
      })['_' + name + '_'];
    };
    /*
      Creates the necessary markup and adds the necessary classes
    */


    Greedy.prototype.setupMenu = function () {
      this.hiddenLinks = document.createElement('ul');
      this.hiddenLinks.classList.add('hidden-links');
      this.hiddenLinks.classList.add('links-invisible');
      this.element.appendChild(this.hiddenLinks);
      this.visibleLinks.classList.add('visible-links');
    };
    /*
      For each navigation item, calculate how much space is needed
      to accomodate it
    */


    Greedy.prototype.calculateBreakpoints = function () {
      var childrenWidth = 0;

      for (var i = 0; i < this.visibleLinks.children.length; i++) {
        childrenWidth += this.visibleLinks.children[i].offsetWidth;
        this.breakpoints[i] = childrenWidth;
      }
    };

    Greedy.prototype.addBindings = function () {
      window.addEventListener('resize', this.bindMethod('updateMenu'));
      this.toggleButton.addEventListener('click', this.bindMethod('toggleHiddenLinks'));
    };

    Greedy.prototype.updateMenu = function () {
      var availableSpace = this.element.offsetWidth - this.toggleButton.offsetWidth;
      var itemsVisible = this.visibleLinks.children.length;
      var requiredSpace = this.breakpoints[itemsVisible - 1];
      /*
        Check if there is not enough space for the visible links or
        if there is space available for the hidden link
      */

      if (availableSpace < this.breakpoints[itemsVisible - 1]) {
        this.toggleButton.classList.add('visible');

        while (availableSpace < this.breakpoints[itemsVisible - 1]) {
          this.hiddenLinks.insertBefore(this.visibleLinks.children[itemsVisible - 1], this.hiddenLinks.firstChild);
          itemsVisible--;
        }
      } else if (availableSpace > this.breakpoints[itemsVisible]) {
        while (availableSpace > this.breakpoints[itemsVisible]) {
          this.visibleLinks.appendChild(this.hiddenLinks.removeChild(this.hiddenLinks.firstChild));
          itemsVisible++;
        }
      }
    };

    Greedy.prototype.toggleHiddenLinks = function () {
      this.hiddenLinks.classList.toggle('links-invisible');
      this.toggleButton.classList.toggle('links-displayed');
    };
  })(); // Initialise menu


  document.addEventListener('DOMContentLoaded', function (event) {
    var menu = new Greedy({
      element: '.greedy-menu',
      counter: true
    });
  });
  $(".js-product-slider-preview").slick({
    slidesToShow: 4,
    vertical: true,
    verticalSwiping: true,
    slidesToScroll: 1,
    focusOnSelect: true,
    prevArrow: ".product-slider-preview__btn--prev",
    nextArrow: ".product-slider-preview__btn--next",
    variableWidth: true,
    asNavFor: ".product-slider-main"
  });
  $(".product-slider-main").slick({
    slidesToShow: 1,
    slidesToScroll: 1,
    arrows: false,
    fade: true,
    asNavFor: ".js-product-slider-preview"
  });
  $(".js-product-compare-slider").slick({
    slidesToShow: 1,
    slidesToScroll: 1,
    prevArrow: ".product-compare-slider__btn--prev",
    nextArrow: ".product-compare-slider__btn--next" // variableWidth: true,

  });
  $(".js-related-products-slider").slick({
    slidesToShow: 3,
    slidesToScroll: 1,
    prevArrow: ".js-related-prev",
    nextArrow: ".js-related-next",
    responsive: [{
      breakpoint: 768,
      settings: {
        slidesToShow: 2
      }
    }, {
      breakpoint: 576,
      settings: {
        slidesToShow: 1
      }
    }]
  });
  $(".js-resently-viewed-slider").slick({
    slidesToShow: 4,
    slidesToScroll: 1,
    prevArrow: ".js-resently-viewed-prev",
    nextArrow: ".js-resently-viewed-next",
    responsive: [{
      breakpoint: 993,
      settings: {
        slidesToShow: 3
      }
    }, {
      breakpoint: 769,
      settings: {
        slidesToShow: 2
      }
    }, {
      breakpoint: 577,
      settings: {
        slidesToShow: 1
      }
    }]
  });
  $('body').on('keyup', '.js-search-matches', function () {
    var self = $(this);
    var list = $('.' + self.data('list'));
    $.ajax({
      url: self.data('url') + '?q=' + self.val(),
      type: 'GET',
      dataType: 'json',
      success: function success(response) {
        list.empty();

        if (response.items.length) {
          $.each(response.items, function (i, item) {
            list.append("<a class=\"search-form-matches__link\" href=\"".concat(item.url, "\">").concat(item.title, "</a>"));
          });
        }
      }
    });
  });
})();
//# sourceMappingURL=data:application/json;charset=utf8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIm1haW4uanMiXSwibmFtZXMiOlsiY3JvcFRleHQiLCJoaWRlQmxvY2siLCJyZWFkTW9yZSIsImRvY3VtZW50IiwicXVlcnlTZWxlY3RvckFsbCIsImZvckVhY2giLCJlbCIsImFkZEV2ZW50TGlzdGVuZXIiLCJlbFRleHQiLCJpbm5lclRleHQiLCJoaWRkZW5UZXh0IiwicHJldmlvdXNFbGVtZW50U2libGluZyIsImNsYXNzTGlzdCIsInRvZ2dsZSIsIm1heCIsInRleHQiLCJzdHIiLCJ0cmltIiwibGVuZ3RoIiwic3ViU3RyIiwic3Vic3RyaW5nIiwiaGlkZGVuU3RyIiwiaW5uZXJIVE1MIiwic2hvd1JldmlldyIsImltYWdlcyIsIm5leHRFbGVtZW50U2libGluZyIsInByb2R1Y3RSZXZpZXciLCJwcm9kdWN0VGV4dCIsInF1ZXJ5U2VsZWN0b3IiLCJjcmVhdGVFbGVtZW50IiwiYWRkIiwidGV4dENvbnRlbnQiLCJhZnRlciIsImJlZm9yZSIsImFjY29yZGlvbiIsImUiLCJ0YXJnZXQiLCJjb250YWlucyIsImNsb3Nlc3QiLCJhY2NvcmRpb25Db250ZW50Iiwic3R5bGUiLCJtYXhIZWlnaHQiLCJnZXRDb21wdXRlZFN0eWxlIiwicGFyZW50RWxlbWVudCIsInJlbW92ZSIsInNjcm9sbEhlaWdodCIsInNpZGViYXJMaW5rcyIsImVsZW0iLCJuYXZiYXJMaW5rQ2xpY2siLCJldmVudCIsInNtb290aFNjcm9sbCIsInByZXZlbnREZWZhdWx0IiwidGFyZ2V0SWQiLCJjdXJyZW50VGFyZ2V0IiwiZ2V0QXR0cmlidXRlIiwid2luZG93Iiwic2NyZWVuIiwid2lkdGgiLCJzY3JvbGxUbyIsInRvcCIsIm9mZnNldFRvcCIsImJlaGF2aW9yIiwidG9nZ2xlRml4ZWQiLCJ0aHJvdHRsZSIsInRyYWNrU2Nyb2xsIiwiZWxlbWVudHMiLCJzdGlja3lCbG9ja3MiLCJwYWdlWU9mZnNldCIsInN0aWNreUJsb2NrQ29vcmRzIiwiZ2V0Qm91bmRpbmdDbGllbnRSZWN0IiwiYm90dG9tIiwidHlwZSIsIm5hbWUiLCJvYmoiLCJydW5uaW5nIiwiZnVuYyIsInJlcXVlc3RBbmltYXRpb25GcmFtZSIsImRpc3BhdGNoRXZlbnQiLCJDdXN0b21FdmVudCIsImVsZW1lbnQiLCJmaXhlZFdpZHRoIiwiY2xpZW50V2lkdGgiLCJzaG93SGlkZVNpZGViYXJGaWx0ZXJzIiwic2hvd0hpZGVGaWx0ZXJzIiwic2lkZWJhckZpbHRlcnMiLCJmaWx0ZXIiLCJzaG93TW9iaWxlTWVudSIsInRyaWdnZXIiLCJtb2JpbGVOYXYiLCJpc0Nsb3NlZCIsImJ1cmdlclRpbWUiLCJvcGVuU2VhcmNoRm9ybSIsInNlYXJjaEJ0biIsInZhbHVlIiwicHJvZHVjdFJldmlld1N0YXJzIiwiZGF0YVJhdGluZyIsInN0YXJzIiwiY2hpbGRyZW4iLCJpIiwiY2hvb3NlUmF0aW5nIiwicmF0aW5nIiwicmF0ZSIsInJhdGluZ1N0YXJzIiwicmVtb3ZlQ2xhc3MiLCJtb3VzZU92ZXJBY3RpdmVDbGFzcyIsImFkZENsYXNzIiwibW91c2VPdXRBY3RpdmVDbGFzcyIsImFyciIsImlMZW5nIiwiaiIsImFyZ3VtZW50cyIsImlMZW4iLCJjYXJldERyb3Bkb3duIiwiZmlyc3RFbGVtZW50Q2hpbGQiLCJkcm9wZG93biIsIm9wYWNpdHkiLCJiYXNpY1Njcm9sbFRvcCIsImJ0blRvcCIsImJ0blJldmVhbCIsInNjcm9sbFkiLCJUb3BzY3JvbGxUbyIsInNldFRpbWVvdXQiLCJvcGVuTW9kYWwiLCJidG4iLCJtb2RhbCIsIm1vZGFsQnRuIiwibW9kYWxDb250YWluZXIiLCJuYXZpZ2F0b3IiLCJ1c2VyQWdlbnQiLCJtYXRjaCIsImJvZHkiLCJrZXlDb2RlIiwic2VlTW9yZSIsIm51bWJlciIsImJ1dHRvbiIsInNob3dIaWRlQmxvY2tzIiwiaW5kZXgiLCJkaXNwbGF5IiwiZWxlbXMiLCJidG5TaG93SGlkZSIsInNob3dJdGVtcyIsIm51bWJlckRlc2t0b3AiLCJudW1iZXJNb2JpbGUiLCJpdGVtcyIsInNob3dIaWRlSXRlbXMiLCJlbHMiLCJzaG93Rm9vdGVyTGlua3MiLCJmb290ZXJUaXRsZSIsImZvb3RlckxpbmtzIiwiZm9vdGVyTGluayIsInRpdGxlIiwic2hvd1NpZGViYXJJdGVtcyIsInNpZGViYXJTZWVNb3JlIiwic2lkZWJhckl0ZW1zIiwibGVuIiwic2V0UGVyY2VudCIsImNpcmN1bGFyUHJvZ3Jlc3MiLCJpdGVtIiwiY2lyY2xlIiwiZGF0YVBlcmNlbnQiLCJwZXJjZW50Iiwic3Ryb2tlRGFzaG9mZnNldCIsInByaWNlU2xpZGVyIiwicmFuZ2VJbnB1dHMiLCJwcmljZUlucHV0cyIsInByb2dyZXNzIiwicHJpY2VHYXAiLCJwcmljZUlucHV0IiwibWluVmFsIiwicGFyc2VJbnQiLCJtYXhWYWwiLCJsZWZ0IiwicmlnaHQiLCJyYW5nZUlucHV0IiwiYWRkU3BhY2VzIiwicmVwbGFjZSIsInZpZXdBbGwiLCJmaWx0ZXJMaXN0IiwibGlzdCIsImZpbHRlckl0ZW1zIiwiZmlsdGVyQ29udGVudCIsImlucHV0VmFsdWUiLCJpbnB1dEZpZWxkIiwiYWRkVmFsdWVCdG5zIiwiYWRkVmFsdWVCdG4iLCJ2YWwiLCJHcmVlZHkiLCJvcHRpb25zIiwidmlzaWJsZUxpbmtzIiwidG9nZ2xlQnV0dG9uIiwiYnJlYWtwb2ludHMiLCJpbml0IiwicHJvdG90eXBlIiwic2V0dXBNZW51IiwiY2FsY3VsYXRlQnJlYWtwb2ludHMiLCJ1cGRhdGVNZW51IiwiYWRkQmluZGluZ3MiLCJiaW5kTWV0aG9kIiwiT2JqZWN0IiwiZGVmaW5lUHJvcGVydHkiLCJiaW5kIiwiaGlkZGVuTGlua3MiLCJhcHBlbmRDaGlsZCIsImNoaWxkcmVuV2lkdGgiLCJvZmZzZXRXaWR0aCIsImF2YWlsYWJsZVNwYWNlIiwiaXRlbXNWaXNpYmxlIiwicmVxdWlyZWRTcGFjZSIsImluc2VydEJlZm9yZSIsImZpcnN0Q2hpbGQiLCJyZW1vdmVDaGlsZCIsInRvZ2dsZUhpZGRlbkxpbmtzIiwibWVudSIsImNvdW50ZXIiLCIkIiwic2xpY2siLCJzbGlkZXNUb1Nob3ciLCJ2ZXJ0aWNhbCIsInZlcnRpY2FsU3dpcGluZyIsInNsaWRlc1RvU2Nyb2xsIiwiZm9jdXNPblNlbGVjdCIsInByZXZBcnJvdyIsIm5leHRBcnJvdyIsInZhcmlhYmxlV2lkdGgiLCJhc05hdkZvciIsImFycm93cyIsImZhZGUiLCJyZXNwb25zaXZlIiwiYnJlYWtwb2ludCIsInNldHRpbmdzIiwib24iLCJzZWxmIiwiZGF0YSIsImFqYXgiLCJ1cmwiLCJkYXRhVHlwZSIsInN1Y2Nlc3MiLCJyZXNwb25zZSIsImVtcHR5IiwiZWFjaCIsImFwcGVuZCJdLCJtYXBwaW5ncyI6Ijs7QUFBQTs7QUFDQSxDQUFDLFlBQVk7QUFDVEEsRUFBQUEsUUFBUTtBQUNSQyxFQUFBQSxTQUFTO0FBRVQsTUFBSUMsUUFBUSxHQUFHQyxRQUFRLENBQUNDLGdCQUFULENBQTBCLGVBQTFCLENBQWY7QUFFQUYsRUFBQUEsUUFBUSxDQUFDRyxPQUFULENBQWlCLFVBQUFDLEVBQUUsRUFBSTtBQUNuQkEsSUFBQUEsRUFBRSxDQUFDQyxnQkFBSCxDQUFvQixPQUFwQixFQUE2QixZQUFNO0FBQy9CLFVBQUlDLE1BQU0sR0FBR0YsRUFBRSxDQUFDRyxTQUFoQjtBQUNBLFVBQUlDLFVBQVUsR0FBR0osRUFBRSxDQUFDSyxzQkFBcEI7QUFFQUwsTUFBQUEsRUFBRSxDQUFDRyxTQUFILEdBQWVELE1BQU0sSUFBSSxhQUFWLEdBQTBCLE1BQTFCLEdBQW1DLGFBQWxEO0FBQ0FFLE1BQUFBLFVBQVUsQ0FBQ0UsU0FBWCxDQUFxQkMsTUFBckIsQ0FBNEIsTUFBNUI7QUFDSCxLQU5EO0FBT0gsR0FSRDs7QUFVQSxXQUFTYixRQUFULEdBQW9CO0FBQ2hCLFFBQUljLEdBQUcsR0FBRyxHQUFWO0FBQ0EsUUFBSUMsSUFBSSxHQUFHWixRQUFRLENBQUNDLGdCQUFULENBQTBCLG9CQUExQixDQUFYO0FBQ0FXLElBQUFBLElBQUksQ0FBQ1YsT0FBTCxDQUFhLFVBQUFDLEVBQUUsRUFBSTtBQUNmLFVBQUlVLEdBQUcsR0FBR1YsRUFBRSxDQUFDRyxT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QUQ3QjtBQUVIbEgsTUFBQUEsSUFBSSxFQUFFLEtBRkg7QUFHSG9LLE1BQUFBLFFBQVEsRUFBRSxNQUhQO0FBSUhDLE1BQUFBLE9BQU8sRUFBRSxpQkFBVUMsUUFBVixFQUFvQjtBQUN6QjNELFFBQUFBLElBQUksQ0FBQzRELEtBQUw7O0FBRUEsWUFBSUQsUUFBUSxDQUFDOUYsS0FBVCxDQUFlN0gsTUFBbkIsRUFBMkI7QUFDdkJvTSxVQUFBQSxDQUFDLENBQUN5QixJQUFGLENBQU9GLFFBQVEsQ0FBQzlGLEtBQWhCLEVBQXVCLFVBQVU3QyxDQUFWLEVBQWEyRCxJQUFiLEVBQW1CO0FBQ3RDcUIsWUFBQUEsSUFBSSxDQUFDOEQsTUFBTCx5REFBMERuRixJQUFJLENBQUM2RSxHQUEvRCxnQkFBdUU3RSxJQUFJLENBQUNQLEtBQTVFO0FBQ0gsV0FGRDtBQUdIO0FBQ0o7QUFaRSxLQUFQO0FBY0gsR0FqQkQ7QUFrQkgsQ0FuNEJEIiwic291cmNlc0NvbnRlbnQiOlsiO1xyXG4oZnVuY3Rpb24gKCkge1xyXG4gICAgY3JvcFRleHQoKTtcclxuICAgIGhpZGVCbG9jaygpO1xyXG5cclxuICAgIGxldCByZWFkTW9yZSA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3JBbGwoJy5qcy1yZWFkLW1vcmUnKTtcclxuXHJcbiAgICByZWFkTW9yZS5mb3JFYWNoKGVsID0+IHtcclxuICAgICAgICBlbC5hZGRFdmVudExpc3RlbmVyKCdjbGljaycsICgpID0+IHtcclxuICAgICAgICAgICAgbGV0IGVsVGV4dCA9IGVsLmlubmVyVGV4dDtcclxuICAgICAgICAgICAgbGV0IGhpZGRlblRleHQgPSBlbC5wcmV2aW91c0VsZW1lbnRTaWJsaW5nO1xyXG5cclxuICAgICAgICAgICAgZWwuaW5uZXJUZXh0ID0gZWxUZXh0ID09ICdyZWFkIG1vcmUgPicgPyAnaGlkZScgOiAncmVhZCBtb3JlID4nO1xyXG4gICAgICAgICAgICBoaWRkZW5UZXh0LmNsYXNzTGlzdC50b2dnbGUoJ3Nob3cnKTtcclxuICAgICAgICB9KTtcclxuICAgIH0pO1xyXG5cclxuICAgIGZ1bmN0aW9uIGNyb3BUZXh0KCkge1xyXG4gICAgICAgIGxldCBtYXggPSAxODA7XHJcbiAgICAgICAgbGV0IHRleHQgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yQWxsKCcuanMtcmVhZC1tb3JlLXRleHQnKTtcclxuICAgICAgICB0ZXh0LmZvckVhY2goZWwgPT4ge1xyXG4gICAgICAgICAgICBsZXQgc3RyID0gZWwuaW5uZXJUZXh0LnRyaW0oKTtcclxuICAgICAgICAgICAgaWYgKHN0ci5sZW5ndGggPiBtYXgpIHtcclxuICAgICAgICAgICAgICAgIGxldCBzdWJTdHIgPSBzdHIuc3Vic3RyaW5nKDAsIG1heCk7XHJcbiAgICAgICAgICAgICAgICBsZXQgaGlkZGVuU3RyID0gc3RyLnN1YnN0cmluZyhtYXgsIHN0ci5sZW5ndGgpO1xyXG4gICAgICAgICAgICAgICAgZWwuaW5uZXJUZXh0ID0gc3ViU3RyO1xyXG4gICAgICAgICAgICAgICAgZWwuaW5uZXJIVE1MICs9IGA8c3BhbiBjbGFzcz1cImhpZGRlbi10ZXh0IGpzLWhpZGRlbi10ZXh0XCI+JHtoaWRkZW5TdHJ9PC9zcGFuPmA7XHJcbiAgICAgICAgICAgICAgICBlbC5pbm5lckhUTUwgKz0gJzxzcGFuIGNsYXNzPVwicmVhZC1tb3JlIGpzLXJlYWQtbW9yZVwiPnJlYWQgbW9yZSA+PC9zcGFuPic7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9KTtcclxuICAgIH1cclxuXHJcbiAgICBsZXQgc2hvd1JldmlldyA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3JBbGwoJy5qcy1zaG93LXJldmlldycpO1xyXG5cclxuICAgIHNob3dSZXZpZXcuZm9yRWFjaChlbCA9PiB7XHJcbiAgICAgICAgZWwuYWRkRXZlbnRMaXN0ZW5lcignY2xpY2snLCAoKSA9PiB7XHJcbiAgICAgICAgICAgIGxldCBlbFRleHQgPSBlbC5pbm5lclRleHQ7XHJcbiAgICAgICAgICAgIGxldCBoaWRkZW5UZXh0ID0gZWwucHJldmlvdXNFbGVtZW50U2libGluZztcclxuICAgICAgICAgICAgbGV0IGltYWdlcyA9IGVsLm5leHRFbGVtZW50U2libGluZztcclxuXHJcbiAgICAgICAgICAgIGVsLmlubmVyVGV4dCA9IGVsVGV4dCA9PSAncmVhZCBtb3JlID4nID8gJzwgaGlkZScgOiAncmVhZCBtb3JlID4nO1xyXG4gICAgICAgICAgICBoaWRkZW5UZXh0LmNsYXNzTGlzdC50b2dnbGUoJ3Nob3cnKTtcclxuICAgICAgICAgICAgaW1hZ2VzLmNsYXNzTGlzdC50b2dnbGUoXCJzaG93XCIpO1xyXG4gICAgICAgIH0pO1xyXG4gICAgfSk7XHJcblxyXG4gICAgZnVuY3Rpb24gaGlkZUJsb2NrKCkge1xyXG4gICAgICAgIGxldCBtYXggPSAxMjg7XHJcbiAgICAgICAgbGV0IHByb2R1Y3RSZXZpZXcgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yQWxsKCcuanMtaGlkZS1yZXZpZXcnKTtcclxuICAgICAgICBwcm9kdWN0UmV2aWV3LmZvckVhY2goZWwgPT4ge1xyXG4gICAgICAgICAgICBsZXQgcHJvZHVjdFRleHQgPSBlbC5xdWVyeVNlbGVjdG9yKFwiLnBhZ2UtdGV4dFwiKTtcclxuICAgICAgICAgICAgbGV0IHN0ciA9IHByb2R1Y3RUZXh0LmlubmVyVGV4dC50cmltKCk7XHJcbiAgICAgICAgICAgIGxldCBpbWFnZXMgPSBlbC5xdWVyeVNlbGVjdG9yKCcucHJvZHVjdC1yZXZpZXdfX2ltYWdlcycpO1xyXG4gICAgICAgICAgICBpZiAoc3RyLmxlbmd0aCA+IG1heCkge1xyXG4gICAgICAgICAgICAgICAgbGV0IHN1YlN0ciA9IHN0ci5zdWJzdHJpbmcoMCwgbWF4KTtcclxuICAgICAgICAgICAgICAgIGxldCBoaWRkZW5TdHIgPSBzdHIuc3Vic3RyaW5nKG1heCwgc3RyLmxlbmd0aCk7XHJcbiAgICAgICAgICAgICAgICBwcm9kdWN0VGV4dC5pbm5lclRleHQgPSBzdWJTdHI7XHJcblxyXG4gICAgICAgICAgICAgICAgbGV0IGhpZGRlblRleHQgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdzcGFuJyk7XHJcbiAgICAgICAgICAgICAgICBoaWRkZW5UZXh0LmNsYXNzTGlzdC5hZGQoJ2hpZGRlbi10ZXh0JywgJ3BhZ2UtdGV4dCcsICdqcy1oaWRkZW4tdGV4dCcpO1xyXG4gICAgICAgICAgICAgICAgaGlkZGVuVGV4dC50ZXh0Q29udGVudCA9IGhpZGRlblN0cjtcclxuXHJcbiAgICAgICAgICAgICAgICBwcm9kdWN0VGV4dC5hZnRlcihoaWRkZW5UZXh0KTtcclxuXHJcbiAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgIGxldCByZWFkTW9yZSA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ3NwYW4nKTtcclxuICAgICAgICAgICAgcmVhZE1vcmUuY2xhc3NMaXN0LmFkZCgncmVhZC1tb3JlJywgJ2pzLXNob3ctcmV2aWV3Jyk7XHJcbiAgICAgICAgICAgIHJlYWRNb3JlLnRleHRDb250ZW50ID0gJ3JlYWQgbW9yZSA+JztcclxuXHJcbiAgICAgICAgICAgIGltYWdlcy5iZWZvcmUocmVhZE1vcmUpO1xyXG4gICAgICAgIH0pO1xyXG4gICAgfVxyXG5cclxuICAgIGNvbnN0IGFjY29yZGlvbiA9ICgpID0+IHtcclxuICAgICAgICBkb2N1bWVudC5hZGRFdmVudExpc3RlbmVyKCdjbGljaycsIGUgPT4ge1xyXG4gICAgICAgICAgICBpZiAoZS50YXJnZXQuY2xhc3NMaXN0LmNvbnRhaW5zKCdqcy1hY2NvcmRpb24nKSB8fCBlLnRhcmdldC5jbG9zZXN0KCcuanMtYWNjb3JkaW9uJykpIHtcclxuICAgICAgICAgICAgICAgIGNvbnN0IGFjY29yZGlvbiA9IGUudGFyZ2V0LmNsYXNzTGlzdC5jb250YWlucygnanMtYWNjb3JkaW9uJykgPyBlLnRhcmdldCA6IGUudGFyZ2V0LmNsb3Nlc3QoJy5qcy1hY2NvcmRpb24nKTtcclxuICAgICAgICAgICAgICAgIGNvbnN0IGFjY29yZGlvbkNvbnRlbnQgPSBhY2NvcmRpb24ubmV4dEVsZW1lbnRTaWJsaW5nO1xyXG4gICAgICAgICAgICAgICAgaWYgKGFjY29yZGlvbkNvbnRlbnQuc3R5bGUubWF4SGVpZ2h0IHx8IGdldENvbXB1dGVkU3R5bGUoYWNjb3JkaW9uQ29udGVudCkubWF4SGVpZ2h0ID09IFwibWF4LWNvbnRlbnRcIikge1xyXG4gICAgICAgICAgICAgICAgICAgIGFjY29yZGlvbi5wYXJlbnRFbGVtZW50LmNsYXNzTGlzdC5yZW1vdmUoXCJhY3RpdmVcIik7XHJcbiAgICAgICAgICAgICAgICAgICAgYWNjb3JkaW9uQ29udGVudC5zdHlsZS5tYXhIZWlnaHQgPSBudWxsO1xyXG4gICAgICAgICAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgICAgICAgICBhY2NvcmRpb24ucGFyZW50RWxlbWVudC5jbGFzc0xpc3QuYWRkKFwiYWN0aXZlXCIpO1xyXG4gICAgICAgICAgICAgICAgICAgIGFjY29yZGlvbkNvbnRlbnQuc3R5bGUubWF4SGVpZ2h0ID0gYWNjb3JkaW9uQ29udGVudC5zY3JvbGxIZWlnaHQgKyBcInB4XCI7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9KTtcclxuICAgIH1cclxuICAgIGFjY29yZGlvbigpO1xyXG5cclxuICAgIGNvbnN0IHNpZGViYXJMaW5rcyA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3JBbGwoXCIuc2lkZWJhci1tZW51X19saW5rXCIpO1xyXG5cclxuICAgIHNpZGViYXJMaW5rcy5mb3JFYWNoKGVsZW0gPT4gZWxlbS5hZGRFdmVudExpc3RlbmVyKFwiY2xpY2tcIiwgbmF2YmFyTGlua0NsaWNrKSk7XHJcblxyXG4gICAgZnVuY3Rpb24gbmF2YmFyTGlua0NsaWNrKGV2ZW50KSB7XHJcbiAgICAgICAgc21vb3RoU2Nyb2xsKGV2ZW50KTtcclxuICAgIH1cclxuXHJcbiAgICBmdW5jdGlvbiBzbW9vdGhTY3JvbGwoZXZlbnQpIHtcclxuICAgICAgICBldmVudC5wcmV2ZW50RGVmYXVsdCgpO1xyXG4gICAgICAgIGNvbnN0IHRhcmdldElkID0gZXZlbnQuY3VycmVudFRhcmdldC5nZXRBdHRyaWJ1dGUoXCJocmVmXCIpO1xyXG4gICAgICAgIGlmICh3aW5kb3cuc2NyZWVuLndpZHRoID4gMTAyNCkge1xyXG4gICAgICAgICAgICB3aW5kb3cuc2Nyb2xsVG8oe1xyXG4gICAgICAgICAgICAgICAgdG9wOiB0YXJnZXRJZCA9PT0gXCIjXCIgPyAwIDogZG9jdW1lbnQucXVlcnlTZWxlY3Rvcih0YXJnZXRJZCkub2Zmc2V0VG9wIC0gMTAwLFxyXG4gICAgICAgICAgICAgICAgYmVoYXZpb3I6IFwic21vb3RoXCJcclxuICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgd2luZG93LnNjcm9sbFRvKHtcclxuICAgICAgICAgICAgICAgIHRvcDogdGFyZ2V0SWQgPT09IFwiI1wiID8gMCA6IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IodGFyZ2V0SWQpLm9mZnNldFRvcCAtIDIwMCxcclxuICAgICAgICAgICAgICAgIGJlaGF2aW9yOiBcInNtb290aFwiXHJcbiAgICAgICAgICAgIH0pO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxuXHJcbiAgICBpZiAoZG9jdW1lbnQucXVlcnlTZWxlY3RvcignLnByb2R1Y3RzLXN0aWNreScpICE9PSBudWxsKSB7XHJcblxyXG4gICAgICAgIHdpbmRvdy5hZGRFdmVudExpc3RlbmVyKCdvcHRpbWl6ZWRSZXNpemUnLCAoKSA9PiB7XHJcbiAgICAgICAgICAgIHRvZ2dsZUZpeGVkKCcucHJvZHVjdHMtc3RpY2t5Jyk7XHJcbiAgICAgICAgfSk7XHJcblxyXG5cclxuICAgICAgICB0b2dnbGVGaXhlZCgnLnByb2R1Y3RzLXN0aWNreScpO1xyXG5cclxuICAgICAgICB0aHJvdHRsZShcInJlc2l6ZVwiLCBcIm9wdGltaXplZFJlc2l6ZVwiKTtcclxuXHJcbiAgICB9XHJcblxyXG4gICAgaWYgKGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJy5zdGlja3ktYmxvY2snKSAhPT0gbnVsbCkge1xyXG4gICAgICAgIGxldCBzdGlja3lCbG9ja0Nvb3JkcyA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJy5zdGlja3ktYmxvY2snKS5nZXRCb3VuZGluZ0NsaWVudFJlY3QoKS5ib3R0b20gKyB3aW5kb3cucGFnZVlPZmZzZXQ7XHJcblxyXG4gICAgICAgIHdpbmRvdy5hZGRFdmVudExpc3RlbmVyKFwic2Nyb2xsXCIsIGZ1bmN0aW9uICgpIHtcclxuICAgICAgICAgICAgdHJhY2tTY3JvbGwoJy5zdGlja3ktYmxvY2snKTtcclxuICAgICAgICB9KTtcclxuXHJcbiAgICAgICAgZnVuY3Rpb24gdHJhY2tTY3JvbGwoZWxlbWVudHMpIHtcclxuICAgICAgICAgICAgbGV0IHN0aWNreUJsb2NrcyA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3JBbGwoZWxlbWVudHMpO1xyXG4gICAgICAgICAgICBzdGlja3lCbG9ja3MuZm9yRWFjaChlbCA9PiB7XHJcbiAgICAgICAgICAgICAgICBpZiAoZWwuY2xhc3NMaXN0LmNvbnRhaW5zKCdzaG93JykgJiYgd2luZG93LnBhZ2VZT2Zmc2V0IDwgc3RpY2t5QmxvY2tDb29yZHMpIHtcclxuICAgICAgICAgICAgICAgICAgICBlbC5jbGFzc0xpc3QucmVtb3ZlKCdzaG93Jyk7XHJcbiAgICAgICAgICAgICAgICB9IGVsc2UgaWYgKHdpbmRvdy5wYWdlWU9mZnNldCA+IHN0aWNreUJsb2NrQ29vcmRzKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgZWwuY2xhc3NMaXN0LmFkZCgnc2hvdycpO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB9KTtcclxuICAgICAgICB9XHJcbiAgICB9XHJcblxyXG4gICAgZnVuY3Rpb24gdGhyb3R0bGUodHlwZSwgbmFtZSwgb2JqKSB7XHJcbiAgICAgICAgb2JqID0gb2JqIHx8IHdpbmRvdztcclxuICAgICAgICB2YXIgcnVubmluZyA9IGZhbHNlO1xyXG4gICAgICAgIHZhciBmdW5jID0gZnVuY3Rpb24gKCkge1xyXG4gICAgICAgICAgICBpZiAocnVubmluZykge1xyXG4gICAgICAgICAgICAgICAgcmV0dXJuO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIHJ1bm5pbmcgPSB0cnVlO1xyXG4gICAgICAgICAgICByZXF1ZXN0QW5pbWF0aW9uRnJhbWUoZnVuY3Rpb24gKCkge1xyXG4gICAgICAgICAgICAgICAgb2JqLmRpc3BhdGNoRXZlbnQobmV3IEN1c3RvbUV2ZW50KG5hbWUpKTtcclxuICAgICAgICAgICAgICAgIHJ1bm5pbmcgPSBmYWxzZTtcclxuICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgfTtcclxuICAgICAgICBvYmouYWRkRXZlbnRMaXN0ZW5lcih0eXBlLCBmdW5jKTtcclxuICAgIH07XHJcblxyXG4gICAgZnVuY3Rpb24gdG9nZ2xlRml4ZWQoZWwpIHtcclxuICAgICAgICBsZXQgZWxlbWVudCA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoZWwpO1xyXG4gICAgICAgIGxldCBmaXhlZFdpZHRoID0gd2luZG93LnNjcmVlbi53aWR0aCA+IDEwMjQgPyBlbGVtZW50LnBhcmVudEVsZW1lbnQuY2xpZW50V2lkdGggLSAyODUgOiBlbGVtZW50LnBhcmVudEVsZW1lbnQuY2xpZW50V2lkdGg7XHJcbiAgICAgICAgZWxlbWVudC5zdHlsZS53aWR0aCA9IGZpeGVkV2lkdGggKyAncHgnO1xyXG5cclxuICAgIH1cclxuXHJcbiAgICBjb25zdCBzaG93SGlkZVNpZGViYXJGaWx0ZXJzID0gKCkgPT4ge1xyXG4gICAgICAgIGlmIChkb2N1bWVudC5xdWVyeVNlbGVjdG9yQWxsKFwiLmZpbHRlclwiKS5sZW5ndGggPT0gMCkgcmV0dXJuIGZhbHNlO1xyXG5cclxuICAgICAgICB3aW5kb3cuYWRkRXZlbnRMaXN0ZW5lcihcImxvYWRcIiwgc2hvd0hpZGVGaWx0ZXJzKTtcclxuICAgICAgICB3aW5kb3cuYWRkRXZlbnRMaXN0ZW5lcihcInJlc2l6ZVwiLCBzaG93SGlkZUZpbHRlcnMpO1xyXG5cclxuICAgICAgICBmdW5jdGlvbiBzaG93SGlkZUZpbHRlcnMoKSB7XHJcbiAgICAgICAgICAgIGNvbnN0IHNpZGViYXJGaWx0ZXJzID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvckFsbChcIi5maWx0ZXJcIik7XHJcblxyXG4gICAgICAgICAgICBpZiAod2luZG93LnNjcmVlbi53aWR0aCA8PSAxMDI0KSB7XHJcbiAgICAgICAgICAgICAgICBzaWRlYmFyRmlsdGVycy5mb3JFYWNoKGZpbHRlciA9PiB7XHJcbiAgICAgICAgICAgICAgICAgICAgZmlsdGVyLmNsYXNzTGlzdC5yZW1vdmUoXCJhY3RpdmVcIik7XHJcbiAgICAgICAgICAgICAgICB9KTtcclxuICAgICAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgICAgIHNpZGViYXJGaWx0ZXJzLmZvckVhY2goZmlsdGVyID0+IHtcclxuICAgICAgICAgICAgICAgICAgICBmaWx0ZXIuY2xhc3NMaXN0LmFkZChcImFjdGl2ZVwiKTtcclxuICAgICAgICAgICAgICAgIH0pO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG5cclxuICAgIHNob3dIaWRlU2lkZWJhckZpbHRlcnMoKTtcclxuXHJcbiAgICBjb25zdCBzaG93TW9iaWxlTWVudSA9ICgpID0+IHtcclxuICAgICAgICAvLyBoYW1idXJnZXIgb3Blbi9jbG9zZSBhbmltYXRpb25cclxuICAgICAgICBpZiAoZG9jdW1lbnQucXVlcnlTZWxlY3RvcihcIiNoYW1idXJnZXJcIikgPT0gbnVsbCkgcmV0dXJuIGZhbHNlO1xyXG4gICAgICAgIGNvbnN0IHRyaWdnZXIgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKFwiI2hhbWJ1cmdlclwiKTtcclxuICAgICAgICBjb25zdCBtb2JpbGVOYXYgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKFwiI21vYmlsZS1uYXZcIik7XHJcbiAgICAgICAgbGV0IGlzQ2xvc2VkID0gdHJ1ZTtcclxuXHJcbiAgICAgICAgdHJpZ2dlci5hZGRFdmVudExpc3RlbmVyKFwiY2xpY2tcIiwgYnVyZ2VyVGltZSk7XHJcblxyXG4gICAgICAgIGZ1bmN0aW9uIGJ1cmdlclRpbWUoKSB7XHJcbiAgICAgICAgICAgIGlmIChpc0Nsb3NlZCA9PSB0cnVlKSB7XHJcbiAgICAgICAgICAgICAgICB0cmlnZ2VyLmNsYXNzTGlzdC5yZW1vdmUoXCJpcy1vcGVuXCIpO1xyXG4gICAgICAgICAgICAgICAgdHJpZ2dlci5jbGFzc0xpc3QuYWRkKFwiaXMtY2xvc2VkXCIpO1xyXG4gICAgICAgICAgICAgICAgbW9iaWxlTmF2LmNsYXNzTGlzdC5hZGQoJ2lzLW9wZW4nKTtcclxuICAgICAgICAgICAgICAgIGlzQ2xvc2VkID0gZmFsc2U7XHJcbiAgICAgICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgICAgICB0cmlnZ2VyLmNsYXNzTGlzdC5yZW1vdmUoXCJpcy1jbG9zZWRcIik7XHJcbiAgICAgICAgICAgICAgICB0cmlnZ2VyLmNsYXNzTGlzdC5hZGQoXCJpcy1vcGVuXCIpO1xyXG4gICAgICAgICAgICAgICAgbW9iaWxlTmF2LmNsYXNzTGlzdC5yZW1vdmUoJ2lzLW9wZW4nKTtcclxuICAgICAgICAgICAgICAgIGlzQ2xvc2VkID0gdHJ1ZTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuICAgIH1cclxuXHJcbiAgICBzaG93TW9iaWxlTWVudSgpO1xyXG5cclxuICAgIGNvbnN0IG9wZW5TZWFyY2hGb3JtID0gKCkgPT4ge1xyXG4gICAgICAgIC8vIHNlYXJjaCBmb3JtIG9wZW4vY2xvc2UgYW5pbWF0aW9uXHJcbiAgICAgICAgaWYgKGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoXCIuc2VhcmNoLWZvcm1fX2J0blwiKSA9PSBudWxsKSByZXR1cm4gZmFsc2U7XHJcbiAgICAgICAgY29uc3Qgc2VhcmNoQnRuID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcihcIi5zZWFyY2gtZm9ybV9fYnRuXCIpO1xyXG4gICAgICAgIHNlYXJjaEJ0bi5hZGRFdmVudExpc3RlbmVyKFwiY2xpY2tcIiwgZnVuY3Rpb24gKCkge1xyXG4gICAgICAgICAgICB0aGlzLmNsYXNzTGlzdC50b2dnbGUoXCJjbG9zZVwiKTtcclxuICAgICAgICAgICAgdGhpcy5wYXJlbnRFbGVtZW50LmNsYXNzTGlzdC50b2dnbGUoXCJpbmNsaWNrZWRcIik7XHJcbiAgICAgICAgICAgIHRoaXMucHJldmlvdXNFbGVtZW50U2libGluZy52YWx1ZSA9IFwiXCI7XHJcbiAgICAgICAgfSk7XHJcbiAgICAgICAgY29uc3QgcHJvZHVjdFJldmlld1N0YXJzID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvckFsbChcIi5qcy1wcm9kdWN0LXJldmlldy1yYXRpbmdcIik7XHJcbiAgICAgICAgcHJvZHVjdFJldmlld1N0YXJzLmZvckVhY2goZnVuY3Rpb24gKGVsKSB7XHJcbiAgICAgICAgICAgIGNvbnN0IGRhdGFSYXRpbmcgPSBlbC5nZXRBdHRyaWJ1dGUoXCJkYXRhLXJhdGluZ1wiKTtcclxuICAgICAgICAgICAgY29uc3Qgc3RhcnMgPSBlbC5jaGlsZHJlbjtcclxuICAgICAgICAgICAgZm9yIChsZXQgaSA9IDA7IGkgPCBkYXRhUmF0aW5nOyBpKyspIHtcclxuICAgICAgICAgICAgICAgIHN0YXJzW2ldLmNsYXNzTGlzdC5hZGQoXCJhY3RpdmVcIik7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9KTtcclxuICAgIH1cclxuXHJcbiAgICBvcGVuU2VhcmNoRm9ybSgpO1xyXG5cclxuICAgIGNvbnN0IGNob29zZVJhdGluZyA9ICgpID0+IHtcclxuICAgICAgICBpZiAoZG9jdW1lbnQucXVlcnlTZWxlY3RvckFsbChcIi5qcy1yYXRpbmdcIikubGVuZ3RoIDwgMCkgcmV0dXJuIGZhbHNlO1xyXG5cclxuICAgICAgICBjb25zdCByYXRpbmcgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yQWxsKFwiLmpzLXJhdGluZ1wiKTtcclxuXHJcbiAgICAgICAgcmF0aW5nLmZvckVhY2gocmF0ZSA9PiB7XHJcbiAgICAgICAgICAgIGNvbnN0IHJhdGluZ1N0YXJzID0gcmF0ZS5jaGlsZHJlbjtcclxuXHJcbiAgICAgICAgICAgIHJhdGUuYWRkRXZlbnRMaXN0ZW5lcihcImNsaWNrXCIsIChlKSA9PiB7XHJcbiAgICAgICAgICAgICAgICBpZiAoZS50YXJnZXQuY2xhc3NMaXN0LmNvbnRhaW5zKFwianMtcmF0aW5nLXN0YXJcIikgfHwgZS50YXJnZXQuY2xvc2VzdChcIi5qcy1yYXRpbmctc3RhclwiKSkge1xyXG4gICAgICAgICAgICAgICAgICAgIGxldCB0YXJnZXQgPSBlLnRhcmdldC5jbGFzc0xpc3QuY29udGFpbnMoXCJqcy1yYXRpbmctc3RhclwiKSA/IGUudGFyZ2V0IDogZS50YXJnZXQuY2xvc2VzdChcIi5qcy1yYXRpbmctc3RhclwiKTtcclxuICAgICAgICAgICAgICAgICAgICByZW1vdmVDbGFzcyhyYXRpbmdTdGFycywgXCJjdXJyZW50LWFjdGl2ZVwiKTtcclxuICAgICAgICAgICAgICAgICAgICB0YXJnZXQuY2xhc3NMaXN0LmFkZChcImFjdGl2ZVwiLCBcImN1cnJlbnQtYWN0aXZlXCIpO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB9KTtcclxuICAgICAgICAgICAgcmF0ZS5hZGRFdmVudExpc3RlbmVyKFwibW91c2VvdmVyXCIsIChlKSA9PiB7XHJcbiAgICAgICAgICAgICAgICBpZiAoZS50YXJnZXQuY2xhc3NMaXN0LmNvbnRhaW5zKFwianMtcmF0aW5nLXN0YXJcIikgfHwgZS50YXJnZXQuY2xvc2VzdChcIi5qcy1yYXRpbmctc3RhclwiKSkge1xyXG4gICAgICAgICAgICAgICAgICAgIGxldCB0YXJnZXQgPSBlLnRhcmdldC5jbGFzc0xpc3QuY29udGFpbnMoXCJqcy1yYXRpbmctc3RhclwiKSA/IGUudGFyZ2V0IDogZS50YXJnZXQuY2xvc2VzdChcIi5qcy1yYXRpbmctc3RhclwiKTtcclxuICAgICAgICAgICAgICAgICAgICByZW1vdmVDbGFzcyhyYXRpbmdTdGFycywgXCJhY3RpdmVcIik7XHJcbiAgICAgICAgICAgICAgICAgICAgdGFyZ2V0LmNsYXNzTGlzdC5hZGQoXCJhY3RpdmVcIik7XHJcbiAgICAgICAgICAgICAgICAgICAgbW91c2VPdmVyQWN0aXZlQ2xhc3MocmF0aW5nU3RhcnMpO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB9KTtcclxuICAgICAgICAgICAgcmF0ZS5hZGRFdmVudExpc3RlbmVyKFwibW91c2VvdXRcIiwgKCkgPT4ge1xyXG4gICAgICAgICAgICAgICAgYWRkQ2xhc3MocmF0aW5nU3RhcnMsIFwiYWN0aXZlXCIpO1xyXG4gICAgICAgICAgICAgICAgbW91c2VPdXRBY3RpdmVDbGFzcyhyYXRpbmdTdGFycyk7XHJcbiAgICAgICAgICAgIH0pO1xyXG5cclxuICAgICAgICAgICAgZnVuY3Rpb24gYWRkQ2xhc3MoYXJyKSB7XHJcbiAgICAgICAgICAgICAgICBmb3IgKGxldCBpID0gMCwgaUxlbmcgPSBhcnIubGVuZ3RoOyBpIDwgaUxlbmc7IGkrKykge1xyXG4gICAgICAgICAgICAgICAgICAgIGZvciAobGV0IGogPSAxOyBqIDwgYXJndW1lbnRzLmxlbmd0aDsgaisrKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHJhdGluZ1N0YXJzW2ldLmNsYXNzTGlzdC5hZGQoYXJndW1lbnRzW2pdKTtcclxuICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgIGZ1bmN0aW9uIHJlbW92ZUNsYXNzKGFycikge1xyXG4gICAgICAgICAgICAgICAgZm9yIChsZXQgaSA9IDAsIGlMZW5nID0gYXJyLmxlbmd0aDsgaSA8IGlMZW5nOyBpKyspIHtcclxuICAgICAgICAgICAgICAgICAgICBmb3IgKGxldCBqID0gMTsgaiA8IGFyZ3VtZW50cy5sZW5ndGg7IGorKykge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICByYXRpbmdTdGFyc1tpXS5jbGFzc0xpc3QucmVtb3ZlKGFyZ3VtZW50c1tqXSk7XHJcbiAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICBmdW5jdGlvbiBtb3VzZU92ZXJBY3RpdmVDbGFzcyhhcnIpIHtcclxuICAgICAgICAgICAgICAgIGZvciAobGV0IGkgPSAwLCBpTGVuID0gYXJyLmxlbmd0aDsgaSA8IGlMZW47IGkrKykge1xyXG4gICAgICAgICAgICAgICAgICAgIGlmIChhcnJbaV0uY2xhc3NMaXN0LmNvbnRhaW5zKFwiYWN0aXZlXCIpKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGJyZWFrO1xyXG4gICAgICAgICAgICAgICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGFycltpXS5jbGFzc0xpc3QuYWRkKFwiYWN0aXZlXCIpO1xyXG4gICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgZnVuY3Rpb24gbW91c2VPdXRBY3RpdmVDbGFzcyhhcnIpIHtcclxuICAgICAgICAgICAgICAgIGZvciAobGV0IGkgPSBhcnIubGVuZ3RoIC0gMTsgaSA+PSAwOyBpLS0pIHtcclxuICAgICAgICAgICAgICAgICAgICBpZiAoYXJyW2ldLmNsYXNzTGlzdC5jb250YWlucyhcImN1cnJlbnQtYWN0aXZlXCIpKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGJyZWFrO1xyXG4gICAgICAgICAgICAgICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGFycltpXS5jbGFzc0xpc3QucmVtb3ZlKFwiYWN0aXZlXCIpO1xyXG4gICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH0pO1xyXG4gICAgfVxyXG5cclxuICAgIGNob29zZVJhdGluZygpO1xyXG5cclxuICAgIGRvY3VtZW50LmFkZEV2ZW50TGlzdGVuZXIoXCJjbGlja1wiLCBmdW5jdGlvbiAoZSkge1xyXG4gICAgICAgIGlmIChlLnRhcmdldC5jbGFzc0xpc3QuY29udGFpbnMoXCJqcy1vcGVuLWRyb3Bkb3duXCIpICYmIHdpbmRvdy5zY3JlZW4ud2lkdGggPD0gNTc2KSB7XHJcbiAgICAgICAgICAgIGNvbnN0IGNhcmV0RHJvcGRvd24gPSBlLnRhcmdldC5maXJzdEVsZW1lbnRDaGlsZDtcclxuICAgICAgICAgICAgY29uc3QgZHJvcGRvd24gPSBlLnRhcmdldC5uZXh0RWxlbWVudFNpYmxpbmc7XHJcbiAgICAgICAgICAgIGlmIChkcm9wZG93bi5zdHlsZS5tYXhIZWlnaHQpIHtcclxuICAgICAgICAgICAgICAgIGRyb3Bkb3duLnN0eWxlLm1heEhlaWdodCA9IG51bGw7XHJcbiAgICAgICAgICAgICAgICBkcm9wZG93bi5zdHlsZS5vcGFjaXR5ID0gbnVsbDtcclxuICAgICAgICAgICAgICAgIGUudGFyZ2V0LmNsYXNzTGlzdC5yZW1vdmUoXCJkcm9wZG93bi1hY3RpdmVcIik7XHJcbiAgICAgICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgICAgICBkcm9wZG93bi5zdHlsZS5tYXhIZWlnaHQgPSBkcm9wZG93bi5zY3JvbGxIZWlnaHQgKyBcInB4XCI7XHJcbiAgICAgICAgICAgICAgICBkcm9wZG93bi5zdHlsZS5vcGFjaXR5ID0gMTtcclxuICAgICAgICAgICAgICAgIGUudGFyZ2V0LmNsYXNzTGlzdC5hZGQoXCJkcm9wZG93bi1hY3RpdmVcIik7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcbiAgICB9KTtcclxuXHJcbiAgICBjb25zdCBiYXNpY1Njcm9sbFRvcCA9IGZ1bmN0aW9uICgpIHtcclxuICAgICAgICBpZiAoZG9jdW1lbnQucXVlcnlTZWxlY3RvcignLmpzLWJ0bi1nby10b3AnKSA9PSBudWxsKSByZXR1cm4gZmFsc2U7XHJcbiAgICAgICAgY29uc3QgYnRuVG9wID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignLmpzLWJ0bi1nby10b3AnKTtcclxuICAgICAgICBjb25zdCBidG5SZXZlYWwgPSBmdW5jdGlvbiAoKSB7XHJcbiAgICAgICAgICAgIGlmICh3aW5kb3cuc2Nyb2xsWSA+PSAzMDApIHtcclxuICAgICAgICAgICAgICAgIGJ0blRvcC5jbGFzc0xpc3QuYWRkKCdpcy12aXNpYmxlJyk7XHJcbiAgICAgICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgICAgICBidG5Ub3AuY2xhc3NMaXN0LnJlbW92ZSgnaXMtdmlzaWJsZScpO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGNvbnN0IFRvcHNjcm9sbFRvID0gZnVuY3Rpb24gKCkge1xyXG4gICAgICAgICAgICBpZiAod2luZG93LnNjcm9sbFkgIT0gMCkge1xyXG4gICAgICAgICAgICAgICAgc2V0VGltZW91dChmdW5jdGlvbiAoKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgd2luZG93LnNjcm9sbFRvKDAsIHdpbmRvdy5zY3JvbGxZIC0gMzApO1xyXG4gICAgICAgICAgICAgICAgICAgIFRvcHNjcm9sbFRvKCk7XHJcbiAgICAgICAgICAgICAgICB9LCAxMCk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcbiAgICAgICAgd2luZG93LmFkZEV2ZW50TGlzdGVuZXIoJ3Njcm9sbCcsIGJ0blJldmVhbCk7XHJcbiAgICAgICAgYnRuVG9wLmFkZEV2ZW50TGlzdGVuZXIoJ2NsaWNrJywgVG9wc2Nyb2xsVG8pO1xyXG5cclxuICAgIH07XHJcbiAgICBiYXNpY1Njcm9sbFRvcCgpO1xyXG5cclxuICAgIGNvbnN0IG9wZW5Nb2RhbCA9IChidG4sIG1vZGFsKSA9PiB7XHJcbiAgICAgICAgaWYgKGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoYnRuKSA9PSBudWxsKSByZXR1cm4gZmFsc2U7XHJcblxyXG4gICAgICAgIGNvbnN0IG1vZGFsQnRuID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcihidG4pO1xyXG4gICAgICAgIGNvbnN0IG1vZGFsQ29udGFpbmVyID0gZG9jdW1lbnQucXVlcnlTZWxlY3Rvcihtb2RhbCk7XHJcblxyXG4gICAgICAgIGlmIChcclxuICAgICAgICAgICAgbmF2aWdhdG9yLnVzZXJBZ2VudC5tYXRjaCgvaVBob25lL2kpIHx8XHJcbiAgICAgICAgICAgIG5hdmlnYXRvci51c2VyQWdlbnQubWF0Y2goL2lQb2QvaSlcclxuICAgICAgICApIHtcclxuICAgICAgICAgICAgbW9kYWxCdG4uYWRkRXZlbnRMaXN0ZW5lcihcInRvdWNoc3RhcnRcIiwgZnVuY3Rpb24gKCkge1xyXG4gICAgICAgICAgICAgICAgZG9jdW1lbnQuYm9keS5jbGFzc0xpc3QuYWRkKFwibW9kYWwtYWN0aXZlXCIpO1xyXG4gICAgICAgICAgICAgICAgbW9kYWxDb250YWluZXIuY2xhc3NMaXN0LnJlbW92ZShcIm91dFwiKTtcclxuICAgICAgICAgICAgICAgIG1vZGFsQ29udGFpbmVyLmNsYXNzTGlzdC5hZGQoXCJvcGVuZWRcIik7XHJcbiAgICAgICAgICAgIH0pO1xyXG4gICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgIG1vZGFsQnRuLmFkZEV2ZW50TGlzdGVuZXIoXCJjbGlja1wiLCBmdW5jdGlvbiAoKSB7XHJcbiAgICAgICAgICAgICAgICBkb2N1bWVudC5ib2R5LmNsYXNzTGlzdC5hZGQoXCJtb2RhbC1hY3RpdmVcIik7XHJcbiAgICAgICAgICAgICAgICBtb2RhbENvbnRhaW5lci5jbGFzc0xpc3QucmVtb3ZlKFwib3V0XCIpO1xyXG4gICAgICAgICAgICAgICAgbW9kYWxDb250YWluZXIuY2xhc3NMaXN0LmFkZChcIm9wZW5lZFwiKTtcclxuICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgfVxyXG5cclxuXHJcbiAgICAgICAgZG9jdW1lbnQuYWRkRXZlbnRMaXN0ZW5lcihcImNsaWNrXCIsIGZ1bmN0aW9uIChlKSB7XHJcbiAgICAgICAgICAgIGlmIChcclxuICAgICAgICAgICAgICAgIGUudGFyZ2V0LmNsYXNzTGlzdC5jb250YWlucyhcIm1vZGFsLWNvbnRhaW5lclwiKSB8fFxyXG4gICAgICAgICAgICAgICAgZS50YXJnZXQuY2xhc3NMaXN0LmNvbnRhaW5zKFwibW9kYWwtY2xvc2VcIilcclxuICAgICAgICAgICAgKSB7XHJcbiAgICAgICAgICAgICAgICBkb2N1bWVudC5ib2R5LmNsYXNzTGlzdC5yZW1vdmUoXCJtb2RhbC1hY3RpdmVcIik7XHJcbiAgICAgICAgICAgICAgICBtb2RhbENvbnRhaW5lci5jbGFzc0xpc3QucmVtb3ZlKFwib3BlbmVkXCIpO1xyXG4gICAgICAgICAgICAgICAgbW9kYWxDb250YWluZXIuY2xhc3NMaXN0LmFkZChcIm91dFwiKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH0pO1xyXG4gICAgICAgIGRvY3VtZW50LmFkZEV2ZW50TGlzdGVuZXIoXCJrZXlkb3duXCIsIGZ1bmN0aW9uIChlKSB7XHJcbiAgICAgICAgICAgIGlmIChlLmtleUNvZGUgPT0gMjcpIHtcclxuICAgICAgICAgICAgICAgIGRvY3VtZW50LmJvZHkuY2xhc3NMaXN0LnJlbW92ZShcIm1vZGFsLWFjdGl2ZVwiKTtcclxuICAgICAgICAgICAgICAgIG1vZGFsQ29udGFpbmVyLmNsYXNzTGlzdC5yZW1vdmUoXCJvcGVuZWRcIik7XHJcbiAgICAgICAgICAgICAgICBtb2RhbENvbnRhaW5lci5jbGFzc0xpc3QuYWRkKFwib3V0XCIpO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfSk7XHJcbiAgICB9O1xyXG5cclxuICAgIG9wZW5Nb2RhbChcIi5qcy1wcm9kdWN0LWNvbXBhcmVcIiwgXCIuanMtbW9kYWwtcHJvZHVjdC1jb21wYXJlXCIpO1xyXG4gICAgb3Blbk1vZGFsKFwiLmpzLXByb2R1Y3QtY29tcGFyZS1tb2JpbGVcIiwgXCIuanMtbW9kYWwtcHJvZHVjdC1jb21wYXJlXCIpO1xyXG4gICAgb3Blbk1vZGFsKFwiLmpzLWFkZC1yZXZpZXdcIiwgXCIuanMtbW9kYWwtYWRkLXJldmlld1wiKTtcclxuICAgIG9wZW5Nb2RhbChcIi5qcy1hZGQtcXVlc3Rpb25cIiwgXCIuanMtbW9kYWwtYWRkLXF1ZXN0aW9uXCIpO1xyXG5cclxuICAgIGNvbnN0IHNlZU1vcmUgPSAobnVtYmVyLCBlbGVtZW50cywgYnV0dG9uKSA9PiB7XHJcblxyXG4gICAgICAgIGlmIChkb2N1bWVudC5xdWVyeVNlbGVjdG9yKGJ1dHRvbikgPT0gbnVsbCkge1xyXG4gICAgICAgICAgICByZXR1cm4gZmFsc2U7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIHdpbmRvdy5hZGRFdmVudExpc3RlbmVyKFwibG9hZFwiLCAoKSA9PiBzaG93SGlkZUJsb2NrcyhudW1iZXIsIGVsZW1lbnRzLCBidXR0b24pKTtcclxuICAgICAgICB3aW5kb3cuYWRkRXZlbnRMaXN0ZW5lcihcInJlc2l6ZVwiLCAoKSA9PiBzaG93SGlkZUJsb2NrcyhudW1iZXIsIGVsZW1lbnRzLCBidXR0b24pKTtcclxuXHJcbiAgICAgICAgZG9jdW1lbnQucXVlcnlTZWxlY3RvcihidXR0b24pLmFkZEV2ZW50TGlzdGVuZXIoXCJjbGlja1wiLCBmdW5jdGlvbiAoKSB7XHJcbiAgICAgICAgICAgIGlmICh0aGlzLnRleHRDb250ZW50ID09IFwiU2VlIG1vcmVcIikge1xyXG4gICAgICAgICAgICAgICAgdGhpcy50ZXh0Q29udGVudCA9IFwiU2VlIGxlc3NcIjtcclxuICAgICAgICAgICAgICAgIHRoaXMuY2xhc3NMaXN0LmFkZChcImFjdGl2ZVwiKTtcclxuICAgICAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgICAgIHRoaXMudGV4dENvbnRlbnQgPSBcIlNlZSBtb3JlXCI7XHJcbiAgICAgICAgICAgICAgICB0aGlzLmNsYXNzTGlzdC5yZW1vdmUoXCJhY3RpdmVcIik7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgZG9jdW1lbnQucXVlcnlTZWxlY3RvckFsbChlbGVtZW50cykuZm9yRWFjaCgoZWxlbSwgaW5kZXgpID0+IHtcclxuICAgICAgICAgICAgICAgIGlmIChlbGVtLnN0eWxlLmRpc3BsYXkgPT0gXCJub25lXCIpIHtcclxuICAgICAgICAgICAgICAgICAgICBlbGVtLnN0eWxlLmRpc3BsYXkgPSBudWxsO1xyXG4gICAgICAgICAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgICAgICAgICBpZiAoaW5kZXggPiBudW1iZXIpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgZWxlbS5zdHlsZS5kaXNwbGF5ID0gJ25vbmUnO1xyXG4gICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgfSk7XHJcblxyXG4gICAgICAgIGZ1bmN0aW9uIHNob3dIaWRlQmxvY2tzKG51bWJlciwgZWxlbWVudHMsIGJ1dHRvbikge1xyXG4gICAgICAgICAgICBjb25zdCBlbGVtcyA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3JBbGwoZWxlbWVudHMpO1xyXG4gICAgICAgICAgICBjb25zdCBidG5TaG93SGlkZSA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoYnV0dG9uKTtcclxuXHJcbiAgICAgICAgICAgIGlmICh3aW5kb3cuc2NyZWVuLndpZHRoIDw9IDgwMCAmJiBlbGVtcy5sZW5ndGggPiBudW1iZXIpIHtcclxuICAgICAgICAgICAgICAgIGVsZW1zLmZvckVhY2goKGVsZW0sIGluZGV4KSA9PiB7XHJcbiAgICAgICAgICAgICAgICAgICAgaWYgKGluZGV4ID4gbnVtYmVyKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGVsZW0uc3R5bGUuZGlzcGxheSA9ICdub25lJztcclxuICAgICAgICAgICAgICAgICAgICAgICAgYnRuU2hvd0hpZGUuc3R5bGUuZGlzcGxheSA9IG51bGw7XHJcbiAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgICAgICBlbGVtcy5mb3JFYWNoKChlbGVtLCBpbmRleCkgPT4ge1xyXG4gICAgICAgICAgICAgICAgICAgIGVsZW0uc3R5bGUuZGlzcGxheSA9IG51bGw7XHJcbiAgICAgICAgICAgICAgICAgICAgYnRuU2hvd0hpZGUuc3R5bGUuZGlzcGxheSA9ICdub25lJztcclxuICAgICAgICAgICAgICAgIH0pO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG4gICAgfTtcclxuXHJcbiAgICBzZWVNb3JlKDMsICcucHJvZHVjdC1jb21wYXJlLXRvcF9faXRlbScsICcuanMtc2VlLW1vcmUtcHJvZHVjdHMnKTtcclxuICAgIHNlZU1vcmUoMSwgJy5oZWxwLWNlbnRlcl9faXRlbScsICcuanMtc2VlLW1vcmUtaGVscCcpO1xyXG5cclxuICAgIGNvbnN0IHNob3dJdGVtcyA9IChudW1iZXJEZXNrdG9wLCBudW1iZXJNb2JpbGUsIGl0ZW1zLCBidXR0b24pID0+IHtcclxuICAgICAgICBpZiAoZG9jdW1lbnQucXVlcnlTZWxlY3RvckFsbChpdGVtcykubGVuZ3RoID09IDApIHJldHVybiBmYWxzZTtcclxuXHJcbiAgICAgICAgY29uc3QgYnRuID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcihidXR0b24pO1xyXG5cclxuICAgICAgICB3aW5kb3cuYWRkRXZlbnRMaXN0ZW5lcihcImxvYWRcIiwgc2hvd0hpZGVJdGVtcyk7XHJcbiAgICAgICAgd2luZG93LmFkZEV2ZW50TGlzdGVuZXIoXCJyZXNpemVcIiwgc2hvd0hpZGVJdGVtcyk7XHJcblxyXG4gICAgICAgIGZ1bmN0aW9uIHNob3dIaWRlSXRlbXMoKSB7XHJcbiAgICAgICAgICAgIGNvbnN0IGVscyA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3JBbGwoaXRlbXMpO1xyXG4gICAgICAgICAgICBjb25zdCBidG4gPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKGJ1dHRvbik7XHJcbiAgICAgICAgICAgIGlmICh3aW5kb3cuc2NyZWVuLndpZHRoID4gNTc3KSB7XHJcbiAgICAgICAgICAgICAgICBpZiAoZWxzLmxlbmd0aCA+IG51bWJlckRlc2t0b3ApIHtcclxuICAgICAgICAgICAgICAgICAgICBidG4uc3R5bGUuZGlzcGxheSA9IG51bGw7XHJcbiAgICAgICAgICAgICAgICAgICAgZWxzLmZvckVhY2goKGVsLCBpKSA9PiB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGlmIChpID4gbnVtYmVyRGVza3RvcCAtIDEpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGVsLnN0eWxlLmRpc3BsYXkgPSBcIm5vbmVcIlxyXG4gICAgICAgICAgICAgICAgICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgZWwuc3R5bGUuZGlzcGxheSA9IG51bGw7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICB9KTtcclxuICAgICAgICAgICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgICAgICAgICAgYnRuLnN0eWxlLmRpc3BsYXkgPSBcIm5vbmVcIjtcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgICAgIGlmIChlbHMubGVuZ3RoID4gbnVtYmVyTW9iaWxlKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgYnRuLnN0eWxlLmRpc3BsYXkgPSBudWxsO1xyXG4gICAgICAgICAgICAgICAgICAgIGVscy5mb3JFYWNoKChlbCwgaSkgPT4ge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBpZiAoaSA+IG51bWJlck1vYmlsZSAtIDEpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGVsLnN0eWxlLmRpc3BsYXkgPSBcIm5vbmVcIlxyXG4gICAgICAgICAgICAgICAgICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgZWwuc3R5bGUuZGlzcGxheSA9IG51bGw7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICB9KTtcclxuICAgICAgICAgICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgICAgICAgICAgYnRuLnN0eWxlLmRpc3BsYXkgPSBcIm5vbmVcIjtcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgYnRuLmFkZEV2ZW50TGlzdGVuZXIoXCJjbGlja1wiLCBmdW5jdGlvbiAoKSB7XHJcbiAgICAgICAgICAgIGNvbnN0IGVsZW1zID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvckFsbChpdGVtcyk7XHJcbiAgICAgICAgICAgIGlmICh0aGlzLnRleHRDb250ZW50ID09IFwiU2VlIG1vcmVcIikge1xyXG4gICAgICAgICAgICAgICAgdGhpcy50ZXh0Q29udGVudCA9IFwiU2VlIGxlc3NcIjtcclxuICAgICAgICAgICAgICAgIHRoaXMuY2xhc3NMaXN0LmFkZChcImFjdGl2ZVwiKTtcclxuICAgICAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgICAgIHRoaXMudGV4dENvbnRlbnQgPSBcIlNlZSBtb3JlXCI7XHJcbiAgICAgICAgICAgICAgICB0aGlzLmNsYXNzTGlzdC5yZW1vdmUoXCJhY3RpdmVcIik7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgZWxlbXMuZm9yRWFjaCgoZWxlbSwgaW5kZXgpID0+IHtcclxuICAgICAgICAgICAgICAgIGlmIChlbGVtLnN0eWxlLmRpc3BsYXkgPT0gXCJub25lXCIpIHtcclxuICAgICAgICAgICAgICAgICAgICBlbGVtLnN0eWxlLmRpc3BsYXkgPSBudWxsO1xyXG4gICAgICAgICAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgICAgICAgICBpZiAoKHdpbmRvdy5zY3JlZW4ud2lkdGggPiA1NzcgJiYgaW5kZXggPiBudW1iZXJEZXNrdG9wIC0gMSkgfHwgKHdpbmRvdy5zY3JlZW4ud2lkdGggPCA1NzcgJiYgaW5kZXggPiBudW1iZXJNb2JpbGUgLSAxKSkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBlbGVtLnN0eWxlLmRpc3BsYXkgPSAnbm9uZSc7XHJcbiAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB9KTtcclxuICAgICAgICB9KTtcclxuICAgIH1cclxuXHJcbiAgICBzaG93SXRlbXMoOCwgNCwgXCIuYnJhbmRzLWxpc3RfX2l0ZW1cIiwgXCIuanMtc2VlLW1vcmUtYnJhbmRzXCIpO1xyXG4gICAgc2hvd0l0ZW1zKDMsIDIsIFwiLnNlby1ibG9ja1wiLCBcIi5qcy1zZWUtbW9yZS1zZW9cIik7XHJcbiAgICBzaG93SXRlbXMoMywgMiwgXCIuanMtcmVsYXRlZC1pdGVtXCIsIFwiLmpzLXNlZS1wb3N0c1wiKTtcclxuXHJcbiAgICBjb25zdCBzaG93Rm9vdGVyTGlua3MgPSAoKSA9PiB7XHJcbiAgICAgICAgY29uc3QgZm9vdGVyVGl0bGUgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yQWxsKCcuZm9vdGVyX190aXRsZScpO1xyXG4gICAgICAgIGNvbnN0IGZvb3RlckxpbmtzID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvckFsbCgnLmZvb3Rlcl9fbGlua3MnKTtcclxuXHJcbiAgICAgICAgLy8gd2luZG93LmFkZEV2ZW50TGlzdGVuZXIoJ2xvYWQnLCAoKSA9PiBzaG93SGlkZUxpbmtzKTtcclxuICAgICAgICB3aW5kb3cuYWRkRXZlbnRMaXN0ZW5lcigncmVzaXplJywgKCkgPT4ge1xyXG4gICAgICAgICAgICBpZiAod2luZG93LnNjcmVlbi53aWR0aCA8PSA1NzYpIHtcclxuICAgICAgICAgICAgICAgIGZvb3RlckxpbmtzLmZvckVhY2goZm9vdGVyTGluayA9PiB7XHJcbiAgICAgICAgICAgICAgICAgICAgZm9vdGVyTGluay5zdHlsZS5tYXhIZWlnaHQgPSAwO1xyXG4gICAgICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgICAgICBmb290ZXJMaW5rcy5mb3JFYWNoKGZvb3RlckxpbmsgPT4ge1xyXG4gICAgICAgICAgICAgICAgICAgIGZvb3Rlckxpbmsuc3R5bGUubWF4SGVpZ2h0ID0gbnVsbDtcclxuICAgICAgICAgICAgICAgIH0pO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfSk7XHJcblxyXG4gICAgICAgIGZvb3RlclRpdGxlLmZvckVhY2godGl0bGUgPT4ge1xyXG4gICAgICAgICAgICB0aXRsZS5hZGRFdmVudExpc3RlbmVyKCdjbGljaycsIGZ1bmN0aW9uICgpIHtcclxuICAgICAgICAgICAgICAgIGNvbnN0IGZvb3RlckxpbmtzID0gdGhpcy5uZXh0RWxlbWVudFNpYmxpbmc7XHJcbiAgICAgICAgICAgICAgICBpZiAoZ2V0Q29tcHV0ZWRTdHlsZShmb290ZXJMaW5rcykubWF4SGVpZ2h0ID09ICcwcHgnKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5jbGFzc0xpc3QuYWRkKCdhY3RpdmUnKTtcclxuICAgICAgICAgICAgICAgICAgICBmb290ZXJMaW5rcy5zdHlsZS5tYXhIZWlnaHQgPSBmb290ZXJMaW5rcy5zY3JvbGxIZWlnaHQgKyBcInB4XCI7XHJcbiAgICAgICAgICAgICAgICAgICAgZm9vdGVyTGlua3Muc3R5bGUub3BhY2l0eSA9IDE7XHJcbiAgICAgICAgICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICAgICAgICAgIHRoaXMuY2xhc3NMaXN0LnJlbW92ZSgnYWN0aXZlJyk7XHJcbiAgICAgICAgICAgICAgICAgICAgZm9vdGVyTGlua3Muc3R5bGUubWF4SGVpZ2h0ID0gbnVsbDtcclxuICAgICAgICAgICAgICAgICAgICBmb290ZXJMaW5rcy5zdHlsZS5vcGFjaXR5ID0gbnVsbDtcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgfSlcclxuICAgICAgICB9KTtcclxuICAgIH1cclxuXHJcbiAgICBzaG93Rm9vdGVyTGlua3MoKTtcclxuXHJcbiAgICBjb25zdCBzaG93U2lkZWJhckl0ZW1zID0gKCkgPT4ge1xyXG4gICAgICAgIGlmIChkb2N1bWVudC5xdWVyeVNlbGVjdG9yQWxsKFwiLmpzLXNpZGViYXItc2VlLW1vcmVcIikubGVuZ3RoID09IDApIHJldHVybiBmYWxzZTtcclxuXHJcbiAgICAgICAgY29uc3Qgc2lkZWJhclNlZU1vcmUgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yQWxsKFwiLmpzLXNpZGViYXItc2VlLW1vcmVcIik7XHJcblxyXG4gICAgICAgIHNpZGViYXJTZWVNb3JlLmZvckVhY2goZWwgPT4ge1xyXG4gICAgICAgICAgICBjb25zdCBzaWRlYmFySXRlbXMgPSBlbC5wcmV2aW91c0VsZW1lbnRTaWJsaW5nLmNoaWxkcmVuO1xyXG4gICAgICAgICAgICBpZiAoc2lkZWJhckl0ZW1zLmxlbmd0aCA+IDMpIHtcclxuICAgICAgICAgICAgICAgIGZvciAobGV0IGkgPSAwLCBsZW4gPSBzaWRlYmFySXRlbXMubGVuZ3RoOyBpIDwgbGVuOyBpKyspIHtcclxuICAgICAgICAgICAgICAgICAgICBpZiAoaSA+IDIpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgc2lkZWJhckl0ZW1zW2ldLnN0eWxlLmRpc3BsYXkgPSBcIm5vbmVcIjtcclxuICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICBlbC5hZGRFdmVudExpc3RlbmVyKFwiY2xpY2tcIiwgKCkgPT4ge1xyXG4gICAgICAgICAgICAgICAgICAgIGZvciAobGV0IGkgPSAwLCBsZW4gPSBzaWRlYmFySXRlbXMubGVuZ3RoOyBpIDwgbGVuOyBpKyspIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgaWYgKGkgPiAyKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBpZiAoc2lkZWJhckl0ZW1zW2ldLnN0eWxlLmRpc3BsYXkgPT0gXCJub25lXCIpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBzaWRlYmFySXRlbXNbaV0uc3R5bGUuZGlzcGxheSA9IG51bGw7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgZWwudGV4dENvbnRlbnQgPSBcIlNlZSBsZXNzXCI7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgZWwuY2xhc3NMaXN0LmFkZChcImFjdGl2ZVwiKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgc2lkZWJhckl0ZW1zW2ldLnN0eWxlLmRpc3BsYXkgPSBcIm5vbmVcIjtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBlbC50ZXh0Q29udGVudCA9IFwiU2VlIG1vcmVcIjtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBlbC5jbGFzc0xpc3QucmVtb3ZlKFwiYWN0aXZlXCIpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgICAgICBlbC5zdHlsZS5kaXNwbGF5ID0gXCJub25lXCI7XHJcbiAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgfSk7XHJcbiAgICB9XHJcblxyXG4gICAgc2hvd1NpZGViYXJJdGVtcygpO1xyXG5cclxuICAgIGNvbnN0IHNldFBlcmNlbnQgPSAoKSA9PiB7XHJcbiAgICAgICAgY29uc3QgY2lyY3VsYXJQcm9ncmVzcyA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3JBbGwoXCIuanMtY2lyY3VsYXItcHJvZ3Jlc3NcIik7XHJcblxyXG4gICAgICAgIGNpcmN1bGFyUHJvZ3Jlc3MuZm9yRWFjaChpdGVtID0+IHtcclxuICAgICAgICAgICAgY29uc3QgY2lyY2xlID0gaXRlbS5xdWVyeVNlbGVjdG9yKCcuY2lyY3VsYXItcHJvZ3Jlc3NfX3BlcmNlbnQnKTtcclxuICAgICAgICAgICAgY29uc3QgdGV4dCA9IGl0ZW0ucXVlcnlTZWxlY3RvcignLmNpcmN1bGFyLWluZm9fX251bWJlcicpO1xyXG4gICAgICAgICAgICBjb25zdCBkYXRhUGVyY2VudCA9IGl0ZW0uZ2V0QXR0cmlidXRlKCdkYXRhLXBlcmNlbnQnKTtcclxuICAgICAgICAgICAgY29uc3QgcGVyY2VudCA9ICgxMDAgLSBkYXRhUGVyY2VudCkgLyAxMDA7XHJcbiAgICAgICAgICAgIGNpcmNsZS5zdHlsZS5zdHJva2VEYXNob2Zmc2V0ID0gYGNhbGMoMiozMCozLjE0KiR7cGVyY2VudH0pYDtcclxuICAgICAgICAgICAgdGV4dC50ZXh0Q29udGVudCA9IGRhdGFQZXJjZW50O1xyXG4gICAgICAgIH0pO1xyXG4gICAgfVxyXG5cclxuICAgIHNldFBlcmNlbnQoKTtcclxuXHJcbiAgICBkb2N1bWVudC5hZGRFdmVudExpc3RlbmVyKFwiYmx1clwiLCBmdW5jdGlvbiAoZSkge1xyXG4gICAgICAgIGlmIChlLnRhcmdldC5jbGFzc0xpc3QuY29udGFpbnMoJ2NvbnRhY3QtZm9ybV9fZmllbGQnKSB8fCBlLnRhcmdldC5jbGFzc0xpc3QuY29udGFpbnMoJ2NvbnRhY3QtZm9ybV9fbWVzc2FnZScpKSB7XHJcbiAgICAgICAgICAgIGlmIChlLnRhcmdldC52YWx1ZS50cmltKCkgIT0gJycpIHtcclxuICAgICAgICAgICAgICAgIGUudGFyZ2V0Lm5leHRFbGVtZW50U2libGluZy5jbGFzc0xpc3QuYWRkKCdhY3RpdmUnKTtcclxuICAgICAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgICAgIGUudGFyZ2V0Lm5leHRFbGVtZW50U2libGluZy5jbGFzc0xpc3QucmVtb3ZlKCdhY3RpdmUnKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuICAgIH0sIHRydWUpO1xyXG5cclxuICAgIGNvbnN0IHByaWNlU2xpZGVyID0gKCkgPT4ge1xyXG4gICAgICAgIGNvbnN0IHJhbmdlSW5wdXRzID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvckFsbChcIi5wcmljZS1yYW5nZV9faW5wdXRcIiksXHJcbiAgICAgICAgICAgIHByaWNlSW5wdXRzID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvckFsbChcIi5wcmljZS1pbnB1dF9fZmllbGRcIiksXHJcbiAgICAgICAgICAgIHByb2dyZXNzID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcihcIi5wcmljZS1zbGlkZXJfX3Byb2dyZXNzXCIpO1xyXG5cclxuICAgICAgICBsZXQgcHJpY2VHYXAgPSA1MDA7XHJcblxyXG4gICAgICAgIHByaWNlSW5wdXRzLmZvckVhY2goKHByaWNlSW5wdXQpID0+IHtcclxuICAgICAgICAgICAgcHJpY2VJbnB1dC5hZGRFdmVudExpc3RlbmVyKFwiaW5wdXRcIiwgKGUpID0+IHtcclxuICAgICAgICAgICAgICAgIGxldCBtaW5WYWwgPSBwYXJzZUludChwcmljZUlucHV0c1swXS52YWx1ZSksXHJcbiAgICAgICAgICAgICAgICAgICAgbWF4VmFsID0gcGFyc2VJbnQocHJpY2VJbnB1dHNbMV0udmFsdWUpO1xyXG5cclxuICAgICAgICAgICAgICAgIGlmIChtYXhWYWwgLSBtaW5WYWwgPj0gcHJpY2VHYXAgJiYgbWF4VmFsIDw9IDUwMDAwKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgaWYgKGUudGFyZ2V0LmNsYXNzTGlzdC5jb250YWlucyhcInByaWNlLW1pblwiKSkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICByYW5nZUlucHV0c1swXS52YWx1ZSA9IG1pblZhbDtcclxuICAgICAgICAgICAgICAgICAgICAgICAgcHJvZ3Jlc3Muc3R5bGUubGVmdCA9IChtaW5WYWwgLyByYW5nZUlucHV0c1swXS5tYXgpICogMTAwICsgXCIlXCI7XHJcbiAgICAgICAgICAgICAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgcmFuZ2VJbnB1dHNbMV0udmFsdWUgPSBtYXhWYWw7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHByb2dyZXNzLnN0eWxlLnJpZ2h0ID0gMTAwIC0gKG1heFZhbCAvIHJhbmdlSW5wdXRzWzFdLm1heCkgKiAxMDAgKyBcIiVcIjtcclxuICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIH0pO1xyXG4gICAgICAgIH0pO1xyXG5cclxuICAgICAgICByYW5nZUlucHV0cy5mb3JFYWNoKChyYW5nZUlucHV0KSA9PiB7XHJcbiAgICAgICAgICAgIHJhbmdlSW5wdXQuYWRkRXZlbnRMaXN0ZW5lcihcImlucHV0XCIsIChlKSA9PiB7XHJcbiAgICAgICAgICAgICAgICBsZXQgbWluVmFsID0gcGFyc2VJbnQocmFuZ2VJbnB1dHNbMF0udmFsdWUpLFxyXG4gICAgICAgICAgICAgICAgICAgIG1heFZhbCA9IHBhcnNlSW50KHJhbmdlSW5wdXRzWzFdLnZhbHVlKTtcclxuXHJcbiAgICAgICAgICAgICAgICBpZiAobWF4VmFsIC0gbWluVmFsIDwgcHJpY2VHYXApIHtcclxuICAgICAgICAgICAgICAgICAgICBpZiAoZS50YXJnZXQuY2xhc3NMaXN0LmNvbnRhaW5zKFwicmFuZ2UtbWluXCIpKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHJhbmdlSW5wdXRzWzBdLnZhbHVlID0gbWF4VmFsIC0gcHJpY2VHYXA7XHJcbiAgICAgICAgICAgICAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgcmFuZ2VJbnB1dHNbMV0udmFsdWUgPSBtaW5WYWwgKyBwcmljZUdhcDtcclxuICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICAgICAgICAgIHByaWNlSW5wdXRzWzBdLnZhbHVlID0gbWluVmFsO1xyXG4gICAgICAgICAgICAgICAgICAgIHByaWNlSW5wdXRzWzFdLnZhbHVlID0gbWF4VmFsO1xyXG4gICAgICAgICAgICAgICAgICAgIHByb2dyZXNzLnN0eWxlLmxlZnQgPSAobWluVmFsIC8gcmFuZ2VJbnB1dHNbMF0ubWF4KSAqIDEwMCArIFwiJVwiO1xyXG4gICAgICAgICAgICAgICAgICAgIHByb2dyZXNzLnN0eWxlLnJpZ2h0ID0gMTAwIC0gKG1heFZhbCAvIHJhbmdlSW5wdXRzWzFdLm1heCkgKiAxMDAgKyBcIiVcIjtcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgfSk7XHJcblxyXG4gICAgICAgIGZ1bmN0aW9uIGFkZFNwYWNlcyh2YWx1ZSkge1xyXG4gICAgICAgICAgICB2YWx1ZSA9IHZhbHVlLnJlcGxhY2UoLyAvZywgJycpO1xyXG4gICAgICAgICAgICByZXR1cm4gdmFsdWUucmVwbGFjZSgvXFxCKD89KFxcZHszfSkrKD8hXFxkKSkvZywgXCIgXCIpO1xyXG4gICAgICAgIH1cclxuICAgIH07XHJcblxyXG4gICAgcHJpY2VTbGlkZXIoKTtcclxuXHJcbiAgICBjb25zdCB2aWV3QWxsID0gKCkgPT4ge1xyXG4gICAgICAgIGlmIChkb2N1bWVudC5xdWVyeVNlbGVjdG9yQWxsKFwiLmZpbHRlci12aWV3LWFsbFwiKS5sZW5ndGggPT0gMCkgcmV0dXJuIGZhbHNlO1xyXG4gICAgICAgIGNvbnN0IGZpbHRlckxpc3QgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yQWxsKFwiLmZpbHRlci1saXN0XCIpO1xyXG4gICAgICAgIGNvbnN0IHZpZXdBbGwgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yQWxsKFwiLmZpbHRlci12aWV3LWFsbFwiKTtcclxuXHJcbiAgICAgICAgZmlsdGVyTGlzdC5mb3JFYWNoKGxpc3QgPT4ge1xyXG4gICAgICAgICAgICBpZiAobGlzdC5jaGlsZHJlbi5sZW5ndGggPiA1KSB7XHJcbiAgICAgICAgICAgICAgICBjb25zdCBpdGVtcyA9IGxpc3QuY2hpbGRyZW47XHJcbiAgICAgICAgICAgICAgICBjb25zdCB2aWV3QWxsID0gbGlzdC5uZXh0RWxlbWVudFNpYmxpbmc7XHJcbiAgICAgICAgICAgICAgICBmb3IgKGxldCBpID0gMCwgbGVuID0gaXRlbXMubGVuZ3RoOyBpIDwgbGVuOyBpKyspIHtcclxuICAgICAgICAgICAgICAgICAgICBpZiAoaSA+PSA1KSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGl0ZW1zW2ldLnN0eWxlLmRpc3BsYXkgPSBcIm5vbmVcIjtcclxuICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICB2aWV3QWxsLnN0eWxlLmRpc3BsYXkgPSBcImJsb2NrXCI7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9KTtcclxuXHJcbiAgICAgICAgdmlld0FsbC5mb3JFYWNoKGVsID0+IHtcclxuICAgICAgICAgICAgZWwuYWRkRXZlbnRMaXN0ZW5lcihcImNsaWNrXCIsIGZ1bmN0aW9uICgpIHtcclxuICAgICAgICAgICAgICAgIGNvbnN0IGZpbHRlckl0ZW1zID0gdGhpcy5wcmV2aW91c0VsZW1lbnRTaWJsaW5nLmNoaWxkcmVuO1xyXG4gICAgICAgICAgICAgICAgY29uc3QgZmlsdGVyQ29udGVudCA9IHRoaXMuY2xvc2VzdChcIi5maWx0ZXItY29udGVudFwiKTtcclxuICAgICAgICAgICAgICAgIGZvciAobGV0IGkgPSAwLCBsZW4gPSBmaWx0ZXJJdGVtcy5sZW5ndGg7IGkgPCBsZW47IGkrKykge1xyXG4gICAgICAgICAgICAgICAgICAgIGlmIChpID49IDUpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgaWYgKGZpbHRlckl0ZW1zW2ldLnN0eWxlLmRpc3BsYXkpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGZpbHRlckl0ZW1zW2ldLnN0eWxlLmRpc3BsYXkgPSBudWxsO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy50ZXh0Q29udGVudCA9IFwiSGlkZVwiXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBmaWx0ZXJJdGVtc1tpXS5zdHlsZS5kaXNwbGF5ID0gXCJub25lXCI7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB0aGlzLnRleHRDb250ZW50ID0gXCJWaWV3IGFsbFwiXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICBmaWx0ZXJDb250ZW50LnN0eWxlLm1heEhlaWdodCA9IGZpbHRlckNvbnRlbnQuc2Nyb2xsSGVpZ2h0ICsgXCJweFwiO1xyXG4gICAgICAgICAgICB9KTtcclxuICAgICAgICB9KTtcclxuICAgIH1cclxuXHJcbiAgICB2aWV3QWxsKCk7XHJcblxyXG4gICAgY29uc3QgaW5wdXRWYWx1ZSA9ICgpID0+IHtcclxuICAgICAgICBjb25zdCBpbnB1dEZpZWxkID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcihcIi5wcm9kdWN0LWNvbXBhcmUtZm9ybV9fZmllbGRcIik7XHJcbiAgICAgICAgY29uc3QgYWRkVmFsdWVCdG5zID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvckFsbChcIi5qcy1jb21wYXJlXCIpO1xyXG4gICAgICAgIGFkZFZhbHVlQnRucy5mb3JFYWNoKGFkZFZhbHVlQnRuID0+IHtcclxuICAgICAgICAgICAgYWRkVmFsdWVCdG4uYWRkRXZlbnRMaXN0ZW5lcihcImNsaWNrXCIsIGZ1bmN0aW9uICgpIHtcclxuICAgICAgICAgICAgICAgIGNvbnN0IHZhbCA9IHRoaXMucHJldmlvdXNFbGVtZW50U2libGluZy50ZXh0Q29udGVudDtcclxuICAgICAgICAgICAgICAgIGlucHV0RmllbGQudmFsdWUgPSB2YWw7XHJcbiAgICAgICAgICAgIH0pO1xyXG4gICAgICAgIH0pO1xyXG4gICAgfVxyXG5cclxuICAgIGlucHV0VmFsdWUoKTtcclxuXHJcbiAgICAoZnVuY3Rpb24gKCkge1xyXG4gICAgICAgICd1c2Ugc3RyaWN0JztcclxuXHJcbiAgICAgICAgbGV0IEdyZWVkeSA9IGZ1bmN0aW9uIEdyZWVkeShvcHRpb25zKSB7XHJcbiAgICAgICAgICAgIHRoaXMuZWxlbWVudCA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3Iob3B0aW9ucy5lbGVtZW50KTtcclxuICAgICAgICAgICAgdGhpcy52aXNpYmxlTGlua3MgPSB0aGlzLmVsZW1lbnQucXVlcnlTZWxlY3RvcigndWwnKTtcclxuICAgICAgICAgICAgdGhpcy50b2dnbGVCdXR0b24gPSB0aGlzLmVsZW1lbnQucXVlcnlTZWxlY3RvcignLnRvZ2dsZS1saW5rcycpO1xyXG4gICAgICAgICAgICB0aGlzLmJyZWFrcG9pbnRzID0gW107XHJcbiAgICAgICAgICAgIHRoaXMuaW5pdCgpO1xyXG4gICAgICAgIH07XHJcblxyXG4gICAgICAgIHdpbmRvdy5HcmVlZHkgPSBHcmVlZHk7XHJcblxyXG4gICAgICAgIEdyZWVkeS5wcm90b3R5cGUuaW5pdCA9IGZ1bmN0aW9uICgpIHtcclxuICAgICAgICAgICAgdGhpcy5zZXR1cE1lbnUoKTtcclxuICAgICAgICAgICAgdGhpcy5jYWxjdWxhdGVCcmVha3BvaW50cygpO1xyXG4gICAgICAgICAgICB0aGlzLnVwZGF0ZU1lbnUoKTtcclxuICAgICAgICAgICAgdGhpcy5hZGRCaW5kaW5ncygpO1xyXG4gICAgICAgIH07XHJcblxyXG4gICAgICAgIC8qXHJcbiAgICAgICAgICBDcmVhdGVzL3JldHVybnMgYSBtZXRob2QgYm91bmRlZCB3aXRoICd0aGlzJy4gVXNlZCBmb3IgY3JlYXRpbmdcclxuICAgICAgICAgIG5hbWVkIGV2ZW50IGxpc3RlbmVycyB0aGF0IGNhbiBlYXNpbHkgYmUgcmVtb3ZlZFxyXG4gICAgICAgICovXHJcbiAgICAgICAgR3JlZWR5LnByb3RvdHlwZS5iaW5kTWV0aG9kID0gZnVuY3Rpb24gKG5hbWUpIHtcclxuICAgICAgICAgICAgcmV0dXJuIHRoaXNbJ18nICsgbmFtZSArICdfJ10gfHwgT2JqZWN0LmRlZmluZVByb3BlcnR5KFxyXG4gICAgICAgICAgICAgICAgdGhpcywgJ18nICsgbmFtZSArICdfJywge3ZhbHVlOiB0aGlzW25hbWVdLmJpbmQodGhpcyl9XHJcbiAgICAgICAgICAgIClbJ18nICsgbmFtZSArICdfJ107XHJcbiAgICAgICAgfTtcclxuXHJcbiAgICAgICAgLypcclxuICAgICAgICAgIENyZWF0ZXMgdGhlIG5lY2Vzc2FyeSBtYXJrdXAgYW5kIGFkZHMgdGhlIG5lY2Vzc2FyeSBjbGFzc2VzXHJcbiAgICAgICAgKi9cclxuICAgICAgICBHcmVlZHkucHJvdG90eXBlLnNldHVwTWVudSA9IGZ1bmN0aW9uICgpIHtcclxuICAgICAgICAgICAgdGhpcy5oaWRkZW5MaW5rcyA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ3VsJyk7XHJcbiAgICAgICAgICAgIHRoaXMuaGlkZGVuTGlua3MuY2xhc3NMaXN0LmFkZCgnaGlkZGVuLWxpbmtzJyk7XHJcbiAgICAgICAgICAgIHRoaXMuaGlkZGVuTGlua3MuY2xhc3NMaXN0LmFkZCgnbGlua3MtaW52aXNpYmxlJyk7XHJcbiAgICAgICAgICAgIHRoaXMuZWxlbWVudC5hcHBlbmRDaGlsZCh0aGlzLmhpZGRlbkxpbmtzKTtcclxuICAgICAgICAgICAgdGhpcy52aXNpYmxlTGlua3MuY2xhc3NMaXN0LmFkZCgndmlzaWJsZS1saW5rcycpO1xyXG4gICAgICAgIH07XHJcblxyXG4gICAgICAgIC8qXHJcbiAgICAgICAgICBGb3IgZWFjaCBuYXZpZ2F0aW9uIGl0ZW0sIGNhbGN1bGF0ZSBob3cgbXVjaCBzcGFjZSBpcyBuZWVkZWRcclxuICAgICAgICAgIHRvIGFjY29tb2RhdGUgaXRcclxuICAgICAgICAqL1xyXG4gICAgICAgIEdyZWVkeS5wcm90b3R5cGUuY2FsY3VsYXRlQnJlYWtwb2ludHMgPSBmdW5jdGlvbiAoKSB7XHJcbiAgICAgICAgICAgIHZhciBjaGlsZHJlbldpZHRoID0gMDtcclxuXHJcbiAgICAgICAgICAgIGZvciAodmFyIGkgPSAwOyBpIDwgdGhpcy52aXNpYmxlTGlua3MuY2hpbGRyZW4ubGVuZ3RoOyBpKyspIHtcclxuICAgICAgICAgICAgICAgIGNoaWxkcmVuV2lkdGggKz0gdGhpcy52aXNpYmxlTGlua3MuY2hpbGRyZW5baV0ub2Zmc2V0V2lkdGg7XHJcbiAgICAgICAgICAgICAgICB0aGlzLmJyZWFrcG9pbnRzW2ldID0gY2hpbGRyZW5XaWR0aDtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH07XHJcblxyXG4gICAgICAgIEdyZWVkeS5wcm90b3R5cGUuYWRkQmluZGluZ3MgPSBmdW5jdGlvbiAoKSB7XHJcbiAgICAgICAgICAgIHdpbmRvdy5hZGRFdmVudExpc3RlbmVyKCdyZXNpemUnLCB0aGlzLmJpbmRNZXRob2QoJ3VwZGF0ZU1lbnUnKSk7XHJcbiAgICAgICAgICAgIHRoaXMudG9nZ2xlQnV0dG9uLmFkZEV2ZW50TGlzdGVuZXIoJ2NsaWNrJywgdGhpcy5iaW5kTWV0aG9kKCd0b2dnbGVIaWRkZW5MaW5rcycpKTtcclxuICAgICAgICB9O1xyXG5cclxuICAgICAgICBHcmVlZHkucHJvdG90eXBlLnVwZGF0ZU1lbnUgPSBmdW5jdGlvbiAoKSB7XHJcbiAgICAgICAgICAgIHZhciBhdmFpbGFibGVTcGFjZSA9IHRoaXMuZWxlbWVudC5vZmZzZXRXaWR0aCAtIHRoaXMudG9nZ2xlQnV0dG9uLm9mZnNldFdpZHRoO1xyXG4gICAgICAgICAgICB2YXIgaXRlbXNWaXNpYmxlID0gdGhpcy52aXNpYmxlTGlua3MuY2hpbGRyZW4ubGVuZ3RoO1xyXG4gICAgICAgICAgICB2YXIgcmVxdWlyZWRTcGFjZSA9IHRoaXMuYnJlYWtwb2ludHNbaXRlbXNWaXNpYmxlIC0gMV07XHJcblxyXG4gICAgICAgICAgICAvKlxyXG4gICAgICAgICAgICAgIENoZWNrIGlmIHRoZXJlIGlzIG5vdCBlbm91Z2ggc3BhY2UgZm9yIHRoZSB2aXNpYmxlIGxpbmtzIG9yXHJcbiAgICAgICAgICAgICAgaWYgdGhlcmUgaXMgc3BhY2UgYXZhaWxhYmxlIGZvciB0aGUgaGlkZGVuIGxpbmtcclxuICAgICAgICAgICAgKi9cclxuICAgICAgICAgICAgaWYgKGF2YWlsYWJsZVNwYWNlIDwgdGhpcy5icmVha3BvaW50c1tpdGVtc1Zpc2libGUgLSAxXSkge1xyXG4gICAgICAgICAgICAgICAgdGhpcy50b2dnbGVCdXR0b24uY2xhc3NMaXN0LmFkZCgndmlzaWJsZScpO1xyXG5cclxuICAgICAgICAgICAgICAgIHdoaWxlIChhdmFpbGFibGVTcGFjZSA8IHRoaXMuYnJlYWtwb2ludHNbaXRlbXNWaXNpYmxlIC0gMV0pIHtcclxuICAgICAgICAgICAgICAgICAgICB0aGlzLmhpZGRlbkxpbmtzLmluc2VydEJlZm9yZSh0aGlzLnZpc2libGVMaW5rcy5jaGlsZHJlbltpdGVtc1Zpc2libGUgLSAxXSwgdGhpcy5oaWRkZW5MaW5rcy5maXJzdENoaWxkKTtcclxuICAgICAgICAgICAgICAgICAgICBpdGVtc1Zpc2libGUtLTtcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgfSBlbHNlIGlmIChhdmFpbGFibGVTcGFjZSA+IHRoaXMuYnJlYWtwb2ludHNbaXRlbXNWaXNpYmxlXSkge1xyXG4gICAgICAgICAgICAgICAgd2hpbGUgKGF2YWlsYWJsZVNwYWNlID4gdGhpcy5icmVha3BvaW50c1tpdGVtc1Zpc2libGVdKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgdGhpcy52aXNpYmxlTGlua3MuYXBwZW5kQ2hpbGQodGhpcy5oaWRkZW5MaW5rcy5yZW1vdmVDaGlsZCh0aGlzLmhpZGRlbkxpbmtzLmZpcnN0Q2hpbGQpKTtcclxuICAgICAgICAgICAgICAgICAgICBpdGVtc1Zpc2libGUrKztcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICB9O1xyXG5cclxuICAgICAgICBHcmVlZHkucHJvdG90eXBlLnRvZ2dsZUhpZGRlbkxpbmtzID0gZnVuY3Rpb24gKCkge1xyXG4gICAgICAgICAgICB0aGlzLmhpZGRlbkxpbmtzLmNsYXNzTGlzdC50b2dnbGUoJ2xpbmtzLWludmlzaWJsZScpO1xyXG4gICAgICAgICAgICB0aGlzLnRvZ2dsZUJ1dHRvbi5jbGFzc0xpc3QudG9nZ2xlKCdsaW5rcy1kaXNwbGF5ZWQnKTtcclxuICAgICAgICB9O1xyXG4gICAgfSkoKTtcclxuXHJcbiAgICAvLyBJbml0aWFsaXNlIG1lbnVcclxuICAgIGRvY3VtZW50LmFkZEV2ZW50TGlzdGVuZXIoJ0RPTUNvbnRlbnRMb2FkZWQnLCBmdW5jdGlvbiAoZXZlbnQpIHtcclxuICAgICAgICB2YXIgbWVudSA9IG5ldyBHcmVlZHkoe1xyXG4gICAgICAgICAgICBlbGVtZW50OiAnLmdyZWVkeS1tZW51JyxcclxuICAgICAgICAgICAgY291bnRlcjogdHJ1ZVxyXG4gICAgICAgIH0pO1xyXG4gICAgfSk7XHJcblxyXG4gICAgJChcIi5qcy1wcm9kdWN0LXNsaWRlci1wcmV2aWV3XCIpLnNsaWNrKHtcclxuICAgICAgICBzbGlkZXNUb1Nob3c6IDQsXHJcbiAgICAgICAgdmVydGljYWw6IHRydWUsXHJcbiAgICAgICAgdmVydGljYWxTd2lwaW5nOiB0cnVlLFxyXG4gICAgICAgIHNsaWRlc1RvU2Nyb2xsOiAxLFxyXG4gICAgICAgIGZvY3VzT25TZWxlY3Q6IHRydWUsXHJcbiAgICAgICAgcHJldkFycm93OiBcIi5wcm9kdWN0LXNsaWRlci1wcmV2aWV3X19idG4tLXByZXZcIixcclxuICAgICAgICBuZXh0QXJyb3c6IFwiLnByb2R1Y3Qtc2xpZGVyLXByZXZpZXdfX2J0bi0tbmV4dFwiLFxyXG4gICAgICAgIHZhcmlhYmxlV2lkdGg6IHRydWUsXHJcbiAgICAgICAgYXNOYXZGb3I6IFwiLnByb2R1Y3Qtc2xpZGVyLW1haW5cIlxyXG4gICAgfSk7XHJcbiAgICAkKFwiLnByb2R1Y3Qtc2xpZGVyLW1haW5cIikuc2xpY2soe1xyXG4gICAgICAgIHNsaWRlc1RvU2hvdzogMSxcclxuICAgICAgICBzbGlkZXNUb1Njcm9sbDogMSxcclxuICAgICAgICBhcnJvd3M6IGZhbHNlLFxyXG4gICAgICAgIGZhZGU6IHRydWUsXHJcbiAgICAgICAgYXNOYXZGb3I6IFwiLmpzLXByb2R1Y3Qtc2xpZGVyLXByZXZpZXdcIlxyXG4gICAgfSk7XHJcbiAgICAkKFwiLmpzLXByb2R1Y3QtY29tcGFyZS1zbGlkZXJcIikuc2xpY2soe1xyXG4gICAgICAgIHNsaWRlc1RvU2hvdzogMSxcclxuICAgICAgICBzbGlkZXNUb1Njcm9sbDogMSxcclxuICAgICAgICBwcmV2QXJyb3c6IFwiLnByb2R1Y3QtY29tcGFyZS1zbGlkZXJfX2J0bi0tcHJldlwiLFxyXG4gICAgICAgIG5leHRBcnJvdzogXCIucHJvZHVjdC1jb21wYXJlLXNsaWRlcl9fYnRuLS1uZXh0XCIsXHJcbiAgICAgICAgLy8gdmFyaWFibGVXaWR0aDogdHJ1ZSxcclxuICAgIH0pO1xyXG4gICAgJChcIi5qcy1yZWxhdGVkLXByb2R1Y3RzLXNsaWRlclwiKS5zbGljayh7XHJcbiAgICAgICAgc2xpZGVzVG9TaG93OiAzLFxyXG4gICAgICAgIHNsaWRlc1RvU2Nyb2xsOiAxLFxyXG4gICAgICAgIHByZXZBcnJvdzogXCIuanMtcmVsYXRlZC1wcmV2XCIsXHJcbiAgICAgICAgbmV4dEFycm93OiBcIi5qcy1yZWxhdGVkLW5leHRcIixcclxuICAgICAgICByZXNwb25zaXZlOiBbXHJcbiAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICAgIGJyZWFrcG9pbnQ6IDc2OCxcclxuICAgICAgICAgICAgICAgIHNldHRpbmdzOiB7XHJcbiAgICAgICAgICAgICAgICAgICAgc2xpZGVzVG9TaG93OiAyLFxyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB9LFxyXG4gICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgICBicmVha3BvaW50OiA1NzYsXHJcbiAgICAgICAgICAgICAgICBzZXR0aW5nczoge1xyXG4gICAgICAgICAgICAgICAgICAgIHNsaWRlc1RvU2hvdzogMSxcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgfSxcclxuICAgICAgICBdXHJcbiAgICB9KTtcclxuICAgICQoXCIuanMtcmVzZW50bHktdmlld2VkLXNsaWRlclwiKS5zbGljayh7XHJcbiAgICAgICAgc2xpZGVzVG9TaG93OiA0LFxyXG4gICAgICAgIHNsaWRlc1RvU2Nyb2xsOiAxLFxyXG4gICAgICAgIHByZXZBcnJvdzogXCIuanMtcmVzZW50bHktdmlld2VkLXByZXZcIixcclxuICAgICAgICBuZXh0QXJyb3c6IFwiLmpzLXJlc2VudGx5LXZpZXdlZC1uZXh0XCIsXHJcbiAgICAgICAgcmVzcG9uc2l2ZTogW1xyXG4gICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgICBicmVha3BvaW50OiA5OTMsXHJcbiAgICAgICAgICAgICAgICBzZXR0aW5nczoge1xyXG4gICAgICAgICAgICAgICAgICAgIHNsaWRlc1RvU2hvdzogMyxcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgfSxcclxuICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgYnJlYWtwb2ludDogNzY5LFxyXG4gICAgICAgICAgICAgICAgc2V0dGluZ3M6IHtcclxuICAgICAgICAgICAgICAgICAgICBzbGlkZXNUb1Nob3c6IDIsXHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIH0sXHJcbiAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICAgIGJyZWFrcG9pbnQ6IDU3NyxcclxuICAgICAgICAgICAgICAgIHNldHRpbmdzOiB7XHJcbiAgICAgICAgICAgICAgICAgICAgc2xpZGVzVG9TaG93OiAxLFxyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB9LFxyXG4gICAgICAgIF1cclxuICAgIH0pO1xyXG4gICAgJCgnYm9keScpLm9uKCdrZXl1cCcsICcuanMtc2VhcmNoLW1hdGNoZXMnLCBmdW5jdGlvbiAoKSB7XHJcbiAgICAgICAgbGV0IHNlbGYgPSAkKHRoaXMpO1xyXG4gICAgICAgIGxldCBsaXN0ID0gJCgnLicgKyBzZWxmLmRhdGEoJ2xpc3QnKSk7XHJcbiAgICAgICAgJC5hamF4KHtcclxuICAgICAgICAgICAgdXJsOiBzZWxmLmRhdGEoJ3VybCcpICsgJz9xPScgKyBzZWxmLnZhbCgpLFxyXG4gICAgICAgICAgICB0eXBlOiAnR0VUJyxcclxuICAgICAgICAgICAgZGF0YVR5cGU6ICdqc29uJyxcclxuICAgICAgICAgICAgc3VjY2VzczogZnVuY3Rpb24gKHJlc3BvbnNlKSB7XHJcbiAgICAgICAgICAgICAgICBsaXN0LmVtcHR5KCk7XHJcblxyXG4gICAgICAgICAgICAgICAgaWYgKHJlc3BvbnNlLml0ZW1zLmxlbmd0aCkge1xyXG4gICAgICAgICAgICAgICAgICAgICQuZWFjaChyZXNwb25zZS5pdGVtcywgZnVuY3Rpb24gKGksIGl0ZW0pIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgbGlzdC5hcHBlbmQoYDxhIGNsYXNzPVwic2VhcmNoLWZvcm0tbWF0Y2hlc19fbGlua1wiIGhyZWY9XCIke2l0ZW0udXJsfVwiPiR7aXRlbS50aXRsZX08L2E+YCk7XHJcbiAgICAgICAgICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9KTtcclxuICAgIH0pO1xyXG59KSgpOyJdLCJmaWxlIjoibWFpbi5qcyJ9
