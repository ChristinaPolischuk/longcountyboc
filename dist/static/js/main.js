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
  showItems(3, 2, ".seo-block", ".js-see-more-seo");

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
//# sourceMappingURL=data:application/json;charset=utf8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIm1haW4uanMiXSwibmFtZXMiOlsiY3JvcFRleHQiLCJoaWRlQmxvY2siLCJyZWFkTW9yZSIsImRvY3VtZW50IiwicXVlcnlTZWxlY3RvckFsbCIsImZvckVhY2giLCJlbCIsImFkZEV2ZW50TGlzdGVuZXIiLCJlbFRleHQiLCJpbm5lclRleHQiLCJoaWRkZW5UZXh0IiwicHJldmlvdXNFbGVtZW50U2libGluZyIsImNsYXNzTGlzdCIsInRvZ2dsZSIsIm1heCIsInRleHQiLCJzdHIiLCJ0cmltIiwibGVuZ3RoIiwic3ViU3RyIiwic3Vic3RyaW5nIiwiaGlkZGVuU3RyIiwiaW5uZXJIVE1MIiwic2hvd1JldmlldyIsImltYWdlcyIsIm5leHRFbGVtZW50U2libGluZyIsInByb2R1Y3RSZXZpZXciLCJwcm9kdWN0VGV4dCIsInF1ZXJ5U2VsZWN0b3IiLCJjcmVhdGVFbGVtZW50IiwiYWRkIiwidGV4dENvbnRlbnQiLCJhZnRlciIsImJlZm9yZSIsImFjY29yZGlvbiIsImUiLCJ0YXJnZXQiLCJjb250YWlucyIsImNsb3Nlc3QiLCJhY2NvcmRpb25Db250ZW50Iiwic3R5bGUiLCJtYXhIZWlnaHQiLCJnZXRDb21wdXRlZFN0eWxlIiwicGFyZW50RWxlbWVudCIsInJlbW92ZSIsInNjcm9sbEhlaWdodCIsInNpZGViYXJMaW5rcyIsImVsZW0iLCJuYXZiYXJMaW5rQ2xpY2siLCJldmVudCIsInNtb290aFNjcm9sbCIsInByZXZlbnREZWZhdWx0IiwidGFyZ2V0SWQiLCJjdXJyZW50VGFyZ2V0IiwiZ2V0QXR0cmlidXRlIiwid2luZG93Iiwic2NyZWVuIiwid2lkdGgiLCJzY3JvbGxUbyIsInRvcCIsIm9mZnNldFRvcCIsImJlaGF2aW9yIiwidG9nZ2xlRml4ZWQiLCJ0aHJvdHRsZSIsInRyYWNrU2Nyb2xsIiwiZWxlbWVudHMiLCJzdGlja3lCbG9ja3MiLCJwYWdlWU9mZnNldCIsInN0aWNreUJsb2NrQ29vcmRzIiwiZ2V0Qm91bmRpbmdDbGllbnRSZWN0IiwiYm90dG9tIiwidHlwZSIsIm5hbWUiLCJvYmoiLCJydW5uaW5nIiwiZnVuYyIsInJlcXVlc3RBbmltYXRpb25GcmFtZSIsImRpc3BhdGNoRXZlbnQiLCJDdXN0b21FdmVudCIsImVsZW1lbnQiLCJmaXhlZFdpZHRoIiwiY2xpZW50V2lkdGgiLCJzaG93SGlkZVNpZGViYXJGaWx0ZXJzIiwic2hvd0hpZGVGaWx0ZXJzIiwic2lkZWJhckZpbHRlcnMiLCJmaWx0ZXIiLCJ0cmlnZ2VyIiwibW9iaWxlTmF2IiwiaXNDbG9zZWQiLCJidXJnZXJUaW1lIiwic2VhcmNoQnRuIiwidmFsdWUiLCJwcm9kdWN0UmV2aWV3U3RhcnMiLCJkYXRhUmF0aW5nIiwic3RhcnMiLCJjaGlsZHJlbiIsImkiLCJjaG9vc2VSYXRpbmciLCJyYXRpbmciLCJyYXRpbmdTdGFycyIsInJlbW92ZUNsYXNzIiwibW91c2VPdmVyQWN0aXZlQ2xhc3MiLCJhZGRDbGFzcyIsIm1vdXNlT3V0QWN0aXZlQ2xhc3MiLCJhcnIiLCJpTGVuZyIsImoiLCJhcmd1bWVudHMiLCJpTGVuIiwiY2FyZXREcm9wZG93biIsImZpcnN0RWxlbWVudENoaWxkIiwiZHJvcGRvd24iLCJvcGFjaXR5IiwiYmFzaWNTY3JvbGxUb3AiLCJidG5Ub3AiLCJidG5SZXZlYWwiLCJzY3JvbGxZIiwiVG9wc2Nyb2xsVG8iLCJzZXRUaW1lb3V0Iiwib3Blbk1vZGFsIiwibW9kYWxCdG4iLCJtb2RhbENvbnRhaW5lciIsImJvZHkiLCJrZXlDb2RlIiwic2VlTW9yZSIsIm51bWJlciIsImJ1dHRvbiIsInNob3dIaWRlQmxvY2tzIiwiaW5kZXgiLCJkaXNwbGF5IiwiZWxlbXMiLCJidG5TaG93SGlkZSIsInNob3dJdGVtcyIsIm51bWJlckRlc2t0b3AiLCJudW1iZXJNb2JpbGUiLCJpdGVtcyIsImJ0biIsInNob3dIaWRlSXRlbXMiLCJlbHMiLCJzaG93Rm9vdGVyTGlua3MiLCJmb290ZXJUaXRsZSIsImZvb3RlckxpbmtzIiwiZm9vdGVyTGluayIsInRpdGxlIiwic2V0UGVyY2VudCIsImNpcmN1bGFyUHJvZ3Jlc3MiLCJpdGVtIiwiY2lyY2xlIiwiZGF0YVBlcmNlbnQiLCJwZXJjZW50Iiwic3Ryb2tlRGFzaG9mZnNldCIsInByaWNlU2xpZGVyIiwicmFuZ2VJbnB1dHMiLCJwcmljZUlucHV0cyIsInByb2dyZXNzIiwicHJpY2VHYXAiLCJwcmljZUlucHV0IiwibWluVmFsIiwicGFyc2VJbnQiLCJtYXhWYWwiLCJsZWZ0IiwicmlnaHQiLCJyYW5nZUlucHV0IiwiYWRkU3BhY2VzIiwicmVwbGFjZSIsInZpZXdBbGwiLCJmaWx0ZXJMaXN0IiwibGlzdCIsImxlbiIsImZpbHRlckl0ZW1zIiwiZmlsdGVyQ29udGVudCIsIiQiLCJzbGljayIsInNsaWRlc1RvU2hvdyIsInZlcnRpY2FsIiwidmVydGljYWxTd2lwaW5nIiwic2xpZGVzVG9TY3JvbGwiLCJmb2N1c09uU2VsZWN0IiwicHJldkFycm93IiwibmV4dEFycm93IiwidmFyaWFibGVXaWR0aCIsImFzTmF2Rm9yIiwiYXJyb3dzIiwiZmFkZSIsInJlc3BvbnNpdmUiLCJicmVha3BvaW50Iiwic2V0dGluZ3MiLCJvbiIsInNlbGYiLCJkYXRhIiwiYWpheCIsInVybCIsInZhbCIsImRhdGFUeXBlIiwic3VjY2VzcyIsInJlc3BvbnNlIiwiZW1wdHkiLCJlYWNoIiwiYXBwZW5kIl0sIm1hcHBpbmdzIjoiOztBQUFBOztBQUNBLENBQUMsWUFBWTtBQUNUQSxFQUFBQSxRQUFRO0FBQ1JDLEVBQUFBLFNBQVM7QUFFVCxNQUFJQyxRQUFRLEdBQUdDLFFBQVEsQ0FBQ0MsZ0JBQVQsQ0FBMEIsZUFBMUIsQ0FBZjtBQUVBRixFQUFBQSxRQUFRLENBQUNHLE9BQVQsQ0FBaUIsVUFBQUMsRUFBRSxFQUFJO0FBQ25CQSxJQUFBQSxFQUFFLENBQUNDLGdCQUFILENBQW9CLE9BQXBCLEVBQTZCLFlBQU07QUFDL0IsVUFBSUMsTUFBTSxHQUFHRixFQUFFLENBQUNHLFNBQWhCO0FBQ0EsVUFBSUMsVUFBVSxHQUFHSixFQUFFLENBQUNLLHNCQUFw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QSxZQUFJRCxRQUFRLENBQUM1RCxLQUFULENBQWVySCxNQUFuQixFQUEyQjtBQUN2QnlKLFVBQUFBLENBQUMsQ0FBQzBCLElBQUYsQ0FBT0YsUUFBUSxDQUFDNUQsS0FBaEIsRUFBdUIsVUFBVXZDLENBQVYsRUFBYWtELElBQWIsRUFBbUI7QUFDdENxQixZQUFBQSxJQUFJLENBQUMrQixNQUFMLHlEQUEwRHBELElBQUksQ0FBQzZDLEdBQS9ELGdCQUF1RTdDLElBQUksQ0FBQ0gsS0FBNUU7QUFDSCxXQUZEO0FBR0g7QUFDSjtBQVpFLEtBQVA7QUFjSCxHQWpCRDtBQWtCSCxDQWh0QkQiLCJzb3VyY2VzQ29udGVudCI6WyI7XHJcbihmdW5jdGlvbiAoKSB7XHJcbiAgICBjcm9wVGV4dCgpO1xyXG4gICAgaGlkZUJsb2NrKCk7XHJcblxyXG4gICAgbGV0IHJlYWRNb3JlID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvckFsbCgnLmpzLXJlYWQtbW9yZScpO1xyXG5cclxuICAgIHJlYWRNb3JlLmZvckVhY2goZWwgPT4ge1xyXG4gICAgICAgIGVsLmFkZEV2ZW50TGlzdGVuZXIoJ2NsaWNrJywgKCkgPT4ge1xyXG4gICAgICAgICAgICBsZXQgZWxUZXh0ID0gZWwuaW5uZXJUZXh0O1xyXG4gICAgICAgICAgICBsZXQgaGlkZGVuVGV4dCA9IGVsLnByZXZpb3VzRWxlbWVudFNpYmxpbmc7XHJcblxyXG4gICAgICAgICAgICBlbC5pbm5lclRleHQgPSBlbFRleHQgPT0gJ3JlYWQgbW9yZSA+JyA/ICdoaWRlJyA6ICdyZWFkIG1vcmUgPic7XHJcbiAgICAgICAgICAgIGhpZGRlblRleHQuY2xhc3NMaXN0LnRvZ2dsZSgnc2hvdycpO1xyXG4gICAgICAgIH0pO1xyXG4gICAgfSk7XHJcblxyXG4gICAgZnVuY3Rpb24gY3JvcFRleHQoKSB7XHJcbiAgICAgICAgbGV0IG1heCA9IDIwMDtcclxuICAgICAgICBsZXQgdGV4dCA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3JBbGwoJy5qcy1yZWFkLW1vcmUtdGV4dCcpO1xyXG4gICAgICAgIHRleHQuZm9yRWFjaChlbCA9PiB7XHJcbiAgICAgICAgICAgIGxldCBzdHIgPSBlbC5pbm5lclRleHQudHJpbSgpO1xyXG4gICAgICAgICAgICBpZiAoc3RyLmxlbmd0aCA+IG1heCkge1xyXG4gICAgICAgICAgICAgICAgbGV0IHN1YlN0ciA9IHN0ci5zdWJzdHJpbmcoMCwgbWF4KTtcclxuICAgICAgICAgICAgICAgIGxldCBoaWRkZW5TdHIgPSBzdHIuc3Vic3RyaW5nKG1heCwgc3RyLmxlbmd0aCk7XHJcbiAgICAgICAgICAgICAgICBlbC5pbm5lclRleHQgPSBzdWJTdHI7XHJcbiAgICAgICAgICAgICAgICBlbC5pbm5lckhUTUwgKz0gYDxzcGFuIGNsYXNzPVwiaGlkZGVuLXRleHQganMtaGlkZGVuLXRleHRcIj4ke2hpZGRlblN0cn08L3NwYW4+YDtcclxuICAgICAgICAgICAgICAgIGVsLmlubmVySFRNTCArPSAnPHNwYW4gY2xhc3M9XCJyZWFkLW1vcmUganMtcmVhZC1tb3JlXCI+cmVhZCBtb3JlID48L3NwYW4+JztcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH0pO1xyXG4gICAgfVxyXG5cclxuICAgIGxldCBzaG93UmV2aWV3ID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvckFsbCgnLmpzLXNob3ctcmV2aWV3Jyk7XHJcblxyXG4gICAgc2hvd1Jldmlldy5mb3JFYWNoKGVsID0+IHtcclxuICAgICAgICBlbC5hZGRFdmVudExpc3RlbmVyKCdjbGljaycsICgpID0+IHtcclxuICAgICAgICAgICAgbGV0IGVsVGV4dCA9IGVsLmlubmVyVGV4dDtcclxuICAgICAgICAgICAgbGV0IGhpZGRlblRleHQgPSBlbC5wcmV2aW91c0VsZW1lbnRTaWJsaW5nO1xyXG4gICAgICAgICAgICBsZXQgaW1hZ2VzID0gZWwubmV4dEVsZW1lbnRTaWJsaW5nO1xyXG5cclxuICAgICAgICAgICAgZWwuaW5uZXJUZXh0ID0gZWxUZXh0ID09ICdyZWFkIG1vcmUgPicgPyAnPCBoaWRlJyA6ICdyZWFkIG1vcmUgPic7XHJcbiAgICAgICAgICAgIGhpZGRlblRleHQuY2xhc3NMaXN0LnRvZ2dsZSgnc2hvdycpO1xyXG4gICAgICAgICAgICBpbWFnZXMuY2xhc3NMaXN0LnRvZ2dsZShcInNob3dcIik7XHJcbiAgICAgICAgfSk7XHJcbiAgICB9KTtcclxuXHJcbiAgICBmdW5jdGlvbiBoaWRlQmxvY2soKSB7XHJcbiAgICAgICAgbGV0IG1heCA9IDEyODtcclxuICAgICAgICBsZXQgcHJvZHVjdFJldmlldyA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3JBbGwoJy5qcy1oaWRlLXJldmlldycpO1xyXG4gICAgICAgIHByb2R1Y3RSZXZpZXcuZm9yRWFjaChlbCA9PiB7XHJcbiAgICAgICAgICAgIGxldCBwcm9kdWN0VGV4dCA9IGVsLnF1ZXJ5U2VsZWN0b3IoXCIucGFnZS10ZXh0XCIpO1xyXG4gICAgICAgICAgICBsZXQgc3RyID0gcHJvZHVjdFRleHQuaW5uZXJUZXh0LnRyaW0oKTtcclxuICAgICAgICAgICAgbGV0IGltYWdlcyA9IGVsLnF1ZXJ5U2VsZWN0b3IoJy5wcm9kdWN0LXJldmlld19faW1hZ2VzJyk7XHJcbiAgICAgICAgICAgIGlmIChzdHIubGVuZ3RoID4gbWF4KSB7XHJcbiAgICAgICAgICAgICAgICBsZXQgc3ViU3RyID0gc3RyLnN1YnN0cmluZygwLCBtYXgpO1xyXG4gICAgICAgICAgICAgICAgbGV0IGhpZGRlblN0ciA9IHN0ci5zdWJzdHJpbmcobWF4LCBzdHIubGVuZ3RoKTtcclxuICAgICAgICAgICAgICAgIHByb2R1Y3RUZXh0LmlubmVyVGV4dCA9IHN1YlN0cjtcclxuXHJcbiAgICAgICAgICAgICAgICBsZXQgaGlkZGVuVGV4dCA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ3NwYW4nKTtcclxuICAgICAgICAgICAgICAgIGhpZGRlblRleHQuY2xhc3NMaXN0LmFkZCgnaGlkZGVuLXRleHQnLCAncGFnZS10ZXh0JywgJ2pzLWhpZGRlbi10ZXh0Jyk7XHJcbiAgICAgICAgICAgICAgICBoaWRkZW5UZXh0LnRleHRDb250ZW50ID0gaGlkZGVuU3RyO1xyXG5cclxuICAgICAgICAgICAgICAgIHByb2R1Y3RUZXh0LmFmdGVyKGhpZGRlblRleHQpO1xyXG5cclxuICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgbGV0IHJlYWRNb3JlID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnc3BhbicpO1xyXG4gICAgICAgICAgICByZWFkTW9yZS5jbGFzc0xpc3QuYWRkKCdyZWFkLW1vcmUnLCAnanMtc2hvdy1yZXZpZXcnKTtcclxuICAgICAgICAgICAgcmVhZE1vcmUudGV4dENvbnRlbnQgPSAncmVhZCBtb3JlID4nO1xyXG5cclxuICAgICAgICAgICAgaW1hZ2VzLmJlZm9yZShyZWFkTW9yZSk7XHJcbiAgICAgICAgfSk7XHJcbiAgICB9XHJcblxyXG4gICAgY29uc3QgYWNjb3JkaW9uID0gKCkgPT4ge1xyXG4gICAgICAgIGRvY3VtZW50LmFkZEV2ZW50TGlzdGVuZXIoJ2NsaWNrJywgZSA9PiB7XHJcbiAgICAgICAgICAgIGlmIChlLnRhcmdldC5jbGFzc0xpc3QuY29udGFpbnMoJ2pzLWFjY29yZGlvbicpIHx8IGUudGFyZ2V0LmNsb3Nlc3QoJy5qcy1hY2NvcmRpb24nKSkge1xyXG4gICAgICAgICAgICAgICAgY29uc3QgYWNjb3JkaW9uID0gZS50YXJnZXQuY2xhc3NMaXN0LmNvbnRhaW5zKCdqcy1hY2NvcmRpb24nKSA/IGUudGFyZ2V0IDogZS50YXJnZXQuY2xvc2VzdCgnLmpzLWFjY29yZGlvbicpO1xyXG4gICAgICAgICAgICAgICAgY29uc3QgYWNjb3JkaW9uQ29udGVudCA9IGFjY29yZGlvbi5uZXh0RWxlbWVudFNpYmxpbmc7XHJcbiAgICAgICAgICAgICAgICBpZiAoYWNjb3JkaW9uQ29udGVudC5zdHlsZS5tYXhIZWlnaHQgfHwgZ2V0Q29tcHV0ZWRTdHlsZShhY2NvcmRpb25Db250ZW50KS5tYXhIZWlnaHQgPT0gXCJtYXgtY29udGVudFwiKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgYWNjb3JkaW9uLnBhcmVudEVsZW1lbnQuY2xhc3NMaXN0LnJlbW92ZShcImFjdGl2ZVwiKTtcclxuICAgICAgICAgICAgICAgICAgICBhY2NvcmRpb25Db250ZW50LnN0eWxlLm1heEhlaWdodCA9IG51bGw7XHJcbiAgICAgICAgICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICAgICAgICAgIGFjY29yZGlvbi5wYXJlbnRFbGVtZW50LmNsYXNzTGlzdC5hZGQoXCJhY3RpdmVcIik7XHJcbiAgICAgICAgICAgICAgICAgICAgYWNjb3JkaW9uQ29udGVudC5zdHlsZS5tYXhIZWlnaHQgPSBhY2NvcmRpb25Db250ZW50LnNjcm9sbEhlaWdodCArIFwicHhcIjtcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH0pO1xyXG4gICAgfVxyXG4gICAgYWNjb3JkaW9uKCk7XHJcblxyXG4gICAgY29uc3Qgc2lkZWJhckxpbmtzID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvckFsbChcIi5zaWRlYmFyLW1lbnVfX2xpbmtcIik7XHJcblxyXG4gICAgc2lkZWJhckxpbmtzLmZvckVhY2goZWxlbSA9PiBlbGVtLmFkZEV2ZW50TGlzdGVuZXIoXCJjbGlja1wiLCBuYXZiYXJMaW5rQ2xpY2spKTtcclxuXHJcbiAgICBmdW5jdGlvbiBuYXZiYXJMaW5rQ2xpY2soZXZlbnQpIHtcclxuICAgICAgICBzbW9vdGhTY3JvbGwoZXZlbnQpO1xyXG4gICAgfVxyXG5cclxuICAgIGZ1bmN0aW9uIHNtb290aFNjcm9sbChldmVudCkge1xyXG4gICAgICAgIGV2ZW50LnByZXZlbnREZWZhdWx0KCk7XHJcbiAgICAgICAgY29uc3QgdGFyZ2V0SWQgPSBldmVudC5jdXJyZW50VGFyZ2V0LmdldEF0dHJpYnV0ZShcImhyZWZcIik7XHJcbiAgICAgICAgaWYgKHdpbmRvdy5zY3JlZW4ud2lkdGggPiAxMDI0KSB7XHJcbiAgICAgICAgICAgIHdpbmRvdy5zY3JvbGxUbyh7XHJcbiAgICAgICAgICAgICAgICB0b3A6IHRhcmdldElkID09PSBcIiNcIiA/IDAgOiBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKHRhcmdldElkKS5vZmZzZXRUb3AgLSAxMDAsXHJcbiAgICAgICAgICAgICAgICBiZWhhdmlvcjogXCJzbW9vdGhcIlxyXG4gICAgICAgICAgICB9KTtcclxuICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICB3aW5kb3cuc2Nyb2xsVG8oe1xyXG4gICAgICAgICAgICAgICAgdG9wOiB0YXJnZXRJZCA9PT0gXCIjXCIgPyAwIDogZG9jdW1lbnQucXVlcnlTZWxlY3Rvcih0YXJnZXRJZCkub2Zmc2V0VG9wIC0gMjAwLFxyXG4gICAgICAgICAgICAgICAgYmVoYXZpb3I6IFwic21vb3RoXCJcclxuICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG5cclxuICAgIGlmIChkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcucHJvZHVjdHMtc3RpY2t5JykgIT09IG51bGwpIHtcclxuXHJcbiAgICAgICAgd2luZG93LmFkZEV2ZW50TGlzdGVuZXIoJ29wdGltaXplZFJlc2l6ZScsICgpID0+IHtcclxuICAgICAgICAgICAgdG9nZ2xlRml4ZWQoJy5wcm9kdWN0cy1zdGlja3knKTtcclxuICAgICAgICB9KTtcclxuXHJcblxyXG4gICAgICAgIHRvZ2dsZUZpeGVkKCcucHJvZHVjdHMtc3RpY2t5Jyk7XHJcblxyXG4gICAgICAgIHRocm90dGxlKFwicmVzaXplXCIsIFwib3B0aW1pemVkUmVzaXplXCIpO1xyXG5cclxuICAgIH1cclxuXHJcbiAgICBpZiAoZG9jdW1lbnQucXVlcnlTZWxlY3RvcignLnN0aWNreS1ibG9jaycpICE9PSBudWxsKSB7XHJcbiAgICAgICAgbGV0IHN0aWNreUJsb2NrQ29vcmRzID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignLnN0aWNreS1ibG9jaycpLmdldEJvdW5kaW5nQ2xpZW50UmVjdCgpLmJvdHRvbSArIHdpbmRvdy5wYWdlWU9mZnNldDtcclxuXHJcbiAgICAgICAgd2luZG93LmFkZEV2ZW50TGlzdGVuZXIoXCJzY3JvbGxcIiwgZnVuY3Rpb24gKCkge1xyXG4gICAgICAgICAgICB0cmFja1Njcm9sbCgnLnN0aWNreS1ibG9jaycpO1xyXG4gICAgICAgIH0pO1xyXG5cclxuICAgICAgICBmdW5jdGlvbiB0cmFja1Njcm9sbChlbGVtZW50cykge1xyXG4gICAgICAgICAgICBsZXQgc3RpY2t5QmxvY2tzID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvckFsbChlbGVtZW50cyk7XHJcbiAgICAgICAgICAgIHN0aWNreUJsb2Nrcy5mb3JFYWNoKGVsID0+IHtcclxuICAgICAgICAgICAgICAgIGlmIChlbC5jbGFzc0xpc3QuY29udGFpbnMoJ3Nob3cnKSAmJiB3aW5kb3cucGFnZVlPZmZzZXQgPCBzdGlja3lCbG9ja0Nvb3Jkcykge1xyXG4gICAgICAgICAgICAgICAgICAgIGVsLmNsYXNzTGlzdC5yZW1vdmUoJ3Nob3cnKTtcclxuICAgICAgICAgICAgICAgIH0gZWxzZSBpZiAod2luZG93LnBhZ2VZT2Zmc2V0ID4gc3RpY2t5QmxvY2tDb29yZHMpIHtcclxuICAgICAgICAgICAgICAgICAgICBlbC5jbGFzc0xpc3QuYWRkKCdzaG93Jyk7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIH0pO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxuXHJcbiAgICBmdW5jdGlvbiB0aHJvdHRsZSh0eXBlLCBuYW1lLCBvYmopIHtcclxuICAgICAgICBvYmogPSBvYmogfHwgd2luZG93O1xyXG4gICAgICAgIHZhciBydW5uaW5nID0gZmFsc2U7XHJcbiAgICAgICAgdmFyIGZ1bmMgPSBmdW5jdGlvbiAoKSB7XHJcbiAgICAgICAgICAgIGlmIChydW5uaW5nKSB7XHJcbiAgICAgICAgICAgICAgICByZXR1cm47XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgcnVubmluZyA9IHRydWU7XHJcbiAgICAgICAgICAgIHJlcXVlc3RBbmltYXRpb25GcmFtZShmdW5jdGlvbiAoKSB7XHJcbiAgICAgICAgICAgICAgICBvYmouZGlzcGF0Y2hFdmVudChuZXcgQ3VzdG9tRXZlbnQobmFtZSkpO1xyXG4gICAgICAgICAgICAgICAgcnVubmluZyA9IGZhbHNlO1xyXG4gICAgICAgICAgICB9KTtcclxuICAgICAgICB9O1xyXG4gICAgICAgIG9iai5hZGRFdmVudExpc3RlbmVyKHR5cGUsIGZ1bmMpO1xyXG4gICAgfTtcclxuXHJcbiAgICBmdW5jdGlvbiB0b2dnbGVGaXhlZChlbCkge1xyXG4gICAgICAgIGxldCBlbGVtZW50ID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcihlbCk7XHJcbiAgICAgICAgbGV0IGZpeGVkV2lkdGggPSB3aW5kb3cuc2NyZWVuLndpZHRoID4gMTAyNCA/IGVsZW1lbnQucGFyZW50RWxlbWVudC5jbGllbnRXaWR0aCAtIDI4NSA6IGVsZW1lbnQucGFyZW50RWxlbWVudC5jbGllbnRXaWR0aDtcclxuICAgICAgICBlbGVtZW50LnN0eWxlLndpZHRoID0gZml4ZWRXaWR0aCArICdweCc7XHJcblxyXG4gICAgfVxyXG5cclxuICAgIGNvbnN0IHNob3dIaWRlU2lkZWJhckZpbHRlcnMgPSAoKSA9PiB7XHJcbiAgICAgICAgaWYgKGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3JBbGwoXCIuZmlsdGVyXCIpLmxlbmd0aCA9PSAwKSByZXR1cm4gZmFsc2U7XHJcblxyXG4gICAgICAgIHdpbmRvdy5hZGRFdmVudExpc3RlbmVyKFwibG9hZFwiLCBzaG93SGlkZUZpbHRlcnMpO1xyXG4gICAgICAgIHdpbmRvdy5hZGRFdmVudExpc3RlbmVyKFwicmVzaXplXCIsIHNob3dIaWRlRmlsdGVycyk7XHJcblxyXG4gICAgICAgIGZ1bmN0aW9uIHNob3dIaWRlRmlsdGVycygpIHtcclxuICAgICAgICAgICAgY29uc3Qgc2lkZWJhckZpbHRlcnMgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yQWxsKFwiLmZpbHRlclwiKTtcclxuXHJcbiAgICAgICAgICAgIGlmICh3aW5kb3cuc2NyZWVuLndpZHRoIDw9IDEwMjQpIHtcclxuICAgICAgICAgICAgICAgIHNpZGViYXJGaWx0ZXJzLmZvckVhY2goZmlsdGVyID0+IHtcclxuICAgICAgICAgICAgICAgICAgICBmaWx0ZXIuY2xhc3NMaXN0LnJlbW92ZShcImFjdGl2ZVwiKTtcclxuICAgICAgICAgICAgICAgIH0pO1xyXG4gICAgICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICAgICAgc2lkZWJhckZpbHRlcnMuZm9yRWFjaChmaWx0ZXIgPT4ge1xyXG4gICAgICAgICAgICAgICAgICAgIGZpbHRlci5jbGFzc0xpc3QuYWRkKFwiYWN0aXZlXCIpO1xyXG4gICAgICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcbiAgICB9XHJcblxyXG4gICAgc2hvd0hpZGVTaWRlYmFyRmlsdGVycygpO1xyXG5cclxuICAgIC8vIGhhbWJ1cmdlciBvcGVuL2Nsb3NlIGFuaW1hdGlvblxyXG4gICAgY29uc3QgdHJpZ2dlciA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoXCIjaGFtYnVyZ2VyXCIpO1xyXG4gICAgY29uc3QgbW9iaWxlTmF2ID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcihcIiNtb2JpbGUtbmF2XCIpO1xyXG4gICAgbGV0IGlzQ2xvc2VkID0gdHJ1ZTtcclxuXHJcbiAgICB0cmlnZ2VyLmFkZEV2ZW50TGlzdGVuZXIoXCJjbGlja1wiLCBidXJnZXJUaW1lKTtcclxuXHJcbiAgICBmdW5jdGlvbiBidXJnZXJUaW1lKCkge1xyXG4gICAgICAgIGlmIChpc0Nsb3NlZCA9PSB0cnVlKSB7XHJcbiAgICAgICAgICAgIHRyaWdnZXIuY2xhc3NMaXN0LnJlbW92ZShcImlzLW9wZW5cIik7XHJcbiAgICAgICAgICAgIHRyaWdnZXIuY2xhc3NMaXN0LmFkZChcImlzLWNsb3NlZFwiKTtcclxuICAgICAgICAgICAgbW9iaWxlTmF2LmNsYXNzTGlzdC5hZGQoJ2lzLW9wZW4nKTtcclxuICAgICAgICAgICAgaXNDbG9zZWQgPSBmYWxzZTtcclxuICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICB0cmlnZ2VyLmNsYXNzTGlzdC5yZW1vdmUoXCJpcy1jbG9zZWRcIik7XHJcbiAgICAgICAgICAgIHRyaWdnZXIuY2xhc3NMaXN0LmFkZChcImlzLW9wZW5cIik7XHJcbiAgICAgICAgICAgIG1vYmlsZU5hdi5jbGFzc0xpc3QucmVtb3ZlKCdpcy1vcGVuJyk7XHJcbiAgICAgICAgICAgIGlzQ2xvc2VkID0gdHJ1ZTtcclxuICAgICAgICB9XHJcbiAgICB9XHJcblxyXG4gICAgLy8gc2VhcmNoIGZvcm0gb3Blbi9jbG9zZSBhbmltYXRpb25cclxuICAgIGNvbnN0IHNlYXJjaEJ0biA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoXCIuc2VhcmNoLWZvcm1fX2J0blwiKTtcclxuICAgIHNlYXJjaEJ0bi5hZGRFdmVudExpc3RlbmVyKFwiY2xpY2tcIiwgZnVuY3Rpb24gKCkge1xyXG4gICAgICAgIHRoaXMuY2xhc3NMaXN0LnRvZ2dsZShcImNsb3NlXCIpO1xyXG4gICAgICAgIHRoaXMucGFyZW50RWxlbWVudC5jbGFzc0xpc3QudG9nZ2xlKFwiaW5jbGlja2VkXCIpO1xyXG4gICAgICAgIHRoaXMucHJldmlvdXNFbGVtZW50U2libGluZy52YWx1ZSA9IFwiXCI7XHJcbiAgICB9KTtcclxuXHJcbiAgICBjb25zdCBwcm9kdWN0UmV2aWV3U3RhcnMgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yQWxsKFwiLmpzLXByb2R1Y3QtcmV2aWV3LXJhdGluZ1wiKTtcclxuICAgIHByb2R1Y3RSZXZpZXdTdGFycy5mb3JFYWNoKGZ1bmN0aW9uIChlbCkge1xyXG4gICAgICAgIGNvbnN0IGRhdGFSYXRpbmcgPSBlbC5nZXRBdHRyaWJ1dGUoXCJkYXRhLXJhdGluZ1wiKTtcclxuICAgICAgICBjb25zdCBzdGFycyA9IGVsLmNoaWxkcmVuO1xyXG4gICAgICAgIGZvciAobGV0IGkgPSAwOyBpIDwgZGF0YVJhdGluZzsgaSsrKSB7XHJcbiAgICAgICAgICAgIHN0YXJzW2ldLmNsYXNzTGlzdC5hZGQoXCJhY3RpdmVcIik7XHJcbiAgICAgICAgfVxyXG4gICAgfSk7XHJcblxyXG4gICAgY29uc3QgY2hvb3NlUmF0aW5nID0gKCkgPT4ge1xyXG4gICAgICAgIGlmIChkb2N1bWVudC5xdWVyeVNlbGVjdG9yKFwiLmpzLXJhdGluZ1wiKSA9PSBudWxsKSByZXR1cm4gZmFsc2U7XHJcbiAgICAgICAgY29uc3QgcmF0aW5nID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcihcIi5qcy1yYXRpbmdcIiksXHJcbiAgICAgICAgICAgIHJhdGluZ1N0YXJzID0gcmF0aW5nLmNoaWxkcmVuO1xyXG4gICAgICAgIHJhdGluZy5hZGRFdmVudExpc3RlbmVyKFwiY2xpY2tcIiwgKGUpID0+IHtcclxuICAgICAgICAgICAgaWYgKGUudGFyZ2V0LmNsYXNzTGlzdC5jb250YWlucyhcInJhdGluZ19fc3RhclwiKSB8fCBlLnRhcmdldC5jbG9zZXN0KFwiLnJhdGluZ19fc3RhclwiKSkge1xyXG4gICAgICAgICAgICAgICAgbGV0IHRhcmdldCA9IGUudGFyZ2V0LmNsYXNzTGlzdC5jb250YWlucyhcInJhdGluZ19fc3RhclwiKSA/IGUudGFyZ2V0IDogZS50YXJnZXQuY2xvc2VzdChcIi5yYXRpbmdfX3N0YXJcIik7XHJcbiAgICAgICAgICAgICAgICByZW1vdmVDbGFzcyhyYXRpbmdTdGFycywgXCJjdXJyZW50LWFjdGl2ZVwiKTtcclxuICAgICAgICAgICAgICAgIHRhcmdldC5jbGFzc0xpc3QuYWRkKFwiYWN0aXZlXCIsIFwiY3VycmVudC1hY3RpdmVcIik7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9KTtcclxuICAgICAgICByYXRpbmcuYWRkRXZlbnRMaXN0ZW5lcihcIm1vdXNlb3ZlclwiLCAoZSkgPT4ge1xyXG4gICAgICAgICAgICBpZiAoZS50YXJnZXQuY2xhc3NMaXN0LmNvbnRhaW5zKFwicmF0aW5nX19zdGFyXCIpIHx8IGUudGFyZ2V0LmNsb3Nlc3QoXCIucmF0aW5nX19zdGFyXCIpKSB7XHJcbiAgICAgICAgICAgICAgICBsZXQgdGFyZ2V0ID0gZS50YXJnZXQuY2xhc3NMaXN0LmNvbnRhaW5zKFwicmF0aW5nX19zdGFyXCIpID8gZS50YXJnZXQgOiBlLnRhcmdldC5jbG9zZXN0KFwiLnJhdGluZ19fc3RhclwiKTtcclxuICAgICAgICAgICAgICAgIHJlbW92ZUNsYXNzKHJhdGluZ1N0YXJzLCBcImFjdGl2ZVwiKTtcclxuICAgICAgICAgICAgICAgIHRhcmdldC5jbGFzc0xpc3QuYWRkKFwiYWN0aXZlXCIpO1xyXG4gICAgICAgICAgICAgICAgbW91c2VPdmVyQWN0aXZlQ2xhc3MocmF0aW5nU3RhcnMpO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfSk7XHJcbiAgICAgICAgcmF0aW5nLmFkZEV2ZW50TGlzdGVuZXIoXCJtb3VzZW91dFwiLCAoKSA9PiB7XHJcbiAgICAgICAgICAgIGFkZENsYXNzKHJhdGluZ1N0YXJzLCBcImFjdGl2ZVwiKTtcclxuICAgICAgICAgICAgbW91c2VPdXRBY3RpdmVDbGFzcyhyYXRpbmdTdGFycyk7XHJcbiAgICAgICAgfSk7XHJcblxyXG4gICAgICAgIGZ1bmN0aW9uIGFkZENsYXNzKGFycikge1xyXG4gICAgICAgICAgICBmb3IgKGxldCBpID0gMCwgaUxlbmcgPSBhcnIubGVuZ3RoOyBpIDwgaUxlbmc7IGkrKykge1xyXG4gICAgICAgICAgICAgICAgZm9yIChsZXQgaiA9IDE7IGogPCBhcmd1bWVudHMubGVuZ3RoOyBqKyspIHtcclxuICAgICAgICAgICAgICAgICAgICByYXRpbmdTdGFyc1tpXS5jbGFzc0xpc3QuYWRkKGFyZ3VtZW50c1tqXSk7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIGZ1bmN0aW9uIHJlbW92ZUNsYXNzKGFycikge1xyXG4gICAgICAgICAgICBmb3IgKGxldCBpID0gMCwgaUxlbmcgPSBhcnIubGVuZ3RoOyBpIDwgaUxlbmc7IGkrKykge1xyXG4gICAgICAgICAgICAgICAgZm9yIChsZXQgaiA9IDE7IGogPCBhcmd1bWVudHMubGVuZ3RoOyBqKyspIHtcclxuICAgICAgICAgICAgICAgICAgICByYXRpbmdTdGFyc1tpXS5jbGFzc0xpc3QucmVtb3ZlKGFyZ3VtZW50c1tqXSk7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIGZ1bmN0aW9uIG1vdXNlT3ZlckFjdGl2ZUNsYXNzKGFycikge1xyXG4gICAgICAgICAgICBmb3IgKGxldCBpID0gMCwgaUxlbiA9IGFyci5sZW5ndGg7IGkgPCBpTGVuOyBpKyspIHtcclxuICAgICAgICAgICAgICAgIGlmIChhcnJbaV0uY2xhc3NMaXN0LmNvbnRhaW5zKFwiYWN0aXZlXCIpKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgYnJlYWs7XHJcbiAgICAgICAgICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICAgICAgICAgIGFycltpXS5jbGFzc0xpc3QuYWRkKFwiYWN0aXZlXCIpO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBmdW5jdGlvbiBtb3VzZU91dEFjdGl2ZUNsYXNzKGFycikge1xyXG4gICAgICAgICAgICBmb3IgKGxldCBpID0gYXJyLmxlbmd0aCAtIDE7IGkgPj0gMDsgaS0tKSB7XHJcbiAgICAgICAgICAgICAgICBpZiAoYXJyW2ldLmNsYXNzTGlzdC5jb250YWlucyhcImN1cnJlbnQtYWN0aXZlXCIpKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgYnJlYWs7XHJcbiAgICAgICAgICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICAgICAgICAgIGFycltpXS5jbGFzc0xpc3QucmVtb3ZlKFwiYWN0aXZlXCIpO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG5cclxuICAgIGNob29zZVJhdGluZygpO1xyXG5cclxuICAgIGRvY3VtZW50LmFkZEV2ZW50TGlzdGVuZXIoXCJjbGlja1wiLCBmdW5jdGlvbiAoZSkge1xyXG4gICAgICAgIGlmIChlLnRhcmdldC5jbGFzc0xpc3QuY29udGFpbnMoXCJqcy1vcGVuLWRyb3Bkb3duXCIpICYmIHdpbmRvdy5zY3JlZW4ud2lkdGggPD0gNTc2KSB7XHJcbiAgICAgICAgICAgIGNvbnN0IGNhcmV0RHJvcGRvd24gPSBlLnRhcmdldC5maXJzdEVsZW1lbnRDaGlsZDtcclxuICAgICAgICAgICAgY29uc3QgZHJvcGRvd24gPSBlLnRhcmdldC5uZXh0RWxlbWVudFNpYmxpbmc7XHJcbiAgICAgICAgICAgIGlmIChkcm9wZG93bi5zdHlsZS5tYXhIZWlnaHQpIHtcclxuICAgICAgICAgICAgICAgIGRyb3Bkb3duLnN0eWxlLm1heEhlaWdodCA9IG51bGw7XHJcbiAgICAgICAgICAgICAgICBkcm9wZG93bi5zdHlsZS5vcGFjaXR5ID0gbnVsbDtcclxuICAgICAgICAgICAgICAgIGUudGFyZ2V0LmNsYXNzTGlzdC5yZW1vdmUoXCJkcm9wZG93bi1hY3RpdmVcIik7XHJcbiAgICAgICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgICAgICBkcm9wZG93bi5zdHlsZS5tYXhIZWlnaHQgPSBkcm9wZG93bi5zY3JvbGxIZWlnaHQgKyBcInB4XCI7XHJcbiAgICAgICAgICAgICAgICBkcm9wZG93bi5zdHlsZS5vcGFjaXR5ID0gMTtcclxuICAgICAgICAgICAgICAgIGUudGFyZ2V0LmNsYXNzTGlzdC5hZGQoXCJkcm9wZG93bi1hY3RpdmVcIik7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcbiAgICB9KTtcclxuXHJcbiAgICBjb25zdCBiYXNpY1Njcm9sbFRvcCA9IGZ1bmN0aW9uICgpIHtcclxuICAgICAgICBjb25zdCBidG5Ub3AgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcuanMtYnRuLWdvLXRvcCcpO1xyXG4gICAgICAgIGNvbnN0IGJ0blJldmVhbCA9IGZ1bmN0aW9uICgpIHtcclxuICAgICAgICAgICAgaWYgKHdpbmRvdy5zY3JvbGxZID49IDMwMCkge1xyXG4gICAgICAgICAgICAgICAgYnRuVG9wLmNsYXNzTGlzdC5hZGQoJ2lzLXZpc2libGUnKTtcclxuICAgICAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgICAgIGJ0blRvcC5jbGFzc0xpc3QucmVtb3ZlKCdpcy12aXNpYmxlJyk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcbiAgICAgICAgY29uc3QgVG9wc2Nyb2xsVG8gPSBmdW5jdGlvbiAoKSB7XHJcbiAgICAgICAgICAgIGlmICh3aW5kb3cuc2Nyb2xsWSAhPSAwKSB7XHJcbiAgICAgICAgICAgICAgICBzZXRUaW1lb3V0KGZ1bmN0aW9uICgpIHtcclxuICAgICAgICAgICAgICAgICAgICB3aW5kb3cuc2Nyb2xsVG8oMCwgd2luZG93LnNjcm9sbFkgLSAzMCk7XHJcbiAgICAgICAgICAgICAgICAgICAgVG9wc2Nyb2xsVG8oKTtcclxuICAgICAgICAgICAgICAgIH0sIDEwKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuICAgICAgICB3aW5kb3cuYWRkRXZlbnRMaXN0ZW5lcignc2Nyb2xsJywgYnRuUmV2ZWFsKTtcclxuICAgICAgICBidG5Ub3AuYWRkRXZlbnRMaXN0ZW5lcignY2xpY2snLCBUb3BzY3JvbGxUbyk7XHJcblxyXG4gICAgfTtcclxuICAgIGJhc2ljU2Nyb2xsVG9wKCk7XHJcblxyXG4gICAgY29uc3Qgb3Blbk1vZGFsID0gKCkgPT4ge1xyXG4gICAgICAgIGNvbnN0IG1vZGFsQnRuID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvckFsbChcIi5qcy1tb2RhbFwiKTtcclxuICAgICAgICBjb25zdCBtb2RhbENvbnRhaW5lciA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoXCIubW9kYWwtYmFja2dyb3VuZFwiKTtcclxuXHJcbiAgICAgICAgbW9kYWxCdG4uZm9yRWFjaChlbCA9PiB7XHJcbiAgICAgICAgICAgIGVsLmFkZEV2ZW50TGlzdGVuZXIoXCJjbGlja1wiLCBmdW5jdGlvbiAoKSB7XHJcbiAgICAgICAgICAgICAgICBkb2N1bWVudC5ib2R5LmNsYXNzTGlzdC5hZGQoXCJtb2RhbC1hY3RpdmVcIik7XHJcbiAgICAgICAgICAgICAgICBtb2RhbENvbnRhaW5lci5jbGFzc0xpc3QucmVtb3ZlKFwib3V0XCIpO1xyXG4gICAgICAgICAgICAgICAgbW9kYWxDb250YWluZXIuY2xhc3NMaXN0LmFkZChcIm9wZW5lZFwiKTtcclxuICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgfSk7XHJcblxyXG4gICAgICAgIGRvY3VtZW50LmFkZEV2ZW50TGlzdGVuZXIoXCJjbGlja1wiLCBmdW5jdGlvbiAoZSkge1xyXG4gICAgICAgICAgICBpZiAoXHJcbiAgICAgICAgICAgICAgICBlLnRhcmdldC5jbGFzc0xpc3QuY29udGFpbnMoXCJtb2RhbC1jb250YWluZXJcIikgfHxcclxuICAgICAgICAgICAgICAgIGUudGFyZ2V0LmNsYXNzTGlzdC5jb250YWlucyhcIm1vZGFsLWNsb3NlXCIpXHJcbiAgICAgICAgICAgICkge1xyXG4gICAgICAgICAgICAgICAgZG9jdW1lbnQuYm9keS5jbGFzc0xpc3QucmVtb3ZlKFwibW9kYWwtYWN0aXZlXCIpO1xyXG4gICAgICAgICAgICAgICAgbW9kYWxDb250YWluZXIuY2xhc3NMaXN0LnJlbW92ZShcIm9wZW5lZFwiKTtcclxuICAgICAgICAgICAgICAgIG1vZGFsQ29udGFpbmVyLmNsYXNzTGlzdC5hZGQoXCJvdXRcIik7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9KTtcclxuICAgICAgICBkb2N1bWVudC5hZGRFdmVudExpc3RlbmVyKFwia2V5ZG93blwiLCBmdW5jdGlvbiAoZSkge1xyXG4gICAgICAgICAgICBpZiAoZS5rZXlDb2RlID09IDI3KSB7XHJcbiAgICAgICAgICAgICAgICBkb2N1bWVudC5ib2R5LmNsYXNzTGlzdC5yZW1vdmUoXCJtb2RhbC1hY3RpdmVcIik7XHJcbiAgICAgICAgICAgICAgICBtb2RhbENvbnRhaW5lci5jbGFzc0xpc3QucmVtb3ZlKFwib3BlbmVkXCIpO1xyXG4gICAgICAgICAgICAgICAgbW9kYWxDb250YWluZXIuY2xhc3NMaXN0LmFkZChcIm91dFwiKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH0pO1xyXG4gICAgfTtcclxuXHJcbiAgICBvcGVuTW9kYWwoKTtcclxuXHJcbiAgICBjb25zdCBzZWVNb3JlID0gKG51bWJlciwgZWxlbWVudHMsIGJ1dHRvbikgPT4ge1xyXG5cclxuICAgICAgICBpZiAoZG9jdW1lbnQucXVlcnlTZWxlY3RvcihidXR0b24pID09IG51bGwpIHtcclxuICAgICAgICAgICAgcmV0dXJuIGZhbHNlO1xyXG4gICAgICAgIH1cclxuICAgICAgICB3aW5kb3cuYWRkRXZlbnRMaXN0ZW5lcihcImxvYWRcIiwgKCkgPT4gc2hvd0hpZGVCbG9ja3MobnVtYmVyLCBlbGVtZW50cywgYnV0dG9uKSk7XHJcbiAgICAgICAgd2luZG93LmFkZEV2ZW50TGlzdGVuZXIoXCJyZXNpemVcIiwgKCkgPT4gc2hvd0hpZGVCbG9ja3MobnVtYmVyLCBlbGVtZW50cywgYnV0dG9uKSk7XHJcblxyXG4gICAgICAgIGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoYnV0dG9uKS5hZGRFdmVudExpc3RlbmVyKFwiY2xpY2tcIiwgZnVuY3Rpb24gKCkge1xyXG4gICAgICAgICAgICBpZiAodGhpcy50ZXh0Q29udGVudCA9PSBcIlNlZSBtb3JlXCIpIHtcclxuICAgICAgICAgICAgICAgIHRoaXMudGV4dENvbnRlbnQgPSBcIlNlZSBsZXNzXCI7XHJcbiAgICAgICAgICAgICAgICB0aGlzLmNsYXNzTGlzdC5hZGQoXCJhY3RpdmVcIik7XHJcbiAgICAgICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgICAgICB0aGlzLnRleHRDb250ZW50ID0gXCJTZWUgbW9yZVwiO1xyXG4gICAgICAgICAgICAgICAgdGhpcy5jbGFzc0xpc3QucmVtb3ZlKFwiYWN0aXZlXCIpO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3JBbGwoZWxlbWVudHMpLmZvckVhY2goKGVsZW0sIGluZGV4KSA9PiB7XHJcbiAgICAgICAgICAgICAgICBpZiAoZWxlbS5zdHlsZS5kaXNwbGF5ID09IFwibm9uZVwiKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgZWxlbS5zdHlsZS5kaXNwbGF5ID0gbnVsbDtcclxuICAgICAgICAgICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgICAgICAgICAgaWYgKGluZGV4ID4gbnVtYmVyKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGVsZW0uc3R5bGUuZGlzcGxheSA9ICdub25lJztcclxuICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIH0pO1xyXG4gICAgICAgIH0pO1xyXG5cclxuICAgICAgICBmdW5jdGlvbiBzaG93SGlkZUJsb2NrcyhudW1iZXIsIGVsZW1lbnRzLCBidXR0b24pIHtcclxuICAgICAgICAgICAgY29uc3QgZWxlbXMgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yQWxsKGVsZW1lbnRzKTtcclxuICAgICAgICAgICAgY29uc3QgYnRuU2hvd0hpZGUgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKGJ1dHRvbik7XHJcblxyXG4gICAgICAgICAgICBpZiAod2luZG93LnNjcmVlbi53aWR0aCA8PSA4MDAgJiYgZWxlbXMubGVuZ3RoID4gbnVtYmVyKSB7XHJcbiAgICAgICAgICAgICAgICBlbGVtcy5mb3JFYWNoKChlbGVtLCBpbmRleCkgPT4ge1xyXG4gICAgICAgICAgICAgICAgICAgIGlmIChpbmRleCA+IG51bWJlcikge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBlbGVtLnN0eWxlLmRpc3BsYXkgPSAnbm9uZSc7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGJ0blNob3dIaWRlLnN0eWxlLmRpc3BsYXkgPSBudWxsO1xyXG4gICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIH0pO1xyXG4gICAgICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICAgICAgZWxlbXMuZm9yRWFjaCgoZWxlbSwgaW5kZXgpID0+IHtcclxuICAgICAgICAgICAgICAgICAgICBlbGVtLnN0eWxlLmRpc3BsYXkgPSBudWxsO1xyXG4gICAgICAgICAgICAgICAgICAgIGJ0blNob3dIaWRlLnN0eWxlLmRpc3BsYXkgPSAnbm9uZSc7XHJcbiAgICAgICAgICAgICAgICB9KTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuICAgIH07XHJcblxyXG4gICAgc2VlTW9yZSgzLCAnLnByb2R1Y3QtY29tcGFyZS10b3BfX2l0ZW0nLCAnLmpzLXNlZS1tb3JlLXByb2R1Y3RzJyk7XHJcbiAgICBzZWVNb3JlKDEsICcuaGVscC1jZW50ZXJfX2l0ZW0nLCAnLmpzLXNlZS1tb3JlLWhlbHAnKTtcclxuXHJcbiAgICBjb25zdCBzaG93SXRlbXMgPSAobnVtYmVyRGVza3RvcCwgbnVtYmVyTW9iaWxlLCBpdGVtcywgYnV0dG9uKSA9PiB7XHJcbiAgICAgICAgaWYgKGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3JBbGwoaXRlbXMpLmxlbmd0aCA9PSAwKSByZXR1cm4gZmFsc2U7XHJcblxyXG4gICAgICAgIGNvbnN0IGJ0biA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoYnV0dG9uKTtcclxuXHJcbiAgICAgICAgd2luZG93LmFkZEV2ZW50TGlzdGVuZXIoXCJsb2FkXCIsIHNob3dIaWRlSXRlbXMpO1xyXG4gICAgICAgIHdpbmRvdy5hZGRFdmVudExpc3RlbmVyKFwicmVzaXplXCIsIHNob3dIaWRlSXRlbXMpO1xyXG5cclxuICAgICAgICBmdW5jdGlvbiBzaG93SGlkZUl0ZW1zKCkge1xyXG4gICAgICAgICAgICBjb25zdCBlbHMgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yQWxsKGl0ZW1zKTtcclxuICAgICAgICAgICAgY29uc3QgYnRuID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcihidXR0b24pO1xyXG4gICAgICAgICAgICBpZiAod2luZG93LnNjcmVlbi53aWR0aCA+IDU3Nykge1xyXG4gICAgICAgICAgICAgICAgaWYgKGVscy5sZW5ndGggPiBudW1iZXJEZXNrdG9wKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgYnRuLnN0eWxlLmRpc3BsYXkgPSBudWxsO1xyXG4gICAgICAgICAgICAgICAgICAgIGVscy5mb3JFYWNoKChlbCwgaSkgPT4ge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBpZiAoaSA+IG51bWJlckRlc2t0b3AgLSAxKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBlbC5zdHlsZS5kaXNwbGF5ID0gXCJub25lXCJcclxuICAgICAgICAgICAgICAgICAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGVsLnN0eWxlLmRpc3BsYXkgPSBudWxsO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICAgICAgICAgIGJ0bi5zdHlsZS5kaXNwbGF5ID0gXCJub25lXCI7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgICAgICBpZiAoZWxzLmxlbmd0aCA+IG51bWJlck1vYmlsZSkge1xyXG4gICAgICAgICAgICAgICAgICAgIGJ0bi5zdHlsZS5kaXNwbGF5ID0gbnVsbDtcclxuICAgICAgICAgICAgICAgICAgICBlbHMuZm9yRWFjaCgoZWwsIGkpID0+IHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgaWYgKGkgPiBudW1iZXJNb2JpbGUgLSAxKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBlbC5zdHlsZS5kaXNwbGF5ID0gXCJub25lXCJcclxuICAgICAgICAgICAgICAgICAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGVsLnN0eWxlLmRpc3BsYXkgPSBudWxsO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICAgICAgICAgIGJ0bi5zdHlsZS5kaXNwbGF5ID0gXCJub25lXCI7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIGJ0bi5hZGRFdmVudExpc3RlbmVyKFwiY2xpY2tcIiwgZnVuY3Rpb24gKCkge1xyXG4gICAgICAgICAgICBjb25zdCBlbGVtcyA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3JBbGwoaXRlbXMpO1xyXG4gICAgICAgICAgICBpZiAodGhpcy50ZXh0Q29udGVudCA9PSBcIlNlZSBtb3JlXCIpIHtcclxuICAgICAgICAgICAgICAgIHRoaXMudGV4dENvbnRlbnQgPSBcIlNlZSBsZXNzXCI7XHJcbiAgICAgICAgICAgICAgICB0aGlzLmNsYXNzTGlzdC5hZGQoXCJhY3RpdmVcIik7XHJcbiAgICAgICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgICAgICB0aGlzLnRleHRDb250ZW50ID0gXCJTZWUgbW9yZVwiO1xyXG4gICAgICAgICAgICAgICAgdGhpcy5jbGFzc0xpc3QucmVtb3ZlKFwiYWN0aXZlXCIpO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIGVsZW1zLmZvckVhY2goKGVsZW0sIGluZGV4KSA9PiB7XHJcbiAgICAgICAgICAgICAgICBpZiAoZWxlbS5zdHlsZS5kaXNwbGF5ID09IFwibm9uZVwiKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgZWxlbS5zdHlsZS5kaXNwbGF5ID0gbnVsbDtcclxuICAgICAgICAgICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgICAgICAgICAgaWYgKCh3aW5kb3cuc2NyZWVuLndpZHRoID4gNTc3ICYmIGluZGV4ID4gbnVtYmVyRGVza3RvcCAtIDEpIHx8ICh3aW5kb3cuc2NyZWVuLndpZHRoIDwgNTc3ICYmIGluZGV4ID4gbnVtYmVyTW9iaWxlIC0xKSkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBlbGVtLnN0eWxlLmRpc3BsYXkgPSAnbm9uZSc7XHJcbiAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB9KTtcclxuICAgICAgICB9KTtcclxuICAgIH1cclxuXHJcbiAgICBzaG93SXRlbXMoOCwgNCwgXCIuYnJhbmRzLWxpc3RfX2l0ZW1cIiwgXCIuanMtc2VlLW1vcmUtYnJhbmRzXCIpO1xyXG4gICAgc2hvd0l0ZW1zKDMsIDIsIFwiLnNlby1ibG9ja1wiLCBcIi5qcy1zZWUtbW9yZS1zZW9cIik7XHJcblxyXG4gICAgY29uc3Qgc2hvd0Zvb3RlckxpbmtzID0gKCkgPT4ge1xyXG4gICAgICAgIGNvbnN0IGZvb3RlclRpdGxlID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvckFsbCgnLmZvb3Rlcl9fdGl0bGUnKTtcclxuICAgICAgICBjb25zdCBmb290ZXJMaW5rcyA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3JBbGwoJy5mb290ZXJfX2xpbmtzJyk7XHJcblxyXG4gICAgICAgIC8vIHdpbmRvdy5hZGRFdmVudExpc3RlbmVyKCdsb2FkJywgKCkgPT4gc2hvd0hpZGVMaW5rcyk7XHJcbiAgICAgICAgd2luZG93LmFkZEV2ZW50TGlzdGVuZXIoJ3Jlc2l6ZScsICgpID0+IHtcclxuICAgICAgICAgICAgaWYgKHdpbmRvdy5zY3JlZW4ud2lkdGggPD0gNTc2KSB7XHJcbiAgICAgICAgICAgICAgICBmb290ZXJMaW5rcy5mb3JFYWNoKGZvb3RlckxpbmsgPT4ge1xyXG4gICAgICAgICAgICAgICAgICAgIGZvb3Rlckxpbmsuc3R5bGUubWF4SGVpZ2h0ID0gMDtcclxuICAgICAgICAgICAgICAgIH0pO1xyXG4gICAgICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICAgICAgZm9vdGVyTGlua3MuZm9yRWFjaChmb290ZXJMaW5rID0+IHtcclxuICAgICAgICAgICAgICAgICAgICBmb290ZXJMaW5rLnN0eWxlLm1heEhlaWdodCA9IG51bGw7XHJcbiAgICAgICAgICAgICAgICB9KTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH0pO1xyXG5cclxuICAgICAgICBmb290ZXJUaXRsZS5mb3JFYWNoKHRpdGxlID0+IHtcclxuICAgICAgICAgICAgdGl0bGUuYWRkRXZlbnRMaXN0ZW5lcignY2xpY2snLCBmdW5jdGlvbiAoKSB7XHJcbiAgICAgICAgICAgICAgICBjb25zdCBmb290ZXJMaW5rcyA9IHRoaXMubmV4dEVsZW1lbnRTaWJsaW5nO1xyXG4gICAgICAgICAgICAgICAgaWYgKGdldENvbXB1dGVkU3R5bGUoZm9vdGVyTGlua3MpLm1heEhlaWdodCA9PSAnMHB4Jykge1xyXG4gICAgICAgICAgICAgICAgICAgIHRoaXMuY2xhc3NMaXN0LmFkZCgnYWN0aXZlJyk7XHJcbiAgICAgICAgICAgICAgICAgICAgZm9vdGVyTGlua3Muc3R5bGUubWF4SGVpZ2h0ID0gZm9vdGVyTGlua3Muc2Nyb2xsSGVpZ2h0ICsgXCJweFwiO1xyXG4gICAgICAgICAgICAgICAgICAgIGZvb3RlckxpbmtzLnN0eWxlLm9wYWNpdHkgPSAxO1xyXG4gICAgICAgICAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgICAgICAgICB0aGlzLmNsYXNzTGlzdC5yZW1vdmUoJ2FjdGl2ZScpO1xyXG4gICAgICAgICAgICAgICAgICAgIGZvb3RlckxpbmtzLnN0eWxlLm1heEhlaWdodCA9IG51bGw7XHJcbiAgICAgICAgICAgICAgICAgICAgZm9vdGVyTGlua3Muc3R5bGUub3BhY2l0eSA9IG51bGw7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIH0pXHJcbiAgICAgICAgfSk7XHJcbiAgICB9XHJcblxyXG4gICAgc2hvd0Zvb3RlckxpbmtzKCk7XHJcblxyXG4gICAgY29uc3Qgc2V0UGVyY2VudCA9ICgpID0+IHtcclxuICAgICAgICBjb25zdCBjaXJjdWxhclByb2dyZXNzID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvckFsbChcIi5qcy1jaXJjdWxhci1wcm9ncmVzc1wiKTtcclxuXHJcbiAgICAgICAgY2lyY3VsYXJQcm9ncmVzcy5mb3JFYWNoKGl0ZW0gPT4ge1xyXG4gICAgICAgICAgICBjb25zdCBjaXJjbGUgPSBpdGVtLnF1ZXJ5U2VsZWN0b3IoJy5jaXJjdWxhci1wcm9ncmVzc19fcGVyY2VudCcpO1xyXG4gICAgICAgICAgICBjb25zdCB0ZXh0ID0gaXRlbS5xdWVyeVNlbGVjdG9yKCcuY2lyY3VsYXItaW5mb19fbnVtYmVyJyk7XHJcbiAgICAgICAgICAgIGNvbnN0IGRhdGFQZXJjZW50ID0gaXRlbS5nZXRBdHRyaWJ1dGUoJ2RhdGEtcGVyY2VudCcpO1xyXG4gICAgICAgICAgICBjb25zdCBwZXJjZW50ID0gKDEwMCAtIGRhdGFQZXJjZW50KSAvIDEwMDtcclxuICAgICAgICAgICAgY2lyY2xlLnN0eWxlLnN0cm9rZURhc2hvZmZzZXQgPSBgY2FsYygyKjMwKjMuMTQqJHtwZXJjZW50fSlgO1xyXG4gICAgICAgICAgICB0ZXh0LnRleHRDb250ZW50ID0gZGF0YVBlcmNlbnQ7XHJcbiAgICAgICAgfSk7XHJcbiAgICB9XHJcblxyXG4gICAgc2V0UGVyY2VudCgpO1xyXG5cclxuICAgIGRvY3VtZW50LmFkZEV2ZW50TGlzdGVuZXIoXCJibHVyXCIsIGZ1bmN0aW9uIChlKSB7XHJcbiAgICAgICAgaWYgKGUudGFyZ2V0LmNsYXNzTGlzdC5jb250YWlucygnY29udGFjdC1mb3JtX19maWVsZCcpIHx8IGUudGFyZ2V0LmNsYXNzTGlzdC5jb250YWlucygnY29udGFjdC1mb3JtX19tZXNzYWdlJykpIHtcclxuICAgICAgICAgICAgaWYgKGUudGFyZ2V0LnZhbHVlLnRyaW0oKSAhPSAnJykge1xyXG4gICAgICAgICAgICAgICAgZS50YXJnZXQubmV4dEVsZW1lbnRTaWJsaW5nLmNsYXNzTGlzdC5hZGQoJ2FjdGl2ZScpO1xyXG4gICAgICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICAgICAgZS50YXJnZXQubmV4dEVsZW1lbnRTaWJsaW5nLmNsYXNzTGlzdC5yZW1vdmUoJ2FjdGl2ZScpO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG4gICAgfSwgdHJ1ZSk7XHJcblxyXG4gICAgY29uc3QgcHJpY2VTbGlkZXIgPSAoKSA9PiB7XHJcbiAgICAgICAgY29uc3QgcmFuZ2VJbnB1dHMgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yQWxsKFwiLnByaWNlLXJhbmdlX19pbnB1dFwiKSxcclxuICAgICAgICAgICAgcHJpY2VJbnB1dHMgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yQWxsKFwiLnByaWNlLWlucHV0X19maWVsZFwiKSxcclxuICAgICAgICAgICAgcHJvZ3Jlc3MgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKFwiLnByaWNlLXNsaWRlcl9fcHJvZ3Jlc3NcIik7XHJcblxyXG4gICAgICAgIGxldCBwcmljZUdhcCA9IDUwMDtcclxuXHJcbiAgICAgICAgcHJpY2VJbnB1dHMuZm9yRWFjaCgocHJpY2VJbnB1dCkgPT4ge1xyXG4gICAgICAgICAgICBwcmljZUlucHV0LmFkZEV2ZW50TGlzdGVuZXIoXCJpbnB1dFwiLCAoZSkgPT4ge1xyXG4gICAgICAgICAgICAgICAgbGV0IG1pblZhbCA9IHBhcnNlSW50KHByaWNlSW5wdXRzWzBdLnZhbHVlKSxcclxuICAgICAgICAgICAgICAgICAgICBtYXhWYWwgPSBwYXJzZUludChwcmljZUlucHV0c1sxXS52YWx1ZSk7XHJcblxyXG4gICAgICAgICAgICAgICAgaWYgKG1heFZhbCAtIG1pblZhbCA+PSBwcmljZUdhcCAmJiBtYXhWYWwgPD0gNTAwMDApIHtcclxuICAgICAgICAgICAgICAgICAgICBpZiAoZS50YXJnZXQuY2xhc3NMaXN0LmNvbnRhaW5zKFwicHJpY2UtbWluXCIpKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHJhbmdlSW5wdXRzWzBdLnZhbHVlID0gbWluVmFsO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBwcm9ncmVzcy5zdHlsZS5sZWZ0ID0gKG1pblZhbCAvIHJhbmdlSW5wdXRzWzBdLm1heCkgKiAxMDAgKyBcIiVcIjtcclxuICAgICAgICAgICAgICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICByYW5nZUlucHV0c1sxXS52YWx1ZSA9IG1heFZhbDtcclxuICAgICAgICAgICAgICAgICAgICAgICAgcHJvZ3Jlc3Muc3R5bGUucmlnaHQgPSAxMDAgLSAobWF4VmFsIC8gcmFuZ2VJbnB1dHNbMV0ubWF4KSAqIDEwMCArIFwiJVwiO1xyXG4gICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgfSk7XHJcblxyXG4gICAgICAgIHJhbmdlSW5wdXRzLmZvckVhY2goKHJhbmdlSW5wdXQpID0+IHtcclxuICAgICAgICAgICAgcmFuZ2VJbnB1dC5hZGRFdmVudExpc3RlbmVyKFwiaW5wdXRcIiwgKGUpID0+IHtcclxuICAgICAgICAgICAgICAgIGxldCBtaW5WYWwgPSBwYXJzZUludChyYW5nZUlucHV0c1swXS52YWx1ZSksXHJcbiAgICAgICAgICAgICAgICAgICAgbWF4VmFsID0gcGFyc2VJbnQocmFuZ2VJbnB1dHNbMV0udmFsdWUpO1xyXG5cclxuICAgICAgICAgICAgICAgIGlmIChtYXhWYWwgLSBtaW5WYWwgPCBwcmljZUdhcCkge1xyXG4gICAgICAgICAgICAgICAgICAgIGlmIChlLnRhcmdldC5jbGFzc0xpc3QuY29udGFpbnMoXCJyYW5nZS1taW5cIikpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgcmFuZ2VJbnB1dHNbMF0udmFsdWUgPSBtYXhWYWwgLSBwcmljZUdhcDtcclxuICAgICAgICAgICAgICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICByYW5nZUlucHV0c1sxXS52YWx1ZSA9IG1pblZhbCArIHByaWNlR2FwO1xyXG4gICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgICAgICAgICAgcHJpY2VJbnB1dHNbMF0udmFsdWUgPSBtaW5WYWw7XHJcbiAgICAgICAgICAgICAgICAgICAgcHJpY2VJbnB1dHNbMV0udmFsdWUgPSBtYXhWYWw7XHJcbiAgICAgICAgICAgICAgICAgICAgcHJvZ3Jlc3Muc3R5bGUubGVmdCA9IChtaW5WYWwgLyByYW5nZUlucHV0c1swXS5tYXgpICogMTAwICsgXCIlXCI7XHJcbiAgICAgICAgICAgICAgICAgICAgcHJvZ3Jlc3Muc3R5bGUucmlnaHQgPSAxMDAgLSAobWF4VmFsIC8gcmFuZ2VJbnB1dHNbMV0ubWF4KSAqIDEwMCArIFwiJVwiO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB9KTtcclxuICAgICAgICB9KTtcclxuXHJcbiAgICAgICAgZnVuY3Rpb24gYWRkU3BhY2VzKHZhbHVlKSB7XHJcbiAgICAgICAgICAgIHZhbHVlID0gdmFsdWUucmVwbGFjZSgvIC9nLCcnKTtcclxuICAgICAgICAgICAgcmV0dXJuIHZhbHVlLnJlcGxhY2UoL1xcQig/PShcXGR7M30pKyg/IVxcZCkpL2csIFwiIFwiKTtcclxuICAgICAgICB9XHJcbiAgICB9O1xyXG5cclxuICAgIHByaWNlU2xpZGVyKCk7XHJcblxyXG4gICAgY29uc3Qgdmlld0FsbCA9ICgpID0+IHtcclxuICAgICAgICBpZiAoZG9jdW1lbnQucXVlcnlTZWxlY3RvckFsbChcIi5maWx0ZXItdmlldy1hbGxcIikubGVuZ3RoID09IDApIHJldHVybiBmYWxzZTtcclxuICAgICAgICBjb25zdCBmaWx0ZXJMaXN0ID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvckFsbChcIi5maWx0ZXItbGlzdFwiKTtcclxuICAgICAgICBjb25zdCB2aWV3QWxsID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvckFsbChcIi5maWx0ZXItdmlldy1hbGxcIik7XHJcblxyXG4gICAgICAgIGZpbHRlckxpc3QuZm9yRWFjaChsaXN0ID0+IHtcclxuICAgICAgICAgICAgaWYgKGxpc3QuY2hpbGRyZW4ubGVuZ3RoID4gNSkge1xyXG4gICAgICAgICAgICAgICAgY29uc3QgaXRlbXMgPSBsaXN0LmNoaWxkcmVuO1xyXG4gICAgICAgICAgICAgICAgY29uc3Qgdmlld0FsbCA9IGxpc3QubmV4dEVsZW1lbnRTaWJsaW5nO1xyXG4gICAgICAgICAgICAgICAgZm9yIChsZXQgaSA9IDAsIGxlbiA9IGl0ZW1zLmxlbmd0aDsgaSA8IGxlbjsgaSsrKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgaWYgKGkgPj0gNSkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBpdGVtc1tpXS5zdHlsZS5kaXNwbGF5ID0gXCJub25lXCI7XHJcbiAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgdmlld0FsbC5zdHlsZS5kaXNwbGF5ID0gXCJibG9ja1wiO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfSk7XHJcblxyXG4gICAgICAgIHZpZXdBbGwuZm9yRWFjaChlbCA9PiB7XHJcbiAgICAgICAgICAgIGVsLmFkZEV2ZW50TGlzdGVuZXIoXCJjbGlja1wiLCBmdW5jdGlvbiAoKSB7XHJcbiAgICAgICAgICAgICAgICBjb25zdCBmaWx0ZXJJdGVtcyA9IHRoaXMucHJldmlvdXNFbGVtZW50U2libGluZy5jaGlsZHJlbjtcclxuICAgICAgICAgICAgICAgIGNvbnN0IGZpbHRlckNvbnRlbnQgPSB0aGlzLmNsb3Nlc3QoXCIuZmlsdGVyLWNvbnRlbnRcIik7XHJcbiAgICAgICAgICAgICAgICBmb3IgKGxldCBpID0gMCwgbGVuID0gZmlsdGVySXRlbXMubGVuZ3RoOyBpIDwgbGVuOyBpKyspIHtcclxuICAgICAgICAgICAgICAgICAgICBpZiAoaSA+PSA1KSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGlmIChmaWx0ZXJJdGVtc1tpXS5zdHlsZS5kaXNwbGF5KSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBmaWx0ZXJJdGVtc1tpXS5zdHlsZS5kaXNwbGF5ID0gbnVsbDtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMudGV4dENvbnRlbnQgPSBcIkhpZGVcIlxyXG4gICAgICAgICAgICAgICAgICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgZmlsdGVySXRlbXNbaV0uc3R5bGUuZGlzcGxheSA9IFwibm9uZVwiO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy50ZXh0Q29udGVudCA9IFwiVmlldyBhbGxcIlxyXG4gICAgICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgZmlsdGVyQ29udGVudC5zdHlsZS5tYXhIZWlnaHQgPSBmaWx0ZXJDb250ZW50LnNjcm9sbEhlaWdodCArIFwicHhcIjtcclxuICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgfSk7XHJcbiAgICB9XHJcblxyXG4gICAgdmlld0FsbCgpO1xyXG5cclxuICAgICQoXCIuanMtcHJvZHVjdC1zbGlkZXItcHJldmlld1wiKS5zbGljayh7XHJcbiAgICAgICAgc2xpZGVzVG9TaG93OiA0LFxyXG4gICAgICAgIHZlcnRpY2FsOiB0cnVlLFxyXG4gICAgICAgIHZlcnRpY2FsU3dpcGluZzogdHJ1ZSxcclxuICAgICAgICBzbGlkZXNUb1Njcm9sbDogMSxcclxuICAgICAgICBmb2N1c09uU2VsZWN0OiB0cnVlLFxyXG4gICAgICAgIHByZXZBcnJvdzogXCIucHJvZHVjdC1zbGlkZXItcHJldmlld19fYnRuLS1wcmV2XCIsXHJcbiAgICAgICAgbmV4dEFycm93OiBcIi5wcm9kdWN0LXNsaWRlci1wcmV2aWV3X19idG4tLW5leHRcIixcclxuICAgICAgICB2YXJpYWJsZVdpZHRoOiB0cnVlLFxyXG4gICAgICAgIGFzTmF2Rm9yOiBcIi5wcm9kdWN0LXNsaWRlci1tYWluXCJcclxuICAgIH0pO1xyXG4gICAgJChcIi5wcm9kdWN0LXNsaWRlci1tYWluXCIpLnNsaWNrKHtcclxuICAgICAgICBzbGlkZXNUb1Nob3c6IDEsXHJcbiAgICAgICAgc2xpZGVzVG9TY3JvbGw6IDEsXHJcbiAgICAgICAgYXJyb3dzOiBmYWxzZSxcclxuICAgICAgICBmYWRlOiB0cnVlLFxyXG4gICAgICAgIGFzTmF2Rm9yOiBcIi5qcy1wcm9kdWN0LXNsaWRlci1wcmV2aWV3XCJcclxuICAgIH0pO1xyXG4gICAgJChcIi5qcy1wcm9kdWN0LWNvbXBhcmUtc2xpZGVyXCIpLnNsaWNrKHtcclxuICAgICAgICBzbGlkZXNUb1Nob3c6IDEsXHJcbiAgICAgICAgc2xpZGVzVG9TY3JvbGw6IDEsXHJcbiAgICAgICAgcHJldkFycm93OiBcIi5wcm9kdWN0LWNvbXBhcmUtc2xpZGVyX19idG4tLXByZXZcIixcclxuICAgICAgICBuZXh0QXJyb3c6IFwiLnByb2R1Y3QtY29tcGFyZS1zbGlkZXJfX2J0bi0tbmV4dFwiLFxyXG4gICAgICAgIC8vIHZhcmlhYmxlV2lkdGg6IHRydWUsXHJcbiAgICB9KTtcclxuICAgICQoXCIuanMtcmVsYXRlZC1wcm9kdWN0cy1zbGlkZXJcIikuc2xpY2soe1xyXG4gICAgICAgIHNsaWRlc1RvU2hvdzogMyxcclxuICAgICAgICBzbGlkZXNUb1Njcm9sbDogMSxcclxuICAgICAgICBwcmV2QXJyb3c6IFwiLmpzLXJlbGF0ZWQtcHJldlwiLFxyXG4gICAgICAgIG5leHRBcnJvdzogXCIuanMtcmVsYXRlZC1uZXh0XCIsXHJcbiAgICAgICAgcmVzcG9uc2l2ZTogW1xyXG4gICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgICBicmVha3BvaW50OiA3NjgsXHJcbiAgICAgICAgICAgICAgICBzZXR0aW5nczoge1xyXG4gICAgICAgICAgICAgICAgICAgIHNsaWRlc1RvU2hvdzogMixcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgfSxcclxuICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgYnJlYWtwb2ludDogNTc2LFxyXG4gICAgICAgICAgICAgICAgc2V0dGluZ3M6IHtcclxuICAgICAgICAgICAgICAgICAgICBzbGlkZXNUb1Nob3c6IDEsXHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIH0sXHJcbiAgICAgICAgXVxyXG4gICAgfSk7XHJcbiAgICAkKFwiLmpzLXJlc2VudGx5LXZpZXdlZC1zbGlkZXJcIikuc2xpY2soe1xyXG4gICAgICAgIHNsaWRlc1RvU2hvdzogNCxcclxuICAgICAgICBzbGlkZXNUb1Njcm9sbDogMSxcclxuICAgICAgICBwcmV2QXJyb3c6IFwiLmpzLXJlc2VudGx5LXZpZXdlZC1wcmV2XCIsXHJcbiAgICAgICAgbmV4dEFycm93OiBcIi5qcy1yZXNlbnRseS12aWV3ZWQtbmV4dFwiLFxyXG4gICAgICAgIHJlc3BvbnNpdmU6IFtcclxuICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgYnJlYWtwb2ludDogOTkyLFxyXG4gICAgICAgICAgICAgICAgc2V0dGluZ3M6IHtcclxuICAgICAgICAgICAgICAgICAgICBzbGlkZXNUb1Nob3c6IDMsXHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIH0sXHJcbiAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICAgIGJyZWFrcG9pbnQ6IDc2OCxcclxuICAgICAgICAgICAgICAgIHNldHRpbmdzOiB7XHJcbiAgICAgICAgICAgICAgICAgICAgc2xpZGVzVG9TaG93OiAyLFxyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB9LFxyXG4gICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgICBicmVha3BvaW50OiA1NzYsXHJcbiAgICAgICAgICAgICAgICBzZXR0aW5nczoge1xyXG4gICAgICAgICAgICAgICAgICAgIHNsaWRlc1RvU2hvdzogMSxcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgfSxcclxuICAgICAgICBdXHJcbiAgICB9KTtcclxuICAgICQoJ2JvZHknKS5vbigna2V5dXAnLCAnLmpzLXNlYXJjaC1tYXRjaGVzJywgZnVuY3Rpb24gKCkge1xyXG4gICAgICAgIGxldCBzZWxmID0gJCh0aGlzKTtcclxuICAgICAgICBsZXQgbGlzdCA9ICQoJy4nICsgc2VsZi5kYXRhKCdsaXN0JykpO1xyXG4gICAgICAgICQuYWpheCh7XHJcbiAgICAgICAgICAgIHVybDogc2VsZi5kYXRhKCd1cmwnKSArICc/cT0nICsgc2VsZi52YWwoKSxcclxuICAgICAgICAgICAgdHlwZTogJ0dFVCcsXHJcbiAgICAgICAgICAgIGRhdGFUeXBlOiAnanNvbicsXHJcbiAgICAgICAgICAgIHN1Y2Nlc3M6IGZ1bmN0aW9uIChyZXNwb25zZSkge1xyXG4gICAgICAgICAgICAgICAgbGlzdC5lbXB0eSgpO1xyXG5cclxuICAgICAgICAgICAgICAgIGlmIChyZXNwb25zZS5pdGVtcy5sZW5ndGgpIHtcclxuICAgICAgICAgICAgICAgICAgICAkLmVhY2gocmVzcG9uc2UuaXRlbXMsIGZ1bmN0aW9uIChpLCBpdGVtKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGxpc3QuYXBwZW5kKGA8YSBjbGFzcz1cInNlYXJjaC1mb3JtLW1hdGNoZXNfX2xpbmtcIiBocmVmPVwiJHtpdGVtLnVybH1cIj4ke2l0ZW0udGl0bGV9PC9hPmApO1xyXG4gICAgICAgICAgICAgICAgICAgIH0pO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfSk7XHJcbiAgICB9KTtcclxufSkoKTsiXSwiZmlsZSI6Im1haW4uanMifQ==
