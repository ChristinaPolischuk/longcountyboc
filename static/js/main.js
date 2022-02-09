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

  showHideSidebarFilters(); // hamburger open/close animation

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
//# sourceMappingURL=data:application/json;charset=utf8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIm1haW4uanMiXSwibmFtZXMiOlsiY3JvcFRleHQiLCJoaWRlQmxvY2siLCJyZWFkTW9yZSIsImRvY3VtZW50IiwicXVlcnlTZWxlY3RvckFsbCIsImZvckVhY2giLCJlbCIsImFkZEV2ZW50TGlzdGVuZXIiLCJlbFRleHQiLCJpbm5lclRleHQiLCJoaWRkZW5UZXh0IiwicHJldmlvdXNFbGVtZW50U2libGluZyIsImNsYXNzTGlzdCIsInRvZ2dsZSIsIm1heCIsInRleHQiLCJzdHIiLCJ0cmltIiwibGVuZ3RoIiwic3ViU3RyIiwic3Vic3RyaW5nIiwiaGlkZGVuU3RyIiwiaW5uZXJIVE1MIiwic2hvd1JldmlldyIsImltYWdlcyIsIm5leHRFbGVtZW50U2libGluZyIsInByb2R1Y3RSZXZpZXciLCJwcm9kdWN0VGV4dCIsInF1ZXJ5U2VsZWN0b3IiLCJjcmVhdGVFbGVtZW50IiwiYWRkIiwidGV4dENvbnRlbnQiLCJhZnRlciIsImJlZm9yZSIsImFjY29yZGlvbiIsImUiLCJ0YXJnZXQiLCJjb250YWlucyIsImNsb3Nlc3QiLCJhY2NvcmRpb25Db250ZW50Iiwic3R5bGUiLCJtYXhIZWlnaHQiLCJnZXRDb21wdXRlZFN0eWxlIiwicGFyZW50RWxlbWVudCIsInJlbW92ZSIsInNjcm9sbEhlaWdodCIsInNpZGViYXJMaW5rcyIsImVsZW0iLCJuYXZiYXJMaW5rQ2xpY2siLCJldmVudCIsInNtb290aFNjcm9sbCIsInByZXZlbnREZWZhdWx0IiwidGFyZ2V0SWQiLCJjdXJyZW50VGFyZ2V0IiwiZ2V0QXR0cmlidXRlIiwid2luZG93Iiwic2NyZWVuIiwid2lkdGgiLCJzY3JvbGxUbyIsInRvcCIsIm9mZnNldFRvcCIsImJlaGF2aW9yIiwidG9nZ2xlRml4ZWQiLCJ0aHJvdHRsZSIsInRyYWNrU2Nyb2xsIiwiZWxlbWVudHMiLCJzdGlja3lCbG9ja3MiLCJwYWdlWU9mZnNldCIsInN0aWNreUJsb2NrQ29vcmRzIiwiZ2V0Qm91bmRpbmdDbGllbnRSZWN0IiwiYm90dG9tIiwidHlwZSIsIm5hbWUiLCJvYmoiLCJydW5uaW5nIiwiZnVuYyIsInJlcXVlc3RBbmltYXRpb25GcmFtZSIsImRpc3BhdGNoRXZlbnQiLCJDdXN0b21FdmVudCIsImVsZW1lbnQiLCJmaXhlZFdpZHRoIiwiY2xpZW50V2lkdGgiLCJzaG93SGlkZVNpZGViYXJGaWx0ZXJzIiwic2hvd0hpZGVGaWx0ZXJzIiwic2lkZWJhckZpbHRlcnMiLCJmaWx0ZXIiLCJ0cmlnZ2VyIiwibW9iaWxlTmF2IiwiaXNDbG9zZWQiLCJidXJnZXJUaW1lIiwic2VhcmNoQnRuIiwidmFsdWUiLCJwcm9kdWN0UmV2aWV3U3RhcnMiLCJkYXRhUmF0aW5nIiwic3RhcnMiLCJjaGlsZHJlbiIsImkiLCJjaG9vc2VSYXRpbmciLCJyYXRpbmciLCJyYXRpbmdTdGFycyIsInJlbW92ZUNsYXNzIiwibW91c2VPdmVyQWN0aXZlQ2xhc3MiLCJhZGRDbGFzcyIsIm1vdXNlT3V0QWN0aXZlQ2xhc3MiLCJhcnIiLCJpTGVuZyIsImoiLCJhcmd1bWVudHMiLCJpTGVuIiwiY2FyZXREcm9wZG93biIsImZpcnN0RWxlbWVudENoaWxkIiwiZHJvcGRvd24iLCJvcGFjaXR5IiwiYmFzaWNTY3JvbGxUb3AiLCJidG5Ub3AiLCJidG5SZXZlYWwiLCJzY3JvbGxZIiwiVG9wc2Nyb2xsVG8iLCJzZXRUaW1lb3V0Iiwib3Blbk1vZGFsIiwibW9kYWxCdG4iLCJtb2RhbENvbnRhaW5lciIsImJvZHkiLCJrZXlDb2RlIiwic2VlTW9yZSIsIm51bWJlciIsImJ1dHRvbiIsInNob3dIaWRlQmxvY2tzIiwiaW5kZXgiLCJkaXNwbGF5IiwiZWxlbXMiLCJidG5TaG93SGlkZSIsInNob3dJdGVtcyIsIm51bWJlckRlc2t0b3AiLCJudW1iZXJNb2JpbGUiLCJpdGVtcyIsImJ0biIsInNob3dIaWRlSXRlbXMiLCJlbHMiLCJzaG93Rm9vdGVyTGlua3MiLCJmb290ZXJUaXRsZSIsImZvb3RlckxpbmtzIiwiZm9vdGVyTGluayIsInRpdGxlIiwic2V0UGVyY2VudCIsImNpcmN1bGFyUHJvZ3Jlc3MiLCJpdGVtIiwiY2lyY2xlIiwiZGF0YVBlcmNlbnQiLCJwZXJjZW50Iiwic3Ryb2tlRGFzaG9mZnNldCIsInByaWNlU2xpZGVyIiwicmFuZ2VJbnB1dHMiLCJwcmljZUlucHV0cyIsInByb2dyZXNzIiwicHJpY2VHYXAiLCJwcmljZUlucHV0IiwibWluVmFsIiwicGFyc2VJbnQiLCJtYXhWYWwiLCJsZWZ0IiwicmlnaHQiLCJyYW5nZUlucHV0Iiwidmlld0FsbCIsImZpbHRlckxpc3QiLCJsaXN0IiwibGVuIiwiZmlsdGVySXRlbXMiLCJmaWx0ZXJDb250ZW50IiwiJCIsInNsaWNrIiwic2xpZGVzVG9TaG93IiwidmVydGljYWwiLCJ2ZXJ0aWNhbFN3aXBpbmciLCJzbGlkZXNUb1Njcm9sbCIsImZvY3VzT25TZWxlY3QiLCJwcmV2QXJyb3ciLCJuZXh0QXJyb3ciLCJ2YXJpYWJsZVdpZHRoIiwiYXNOYXZGb3IiLCJhcnJvd3MiLCJmYWRlIiwicmVzcG9uc2l2ZSIsImJyZWFrcG9pbnQiLCJzZXR0aW5ncyIsIm9uIiwic2VsZiIsImRhdGEiLCJhamF4IiwidXJsIiwidmFsIiwiZGF0YVR5cGUiLCJzdWNjZXNzIiwicmVzcG9uc2UiLCJlbXB0eSIsImVhY2giLCJhcHBlbmQiXSwibWFwcGluZ3MiOiI7O0FBQUE7O0FBQ0EsQ0FBQyxZQUFZO0FBQ1RBLEVBQUFBLFFBQVE7QUFDUkMsRUFBQUEsU0FBUztBQUVULE1BQUlDLFFBQVEsR0FBR0MsUUFBUSxDQUFDQyxnQkFBVCxDQUEwQixlQUExQixDQUFmO0FBRUFGLEVBQUFBLFFBQVEsQ0FBQ0csT0FBVCxDQUFpQixVQUFBQyxFQUFFLEVBQUk7QUFDbkJBLElBQUFBLEVBQUUsQ0FBQ0MsZ0JBQUgsQ0FBb0IsT0FBcEIsRUFBNkIsWUFBTTtBQUMvQixVQUFJQyxNQUFNLEdBQUdGLEVBQUUsQ0FBQ0csU0FBaEI7QUFDQSxVQUFJQyxVQUFVLEdBQUdKLEVBQUUsQ0FBQ0ssc0JBQXBCO0FBRUFMLE1BQUFBLEVBQUUsQ0FB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R0FqQkQ7QUFrQkgsQ0Exc0JEIiwic291cmNlc0NvbnRlbnQiOlsiO1xyXG4oZnVuY3Rpb24gKCkge1xyXG4gICAgY3JvcFRleHQoKTtcclxuICAgIGhpZGVCbG9jaygpO1xyXG5cclxuICAgIGxldCByZWFkTW9yZSA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3JBbGwoJy5qcy1yZWFkLW1vcmUnKTtcclxuXHJcbiAgICByZWFkTW9yZS5mb3JFYWNoKGVsID0+IHtcclxuICAgICAgICBlbC5hZGRFdmVudExpc3RlbmVyKCdjbGljaycsICgpID0+IHtcclxuICAgICAgICAgICAgbGV0IGVsVGV4dCA9IGVsLmlubmVyVGV4dDtcclxuICAgICAgICAgICAgbGV0IGhpZGRlblRleHQgPSBlbC5wcmV2aW91c0VsZW1lbnRTaWJsaW5nO1xyXG5cclxuICAgICAgICAgICAgZWwuaW5uZXJUZXh0ID0gZWxUZXh0ID09ICdyZWFkIG1vcmUgPicgPyAnaGlkZScgOiAncmVhZCBtb3JlID4nO1xyXG4gICAgICAgICAgICBoaWRkZW5UZXh0LmNsYXNzTGlzdC50b2dnbGUoJ3Nob3cnKTtcclxuICAgICAgICB9KTtcclxuICAgIH0pO1xyXG5cclxuICAgIGZ1bmN0aW9uIGNyb3BUZXh0KCkge1xyXG4gICAgICAgIGxldCBtYXggPSAyMDA7XHJcbiAgICAgICAgbGV0IHRleHQgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yQWxsKCcuanMtcmVhZC1tb3JlLXRleHQnKTtcclxuICAgICAgICB0ZXh0LmZvckVhY2goZWwgPT4ge1xyXG4gICAgICAgICAgICBsZXQgc3RyID0gZWwuaW5uZXJUZXh0LnRyaW0oKTtcclxuICAgICAgICAgICAgaWYgKHN0ci5sZW5ndGggPiBtYXgpIHtcclxuICAgICAgICAgICAgICAgIGxldCBzdWJTdHIgPSBzdHIuc3Vic3RyaW5nKDAsIG1heCk7XHJcbiAgICAgICAgICAgICAgICBsZXQgaGlkZGVuU3RyID0gc3RyLnN1YnN0cmluZyhtYXgsIHN0ci5sZW5ndGgpO1xyXG4gICAgICAgICAgICAgICAgZWwuaW5uZXJUZXh0ID0gc3ViU3RyO1xyXG4gICAgICAgICAgICAgICAgZWwuaW5uZXJIVE1MICs9IGA8c3BhbiBjbGFzcz1cImhpZGRlbi10ZXh0IGpzLWhpZGRlbi10ZXh0XCI+JHtoaWRkZW5TdHJ9PC9zcGFuPmA7XHJcbiAgICAgICAgICAgICAgICBlbC5pbm5lckhUTUwgKz0gJzxzcGFuIGNsYXNzPVwicmVhZC1tb3JlIGpzLXJlYWQtbW9yZVwiPnJlYWQgbW9yZSA+PC9zcGFuPic7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9KTtcclxuICAgIH1cclxuXHJcbiAgICBsZXQgc2hvd1JldmlldyA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3JBbGwoJy5qcy1zaG93LXJldmlldycpO1xyXG5cclxuICAgIHNob3dSZXZpZXcuZm9yRWFjaChlbCA9PiB7XHJcbiAgICAgICAgZWwuYWRkRXZlbnRMaXN0ZW5lcignY2xpY2snLCAoKSA9PiB7XHJcbiAgICAgICAgICAgIGxldCBlbFRleHQgPSBlbC5pbm5lclRleHQ7XHJcbiAgICAgICAgICAgIGxldCBoaWRkZW5UZXh0ID0gZWwucHJldmlvdXNFbGVtZW50U2libGluZztcclxuICAgICAgICAgICAgbGV0IGltYWdlcyA9IGVsLm5leHRFbGVtZW50U2libGluZztcclxuXHJcbiAgICAgICAgICAgIGVsLmlubmVyVGV4dCA9IGVsVGV4dCA9PSAncmVhZCBtb3JlID4nID8gJzwgaGlkZScgOiAncmVhZCBtb3JlID4nO1xyXG4gICAgICAgICAgICBoaWRkZW5UZXh0LmNsYXNzTGlzdC50b2dnbGUoJ3Nob3cnKTtcclxuICAgICAgICAgICAgaW1hZ2VzLmNsYXNzTGlzdC50b2dnbGUoXCJzaG93XCIpO1xyXG4gICAgICAgIH0pO1xyXG4gICAgfSk7XHJcblxyXG4gICAgZnVuY3Rpb24gaGlkZUJsb2NrKCkge1xyXG4gICAgICAgIGxldCBtYXggPSAxMjg7XHJcbiAgICAgICAgbGV0IHByb2R1Y3RSZXZpZXcgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yQWxsKCcuanMtaGlkZS1yZXZpZXcnKTtcclxuICAgICAgICBwcm9kdWN0UmV2aWV3LmZvckVhY2goZWwgPT4ge1xyXG4gICAgICAgICAgICBsZXQgcHJvZHVjdFRleHQgPSBlbC5xdWVyeVNlbGVjdG9yKFwiLnBhZ2UtdGV4dFwiKTtcclxuICAgICAgICAgICAgbGV0IHN0ciA9IHByb2R1Y3RUZXh0LmlubmVyVGV4dC50cmltKCk7XHJcbiAgICAgICAgICAgIGxldCBpbWFnZXMgPSBlbC5xdWVyeVNlbGVjdG9yKCcucHJvZHVjdC1yZXZpZXdfX2ltYWdlcycpO1xyXG4gICAgICAgICAgICBpZiAoc3RyLmxlbmd0aCA+IG1heCkge1xyXG4gICAgICAgICAgICAgICAgbGV0IHN1YlN0ciA9IHN0ci5zdWJzdHJpbmcoMCwgbWF4KTtcclxuICAgICAgICAgICAgICAgIGxldCBoaWRkZW5TdHIgPSBzdHIuc3Vic3RyaW5nKG1heCwgc3RyLmxlbmd0aCk7XHJcbiAgICAgICAgICAgICAgICBwcm9kdWN0VGV4dC5pbm5lclRleHQgPSBzdWJTdHI7XHJcblxyXG4gICAgICAgICAgICAgICAgbGV0IGhpZGRlblRleHQgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdzcGFuJyk7XHJcbiAgICAgICAgICAgICAgICBoaWRkZW5UZXh0LmNsYXNzTGlzdC5hZGQoJ2hpZGRlbi10ZXh0JywgJ3BhZ2UtdGV4dCcsICdqcy1oaWRkZW4tdGV4dCcpO1xyXG4gICAgICAgICAgICAgICAgaGlkZGVuVGV4dC50ZXh0Q29udGVudCA9IGhpZGRlblN0cjtcclxuXHJcbiAgICAgICAgICAgICAgICBwcm9kdWN0VGV4dC5hZnRlcihoaWRkZW5UZXh0KTtcclxuXHJcbiAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgIGxldCByZWFkTW9yZSA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ3NwYW4nKTtcclxuICAgICAgICAgICAgcmVhZE1vcmUuY2xhc3NMaXN0LmFkZCgncmVhZC1tb3JlJywgJ2pzLXNob3ctcmV2aWV3Jyk7XHJcbiAgICAgICAgICAgIHJlYWRNb3JlLnRleHRDb250ZW50ID0gJ3JlYWQgbW9yZSA+JztcclxuXHJcbiAgICAgICAgICAgIGltYWdlcy5iZWZvcmUocmVhZE1vcmUpO1xyXG4gICAgICAgIH0pO1xyXG4gICAgfVxyXG5cclxuICAgIGNvbnN0IGFjY29yZGlvbiA9ICgpID0+IHtcclxuICAgICAgICBkb2N1bWVudC5hZGRFdmVudExpc3RlbmVyKCdjbGljaycsIGUgPT4ge1xyXG4gICAgICAgICAgICBpZiAoZS50YXJnZXQuY2xhc3NMaXN0LmNvbnRhaW5zKCdqcy1hY2NvcmRpb24nKSB8fCBlLnRhcmdldC5jbG9zZXN0KCcuanMtYWNjb3JkaW9uJykpIHtcclxuICAgICAgICAgICAgICAgIGNvbnN0IGFjY29yZGlvbiA9IGUudGFyZ2V0LmNsYXNzTGlzdC5jb250YWlucygnanMtYWNjb3JkaW9uJykgPyBlLnRhcmdldCA6IGUudGFyZ2V0LmNsb3Nlc3QoJy5qcy1hY2NvcmRpb24nKTtcclxuICAgICAgICAgICAgICAgIGNvbnN0IGFjY29yZGlvbkNvbnRlbnQgPSBhY2NvcmRpb24ubmV4dEVsZW1lbnRTaWJsaW5nO1xyXG4gICAgICAgICAgICAgICAgaWYgKGFjY29yZGlvbkNvbnRlbnQuc3R5bGUubWF4SGVpZ2h0IHx8IGdldENvbXB1dGVkU3R5bGUoYWNjb3JkaW9uQ29udGVudCkubWF4SGVpZ2h0ID09IFwibWF4LWNvbnRlbnRcIikge1xyXG4gICAgICAgICAgICAgICAgICAgIGFjY29yZGlvbi5wYXJlbnRFbGVtZW50LmNsYXNzTGlzdC5yZW1vdmUoXCJhY3RpdmVcIik7XHJcbiAgICAgICAgICAgICAgICAgICAgYWNjb3JkaW9uQ29udGVudC5zdHlsZS5tYXhIZWlnaHQgPSBudWxsO1xyXG4gICAgICAgICAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgICAgICAgICBhY2NvcmRpb24ucGFyZW50RWxlbWVudC5jbGFzc0xpc3QuYWRkKFwiYWN0aXZlXCIpO1xyXG4gICAgICAgICAgICAgICAgICAgIGFjY29yZGlvbkNvbnRlbnQuc3R5bGUubWF4SGVpZ2h0ID0gYWNjb3JkaW9uQ29udGVudC5zY3JvbGxIZWlnaHQgKyBcInB4XCI7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9KTtcclxuICAgIH1cclxuICAgIGFjY29yZGlvbigpO1xyXG5cclxuICAgIGNvbnN0IHNpZGViYXJMaW5rcyA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3JBbGwoXCIuc2lkZWJhci1tZW51X19saW5rXCIpO1xyXG5cclxuICAgIHNpZGViYXJMaW5rcy5mb3JFYWNoKGVsZW0gPT4gZWxlbS5hZGRFdmVudExpc3RlbmVyKFwiY2xpY2tcIiwgbmF2YmFyTGlua0NsaWNrKSk7XHJcblxyXG4gICAgZnVuY3Rpb24gbmF2YmFyTGlua0NsaWNrKGV2ZW50KSB7XHJcbiAgICAgICAgc21vb3RoU2Nyb2xsKGV2ZW50KTtcclxuICAgIH1cclxuXHJcbiAgICBmdW5jdGlvbiBzbW9vdGhTY3JvbGwoZXZlbnQpIHtcclxuICAgICAgICBldmVudC5wcmV2ZW50RGVmYXVsdCgpO1xyXG4gICAgICAgIGNvbnN0IHRhcmdldElkID0gZXZlbnQuY3VycmVudFRhcmdldC5nZXRBdHRyaWJ1dGUoXCJocmVmXCIpO1xyXG4gICAgICAgIGlmICh3aW5kb3cuc2NyZWVuLndpZHRoID4gMTAyNCkge1xyXG4gICAgICAgICAgICB3aW5kb3cuc2Nyb2xsVG8oe1xyXG4gICAgICAgICAgICAgICAgdG9wOiB0YXJnZXRJZCA9PT0gXCIjXCIgPyAwIDogZG9jdW1lbnQucXVlcnlTZWxlY3Rvcih0YXJnZXRJZCkub2Zmc2V0VG9wIC0gMTAwLFxyXG4gICAgICAgICAgICAgICAgYmVoYXZpb3I6IFwic21vb3RoXCJcclxuICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgd2luZG93LnNjcm9sbFRvKHtcclxuICAgICAgICAgICAgICAgIHRvcDogdGFyZ2V0SWQgPT09IFwiI1wiID8gMCA6IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IodGFyZ2V0SWQpLm9mZnNldFRvcCAtIDIwMCxcclxuICAgICAgICAgICAgICAgIGJlaGF2aW9yOiBcInNtb290aFwiXHJcbiAgICAgICAgICAgIH0pO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxuXHJcbiAgICBpZiAoZG9jdW1lbnQucXVlcnlTZWxlY3RvcignLnByb2R1Y3RzLXN0aWNreScpICE9PSBudWxsKSB7XHJcblxyXG4gICAgICAgIHdpbmRvdy5hZGRFdmVudExpc3RlbmVyKCdvcHRpbWl6ZWRSZXNpemUnLCAoKSA9PiB7XHJcbiAgICAgICAgICAgIHRvZ2dsZUZpeGVkKCcucHJvZHVjdHMtc3RpY2t5Jyk7XHJcbiAgICAgICAgfSk7XHJcblxyXG5cclxuICAgICAgICB0b2dnbGVGaXhlZCgnLnByb2R1Y3RzLXN0aWNreScpO1xyXG5cclxuICAgICAgICB0aHJvdHRsZShcInJlc2l6ZVwiLCBcIm9wdGltaXplZFJlc2l6ZVwiKTtcclxuXHJcbiAgICB9XHJcblxyXG4gICAgaWYgKGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJy5zdGlja3ktYmxvY2snKSAhPT0gbnVsbCkge1xyXG4gICAgICAgIGxldCBzdGlja3lCbG9ja0Nvb3JkcyA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJy5zdGlja3ktYmxvY2snKS5nZXRCb3VuZGluZ0NsaWVudFJlY3QoKS5ib3R0b20gKyB3aW5kb3cucGFnZVlPZmZzZXQ7XHJcblxyXG4gICAgICAgIHdpbmRvdy5hZGRFdmVudExpc3RlbmVyKFwic2Nyb2xsXCIsIGZ1bmN0aW9uICgpIHtcclxuICAgICAgICAgICAgdHJhY2tTY3JvbGwoJy5zdGlja3ktYmxvY2snKTtcclxuICAgICAgICB9KTtcclxuXHJcbiAgICAgICAgZnVuY3Rpb24gdHJhY2tTY3JvbGwoZWxlbWVudHMpIHtcclxuICAgICAgICAgICAgbGV0IHN0aWNreUJsb2NrcyA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3JBbGwoZWxlbWVudHMpO1xyXG4gICAgICAgICAgICBzdGlja3lCbG9ja3MuZm9yRWFjaChlbCA9PiB7XHJcbiAgICAgICAgICAgICAgICBpZiAoZWwuY2xhc3NMaXN0LmNvbnRhaW5zKCdzaG93JykgJiYgd2luZG93LnBhZ2VZT2Zmc2V0IDwgc3RpY2t5QmxvY2tDb29yZHMpIHtcclxuICAgICAgICAgICAgICAgICAgICBlbC5jbGFzc0xpc3QucmVtb3ZlKCdzaG93Jyk7XHJcbiAgICAgICAgICAgICAgICB9IGVsc2UgaWYgKHdpbmRvdy5wYWdlWU9mZnNldCA+IHN0aWNreUJsb2NrQ29vcmRzKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgZWwuY2xhc3NMaXN0LmFkZCgnc2hvdycpO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB9KTtcclxuICAgICAgICB9XHJcbiAgICB9XHJcblxyXG4gICAgZnVuY3Rpb24gdGhyb3R0bGUodHlwZSwgbmFtZSwgb2JqKSB7XHJcbiAgICAgICAgb2JqID0gb2JqIHx8IHdpbmRvdztcclxuICAgICAgICB2YXIgcnVubmluZyA9IGZhbHNlO1xyXG4gICAgICAgIHZhciBmdW5jID0gZnVuY3Rpb24gKCkge1xyXG4gICAgICAgICAgICBpZiAocnVubmluZykge1xyXG4gICAgICAgICAgICAgICAgcmV0dXJuO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIHJ1bm5pbmcgPSB0cnVlO1xyXG4gICAgICAgICAgICByZXF1ZXN0QW5pbWF0aW9uRnJhbWUoZnVuY3Rpb24gKCkge1xyXG4gICAgICAgICAgICAgICAgb2JqLmRpc3BhdGNoRXZlbnQobmV3IEN1c3RvbUV2ZW50KG5hbWUpKTtcclxuICAgICAgICAgICAgICAgIHJ1bm5pbmcgPSBmYWxzZTtcclxuICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgfTtcclxuICAgICAgICBvYmouYWRkRXZlbnRMaXN0ZW5lcih0eXBlLCBmdW5jKTtcclxuICAgIH07XHJcblxyXG4gICAgZnVuY3Rpb24gdG9nZ2xlRml4ZWQoZWwpIHtcclxuICAgICAgICBsZXQgZWxlbWVudCA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoZWwpO1xyXG4gICAgICAgIGxldCBmaXhlZFdpZHRoID0gd2luZG93LnNjcmVlbi53aWR0aCA+IDEwMjQgPyBlbGVtZW50LnBhcmVudEVsZW1lbnQuY2xpZW50V2lkdGggLSAyODUgOiBlbGVtZW50LnBhcmVudEVsZW1lbnQuY2xpZW50V2lkdGg7XHJcbiAgICAgICAgZWxlbWVudC5zdHlsZS53aWR0aCA9IGZpeGVkV2lkdGggKyAncHgnO1xyXG5cclxuICAgIH1cclxuXHJcbiAgICBjb25zdCBzaG93SGlkZVNpZGViYXJGaWx0ZXJzID0gKCkgPT4ge1xyXG4gICAgICAgIGlmIChkb2N1bWVudC5xdWVyeVNlbGVjdG9yQWxsKFwiLmZpbHRlclwiKS5sZW5ndGggPT0gMCkgcmV0dXJuIGZhbHNlO1xyXG5cclxuICAgICAgICB3aW5kb3cuYWRkRXZlbnRMaXN0ZW5lcihcImxvYWRcIiwgc2hvd0hpZGVGaWx0ZXJzKTtcclxuICAgICAgICB3aW5kb3cuYWRkRXZlbnRMaXN0ZW5lcihcInJlc2l6ZVwiLCBzaG93SGlkZUZpbHRlcnMpO1xyXG5cclxuICAgICAgICBmdW5jdGlvbiBzaG93SGlkZUZpbHRlcnMoKSB7XHJcbiAgICAgICAgICAgIGNvbnN0IHNpZGViYXJGaWx0ZXJzID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvckFsbChcIi5maWx0ZXJcIik7XHJcblxyXG4gICAgICAgICAgICBpZiAod2luZG93LnNjcmVlbi53aWR0aCA8PSAxMDI0KSB7XHJcbiAgICAgICAgICAgICAgICBzaWRlYmFyRmlsdGVycy5mb3JFYWNoKGZpbHRlciA9PiB7XHJcbiAgICAgICAgICAgICAgICAgICAgZmlsdGVyLmNsYXNzTGlzdC5yZW1vdmUoXCJhY3RpdmVcIik7XHJcbiAgICAgICAgICAgICAgICB9KTtcclxuICAgICAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgICAgIHNpZGViYXJGaWx0ZXJzLmZvckVhY2goZmlsdGVyID0+IHtcclxuICAgICAgICAgICAgICAgICAgICBmaWx0ZXIuY2xhc3NMaXN0LmFkZChcImFjdGl2ZVwiKTtcclxuICAgICAgICAgICAgICAgIH0pO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG5cclxuICAgIHNob3dIaWRlU2lkZWJhckZpbHRlcnMoKTtcclxuXHJcbiAgICAvLyBoYW1idXJnZXIgb3Blbi9jbG9zZSBhbmltYXRpb25cclxuICAgIGNvbnN0IHRyaWdnZXIgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKFwiI2hhbWJ1cmdlclwiKTtcclxuICAgIGNvbnN0IG1vYmlsZU5hdiA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoXCIjbW9iaWxlLW5hdlwiKTtcclxuICAgIGxldCBpc0Nsb3NlZCA9IHRydWU7XHJcblxyXG4gICAgdHJpZ2dlci5hZGRFdmVudExpc3RlbmVyKFwiY2xpY2tcIiwgYnVyZ2VyVGltZSk7XHJcblxyXG4gICAgZnVuY3Rpb24gYnVyZ2VyVGltZSgpIHtcclxuICAgICAgICBpZiAoaXNDbG9zZWQgPT0gdHJ1ZSkge1xyXG4gICAgICAgICAgICB0cmlnZ2VyLmNsYXNzTGlzdC5yZW1vdmUoXCJpcy1vcGVuXCIpO1xyXG4gICAgICAgICAgICB0cmlnZ2VyLmNsYXNzTGlzdC5hZGQoXCJpcy1jbG9zZWRcIik7XHJcbiAgICAgICAgICAgIG1vYmlsZU5hdi5jbGFzc0xpc3QuYWRkKCdpcy1vcGVuJyk7XHJcbiAgICAgICAgICAgIGlzQ2xvc2VkID0gZmFsc2U7XHJcbiAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgdHJpZ2dlci5jbGFzc0xpc3QucmVtb3ZlKFwiaXMtY2xvc2VkXCIpO1xyXG4gICAgICAgICAgICB0cmlnZ2VyLmNsYXNzTGlzdC5hZGQoXCJpcy1vcGVuXCIpO1xyXG4gICAgICAgICAgICBtb2JpbGVOYXYuY2xhc3NMaXN0LnJlbW92ZSgnaXMtb3BlbicpO1xyXG4gICAgICAgICAgICBpc0Nsb3NlZCA9IHRydWU7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG5cclxuICAgIC8vIHNlYXJjaCBmb3JtIG9wZW4vY2xvc2UgYW5pbWF0aW9uXHJcbiAgICBjb25zdCBzZWFyY2hCdG4gPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKFwiLnNlYXJjaC1mb3JtX19idG5cIik7XHJcbiAgICBzZWFyY2hCdG4uYWRkRXZlbnRMaXN0ZW5lcihcImNsaWNrXCIsIGZ1bmN0aW9uICgpIHtcclxuICAgICAgICB0aGlzLmNsYXNzTGlzdC50b2dnbGUoXCJjbG9zZVwiKTtcclxuICAgICAgICB0aGlzLnBhcmVudEVsZW1lbnQuY2xhc3NMaXN0LnRvZ2dsZShcImluY2xpY2tlZFwiKTtcclxuICAgICAgICB0aGlzLnByZXZpb3VzRWxlbWVudFNpYmxpbmcudmFsdWUgPSBcIlwiO1xyXG4gICAgfSk7XHJcblxyXG4gICAgY29uc3QgcHJvZHVjdFJldmlld1N0YXJzID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvckFsbChcIi5qcy1wcm9kdWN0LXJldmlldy1yYXRpbmdcIik7XHJcbiAgICBwcm9kdWN0UmV2aWV3U3RhcnMuZm9yRWFjaChmdW5jdGlvbiAoZWwpIHtcclxuICAgICAgICBjb25zdCBkYXRhUmF0aW5nID0gZWwuZ2V0QXR0cmlidXRlKFwiZGF0YS1yYXRpbmdcIik7XHJcbiAgICAgICAgY29uc3Qgc3RhcnMgPSBlbC5jaGlsZHJlbjtcclxuICAgICAgICBmb3IgKGxldCBpID0gMDsgaSA8IGRhdGFSYXRpbmc7IGkrKykge1xyXG4gICAgICAgICAgICBzdGFyc1tpXS5jbGFzc0xpc3QuYWRkKFwiYWN0aXZlXCIpO1xyXG4gICAgICAgIH1cclxuICAgIH0pO1xyXG5cclxuICAgIGNvbnN0IGNob29zZVJhdGluZyA9ICgpID0+IHtcclxuICAgICAgICBpZiAoZG9jdW1lbnQucXVlcnlTZWxlY3RvcihcIi5qcy1yYXRpbmdcIikgPT0gbnVsbCkgcmV0dXJuIGZhbHNlO1xyXG4gICAgICAgIGNvbnN0IHJhdGluZyA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoXCIuanMtcmF0aW5nXCIpLFxyXG4gICAgICAgICAgICByYXRpbmdTdGFycyA9IHJhdGluZy5jaGlsZHJlbjtcclxuICAgICAgICByYXRpbmcuYWRkRXZlbnRMaXN0ZW5lcihcImNsaWNrXCIsIChlKSA9PiB7XHJcbiAgICAgICAgICAgIGlmIChlLnRhcmdldC5jbGFzc0xpc3QuY29udGFpbnMoXCJyYXRpbmdfX3N0YXJcIikgfHwgZS50YXJnZXQuY2xvc2VzdChcIi5yYXRpbmdfX3N0YXJcIikpIHtcclxuICAgICAgICAgICAgICAgIGxldCB0YXJnZXQgPSBlLnRhcmdldC5jbGFzc0xpc3QuY29udGFpbnMoXCJyYXRpbmdfX3N0YXJcIikgPyBlLnRhcmdldCA6IGUudGFyZ2V0LmNsb3Nlc3QoXCIucmF0aW5nX19zdGFyXCIpO1xyXG4gICAgICAgICAgICAgICAgcmVtb3ZlQ2xhc3MocmF0aW5nU3RhcnMsIFwiY3VycmVudC1hY3RpdmVcIik7XHJcbiAgICAgICAgICAgICAgICB0YXJnZXQuY2xhc3NMaXN0LmFkZChcImFjdGl2ZVwiLCBcImN1cnJlbnQtYWN0aXZlXCIpO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfSk7XHJcbiAgICAgICAgcmF0aW5nLmFkZEV2ZW50TGlzdGVuZXIoXCJtb3VzZW92ZXJcIiwgKGUpID0+IHtcclxuICAgICAgICAgICAgaWYgKGUudGFyZ2V0LmNsYXNzTGlzdC5jb250YWlucyhcInJhdGluZ19fc3RhclwiKSB8fCBlLnRhcmdldC5jbG9zZXN0KFwiLnJhdGluZ19fc3RhclwiKSkge1xyXG4gICAgICAgICAgICAgICAgbGV0IHRhcmdldCA9IGUudGFyZ2V0LmNsYXNzTGlzdC5jb250YWlucyhcInJhdGluZ19fc3RhclwiKSA/IGUudGFyZ2V0IDogZS50YXJnZXQuY2xvc2VzdChcIi5yYXRpbmdfX3N0YXJcIik7XHJcbiAgICAgICAgICAgICAgICByZW1vdmVDbGFzcyhyYXRpbmdTdGFycywgXCJhY3RpdmVcIik7XHJcbiAgICAgICAgICAgICAgICB0YXJnZXQuY2xhc3NMaXN0LmFkZChcImFjdGl2ZVwiKTtcclxuICAgICAgICAgICAgICAgIG1vdXNlT3ZlckFjdGl2ZUNsYXNzKHJhdGluZ1N0YXJzKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH0pO1xyXG4gICAgICAgIHJhdGluZy5hZGRFdmVudExpc3RlbmVyKFwibW91c2VvdXRcIiwgKCkgPT4ge1xyXG4gICAgICAgICAgICBhZGRDbGFzcyhyYXRpbmdTdGFycywgXCJhY3RpdmVcIik7XHJcbiAgICAgICAgICAgIG1vdXNlT3V0QWN0aXZlQ2xhc3MocmF0aW5nU3RhcnMpO1xyXG4gICAgICAgIH0pO1xyXG5cclxuICAgICAgICBmdW5jdGlvbiBhZGRDbGFzcyhhcnIpIHtcclxuICAgICAgICAgICAgZm9yIChsZXQgaSA9IDAsIGlMZW5nID0gYXJyLmxlbmd0aDsgaSA8IGlMZW5nOyBpKyspIHtcclxuICAgICAgICAgICAgICAgIGZvciAobGV0IGogPSAxOyBqIDwgYXJndW1lbnRzLmxlbmd0aDsgaisrKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgcmF0aW5nU3RhcnNbaV0uY2xhc3NMaXN0LmFkZChhcmd1bWVudHNbal0pO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBmdW5jdGlvbiByZW1vdmVDbGFzcyhhcnIpIHtcclxuICAgICAgICAgICAgZm9yIChsZXQgaSA9IDAsIGlMZW5nID0gYXJyLmxlbmd0aDsgaSA8IGlMZW5nOyBpKyspIHtcclxuICAgICAgICAgICAgICAgIGZvciAobGV0IGogPSAxOyBqIDwgYXJndW1lbnRzLmxlbmd0aDsgaisrKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgcmF0aW5nU3RhcnNbaV0uY2xhc3NMaXN0LnJlbW92ZShhcmd1bWVudHNbal0pO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBmdW5jdGlvbiBtb3VzZU92ZXJBY3RpdmVDbGFzcyhhcnIpIHtcclxuICAgICAgICAgICAgZm9yIChsZXQgaSA9IDAsIGlMZW4gPSBhcnIubGVuZ3RoOyBpIDwgaUxlbjsgaSsrKSB7XHJcbiAgICAgICAgICAgICAgICBpZiAoYXJyW2ldLmNsYXNzTGlzdC5jb250YWlucyhcImFjdGl2ZVwiKSkge1xyXG4gICAgICAgICAgICAgICAgICAgIGJyZWFrO1xyXG4gICAgICAgICAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgICAgICAgICBhcnJbaV0uY2xhc3NMaXN0LmFkZChcImFjdGl2ZVwiKTtcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgZnVuY3Rpb24gbW91c2VPdXRBY3RpdmVDbGFzcyhhcnIpIHtcclxuICAgICAgICAgICAgZm9yIChsZXQgaSA9IGFyci5sZW5ndGggLSAxOyBpID49IDA7IGktLSkge1xyXG4gICAgICAgICAgICAgICAgaWYgKGFycltpXS5jbGFzc0xpc3QuY29udGFpbnMoXCJjdXJyZW50LWFjdGl2ZVwiKSkge1xyXG4gICAgICAgICAgICAgICAgICAgIGJyZWFrO1xyXG4gICAgICAgICAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgICAgICAgICBhcnJbaV0uY2xhc3NMaXN0LnJlbW92ZShcImFjdGl2ZVwiKTtcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuICAgIH1cclxuXHJcbiAgICBjaG9vc2VSYXRpbmcoKTtcclxuXHJcbiAgICBkb2N1bWVudC5hZGRFdmVudExpc3RlbmVyKFwiY2xpY2tcIiwgZnVuY3Rpb24gKGUpIHtcclxuICAgICAgICBpZiAoZS50YXJnZXQuY2xhc3NMaXN0LmNvbnRhaW5zKFwianMtb3Blbi1kcm9wZG93blwiKSAmJiB3aW5kb3cuc2NyZWVuLndpZHRoIDw9IDU3Nikge1xyXG4gICAgICAgICAgICBjb25zdCBjYXJldERyb3Bkb3duID0gZS50YXJnZXQuZmlyc3RFbGVtZW50Q2hpbGQ7XHJcbiAgICAgICAgICAgIGNvbnN0IGRyb3Bkb3duID0gZS50YXJnZXQubmV4dEVsZW1lbnRTaWJsaW5nO1xyXG4gICAgICAgICAgICBpZiAoZHJvcGRvd24uc3R5bGUubWF4SGVpZ2h0KSB7XHJcbiAgICAgICAgICAgICAgICBkcm9wZG93bi5zdHlsZS5tYXhIZWlnaHQgPSBudWxsO1xyXG4gICAgICAgICAgICAgICAgZHJvcGRvd24uc3R5bGUub3BhY2l0eSA9IG51bGw7XHJcbiAgICAgICAgICAgICAgICBlLnRhcmdldC5jbGFzc0xpc3QucmVtb3ZlKFwiZHJvcGRvd24tYWN0aXZlXCIpO1xyXG4gICAgICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICAgICAgZHJvcGRvd24uc3R5bGUubWF4SGVpZ2h0ID0gZHJvcGRvd24uc2Nyb2xsSGVpZ2h0ICsgXCJweFwiO1xyXG4gICAgICAgICAgICAgICAgZHJvcGRvd24uc3R5bGUub3BhY2l0eSA9IDE7XHJcbiAgICAgICAgICAgICAgICBlLnRhcmdldC5jbGFzc0xpc3QuYWRkKFwiZHJvcGRvd24tYWN0aXZlXCIpO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG4gICAgfSk7XHJcblxyXG4gICAgY29uc3QgYmFzaWNTY3JvbGxUb3AgPSBmdW5jdGlvbiAoKSB7XHJcbiAgICAgICAgY29uc3QgYnRuVG9wID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignLmpzLWJ0bi1nby10b3AnKTtcclxuICAgICAgICBjb25zdCBidG5SZXZlYWwgPSBmdW5jdGlvbiAoKSB7XHJcbiAgICAgICAgICAgIGlmICh3aW5kb3cuc2Nyb2xsWSA+PSAzMDApIHtcclxuICAgICAgICAgICAgICAgIGJ0blRvcC5jbGFzc0xpc3QuYWRkKCdpcy12aXNpYmxlJyk7XHJcbiAgICAgICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgICAgICBidG5Ub3AuY2xhc3NMaXN0LnJlbW92ZSgnaXMtdmlzaWJsZScpO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGNvbnN0IFRvcHNjcm9sbFRvID0gZnVuY3Rpb24gKCkge1xyXG4gICAgICAgICAgICBpZiAod2luZG93LnNjcm9sbFkgIT0gMCkge1xyXG4gICAgICAgICAgICAgICAgc2V0VGltZW91dChmdW5jdGlvbiAoKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgd2luZG93LnNjcm9sbFRvKDAsIHdpbmRvdy5zY3JvbGxZIC0gMzApO1xyXG4gICAgICAgICAgICAgICAgICAgIFRvcHNjcm9sbFRvKCk7XHJcbiAgICAgICAgICAgICAgICB9LCAxMCk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcbiAgICAgICAgd2luZG93LmFkZEV2ZW50TGlzdGVuZXIoJ3Njcm9sbCcsIGJ0blJldmVhbCk7XHJcbiAgICAgICAgYnRuVG9wLmFkZEV2ZW50TGlzdGVuZXIoJ2NsaWNrJywgVG9wc2Nyb2xsVG8pO1xyXG5cclxuICAgIH07XHJcbiAgICBiYXNpY1Njcm9sbFRvcCgpO1xyXG5cclxuICAgIGNvbnN0IG9wZW5Nb2RhbCA9ICgpID0+IHtcclxuICAgICAgICBjb25zdCBtb2RhbEJ0biA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3JBbGwoXCIuanMtbW9kYWxcIik7XHJcbiAgICAgICAgY29uc3QgbW9kYWxDb250YWluZXIgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKFwiLm1vZGFsLWJhY2tncm91bmRcIik7XHJcblxyXG4gICAgICAgIG1vZGFsQnRuLmZvckVhY2goZWwgPT4ge1xyXG4gICAgICAgICAgICBlbC5hZGRFdmVudExpc3RlbmVyKFwiY2xpY2tcIiwgZnVuY3Rpb24gKCkge1xyXG4gICAgICAgICAgICAgICAgZG9jdW1lbnQuYm9keS5jbGFzc0xpc3QuYWRkKFwibW9kYWwtYWN0aXZlXCIpO1xyXG4gICAgICAgICAgICAgICAgbW9kYWxDb250YWluZXIuY2xhc3NMaXN0LnJlbW92ZShcIm91dFwiKTtcclxuICAgICAgICAgICAgICAgIG1vZGFsQ29udGFpbmVyLmNsYXNzTGlzdC5hZGQoXCJvcGVuZWRcIik7XHJcbiAgICAgICAgICAgIH0pO1xyXG4gICAgICAgIH0pO1xyXG5cclxuICAgICAgICBkb2N1bWVudC5hZGRFdmVudExpc3RlbmVyKFwiY2xpY2tcIiwgZnVuY3Rpb24gKGUpIHtcclxuICAgICAgICAgICAgaWYgKFxyXG4gICAgICAgICAgICAgICAgZS50YXJnZXQuY2xhc3NMaXN0LmNvbnRhaW5zKFwibW9kYWwtY29udGFpbmVyXCIpIHx8XHJcbiAgICAgICAgICAgICAgICBlLnRhcmdldC5jbGFzc0xpc3QuY29udGFpbnMoXCJtb2RhbC1jbG9zZVwiKVxyXG4gICAgICAgICAgICApIHtcclxuICAgICAgICAgICAgICAgIGRvY3VtZW50LmJvZHkuY2xhc3NMaXN0LnJlbW92ZShcIm1vZGFsLWFjdGl2ZVwiKTtcclxuICAgICAgICAgICAgICAgIG1vZGFsQ29udGFpbmVyLmNsYXNzTGlzdC5yZW1vdmUoXCJvcGVuZWRcIik7XHJcbiAgICAgICAgICAgICAgICBtb2RhbENvbnRhaW5lci5jbGFzc0xpc3QuYWRkKFwib3V0XCIpO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfSk7XHJcbiAgICAgICAgZG9jdW1lbnQuYWRkRXZlbnRMaXN0ZW5lcihcImtleWRvd25cIiwgZnVuY3Rpb24gKGUpIHtcclxuICAgICAgICAgICAgaWYgKGUua2V5Q29kZSA9PSAyNykge1xyXG4gICAgICAgICAgICAgICAgZG9jdW1lbnQuYm9keS5jbGFzc0xpc3QucmVtb3ZlKFwibW9kYWwtYWN0aXZlXCIpO1xyXG4gICAgICAgICAgICAgICAgbW9kYWxDb250YWluZXIuY2xhc3NMaXN0LnJlbW92ZShcIm9wZW5lZFwiKTtcclxuICAgICAgICAgICAgICAgIG1vZGFsQ29udGFpbmVyLmNsYXNzTGlzdC5hZGQoXCJvdXRcIik7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9KTtcclxuICAgIH07XHJcblxyXG4gICAgb3Blbk1vZGFsKCk7XHJcblxyXG4gICAgY29uc3Qgc2VlTW9yZSA9IChudW1iZXIsIGVsZW1lbnRzLCBidXR0b24pID0+IHtcclxuXHJcbiAgICAgICAgaWYgKGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoYnV0dG9uKSA9PSBudWxsKSB7XHJcbiAgICAgICAgICAgIHJldHVybiBmYWxzZTtcclxuICAgICAgICB9XHJcbiAgICAgICAgd2luZG93LmFkZEV2ZW50TGlzdGVuZXIoXCJsb2FkXCIsICgpID0+IHNob3dIaWRlQmxvY2tzKG51bWJlciwgZWxlbWVudHMsIGJ1dHRvbikpO1xyXG4gICAgICAgIHdpbmRvdy5hZGRFdmVudExpc3RlbmVyKFwicmVzaXplXCIsICgpID0+IHNob3dIaWRlQmxvY2tzKG51bWJlciwgZWxlbWVudHMsIGJ1dHRvbikpO1xyXG5cclxuICAgICAgICBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKGJ1dHRvbikuYWRkRXZlbnRMaXN0ZW5lcihcImNsaWNrXCIsIGZ1bmN0aW9uICgpIHtcclxuICAgICAgICAgICAgaWYgKHRoaXMudGV4dENvbnRlbnQgPT0gXCJTZWUgbW9yZVwiKSB7XHJcbiAgICAgICAgICAgICAgICB0aGlzLnRleHRDb250ZW50ID0gXCJTZWUgbGVzc1wiO1xyXG4gICAgICAgICAgICAgICAgdGhpcy5jbGFzc0xpc3QuYWRkKFwiYWN0aXZlXCIpO1xyXG4gICAgICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICAgICAgdGhpcy50ZXh0Q29udGVudCA9IFwiU2VlIG1vcmVcIjtcclxuICAgICAgICAgICAgICAgIHRoaXMuY2xhc3NMaXN0LnJlbW92ZShcImFjdGl2ZVwiKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICBkb2N1bWVudC5xdWVyeVNlbGVjdG9yQWxsKGVsZW1lbnRzKS5mb3JFYWNoKChlbGVtLCBpbmRleCkgPT4ge1xyXG4gICAgICAgICAgICAgICAgaWYgKGVsZW0uc3R5bGUuZGlzcGxheSA9PSBcIm5vbmVcIikge1xyXG4gICAgICAgICAgICAgICAgICAgIGVsZW0uc3R5bGUuZGlzcGxheSA9IG51bGw7XHJcbiAgICAgICAgICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICAgICAgICAgIGlmIChpbmRleCA+IG51bWJlcikge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBlbGVtLnN0eWxlLmRpc3BsYXkgPSAnbm9uZSc7XHJcbiAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB9KTtcclxuICAgICAgICB9KTtcclxuXHJcbiAgICAgICAgZnVuY3Rpb24gc2hvd0hpZGVCbG9ja3MobnVtYmVyLCBlbGVtZW50cywgYnV0dG9uKSB7XHJcbiAgICAgICAgICAgIGNvbnN0IGVsZW1zID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvckFsbChlbGVtZW50cyk7XHJcbiAgICAgICAgICAgIGNvbnN0IGJ0blNob3dIaWRlID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcihidXR0b24pO1xyXG5cclxuICAgICAgICAgICAgaWYgKHdpbmRvdy5zY3JlZW4ud2lkdGggPD0gODAwICYmIGVsZW1zLmxlbmd0aCA+IG51bWJlcikge1xyXG4gICAgICAgICAgICAgICAgZWxlbXMuZm9yRWFjaCgoZWxlbSwgaW5kZXgpID0+IHtcclxuICAgICAgICAgICAgICAgICAgICBpZiAoaW5kZXggPiBudW1iZXIpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgZWxlbS5zdHlsZS5kaXNwbGF5ID0gJ25vbmUnO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBidG5TaG93SGlkZS5zdHlsZS5kaXNwbGF5ID0gbnVsbDtcclxuICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICB9KTtcclxuICAgICAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgICAgIGVsZW1zLmZvckVhY2goKGVsZW0sIGluZGV4KSA9PiB7XHJcbiAgICAgICAgICAgICAgICAgICAgZWxlbS5zdHlsZS5kaXNwbGF5ID0gbnVsbDtcclxuICAgICAgICAgICAgICAgICAgICBidG5TaG93SGlkZS5zdHlsZS5kaXNwbGF5ID0gJ25vbmUnO1xyXG4gICAgICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcbiAgICB9O1xyXG5cclxuICAgIHNlZU1vcmUoMywgJy5wcm9kdWN0LWNvbXBhcmUtdG9wX19pdGVtJywgJy5qcy1zZWUtbW9yZS1wcm9kdWN0cycpO1xyXG4gICAgc2VlTW9yZSgxLCAnLmhlbHAtY2VudGVyX19pdGVtJywgJy5qcy1zZWUtbW9yZS1oZWxwJyk7XHJcblxyXG4gICAgY29uc3Qgc2hvd0l0ZW1zID0gKG51bWJlckRlc2t0b3AsIG51bWJlck1vYmlsZSwgaXRlbXMsIGJ1dHRvbikgPT4ge1xyXG4gICAgICAgIGlmIChkb2N1bWVudC5xdWVyeVNlbGVjdG9yQWxsKGl0ZW1zKS5sZW5ndGggPT0gMCkgcmV0dXJuIGZhbHNlO1xyXG5cclxuICAgICAgICBjb25zdCBidG4gPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKGJ1dHRvbik7XHJcblxyXG4gICAgICAgIHdpbmRvdy5hZGRFdmVudExpc3RlbmVyKFwibG9hZFwiLCBzaG93SGlkZUl0ZW1zKTtcclxuICAgICAgICB3aW5kb3cuYWRkRXZlbnRMaXN0ZW5lcihcInJlc2l6ZVwiLCBzaG93SGlkZUl0ZW1zKTtcclxuXHJcbiAgICAgICAgZnVuY3Rpb24gc2hvd0hpZGVJdGVtcygpIHtcclxuICAgICAgICAgICAgY29uc3QgZWxzID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvckFsbChpdGVtcyk7XHJcbiAgICAgICAgICAgIGNvbnN0IGJ0biA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoYnV0dG9uKTtcclxuICAgICAgICAgICAgaWYgKHdpbmRvdy5zY3JlZW4ud2lkdGggPiA1NzcpIHtcclxuICAgICAgICAgICAgICAgIGlmIChlbHMubGVuZ3RoID4gbnVtYmVyRGVza3RvcCkge1xyXG4gICAgICAgICAgICAgICAgICAgIGJ0bi5zdHlsZS5kaXNwbGF5ID0gbnVsbDtcclxuICAgICAgICAgICAgICAgICAgICBlbHMuZm9yRWFjaCgoZWwsIGkpID0+IHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgaWYgKGkgPiBudW1iZXJEZXNrdG9wIC0gMSkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgZWwuc3R5bGUuZGlzcGxheSA9IFwibm9uZVwiXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBlbC5zdHlsZS5kaXNwbGF5ID0gbnVsbDtcclxuICAgICAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgIH0pO1xyXG4gICAgICAgICAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgICAgICAgICBidG4uc3R5bGUuZGlzcGxheSA9IFwibm9uZVwiO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICAgICAgaWYgKGVscy5sZW5ndGggPiBudW1iZXJNb2JpbGUpIHtcclxuICAgICAgICAgICAgICAgICAgICBidG4uc3R5bGUuZGlzcGxheSA9IG51bGw7XHJcbiAgICAgICAgICAgICAgICAgICAgZWxzLmZvckVhY2goKGVsLCBpKSA9PiB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGlmIChpID4gbnVtYmVyTW9iaWxlIC0gMSkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgZWwuc3R5bGUuZGlzcGxheSA9IFwibm9uZVwiXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBlbC5zdHlsZS5kaXNwbGF5ID0gbnVsbDtcclxuICAgICAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgIH0pO1xyXG4gICAgICAgICAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgICAgICAgICBidG4uc3R5bGUuZGlzcGxheSA9IFwibm9uZVwiO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBidG4uYWRkRXZlbnRMaXN0ZW5lcihcImNsaWNrXCIsIGZ1bmN0aW9uICgpIHtcclxuICAgICAgICAgICAgY29uc3QgZWxlbXMgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yQWxsKGl0ZW1zKTtcclxuICAgICAgICAgICAgaWYgKHRoaXMudGV4dENvbnRlbnQgPT0gXCJTZWUgbW9yZVwiKSB7XHJcbiAgICAgICAgICAgICAgICB0aGlzLnRleHRDb250ZW50ID0gXCJTZWUgbGVzc1wiO1xyXG4gICAgICAgICAgICAgICAgdGhpcy5jbGFzc0xpc3QuYWRkKFwiYWN0aXZlXCIpO1xyXG4gICAgICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICAgICAgdGhpcy50ZXh0Q29udGVudCA9IFwiU2VlIG1vcmVcIjtcclxuICAgICAgICAgICAgICAgIHRoaXMuY2xhc3NMaXN0LnJlbW92ZShcImFjdGl2ZVwiKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICBlbGVtcy5mb3JFYWNoKChlbGVtLCBpbmRleCkgPT4ge1xyXG4gICAgICAgICAgICAgICAgaWYgKGVsZW0uc3R5bGUuZGlzcGxheSA9PSBcIm5vbmVcIikge1xyXG4gICAgICAgICAgICAgICAgICAgIGVsZW0uc3R5bGUuZGlzcGxheSA9IG51bGw7XHJcbiAgICAgICAgICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICAgICAgICAgIGlmICgod2luZG93LnNjcmVlbi53aWR0aCA+IDU3NyAmJiBpbmRleCA+IG51bWJlckRlc2t0b3AgLSAxKSB8fCAod2luZG93LnNjcmVlbi53aWR0aCA8IDU3NyAmJiBpbmRleCA+IG51bWJlck1vYmlsZSAtMSkpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgZWxlbS5zdHlsZS5kaXNwbGF5ID0gJ25vbmUnO1xyXG4gICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgfSk7XHJcbiAgICB9XHJcblxyXG4gICAgc2hvd0l0ZW1zKDgsIDQsIFwiLmJyYW5kcy1saXN0X19pdGVtXCIsIFwiLmpzLXNlZS1tb3JlLWJyYW5kc1wiKTtcclxuXHJcbiAgICBjb25zdCBzaG93Rm9vdGVyTGlua3MgPSAoKSA9PiB7XHJcbiAgICAgICAgY29uc3QgZm9vdGVyVGl0bGUgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yQWxsKCcuZm9vdGVyX190aXRsZScpO1xyXG4gICAgICAgIGNvbnN0IGZvb3RlckxpbmtzID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvckFsbCgnLmZvb3Rlcl9fbGlua3MnKTtcclxuXHJcbiAgICAgICAgLy8gd2luZG93LmFkZEV2ZW50TGlzdGVuZXIoJ2xvYWQnLCAoKSA9PiBzaG93SGlkZUxpbmtzKTtcclxuICAgICAgICB3aW5kb3cuYWRkRXZlbnRMaXN0ZW5lcigncmVzaXplJywgKCkgPT4ge1xyXG4gICAgICAgICAgICBpZiAod2luZG93LnNjcmVlbi53aWR0aCA8PSA1NzYpIHtcclxuICAgICAgICAgICAgICAgIGZvb3RlckxpbmtzLmZvckVhY2goZm9vdGVyTGluayA9PiB7XHJcbiAgICAgICAgICAgICAgICAgICAgZm9vdGVyTGluay5zdHlsZS5tYXhIZWlnaHQgPSAwO1xyXG4gICAgICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgICAgICBmb290ZXJMaW5rcy5mb3JFYWNoKGZvb3RlckxpbmsgPT4ge1xyXG4gICAgICAgICAgICAgICAgICAgIGZvb3Rlckxpbmsuc3R5bGUubWF4SGVpZ2h0ID0gbnVsbDtcclxuICAgICAgICAgICAgICAgIH0pO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfSk7XHJcblxyXG4gICAgICAgIGZvb3RlclRpdGxlLmZvckVhY2godGl0bGUgPT4ge1xyXG4gICAgICAgICAgICB0aXRsZS5hZGRFdmVudExpc3RlbmVyKCdjbGljaycsIGZ1bmN0aW9uICgpIHtcclxuICAgICAgICAgICAgICAgIGNvbnN0IGZvb3RlckxpbmtzID0gdGhpcy5uZXh0RWxlbWVudFNpYmxpbmc7XHJcbiAgICAgICAgICAgICAgICBpZiAoZ2V0Q29tcHV0ZWRTdHlsZShmb290ZXJMaW5rcykubWF4SGVpZ2h0ID09ICcwcHgnKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5jbGFzc0xpc3QuYWRkKCdhY3RpdmUnKTtcclxuICAgICAgICAgICAgICAgICAgICBmb290ZXJMaW5rcy5zdHlsZS5tYXhIZWlnaHQgPSBmb290ZXJMaW5rcy5zY3JvbGxIZWlnaHQgKyBcInB4XCI7XHJcbiAgICAgICAgICAgICAgICAgICAgZm9vdGVyTGlua3Muc3R5bGUub3BhY2l0eSA9IDE7XHJcbiAgICAgICAgICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICAgICAgICAgIHRoaXMuY2xhc3NMaXN0LnJlbW92ZSgnYWN0aXZlJyk7XHJcbiAgICAgICAgICAgICAgICAgICAgZm9vdGVyTGlua3Muc3R5bGUubWF4SGVpZ2h0ID0gbnVsbDtcclxuICAgICAgICAgICAgICAgICAgICBmb290ZXJMaW5rcy5zdHlsZS5vcGFjaXR5ID0gbnVsbDtcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgfSlcclxuICAgICAgICB9KTtcclxuICAgIH1cclxuXHJcbiAgICBzaG93Rm9vdGVyTGlua3MoKTtcclxuXHJcbiAgICBjb25zdCBzZXRQZXJjZW50ID0gKCkgPT4ge1xyXG4gICAgICAgIGNvbnN0IGNpcmN1bGFyUHJvZ3Jlc3MgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yQWxsKFwiLmpzLWNpcmN1bGFyLXByb2dyZXNzXCIpO1xyXG5cclxuICAgICAgICBjaXJjdWxhclByb2dyZXNzLmZvckVhY2goaXRlbSA9PiB7XHJcbiAgICAgICAgICAgIGNvbnN0IGNpcmNsZSA9IGl0ZW0ucXVlcnlTZWxlY3RvcignLmNpcmN1bGFyLXByb2dyZXNzX19wZXJjZW50Jyk7XHJcbiAgICAgICAgICAgIGNvbnN0IHRleHQgPSBpdGVtLnF1ZXJ5U2VsZWN0b3IoJy5jaXJjdWxhci1pbmZvX19udW1iZXInKTtcclxuICAgICAgICAgICAgY29uc3QgZGF0YVBlcmNlbnQgPSBpdGVtLmdldEF0dHJpYnV0ZSgnZGF0YS1wZXJjZW50Jyk7XHJcbiAgICAgICAgICAgIGNvbnN0IHBlcmNlbnQgPSAoMTAwIC0gZGF0YVBlcmNlbnQpIC8gMTAwO1xyXG4gICAgICAgICAgICBjaXJjbGUuc3R5bGUuc3Ryb2tlRGFzaG9mZnNldCA9IGBjYWxjKDIqMzAqMy4xNCoke3BlcmNlbnR9KWA7XHJcbiAgICAgICAgICAgIHRleHQudGV4dENvbnRlbnQgPSBkYXRhUGVyY2VudDtcclxuICAgICAgICB9KTtcclxuICAgIH1cclxuXHJcbiAgICBzZXRQZXJjZW50KCk7XHJcblxyXG4gICAgZG9jdW1lbnQuYWRkRXZlbnRMaXN0ZW5lcihcImJsdXJcIiwgZnVuY3Rpb24gKGUpIHtcclxuICAgICAgICBpZiAoZS50YXJnZXQuY2xhc3NMaXN0LmNvbnRhaW5zKCdjb250YWN0LWZvcm1fX2ZpZWxkJykgfHwgZS50YXJnZXQuY2xhc3NMaXN0LmNvbnRhaW5zKCdjb250YWN0LWZvcm1fX21lc3NhZ2UnKSkge1xyXG4gICAgICAgICAgICBpZiAoZS50YXJnZXQudmFsdWUudHJpbSgpICE9ICcnKSB7XHJcbiAgICAgICAgICAgICAgICBlLnRhcmdldC5uZXh0RWxlbWVudFNpYmxpbmcuY2xhc3NMaXN0LmFkZCgnYWN0aXZlJyk7XHJcbiAgICAgICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgICAgICBlLnRhcmdldC5uZXh0RWxlbWVudFNpYmxpbmcuY2xhc3NMaXN0LnJlbW92ZSgnYWN0aXZlJyk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcbiAgICB9LCB0cnVlKTtcclxuXHJcbiAgICBjb25zdCBwcmljZVNsaWRlciA9ICgpID0+IHtcclxuICAgICAgICBjb25zdCByYW5nZUlucHV0cyA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3JBbGwoXCIucHJpY2UtcmFuZ2VfX2lucHV0XCIpLFxyXG4gICAgICAgICAgICBwcmljZUlucHV0cyA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3JBbGwoXCIucHJpY2UtaW5wdXRfX2ZpZWxkXCIpLFxyXG4gICAgICAgICAgICBwcm9ncmVzcyA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoXCIucHJpY2Utc2xpZGVyX19wcm9ncmVzc1wiKTtcclxuXHJcbiAgICAgICAgbGV0IHByaWNlR2FwID0gNTAwO1xyXG5cclxuICAgICAgICBwcmljZUlucHV0cy5mb3JFYWNoKChwcmljZUlucHV0KSA9PiB7XHJcbiAgICAgICAgICAgIHByaWNlSW5wdXQuYWRkRXZlbnRMaXN0ZW5lcihcImlucHV0XCIsIChlKSA9PiB7XHJcbiAgICAgICAgICAgICAgICBsZXQgbWluVmFsID0gcGFyc2VJbnQocHJpY2VJbnB1dHNbMF0udmFsdWUpLFxyXG4gICAgICAgICAgICAgICAgICAgIG1heFZhbCA9IHBhcnNlSW50KHByaWNlSW5wdXRzWzFdLnZhbHVlKTtcclxuXHJcbiAgICAgICAgICAgICAgICBpZiAobWF4VmFsIC0gbWluVmFsID49IHByaWNlR2FwICYmIG1heFZhbCA8PSA1MDAwMCkge1xyXG4gICAgICAgICAgICAgICAgICAgIGlmIChlLnRhcmdldC5jbGFzc0xpc3QuY29udGFpbnMoXCJwcmljZS1taW5cIikpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgcmFuZ2VJbnB1dHNbMF0udmFsdWUgPSBtaW5WYWw7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHByb2dyZXNzLnN0eWxlLmxlZnQgPSAobWluVmFsIC8gcmFuZ2VJbnB1dHNbMF0ubWF4KSAqIDEwMCArIFwiJVwiO1xyXG4gICAgICAgICAgICAgICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHJhbmdlSW5wdXRzWzFdLnZhbHVlID0gbWF4VmFsO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBwcm9ncmVzcy5zdHlsZS5yaWdodCA9IDEwMCAtIChtYXhWYWwgLyByYW5nZUlucHV0c1sxXS5tYXgpICogMTAwICsgXCIlXCI7XHJcbiAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB9KTtcclxuICAgICAgICB9KTtcclxuXHJcbiAgICAgICAgcmFuZ2VJbnB1dHMuZm9yRWFjaCgocmFuZ2VJbnB1dCkgPT4ge1xyXG4gICAgICAgICAgICByYW5nZUlucHV0LmFkZEV2ZW50TGlzdGVuZXIoXCJpbnB1dFwiLCAoZSkgPT4ge1xyXG4gICAgICAgICAgICAgICAgbGV0IG1pblZhbCA9IHBhcnNlSW50KHJhbmdlSW5wdXRzWzBdLnZhbHVlKSxcclxuICAgICAgICAgICAgICAgICAgICBtYXhWYWwgPSBwYXJzZUludChyYW5nZUlucHV0c1sxXS52YWx1ZSk7XHJcblxyXG4gICAgICAgICAgICAgICAgaWYgKG1heFZhbCAtIG1pblZhbCA8IHByaWNlR2FwKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgaWYgKGUudGFyZ2V0LmNsYXNzTGlzdC5jb250YWlucyhcInJhbmdlLW1pblwiKSkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICByYW5nZUlucHV0c1swXS52YWx1ZSA9IG1heFZhbCAtIHByaWNlR2FwO1xyXG4gICAgICAgICAgICAgICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHJhbmdlSW5wdXRzWzFdLnZhbHVlID0gbWluVmFsICsgcHJpY2VHYXA7XHJcbiAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgICAgICAgICBwcmljZUlucHV0c1swXS52YWx1ZSA9IG1pblZhbDtcclxuICAgICAgICAgICAgICAgICAgICBwcmljZUlucHV0c1sxXS52YWx1ZSA9IG1heFZhbDtcclxuICAgICAgICAgICAgICAgICAgICBwcm9ncmVzcy5zdHlsZS5sZWZ0ID0gKG1pblZhbCAvIHJhbmdlSW5wdXRzWzBdLm1heCkgKiAxMDAgKyBcIiVcIjtcclxuICAgICAgICAgICAgICAgICAgICBwcm9ncmVzcy5zdHlsZS5yaWdodCA9IDEwMCAtIChtYXhWYWwgLyByYW5nZUlucHV0c1sxXS5tYXgpICogMTAwICsgXCIlXCI7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIH0pO1xyXG4gICAgICAgIH0pO1xyXG4gICAgfTtcclxuXHJcbiAgICBwcmljZVNsaWRlcigpO1xyXG5cclxuICAgIGNvbnN0IHZpZXdBbGwgPSAoKSA9PiB7XHJcbiAgICAgICAgaWYgKGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3JBbGwoXCIuZmlsdGVyLXZpZXctYWxsXCIpLmxlbmd0aCA9PSAwKSByZXR1cm4gZmFsc2U7XHJcbiAgICAgICAgY29uc3QgZmlsdGVyTGlzdCA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3JBbGwoXCIuZmlsdGVyLWxpc3RcIik7XHJcbiAgICAgICAgY29uc3Qgdmlld0FsbCA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3JBbGwoXCIuZmlsdGVyLXZpZXctYWxsXCIpO1xyXG5cclxuICAgICAgICBmaWx0ZXJMaXN0LmZvckVhY2gobGlzdCA9PiB7XHJcbiAgICAgICAgICAgIGlmIChsaXN0LmNoaWxkcmVuLmxlbmd0aCA+IDUpIHtcclxuICAgICAgICAgICAgICAgIGNvbnN0IGl0ZW1zID0gbGlzdC5jaGlsZHJlbjtcclxuICAgICAgICAgICAgICAgIGNvbnN0IHZpZXdBbGwgPSBsaXN0Lm5leHRFbGVtZW50U2libGluZztcclxuICAgICAgICAgICAgICAgIGZvciAobGV0IGkgPSAwLCBsZW4gPSBpdGVtcy5sZW5ndGg7IGkgPCBsZW47IGkrKykge1xyXG4gICAgICAgICAgICAgICAgICAgIGlmIChpID49IDUpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgaXRlbXNbaV0uc3R5bGUuZGlzcGxheSA9IFwibm9uZVwiO1xyXG4gICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIHZpZXdBbGwuc3R5bGUuZGlzcGxheSA9IFwiYmxvY2tcIjtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH0pO1xyXG5cclxuICAgICAgICB2aWV3QWxsLmZvckVhY2goZWwgPT4ge1xyXG4gICAgICAgICAgICBlbC5hZGRFdmVudExpc3RlbmVyKFwiY2xpY2tcIiwgZnVuY3Rpb24gKCkge1xyXG4gICAgICAgICAgICAgICAgY29uc3QgZmlsdGVySXRlbXMgPSB0aGlzLnByZXZpb3VzRWxlbWVudFNpYmxpbmcuY2hpbGRyZW47XHJcbiAgICAgICAgICAgICAgICBjb25zdCBmaWx0ZXJDb250ZW50ID0gdGhpcy5jbG9zZXN0KFwiLmZpbHRlci1jb250ZW50XCIpO1xyXG4gICAgICAgICAgICAgICAgZm9yIChsZXQgaSA9IDAsIGxlbiA9IGZpbHRlckl0ZW1zLmxlbmd0aDsgaSA8IGxlbjsgaSsrKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgaWYgKGkgPj0gNSkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBpZiAoZmlsdGVySXRlbXNbaV0uc3R5bGUuZGlzcGxheSkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgZmlsdGVySXRlbXNbaV0uc3R5bGUuZGlzcGxheSA9IG51bGw7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB0aGlzLnRleHRDb250ZW50ID0gXCJIaWRlXCJcclxuICAgICAgICAgICAgICAgICAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGZpbHRlckl0ZW1zW2ldLnN0eWxlLmRpc3BsYXkgPSBcIm5vbmVcIjtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMudGV4dENvbnRlbnQgPSBcIlZpZXcgYWxsXCJcclxuICAgICAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIGZpbHRlckNvbnRlbnQuc3R5bGUubWF4SGVpZ2h0ID0gZmlsdGVyQ29udGVudC5zY3JvbGxIZWlnaHQgKyBcInB4XCI7XHJcbiAgICAgICAgICAgIH0pO1xyXG4gICAgICAgIH0pO1xyXG4gICAgfVxyXG5cclxuICAgIHZpZXdBbGwoKTtcclxuXHJcbiAgICAkKFwiLmpzLXByb2R1Y3Qtc2xpZGVyLXByZXZpZXdcIikuc2xpY2soe1xyXG4gICAgICAgIHNsaWRlc1RvU2hvdzogNCxcclxuICAgICAgICB2ZXJ0aWNhbDogdHJ1ZSxcclxuICAgICAgICB2ZXJ0aWNhbFN3aXBpbmc6IHRydWUsXHJcbiAgICAgICAgc2xpZGVzVG9TY3JvbGw6IDEsXHJcbiAgICAgICAgZm9jdXNPblNlbGVjdDogdHJ1ZSxcclxuICAgICAgICBwcmV2QXJyb3c6IFwiLnByb2R1Y3Qtc2xpZGVyLXByZXZpZXdfX2J0bi0tcHJldlwiLFxyXG4gICAgICAgIG5leHRBcnJvdzogXCIucHJvZHVjdC1zbGlkZXItcHJldmlld19fYnRuLS1uZXh0XCIsXHJcbiAgICAgICAgdmFyaWFibGVXaWR0aDogdHJ1ZSxcclxuICAgICAgICBhc05hdkZvcjogXCIucHJvZHVjdC1zbGlkZXItbWFpblwiXHJcbiAgICB9KTtcclxuICAgICQoXCIucHJvZHVjdC1zbGlkZXItbWFpblwiKS5zbGljayh7XHJcbiAgICAgICAgc2xpZGVzVG9TaG93OiAxLFxyXG4gICAgICAgIHNsaWRlc1RvU2Nyb2xsOiAxLFxyXG4gICAgICAgIGFycm93czogZmFsc2UsXHJcbiAgICAgICAgZmFkZTogdHJ1ZSxcclxuICAgICAgICBhc05hdkZvcjogXCIuanMtcHJvZHVjdC1zbGlkZXItcHJldmlld1wiXHJcbiAgICB9KTtcclxuICAgICQoXCIuanMtcHJvZHVjdC1jb21wYXJlLXNsaWRlclwiKS5zbGljayh7XHJcbiAgICAgICAgc2xpZGVzVG9TaG93OiAxLFxyXG4gICAgICAgIHNsaWRlc1RvU2Nyb2xsOiAxLFxyXG4gICAgICAgIHByZXZBcnJvdzogXCIucHJvZHVjdC1jb21wYXJlLXNsaWRlcl9fYnRuLS1wcmV2XCIsXHJcbiAgICAgICAgbmV4dEFycm93OiBcIi5wcm9kdWN0LWNvbXBhcmUtc2xpZGVyX19idG4tLW5leHRcIixcclxuICAgICAgICAvLyB2YXJpYWJsZVdpZHRoOiB0cnVlLFxyXG4gICAgfSk7XHJcbiAgICAkKFwiLmpzLXJlbGF0ZWQtcHJvZHVjdHMtc2xpZGVyXCIpLnNsaWNrKHtcclxuICAgICAgICBzbGlkZXNUb1Nob3c6IDMsXHJcbiAgICAgICAgc2xpZGVzVG9TY3JvbGw6IDEsXHJcbiAgICAgICAgcHJldkFycm93OiBcIi5qcy1yZWxhdGVkLXByZXZcIixcclxuICAgICAgICBuZXh0QXJyb3c6IFwiLmpzLXJlbGF0ZWQtbmV4dFwiLFxyXG4gICAgICAgIHJlc3BvbnNpdmU6IFtcclxuICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgYnJlYWtwb2ludDogNzY4LFxyXG4gICAgICAgICAgICAgICAgc2V0dGluZ3M6IHtcclxuICAgICAgICAgICAgICAgICAgICBzbGlkZXNUb1Nob3c6IDIsXHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIH0sXHJcbiAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICAgIGJyZWFrcG9pbnQ6IDU3NixcclxuICAgICAgICAgICAgICAgIHNldHRpbmdzOiB7XHJcbiAgICAgICAgICAgICAgICAgICAgc2xpZGVzVG9TaG93OiAxLFxyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB9LFxyXG4gICAgICAgIF1cclxuICAgIH0pO1xyXG4gICAgJChcIi5qcy1yZXNlbnRseS12aWV3ZWQtc2xpZGVyXCIpLnNsaWNrKHtcclxuICAgICAgICBzbGlkZXNUb1Nob3c6IDQsXHJcbiAgICAgICAgc2xpZGVzVG9TY3JvbGw6IDEsXHJcbiAgICAgICAgcHJldkFycm93OiBcIi5qcy1yZXNlbnRseS12aWV3ZWQtcHJldlwiLFxyXG4gICAgICAgIG5leHRBcnJvdzogXCIuanMtcmVzZW50bHktdmlld2VkLW5leHRcIixcclxuICAgICAgICByZXNwb25zaXZlOiBbXHJcbiAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICAgIGJyZWFrcG9pbnQ6IDk5MixcclxuICAgICAgICAgICAgICAgIHNldHRpbmdzOiB7XHJcbiAgICAgICAgICAgICAgICAgICAgc2xpZGVzVG9TaG93OiAzLFxyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB9LFxyXG4gICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgICBicmVha3BvaW50OiA3NjgsXHJcbiAgICAgICAgICAgICAgICBzZXR0aW5nczoge1xyXG4gICAgICAgICAgICAgICAgICAgIHNsaWRlc1RvU2hvdzogMixcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgfSxcclxuICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgYnJlYWtwb2ludDogNTc2LFxyXG4gICAgICAgICAgICAgICAgc2V0dGluZ3M6IHtcclxuICAgICAgICAgICAgICAgICAgICBzbGlkZXNUb1Nob3c6IDEsXHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIH0sXHJcbiAgICAgICAgXVxyXG4gICAgfSk7XHJcbiAgICAkKCdib2R5Jykub24oJ2tleXVwJywgJy5qcy1zZWFyY2gtbWF0Y2hlcycsIGZ1bmN0aW9uICgpIHtcclxuICAgICAgICBsZXQgc2VsZiA9ICQodGhpcyk7XHJcbiAgICAgICAgbGV0IGxpc3QgPSAkKCcuJyArIHNlbGYuZGF0YSgnbGlzdCcpKTtcclxuICAgICAgICAkLmFqYXgoe1xyXG4gICAgICAgICAgICB1cmw6IHNlbGYuZGF0YSgndXJsJykgKyAnP3E9JyArIHNlbGYudmFsKCksXHJcbiAgICAgICAgICAgIHR5cGU6ICdHRVQnLFxyXG4gICAgICAgICAgICBkYXRhVHlwZTogJ2pzb24nLFxyXG4gICAgICAgICAgICBzdWNjZXNzOiBmdW5jdGlvbiAocmVzcG9uc2UpIHtcclxuICAgICAgICAgICAgICAgIGxpc3QuZW1wdHkoKTtcclxuXHJcbiAgICAgICAgICAgICAgICBpZiAocmVzcG9uc2UuaXRlbXMubGVuZ3RoKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgJC5lYWNoKHJlc3BvbnNlLml0ZW1zLCBmdW5jdGlvbiAoaSwgaXRlbSkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBsaXN0LmFwcGVuZChgPGEgY2xhc3M9XCJzZWFyY2gtZm9ybS1tYXRjaGVzX19saW5rXCIgaHJlZj1cIiR7aXRlbS51cmx9XCI+JHtpdGVtLnRpdGxlfTwvYT5gKTtcclxuICAgICAgICAgICAgICAgICAgICB9KTtcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH0pO1xyXG4gICAgfSk7XHJcbn0pKCk7Il0sImZpbGUiOiJtYWluLmpzIn0=
