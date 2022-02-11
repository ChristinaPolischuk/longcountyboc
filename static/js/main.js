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

  var openModal = function openModal(btn, modal) {
    if (document.querySelector(btn) == null) return false;
    var modalBtn = document.querySelector(btn);
    var modalContainer = document.querySelector(modal);
    modalBtn.addEventListener("click", function () {
      document.body.classList.add("modal-active");
      modalContainer.classList.remove("out");
      modalContainer.classList.add("opened");
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

  openModal(".js-product-compare", ".js-modal-product-compare");
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
//# sourceMappingURL=data:application/json;charset=utf8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIm1haW4uanMiXSwibmFtZXMiOlsiY3JvcFRleHQiLCJoaWRlQmxvY2siLCJyZWFkTW9yZSIsImRvY3VtZW50IiwicXVlcnlTZWxlY3RvckFsbCIsImZvckVhY2giLCJlbCIsImFkZEV2ZW50TGlzdGVuZXIiLCJlbFRleHQiLCJpbm5lclRleHQiLCJoaWRkZW5UZXh0IiwicHJldmlvdXNFbGVtZW50U2libGluZyIsImNsYXNzTGlzdCIsInRvZ2dsZSIsIm1heCIsInRleHQiLCJzdHIiLCJ0cmltIiwibGVuZ3RoIiwic3ViU3RyIiwic3Vic3RyaW5nIiwiaGlkZGVuU3RyIiwiaW5uZXJIVE1MIiwic2hvd1JldmlldyIsImltYWdlcyIsIm5leHRFbGVtZW50U2libGluZyIsInByb2R1Y3RSZXZpZXciLCJwcm9kdWN0VGV4dCIsInF1ZXJ5U2VsZWN0b3IiLCJjcmVhdGVFbGVtZW50IiwiYWRkIiwidGV4dENvbnRlbnQiLCJhZnRlciIsImJlZm9yZSIsImFjY29yZGlvbiIsImUiLCJ0YXJnZXQiLCJjb250YWlucyIsImNsb3Nlc3QiLCJhY2NvcmRpb25Db250ZW50Iiwic3R5bGUiLCJtYXhIZWlnaHQiLCJnZXRDb21wdXRlZFN0eWxlIiwicGFyZW50RWxlbWVudCIsInJlbW92ZSIsInNjcm9sbEhlaWdodCIsInNpZGViYXJMaW5rcyIsImVsZW0iLCJuYXZiYXJMaW5rQ2xpY2siLCJldmVudCIsInNtb290aFNjcm9sbCIsInByZXZlbnREZWZhdWx0IiwidGFyZ2V0SWQiLCJjdXJyZW50VGFyZ2V0IiwiZ2V0QXR0cmlidXRlIiwid2luZG93Iiwic2NyZWVuIiwid2lkdGgiLCJzY3JvbGxUbyIsInRvcCIsIm9mZnNldFRvcCIsImJlaGF2aW9yIiwidG9nZ2xlRml4ZWQiLCJ0aHJvdHRsZSIsInRyYWNrU2Nyb2xsIiwiZWxlbWVudHMiLCJzdGlja3lCbG9ja3MiLCJwYWdlWU9mZnNldCIsInN0aWNreUJsb2NrQ29vcmRzIiwiZ2V0Qm91bmRpbmdDbGllbnRSZWN0IiwiYm90dG9tIiwidHlwZSIsIm5hbWUiLCJvYmoiLCJydW5uaW5nIiwiZnVuYyIsInJlcXVlc3RBbmltYXRpb25GcmFtZSIsImRpc3BhdGNoRXZlbnQiLCJDdXN0b21FdmVudCIsImVsZW1lbnQiLCJmaXhlZFdpZHRoIiwiY2xpZW50V2lkdGgiLCJzaG93SGlkZVNpZGViYXJGaWx0ZXJzIiwic2hvd0hpZGVGaWx0ZXJzIiwic2lkZWJhckZpbHRlcnMiLCJmaWx0ZXIiLCJ0cmlnZ2VyIiwibW9iaWxlTmF2IiwiaXNDbG9zZWQiLCJidXJnZXJUaW1lIiwic2VhcmNoQnRuIiwidmFsdWUiLCJwcm9kdWN0UmV2aWV3U3RhcnMiLCJkYXRhUmF0aW5nIiwic3RhcnMiLCJjaGlsZHJlbiIsImkiLCJjaG9vc2VSYXRpbmciLCJyYXRpbmciLCJyYXRpbmdTdGFycyIsInJlbW92ZUNsYXNzIiwibW91c2VPdmVyQWN0aXZlQ2xhc3MiLCJhZGRDbGFzcyIsIm1vdXNlT3V0QWN0aXZlQ2xhc3MiLCJhcnIiLCJpTGVuZyIsImoiLCJhcmd1bWVudHMiLCJpTGVuIiwiY2FyZXREcm9wZG93biIsImZpcnN0RWxlbWVudENoaWxkIiwiZHJvcGRvd24iLCJvcGFjaXR5IiwiYmFzaWNTY3JvbGxUb3AiLCJidG5Ub3AiLCJidG5SZXZlYWwiLCJzY3JvbGxZIiwiVG9wc2Nyb2xsVG8iLCJzZXRUaW1lb3V0Iiwib3Blbk1vZGFsIiwiYnRuIiwibW9kYWwiLCJtb2RhbEJ0biIsIm1vZGFsQ29udGFpbmVyIiwiYm9keSIsImtleUNvZGUiLCJzZWVNb3JlIiwibnVtYmVyIiwiYnV0dG9uIiwic2hvd0hpZGVCbG9ja3MiLCJpbmRleCIsImRpc3BsYXkiLCJlbGVtcyIsImJ0blNob3dIaWRlIiwic2hvd0l0ZW1zIiwibnVtYmVyRGVza3RvcCIsIm51bWJlck1vYmlsZSIsIml0ZW1zIiwic2hvd0hpZGVJdGVtcyIsImVscyIsInNob3dGb290ZXJMaW5rcyIsImZvb3RlclRpdGxlIiwiZm9vdGVyTGlua3MiLCJmb290ZXJMaW5rIiwidGl0bGUiLCJzZXRQZXJjZW50IiwiY2lyY3VsYXJQcm9ncmVzcyIsIml0ZW0iLCJjaXJjbGUiLCJkYXRhUGVyY2VudCIsInBlcmNlbnQiLCJzdHJva2VEYXNob2Zmc2V0IiwicHJpY2VTbGlkZXIiLCJyYW5nZUlucHV0cyIsInByaWNlSW5wdXRzIiwicHJvZ3Jlc3MiLCJwcmljZUdhcCIsInByaWNlSW5wdXQiLCJtaW5WYWwiLCJwYXJzZUludCIsIm1heFZhbCIsImxlZnQiLCJyaWdodCIsInJhbmdlSW5wdXQiLCJhZGRTcGFjZXMiLCJyZXBsYWNlIiwidmlld0FsbCIsImZpbHRlckxpc3QiLCJsaXN0IiwibGVuIiwiZmlsdGVySXRlbXMiLCJmaWx0ZXJDb250ZW50IiwiaW5wdXRWYWx1ZSIsImlucHV0RmllbGQiLCJhZGRWYWx1ZUJ0bnMiLCJhZGRWYWx1ZUJ0biIsInZhbCIsIiQiLCJzbGljayIsInNsaWRlc1RvU2hvdyIsInZlcnRpY2FsIiwidmVydGljYWxTd2lwaW5nIiwic2xpZGVzVG9TY3JvbGwiLCJmb2N1c09uU2VsZWN0IiwicHJldkFycm93IiwibmV4dEFycm93IiwidmFyaWFibGVXaWR0aCIsImFzTmF2Rm9yIiwiYXJyb3dzIiwiZmFkZSIsInJlc3BvbnNpdmUiLCJicmVha3BvaW50Iiwic2V0dGluZ3MiLCJvbiIsInNlbGYiLCJkYXRhIiwiYWpheCIsInVybCIsImRhdGFUeXBlIiwic3VjY2VzcyIsInJlc3BvbnNlIiwiZW1wdHkiLCJlYWNoIiwiYXBwZW5kIl0sIm1hcHBpbmdzIjoiOztBQUFBOztBQUNBLENBQUMsWUFBWTtBQUNUQSxFQUFBQSxRQUFRO0FBQ1JDLEVBQUFBLFNBQVM7QUFFVCxNQUFJQyxRQUFRLEdBQUdDLFFBQVEsQ0FBQ0MsZ0JBQVQsQ0FBMEIsZUFBMUIsQ0FBZjtBQUVBRixFQUFBQSxRQUFRLENBQUNHLE9BQVQsQ0FBaUIsVUFBQUMsRUFBRSxFQUFJO0FBQ25CQSxJQUFBQSxFQUFFLENBQUNDLGdCQUFILENBQW9CLE9BQXBCLEVBQTZCLFlBQU07QUFDL0IsVUFBSUMsTUFB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Iiwic291cmNlc0NvbnRlbnQiOlsiO1xyXG4oZnVuY3Rpb24gKCkge1xyXG4gICAgY3JvcFRleHQoKTtcclxuICAgIGhpZGVCbG9jaygpO1xyXG5cclxuICAgIGxldCByZWFkTW9yZSA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3JBbGwoJy5qcy1yZWFkLW1vcmUnKTtcclxuXHJcbiAgICByZWFkTW9yZS5mb3JFYWNoKGVsID0+IHtcclxuICAgICAgICBlbC5hZGRFdmVudExpc3RlbmVyKCdjbGljaycsICgpID0+IHtcclxuICAgICAgICAgICAgbGV0IGVsVGV4dCA9IGVsLmlubmVyVGV4dDtcclxuICAgICAgICAgICAgbGV0IGhpZGRlblRleHQgPSBlbC5wcmV2aW91c0VsZW1lbnRTaWJsaW5nO1xyXG5cclxuICAgICAgICAgICAgZWwuaW5uZXJUZXh0ID0gZWxUZXh0ID09ICdyZWFkIG1vcmUgPicgPyAnaGlkZScgOiAncmVhZCBtb3JlID4nO1xyXG4gICAgICAgICAgICBoaWRkZW5UZXh0LmNsYXNzTGlzdC50b2dnbGUoJ3Nob3cnKTtcclxuICAgICAgICB9KTtcclxuICAgIH0pO1xyXG5cclxuICAgIGZ1bmN0aW9uIGNyb3BUZXh0KCkge1xyXG4gICAgICAgIGxldCBtYXggPSAyMDA7XHJcbiAgICAgICAgbGV0IHRleHQgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yQWxsKCcuanMtcmVhZC1tb3JlLXRleHQnKTtcclxuICAgICAgICB0ZXh0LmZvckVhY2goZWwgPT4ge1xyXG4gICAgICAgICAgICBsZXQgc3RyID0gZWwuaW5uZXJUZXh0LnRyaW0oKTtcclxuICAgICAgICAgICAgaWYgKHN0ci5sZW5ndGggPiBtYXgpIHtcclxuICAgICAgICAgICAgICAgIGxldCBzdWJTdHIgPSBzdHIuc3Vic3RyaW5nKDAsIG1heCk7XHJcbiAgICAgICAgICAgICAgICBsZXQgaGlkZGVuU3RyID0gc3RyLnN1YnN0cmluZyhtYXgsIHN0ci5sZW5ndGgpO1xyXG4gICAgICAgICAgICAgICAgZWwuaW5uZXJUZXh0ID0gc3ViU3RyO1xyXG4gICAgICAgICAgICAgICAgZWwuaW5uZXJIVE1MICs9IGA8c3BhbiBjbGFzcz1cImhpZGRlbi10ZXh0IGpzLWhpZGRlbi10ZXh0XCI+JHtoaWRkZW5TdHJ9PC9zcGFuPmA7XHJcbiAgICAgICAgICAgICAgICBlbC5pbm5lckhUTUwgKz0gJzxzcGFuIGNsYXNzPVwicmVhZC1tb3JlIGpzLXJlYWQtbW9yZVwiPnJlYWQgbW9yZSA+PC9zcGFuPic7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9KTtcclxuICAgIH1cclxuXHJcbiAgICBsZXQgc2hvd1JldmlldyA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3JBbGwoJy5qcy1zaG93LXJldmlldycpO1xyXG5cclxuICAgIHNob3dSZXZpZXcuZm9yRWFjaChlbCA9PiB7XHJcbiAgICAgICAgZWwuYWRkRXZlbnRMaXN0ZW5lcignY2xpY2snLCAoKSA9PiB7XHJcbiAgICAgICAgICAgIGxldCBlbFRleHQgPSBlbC5pbm5lclRleHQ7XHJcbiAgICAgICAgICAgIGxldCBoaWRkZW5UZXh0ID0gZWwucHJldmlvdXNFbGVtZW50U2libGluZztcclxuICAgICAgICAgICAgbGV0IGltYWdlcyA9IGVsLm5leHRFbGVtZW50U2libGluZztcclxuXHJcbiAgICAgICAgICAgIGVsLmlubmVyVGV4dCA9IGVsVGV4dCA9PSAncmVhZCBtb3JlID4nID8gJzwgaGlkZScgOiAncmVhZCBtb3JlID4nO1xyXG4gICAgICAgICAgICBoaWRkZW5UZXh0LmNsYXNzTGlzdC50b2dnbGUoJ3Nob3cnKTtcclxuICAgICAgICAgICAgaW1hZ2VzLmNsYXNzTGlzdC50b2dnbGUoXCJzaG93XCIpO1xyXG4gICAgICAgIH0pO1xyXG4gICAgfSk7XHJcblxyXG4gICAgZnVuY3Rpb24gaGlkZUJsb2NrKCkge1xyXG4gICAgICAgIGxldCBtYXggPSAxMjg7XHJcbiAgICAgICAgbGV0IHByb2R1Y3RSZXZpZXcgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yQWxsKCcuanMtaGlkZS1yZXZpZXcnKTtcclxuICAgICAgICBwcm9kdWN0UmV2aWV3LmZvckVhY2goZWwgPT4ge1xyXG4gICAgICAgICAgICBsZXQgcHJvZHVjdFRleHQgPSBlbC5xdWVyeVNlbGVjdG9yKFwiLnBhZ2UtdGV4dFwiKTtcclxuICAgICAgICAgICAgbGV0IHN0ciA9IHByb2R1Y3RUZXh0LmlubmVyVGV4dC50cmltKCk7XHJcbiAgICAgICAgICAgIGxldCBpbWFnZXMgPSBlbC5xdWVyeVNlbGVjdG9yKCcucHJvZHVjdC1yZXZpZXdfX2ltYWdlcycpO1xyXG4gICAgICAgICAgICBpZiAoc3RyLmxlbmd0aCA+IG1heCkge1xyXG4gICAgICAgICAgICAgICAgbGV0IHN1YlN0ciA9IHN0ci5zdWJzdHJpbmcoMCwgbWF4KTtcclxuICAgICAgICAgICAgICAgIGxldCBoaWRkZW5TdHIgPSBzdHIuc3Vic3RyaW5nKG1heCwgc3RyLmxlbmd0aCk7XHJcbiAgICAgICAgICAgICAgICBwcm9kdWN0VGV4dC5pbm5lclRleHQgPSBzdWJTdHI7XHJcblxyXG4gICAgICAgICAgICAgICAgbGV0IGhpZGRlblRleHQgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdzcGFuJyk7XHJcbiAgICAgICAgICAgICAgICBoaWRkZW5UZXh0LmNsYXNzTGlzdC5hZGQoJ2hpZGRlbi10ZXh0JywgJ3BhZ2UtdGV4dCcsICdqcy1oaWRkZW4tdGV4dCcpO1xyXG4gICAgICAgICAgICAgICAgaGlkZGVuVGV4dC50ZXh0Q29udGVudCA9IGhpZGRlblN0cjtcclxuXHJcbiAgICAgICAgICAgICAgICBwcm9kdWN0VGV4dC5hZnRlcihoaWRkZW5UZXh0KTtcclxuXHJcbiAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgIGxldCByZWFkTW9yZSA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ3NwYW4nKTtcclxuICAgICAgICAgICAgcmVhZE1vcmUuY2xhc3NMaXN0LmFkZCgncmVhZC1tb3JlJywgJ2pzLXNob3ctcmV2aWV3Jyk7XHJcbiAgICAgICAgICAgIHJlYWRNb3JlLnRleHRDb250ZW50ID0gJ3JlYWQgbW9yZSA+JztcclxuXHJcbiAgICAgICAgICAgIGltYWdlcy5iZWZvcmUocmVhZE1vcmUpO1xyXG4gICAgICAgIH0pO1xyXG4gICAgfVxyXG5cclxuICAgIGNvbnN0IGFjY29yZGlvbiA9ICgpID0+IHtcclxuICAgICAgICBkb2N1bWVudC5hZGRFdmVudExpc3RlbmVyKCdjbGljaycsIGUgPT4ge1xyXG4gICAgICAgICAgICBpZiAoZS50YXJnZXQuY2xhc3NMaXN0LmNvbnRhaW5zKCdqcy1hY2NvcmRpb24nKSB8fCBlLnRhcmdldC5jbG9zZXN0KCcuanMtYWNjb3JkaW9uJykpIHtcclxuICAgICAgICAgICAgICAgIGNvbnN0IGFjY29yZGlvbiA9IGUudGFyZ2V0LmNsYXNzTGlzdC5jb250YWlucygnanMtYWNjb3JkaW9uJykgPyBlLnRhcmdldCA6IGUudGFyZ2V0LmNsb3Nlc3QoJy5qcy1hY2NvcmRpb24nKTtcclxuICAgICAgICAgICAgICAgIGNvbnN0IGFjY29yZGlvbkNvbnRlbnQgPSBhY2NvcmRpb24ubmV4dEVsZW1lbnRTaWJsaW5nO1xyXG4gICAgICAgICAgICAgICAgaWYgKGFjY29yZGlvbkNvbnRlbnQuc3R5bGUubWF4SGVpZ2h0IHx8IGdldENvbXB1dGVkU3R5bGUoYWNjb3JkaW9uQ29udGVudCkubWF4SGVpZ2h0ID09IFwibWF4LWNvbnRlbnRcIikge1xyXG4gICAgICAgICAgICAgICAgICAgIGFjY29yZGlvbi5wYXJlbnRFbGVtZW50LmNsYXNzTGlzdC5yZW1vdmUoXCJhY3RpdmVcIik7XHJcbiAgICAgICAgICAgICAgICAgICAgYWNjb3JkaW9uQ29udGVudC5zdHlsZS5tYXhIZWlnaHQgPSBudWxsO1xyXG4gICAgICAgICAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgICAgICAgICBhY2NvcmRpb24ucGFyZW50RWxlbWVudC5jbGFzc0xpc3QuYWRkKFwiYWN0aXZlXCIpO1xyXG4gICAgICAgICAgICAgICAgICAgIGFjY29yZGlvbkNvbnRlbnQuc3R5bGUubWF4SGVpZ2h0ID0gYWNjb3JkaW9uQ29udGVudC5zY3JvbGxIZWlnaHQgKyBcInB4XCI7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9KTtcclxuICAgIH1cclxuICAgIGFjY29yZGlvbigpO1xyXG5cclxuICAgIGNvbnN0IHNpZGViYXJMaW5rcyA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3JBbGwoXCIuc2lkZWJhci1tZW51X19saW5rXCIpO1xyXG5cclxuICAgIHNpZGViYXJMaW5rcy5mb3JFYWNoKGVsZW0gPT4gZWxlbS5hZGRFdmVudExpc3RlbmVyKFwiY2xpY2tcIiwgbmF2YmFyTGlua0NsaWNrKSk7XHJcblxyXG4gICAgZnVuY3Rpb24gbmF2YmFyTGlua0NsaWNrKGV2ZW50KSB7XHJcbiAgICAgICAgc21vb3RoU2Nyb2xsKGV2ZW50KTtcclxuICAgIH1cclxuXHJcbiAgICBmdW5jdGlvbiBzbW9vdGhTY3JvbGwoZXZlbnQpIHtcclxuICAgICAgICBldmVudC5wcmV2ZW50RGVmYXVsdCgpO1xyXG4gICAgICAgIGNvbnN0IHRhcmdldElkID0gZXZlbnQuY3VycmVudFRhcmdldC5nZXRBdHRyaWJ1dGUoXCJocmVmXCIpO1xyXG4gICAgICAgIGlmICh3aW5kb3cuc2NyZWVuLndpZHRoID4gMTAyNCkge1xyXG4gICAgICAgICAgICB3aW5kb3cuc2Nyb2xsVG8oe1xyXG4gICAgICAgICAgICAgICAgdG9wOiB0YXJnZXRJZCA9PT0gXCIjXCIgPyAwIDogZG9jdW1lbnQucXVlcnlTZWxlY3Rvcih0YXJnZXRJZCkub2Zmc2V0VG9wIC0gMTAwLFxyXG4gICAgICAgICAgICAgICAgYmVoYXZpb3I6IFwic21vb3RoXCJcclxuICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgd2luZG93LnNjcm9sbFRvKHtcclxuICAgICAgICAgICAgICAgIHRvcDogdGFyZ2V0SWQgPT09IFwiI1wiID8gMCA6IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IodGFyZ2V0SWQpLm9mZnNldFRvcCAtIDIwMCxcclxuICAgICAgICAgICAgICAgIGJlaGF2aW9yOiBcInNtb290aFwiXHJcbiAgICAgICAgICAgIH0pO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxuXHJcbiAgICBpZiAoZG9jdW1lbnQucXVlcnlTZWxlY3RvcignLnByb2R1Y3RzLXN0aWNreScpICE9PSBudWxsKSB7XHJcblxyXG4gICAgICAgIHdpbmRvdy5hZGRFdmVudExpc3RlbmVyKCdvcHRpbWl6ZWRSZXNpemUnLCAoKSA9PiB7XHJcbiAgICAgICAgICAgIHRvZ2dsZUZpeGVkKCcucHJvZHVjdHMtc3RpY2t5Jyk7XHJcbiAgICAgICAgfSk7XHJcblxyXG5cclxuICAgICAgICB0b2dnbGVGaXhlZCgnLnByb2R1Y3RzLXN0aWNreScpO1xyXG5cclxuICAgICAgICB0aHJvdHRsZShcInJlc2l6ZVwiLCBcIm9wdGltaXplZFJlc2l6ZVwiKTtcclxuXHJcbiAgICB9XHJcblxyXG4gICAgaWYgKGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJy5zdGlja3ktYmxvY2snKSAhPT0gbnVsbCkge1xyXG4gICAgICAgIGxldCBzdGlja3lCbG9ja0Nvb3JkcyA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJy5zdGlja3ktYmxvY2snKS5nZXRCb3VuZGluZ0NsaWVudFJlY3QoKS5ib3R0b20gKyB3aW5kb3cucGFnZVlPZmZzZXQ7XHJcblxyXG4gICAgICAgIHdpbmRvdy5hZGRFdmVudExpc3RlbmVyKFwic2Nyb2xsXCIsIGZ1bmN0aW9uICgpIHtcclxuICAgICAgICAgICAgdHJhY2tTY3JvbGwoJy5zdGlja3ktYmxvY2snKTtcclxuICAgICAgICB9KTtcclxuXHJcbiAgICAgICAgZnVuY3Rpb24gdHJhY2tTY3JvbGwoZWxlbWVudHMpIHtcclxuICAgICAgICAgICAgbGV0IHN0aWNreUJsb2NrcyA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3JBbGwoZWxlbWVudHMpO1xyXG4gICAgICAgICAgICBzdGlja3lCbG9ja3MuZm9yRWFjaChlbCA9PiB7XHJcbiAgICAgICAgICAgICAgICBpZiAoZWwuY2xhc3NMaXN0LmNvbnRhaW5zKCdzaG93JykgJiYgd2luZG93LnBhZ2VZT2Zmc2V0IDwgc3RpY2t5QmxvY2tDb29yZHMpIHtcclxuICAgICAgICAgICAgICAgICAgICBlbC5jbGFzc0xpc3QucmVtb3ZlKCdzaG93Jyk7XHJcbiAgICAgICAgICAgICAgICB9IGVsc2UgaWYgKHdpbmRvdy5wYWdlWU9mZnNldCA+IHN0aWNreUJsb2NrQ29vcmRzKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgZWwuY2xhc3NMaXN0LmFkZCgnc2hvdycpO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB9KTtcclxuICAgICAgICB9XHJcbiAgICB9XHJcblxyXG4gICAgZnVuY3Rpb24gdGhyb3R0bGUodHlwZSwgbmFtZSwgb2JqKSB7XHJcbiAgICAgICAgb2JqID0gb2JqIHx8IHdpbmRvdztcclxuICAgICAgICB2YXIgcnVubmluZyA9IGZhbHNlO1xyXG4gICAgICAgIHZhciBmdW5jID0gZnVuY3Rpb24gKCkge1xyXG4gICAgICAgICAgICBpZiAocnVubmluZykge1xyXG4gICAgICAgICAgICAgICAgcmV0dXJuO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIHJ1bm5pbmcgPSB0cnVlO1xyXG4gICAgICAgICAgICByZXF1ZXN0QW5pbWF0aW9uRnJhbWUoZnVuY3Rpb24gKCkge1xyXG4gICAgICAgICAgICAgICAgb2JqLmRpc3BhdGNoRXZlbnQobmV3IEN1c3RvbUV2ZW50KG5hbWUpKTtcclxuICAgICAgICAgICAgICAgIHJ1bm5pbmcgPSBmYWxzZTtcclxuICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgfTtcclxuICAgICAgICBvYmouYWRkRXZlbnRMaXN0ZW5lcih0eXBlLCBmdW5jKTtcclxuICAgIH07XHJcblxyXG4gICAgZnVuY3Rpb24gdG9nZ2xlRml4ZWQoZWwpIHtcclxuICAgICAgICBsZXQgZWxlbWVudCA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoZWwpO1xyXG4gICAgICAgIGxldCBmaXhlZFdpZHRoID0gd2luZG93LnNjcmVlbi53aWR0aCA+IDEwMjQgPyBlbGVtZW50LnBhcmVudEVsZW1lbnQuY2xpZW50V2lkdGggLSAyODUgOiBlbGVtZW50LnBhcmVudEVsZW1lbnQuY2xpZW50V2lkdGg7XHJcbiAgICAgICAgZWxlbWVudC5zdHlsZS53aWR0aCA9IGZpeGVkV2lkdGggKyAncHgnO1xyXG5cclxuICAgIH1cclxuXHJcbiAgICBjb25zdCBzaG93SGlkZVNpZGViYXJGaWx0ZXJzID0gKCkgPT4ge1xyXG4gICAgICAgIGlmIChkb2N1bWVudC5xdWVyeVNlbGVjdG9yQWxsKFwiLmZpbHRlclwiKS5sZW5ndGggPT0gMCkgcmV0dXJuIGZhbHNlO1xyXG5cclxuICAgICAgICB3aW5kb3cuYWRkRXZlbnRMaXN0ZW5lcihcImxvYWRcIiwgc2hvd0hpZGVGaWx0ZXJzKTtcclxuICAgICAgICB3aW5kb3cuYWRkRXZlbnRMaXN0ZW5lcihcInJlc2l6ZVwiLCBzaG93SGlkZUZpbHRlcnMpO1xyXG5cclxuICAgICAgICBmdW5jdGlvbiBzaG93SGlkZUZpbHRlcnMoKSB7XHJcbiAgICAgICAgICAgIGNvbnN0IHNpZGViYXJGaWx0ZXJzID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvckFsbChcIi5maWx0ZXJcIik7XHJcblxyXG4gICAgICAgICAgICBpZiAod2luZG93LnNjcmVlbi53aWR0aCA8PSAxMDI0KSB7XHJcbiAgICAgICAgICAgICAgICBzaWRlYmFyRmlsdGVycy5mb3JFYWNoKGZpbHRlciA9PiB7XHJcbiAgICAgICAgICAgICAgICAgICAgZmlsdGVyLmNsYXNzTGlzdC5yZW1vdmUoXCJhY3RpdmVcIik7XHJcbiAgICAgICAgICAgICAgICB9KTtcclxuICAgICAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgICAgIHNpZGViYXJGaWx0ZXJzLmZvckVhY2goZmlsdGVyID0+IHtcclxuICAgICAgICAgICAgICAgICAgICBmaWx0ZXIuY2xhc3NMaXN0LmFkZChcImFjdGl2ZVwiKTtcclxuICAgICAgICAgICAgICAgIH0pO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG5cclxuICAgIHNob3dIaWRlU2lkZWJhckZpbHRlcnMoKTtcclxuXHJcbiAgICAvLyBoYW1idXJnZXIgb3Blbi9jbG9zZSBhbmltYXRpb25cclxuICAgIGNvbnN0IHRyaWdnZXIgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKFwiI2hhbWJ1cmdlclwiKTtcclxuICAgIGNvbnN0IG1vYmlsZU5hdiA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoXCIjbW9iaWxlLW5hdlwiKTtcclxuICAgIGxldCBpc0Nsb3NlZCA9IHRydWU7XHJcblxyXG4gICAgdHJpZ2dlci5hZGRFdmVudExpc3RlbmVyKFwiY2xpY2tcIiwgYnVyZ2VyVGltZSk7XHJcblxyXG4gICAgZnVuY3Rpb24gYnVyZ2VyVGltZSgpIHtcclxuICAgICAgICBpZiAoaXNDbG9zZWQgPT0gdHJ1ZSkge1xyXG4gICAgICAgICAgICB0cmlnZ2VyLmNsYXNzTGlzdC5yZW1vdmUoXCJpcy1vcGVuXCIpO1xyXG4gICAgICAgICAgICB0cmlnZ2VyLmNsYXNzTGlzdC5hZGQoXCJpcy1jbG9zZWRcIik7XHJcbiAgICAgICAgICAgIG1vYmlsZU5hdi5jbGFzc0xpc3QuYWRkKCdpcy1vcGVuJyk7XHJcbiAgICAgICAgICAgIGlzQ2xvc2VkID0gZmFsc2U7XHJcbiAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgdHJpZ2dlci5jbGFzc0xpc3QucmVtb3ZlKFwiaXMtY2xvc2VkXCIpO1xyXG4gICAgICAgICAgICB0cmlnZ2VyLmNsYXNzTGlzdC5hZGQoXCJpcy1vcGVuXCIpO1xyXG4gICAgICAgICAgICBtb2JpbGVOYXYuY2xhc3NMaXN0LnJlbW92ZSgnaXMtb3BlbicpO1xyXG4gICAgICAgICAgICBpc0Nsb3NlZCA9IHRydWU7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG5cclxuICAgIC8vIHNlYXJjaCBmb3JtIG9wZW4vY2xvc2UgYW5pbWF0aW9uXHJcbiAgICBjb25zdCBzZWFyY2hCdG4gPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKFwiLnNlYXJjaC1mb3JtX19idG5cIik7XHJcbiAgICBzZWFyY2hCdG4uYWRkRXZlbnRMaXN0ZW5lcihcImNsaWNrXCIsIGZ1bmN0aW9uICgpIHtcclxuICAgICAgICB0aGlzLmNsYXNzTGlzdC50b2dnbGUoXCJjbG9zZVwiKTtcclxuICAgICAgICB0aGlzLnBhcmVudEVsZW1lbnQuY2xhc3NMaXN0LnRvZ2dsZShcImluY2xpY2tlZFwiKTtcclxuICAgICAgICB0aGlzLnByZXZpb3VzRWxlbWVudFNpYmxpbmcudmFsdWUgPSBcIlwiO1xyXG4gICAgfSk7XHJcblxyXG4gICAgY29uc3QgcHJvZHVjdFJldmlld1N0YXJzID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvckFsbChcIi5qcy1wcm9kdWN0LXJldmlldy1yYXRpbmdcIik7XHJcbiAgICBwcm9kdWN0UmV2aWV3U3RhcnMuZm9yRWFjaChmdW5jdGlvbiAoZWwpIHtcclxuICAgICAgICBjb25zdCBkYXRhUmF0aW5nID0gZWwuZ2V0QXR0cmlidXRlKFwiZGF0YS1yYXRpbmdcIik7XHJcbiAgICAgICAgY29uc3Qgc3RhcnMgPSBlbC5jaGlsZHJlbjtcclxuICAgICAgICBmb3IgKGxldCBpID0gMDsgaSA8IGRhdGFSYXRpbmc7IGkrKykge1xyXG4gICAgICAgICAgICBzdGFyc1tpXS5jbGFzc0xpc3QuYWRkKFwiYWN0aXZlXCIpO1xyXG4gICAgICAgIH1cclxuICAgIH0pO1xyXG5cclxuICAgIGNvbnN0IGNob29zZVJhdGluZyA9ICgpID0+IHtcclxuICAgICAgICBpZiAoZG9jdW1lbnQucXVlcnlTZWxlY3RvcihcIi5qcy1yYXRpbmdcIikgPT0gbnVsbCkgcmV0dXJuIGZhbHNlO1xyXG4gICAgICAgIGNvbnN0IHJhdGluZyA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoXCIuanMtcmF0aW5nXCIpLFxyXG4gICAgICAgICAgICByYXRpbmdTdGFycyA9IHJhdGluZy5jaGlsZHJlbjtcclxuICAgICAgICByYXRpbmcuYWRkRXZlbnRMaXN0ZW5lcihcImNsaWNrXCIsIChlKSA9PiB7XHJcbiAgICAgICAgICAgIGlmIChlLnRhcmdldC5jbGFzc0xpc3QuY29udGFpbnMoXCJyYXRpbmdfX3N0YXJcIikgfHwgZS50YXJnZXQuY2xvc2VzdChcIi5yYXRpbmdfX3N0YXJcIikpIHtcclxuICAgICAgICAgICAgICAgIGxldCB0YXJnZXQgPSBlLnRhcmdldC5jbGFzc0xpc3QuY29udGFpbnMoXCJyYXRpbmdfX3N0YXJcIikgPyBlLnRhcmdldCA6IGUudGFyZ2V0LmNsb3Nlc3QoXCIucmF0aW5nX19zdGFyXCIpO1xyXG4gICAgICAgICAgICAgICAgcmVtb3ZlQ2xhc3MocmF0aW5nU3RhcnMsIFwiY3VycmVudC1hY3RpdmVcIik7XHJcbiAgICAgICAgICAgICAgICB0YXJnZXQuY2xhc3NMaXN0LmFkZChcImFjdGl2ZVwiLCBcImN1cnJlbnQtYWN0aXZlXCIpO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfSk7XHJcbiAgICAgICAgcmF0aW5nLmFkZEV2ZW50TGlzdGVuZXIoXCJtb3VzZW92ZXJcIiwgKGUpID0+IHtcclxuICAgICAgICAgICAgaWYgKGUudGFyZ2V0LmNsYXNzTGlzdC5jb250YWlucyhcInJhdGluZ19fc3RhclwiKSB8fCBlLnRhcmdldC5jbG9zZXN0KFwiLnJhdGluZ19fc3RhclwiKSkge1xyXG4gICAgICAgICAgICAgICAgbGV0IHRhcmdldCA9IGUudGFyZ2V0LmNsYXNzTGlzdC5jb250YWlucyhcInJhdGluZ19fc3RhclwiKSA/IGUudGFyZ2V0IDogZS50YXJnZXQuY2xvc2VzdChcIi5yYXRpbmdfX3N0YXJcIik7XHJcbiAgICAgICAgICAgICAgICByZW1vdmVDbGFzcyhyYXRpbmdTdGFycywgXCJhY3RpdmVcIik7XHJcbiAgICAgICAgICAgICAgICB0YXJnZXQuY2xhc3NMaXN0LmFkZChcImFjdGl2ZVwiKTtcclxuICAgICAgICAgICAgICAgIG1vdXNlT3ZlckFjdGl2ZUNsYXNzKHJhdGluZ1N0YXJzKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH0pO1xyXG4gICAgICAgIHJhdGluZy5hZGRFdmVudExpc3RlbmVyKFwibW91c2VvdXRcIiwgKCkgPT4ge1xyXG4gICAgICAgICAgICBhZGRDbGFzcyhyYXRpbmdTdGFycywgXCJhY3RpdmVcIik7XHJcbiAgICAgICAgICAgIG1vdXNlT3V0QWN0aXZlQ2xhc3MocmF0aW5nU3RhcnMpO1xyXG4gICAgICAgIH0pO1xyXG5cclxuICAgICAgICBmdW5jdGlvbiBhZGRDbGFzcyhhcnIpIHtcclxuICAgICAgICAgICAgZm9yIChsZXQgaSA9IDAsIGlMZW5nID0gYXJyLmxlbmd0aDsgaSA8IGlMZW5nOyBpKyspIHtcclxuICAgICAgICAgICAgICAgIGZvciAobGV0IGogPSAxOyBqIDwgYXJndW1lbnRzLmxlbmd0aDsgaisrKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgcmF0aW5nU3RhcnNbaV0uY2xhc3NMaXN0LmFkZChhcmd1bWVudHNbal0pO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBmdW5jdGlvbiByZW1vdmVDbGFzcyhhcnIpIHtcclxuICAgICAgICAgICAgZm9yIChsZXQgaSA9IDAsIGlMZW5nID0gYXJyLmxlbmd0aDsgaSA8IGlMZW5nOyBpKyspIHtcclxuICAgICAgICAgICAgICAgIGZvciAobGV0IGogPSAxOyBqIDwgYXJndW1lbnRzLmxlbmd0aDsgaisrKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgcmF0aW5nU3RhcnNbaV0uY2xhc3NMaXN0LnJlbW92ZShhcmd1bWVudHNbal0pO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBmdW5jdGlvbiBtb3VzZU92ZXJBY3RpdmVDbGFzcyhhcnIpIHtcclxuICAgICAgICAgICAgZm9yIChsZXQgaSA9IDAsIGlMZW4gPSBhcnIubGVuZ3RoOyBpIDwgaUxlbjsgaSsrKSB7XHJcbiAgICAgICAgICAgICAgICBpZiAoYXJyW2ldLmNsYXNzTGlzdC5jb250YWlucyhcImFjdGl2ZVwiKSkge1xyXG4gICAgICAgICAgICAgICAgICAgIGJyZWFrO1xyXG4gICAgICAgICAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgICAgICAgICBhcnJbaV0uY2xhc3NMaXN0LmFkZChcImFjdGl2ZVwiKTtcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgZnVuY3Rpb24gbW91c2VPdXRBY3RpdmVDbGFzcyhhcnIpIHtcclxuICAgICAgICAgICAgZm9yIChsZXQgaSA9IGFyci5sZW5ndGggLSAxOyBpID49IDA7IGktLSkge1xyXG4gICAgICAgICAgICAgICAgaWYgKGFycltpXS5jbGFzc0xpc3QuY29udGFpbnMoXCJjdXJyZW50LWFjdGl2ZVwiKSkge1xyXG4gICAgICAgICAgICAgICAgICAgIGJyZWFrO1xyXG4gICAgICAgICAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgICAgICAgICBhcnJbaV0uY2xhc3NMaXN0LnJlbW92ZShcImFjdGl2ZVwiKTtcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuICAgIH1cclxuXHJcbiAgICBjaG9vc2VSYXRpbmcoKTtcclxuXHJcbiAgICBkb2N1bWVudC5hZGRFdmVudExpc3RlbmVyKFwiY2xpY2tcIiwgZnVuY3Rpb24gKGUpIHtcclxuICAgICAgICBpZiAoZS50YXJnZXQuY2xhc3NMaXN0LmNvbnRhaW5zKFwianMtb3Blbi1kcm9wZG93blwiKSAmJiB3aW5kb3cuc2NyZWVuLndpZHRoIDw9IDU3Nikge1xyXG4gICAgICAgICAgICBjb25zdCBjYXJldERyb3Bkb3duID0gZS50YXJnZXQuZmlyc3RFbGVtZW50Q2hpbGQ7XHJcbiAgICAgICAgICAgIGNvbnN0IGRyb3Bkb3duID0gZS50YXJnZXQubmV4dEVsZW1lbnRTaWJsaW5nO1xyXG4gICAgICAgICAgICBpZiAoZHJvcGRvd24uc3R5bGUubWF4SGVpZ2h0KSB7XHJcbiAgICAgICAgICAgICAgICBkcm9wZG93bi5zdHlsZS5tYXhIZWlnaHQgPSBudWxsO1xyXG4gICAgICAgICAgICAgICAgZHJvcGRvd24uc3R5bGUub3BhY2l0eSA9IG51bGw7XHJcbiAgICAgICAgICAgICAgICBlLnRhcmdldC5jbGFzc0xpc3QucmVtb3ZlKFwiZHJvcGRvd24tYWN0aXZlXCIpO1xyXG4gICAgICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICAgICAgZHJvcGRvd24uc3R5bGUubWF4SGVpZ2h0ID0gZHJvcGRvd24uc2Nyb2xsSGVpZ2h0ICsgXCJweFwiO1xyXG4gICAgICAgICAgICAgICAgZHJvcGRvd24uc3R5bGUub3BhY2l0eSA9IDE7XHJcbiAgICAgICAgICAgICAgICBlLnRhcmdldC5jbGFzc0xpc3QuYWRkKFwiZHJvcGRvd24tYWN0aXZlXCIpO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG4gICAgfSk7XHJcblxyXG4gICAgY29uc3QgYmFzaWNTY3JvbGxUb3AgPSBmdW5jdGlvbiAoKSB7XHJcbiAgICAgICAgY29uc3QgYnRuVG9wID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignLmpzLWJ0bi1nby10b3AnKTtcclxuICAgICAgICBjb25zdCBidG5SZXZlYWwgPSBmdW5jdGlvbiAoKSB7XHJcbiAgICAgICAgICAgIGlmICh3aW5kb3cuc2Nyb2xsWSA+PSAzMDApIHtcclxuICAgICAgICAgICAgICAgIGJ0blRvcC5jbGFzc0xpc3QuYWRkKCdpcy12aXNpYmxlJyk7XHJcbiAgICAgICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgICAgICBidG5Ub3AuY2xhc3NMaXN0LnJlbW92ZSgnaXMtdmlzaWJsZScpO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGNvbnN0IFRvcHNjcm9sbFRvID0gZnVuY3Rpb24gKCkge1xyXG4gICAgICAgICAgICBpZiAod2luZG93LnNjcm9sbFkgIT0gMCkge1xyXG4gICAgICAgICAgICAgICAgc2V0VGltZW91dChmdW5jdGlvbiAoKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgd2luZG93LnNjcm9sbFRvKDAsIHdpbmRvdy5zY3JvbGxZIC0gMzApO1xyXG4gICAgICAgICAgICAgICAgICAgIFRvcHNjcm9sbFRvKCk7XHJcbiAgICAgICAgICAgICAgICB9LCAxMCk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcbiAgICAgICAgd2luZG93LmFkZEV2ZW50TGlzdGVuZXIoJ3Njcm9sbCcsIGJ0blJldmVhbCk7XHJcbiAgICAgICAgYnRuVG9wLmFkZEV2ZW50TGlzdGVuZXIoJ2NsaWNrJywgVG9wc2Nyb2xsVG8pO1xyXG5cclxuICAgIH07XHJcbiAgICBiYXNpY1Njcm9sbFRvcCgpO1xyXG5cclxuICAgIGNvbnN0IG9wZW5Nb2RhbCA9IChidG4sIG1vZGFsKSA9PiB7XHJcbiAgICAgICAgaWYoZG9jdW1lbnQucXVlcnlTZWxlY3RvcihidG4pID09IG51bGwpIHJldHVybiBmYWxzZTtcclxuXHJcbiAgICAgICAgY29uc3QgbW9kYWxCdG4gPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKGJ0bik7XHJcbiAgICAgICAgY29uc3QgbW9kYWxDb250YWluZXIgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKG1vZGFsKTtcclxuXHJcbiAgICAgICAgbW9kYWxCdG4uYWRkRXZlbnRMaXN0ZW5lcihcImNsaWNrXCIsIGZ1bmN0aW9uICgpIHtcclxuICAgICAgICAgICAgZG9jdW1lbnQuYm9keS5jbGFzc0xpc3QuYWRkKFwibW9kYWwtYWN0aXZlXCIpO1xyXG4gICAgICAgICAgICBtb2RhbENvbnRhaW5lci5jbGFzc0xpc3QucmVtb3ZlKFwib3V0XCIpO1xyXG4gICAgICAgICAgICBtb2RhbENvbnRhaW5lci5jbGFzc0xpc3QuYWRkKFwib3BlbmVkXCIpO1xyXG4gICAgICAgIH0pO1xyXG5cclxuICAgICAgICBkb2N1bWVudC5hZGRFdmVudExpc3RlbmVyKFwiY2xpY2tcIiwgZnVuY3Rpb24gKGUpIHtcclxuICAgICAgICAgICAgaWYgKFxyXG4gICAgICAgICAgICAgICAgZS50YXJnZXQuY2xhc3NMaXN0LmNvbnRhaW5zKFwibW9kYWwtY29udGFpbmVyXCIpIHx8XHJcbiAgICAgICAgICAgICAgICBlLnRhcmdldC5jbGFzc0xpc3QuY29udGFpbnMoXCJtb2RhbC1jbG9zZVwiKVxyXG4gICAgICAgICAgICApIHtcclxuICAgICAgICAgICAgICAgIGRvY3VtZW50LmJvZHkuY2xhc3NMaXN0LnJlbW92ZShcIm1vZGFsLWFjdGl2ZVwiKTtcclxuICAgICAgICAgICAgICAgIG1vZGFsQ29udGFpbmVyLmNsYXNzTGlzdC5yZW1vdmUoXCJvcGVuZWRcIik7XHJcbiAgICAgICAgICAgICAgICBtb2RhbENvbnRhaW5lci5jbGFzc0xpc3QuYWRkKFwib3V0XCIpO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfSk7XHJcbiAgICAgICAgZG9jdW1lbnQuYWRkRXZlbnRMaXN0ZW5lcihcImtleWRvd25cIiwgZnVuY3Rpb24gKGUpIHtcclxuICAgICAgICAgICAgaWYgKGUua2V5Q29kZSA9PSAyNykge1xyXG4gICAgICAgICAgICAgICAgZG9jdW1lbnQuYm9keS5jbGFzc0xpc3QucmVtb3ZlKFwibW9kYWwtYWN0aXZlXCIpO1xyXG4gICAgICAgICAgICAgICAgbW9kYWxDb250YWluZXIuY2xhc3NMaXN0LnJlbW92ZShcIm9wZW5lZFwiKTtcclxuICAgICAgICAgICAgICAgIG1vZGFsQ29udGFpbmVyLmNsYXNzTGlzdC5hZGQoXCJvdXRcIik7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9KTtcclxuICAgIH07XHJcblxyXG4gICAgb3Blbk1vZGFsKFwiLmpzLXByb2R1Y3QtY29tcGFyZVwiLCBcIi5qcy1tb2RhbC1wcm9kdWN0LWNvbXBhcmVcIik7XHJcbiAgICBvcGVuTW9kYWwoXCIuanMtYWRkLXJldmlld1wiLCBcIi5qcy1tb2RhbC1hZGQtcmV2aWV3XCIpO1xyXG4gICAgb3Blbk1vZGFsKFwiLmpzLWFkZC1xdWVzdGlvblwiLCBcIi5qcy1tb2RhbC1hZGQtcXVlc3Rpb25cIik7XHJcblxyXG4gICAgY29uc3Qgc2VlTW9yZSA9IChudW1iZXIsIGVsZW1lbnRzLCBidXR0b24pID0+IHtcclxuXHJcbiAgICAgICAgaWYgKGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoYnV0dG9uKSA9PSBudWxsKSB7XHJcbiAgICAgICAgICAgIHJldHVybiBmYWxzZTtcclxuICAgICAgICB9XHJcbiAgICAgICAgd2luZG93LmFkZEV2ZW50TGlzdGVuZXIoXCJsb2FkXCIsICgpID0+IHNob3dIaWRlQmxvY2tzKG51bWJlciwgZWxlbWVudHMsIGJ1dHRvbikpO1xyXG4gICAgICAgIHdpbmRvdy5hZGRFdmVudExpc3RlbmVyKFwicmVzaXplXCIsICgpID0+IHNob3dIaWRlQmxvY2tzKG51bWJlciwgZWxlbWVudHMsIGJ1dHRvbikpO1xyXG5cclxuICAgICAgICBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKGJ1dHRvbikuYWRkRXZlbnRMaXN0ZW5lcihcImNsaWNrXCIsIGZ1bmN0aW9uICgpIHtcclxuICAgICAgICAgICAgaWYgKHRoaXMudGV4dENvbnRlbnQgPT0gXCJTZWUgbW9yZVwiKSB7XHJcbiAgICAgICAgICAgICAgICB0aGlzLnRleHRDb250ZW50ID0gXCJTZWUgbGVzc1wiO1xyXG4gICAgICAgICAgICAgICAgdGhpcy5jbGFzc0xpc3QuYWRkKFwiYWN0aXZlXCIpO1xyXG4gICAgICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICAgICAgdGhpcy50ZXh0Q29udGVudCA9IFwiU2VlIG1vcmVcIjtcclxuICAgICAgICAgICAgICAgIHRoaXMuY2xhc3NMaXN0LnJlbW92ZShcImFjdGl2ZVwiKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICBkb2N1bWVudC5xdWVyeVNlbGVjdG9yQWxsKGVsZW1lbnRzKS5mb3JFYWNoKChlbGVtLCBpbmRleCkgPT4ge1xyXG4gICAgICAgICAgICAgICAgaWYgKGVsZW0uc3R5bGUuZGlzcGxheSA9PSBcIm5vbmVcIikge1xyXG4gICAgICAgICAgICAgICAgICAgIGVsZW0uc3R5bGUuZGlzcGxheSA9IG51bGw7XHJcbiAgICAgICAgICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICAgICAgICAgIGlmIChpbmRleCA+IG51bWJlcikge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBlbGVtLnN0eWxlLmRpc3BsYXkgPSAnbm9uZSc7XHJcbiAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB9KTtcclxuICAgICAgICB9KTtcclxuXHJcbiAgICAgICAgZnVuY3Rpb24gc2hvd0hpZGVCbG9ja3MobnVtYmVyLCBlbGVtZW50cywgYnV0dG9uKSB7XHJcbiAgICAgICAgICAgIGNvbnN0IGVsZW1zID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvckFsbChlbGVtZW50cyk7XHJcbiAgICAgICAgICAgIGNvbnN0IGJ0blNob3dIaWRlID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcihidXR0b24pO1xyXG5cclxuICAgICAgICAgICAgaWYgKHdpbmRvdy5zY3JlZW4ud2lkdGggPD0gODAwICYmIGVsZW1zLmxlbmd0aCA+IG51bWJlcikge1xyXG4gICAgICAgICAgICAgICAgZWxlbXMuZm9yRWFjaCgoZWxlbSwgaW5kZXgpID0+IHtcclxuICAgICAgICAgICAgICAgICAgICBpZiAoaW5kZXggPiBudW1iZXIpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgZWxlbS5zdHlsZS5kaXNwbGF5ID0gJ25vbmUnO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBidG5TaG93SGlkZS5zdHlsZS5kaXNwbGF5ID0gbnVsbDtcclxuICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICB9KTtcclxuICAgICAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgICAgIGVsZW1zLmZvckVhY2goKGVsZW0sIGluZGV4KSA9PiB7XHJcbiAgICAgICAgICAgICAgICAgICAgZWxlbS5zdHlsZS5kaXNwbGF5ID0gbnVsbDtcclxuICAgICAgICAgICAgICAgICAgICBidG5TaG93SGlkZS5zdHlsZS5kaXNwbGF5ID0gJ25vbmUnO1xyXG4gICAgICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcbiAgICB9O1xyXG5cclxuICAgIHNlZU1vcmUoMywgJy5wcm9kdWN0LWNvbXBhcmUtdG9wX19pdGVtJywgJy5qcy1zZWUtbW9yZS1wcm9kdWN0cycpO1xyXG4gICAgc2VlTW9yZSgxLCAnLmhlbHAtY2VudGVyX19pdGVtJywgJy5qcy1zZWUtbW9yZS1oZWxwJyk7XHJcblxyXG4gICAgY29uc3Qgc2hvd0l0ZW1zID0gKG51bWJlckRlc2t0b3AsIG51bWJlck1vYmlsZSwgaXRlbXMsIGJ1dHRvbikgPT4ge1xyXG4gICAgICAgIGlmIChkb2N1bWVudC5xdWVyeVNlbGVjdG9yQWxsKGl0ZW1zKS5sZW5ndGggPT0gMCkgcmV0dXJuIGZhbHNlO1xyXG5cclxuICAgICAgICBjb25zdCBidG4gPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKGJ1dHRvbik7XHJcblxyXG4gICAgICAgIHdpbmRvdy5hZGRFdmVudExpc3RlbmVyKFwibG9hZFwiLCBzaG93SGlkZUl0ZW1zKTtcclxuICAgICAgICB3aW5kb3cuYWRkRXZlbnRMaXN0ZW5lcihcInJlc2l6ZVwiLCBzaG93SGlkZUl0ZW1zKTtcclxuXHJcbiAgICAgICAgZnVuY3Rpb24gc2hvd0hpZGVJdGVtcygpIHtcclxuICAgICAgICAgICAgY29uc3QgZWxzID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvckFsbChpdGVtcyk7XHJcbiAgICAgICAgICAgIGNvbnN0IGJ0biA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoYnV0dG9uKTtcclxuICAgICAgICAgICAgaWYgKHdpbmRvdy5zY3JlZW4ud2lkdGggPiA1NzcpIHtcclxuICAgICAgICAgICAgICAgIGlmIChlbHMubGVuZ3RoID4gbnVtYmVyRGVza3RvcCkge1xyXG4gICAgICAgICAgICAgICAgICAgIGJ0bi5zdHlsZS5kaXNwbGF5ID0gbnVsbDtcclxuICAgICAgICAgICAgICAgICAgICBlbHMuZm9yRWFjaCgoZWwsIGkpID0+IHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgaWYgKGkgPiBudW1iZXJEZXNrdG9wIC0gMSkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgZWwuc3R5bGUuZGlzcGxheSA9IFwibm9uZVwiXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBlbC5zdHlsZS5kaXNwbGF5ID0gbnVsbDtcclxuICAgICAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgIH0pO1xyXG4gICAgICAgICAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgICAgICAgICBidG4uc3R5bGUuZGlzcGxheSA9IFwibm9uZVwiO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICAgICAgaWYgKGVscy5sZW5ndGggPiBudW1iZXJNb2JpbGUpIHtcclxuICAgICAgICAgICAgICAgICAgICBidG4uc3R5bGUuZGlzcGxheSA9IG51bGw7XHJcbiAgICAgICAgICAgICAgICAgICAgZWxzLmZvckVhY2goKGVsLCBpKSA9PiB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGlmIChpID4gbnVtYmVyTW9iaWxlIC0gMSkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgZWwuc3R5bGUuZGlzcGxheSA9IFwibm9uZVwiXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBlbC5zdHlsZS5kaXNwbGF5ID0gbnVsbDtcclxuICAgICAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgIH0pO1xyXG4gICAgICAgICAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgICAgICAgICBidG4uc3R5bGUuZGlzcGxheSA9IFwibm9uZVwiO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBidG4uYWRkRXZlbnRMaXN0ZW5lcihcImNsaWNrXCIsIGZ1bmN0aW9uICgpIHtcclxuICAgICAgICAgICAgY29uc3QgZWxlbXMgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yQWxsKGl0ZW1zKTtcclxuICAgICAgICAgICAgaWYgKHRoaXMudGV4dENvbnRlbnQgPT0gXCJTZWUgbW9yZVwiKSB7XHJcbiAgICAgICAgICAgICAgICB0aGlzLnRleHRDb250ZW50ID0gXCJTZWUgbGVzc1wiO1xyXG4gICAgICAgICAgICAgICAgdGhpcy5jbGFzc0xpc3QuYWRkKFwiYWN0aXZlXCIpO1xyXG4gICAgICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICAgICAgdGhpcy50ZXh0Q29udGVudCA9IFwiU2VlIG1vcmVcIjtcclxuICAgICAgICAgICAgICAgIHRoaXMuY2xhc3NMaXN0LnJlbW92ZShcImFjdGl2ZVwiKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICBlbGVtcy5mb3JFYWNoKChlbGVtLCBpbmRleCkgPT4ge1xyXG4gICAgICAgICAgICAgICAgaWYgKGVsZW0uc3R5bGUuZGlzcGxheSA9PSBcIm5vbmVcIikge1xyXG4gICAgICAgICAgICAgICAgICAgIGVsZW0uc3R5bGUuZGlzcGxheSA9IG51bGw7XHJcbiAgICAgICAgICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICAgICAgICAgIGlmICgod2luZG93LnNjcmVlbi53aWR0aCA+IDU3NyAmJiBpbmRleCA+IG51bWJlckRlc2t0b3AgLSAxKSB8fCAod2luZG93LnNjcmVlbi53aWR0aCA8IDU3NyAmJiBpbmRleCA+IG51bWJlck1vYmlsZSAtIDEpKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGVsZW0uc3R5bGUuZGlzcGxheSA9ICdub25lJztcclxuICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIH0pO1xyXG4gICAgICAgIH0pO1xyXG4gICAgfVxyXG5cclxuICAgIHNob3dJdGVtcyg4LCA0LCBcIi5icmFuZHMtbGlzdF9faXRlbVwiLCBcIi5qcy1zZWUtbW9yZS1icmFuZHNcIik7XHJcbiAgICBzaG93SXRlbXMoMywgMiwgXCIuc2VvLWJsb2NrXCIsIFwiLmpzLXNlZS1tb3JlLXNlb1wiKTtcclxuXHJcbiAgICBjb25zdCBzaG93Rm9vdGVyTGlua3MgPSAoKSA9PiB7XHJcbiAgICAgICAgY29uc3QgZm9vdGVyVGl0bGUgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yQWxsKCcuZm9vdGVyX190aXRsZScpO1xyXG4gICAgICAgIGNvbnN0IGZvb3RlckxpbmtzID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvckFsbCgnLmZvb3Rlcl9fbGlua3MnKTtcclxuXHJcbiAgICAgICAgLy8gd2luZG93LmFkZEV2ZW50TGlzdGVuZXIoJ2xvYWQnLCAoKSA9PiBzaG93SGlkZUxpbmtzKTtcclxuICAgICAgICB3aW5kb3cuYWRkRXZlbnRMaXN0ZW5lcigncmVzaXplJywgKCkgPT4ge1xyXG4gICAgICAgICAgICBpZiAod2luZG93LnNjcmVlbi53aWR0aCA8PSA1NzYpIHtcclxuICAgICAgICAgICAgICAgIGZvb3RlckxpbmtzLmZvckVhY2goZm9vdGVyTGluayA9PiB7XHJcbiAgICAgICAgICAgICAgICAgICAgZm9vdGVyTGluay5zdHlsZS5tYXhIZWlnaHQgPSAwO1xyXG4gICAgICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgICAgICBmb290ZXJMaW5rcy5mb3JFYWNoKGZvb3RlckxpbmsgPT4ge1xyXG4gICAgICAgICAgICAgICAgICAgIGZvb3Rlckxpbmsuc3R5bGUubWF4SGVpZ2h0ID0gbnVsbDtcclxuICAgICAgICAgICAgICAgIH0pO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfSk7XHJcblxyXG4gICAgICAgIGZvb3RlclRpdGxlLmZvckVhY2godGl0bGUgPT4ge1xyXG4gICAgICAgICAgICB0aXRsZS5hZGRFdmVudExpc3RlbmVyKCdjbGljaycsIGZ1bmN0aW9uICgpIHtcclxuICAgICAgICAgICAgICAgIGNvbnN0IGZvb3RlckxpbmtzID0gdGhpcy5uZXh0RWxlbWVudFNpYmxpbmc7XHJcbiAgICAgICAgICAgICAgICBpZiAoZ2V0Q29tcHV0ZWRTdHlsZShmb290ZXJMaW5rcykubWF4SGVpZ2h0ID09ICcwcHgnKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5jbGFzc0xpc3QuYWRkKCdhY3RpdmUnKTtcclxuICAgICAgICAgICAgICAgICAgICBmb290ZXJMaW5rcy5zdHlsZS5tYXhIZWlnaHQgPSBmb290ZXJMaW5rcy5zY3JvbGxIZWlnaHQgKyBcInB4XCI7XHJcbiAgICAgICAgICAgICAgICAgICAgZm9vdGVyTGlua3Muc3R5bGUub3BhY2l0eSA9IDE7XHJcbiAgICAgICAgICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICAgICAgICAgIHRoaXMuY2xhc3NMaXN0LnJlbW92ZSgnYWN0aXZlJyk7XHJcbiAgICAgICAgICAgICAgICAgICAgZm9vdGVyTGlua3Muc3R5bGUubWF4SGVpZ2h0ID0gbnVsbDtcclxuICAgICAgICAgICAgICAgICAgICBmb290ZXJMaW5rcy5zdHlsZS5vcGFjaXR5ID0gbnVsbDtcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgfSlcclxuICAgICAgICB9KTtcclxuICAgIH1cclxuXHJcbiAgICBzaG93Rm9vdGVyTGlua3MoKTtcclxuXHJcbiAgICBjb25zdCBzZXRQZXJjZW50ID0gKCkgPT4ge1xyXG4gICAgICAgIGNvbnN0IGNpcmN1bGFyUHJvZ3Jlc3MgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yQWxsKFwiLmpzLWNpcmN1bGFyLXByb2dyZXNzXCIpO1xyXG5cclxuICAgICAgICBjaXJjdWxhclByb2dyZXNzLmZvckVhY2goaXRlbSA9PiB7XHJcbiAgICAgICAgICAgIGNvbnN0IGNpcmNsZSA9IGl0ZW0ucXVlcnlTZWxlY3RvcignLmNpcmN1bGFyLXByb2dyZXNzX19wZXJjZW50Jyk7XHJcbiAgICAgICAgICAgIGNvbnN0IHRleHQgPSBpdGVtLnF1ZXJ5U2VsZWN0b3IoJy5jaXJjdWxhci1pbmZvX19udW1iZXInKTtcclxuICAgICAgICAgICAgY29uc3QgZGF0YVBlcmNlbnQgPSBpdGVtLmdldEF0dHJpYnV0ZSgnZGF0YS1wZXJjZW50Jyk7XHJcbiAgICAgICAgICAgIGNvbnN0IHBlcmNlbnQgPSAoMTAwIC0gZGF0YVBlcmNlbnQpIC8gMTAwO1xyXG4gICAgICAgICAgICBjaXJjbGUuc3R5bGUuc3Ryb2tlRGFzaG9mZnNldCA9IGBjYWxjKDIqMzAqMy4xNCoke3BlcmNlbnR9KWA7XHJcbiAgICAgICAgICAgIHRleHQudGV4dENvbnRlbnQgPSBkYXRhUGVyY2VudDtcclxuICAgICAgICB9KTtcclxuICAgIH1cclxuXHJcbiAgICBzZXRQZXJjZW50KCk7XHJcblxyXG4gICAgZG9jdW1lbnQuYWRkRXZlbnRMaXN0ZW5lcihcImJsdXJcIiwgZnVuY3Rpb24gKGUpIHtcclxuICAgICAgICBpZiAoZS50YXJnZXQuY2xhc3NMaXN0LmNvbnRhaW5zKCdjb250YWN0LWZvcm1fX2ZpZWxkJykgfHwgZS50YXJnZXQuY2xhc3NMaXN0LmNvbnRhaW5zKCdjb250YWN0LWZvcm1fX21lc3NhZ2UnKSkge1xyXG4gICAgICAgICAgICBpZiAoZS50YXJnZXQudmFsdWUudHJpbSgpICE9ICcnKSB7XHJcbiAgICAgICAgICAgICAgICBlLnRhcmdldC5uZXh0RWxlbWVudFNpYmxpbmcuY2xhc3NMaXN0LmFkZCgnYWN0aXZlJyk7XHJcbiAgICAgICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgICAgICBlLnRhcmdldC5uZXh0RWxlbWVudFNpYmxpbmcuY2xhc3NMaXN0LnJlbW92ZSgnYWN0aXZlJyk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcbiAgICB9LCB0cnVlKTtcclxuXHJcbiAgICBjb25zdCBwcmljZVNsaWRlciA9ICgpID0+IHtcclxuICAgICAgICBjb25zdCByYW5nZUlucHV0cyA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3JBbGwoXCIucHJpY2UtcmFuZ2VfX2lucHV0XCIpLFxyXG4gICAgICAgICAgICBwcmljZUlucHV0cyA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3JBbGwoXCIucHJpY2UtaW5wdXRfX2ZpZWxkXCIpLFxyXG4gICAgICAgICAgICBwcm9ncmVzcyA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoXCIucHJpY2Utc2xpZGVyX19wcm9ncmVzc1wiKTtcclxuXHJcbiAgICAgICAgbGV0IHByaWNlR2FwID0gNTAwO1xyXG5cclxuICAgICAgICBwcmljZUlucHV0cy5mb3JFYWNoKChwcmljZUlucHV0KSA9PiB7XHJcbiAgICAgICAgICAgIHByaWNlSW5wdXQuYWRkRXZlbnRMaXN0ZW5lcihcImlucHV0XCIsIChlKSA9PiB7XHJcbiAgICAgICAgICAgICAgICBsZXQgbWluVmFsID0gcGFyc2VJbnQocHJpY2VJbnB1dHNbMF0udmFsdWUpLFxyXG4gICAgICAgICAgICAgICAgICAgIG1heFZhbCA9IHBhcnNlSW50KHByaWNlSW5wdXRzWzFdLnZhbHVlKTtcclxuXHJcbiAgICAgICAgICAgICAgICBpZiAobWF4VmFsIC0gbWluVmFsID49IHByaWNlR2FwICYmIG1heFZhbCA8PSA1MDAwMCkge1xyXG4gICAgICAgICAgICAgICAgICAgIGlmIChlLnRhcmdldC5jbGFzc0xpc3QuY29udGFpbnMoXCJwcmljZS1taW5cIikpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgcmFuZ2VJbnB1dHNbMF0udmFsdWUgPSBtaW5WYWw7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHByb2dyZXNzLnN0eWxlLmxlZnQgPSAobWluVmFsIC8gcmFuZ2VJbnB1dHNbMF0ubWF4KSAqIDEwMCArIFwiJVwiO1xyXG4gICAgICAgICAgICAgICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHJhbmdlSW5wdXRzWzFdLnZhbHVlID0gbWF4VmFsO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBwcm9ncmVzcy5zdHlsZS5yaWdodCA9IDEwMCAtIChtYXhWYWwgLyByYW5nZUlucHV0c1sxXS5tYXgpICogMTAwICsgXCIlXCI7XHJcbiAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB9KTtcclxuICAgICAgICB9KTtcclxuXHJcbiAgICAgICAgcmFuZ2VJbnB1dHMuZm9yRWFjaCgocmFuZ2VJbnB1dCkgPT4ge1xyXG4gICAgICAgICAgICByYW5nZUlucHV0LmFkZEV2ZW50TGlzdGVuZXIoXCJpbnB1dFwiLCAoZSkgPT4ge1xyXG4gICAgICAgICAgICAgICAgbGV0IG1pblZhbCA9IHBhcnNlSW50KHJhbmdlSW5wdXRzWzBdLnZhbHVlKSxcclxuICAgICAgICAgICAgICAgICAgICBtYXhWYWwgPSBwYXJzZUludChyYW5nZUlucHV0c1sxXS52YWx1ZSk7XHJcblxyXG4gICAgICAgICAgICAgICAgaWYgKG1heFZhbCAtIG1pblZhbCA8IHByaWNlR2FwKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgaWYgKGUudGFyZ2V0LmNsYXNzTGlzdC5jb250YWlucyhcInJhbmdlLW1pblwiKSkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICByYW5nZUlucHV0c1swXS52YWx1ZSA9IG1heFZhbCAtIHByaWNlR2FwO1xyXG4gICAgICAgICAgICAgICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHJhbmdlSW5wdXRzWzFdLnZhbHVlID0gbWluVmFsICsgcHJpY2VHYXA7XHJcbiAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgICAgICAgICBwcmljZUlucHV0c1swXS52YWx1ZSA9IG1pblZhbDtcclxuICAgICAgICAgICAgICAgICAgICBwcmljZUlucHV0c1sxXS52YWx1ZSA9IG1heFZhbDtcclxuICAgICAgICAgICAgICAgICAgICBwcm9ncmVzcy5zdHlsZS5sZWZ0ID0gKG1pblZhbCAvIHJhbmdlSW5wdXRzWzBdLm1heCkgKiAxMDAgKyBcIiVcIjtcclxuICAgICAgICAgICAgICAgICAgICBwcm9ncmVzcy5zdHlsZS5yaWdodCA9IDEwMCAtIChtYXhWYWwgLyByYW5nZUlucHV0c1sxXS5tYXgpICogMTAwICsgXCIlXCI7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIH0pO1xyXG4gICAgICAgIH0pO1xyXG5cclxuICAgICAgICBmdW5jdGlvbiBhZGRTcGFjZXModmFsdWUpIHtcclxuICAgICAgICAgICAgdmFsdWUgPSB2YWx1ZS5yZXBsYWNlKC8gL2csICcnKTtcclxuICAgICAgICAgICAgcmV0dXJuIHZhbHVlLnJlcGxhY2UoL1xcQig/PShcXGR7M30pKyg/IVxcZCkpL2csIFwiIFwiKTtcclxuICAgICAgICB9XHJcbiAgICB9O1xyXG5cclxuICAgIHByaWNlU2xpZGVyKCk7XHJcblxyXG4gICAgY29uc3Qgdmlld0FsbCA9ICgpID0+IHtcclxuICAgICAgICBpZiAoZG9jdW1lbnQucXVlcnlTZWxlY3RvckFsbChcIi5maWx0ZXItdmlldy1hbGxcIikubGVuZ3RoID09IDApIHJldHVybiBmYWxzZTtcclxuICAgICAgICBjb25zdCBmaWx0ZXJMaXN0ID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvckFsbChcIi5maWx0ZXItbGlzdFwiKTtcclxuICAgICAgICBjb25zdCB2aWV3QWxsID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvckFsbChcIi5maWx0ZXItdmlldy1hbGxcIik7XHJcblxyXG4gICAgICAgIGZpbHRlckxpc3QuZm9yRWFjaChsaXN0ID0+IHtcclxuICAgICAgICAgICAgaWYgKGxpc3QuY2hpbGRyZW4ubGVuZ3RoID4gNSkge1xyXG4gICAgICAgICAgICAgICAgY29uc3QgaXRlbXMgPSBsaXN0LmNoaWxkcmVuO1xyXG4gICAgICAgICAgICAgICAgY29uc3Qgdmlld0FsbCA9IGxpc3QubmV4dEVsZW1lbnRTaWJsaW5nO1xyXG4gICAgICAgICAgICAgICAgZm9yIChsZXQgaSA9IDAsIGxlbiA9IGl0ZW1zLmxlbmd0aDsgaSA8IGxlbjsgaSsrKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgaWYgKGkgPj0gNSkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBpdGVtc1tpXS5zdHlsZS5kaXNwbGF5ID0gXCJub25lXCI7XHJcbiAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgdmlld0FsbC5zdHlsZS5kaXNwbGF5ID0gXCJibG9ja1wiO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfSk7XHJcblxyXG4gICAgICAgIHZpZXdBbGwuZm9yRWFjaChlbCA9PiB7XHJcbiAgICAgICAgICAgIGVsLmFkZEV2ZW50TGlzdGVuZXIoXCJjbGlja1wiLCBmdW5jdGlvbiAoKSB7XHJcbiAgICAgICAgICAgICAgICBjb25zdCBmaWx0ZXJJdGVtcyA9IHRoaXMucHJldmlvdXNFbGVtZW50U2libGluZy5jaGlsZHJlbjtcclxuICAgICAgICAgICAgICAgIGNvbnN0IGZpbHRlckNvbnRlbnQgPSB0aGlzLmNsb3Nlc3QoXCIuZmlsdGVyLWNvbnRlbnRcIik7XHJcbiAgICAgICAgICAgICAgICBmb3IgKGxldCBpID0gMCwgbGVuID0gZmlsdGVySXRlbXMubGVuZ3RoOyBpIDwgbGVuOyBpKyspIHtcclxuICAgICAgICAgICAgICAgICAgICBpZiAoaSA+PSA1KSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGlmIChmaWx0ZXJJdGVtc1tpXS5zdHlsZS5kaXNwbGF5KSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBmaWx0ZXJJdGVtc1tpXS5zdHlsZS5kaXNwbGF5ID0gbnVsbDtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMudGV4dENvbnRlbnQgPSBcIkhpZGVcIlxyXG4gICAgICAgICAgICAgICAgICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgZmlsdGVySXRlbXNbaV0uc3R5bGUuZGlzcGxheSA9IFwibm9uZVwiO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy50ZXh0Q29udGVudCA9IFwiVmlldyBhbGxcIlxyXG4gICAgICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgZmlsdGVyQ29udGVudC5zdHlsZS5tYXhIZWlnaHQgPSBmaWx0ZXJDb250ZW50LnNjcm9sbEhlaWdodCArIFwicHhcIjtcclxuICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgfSk7XHJcbiAgICB9XHJcblxyXG4gICAgdmlld0FsbCgpO1xyXG5cclxuICAgIGNvbnN0IGlucHV0VmFsdWUgPSAoKSA9PiB7XHJcbiAgICAgICAgY29uc3QgaW5wdXRGaWVsZCA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoXCIucHJvZHVjdC1jb21wYXJlLWZvcm1fX2ZpZWxkXCIpO1xyXG4gICAgICAgIGNvbnN0IGFkZFZhbHVlQnRucyA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3JBbGwoXCIuanMtY29tcGFyZVwiKTtcclxuICAgICAgICBhZGRWYWx1ZUJ0bnMuZm9yRWFjaChhZGRWYWx1ZUJ0biA9PiB7XHJcbiAgICAgICAgICAgIGFkZFZhbHVlQnRuLmFkZEV2ZW50TGlzdGVuZXIoXCJjbGlja1wiLCBmdW5jdGlvbiAoKSB7XHJcbiAgICAgICAgICAgICAgICBjb25zdCB2YWwgPSB0aGlzLnByZXZpb3VzRWxlbWVudFNpYmxpbmcudGV4dENvbnRlbnQ7XHJcbiAgICAgICAgICAgICAgICBpbnB1dEZpZWxkLnZhbHVlID0gdmFsO1xyXG4gICAgICAgICAgICB9KTtcclxuICAgICAgICB9KTtcclxuICAgIH1cclxuXHJcbiAgICBpbnB1dFZhbHVlKCk7XHJcblxyXG4gICAgJChcIi5qcy1wcm9kdWN0LXNsaWRlci1wcmV2aWV3XCIpLnNsaWNrKHtcclxuICAgICAgICBzbGlkZXNUb1Nob3c6IDQsXHJcbiAgICAgICAgdmVydGljYWw6IHRydWUsXHJcbiAgICAgICAgdmVydGljYWxTd2lwaW5nOiB0cnVlLFxyXG4gICAgICAgIHNsaWRlc1RvU2Nyb2xsOiAxLFxyXG4gICAgICAgIGZvY3VzT25TZWxlY3Q6IHRydWUsXHJcbiAgICAgICAgcHJldkFycm93OiBcIi5wcm9kdWN0LXNsaWRlci1wcmV2aWV3X19idG4tLXByZXZcIixcclxuICAgICAgICBuZXh0QXJyb3c6IFwiLnByb2R1Y3Qtc2xpZGVyLXByZXZpZXdfX2J0bi0tbmV4dFwiLFxyXG4gICAgICAgIHZhcmlhYmxlV2lkdGg6IHRydWUsXHJcbiAgICAgICAgYXNOYXZGb3I6IFwiLnByb2R1Y3Qtc2xpZGVyLW1haW5cIlxyXG4gICAgfSk7XHJcbiAgICAkKFwiLnByb2R1Y3Qtc2xpZGVyLW1haW5cIikuc2xpY2soe1xyXG4gICAgICAgIHNsaWRlc1RvU2hvdzogMSxcclxuICAgICAgICBzbGlkZXNUb1Njcm9sbDogMSxcclxuICAgICAgICBhcnJvd3M6IGZhbHNlLFxyXG4gICAgICAgIGZhZGU6IHRydWUsXHJcbiAgICAgICAgYXNOYXZGb3I6IFwiLmpzLXByb2R1Y3Qtc2xpZGVyLXByZXZpZXdcIlxyXG4gICAgfSk7XHJcbiAgICAkKFwiLmpzLXByb2R1Y3QtY29tcGFyZS1zbGlkZXJcIikuc2xpY2soe1xyXG4gICAgICAgIHNsaWRlc1RvU2hvdzogMSxcclxuICAgICAgICBzbGlkZXNUb1Njcm9sbDogMSxcclxuICAgICAgICBwcmV2QXJyb3c6IFwiLnByb2R1Y3QtY29tcGFyZS1zbGlkZXJfX2J0bi0tcHJldlwiLFxyXG4gICAgICAgIG5leHRBcnJvdzogXCIucHJvZHVjdC1jb21wYXJlLXNsaWRlcl9fYnRuLS1uZXh0XCIsXHJcbiAgICAgICAgLy8gdmFyaWFibGVXaWR0aDogdHJ1ZSxcclxuICAgIH0pO1xyXG4gICAgJChcIi5qcy1yZWxhdGVkLXByb2R1Y3RzLXNsaWRlclwiKS5zbGljayh7XHJcbiAgICAgICAgc2xpZGVzVG9TaG93OiAzLFxyXG4gICAgICAgIHNsaWRlc1RvU2Nyb2xsOiAxLFxyXG4gICAgICAgIHByZXZBcnJvdzogXCIuanMtcmVsYXRlZC1wcmV2XCIsXHJcbiAgICAgICAgbmV4dEFycm93OiBcIi5qcy1yZWxhdGVkLW5leHRcIixcclxuICAgICAgICByZXNwb25zaXZlOiBbXHJcbiAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICAgIGJyZWFrcG9pbnQ6IDc2OCxcclxuICAgICAgICAgICAgICAgIHNldHRpbmdzOiB7XHJcbiAgICAgICAgICAgICAgICAgICAgc2xpZGVzVG9TaG93OiAyLFxyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB9LFxyXG4gICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgICBicmVha3BvaW50OiA1NzYsXHJcbiAgICAgICAgICAgICAgICBzZXR0aW5nczoge1xyXG4gICAgICAgICAgICAgICAgICAgIHNsaWRlc1RvU2hvdzogMSxcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgfSxcclxuICAgICAgICBdXHJcbiAgICB9KTtcclxuICAgICQoXCIuanMtcmVzZW50bHktdmlld2VkLXNsaWRlclwiKS5zbGljayh7XHJcbiAgICAgICAgc2xpZGVzVG9TaG93OiA0LFxyXG4gICAgICAgIHNsaWRlc1RvU2Nyb2xsOiAxLFxyXG4gICAgICAgIHByZXZBcnJvdzogXCIuanMtcmVzZW50bHktdmlld2VkLXByZXZcIixcclxuICAgICAgICBuZXh0QXJyb3c6IFwiLmpzLXJlc2VudGx5LXZpZXdlZC1uZXh0XCIsXHJcbiAgICAgICAgcmVzcG9uc2l2ZTogW1xyXG4gICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgICBicmVha3BvaW50OiA5OTMsXHJcbiAgICAgICAgICAgICAgICBzZXR0aW5nczoge1xyXG4gICAgICAgICAgICAgICAgICAgIHNsaWRlc1RvU2hvdzogMyxcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgfSxcclxuICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgYnJlYWtwb2ludDogNzY5LFxyXG4gICAgICAgICAgICAgICAgc2V0dGluZ3M6IHtcclxuICAgICAgICAgICAgICAgICAgICBzbGlkZXNUb1Nob3c6IDIsXHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIH0sXHJcbiAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICAgIGJyZWFrcG9pbnQ6IDU3NyxcclxuICAgICAgICAgICAgICAgIHNldHRpbmdzOiB7XHJcbiAgICAgICAgICAgICAgICAgICAgc2xpZGVzVG9TaG93OiAxLFxyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB9LFxyXG4gICAgICAgIF1cclxuICAgIH0pO1xyXG4gICAgJCgnYm9keScpLm9uKCdrZXl1cCcsICcuanMtc2VhcmNoLW1hdGNoZXMnLCBmdW5jdGlvbiAoKSB7XHJcbiAgICAgICAgbGV0IHNlbGYgPSAkKHRoaXMpO1xyXG4gICAgICAgIGxldCBsaXN0ID0gJCgnLicgKyBzZWxmLmRhdGEoJ2xpc3QnKSk7XHJcbiAgICAgICAgJC5hamF4KHtcclxuICAgICAgICAgICAgdXJsOiBzZWxmLmRhdGEoJ3VybCcpICsgJz9xPScgKyBzZWxmLnZhbCgpLFxyXG4gICAgICAgICAgICB0eXBlOiAnR0VUJyxcclxuICAgICAgICAgICAgZGF0YVR5cGU6ICdqc29uJyxcclxuICAgICAgICAgICAgc3VjY2VzczogZnVuY3Rpb24gKHJlc3BvbnNlKSB7XHJcbiAgICAgICAgICAgICAgICBsaXN0LmVtcHR5KCk7XHJcblxyXG4gICAgICAgICAgICAgICAgaWYgKHJlc3BvbnNlLml0ZW1zLmxlbmd0aCkge1xyXG4gICAgICAgICAgICAgICAgICAgICQuZWFjaChyZXNwb25zZS5pdGVtcywgZnVuY3Rpb24gKGksIGl0ZW0pIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgbGlzdC5hcHBlbmQoYDxhIGNsYXNzPVwic2VhcmNoLWZvcm0tbWF0Y2hlc19fbGlua1wiIGhyZWY9XCIke2l0ZW0udXJsfVwiPiR7aXRlbS50aXRsZX08L2E+YCk7XHJcbiAgICAgICAgICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9KTtcclxuICAgIH0pO1xyXG59KSgpOyJdLCJmaWxlIjoibWFpbi5qcyJ9
