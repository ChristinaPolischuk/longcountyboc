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
    var max = 200;
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

        if (accordionContent.style.maxHeight) {
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
  } // hamburger open/close animation


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
  } // search form open/close animation


  var searchBtn = document.querySelector(".search-form__btn");
  searchBtn.addEventListener("click", function () {
    this.classList.toggle("close");
    this.previousElementSibling.classList.toggle("inclicked");
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

  var chooseRating = function chooseRating() {
    if (document.querySelector(".js-rating") == null) return false;
    var rating = document.querySelector(".js-rating"),
        ratingStars = rating.children;
    rating.addEventListener("click", function (e) {
      if (e.target.classList.contains("rating__star") || e.target.closest(".rating__star")) {
        var target = e.target.classList.contains("rating__star") ? e.target : e.target.closest(".rating__star");
        removeClass(ratingStars, "current-active");
        target.classList.add("active", "current-active");
      }
    });
    rating.addEventListener("mouseover", function (e) {
      if (e.target.classList.contains("rating__star") || e.target.closest(".rating__star")) {
        var target = e.target.classList.contains("rating__star") ? e.target : e.target.closest(".rating__star");
        removeClass(ratingStars, "active");
        target.classList.add("active");
        mouseOverActiveClass(ratingStars);
      }
    });
    rating.addEventListener("mouseout", function () {
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

  var openModal = function openModal() {
    var modalBtn = document.querySelectorAll(".js-modal");
    var modalContainer = document.querySelector(".modal-background");
    modalBtn.forEach(function (el) {
      el.addEventListener("click", function () {
        document.body.classList.add("modal-active");
        modalContainer.classList.remove("out");
        modalContainer.classList.add("opened");
      });
    });
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

  openModal();

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
      breakpoint: 992,
      settings: {
        slidesToShow: 3
      }
    }, {
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
//# sourceMappingURL=data:application/json;charset=utf8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIm1haW4uanMiXSwibmFtZXMiOlsiY3JvcFRleHQiLCJoaWRlQmxvY2siLCJyZWFkTW9yZSIsImRvY3VtZW50IiwicXVlcnlTZWxlY3RvckFsbCIsImZvckVhY2giLCJlbCIsImFkZEV2ZW50TGlzdGVuZXIiLCJlbFRleHQiLCJpbm5lclRleHQiLCJoaWRkZW5UZXh0IiwicHJldmlvdXNFbGVtZW50U2libGluZyIsImNsYXNzTGlzdCIsInRvZ2dsZSIsIm1heCIsInRleHQiLCJzdHIiLCJ0cmltIiwibGVuZ3RoIiwic3ViU3RyIiwic3Vic3RyaW5nIiwiaGlkZGVuU3RyIiwiaW5uZXJIVE1MIiwic2hvd1JldmlldyIsImltYWdlcyIsIm5leHRFbGVtZW50U2libGluZyIsInByb2R1Y3RSZXZpZXciLCJwcm9kdWN0VGV4dCIsInF1ZXJ5U2VsZWN0b3IiLCJjcmVhdGVFbGVtZW50IiwiYWRkIiwidGV4dENvbnRlbnQiLCJhZnRlciIsImJlZm9yZSIsImFjY29yZGlvbiIsImUiLCJ0YXJnZXQiLCJjb250YWlucyIsImNsb3Nlc3QiLCJhY2NvcmRpb25Db250ZW50Iiwic3R5bGUiLCJtYXhIZWlnaHQiLCJwYXJlbnRFbGVtZW50IiwicmVtb3ZlIiwic2Nyb2xsSGVpZ2h0Iiwic2lkZWJhckxpbmtzIiwiZWxlbSIsIm5hdmJhckxpbmtDbGljayIsImV2ZW50Iiwic21vb3RoU2Nyb2xsIiwicHJldmVudERlZmF1bHQiLCJ0YXJnZXRJZCIsImN1cnJlbnRUYXJnZXQiLCJnZXRBdHRyaWJ1dGUiLCJ3aW5kb3ciLCJzY3JlZW4iLCJ3aWR0aCIsInNjcm9sbFRvIiwidG9wIiwib2Zmc2V0VG9wIiwiYmVoYXZpb3IiLCJ0b2dnbGVGaXhlZCIsInRocm90dGxlIiwidHJhY2tTY3JvbGwiLCJlbGVtZW50cyIsInN0aWNreUJsb2NrcyIsInBhZ2VZT2Zmc2V0Iiwic3RpY2t5QmxvY2tDb29yZHMiLCJnZXRCb3VuZGluZ0NsaWVudFJlY3QiLCJib3R0b20iLCJ0eXBlIiwibmFtZSIsIm9iaiIsInJ1bm5pbmciLCJmdW5jIiwicmVxdWVzdEFuaW1hdGlvbkZyYW1lIiwiZGlzcGF0Y2hFdmVudCIsIkN1c3RvbUV2ZW50IiwiZWxlbWVudCIsImZpeGVkV2lkdGgiLCJjbGllbnRXaWR0aCIsInRyaWdnZXIiLCJtb2JpbGVOYXYiLCJpc0Nsb3NlZCIsImJ1cmdlclRpbWUiLCJzZWFyY2hCdG4iLCJ2YWx1ZSIsInByb2R1Y3RSZXZpZXdTdGFycyIsImRhdGFSYXRpbmciLCJzdGFycyIsImNoaWxkcmVuIiwiaSIsImNob29zZVJhdGluZyIsInJhdGluZyIsInJhdGluZ1N0YXJzIiwicmVtb3ZlQ2xhc3MiLCJtb3VzZU92ZXJBY3RpdmVDbGFzcyIsImFkZENsYXNzIiwibW91c2VPdXRBY3RpdmVDbGFzcyIsImFyciIsImlMZW5nIiwiaiIsImFyZ3VtZW50cyIsImlMZW4iLCJjYXJldERyb3Bkb3duIiwiZmlyc3RFbGVtZW50Q2hpbGQiLCJkcm9wZG93biIsIm9wYWNpdHkiLCJiYXNpY1Njcm9sbFRvcCIsImJ0blRvcCIsImJ0blJldmVhbCIsInNjcm9sbFkiLCJUb3BzY3JvbGxUbyIsInNldFRpbWVvdXQiLCJvcGVuTW9kYWwiLCJtb2RhbEJ0biIsIm1vZGFsQ29udGFpbmVyIiwiYm9keSIsImtleUNvZGUiLCJzZWVNb3JlIiwibnVtYmVyIiwiYnV0dG9uIiwic2hvd0hpZGVCbG9ja3MiLCJpbmRleCIsImRpc3BsYXkiLCJlbGVtcyIsImJ0blNob3dIaWRlIiwic2hvd0Zvb3RlckxpbmtzIiwiZm9vdGVyVGl0bGUiLCJmb290ZXJMaW5rcyIsImZvb3RlckxpbmsiLCJ0aXRsZSIsImdldENvbXB1dGVkU3R5bGUiLCJzZXRQZXJjZW50IiwiY2lyY3VsYXJQcm9ncmVzcyIsIml0ZW0iLCJjaXJjbGUiLCJkYXRhUGVyY2VudCIsInBlcmNlbnQiLCJzdHJva2VEYXNob2Zmc2V0IiwicHJpY2VTbGlkZXIiLCJyYW5nZUlucHV0cyIsInByaWNlSW5wdXRzIiwicHJvZ3Jlc3MiLCJwcmljZUdhcCIsInByaWNlSW5wdXQiLCJtaW5WYWwiLCJwYXJzZUludCIsIm1heFZhbCIsImxlZnQiLCJyaWdodCIsInJhbmdlSW5wdXQiLCJ2aWV3QWxsIiwiZmlsdGVyTGlzdCIsImxpc3QiLCJpdGVtcyIsImxlbiIsImZpbHRlckl0ZW1zIiwiZmlsdGVyQ29udGVudCIsIiQiLCJzbGljayIsInNsaWRlc1RvU2hvdyIsInZlcnRpY2FsIiwidmVydGljYWxTd2lwaW5nIiwic2xpZGVzVG9TY3JvbGwiLCJmb2N1c09uU2VsZWN0IiwicHJldkFycm93IiwibmV4dEFycm93IiwidmFyaWFibGVXaWR0aCIsImFzTmF2Rm9yIiwiYXJyb3dzIiwiZmFkZSIsInJlc3BvbnNpdmUiLCJicmVha3BvaW50Iiwic2V0dGluZ3MiLCJvbiIsInNlbGYiLCJkYXRhIiwiYWpheCIsInVybCIsInZhbCIsImRhdGFUeXBlIiwic3VjY2VzcyIsInJlc3BvbnNlIiwiZW1wdHkiLCJlYWNoIiwiYXBwZW5kIl0sIm1hcHBpbmdzIjoiOztBQUFBOztBQUNBLENBQUMsWUFBWTtBQUNUQSxFQUFBQSxRQUFRO0FBQ1JDLEVBQUFBLFNBQVM7QUFFVCxNQUFJQyxRQUFRLEdBQUdDLFFBQVEsQ0FBQ0MsZ0JBQVQsQ0FBMEIsZUFBMUIsQ0FBZjtBQUVBRixFQUFBQSxRQUFRLENBQUNHLE9BQVQsQ0FBaUIsVUFBQUMsRUFBRSxFQUFJO0FBQ25CQSxJQUFBQSxFQUFFLENBQUNDLGdCQUFILENBQW9CLE9BQXBCLEVBQTZCLFlBQU07QUFDL0IsVUFBSUMsTUFBTSxHQUFHRixFQUFFLENBQUNHLFNBQWhCO0FBQ0EsVUFBSUMsVUFBVSxHQUFHSixFQUFFLENBQUNLLHNCQUFwQjtBQUVBTCxNQUFBQSxFQUFFLENBQUNHLFNBQUgsR0FBZUQsTUFBTSxJQUFJLGFBQVYsR0FBMEIsTUFBMUIsR0FBbUMsYUFBbEQ7QUFDQUUsTUFBQUEsVUFBVSxDQUFDRSxTQUFYLENBQXFCQyxNQUFyQixDQUE0QixNQUE1QjtBQUNILEtBTkQ7QUFPSCxHQVJEOztBQVVBLFdBQVNiLFFB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LElBQUksQ0FBQ0MsSUFBTCxDQUFVLEtBQVYsSUFBbUIsS0FBbkIsR0FBMkJELElBQUksQ0FBQ0ksR0FBTCxFQUQ3QjtBQUVIOUcsTUFBQUEsSUFBSSxFQUFFLEtBRkg7QUFHSCtHLE1BQUFBLFFBQVEsRUFBRSxNQUhQO0FBSUhDLE1BQUFBLE9BQU8sRUFBRSxpQkFBVUMsUUFBVixFQUFvQjtBQUN6QjdCLFFBQUFBLElBQUksQ0FBQzhCLEtBQUw7O0FBRUEsWUFBSUQsUUFBUSxDQUFDNUIsS0FBVCxDQUFlekksTUFBbkIsRUFBMkI7QUFDdkI2SSxVQUFBQSxDQUFDLENBQUMwQixJQUFGLENBQU9GLFFBQVEsQ0FBQzVCLEtBQWhCLEVBQXVCLFVBQVVoRSxDQUFWLEVBQWE0QyxJQUFiLEVBQW1CO0FBQ3RDbUIsWUFBQUEsSUFBSSxDQUFDZ0MsTUFBTCx5REFBMERuRCxJQUFJLENBQUM0QyxHQUEvRCxnQkFBdUU1QyxJQUFJLENBQUNKLEtBQTVFO0FBQ0gsV0FGRDtBQUdIO0FBQ0o7QUFaRSxLQUFQO0FBY0gsR0FqQkQ7QUFrQkgsQ0FwbkJEIiwic291cmNlc0NvbnRlbnQiOlsiO1xyXG4oZnVuY3Rpb24gKCkge1xyXG4gICAgY3JvcFRleHQoKTtcclxuICAgIGhpZGVCbG9jaygpO1xyXG5cclxuICAgIGxldCByZWFkTW9yZSA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3JBbGwoJy5qcy1yZWFkLW1vcmUnKTtcclxuXHJcbiAgICByZWFkTW9yZS5mb3JFYWNoKGVsID0+IHtcclxuICAgICAgICBlbC5hZGRFdmVudExpc3RlbmVyKCdjbGljaycsICgpID0+IHtcclxuICAgICAgICAgICAgbGV0IGVsVGV4dCA9IGVsLmlubmVyVGV4dDtcclxuICAgICAgICAgICAgbGV0IGhpZGRlblRleHQgPSBlbC5wcmV2aW91c0VsZW1lbnRTaWJsaW5nO1xyXG5cclxuICAgICAgICAgICAgZWwuaW5uZXJUZXh0ID0gZWxUZXh0ID09ICdyZWFkIG1vcmUgPicgPyAnaGlkZScgOiAncmVhZCBtb3JlID4nO1xyXG4gICAgICAgICAgICBoaWRkZW5UZXh0LmNsYXNzTGlzdC50b2dnbGUoJ3Nob3cnKTtcclxuICAgICAgICB9KTtcclxuICAgIH0pO1xyXG5cclxuICAgIGZ1bmN0aW9uIGNyb3BUZXh0KCkge1xyXG4gICAgICAgIGxldCBtYXggPSAyMDA7XHJcbiAgICAgICAgbGV0IHRleHQgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yQWxsKCcuanMtcmVhZC1tb3JlLXRleHQnKTtcclxuICAgICAgICB0ZXh0LmZvckVhY2goZWwgPT4ge1xyXG4gICAgICAgICAgICBsZXQgc3RyID0gZWwuaW5uZXJUZXh0LnRyaW0oKTtcclxuICAgICAgICAgICAgaWYgKHN0ci5sZW5ndGggPiBtYXgpIHtcclxuICAgICAgICAgICAgICAgIGxldCBzdWJTdHIgPSBzdHIuc3Vic3RyaW5nKDAsIG1heCk7XHJcbiAgICAgICAgICAgICAgICBsZXQgaGlkZGVuU3RyID0gc3RyLnN1YnN0cmluZyhtYXgsIHN0ci5sZW5ndGgpO1xyXG4gICAgICAgICAgICAgICAgZWwuaW5uZXJUZXh0ID0gc3ViU3RyO1xyXG4gICAgICAgICAgICAgICAgZWwuaW5uZXJIVE1MICs9IGA8c3BhbiBjbGFzcz1cImhpZGRlbi10ZXh0IGpzLWhpZGRlbi10ZXh0XCI+JHtoaWRkZW5TdHJ9PC9zcGFuPmA7XHJcbiAgICAgICAgICAgICAgICBlbC5pbm5lckhUTUwgKz0gJzxzcGFuIGNsYXNzPVwicmVhZC1tb3JlIGpzLXJlYWQtbW9yZVwiPnJlYWQgbW9yZSA+PC9zcGFuPic7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9KTtcclxuICAgIH1cclxuXHJcbiAgICBsZXQgc2hvd1JldmlldyA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3JBbGwoJy5qcy1zaG93LXJldmlldycpO1xyXG5cclxuICAgIHNob3dSZXZpZXcuZm9yRWFjaChlbCA9PiB7XHJcbiAgICAgICAgZWwuYWRkRXZlbnRMaXN0ZW5lcignY2xpY2snLCAoKSA9PiB7XHJcbiAgICAgICAgICAgIGxldCBlbFRleHQgPSBlbC5pbm5lclRleHQ7XHJcbiAgICAgICAgICAgIGxldCBoaWRkZW5UZXh0ID0gZWwucHJldmlvdXNFbGVtZW50U2libGluZztcclxuICAgICAgICAgICAgbGV0IGltYWdlcyA9IGVsLm5leHRFbGVtZW50U2libGluZztcclxuXHJcbiAgICAgICAgICAgIGVsLmlubmVyVGV4dCA9IGVsVGV4dCA9PSAncmVhZCBtb3JlID4nID8gJzwgaGlkZScgOiAncmVhZCBtb3JlID4nO1xyXG4gICAgICAgICAgICBoaWRkZW5UZXh0LmNsYXNzTGlzdC50b2dnbGUoJ3Nob3cnKTtcclxuICAgICAgICAgICAgaW1hZ2VzLmNsYXNzTGlzdC50b2dnbGUoXCJzaG93XCIpO1xyXG4gICAgICAgIH0pO1xyXG4gICAgfSk7XHJcblxyXG4gICAgZnVuY3Rpb24gaGlkZUJsb2NrKCkge1xyXG4gICAgICAgIGxldCBtYXggPSAxMjg7XHJcbiAgICAgICAgbGV0IHByb2R1Y3RSZXZpZXcgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yQWxsKCcuanMtaGlkZS1yZXZpZXcnKTtcclxuICAgICAgICBwcm9kdWN0UmV2aWV3LmZvckVhY2goZWwgPT4ge1xyXG4gICAgICAgICAgICBsZXQgcHJvZHVjdFRleHQgPSBlbC5xdWVyeVNlbGVjdG9yKFwiLnBhZ2UtdGV4dFwiKTtcclxuICAgICAgICAgICAgbGV0IHN0ciA9IHByb2R1Y3RUZXh0LmlubmVyVGV4dC50cmltKCk7XHJcbiAgICAgICAgICAgIGxldCBpbWFnZXMgPSBlbC5xdWVyeVNlbGVjdG9yKCcucHJvZHVjdC1yZXZpZXdfX2ltYWdlcycpO1xyXG4gICAgICAgICAgICBpZiAoc3RyLmxlbmd0aCA+IG1heCkge1xyXG4gICAgICAgICAgICAgICAgbGV0IHN1YlN0ciA9IHN0ci5zdWJzdHJpbmcoMCwgbWF4KTtcclxuICAgICAgICAgICAgICAgIGxldCBoaWRkZW5TdHIgPSBzdHIuc3Vic3RyaW5nKG1heCwgc3RyLmxlbmd0aCk7XHJcbiAgICAgICAgICAgICAgICBwcm9kdWN0VGV4dC5pbm5lclRleHQgPSBzdWJTdHI7XHJcblxyXG4gICAgICAgICAgICAgICAgbGV0IGhpZGRlblRleHQgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdzcGFuJyk7XHJcbiAgICAgICAgICAgICAgICBoaWRkZW5UZXh0LmNsYXNzTGlzdC5hZGQoJ2hpZGRlbi10ZXh0JywgJ3BhZ2UtdGV4dCcsICdqcy1oaWRkZW4tdGV4dCcpO1xyXG4gICAgICAgICAgICAgICAgaGlkZGVuVGV4dC50ZXh0Q29udGVudCA9IGhpZGRlblN0cjtcclxuXHJcbiAgICAgICAgICAgICAgICBwcm9kdWN0VGV4dC5hZnRlcihoaWRkZW5UZXh0KTtcclxuXHJcbiAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgIGxldCByZWFkTW9yZSA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ3NwYW4nKTtcclxuICAgICAgICAgICAgcmVhZE1vcmUuY2xhc3NMaXN0LmFkZCgncmVhZC1tb3JlJywgJ2pzLXNob3ctcmV2aWV3Jyk7XHJcbiAgICAgICAgICAgIHJlYWRNb3JlLnRleHRDb250ZW50ID0gJ3JlYWQgbW9yZSA+JztcclxuXHJcbiAgICAgICAgICAgIGltYWdlcy5iZWZvcmUocmVhZE1vcmUpO1xyXG4gICAgICAgIH0pO1xyXG4gICAgfVxyXG5cclxuICAgIGNvbnN0IGFjY29yZGlvbiA9ICgpID0+IHtcclxuICAgICAgICBkb2N1bWVudC5hZGRFdmVudExpc3RlbmVyKCdjbGljaycsIGUgPT4ge1xyXG4gICAgICAgICAgICBpZiAoZS50YXJnZXQuY2xhc3NMaXN0LmNvbnRhaW5zKCdqcy1hY2NvcmRpb24nKSB8fCBlLnRhcmdldC5jbG9zZXN0KCcuanMtYWNjb3JkaW9uJykpIHtcclxuICAgICAgICAgICAgICAgIGNvbnN0IGFjY29yZGlvbiA9IGUudGFyZ2V0LmNsYXNzTGlzdC5jb250YWlucygnanMtYWNjb3JkaW9uJykgPyBlLnRhcmdldCA6IGUudGFyZ2V0LmNsb3Nlc3QoJy5qcy1hY2NvcmRpb24nKTtcclxuICAgICAgICAgICAgICAgIGNvbnN0IGFjY29yZGlvbkNvbnRlbnQgPSBhY2NvcmRpb24ubmV4dEVsZW1lbnRTaWJsaW5nO1xyXG4gICAgICAgICAgICAgICAgaWYgKGFjY29yZGlvbkNvbnRlbnQuc3R5bGUubWF4SGVpZ2h0KSB7XHJcbiAgICAgICAgICAgICAgICAgICAgYWNjb3JkaW9uLnBhcmVudEVsZW1lbnQuY2xhc3NMaXN0LnJlbW92ZShcImFjdGl2ZVwiKTtcclxuICAgICAgICAgICAgICAgICAgICBhY2NvcmRpb25Db250ZW50LnN0eWxlLm1heEhlaWdodCA9IG51bGw7XHJcbiAgICAgICAgICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICAgICAgICAgIGFjY29yZGlvbi5wYXJlbnRFbGVtZW50LmNsYXNzTGlzdC5hZGQoXCJhY3RpdmVcIik7XHJcbiAgICAgICAgICAgICAgICAgICAgYWNjb3JkaW9uQ29udGVudC5zdHlsZS5tYXhIZWlnaHQgPSBhY2NvcmRpb25Db250ZW50LnNjcm9sbEhlaWdodCArIFwicHhcIjtcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH0pO1xyXG4gICAgfVxyXG4gICAgYWNjb3JkaW9uKCk7XHJcblxyXG4gICAgY29uc3Qgc2lkZWJhckxpbmtzID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvckFsbChcIi5zaWRlYmFyLW1lbnVfX2xpbmtcIik7XHJcblxyXG4gICAgc2lkZWJhckxpbmtzLmZvckVhY2goZWxlbSA9PiBlbGVtLmFkZEV2ZW50TGlzdGVuZXIoXCJjbGlja1wiLCBuYXZiYXJMaW5rQ2xpY2spKTtcclxuXHJcbiAgICBmdW5jdGlvbiBuYXZiYXJMaW5rQ2xpY2soZXZlbnQpIHtcclxuICAgICAgICBzbW9vdGhTY3JvbGwoZXZlbnQpO1xyXG4gICAgfVxyXG5cclxuICAgIGZ1bmN0aW9uIHNtb290aFNjcm9sbChldmVudCkge1xyXG4gICAgICAgIGV2ZW50LnByZXZlbnREZWZhdWx0KCk7XHJcbiAgICAgICAgY29uc3QgdGFyZ2V0SWQgPSBldmVudC5jdXJyZW50VGFyZ2V0LmdldEF0dHJpYnV0ZShcImhyZWZcIik7XHJcbiAgICAgICAgaWYgKHdpbmRvdy5zY3JlZW4ud2lkdGggPiAxMDI0KSB7XHJcbiAgICAgICAgICAgIHdpbmRvdy5zY3JvbGxUbyh7XHJcbiAgICAgICAgICAgICAgICB0b3A6IHRhcmdldElkID09PSBcIiNcIiA/IDAgOiBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKHRhcmdldElkKS5vZmZzZXRUb3AgLSAxMDAsXHJcbiAgICAgICAgICAgICAgICBiZWhhdmlvcjogXCJzbW9vdGhcIlxyXG4gICAgICAgICAgICB9KTtcclxuICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICB3aW5kb3cuc2Nyb2xsVG8oe1xyXG4gICAgICAgICAgICAgICAgdG9wOiB0YXJnZXRJZCA9PT0gXCIjXCIgPyAwIDogZG9jdW1lbnQucXVlcnlTZWxlY3Rvcih0YXJnZXRJZCkub2Zmc2V0VG9wIC0gMjAwLFxyXG4gICAgICAgICAgICAgICAgYmVoYXZpb3I6IFwic21vb3RoXCJcclxuICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG5cclxuICAgIGlmIChkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcucHJvZHVjdHMtc3RpY2t5JykgIT09IG51bGwpIHtcclxuXHJcbiAgICAgICAgd2luZG93LmFkZEV2ZW50TGlzdGVuZXIoJ29wdGltaXplZFJlc2l6ZScsICgpID0+IHtcclxuICAgICAgICAgICAgdG9nZ2xlRml4ZWQoJy5wcm9kdWN0cy1zdGlja3knKTtcclxuICAgICAgICB9KTtcclxuXHJcblxyXG4gICAgICAgIHRvZ2dsZUZpeGVkKCcucHJvZHVjdHMtc3RpY2t5Jyk7XHJcblxyXG4gICAgICAgIHRocm90dGxlKFwicmVzaXplXCIsIFwib3B0aW1pemVkUmVzaXplXCIpO1xyXG5cclxuICAgIH1cclxuXHJcbiAgICBpZiAoZG9jdW1lbnQucXVlcnlTZWxlY3RvcignLnN0aWNreS1ibG9jaycpICE9PSBudWxsKSB7XHJcbiAgICAgICAgbGV0IHN0aWNreUJsb2NrQ29vcmRzID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignLnN0aWNreS1ibG9jaycpLmdldEJvdW5kaW5nQ2xpZW50UmVjdCgpLmJvdHRvbSArIHdpbmRvdy5wYWdlWU9mZnNldDtcclxuXHJcbiAgICAgICAgd2luZG93LmFkZEV2ZW50TGlzdGVuZXIoXCJzY3JvbGxcIiwgZnVuY3Rpb24gKCkge1xyXG4gICAgICAgICAgICB0cmFja1Njcm9sbCgnLnN0aWNreS1ibG9jaycpO1xyXG4gICAgICAgIH0pO1xyXG5cclxuICAgICAgICBmdW5jdGlvbiB0cmFja1Njcm9sbChlbGVtZW50cykge1xyXG4gICAgICAgICAgICBsZXQgc3RpY2t5QmxvY2tzID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvckFsbChlbGVtZW50cyk7XHJcbiAgICAgICAgICAgIHN0aWNreUJsb2Nrcy5mb3JFYWNoKGVsID0+IHtcclxuICAgICAgICAgICAgICAgIGlmIChlbC5jbGFzc0xpc3QuY29udGFpbnMoJ3Nob3cnKSAmJiB3aW5kb3cucGFnZVlPZmZzZXQgPCBzdGlja3lCbG9ja0Nvb3Jkcykge1xyXG4gICAgICAgICAgICAgICAgICAgIGVsLmNsYXNzTGlzdC5yZW1vdmUoJ3Nob3cnKTtcclxuICAgICAgICAgICAgICAgIH0gZWxzZSBpZiAod2luZG93LnBhZ2VZT2Zmc2V0ID4gc3RpY2t5QmxvY2tDb29yZHMpIHtcclxuICAgICAgICAgICAgICAgICAgICBlbC5jbGFzc0xpc3QuYWRkKCdzaG93Jyk7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIH0pO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxuXHJcbiAgICBmdW5jdGlvbiB0aHJvdHRsZSh0eXBlLCBuYW1lLCBvYmopIHtcclxuICAgICAgICBvYmogPSBvYmogfHwgd2luZG93O1xyXG4gICAgICAgIHZhciBydW5uaW5nID0gZmFsc2U7XHJcbiAgICAgICAgdmFyIGZ1bmMgPSBmdW5jdGlvbiAoKSB7XHJcbiAgICAgICAgICAgIGlmIChydW5uaW5nKSB7XHJcbiAgICAgICAgICAgICAgICByZXR1cm47XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgcnVubmluZyA9IHRydWU7XHJcbiAgICAgICAgICAgIHJlcXVlc3RBbmltYXRpb25GcmFtZShmdW5jdGlvbiAoKSB7XHJcbiAgICAgICAgICAgICAgICBvYmouZGlzcGF0Y2hFdmVudChuZXcgQ3VzdG9tRXZlbnQobmFtZSkpO1xyXG4gICAgICAgICAgICAgICAgcnVubmluZyA9IGZhbHNlO1xyXG4gICAgICAgICAgICB9KTtcclxuICAgICAgICB9O1xyXG4gICAgICAgIG9iai5hZGRFdmVudExpc3RlbmVyKHR5cGUsIGZ1bmMpO1xyXG4gICAgfTtcclxuXHJcbiAgICBmdW5jdGlvbiB0b2dnbGVGaXhlZChlbCkge1xyXG4gICAgICAgIGxldCBlbGVtZW50ID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcihlbCk7XHJcbiAgICAgICAgbGV0IGZpeGVkV2lkdGggPSB3aW5kb3cuc2NyZWVuLndpZHRoID4gMTAyNCA/IGVsZW1lbnQucGFyZW50RWxlbWVudC5jbGllbnRXaWR0aCAtIDI4NSA6IGVsZW1lbnQucGFyZW50RWxlbWVudC5jbGllbnRXaWR0aDtcclxuICAgICAgICBlbGVtZW50LnN0eWxlLndpZHRoID0gZml4ZWRXaWR0aCArICdweCc7XHJcblxyXG4gICAgfVxyXG5cclxuICAgIC8vIGhhbWJ1cmdlciBvcGVuL2Nsb3NlIGFuaW1hdGlvblxyXG4gICAgY29uc3QgdHJpZ2dlciA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoXCIjaGFtYnVyZ2VyXCIpO1xyXG4gICAgY29uc3QgbW9iaWxlTmF2ID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcihcIiNtb2JpbGUtbmF2XCIpO1xyXG4gICAgbGV0IGlzQ2xvc2VkID0gdHJ1ZTtcclxuXHJcbiAgICB0cmlnZ2VyLmFkZEV2ZW50TGlzdGVuZXIoXCJjbGlja1wiLCBidXJnZXJUaW1lKTtcclxuXHJcbiAgICBmdW5jdGlvbiBidXJnZXJUaW1lKCkge1xyXG4gICAgICAgIGlmIChpc0Nsb3NlZCA9PSB0cnVlKSB7XHJcbiAgICAgICAgICAgIHRyaWdnZXIuY2xhc3NMaXN0LnJlbW92ZShcImlzLW9wZW5cIik7XHJcbiAgICAgICAgICAgIHRyaWdnZXIuY2xhc3NMaXN0LmFkZChcImlzLWNsb3NlZFwiKTtcclxuICAgICAgICAgICAgbW9iaWxlTmF2LmNsYXNzTGlzdC5hZGQoJ2lzLW9wZW4nKTtcclxuICAgICAgICAgICAgaXNDbG9zZWQgPSBmYWxzZTtcclxuICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICB0cmlnZ2VyLmNsYXNzTGlzdC5yZW1vdmUoXCJpcy1jbG9zZWRcIik7XHJcbiAgICAgICAgICAgIHRyaWdnZXIuY2xhc3NMaXN0LmFkZChcImlzLW9wZW5cIik7XHJcbiAgICAgICAgICAgIG1vYmlsZU5hdi5jbGFzc0xpc3QucmVtb3ZlKCdpcy1vcGVuJyk7XHJcbiAgICAgICAgICAgIGlzQ2xvc2VkID0gdHJ1ZTtcclxuICAgICAgICB9XHJcbiAgICB9XHJcblxyXG4gICAgLy8gc2VhcmNoIGZvcm0gb3Blbi9jbG9zZSBhbmltYXRpb25cclxuICAgIGNvbnN0IHNlYXJjaEJ0biA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoXCIuc2VhcmNoLWZvcm1fX2J0blwiKTtcclxuICAgIHNlYXJjaEJ0bi5hZGRFdmVudExpc3RlbmVyKFwiY2xpY2tcIiwgZnVuY3Rpb24gKCkge1xyXG4gICAgICAgIHRoaXMuY2xhc3NMaXN0LnRvZ2dsZShcImNsb3NlXCIpO1xyXG4gICAgICAgIHRoaXMucHJldmlvdXNFbGVtZW50U2libGluZy5jbGFzc0xpc3QudG9nZ2xlKFwiaW5jbGlja2VkXCIpO1xyXG4gICAgICAgIHRoaXMucHJldmlvdXNFbGVtZW50U2libGluZy52YWx1ZSA9IFwiXCI7XHJcbiAgICB9KTtcclxuXHJcbiAgICBjb25zdCBwcm9kdWN0UmV2aWV3U3RhcnMgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yQWxsKFwiLmpzLXByb2R1Y3QtcmV2aWV3LXJhdGluZ1wiKTtcclxuICAgIHByb2R1Y3RSZXZpZXdTdGFycy5mb3JFYWNoKGZ1bmN0aW9uIChlbCkge1xyXG4gICAgICAgIGNvbnN0IGRhdGFSYXRpbmcgPSBlbC5nZXRBdHRyaWJ1dGUoXCJkYXRhLXJhdGluZ1wiKTtcclxuICAgICAgICBjb25zdCBzdGFycyA9IGVsLmNoaWxkcmVuO1xyXG4gICAgICAgIGZvciAobGV0IGkgPSAwOyBpIDwgZGF0YVJhdGluZzsgaSsrKSB7XHJcbiAgICAgICAgICAgIHN0YXJzW2ldLmNsYXNzTGlzdC5hZGQoXCJhY3RpdmVcIik7XHJcbiAgICAgICAgfVxyXG4gICAgfSk7XHJcblxyXG4gICAgY29uc3QgY2hvb3NlUmF0aW5nID0gKCkgPT4ge1xyXG4gICAgICAgIGlmIChkb2N1bWVudC5xdWVyeVNlbGVjdG9yKFwiLmpzLXJhdGluZ1wiKSA9PSBudWxsKSByZXR1cm4gZmFsc2U7XHJcbiAgICAgICAgY29uc3QgcmF0aW5nID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcihcIi5qcy1yYXRpbmdcIiksXHJcbiAgICAgICAgICAgIHJhdGluZ1N0YXJzID0gcmF0aW5nLmNoaWxkcmVuO1xyXG4gICAgICAgIHJhdGluZy5hZGRFdmVudExpc3RlbmVyKFwiY2xpY2tcIiwgKGUpID0+IHtcclxuICAgICAgICAgICAgaWYgKGUudGFyZ2V0LmNsYXNzTGlzdC5jb250YWlucyhcInJhdGluZ19fc3RhclwiKSB8fCBlLnRhcmdldC5jbG9zZXN0KFwiLnJhdGluZ19fc3RhclwiKSkge1xyXG4gICAgICAgICAgICAgICAgbGV0IHRhcmdldCA9IGUudGFyZ2V0LmNsYXNzTGlzdC5jb250YWlucyhcInJhdGluZ19fc3RhclwiKSA/IGUudGFyZ2V0IDogZS50YXJnZXQuY2xvc2VzdChcIi5yYXRpbmdfX3N0YXJcIik7XHJcbiAgICAgICAgICAgICAgICByZW1vdmVDbGFzcyhyYXRpbmdTdGFycywgXCJjdXJyZW50LWFjdGl2ZVwiKTtcclxuICAgICAgICAgICAgICAgIHRhcmdldC5jbGFzc0xpc3QuYWRkKFwiYWN0aXZlXCIsIFwiY3VycmVudC1hY3RpdmVcIik7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9KTtcclxuICAgICAgICByYXRpbmcuYWRkRXZlbnRMaXN0ZW5lcihcIm1vdXNlb3ZlclwiLCAoZSkgPT4ge1xyXG4gICAgICAgICAgICBpZiAoZS50YXJnZXQuY2xhc3NMaXN0LmNvbnRhaW5zKFwicmF0aW5nX19zdGFyXCIpIHx8IGUudGFyZ2V0LmNsb3Nlc3QoXCIucmF0aW5nX19zdGFyXCIpKSB7XHJcbiAgICAgICAgICAgICAgICBsZXQgdGFyZ2V0ID0gZS50YXJnZXQuY2xhc3NMaXN0LmNvbnRhaW5zKFwicmF0aW5nX19zdGFyXCIpID8gZS50YXJnZXQgOiBlLnRhcmdldC5jbG9zZXN0KFwiLnJhdGluZ19fc3RhclwiKTtcclxuICAgICAgICAgICAgICAgIHJlbW92ZUNsYXNzKHJhdGluZ1N0YXJzLCBcImFjdGl2ZVwiKTtcclxuICAgICAgICAgICAgICAgIHRhcmdldC5jbGFzc0xpc3QuYWRkKFwiYWN0aXZlXCIpO1xyXG4gICAgICAgICAgICAgICAgbW91c2VPdmVyQWN0aXZlQ2xhc3MocmF0aW5nU3RhcnMpO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfSk7XHJcbiAgICAgICAgcmF0aW5nLmFkZEV2ZW50TGlzdGVuZXIoXCJtb3VzZW91dFwiLCAoKSA9PiB7XHJcbiAgICAgICAgICAgIGFkZENsYXNzKHJhdGluZ1N0YXJzLCBcImFjdGl2ZVwiKTtcclxuICAgICAgICAgICAgbW91c2VPdXRBY3RpdmVDbGFzcyhyYXRpbmdTdGFycyk7XHJcbiAgICAgICAgfSk7XHJcblxyXG4gICAgICAgIGZ1bmN0aW9uIGFkZENsYXNzKGFycikge1xyXG4gICAgICAgICAgICBmb3IgKGxldCBpID0gMCwgaUxlbmcgPSBhcnIubGVuZ3RoOyBpIDwgaUxlbmc7IGkrKykge1xyXG4gICAgICAgICAgICAgICAgZm9yIChsZXQgaiA9IDE7IGogPCBhcmd1bWVudHMubGVuZ3RoOyBqKyspIHtcclxuICAgICAgICAgICAgICAgICAgICByYXRpbmdTdGFyc1tpXS5jbGFzc0xpc3QuYWRkKGFyZ3VtZW50c1tqXSk7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIGZ1bmN0aW9uIHJlbW92ZUNsYXNzKGFycikge1xyXG4gICAgICAgICAgICBmb3IgKGxldCBpID0gMCwgaUxlbmcgPSBhcnIubGVuZ3RoOyBpIDwgaUxlbmc7IGkrKykge1xyXG4gICAgICAgICAgICAgICAgZm9yIChsZXQgaiA9IDE7IGogPCBhcmd1bWVudHMubGVuZ3RoOyBqKyspIHtcclxuICAgICAgICAgICAgICAgICAgICByYXRpbmdTdGFyc1tpXS5jbGFzc0xpc3QucmVtb3ZlKGFyZ3VtZW50c1tqXSk7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIGZ1bmN0aW9uIG1vdXNlT3ZlckFjdGl2ZUNsYXNzKGFycikge1xyXG4gICAgICAgICAgICBmb3IgKGxldCBpID0gMCwgaUxlbiA9IGFyci5sZW5ndGg7IGkgPCBpTGVuOyBpKyspIHtcclxuICAgICAgICAgICAgICAgIGlmIChhcnJbaV0uY2xhc3NMaXN0LmNvbnRhaW5zKFwiYWN0aXZlXCIpKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgYnJlYWs7XHJcbiAgICAgICAgICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICAgICAgICAgIGFycltpXS5jbGFzc0xpc3QuYWRkKFwiYWN0aXZlXCIpO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBmdW5jdGlvbiBtb3VzZU91dEFjdGl2ZUNsYXNzKGFycikge1xyXG4gICAgICAgICAgICBmb3IgKGxldCBpID0gYXJyLmxlbmd0aCAtIDE7IGkgPj0gMDsgaS0tKSB7XHJcbiAgICAgICAgICAgICAgICBpZiAoYXJyW2ldLmNsYXNzTGlzdC5jb250YWlucyhcImN1cnJlbnQtYWN0aXZlXCIpKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgYnJlYWs7XHJcbiAgICAgICAgICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICAgICAgICAgIGFycltpXS5jbGFzc0xpc3QucmVtb3ZlKFwiYWN0aXZlXCIpO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG5cclxuICAgIGNob29zZVJhdGluZygpO1xyXG5cclxuICAgIGRvY3VtZW50LmFkZEV2ZW50TGlzdGVuZXIoXCJjbGlja1wiLCBmdW5jdGlvbiAoZSkge1xyXG4gICAgICAgIGlmIChlLnRhcmdldC5jbGFzc0xpc3QuY29udGFpbnMoXCJqcy1vcGVuLWRyb3Bkb3duXCIpICYmIHdpbmRvdy5zY3JlZW4ud2lkdGggPD0gNTc2KSB7XHJcbiAgICAgICAgICAgIGNvbnN0IGNhcmV0RHJvcGRvd24gPSBlLnRhcmdldC5maXJzdEVsZW1lbnRDaGlsZDtcclxuICAgICAgICAgICAgY29uc3QgZHJvcGRvd24gPSBlLnRhcmdldC5uZXh0RWxlbWVudFNpYmxpbmc7XHJcbiAgICAgICAgICAgIGlmIChkcm9wZG93bi5zdHlsZS5tYXhIZWlnaHQpIHtcclxuICAgICAgICAgICAgICAgIGRyb3Bkb3duLnN0eWxlLm1heEhlaWdodCA9IG51bGw7XHJcbiAgICAgICAgICAgICAgICBkcm9wZG93bi5zdHlsZS5vcGFjaXR5ID0gbnVsbDtcclxuICAgICAgICAgICAgICAgIGUudGFyZ2V0LmNsYXNzTGlzdC5yZW1vdmUoXCJkcm9wZG93bi1hY3RpdmVcIik7XHJcbiAgICAgICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgICAgICBkcm9wZG93bi5zdHlsZS5tYXhIZWlnaHQgPSBkcm9wZG93bi5zY3JvbGxIZWlnaHQgKyBcInB4XCI7XHJcbiAgICAgICAgICAgICAgICBkcm9wZG93bi5zdHlsZS5vcGFjaXR5ID0gMTtcclxuICAgICAgICAgICAgICAgIGUudGFyZ2V0LmNsYXNzTGlzdC5hZGQoXCJkcm9wZG93bi1hY3RpdmVcIik7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcbiAgICB9KTtcclxuXHJcbiAgICBjb25zdCBiYXNpY1Njcm9sbFRvcCA9IGZ1bmN0aW9uICgpIHtcclxuICAgICAgICBjb25zdCBidG5Ub3AgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcuanMtYnRuLWdvLXRvcCcpO1xyXG4gICAgICAgIGNvbnN0IGJ0blJldmVhbCA9IGZ1bmN0aW9uICgpIHtcclxuICAgICAgICAgICAgaWYgKHdpbmRvdy5zY3JvbGxZID49IDMwMCkge1xyXG4gICAgICAgICAgICAgICAgYnRuVG9wLmNsYXNzTGlzdC5hZGQoJ2lzLXZpc2libGUnKTtcclxuICAgICAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgICAgIGJ0blRvcC5jbGFzc0xpc3QucmVtb3ZlKCdpcy12aXNpYmxlJyk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcbiAgICAgICAgY29uc3QgVG9wc2Nyb2xsVG8gPSBmdW5jdGlvbiAoKSB7XHJcbiAgICAgICAgICAgIGlmICh3aW5kb3cuc2Nyb2xsWSAhPSAwKSB7XHJcbiAgICAgICAgICAgICAgICBzZXRUaW1lb3V0KGZ1bmN0aW9uICgpIHtcclxuICAgICAgICAgICAgICAgICAgICB3aW5kb3cuc2Nyb2xsVG8oMCwgd2luZG93LnNjcm9sbFkgLSAzMCk7XHJcbiAgICAgICAgICAgICAgICAgICAgVG9wc2Nyb2xsVG8oKTtcclxuICAgICAgICAgICAgICAgIH0sIDEwKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuICAgICAgICB3aW5kb3cuYWRkRXZlbnRMaXN0ZW5lcignc2Nyb2xsJywgYnRuUmV2ZWFsKTtcclxuICAgICAgICBidG5Ub3AuYWRkRXZlbnRMaXN0ZW5lcignY2xpY2snLCBUb3BzY3JvbGxUbyk7XHJcblxyXG4gICAgfTtcclxuICAgIGJhc2ljU2Nyb2xsVG9wKCk7XHJcblxyXG4gICAgY29uc3Qgb3Blbk1vZGFsID0gKCkgPT4ge1xyXG4gICAgICAgIGNvbnN0IG1vZGFsQnRuID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvckFsbChcIi5qcy1tb2RhbFwiKTtcclxuICAgICAgICBjb25zdCBtb2RhbENvbnRhaW5lciA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoXCIubW9kYWwtYmFja2dyb3VuZFwiKTtcclxuXHJcbiAgICAgICAgbW9kYWxCdG4uZm9yRWFjaChlbCA9PiB7XHJcbiAgICAgICAgICAgIGVsLmFkZEV2ZW50TGlzdGVuZXIoXCJjbGlja1wiLCBmdW5jdGlvbiAoKSB7XHJcbiAgICAgICAgICAgICAgICBkb2N1bWVudC5ib2R5LmNsYXNzTGlzdC5hZGQoXCJtb2RhbC1hY3RpdmVcIik7XHJcbiAgICAgICAgICAgICAgICBtb2RhbENvbnRhaW5lci5jbGFzc0xpc3QucmVtb3ZlKFwib3V0XCIpO1xyXG4gICAgICAgICAgICAgICAgbW9kYWxDb250YWluZXIuY2xhc3NMaXN0LmFkZChcIm9wZW5lZFwiKTtcclxuICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgfSk7XHJcblxyXG4gICAgICAgIGRvY3VtZW50LmFkZEV2ZW50TGlzdGVuZXIoXCJjbGlja1wiLCBmdW5jdGlvbiAoZSkge1xyXG4gICAgICAgICAgICBpZiAoXHJcbiAgICAgICAgICAgICAgICBlLnRhcmdldC5jbGFzc0xpc3QuY29udGFpbnMoXCJtb2RhbC1jb250YWluZXJcIikgfHxcclxuICAgICAgICAgICAgICAgIGUudGFyZ2V0LmNsYXNzTGlzdC5jb250YWlucyhcIm1vZGFsLWNsb3NlXCIpXHJcbiAgICAgICAgICAgICkge1xyXG4gICAgICAgICAgICAgICAgZG9jdW1lbnQuYm9keS5jbGFzc0xpc3QucmVtb3ZlKFwibW9kYWwtYWN0aXZlXCIpO1xyXG4gICAgICAgICAgICAgICAgbW9kYWxDb250YWluZXIuY2xhc3NMaXN0LnJlbW92ZShcIm9wZW5lZFwiKTtcclxuICAgICAgICAgICAgICAgIG1vZGFsQ29udGFpbmVyLmNsYXNzTGlzdC5hZGQoXCJvdXRcIik7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9KTtcclxuICAgICAgICBkb2N1bWVudC5hZGRFdmVudExpc3RlbmVyKFwia2V5ZG93blwiLCBmdW5jdGlvbiAoZSkge1xyXG4gICAgICAgICAgICBpZiAoZS5rZXlDb2RlID09IDI3KSB7XHJcbiAgICAgICAgICAgICAgICBkb2N1bWVudC5ib2R5LmNsYXNzTGlzdC5yZW1vdmUoXCJtb2RhbC1hY3RpdmVcIik7XHJcbiAgICAgICAgICAgICAgICBtb2RhbENvbnRhaW5lci5jbGFzc0xpc3QucmVtb3ZlKFwib3BlbmVkXCIpO1xyXG4gICAgICAgICAgICAgICAgbW9kYWxDb250YWluZXIuY2xhc3NMaXN0LmFkZChcIm91dFwiKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH0pO1xyXG4gICAgfTtcclxuXHJcbiAgICBvcGVuTW9kYWwoKTtcclxuXHJcbiAgICBjb25zdCBzZWVNb3JlID0gKG51bWJlciwgZWxlbWVudHMsIGJ1dHRvbikgPT4ge1xyXG5cclxuICAgICAgICBpZiAoZG9jdW1lbnQucXVlcnlTZWxlY3RvcihidXR0b24pID09IG51bGwpIHtcclxuICAgICAgICAgICAgcmV0dXJuIGZhbHNlO1xyXG4gICAgICAgIH1cclxuICAgICAgICB3aW5kb3cuYWRkRXZlbnRMaXN0ZW5lcihcImxvYWRcIiwgKCkgPT4gc2hvd0hpZGVCbG9ja3MobnVtYmVyLCBlbGVtZW50cywgYnV0dG9uKSk7XHJcbiAgICAgICAgd2luZG93LmFkZEV2ZW50TGlzdGVuZXIoXCJyZXNpemVcIiwgKCkgPT4gc2hvd0hpZGVCbG9ja3MobnVtYmVyLCBlbGVtZW50cywgYnV0dG9uKSk7XHJcblxyXG4gICAgICAgIGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoYnV0dG9uKS5hZGRFdmVudExpc3RlbmVyKFwiY2xpY2tcIiwgZnVuY3Rpb24gKCkge1xyXG4gICAgICAgICAgICBpZiAodGhpcy50ZXh0Q29udGVudCA9PSBcIlNlZSBtb3JlXCIpIHtcclxuICAgICAgICAgICAgICAgIHRoaXMudGV4dENvbnRlbnQgPSBcIlNlZSBsZXNzXCI7XHJcbiAgICAgICAgICAgICAgICB0aGlzLmNsYXNzTGlzdC5hZGQoXCJhY3RpdmVcIik7XHJcbiAgICAgICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgICAgICB0aGlzLnRleHRDb250ZW50ID0gXCJTZWUgbW9yZVwiO1xyXG4gICAgICAgICAgICAgICAgdGhpcy5jbGFzc0xpc3QucmVtb3ZlKFwiYWN0aXZlXCIpO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3JBbGwoZWxlbWVudHMpLmZvckVhY2goKGVsZW0sIGluZGV4KSA9PiB7XHJcbiAgICAgICAgICAgICAgICBpZiAoZWxlbS5zdHlsZS5kaXNwbGF5ID09IFwibm9uZVwiKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgZWxlbS5zdHlsZS5kaXNwbGF5ID0gbnVsbDtcclxuICAgICAgICAgICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgICAgICAgICAgaWYgKGluZGV4ID4gbnVtYmVyKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGVsZW0uc3R5bGUuZGlzcGxheSA9ICdub25lJztcclxuICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIH0pO1xyXG4gICAgICAgIH0pO1xyXG5cclxuICAgICAgICBmdW5jdGlvbiBzaG93SGlkZUJsb2NrcyhudW1iZXIsIGVsZW1lbnRzLCBidXR0b24pIHtcclxuICAgICAgICAgICAgY29uc3QgZWxlbXMgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yQWxsKGVsZW1lbnRzKTtcclxuICAgICAgICAgICAgY29uc3QgYnRuU2hvd0hpZGUgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKGJ1dHRvbik7XHJcblxyXG4gICAgICAgICAgICBpZiAod2luZG93LnNjcmVlbi53aWR0aCA8PSA4MDAgJiYgZWxlbXMubGVuZ3RoID4gbnVtYmVyKSB7XHJcbiAgICAgICAgICAgICAgICBlbGVtcy5mb3JFYWNoKChlbGVtLCBpbmRleCkgPT4ge1xyXG4gICAgICAgICAgICAgICAgICAgIGlmIChpbmRleCA+IG51bWJlcikge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBlbGVtLnN0eWxlLmRpc3BsYXkgPSAnbm9uZSc7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGJ0blNob3dIaWRlLnN0eWxlLmRpc3BsYXkgPSBudWxsO1xyXG4gICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIH0pO1xyXG4gICAgICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICAgICAgZWxlbXMuZm9yRWFjaCgoZWxlbSwgaW5kZXgpID0+IHtcclxuICAgICAgICAgICAgICAgICAgICBlbGVtLnN0eWxlLmRpc3BsYXkgPSBudWxsO1xyXG4gICAgICAgICAgICAgICAgICAgIGJ0blNob3dIaWRlLnN0eWxlLmRpc3BsYXkgPSAnbm9uZSc7XHJcbiAgICAgICAgICAgICAgICB9KTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuICAgIH07XHJcblxyXG4gICAgc2VlTW9yZSgzLCAnLnByb2R1Y3QtY29tcGFyZS10b3BfX2l0ZW0nLCAnLmpzLXNlZS1tb3JlLXByb2R1Y3RzJyk7XHJcbiAgICBzZWVNb3JlKDEsICcuaGVscC1jZW50ZXJfX2l0ZW0nLCAnLmpzLXNlZS1tb3JlLWhlbHAnKTtcclxuXHJcbiAgICBjb25zdCBzaG93Rm9vdGVyTGlua3MgPSAoKSA9PiB7XHJcbiAgICAgICAgY29uc3QgZm9vdGVyVGl0bGUgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yQWxsKCcuZm9vdGVyX190aXRsZScpO1xyXG4gICAgICAgIGNvbnN0IGZvb3RlckxpbmtzID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvckFsbCgnLmZvb3Rlcl9fbGlua3MnKTtcclxuXHJcbiAgICAgICAgLy8gd2luZG93LmFkZEV2ZW50TGlzdGVuZXIoJ2xvYWQnLCAoKSA9PiBzaG93SGlkZUxpbmtzKTtcclxuICAgICAgICB3aW5kb3cuYWRkRXZlbnRMaXN0ZW5lcigncmVzaXplJywgKCkgPT4ge1xyXG4gICAgICAgICAgICBpZiAod2luZG93LnNjcmVlbi53aWR0aCA8PSA1NzYpIHtcclxuICAgICAgICAgICAgICAgIGZvb3RlckxpbmtzLmZvckVhY2goZm9vdGVyTGluayA9PiB7XHJcbiAgICAgICAgICAgICAgICAgICAgZm9vdGVyTGluay5zdHlsZS5tYXhIZWlnaHQgPSAwO1xyXG4gICAgICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgICAgICBmb290ZXJMaW5rcy5mb3JFYWNoKGZvb3RlckxpbmsgPT4ge1xyXG4gICAgICAgICAgICAgICAgICAgIGZvb3Rlckxpbmsuc3R5bGUubWF4SGVpZ2h0ID0gbnVsbDtcclxuICAgICAgICAgICAgICAgIH0pO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfSk7XHJcblxyXG4gICAgICAgIGZvb3RlclRpdGxlLmZvckVhY2godGl0bGUgPT4ge1xyXG4gICAgICAgICAgICB0aXRsZS5hZGRFdmVudExpc3RlbmVyKCdjbGljaycsIGZ1bmN0aW9uICgpIHtcclxuICAgICAgICAgICAgICAgIGNvbnN0IGZvb3RlckxpbmtzID0gdGhpcy5uZXh0RWxlbWVudFNpYmxpbmc7XHJcbiAgICAgICAgICAgICAgICBpZiAoZ2V0Q29tcHV0ZWRTdHlsZShmb290ZXJMaW5rcykubWF4SGVpZ2h0ID09ICcwcHgnKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5jbGFzc0xpc3QuYWRkKCdhY3RpdmUnKTtcclxuICAgICAgICAgICAgICAgICAgICBmb290ZXJMaW5rcy5zdHlsZS5tYXhIZWlnaHQgPSBmb290ZXJMaW5rcy5zY3JvbGxIZWlnaHQgKyBcInB4XCI7XHJcbiAgICAgICAgICAgICAgICAgICAgZm9vdGVyTGlua3Muc3R5bGUub3BhY2l0eSA9IDE7XHJcbiAgICAgICAgICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICAgICAgICAgIHRoaXMuY2xhc3NMaXN0LnJlbW92ZSgnYWN0aXZlJyk7XHJcbiAgICAgICAgICAgICAgICAgICAgZm9vdGVyTGlua3Muc3R5bGUubWF4SGVpZ2h0ID0gbnVsbDtcclxuICAgICAgICAgICAgICAgICAgICBmb290ZXJMaW5rcy5zdHlsZS5vcGFjaXR5ID0gbnVsbDtcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgfSlcclxuICAgICAgICB9KTtcclxuICAgIH1cclxuXHJcbiAgICBzaG93Rm9vdGVyTGlua3MoKTtcclxuXHJcbiAgICBjb25zdCBzZXRQZXJjZW50ID0gKCkgPT4ge1xyXG4gICAgICAgIGNvbnN0IGNpcmN1bGFyUHJvZ3Jlc3MgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yQWxsKFwiLmpzLWNpcmN1bGFyLXByb2dyZXNzXCIpO1xyXG5cclxuICAgICAgICBjaXJjdWxhclByb2dyZXNzLmZvckVhY2goaXRlbSA9PiB7XHJcbiAgICAgICAgICAgIGNvbnN0IGNpcmNsZSA9IGl0ZW0ucXVlcnlTZWxlY3RvcignLmNpcmN1bGFyLXByb2dyZXNzX19wZXJjZW50Jyk7XHJcbiAgICAgICAgICAgIGNvbnN0IHRleHQgPSBpdGVtLnF1ZXJ5U2VsZWN0b3IoJy5jaXJjdWxhci1pbmZvX19udW1iZXInKTtcclxuICAgICAgICAgICAgY29uc3QgZGF0YVBlcmNlbnQgPSBpdGVtLmdldEF0dHJpYnV0ZSgnZGF0YS1wZXJjZW50Jyk7XHJcbiAgICAgICAgICAgIGNvbnN0IHBlcmNlbnQgPSAoMTAwIC0gZGF0YVBlcmNlbnQpIC8gMTAwO1xyXG4gICAgICAgICAgICBjaXJjbGUuc3R5bGUuc3Ryb2tlRGFzaG9mZnNldCA9IGBjYWxjKDIqMzAqMy4xNCoke3BlcmNlbnR9KWA7XHJcbiAgICAgICAgICAgIHRleHQudGV4dENvbnRlbnQgPSBkYXRhUGVyY2VudDtcclxuICAgICAgICB9KTtcclxuICAgIH1cclxuXHJcbiAgICBzZXRQZXJjZW50KCk7XHJcblxyXG4gICAgZG9jdW1lbnQuYWRkRXZlbnRMaXN0ZW5lcihcImJsdXJcIiwgZnVuY3Rpb24gKGUpIHtcclxuICAgICAgICBpZiAoZS50YXJnZXQuY2xhc3NMaXN0LmNvbnRhaW5zKCdjb250YWN0LWZvcm1fX2ZpZWxkJykgfHwgZS50YXJnZXQuY2xhc3NMaXN0LmNvbnRhaW5zKCdjb250YWN0LWZvcm1fX21lc3NhZ2UnKSkge1xyXG4gICAgICAgICAgICBpZiAoZS50YXJnZXQudmFsdWUudHJpbSgpICE9ICcnKSB7XHJcbiAgICAgICAgICAgICAgICBlLnRhcmdldC5uZXh0RWxlbWVudFNpYmxpbmcuY2xhc3NMaXN0LmFkZCgnYWN0aXZlJyk7XHJcbiAgICAgICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgICAgICBlLnRhcmdldC5uZXh0RWxlbWVudFNpYmxpbmcuY2xhc3NMaXN0LnJlbW92ZSgnYWN0aXZlJyk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcbiAgICB9LCB0cnVlKTtcclxuXHJcbiAgICBjb25zdCBwcmljZVNsaWRlciA9ICgpID0+IHtcclxuICAgICAgICBjb25zdCByYW5nZUlucHV0cyA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3JBbGwoXCIucHJpY2UtcmFuZ2VfX2lucHV0XCIpLFxyXG4gICAgICAgICAgICBwcmljZUlucHV0cyA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3JBbGwoXCIucHJpY2UtaW5wdXRfX2ZpZWxkXCIpLFxyXG4gICAgICAgICAgICBwcm9ncmVzcyA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoXCIucHJpY2Utc2xpZGVyX19wcm9ncmVzc1wiKTtcclxuXHJcbiAgICAgICAgbGV0IHByaWNlR2FwID0gNTAwO1xyXG5cclxuICAgICAgICBwcmljZUlucHV0cy5mb3JFYWNoKChwcmljZUlucHV0KSA9PiB7XHJcbiAgICAgICAgICAgIHByaWNlSW5wdXQuYWRkRXZlbnRMaXN0ZW5lcihcImlucHV0XCIsIChlKSA9PiB7XHJcbiAgICAgICAgICAgICAgICBsZXQgbWluVmFsID0gcGFyc2VJbnQocHJpY2VJbnB1dHNbMF0udmFsdWUpLFxyXG4gICAgICAgICAgICAgICAgICAgIG1heFZhbCA9IHBhcnNlSW50KHByaWNlSW5wdXRzWzFdLnZhbHVlKTtcclxuXHJcbiAgICAgICAgICAgICAgICBpZiAobWF4VmFsIC0gbWluVmFsID49IHByaWNlR2FwICYmIG1heFZhbCA8PSA1MDAwMCkge1xyXG4gICAgICAgICAgICAgICAgICAgIGlmIChlLnRhcmdldC5jbGFzc0xpc3QuY29udGFpbnMoXCJwcmljZS1taW5cIikpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgcmFuZ2VJbnB1dHNbMF0udmFsdWUgPSBtaW5WYWw7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHByb2dyZXNzLnN0eWxlLmxlZnQgPSAobWluVmFsIC8gcmFuZ2VJbnB1dHNbMF0ubWF4KSAqIDEwMCArIFwiJVwiO1xyXG4gICAgICAgICAgICAgICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHJhbmdlSW5wdXRzWzFdLnZhbHVlID0gbWF4VmFsO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBwcm9ncmVzcy5zdHlsZS5yaWdodCA9IDEwMCAtIChtYXhWYWwgLyByYW5nZUlucHV0c1sxXS5tYXgpICogMTAwICsgXCIlXCI7XHJcbiAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB9KTtcclxuICAgICAgICB9KTtcclxuXHJcbiAgICAgICAgcmFuZ2VJbnB1dHMuZm9yRWFjaCgocmFuZ2VJbnB1dCkgPT4ge1xyXG4gICAgICAgICAgICByYW5nZUlucHV0LmFkZEV2ZW50TGlzdGVuZXIoXCJpbnB1dFwiLCAoZSkgPT4ge1xyXG4gICAgICAgICAgICAgICAgbGV0IG1pblZhbCA9IHBhcnNlSW50KHJhbmdlSW5wdXRzWzBdLnZhbHVlKSxcclxuICAgICAgICAgICAgICAgICAgICBtYXhWYWwgPSBwYXJzZUludChyYW5nZUlucHV0c1sxXS52YWx1ZSk7XHJcblxyXG4gICAgICAgICAgICAgICAgaWYgKG1heFZhbCAtIG1pblZhbCA8IHByaWNlR2FwKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgaWYgKGUudGFyZ2V0LmNsYXNzTGlzdC5jb250YWlucyhcInJhbmdlLW1pblwiKSkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICByYW5nZUlucHV0c1swXS52YWx1ZSA9IG1heFZhbCAtIHByaWNlR2FwO1xyXG4gICAgICAgICAgICAgICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHJhbmdlSW5wdXRzWzFdLnZhbHVlID0gbWluVmFsICsgcHJpY2VHYXA7XHJcbiAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgICAgICAgICBwcmljZUlucHV0c1swXS52YWx1ZSA9IG1pblZhbDtcclxuICAgICAgICAgICAgICAgICAgICBwcmljZUlucHV0c1sxXS52YWx1ZSA9IG1heFZhbDtcclxuICAgICAgICAgICAgICAgICAgICBwcm9ncmVzcy5zdHlsZS5sZWZ0ID0gKG1pblZhbCAvIHJhbmdlSW5wdXRzWzBdLm1heCkgKiAxMDAgKyBcIiVcIjtcclxuICAgICAgICAgICAgICAgICAgICBwcm9ncmVzcy5zdHlsZS5yaWdodCA9IDEwMCAtIChtYXhWYWwgLyByYW5nZUlucHV0c1sxXS5tYXgpICogMTAwICsgXCIlXCI7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIH0pO1xyXG4gICAgICAgIH0pO1xyXG4gICAgfTtcclxuXHJcbiAgICBwcmljZVNsaWRlcigpO1xyXG5cclxuICAgIGNvbnN0IHZpZXdBbGwgPSAoKSA9PiB7XHJcbiAgICAgICAgaWYgKGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3JBbGwoXCIuZmlsdGVyLXZpZXctYWxsXCIpLmxlbmd0aCA9PSAwKSByZXR1cm4gZmFsc2U7XHJcbiAgICAgICAgY29uc3QgZmlsdGVyTGlzdCA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3JBbGwoXCIuZmlsdGVyLWxpc3RcIik7XHJcbiAgICAgICAgY29uc3Qgdmlld0FsbCA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3JBbGwoXCIuZmlsdGVyLXZpZXctYWxsXCIpO1xyXG5cclxuICAgICAgICBmaWx0ZXJMaXN0LmZvckVhY2gobGlzdCA9PiB7XHJcbiAgICAgICAgICAgIGlmIChsaXN0LmNoaWxkcmVuLmxlbmd0aCA+IDUpIHtcclxuICAgICAgICAgICAgICAgIGNvbnN0IGl0ZW1zID0gbGlzdC5jaGlsZHJlbjtcclxuICAgICAgICAgICAgICAgIGNvbnN0IHZpZXdBbGwgPSBsaXN0Lm5leHRFbGVtZW50U2libGluZztcclxuICAgICAgICAgICAgICAgIGZvciAobGV0IGkgPSAwLCBsZW4gPSBpdGVtcy5sZW5ndGg7IGkgPCBsZW47IGkrKykge1xyXG4gICAgICAgICAgICAgICAgICAgIGlmIChpID49IDUpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgaXRlbXNbaV0uc3R5bGUuZGlzcGxheSA9IFwibm9uZVwiO1xyXG4gICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIHZpZXdBbGwuc3R5bGUuZGlzcGxheSA9IFwiYmxvY2tcIjtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH0pO1xyXG5cclxuICAgICAgICB2aWV3QWxsLmZvckVhY2goZWwgPT4ge1xyXG4gICAgICAgICAgICBlbC5hZGRFdmVudExpc3RlbmVyKFwiY2xpY2tcIiwgZnVuY3Rpb24gKCkge1xyXG4gICAgICAgICAgICAgICAgY29uc3QgZmlsdGVySXRlbXMgPSB0aGlzLnByZXZpb3VzRWxlbWVudFNpYmxpbmcuY2hpbGRyZW47XHJcbiAgICAgICAgICAgICAgICBjb25zdCBmaWx0ZXJDb250ZW50ID0gdGhpcy5jbG9zZXN0KFwiLmZpbHRlci1jb250ZW50XCIpO1xyXG4gICAgICAgICAgICAgICAgZm9yIChsZXQgaSA9IDAsIGxlbiA9IGZpbHRlckl0ZW1zLmxlbmd0aDsgaSA8IGxlbjsgaSsrKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgaWYgKGkgPj0gNSkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBpZiAoZmlsdGVySXRlbXNbaV0uc3R5bGUuZGlzcGxheSkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgZmlsdGVySXRlbXNbaV0uc3R5bGUuZGlzcGxheSA9IG51bGw7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB0aGlzLnRleHRDb250ZW50ID0gXCJIaWRlXCJcclxuICAgICAgICAgICAgICAgICAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGZpbHRlckl0ZW1zW2ldLnN0eWxlLmRpc3BsYXkgPSBcIm5vbmVcIjtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMudGV4dENvbnRlbnQgPSBcIlZpZXcgYWxsXCJcclxuICAgICAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIGZpbHRlckNvbnRlbnQuc3R5bGUubWF4SGVpZ2h0ID0gZmlsdGVyQ29udGVudC5zY3JvbGxIZWlnaHQgKyBcInB4XCI7XHJcbiAgICAgICAgICAgIH0pO1xyXG4gICAgICAgIH0pO1xyXG4gICAgfVxyXG5cclxuICAgIHZpZXdBbGwoKTtcclxuXHJcbiAgICAkKFwiLmpzLXByb2R1Y3Qtc2xpZGVyLXByZXZpZXdcIikuc2xpY2soe1xyXG4gICAgICAgIHNsaWRlc1RvU2hvdzogNCxcclxuICAgICAgICB2ZXJ0aWNhbDogdHJ1ZSxcclxuICAgICAgICB2ZXJ0aWNhbFN3aXBpbmc6IHRydWUsXHJcbiAgICAgICAgc2xpZGVzVG9TY3JvbGw6IDEsXHJcbiAgICAgICAgZm9jdXNPblNlbGVjdDogdHJ1ZSxcclxuICAgICAgICBwcmV2QXJyb3c6IFwiLnByb2R1Y3Qtc2xpZGVyLXByZXZpZXdfX2J0bi0tcHJldlwiLFxyXG4gICAgICAgIG5leHRBcnJvdzogXCIucHJvZHVjdC1zbGlkZXItcHJldmlld19fYnRuLS1uZXh0XCIsXHJcbiAgICAgICAgdmFyaWFibGVXaWR0aDogdHJ1ZSxcclxuICAgICAgICBhc05hdkZvcjogXCIucHJvZHVjdC1zbGlkZXItbWFpblwiXHJcbiAgICB9KTtcclxuICAgICQoXCIucHJvZHVjdC1zbGlkZXItbWFpblwiKS5zbGljayh7XHJcbiAgICAgICAgc2xpZGVzVG9TaG93OiAxLFxyXG4gICAgICAgIHNsaWRlc1RvU2Nyb2xsOiAxLFxyXG4gICAgICAgIGFycm93czogZmFsc2UsXHJcbiAgICAgICAgZmFkZTogdHJ1ZSxcclxuICAgICAgICBhc05hdkZvcjogXCIuanMtcHJvZHVjdC1zbGlkZXItcHJldmlld1wiXHJcbiAgICB9KTtcclxuICAgICQoXCIuanMtcHJvZHVjdC1jb21wYXJlLXNsaWRlclwiKS5zbGljayh7XHJcbiAgICAgICAgc2xpZGVzVG9TaG93OiAxLFxyXG4gICAgICAgIHNsaWRlc1RvU2Nyb2xsOiAxLFxyXG4gICAgICAgIHByZXZBcnJvdzogXCIucHJvZHVjdC1jb21wYXJlLXNsaWRlcl9fYnRuLS1wcmV2XCIsXHJcbiAgICAgICAgbmV4dEFycm93OiBcIi5wcm9kdWN0LWNvbXBhcmUtc2xpZGVyX19idG4tLW5leHRcIixcclxuICAgICAgICAvLyB2YXJpYWJsZVdpZHRoOiB0cnVlLFxyXG4gICAgfSk7XHJcbiAgICAkKFwiLmpzLXJlbGF0ZWQtcHJvZHVjdHMtc2xpZGVyXCIpLnNsaWNrKHtcclxuICAgICAgICBzbGlkZXNUb1Nob3c6IDMsXHJcbiAgICAgICAgc2xpZGVzVG9TY3JvbGw6IDEsXHJcbiAgICAgICAgcHJldkFycm93OiBcIi5qcy1yZWxhdGVkLXByZXZcIixcclxuICAgICAgICBuZXh0QXJyb3c6IFwiLmpzLXJlbGF0ZWQtbmV4dFwiLFxyXG4gICAgICAgIHJlc3BvbnNpdmU6IFtcclxuICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgYnJlYWtwb2ludDogNzY4LFxyXG4gICAgICAgICAgICAgICAgc2V0dGluZ3M6IHtcclxuICAgICAgICAgICAgICAgICAgICBzbGlkZXNUb1Nob3c6IDIsXHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIH0sXHJcbiAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICAgIGJyZWFrcG9pbnQ6IDU3NixcclxuICAgICAgICAgICAgICAgIHNldHRpbmdzOiB7XHJcbiAgICAgICAgICAgICAgICAgICAgc2xpZGVzVG9TaG93OiAxLFxyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB9LFxyXG4gICAgICAgIF1cclxuICAgIH0pO1xyXG4gICAgJChcIi5qcy1yZXNlbnRseS12aWV3ZWQtc2xpZGVyXCIpLnNsaWNrKHtcclxuICAgICAgICBzbGlkZXNUb1Nob3c6IDQsXHJcbiAgICAgICAgc2xpZGVzVG9TY3JvbGw6IDEsXHJcbiAgICAgICAgcHJldkFycm93OiBcIi5qcy1yZXNlbnRseS12aWV3ZWQtcHJldlwiLFxyXG4gICAgICAgIG5leHRBcnJvdzogXCIuanMtcmVzZW50bHktdmlld2VkLW5leHRcIixcclxuICAgICAgICByZXNwb25zaXZlOiBbXHJcbiAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICAgIGJyZWFrcG9pbnQ6IDk5MixcclxuICAgICAgICAgICAgICAgIHNldHRpbmdzOiB7XHJcbiAgICAgICAgICAgICAgICAgICAgc2xpZGVzVG9TaG93OiAzLFxyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB9LFxyXG4gICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgICBicmVha3BvaW50OiA3NjgsXHJcbiAgICAgICAgICAgICAgICBzZXR0aW5nczoge1xyXG4gICAgICAgICAgICAgICAgICAgIHNsaWRlc1RvU2hvdzogMixcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgfSxcclxuICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgYnJlYWtwb2ludDogNTc2LFxyXG4gICAgICAgICAgICAgICAgc2V0dGluZ3M6IHtcclxuICAgICAgICAgICAgICAgICAgICBzbGlkZXNUb1Nob3c6IDEsXHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIH0sXHJcbiAgICAgICAgXVxyXG4gICAgfSk7XHJcbiAgICAkKCdib2R5Jykub24oJ2tleXVwJywgJy5qcy1zZWFyY2gtbWF0Y2hlcycsIGZ1bmN0aW9uICgpIHtcclxuICAgICAgICBsZXQgc2VsZiA9ICQodGhpcyk7XHJcbiAgICAgICAgbGV0IGxpc3QgPSAkKCcuJyArIHNlbGYuZGF0YSgnbGlzdCcpKTtcclxuICAgICAgICAkLmFqYXgoe1xyXG4gICAgICAgICAgICB1cmw6IHNlbGYuZGF0YSgndXJsJykgKyAnP3E9JyArIHNlbGYudmFsKCksXHJcbiAgICAgICAgICAgIHR5cGU6ICdHRVQnLFxyXG4gICAgICAgICAgICBkYXRhVHlwZTogJ2pzb24nLFxyXG4gICAgICAgICAgICBzdWNjZXNzOiBmdW5jdGlvbiAocmVzcG9uc2UpIHtcclxuICAgICAgICAgICAgICAgIGxpc3QuZW1wdHkoKTtcclxuXHJcbiAgICAgICAgICAgICAgICBpZiAocmVzcG9uc2UuaXRlbXMubGVuZ3RoKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgJC5lYWNoKHJlc3BvbnNlLml0ZW1zLCBmdW5jdGlvbiAoaSwgaXRlbSkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBsaXN0LmFwcGVuZChgPGEgY2xhc3M9XCJzZWFyY2gtZm9ybS1tYXRjaGVzX19saW5rXCIgaHJlZj1cIiR7aXRlbS51cmx9XCI+JHtpdGVtLnRpdGxlfTwvYT5gKTtcclxuICAgICAgICAgICAgICAgICAgICB9KTtcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH0pO1xyXG4gICAgfSk7XHJcbn0pKCk7Il0sImZpbGUiOiJtYWluLmpzIn0=
