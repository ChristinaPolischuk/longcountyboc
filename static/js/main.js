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
//# sourceMappingURL=data:application/json;charset=utf8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIm1haW4uanMiXSwibmFtZXMiOlsiY3JvcFRleHQiLCJoaWRlQmxvY2siLCJyZWFkTW9yZSIsImRvY3VtZW50IiwicXVlcnlTZWxlY3RvckFsbCIsImZvckVhY2giLCJlbCIsImFkZEV2ZW50TGlzdGVuZXIiLCJlbFRleHQiLCJpbm5lclRleHQiLCJoaWRkZW5UZXh0IiwicHJldmlvdXNFbGVtZW50U2libGluZyIsImNsYXNzTGlzdCIsInRvZ2dsZSIsIm1heCIsInRleHQiLCJzdHIiLCJ0cmltIiwibGVuZ3RoIiwic3ViU3RyIiwic3Vic3RyaW5nIiwiaGlkZGVuU3RyIiwiaW5uZXJIVE1MIiwic2hvd1JldmlldyIsImltYWdlcyIsIm5leHRFbGVtZW50U2libGluZyIsInByb2R1Y3RSZXZpZXciLCJwcm9kdWN0VGV4dCIsInF1ZXJ5U2VsZWN0b3IiLCJjcmVhdGVFbGVtZW50IiwiYWRkIiwidGV4dENvbnRlbnQiLCJhZnRlciIsImJlZm9yZSIsImFjY29yZGlvbiIsImUiLCJ0YXJnZXQiLCJjb250YWlucyIsImNsb3Nlc3QiLCJhY2NvcmRpb25Db250ZW50Iiwic3R5bGUiLCJtYXhIZWlnaHQiLCJnZXRDb21wdXRlZFN0eWxlIiwicGFyZW50RWxlbWVudCIsInJlbW92ZSIsInNjcm9sbEhlaWdodCIsInNpZGViYXJMaW5rcyIsImVsZW0iLCJuYXZiYXJMaW5rQ2xpY2siLCJldmVudCIsInNtb290aFNjcm9sbCIsInByZXZlbnREZWZhdWx0IiwidGFyZ2V0SWQiLCJjdXJyZW50VGFyZ2V0IiwiZ2V0QXR0cmlidXRlIiwid2luZG93Iiwic2NyZWVuIiwid2lkdGgiLCJzY3JvbGxUbyIsInRvcCIsIm9mZnNldFRvcCIsImJlaGF2aW9yIiwidG9nZ2xlRml4ZWQiLCJ0aHJvdHRsZSIsInRyYWNrU2Nyb2xsIiwiZWxlbWVudHMiLCJzdGlja3lCbG9ja3MiLCJwYWdlWU9mZnNldCIsInN0aWNreUJsb2NrQ29vcmRzIiwiZ2V0Qm91bmRpbmdDbGllbnRSZWN0IiwiYm90dG9tIiwidHlwZSIsIm5hbWUiLCJvYmoiLCJydW5uaW5nIiwiZnVuYyIsInJlcXVlc3RBbmltYXRpb25GcmFtZSIsImRpc3BhdGNoRXZlbnQiLCJDdXN0b21FdmVudCIsImVsZW1lbnQiLCJmaXhlZFdpZHRoIiwiY2xpZW50V2lkdGgiLCJzaG93SGlkZVNpZGViYXJGaWx0ZXJzIiwic2hvd0hpZGVGaWx0ZXJzIiwic2lkZWJhckZpbHRlcnMiLCJmaWx0ZXIiLCJ0cmlnZ2VyIiwibW9iaWxlTmF2IiwiaXNDbG9zZWQiLCJidXJnZXJUaW1lIiwic2VhcmNoQnRuIiwidmFsdWUiLCJwcm9kdWN0UmV2aWV3U3RhcnMiLCJkYXRhUmF0aW5nIiwic3RhcnMiLCJjaGlsZHJlbiIsImkiLCJjaG9vc2VSYXRpbmciLCJyYXRpbmciLCJyYXRpbmdTdGFycyIsInJlbW92ZUNsYXNzIiwibW91c2VPdmVyQWN0aXZlQ2xhc3MiLCJhZGRDbGFzcyIsIm1vdXNlT3V0QWN0aXZlQ2xhc3MiLCJhcnIiLCJpTGVuZyIsImoiLCJhcmd1bWVudHMiLCJpTGVuIiwiY2FyZXREcm9wZG93biIsImZpcnN0RWxlbWVudENoaWxkIiwiZHJvcGRvd24iLCJvcGFjaXR5IiwiYmFzaWNTY3JvbGxUb3AiLCJidG5Ub3AiLCJidG5SZXZlYWwiLCJzY3JvbGxZIiwiVG9wc2Nyb2xsVG8iLCJzZXRUaW1lb3V0Iiwib3Blbk1vZGFsIiwibW9kYWxCdG4iLCJtb2RhbENvbnRhaW5lciIsImJvZHkiLCJrZXlDb2RlIiwic2VlTW9yZSIsIm51bWJlciIsImJ1dHRvbiIsInNob3dIaWRlQmxvY2tzIiwiaW5kZXgiLCJkaXNwbGF5IiwiZWxlbXMiLCJidG5TaG93SGlkZSIsInNob3dJdGVtcyIsIm51bWJlckRlc2t0b3AiLCJudW1iZXJNb2JpbGUiLCJpdGVtcyIsImJ0biIsInNob3dIaWRlSXRlbXMiLCJlbHMiLCJzaG93Rm9vdGVyTGlua3MiLCJmb290ZXJUaXRsZSIsImZvb3RlckxpbmtzIiwiZm9vdGVyTGluayIsInRpdGxlIiwic2V0UGVyY2VudCIsImNpcmN1bGFyUHJvZ3Jlc3MiLCJpdGVtIiwiY2lyY2xlIiwiZGF0YVBlcmNlbnQiLCJwZXJjZW50Iiwic3Ryb2tlRGFzaG9mZnNldCIsInByaWNlU2xpZGVyIiwicmFuZ2VJbnB1dHMiLCJwcmljZUlucHV0cyIsInByb2dyZXNzIiwicHJpY2VHYXAiLCJwcmljZUlucHV0IiwibWluVmFsIiwicGFyc2VJbnQiLCJtYXhWYWwiLCJsZWZ0IiwicmlnaHQiLCJyYW5nZUlucHV0Iiwidmlld0FsbCIsImZpbHRlckxpc3QiLCJsaXN0IiwibGVuIiwiZmlsdGVySXRlbXMiLCJmaWx0ZXJDb250ZW50IiwiJCIsInNsaWNrIiwic2xpZGVzVG9TaG93IiwidmVydGljYWwiLCJ2ZXJ0aWNhbFN3aXBpbmciLCJzbGlkZXNUb1Njcm9sbCIsImZvY3VzT25TZWxlY3QiLCJwcmV2QXJyb3ciLCJuZXh0QXJyb3ciLCJ2YXJpYWJsZVdpZHRoIiwiYXNOYXZGb3IiLCJhcnJvd3MiLCJmYWRlIiwicmVzcG9uc2l2ZSIsImJyZWFrcG9pbnQiLCJzZXR0aW5ncyIsIm9uIiwic2VsZiIsImRhdGEiLCJhamF4IiwidXJsIiwidmFsIiwiZGF0YVR5cGUiLCJzdWNjZXNzIiwicmVzcG9uc2UiLCJlbXB0eSIsImVhY2giLCJhcHBlbmQiXSwibWFwcGluZ3MiOiI7O0FBQUE7O0FBQ0EsQ0FBQyxZQUFZO0FBQ1RBLEVBQUFBLFFBQVE7QUFDUkMsRUFBQUEsU0FBUztBQUVULE1BQUlDLFFBQVEsR0FBR0MsUUFBUSxDQUFDQyxnQkFBVCxDQUEwQixlQUExQixDQUFmO0FBRUFGLEVBQUFBLFFBQVEsQ0FBQ0csT0FBVCxDQUFpQixVQUFBQyxFQUFFLEVBQUk7QUFDbkJBLElBQUFBLEVBQUUsQ0FBQ0MsZ0JBQUgsQ0FBb0IsT0FBcEIsRUFBNkIsWUFBTTtBQUMvQixVQUFJQyxNQUFNLEdBQUdGLEVBQUUsQ0FBQ0csU0FBaEI7QUFDQSxVQUFJQyxVQUFVLEdBQUdKLEVBQUUsQ0FBQ0ssc0JBQXBCO0FBRUFMLE1BQUFBLEVBQUUsQ0FB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QWpCRDtBQWtCSCxDQTFzQkQiLCJzb3VyY2VzQ29udGVudCI6WyI7XHJcbihmdW5jdGlvbiAoKSB7XHJcbiAgICBjcm9wVGV4dCgpO1xyXG4gICAgaGlkZUJsb2NrKCk7XHJcblxyXG4gICAgbGV0IHJlYWRNb3JlID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvckFsbCgnLmpzLXJlYWQtbW9yZScpO1xyXG5cclxuICAgIHJlYWRNb3JlLmZvckVhY2goZWwgPT4ge1xyXG4gICAgICAgIGVsLmFkZEV2ZW50TGlzdGVuZXIoJ2NsaWNrJywgKCkgPT4ge1xyXG4gICAgICAgICAgICBsZXQgZWxUZXh0ID0gZWwuaW5uZXJUZXh0O1xyXG4gICAgICAgICAgICBsZXQgaGlkZGVuVGV4dCA9IGVsLnByZXZpb3VzRWxlbWVudFNpYmxpbmc7XHJcblxyXG4gICAgICAgICAgICBlbC5pbm5lclRleHQgPSBlbFRleHQgPT0gJ3JlYWQgbW9yZSA+JyA/ICdoaWRlJyA6ICdyZWFkIG1vcmUgPic7XHJcbiAgICAgICAgICAgIGhpZGRlblRleHQuY2xhc3NMaXN0LnRvZ2dsZSgnc2hvdycpO1xyXG4gICAgICAgIH0pO1xyXG4gICAgfSk7XHJcblxyXG4gICAgZnVuY3Rpb24gY3JvcFRleHQoKSB7XHJcbiAgICAgICAgbGV0IG1heCA9IDIwMDtcclxuICAgICAgICBsZXQgdGV4dCA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3JBbGwoJy5qcy1yZWFkLW1vcmUtdGV4dCcpO1xyXG4gICAgICAgIHRleHQuZm9yRWFjaChlbCA9PiB7XHJcbiAgICAgICAgICAgIGxldCBzdHIgPSBlbC5pbm5lclRleHQudHJpbSgpO1xyXG4gICAgICAgICAgICBpZiAoc3RyLmxlbmd0aCA+IG1heCkge1xyXG4gICAgICAgICAgICAgICAgbGV0IHN1YlN0ciA9IHN0ci5zdWJzdHJpbmcoMCwgbWF4KTtcclxuICAgICAgICAgICAgICAgIGxldCBoaWRkZW5TdHIgPSBzdHIuc3Vic3RyaW5nKG1heCwgc3RyLmxlbmd0aCk7XHJcbiAgICAgICAgICAgICAgICBlbC5pbm5lclRleHQgPSBzdWJTdHI7XHJcbiAgICAgICAgICAgICAgICBlbC5pbm5lckhUTUwgKz0gYDxzcGFuIGNsYXNzPVwiaGlkZGVuLXRleHQganMtaGlkZGVuLXRleHRcIj4ke2hpZGRlblN0cn08L3NwYW4+YDtcclxuICAgICAgICAgICAgICAgIGVsLmlubmVySFRNTCArPSAnPHNwYW4gY2xhc3M9XCJyZWFkLW1vcmUganMtcmVhZC1tb3JlXCI+cmVhZCBtb3JlID48L3NwYW4+JztcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH0pO1xyXG4gICAgfVxyXG5cclxuICAgIGxldCBzaG93UmV2aWV3ID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvckFsbCgnLmpzLXNob3ctcmV2aWV3Jyk7XHJcblxyXG4gICAgc2hvd1Jldmlldy5mb3JFYWNoKGVsID0+IHtcclxuICAgICAgICBlbC5hZGRFdmVudExpc3RlbmVyKCdjbGljaycsICgpID0+IHtcclxuICAgICAgICAgICAgbGV0IGVsVGV4dCA9IGVsLmlubmVyVGV4dDtcclxuICAgICAgICAgICAgbGV0IGhpZGRlblRleHQgPSBlbC5wcmV2aW91c0VsZW1lbnRTaWJsaW5nO1xyXG4gICAgICAgICAgICBsZXQgaW1hZ2VzID0gZWwubmV4dEVsZW1lbnRTaWJsaW5nO1xyXG5cclxuICAgICAgICAgICAgZWwuaW5uZXJUZXh0ID0gZWxUZXh0ID09ICdyZWFkIG1vcmUgPicgPyAnPCBoaWRlJyA6ICdyZWFkIG1vcmUgPic7XHJcbiAgICAgICAgICAgIGhpZGRlblRleHQuY2xhc3NMaXN0LnRvZ2dsZSgnc2hvdycpO1xyXG4gICAgICAgICAgICBpbWFnZXMuY2xhc3NMaXN0LnRvZ2dsZShcInNob3dcIik7XHJcbiAgICAgICAgfSk7XHJcbiAgICB9KTtcclxuXHJcbiAgICBmdW5jdGlvbiBoaWRlQmxvY2soKSB7XHJcbiAgICAgICAgbGV0IG1heCA9IDEyODtcclxuICAgICAgICBsZXQgcHJvZHVjdFJldmlldyA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3JBbGwoJy5qcy1oaWRlLXJldmlldycpO1xyXG4gICAgICAgIHByb2R1Y3RSZXZpZXcuZm9yRWFjaChlbCA9PiB7XHJcbiAgICAgICAgICAgIGxldCBwcm9kdWN0VGV4dCA9IGVsLnF1ZXJ5U2VsZWN0b3IoXCIucGFnZS10ZXh0XCIpO1xyXG4gICAgICAgICAgICBsZXQgc3RyID0gcHJvZHVjdFRleHQuaW5uZXJUZXh0LnRyaW0oKTtcclxuICAgICAgICAgICAgbGV0IGltYWdlcyA9IGVsLnF1ZXJ5U2VsZWN0b3IoJy5wcm9kdWN0LXJldmlld19faW1hZ2VzJyk7XHJcbiAgICAgICAgICAgIGlmIChzdHIubGVuZ3RoID4gbWF4KSB7XHJcbiAgICAgICAgICAgICAgICBsZXQgc3ViU3RyID0gc3RyLnN1YnN0cmluZygwLCBtYXgpO1xyXG4gICAgICAgICAgICAgICAgbGV0IGhpZGRlblN0ciA9IHN0ci5zdWJzdHJpbmcobWF4LCBzdHIubGVuZ3RoKTtcclxuICAgICAgICAgICAgICAgIHByb2R1Y3RUZXh0LmlubmVyVGV4dCA9IHN1YlN0cjtcclxuXHJcbiAgICAgICAgICAgICAgICBsZXQgaGlkZGVuVGV4dCA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ3NwYW4nKTtcclxuICAgICAgICAgICAgICAgIGhpZGRlblRleHQuY2xhc3NMaXN0LmFkZCgnaGlkZGVuLXRleHQnLCAncGFnZS10ZXh0JywgJ2pzLWhpZGRlbi10ZXh0Jyk7XHJcbiAgICAgICAgICAgICAgICBoaWRkZW5UZXh0LnRleHRDb250ZW50ID0gaGlkZGVuU3RyO1xyXG5cclxuICAgICAgICAgICAgICAgIHByb2R1Y3RUZXh0LmFmdGVyKGhpZGRlblRleHQpO1xyXG5cclxuICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgbGV0IHJlYWRNb3JlID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnc3BhbicpO1xyXG4gICAgICAgICAgICByZWFkTW9yZS5jbGFzc0xpc3QuYWRkKCdyZWFkLW1vcmUnLCAnanMtc2hvdy1yZXZpZXcnKTtcclxuICAgICAgICAgICAgcmVhZE1vcmUudGV4dENvbnRlbnQgPSAncmVhZCBtb3JlID4nO1xyXG5cclxuICAgICAgICAgICAgaW1hZ2VzLmJlZm9yZShyZWFkTW9yZSk7XHJcbiAgICAgICAgfSk7XHJcbiAgICB9XHJcblxyXG4gICAgY29uc3QgYWNjb3JkaW9uID0gKCkgPT4ge1xyXG4gICAgICAgIGRvY3VtZW50LmFkZEV2ZW50TGlzdGVuZXIoJ2NsaWNrJywgZSA9PiB7XHJcbiAgICAgICAgICAgIGlmIChlLnRhcmdldC5jbGFzc0xpc3QuY29udGFpbnMoJ2pzLWFjY29yZGlvbicpIHx8IGUudGFyZ2V0LmNsb3Nlc3QoJy5qcy1hY2NvcmRpb24nKSkge1xyXG4gICAgICAgICAgICAgICAgY29uc3QgYWNjb3JkaW9uID0gZS50YXJnZXQuY2xhc3NMaXN0LmNvbnRhaW5zKCdqcy1hY2NvcmRpb24nKSA/IGUudGFyZ2V0IDogZS50YXJnZXQuY2xvc2VzdCgnLmpzLWFjY29yZGlvbicpO1xyXG4gICAgICAgICAgICAgICAgY29uc3QgYWNjb3JkaW9uQ29udGVudCA9IGFjY29yZGlvbi5uZXh0RWxlbWVudFNpYmxpbmc7XHJcbiAgICAgICAgICAgICAgICBpZiAoYWNjb3JkaW9uQ29udGVudC5zdHlsZS5tYXhIZWlnaHQgfHwgZ2V0Q29tcHV0ZWRTdHlsZShhY2NvcmRpb25Db250ZW50KS5tYXhIZWlnaHQgPT0gXCJtYXgtY29udGVudFwiKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgYWNjb3JkaW9uLnBhcmVudEVsZW1lbnQuY2xhc3NMaXN0LnJlbW92ZShcImFjdGl2ZVwiKTtcclxuICAgICAgICAgICAgICAgICAgICBhY2NvcmRpb25Db250ZW50LnN0eWxlLm1heEhlaWdodCA9IG51bGw7XHJcbiAgICAgICAgICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICAgICAgICAgIGFjY29yZGlvbi5wYXJlbnRFbGVtZW50LmNsYXNzTGlzdC5hZGQoXCJhY3RpdmVcIik7XHJcbiAgICAgICAgICAgICAgICAgICAgYWNjb3JkaW9uQ29udGVudC5zdHlsZS5tYXhIZWlnaHQgPSBhY2NvcmRpb25Db250ZW50LnNjcm9sbEhlaWdodCArIFwicHhcIjtcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH0pO1xyXG4gICAgfVxyXG4gICAgYWNjb3JkaW9uKCk7XHJcblxyXG4gICAgY29uc3Qgc2lkZWJhckxpbmtzID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvckFsbChcIi5zaWRlYmFyLW1lbnVfX2xpbmtcIik7XHJcblxyXG4gICAgc2lkZWJhckxpbmtzLmZvckVhY2goZWxlbSA9PiBlbGVtLmFkZEV2ZW50TGlzdGVuZXIoXCJjbGlja1wiLCBuYXZiYXJMaW5rQ2xpY2spKTtcclxuXHJcbiAgICBmdW5jdGlvbiBuYXZiYXJMaW5rQ2xpY2soZXZlbnQpIHtcclxuICAgICAgICBzbW9vdGhTY3JvbGwoZXZlbnQpO1xyXG4gICAgfVxyXG5cclxuICAgIGZ1bmN0aW9uIHNtb290aFNjcm9sbChldmVudCkge1xyXG4gICAgICAgIGV2ZW50LnByZXZlbnREZWZhdWx0KCk7XHJcbiAgICAgICAgY29uc3QgdGFyZ2V0SWQgPSBldmVudC5jdXJyZW50VGFyZ2V0LmdldEF0dHJpYnV0ZShcImhyZWZcIik7XHJcbiAgICAgICAgaWYgKHdpbmRvdy5zY3JlZW4ud2lkdGggPiAxMDI0KSB7XHJcbiAgICAgICAgICAgIHdpbmRvdy5zY3JvbGxUbyh7XHJcbiAgICAgICAgICAgICAgICB0b3A6IHRhcmdldElkID09PSBcIiNcIiA/IDAgOiBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKHRhcmdldElkKS5vZmZzZXRUb3AgLSAxMDAsXHJcbiAgICAgICAgICAgICAgICBiZWhhdmlvcjogXCJzbW9vdGhcIlxyXG4gICAgICAgICAgICB9KTtcclxuICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICB3aW5kb3cuc2Nyb2xsVG8oe1xyXG4gICAgICAgICAgICAgICAgdG9wOiB0YXJnZXRJZCA9PT0gXCIjXCIgPyAwIDogZG9jdW1lbnQucXVlcnlTZWxlY3Rvcih0YXJnZXRJZCkub2Zmc2V0VG9wIC0gMjAwLFxyXG4gICAgICAgICAgICAgICAgYmVoYXZpb3I6IFwic21vb3RoXCJcclxuICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG5cclxuICAgIGlmIChkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcucHJvZHVjdHMtc3RpY2t5JykgIT09IG51bGwpIHtcclxuXHJcbiAgICAgICAgd2luZG93LmFkZEV2ZW50TGlzdGVuZXIoJ29wdGltaXplZFJlc2l6ZScsICgpID0+IHtcclxuICAgICAgICAgICAgdG9nZ2xlRml4ZWQoJy5wcm9kdWN0cy1zdGlja3knKTtcclxuICAgICAgICB9KTtcclxuXHJcblxyXG4gICAgICAgIHRvZ2dsZUZpeGVkKCcucHJvZHVjdHMtc3RpY2t5Jyk7XHJcblxyXG4gICAgICAgIHRocm90dGxlKFwicmVzaXplXCIsIFwib3B0aW1pemVkUmVzaXplXCIpO1xyXG5cclxuICAgIH1cclxuXHJcbiAgICBpZiAoZG9jdW1lbnQucXVlcnlTZWxlY3RvcignLnN0aWNreS1ibG9jaycpICE9PSBudWxsKSB7XHJcbiAgICAgICAgbGV0IHN0aWNreUJsb2NrQ29vcmRzID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignLnN0aWNreS1ibG9jaycpLmdldEJvdW5kaW5nQ2xpZW50UmVjdCgpLmJvdHRvbSArIHdpbmRvdy5wYWdlWU9mZnNldDtcclxuXHJcbiAgICAgICAgd2luZG93LmFkZEV2ZW50TGlzdGVuZXIoXCJzY3JvbGxcIiwgZnVuY3Rpb24gKCkge1xyXG4gICAgICAgICAgICB0cmFja1Njcm9sbCgnLnN0aWNreS1ibG9jaycpO1xyXG4gICAgICAgIH0pO1xyXG5cclxuICAgICAgICBmdW5jdGlvbiB0cmFja1Njcm9sbChlbGVtZW50cykge1xyXG4gICAgICAgICAgICBsZXQgc3RpY2t5QmxvY2tzID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvckFsbChlbGVtZW50cyk7XHJcbiAgICAgICAgICAgIHN0aWNreUJsb2Nrcy5mb3JFYWNoKGVsID0+IHtcclxuICAgICAgICAgICAgICAgIGlmIChlbC5jbGFzc0xpc3QuY29udGFpbnMoJ3Nob3cnKSAmJiB3aW5kb3cucGFnZVlPZmZzZXQgPCBzdGlja3lCbG9ja0Nvb3Jkcykge1xyXG4gICAgICAgICAgICAgICAgICAgIGVsLmNsYXNzTGlzdC5yZW1vdmUoJ3Nob3cnKTtcclxuICAgICAgICAgICAgICAgIH0gZWxzZSBpZiAod2luZG93LnBhZ2VZT2Zmc2V0ID4gc3RpY2t5QmxvY2tDb29yZHMpIHtcclxuICAgICAgICAgICAgICAgICAgICBlbC5jbGFzc0xpc3QuYWRkKCdzaG93Jyk7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIH0pO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxuXHJcbiAgICBmdW5jdGlvbiB0aHJvdHRsZSh0eXBlLCBuYW1lLCBvYmopIHtcclxuICAgICAgICBvYmogPSBvYmogfHwgd2luZG93O1xyXG4gICAgICAgIHZhciBydW5uaW5nID0gZmFsc2U7XHJcbiAgICAgICAgdmFyIGZ1bmMgPSBmdW5jdGlvbiAoKSB7XHJcbiAgICAgICAgICAgIGlmIChydW5uaW5nKSB7XHJcbiAgICAgICAgICAgICAgICByZXR1cm47XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgcnVubmluZyA9IHRydWU7XHJcbiAgICAgICAgICAgIHJlcXVlc3RBbmltYXRpb25GcmFtZShmdW5jdGlvbiAoKSB7XHJcbiAgICAgICAgICAgICAgICBvYmouZGlzcGF0Y2hFdmVudChuZXcgQ3VzdG9tRXZlbnQobmFtZSkpO1xyXG4gICAgICAgICAgICAgICAgcnVubmluZyA9IGZhbHNlO1xyXG4gICAgICAgICAgICB9KTtcclxuICAgICAgICB9O1xyXG4gICAgICAgIG9iai5hZGRFdmVudExpc3RlbmVyKHR5cGUsIGZ1bmMpO1xyXG4gICAgfTtcclxuXHJcbiAgICBmdW5jdGlvbiB0b2dnbGVGaXhlZChlbCkge1xyXG4gICAgICAgIGxldCBlbGVtZW50ID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcihlbCk7XHJcbiAgICAgICAgbGV0IGZpeGVkV2lkdGggPSB3aW5kb3cuc2NyZWVuLndpZHRoID4gMTAyNCA/IGVsZW1lbnQucGFyZW50RWxlbWVudC5jbGllbnRXaWR0aCAtIDI4NSA6IGVsZW1lbnQucGFyZW50RWxlbWVudC5jbGllbnRXaWR0aDtcclxuICAgICAgICBlbGVtZW50LnN0eWxlLndpZHRoID0gZml4ZWRXaWR0aCArICdweCc7XHJcblxyXG4gICAgfVxyXG5cclxuICAgIGNvbnN0IHNob3dIaWRlU2lkZWJhckZpbHRlcnMgPSAoKSA9PiB7XHJcbiAgICAgICAgaWYgKGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3JBbGwoXCIuZmlsdGVyXCIpLmxlbmd0aCA9PSAwKSByZXR1cm4gZmFsc2U7XHJcblxyXG4gICAgICAgIHdpbmRvdy5hZGRFdmVudExpc3RlbmVyKFwibG9hZFwiLCBzaG93SGlkZUZpbHRlcnMpO1xyXG4gICAgICAgIHdpbmRvdy5hZGRFdmVudExpc3RlbmVyKFwicmVzaXplXCIsIHNob3dIaWRlRmlsdGVycyk7XHJcblxyXG4gICAgICAgIGZ1bmN0aW9uIHNob3dIaWRlRmlsdGVycygpIHtcclxuICAgICAgICAgICAgY29uc3Qgc2lkZWJhckZpbHRlcnMgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yQWxsKFwiLmZpbHRlclwiKTtcclxuXHJcbiAgICAgICAgICAgIGlmICh3aW5kb3cuc2NyZWVuLndpZHRoIDw9IDEwMjQpIHtcclxuICAgICAgICAgICAgICAgIHNpZGViYXJGaWx0ZXJzLmZvckVhY2goZmlsdGVyID0+IHtcclxuICAgICAgICAgICAgICAgICAgICBmaWx0ZXIuY2xhc3NMaXN0LnJlbW92ZShcImFjdGl2ZVwiKTtcclxuICAgICAgICAgICAgICAgIH0pO1xyXG4gICAgICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICAgICAgc2lkZWJhckZpbHRlcnMuZm9yRWFjaChmaWx0ZXIgPT4ge1xyXG4gICAgICAgICAgICAgICAgICAgIGZpbHRlci5jbGFzc0xpc3QuYWRkKFwiYWN0aXZlXCIpO1xyXG4gICAgICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcbiAgICB9XHJcblxyXG4gICAgc2hvd0hpZGVTaWRlYmFyRmlsdGVycygpO1xyXG5cclxuICAgIC8vIGhhbWJ1cmdlciBvcGVuL2Nsb3NlIGFuaW1hdGlvblxyXG4gICAgY29uc3QgdHJpZ2dlciA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoXCIjaGFtYnVyZ2VyXCIpO1xyXG4gICAgY29uc3QgbW9iaWxlTmF2ID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcihcIiNtb2JpbGUtbmF2XCIpO1xyXG4gICAgbGV0IGlzQ2xvc2VkID0gdHJ1ZTtcclxuXHJcbiAgICB0cmlnZ2VyLmFkZEV2ZW50TGlzdGVuZXIoXCJjbGlja1wiLCBidXJnZXJUaW1lKTtcclxuXHJcbiAgICBmdW5jdGlvbiBidXJnZXJUaW1lKCkge1xyXG4gICAgICAgIGlmIChpc0Nsb3NlZCA9PSB0cnVlKSB7XHJcbiAgICAgICAgICAgIHRyaWdnZXIuY2xhc3NMaXN0LnJlbW92ZShcImlzLW9wZW5cIik7XHJcbiAgICAgICAgICAgIHRyaWdnZXIuY2xhc3NMaXN0LmFkZChcImlzLWNsb3NlZFwiKTtcclxuICAgICAgICAgICAgbW9iaWxlTmF2LmNsYXNzTGlzdC5hZGQoJ2lzLW9wZW4nKTtcclxuICAgICAgICAgICAgaXNDbG9zZWQgPSBmYWxzZTtcclxuICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICB0cmlnZ2VyLmNsYXNzTGlzdC5yZW1vdmUoXCJpcy1jbG9zZWRcIik7XHJcbiAgICAgICAgICAgIHRyaWdnZXIuY2xhc3NMaXN0LmFkZChcImlzLW9wZW5cIik7XHJcbiAgICAgICAgICAgIG1vYmlsZU5hdi5jbGFzc0xpc3QucmVtb3ZlKCdpcy1vcGVuJyk7XHJcbiAgICAgICAgICAgIGlzQ2xvc2VkID0gdHJ1ZTtcclxuICAgICAgICB9XHJcbiAgICB9XHJcblxyXG4gICAgLy8gc2VhcmNoIGZvcm0gb3Blbi9jbG9zZSBhbmltYXRpb25cclxuICAgIGNvbnN0IHNlYXJjaEJ0biA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoXCIuc2VhcmNoLWZvcm1fX2J0blwiKTtcclxuICAgIHNlYXJjaEJ0bi5hZGRFdmVudExpc3RlbmVyKFwiY2xpY2tcIiwgZnVuY3Rpb24gKCkge1xyXG4gICAgICAgIHRoaXMuY2xhc3NMaXN0LnRvZ2dsZShcImNsb3NlXCIpO1xyXG4gICAgICAgIHRoaXMucHJldmlvdXNFbGVtZW50U2libGluZy5jbGFzc0xpc3QudG9nZ2xlKFwiaW5jbGlja2VkXCIpO1xyXG4gICAgICAgIHRoaXMucHJldmlvdXNFbGVtZW50U2libGluZy52YWx1ZSA9IFwiXCI7XHJcbiAgICB9KTtcclxuXHJcbiAgICBjb25zdCBwcm9kdWN0UmV2aWV3U3RhcnMgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yQWxsKFwiLmpzLXByb2R1Y3QtcmV2aWV3LXJhdGluZ1wiKTtcclxuICAgIHByb2R1Y3RSZXZpZXdTdGFycy5mb3JFYWNoKGZ1bmN0aW9uIChlbCkge1xyXG4gICAgICAgIGNvbnN0IGRhdGFSYXRpbmcgPSBlbC5nZXRBdHRyaWJ1dGUoXCJkYXRhLXJhdGluZ1wiKTtcclxuICAgICAgICBjb25zdCBzdGFycyA9IGVsLmNoaWxkcmVuO1xyXG4gICAgICAgIGZvciAobGV0IGkgPSAwOyBpIDwgZGF0YVJhdGluZzsgaSsrKSB7XHJcbiAgICAgICAgICAgIHN0YXJzW2ldLmNsYXNzTGlzdC5hZGQoXCJhY3RpdmVcIik7XHJcbiAgICAgICAgfVxyXG4gICAgfSk7XHJcblxyXG4gICAgY29uc3QgY2hvb3NlUmF0aW5nID0gKCkgPT4ge1xyXG4gICAgICAgIGlmIChkb2N1bWVudC5xdWVyeVNlbGVjdG9yKFwiLmpzLXJhdGluZ1wiKSA9PSBudWxsKSByZXR1cm4gZmFsc2U7XHJcbiAgICAgICAgY29uc3QgcmF0aW5nID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcihcIi5qcy1yYXRpbmdcIiksXHJcbiAgICAgICAgICAgIHJhdGluZ1N0YXJzID0gcmF0aW5nLmNoaWxkcmVuO1xyXG4gICAgICAgIHJhdGluZy5hZGRFdmVudExpc3RlbmVyKFwiY2xpY2tcIiwgKGUpID0+IHtcclxuICAgICAgICAgICAgaWYgKGUudGFyZ2V0LmNsYXNzTGlzdC5jb250YWlucyhcInJhdGluZ19fc3RhclwiKSB8fCBlLnRhcmdldC5jbG9zZXN0KFwiLnJhdGluZ19fc3RhclwiKSkge1xyXG4gICAgICAgICAgICAgICAgbGV0IHRhcmdldCA9IGUudGFyZ2V0LmNsYXNzTGlzdC5jb250YWlucyhcInJhdGluZ19fc3RhclwiKSA/IGUudGFyZ2V0IDogZS50YXJnZXQuY2xvc2VzdChcIi5yYXRpbmdfX3N0YXJcIik7XHJcbiAgICAgICAgICAgICAgICByZW1vdmVDbGFzcyhyYXRpbmdTdGFycywgXCJjdXJyZW50LWFjdGl2ZVwiKTtcclxuICAgICAgICAgICAgICAgIHRhcmdldC5jbGFzc0xpc3QuYWRkKFwiYWN0aXZlXCIsIFwiY3VycmVudC1hY3RpdmVcIik7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9KTtcclxuICAgICAgICByYXRpbmcuYWRkRXZlbnRMaXN0ZW5lcihcIm1vdXNlb3ZlclwiLCAoZSkgPT4ge1xyXG4gICAgICAgICAgICBpZiAoZS50YXJnZXQuY2xhc3NMaXN0LmNvbnRhaW5zKFwicmF0aW5nX19zdGFyXCIpIHx8IGUudGFyZ2V0LmNsb3Nlc3QoXCIucmF0aW5nX19zdGFyXCIpKSB7XHJcbiAgICAgICAgICAgICAgICBsZXQgdGFyZ2V0ID0gZS50YXJnZXQuY2xhc3NMaXN0LmNvbnRhaW5zKFwicmF0aW5nX19zdGFyXCIpID8gZS50YXJnZXQgOiBlLnRhcmdldC5jbG9zZXN0KFwiLnJhdGluZ19fc3RhclwiKTtcclxuICAgICAgICAgICAgICAgIHJlbW92ZUNsYXNzKHJhdGluZ1N0YXJzLCBcImFjdGl2ZVwiKTtcclxuICAgICAgICAgICAgICAgIHRhcmdldC5jbGFzc0xpc3QuYWRkKFwiYWN0aXZlXCIpO1xyXG4gICAgICAgICAgICAgICAgbW91c2VPdmVyQWN0aXZlQ2xhc3MocmF0aW5nU3RhcnMpO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfSk7XHJcbiAgICAgICAgcmF0aW5nLmFkZEV2ZW50TGlzdGVuZXIoXCJtb3VzZW91dFwiLCAoKSA9PiB7XHJcbiAgICAgICAgICAgIGFkZENsYXNzKHJhdGluZ1N0YXJzLCBcImFjdGl2ZVwiKTtcclxuICAgICAgICAgICAgbW91c2VPdXRBY3RpdmVDbGFzcyhyYXRpbmdTdGFycyk7XHJcbiAgICAgICAgfSk7XHJcblxyXG4gICAgICAgIGZ1bmN0aW9uIGFkZENsYXNzKGFycikge1xyXG4gICAgICAgICAgICBmb3IgKGxldCBpID0gMCwgaUxlbmcgPSBhcnIubGVuZ3RoOyBpIDwgaUxlbmc7IGkrKykge1xyXG4gICAgICAgICAgICAgICAgZm9yIChsZXQgaiA9IDE7IGogPCBhcmd1bWVudHMubGVuZ3RoOyBqKyspIHtcclxuICAgICAgICAgICAgICAgICAgICByYXRpbmdTdGFyc1tpXS5jbGFzc0xpc3QuYWRkKGFyZ3VtZW50c1tqXSk7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIGZ1bmN0aW9uIHJlbW92ZUNsYXNzKGFycikge1xyXG4gICAgICAgICAgICBmb3IgKGxldCBpID0gMCwgaUxlbmcgPSBhcnIubGVuZ3RoOyBpIDwgaUxlbmc7IGkrKykge1xyXG4gICAgICAgICAgICAgICAgZm9yIChsZXQgaiA9IDE7IGogPCBhcmd1bWVudHMubGVuZ3RoOyBqKyspIHtcclxuICAgICAgICAgICAgICAgICAgICByYXRpbmdTdGFyc1tpXS5jbGFzc0xpc3QucmVtb3ZlKGFyZ3VtZW50c1tqXSk7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIGZ1bmN0aW9uIG1vdXNlT3ZlckFjdGl2ZUNsYXNzKGFycikge1xyXG4gICAgICAgICAgICBmb3IgKGxldCBpID0gMCwgaUxlbiA9IGFyci5sZW5ndGg7IGkgPCBpTGVuOyBpKyspIHtcclxuICAgICAgICAgICAgICAgIGlmIChhcnJbaV0uY2xhc3NMaXN0LmNvbnRhaW5zKFwiYWN0aXZlXCIpKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgYnJlYWs7XHJcbiAgICAgICAgICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICAgICAgICAgIGFycltpXS5jbGFzc0xpc3QuYWRkKFwiYWN0aXZlXCIpO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBmdW5jdGlvbiBtb3VzZU91dEFjdGl2ZUNsYXNzKGFycikge1xyXG4gICAgICAgICAgICBmb3IgKGxldCBpID0gYXJyLmxlbmd0aCAtIDE7IGkgPj0gMDsgaS0tKSB7XHJcbiAgICAgICAgICAgICAgICBpZiAoYXJyW2ldLmNsYXNzTGlzdC5jb250YWlucyhcImN1cnJlbnQtYWN0aXZlXCIpKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgYnJlYWs7XHJcbiAgICAgICAgICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICAgICAgICAgIGFycltpXS5jbGFzc0xpc3QucmVtb3ZlKFwiYWN0aXZlXCIpO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG5cclxuICAgIGNob29zZVJhdGluZygpO1xyXG5cclxuICAgIGRvY3VtZW50LmFkZEV2ZW50TGlzdGVuZXIoXCJjbGlja1wiLCBmdW5jdGlvbiAoZSkge1xyXG4gICAgICAgIGlmIChlLnRhcmdldC5jbGFzc0xpc3QuY29udGFpbnMoXCJqcy1vcGVuLWRyb3Bkb3duXCIpICYmIHdpbmRvdy5zY3JlZW4ud2lkdGggPD0gNTc2KSB7XHJcbiAgICAgICAgICAgIGNvbnN0IGNhcmV0RHJvcGRvd24gPSBlLnRhcmdldC5maXJzdEVsZW1lbnRDaGlsZDtcclxuICAgICAgICAgICAgY29uc3QgZHJvcGRvd24gPSBlLnRhcmdldC5uZXh0RWxlbWVudFNpYmxpbmc7XHJcbiAgICAgICAgICAgIGlmIChkcm9wZG93bi5zdHlsZS5tYXhIZWlnaHQpIHtcclxuICAgICAgICAgICAgICAgIGRyb3Bkb3duLnN0eWxlLm1heEhlaWdodCA9IG51bGw7XHJcbiAgICAgICAgICAgICAgICBkcm9wZG93bi5zdHlsZS5vcGFjaXR5ID0gbnVsbDtcclxuICAgICAgICAgICAgICAgIGUudGFyZ2V0LmNsYXNzTGlzdC5yZW1vdmUoXCJkcm9wZG93bi1hY3RpdmVcIik7XHJcbiAgICAgICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgICAgICBkcm9wZG93bi5zdHlsZS5tYXhIZWlnaHQgPSBkcm9wZG93bi5zY3JvbGxIZWlnaHQgKyBcInB4XCI7XHJcbiAgICAgICAgICAgICAgICBkcm9wZG93bi5zdHlsZS5vcGFjaXR5ID0gMTtcclxuICAgICAgICAgICAgICAgIGUudGFyZ2V0LmNsYXNzTGlzdC5hZGQoXCJkcm9wZG93bi1hY3RpdmVcIik7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcbiAgICB9KTtcclxuXHJcbiAgICBjb25zdCBiYXNpY1Njcm9sbFRvcCA9IGZ1bmN0aW9uICgpIHtcclxuICAgICAgICBjb25zdCBidG5Ub3AgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcuanMtYnRuLWdvLXRvcCcpO1xyXG4gICAgICAgIGNvbnN0IGJ0blJldmVhbCA9IGZ1bmN0aW9uICgpIHtcclxuICAgICAgICAgICAgaWYgKHdpbmRvdy5zY3JvbGxZID49IDMwMCkge1xyXG4gICAgICAgICAgICAgICAgYnRuVG9wLmNsYXNzTGlzdC5hZGQoJ2lzLXZpc2libGUnKTtcclxuICAgICAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgICAgIGJ0blRvcC5jbGFzc0xpc3QucmVtb3ZlKCdpcy12aXNpYmxlJyk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcbiAgICAgICAgY29uc3QgVG9wc2Nyb2xsVG8gPSBmdW5jdGlvbiAoKSB7XHJcbiAgICAgICAgICAgIGlmICh3aW5kb3cuc2Nyb2xsWSAhPSAwKSB7XHJcbiAgICAgICAgICAgICAgICBzZXRUaW1lb3V0KGZ1bmN0aW9uICgpIHtcclxuICAgICAgICAgICAgICAgICAgICB3aW5kb3cuc2Nyb2xsVG8oMCwgd2luZG93LnNjcm9sbFkgLSAzMCk7XHJcbiAgICAgICAgICAgICAgICAgICAgVG9wc2Nyb2xsVG8oKTtcclxuICAgICAgICAgICAgICAgIH0sIDEwKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuICAgICAgICB3aW5kb3cuYWRkRXZlbnRMaXN0ZW5lcignc2Nyb2xsJywgYnRuUmV2ZWFsKTtcclxuICAgICAgICBidG5Ub3AuYWRkRXZlbnRMaXN0ZW5lcignY2xpY2snLCBUb3BzY3JvbGxUbyk7XHJcblxyXG4gICAgfTtcclxuICAgIGJhc2ljU2Nyb2xsVG9wKCk7XHJcblxyXG4gICAgY29uc3Qgb3Blbk1vZGFsID0gKCkgPT4ge1xyXG4gICAgICAgIGNvbnN0IG1vZGFsQnRuID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvckFsbChcIi5qcy1tb2RhbFwiKTtcclxuICAgICAgICBjb25zdCBtb2RhbENvbnRhaW5lciA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoXCIubW9kYWwtYmFja2dyb3VuZFwiKTtcclxuXHJcbiAgICAgICAgbW9kYWxCdG4uZm9yRWFjaChlbCA9PiB7XHJcbiAgICAgICAgICAgIGVsLmFkZEV2ZW50TGlzdGVuZXIoXCJjbGlja1wiLCBmdW5jdGlvbiAoKSB7XHJcbiAgICAgICAgICAgICAgICBkb2N1bWVudC5ib2R5LmNsYXNzTGlzdC5hZGQoXCJtb2RhbC1hY3RpdmVcIik7XHJcbiAgICAgICAgICAgICAgICBtb2RhbENvbnRhaW5lci5jbGFzc0xpc3QucmVtb3ZlKFwib3V0XCIpO1xyXG4gICAgICAgICAgICAgICAgbW9kYWxDb250YWluZXIuY2xhc3NMaXN0LmFkZChcIm9wZW5lZFwiKTtcclxuICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgfSk7XHJcblxyXG4gICAgICAgIGRvY3VtZW50LmFkZEV2ZW50TGlzdGVuZXIoXCJjbGlja1wiLCBmdW5jdGlvbiAoZSkge1xyXG4gICAgICAgICAgICBpZiAoXHJcbiAgICAgICAgICAgICAgICBlLnRhcmdldC5jbGFzc0xpc3QuY29udGFpbnMoXCJtb2RhbC1jb250YWluZXJcIikgfHxcclxuICAgICAgICAgICAgICAgIGUudGFyZ2V0LmNsYXNzTGlzdC5jb250YWlucyhcIm1vZGFsLWNsb3NlXCIpXHJcbiAgICAgICAgICAgICkge1xyXG4gICAgICAgICAgICAgICAgZG9jdW1lbnQuYm9keS5jbGFzc0xpc3QucmVtb3ZlKFwibW9kYWwtYWN0aXZlXCIpO1xyXG4gICAgICAgICAgICAgICAgbW9kYWxDb250YWluZXIuY2xhc3NMaXN0LnJlbW92ZShcIm9wZW5lZFwiKTtcclxuICAgICAgICAgICAgICAgIG1vZGFsQ29udGFpbmVyLmNsYXNzTGlzdC5hZGQoXCJvdXRcIik7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9KTtcclxuICAgICAgICBkb2N1bWVudC5hZGRFdmVudExpc3RlbmVyKFwia2V5ZG93blwiLCBmdW5jdGlvbiAoZSkge1xyXG4gICAgICAgICAgICBpZiAoZS5rZXlDb2RlID09IDI3KSB7XHJcbiAgICAgICAgICAgICAgICBkb2N1bWVudC5ib2R5LmNsYXNzTGlzdC5yZW1vdmUoXCJtb2RhbC1hY3RpdmVcIik7XHJcbiAgICAgICAgICAgICAgICBtb2RhbENvbnRhaW5lci5jbGFzc0xpc3QucmVtb3ZlKFwib3BlbmVkXCIpO1xyXG4gICAgICAgICAgICAgICAgbW9kYWxDb250YWluZXIuY2xhc3NMaXN0LmFkZChcIm91dFwiKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH0pO1xyXG4gICAgfTtcclxuXHJcbiAgICBvcGVuTW9kYWwoKTtcclxuXHJcbiAgICBjb25zdCBzZWVNb3JlID0gKG51bWJlciwgZWxlbWVudHMsIGJ1dHRvbikgPT4ge1xyXG5cclxuICAgICAgICBpZiAoZG9jdW1lbnQucXVlcnlTZWxlY3RvcihidXR0b24pID09IG51bGwpIHtcclxuICAgICAgICAgICAgcmV0dXJuIGZhbHNlO1xyXG4gICAgICAgIH1cclxuICAgICAgICB3aW5kb3cuYWRkRXZlbnRMaXN0ZW5lcihcImxvYWRcIiwgKCkgPT4gc2hvd0hpZGVCbG9ja3MobnVtYmVyLCBlbGVtZW50cywgYnV0dG9uKSk7XHJcbiAgICAgICAgd2luZG93LmFkZEV2ZW50TGlzdGVuZXIoXCJyZXNpemVcIiwgKCkgPT4gc2hvd0hpZGVCbG9ja3MobnVtYmVyLCBlbGVtZW50cywgYnV0dG9uKSk7XHJcblxyXG4gICAgICAgIGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoYnV0dG9uKS5hZGRFdmVudExpc3RlbmVyKFwiY2xpY2tcIiwgZnVuY3Rpb24gKCkge1xyXG4gICAgICAgICAgICBpZiAodGhpcy50ZXh0Q29udGVudCA9PSBcIlNlZSBtb3JlXCIpIHtcclxuICAgICAgICAgICAgICAgIHRoaXMudGV4dENvbnRlbnQgPSBcIlNlZSBsZXNzXCI7XHJcbiAgICAgICAgICAgICAgICB0aGlzLmNsYXNzTGlzdC5hZGQoXCJhY3RpdmVcIik7XHJcbiAgICAgICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgICAgICB0aGlzLnRleHRDb250ZW50ID0gXCJTZWUgbW9yZVwiO1xyXG4gICAgICAgICAgICAgICAgdGhpcy5jbGFzc0xpc3QucmVtb3ZlKFwiYWN0aXZlXCIpO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3JBbGwoZWxlbWVudHMpLmZvckVhY2goKGVsZW0sIGluZGV4KSA9PiB7XHJcbiAgICAgICAgICAgICAgICBpZiAoZWxlbS5zdHlsZS5kaXNwbGF5ID09IFwibm9uZVwiKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgZWxlbS5zdHlsZS5kaXNwbGF5ID0gbnVsbDtcclxuICAgICAgICAgICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgICAgICAgICAgaWYgKGluZGV4ID4gbnVtYmVyKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGVsZW0uc3R5bGUuZGlzcGxheSA9ICdub25lJztcclxuICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIH0pO1xyXG4gICAgICAgIH0pO1xyXG5cclxuICAgICAgICBmdW5jdGlvbiBzaG93SGlkZUJsb2NrcyhudW1iZXIsIGVsZW1lbnRzLCBidXR0b24pIHtcclxuICAgICAgICAgICAgY29uc3QgZWxlbXMgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yQWxsKGVsZW1lbnRzKTtcclxuICAgICAgICAgICAgY29uc3QgYnRuU2hvd0hpZGUgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKGJ1dHRvbik7XHJcblxyXG4gICAgICAgICAgICBpZiAod2luZG93LnNjcmVlbi53aWR0aCA8PSA4MDAgJiYgZWxlbXMubGVuZ3RoID4gbnVtYmVyKSB7XHJcbiAgICAgICAgICAgICAgICBlbGVtcy5mb3JFYWNoKChlbGVtLCBpbmRleCkgPT4ge1xyXG4gICAgICAgICAgICAgICAgICAgIGlmIChpbmRleCA+IG51bWJlcikge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBlbGVtLnN0eWxlLmRpc3BsYXkgPSAnbm9uZSc7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGJ0blNob3dIaWRlLnN0eWxlLmRpc3BsYXkgPSBudWxsO1xyXG4gICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIH0pO1xyXG4gICAgICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICAgICAgZWxlbXMuZm9yRWFjaCgoZWxlbSwgaW5kZXgpID0+IHtcclxuICAgICAgICAgICAgICAgICAgICBlbGVtLnN0eWxlLmRpc3BsYXkgPSBudWxsO1xyXG4gICAgICAgICAgICAgICAgICAgIGJ0blNob3dIaWRlLnN0eWxlLmRpc3BsYXkgPSAnbm9uZSc7XHJcbiAgICAgICAgICAgICAgICB9KTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuICAgIH07XHJcblxyXG4gICAgc2VlTW9yZSgzLCAnLnByb2R1Y3QtY29tcGFyZS10b3BfX2l0ZW0nLCAnLmpzLXNlZS1tb3JlLXByb2R1Y3RzJyk7XHJcbiAgICBzZWVNb3JlKDEsICcuaGVscC1jZW50ZXJfX2l0ZW0nLCAnLmpzLXNlZS1tb3JlLWhlbHAnKTtcclxuXHJcbiAgICBjb25zdCBzaG93SXRlbXMgPSAobnVtYmVyRGVza3RvcCwgbnVtYmVyTW9iaWxlLCBpdGVtcywgYnV0dG9uKSA9PiB7XHJcbiAgICAgICAgaWYgKGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3JBbGwoaXRlbXMpLmxlbmd0aCA9PSAwKSByZXR1cm4gZmFsc2U7XHJcblxyXG4gICAgICAgIGNvbnN0IGJ0biA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoYnV0dG9uKTtcclxuXHJcbiAgICAgICAgd2luZG93LmFkZEV2ZW50TGlzdGVuZXIoXCJsb2FkXCIsIHNob3dIaWRlSXRlbXMpO1xyXG4gICAgICAgIHdpbmRvdy5hZGRFdmVudExpc3RlbmVyKFwicmVzaXplXCIsIHNob3dIaWRlSXRlbXMpO1xyXG5cclxuICAgICAgICBmdW5jdGlvbiBzaG93SGlkZUl0ZW1zKCkge1xyXG4gICAgICAgICAgICBjb25zdCBlbHMgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yQWxsKGl0ZW1zKTtcclxuICAgICAgICAgICAgY29uc3QgYnRuID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcihidXR0b24pO1xyXG4gICAgICAgICAgICBpZiAod2luZG93LnNjcmVlbi53aWR0aCA+IDU3Nykge1xyXG4gICAgICAgICAgICAgICAgaWYgKGVscy5sZW5ndGggPiBudW1iZXJEZXNrdG9wKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgYnRuLnN0eWxlLmRpc3BsYXkgPSBudWxsO1xyXG4gICAgICAgICAgICAgICAgICAgIGVscy5mb3JFYWNoKChlbCwgaSkgPT4ge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBpZiAoaSA+IG51bWJlckRlc2t0b3AgLSAxKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBlbC5zdHlsZS5kaXNwbGF5ID0gXCJub25lXCJcclxuICAgICAgICAgICAgICAgICAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGVsLnN0eWxlLmRpc3BsYXkgPSBudWxsO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICAgICAgICAgIGJ0bi5zdHlsZS5kaXNwbGF5ID0gXCJub25lXCI7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgICAgICBpZiAoZWxzLmxlbmd0aCA+IG51bWJlck1vYmlsZSkge1xyXG4gICAgICAgICAgICAgICAgICAgIGJ0bi5zdHlsZS5kaXNwbGF5ID0gbnVsbDtcclxuICAgICAgICAgICAgICAgICAgICBlbHMuZm9yRWFjaCgoZWwsIGkpID0+IHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgaWYgKGkgPiBudW1iZXJNb2JpbGUgLSAxKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBlbC5zdHlsZS5kaXNwbGF5ID0gXCJub25lXCJcclxuICAgICAgICAgICAgICAgICAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGVsLnN0eWxlLmRpc3BsYXkgPSBudWxsO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICAgICAgICAgIGJ0bi5zdHlsZS5kaXNwbGF5ID0gXCJub25lXCI7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIGJ0bi5hZGRFdmVudExpc3RlbmVyKFwiY2xpY2tcIiwgZnVuY3Rpb24gKCkge1xyXG4gICAgICAgICAgICBjb25zdCBlbGVtcyA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3JBbGwoaXRlbXMpO1xyXG4gICAgICAgICAgICBpZiAodGhpcy50ZXh0Q29udGVudCA9PSBcIlNlZSBtb3JlXCIpIHtcclxuICAgICAgICAgICAgICAgIHRoaXMudGV4dENvbnRlbnQgPSBcIlNlZSBsZXNzXCI7XHJcbiAgICAgICAgICAgICAgICB0aGlzLmNsYXNzTGlzdC5hZGQoXCJhY3RpdmVcIik7XHJcbiAgICAgICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgICAgICB0aGlzLnRleHRDb250ZW50ID0gXCJTZWUgbW9yZVwiO1xyXG4gICAgICAgICAgICAgICAgdGhpcy5jbGFzc0xpc3QucmVtb3ZlKFwiYWN0aXZlXCIpO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIGVsZW1zLmZvckVhY2goKGVsZW0sIGluZGV4KSA9PiB7XHJcbiAgICAgICAgICAgICAgICBpZiAoZWxlbS5zdHlsZS5kaXNwbGF5ID09IFwibm9uZVwiKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgZWxlbS5zdHlsZS5kaXNwbGF5ID0gbnVsbDtcclxuICAgICAgICAgICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgICAgICAgICAgaWYgKCh3aW5kb3cuc2NyZWVuLndpZHRoID4gNTc3ICYmIGluZGV4ID4gbnVtYmVyRGVza3RvcCAtIDEpIHx8ICh3aW5kb3cuc2NyZWVuLndpZHRoIDwgNTc3ICYmIGluZGV4ID4gbnVtYmVyTW9iaWxlIC0xKSkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBlbGVtLnN0eWxlLmRpc3BsYXkgPSAnbm9uZSc7XHJcbiAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB9KTtcclxuICAgICAgICB9KTtcclxuICAgIH1cclxuXHJcbiAgICBzaG93SXRlbXMoOCwgNCwgXCIuYnJhbmRzLWxpc3RfX2l0ZW1cIiwgXCIuanMtc2VlLW1vcmUtYnJhbmRzXCIpO1xyXG5cclxuICAgIGNvbnN0IHNob3dGb290ZXJMaW5rcyA9ICgpID0+IHtcclxuICAgICAgICBjb25zdCBmb290ZXJUaXRsZSA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3JBbGwoJy5mb290ZXJfX3RpdGxlJyk7XHJcbiAgICAgICAgY29uc3QgZm9vdGVyTGlua3MgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yQWxsKCcuZm9vdGVyX19saW5rcycpO1xyXG5cclxuICAgICAgICAvLyB3aW5kb3cuYWRkRXZlbnRMaXN0ZW5lcignbG9hZCcsICgpID0+IHNob3dIaWRlTGlua3MpO1xyXG4gICAgICAgIHdpbmRvdy5hZGRFdmVudExpc3RlbmVyKCdyZXNpemUnLCAoKSA9PiB7XHJcbiAgICAgICAgICAgIGlmICh3aW5kb3cuc2NyZWVuLndpZHRoIDw9IDU3Nikge1xyXG4gICAgICAgICAgICAgICAgZm9vdGVyTGlua3MuZm9yRWFjaChmb290ZXJMaW5rID0+IHtcclxuICAgICAgICAgICAgICAgICAgICBmb290ZXJMaW5rLnN0eWxlLm1heEhlaWdodCA9IDA7XHJcbiAgICAgICAgICAgICAgICB9KTtcclxuICAgICAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgICAgIGZvb3RlckxpbmtzLmZvckVhY2goZm9vdGVyTGluayA9PiB7XHJcbiAgICAgICAgICAgICAgICAgICAgZm9vdGVyTGluay5zdHlsZS5tYXhIZWlnaHQgPSBudWxsO1xyXG4gICAgICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9KTtcclxuXHJcbiAgICAgICAgZm9vdGVyVGl0bGUuZm9yRWFjaCh0aXRsZSA9PiB7XHJcbiAgICAgICAgICAgIHRpdGxlLmFkZEV2ZW50TGlzdGVuZXIoJ2NsaWNrJywgZnVuY3Rpb24gKCkge1xyXG4gICAgICAgICAgICAgICAgY29uc3QgZm9vdGVyTGlua3MgPSB0aGlzLm5leHRFbGVtZW50U2libGluZztcclxuICAgICAgICAgICAgICAgIGlmIChnZXRDb21wdXRlZFN0eWxlKGZvb3RlckxpbmtzKS5tYXhIZWlnaHQgPT0gJzBweCcpIHtcclxuICAgICAgICAgICAgICAgICAgICB0aGlzLmNsYXNzTGlzdC5hZGQoJ2FjdGl2ZScpO1xyXG4gICAgICAgICAgICAgICAgICAgIGZvb3RlckxpbmtzLnN0eWxlLm1heEhlaWdodCA9IGZvb3RlckxpbmtzLnNjcm9sbEhlaWdodCArIFwicHhcIjtcclxuICAgICAgICAgICAgICAgICAgICBmb290ZXJMaW5rcy5zdHlsZS5vcGFjaXR5ID0gMTtcclxuICAgICAgICAgICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5jbGFzc0xpc3QucmVtb3ZlKCdhY3RpdmUnKTtcclxuICAgICAgICAgICAgICAgICAgICBmb290ZXJMaW5rcy5zdHlsZS5tYXhIZWlnaHQgPSBudWxsO1xyXG4gICAgICAgICAgICAgICAgICAgIGZvb3RlckxpbmtzLnN0eWxlLm9wYWNpdHkgPSBudWxsO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB9KVxyXG4gICAgICAgIH0pO1xyXG4gICAgfVxyXG5cclxuICAgIHNob3dGb290ZXJMaW5rcygpO1xyXG5cclxuICAgIGNvbnN0IHNldFBlcmNlbnQgPSAoKSA9PiB7XHJcbiAgICAgICAgY29uc3QgY2lyY3VsYXJQcm9ncmVzcyA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3JBbGwoXCIuanMtY2lyY3VsYXItcHJvZ3Jlc3NcIik7XHJcblxyXG4gICAgICAgIGNpcmN1bGFyUHJvZ3Jlc3MuZm9yRWFjaChpdGVtID0+IHtcclxuICAgICAgICAgICAgY29uc3QgY2lyY2xlID0gaXRlbS5xdWVyeVNlbGVjdG9yKCcuY2lyY3VsYXItcHJvZ3Jlc3NfX3BlcmNlbnQnKTtcclxuICAgICAgICAgICAgY29uc3QgdGV4dCA9IGl0ZW0ucXVlcnlTZWxlY3RvcignLmNpcmN1bGFyLWluZm9fX251bWJlcicpO1xyXG4gICAgICAgICAgICBjb25zdCBkYXRhUGVyY2VudCA9IGl0ZW0uZ2V0QXR0cmlidXRlKCdkYXRhLXBlcmNlbnQnKTtcclxuICAgICAgICAgICAgY29uc3QgcGVyY2VudCA9ICgxMDAgLSBkYXRhUGVyY2VudCkgLyAxMDA7XHJcbiAgICAgICAgICAgIGNpcmNsZS5zdHlsZS5zdHJva2VEYXNob2Zmc2V0ID0gYGNhbGMoMiozMCozLjE0KiR7cGVyY2VudH0pYDtcclxuICAgICAgICAgICAgdGV4dC50ZXh0Q29udGVudCA9IGRhdGFQZXJjZW50O1xyXG4gICAgICAgIH0pO1xyXG4gICAgfVxyXG5cclxuICAgIHNldFBlcmNlbnQoKTtcclxuXHJcbiAgICBkb2N1bWVudC5hZGRFdmVudExpc3RlbmVyKFwiYmx1clwiLCBmdW5jdGlvbiAoZSkge1xyXG4gICAgICAgIGlmIChlLnRhcmdldC5jbGFzc0xpc3QuY29udGFpbnMoJ2NvbnRhY3QtZm9ybV9fZmllbGQnKSB8fCBlLnRhcmdldC5jbGFzc0xpc3QuY29udGFpbnMoJ2NvbnRhY3QtZm9ybV9fbWVzc2FnZScpKSB7XHJcbiAgICAgICAgICAgIGlmIChlLnRhcmdldC52YWx1ZS50cmltKCkgIT0gJycpIHtcclxuICAgICAgICAgICAgICAgIGUudGFyZ2V0Lm5leHRFbGVtZW50U2libGluZy5jbGFzc0xpc3QuYWRkKCdhY3RpdmUnKTtcclxuICAgICAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgICAgIGUudGFyZ2V0Lm5leHRFbGVtZW50U2libGluZy5jbGFzc0xpc3QucmVtb3ZlKCdhY3RpdmUnKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuICAgIH0sIHRydWUpO1xyXG5cclxuICAgIGNvbnN0IHByaWNlU2xpZGVyID0gKCkgPT4ge1xyXG4gICAgICAgIGNvbnN0IHJhbmdlSW5wdXRzID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvckFsbChcIi5wcmljZS1yYW5nZV9faW5wdXRcIiksXHJcbiAgICAgICAgICAgIHByaWNlSW5wdXRzID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvckFsbChcIi5wcmljZS1pbnB1dF9fZmllbGRcIiksXHJcbiAgICAgICAgICAgIHByb2dyZXNzID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcihcIi5wcmljZS1zbGlkZXJfX3Byb2dyZXNzXCIpO1xyXG5cclxuICAgICAgICBsZXQgcHJpY2VHYXAgPSA1MDA7XHJcblxyXG4gICAgICAgIHByaWNlSW5wdXRzLmZvckVhY2goKHByaWNlSW5wdXQpID0+IHtcclxuICAgICAgICAgICAgcHJpY2VJbnB1dC5hZGRFdmVudExpc3RlbmVyKFwiaW5wdXRcIiwgKGUpID0+IHtcclxuICAgICAgICAgICAgICAgIGxldCBtaW5WYWwgPSBwYXJzZUludChwcmljZUlucHV0c1swXS52YWx1ZSksXHJcbiAgICAgICAgICAgICAgICAgICAgbWF4VmFsID0gcGFyc2VJbnQocHJpY2VJbnB1dHNbMV0udmFsdWUpO1xyXG5cclxuICAgICAgICAgICAgICAgIGlmIChtYXhWYWwgLSBtaW5WYWwgPj0gcHJpY2VHYXAgJiYgbWF4VmFsIDw9IDUwMDAwKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgaWYgKGUudGFyZ2V0LmNsYXNzTGlzdC5jb250YWlucyhcInByaWNlLW1pblwiKSkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICByYW5nZUlucHV0c1swXS52YWx1ZSA9IG1pblZhbDtcclxuICAgICAgICAgICAgICAgICAgICAgICAgcHJvZ3Jlc3Muc3R5bGUubGVmdCA9IChtaW5WYWwgLyByYW5nZUlucHV0c1swXS5tYXgpICogMTAwICsgXCIlXCI7XHJcbiAgICAgICAgICAgICAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgcmFuZ2VJbnB1dHNbMV0udmFsdWUgPSBtYXhWYWw7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHByb2dyZXNzLnN0eWxlLnJpZ2h0ID0gMTAwIC0gKG1heFZhbCAvIHJhbmdlSW5wdXRzWzFdLm1heCkgKiAxMDAgKyBcIiVcIjtcclxuICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIH0pO1xyXG4gICAgICAgIH0pO1xyXG5cclxuICAgICAgICByYW5nZUlucHV0cy5mb3JFYWNoKChyYW5nZUlucHV0KSA9PiB7XHJcbiAgICAgICAgICAgIHJhbmdlSW5wdXQuYWRkRXZlbnRMaXN0ZW5lcihcImlucHV0XCIsIChlKSA9PiB7XHJcbiAgICAgICAgICAgICAgICBsZXQgbWluVmFsID0gcGFyc2VJbnQocmFuZ2VJbnB1dHNbMF0udmFsdWUpLFxyXG4gICAgICAgICAgICAgICAgICAgIG1heFZhbCA9IHBhcnNlSW50KHJhbmdlSW5wdXRzWzFdLnZhbHVlKTtcclxuXHJcbiAgICAgICAgICAgICAgICBpZiAobWF4VmFsIC0gbWluVmFsIDwgcHJpY2VHYXApIHtcclxuICAgICAgICAgICAgICAgICAgICBpZiAoZS50YXJnZXQuY2xhc3NMaXN0LmNvbnRhaW5zKFwicmFuZ2UtbWluXCIpKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHJhbmdlSW5wdXRzWzBdLnZhbHVlID0gbWF4VmFsIC0gcHJpY2VHYXA7XHJcbiAgICAgICAgICAgICAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgcmFuZ2VJbnB1dHNbMV0udmFsdWUgPSBtaW5WYWwgKyBwcmljZUdhcDtcclxuICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICAgICAgICAgIHByaWNlSW5wdXRzWzBdLnZhbHVlID0gbWluVmFsO1xyXG4gICAgICAgICAgICAgICAgICAgIHByaWNlSW5wdXRzWzFdLnZhbHVlID0gbWF4VmFsO1xyXG4gICAgICAgICAgICAgICAgICAgIHByb2dyZXNzLnN0eWxlLmxlZnQgPSAobWluVmFsIC8gcmFuZ2VJbnB1dHNbMF0ubWF4KSAqIDEwMCArIFwiJVwiO1xyXG4gICAgICAgICAgICAgICAgICAgIHByb2dyZXNzLnN0eWxlLnJpZ2h0ID0gMTAwIC0gKG1heFZhbCAvIHJhbmdlSW5wdXRzWzFdLm1heCkgKiAxMDAgKyBcIiVcIjtcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgfSk7XHJcbiAgICB9O1xyXG5cclxuICAgIHByaWNlU2xpZGVyKCk7XHJcblxyXG4gICAgY29uc3Qgdmlld0FsbCA9ICgpID0+IHtcclxuICAgICAgICBpZiAoZG9jdW1lbnQucXVlcnlTZWxlY3RvckFsbChcIi5maWx0ZXItdmlldy1hbGxcIikubGVuZ3RoID09IDApIHJldHVybiBmYWxzZTtcclxuICAgICAgICBjb25zdCBmaWx0ZXJMaXN0ID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvckFsbChcIi5maWx0ZXItbGlzdFwiKTtcclxuICAgICAgICBjb25zdCB2aWV3QWxsID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvckFsbChcIi5maWx0ZXItdmlldy1hbGxcIik7XHJcblxyXG4gICAgICAgIGZpbHRlckxpc3QuZm9yRWFjaChsaXN0ID0+IHtcclxuICAgICAgICAgICAgaWYgKGxpc3QuY2hpbGRyZW4ubGVuZ3RoID4gNSkge1xyXG4gICAgICAgICAgICAgICAgY29uc3QgaXRlbXMgPSBsaXN0LmNoaWxkcmVuO1xyXG4gICAgICAgICAgICAgICAgY29uc3Qgdmlld0FsbCA9IGxpc3QubmV4dEVsZW1lbnRTaWJsaW5nO1xyXG4gICAgICAgICAgICAgICAgZm9yIChsZXQgaSA9IDAsIGxlbiA9IGl0ZW1zLmxlbmd0aDsgaSA8IGxlbjsgaSsrKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgaWYgKGkgPj0gNSkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBpdGVtc1tpXS5zdHlsZS5kaXNwbGF5ID0gXCJub25lXCI7XHJcbiAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgdmlld0FsbC5zdHlsZS5kaXNwbGF5ID0gXCJibG9ja1wiO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfSk7XHJcblxyXG4gICAgICAgIHZpZXdBbGwuZm9yRWFjaChlbCA9PiB7XHJcbiAgICAgICAgICAgIGVsLmFkZEV2ZW50TGlzdGVuZXIoXCJjbGlja1wiLCBmdW5jdGlvbiAoKSB7XHJcbiAgICAgICAgICAgICAgICBjb25zdCBmaWx0ZXJJdGVtcyA9IHRoaXMucHJldmlvdXNFbGVtZW50U2libGluZy5jaGlsZHJlbjtcclxuICAgICAgICAgICAgICAgIGNvbnN0IGZpbHRlckNvbnRlbnQgPSB0aGlzLmNsb3Nlc3QoXCIuZmlsdGVyLWNvbnRlbnRcIik7XHJcbiAgICAgICAgICAgICAgICBmb3IgKGxldCBpID0gMCwgbGVuID0gZmlsdGVySXRlbXMubGVuZ3RoOyBpIDwgbGVuOyBpKyspIHtcclxuICAgICAgICAgICAgICAgICAgICBpZiAoaSA+PSA1KSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGlmIChmaWx0ZXJJdGVtc1tpXS5zdHlsZS5kaXNwbGF5KSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBmaWx0ZXJJdGVtc1tpXS5zdHlsZS5kaXNwbGF5ID0gbnVsbDtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMudGV4dENvbnRlbnQgPSBcIkhpZGVcIlxyXG4gICAgICAgICAgICAgICAgICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgZmlsdGVySXRlbXNbaV0uc3R5bGUuZGlzcGxheSA9IFwibm9uZVwiO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy50ZXh0Q29udGVudCA9IFwiVmlldyBhbGxcIlxyXG4gICAgICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgZmlsdGVyQ29udGVudC5zdHlsZS5tYXhIZWlnaHQgPSBmaWx0ZXJDb250ZW50LnNjcm9sbEhlaWdodCArIFwicHhcIjtcclxuICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgfSk7XHJcbiAgICB9XHJcblxyXG4gICAgdmlld0FsbCgpO1xyXG5cclxuICAgICQoXCIuanMtcHJvZHVjdC1zbGlkZXItcHJldmlld1wiKS5zbGljayh7XHJcbiAgICAgICAgc2xpZGVzVG9TaG93OiA0LFxyXG4gICAgICAgIHZlcnRpY2FsOiB0cnVlLFxyXG4gICAgICAgIHZlcnRpY2FsU3dpcGluZzogdHJ1ZSxcclxuICAgICAgICBzbGlkZXNUb1Njcm9sbDogMSxcclxuICAgICAgICBmb2N1c09uU2VsZWN0OiB0cnVlLFxyXG4gICAgICAgIHByZXZBcnJvdzogXCIucHJvZHVjdC1zbGlkZXItcHJldmlld19fYnRuLS1wcmV2XCIsXHJcbiAgICAgICAgbmV4dEFycm93OiBcIi5wcm9kdWN0LXNsaWRlci1wcmV2aWV3X19idG4tLW5leHRcIixcclxuICAgICAgICB2YXJpYWJsZVdpZHRoOiB0cnVlLFxyXG4gICAgICAgIGFzTmF2Rm9yOiBcIi5wcm9kdWN0LXNsaWRlci1tYWluXCJcclxuICAgIH0pO1xyXG4gICAgJChcIi5wcm9kdWN0LXNsaWRlci1tYWluXCIpLnNsaWNrKHtcclxuICAgICAgICBzbGlkZXNUb1Nob3c6IDEsXHJcbiAgICAgICAgc2xpZGVzVG9TY3JvbGw6IDEsXHJcbiAgICAgICAgYXJyb3dzOiBmYWxzZSxcclxuICAgICAgICBmYWRlOiB0cnVlLFxyXG4gICAgICAgIGFzTmF2Rm9yOiBcIi5qcy1wcm9kdWN0LXNsaWRlci1wcmV2aWV3XCJcclxuICAgIH0pO1xyXG4gICAgJChcIi5qcy1wcm9kdWN0LWNvbXBhcmUtc2xpZGVyXCIpLnNsaWNrKHtcclxuICAgICAgICBzbGlkZXNUb1Nob3c6IDEsXHJcbiAgICAgICAgc2xpZGVzVG9TY3JvbGw6IDEsXHJcbiAgICAgICAgcHJldkFycm93OiBcIi5wcm9kdWN0LWNvbXBhcmUtc2xpZGVyX19idG4tLXByZXZcIixcclxuICAgICAgICBuZXh0QXJyb3c6IFwiLnByb2R1Y3QtY29tcGFyZS1zbGlkZXJfX2J0bi0tbmV4dFwiLFxyXG4gICAgICAgIC8vIHZhcmlhYmxlV2lkdGg6IHRydWUsXHJcbiAgICB9KTtcclxuICAgICQoXCIuanMtcmVsYXRlZC1wcm9kdWN0cy1zbGlkZXJcIikuc2xpY2soe1xyXG4gICAgICAgIHNsaWRlc1RvU2hvdzogMyxcclxuICAgICAgICBzbGlkZXNUb1Njcm9sbDogMSxcclxuICAgICAgICBwcmV2QXJyb3c6IFwiLmpzLXJlbGF0ZWQtcHJldlwiLFxyXG4gICAgICAgIG5leHRBcnJvdzogXCIuanMtcmVsYXRlZC1uZXh0XCIsXHJcbiAgICAgICAgcmVzcG9uc2l2ZTogW1xyXG4gICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgICBicmVha3BvaW50OiA3NjgsXHJcbiAgICAgICAgICAgICAgICBzZXR0aW5nczoge1xyXG4gICAgICAgICAgICAgICAgICAgIHNsaWRlc1RvU2hvdzogMixcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgfSxcclxuICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgYnJlYWtwb2ludDogNTc2LFxyXG4gICAgICAgICAgICAgICAgc2V0dGluZ3M6IHtcclxuICAgICAgICAgICAgICAgICAgICBzbGlkZXNUb1Nob3c6IDEsXHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIH0sXHJcbiAgICAgICAgXVxyXG4gICAgfSk7XHJcbiAgICAkKFwiLmpzLXJlc2VudGx5LXZpZXdlZC1zbGlkZXJcIikuc2xpY2soe1xyXG4gICAgICAgIHNsaWRlc1RvU2hvdzogNCxcclxuICAgICAgICBzbGlkZXNUb1Njcm9sbDogMSxcclxuICAgICAgICBwcmV2QXJyb3c6IFwiLmpzLXJlc2VudGx5LXZpZXdlZC1wcmV2XCIsXHJcbiAgICAgICAgbmV4dEFycm93OiBcIi5qcy1yZXNlbnRseS12aWV3ZWQtbmV4dFwiLFxyXG4gICAgICAgIHJlc3BvbnNpdmU6IFtcclxuICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgYnJlYWtwb2ludDogOTkyLFxyXG4gICAgICAgICAgICAgICAgc2V0dGluZ3M6IHtcclxuICAgICAgICAgICAgICAgICAgICBzbGlkZXNUb1Nob3c6IDMsXHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIH0sXHJcbiAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICAgIGJyZWFrcG9pbnQ6IDc2OCxcclxuICAgICAgICAgICAgICAgIHNldHRpbmdzOiB7XHJcbiAgICAgICAgICAgICAgICAgICAgc2xpZGVzVG9TaG93OiAyLFxyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB9LFxyXG4gICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgICBicmVha3BvaW50OiA1NzYsXHJcbiAgICAgICAgICAgICAgICBzZXR0aW5nczoge1xyXG4gICAgICAgICAgICAgICAgICAgIHNsaWRlc1RvU2hvdzogMSxcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgfSxcclxuICAgICAgICBdXHJcbiAgICB9KTtcclxuICAgICQoJ2JvZHknKS5vbigna2V5dXAnLCAnLmpzLXNlYXJjaC1tYXRjaGVzJywgZnVuY3Rpb24gKCkge1xyXG4gICAgICAgIGxldCBzZWxmID0gJCh0aGlzKTtcclxuICAgICAgICBsZXQgbGlzdCA9ICQoJy4nICsgc2VsZi5kYXRhKCdsaXN0JykpO1xyXG4gICAgICAgICQuYWpheCh7XHJcbiAgICAgICAgICAgIHVybDogc2VsZi5kYXRhKCd1cmwnKSArICc/cT0nICsgc2VsZi52YWwoKSxcclxuICAgICAgICAgICAgdHlwZTogJ0dFVCcsXHJcbiAgICAgICAgICAgIGRhdGFUeXBlOiAnanNvbicsXHJcbiAgICAgICAgICAgIHN1Y2Nlc3M6IGZ1bmN0aW9uIChyZXNwb25zZSkge1xyXG4gICAgICAgICAgICAgICAgbGlzdC5lbXB0eSgpO1xyXG5cclxuICAgICAgICAgICAgICAgIGlmIChyZXNwb25zZS5pdGVtcy5sZW5ndGgpIHtcclxuICAgICAgICAgICAgICAgICAgICAkLmVhY2gocmVzcG9uc2UuaXRlbXMsIGZ1bmN0aW9uIChpLCBpdGVtKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGxpc3QuYXBwZW5kKGA8YSBjbGFzcz1cInNlYXJjaC1mb3JtLW1hdGNoZXNfX2xpbmtcIiBocmVmPVwiJHtpdGVtLnVybH1cIj4ke2l0ZW0udGl0bGV9PC9hPmApO1xyXG4gICAgICAgICAgICAgICAgICAgIH0pO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfSk7XHJcbiAgICB9KTtcclxufSkoKTsiXSwiZmlsZSI6Im1haW4uanMifQ==
