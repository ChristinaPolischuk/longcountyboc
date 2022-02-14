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
//# sourceMappingURL=data:application/json;charset=utf8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIm1haW4uanMiXSwibmFtZXMiOlsiY3JvcFRleHQiLCJoaWRlQmxvY2siLCJyZWFkTW9yZSIsImRvY3VtZW50IiwicXVlcnlTZWxlY3RvckFsbCIsImZvckVhY2giLCJlbCIsImFkZEV2ZW50TGlzdGVuZXIiLCJlbFRleHQiLCJpbm5lclRleHQiLCJoaWRkZW5UZXh0IiwicHJldmlvdXNFbGVtZW50U2libGluZyIsImNsYXNzTGlzdCIsInRvZ2dsZSIsIm1heCIsInRleHQiLCJzdHIiLCJ0cmltIiwibGVuZ3RoIiwic3ViU3RyIiwic3Vic3RyaW5nIiwiaGlkZGVuU3RyIiwiaW5uZXJIVE1MIiwic2hvd1JldmlldyIsImltYWdlcyIsIm5leHRFbGVtZW50U2libGluZyIsInByb2R1Y3RSZXZpZXciLCJwcm9kdWN0VGV4dCIsInF1ZXJ5U2VsZWN0b3IiLCJjcmVhdGVFbGVtZW50IiwiYWRkIiwidGV4dENvbnRlbnQiLCJhZnRlciIsImJlZm9yZSIsImFjY29yZGlvbiIsImUiLCJ0YXJnZXQiLCJjb250YWlucyIsImNsb3Nlc3QiLCJhY2NvcmRpb25Db250ZW50Iiwic3R5bGUiLCJtYXhIZWlnaHQiLCJnZXRDb21wdXRlZFN0eWxlIiwicGFyZW50RWxlbWVudCIsInJlbW92ZSIsInNjcm9sbEhlaWdodCIsInNpZGViYXJMaW5rcyIsImVsZW0iLCJuYXZiYXJMaW5rQ2xpY2siLCJldmVudCIsInNtb290aFNjcm9sbCIsInByZXZlbnREZWZhdWx0IiwidGFyZ2V0SWQiLCJjdXJyZW50VGFyZ2V0IiwiZ2V0QXR0cmlidXRlIiwid2luZG93Iiwic2NyZWVuIiwid2lkdGgiLCJzY3JvbGxUbyIsInRvcCIsIm9mZnNldFRvcCIsImJlaGF2aW9yIiwidG9nZ2xlRml4ZWQiLCJ0aHJvdHRsZSIsInRyYWNrU2Nyb2xsIiwiZWxlbWVudHMiLCJzdGlja3lCbG9ja3MiLCJwYWdlWU9mZnNldCIsInN0aWNreUJsb2NrQ29vcmRzIiwiZ2V0Qm91bmRpbmdDbGllbnRSZWN0IiwiYm90dG9tIiwidHlwZSIsIm5hbWUiLCJvYmoiLCJydW5uaW5nIiwiZnVuYyIsInJlcXVlc3RBbmltYXRpb25GcmFtZSIsImRpc3BhdGNoRXZlbnQiLCJDdXN0b21FdmVudCIsImVsZW1lbnQiLCJmaXhlZFdpZHRoIiwiY2xpZW50V2lkdGgiLCJzaG93SGlkZVNpZGViYXJGaWx0ZXJzIiwic2hvd0hpZGVGaWx0ZXJzIiwic2lkZWJhckZpbHRlcnMiLCJmaWx0ZXIiLCJzaG93TW9iaWxlTWVudSIsInRyaWdnZXIiLCJtb2JpbGVOYXYiLCJpc0Nsb3NlZCIsImJ1cmdlclRpbWUiLCJvcGVuU2VhcmNoRm9ybSIsInNlYXJjaEJ0biIsInZhbHVlIiwicHJvZHVjdFJldmlld1N0YXJzIiwiZGF0YVJhdGluZyIsInN0YXJzIiwiY2hpbGRyZW4iLCJpIiwiY2hvb3NlUmF0aW5nIiwicmF0aW5nIiwicmF0ZSIsInJhdGluZ1N0YXJzIiwicmVtb3ZlQ2xhc3MiLCJtb3VzZU92ZXJBY3RpdmVDbGFzcyIsImFkZENsYXNzIiwibW91c2VPdXRBY3RpdmVDbGFzcyIsImFyciIsImlMZW5nIiwiaiIsImFyZ3VtZW50cyIsImlMZW4iLCJjYXJldERyb3Bkb3duIiwiZmlyc3RFbGVtZW50Q2hpbGQiLCJkcm9wZG93biIsIm9wYWNpdHkiLCJiYXNpY1Njcm9sbFRvcCIsImJ0blRvcCIsImJ0blJldmVhbCIsInNjcm9sbFkiLCJUb3BzY3JvbGxUbyIsInNldFRpbWVvdXQiLCJvcGVuTW9kYWwiLCJidG4iLCJtb2RhbCIsIm1vZGFsQnRuIiwibW9kYWxDb250YWluZXIiLCJuYXZpZ2F0b3IiLCJ1c2VyQWdlbnQiLCJtYXRjaCIsImJvZHkiLCJrZXlDb2RlIiwic2VlTW9yZSIsIm51bWJlciIsImJ1dHRvbiIsInNob3dIaWRlQmxvY2tzIiwiaW5kZXgiLCJkaXNwbGF5IiwiZWxlbXMiLCJidG5TaG93SGlkZSIsInNob3dJdGVtcyIsIm51bWJlckRlc2t0b3AiLCJudW1iZXJNb2JpbGUiLCJpdGVtcyIsInNob3dIaWRlSXRlbXMiLCJlbHMiLCJzaG93Rm9vdGVyTGlua3MiLCJmb290ZXJUaXRsZSIsImZvb3RlckxpbmtzIiwiZm9vdGVyTGluayIsInRpdGxlIiwic2hvd1NpZGViYXJJdGVtcyIsInNpZGViYXJTZWVNb3JlIiwic2lkZWJhckl0ZW1zIiwibGVuIiwic2V0UGVyY2VudCIsImNpcmN1bGFyUHJvZ3Jlc3MiLCJpdGVtIiwiY2lyY2xlIiwiZGF0YVBlcmNlbnQiLCJwZXJjZW50Iiwic3Ryb2tlRGFzaG9mZnNldCIsInByaWNlU2xpZGVyIiwicmFuZ2VJbnB1dHMiLCJwcmljZUlucHV0cyIsInByb2dyZXNzIiwicHJpY2VHYXAiLCJwcmljZUlucHV0IiwibWluVmFsIiwicGFyc2VJbnQiLCJtYXhWYWwiLCJsZWZ0IiwicmlnaHQiLCJyYW5nZUlucHV0IiwiYWRkU3BhY2VzIiwicmVwbGFjZSIsInZpZXdBbGwiLCJmaWx0ZXJMaXN0IiwibGlzdCIsImZpbHRlckl0ZW1zIiwiZmlsdGVyQ29udGVudCIsImlucHV0VmFsdWUiLCJpbnB1dEZpZWxkIiwiYWRkVmFsdWVCdG5zIiwiYWRkVmFsdWVCdG4iLCJ2YWwiLCIkIiwic2xpY2siLCJzbGlkZXNUb1Nob3ciLCJ2ZXJ0aWNhbCIsInZlcnRpY2FsU3dpcGluZyIsInNsaWRlc1RvU2Nyb2xsIiwiZm9jdXNPblNlbGVjdCIsInByZXZBcnJvdyIsIm5leHRBcnJvdyIsInZhcmlhYmxlV2lkdGgiLCJhc05hdkZvciIsImFycm93cyIsImZhZGUiLCJyZXNwb25zaXZlIiwiYnJlYWtwb2ludCIsInNldHRpbmdzIiwib24iLCJzZWxmIiwiZGF0YSIsImFqYXgiLCJ1cmwiLCJkYXRhVHlwZSIsInN1Y2Nlc3MiLCJyZXNwb25zZSIsImVtcHR5IiwiZWFjaCIsImFwcGVuZCJdLCJtYXBwaW5ncyI6Ijs7QUFBQTs7QUFDQSxDQUFDLFlBQVk7QUFDVEEsRUFBQUEsUUFBUTtBQUNSQyxFQUFBQSxTQUFTO0FBRVQsTUFBSUMsUUFBUSxHQUFHQyxRQUFRLENBQUNDLGdCQUFULENBQTBCLGVBQTFC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SUFBRCxDQUFaO0FBQ0EsUUFBSVIsSUFBSSxHQUFHUSxDQUFDLENBQUMsTUFBTWlCLElBQUksQ0FBQ0MsSUFBTCxDQUFVLE1BQVYsQ0FBUCxDQUFaO0FBQ0FsQixJQUFBQSxDQUFDLENBQUNtQixJQUFGLENBQU87QUFDSEMsTUFBQUEsR0FBRyxFQUFFSCxJQUFJLENBQUNDLElBQUwsQ0FBVSxLQUFWLElBQW1CLEtBQW5CLEdBQTJCRCxJQUFJLENBQUNsQixHQUFMLEVBRDdCO0FBRUhsSCxNQUFBQSxJQUFJLEVBQUUsS0FGSDtBQUdId0ksTUFBQUEsUUFBUSxFQUFFLE1BSFA7QUFJSEMsTUFBQUEsT0FBTyxFQUFFLGlCQUFVQyxRQUFWLEVBQW9CO0FBQ3pCL0IsUUFBQUEsSUFBSSxDQUFDZ0MsS0FBTDs7QUFFQSxZQUFJRCxRQUFRLENBQUNsRSxLQUFULENBQWU3SCxNQUFuQixFQUEyQjtBQUN2QndLLFVBQUFBLENBQUMsQ0FBQ3lCLElBQUYsQ0FBT0YsUUFBUSxDQUFDbEUsS0FBaEIsRUFBdUIsVUFBVTdDLENBQVYsRUFBYTJELElBQWIsRUFBbUI7QUFDdENxQixZQUFBQSxJQUFJLENBQUNrQyxNQUFMLHlEQUEwRHZELElBQUksQ0FBQ2lELEdBQS9ELGdCQUF1RWpELElBQUksQ0FBQ1AsS0FBNUU7QUFDSCxXQUZEO0FBR0g7QUFDSjtBQVpFLEtBQVA7QUFjSCxHQWpCRDtBQWtCSCxDQWp5QkQiLCJzb3VyY2VzQ29udGVudCI6WyI7XHJcbihmdW5jdGlvbiAoKSB7XHJcbiAgICBjcm9wVGV4dCgpO1xyXG4gICAgaGlkZUJsb2NrKCk7XHJcblxyXG4gICAgbGV0IHJlYWRNb3JlID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvckFsbCgnLmpzLXJlYWQtbW9yZScpO1xyXG5cclxuICAgIHJlYWRNb3JlLmZvckVhY2goZWwgPT4ge1xyXG4gICAgICAgIGVsLmFkZEV2ZW50TGlzdGVuZXIoJ2NsaWNrJywgKCkgPT4ge1xyXG4gICAgICAgICAgICBsZXQgZWxUZXh0ID0gZWwuaW5uZXJUZXh0O1xyXG4gICAgICAgICAgICBsZXQgaGlkZGVuVGV4dCA9IGVsLnByZXZpb3VzRWxlbWVudFNpYmxpbmc7XHJcblxyXG4gICAgICAgICAgICBlbC5pbm5lclRleHQgPSBlbFRleHQgPT0gJ3JlYWQgbW9yZSA+JyA/ICdoaWRlJyA6ICdyZWFkIG1vcmUgPic7XHJcbiAgICAgICAgICAgIGhpZGRlblRleHQuY2xhc3NMaXN0LnRvZ2dsZSgnc2hvdycpO1xyXG4gICAgICAgIH0pO1xyXG4gICAgfSk7XHJcblxyXG4gICAgZnVuY3Rpb24gY3JvcFRleHQoKSB7XHJcbiAgICAgICAgbGV0IG1heCA9IDE4MDtcclxuICAgICAgICBsZXQgdGV4dCA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3JBbGwoJy5qcy1yZWFkLW1vcmUtdGV4dCcpO1xyXG4gICAgICAgIHRleHQuZm9yRWFjaChlbCA9PiB7XHJcbiAgICAgICAgICAgIGxldCBzdHIgPSBlbC5pbm5lclRleHQudHJpbSgpO1xyXG4gICAgICAgICAgICBpZiAoc3RyLmxlbmd0aCA+IG1heCkge1xyXG4gICAgICAgICAgICAgICAgbGV0IHN1YlN0ciA9IHN0ci5zdWJzdHJpbmcoMCwgbWF4KTtcclxuICAgICAgICAgICAgICAgIGxldCBoaWRkZW5TdHIgPSBzdHIuc3Vic3RyaW5nKG1heCwgc3RyLmxlbmd0aCk7XHJcbiAgICAgICAgICAgICAgICBlbC5pbm5lclRleHQgPSBzdWJTdHI7XHJcbiAgICAgICAgICAgICAgICBlbC5pbm5lckhUTUwgKz0gYDxzcGFuIGNsYXNzPVwiaGlkZGVuLXRleHQganMtaGlkZGVuLXRleHRcIj4ke2hpZGRlblN0cn08L3NwYW4+YDtcclxuICAgICAgICAgICAgICAgIGVsLmlubmVySFRNTCArPSAnPHNwYW4gY2xhc3M9XCJyZWFkLW1vcmUganMtcmVhZC1tb3JlXCI+cmVhZCBtb3JlID48L3NwYW4+JztcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH0pO1xyXG4gICAgfVxyXG5cclxuICAgIGxldCBzaG93UmV2aWV3ID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvckFsbCgnLmpzLXNob3ctcmV2aWV3Jyk7XHJcblxyXG4gICAgc2hvd1Jldmlldy5mb3JFYWNoKGVsID0+IHtcclxuICAgICAgICBlbC5hZGRFdmVudExpc3RlbmVyKCdjbGljaycsICgpID0+IHtcclxuICAgICAgICAgICAgbGV0IGVsVGV4dCA9IGVsLmlubmVyVGV4dDtcclxuICAgICAgICAgICAgbGV0IGhpZGRlblRleHQgPSBlbC5wcmV2aW91c0VsZW1lbnRTaWJsaW5nO1xyXG4gICAgICAgICAgICBsZXQgaW1hZ2VzID0gZWwubmV4dEVsZW1lbnRTaWJsaW5nO1xyXG5cclxuICAgICAgICAgICAgZWwuaW5uZXJUZXh0ID0gZWxUZXh0ID09ICdyZWFkIG1vcmUgPicgPyAnPCBoaWRlJyA6ICdyZWFkIG1vcmUgPic7XHJcbiAgICAgICAgICAgIGhpZGRlblRleHQuY2xhc3NMaXN0LnRvZ2dsZSgnc2hvdycpO1xyXG4gICAgICAgICAgICBpbWFnZXMuY2xhc3NMaXN0LnRvZ2dsZShcInNob3dcIik7XHJcbiAgICAgICAgfSk7XHJcbiAgICB9KTtcclxuXHJcbiAgICBmdW5jdGlvbiBoaWRlQmxvY2soKSB7XHJcbiAgICAgICAgbGV0IG1heCA9IDEyODtcclxuICAgICAgICBsZXQgcHJvZHVjdFJldmlldyA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3JBbGwoJy5qcy1oaWRlLXJldmlldycpO1xyXG4gICAgICAgIHByb2R1Y3RSZXZpZXcuZm9yRWFjaChlbCA9PiB7XHJcbiAgICAgICAgICAgIGxldCBwcm9kdWN0VGV4dCA9IGVsLnF1ZXJ5U2VsZWN0b3IoXCIucGFnZS10ZXh0XCIpO1xyXG4gICAgICAgICAgICBsZXQgc3RyID0gcHJvZHVjdFRleHQuaW5uZXJUZXh0LnRyaW0oKTtcclxuICAgICAgICAgICAgbGV0IGltYWdlcyA9IGVsLnF1ZXJ5U2VsZWN0b3IoJy5wcm9kdWN0LXJldmlld19faW1hZ2VzJyk7XHJcbiAgICAgICAgICAgIGlmIChzdHIubGVuZ3RoID4gbWF4KSB7XHJcbiAgICAgICAgICAgICAgICBsZXQgc3ViU3RyID0gc3RyLnN1YnN0cmluZygwLCBtYXgpO1xyXG4gICAgICAgICAgICAgICAgbGV0IGhpZGRlblN0ciA9IHN0ci5zdWJzdHJpbmcobWF4LCBzdHIubGVuZ3RoKTtcclxuICAgICAgICAgICAgICAgIHByb2R1Y3RUZXh0LmlubmVyVGV4dCA9IHN1YlN0cjtcclxuXHJcbiAgICAgICAgICAgICAgICBsZXQgaGlkZGVuVGV4dCA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ3NwYW4nKTtcclxuICAgICAgICAgICAgICAgIGhpZGRlblRleHQuY2xhc3NMaXN0LmFkZCgnaGlkZGVuLXRleHQnLCAncGFnZS10ZXh0JywgJ2pzLWhpZGRlbi10ZXh0Jyk7XHJcbiAgICAgICAgICAgICAgICBoaWRkZW5UZXh0LnRleHRDb250ZW50ID0gaGlkZGVuU3RyO1xyXG5cclxuICAgICAgICAgICAgICAgIHByb2R1Y3RUZXh0LmFmdGVyKGhpZGRlblRleHQpO1xyXG5cclxuICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgbGV0IHJlYWRNb3JlID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnc3BhbicpO1xyXG4gICAgICAgICAgICByZWFkTW9yZS5jbGFzc0xpc3QuYWRkKCdyZWFkLW1vcmUnLCAnanMtc2hvdy1yZXZpZXcnKTtcclxuICAgICAgICAgICAgcmVhZE1vcmUudGV4dENvbnRlbnQgPSAncmVhZCBtb3JlID4nO1xyXG5cclxuICAgICAgICAgICAgaW1hZ2VzLmJlZm9yZShyZWFkTW9yZSk7XHJcbiAgICAgICAgfSk7XHJcbiAgICB9XHJcblxyXG4gICAgY29uc3QgYWNjb3JkaW9uID0gKCkgPT4ge1xyXG4gICAgICAgIGRvY3VtZW50LmFkZEV2ZW50TGlzdGVuZXIoJ2NsaWNrJywgZSA9PiB7XHJcbiAgICAgICAgICAgIGlmIChlLnRhcmdldC5jbGFzc0xpc3QuY29udGFpbnMoJ2pzLWFjY29yZGlvbicpIHx8IGUudGFyZ2V0LmNsb3Nlc3QoJy5qcy1hY2NvcmRpb24nKSkge1xyXG4gICAgICAgICAgICAgICAgY29uc3QgYWNjb3JkaW9uID0gZS50YXJnZXQuY2xhc3NMaXN0LmNvbnRhaW5zKCdqcy1hY2NvcmRpb24nKSA/IGUudGFyZ2V0IDogZS50YXJnZXQuY2xvc2VzdCgnLmpzLWFjY29yZGlvbicpO1xyXG4gICAgICAgICAgICAgICAgY29uc3QgYWNjb3JkaW9uQ29udGVudCA9IGFjY29yZGlvbi5uZXh0RWxlbWVudFNpYmxpbmc7XHJcbiAgICAgICAgICAgICAgICBpZiAoYWNjb3JkaW9uQ29udGVudC5zdHlsZS5tYXhIZWlnaHQgfHwgZ2V0Q29tcHV0ZWRTdHlsZShhY2NvcmRpb25Db250ZW50KS5tYXhIZWlnaHQgPT0gXCJtYXgtY29udGVudFwiKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgYWNjb3JkaW9uLnBhcmVudEVsZW1lbnQuY2xhc3NMaXN0LnJlbW92ZShcImFjdGl2ZVwiKTtcclxuICAgICAgICAgICAgICAgICAgICBhY2NvcmRpb25Db250ZW50LnN0eWxlLm1heEhlaWdodCA9IG51bGw7XHJcbiAgICAgICAgICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICAgICAgICAgIGFjY29yZGlvbi5wYXJlbnRFbGVtZW50LmNsYXNzTGlzdC5hZGQoXCJhY3RpdmVcIik7XHJcbiAgICAgICAgICAgICAgICAgICAgYWNjb3JkaW9uQ29udGVudC5zdHlsZS5tYXhIZWlnaHQgPSBhY2NvcmRpb25Db250ZW50LnNjcm9sbEhlaWdodCArIFwicHhcIjtcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH0pO1xyXG4gICAgfVxyXG4gICAgYWNjb3JkaW9uKCk7XHJcblxyXG4gICAgY29uc3Qgc2lkZWJhckxpbmtzID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvckFsbChcIi5zaWRlYmFyLW1lbnVfX2xpbmtcIik7XHJcblxyXG4gICAgc2lkZWJhckxpbmtzLmZvckVhY2goZWxlbSA9PiBlbGVtLmFkZEV2ZW50TGlzdGVuZXIoXCJjbGlja1wiLCBuYXZiYXJMaW5rQ2xpY2spKTtcclxuXHJcbiAgICBmdW5jdGlvbiBuYXZiYXJMaW5rQ2xpY2soZXZlbnQpIHtcclxuICAgICAgICBzbW9vdGhTY3JvbGwoZXZlbnQpO1xyXG4gICAgfVxyXG5cclxuICAgIGZ1bmN0aW9uIHNtb290aFNjcm9sbChldmVudCkge1xyXG4gICAgICAgIGV2ZW50LnByZXZlbnREZWZhdWx0KCk7XHJcbiAgICAgICAgY29uc3QgdGFyZ2V0SWQgPSBldmVudC5jdXJyZW50VGFyZ2V0LmdldEF0dHJpYnV0ZShcImhyZWZcIik7XHJcbiAgICAgICAgaWYgKHdpbmRvdy5zY3JlZW4ud2lkdGggPiAxMDI0KSB7XHJcbiAgICAgICAgICAgIHdpbmRvdy5zY3JvbGxUbyh7XHJcbiAgICAgICAgICAgICAgICB0b3A6IHRhcmdldElkID09PSBcIiNcIiA/IDAgOiBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKHRhcmdldElkKS5vZmZzZXRUb3AgLSAxMDAsXHJcbiAgICAgICAgICAgICAgICBiZWhhdmlvcjogXCJzbW9vdGhcIlxyXG4gICAgICAgICAgICB9KTtcclxuICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICB3aW5kb3cuc2Nyb2xsVG8oe1xyXG4gICAgICAgICAgICAgICAgdG9wOiB0YXJnZXRJZCA9PT0gXCIjXCIgPyAwIDogZG9jdW1lbnQucXVlcnlTZWxlY3Rvcih0YXJnZXRJZCkub2Zmc2V0VG9wIC0gMjAwLFxyXG4gICAgICAgICAgICAgICAgYmVoYXZpb3I6IFwic21vb3RoXCJcclxuICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG5cclxuICAgIGlmIChkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcucHJvZHVjdHMtc3RpY2t5JykgIT09IG51bGwpIHtcclxuXHJcbiAgICAgICAgd2luZG93LmFkZEV2ZW50TGlzdGVuZXIoJ29wdGltaXplZFJlc2l6ZScsICgpID0+IHtcclxuICAgICAgICAgICAgdG9nZ2xlRml4ZWQoJy5wcm9kdWN0cy1zdGlja3knKTtcclxuICAgICAgICB9KTtcclxuXHJcblxyXG4gICAgICAgIHRvZ2dsZUZpeGVkKCcucHJvZHVjdHMtc3RpY2t5Jyk7XHJcblxyXG4gICAgICAgIHRocm90dGxlKFwicmVzaXplXCIsIFwib3B0aW1pemVkUmVzaXplXCIpO1xyXG5cclxuICAgIH1cclxuXHJcbiAgICBpZiAoZG9jdW1lbnQucXVlcnlTZWxlY3RvcignLnN0aWNreS1ibG9jaycpICE9PSBudWxsKSB7XHJcbiAgICAgICAgbGV0IHN0aWNreUJsb2NrQ29vcmRzID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignLnN0aWNreS1ibG9jaycpLmdldEJvdW5kaW5nQ2xpZW50UmVjdCgpLmJvdHRvbSArIHdpbmRvdy5wYWdlWU9mZnNldDtcclxuXHJcbiAgICAgICAgd2luZG93LmFkZEV2ZW50TGlzdGVuZXIoXCJzY3JvbGxcIiwgZnVuY3Rpb24gKCkge1xyXG4gICAgICAgICAgICB0cmFja1Njcm9sbCgnLnN0aWNreS1ibG9jaycpO1xyXG4gICAgICAgIH0pO1xyXG5cclxuICAgICAgICBmdW5jdGlvbiB0cmFja1Njcm9sbChlbGVtZW50cykge1xyXG4gICAgICAgICAgICBsZXQgc3RpY2t5QmxvY2tzID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvckFsbChlbGVtZW50cyk7XHJcbiAgICAgICAgICAgIHN0aWNreUJsb2Nrcy5mb3JFYWNoKGVsID0+IHtcclxuICAgICAgICAgICAgICAgIGlmIChlbC5jbGFzc0xpc3QuY29udGFpbnMoJ3Nob3cnKSAmJiB3aW5kb3cucGFnZVlPZmZzZXQgPCBzdGlja3lCbG9ja0Nvb3Jkcykge1xyXG4gICAgICAgICAgICAgICAgICAgIGVsLmNsYXNzTGlzdC5yZW1vdmUoJ3Nob3cnKTtcclxuICAgICAgICAgICAgICAgIH0gZWxzZSBpZiAod2luZG93LnBhZ2VZT2Zmc2V0ID4gc3RpY2t5QmxvY2tDb29yZHMpIHtcclxuICAgICAgICAgICAgICAgICAgICBlbC5jbGFzc0xpc3QuYWRkKCdzaG93Jyk7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIH0pO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxuXHJcbiAgICBmdW5jdGlvbiB0aHJvdHRsZSh0eXBlLCBuYW1lLCBvYmopIHtcclxuICAgICAgICBvYmogPSBvYmogfHwgd2luZG93O1xyXG4gICAgICAgIHZhciBydW5uaW5nID0gZmFsc2U7XHJcbiAgICAgICAgdmFyIGZ1bmMgPSBmdW5jdGlvbiAoKSB7XHJcbiAgICAgICAgICAgIGlmIChydW5uaW5nKSB7XHJcbiAgICAgICAgICAgICAgICByZXR1cm47XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgcnVubmluZyA9IHRydWU7XHJcbiAgICAgICAgICAgIHJlcXVlc3RBbmltYXRpb25GcmFtZShmdW5jdGlvbiAoKSB7XHJcbiAgICAgICAgICAgICAgICBvYmouZGlzcGF0Y2hFdmVudChuZXcgQ3VzdG9tRXZlbnQobmFtZSkpO1xyXG4gICAgICAgICAgICAgICAgcnVubmluZyA9IGZhbHNlO1xyXG4gICAgICAgICAgICB9KTtcclxuICAgICAgICB9O1xyXG4gICAgICAgIG9iai5hZGRFdmVudExpc3RlbmVyKHR5cGUsIGZ1bmMpO1xyXG4gICAgfTtcclxuXHJcbiAgICBmdW5jdGlvbiB0b2dnbGVGaXhlZChlbCkge1xyXG4gICAgICAgIGxldCBlbGVtZW50ID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcihlbCk7XHJcbiAgICAgICAgbGV0IGZpeGVkV2lkdGggPSB3aW5kb3cuc2NyZWVuLndpZHRoID4gMTAyNCA/IGVsZW1lbnQucGFyZW50RWxlbWVudC5jbGllbnRXaWR0aCAtIDI4NSA6IGVsZW1lbnQucGFyZW50RWxlbWVudC5jbGllbnRXaWR0aDtcclxuICAgICAgICBlbGVtZW50LnN0eWxlLndpZHRoID0gZml4ZWRXaWR0aCArICdweCc7XHJcblxyXG4gICAgfVxyXG5cclxuICAgIGNvbnN0IHNob3dIaWRlU2lkZWJhckZpbHRlcnMgPSAoKSA9PiB7XHJcbiAgICAgICAgaWYgKGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3JBbGwoXCIuZmlsdGVyXCIpLmxlbmd0aCA9PSAwKSByZXR1cm4gZmFsc2U7XHJcblxyXG4gICAgICAgIHdpbmRvdy5hZGRFdmVudExpc3RlbmVyKFwibG9hZFwiLCBzaG93SGlkZUZpbHRlcnMpO1xyXG4gICAgICAgIHdpbmRvdy5hZGRFdmVudExpc3RlbmVyKFwicmVzaXplXCIsIHNob3dIaWRlRmlsdGVycyk7XHJcblxyXG4gICAgICAgIGZ1bmN0aW9uIHNob3dIaWRlRmlsdGVycygpIHtcclxuICAgICAgICAgICAgY29uc3Qgc2lkZWJhckZpbHRlcnMgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yQWxsKFwiLmZpbHRlclwiKTtcclxuXHJcbiAgICAgICAgICAgIGlmICh3aW5kb3cuc2NyZWVuLndpZHRoIDw9IDEwMjQpIHtcclxuICAgICAgICAgICAgICAgIHNpZGViYXJGaWx0ZXJzLmZvckVhY2goZmlsdGVyID0+IHtcclxuICAgICAgICAgICAgICAgICAgICBmaWx0ZXIuY2xhc3NMaXN0LnJlbW92ZShcImFjdGl2ZVwiKTtcclxuICAgICAgICAgICAgICAgIH0pO1xyXG4gICAgICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICAgICAgc2lkZWJhckZpbHRlcnMuZm9yRWFjaChmaWx0ZXIgPT4ge1xyXG4gICAgICAgICAgICAgICAgICAgIGZpbHRlci5jbGFzc0xpc3QuYWRkKFwiYWN0aXZlXCIpO1xyXG4gICAgICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcbiAgICB9XHJcblxyXG4gICAgc2hvd0hpZGVTaWRlYmFyRmlsdGVycygpO1xyXG5cclxuICAgIGNvbnN0IHNob3dNb2JpbGVNZW51ID0gKCkgPT4ge1xyXG4gICAgICAgIC8vIGhhbWJ1cmdlciBvcGVuL2Nsb3NlIGFuaW1hdGlvblxyXG4gICAgICAgIGlmKGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoXCIjaGFtYnVyZ2VyXCIpID09IG51bGwpIHJldHVybiBmYWxzZTtcclxuICAgICAgICBjb25zdCB0cmlnZ2VyID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcihcIiNoYW1idXJnZXJcIik7XHJcbiAgICAgICAgY29uc3QgbW9iaWxlTmF2ID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcihcIiNtb2JpbGUtbmF2XCIpO1xyXG4gICAgICAgIGxldCBpc0Nsb3NlZCA9IHRydWU7XHJcblxyXG4gICAgICAgIHRyaWdnZXIuYWRkRXZlbnRMaXN0ZW5lcihcImNsaWNrXCIsIGJ1cmdlclRpbWUpO1xyXG5cclxuICAgICAgICBmdW5jdGlvbiBidXJnZXJUaW1lKCkge1xyXG4gICAgICAgICAgICBpZiAoaXNDbG9zZWQgPT0gdHJ1ZSkge1xyXG4gICAgICAgICAgICAgICAgdHJpZ2dlci5jbGFzc0xpc3QucmVtb3ZlKFwiaXMtb3BlblwiKTtcclxuICAgICAgICAgICAgICAgIHRyaWdnZXIuY2xhc3NMaXN0LmFkZChcImlzLWNsb3NlZFwiKTtcclxuICAgICAgICAgICAgICAgIG1vYmlsZU5hdi5jbGFzc0xpc3QuYWRkKCdpcy1vcGVuJyk7XHJcbiAgICAgICAgICAgICAgICBpc0Nsb3NlZCA9IGZhbHNlO1xyXG4gICAgICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICAgICAgdHJpZ2dlci5jbGFzc0xpc3QucmVtb3ZlKFwiaXMtY2xvc2VkXCIpO1xyXG4gICAgICAgICAgICAgICAgdHJpZ2dlci5jbGFzc0xpc3QuYWRkKFwiaXMtb3BlblwiKTtcclxuICAgICAgICAgICAgICAgIG1vYmlsZU5hdi5jbGFzc0xpc3QucmVtb3ZlKCdpcy1vcGVuJyk7XHJcbiAgICAgICAgICAgICAgICBpc0Nsb3NlZCA9IHRydWU7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcbiAgICB9XHJcblxyXG4gICAgc2hvd01vYmlsZU1lbnUoKTtcclxuXHJcbiAgICBjb25zdCBvcGVuU2VhcmNoRm9ybSA9ICgpID0+IHtcclxuICAgICAgICAvLyBzZWFyY2ggZm9ybSBvcGVuL2Nsb3NlIGFuaW1hdGlvblxyXG4gICAgICAgIGlmKGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoXCIuc2VhcmNoLWZvcm1fX2J0blwiKSA9PSBudWxsKSByZXR1cm4gZmFsc2U7XHJcbiAgICAgICAgY29uc3Qgc2VhcmNoQnRuID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcihcIi5zZWFyY2gtZm9ybV9fYnRuXCIpO1xyXG4gICAgICAgIHNlYXJjaEJ0bi5hZGRFdmVudExpc3RlbmVyKFwiY2xpY2tcIiwgZnVuY3Rpb24gKCkge1xyXG4gICAgICAgICAgICB0aGlzLmNsYXNzTGlzdC50b2dnbGUoXCJjbG9zZVwiKTtcclxuICAgICAgICAgICAgdGhpcy5wYXJlbnRFbGVtZW50LmNsYXNzTGlzdC50b2dnbGUoXCJpbmNsaWNrZWRcIik7XHJcbiAgICAgICAgICAgIHRoaXMucHJldmlvdXNFbGVtZW50U2libGluZy52YWx1ZSA9IFwiXCI7XHJcbiAgICAgICAgfSk7XHJcbiAgICAgICAgY29uc3QgcHJvZHVjdFJldmlld1N0YXJzID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvckFsbChcIi5qcy1wcm9kdWN0LXJldmlldy1yYXRpbmdcIik7XHJcbiAgICAgICAgcHJvZHVjdFJldmlld1N0YXJzLmZvckVhY2goZnVuY3Rpb24gKGVsKSB7XHJcbiAgICAgICAgICAgIGNvbnN0IGRhdGFSYXRpbmcgPSBlbC5nZXRBdHRyaWJ1dGUoXCJkYXRhLXJhdGluZ1wiKTtcclxuICAgICAgICAgICAgY29uc3Qgc3RhcnMgPSBlbC5jaGlsZHJlbjtcclxuICAgICAgICAgICAgZm9yIChsZXQgaSA9IDA7IGkgPCBkYXRhUmF0aW5nOyBpKyspIHtcclxuICAgICAgICAgICAgICAgIHN0YXJzW2ldLmNsYXNzTGlzdC5hZGQoXCJhY3RpdmVcIik7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9KTtcclxuICAgIH1cclxuXHJcbiAgICBvcGVuU2VhcmNoRm9ybSgpO1xyXG5cclxuICAgIGNvbnN0IGNob29zZVJhdGluZyA9ICgpID0+IHtcclxuICAgICAgICBpZiAoZG9jdW1lbnQucXVlcnlTZWxlY3RvckFsbChcIi5qcy1yYXRpbmdcIikubGVuZ3RoIDwgMCkgcmV0dXJuIGZhbHNlO1xyXG5cclxuICAgICAgICBjb25zdCByYXRpbmcgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yQWxsKFwiLmpzLXJhdGluZ1wiKTtcclxuXHJcbiAgICAgICAgcmF0aW5nLmZvckVhY2gocmF0ZSA9PiB7XHJcbiAgICAgICAgICAgIGNvbnN0IHJhdGluZ1N0YXJzID0gcmF0ZS5jaGlsZHJlbjtcclxuXHJcbiAgICAgICAgICAgIHJhdGUuYWRkRXZlbnRMaXN0ZW5lcihcImNsaWNrXCIsIChlKSA9PiB7XHJcbiAgICAgICAgICAgICAgICBpZiAoZS50YXJnZXQuY2xhc3NMaXN0LmNvbnRhaW5zKFwianMtcmF0aW5nLXN0YXJcIikgfHwgZS50YXJnZXQuY2xvc2VzdChcIi5qcy1yYXRpbmctc3RhclwiKSkge1xyXG4gICAgICAgICAgICAgICAgICAgIGxldCB0YXJnZXQgPSBlLnRhcmdldC5jbGFzc0xpc3QuY29udGFpbnMoXCJqcy1yYXRpbmctc3RhclwiKSA/IGUudGFyZ2V0IDogZS50YXJnZXQuY2xvc2VzdChcIi5qcy1yYXRpbmctc3RhclwiKTtcclxuICAgICAgICAgICAgICAgICAgICByZW1vdmVDbGFzcyhyYXRpbmdTdGFycywgXCJjdXJyZW50LWFjdGl2ZVwiKTtcclxuICAgICAgICAgICAgICAgICAgICB0YXJnZXQuY2xhc3NMaXN0LmFkZChcImFjdGl2ZVwiLCBcImN1cnJlbnQtYWN0aXZlXCIpO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB9KTtcclxuICAgICAgICAgICAgcmF0ZS5hZGRFdmVudExpc3RlbmVyKFwibW91c2VvdmVyXCIsIChlKSA9PiB7XHJcbiAgICAgICAgICAgICAgICBpZiAoZS50YXJnZXQuY2xhc3NMaXN0LmNvbnRhaW5zKFwianMtcmF0aW5nLXN0YXJcIikgfHwgZS50YXJnZXQuY2xvc2VzdChcIi5qcy1yYXRpbmctc3RhclwiKSkge1xyXG4gICAgICAgICAgICAgICAgICAgIGxldCB0YXJnZXQgPSBlLnRhcmdldC5jbGFzc0xpc3QuY29udGFpbnMoXCJqcy1yYXRpbmctc3RhclwiKSA/IGUudGFyZ2V0IDogZS50YXJnZXQuY2xvc2VzdChcIi5qcy1yYXRpbmctc3RhclwiKTtcclxuICAgICAgICAgICAgICAgICAgICByZW1vdmVDbGFzcyhyYXRpbmdTdGFycywgXCJhY3RpdmVcIik7XHJcbiAgICAgICAgICAgICAgICAgICAgdGFyZ2V0LmNsYXNzTGlzdC5hZGQoXCJhY3RpdmVcIik7XHJcbiAgICAgICAgICAgICAgICAgICAgbW91c2VPdmVyQWN0aXZlQ2xhc3MocmF0aW5nU3RhcnMpO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB9KTtcclxuICAgICAgICAgICAgcmF0ZS5hZGRFdmVudExpc3RlbmVyKFwibW91c2VvdXRcIiwgKCkgPT4ge1xyXG4gICAgICAgICAgICAgICAgYWRkQ2xhc3MocmF0aW5nU3RhcnMsIFwiYWN0aXZlXCIpO1xyXG4gICAgICAgICAgICAgICAgbW91c2VPdXRBY3RpdmVDbGFzcyhyYXRpbmdTdGFycyk7XHJcbiAgICAgICAgICAgIH0pO1xyXG5cclxuICAgICAgICAgICAgZnVuY3Rpb24gYWRkQ2xhc3MoYXJyKSB7XHJcbiAgICAgICAgICAgICAgICBmb3IgKGxldCBpID0gMCwgaUxlbmcgPSBhcnIubGVuZ3RoOyBpIDwgaUxlbmc7IGkrKykge1xyXG4gICAgICAgICAgICAgICAgICAgIGZvciAobGV0IGogPSAxOyBqIDwgYXJndW1lbnRzLmxlbmd0aDsgaisrKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHJhdGluZ1N0YXJzW2ldLmNsYXNzTGlzdC5hZGQoYXJndW1lbnRzW2pdKTtcclxuICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgIGZ1bmN0aW9uIHJlbW92ZUNsYXNzKGFycikge1xyXG4gICAgICAgICAgICAgICAgZm9yIChsZXQgaSA9IDAsIGlMZW5nID0gYXJyLmxlbmd0aDsgaSA8IGlMZW5nOyBpKyspIHtcclxuICAgICAgICAgICAgICAgICAgICBmb3IgKGxldCBqID0gMTsgaiA8IGFyZ3VtZW50cy5sZW5ndGg7IGorKykge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICByYXRpbmdTdGFyc1tpXS5jbGFzc0xpc3QucmVtb3ZlKGFyZ3VtZW50c1tqXSk7XHJcbiAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICBmdW5jdGlvbiBtb3VzZU92ZXJBY3RpdmVDbGFzcyhhcnIpIHtcclxuICAgICAgICAgICAgICAgIGZvciAobGV0IGkgPSAwLCBpTGVuID0gYXJyLmxlbmd0aDsgaSA8IGlMZW47IGkrKykge1xyXG4gICAgICAgICAgICAgICAgICAgIGlmIChhcnJbaV0uY2xhc3NMaXN0LmNvbnRhaW5zKFwiYWN0aXZlXCIpKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGJyZWFrO1xyXG4gICAgICAgICAgICAgICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGFycltpXS5jbGFzc0xpc3QuYWRkKFwiYWN0aXZlXCIpO1xyXG4gICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgZnVuY3Rpb24gbW91c2VPdXRBY3RpdmVDbGFzcyhhcnIpIHtcclxuICAgICAgICAgICAgICAgIGZvciAobGV0IGkgPSBhcnIubGVuZ3RoIC0gMTsgaSA+PSAwOyBpLS0pIHtcclxuICAgICAgICAgICAgICAgICAgICBpZiAoYXJyW2ldLmNsYXNzTGlzdC5jb250YWlucyhcImN1cnJlbnQtYWN0aXZlXCIpKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGJyZWFrO1xyXG4gICAgICAgICAgICAgICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGFycltpXS5jbGFzc0xpc3QucmVtb3ZlKFwiYWN0aXZlXCIpO1xyXG4gICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH0pO1xyXG4gICAgfVxyXG5cclxuICAgIGNob29zZVJhdGluZygpO1xyXG5cclxuICAgIGRvY3VtZW50LmFkZEV2ZW50TGlzdGVuZXIoXCJjbGlja1wiLCBmdW5jdGlvbiAoZSkge1xyXG4gICAgICAgIGlmIChlLnRhcmdldC5jbGFzc0xpc3QuY29udGFpbnMoXCJqcy1vcGVuLWRyb3Bkb3duXCIpICYmIHdpbmRvdy5zY3JlZW4ud2lkdGggPD0gNTc2KSB7XHJcbiAgICAgICAgICAgIGNvbnN0IGNhcmV0RHJvcGRvd24gPSBlLnRhcmdldC5maXJzdEVsZW1lbnRDaGlsZDtcclxuICAgICAgICAgICAgY29uc3QgZHJvcGRvd24gPSBlLnRhcmdldC5uZXh0RWxlbWVudFNpYmxpbmc7XHJcbiAgICAgICAgICAgIGlmIChkcm9wZG93bi5zdHlsZS5tYXhIZWlnaHQpIHtcclxuICAgICAgICAgICAgICAgIGRyb3Bkb3duLnN0eWxlLm1heEhlaWdodCA9IG51bGw7XHJcbiAgICAgICAgICAgICAgICBkcm9wZG93bi5zdHlsZS5vcGFjaXR5ID0gbnVsbDtcclxuICAgICAgICAgICAgICAgIGUudGFyZ2V0LmNsYXNzTGlzdC5yZW1vdmUoXCJkcm9wZG93bi1hY3RpdmVcIik7XHJcbiAgICAgICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgICAgICBkcm9wZG93bi5zdHlsZS5tYXhIZWlnaHQgPSBkcm9wZG93bi5zY3JvbGxIZWlnaHQgKyBcInB4XCI7XHJcbiAgICAgICAgICAgICAgICBkcm9wZG93bi5zdHlsZS5vcGFjaXR5ID0gMTtcclxuICAgICAgICAgICAgICAgIGUudGFyZ2V0LmNsYXNzTGlzdC5hZGQoXCJkcm9wZG93bi1hY3RpdmVcIik7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcbiAgICB9KTtcclxuXHJcbiAgICBjb25zdCBiYXNpY1Njcm9sbFRvcCA9IGZ1bmN0aW9uICgpIHtcclxuICAgICAgICBpZihkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcuanMtYnRuLWdvLXRvcCcpID09IG51bGwpIHJldHVybiBmYWxzZTtcclxuICAgICAgICBjb25zdCBidG5Ub3AgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcuanMtYnRuLWdvLXRvcCcpO1xyXG4gICAgICAgIGNvbnN0IGJ0blJldmVhbCA9IGZ1bmN0aW9uICgpIHtcclxuICAgICAgICAgICAgaWYgKHdpbmRvdy5zY3JvbGxZID49IDMwMCkge1xyXG4gICAgICAgICAgICAgICAgYnRuVG9wLmNsYXNzTGlzdC5hZGQoJ2lzLXZpc2libGUnKTtcclxuICAgICAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgICAgIGJ0blRvcC5jbGFzc0xpc3QucmVtb3ZlKCdpcy12aXNpYmxlJyk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcbiAgICAgICAgY29uc3QgVG9wc2Nyb2xsVG8gPSBmdW5jdGlvbiAoKSB7XHJcbiAgICAgICAgICAgIGlmICh3aW5kb3cuc2Nyb2xsWSAhPSAwKSB7XHJcbiAgICAgICAgICAgICAgICBzZXRUaW1lb3V0KGZ1bmN0aW9uICgpIHtcclxuICAgICAgICAgICAgICAgICAgICB3aW5kb3cuc2Nyb2xsVG8oMCwgd2luZG93LnNjcm9sbFkgLSAzMCk7XHJcbiAgICAgICAgICAgICAgICAgICAgVG9wc2Nyb2xsVG8oKTtcclxuICAgICAgICAgICAgICAgIH0sIDEwKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuICAgICAgICB3aW5kb3cuYWRkRXZlbnRMaXN0ZW5lcignc2Nyb2xsJywgYnRuUmV2ZWFsKTtcclxuICAgICAgICBidG5Ub3AuYWRkRXZlbnRMaXN0ZW5lcignY2xpY2snLCBUb3BzY3JvbGxUbyk7XHJcblxyXG4gICAgfTtcclxuICAgIGJhc2ljU2Nyb2xsVG9wKCk7XHJcblxyXG4gICAgY29uc3Qgb3Blbk1vZGFsID0gKGJ0biwgbW9kYWwpID0+IHtcclxuICAgICAgICBpZiAoZG9jdW1lbnQucXVlcnlTZWxlY3RvcihidG4pID09IG51bGwpIHJldHVybiBmYWxzZTtcclxuXHJcbiAgICAgICAgY29uc3QgbW9kYWxCdG4gPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKGJ0bik7XHJcbiAgICAgICAgY29uc3QgbW9kYWxDb250YWluZXIgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKG1vZGFsKTtcclxuXHJcbiAgICAgICAgaWYgKFxyXG4gICAgICAgICAgICBuYXZpZ2F0b3IudXNlckFnZW50Lm1hdGNoKC9pUGhvbmUvaSkgfHxcclxuICAgICAgICAgICAgbmF2aWdhdG9yLnVzZXJBZ2VudC5tYXRjaCgvaVBvZC9pKVxyXG4gICAgICAgICkge1xyXG4gICAgICAgICAgICBtb2RhbEJ0bi5hZGRFdmVudExpc3RlbmVyKFwidG91Y2hzdGFydFwiLCBmdW5jdGlvbiAoKSB7XHJcbiAgICAgICAgICAgICAgICBkb2N1bWVudC5ib2R5LmNsYXNzTGlzdC5hZGQoXCJtb2RhbC1hY3RpdmVcIik7XHJcbiAgICAgICAgICAgICAgICBtb2RhbENvbnRhaW5lci5jbGFzc0xpc3QucmVtb3ZlKFwib3V0XCIpO1xyXG4gICAgICAgICAgICAgICAgbW9kYWxDb250YWluZXIuY2xhc3NMaXN0LmFkZChcIm9wZW5lZFwiKTtcclxuICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgbW9kYWxCdG4uYWRkRXZlbnRMaXN0ZW5lcihcImNsaWNrXCIsIGZ1bmN0aW9uICgpIHtcclxuICAgICAgICAgICAgICAgIGRvY3VtZW50LmJvZHkuY2xhc3NMaXN0LmFkZChcIm1vZGFsLWFjdGl2ZVwiKTtcclxuICAgICAgICAgICAgICAgIG1vZGFsQ29udGFpbmVyLmNsYXNzTGlzdC5yZW1vdmUoXCJvdXRcIik7XHJcbiAgICAgICAgICAgICAgICBtb2RhbENvbnRhaW5lci5jbGFzc0xpc3QuYWRkKFwib3BlbmVkXCIpO1xyXG4gICAgICAgICAgICB9KTtcclxuICAgICAgICB9XHJcblxyXG5cclxuICAgICAgICBkb2N1bWVudC5hZGRFdmVudExpc3RlbmVyKFwiY2xpY2tcIiwgZnVuY3Rpb24gKGUpIHtcclxuICAgICAgICAgICAgaWYgKFxyXG4gICAgICAgICAgICAgICAgZS50YXJnZXQuY2xhc3NMaXN0LmNvbnRhaW5zKFwibW9kYWwtY29udGFpbmVyXCIpIHx8XHJcbiAgICAgICAgICAgICAgICBlLnRhcmdldC5jbGFzc0xpc3QuY29udGFpbnMoXCJtb2RhbC1jbG9zZVwiKVxyXG4gICAgICAgICAgICApIHtcclxuICAgICAgICAgICAgICAgIGRvY3VtZW50LmJvZHkuY2xhc3NMaXN0LnJlbW92ZShcIm1vZGFsLWFjdGl2ZVwiKTtcclxuICAgICAgICAgICAgICAgIG1vZGFsQ29udGFpbmVyLmNsYXNzTGlzdC5yZW1vdmUoXCJvcGVuZWRcIik7XHJcbiAgICAgICAgICAgICAgICBtb2RhbENvbnRhaW5lci5jbGFzc0xpc3QuYWRkKFwib3V0XCIpO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfSk7XHJcbiAgICAgICAgZG9jdW1lbnQuYWRkRXZlbnRMaXN0ZW5lcihcImtleWRvd25cIiwgZnVuY3Rpb24gKGUpIHtcclxuICAgICAgICAgICAgaWYgKGUua2V5Q29kZSA9PSAyNykge1xyXG4gICAgICAgICAgICAgICAgZG9jdW1lbnQuYm9keS5jbGFzc0xpc3QucmVtb3ZlKFwibW9kYWwtYWN0aXZlXCIpO1xyXG4gICAgICAgICAgICAgICAgbW9kYWxDb250YWluZXIuY2xhc3NMaXN0LnJlbW92ZShcIm9wZW5lZFwiKTtcclxuICAgICAgICAgICAgICAgIG1vZGFsQ29udGFpbmVyLmNsYXNzTGlzdC5hZGQoXCJvdXRcIik7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9KTtcclxuICAgIH07XHJcblxyXG4gICAgb3Blbk1vZGFsKFwiLmpzLXByb2R1Y3QtY29tcGFyZVwiLCBcIi5qcy1tb2RhbC1wcm9kdWN0LWNvbXBhcmVcIik7XHJcbiAgICBvcGVuTW9kYWwoXCIuanMtcHJvZHVjdC1jb21wYXJlLW1vYmlsZVwiLCBcIi5qcy1tb2RhbC1wcm9kdWN0LWNvbXBhcmVcIik7XHJcbiAgICBvcGVuTW9kYWwoXCIuanMtYWRkLXJldmlld1wiLCBcIi5qcy1tb2RhbC1hZGQtcmV2aWV3XCIpO1xyXG4gICAgb3Blbk1vZGFsKFwiLmpzLWFkZC1xdWVzdGlvblwiLCBcIi5qcy1tb2RhbC1hZGQtcXVlc3Rpb25cIik7XHJcblxyXG4gICAgY29uc3Qgc2VlTW9yZSA9IChudW1iZXIsIGVsZW1lbnRzLCBidXR0b24pID0+IHtcclxuXHJcbiAgICAgICAgaWYgKGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoYnV0dG9uKSA9PSBudWxsKSB7XHJcbiAgICAgICAgICAgIHJldHVybiBmYWxzZTtcclxuICAgICAgICB9XHJcbiAgICAgICAgd2luZG93LmFkZEV2ZW50TGlzdGVuZXIoXCJsb2FkXCIsICgpID0+IHNob3dIaWRlQmxvY2tzKG51bWJlciwgZWxlbWVudHMsIGJ1dHRvbikpO1xyXG4gICAgICAgIHdpbmRvdy5hZGRFdmVudExpc3RlbmVyKFwicmVzaXplXCIsICgpID0+IHNob3dIaWRlQmxvY2tzKG51bWJlciwgZWxlbWVudHMsIGJ1dHRvbikpO1xyXG5cclxuICAgICAgICBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKGJ1dHRvbikuYWRkRXZlbnRMaXN0ZW5lcihcImNsaWNrXCIsIGZ1bmN0aW9uICgpIHtcclxuICAgICAgICAgICAgaWYgKHRoaXMudGV4dENvbnRlbnQgPT0gXCJTZWUgbW9yZVwiKSB7XHJcbiAgICAgICAgICAgICAgICB0aGlzLnRleHRDb250ZW50ID0gXCJTZWUgbGVzc1wiO1xyXG4gICAgICAgICAgICAgICAgdGhpcy5jbGFzc0xpc3QuYWRkKFwiYWN0aXZlXCIpO1xyXG4gICAgICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICAgICAgdGhpcy50ZXh0Q29udGVudCA9IFwiU2VlIG1vcmVcIjtcclxuICAgICAgICAgICAgICAgIHRoaXMuY2xhc3NMaXN0LnJlbW92ZShcImFjdGl2ZVwiKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICBkb2N1bWVudC5xdWVyeVNlbGVjdG9yQWxsKGVsZW1lbnRzKS5mb3JFYWNoKChlbGVtLCBpbmRleCkgPT4ge1xyXG4gICAgICAgICAgICAgICAgaWYgKGVsZW0uc3R5bGUuZGlzcGxheSA9PSBcIm5vbmVcIikge1xyXG4gICAgICAgICAgICAgICAgICAgIGVsZW0uc3R5bGUuZGlzcGxheSA9IG51bGw7XHJcbiAgICAgICAgICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICAgICAgICAgIGlmIChpbmRleCA+IG51bWJlcikge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBlbGVtLnN0eWxlLmRpc3BsYXkgPSAnbm9uZSc7XHJcbiAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB9KTtcclxuICAgICAgICB9KTtcclxuXHJcbiAgICAgICAgZnVuY3Rpb24gc2hvd0hpZGVCbG9ja3MobnVtYmVyLCBlbGVtZW50cywgYnV0dG9uKSB7XHJcbiAgICAgICAgICAgIGNvbnN0IGVsZW1zID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvckFsbChlbGVtZW50cyk7XHJcbiAgICAgICAgICAgIGNvbnN0IGJ0blNob3dIaWRlID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcihidXR0b24pO1xyXG5cclxuICAgICAgICAgICAgaWYgKHdpbmRvdy5zY3JlZW4ud2lkdGggPD0gODAwICYmIGVsZW1zLmxlbmd0aCA+IG51bWJlcikge1xyXG4gICAgICAgICAgICAgICAgZWxlbXMuZm9yRWFjaCgoZWxlbSwgaW5kZXgpID0+IHtcclxuICAgICAgICAgICAgICAgICAgICBpZiAoaW5kZXggPiBudW1iZXIpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgZWxlbS5zdHlsZS5kaXNwbGF5ID0gJ25vbmUnO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBidG5TaG93SGlkZS5zdHlsZS5kaXNwbGF5ID0gbnVsbDtcclxuICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICB9KTtcclxuICAgICAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgICAgIGVsZW1zLmZvckVhY2goKGVsZW0sIGluZGV4KSA9PiB7XHJcbiAgICAgICAgICAgICAgICAgICAgZWxlbS5zdHlsZS5kaXNwbGF5ID0gbnVsbDtcclxuICAgICAgICAgICAgICAgICAgICBidG5TaG93SGlkZS5zdHlsZS5kaXNwbGF5ID0gJ25vbmUnO1xyXG4gICAgICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcbiAgICB9O1xyXG5cclxuICAgIHNlZU1vcmUoMywgJy5wcm9kdWN0LWNvbXBhcmUtdG9wX19pdGVtJywgJy5qcy1zZWUtbW9yZS1wcm9kdWN0cycpO1xyXG4gICAgc2VlTW9yZSgxLCAnLmhlbHAtY2VudGVyX19pdGVtJywgJy5qcy1zZWUtbW9yZS1oZWxwJyk7XHJcblxyXG4gICAgY29uc3Qgc2hvd0l0ZW1zID0gKG51bWJlckRlc2t0b3AsIG51bWJlck1vYmlsZSwgaXRlbXMsIGJ1dHRvbikgPT4ge1xyXG4gICAgICAgIGlmIChkb2N1bWVudC5xdWVyeVNlbGVjdG9yQWxsKGl0ZW1zKS5sZW5ndGggPT0gMCkgcmV0dXJuIGZhbHNlO1xyXG5cclxuICAgICAgICBjb25zdCBidG4gPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKGJ1dHRvbik7XHJcblxyXG4gICAgICAgIHdpbmRvdy5hZGRFdmVudExpc3RlbmVyKFwibG9hZFwiLCBzaG93SGlkZUl0ZW1zKTtcclxuICAgICAgICB3aW5kb3cuYWRkRXZlbnRMaXN0ZW5lcihcInJlc2l6ZVwiLCBzaG93SGlkZUl0ZW1zKTtcclxuXHJcbiAgICAgICAgZnVuY3Rpb24gc2hvd0hpZGVJdGVtcygpIHtcclxuICAgICAgICAgICAgY29uc3QgZWxzID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvckFsbChpdGVtcyk7XHJcbiAgICAgICAgICAgIGNvbnN0IGJ0biA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoYnV0dG9uKTtcclxuICAgICAgICAgICAgaWYgKHdpbmRvdy5zY3JlZW4ud2lkdGggPiA1NzcpIHtcclxuICAgICAgICAgICAgICAgIGlmIChlbHMubGVuZ3RoID4gbnVtYmVyRGVza3RvcCkge1xyXG4gICAgICAgICAgICAgICAgICAgIGJ0bi5zdHlsZS5kaXNwbGF5ID0gbnVsbDtcclxuICAgICAgICAgICAgICAgICAgICBlbHMuZm9yRWFjaCgoZWwsIGkpID0+IHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgaWYgKGkgPiBudW1iZXJEZXNrdG9wIC0gMSkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgZWwuc3R5bGUuZGlzcGxheSA9IFwibm9uZVwiXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBlbC5zdHlsZS5kaXNwbGF5ID0gbnVsbDtcclxuICAgICAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgIH0pO1xyXG4gICAgICAgICAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgICAgICAgICBidG4uc3R5bGUuZGlzcGxheSA9IFwibm9uZVwiO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICAgICAgaWYgKGVscy5sZW5ndGggPiBudW1iZXJNb2JpbGUpIHtcclxuICAgICAgICAgICAgICAgICAgICBidG4uc3R5bGUuZGlzcGxheSA9IG51bGw7XHJcbiAgICAgICAgICAgICAgICAgICAgZWxzLmZvckVhY2goKGVsLCBpKSA9PiB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGlmIChpID4gbnVtYmVyTW9iaWxlIC0gMSkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgZWwuc3R5bGUuZGlzcGxheSA9IFwibm9uZVwiXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBlbC5zdHlsZS5kaXNwbGF5ID0gbnVsbDtcclxuICAgICAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgIH0pO1xyXG4gICAgICAgICAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgICAgICAgICBidG4uc3R5bGUuZGlzcGxheSA9IFwibm9uZVwiO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBidG4uYWRkRXZlbnRMaXN0ZW5lcihcImNsaWNrXCIsIGZ1bmN0aW9uICgpIHtcclxuICAgICAgICAgICAgY29uc3QgZWxlbXMgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yQWxsKGl0ZW1zKTtcclxuICAgICAgICAgICAgaWYgKHRoaXMudGV4dENvbnRlbnQgPT0gXCJTZWUgbW9yZVwiKSB7XHJcbiAgICAgICAgICAgICAgICB0aGlzLnRleHRDb250ZW50ID0gXCJTZWUgbGVzc1wiO1xyXG4gICAgICAgICAgICAgICAgdGhpcy5jbGFzc0xpc3QuYWRkKFwiYWN0aXZlXCIpO1xyXG4gICAgICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICAgICAgdGhpcy50ZXh0Q29udGVudCA9IFwiU2VlIG1vcmVcIjtcclxuICAgICAgICAgICAgICAgIHRoaXMuY2xhc3NMaXN0LnJlbW92ZShcImFjdGl2ZVwiKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICBlbGVtcy5mb3JFYWNoKChlbGVtLCBpbmRleCkgPT4ge1xyXG4gICAgICAgICAgICAgICAgaWYgKGVsZW0uc3R5bGUuZGlzcGxheSA9PSBcIm5vbmVcIikge1xyXG4gICAgICAgICAgICAgICAgICAgIGVsZW0uc3R5bGUuZGlzcGxheSA9IG51bGw7XHJcbiAgICAgICAgICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICAgICAgICAgIGlmICgod2luZG93LnNjcmVlbi53aWR0aCA+IDU3NyAmJiBpbmRleCA+IG51bWJlckRlc2t0b3AgLSAxKSB8fCAod2luZG93LnNjcmVlbi53aWR0aCA8IDU3NyAmJiBpbmRleCA+IG51bWJlck1vYmlsZSAtIDEpKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGVsZW0uc3R5bGUuZGlzcGxheSA9ICdub25lJztcclxuICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIH0pO1xyXG4gICAgICAgIH0pO1xyXG4gICAgfVxyXG5cclxuICAgIHNob3dJdGVtcyg4LCA0LCBcIi5icmFuZHMtbGlzdF9faXRlbVwiLCBcIi5qcy1zZWUtbW9yZS1icmFuZHNcIik7XHJcbiAgICBzaG93SXRlbXMoMywgMiwgXCIuc2VvLWJsb2NrXCIsIFwiLmpzLXNlZS1tb3JlLXNlb1wiKTtcclxuICAgIHNob3dJdGVtcygzLCAyLCBcIi5qcy1yZWxhdGVkLWl0ZW1cIiwgXCIuanMtc2VlLXBvc3RzXCIpO1xyXG5cclxuICAgIGNvbnN0IHNob3dGb290ZXJMaW5rcyA9ICgpID0+IHtcclxuICAgICAgICBjb25zdCBmb290ZXJUaXRsZSA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3JBbGwoJy5mb290ZXJfX3RpdGxlJyk7XHJcbiAgICAgICAgY29uc3QgZm9vdGVyTGlua3MgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yQWxsKCcuZm9vdGVyX19saW5rcycpO1xyXG5cclxuICAgICAgICAvLyB3aW5kb3cuYWRkRXZlbnRMaXN0ZW5lcignbG9hZCcsICgpID0+IHNob3dIaWRlTGlua3MpO1xyXG4gICAgICAgIHdpbmRvdy5hZGRFdmVudExpc3RlbmVyKCdyZXNpemUnLCAoKSA9PiB7XHJcbiAgICAgICAgICAgIGlmICh3aW5kb3cuc2NyZWVuLndpZHRoIDw9IDU3Nikge1xyXG4gICAgICAgICAgICAgICAgZm9vdGVyTGlua3MuZm9yRWFjaChmb290ZXJMaW5rID0+IHtcclxuICAgICAgICAgICAgICAgICAgICBmb290ZXJMaW5rLnN0eWxlLm1heEhlaWdodCA9IDA7XHJcbiAgICAgICAgICAgICAgICB9KTtcclxuICAgICAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgICAgIGZvb3RlckxpbmtzLmZvckVhY2goZm9vdGVyTGluayA9PiB7XHJcbiAgICAgICAgICAgICAgICAgICAgZm9vdGVyTGluay5zdHlsZS5tYXhIZWlnaHQgPSBudWxsO1xyXG4gICAgICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9KTtcclxuXHJcbiAgICAgICAgZm9vdGVyVGl0bGUuZm9yRWFjaCh0aXRsZSA9PiB7XHJcbiAgICAgICAgICAgIHRpdGxlLmFkZEV2ZW50TGlzdGVuZXIoJ2NsaWNrJywgZnVuY3Rpb24gKCkge1xyXG4gICAgICAgICAgICAgICAgY29uc3QgZm9vdGVyTGlua3MgPSB0aGlzLm5leHRFbGVtZW50U2libGluZztcclxuICAgICAgICAgICAgICAgIGlmIChnZXRDb21wdXRlZFN0eWxlKGZvb3RlckxpbmtzKS5tYXhIZWlnaHQgPT0gJzBweCcpIHtcclxuICAgICAgICAgICAgICAgICAgICB0aGlzLmNsYXNzTGlzdC5hZGQoJ2FjdGl2ZScpO1xyXG4gICAgICAgICAgICAgICAgICAgIGZvb3RlckxpbmtzLnN0eWxlLm1heEhlaWdodCA9IGZvb3RlckxpbmtzLnNjcm9sbEhlaWdodCArIFwicHhcIjtcclxuICAgICAgICAgICAgICAgICAgICBmb290ZXJMaW5rcy5zdHlsZS5vcGFjaXR5ID0gMTtcclxuICAgICAgICAgICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5jbGFzc0xpc3QucmVtb3ZlKCdhY3RpdmUnKTtcclxuICAgICAgICAgICAgICAgICAgICBmb290ZXJMaW5rcy5zdHlsZS5tYXhIZWlnaHQgPSBudWxsO1xyXG4gICAgICAgICAgICAgICAgICAgIGZvb3RlckxpbmtzLnN0eWxlLm9wYWNpdHkgPSBudWxsO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB9KVxyXG4gICAgICAgIH0pO1xyXG4gICAgfVxyXG5cclxuICAgIHNob3dGb290ZXJMaW5rcygpO1xyXG5cclxuICAgIGNvbnN0IHNob3dTaWRlYmFySXRlbXMgPSAoKSA9PiB7XHJcbiAgICAgICAgaWYgKGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3JBbGwoXCIuanMtc2lkZWJhci1zZWUtbW9yZVwiKS5sZW5ndGggPT0gMCkgcmV0dXJuIGZhbHNlO1xyXG5cclxuICAgICAgICBjb25zdCBzaWRlYmFyU2VlTW9yZSA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3JBbGwoXCIuanMtc2lkZWJhci1zZWUtbW9yZVwiKTtcclxuXHJcbiAgICAgICAgc2lkZWJhclNlZU1vcmUuZm9yRWFjaChlbCA9PiB7XHJcbiAgICAgICAgICAgIGNvbnN0IHNpZGViYXJJdGVtcyA9IGVsLnByZXZpb3VzRWxlbWVudFNpYmxpbmcuY2hpbGRyZW47XHJcbiAgICAgICAgICAgIGlmIChzaWRlYmFySXRlbXMubGVuZ3RoID4gMykge1xyXG4gICAgICAgICAgICAgICAgZm9yIChsZXQgaSA9IDAsIGxlbiA9IHNpZGViYXJJdGVtcy5sZW5ndGg7IGkgPCBsZW47IGkrKykge1xyXG4gICAgICAgICAgICAgICAgICAgIGlmIChpID4gMikge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBzaWRlYmFySXRlbXNbaV0uc3R5bGUuZGlzcGxheSA9IFwibm9uZVwiO1xyXG4gICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIGVsLmFkZEV2ZW50TGlzdGVuZXIoXCJjbGlja1wiLCAoKSA9PiB7XHJcbiAgICAgICAgICAgICAgICAgICAgZm9yIChsZXQgaSA9IDAsIGxlbiA9IHNpZGViYXJJdGVtcy5sZW5ndGg7IGkgPCBsZW47IGkrKykge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBpZiAoaSA+IDIpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGlmKHNpZGViYXJJdGVtc1tpXS5zdHlsZS5kaXNwbGF5ID09IFwibm9uZVwiKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgc2lkZWJhckl0ZW1zW2ldLnN0eWxlLmRpc3BsYXkgPSBudWxsO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGVsLnRleHRDb250ZW50ID0gXCJTZWUgbGVzc1wiO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGVsLmNsYXNzTGlzdC5hZGQoXCJhY3RpdmVcIik7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHNpZGViYXJJdGVtc1tpXS5zdHlsZS5kaXNwbGF5ID0gXCJub25lXCI7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgZWwudGV4dENvbnRlbnQgPSBcIlNlZSBtb3JlXCI7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgZWwuY2xhc3NMaXN0LnJlbW92ZShcImFjdGl2ZVwiKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIH0pO1xyXG4gICAgICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICAgICAgZWwuc3R5bGUuZGlzcGxheSA9IFwibm9uZVwiO1xyXG4gICAgICAgICAgICB9XHJcblxyXG4gICAgICAgIH0pO1xyXG4gICAgfVxyXG5cclxuICAgIHNob3dTaWRlYmFySXRlbXMoKTtcclxuXHJcbiAgICBjb25zdCBzZXRQZXJjZW50ID0gKCkgPT4ge1xyXG4gICAgICAgIGNvbnN0IGNpcmN1bGFyUHJvZ3Jlc3MgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yQWxsKFwiLmpzLWNpcmN1bGFyLXByb2dyZXNzXCIpO1xyXG5cclxuICAgICAgICBjaXJjdWxhclByb2dyZXNzLmZvckVhY2goaXRlbSA9PiB7XHJcbiAgICAgICAgICAgIGNvbnN0IGNpcmNsZSA9IGl0ZW0ucXVlcnlTZWxlY3RvcignLmNpcmN1bGFyLXByb2dyZXNzX19wZXJjZW50Jyk7XHJcbiAgICAgICAgICAgIGNvbnN0IHRleHQgPSBpdGVtLnF1ZXJ5U2VsZWN0b3IoJy5jaXJjdWxhci1pbmZvX19udW1iZXInKTtcclxuICAgICAgICAgICAgY29uc3QgZGF0YVBlcmNlbnQgPSBpdGVtLmdldEF0dHJpYnV0ZSgnZGF0YS1wZXJjZW50Jyk7XHJcbiAgICAgICAgICAgIGNvbnN0IHBlcmNlbnQgPSAoMTAwIC0gZGF0YVBlcmNlbnQpIC8gMTAwO1xyXG4gICAgICAgICAgICBjaXJjbGUuc3R5bGUuc3Ryb2tlRGFzaG9mZnNldCA9IGBjYWxjKDIqMzAqMy4xNCoke3BlcmNlbnR9KWA7XHJcbiAgICAgICAgICAgIHRleHQudGV4dENvbnRlbnQgPSBkYXRhUGVyY2VudDtcclxuICAgICAgICB9KTtcclxuICAgIH1cclxuXHJcbiAgICBzZXRQZXJjZW50KCk7XHJcblxyXG4gICAgZG9jdW1lbnQuYWRkRXZlbnRMaXN0ZW5lcihcImJsdXJcIiwgZnVuY3Rpb24gKGUpIHtcclxuICAgICAgICBpZiAoZS50YXJnZXQuY2xhc3NMaXN0LmNvbnRhaW5zKCdjb250YWN0LWZvcm1fX2ZpZWxkJykgfHwgZS50YXJnZXQuY2xhc3NMaXN0LmNvbnRhaW5zKCdjb250YWN0LWZvcm1fX21lc3NhZ2UnKSkge1xyXG4gICAgICAgICAgICBpZiAoZS50YXJnZXQudmFsdWUudHJpbSgpICE9ICcnKSB7XHJcbiAgICAgICAgICAgICAgICBlLnRhcmdldC5uZXh0RWxlbWVudFNpYmxpbmcuY2xhc3NMaXN0LmFkZCgnYWN0aXZlJyk7XHJcbiAgICAgICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgICAgICBlLnRhcmdldC5uZXh0RWxlbWVudFNpYmxpbmcuY2xhc3NMaXN0LnJlbW92ZSgnYWN0aXZlJyk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcbiAgICB9LCB0cnVlKTtcclxuXHJcbiAgICBjb25zdCBwcmljZVNsaWRlciA9ICgpID0+IHtcclxuICAgICAgICBjb25zdCByYW5nZUlucHV0cyA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3JBbGwoXCIucHJpY2UtcmFuZ2VfX2lucHV0XCIpLFxyXG4gICAgICAgICAgICBwcmljZUlucHV0cyA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3JBbGwoXCIucHJpY2UtaW5wdXRfX2ZpZWxkXCIpLFxyXG4gICAgICAgICAgICBwcm9ncmVzcyA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoXCIucHJpY2Utc2xpZGVyX19wcm9ncmVzc1wiKTtcclxuXHJcbiAgICAgICAgbGV0IHByaWNlR2FwID0gNTAwO1xyXG5cclxuICAgICAgICBwcmljZUlucHV0cy5mb3JFYWNoKChwcmljZUlucHV0KSA9PiB7XHJcbiAgICAgICAgICAgIHByaWNlSW5wdXQuYWRkRXZlbnRMaXN0ZW5lcihcImlucHV0XCIsIChlKSA9PiB7XHJcbiAgICAgICAgICAgICAgICBsZXQgbWluVmFsID0gcGFyc2VJbnQocHJpY2VJbnB1dHNbMF0udmFsdWUpLFxyXG4gICAgICAgICAgICAgICAgICAgIG1heFZhbCA9IHBhcnNlSW50KHByaWNlSW5wdXRzWzFdLnZhbHVlKTtcclxuXHJcbiAgICAgICAgICAgICAgICBpZiAobWF4VmFsIC0gbWluVmFsID49IHByaWNlR2FwICYmIG1heFZhbCA8PSA1MDAwMCkge1xyXG4gICAgICAgICAgICAgICAgICAgIGlmIChlLnRhcmdldC5jbGFzc0xpc3QuY29udGFpbnMoXCJwcmljZS1taW5cIikpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgcmFuZ2VJbnB1dHNbMF0udmFsdWUgPSBtaW5WYWw7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHByb2dyZXNzLnN0eWxlLmxlZnQgPSAobWluVmFsIC8gcmFuZ2VJbnB1dHNbMF0ubWF4KSAqIDEwMCArIFwiJVwiO1xyXG4gICAgICAgICAgICAgICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHJhbmdlSW5wdXRzWzFdLnZhbHVlID0gbWF4VmFsO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBwcm9ncmVzcy5zdHlsZS5yaWdodCA9IDEwMCAtIChtYXhWYWwgLyByYW5nZUlucHV0c1sxXS5tYXgpICogMTAwICsgXCIlXCI7XHJcbiAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB9KTtcclxuICAgICAgICB9KTtcclxuXHJcbiAgICAgICAgcmFuZ2VJbnB1dHMuZm9yRWFjaCgocmFuZ2VJbnB1dCkgPT4ge1xyXG4gICAgICAgICAgICByYW5nZUlucHV0LmFkZEV2ZW50TGlzdGVuZXIoXCJpbnB1dFwiLCAoZSkgPT4ge1xyXG4gICAgICAgICAgICAgICAgbGV0IG1pblZhbCA9IHBhcnNlSW50KHJhbmdlSW5wdXRzWzBdLnZhbHVlKSxcclxuICAgICAgICAgICAgICAgICAgICBtYXhWYWwgPSBwYXJzZUludChyYW5nZUlucHV0c1sxXS52YWx1ZSk7XHJcblxyXG4gICAgICAgICAgICAgICAgaWYgKG1heFZhbCAtIG1pblZhbCA8IHByaWNlR2FwKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgaWYgKGUudGFyZ2V0LmNsYXNzTGlzdC5jb250YWlucyhcInJhbmdlLW1pblwiKSkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICByYW5nZUlucHV0c1swXS52YWx1ZSA9IG1heFZhbCAtIHByaWNlR2FwO1xyXG4gICAgICAgICAgICAgICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHJhbmdlSW5wdXRzWzFdLnZhbHVlID0gbWluVmFsICsgcHJpY2VHYXA7XHJcbiAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgICAgICAgICBwcmljZUlucHV0c1swXS52YWx1ZSA9IG1pblZhbDtcclxuICAgICAgICAgICAgICAgICAgICBwcmljZUlucHV0c1sxXS52YWx1ZSA9IG1heFZhbDtcclxuICAgICAgICAgICAgICAgICAgICBwcm9ncmVzcy5zdHlsZS5sZWZ0ID0gKG1pblZhbCAvIHJhbmdlSW5wdXRzWzBdLm1heCkgKiAxMDAgKyBcIiVcIjtcclxuICAgICAgICAgICAgICAgICAgICBwcm9ncmVzcy5zdHlsZS5yaWdodCA9IDEwMCAtIChtYXhWYWwgLyByYW5nZUlucHV0c1sxXS5tYXgpICogMTAwICsgXCIlXCI7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIH0pO1xyXG4gICAgICAgIH0pO1xyXG5cclxuICAgICAgICBmdW5jdGlvbiBhZGRTcGFjZXModmFsdWUpIHtcclxuICAgICAgICAgICAgdmFsdWUgPSB2YWx1ZS5yZXBsYWNlKC8gL2csICcnKTtcclxuICAgICAgICAgICAgcmV0dXJuIHZhbHVlLnJlcGxhY2UoL1xcQig/PShcXGR7M30pKyg/IVxcZCkpL2csIFwiIFwiKTtcclxuICAgICAgICB9XHJcbiAgICB9O1xyXG5cclxuICAgIHByaWNlU2xpZGVyKCk7XHJcblxyXG4gICAgY29uc3Qgdmlld0FsbCA9ICgpID0+IHtcclxuICAgICAgICBpZiAoZG9jdW1lbnQucXVlcnlTZWxlY3RvckFsbChcIi5maWx0ZXItdmlldy1hbGxcIikubGVuZ3RoID09IDApIHJldHVybiBmYWxzZTtcclxuICAgICAgICBjb25zdCBmaWx0ZXJMaXN0ID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvckFsbChcIi5maWx0ZXItbGlzdFwiKTtcclxuICAgICAgICBjb25zdCB2aWV3QWxsID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvckFsbChcIi5maWx0ZXItdmlldy1hbGxcIik7XHJcblxyXG4gICAgICAgIGZpbHRlckxpc3QuZm9yRWFjaChsaXN0ID0+IHtcclxuICAgICAgICAgICAgaWYgKGxpc3QuY2hpbGRyZW4ubGVuZ3RoID4gNSkge1xyXG4gICAgICAgICAgICAgICAgY29uc3QgaXRlbXMgPSBsaXN0LmNoaWxkcmVuO1xyXG4gICAgICAgICAgICAgICAgY29uc3Qgdmlld0FsbCA9IGxpc3QubmV4dEVsZW1lbnRTaWJsaW5nO1xyXG4gICAgICAgICAgICAgICAgZm9yIChsZXQgaSA9IDAsIGxlbiA9IGl0ZW1zLmxlbmd0aDsgaSA8IGxlbjsgaSsrKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgaWYgKGkgPj0gNSkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBpdGVtc1tpXS5zdHlsZS5kaXNwbGF5ID0gXCJub25lXCI7XHJcbiAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgdmlld0FsbC5zdHlsZS5kaXNwbGF5ID0gXCJibG9ja1wiO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfSk7XHJcblxyXG4gICAgICAgIHZpZXdBbGwuZm9yRWFjaChlbCA9PiB7XHJcbiAgICAgICAgICAgIGVsLmFkZEV2ZW50TGlzdGVuZXIoXCJjbGlja1wiLCBmdW5jdGlvbiAoKSB7XHJcbiAgICAgICAgICAgICAgICBjb25zdCBmaWx0ZXJJdGVtcyA9IHRoaXMucHJldmlvdXNFbGVtZW50U2libGluZy5jaGlsZHJlbjtcclxuICAgICAgICAgICAgICAgIGNvbnN0IGZpbHRlckNvbnRlbnQgPSB0aGlzLmNsb3Nlc3QoXCIuZmlsdGVyLWNvbnRlbnRcIik7XHJcbiAgICAgICAgICAgICAgICBmb3IgKGxldCBpID0gMCwgbGVuID0gZmlsdGVySXRlbXMubGVuZ3RoOyBpIDwgbGVuOyBpKyspIHtcclxuICAgICAgICAgICAgICAgICAgICBpZiAoaSA+PSA1KSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGlmIChmaWx0ZXJJdGVtc1tpXS5zdHlsZS5kaXNwbGF5KSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBmaWx0ZXJJdGVtc1tpXS5zdHlsZS5kaXNwbGF5ID0gbnVsbDtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMudGV4dENvbnRlbnQgPSBcIkhpZGVcIlxyXG4gICAgICAgICAgICAgICAgICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgZmlsdGVySXRlbXNbaV0uc3R5bGUuZGlzcGxheSA9IFwibm9uZVwiO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy50ZXh0Q29udGVudCA9IFwiVmlldyBhbGxcIlxyXG4gICAgICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgZmlsdGVyQ29udGVudC5zdHlsZS5tYXhIZWlnaHQgPSBmaWx0ZXJDb250ZW50LnNjcm9sbEhlaWdodCArIFwicHhcIjtcclxuICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgfSk7XHJcbiAgICB9XHJcblxyXG4gICAgdmlld0FsbCgpO1xyXG5cclxuICAgIGNvbnN0IGlucHV0VmFsdWUgPSAoKSA9PiB7XHJcbiAgICAgICAgY29uc3QgaW5wdXRGaWVsZCA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoXCIucHJvZHVjdC1jb21wYXJlLWZvcm1fX2ZpZWxkXCIpO1xyXG4gICAgICAgIGNvbnN0IGFkZFZhbHVlQnRucyA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3JBbGwoXCIuanMtY29tcGFyZVwiKTtcclxuICAgICAgICBhZGRWYWx1ZUJ0bnMuZm9yRWFjaChhZGRWYWx1ZUJ0biA9PiB7XHJcbiAgICAgICAgICAgIGFkZFZhbHVlQnRuLmFkZEV2ZW50TGlzdGVuZXIoXCJjbGlja1wiLCBmdW5jdGlvbiAoKSB7XHJcbiAgICAgICAgICAgICAgICBjb25zdCB2YWwgPSB0aGlzLnByZXZpb3VzRWxlbWVudFNpYmxpbmcudGV4dENvbnRlbnQ7XHJcbiAgICAgICAgICAgICAgICBpbnB1dEZpZWxkLnZhbHVlID0gdmFsO1xyXG4gICAgICAgICAgICB9KTtcclxuICAgICAgICB9KTtcclxuICAgIH1cclxuXHJcbiAgICBpbnB1dFZhbHVlKCk7XHJcblxyXG4gICAgJChcIi5qcy1wcm9kdWN0LXNsaWRlci1wcmV2aWV3XCIpLnNsaWNrKHtcclxuICAgICAgICBzbGlkZXNUb1Nob3c6IDQsXHJcbiAgICAgICAgdmVydGljYWw6IHRydWUsXHJcbiAgICAgICAgdmVydGljYWxTd2lwaW5nOiB0cnVlLFxyXG4gICAgICAgIHNsaWRlc1RvU2Nyb2xsOiAxLFxyXG4gICAgICAgIGZvY3VzT25TZWxlY3Q6IHRydWUsXHJcbiAgICAgICAgcHJldkFycm93OiBcIi5wcm9kdWN0LXNsaWRlci1wcmV2aWV3X19idG4tLXByZXZcIixcclxuICAgICAgICBuZXh0QXJyb3c6IFwiLnByb2R1Y3Qtc2xpZGVyLXByZXZpZXdfX2J0bi0tbmV4dFwiLFxyXG4gICAgICAgIHZhcmlhYmxlV2lkdGg6IHRydWUsXHJcbiAgICAgICAgYXNOYXZGb3I6IFwiLnByb2R1Y3Qtc2xpZGVyLW1haW5cIlxyXG4gICAgfSk7XHJcbiAgICAkKFwiLnByb2R1Y3Qtc2xpZGVyLW1haW5cIikuc2xpY2soe1xyXG4gICAgICAgIHNsaWRlc1RvU2hvdzogMSxcclxuICAgICAgICBzbGlkZXNUb1Njcm9sbDogMSxcclxuICAgICAgICBhcnJvd3M6IGZhbHNlLFxyXG4gICAgICAgIGZhZGU6IHRydWUsXHJcbiAgICAgICAgYXNOYXZGb3I6IFwiLmpzLXByb2R1Y3Qtc2xpZGVyLXByZXZpZXdcIlxyXG4gICAgfSk7XHJcbiAgICAkKFwiLmpzLXByb2R1Y3QtY29tcGFyZS1zbGlkZXJcIikuc2xpY2soe1xyXG4gICAgICAgIHNsaWRlc1RvU2hvdzogMSxcclxuICAgICAgICBzbGlkZXNUb1Njcm9sbDogMSxcclxuICAgICAgICBwcmV2QXJyb3c6IFwiLnByb2R1Y3QtY29tcGFyZS1zbGlkZXJfX2J0bi0tcHJldlwiLFxyXG4gICAgICAgIG5leHRBcnJvdzogXCIucHJvZHVjdC1jb21wYXJlLXNsaWRlcl9fYnRuLS1uZXh0XCIsXHJcbiAgICAgICAgLy8gdmFyaWFibGVXaWR0aDogdHJ1ZSxcclxuICAgIH0pO1xyXG4gICAgJChcIi5qcy1yZWxhdGVkLXByb2R1Y3RzLXNsaWRlclwiKS5zbGljayh7XHJcbiAgICAgICAgc2xpZGVzVG9TaG93OiAzLFxyXG4gICAgICAgIHNsaWRlc1RvU2Nyb2xsOiAxLFxyXG4gICAgICAgIHByZXZBcnJvdzogXCIuanMtcmVsYXRlZC1wcmV2XCIsXHJcbiAgICAgICAgbmV4dEFycm93OiBcIi5qcy1yZWxhdGVkLW5leHRcIixcclxuICAgICAgICByZXNwb25zaXZlOiBbXHJcbiAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICAgIGJyZWFrcG9pbnQ6IDc2OCxcclxuICAgICAgICAgICAgICAgIHNldHRpbmdzOiB7XHJcbiAgICAgICAgICAgICAgICAgICAgc2xpZGVzVG9TaG93OiAyLFxyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB9LFxyXG4gICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgICBicmVha3BvaW50OiA1NzYsXHJcbiAgICAgICAgICAgICAgICBzZXR0aW5nczoge1xyXG4gICAgICAgICAgICAgICAgICAgIHNsaWRlc1RvU2hvdzogMSxcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgfSxcclxuICAgICAgICBdXHJcbiAgICB9KTtcclxuICAgICQoXCIuanMtcmVzZW50bHktdmlld2VkLXNsaWRlclwiKS5zbGljayh7XHJcbiAgICAgICAgc2xpZGVzVG9TaG93OiA0LFxyXG4gICAgICAgIHNsaWRlc1RvU2Nyb2xsOiAxLFxyXG4gICAgICAgIHByZXZBcnJvdzogXCIuanMtcmVzZW50bHktdmlld2VkLXByZXZcIixcclxuICAgICAgICBuZXh0QXJyb3c6IFwiLmpzLXJlc2VudGx5LXZpZXdlZC1uZXh0XCIsXHJcbiAgICAgICAgcmVzcG9uc2l2ZTogW1xyXG4gICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgICBicmVha3BvaW50OiA5OTMsXHJcbiAgICAgICAgICAgICAgICBzZXR0aW5nczoge1xyXG4gICAgICAgICAgICAgICAgICAgIHNsaWRlc1RvU2hvdzogMyxcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgfSxcclxuICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgYnJlYWtwb2ludDogNzY5LFxyXG4gICAgICAgICAgICAgICAgc2V0dGluZ3M6IHtcclxuICAgICAgICAgICAgICAgICAgICBzbGlkZXNUb1Nob3c6IDIsXHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIH0sXHJcbiAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICAgIGJyZWFrcG9pbnQ6IDU3NyxcclxuICAgICAgICAgICAgICAgIHNldHRpbmdzOiB7XHJcbiAgICAgICAgICAgICAgICAgICAgc2xpZGVzVG9TaG93OiAxLFxyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB9LFxyXG4gICAgICAgIF1cclxuICAgIH0pO1xyXG4gICAgJCgnYm9keScpLm9uKCdrZXl1cCcsICcuanMtc2VhcmNoLW1hdGNoZXMnLCBmdW5jdGlvbiAoKSB7XHJcbiAgICAgICAgbGV0IHNlbGYgPSAkKHRoaXMpO1xyXG4gICAgICAgIGxldCBsaXN0ID0gJCgnLicgKyBzZWxmLmRhdGEoJ2xpc3QnKSk7XHJcbiAgICAgICAgJC5hamF4KHtcclxuICAgICAgICAgICAgdXJsOiBzZWxmLmRhdGEoJ3VybCcpICsgJz9xPScgKyBzZWxmLnZhbCgpLFxyXG4gICAgICAgICAgICB0eXBlOiAnR0VUJyxcclxuICAgICAgICAgICAgZGF0YVR5cGU6ICdqc29uJyxcclxuICAgICAgICAgICAgc3VjY2VzczogZnVuY3Rpb24gKHJlc3BvbnNlKSB7XHJcbiAgICAgICAgICAgICAgICBsaXN0LmVtcHR5KCk7XHJcblxyXG4gICAgICAgICAgICAgICAgaWYgKHJlc3BvbnNlLml0ZW1zLmxlbmd0aCkge1xyXG4gICAgICAgICAgICAgICAgICAgICQuZWFjaChyZXNwb25zZS5pdGVtcywgZnVuY3Rpb24gKGksIGl0ZW0pIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgbGlzdC5hcHBlbmQoYDxhIGNsYXNzPVwic2VhcmNoLWZvcm0tbWF0Y2hlc19fbGlua1wiIGhyZWY9XCIke2l0ZW0udXJsfVwiPiR7aXRlbS50aXRsZX08L2E+YCk7XHJcbiAgICAgICAgICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9KTtcclxuICAgIH0pO1xyXG59KSgpOyJdLCJmaWxlIjoibWFpbi5qcyJ9
