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
//# sourceMappingURL=data:application/json;charset=utf8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIm1haW4uanMiXSwibmFtZXMiOlsiY3JvcFRleHQiLCJoaWRlQmxvY2siLCJyZWFkTW9yZSIsImRvY3VtZW50IiwicXVlcnlTZWxlY3RvckFsbCIsImZvckVhY2giLCJlbCIsImFkZEV2ZW50TGlzdGVuZXIiLCJlbFRleHQiLCJpbm5lclRleHQiLCJoaWRkZW5UZXh0IiwicHJldmlvdXNFbGVtZW50U2libGluZyIsImNsYXNzTGlzdCIsInRvZ2dsZSIsIm1heCIsInRleHQiLCJzdHIiLCJ0cmltIiwibGVuZ3RoIiwic3ViU3RyIiwic3Vic3RyaW5nIiwiaGlkZGVuU3RyIiwiaW5uZXJIVE1MIiwic2hvd1JldmlldyIsImltYWdlcyIsIm5leHRFbGVtZW50U2libGluZyIsInByb2R1Y3RSZXZpZXciLCJwcm9kdWN0VGV4dCIsInF1ZXJ5U2VsZWN0b3IiLCJjcmVhdGVFbGVtZW50IiwiYWRkIiwidGV4dENvbnRlbnQiLCJhZnRlciIsImJlZm9yZSIsImFjY29yZGlvbiIsImUiLCJ0YXJnZXQiLCJjb250YWlucyIsImNsb3Nlc3QiLCJhY2NvcmRpb25Db250ZW50Iiwic3R5bGUiLCJtYXhIZWlnaHQiLCJnZXRDb21wdXRlZFN0eWxlIiwicGFyZW50RWxlbWVudCIsInJlbW92ZSIsInNjcm9sbEhlaWdodCIsInNpZGViYXJMaW5rcyIsImVsZW0iLCJuYXZiYXJMaW5rQ2xpY2siLCJldmVudCIsInNtb290aFNjcm9sbCIsInByZXZlbnREZWZhdWx0IiwidGFyZ2V0SWQiLCJjdXJyZW50VGFyZ2V0IiwiZ2V0QXR0cmlidXRlIiwid2luZG93Iiwic2NyZWVuIiwid2lkdGgiLCJzY3JvbGxUbyIsInRvcCIsIm9mZnNldFRvcCIsImJlaGF2aW9yIiwidG9nZ2xlRml4ZWQiLCJ0aHJvdHRsZSIsInRyYWNrU2Nyb2xsIiwiZWxlbWVudHMiLCJzdGlja3lCbG9ja3MiLCJwYWdlWU9mZnNldCIsInN0aWNreUJsb2NrQ29vcmRzIiwiZ2V0Qm91bmRpbmdDbGllbnRSZWN0IiwiYm90dG9tIiwidHlwZSIsIm5hbWUiLCJvYmoiLCJydW5uaW5nIiwiZnVuYyIsInJlcXVlc3RBbmltYXRpb25GcmFtZSIsImRpc3BhdGNoRXZlbnQiLCJDdXN0b21FdmVudCIsImVsZW1lbnQiLCJmaXhlZFdpZHRoIiwiY2xpZW50V2lkdGgiLCJzaG93SGlkZVNpZGViYXJGaWx0ZXJzIiwic2hvd0hpZGVGaWx0ZXJzIiwic2lkZWJhckZpbHRlcnMiLCJmaWx0ZXIiLCJ0cmlnZ2VyIiwibW9iaWxlTmF2IiwiaXNDbG9zZWQiLCJidXJnZXJUaW1lIiwic2VhcmNoQnRuIiwidmFsdWUiLCJwcm9kdWN0UmV2aWV3U3RhcnMiLCJkYXRhUmF0aW5nIiwic3RhcnMiLCJjaGlsZHJlbiIsImkiLCJjaG9vc2VSYXRpbmciLCJyYXRpbmciLCJyYXRpbmdTdGFycyIsInJlbW92ZUNsYXNzIiwibW91c2VPdmVyQWN0aXZlQ2xhc3MiLCJhZGRDbGFzcyIsIm1vdXNlT3V0QWN0aXZlQ2xhc3MiLCJhcnIiLCJpTGVuZyIsImoiLCJhcmd1bWVudHMiLCJpTGVuIiwiY2FyZXREcm9wZG93biIsImZpcnN0RWxlbWVudENoaWxkIiwiZHJvcGRvd24iLCJvcGFjaXR5IiwiYmFzaWNTY3JvbGxUb3AiLCJidG5Ub3AiLCJidG5SZXZlYWwiLCJzY3JvbGxZIiwiVG9wc2Nyb2xsVG8iLCJzZXRUaW1lb3V0Iiwib3Blbk1vZGFsIiwibW9kYWxCdG4iLCJtb2RhbENvbnRhaW5lciIsImJvZHkiLCJrZXlDb2RlIiwic2VlTW9yZSIsIm51bWJlciIsImJ1dHRvbiIsInNob3dIaWRlQmxvY2tzIiwiaW5kZXgiLCJkaXNwbGF5IiwiZWxlbXMiLCJidG5TaG93SGlkZSIsInNob3dJdGVtcyIsIm51bWJlckRlc2t0b3AiLCJudW1iZXJNb2JpbGUiLCJpdGVtcyIsImJ0biIsInNob3dIaWRlSXRlbXMiLCJlbHMiLCJzaG93Rm9vdGVyTGlua3MiLCJmb290ZXJUaXRsZSIsImZvb3RlckxpbmtzIiwiZm9vdGVyTGluayIsInRpdGxlIiwic2V0UGVyY2VudCIsImNpcmN1bGFyUHJvZ3Jlc3MiLCJpdGVtIiwiY2lyY2xlIiwiZGF0YVBlcmNlbnQiLCJwZXJjZW50Iiwic3Ryb2tlRGFzaG9mZnNldCIsInByaWNlU2xpZGVyIiwicmFuZ2VJbnB1dHMiLCJwcmljZUlucHV0cyIsInByb2dyZXNzIiwicHJpY2VHYXAiLCJwcmljZUlucHV0IiwibWluVmFsIiwicGFyc2VJbnQiLCJtYXhWYWwiLCJsZWZ0IiwicmlnaHQiLCJyYW5nZUlucHV0IiwiYWRkU3BhY2VzIiwicmVwbGFjZSIsInZpZXdBbGwiLCJmaWx0ZXJMaXN0IiwibGlzdCIsImxlbiIsImZpbHRlckl0ZW1zIiwiZmlsdGVyQ29udGVudCIsImlucHV0VmFsdWUiLCJpbnB1dEZpZWxkIiwiYWRkVmFsdWVCdG5zIiwiYWRkVmFsdWVCdG4iLCJ2YWwiLCIkIiwic2xpY2siLCJzbGlkZXNUb1Nob3ciLCJ2ZXJ0aWNhbCIsInZlcnRpY2FsU3dpcGluZyIsInNsaWRlc1RvU2Nyb2xsIiwiZm9jdXNPblNlbGVjdCIsInByZXZBcnJvdyIsIm5leHRBcnJvdyIsInZhcmlhYmxlV2lkdGgiLCJhc05hdkZvciIsImFycm93cyIsImZhZGUiLCJyZXNwb25zaXZlIiwiYnJlYWtwb2ludCIsInNldHRpbmdzIiwib24iLCJzZWxmIiwiZGF0YSIsImFqYXgiLCJ1cmwiLCJkYXRhVHlwZSIsInN1Y2Nlc3MiLCJyZXNwb25zZSIsImVtcHR5IiwiZWFjaCIsImFwcGVuZCJdLCJtYXBwaW5ncyI6Ijs7QUFBQTs7QUFDQSxDQUFDLFlBQVk7QUFDVEEsRUFBQUEsUUFBUTtBQUNSQyxFQUFBQSxTQUFTO0FBRVQsTUFBSUMsUUFBUSxHQUFHQyxRQUFRLENBQUNDLGdCQUFULENBQTBCLGVBQTFCLENBQWY7QUFFQUYsRUFBQUEsUUFBUSxDQUFDRyxPQUFULENBQWlCLFVBQUFDLEVBQUUsRUFBSTtBQUNuQkEsSUFBQUEsRUFBRSxDQUFDQyxnQkFBSCxDQUFvQixPQUFwQixFQUE2QixZQUFNO0FBQy9CLFVBQUlDLE1BQU0sR0FBR0Ys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LEdBQXRDO0FBMEJBRixFQUFBQSxDQUFDLENBQUMsTUFBRCxDQUFELENBQVVnQixFQUFWLENBQWEsT0FBYixFQUFzQixvQkFBdEIsRUFBNEMsWUFBWTtBQUNwRCxRQUFJQyxJQUFJLEdBQUdqQixDQUFDLENBQUMsSUFBRCxDQUFaO0FBQ0EsUUFBSVQsSUFBSSxHQUFHUyxDQUFDLENBQUMsTUFBTWlCLElBQUksQ0FBQ0MsSUFBTCxDQUFVLE1BQVYsQ0FBUCxDQUFaO0FBQ0FsQixJQUFBQSxDQUFDLENBQUNtQixJQUFGLENBQU87QUFDSEMsTUFBQUEsR0FBRyxFQUFFSCxJQUFJLENBQUNDLElBQUwsQ0FBVSxLQUFWLElBQW1CLEtBQW5CLEdBQTJCRCxJQUFJLENBQUNsQixHQUFMLEVBRDdCO0FBRUh4RyxNQUFBQSxJQUFJLEVBQUUsS0FGSDtBQUdIOEgsTUFBQUEsUUFBUSxFQUFFLE1BSFA7QUFJSEMsTUFBQUEsT0FBTyxFQUFFLGlCQUFVQyxRQUFWLEVBQW9CO0FBQ3pCaEMsUUFBQUEsSUFBSSxDQUFDaUMsS0FBTDs7QUFFQSxZQUFJRCxRQUFRLENBQUNoRSxLQUFULENBQWVySCxNQUFuQixFQUEyQjtBQUN2QjhKLFVBQUFBLENBQUMsQ0FBQ3lCLElBQUYsQ0FBT0YsUUFBUSxDQUFDaEUsS0FBaEIsRUFBdUIsVUFBVXZDLENBQVYsRUFBYWtELElBQWIsRUFBbUI7QUFDdENxQixZQUFBQSxJQUFJLENBQUNtQyxNQUFMLHlEQUEwRHhELElBQUksQ0FBQ2tELEdBQS9ELGdCQUF1RWxELElBQUksQ0FBQ0gsS0FBNUU7QUFDSCxXQUZEO0FBR0g7QUFDSjtBQVpFLEtBQVA7QUFjSCxHQWpCRDtBQWtCSCxDQTd0QkQiLCJzb3VyY2VzQ29udGVudCI6WyI7XHJcbihmdW5jdGlvbiAoKSB7XHJcbiAgICBjcm9wVGV4dCgpO1xyXG4gICAgaGlkZUJsb2NrKCk7XHJcblxyXG4gICAgbGV0IHJlYWRNb3JlID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvckFsbCgnLmpzLXJlYWQtbW9yZScpO1xyXG5cclxuICAgIHJlYWRNb3JlLmZvckVhY2goZWwgPT4ge1xyXG4gICAgICAgIGVsLmFkZEV2ZW50TGlzdGVuZXIoJ2NsaWNrJywgKCkgPT4ge1xyXG4gICAgICAgICAgICBsZXQgZWxUZXh0ID0gZWwuaW5uZXJUZXh0O1xyXG4gICAgICAgICAgICBsZXQgaGlkZGVuVGV4dCA9IGVsLnByZXZpb3VzRWxlbWVudFNpYmxpbmc7XHJcblxyXG4gICAgICAgICAgICBlbC5pbm5lclRleHQgPSBlbFRleHQgPT0gJ3JlYWQgbW9yZSA+JyA/ICdoaWRlJyA6ICdyZWFkIG1vcmUgPic7XHJcbiAgICAgICAgICAgIGhpZGRlblRleHQuY2xhc3NMaXN0LnRvZ2dsZSgnc2hvdycpO1xyXG4gICAgICAgIH0pO1xyXG4gICAgfSk7XHJcblxyXG4gICAgZnVuY3Rpb24gY3JvcFRleHQoKSB7XHJcbiAgICAgICAgbGV0IG1heCA9IDIwMDtcclxuICAgICAgICBsZXQgdGV4dCA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3JBbGwoJy5qcy1yZWFkLW1vcmUtdGV4dCcpO1xyXG4gICAgICAgIHRleHQuZm9yRWFjaChlbCA9PiB7XHJcbiAgICAgICAgICAgIGxldCBzdHIgPSBlbC5pbm5lclRleHQudHJpbSgpO1xyXG4gICAgICAgICAgICBpZiAoc3RyLmxlbmd0aCA+IG1heCkge1xyXG4gICAgICAgICAgICAgICAgbGV0IHN1YlN0ciA9IHN0ci5zdWJzdHJpbmcoMCwgbWF4KTtcclxuICAgICAgICAgICAgICAgIGxldCBoaWRkZW5TdHIgPSBzdHIuc3Vic3RyaW5nKG1heCwgc3RyLmxlbmd0aCk7XHJcbiAgICAgICAgICAgICAgICBlbC5pbm5lclRleHQgPSBzdWJTdHI7XHJcbiAgICAgICAgICAgICAgICBlbC5pbm5lckhUTUwgKz0gYDxzcGFuIGNsYXNzPVwiaGlkZGVuLXRleHQganMtaGlkZGVuLXRleHRcIj4ke2hpZGRlblN0cn08L3NwYW4+YDtcclxuICAgICAgICAgICAgICAgIGVsLmlubmVySFRNTCArPSAnPHNwYW4gY2xhc3M9XCJyZWFkLW1vcmUganMtcmVhZC1tb3JlXCI+cmVhZCBtb3JlID48L3NwYW4+JztcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH0pO1xyXG4gICAgfVxyXG5cclxuICAgIGxldCBzaG93UmV2aWV3ID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvckFsbCgnLmpzLXNob3ctcmV2aWV3Jyk7XHJcblxyXG4gICAgc2hvd1Jldmlldy5mb3JFYWNoKGVsID0+IHtcclxuICAgICAgICBlbC5hZGRFdmVudExpc3RlbmVyKCdjbGljaycsICgpID0+IHtcclxuICAgICAgICAgICAgbGV0IGVsVGV4dCA9IGVsLmlubmVyVGV4dDtcclxuICAgICAgICAgICAgbGV0IGhpZGRlblRleHQgPSBlbC5wcmV2aW91c0VsZW1lbnRTaWJsaW5nO1xyXG4gICAgICAgICAgICBsZXQgaW1hZ2VzID0gZWwubmV4dEVsZW1lbnRTaWJsaW5nO1xyXG5cclxuICAgICAgICAgICAgZWwuaW5uZXJUZXh0ID0gZWxUZXh0ID09ICdyZWFkIG1vcmUgPicgPyAnPCBoaWRlJyA6ICdyZWFkIG1vcmUgPic7XHJcbiAgICAgICAgICAgIGhpZGRlblRleHQuY2xhc3NMaXN0LnRvZ2dsZSgnc2hvdycpO1xyXG4gICAgICAgICAgICBpbWFnZXMuY2xhc3NMaXN0LnRvZ2dsZShcInNob3dcIik7XHJcbiAgICAgICAgfSk7XHJcbiAgICB9KTtcclxuXHJcbiAgICBmdW5jdGlvbiBoaWRlQmxvY2soKSB7XHJcbiAgICAgICAgbGV0IG1heCA9IDEyODtcclxuICAgICAgICBsZXQgcHJvZHVjdFJldmlldyA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3JBbGwoJy5qcy1oaWRlLXJldmlldycpO1xyXG4gICAgICAgIHByb2R1Y3RSZXZpZXcuZm9yRWFjaChlbCA9PiB7XHJcbiAgICAgICAgICAgIGxldCBwcm9kdWN0VGV4dCA9IGVsLnF1ZXJ5U2VsZWN0b3IoXCIucGFnZS10ZXh0XCIpO1xyXG4gICAgICAgICAgICBsZXQgc3RyID0gcHJvZHVjdFRleHQuaW5uZXJUZXh0LnRyaW0oKTtcclxuICAgICAgICAgICAgbGV0IGltYWdlcyA9IGVsLnF1ZXJ5U2VsZWN0b3IoJy5wcm9kdWN0LXJldmlld19faW1hZ2VzJyk7XHJcbiAgICAgICAgICAgIGlmIChzdHIubGVuZ3RoID4gbWF4KSB7XHJcbiAgICAgICAgICAgICAgICBsZXQgc3ViU3RyID0gc3RyLnN1YnN0cmluZygwLCBtYXgpO1xyXG4gICAgICAgICAgICAgICAgbGV0IGhpZGRlblN0ciA9IHN0ci5zdWJzdHJpbmcobWF4LCBzdHIubGVuZ3RoKTtcclxuICAgICAgICAgICAgICAgIHByb2R1Y3RUZXh0LmlubmVyVGV4dCA9IHN1YlN0cjtcclxuXHJcbiAgICAgICAgICAgICAgICBsZXQgaGlkZGVuVGV4dCA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ3NwYW4nKTtcclxuICAgICAgICAgICAgICAgIGhpZGRlblRleHQuY2xhc3NMaXN0LmFkZCgnaGlkZGVuLXRleHQnLCAncGFnZS10ZXh0JywgJ2pzLWhpZGRlbi10ZXh0Jyk7XHJcbiAgICAgICAgICAgICAgICBoaWRkZW5UZXh0LnRleHRDb250ZW50ID0gaGlkZGVuU3RyO1xyXG5cclxuICAgICAgICAgICAgICAgIHByb2R1Y3RUZXh0LmFmdGVyKGhpZGRlblRleHQpO1xyXG5cclxuICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgbGV0IHJlYWRNb3JlID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnc3BhbicpO1xyXG4gICAgICAgICAgICByZWFkTW9yZS5jbGFzc0xpc3QuYWRkKCdyZWFkLW1vcmUnLCAnanMtc2hvdy1yZXZpZXcnKTtcclxuICAgICAgICAgICAgcmVhZE1vcmUudGV4dENvbnRlbnQgPSAncmVhZCBtb3JlID4nO1xyXG5cclxuICAgICAgICAgICAgaW1hZ2VzLmJlZm9yZShyZWFkTW9yZSk7XHJcbiAgICAgICAgfSk7XHJcbiAgICB9XHJcblxyXG4gICAgY29uc3QgYWNjb3JkaW9uID0gKCkgPT4ge1xyXG4gICAgICAgIGRvY3VtZW50LmFkZEV2ZW50TGlzdGVuZXIoJ2NsaWNrJywgZSA9PiB7XHJcbiAgICAgICAgICAgIGlmIChlLnRhcmdldC5jbGFzc0xpc3QuY29udGFpbnMoJ2pzLWFjY29yZGlvbicpIHx8IGUudGFyZ2V0LmNsb3Nlc3QoJy5qcy1hY2NvcmRpb24nKSkge1xyXG4gICAgICAgICAgICAgICAgY29uc3QgYWNjb3JkaW9uID0gZS50YXJnZXQuY2xhc3NMaXN0LmNvbnRhaW5zKCdqcy1hY2NvcmRpb24nKSA/IGUudGFyZ2V0IDogZS50YXJnZXQuY2xvc2VzdCgnLmpzLWFjY29yZGlvbicpO1xyXG4gICAgICAgICAgICAgICAgY29uc3QgYWNjb3JkaW9uQ29udGVudCA9IGFjY29yZGlvbi5uZXh0RWxlbWVudFNpYmxpbmc7XHJcbiAgICAgICAgICAgICAgICBpZiAoYWNjb3JkaW9uQ29udGVudC5zdHlsZS5tYXhIZWlnaHQgfHwgZ2V0Q29tcHV0ZWRTdHlsZShhY2NvcmRpb25Db250ZW50KS5tYXhIZWlnaHQgPT0gXCJtYXgtY29udGVudFwiKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgYWNjb3JkaW9uLnBhcmVudEVsZW1lbnQuY2xhc3NMaXN0LnJlbW92ZShcImFjdGl2ZVwiKTtcclxuICAgICAgICAgICAgICAgICAgICBhY2NvcmRpb25Db250ZW50LnN0eWxlLm1heEhlaWdodCA9IG51bGw7XHJcbiAgICAgICAgICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICAgICAgICAgIGFjY29yZGlvbi5wYXJlbnRFbGVtZW50LmNsYXNzTGlzdC5hZGQoXCJhY3RpdmVcIik7XHJcbiAgICAgICAgICAgICAgICAgICAgYWNjb3JkaW9uQ29udGVudC5zdHlsZS5tYXhIZWlnaHQgPSBhY2NvcmRpb25Db250ZW50LnNjcm9sbEhlaWdodCArIFwicHhcIjtcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH0pO1xyXG4gICAgfVxyXG4gICAgYWNjb3JkaW9uKCk7XHJcblxyXG4gICAgY29uc3Qgc2lkZWJhckxpbmtzID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvckFsbChcIi5zaWRlYmFyLW1lbnVfX2xpbmtcIik7XHJcblxyXG4gICAgc2lkZWJhckxpbmtzLmZvckVhY2goZWxlbSA9PiBlbGVtLmFkZEV2ZW50TGlzdGVuZXIoXCJjbGlja1wiLCBuYXZiYXJMaW5rQ2xpY2spKTtcclxuXHJcbiAgICBmdW5jdGlvbiBuYXZiYXJMaW5rQ2xpY2soZXZlbnQpIHtcclxuICAgICAgICBzbW9vdGhTY3JvbGwoZXZlbnQpO1xyXG4gICAgfVxyXG5cclxuICAgIGZ1bmN0aW9uIHNtb290aFNjcm9sbChldmVudCkge1xyXG4gICAgICAgIGV2ZW50LnByZXZlbnREZWZhdWx0KCk7XHJcbiAgICAgICAgY29uc3QgdGFyZ2V0SWQgPSBldmVudC5jdXJyZW50VGFyZ2V0LmdldEF0dHJpYnV0ZShcImhyZWZcIik7XHJcbiAgICAgICAgaWYgKHdpbmRvdy5zY3JlZW4ud2lkdGggPiAxMDI0KSB7XHJcbiAgICAgICAgICAgIHdpbmRvdy5zY3JvbGxUbyh7XHJcbiAgICAgICAgICAgICAgICB0b3A6IHRhcmdldElkID09PSBcIiNcIiA/IDAgOiBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKHRhcmdldElkKS5vZmZzZXRUb3AgLSAxMDAsXHJcbiAgICAgICAgICAgICAgICBiZWhhdmlvcjogXCJzbW9vdGhcIlxyXG4gICAgICAgICAgICB9KTtcclxuICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICB3aW5kb3cuc2Nyb2xsVG8oe1xyXG4gICAgICAgICAgICAgICAgdG9wOiB0YXJnZXRJZCA9PT0gXCIjXCIgPyAwIDogZG9jdW1lbnQucXVlcnlTZWxlY3Rvcih0YXJnZXRJZCkub2Zmc2V0VG9wIC0gMjAwLFxyXG4gICAgICAgICAgICAgICAgYmVoYXZpb3I6IFwic21vb3RoXCJcclxuICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG5cclxuICAgIGlmIChkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcucHJvZHVjdHMtc3RpY2t5JykgIT09IG51bGwpIHtcclxuXHJcbiAgICAgICAgd2luZG93LmFkZEV2ZW50TGlzdGVuZXIoJ29wdGltaXplZFJlc2l6ZScsICgpID0+IHtcclxuICAgICAgICAgICAgdG9nZ2xlRml4ZWQoJy5wcm9kdWN0cy1zdGlja3knKTtcclxuICAgICAgICB9KTtcclxuXHJcblxyXG4gICAgICAgIHRvZ2dsZUZpeGVkKCcucHJvZHVjdHMtc3RpY2t5Jyk7XHJcblxyXG4gICAgICAgIHRocm90dGxlKFwicmVzaXplXCIsIFwib3B0aW1pemVkUmVzaXplXCIpO1xyXG5cclxuICAgIH1cclxuXHJcbiAgICBpZiAoZG9jdW1lbnQucXVlcnlTZWxlY3RvcignLnN0aWNreS1ibG9jaycpICE9PSBudWxsKSB7XHJcbiAgICAgICAgbGV0IHN0aWNreUJsb2NrQ29vcmRzID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignLnN0aWNreS1ibG9jaycpLmdldEJvdW5kaW5nQ2xpZW50UmVjdCgpLmJvdHRvbSArIHdpbmRvdy5wYWdlWU9mZnNldDtcclxuXHJcbiAgICAgICAgd2luZG93LmFkZEV2ZW50TGlzdGVuZXIoXCJzY3JvbGxcIiwgZnVuY3Rpb24gKCkge1xyXG4gICAgICAgICAgICB0cmFja1Njcm9sbCgnLnN0aWNreS1ibG9jaycpO1xyXG4gICAgICAgIH0pO1xyXG5cclxuICAgICAgICBmdW5jdGlvbiB0cmFja1Njcm9sbChlbGVtZW50cykge1xyXG4gICAgICAgICAgICBsZXQgc3RpY2t5QmxvY2tzID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvckFsbChlbGVtZW50cyk7XHJcbiAgICAgICAgICAgIHN0aWNreUJsb2Nrcy5mb3JFYWNoKGVsID0+IHtcclxuICAgICAgICAgICAgICAgIGlmIChlbC5jbGFzc0xpc3QuY29udGFpbnMoJ3Nob3cnKSAmJiB3aW5kb3cucGFnZVlPZmZzZXQgPCBzdGlja3lCbG9ja0Nvb3Jkcykge1xyXG4gICAgICAgICAgICAgICAgICAgIGVsLmNsYXNzTGlzdC5yZW1vdmUoJ3Nob3cnKTtcclxuICAgICAgICAgICAgICAgIH0gZWxzZSBpZiAod2luZG93LnBhZ2VZT2Zmc2V0ID4gc3RpY2t5QmxvY2tDb29yZHMpIHtcclxuICAgICAgICAgICAgICAgICAgICBlbC5jbGFzc0xpc3QuYWRkKCdzaG93Jyk7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIH0pO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxuXHJcbiAgICBmdW5jdGlvbiB0aHJvdHRsZSh0eXBlLCBuYW1lLCBvYmopIHtcclxuICAgICAgICBvYmogPSBvYmogfHwgd2luZG93O1xyXG4gICAgICAgIHZhciBydW5uaW5nID0gZmFsc2U7XHJcbiAgICAgICAgdmFyIGZ1bmMgPSBmdW5jdGlvbiAoKSB7XHJcbiAgICAgICAgICAgIGlmIChydW5uaW5nKSB7XHJcbiAgICAgICAgICAgICAgICByZXR1cm47XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgcnVubmluZyA9IHRydWU7XHJcbiAgICAgICAgICAgIHJlcXVlc3RBbmltYXRpb25GcmFtZShmdW5jdGlvbiAoKSB7XHJcbiAgICAgICAgICAgICAgICBvYmouZGlzcGF0Y2hFdmVudChuZXcgQ3VzdG9tRXZlbnQobmFtZSkpO1xyXG4gICAgICAgICAgICAgICAgcnVubmluZyA9IGZhbHNlO1xyXG4gICAgICAgICAgICB9KTtcclxuICAgICAgICB9O1xyXG4gICAgICAgIG9iai5hZGRFdmVudExpc3RlbmVyKHR5cGUsIGZ1bmMpO1xyXG4gICAgfTtcclxuXHJcbiAgICBmdW5jdGlvbiB0b2dnbGVGaXhlZChlbCkge1xyXG4gICAgICAgIGxldCBlbGVtZW50ID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcihlbCk7XHJcbiAgICAgICAgbGV0IGZpeGVkV2lkdGggPSB3aW5kb3cuc2NyZWVuLndpZHRoID4gMTAyNCA/IGVsZW1lbnQucGFyZW50RWxlbWVudC5jbGllbnRXaWR0aCAtIDI4NSA6IGVsZW1lbnQucGFyZW50RWxlbWVudC5jbGllbnRXaWR0aDtcclxuICAgICAgICBlbGVtZW50LnN0eWxlLndpZHRoID0gZml4ZWRXaWR0aCArICdweCc7XHJcblxyXG4gICAgfVxyXG5cclxuICAgIGNvbnN0IHNob3dIaWRlU2lkZWJhckZpbHRlcnMgPSAoKSA9PiB7XHJcbiAgICAgICAgaWYgKGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3JBbGwoXCIuZmlsdGVyXCIpLmxlbmd0aCA9PSAwKSByZXR1cm4gZmFsc2U7XHJcblxyXG4gICAgICAgIHdpbmRvdy5hZGRFdmVudExpc3RlbmVyKFwibG9hZFwiLCBzaG93SGlkZUZpbHRlcnMpO1xyXG4gICAgICAgIHdpbmRvdy5hZGRFdmVudExpc3RlbmVyKFwicmVzaXplXCIsIHNob3dIaWRlRmlsdGVycyk7XHJcblxyXG4gICAgICAgIGZ1bmN0aW9uIHNob3dIaWRlRmlsdGVycygpIHtcclxuICAgICAgICAgICAgY29uc3Qgc2lkZWJhckZpbHRlcnMgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yQWxsKFwiLmZpbHRlclwiKTtcclxuXHJcbiAgICAgICAgICAgIGlmICh3aW5kb3cuc2NyZWVuLndpZHRoIDw9IDEwMjQpIHtcclxuICAgICAgICAgICAgICAgIHNpZGViYXJGaWx0ZXJzLmZvckVhY2goZmlsdGVyID0+IHtcclxuICAgICAgICAgICAgICAgICAgICBmaWx0ZXIuY2xhc3NMaXN0LnJlbW92ZShcImFjdGl2ZVwiKTtcclxuICAgICAgICAgICAgICAgIH0pO1xyXG4gICAgICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICAgICAgc2lkZWJhckZpbHRlcnMuZm9yRWFjaChmaWx0ZXIgPT4ge1xyXG4gICAgICAgICAgICAgICAgICAgIGZpbHRlci5jbGFzc0xpc3QuYWRkKFwiYWN0aXZlXCIpO1xyXG4gICAgICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcbiAgICB9XHJcblxyXG4gICAgc2hvd0hpZGVTaWRlYmFyRmlsdGVycygpO1xyXG5cclxuICAgIC8vIGhhbWJ1cmdlciBvcGVuL2Nsb3NlIGFuaW1hdGlvblxyXG4gICAgY29uc3QgdHJpZ2dlciA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoXCIjaGFtYnVyZ2VyXCIpO1xyXG4gICAgY29uc3QgbW9iaWxlTmF2ID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcihcIiNtb2JpbGUtbmF2XCIpO1xyXG4gICAgbGV0IGlzQ2xvc2VkID0gdHJ1ZTtcclxuXHJcbiAgICB0cmlnZ2VyLmFkZEV2ZW50TGlzdGVuZXIoXCJjbGlja1wiLCBidXJnZXJUaW1lKTtcclxuXHJcbiAgICBmdW5jdGlvbiBidXJnZXJUaW1lKCkge1xyXG4gICAgICAgIGlmIChpc0Nsb3NlZCA9PSB0cnVlKSB7XHJcbiAgICAgICAgICAgIHRyaWdnZXIuY2xhc3NMaXN0LnJlbW92ZShcImlzLW9wZW5cIik7XHJcbiAgICAgICAgICAgIHRyaWdnZXIuY2xhc3NMaXN0LmFkZChcImlzLWNsb3NlZFwiKTtcclxuICAgICAgICAgICAgbW9iaWxlTmF2LmNsYXNzTGlzdC5hZGQoJ2lzLW9wZW4nKTtcclxuICAgICAgICAgICAgaXNDbG9zZWQgPSBmYWxzZTtcclxuICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICB0cmlnZ2VyLmNsYXNzTGlzdC5yZW1vdmUoXCJpcy1jbG9zZWRcIik7XHJcbiAgICAgICAgICAgIHRyaWdnZXIuY2xhc3NMaXN0LmFkZChcImlzLW9wZW5cIik7XHJcbiAgICAgICAgICAgIG1vYmlsZU5hdi5jbGFzc0xpc3QucmVtb3ZlKCdpcy1vcGVuJyk7XHJcbiAgICAgICAgICAgIGlzQ2xvc2VkID0gdHJ1ZTtcclxuICAgICAgICB9XHJcbiAgICB9XHJcblxyXG4gICAgLy8gc2VhcmNoIGZvcm0gb3Blbi9jbG9zZSBhbmltYXRpb25cclxuICAgIGNvbnN0IHNlYXJjaEJ0biA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoXCIuc2VhcmNoLWZvcm1fX2J0blwiKTtcclxuICAgIHNlYXJjaEJ0bi5hZGRFdmVudExpc3RlbmVyKFwiY2xpY2tcIiwgZnVuY3Rpb24gKCkge1xyXG4gICAgICAgIHRoaXMuY2xhc3NMaXN0LnRvZ2dsZShcImNsb3NlXCIpO1xyXG4gICAgICAgIHRoaXMucGFyZW50RWxlbWVudC5jbGFzc0xpc3QudG9nZ2xlKFwiaW5jbGlja2VkXCIpO1xyXG4gICAgICAgIHRoaXMucHJldmlvdXNFbGVtZW50U2libGluZy52YWx1ZSA9IFwiXCI7XHJcbiAgICB9KTtcclxuXHJcbiAgICBjb25zdCBwcm9kdWN0UmV2aWV3U3RhcnMgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yQWxsKFwiLmpzLXByb2R1Y3QtcmV2aWV3LXJhdGluZ1wiKTtcclxuICAgIHByb2R1Y3RSZXZpZXdTdGFycy5mb3JFYWNoKGZ1bmN0aW9uIChlbCkge1xyXG4gICAgICAgIGNvbnN0IGRhdGFSYXRpbmcgPSBlbC5nZXRBdHRyaWJ1dGUoXCJkYXRhLXJhdGluZ1wiKTtcclxuICAgICAgICBjb25zdCBzdGFycyA9IGVsLmNoaWxkcmVuO1xyXG4gICAgICAgIGZvciAobGV0IGkgPSAwOyBpIDwgZGF0YVJhdGluZzsgaSsrKSB7XHJcbiAgICAgICAgICAgIHN0YXJzW2ldLmNsYXNzTGlzdC5hZGQoXCJhY3RpdmVcIik7XHJcbiAgICAgICAgfVxyXG4gICAgfSk7XHJcblxyXG4gICAgY29uc3QgY2hvb3NlUmF0aW5nID0gKCkgPT4ge1xyXG4gICAgICAgIGlmIChkb2N1bWVudC5xdWVyeVNlbGVjdG9yKFwiLmpzLXJhdGluZ1wiKSA9PSBudWxsKSByZXR1cm4gZmFsc2U7XHJcbiAgICAgICAgY29uc3QgcmF0aW5nID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcihcIi5qcy1yYXRpbmdcIiksXHJcbiAgICAgICAgICAgIHJhdGluZ1N0YXJzID0gcmF0aW5nLmNoaWxkcmVuO1xyXG4gICAgICAgIHJhdGluZy5hZGRFdmVudExpc3RlbmVyKFwiY2xpY2tcIiwgKGUpID0+IHtcclxuICAgICAgICAgICAgaWYgKGUudGFyZ2V0LmNsYXNzTGlzdC5jb250YWlucyhcInJhdGluZ19fc3RhclwiKSB8fCBlLnRhcmdldC5jbG9zZXN0KFwiLnJhdGluZ19fc3RhclwiKSkge1xyXG4gICAgICAgICAgICAgICAgbGV0IHRhcmdldCA9IGUudGFyZ2V0LmNsYXNzTGlzdC5jb250YWlucyhcInJhdGluZ19fc3RhclwiKSA/IGUudGFyZ2V0IDogZS50YXJnZXQuY2xvc2VzdChcIi5yYXRpbmdfX3N0YXJcIik7XHJcbiAgICAgICAgICAgICAgICByZW1vdmVDbGFzcyhyYXRpbmdTdGFycywgXCJjdXJyZW50LWFjdGl2ZVwiKTtcclxuICAgICAgICAgICAgICAgIHRhcmdldC5jbGFzc0xpc3QuYWRkKFwiYWN0aXZlXCIsIFwiY3VycmVudC1hY3RpdmVcIik7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9KTtcclxuICAgICAgICByYXRpbmcuYWRkRXZlbnRMaXN0ZW5lcihcIm1vdXNlb3ZlclwiLCAoZSkgPT4ge1xyXG4gICAgICAgICAgICBpZiAoZS50YXJnZXQuY2xhc3NMaXN0LmNvbnRhaW5zKFwicmF0aW5nX19zdGFyXCIpIHx8IGUudGFyZ2V0LmNsb3Nlc3QoXCIucmF0aW5nX19zdGFyXCIpKSB7XHJcbiAgICAgICAgICAgICAgICBsZXQgdGFyZ2V0ID0gZS50YXJnZXQuY2xhc3NMaXN0LmNvbnRhaW5zKFwicmF0aW5nX19zdGFyXCIpID8gZS50YXJnZXQgOiBlLnRhcmdldC5jbG9zZXN0KFwiLnJhdGluZ19fc3RhclwiKTtcclxuICAgICAgICAgICAgICAgIHJlbW92ZUNsYXNzKHJhdGluZ1N0YXJzLCBcImFjdGl2ZVwiKTtcclxuICAgICAgICAgICAgICAgIHRhcmdldC5jbGFzc0xpc3QuYWRkKFwiYWN0aXZlXCIpO1xyXG4gICAgICAgICAgICAgICAgbW91c2VPdmVyQWN0aXZlQ2xhc3MocmF0aW5nU3RhcnMpO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfSk7XHJcbiAgICAgICAgcmF0aW5nLmFkZEV2ZW50TGlzdGVuZXIoXCJtb3VzZW91dFwiLCAoKSA9PiB7XHJcbiAgICAgICAgICAgIGFkZENsYXNzKHJhdGluZ1N0YXJzLCBcImFjdGl2ZVwiKTtcclxuICAgICAgICAgICAgbW91c2VPdXRBY3RpdmVDbGFzcyhyYXRpbmdTdGFycyk7XHJcbiAgICAgICAgfSk7XHJcblxyXG4gICAgICAgIGZ1bmN0aW9uIGFkZENsYXNzKGFycikge1xyXG4gICAgICAgICAgICBmb3IgKGxldCBpID0gMCwgaUxlbmcgPSBhcnIubGVuZ3RoOyBpIDwgaUxlbmc7IGkrKykge1xyXG4gICAgICAgICAgICAgICAgZm9yIChsZXQgaiA9IDE7IGogPCBhcmd1bWVudHMubGVuZ3RoOyBqKyspIHtcclxuICAgICAgICAgICAgICAgICAgICByYXRpbmdTdGFyc1tpXS5jbGFzc0xpc3QuYWRkKGFyZ3VtZW50c1tqXSk7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIGZ1bmN0aW9uIHJlbW92ZUNsYXNzKGFycikge1xyXG4gICAgICAgICAgICBmb3IgKGxldCBpID0gMCwgaUxlbmcgPSBhcnIubGVuZ3RoOyBpIDwgaUxlbmc7IGkrKykge1xyXG4gICAgICAgICAgICAgICAgZm9yIChsZXQgaiA9IDE7IGogPCBhcmd1bWVudHMubGVuZ3RoOyBqKyspIHtcclxuICAgICAgICAgICAgICAgICAgICByYXRpbmdTdGFyc1tpXS5jbGFzc0xpc3QucmVtb3ZlKGFyZ3VtZW50c1tqXSk7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIGZ1bmN0aW9uIG1vdXNlT3ZlckFjdGl2ZUNsYXNzKGFycikge1xyXG4gICAgICAgICAgICBmb3IgKGxldCBpID0gMCwgaUxlbiA9IGFyci5sZW5ndGg7IGkgPCBpTGVuOyBpKyspIHtcclxuICAgICAgICAgICAgICAgIGlmIChhcnJbaV0uY2xhc3NMaXN0LmNvbnRhaW5zKFwiYWN0aXZlXCIpKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgYnJlYWs7XHJcbiAgICAgICAgICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICAgICAgICAgIGFycltpXS5jbGFzc0xpc3QuYWRkKFwiYWN0aXZlXCIpO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBmdW5jdGlvbiBtb3VzZU91dEFjdGl2ZUNsYXNzKGFycikge1xyXG4gICAgICAgICAgICBmb3IgKGxldCBpID0gYXJyLmxlbmd0aCAtIDE7IGkgPj0gMDsgaS0tKSB7XHJcbiAgICAgICAgICAgICAgICBpZiAoYXJyW2ldLmNsYXNzTGlzdC5jb250YWlucyhcImN1cnJlbnQtYWN0aXZlXCIpKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgYnJlYWs7XHJcbiAgICAgICAgICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICAgICAgICAgIGFycltpXS5jbGFzc0xpc3QucmVtb3ZlKFwiYWN0aXZlXCIpO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG5cclxuICAgIGNob29zZVJhdGluZygpO1xyXG5cclxuICAgIGRvY3VtZW50LmFkZEV2ZW50TGlzdGVuZXIoXCJjbGlja1wiLCBmdW5jdGlvbiAoZSkge1xyXG4gICAgICAgIGlmIChlLnRhcmdldC5jbGFzc0xpc3QuY29udGFpbnMoXCJqcy1vcGVuLWRyb3Bkb3duXCIpICYmIHdpbmRvdy5zY3JlZW4ud2lkdGggPD0gNTc2KSB7XHJcbiAgICAgICAgICAgIGNvbnN0IGNhcmV0RHJvcGRvd24gPSBlLnRhcmdldC5maXJzdEVsZW1lbnRDaGlsZDtcclxuICAgICAgICAgICAgY29uc3QgZHJvcGRvd24gPSBlLnRhcmdldC5uZXh0RWxlbWVudFNpYmxpbmc7XHJcbiAgICAgICAgICAgIGlmIChkcm9wZG93bi5zdHlsZS5tYXhIZWlnaHQpIHtcclxuICAgICAgICAgICAgICAgIGRyb3Bkb3duLnN0eWxlLm1heEhlaWdodCA9IG51bGw7XHJcbiAgICAgICAgICAgICAgICBkcm9wZG93bi5zdHlsZS5vcGFjaXR5ID0gbnVsbDtcclxuICAgICAgICAgICAgICAgIGUudGFyZ2V0LmNsYXNzTGlzdC5yZW1vdmUoXCJkcm9wZG93bi1hY3RpdmVcIik7XHJcbiAgICAgICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgICAgICBkcm9wZG93bi5zdHlsZS5tYXhIZWlnaHQgPSBkcm9wZG93bi5zY3JvbGxIZWlnaHQgKyBcInB4XCI7XHJcbiAgICAgICAgICAgICAgICBkcm9wZG93bi5zdHlsZS5vcGFjaXR5ID0gMTtcclxuICAgICAgICAgICAgICAgIGUudGFyZ2V0LmNsYXNzTGlzdC5hZGQoXCJkcm9wZG93bi1hY3RpdmVcIik7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcbiAgICB9KTtcclxuXHJcbiAgICBjb25zdCBiYXNpY1Njcm9sbFRvcCA9IGZ1bmN0aW9uICgpIHtcclxuICAgICAgICBjb25zdCBidG5Ub3AgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcuanMtYnRuLWdvLXRvcCcpO1xyXG4gICAgICAgIGNvbnN0IGJ0blJldmVhbCA9IGZ1bmN0aW9uICgpIHtcclxuICAgICAgICAgICAgaWYgKHdpbmRvdy5zY3JvbGxZID49IDMwMCkge1xyXG4gICAgICAgICAgICAgICAgYnRuVG9wLmNsYXNzTGlzdC5hZGQoJ2lzLXZpc2libGUnKTtcclxuICAgICAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgICAgIGJ0blRvcC5jbGFzc0xpc3QucmVtb3ZlKCdpcy12aXNpYmxlJyk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcbiAgICAgICAgY29uc3QgVG9wc2Nyb2xsVG8gPSBmdW5jdGlvbiAoKSB7XHJcbiAgICAgICAgICAgIGlmICh3aW5kb3cuc2Nyb2xsWSAhPSAwKSB7XHJcbiAgICAgICAgICAgICAgICBzZXRUaW1lb3V0KGZ1bmN0aW9uICgpIHtcclxuICAgICAgICAgICAgICAgICAgICB3aW5kb3cuc2Nyb2xsVG8oMCwgd2luZG93LnNjcm9sbFkgLSAzMCk7XHJcbiAgICAgICAgICAgICAgICAgICAgVG9wc2Nyb2xsVG8oKTtcclxuICAgICAgICAgICAgICAgIH0sIDEwKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuICAgICAgICB3aW5kb3cuYWRkRXZlbnRMaXN0ZW5lcignc2Nyb2xsJywgYnRuUmV2ZWFsKTtcclxuICAgICAgICBidG5Ub3AuYWRkRXZlbnRMaXN0ZW5lcignY2xpY2snLCBUb3BzY3JvbGxUbyk7XHJcblxyXG4gICAgfTtcclxuICAgIGJhc2ljU2Nyb2xsVG9wKCk7XHJcblxyXG4gICAgY29uc3Qgb3Blbk1vZGFsID0gKCkgPT4ge1xyXG4gICAgICAgIGNvbnN0IG1vZGFsQnRuID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvckFsbChcIi5qcy1tb2RhbFwiKTtcclxuICAgICAgICBjb25zdCBtb2RhbENvbnRhaW5lciA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoXCIubW9kYWwtYmFja2dyb3VuZFwiKTtcclxuXHJcbiAgICAgICAgbW9kYWxCdG4uZm9yRWFjaChlbCA9PiB7XHJcbiAgICAgICAgICAgIGVsLmFkZEV2ZW50TGlzdGVuZXIoXCJjbGlja1wiLCBmdW5jdGlvbiAoKSB7XHJcbiAgICAgICAgICAgICAgICBkb2N1bWVudC5ib2R5LmNsYXNzTGlzdC5hZGQoXCJtb2RhbC1hY3RpdmVcIik7XHJcbiAgICAgICAgICAgICAgICBtb2RhbENvbnRhaW5lci5jbGFzc0xpc3QucmVtb3ZlKFwib3V0XCIpO1xyXG4gICAgICAgICAgICAgICAgbW9kYWxDb250YWluZXIuY2xhc3NMaXN0LmFkZChcIm9wZW5lZFwiKTtcclxuICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgfSk7XHJcblxyXG4gICAgICAgIGRvY3VtZW50LmFkZEV2ZW50TGlzdGVuZXIoXCJjbGlja1wiLCBmdW5jdGlvbiAoZSkge1xyXG4gICAgICAgICAgICBpZiAoXHJcbiAgICAgICAgICAgICAgICBlLnRhcmdldC5jbGFzc0xpc3QuY29udGFpbnMoXCJtb2RhbC1jb250YWluZXJcIikgfHxcclxuICAgICAgICAgICAgICAgIGUudGFyZ2V0LmNsYXNzTGlzdC5jb250YWlucyhcIm1vZGFsLWNsb3NlXCIpXHJcbiAgICAgICAgICAgICkge1xyXG4gICAgICAgICAgICAgICAgZG9jdW1lbnQuYm9keS5jbGFzc0xpc3QucmVtb3ZlKFwibW9kYWwtYWN0aXZlXCIpO1xyXG4gICAgICAgICAgICAgICAgbW9kYWxDb250YWluZXIuY2xhc3NMaXN0LnJlbW92ZShcIm9wZW5lZFwiKTtcclxuICAgICAgICAgICAgICAgIG1vZGFsQ29udGFpbmVyLmNsYXNzTGlzdC5hZGQoXCJvdXRcIik7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9KTtcclxuICAgICAgICBkb2N1bWVudC5hZGRFdmVudExpc3RlbmVyKFwia2V5ZG93blwiLCBmdW5jdGlvbiAoZSkge1xyXG4gICAgICAgICAgICBpZiAoZS5rZXlDb2RlID09IDI3KSB7XHJcbiAgICAgICAgICAgICAgICBkb2N1bWVudC5ib2R5LmNsYXNzTGlzdC5yZW1vdmUoXCJtb2RhbC1hY3RpdmVcIik7XHJcbiAgICAgICAgICAgICAgICBtb2RhbENvbnRhaW5lci5jbGFzc0xpc3QucmVtb3ZlKFwib3BlbmVkXCIpO1xyXG4gICAgICAgICAgICAgICAgbW9kYWxDb250YWluZXIuY2xhc3NMaXN0LmFkZChcIm91dFwiKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH0pO1xyXG4gICAgfTtcclxuXHJcbiAgICBvcGVuTW9kYWwoKTtcclxuXHJcbiAgICBjb25zdCBzZWVNb3JlID0gKG51bWJlciwgZWxlbWVudHMsIGJ1dHRvbikgPT4ge1xyXG5cclxuICAgICAgICBpZiAoZG9jdW1lbnQucXVlcnlTZWxlY3RvcihidXR0b24pID09IG51bGwpIHtcclxuICAgICAgICAgICAgcmV0dXJuIGZhbHNlO1xyXG4gICAgICAgIH1cclxuICAgICAgICB3aW5kb3cuYWRkRXZlbnRMaXN0ZW5lcihcImxvYWRcIiwgKCkgPT4gc2hvd0hpZGVCbG9ja3MobnVtYmVyLCBlbGVtZW50cywgYnV0dG9uKSk7XHJcbiAgICAgICAgd2luZG93LmFkZEV2ZW50TGlzdGVuZXIoXCJyZXNpemVcIiwgKCkgPT4gc2hvd0hpZGVCbG9ja3MobnVtYmVyLCBlbGVtZW50cywgYnV0dG9uKSk7XHJcblxyXG4gICAgICAgIGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoYnV0dG9uKS5hZGRFdmVudExpc3RlbmVyKFwiY2xpY2tcIiwgZnVuY3Rpb24gKCkge1xyXG4gICAgICAgICAgICBpZiAodGhpcy50ZXh0Q29udGVudCA9PSBcIlNlZSBtb3JlXCIpIHtcclxuICAgICAgICAgICAgICAgIHRoaXMudGV4dENvbnRlbnQgPSBcIlNlZSBsZXNzXCI7XHJcbiAgICAgICAgICAgICAgICB0aGlzLmNsYXNzTGlzdC5hZGQoXCJhY3RpdmVcIik7XHJcbiAgICAgICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgICAgICB0aGlzLnRleHRDb250ZW50ID0gXCJTZWUgbW9yZVwiO1xyXG4gICAgICAgICAgICAgICAgdGhpcy5jbGFzc0xpc3QucmVtb3ZlKFwiYWN0aXZlXCIpO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3JBbGwoZWxlbWVudHMpLmZvckVhY2goKGVsZW0sIGluZGV4KSA9PiB7XHJcbiAgICAgICAgICAgICAgICBpZiAoZWxlbS5zdHlsZS5kaXNwbGF5ID09IFwibm9uZVwiKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgZWxlbS5zdHlsZS5kaXNwbGF5ID0gbnVsbDtcclxuICAgICAgICAgICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgICAgICAgICAgaWYgKGluZGV4ID4gbnVtYmVyKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGVsZW0uc3R5bGUuZGlzcGxheSA9ICdub25lJztcclxuICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIH0pO1xyXG4gICAgICAgIH0pO1xyXG5cclxuICAgICAgICBmdW5jdGlvbiBzaG93SGlkZUJsb2NrcyhudW1iZXIsIGVsZW1lbnRzLCBidXR0b24pIHtcclxuICAgICAgICAgICAgY29uc3QgZWxlbXMgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yQWxsKGVsZW1lbnRzKTtcclxuICAgICAgICAgICAgY29uc3QgYnRuU2hvd0hpZGUgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKGJ1dHRvbik7XHJcblxyXG4gICAgICAgICAgICBpZiAod2luZG93LnNjcmVlbi53aWR0aCA8PSA4MDAgJiYgZWxlbXMubGVuZ3RoID4gbnVtYmVyKSB7XHJcbiAgICAgICAgICAgICAgICBlbGVtcy5mb3JFYWNoKChlbGVtLCBpbmRleCkgPT4ge1xyXG4gICAgICAgICAgICAgICAgICAgIGlmIChpbmRleCA+IG51bWJlcikge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBlbGVtLnN0eWxlLmRpc3BsYXkgPSAnbm9uZSc7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGJ0blNob3dIaWRlLnN0eWxlLmRpc3BsYXkgPSBudWxsO1xyXG4gICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIH0pO1xyXG4gICAgICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICAgICAgZWxlbXMuZm9yRWFjaCgoZWxlbSwgaW5kZXgpID0+IHtcclxuICAgICAgICAgICAgICAgICAgICBlbGVtLnN0eWxlLmRpc3BsYXkgPSBudWxsO1xyXG4gICAgICAgICAgICAgICAgICAgIGJ0blNob3dIaWRlLnN0eWxlLmRpc3BsYXkgPSAnbm9uZSc7XHJcbiAgICAgICAgICAgICAgICB9KTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuICAgIH07XHJcblxyXG4gICAgc2VlTW9yZSgzLCAnLnByb2R1Y3QtY29tcGFyZS10b3BfX2l0ZW0nLCAnLmpzLXNlZS1tb3JlLXByb2R1Y3RzJyk7XHJcbiAgICBzZWVNb3JlKDEsICcuaGVscC1jZW50ZXJfX2l0ZW0nLCAnLmpzLXNlZS1tb3JlLWhlbHAnKTtcclxuXHJcbiAgICBjb25zdCBzaG93SXRlbXMgPSAobnVtYmVyRGVza3RvcCwgbnVtYmVyTW9iaWxlLCBpdGVtcywgYnV0dG9uKSA9PiB7XHJcbiAgICAgICAgaWYgKGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3JBbGwoaXRlbXMpLmxlbmd0aCA9PSAwKSByZXR1cm4gZmFsc2U7XHJcblxyXG4gICAgICAgIGNvbnN0IGJ0biA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoYnV0dG9uKTtcclxuXHJcbiAgICAgICAgd2luZG93LmFkZEV2ZW50TGlzdGVuZXIoXCJsb2FkXCIsIHNob3dIaWRlSXRlbXMpO1xyXG4gICAgICAgIHdpbmRvdy5hZGRFdmVudExpc3RlbmVyKFwicmVzaXplXCIsIHNob3dIaWRlSXRlbXMpO1xyXG5cclxuICAgICAgICBmdW5jdGlvbiBzaG93SGlkZUl0ZW1zKCkge1xyXG4gICAgICAgICAgICBjb25zdCBlbHMgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yQWxsKGl0ZW1zKTtcclxuICAgICAgICAgICAgY29uc3QgYnRuID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcihidXR0b24pO1xyXG4gICAgICAgICAgICBpZiAod2luZG93LnNjcmVlbi53aWR0aCA+IDU3Nykge1xyXG4gICAgICAgICAgICAgICAgaWYgKGVscy5sZW5ndGggPiBudW1iZXJEZXNrdG9wKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgYnRuLnN0eWxlLmRpc3BsYXkgPSBudWxsO1xyXG4gICAgICAgICAgICAgICAgICAgIGVscy5mb3JFYWNoKChlbCwgaSkgPT4ge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBpZiAoaSA+IG51bWJlckRlc2t0b3AgLSAxKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBlbC5zdHlsZS5kaXNwbGF5ID0gXCJub25lXCJcclxuICAgICAgICAgICAgICAgICAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGVsLnN0eWxlLmRpc3BsYXkgPSBudWxsO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICAgICAgICAgIGJ0bi5zdHlsZS5kaXNwbGF5ID0gXCJub25lXCI7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgICAgICBpZiAoZWxzLmxlbmd0aCA+IG51bWJlck1vYmlsZSkge1xyXG4gICAgICAgICAgICAgICAgICAgIGJ0bi5zdHlsZS5kaXNwbGF5ID0gbnVsbDtcclxuICAgICAgICAgICAgICAgICAgICBlbHMuZm9yRWFjaCgoZWwsIGkpID0+IHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgaWYgKGkgPiBudW1iZXJNb2JpbGUgLSAxKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBlbC5zdHlsZS5kaXNwbGF5ID0gXCJub25lXCJcclxuICAgICAgICAgICAgICAgICAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGVsLnN0eWxlLmRpc3BsYXkgPSBudWxsO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICAgICAgICAgIGJ0bi5zdHlsZS5kaXNwbGF5ID0gXCJub25lXCI7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIGJ0bi5hZGRFdmVudExpc3RlbmVyKFwiY2xpY2tcIiwgZnVuY3Rpb24gKCkge1xyXG4gICAgICAgICAgICBjb25zdCBlbGVtcyA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3JBbGwoaXRlbXMpO1xyXG4gICAgICAgICAgICBpZiAodGhpcy50ZXh0Q29udGVudCA9PSBcIlNlZSBtb3JlXCIpIHtcclxuICAgICAgICAgICAgICAgIHRoaXMudGV4dENvbnRlbnQgPSBcIlNlZSBsZXNzXCI7XHJcbiAgICAgICAgICAgICAgICB0aGlzLmNsYXNzTGlzdC5hZGQoXCJhY3RpdmVcIik7XHJcbiAgICAgICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgICAgICB0aGlzLnRleHRDb250ZW50ID0gXCJTZWUgbW9yZVwiO1xyXG4gICAgICAgICAgICAgICAgdGhpcy5jbGFzc0xpc3QucmVtb3ZlKFwiYWN0aXZlXCIpO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIGVsZW1zLmZvckVhY2goKGVsZW0sIGluZGV4KSA9PiB7XHJcbiAgICAgICAgICAgICAgICBpZiAoZWxlbS5zdHlsZS5kaXNwbGF5ID09IFwibm9uZVwiKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgZWxlbS5zdHlsZS5kaXNwbGF5ID0gbnVsbDtcclxuICAgICAgICAgICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgICAgICAgICAgaWYgKCh3aW5kb3cuc2NyZWVuLndpZHRoID4gNTc3ICYmIGluZGV4ID4gbnVtYmVyRGVza3RvcCAtIDEpIHx8ICh3aW5kb3cuc2NyZWVuLndpZHRoIDwgNTc3ICYmIGluZGV4ID4gbnVtYmVyTW9iaWxlIC0xKSkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBlbGVtLnN0eWxlLmRpc3BsYXkgPSAnbm9uZSc7XHJcbiAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB9KTtcclxuICAgICAgICB9KTtcclxuICAgIH1cclxuXHJcbiAgICBzaG93SXRlbXMoOCwgNCwgXCIuYnJhbmRzLWxpc3RfX2l0ZW1cIiwgXCIuanMtc2VlLW1vcmUtYnJhbmRzXCIpO1xyXG4gICAgc2hvd0l0ZW1zKDMsIDIsIFwiLnNlby1ibG9ja1wiLCBcIi5qcy1zZWUtbW9yZS1zZW9cIik7XHJcblxyXG4gICAgY29uc3Qgc2hvd0Zvb3RlckxpbmtzID0gKCkgPT4ge1xyXG4gICAgICAgIGNvbnN0IGZvb3RlclRpdGxlID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvckFsbCgnLmZvb3Rlcl9fdGl0bGUnKTtcclxuICAgICAgICBjb25zdCBmb290ZXJMaW5rcyA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3JBbGwoJy5mb290ZXJfX2xpbmtzJyk7XHJcblxyXG4gICAgICAgIC8vIHdpbmRvdy5hZGRFdmVudExpc3RlbmVyKCdsb2FkJywgKCkgPT4gc2hvd0hpZGVMaW5rcyk7XHJcbiAgICAgICAgd2luZG93LmFkZEV2ZW50TGlzdGVuZXIoJ3Jlc2l6ZScsICgpID0+IHtcclxuICAgICAgICAgICAgaWYgKHdpbmRvdy5zY3JlZW4ud2lkdGggPD0gNTc2KSB7XHJcbiAgICAgICAgICAgICAgICBmb290ZXJMaW5rcy5mb3JFYWNoKGZvb3RlckxpbmsgPT4ge1xyXG4gICAgICAgICAgICAgICAgICAgIGZvb3Rlckxpbmsuc3R5bGUubWF4SGVpZ2h0ID0gMDtcclxuICAgICAgICAgICAgICAgIH0pO1xyXG4gICAgICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICAgICAgZm9vdGVyTGlua3MuZm9yRWFjaChmb290ZXJMaW5rID0+IHtcclxuICAgICAgICAgICAgICAgICAgICBmb290ZXJMaW5rLnN0eWxlLm1heEhlaWdodCA9IG51bGw7XHJcbiAgICAgICAgICAgICAgICB9KTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH0pO1xyXG5cclxuICAgICAgICBmb290ZXJUaXRsZS5mb3JFYWNoKHRpdGxlID0+IHtcclxuICAgICAgICAgICAgdGl0bGUuYWRkRXZlbnRMaXN0ZW5lcignY2xpY2snLCBmdW5jdGlvbiAoKSB7XHJcbiAgICAgICAgICAgICAgICBjb25zdCBmb290ZXJMaW5rcyA9IHRoaXMubmV4dEVsZW1lbnRTaWJsaW5nO1xyXG4gICAgICAgICAgICAgICAgaWYgKGdldENvbXB1dGVkU3R5bGUoZm9vdGVyTGlua3MpLm1heEhlaWdodCA9PSAnMHB4Jykge1xyXG4gICAgICAgICAgICAgICAgICAgIHRoaXMuY2xhc3NMaXN0LmFkZCgnYWN0aXZlJyk7XHJcbiAgICAgICAgICAgICAgICAgICAgZm9vdGVyTGlua3Muc3R5bGUubWF4SGVpZ2h0ID0gZm9vdGVyTGlua3Muc2Nyb2xsSGVpZ2h0ICsgXCJweFwiO1xyXG4gICAgICAgICAgICAgICAgICAgIGZvb3RlckxpbmtzLnN0eWxlLm9wYWNpdHkgPSAxO1xyXG4gICAgICAgICAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgICAgICAgICB0aGlzLmNsYXNzTGlzdC5yZW1vdmUoJ2FjdGl2ZScpO1xyXG4gICAgICAgICAgICAgICAgICAgIGZvb3RlckxpbmtzLnN0eWxlLm1heEhlaWdodCA9IG51bGw7XHJcbiAgICAgICAgICAgICAgICAgICAgZm9vdGVyTGlua3Muc3R5bGUub3BhY2l0eSA9IG51bGw7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIH0pXHJcbiAgICAgICAgfSk7XHJcbiAgICB9XHJcblxyXG4gICAgc2hvd0Zvb3RlckxpbmtzKCk7XHJcblxyXG4gICAgY29uc3Qgc2V0UGVyY2VudCA9ICgpID0+IHtcclxuICAgICAgICBjb25zdCBjaXJjdWxhclByb2dyZXNzID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvckFsbChcIi5qcy1jaXJjdWxhci1wcm9ncmVzc1wiKTtcclxuXHJcbiAgICAgICAgY2lyY3VsYXJQcm9ncmVzcy5mb3JFYWNoKGl0ZW0gPT4ge1xyXG4gICAgICAgICAgICBjb25zdCBjaXJjbGUgPSBpdGVtLnF1ZXJ5U2VsZWN0b3IoJy5jaXJjdWxhci1wcm9ncmVzc19fcGVyY2VudCcpO1xyXG4gICAgICAgICAgICBjb25zdCB0ZXh0ID0gaXRlbS5xdWVyeVNlbGVjdG9yKCcuY2lyY3VsYXItaW5mb19fbnVtYmVyJyk7XHJcbiAgICAgICAgICAgIGNvbnN0IGRhdGFQZXJjZW50ID0gaXRlbS5nZXRBdHRyaWJ1dGUoJ2RhdGEtcGVyY2VudCcpO1xyXG4gICAgICAgICAgICBjb25zdCBwZXJjZW50ID0gKDEwMCAtIGRhdGFQZXJjZW50KSAvIDEwMDtcclxuICAgICAgICAgICAgY2lyY2xlLnN0eWxlLnN0cm9rZURhc2hvZmZzZXQgPSBgY2FsYygyKjMwKjMuMTQqJHtwZXJjZW50fSlgO1xyXG4gICAgICAgICAgICB0ZXh0LnRleHRDb250ZW50ID0gZGF0YVBlcmNlbnQ7XHJcbiAgICAgICAgfSk7XHJcbiAgICB9XHJcblxyXG4gICAgc2V0UGVyY2VudCgpO1xyXG5cclxuICAgIGRvY3VtZW50LmFkZEV2ZW50TGlzdGVuZXIoXCJibHVyXCIsIGZ1bmN0aW9uIChlKSB7XHJcbiAgICAgICAgaWYgKGUudGFyZ2V0LmNsYXNzTGlzdC5jb250YWlucygnY29udGFjdC1mb3JtX19maWVsZCcpIHx8IGUudGFyZ2V0LmNsYXNzTGlzdC5jb250YWlucygnY29udGFjdC1mb3JtX19tZXNzYWdlJykpIHtcclxuICAgICAgICAgICAgaWYgKGUudGFyZ2V0LnZhbHVlLnRyaW0oKSAhPSAnJykge1xyXG4gICAgICAgICAgICAgICAgZS50YXJnZXQubmV4dEVsZW1lbnRTaWJsaW5nLmNsYXNzTGlzdC5hZGQoJ2FjdGl2ZScpO1xyXG4gICAgICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICAgICAgZS50YXJnZXQubmV4dEVsZW1lbnRTaWJsaW5nLmNsYXNzTGlzdC5yZW1vdmUoJ2FjdGl2ZScpO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG4gICAgfSwgdHJ1ZSk7XHJcblxyXG4gICAgY29uc3QgcHJpY2VTbGlkZXIgPSAoKSA9PiB7XHJcbiAgICAgICAgY29uc3QgcmFuZ2VJbnB1dHMgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yQWxsKFwiLnByaWNlLXJhbmdlX19pbnB1dFwiKSxcclxuICAgICAgICAgICAgcHJpY2VJbnB1dHMgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yQWxsKFwiLnByaWNlLWlucHV0X19maWVsZFwiKSxcclxuICAgICAgICAgICAgcHJvZ3Jlc3MgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKFwiLnByaWNlLXNsaWRlcl9fcHJvZ3Jlc3NcIik7XHJcblxyXG4gICAgICAgIGxldCBwcmljZUdhcCA9IDUwMDtcclxuXHJcbiAgICAgICAgcHJpY2VJbnB1dHMuZm9yRWFjaCgocHJpY2VJbnB1dCkgPT4ge1xyXG4gICAgICAgICAgICBwcmljZUlucHV0LmFkZEV2ZW50TGlzdGVuZXIoXCJpbnB1dFwiLCAoZSkgPT4ge1xyXG4gICAgICAgICAgICAgICAgbGV0IG1pblZhbCA9IHBhcnNlSW50KHByaWNlSW5wdXRzWzBdLnZhbHVlKSxcclxuICAgICAgICAgICAgICAgICAgICBtYXhWYWwgPSBwYXJzZUludChwcmljZUlucHV0c1sxXS52YWx1ZSk7XHJcblxyXG4gICAgICAgICAgICAgICAgaWYgKG1heFZhbCAtIG1pblZhbCA+PSBwcmljZUdhcCAmJiBtYXhWYWwgPD0gNTAwMDApIHtcclxuICAgICAgICAgICAgICAgICAgICBpZiAoZS50YXJnZXQuY2xhc3NMaXN0LmNvbnRhaW5zKFwicHJpY2UtbWluXCIpKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHJhbmdlSW5wdXRzWzBdLnZhbHVlID0gbWluVmFsO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBwcm9ncmVzcy5zdHlsZS5sZWZ0ID0gKG1pblZhbCAvIHJhbmdlSW5wdXRzWzBdLm1heCkgKiAxMDAgKyBcIiVcIjtcclxuICAgICAgICAgICAgICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICByYW5nZUlucHV0c1sxXS52YWx1ZSA9IG1heFZhbDtcclxuICAgICAgICAgICAgICAgICAgICAgICAgcHJvZ3Jlc3Muc3R5bGUucmlnaHQgPSAxMDAgLSAobWF4VmFsIC8gcmFuZ2VJbnB1dHNbMV0ubWF4KSAqIDEwMCArIFwiJVwiO1xyXG4gICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgfSk7XHJcblxyXG4gICAgICAgIHJhbmdlSW5wdXRzLmZvckVhY2goKHJhbmdlSW5wdXQpID0+IHtcclxuICAgICAgICAgICAgcmFuZ2VJbnB1dC5hZGRFdmVudExpc3RlbmVyKFwiaW5wdXRcIiwgKGUpID0+IHtcclxuICAgICAgICAgICAgICAgIGxldCBtaW5WYWwgPSBwYXJzZUludChyYW5nZUlucHV0c1swXS52YWx1ZSksXHJcbiAgICAgICAgICAgICAgICAgICAgbWF4VmFsID0gcGFyc2VJbnQocmFuZ2VJbnB1dHNbMV0udmFsdWUpO1xyXG5cclxuICAgICAgICAgICAgICAgIGlmIChtYXhWYWwgLSBtaW5WYWwgPCBwcmljZUdhcCkge1xyXG4gICAgICAgICAgICAgICAgICAgIGlmIChlLnRhcmdldC5jbGFzc0xpc3QuY29udGFpbnMoXCJyYW5nZS1taW5cIikpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgcmFuZ2VJbnB1dHNbMF0udmFsdWUgPSBtYXhWYWwgLSBwcmljZUdhcDtcclxuICAgICAgICAgICAgICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICByYW5nZUlucHV0c1sxXS52YWx1ZSA9IG1pblZhbCArIHByaWNlR2FwO1xyXG4gICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgICAgICAgICAgcHJpY2VJbnB1dHNbMF0udmFsdWUgPSBtaW5WYWw7XHJcbiAgICAgICAgICAgICAgICAgICAgcHJpY2VJbnB1dHNbMV0udmFsdWUgPSBtYXhWYWw7XHJcbiAgICAgICAgICAgICAgICAgICAgcHJvZ3Jlc3Muc3R5bGUubGVmdCA9IChtaW5WYWwgLyByYW5nZUlucHV0c1swXS5tYXgpICogMTAwICsgXCIlXCI7XHJcbiAgICAgICAgICAgICAgICAgICAgcHJvZ3Jlc3Muc3R5bGUucmlnaHQgPSAxMDAgLSAobWF4VmFsIC8gcmFuZ2VJbnB1dHNbMV0ubWF4KSAqIDEwMCArIFwiJVwiO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB9KTtcclxuICAgICAgICB9KTtcclxuXHJcbiAgICAgICAgZnVuY3Rpb24gYWRkU3BhY2VzKHZhbHVlKSB7XHJcbiAgICAgICAgICAgIHZhbHVlID0gdmFsdWUucmVwbGFjZSgvIC9nLCcnKTtcclxuICAgICAgICAgICAgcmV0dXJuIHZhbHVlLnJlcGxhY2UoL1xcQig/PShcXGR7M30pKyg/IVxcZCkpL2csIFwiIFwiKTtcclxuICAgICAgICB9XHJcbiAgICB9O1xyXG5cclxuICAgIHByaWNlU2xpZGVyKCk7XHJcblxyXG4gICAgY29uc3Qgdmlld0FsbCA9ICgpID0+IHtcclxuICAgICAgICBpZiAoZG9jdW1lbnQucXVlcnlTZWxlY3RvckFsbChcIi5maWx0ZXItdmlldy1hbGxcIikubGVuZ3RoID09IDApIHJldHVybiBmYWxzZTtcclxuICAgICAgICBjb25zdCBmaWx0ZXJMaXN0ID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvckFsbChcIi5maWx0ZXItbGlzdFwiKTtcclxuICAgICAgICBjb25zdCB2aWV3QWxsID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvckFsbChcIi5maWx0ZXItdmlldy1hbGxcIik7XHJcblxyXG4gICAgICAgIGZpbHRlckxpc3QuZm9yRWFjaChsaXN0ID0+IHtcclxuICAgICAgICAgICAgaWYgKGxpc3QuY2hpbGRyZW4ubGVuZ3RoID4gNSkge1xyXG4gICAgICAgICAgICAgICAgY29uc3QgaXRlbXMgPSBsaXN0LmNoaWxkcmVuO1xyXG4gICAgICAgICAgICAgICAgY29uc3Qgdmlld0FsbCA9IGxpc3QubmV4dEVsZW1lbnRTaWJsaW5nO1xyXG4gICAgICAgICAgICAgICAgZm9yIChsZXQgaSA9IDAsIGxlbiA9IGl0ZW1zLmxlbmd0aDsgaSA8IGxlbjsgaSsrKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgaWYgKGkgPj0gNSkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBpdGVtc1tpXS5zdHlsZS5kaXNwbGF5ID0gXCJub25lXCI7XHJcbiAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgdmlld0FsbC5zdHlsZS5kaXNwbGF5ID0gXCJibG9ja1wiO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfSk7XHJcblxyXG4gICAgICAgIHZpZXdBbGwuZm9yRWFjaChlbCA9PiB7XHJcbiAgICAgICAgICAgIGVsLmFkZEV2ZW50TGlzdGVuZXIoXCJjbGlja1wiLCBmdW5jdGlvbiAoKSB7XHJcbiAgICAgICAgICAgICAgICBjb25zdCBmaWx0ZXJJdGVtcyA9IHRoaXMucHJldmlvdXNFbGVtZW50U2libGluZy5jaGlsZHJlbjtcclxuICAgICAgICAgICAgICAgIGNvbnN0IGZpbHRlckNvbnRlbnQgPSB0aGlzLmNsb3Nlc3QoXCIuZmlsdGVyLWNvbnRlbnRcIik7XHJcbiAgICAgICAgICAgICAgICBmb3IgKGxldCBpID0gMCwgbGVuID0gZmlsdGVySXRlbXMubGVuZ3RoOyBpIDwgbGVuOyBpKyspIHtcclxuICAgICAgICAgICAgICAgICAgICBpZiAoaSA+PSA1KSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGlmIChmaWx0ZXJJdGVtc1tpXS5zdHlsZS5kaXNwbGF5KSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBmaWx0ZXJJdGVtc1tpXS5zdHlsZS5kaXNwbGF5ID0gbnVsbDtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMudGV4dENvbnRlbnQgPSBcIkhpZGVcIlxyXG4gICAgICAgICAgICAgICAgICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgZmlsdGVySXRlbXNbaV0uc3R5bGUuZGlzcGxheSA9IFwibm9uZVwiO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy50ZXh0Q29udGVudCA9IFwiVmlldyBhbGxcIlxyXG4gICAgICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgZmlsdGVyQ29udGVudC5zdHlsZS5tYXhIZWlnaHQgPSBmaWx0ZXJDb250ZW50LnNjcm9sbEhlaWdodCArIFwicHhcIjtcclxuICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgfSk7XHJcbiAgICB9XHJcblxyXG4gICAgdmlld0FsbCgpO1xyXG5cclxuICAgIGNvbnN0IGlucHV0VmFsdWUgPSAoKSA9PiB7XHJcbiAgICAgICAgY29uc3QgaW5wdXRGaWVsZCA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoXCIucHJvZHVjdC1jb21wYXJlLWZvcm1fX2ZpZWxkXCIpO1xyXG4gICAgICAgIGNvbnN0IGFkZFZhbHVlQnRucyA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3JBbGwoXCIuanMtY29tcGFyZVwiKTtcclxuICAgICAgICBhZGRWYWx1ZUJ0bnMuZm9yRWFjaChhZGRWYWx1ZUJ0biA9PiB7XHJcbiAgICAgICAgICAgIGFkZFZhbHVlQnRuLmFkZEV2ZW50TGlzdGVuZXIoXCJjbGlja1wiLCBmdW5jdGlvbiAoKSB7XHJcbiAgICAgICAgICAgICAgICBjb25zdCB2YWwgPSB0aGlzLnByZXZpb3VzRWxlbWVudFNpYmxpbmcudGV4dENvbnRlbnQ7XHJcbiAgICAgICAgICAgICAgICBpbnB1dEZpZWxkLnZhbHVlID0gdmFsO1xyXG4gICAgICAgICAgICB9KTtcclxuICAgICAgICB9KTtcclxuICAgIH1cclxuXHJcbiAgICBpbnB1dFZhbHVlKCk7XHJcblxyXG4gICAgJChcIi5qcy1wcm9kdWN0LXNsaWRlci1wcmV2aWV3XCIpLnNsaWNrKHtcclxuICAgICAgICBzbGlkZXNUb1Nob3c6IDQsXHJcbiAgICAgICAgdmVydGljYWw6IHRydWUsXHJcbiAgICAgICAgdmVydGljYWxTd2lwaW5nOiB0cnVlLFxyXG4gICAgICAgIHNsaWRlc1RvU2Nyb2xsOiAxLFxyXG4gICAgICAgIGZvY3VzT25TZWxlY3Q6IHRydWUsXHJcbiAgICAgICAgcHJldkFycm93OiBcIi5wcm9kdWN0LXNsaWRlci1wcmV2aWV3X19idG4tLXByZXZcIixcclxuICAgICAgICBuZXh0QXJyb3c6IFwiLnByb2R1Y3Qtc2xpZGVyLXByZXZpZXdfX2J0bi0tbmV4dFwiLFxyXG4gICAgICAgIHZhcmlhYmxlV2lkdGg6IHRydWUsXHJcbiAgICAgICAgYXNOYXZGb3I6IFwiLnByb2R1Y3Qtc2xpZGVyLW1haW5cIlxyXG4gICAgfSk7XHJcbiAgICAkKFwiLnByb2R1Y3Qtc2xpZGVyLW1haW5cIikuc2xpY2soe1xyXG4gICAgICAgIHNsaWRlc1RvU2hvdzogMSxcclxuICAgICAgICBzbGlkZXNUb1Njcm9sbDogMSxcclxuICAgICAgICBhcnJvd3M6IGZhbHNlLFxyXG4gICAgICAgIGZhZGU6IHRydWUsXHJcbiAgICAgICAgYXNOYXZGb3I6IFwiLmpzLXByb2R1Y3Qtc2xpZGVyLXByZXZpZXdcIlxyXG4gICAgfSk7XHJcbiAgICAkKFwiLmpzLXByb2R1Y3QtY29tcGFyZS1zbGlkZXJcIikuc2xpY2soe1xyXG4gICAgICAgIHNsaWRlc1RvU2hvdzogMSxcclxuICAgICAgICBzbGlkZXNUb1Njcm9sbDogMSxcclxuICAgICAgICBwcmV2QXJyb3c6IFwiLnByb2R1Y3QtY29tcGFyZS1zbGlkZXJfX2J0bi0tcHJldlwiLFxyXG4gICAgICAgIG5leHRBcnJvdzogXCIucHJvZHVjdC1jb21wYXJlLXNsaWRlcl9fYnRuLS1uZXh0XCIsXHJcbiAgICAgICAgLy8gdmFyaWFibGVXaWR0aDogdHJ1ZSxcclxuICAgIH0pO1xyXG4gICAgJChcIi5qcy1yZWxhdGVkLXByb2R1Y3RzLXNsaWRlclwiKS5zbGljayh7XHJcbiAgICAgICAgc2xpZGVzVG9TaG93OiAzLFxyXG4gICAgICAgIHNsaWRlc1RvU2Nyb2xsOiAxLFxyXG4gICAgICAgIHByZXZBcnJvdzogXCIuanMtcmVsYXRlZC1wcmV2XCIsXHJcbiAgICAgICAgbmV4dEFycm93OiBcIi5qcy1yZWxhdGVkLW5leHRcIixcclxuICAgICAgICByZXNwb25zaXZlOiBbXHJcbiAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICAgIGJyZWFrcG9pbnQ6IDc2OCxcclxuICAgICAgICAgICAgICAgIHNldHRpbmdzOiB7XHJcbiAgICAgICAgICAgICAgICAgICAgc2xpZGVzVG9TaG93OiAyLFxyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB9LFxyXG4gICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgICBicmVha3BvaW50OiA1NzYsXHJcbiAgICAgICAgICAgICAgICBzZXR0aW5nczoge1xyXG4gICAgICAgICAgICAgICAgICAgIHNsaWRlc1RvU2hvdzogMSxcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgfSxcclxuICAgICAgICBdXHJcbiAgICB9KTtcclxuICAgICQoXCIuanMtcmVzZW50bHktdmlld2VkLXNsaWRlclwiKS5zbGljayh7XHJcbiAgICAgICAgc2xpZGVzVG9TaG93OiA0LFxyXG4gICAgICAgIHNsaWRlc1RvU2Nyb2xsOiAxLFxyXG4gICAgICAgIHByZXZBcnJvdzogXCIuanMtcmVzZW50bHktdmlld2VkLXByZXZcIixcclxuICAgICAgICBuZXh0QXJyb3c6IFwiLmpzLXJlc2VudGx5LXZpZXdlZC1uZXh0XCIsXHJcbiAgICAgICAgcmVzcG9uc2l2ZTogW1xyXG4gICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgICBicmVha3BvaW50OiA5OTMsXHJcbiAgICAgICAgICAgICAgICBzZXR0aW5nczoge1xyXG4gICAgICAgICAgICAgICAgICAgIHNsaWRlc1RvU2hvdzogMyxcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgfSxcclxuICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgYnJlYWtwb2ludDogNzY5LFxyXG4gICAgICAgICAgICAgICAgc2V0dGluZ3M6IHtcclxuICAgICAgICAgICAgICAgICAgICBzbGlkZXNUb1Nob3c6IDIsXHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIH0sXHJcbiAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICAgIGJyZWFrcG9pbnQ6IDU3NyxcclxuICAgICAgICAgICAgICAgIHNldHRpbmdzOiB7XHJcbiAgICAgICAgICAgICAgICAgICAgc2xpZGVzVG9TaG93OiAxLFxyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB9LFxyXG4gICAgICAgIF1cclxuICAgIH0pO1xyXG4gICAgJCgnYm9keScpLm9uKCdrZXl1cCcsICcuanMtc2VhcmNoLW1hdGNoZXMnLCBmdW5jdGlvbiAoKSB7XHJcbiAgICAgICAgbGV0IHNlbGYgPSAkKHRoaXMpO1xyXG4gICAgICAgIGxldCBsaXN0ID0gJCgnLicgKyBzZWxmLmRhdGEoJ2xpc3QnKSk7XHJcbiAgICAgICAgJC5hamF4KHtcclxuICAgICAgICAgICAgdXJsOiBzZWxmLmRhdGEoJ3VybCcpICsgJz9xPScgKyBzZWxmLnZhbCgpLFxyXG4gICAgICAgICAgICB0eXBlOiAnR0VUJyxcclxuICAgICAgICAgICAgZGF0YVR5cGU6ICdqc29uJyxcclxuICAgICAgICAgICAgc3VjY2VzczogZnVuY3Rpb24gKHJlc3BvbnNlKSB7XHJcbiAgICAgICAgICAgICAgICBsaXN0LmVtcHR5KCk7XHJcblxyXG4gICAgICAgICAgICAgICAgaWYgKHJlc3BvbnNlLml0ZW1zLmxlbmd0aCkge1xyXG4gICAgICAgICAgICAgICAgICAgICQuZWFjaChyZXNwb25zZS5pdGVtcywgZnVuY3Rpb24gKGksIGl0ZW0pIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgbGlzdC5hcHBlbmQoYDxhIGNsYXNzPVwic2VhcmNoLWZvcm0tbWF0Y2hlc19fbGlua1wiIGhyZWY9XCIke2l0ZW0udXJsfVwiPiR7aXRlbS50aXRsZX08L2E+YCk7XHJcbiAgICAgICAgICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9KTtcclxuICAgIH0pO1xyXG59KSgpOyJdLCJmaWxlIjoibWFpbi5qcyJ9
