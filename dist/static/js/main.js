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
//# sourceMappingURL=data:application/json;charset=utf8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIm1haW4uanMiXSwibmFtZXMiOlsiY3JvcFRleHQiLCJoaWRlQmxvY2siLCJyZWFkTW9yZSIsImRvY3VtZW50IiwicXVlcnlTZWxlY3RvckFsbCIsImZvckVhY2giLCJlbCIsImFkZEV2ZW50TGlzdGVuZXIiLCJlbFRleHQiLCJpbm5lclRleHQiLCJoaWRkZW5UZXh0IiwicHJldmlvdXNFbGVtZW50U2libGluZyIsImNsYXNzTGlzdCIsInRvZ2dsZSIsIm1heCIsInRleHQiLCJzdHIiLCJ0cmltIiwibGVuZ3RoIiwic3ViU3RyIiwic3Vic3RyaW5nIiwiaGlkZGVuU3RyIiwiaW5uZXJIVE1MIiwic2hvd1JldmlldyIsImltYWdlcyIsIm5leHRFbGVtZW50U2libGluZyIsInByb2R1Y3RSZXZpZXciLCJwcm9kdWN0VGV4dCIsInF1ZXJ5U2VsZWN0b3IiLCJjcmVhdGVFbGVtZW50IiwiYWRkIiwidGV4dENvbnRlbnQiLCJhZnRlciIsImJlZm9yZSIsImFjY29yZGlvbiIsImUiLCJ0YXJnZXQiLCJjb250YWlucyIsImNsb3Nlc3QiLCJhY2NvcmRpb25Db250ZW50Iiwic3R5bGUiLCJtYXhIZWlnaHQiLCJnZXRDb21wdXRlZFN0eWxlIiwicGFyZW50RWxlbWVudCIsInJlbW92ZSIsInNjcm9sbEhlaWdodCIsInNpZGViYXJMaW5rcyIsImVsZW0iLCJuYXZiYXJMaW5rQ2xpY2siLCJldmVudCIsInNtb290aFNjcm9sbCIsInByZXZlbnREZWZhdWx0IiwidGFyZ2V0SWQiLCJjdXJyZW50VGFyZ2V0IiwiZ2V0QXR0cmlidXRlIiwid2luZG93Iiwic2NyZWVuIiwid2lkdGgiLCJzY3JvbGxUbyIsInRvcCIsIm9mZnNldFRvcCIsImJlaGF2aW9yIiwidG9nZ2xlRml4ZWQiLCJ0aHJvdHRsZSIsInRyYWNrU2Nyb2xsIiwiZWxlbWVudHMiLCJzdGlja3lCbG9ja3MiLCJwYWdlWU9mZnNldCIsInN0aWNreUJsb2NrQ29vcmRzIiwiZ2V0Qm91bmRpbmdDbGllbnRSZWN0IiwiYm90dG9tIiwidHlwZSIsIm5hbWUiLCJvYmoiLCJydW5uaW5nIiwiZnVuYyIsInJlcXVlc3RBbmltYXRpb25GcmFtZSIsImRpc3BhdGNoRXZlbnQiLCJDdXN0b21FdmVudCIsImVsZW1lbnQiLCJmaXhlZFdpZHRoIiwiY2xpZW50V2lkdGgiLCJzaG93SGlkZVNpZGViYXJGaWx0ZXJzIiwic2hvd0hpZGVGaWx0ZXJzIiwic2lkZWJhckZpbHRlcnMiLCJmaWx0ZXIiLCJ0cmlnZ2VyIiwibW9iaWxlTmF2IiwiaXNDbG9zZWQiLCJidXJnZXJUaW1lIiwic2VhcmNoQnRuIiwidmFsdWUiLCJwcm9kdWN0UmV2aWV3U3RhcnMiLCJkYXRhUmF0aW5nIiwic3RhcnMiLCJjaGlsZHJlbiIsImkiLCJjaG9vc2VSYXRpbmciLCJyYXRpbmciLCJyYXRlIiwicmF0aW5nU3RhcnMiLCJyZW1vdmVDbGFzcyIsIm1vdXNlT3ZlckFjdGl2ZUNsYXNzIiwiYWRkQ2xhc3MiLCJtb3VzZU91dEFjdGl2ZUNsYXNzIiwiYXJyIiwiaUxlbmciLCJqIiwiYXJndW1lbnRzIiwiaUxlbiIsImNhcmV0RHJvcGRvd24iLCJmaXJzdEVsZW1lbnRDaGlsZCIsImRyb3Bkb3duIiwib3BhY2l0eSIsImJhc2ljU2Nyb2xsVG9wIiwiYnRuVG9wIiwiYnRuUmV2ZWFsIiwic2Nyb2xsWSIsIlRvcHNjcm9sbFRvIiwic2V0VGltZW91dCIsIm9wZW5Nb2RhbCIsImJ0biIsIm1vZGFsIiwibW9kYWxCdG4iLCJtb2RhbENvbnRhaW5lciIsIm5hdmlnYXRvciIsInVzZXJBZ2VudCIsIm1hdGNoIiwiYm9keSIsImtleUNvZGUiLCJzZWVNb3JlIiwibnVtYmVyIiwiYnV0dG9uIiwic2hvd0hpZGVCbG9ja3MiLCJpbmRleCIsImRpc3BsYXkiLCJlbGVtcyIsImJ0blNob3dIaWRlIiwic2hvd0l0ZW1zIiwibnVtYmVyRGVza3RvcCIsIm51bWJlck1vYmlsZSIsIml0ZW1zIiwic2hvd0hpZGVJdGVtcyIsImVscyIsInNob3dGb290ZXJMaW5rcyIsImZvb3RlclRpdGxlIiwiZm9vdGVyTGlua3MiLCJmb290ZXJMaW5rIiwidGl0bGUiLCJzZXRQZXJjZW50IiwiY2lyY3VsYXJQcm9ncmVzcyIsIml0ZW0iLCJjaXJjbGUiLCJkYXRhUGVyY2VudCIsInBlcmNlbnQiLCJzdHJva2VEYXNob2Zmc2V0IiwicHJpY2VTbGlkZXIiLCJyYW5nZUlucHV0cyIsInByaWNlSW5wdXRzIiwicHJvZ3Jlc3MiLCJwcmljZUdhcCIsInByaWNlSW5wdXQiLCJtaW5WYWwiLCJwYXJzZUludCIsIm1heFZhbCIsImxlZnQiLCJyaWdodCIsInJhbmdlSW5wdXQiLCJhZGRTcGFjZXMiLCJyZXBsYWNlIiwidmlld0FsbCIsImZpbHRlckxpc3QiLCJsaXN0IiwibGVuIiwiZmlsdGVySXRlbXMiLCJmaWx0ZXJDb250ZW50IiwiaW5wdXRWYWx1ZSIsImlucHV0RmllbGQiLCJhZGRWYWx1ZUJ0bnMiLCJhZGRWYWx1ZUJ0biIsInZhbCIsIiQiLCJzbGljayIsInNsaWRlc1RvU2hvdyIsInZlcnRpY2FsIiwidmVydGljYWxTd2lwaW5nIiwic2xpZGVzVG9TY3JvbGwiLCJmb2N1c09uU2VsZWN0IiwicHJldkFycm93IiwibmV4dEFycm93IiwidmFyaWFibGVXaWR0aCIsImFzTmF2Rm9yIiwiYXJyb3dzIiwiZmFkZSIsInJlc3BvbnNpdmUiLCJicmVha3BvaW50Iiwic2V0dGluZ3MiLCJvbiIsInNlbGYiLCJkYXRhIiwiYWpheCIsInVybCIsImRhdGFUeXBlIiwic3VjY2VzcyIsInJlc3BvbnNlIiwiZW1wdHkiLCJlYWNoIiwiYXBwZW5kIl0sIm1hcHBpbmdzIjoiOztBQUFBOztBQUNBLENBQUMsWUFBWTtBQUNUQSxFQUFBQSxRQUFRO0FBQ1JDLEVBQUFBLFNBQVM7QUFFVCxNQUFJQyxRQUFRLEdBQUdDLFFBQVEsQ0FBQ0MsZ0JBQVQsQ0FBMEIsZUFBMUIsQ0FBZjtBQUVBRixFQUFBQSxRQUFRLENBQUNHLE9BQVQsQ0FBaUIsVUFBQUMsRUFBRSxFQUFJO0FBQ25CQSxJQUFBQSxFQUFFLENBQUNDLGdCQUFI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VSxNQUFWLENBQVAsQ0FBWjtBQUNBbEIsSUFBQUEsQ0FBQyxDQUFDbUIsSUFBRixDQUFPO0FBQ0hDLE1BQUFBLEdBQUcsRUFBRUgsSUFBSSxDQUFDQyxJQUFMLENBQVUsS0FBVixJQUFtQixLQUFuQixHQUEyQkQsSUFBSSxDQUFDbEIsR0FBTCxFQUQ3QjtBQUVIN0csTUFBQUEsSUFBSSxFQUFFLEtBRkg7QUFHSG1JLE1BQUFBLFFBQVEsRUFBRSxNQUhQO0FBSUhDLE1BQUFBLE9BQU8sRUFBRSxpQkFBVUMsUUFBVixFQUFvQjtBQUN6QmhDLFFBQUFBLElBQUksQ0FBQ2lDLEtBQUw7O0FBRUEsWUFBSUQsUUFBUSxDQUFDL0QsS0FBVCxDQUFlM0gsTUFBbkIsRUFBMkI7QUFDdkJtSyxVQUFBQSxDQUFDLENBQUN5QixJQUFGLENBQU9GLFFBQVEsQ0FBQy9ELEtBQWhCLEVBQXVCLFVBQVU3QyxDQUFWLEVBQWF1RCxJQUFiLEVBQW1CO0FBQ3RDcUIsWUFBQUEsSUFBSSxDQUFDbUMsTUFBTCx5REFBMER4RCxJQUFJLENBQUNrRCxHQUEvRCxnQkFBdUVsRCxJQUFJLENBQUNILEtBQTVFO0FBQ0gsV0FGRDtBQUdIO0FBQ0o7QUFaRSxLQUFQO0FBY0gsR0FqQkQ7QUFrQkgsQ0FsdkJEIiwic291cmNlc0NvbnRlbnQiOlsiO1xyXG4oZnVuY3Rpb24gKCkge1xyXG4gICAgY3JvcFRleHQoKTtcclxuICAgIGhpZGVCbG9jaygpO1xyXG5cclxuICAgIGxldCByZWFkTW9yZSA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3JBbGwoJy5qcy1yZWFkLW1vcmUnKTtcclxuXHJcbiAgICByZWFkTW9yZS5mb3JFYWNoKGVsID0+IHtcclxuICAgICAgICBlbC5hZGRFdmVudExpc3RlbmVyKCdjbGljaycsICgpID0+IHtcclxuICAgICAgICAgICAgbGV0IGVsVGV4dCA9IGVsLmlubmVyVGV4dDtcclxuICAgICAgICAgICAgbGV0IGhpZGRlblRleHQgPSBlbC5wcmV2aW91c0VsZW1lbnRTaWJsaW5nO1xyXG5cclxuICAgICAgICAgICAgZWwuaW5uZXJUZXh0ID0gZWxUZXh0ID09ICdyZWFkIG1vcmUgPicgPyAnaGlkZScgOiAncmVhZCBtb3JlID4nO1xyXG4gICAgICAgICAgICBoaWRkZW5UZXh0LmNsYXNzTGlzdC50b2dnbGUoJ3Nob3cnKTtcclxuICAgICAgICB9KTtcclxuICAgIH0pO1xyXG5cclxuICAgIGZ1bmN0aW9uIGNyb3BUZXh0KCkge1xyXG4gICAgICAgIGxldCBtYXggPSAyMDA7XHJcbiAgICAgICAgbGV0IHRleHQgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yQWxsKCcuanMtcmVhZC1tb3JlLXRleHQnKTtcclxuICAgICAgICB0ZXh0LmZvckVhY2goZWwgPT4ge1xyXG4gICAgICAgICAgICBsZXQgc3RyID0gZWwuaW5uZXJUZXh0LnRyaW0oKTtcclxuICAgICAgICAgICAgaWYgKHN0ci5sZW5ndGggPiBtYXgpIHtcclxuICAgICAgICAgICAgICAgIGxldCBzdWJTdHIgPSBzdHIuc3Vic3RyaW5nKDAsIG1heCk7XHJcbiAgICAgICAgICAgICAgICBsZXQgaGlkZGVuU3RyID0gc3RyLnN1YnN0cmluZyhtYXgsIHN0ci5sZW5ndGgpO1xyXG4gICAgICAgICAgICAgICAgZWwuaW5uZXJUZXh0ID0gc3ViU3RyO1xyXG4gICAgICAgICAgICAgICAgZWwuaW5uZXJIVE1MICs9IGA8c3BhbiBjbGFzcz1cImhpZGRlbi10ZXh0IGpzLWhpZGRlbi10ZXh0XCI+JHtoaWRkZW5TdHJ9PC9zcGFuPmA7XHJcbiAgICAgICAgICAgICAgICBlbC5pbm5lckhUTUwgKz0gJzxzcGFuIGNsYXNzPVwicmVhZC1tb3JlIGpzLXJlYWQtbW9yZVwiPnJlYWQgbW9yZSA+PC9zcGFuPic7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9KTtcclxuICAgIH1cclxuXHJcbiAgICBsZXQgc2hvd1JldmlldyA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3JBbGwoJy5qcy1zaG93LXJldmlldycpO1xyXG5cclxuICAgIHNob3dSZXZpZXcuZm9yRWFjaChlbCA9PiB7XHJcbiAgICAgICAgZWwuYWRkRXZlbnRMaXN0ZW5lcignY2xpY2snLCAoKSA9PiB7XHJcbiAgICAgICAgICAgIGxldCBlbFRleHQgPSBlbC5pbm5lclRleHQ7XHJcbiAgICAgICAgICAgIGxldCBoaWRkZW5UZXh0ID0gZWwucHJldmlvdXNFbGVtZW50U2libGluZztcclxuICAgICAgICAgICAgbGV0IGltYWdlcyA9IGVsLm5leHRFbGVtZW50U2libGluZztcclxuXHJcbiAgICAgICAgICAgIGVsLmlubmVyVGV4dCA9IGVsVGV4dCA9PSAncmVhZCBtb3JlID4nID8gJzwgaGlkZScgOiAncmVhZCBtb3JlID4nO1xyXG4gICAgICAgICAgICBoaWRkZW5UZXh0LmNsYXNzTGlzdC50b2dnbGUoJ3Nob3cnKTtcclxuICAgICAgICAgICAgaW1hZ2VzLmNsYXNzTGlzdC50b2dnbGUoXCJzaG93XCIpO1xyXG4gICAgICAgIH0pO1xyXG4gICAgfSk7XHJcblxyXG4gICAgZnVuY3Rpb24gaGlkZUJsb2NrKCkge1xyXG4gICAgICAgIGxldCBtYXggPSAxMjg7XHJcbiAgICAgICAgbGV0IHByb2R1Y3RSZXZpZXcgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yQWxsKCcuanMtaGlkZS1yZXZpZXcnKTtcclxuICAgICAgICBwcm9kdWN0UmV2aWV3LmZvckVhY2goZWwgPT4ge1xyXG4gICAgICAgICAgICBsZXQgcHJvZHVjdFRleHQgPSBlbC5xdWVyeVNlbGVjdG9yKFwiLnBhZ2UtdGV4dFwiKTtcclxuICAgICAgICAgICAgbGV0IHN0ciA9IHByb2R1Y3RUZXh0LmlubmVyVGV4dC50cmltKCk7XHJcbiAgICAgICAgICAgIGxldCBpbWFnZXMgPSBlbC5xdWVyeVNlbGVjdG9yKCcucHJvZHVjdC1yZXZpZXdfX2ltYWdlcycpO1xyXG4gICAgICAgICAgICBpZiAoc3RyLmxlbmd0aCA+IG1heCkge1xyXG4gICAgICAgICAgICAgICAgbGV0IHN1YlN0ciA9IHN0ci5zdWJzdHJpbmcoMCwgbWF4KTtcclxuICAgICAgICAgICAgICAgIGxldCBoaWRkZW5TdHIgPSBzdHIuc3Vic3RyaW5nKG1heCwgc3RyLmxlbmd0aCk7XHJcbiAgICAgICAgICAgICAgICBwcm9kdWN0VGV4dC5pbm5lclRleHQgPSBzdWJTdHI7XHJcblxyXG4gICAgICAgICAgICAgICAgbGV0IGhpZGRlblRleHQgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdzcGFuJyk7XHJcbiAgICAgICAgICAgICAgICBoaWRkZW5UZXh0LmNsYXNzTGlzdC5hZGQoJ2hpZGRlbi10ZXh0JywgJ3BhZ2UtdGV4dCcsICdqcy1oaWRkZW4tdGV4dCcpO1xyXG4gICAgICAgICAgICAgICAgaGlkZGVuVGV4dC50ZXh0Q29udGVudCA9IGhpZGRlblN0cjtcclxuXHJcbiAgICAgICAgICAgICAgICBwcm9kdWN0VGV4dC5hZnRlcihoaWRkZW5UZXh0KTtcclxuXHJcbiAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgIGxldCByZWFkTW9yZSA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ3NwYW4nKTtcclxuICAgICAgICAgICAgcmVhZE1vcmUuY2xhc3NMaXN0LmFkZCgncmVhZC1tb3JlJywgJ2pzLXNob3ctcmV2aWV3Jyk7XHJcbiAgICAgICAgICAgIHJlYWRNb3JlLnRleHRDb250ZW50ID0gJ3JlYWQgbW9yZSA+JztcclxuXHJcbiAgICAgICAgICAgIGltYWdlcy5iZWZvcmUocmVhZE1vcmUpO1xyXG4gICAgICAgIH0pO1xyXG4gICAgfVxyXG5cclxuICAgIGNvbnN0IGFjY29yZGlvbiA9ICgpID0+IHtcclxuICAgICAgICBkb2N1bWVudC5hZGRFdmVudExpc3RlbmVyKCdjbGljaycsIGUgPT4ge1xyXG4gICAgICAgICAgICBpZiAoZS50YXJnZXQuY2xhc3NMaXN0LmNvbnRhaW5zKCdqcy1hY2NvcmRpb24nKSB8fCBlLnRhcmdldC5jbG9zZXN0KCcuanMtYWNjb3JkaW9uJykpIHtcclxuICAgICAgICAgICAgICAgIGNvbnN0IGFjY29yZGlvbiA9IGUudGFyZ2V0LmNsYXNzTGlzdC5jb250YWlucygnanMtYWNjb3JkaW9uJykgPyBlLnRhcmdldCA6IGUudGFyZ2V0LmNsb3Nlc3QoJy5qcy1hY2NvcmRpb24nKTtcclxuICAgICAgICAgICAgICAgIGNvbnN0IGFjY29yZGlvbkNvbnRlbnQgPSBhY2NvcmRpb24ubmV4dEVsZW1lbnRTaWJsaW5nO1xyXG4gICAgICAgICAgICAgICAgaWYgKGFjY29yZGlvbkNvbnRlbnQuc3R5bGUubWF4SGVpZ2h0IHx8IGdldENvbXB1dGVkU3R5bGUoYWNjb3JkaW9uQ29udGVudCkubWF4SGVpZ2h0ID09IFwibWF4LWNvbnRlbnRcIikge1xyXG4gICAgICAgICAgICAgICAgICAgIGFjY29yZGlvbi5wYXJlbnRFbGVtZW50LmNsYXNzTGlzdC5yZW1vdmUoXCJhY3RpdmVcIik7XHJcbiAgICAgICAgICAgICAgICAgICAgYWNjb3JkaW9uQ29udGVudC5zdHlsZS5tYXhIZWlnaHQgPSBudWxsO1xyXG4gICAgICAgICAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgICAgICAgICBhY2NvcmRpb24ucGFyZW50RWxlbWVudC5jbGFzc0xpc3QuYWRkKFwiYWN0aXZlXCIpO1xyXG4gICAgICAgICAgICAgICAgICAgIGFjY29yZGlvbkNvbnRlbnQuc3R5bGUubWF4SGVpZ2h0ID0gYWNjb3JkaW9uQ29udGVudC5zY3JvbGxIZWlnaHQgKyBcInB4XCI7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9KTtcclxuICAgIH1cclxuICAgIGFjY29yZGlvbigpO1xyXG5cclxuICAgIGNvbnN0IHNpZGViYXJMaW5rcyA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3JBbGwoXCIuc2lkZWJhci1tZW51X19saW5rXCIpO1xyXG5cclxuICAgIHNpZGViYXJMaW5rcy5mb3JFYWNoKGVsZW0gPT4gZWxlbS5hZGRFdmVudExpc3RlbmVyKFwiY2xpY2tcIiwgbmF2YmFyTGlua0NsaWNrKSk7XHJcblxyXG4gICAgZnVuY3Rpb24gbmF2YmFyTGlua0NsaWNrKGV2ZW50KSB7XHJcbiAgICAgICAgc21vb3RoU2Nyb2xsKGV2ZW50KTtcclxuICAgIH1cclxuXHJcbiAgICBmdW5jdGlvbiBzbW9vdGhTY3JvbGwoZXZlbnQpIHtcclxuICAgICAgICBldmVudC5wcmV2ZW50RGVmYXVsdCgpO1xyXG4gICAgICAgIGNvbnN0IHRhcmdldElkID0gZXZlbnQuY3VycmVudFRhcmdldC5nZXRBdHRyaWJ1dGUoXCJocmVmXCIpO1xyXG4gICAgICAgIGlmICh3aW5kb3cuc2NyZWVuLndpZHRoID4gMTAyNCkge1xyXG4gICAgICAgICAgICB3aW5kb3cuc2Nyb2xsVG8oe1xyXG4gICAgICAgICAgICAgICAgdG9wOiB0YXJnZXRJZCA9PT0gXCIjXCIgPyAwIDogZG9jdW1lbnQucXVlcnlTZWxlY3Rvcih0YXJnZXRJZCkub2Zmc2V0VG9wIC0gMTAwLFxyXG4gICAgICAgICAgICAgICAgYmVoYXZpb3I6IFwic21vb3RoXCJcclxuICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgd2luZG93LnNjcm9sbFRvKHtcclxuICAgICAgICAgICAgICAgIHRvcDogdGFyZ2V0SWQgPT09IFwiI1wiID8gMCA6IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IodGFyZ2V0SWQpLm9mZnNldFRvcCAtIDIwMCxcclxuICAgICAgICAgICAgICAgIGJlaGF2aW9yOiBcInNtb290aFwiXHJcbiAgICAgICAgICAgIH0pO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxuXHJcbiAgICBpZiAoZG9jdW1lbnQucXVlcnlTZWxlY3RvcignLnByb2R1Y3RzLXN0aWNreScpICE9PSBudWxsKSB7XHJcblxyXG4gICAgICAgIHdpbmRvdy5hZGRFdmVudExpc3RlbmVyKCdvcHRpbWl6ZWRSZXNpemUnLCAoKSA9PiB7XHJcbiAgICAgICAgICAgIHRvZ2dsZUZpeGVkKCcucHJvZHVjdHMtc3RpY2t5Jyk7XHJcbiAgICAgICAgfSk7XHJcblxyXG5cclxuICAgICAgICB0b2dnbGVGaXhlZCgnLnByb2R1Y3RzLXN0aWNreScpO1xyXG5cclxuICAgICAgICB0aHJvdHRsZShcInJlc2l6ZVwiLCBcIm9wdGltaXplZFJlc2l6ZVwiKTtcclxuXHJcbiAgICB9XHJcblxyXG4gICAgaWYgKGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJy5zdGlja3ktYmxvY2snKSAhPT0gbnVsbCkge1xyXG4gICAgICAgIGxldCBzdGlja3lCbG9ja0Nvb3JkcyA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJy5zdGlja3ktYmxvY2snKS5nZXRCb3VuZGluZ0NsaWVudFJlY3QoKS5ib3R0b20gKyB3aW5kb3cucGFnZVlPZmZzZXQ7XHJcblxyXG4gICAgICAgIHdpbmRvdy5hZGRFdmVudExpc3RlbmVyKFwic2Nyb2xsXCIsIGZ1bmN0aW9uICgpIHtcclxuICAgICAgICAgICAgdHJhY2tTY3JvbGwoJy5zdGlja3ktYmxvY2snKTtcclxuICAgICAgICB9KTtcclxuXHJcbiAgICAgICAgZnVuY3Rpb24gdHJhY2tTY3JvbGwoZWxlbWVudHMpIHtcclxuICAgICAgICAgICAgbGV0IHN0aWNreUJsb2NrcyA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3JBbGwoZWxlbWVudHMpO1xyXG4gICAgICAgICAgICBzdGlja3lCbG9ja3MuZm9yRWFjaChlbCA9PiB7XHJcbiAgICAgICAgICAgICAgICBpZiAoZWwuY2xhc3NMaXN0LmNvbnRhaW5zKCdzaG93JykgJiYgd2luZG93LnBhZ2VZT2Zmc2V0IDwgc3RpY2t5QmxvY2tDb29yZHMpIHtcclxuICAgICAgICAgICAgICAgICAgICBlbC5jbGFzc0xpc3QucmVtb3ZlKCdzaG93Jyk7XHJcbiAgICAgICAgICAgICAgICB9IGVsc2UgaWYgKHdpbmRvdy5wYWdlWU9mZnNldCA+IHN0aWNreUJsb2NrQ29vcmRzKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgZWwuY2xhc3NMaXN0LmFkZCgnc2hvdycpO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB9KTtcclxuICAgICAgICB9XHJcbiAgICB9XHJcblxyXG4gICAgZnVuY3Rpb24gdGhyb3R0bGUodHlwZSwgbmFtZSwgb2JqKSB7XHJcbiAgICAgICAgb2JqID0gb2JqIHx8IHdpbmRvdztcclxuICAgICAgICB2YXIgcnVubmluZyA9IGZhbHNlO1xyXG4gICAgICAgIHZhciBmdW5jID0gZnVuY3Rpb24gKCkge1xyXG4gICAgICAgICAgICBpZiAocnVubmluZykge1xyXG4gICAgICAgICAgICAgICAgcmV0dXJuO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIHJ1bm5pbmcgPSB0cnVlO1xyXG4gICAgICAgICAgICByZXF1ZXN0QW5pbWF0aW9uRnJhbWUoZnVuY3Rpb24gKCkge1xyXG4gICAgICAgICAgICAgICAgb2JqLmRpc3BhdGNoRXZlbnQobmV3IEN1c3RvbUV2ZW50KG5hbWUpKTtcclxuICAgICAgICAgICAgICAgIHJ1bm5pbmcgPSBmYWxzZTtcclxuICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgfTtcclxuICAgICAgICBvYmouYWRkRXZlbnRMaXN0ZW5lcih0eXBlLCBmdW5jKTtcclxuICAgIH07XHJcblxyXG4gICAgZnVuY3Rpb24gdG9nZ2xlRml4ZWQoZWwpIHtcclxuICAgICAgICBsZXQgZWxlbWVudCA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoZWwpO1xyXG4gICAgICAgIGxldCBmaXhlZFdpZHRoID0gd2luZG93LnNjcmVlbi53aWR0aCA+IDEwMjQgPyBlbGVtZW50LnBhcmVudEVsZW1lbnQuY2xpZW50V2lkdGggLSAyODUgOiBlbGVtZW50LnBhcmVudEVsZW1lbnQuY2xpZW50V2lkdGg7XHJcbiAgICAgICAgZWxlbWVudC5zdHlsZS53aWR0aCA9IGZpeGVkV2lkdGggKyAncHgnO1xyXG5cclxuICAgIH1cclxuXHJcbiAgICBjb25zdCBzaG93SGlkZVNpZGViYXJGaWx0ZXJzID0gKCkgPT4ge1xyXG4gICAgICAgIGlmIChkb2N1bWVudC5xdWVyeVNlbGVjdG9yQWxsKFwiLmZpbHRlclwiKS5sZW5ndGggPT0gMCkgcmV0dXJuIGZhbHNlO1xyXG5cclxuICAgICAgICB3aW5kb3cuYWRkRXZlbnRMaXN0ZW5lcihcImxvYWRcIiwgc2hvd0hpZGVGaWx0ZXJzKTtcclxuICAgICAgICB3aW5kb3cuYWRkRXZlbnRMaXN0ZW5lcihcInJlc2l6ZVwiLCBzaG93SGlkZUZpbHRlcnMpO1xyXG5cclxuICAgICAgICBmdW5jdGlvbiBzaG93SGlkZUZpbHRlcnMoKSB7XHJcbiAgICAgICAgICAgIGNvbnN0IHNpZGViYXJGaWx0ZXJzID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvckFsbChcIi5maWx0ZXJcIik7XHJcblxyXG4gICAgICAgICAgICBpZiAod2luZG93LnNjcmVlbi53aWR0aCA8PSAxMDI0KSB7XHJcbiAgICAgICAgICAgICAgICBzaWRlYmFyRmlsdGVycy5mb3JFYWNoKGZpbHRlciA9PiB7XHJcbiAgICAgICAgICAgICAgICAgICAgZmlsdGVyLmNsYXNzTGlzdC5yZW1vdmUoXCJhY3RpdmVcIik7XHJcbiAgICAgICAgICAgICAgICB9KTtcclxuICAgICAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgICAgIHNpZGViYXJGaWx0ZXJzLmZvckVhY2goZmlsdGVyID0+IHtcclxuICAgICAgICAgICAgICAgICAgICBmaWx0ZXIuY2xhc3NMaXN0LmFkZChcImFjdGl2ZVwiKTtcclxuICAgICAgICAgICAgICAgIH0pO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG5cclxuICAgIHNob3dIaWRlU2lkZWJhckZpbHRlcnMoKTtcclxuXHJcbiAgICAvLyBoYW1idXJnZXIgb3Blbi9jbG9zZSBhbmltYXRpb25cclxuICAgIGNvbnN0IHRyaWdnZXIgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKFwiI2hhbWJ1cmdlclwiKTtcclxuICAgIGNvbnN0IG1vYmlsZU5hdiA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoXCIjbW9iaWxlLW5hdlwiKTtcclxuICAgIGxldCBpc0Nsb3NlZCA9IHRydWU7XHJcblxyXG4gICAgdHJpZ2dlci5hZGRFdmVudExpc3RlbmVyKFwiY2xpY2tcIiwgYnVyZ2VyVGltZSk7XHJcblxyXG4gICAgZnVuY3Rpb24gYnVyZ2VyVGltZSgpIHtcclxuICAgICAgICBpZiAoaXNDbG9zZWQgPT0gdHJ1ZSkge1xyXG4gICAgICAgICAgICB0cmlnZ2VyLmNsYXNzTGlzdC5yZW1vdmUoXCJpcy1vcGVuXCIpO1xyXG4gICAgICAgICAgICB0cmlnZ2VyLmNsYXNzTGlzdC5hZGQoXCJpcy1jbG9zZWRcIik7XHJcbiAgICAgICAgICAgIG1vYmlsZU5hdi5jbGFzc0xpc3QuYWRkKCdpcy1vcGVuJyk7XHJcbiAgICAgICAgICAgIGlzQ2xvc2VkID0gZmFsc2U7XHJcbiAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgdHJpZ2dlci5jbGFzc0xpc3QucmVtb3ZlKFwiaXMtY2xvc2VkXCIpO1xyXG4gICAgICAgICAgICB0cmlnZ2VyLmNsYXNzTGlzdC5hZGQoXCJpcy1vcGVuXCIpO1xyXG4gICAgICAgICAgICBtb2JpbGVOYXYuY2xhc3NMaXN0LnJlbW92ZSgnaXMtb3BlbicpO1xyXG4gICAgICAgICAgICBpc0Nsb3NlZCA9IHRydWU7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG5cclxuICAgIC8vIHNlYXJjaCBmb3JtIG9wZW4vY2xvc2UgYW5pbWF0aW9uXHJcbiAgICBjb25zdCBzZWFyY2hCdG4gPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKFwiLnNlYXJjaC1mb3JtX19idG5cIik7XHJcbiAgICBzZWFyY2hCdG4uYWRkRXZlbnRMaXN0ZW5lcihcImNsaWNrXCIsIGZ1bmN0aW9uICgpIHtcclxuICAgICAgICB0aGlzLmNsYXNzTGlzdC50b2dnbGUoXCJjbG9zZVwiKTtcclxuICAgICAgICB0aGlzLnBhcmVudEVsZW1lbnQuY2xhc3NMaXN0LnRvZ2dsZShcImluY2xpY2tlZFwiKTtcclxuICAgICAgICB0aGlzLnByZXZpb3VzRWxlbWVudFNpYmxpbmcudmFsdWUgPSBcIlwiO1xyXG4gICAgfSk7XHJcblxyXG4gICAgY29uc3QgcHJvZHVjdFJldmlld1N0YXJzID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvckFsbChcIi5qcy1wcm9kdWN0LXJldmlldy1yYXRpbmdcIik7XHJcbiAgICBwcm9kdWN0UmV2aWV3U3RhcnMuZm9yRWFjaChmdW5jdGlvbiAoZWwpIHtcclxuICAgICAgICBjb25zdCBkYXRhUmF0aW5nID0gZWwuZ2V0QXR0cmlidXRlKFwiZGF0YS1yYXRpbmdcIik7XHJcbiAgICAgICAgY29uc3Qgc3RhcnMgPSBlbC5jaGlsZHJlbjtcclxuICAgICAgICBmb3IgKGxldCBpID0gMDsgaSA8IGRhdGFSYXRpbmc7IGkrKykge1xyXG4gICAgICAgICAgICBzdGFyc1tpXS5jbGFzc0xpc3QuYWRkKFwiYWN0aXZlXCIpO1xyXG4gICAgICAgIH1cclxuICAgIH0pO1xyXG5cclxuICAgIGNvbnN0IGNob29zZVJhdGluZyA9ICgpID0+IHtcclxuICAgICAgICBpZiAoZG9jdW1lbnQucXVlcnlTZWxlY3RvckFsbChcIi5qcy1yYXRpbmdcIikubGVuZ3RoIDwgMCkgcmV0dXJuIGZhbHNlO1xyXG5cclxuICAgICAgICBjb25zdCByYXRpbmcgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yQWxsKFwiLmpzLXJhdGluZ1wiKTtcclxuXHJcbiAgICAgICAgcmF0aW5nLmZvckVhY2gocmF0ZSA9PiB7XHJcbiAgICAgICAgICAgIGNvbnN0IHJhdGluZ1N0YXJzID0gcmF0ZS5jaGlsZHJlbjtcclxuXHJcbiAgICAgICAgICAgIHJhdGUuYWRkRXZlbnRMaXN0ZW5lcihcImNsaWNrXCIsIChlKSA9PiB7XHJcbiAgICAgICAgICAgICAgICBpZiAoZS50YXJnZXQuY2xhc3NMaXN0LmNvbnRhaW5zKFwianMtcmF0aW5nLXN0YXJcIikgfHwgZS50YXJnZXQuY2xvc2VzdChcIi5qcy1yYXRpbmctc3RhclwiKSkge1xyXG4gICAgICAgICAgICAgICAgICAgIGxldCB0YXJnZXQgPSBlLnRhcmdldC5jbGFzc0xpc3QuY29udGFpbnMoXCJqcy1yYXRpbmctc3RhclwiKSA/IGUudGFyZ2V0IDogZS50YXJnZXQuY2xvc2VzdChcIi5qcy1yYXRpbmctc3RhclwiKTtcclxuICAgICAgICAgICAgICAgICAgICByZW1vdmVDbGFzcyhyYXRpbmdTdGFycywgXCJjdXJyZW50LWFjdGl2ZVwiKTtcclxuICAgICAgICAgICAgICAgICAgICB0YXJnZXQuY2xhc3NMaXN0LmFkZChcImFjdGl2ZVwiLCBcImN1cnJlbnQtYWN0aXZlXCIpO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB9KTtcclxuICAgICAgICAgICAgcmF0ZS5hZGRFdmVudExpc3RlbmVyKFwibW91c2VvdmVyXCIsIChlKSA9PiB7XHJcbiAgICAgICAgICAgICAgICBpZiAoZS50YXJnZXQuY2xhc3NMaXN0LmNvbnRhaW5zKFwianMtcmF0aW5nLXN0YXJcIikgfHwgZS50YXJnZXQuY2xvc2VzdChcIi5qcy1yYXRpbmctc3RhclwiKSkge1xyXG4gICAgICAgICAgICAgICAgICAgIGxldCB0YXJnZXQgPSBlLnRhcmdldC5jbGFzc0xpc3QuY29udGFpbnMoXCJqcy1yYXRpbmctc3RhclwiKSA/IGUudGFyZ2V0IDogZS50YXJnZXQuY2xvc2VzdChcIi5qcy1yYXRpbmctc3RhclwiKTtcclxuICAgICAgICAgICAgICAgICAgICByZW1vdmVDbGFzcyhyYXRpbmdTdGFycywgXCJhY3RpdmVcIik7XHJcbiAgICAgICAgICAgICAgICAgICAgdGFyZ2V0LmNsYXNzTGlzdC5hZGQoXCJhY3RpdmVcIik7XHJcbiAgICAgICAgICAgICAgICAgICAgbW91c2VPdmVyQWN0aXZlQ2xhc3MocmF0aW5nU3RhcnMpO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB9KTtcclxuICAgICAgICAgICAgcmF0ZS5hZGRFdmVudExpc3RlbmVyKFwibW91c2VvdXRcIiwgKCkgPT4ge1xyXG4gICAgICAgICAgICAgICAgYWRkQ2xhc3MocmF0aW5nU3RhcnMsIFwiYWN0aXZlXCIpO1xyXG4gICAgICAgICAgICAgICAgbW91c2VPdXRBY3RpdmVDbGFzcyhyYXRpbmdTdGFycyk7XHJcbiAgICAgICAgICAgIH0pO1xyXG5cclxuICAgICAgICAgICAgZnVuY3Rpb24gYWRkQ2xhc3MoYXJyKSB7XHJcbiAgICAgICAgICAgICAgICBmb3IgKGxldCBpID0gMCwgaUxlbmcgPSBhcnIubGVuZ3RoOyBpIDwgaUxlbmc7IGkrKykge1xyXG4gICAgICAgICAgICAgICAgICAgIGZvciAobGV0IGogPSAxOyBqIDwgYXJndW1lbnRzLmxlbmd0aDsgaisrKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHJhdGluZ1N0YXJzW2ldLmNsYXNzTGlzdC5hZGQoYXJndW1lbnRzW2pdKTtcclxuICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgIGZ1bmN0aW9uIHJlbW92ZUNsYXNzKGFycikge1xyXG4gICAgICAgICAgICAgICAgZm9yIChsZXQgaSA9IDAsIGlMZW5nID0gYXJyLmxlbmd0aDsgaSA8IGlMZW5nOyBpKyspIHtcclxuICAgICAgICAgICAgICAgICAgICBmb3IgKGxldCBqID0gMTsgaiA8IGFyZ3VtZW50cy5sZW5ndGg7IGorKykge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICByYXRpbmdTdGFyc1tpXS5jbGFzc0xpc3QucmVtb3ZlKGFyZ3VtZW50c1tqXSk7XHJcbiAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICBmdW5jdGlvbiBtb3VzZU92ZXJBY3RpdmVDbGFzcyhhcnIpIHtcclxuICAgICAgICAgICAgICAgIGZvciAobGV0IGkgPSAwLCBpTGVuID0gYXJyLmxlbmd0aDsgaSA8IGlMZW47IGkrKykge1xyXG4gICAgICAgICAgICAgICAgICAgIGlmIChhcnJbaV0uY2xhc3NMaXN0LmNvbnRhaW5zKFwiYWN0aXZlXCIpKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGJyZWFrO1xyXG4gICAgICAgICAgICAgICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGFycltpXS5jbGFzc0xpc3QuYWRkKFwiYWN0aXZlXCIpO1xyXG4gICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgZnVuY3Rpb24gbW91c2VPdXRBY3RpdmVDbGFzcyhhcnIpIHtcclxuICAgICAgICAgICAgICAgIGZvciAobGV0IGkgPSBhcnIubGVuZ3RoIC0gMTsgaSA+PSAwOyBpLS0pIHtcclxuICAgICAgICAgICAgICAgICAgICBpZiAoYXJyW2ldLmNsYXNzTGlzdC5jb250YWlucyhcImN1cnJlbnQtYWN0aXZlXCIpKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGJyZWFrO1xyXG4gICAgICAgICAgICAgICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGFycltpXS5jbGFzc0xpc3QucmVtb3ZlKFwiYWN0aXZlXCIpO1xyXG4gICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH0pO1xyXG4gICAgfVxyXG5cclxuICAgIGNob29zZVJhdGluZygpO1xyXG5cclxuICAgIGRvY3VtZW50LmFkZEV2ZW50TGlzdGVuZXIoXCJjbGlja1wiLCBmdW5jdGlvbiAoZSkge1xyXG4gICAgICAgIGlmIChlLnRhcmdldC5jbGFzc0xpc3QuY29udGFpbnMoXCJqcy1vcGVuLWRyb3Bkb3duXCIpICYmIHdpbmRvdy5zY3JlZW4ud2lkdGggPD0gNTc2KSB7XHJcbiAgICAgICAgICAgIGNvbnN0IGNhcmV0RHJvcGRvd24gPSBlLnRhcmdldC5maXJzdEVsZW1lbnRDaGlsZDtcclxuICAgICAgICAgICAgY29uc3QgZHJvcGRvd24gPSBlLnRhcmdldC5uZXh0RWxlbWVudFNpYmxpbmc7XHJcbiAgICAgICAgICAgIGlmIChkcm9wZG93bi5zdHlsZS5tYXhIZWlnaHQpIHtcclxuICAgICAgICAgICAgICAgIGRyb3Bkb3duLnN0eWxlLm1heEhlaWdodCA9IG51bGw7XHJcbiAgICAgICAgICAgICAgICBkcm9wZG93bi5zdHlsZS5vcGFjaXR5ID0gbnVsbDtcclxuICAgICAgICAgICAgICAgIGUudGFyZ2V0LmNsYXNzTGlzdC5yZW1vdmUoXCJkcm9wZG93bi1hY3RpdmVcIik7XHJcbiAgICAgICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgICAgICBkcm9wZG93bi5zdHlsZS5tYXhIZWlnaHQgPSBkcm9wZG93bi5zY3JvbGxIZWlnaHQgKyBcInB4XCI7XHJcbiAgICAgICAgICAgICAgICBkcm9wZG93bi5zdHlsZS5vcGFjaXR5ID0gMTtcclxuICAgICAgICAgICAgICAgIGUudGFyZ2V0LmNsYXNzTGlzdC5hZGQoXCJkcm9wZG93bi1hY3RpdmVcIik7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcbiAgICB9KTtcclxuXHJcbiAgICBjb25zdCBiYXNpY1Njcm9sbFRvcCA9IGZ1bmN0aW9uICgpIHtcclxuICAgICAgICBjb25zdCBidG5Ub3AgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcuanMtYnRuLWdvLXRvcCcpO1xyXG4gICAgICAgIGNvbnN0IGJ0blJldmVhbCA9IGZ1bmN0aW9uICgpIHtcclxuICAgICAgICAgICAgaWYgKHdpbmRvdy5zY3JvbGxZID49IDMwMCkge1xyXG4gICAgICAgICAgICAgICAgYnRuVG9wLmNsYXNzTGlzdC5hZGQoJ2lzLXZpc2libGUnKTtcclxuICAgICAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgICAgIGJ0blRvcC5jbGFzc0xpc3QucmVtb3ZlKCdpcy12aXNpYmxlJyk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcbiAgICAgICAgY29uc3QgVG9wc2Nyb2xsVG8gPSBmdW5jdGlvbiAoKSB7XHJcbiAgICAgICAgICAgIGlmICh3aW5kb3cuc2Nyb2xsWSAhPSAwKSB7XHJcbiAgICAgICAgICAgICAgICBzZXRUaW1lb3V0KGZ1bmN0aW9uICgpIHtcclxuICAgICAgICAgICAgICAgICAgICB3aW5kb3cuc2Nyb2xsVG8oMCwgd2luZG93LnNjcm9sbFkgLSAzMCk7XHJcbiAgICAgICAgICAgICAgICAgICAgVG9wc2Nyb2xsVG8oKTtcclxuICAgICAgICAgICAgICAgIH0sIDEwKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuICAgICAgICB3aW5kb3cuYWRkRXZlbnRMaXN0ZW5lcignc2Nyb2xsJywgYnRuUmV2ZWFsKTtcclxuICAgICAgICBidG5Ub3AuYWRkRXZlbnRMaXN0ZW5lcignY2xpY2snLCBUb3BzY3JvbGxUbyk7XHJcblxyXG4gICAgfTtcclxuICAgIGJhc2ljU2Nyb2xsVG9wKCk7XHJcblxyXG4gICAgY29uc3Qgb3Blbk1vZGFsID0gKGJ0biwgbW9kYWwpID0+IHtcclxuICAgICAgICBpZiAoZG9jdW1lbnQucXVlcnlTZWxlY3RvcihidG4pID09IG51bGwpIHJldHVybiBmYWxzZTtcclxuXHJcbiAgICAgICAgY29uc3QgbW9kYWxCdG4gPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKGJ0bik7XHJcbiAgICAgICAgY29uc3QgbW9kYWxDb250YWluZXIgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKG1vZGFsKTtcclxuXHJcbiAgICAgICAgaWYgKFxyXG4gICAgICAgICAgICBuYXZpZ2F0b3IudXNlckFnZW50Lm1hdGNoKC9pUGhvbmUvaSkgfHxcclxuICAgICAgICAgICAgbmF2aWdhdG9yLnVzZXJBZ2VudC5tYXRjaCgvaVBvZC9pKVxyXG4gICAgICAgICkge1xyXG4gICAgICAgICAgICBtb2RhbEJ0bi5hZGRFdmVudExpc3RlbmVyKFwidG91Y2hzdGFydFwiLCBmdW5jdGlvbiAoKSB7XHJcbiAgICAgICAgICAgICAgICBkb2N1bWVudC5ib2R5LmNsYXNzTGlzdC5hZGQoXCJtb2RhbC1hY3RpdmVcIik7XHJcbiAgICAgICAgICAgICAgICBtb2RhbENvbnRhaW5lci5jbGFzc0xpc3QucmVtb3ZlKFwib3V0XCIpO1xyXG4gICAgICAgICAgICAgICAgbW9kYWxDb250YWluZXIuY2xhc3NMaXN0LmFkZChcIm9wZW5lZFwiKTtcclxuICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgbW9kYWxCdG4uYWRkRXZlbnRMaXN0ZW5lcihcImNsaWNrXCIsIGZ1bmN0aW9uICgpIHtcclxuICAgICAgICAgICAgICAgIGRvY3VtZW50LmJvZHkuY2xhc3NMaXN0LmFkZChcIm1vZGFsLWFjdGl2ZVwiKTtcclxuICAgICAgICAgICAgICAgIG1vZGFsQ29udGFpbmVyLmNsYXNzTGlzdC5yZW1vdmUoXCJvdXRcIik7XHJcbiAgICAgICAgICAgICAgICBtb2RhbENvbnRhaW5lci5jbGFzc0xpc3QuYWRkKFwib3BlbmVkXCIpO1xyXG4gICAgICAgICAgICB9KTtcclxuICAgICAgICB9XHJcblxyXG5cclxuXHJcbiAgICAgICAgZG9jdW1lbnQuYWRkRXZlbnRMaXN0ZW5lcihcImNsaWNrXCIsIGZ1bmN0aW9uIChlKSB7XHJcbiAgICAgICAgICAgIGlmIChcclxuICAgICAgICAgICAgICAgIGUudGFyZ2V0LmNsYXNzTGlzdC5jb250YWlucyhcIm1vZGFsLWNvbnRhaW5lclwiKSB8fFxyXG4gICAgICAgICAgICAgICAgZS50YXJnZXQuY2xhc3NMaXN0LmNvbnRhaW5zKFwibW9kYWwtY2xvc2VcIilcclxuICAgICAgICAgICAgKSB7XHJcbiAgICAgICAgICAgICAgICBkb2N1bWVudC5ib2R5LmNsYXNzTGlzdC5yZW1vdmUoXCJtb2RhbC1hY3RpdmVcIik7XHJcbiAgICAgICAgICAgICAgICBtb2RhbENvbnRhaW5lci5jbGFzc0xpc3QucmVtb3ZlKFwib3BlbmVkXCIpO1xyXG4gICAgICAgICAgICAgICAgbW9kYWxDb250YWluZXIuY2xhc3NMaXN0LmFkZChcIm91dFwiKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH0pO1xyXG4gICAgICAgIGRvY3VtZW50LmFkZEV2ZW50TGlzdGVuZXIoXCJrZXlkb3duXCIsIGZ1bmN0aW9uIChlKSB7XHJcbiAgICAgICAgICAgIGlmIChlLmtleUNvZGUgPT0gMjcpIHtcclxuICAgICAgICAgICAgICAgIGRvY3VtZW50LmJvZHkuY2xhc3NMaXN0LnJlbW92ZShcIm1vZGFsLWFjdGl2ZVwiKTtcclxuICAgICAgICAgICAgICAgIG1vZGFsQ29udGFpbmVyLmNsYXNzTGlzdC5yZW1vdmUoXCJvcGVuZWRcIik7XHJcbiAgICAgICAgICAgICAgICBtb2RhbENvbnRhaW5lci5jbGFzc0xpc3QuYWRkKFwib3V0XCIpO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfSk7XHJcbiAgICB9O1xyXG5cclxuICAgIG9wZW5Nb2RhbChcIi5qcy1wcm9kdWN0LWNvbXBhcmVcIiwgXCIuanMtbW9kYWwtcHJvZHVjdC1jb21wYXJlXCIpO1xyXG4gICAgb3Blbk1vZGFsKFwiLmpzLXByb2R1Y3QtY29tcGFyZS1tb2JpbGVcIiwgXCIuanMtbW9kYWwtcHJvZHVjdC1jb21wYXJlXCIpO1xyXG4gICAgb3Blbk1vZGFsKFwiLmpzLWFkZC1yZXZpZXdcIiwgXCIuanMtbW9kYWwtYWRkLXJldmlld1wiKTtcclxuICAgIG9wZW5Nb2RhbChcIi5qcy1hZGQtcXVlc3Rpb25cIiwgXCIuanMtbW9kYWwtYWRkLXF1ZXN0aW9uXCIpO1xyXG5cclxuICAgIGNvbnN0IHNlZU1vcmUgPSAobnVtYmVyLCBlbGVtZW50cywgYnV0dG9uKSA9PiB7XHJcblxyXG4gICAgICAgIGlmIChkb2N1bWVudC5xdWVyeVNlbGVjdG9yKGJ1dHRvbikgPT0gbnVsbCkge1xyXG4gICAgICAgICAgICByZXR1cm4gZmFsc2U7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIHdpbmRvdy5hZGRFdmVudExpc3RlbmVyKFwibG9hZFwiLCAoKSA9PiBzaG93SGlkZUJsb2NrcyhudW1iZXIsIGVsZW1lbnRzLCBidXR0b24pKTtcclxuICAgICAgICB3aW5kb3cuYWRkRXZlbnRMaXN0ZW5lcihcInJlc2l6ZVwiLCAoKSA9PiBzaG93SGlkZUJsb2NrcyhudW1iZXIsIGVsZW1lbnRzLCBidXR0b24pKTtcclxuXHJcbiAgICAgICAgZG9jdW1lbnQucXVlcnlTZWxlY3RvcihidXR0b24pLmFkZEV2ZW50TGlzdGVuZXIoXCJjbGlja1wiLCBmdW5jdGlvbiAoKSB7XHJcbiAgICAgICAgICAgIGlmICh0aGlzLnRleHRDb250ZW50ID09IFwiU2VlIG1vcmVcIikge1xyXG4gICAgICAgICAgICAgICAgdGhpcy50ZXh0Q29udGVudCA9IFwiU2VlIGxlc3NcIjtcclxuICAgICAgICAgICAgICAgIHRoaXMuY2xhc3NMaXN0LmFkZChcImFjdGl2ZVwiKTtcclxuICAgICAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgICAgIHRoaXMudGV4dENvbnRlbnQgPSBcIlNlZSBtb3JlXCI7XHJcbiAgICAgICAgICAgICAgICB0aGlzLmNsYXNzTGlzdC5yZW1vdmUoXCJhY3RpdmVcIik7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgZG9jdW1lbnQucXVlcnlTZWxlY3RvckFsbChlbGVtZW50cykuZm9yRWFjaCgoZWxlbSwgaW5kZXgpID0+IHtcclxuICAgICAgICAgICAgICAgIGlmIChlbGVtLnN0eWxlLmRpc3BsYXkgPT0gXCJub25lXCIpIHtcclxuICAgICAgICAgICAgICAgICAgICBlbGVtLnN0eWxlLmRpc3BsYXkgPSBudWxsO1xyXG4gICAgICAgICAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgICAgICAgICBpZiAoaW5kZXggPiBudW1iZXIpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgZWxlbS5zdHlsZS5kaXNwbGF5ID0gJ25vbmUnO1xyXG4gICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgfSk7XHJcblxyXG4gICAgICAgIGZ1bmN0aW9uIHNob3dIaWRlQmxvY2tzKG51bWJlciwgZWxlbWVudHMsIGJ1dHRvbikge1xyXG4gICAgICAgICAgICBjb25zdCBlbGVtcyA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3JBbGwoZWxlbWVudHMpO1xyXG4gICAgICAgICAgICBjb25zdCBidG5TaG93SGlkZSA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoYnV0dG9uKTtcclxuXHJcbiAgICAgICAgICAgIGlmICh3aW5kb3cuc2NyZWVuLndpZHRoIDw9IDgwMCAmJiBlbGVtcy5sZW5ndGggPiBudW1iZXIpIHtcclxuICAgICAgICAgICAgICAgIGVsZW1zLmZvckVhY2goKGVsZW0sIGluZGV4KSA9PiB7XHJcbiAgICAgICAgICAgICAgICAgICAgaWYgKGluZGV4ID4gbnVtYmVyKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGVsZW0uc3R5bGUuZGlzcGxheSA9ICdub25lJztcclxuICAgICAgICAgICAgICAgICAgICAgICAgYnRuU2hvd0hpZGUuc3R5bGUuZGlzcGxheSA9IG51bGw7XHJcbiAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgICAgICBlbGVtcy5mb3JFYWNoKChlbGVtLCBpbmRleCkgPT4ge1xyXG4gICAgICAgICAgICAgICAgICAgIGVsZW0uc3R5bGUuZGlzcGxheSA9IG51bGw7XHJcbiAgICAgICAgICAgICAgICAgICAgYnRuU2hvd0hpZGUuc3R5bGUuZGlzcGxheSA9ICdub25lJztcclxuICAgICAgICAgICAgICAgIH0pO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG4gICAgfTtcclxuXHJcbiAgICBzZWVNb3JlKDMsICcucHJvZHVjdC1jb21wYXJlLXRvcF9faXRlbScsICcuanMtc2VlLW1vcmUtcHJvZHVjdHMnKTtcclxuICAgIHNlZU1vcmUoMSwgJy5oZWxwLWNlbnRlcl9faXRlbScsICcuanMtc2VlLW1vcmUtaGVscCcpO1xyXG5cclxuICAgIGNvbnN0IHNob3dJdGVtcyA9IChudW1iZXJEZXNrdG9wLCBudW1iZXJNb2JpbGUsIGl0ZW1zLCBidXR0b24pID0+IHtcclxuICAgICAgICBpZiAoZG9jdW1lbnQucXVlcnlTZWxlY3RvckFsbChpdGVtcykubGVuZ3RoID09IDApIHJldHVybiBmYWxzZTtcclxuXHJcbiAgICAgICAgY29uc3QgYnRuID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcihidXR0b24pO1xyXG5cclxuICAgICAgICB3aW5kb3cuYWRkRXZlbnRMaXN0ZW5lcihcImxvYWRcIiwgc2hvd0hpZGVJdGVtcyk7XHJcbiAgICAgICAgd2luZG93LmFkZEV2ZW50TGlzdGVuZXIoXCJyZXNpemVcIiwgc2hvd0hpZGVJdGVtcyk7XHJcblxyXG4gICAgICAgIGZ1bmN0aW9uIHNob3dIaWRlSXRlbXMoKSB7XHJcbiAgICAgICAgICAgIGNvbnN0IGVscyA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3JBbGwoaXRlbXMpO1xyXG4gICAgICAgICAgICBjb25zdCBidG4gPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKGJ1dHRvbik7XHJcbiAgICAgICAgICAgIGlmICh3aW5kb3cuc2NyZWVuLndpZHRoID4gNTc3KSB7XHJcbiAgICAgICAgICAgICAgICBpZiAoZWxzLmxlbmd0aCA+IG51bWJlckRlc2t0b3ApIHtcclxuICAgICAgICAgICAgICAgICAgICBidG4uc3R5bGUuZGlzcGxheSA9IG51bGw7XHJcbiAgICAgICAgICAgICAgICAgICAgZWxzLmZvckVhY2goKGVsLCBpKSA9PiB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGlmIChpID4gbnVtYmVyRGVza3RvcCAtIDEpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGVsLnN0eWxlLmRpc3BsYXkgPSBcIm5vbmVcIlxyXG4gICAgICAgICAgICAgICAgICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgZWwuc3R5bGUuZGlzcGxheSA9IG51bGw7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICB9KTtcclxuICAgICAgICAgICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgICAgICAgICAgYnRuLnN0eWxlLmRpc3BsYXkgPSBcIm5vbmVcIjtcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgICAgIGlmIChlbHMubGVuZ3RoID4gbnVtYmVyTW9iaWxlKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgYnRuLnN0eWxlLmRpc3BsYXkgPSBudWxsO1xyXG4gICAgICAgICAgICAgICAgICAgIGVscy5mb3JFYWNoKChlbCwgaSkgPT4ge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBpZiAoaSA+IG51bWJlck1vYmlsZSAtIDEpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGVsLnN0eWxlLmRpc3BsYXkgPSBcIm5vbmVcIlxyXG4gICAgICAgICAgICAgICAgICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgZWwuc3R5bGUuZGlzcGxheSA9IG51bGw7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICB9KTtcclxuICAgICAgICAgICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgICAgICAgICAgYnRuLnN0eWxlLmRpc3BsYXkgPSBcIm5vbmVcIjtcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgYnRuLmFkZEV2ZW50TGlzdGVuZXIoXCJjbGlja1wiLCBmdW5jdGlvbiAoKSB7XHJcbiAgICAgICAgICAgIGNvbnN0IGVsZW1zID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvckFsbChpdGVtcyk7XHJcbiAgICAgICAgICAgIGlmICh0aGlzLnRleHRDb250ZW50ID09IFwiU2VlIG1vcmVcIikge1xyXG4gICAgICAgICAgICAgICAgdGhpcy50ZXh0Q29udGVudCA9IFwiU2VlIGxlc3NcIjtcclxuICAgICAgICAgICAgICAgIHRoaXMuY2xhc3NMaXN0LmFkZChcImFjdGl2ZVwiKTtcclxuICAgICAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgICAgIHRoaXMudGV4dENvbnRlbnQgPSBcIlNlZSBtb3JlXCI7XHJcbiAgICAgICAgICAgICAgICB0aGlzLmNsYXNzTGlzdC5yZW1vdmUoXCJhY3RpdmVcIik7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgZWxlbXMuZm9yRWFjaCgoZWxlbSwgaW5kZXgpID0+IHtcclxuICAgICAgICAgICAgICAgIGlmIChlbGVtLnN0eWxlLmRpc3BsYXkgPT0gXCJub25lXCIpIHtcclxuICAgICAgICAgICAgICAgICAgICBlbGVtLnN0eWxlLmRpc3BsYXkgPSBudWxsO1xyXG4gICAgICAgICAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgICAgICAgICBpZiAoKHdpbmRvdy5zY3JlZW4ud2lkdGggPiA1NzcgJiYgaW5kZXggPiBudW1iZXJEZXNrdG9wIC0gMSkgfHwgKHdpbmRvdy5zY3JlZW4ud2lkdGggPCA1NzcgJiYgaW5kZXggPiBudW1iZXJNb2JpbGUgLSAxKSkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBlbGVtLnN0eWxlLmRpc3BsYXkgPSAnbm9uZSc7XHJcbiAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB9KTtcclxuICAgICAgICB9KTtcclxuICAgIH1cclxuXHJcbiAgICBzaG93SXRlbXMoOCwgNCwgXCIuYnJhbmRzLWxpc3RfX2l0ZW1cIiwgXCIuanMtc2VlLW1vcmUtYnJhbmRzXCIpO1xyXG4gICAgc2hvd0l0ZW1zKDMsIDIsIFwiLnNlby1ibG9ja1wiLCBcIi5qcy1zZWUtbW9yZS1zZW9cIik7XHJcblxyXG4gICAgY29uc3Qgc2hvd0Zvb3RlckxpbmtzID0gKCkgPT4ge1xyXG4gICAgICAgIGNvbnN0IGZvb3RlclRpdGxlID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvckFsbCgnLmZvb3Rlcl9fdGl0bGUnKTtcclxuICAgICAgICBjb25zdCBmb290ZXJMaW5rcyA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3JBbGwoJy5mb290ZXJfX2xpbmtzJyk7XHJcblxyXG4gICAgICAgIC8vIHdpbmRvdy5hZGRFdmVudExpc3RlbmVyKCdsb2FkJywgKCkgPT4gc2hvd0hpZGVMaW5rcyk7XHJcbiAgICAgICAgd2luZG93LmFkZEV2ZW50TGlzdGVuZXIoJ3Jlc2l6ZScsICgpID0+IHtcclxuICAgICAgICAgICAgaWYgKHdpbmRvdy5zY3JlZW4ud2lkdGggPD0gNTc2KSB7XHJcbiAgICAgICAgICAgICAgICBmb290ZXJMaW5rcy5mb3JFYWNoKGZvb3RlckxpbmsgPT4ge1xyXG4gICAgICAgICAgICAgICAgICAgIGZvb3Rlckxpbmsuc3R5bGUubWF4SGVpZ2h0ID0gMDtcclxuICAgICAgICAgICAgICAgIH0pO1xyXG4gICAgICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICAgICAgZm9vdGVyTGlua3MuZm9yRWFjaChmb290ZXJMaW5rID0+IHtcclxuICAgICAgICAgICAgICAgICAgICBmb290ZXJMaW5rLnN0eWxlLm1heEhlaWdodCA9IG51bGw7XHJcbiAgICAgICAgICAgICAgICB9KTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH0pO1xyXG5cclxuICAgICAgICBmb290ZXJUaXRsZS5mb3JFYWNoKHRpdGxlID0+IHtcclxuICAgICAgICAgICAgdGl0bGUuYWRkRXZlbnRMaXN0ZW5lcignY2xpY2snLCBmdW5jdGlvbiAoKSB7XHJcbiAgICAgICAgICAgICAgICBjb25zdCBmb290ZXJMaW5rcyA9IHRoaXMubmV4dEVsZW1lbnRTaWJsaW5nO1xyXG4gICAgICAgICAgICAgICAgaWYgKGdldENvbXB1dGVkU3R5bGUoZm9vdGVyTGlua3MpLm1heEhlaWdodCA9PSAnMHB4Jykge1xyXG4gICAgICAgICAgICAgICAgICAgIHRoaXMuY2xhc3NMaXN0LmFkZCgnYWN0aXZlJyk7XHJcbiAgICAgICAgICAgICAgICAgICAgZm9vdGVyTGlua3Muc3R5bGUubWF4SGVpZ2h0ID0gZm9vdGVyTGlua3Muc2Nyb2xsSGVpZ2h0ICsgXCJweFwiO1xyXG4gICAgICAgICAgICAgICAgICAgIGZvb3RlckxpbmtzLnN0eWxlLm9wYWNpdHkgPSAxO1xyXG4gICAgICAgICAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgICAgICAgICB0aGlzLmNsYXNzTGlzdC5yZW1vdmUoJ2FjdGl2ZScpO1xyXG4gICAgICAgICAgICAgICAgICAgIGZvb3RlckxpbmtzLnN0eWxlLm1heEhlaWdodCA9IG51bGw7XHJcbiAgICAgICAgICAgICAgICAgICAgZm9vdGVyTGlua3Muc3R5bGUub3BhY2l0eSA9IG51bGw7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIH0pXHJcbiAgICAgICAgfSk7XHJcbiAgICB9XHJcblxyXG4gICAgc2hvd0Zvb3RlckxpbmtzKCk7XHJcblxyXG4gICAgY29uc3Qgc2V0UGVyY2VudCA9ICgpID0+IHtcclxuICAgICAgICBjb25zdCBjaXJjdWxhclByb2dyZXNzID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvckFsbChcIi5qcy1jaXJjdWxhci1wcm9ncmVzc1wiKTtcclxuXHJcbiAgICAgICAgY2lyY3VsYXJQcm9ncmVzcy5mb3JFYWNoKGl0ZW0gPT4ge1xyXG4gICAgICAgICAgICBjb25zdCBjaXJjbGUgPSBpdGVtLnF1ZXJ5U2VsZWN0b3IoJy5jaXJjdWxhci1wcm9ncmVzc19fcGVyY2VudCcpO1xyXG4gICAgICAgICAgICBjb25zdCB0ZXh0ID0gaXRlbS5xdWVyeVNlbGVjdG9yKCcuY2lyY3VsYXItaW5mb19fbnVtYmVyJyk7XHJcbiAgICAgICAgICAgIGNvbnN0IGRhdGFQZXJjZW50ID0gaXRlbS5nZXRBdHRyaWJ1dGUoJ2RhdGEtcGVyY2VudCcpO1xyXG4gICAgICAgICAgICBjb25zdCBwZXJjZW50ID0gKDEwMCAtIGRhdGFQZXJjZW50KSAvIDEwMDtcclxuICAgICAgICAgICAgY2lyY2xlLnN0eWxlLnN0cm9rZURhc2hvZmZzZXQgPSBgY2FsYygyKjMwKjMuMTQqJHtwZXJjZW50fSlgO1xyXG4gICAgICAgICAgICB0ZXh0LnRleHRDb250ZW50ID0gZGF0YVBlcmNlbnQ7XHJcbiAgICAgICAgfSk7XHJcbiAgICB9XHJcblxyXG4gICAgc2V0UGVyY2VudCgpO1xyXG5cclxuICAgIGRvY3VtZW50LmFkZEV2ZW50TGlzdGVuZXIoXCJibHVyXCIsIGZ1bmN0aW9uIChlKSB7XHJcbiAgICAgICAgaWYgKGUudGFyZ2V0LmNsYXNzTGlzdC5jb250YWlucygnY29udGFjdC1mb3JtX19maWVsZCcpIHx8IGUudGFyZ2V0LmNsYXNzTGlzdC5jb250YWlucygnY29udGFjdC1mb3JtX19tZXNzYWdlJykpIHtcclxuICAgICAgICAgICAgaWYgKGUudGFyZ2V0LnZhbHVlLnRyaW0oKSAhPSAnJykge1xyXG4gICAgICAgICAgICAgICAgZS50YXJnZXQubmV4dEVsZW1lbnRTaWJsaW5nLmNsYXNzTGlzdC5hZGQoJ2FjdGl2ZScpO1xyXG4gICAgICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICAgICAgZS50YXJnZXQubmV4dEVsZW1lbnRTaWJsaW5nLmNsYXNzTGlzdC5yZW1vdmUoJ2FjdGl2ZScpO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG4gICAgfSwgdHJ1ZSk7XHJcblxyXG4gICAgY29uc3QgcHJpY2VTbGlkZXIgPSAoKSA9PiB7XHJcbiAgICAgICAgY29uc3QgcmFuZ2VJbnB1dHMgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yQWxsKFwiLnByaWNlLXJhbmdlX19pbnB1dFwiKSxcclxuICAgICAgICAgICAgcHJpY2VJbnB1dHMgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yQWxsKFwiLnByaWNlLWlucHV0X19maWVsZFwiKSxcclxuICAgICAgICAgICAgcHJvZ3Jlc3MgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKFwiLnByaWNlLXNsaWRlcl9fcHJvZ3Jlc3NcIik7XHJcblxyXG4gICAgICAgIGxldCBwcmljZUdhcCA9IDUwMDtcclxuXHJcbiAgICAgICAgcHJpY2VJbnB1dHMuZm9yRWFjaCgocHJpY2VJbnB1dCkgPT4ge1xyXG4gICAgICAgICAgICBwcmljZUlucHV0LmFkZEV2ZW50TGlzdGVuZXIoXCJpbnB1dFwiLCAoZSkgPT4ge1xyXG4gICAgICAgICAgICAgICAgbGV0IG1pblZhbCA9IHBhcnNlSW50KHByaWNlSW5wdXRzWzBdLnZhbHVlKSxcclxuICAgICAgICAgICAgICAgICAgICBtYXhWYWwgPSBwYXJzZUludChwcmljZUlucHV0c1sxXS52YWx1ZSk7XHJcblxyXG4gICAgICAgICAgICAgICAgaWYgKG1heFZhbCAtIG1pblZhbCA+PSBwcmljZUdhcCAmJiBtYXhWYWwgPD0gNTAwMDApIHtcclxuICAgICAgICAgICAgICAgICAgICBpZiAoZS50YXJnZXQuY2xhc3NMaXN0LmNvbnRhaW5zKFwicHJpY2UtbWluXCIpKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHJhbmdlSW5wdXRzWzBdLnZhbHVlID0gbWluVmFsO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBwcm9ncmVzcy5zdHlsZS5sZWZ0ID0gKG1pblZhbCAvIHJhbmdlSW5wdXRzWzBdLm1heCkgKiAxMDAgKyBcIiVcIjtcclxuICAgICAgICAgICAgICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICByYW5nZUlucHV0c1sxXS52YWx1ZSA9IG1heFZhbDtcclxuICAgICAgICAgICAgICAgICAgICAgICAgcHJvZ3Jlc3Muc3R5bGUucmlnaHQgPSAxMDAgLSAobWF4VmFsIC8gcmFuZ2VJbnB1dHNbMV0ubWF4KSAqIDEwMCArIFwiJVwiO1xyXG4gICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgfSk7XHJcblxyXG4gICAgICAgIHJhbmdlSW5wdXRzLmZvckVhY2goKHJhbmdlSW5wdXQpID0+IHtcclxuICAgICAgICAgICAgcmFuZ2VJbnB1dC5hZGRFdmVudExpc3RlbmVyKFwiaW5wdXRcIiwgKGUpID0+IHtcclxuICAgICAgICAgICAgICAgIGxldCBtaW5WYWwgPSBwYXJzZUludChyYW5nZUlucHV0c1swXS52YWx1ZSksXHJcbiAgICAgICAgICAgICAgICAgICAgbWF4VmFsID0gcGFyc2VJbnQocmFuZ2VJbnB1dHNbMV0udmFsdWUpO1xyXG5cclxuICAgICAgICAgICAgICAgIGlmIChtYXhWYWwgLSBtaW5WYWwgPCBwcmljZUdhcCkge1xyXG4gICAgICAgICAgICAgICAgICAgIGlmIChlLnRhcmdldC5jbGFzc0xpc3QuY29udGFpbnMoXCJyYW5nZS1taW5cIikpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgcmFuZ2VJbnB1dHNbMF0udmFsdWUgPSBtYXhWYWwgLSBwcmljZUdhcDtcclxuICAgICAgICAgICAgICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICByYW5nZUlucHV0c1sxXS52YWx1ZSA9IG1pblZhbCArIHByaWNlR2FwO1xyXG4gICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgICAgICAgICAgcHJpY2VJbnB1dHNbMF0udmFsdWUgPSBtaW5WYWw7XHJcbiAgICAgICAgICAgICAgICAgICAgcHJpY2VJbnB1dHNbMV0udmFsdWUgPSBtYXhWYWw7XHJcbiAgICAgICAgICAgICAgICAgICAgcHJvZ3Jlc3Muc3R5bGUubGVmdCA9IChtaW5WYWwgLyByYW5nZUlucHV0c1swXS5tYXgpICogMTAwICsgXCIlXCI7XHJcbiAgICAgICAgICAgICAgICAgICAgcHJvZ3Jlc3Muc3R5bGUucmlnaHQgPSAxMDAgLSAobWF4VmFsIC8gcmFuZ2VJbnB1dHNbMV0ubWF4KSAqIDEwMCArIFwiJVwiO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB9KTtcclxuICAgICAgICB9KTtcclxuXHJcbiAgICAgICAgZnVuY3Rpb24gYWRkU3BhY2VzKHZhbHVlKSB7XHJcbiAgICAgICAgICAgIHZhbHVlID0gdmFsdWUucmVwbGFjZSgvIC9nLCAnJyk7XHJcbiAgICAgICAgICAgIHJldHVybiB2YWx1ZS5yZXBsYWNlKC9cXEIoPz0oXFxkezN9KSsoPyFcXGQpKS9nLCBcIiBcIik7XHJcbiAgICAgICAgfVxyXG4gICAgfTtcclxuXHJcbiAgICBwcmljZVNsaWRlcigpO1xyXG5cclxuICAgIGNvbnN0IHZpZXdBbGwgPSAoKSA9PiB7XHJcbiAgICAgICAgaWYgKGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3JBbGwoXCIuZmlsdGVyLXZpZXctYWxsXCIpLmxlbmd0aCA9PSAwKSByZXR1cm4gZmFsc2U7XHJcbiAgICAgICAgY29uc3QgZmlsdGVyTGlzdCA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3JBbGwoXCIuZmlsdGVyLWxpc3RcIik7XHJcbiAgICAgICAgY29uc3Qgdmlld0FsbCA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3JBbGwoXCIuZmlsdGVyLXZpZXctYWxsXCIpO1xyXG5cclxuICAgICAgICBmaWx0ZXJMaXN0LmZvckVhY2gobGlzdCA9PiB7XHJcbiAgICAgICAgICAgIGlmIChsaXN0LmNoaWxkcmVuLmxlbmd0aCA+IDUpIHtcclxuICAgICAgICAgICAgICAgIGNvbnN0IGl0ZW1zID0gbGlzdC5jaGlsZHJlbjtcclxuICAgICAgICAgICAgICAgIGNvbnN0IHZpZXdBbGwgPSBsaXN0Lm5leHRFbGVtZW50U2libGluZztcclxuICAgICAgICAgICAgICAgIGZvciAobGV0IGkgPSAwLCBsZW4gPSBpdGVtcy5sZW5ndGg7IGkgPCBsZW47IGkrKykge1xyXG4gICAgICAgICAgICAgICAgICAgIGlmIChpID49IDUpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgaXRlbXNbaV0uc3R5bGUuZGlzcGxheSA9IFwibm9uZVwiO1xyXG4gICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIHZpZXdBbGwuc3R5bGUuZGlzcGxheSA9IFwiYmxvY2tcIjtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH0pO1xyXG5cclxuICAgICAgICB2aWV3QWxsLmZvckVhY2goZWwgPT4ge1xyXG4gICAgICAgICAgICBlbC5hZGRFdmVudExpc3RlbmVyKFwiY2xpY2tcIiwgZnVuY3Rpb24gKCkge1xyXG4gICAgICAgICAgICAgICAgY29uc3QgZmlsdGVySXRlbXMgPSB0aGlzLnByZXZpb3VzRWxlbWVudFNpYmxpbmcuY2hpbGRyZW47XHJcbiAgICAgICAgICAgICAgICBjb25zdCBmaWx0ZXJDb250ZW50ID0gdGhpcy5jbG9zZXN0KFwiLmZpbHRlci1jb250ZW50XCIpO1xyXG4gICAgICAgICAgICAgICAgZm9yIChsZXQgaSA9IDAsIGxlbiA9IGZpbHRlckl0ZW1zLmxlbmd0aDsgaSA8IGxlbjsgaSsrKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgaWYgKGkgPj0gNSkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBpZiAoZmlsdGVySXRlbXNbaV0uc3R5bGUuZGlzcGxheSkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgZmlsdGVySXRlbXNbaV0uc3R5bGUuZGlzcGxheSA9IG51bGw7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB0aGlzLnRleHRDb250ZW50ID0gXCJIaWRlXCJcclxuICAgICAgICAgICAgICAgICAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGZpbHRlckl0ZW1zW2ldLnN0eWxlLmRpc3BsYXkgPSBcIm5vbmVcIjtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMudGV4dENvbnRlbnQgPSBcIlZpZXcgYWxsXCJcclxuICAgICAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIGZpbHRlckNvbnRlbnQuc3R5bGUubWF4SGVpZ2h0ID0gZmlsdGVyQ29udGVudC5zY3JvbGxIZWlnaHQgKyBcInB4XCI7XHJcbiAgICAgICAgICAgIH0pO1xyXG4gICAgICAgIH0pO1xyXG4gICAgfVxyXG5cclxuICAgIHZpZXdBbGwoKTtcclxuXHJcbiAgICBjb25zdCBpbnB1dFZhbHVlID0gKCkgPT4ge1xyXG4gICAgICAgIGNvbnN0IGlucHV0RmllbGQgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKFwiLnByb2R1Y3QtY29tcGFyZS1mb3JtX19maWVsZFwiKTtcclxuICAgICAgICBjb25zdCBhZGRWYWx1ZUJ0bnMgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yQWxsKFwiLmpzLWNvbXBhcmVcIik7XHJcbiAgICAgICAgYWRkVmFsdWVCdG5zLmZvckVhY2goYWRkVmFsdWVCdG4gPT4ge1xyXG4gICAgICAgICAgICBhZGRWYWx1ZUJ0bi5hZGRFdmVudExpc3RlbmVyKFwiY2xpY2tcIiwgZnVuY3Rpb24gKCkge1xyXG4gICAgICAgICAgICAgICAgY29uc3QgdmFsID0gdGhpcy5wcmV2aW91c0VsZW1lbnRTaWJsaW5nLnRleHRDb250ZW50O1xyXG4gICAgICAgICAgICAgICAgaW5wdXRGaWVsZC52YWx1ZSA9IHZhbDtcclxuICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgfSk7XHJcbiAgICB9XHJcblxyXG4gICAgaW5wdXRWYWx1ZSgpO1xyXG5cclxuICAgICQoXCIuanMtcHJvZHVjdC1zbGlkZXItcHJldmlld1wiKS5zbGljayh7XHJcbiAgICAgICAgc2xpZGVzVG9TaG93OiA0LFxyXG4gICAgICAgIHZlcnRpY2FsOiB0cnVlLFxyXG4gICAgICAgIHZlcnRpY2FsU3dpcGluZzogdHJ1ZSxcclxuICAgICAgICBzbGlkZXNUb1Njcm9sbDogMSxcclxuICAgICAgICBmb2N1c09uU2VsZWN0OiB0cnVlLFxyXG4gICAgICAgIHByZXZBcnJvdzogXCIucHJvZHVjdC1zbGlkZXItcHJldmlld19fYnRuLS1wcmV2XCIsXHJcbiAgICAgICAgbmV4dEFycm93OiBcIi5wcm9kdWN0LXNsaWRlci1wcmV2aWV3X19idG4tLW5leHRcIixcclxuICAgICAgICB2YXJpYWJsZVdpZHRoOiB0cnVlLFxyXG4gICAgICAgIGFzTmF2Rm9yOiBcIi5wcm9kdWN0LXNsaWRlci1tYWluXCJcclxuICAgIH0pO1xyXG4gICAgJChcIi5wcm9kdWN0LXNsaWRlci1tYWluXCIpLnNsaWNrKHtcclxuICAgICAgICBzbGlkZXNUb1Nob3c6IDEsXHJcbiAgICAgICAgc2xpZGVzVG9TY3JvbGw6IDEsXHJcbiAgICAgICAgYXJyb3dzOiBmYWxzZSxcclxuICAgICAgICBmYWRlOiB0cnVlLFxyXG4gICAgICAgIGFzTmF2Rm9yOiBcIi5qcy1wcm9kdWN0LXNsaWRlci1wcmV2aWV3XCJcclxuICAgIH0pO1xyXG4gICAgJChcIi5qcy1wcm9kdWN0LWNvbXBhcmUtc2xpZGVyXCIpLnNsaWNrKHtcclxuICAgICAgICBzbGlkZXNUb1Nob3c6IDEsXHJcbiAgICAgICAgc2xpZGVzVG9TY3JvbGw6IDEsXHJcbiAgICAgICAgcHJldkFycm93OiBcIi5wcm9kdWN0LWNvbXBhcmUtc2xpZGVyX19idG4tLXByZXZcIixcclxuICAgICAgICBuZXh0QXJyb3c6IFwiLnByb2R1Y3QtY29tcGFyZS1zbGlkZXJfX2J0bi0tbmV4dFwiLFxyXG4gICAgICAgIC8vIHZhcmlhYmxlV2lkdGg6IHRydWUsXHJcbiAgICB9KTtcclxuICAgICQoXCIuanMtcmVsYXRlZC1wcm9kdWN0cy1zbGlkZXJcIikuc2xpY2soe1xyXG4gICAgICAgIHNsaWRlc1RvU2hvdzogMyxcclxuICAgICAgICBzbGlkZXNUb1Njcm9sbDogMSxcclxuICAgICAgICBwcmV2QXJyb3c6IFwiLmpzLXJlbGF0ZWQtcHJldlwiLFxyXG4gICAgICAgIG5leHRBcnJvdzogXCIuanMtcmVsYXRlZC1uZXh0XCIsXHJcbiAgICAgICAgcmVzcG9uc2l2ZTogW1xyXG4gICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgICBicmVha3BvaW50OiA3NjgsXHJcbiAgICAgICAgICAgICAgICBzZXR0aW5nczoge1xyXG4gICAgICAgICAgICAgICAgICAgIHNsaWRlc1RvU2hvdzogMixcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgfSxcclxuICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgYnJlYWtwb2ludDogNTc2LFxyXG4gICAgICAgICAgICAgICAgc2V0dGluZ3M6IHtcclxuICAgICAgICAgICAgICAgICAgICBzbGlkZXNUb1Nob3c6IDEsXHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIH0sXHJcbiAgICAgICAgXVxyXG4gICAgfSk7XHJcbiAgICAkKFwiLmpzLXJlc2VudGx5LXZpZXdlZC1zbGlkZXJcIikuc2xpY2soe1xyXG4gICAgICAgIHNsaWRlc1RvU2hvdzogNCxcclxuICAgICAgICBzbGlkZXNUb1Njcm9sbDogMSxcclxuICAgICAgICBwcmV2QXJyb3c6IFwiLmpzLXJlc2VudGx5LXZpZXdlZC1wcmV2XCIsXHJcbiAgICAgICAgbmV4dEFycm93OiBcIi5qcy1yZXNlbnRseS12aWV3ZWQtbmV4dFwiLFxyXG4gICAgICAgIHJlc3BvbnNpdmU6IFtcclxuICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgYnJlYWtwb2ludDogOTkzLFxyXG4gICAgICAgICAgICAgICAgc2V0dGluZ3M6IHtcclxuICAgICAgICAgICAgICAgICAgICBzbGlkZXNUb1Nob3c6IDMsXHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIH0sXHJcbiAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICAgIGJyZWFrcG9pbnQ6IDc2OSxcclxuICAgICAgICAgICAgICAgIHNldHRpbmdzOiB7XHJcbiAgICAgICAgICAgICAgICAgICAgc2xpZGVzVG9TaG93OiAyLFxyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB9LFxyXG4gICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgICBicmVha3BvaW50OiA1NzcsXHJcbiAgICAgICAgICAgICAgICBzZXR0aW5nczoge1xyXG4gICAgICAgICAgICAgICAgICAgIHNsaWRlc1RvU2hvdzogMSxcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgfSxcclxuICAgICAgICBdXHJcbiAgICB9KTtcclxuICAgICQoJ2JvZHknKS5vbigna2V5dXAnLCAnLmpzLXNlYXJjaC1tYXRjaGVzJywgZnVuY3Rpb24gKCkge1xyXG4gICAgICAgIGxldCBzZWxmID0gJCh0aGlzKTtcclxuICAgICAgICBsZXQgbGlzdCA9ICQoJy4nICsgc2VsZi5kYXRhKCdsaXN0JykpO1xyXG4gICAgICAgICQuYWpheCh7XHJcbiAgICAgICAgICAgIHVybDogc2VsZi5kYXRhKCd1cmwnKSArICc/cT0nICsgc2VsZi52YWwoKSxcclxuICAgICAgICAgICAgdHlwZTogJ0dFVCcsXHJcbiAgICAgICAgICAgIGRhdGFUeXBlOiAnanNvbicsXHJcbiAgICAgICAgICAgIHN1Y2Nlc3M6IGZ1bmN0aW9uIChyZXNwb25zZSkge1xyXG4gICAgICAgICAgICAgICAgbGlzdC5lbXB0eSgpO1xyXG5cclxuICAgICAgICAgICAgICAgIGlmIChyZXNwb25zZS5pdGVtcy5sZW5ndGgpIHtcclxuICAgICAgICAgICAgICAgICAgICAkLmVhY2gocmVzcG9uc2UuaXRlbXMsIGZ1bmN0aW9uIChpLCBpdGVtKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGxpc3QuYXBwZW5kKGA8YSBjbGFzcz1cInNlYXJjaC1mb3JtLW1hdGNoZXNfX2xpbmtcIiBocmVmPVwiJHtpdGVtLnVybH1cIj4ke2l0ZW0udGl0bGV9PC9hPmApO1xyXG4gICAgICAgICAgICAgICAgICAgIH0pO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfSk7XHJcbiAgICB9KTtcclxufSkoKTsiXSwiZmlsZSI6Im1haW4uanMifQ==
