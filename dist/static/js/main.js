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
//# sourceMappingURL=data:application/json;charset=utf8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIm1haW4uanMiXSwibmFtZXMiOlsiY3JvcFRleHQiLCJoaWRlQmxvY2siLCJyZWFkTW9yZSIsImRvY3VtZW50IiwicXVlcnlTZWxlY3RvckFsbCIsImZvckVhY2giLCJlbCIsImFkZEV2ZW50TGlzdGVuZXIiLCJlbFRleHQiLCJpbm5lclRleHQiLCJoaWRkZW5UZXh0IiwicHJldmlvdXNFbGVtZW50U2libGluZyIsImNsYXNzTGlzdCIsInRvZ2dsZSIsIm1heCIsInRleHQiLCJzdHIiLCJ0cmltIiwibGVuZ3RoIiwic3ViU3RyIiwic3Vic3RyaW5nIiwiaGlkZGVuU3RyIiwiaW5uZXJIVE1MIiwic2hvd1JldmlldyIsImltYWdlcyIsIm5leHRFbGVtZW50U2libGluZyIsInByb2R1Y3RSZXZpZXciLCJwcm9kdWN0VGV4dCIsInF1ZXJ5U2VsZWN0b3IiLCJjcmVhdGVFbGVtZW50IiwiYWRkIiwidGV4dENvbnRlbnQiLCJhZnRlciIsImJlZm9yZSIsImFjY29yZGlvbiIsImUiLCJ0YXJnZXQiLCJjb250YWlucyIsImNsb3Nlc3QiLCJhY2NvcmRpb25Db250ZW50Iiwic3R5bGUiLCJtYXhIZWlnaHQiLCJnZXRDb21wdXRlZFN0eWxlIiwicGFyZW50RWxlbWVudCIsInJlbW92ZSIsInNjcm9sbEhlaWdodCIsInNpZGViYXJMaW5rcyIsImVsZW0iLCJuYXZiYXJMaW5rQ2xpY2siLCJldmVudCIsInNtb290aFNjcm9sbCIsInByZXZlbnREZWZhdWx0IiwidGFyZ2V0SWQiLCJjdXJyZW50VGFyZ2V0IiwiZ2V0QXR0cmlidXRlIiwid2luZG93Iiwic2NyZWVuIiwid2lkdGgiLCJzY3JvbGxUbyIsInRvcCIsIm9mZnNldFRvcCIsImJlaGF2aW9yIiwidG9nZ2xlRml4ZWQiLCJ0aHJvdHRsZSIsInRyYWNrU2Nyb2xsIiwiZWxlbWVudHMiLCJzdGlja3lCbG9ja3MiLCJwYWdlWU9mZnNldCIsInN0aWNreUJsb2NrQ29vcmRzIiwiZ2V0Qm91bmRpbmdDbGllbnRSZWN0IiwiYm90dG9tIiwidHlwZSIsIm5hbWUiLCJvYmoiLCJydW5uaW5nIiwiZnVuYyIsInJlcXVlc3RBbmltYXRpb25GcmFtZSIsImRpc3BhdGNoRXZlbnQiLCJDdXN0b21FdmVudCIsImVsZW1lbnQiLCJmaXhlZFdpZHRoIiwiY2xpZW50V2lkdGgiLCJzaG93SGlkZVNpZGViYXJGaWx0ZXJzIiwic2hvd0hpZGVGaWx0ZXJzIiwic2lkZWJhckZpbHRlcnMiLCJmaWx0ZXIiLCJ0cmlnZ2VyIiwibW9iaWxlTmF2IiwiaXNDbG9zZWQiLCJidXJnZXJUaW1lIiwic2VhcmNoQnRuIiwidmFsdWUiLCJwcm9kdWN0UmV2aWV3U3RhcnMiLCJkYXRhUmF0aW5nIiwic3RhcnMiLCJjaGlsZHJlbiIsImkiLCJjaG9vc2VSYXRpbmciLCJyYXRpbmciLCJyYXRlIiwicmF0aW5nU3RhcnMiLCJyZW1vdmVDbGFzcyIsIm1vdXNlT3ZlckFjdGl2ZUNsYXNzIiwiYWRkQ2xhc3MiLCJtb3VzZU91dEFjdGl2ZUNsYXNzIiwiYXJyIiwiaUxlbmciLCJqIiwiYXJndW1lbnRzIiwiaUxlbiIsImNhcmV0RHJvcGRvd24iLCJmaXJzdEVsZW1lbnRDaGlsZCIsImRyb3Bkb3duIiwib3BhY2l0eSIsImJhc2ljU2Nyb2xsVG9wIiwiYnRuVG9wIiwiYnRuUmV2ZWFsIiwic2Nyb2xsWSIsIlRvcHNjcm9sbFRvIiwic2V0VGltZW91dCIsIm9wZW5Nb2RhbCIsImJ0biIsIm1vZGFsIiwibW9kYWxCdG4iLCJtb2RhbENvbnRhaW5lciIsIm5hdmlnYXRvciIsInVzZXJBZ2VudCIsIm1hdGNoIiwiYm9keSIsImtleUNvZGUiLCJzZWVNb3JlIiwibnVtYmVyIiwiYnV0dG9uIiwic2hvd0hpZGVCbG9ja3MiLCJpbmRleCIsImRpc3BsYXkiLCJlbGVtcyIsImJ0blNob3dIaWRlIiwic2hvd0l0ZW1zIiwibnVtYmVyRGVza3RvcCIsIm51bWJlck1vYmlsZSIsIml0ZW1zIiwic2hvd0hpZGVJdGVtcyIsImVscyIsInNob3dGb290ZXJMaW5rcyIsImZvb3RlclRpdGxlIiwiZm9vdGVyTGlua3MiLCJmb290ZXJMaW5rIiwidGl0bGUiLCJzaG93U2lkZWJhckl0ZW1zIiwic2lkZWJhclNlZU1vcmUiLCJzaWRlYmFySXRlbXMiLCJsZW4iLCJzZXRQZXJjZW50IiwiY2lyY3VsYXJQcm9ncmVzcyIsIml0ZW0iLCJjaXJjbGUiLCJkYXRhUGVyY2VudCIsInBlcmNlbnQiLCJzdHJva2VEYXNob2Zmc2V0IiwicHJpY2VTbGlkZXIiLCJyYW5nZUlucHV0cyIsInByaWNlSW5wdXRzIiwicHJvZ3Jlc3MiLCJwcmljZUdhcCIsInByaWNlSW5wdXQiLCJtaW5WYWwiLCJwYXJzZUludCIsIm1heFZhbCIsImxlZnQiLCJyaWdodCIsInJhbmdlSW5wdXQiLCJhZGRTcGFjZXMiLCJyZXBsYWNlIiwidmlld0FsbCIsImZpbHRlckxpc3QiLCJsaXN0IiwiZmlsdGVySXRlbXMiLCJmaWx0ZXJDb250ZW50IiwiaW5wdXRWYWx1ZSIsImlucHV0RmllbGQiLCJhZGRWYWx1ZUJ0bnMiLCJhZGRWYWx1ZUJ0biIsInZhbCIsIiQiLCJzbGljayIsInNsaWRlc1RvU2hvdyIsInZlcnRpY2FsIiwidmVydGljYWxTd2lwaW5nIiwic2xpZGVzVG9TY3JvbGwiLCJmb2N1c09uU2VsZWN0IiwicHJldkFycm93IiwibmV4dEFycm93IiwidmFyaWFibGVXaWR0aCIsImFzTmF2Rm9yIiwiYXJyb3dzIiwiZmFkZSIsInJlc3BvbnNpdmUiLCJicmVha3BvaW50Iiwic2V0dGluZ3MiLCJvbiIsInNlbGYiLCJkYXRhIiwiYWpheCIsInVybCIsImRhdGFUeXBlIiwic3VjY2VzcyIsInJlc3BvbnNlIiwiZW1wdHkiLCJlYWNoIiwiYXBwZW5kIl0sIm1hcHBpbmdzIjoiOztBQUFBOztBQUNBLENBQUMsWUFBWTtBQUNUQSxFQUFBQSxRQUFRO0FBQ1JDLEVBQUFBLFNBQVM7QUFFVCxNQUFJQyxRQUFRLEdBQUdDLFFBQVEsQ0FBQ0MsZ0JBQVQsQ0FBMEIsZUFBMUIsQ0FBZjtBQUVBRixFQUFBQSxRQUFRLENBQUNHLE9BQVQs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QUFuQixFQUEyQjtBQUN2QnNLLFVBQUFBLENBQUMsQ0FBQ3lCLElBQUYsQ0FBT0YsUUFBUSxDQUFDbEUsS0FBaEIsRUFBdUIsVUFBVTdDLENBQVYsRUFBYTJELElBQWIsRUFBbUI7QUFDdENxQixZQUFBQSxJQUFJLENBQUNrQyxNQUFMLHlEQUEwRHZELElBQUksQ0FBQ2lELEdBQS9ELGdCQUF1RWpELElBQUksQ0FBQ1AsS0FBNUU7QUFDSCxXQUZEO0FBR0g7QUFDSjtBQVpFLEtBQVA7QUFjSCxHQWpCRDtBQWtCSCxDQXZ4QkQiLCJzb3VyY2VzQ29udGVudCI6WyI7XHJcbihmdW5jdGlvbiAoKSB7XHJcbiAgICBjcm9wVGV4dCgpO1xyXG4gICAgaGlkZUJsb2NrKCk7XHJcblxyXG4gICAgbGV0IHJlYWRNb3JlID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvckFsbCgnLmpzLXJlYWQtbW9yZScpO1xyXG5cclxuICAgIHJlYWRNb3JlLmZvckVhY2goZWwgPT4ge1xyXG4gICAgICAgIGVsLmFkZEV2ZW50TGlzdGVuZXIoJ2NsaWNrJywgKCkgPT4ge1xyXG4gICAgICAgICAgICBsZXQgZWxUZXh0ID0gZWwuaW5uZXJUZXh0O1xyXG4gICAgICAgICAgICBsZXQgaGlkZGVuVGV4dCA9IGVsLnByZXZpb3VzRWxlbWVudFNpYmxpbmc7XHJcblxyXG4gICAgICAgICAgICBlbC5pbm5lclRleHQgPSBlbFRleHQgPT0gJ3JlYWQgbW9yZSA+JyA/ICdoaWRlJyA6ICdyZWFkIG1vcmUgPic7XHJcbiAgICAgICAgICAgIGhpZGRlblRleHQuY2xhc3NMaXN0LnRvZ2dsZSgnc2hvdycpO1xyXG4gICAgICAgIH0pO1xyXG4gICAgfSk7XHJcblxyXG4gICAgZnVuY3Rpb24gY3JvcFRleHQoKSB7XHJcbiAgICAgICAgbGV0IG1heCA9IDIwMDtcclxuICAgICAgICBsZXQgdGV4dCA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3JBbGwoJy5qcy1yZWFkLW1vcmUtdGV4dCcpO1xyXG4gICAgICAgIHRleHQuZm9yRWFjaChlbCA9PiB7XHJcbiAgICAgICAgICAgIGxldCBzdHIgPSBlbC5pbm5lclRleHQudHJpbSgpO1xyXG4gICAgICAgICAgICBpZiAoc3RyLmxlbmd0aCA+IG1heCkge1xyXG4gICAgICAgICAgICAgICAgbGV0IHN1YlN0ciA9IHN0ci5zdWJzdHJpbmcoMCwgbWF4KTtcclxuICAgICAgICAgICAgICAgIGxldCBoaWRkZW5TdHIgPSBzdHIuc3Vic3RyaW5nKG1heCwgc3RyLmxlbmd0aCk7XHJcbiAgICAgICAgICAgICAgICBlbC5pbm5lclRleHQgPSBzdWJTdHI7XHJcbiAgICAgICAgICAgICAgICBlbC5pbm5lckhUTUwgKz0gYDxzcGFuIGNsYXNzPVwiaGlkZGVuLXRleHQganMtaGlkZGVuLXRleHRcIj4ke2hpZGRlblN0cn08L3NwYW4+YDtcclxuICAgICAgICAgICAgICAgIGVsLmlubmVySFRNTCArPSAnPHNwYW4gY2xhc3M9XCJyZWFkLW1vcmUganMtcmVhZC1tb3JlXCI+cmVhZCBtb3JlID48L3NwYW4+JztcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH0pO1xyXG4gICAgfVxyXG5cclxuICAgIGxldCBzaG93UmV2aWV3ID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvckFsbCgnLmpzLXNob3ctcmV2aWV3Jyk7XHJcblxyXG4gICAgc2hvd1Jldmlldy5mb3JFYWNoKGVsID0+IHtcclxuICAgICAgICBlbC5hZGRFdmVudExpc3RlbmVyKCdjbGljaycsICgpID0+IHtcclxuICAgICAgICAgICAgbGV0IGVsVGV4dCA9IGVsLmlubmVyVGV4dDtcclxuICAgICAgICAgICAgbGV0IGhpZGRlblRleHQgPSBlbC5wcmV2aW91c0VsZW1lbnRTaWJsaW5nO1xyXG4gICAgICAgICAgICBsZXQgaW1hZ2VzID0gZWwubmV4dEVsZW1lbnRTaWJsaW5nO1xyXG5cclxuICAgICAgICAgICAgZWwuaW5uZXJUZXh0ID0gZWxUZXh0ID09ICdyZWFkIG1vcmUgPicgPyAnPCBoaWRlJyA6ICdyZWFkIG1vcmUgPic7XHJcbiAgICAgICAgICAgIGhpZGRlblRleHQuY2xhc3NMaXN0LnRvZ2dsZSgnc2hvdycpO1xyXG4gICAgICAgICAgICBpbWFnZXMuY2xhc3NMaXN0LnRvZ2dsZShcInNob3dcIik7XHJcbiAgICAgICAgfSk7XHJcbiAgICB9KTtcclxuXHJcbiAgICBmdW5jdGlvbiBoaWRlQmxvY2soKSB7XHJcbiAgICAgICAgbGV0IG1heCA9IDEyODtcclxuICAgICAgICBsZXQgcHJvZHVjdFJldmlldyA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3JBbGwoJy5qcy1oaWRlLXJldmlldycpO1xyXG4gICAgICAgIHByb2R1Y3RSZXZpZXcuZm9yRWFjaChlbCA9PiB7XHJcbiAgICAgICAgICAgIGxldCBwcm9kdWN0VGV4dCA9IGVsLnF1ZXJ5U2VsZWN0b3IoXCIucGFnZS10ZXh0XCIpO1xyXG4gICAgICAgICAgICBsZXQgc3RyID0gcHJvZHVjdFRleHQuaW5uZXJUZXh0LnRyaW0oKTtcclxuICAgICAgICAgICAgbGV0IGltYWdlcyA9IGVsLnF1ZXJ5U2VsZWN0b3IoJy5wcm9kdWN0LXJldmlld19faW1hZ2VzJyk7XHJcbiAgICAgICAgICAgIGlmIChzdHIubGVuZ3RoID4gbWF4KSB7XHJcbiAgICAgICAgICAgICAgICBsZXQgc3ViU3RyID0gc3RyLnN1YnN0cmluZygwLCBtYXgpO1xyXG4gICAgICAgICAgICAgICAgbGV0IGhpZGRlblN0ciA9IHN0ci5zdWJzdHJpbmcobWF4LCBzdHIubGVuZ3RoKTtcclxuICAgICAgICAgICAgICAgIHByb2R1Y3RUZXh0LmlubmVyVGV4dCA9IHN1YlN0cjtcclxuXHJcbiAgICAgICAgICAgICAgICBsZXQgaGlkZGVuVGV4dCA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ3NwYW4nKTtcclxuICAgICAgICAgICAgICAgIGhpZGRlblRleHQuY2xhc3NMaXN0LmFkZCgnaGlkZGVuLXRleHQnLCAncGFnZS10ZXh0JywgJ2pzLWhpZGRlbi10ZXh0Jyk7XHJcbiAgICAgICAgICAgICAgICBoaWRkZW5UZXh0LnRleHRDb250ZW50ID0gaGlkZGVuU3RyO1xyXG5cclxuICAgICAgICAgICAgICAgIHByb2R1Y3RUZXh0LmFmdGVyKGhpZGRlblRleHQpO1xyXG5cclxuICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgbGV0IHJlYWRNb3JlID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnc3BhbicpO1xyXG4gICAgICAgICAgICByZWFkTW9yZS5jbGFzc0xpc3QuYWRkKCdyZWFkLW1vcmUnLCAnanMtc2hvdy1yZXZpZXcnKTtcclxuICAgICAgICAgICAgcmVhZE1vcmUudGV4dENvbnRlbnQgPSAncmVhZCBtb3JlID4nO1xyXG5cclxuICAgICAgICAgICAgaW1hZ2VzLmJlZm9yZShyZWFkTW9yZSk7XHJcbiAgICAgICAgfSk7XHJcbiAgICB9XHJcblxyXG4gICAgY29uc3QgYWNjb3JkaW9uID0gKCkgPT4ge1xyXG4gICAgICAgIGRvY3VtZW50LmFkZEV2ZW50TGlzdGVuZXIoJ2NsaWNrJywgZSA9PiB7XHJcbiAgICAgICAgICAgIGlmIChlLnRhcmdldC5jbGFzc0xpc3QuY29udGFpbnMoJ2pzLWFjY29yZGlvbicpIHx8IGUudGFyZ2V0LmNsb3Nlc3QoJy5qcy1hY2NvcmRpb24nKSkge1xyXG4gICAgICAgICAgICAgICAgY29uc3QgYWNjb3JkaW9uID0gZS50YXJnZXQuY2xhc3NMaXN0LmNvbnRhaW5zKCdqcy1hY2NvcmRpb24nKSA/IGUudGFyZ2V0IDogZS50YXJnZXQuY2xvc2VzdCgnLmpzLWFjY29yZGlvbicpO1xyXG4gICAgICAgICAgICAgICAgY29uc3QgYWNjb3JkaW9uQ29udGVudCA9IGFjY29yZGlvbi5uZXh0RWxlbWVudFNpYmxpbmc7XHJcbiAgICAgICAgICAgICAgICBpZiAoYWNjb3JkaW9uQ29udGVudC5zdHlsZS5tYXhIZWlnaHQgfHwgZ2V0Q29tcHV0ZWRTdHlsZShhY2NvcmRpb25Db250ZW50KS5tYXhIZWlnaHQgPT0gXCJtYXgtY29udGVudFwiKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgYWNjb3JkaW9uLnBhcmVudEVsZW1lbnQuY2xhc3NMaXN0LnJlbW92ZShcImFjdGl2ZVwiKTtcclxuICAgICAgICAgICAgICAgICAgICBhY2NvcmRpb25Db250ZW50LnN0eWxlLm1heEhlaWdodCA9IG51bGw7XHJcbiAgICAgICAgICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICAgICAgICAgIGFjY29yZGlvbi5wYXJlbnRFbGVtZW50LmNsYXNzTGlzdC5hZGQoXCJhY3RpdmVcIik7XHJcbiAgICAgICAgICAgICAgICAgICAgYWNjb3JkaW9uQ29udGVudC5zdHlsZS5tYXhIZWlnaHQgPSBhY2NvcmRpb25Db250ZW50LnNjcm9sbEhlaWdodCArIFwicHhcIjtcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH0pO1xyXG4gICAgfVxyXG4gICAgYWNjb3JkaW9uKCk7XHJcblxyXG4gICAgY29uc3Qgc2lkZWJhckxpbmtzID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvckFsbChcIi5zaWRlYmFyLW1lbnVfX2xpbmtcIik7XHJcblxyXG4gICAgc2lkZWJhckxpbmtzLmZvckVhY2goZWxlbSA9PiBlbGVtLmFkZEV2ZW50TGlzdGVuZXIoXCJjbGlja1wiLCBuYXZiYXJMaW5rQ2xpY2spKTtcclxuXHJcbiAgICBmdW5jdGlvbiBuYXZiYXJMaW5rQ2xpY2soZXZlbnQpIHtcclxuICAgICAgICBzbW9vdGhTY3JvbGwoZXZlbnQpO1xyXG4gICAgfVxyXG5cclxuICAgIGZ1bmN0aW9uIHNtb290aFNjcm9sbChldmVudCkge1xyXG4gICAgICAgIGV2ZW50LnByZXZlbnREZWZhdWx0KCk7XHJcbiAgICAgICAgY29uc3QgdGFyZ2V0SWQgPSBldmVudC5jdXJyZW50VGFyZ2V0LmdldEF0dHJpYnV0ZShcImhyZWZcIik7XHJcbiAgICAgICAgaWYgKHdpbmRvdy5zY3JlZW4ud2lkdGggPiAxMDI0KSB7XHJcbiAgICAgICAgICAgIHdpbmRvdy5zY3JvbGxUbyh7XHJcbiAgICAgICAgICAgICAgICB0b3A6IHRhcmdldElkID09PSBcIiNcIiA/IDAgOiBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKHRhcmdldElkKS5vZmZzZXRUb3AgLSAxMDAsXHJcbiAgICAgICAgICAgICAgICBiZWhhdmlvcjogXCJzbW9vdGhcIlxyXG4gICAgICAgICAgICB9KTtcclxuICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICB3aW5kb3cuc2Nyb2xsVG8oe1xyXG4gICAgICAgICAgICAgICAgdG9wOiB0YXJnZXRJZCA9PT0gXCIjXCIgPyAwIDogZG9jdW1lbnQucXVlcnlTZWxlY3Rvcih0YXJnZXRJZCkub2Zmc2V0VG9wIC0gMjAwLFxyXG4gICAgICAgICAgICAgICAgYmVoYXZpb3I6IFwic21vb3RoXCJcclxuICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG5cclxuICAgIGlmIChkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcucHJvZHVjdHMtc3RpY2t5JykgIT09IG51bGwpIHtcclxuXHJcbiAgICAgICAgd2luZG93LmFkZEV2ZW50TGlzdGVuZXIoJ29wdGltaXplZFJlc2l6ZScsICgpID0+IHtcclxuICAgICAgICAgICAgdG9nZ2xlRml4ZWQoJy5wcm9kdWN0cy1zdGlja3knKTtcclxuICAgICAgICB9KTtcclxuXHJcblxyXG4gICAgICAgIHRvZ2dsZUZpeGVkKCcucHJvZHVjdHMtc3RpY2t5Jyk7XHJcblxyXG4gICAgICAgIHRocm90dGxlKFwicmVzaXplXCIsIFwib3B0aW1pemVkUmVzaXplXCIpO1xyXG5cclxuICAgIH1cclxuXHJcbiAgICBpZiAoZG9jdW1lbnQucXVlcnlTZWxlY3RvcignLnN0aWNreS1ibG9jaycpICE9PSBudWxsKSB7XHJcbiAgICAgICAgbGV0IHN0aWNreUJsb2NrQ29vcmRzID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignLnN0aWNreS1ibG9jaycpLmdldEJvdW5kaW5nQ2xpZW50UmVjdCgpLmJvdHRvbSArIHdpbmRvdy5wYWdlWU9mZnNldDtcclxuXHJcbiAgICAgICAgd2luZG93LmFkZEV2ZW50TGlzdGVuZXIoXCJzY3JvbGxcIiwgZnVuY3Rpb24gKCkge1xyXG4gICAgICAgICAgICB0cmFja1Njcm9sbCgnLnN0aWNreS1ibG9jaycpO1xyXG4gICAgICAgIH0pO1xyXG5cclxuICAgICAgICBmdW5jdGlvbiB0cmFja1Njcm9sbChlbGVtZW50cykge1xyXG4gICAgICAgICAgICBsZXQgc3RpY2t5QmxvY2tzID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvckFsbChlbGVtZW50cyk7XHJcbiAgICAgICAgICAgIHN0aWNreUJsb2Nrcy5mb3JFYWNoKGVsID0+IHtcclxuICAgICAgICAgICAgICAgIGlmIChlbC5jbGFzc0xpc3QuY29udGFpbnMoJ3Nob3cnKSAmJiB3aW5kb3cucGFnZVlPZmZzZXQgPCBzdGlja3lCbG9ja0Nvb3Jkcykge1xyXG4gICAgICAgICAgICAgICAgICAgIGVsLmNsYXNzTGlzdC5yZW1vdmUoJ3Nob3cnKTtcclxuICAgICAgICAgICAgICAgIH0gZWxzZSBpZiAod2luZG93LnBhZ2VZT2Zmc2V0ID4gc3RpY2t5QmxvY2tDb29yZHMpIHtcclxuICAgICAgICAgICAgICAgICAgICBlbC5jbGFzc0xpc3QuYWRkKCdzaG93Jyk7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIH0pO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxuXHJcbiAgICBmdW5jdGlvbiB0aHJvdHRsZSh0eXBlLCBuYW1lLCBvYmopIHtcclxuICAgICAgICBvYmogPSBvYmogfHwgd2luZG93O1xyXG4gICAgICAgIHZhciBydW5uaW5nID0gZmFsc2U7XHJcbiAgICAgICAgdmFyIGZ1bmMgPSBmdW5jdGlvbiAoKSB7XHJcbiAgICAgICAgICAgIGlmIChydW5uaW5nKSB7XHJcbiAgICAgICAgICAgICAgICByZXR1cm47XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgcnVubmluZyA9IHRydWU7XHJcbiAgICAgICAgICAgIHJlcXVlc3RBbmltYXRpb25GcmFtZShmdW5jdGlvbiAoKSB7XHJcbiAgICAgICAgICAgICAgICBvYmouZGlzcGF0Y2hFdmVudChuZXcgQ3VzdG9tRXZlbnQobmFtZSkpO1xyXG4gICAgICAgICAgICAgICAgcnVubmluZyA9IGZhbHNlO1xyXG4gICAgICAgICAgICB9KTtcclxuICAgICAgICB9O1xyXG4gICAgICAgIG9iai5hZGRFdmVudExpc3RlbmVyKHR5cGUsIGZ1bmMpO1xyXG4gICAgfTtcclxuXHJcbiAgICBmdW5jdGlvbiB0b2dnbGVGaXhlZChlbCkge1xyXG4gICAgICAgIGxldCBlbGVtZW50ID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcihlbCk7XHJcbiAgICAgICAgbGV0IGZpeGVkV2lkdGggPSB3aW5kb3cuc2NyZWVuLndpZHRoID4gMTAyNCA/IGVsZW1lbnQucGFyZW50RWxlbWVudC5jbGllbnRXaWR0aCAtIDI4NSA6IGVsZW1lbnQucGFyZW50RWxlbWVudC5jbGllbnRXaWR0aDtcclxuICAgICAgICBlbGVtZW50LnN0eWxlLndpZHRoID0gZml4ZWRXaWR0aCArICdweCc7XHJcblxyXG4gICAgfVxyXG5cclxuICAgIGNvbnN0IHNob3dIaWRlU2lkZWJhckZpbHRlcnMgPSAoKSA9PiB7XHJcbiAgICAgICAgaWYgKGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3JBbGwoXCIuZmlsdGVyXCIpLmxlbmd0aCA9PSAwKSByZXR1cm4gZmFsc2U7XHJcblxyXG4gICAgICAgIHdpbmRvdy5hZGRFdmVudExpc3RlbmVyKFwibG9hZFwiLCBzaG93SGlkZUZpbHRlcnMpO1xyXG4gICAgICAgIHdpbmRvdy5hZGRFdmVudExpc3RlbmVyKFwicmVzaXplXCIsIHNob3dIaWRlRmlsdGVycyk7XHJcblxyXG4gICAgICAgIGZ1bmN0aW9uIHNob3dIaWRlRmlsdGVycygpIHtcclxuICAgICAgICAgICAgY29uc3Qgc2lkZWJhckZpbHRlcnMgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yQWxsKFwiLmZpbHRlclwiKTtcclxuXHJcbiAgICAgICAgICAgIGlmICh3aW5kb3cuc2NyZWVuLndpZHRoIDw9IDEwMjQpIHtcclxuICAgICAgICAgICAgICAgIHNpZGViYXJGaWx0ZXJzLmZvckVhY2goZmlsdGVyID0+IHtcclxuICAgICAgICAgICAgICAgICAgICBmaWx0ZXIuY2xhc3NMaXN0LnJlbW92ZShcImFjdGl2ZVwiKTtcclxuICAgICAgICAgICAgICAgIH0pO1xyXG4gICAgICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICAgICAgc2lkZWJhckZpbHRlcnMuZm9yRWFjaChmaWx0ZXIgPT4ge1xyXG4gICAgICAgICAgICAgICAgICAgIGZpbHRlci5jbGFzc0xpc3QuYWRkKFwiYWN0aXZlXCIpO1xyXG4gICAgICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcbiAgICB9XHJcblxyXG4gICAgc2hvd0hpZGVTaWRlYmFyRmlsdGVycygpO1xyXG5cclxuICAgIC8vIGhhbWJ1cmdlciBvcGVuL2Nsb3NlIGFuaW1hdGlvblxyXG4gICAgY29uc3QgdHJpZ2dlciA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoXCIjaGFtYnVyZ2VyXCIpO1xyXG4gICAgY29uc3QgbW9iaWxlTmF2ID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcihcIiNtb2JpbGUtbmF2XCIpO1xyXG4gICAgbGV0IGlzQ2xvc2VkID0gdHJ1ZTtcclxuXHJcbiAgICB0cmlnZ2VyLmFkZEV2ZW50TGlzdGVuZXIoXCJjbGlja1wiLCBidXJnZXJUaW1lKTtcclxuXHJcbiAgICBmdW5jdGlvbiBidXJnZXJUaW1lKCkge1xyXG4gICAgICAgIGlmIChpc0Nsb3NlZCA9PSB0cnVlKSB7XHJcbiAgICAgICAgICAgIHRyaWdnZXIuY2xhc3NMaXN0LnJlbW92ZShcImlzLW9wZW5cIik7XHJcbiAgICAgICAgICAgIHRyaWdnZXIuY2xhc3NMaXN0LmFkZChcImlzLWNsb3NlZFwiKTtcclxuICAgICAgICAgICAgbW9iaWxlTmF2LmNsYXNzTGlzdC5hZGQoJ2lzLW9wZW4nKTtcclxuICAgICAgICAgICAgaXNDbG9zZWQgPSBmYWxzZTtcclxuICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICB0cmlnZ2VyLmNsYXNzTGlzdC5yZW1vdmUoXCJpcy1jbG9zZWRcIik7XHJcbiAgICAgICAgICAgIHRyaWdnZXIuY2xhc3NMaXN0LmFkZChcImlzLW9wZW5cIik7XHJcbiAgICAgICAgICAgIG1vYmlsZU5hdi5jbGFzc0xpc3QucmVtb3ZlKCdpcy1vcGVuJyk7XHJcbiAgICAgICAgICAgIGlzQ2xvc2VkID0gdHJ1ZTtcclxuICAgICAgICB9XHJcbiAgICB9XHJcblxyXG4gICAgLy8gc2VhcmNoIGZvcm0gb3Blbi9jbG9zZSBhbmltYXRpb25cclxuICAgIGNvbnN0IHNlYXJjaEJ0biA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoXCIuc2VhcmNoLWZvcm1fX2J0blwiKTtcclxuICAgIHNlYXJjaEJ0bi5hZGRFdmVudExpc3RlbmVyKFwiY2xpY2tcIiwgZnVuY3Rpb24gKCkge1xyXG4gICAgICAgIHRoaXMuY2xhc3NMaXN0LnRvZ2dsZShcImNsb3NlXCIpO1xyXG4gICAgICAgIHRoaXMucGFyZW50RWxlbWVudC5jbGFzc0xpc3QudG9nZ2xlKFwiaW5jbGlja2VkXCIpO1xyXG4gICAgICAgIHRoaXMucHJldmlvdXNFbGVtZW50U2libGluZy52YWx1ZSA9IFwiXCI7XHJcbiAgICB9KTtcclxuXHJcbiAgICBjb25zdCBwcm9kdWN0UmV2aWV3U3RhcnMgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yQWxsKFwiLmpzLXByb2R1Y3QtcmV2aWV3LXJhdGluZ1wiKTtcclxuICAgIHByb2R1Y3RSZXZpZXdTdGFycy5mb3JFYWNoKGZ1bmN0aW9uIChlbCkge1xyXG4gICAgICAgIGNvbnN0IGRhdGFSYXRpbmcgPSBlbC5nZXRBdHRyaWJ1dGUoXCJkYXRhLXJhdGluZ1wiKTtcclxuICAgICAgICBjb25zdCBzdGFycyA9IGVsLmNoaWxkcmVuO1xyXG4gICAgICAgIGZvciAobGV0IGkgPSAwOyBpIDwgZGF0YVJhdGluZzsgaSsrKSB7XHJcbiAgICAgICAgICAgIHN0YXJzW2ldLmNsYXNzTGlzdC5hZGQoXCJhY3RpdmVcIik7XHJcbiAgICAgICAgfVxyXG4gICAgfSk7XHJcblxyXG4gICAgY29uc3QgY2hvb3NlUmF0aW5nID0gKCkgPT4ge1xyXG4gICAgICAgIGlmIChkb2N1bWVudC5xdWVyeVNlbGVjdG9yQWxsKFwiLmpzLXJhdGluZ1wiKS5sZW5ndGggPCAwKSByZXR1cm4gZmFsc2U7XHJcblxyXG4gICAgICAgIGNvbnN0IHJhdGluZyA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3JBbGwoXCIuanMtcmF0aW5nXCIpO1xyXG5cclxuICAgICAgICByYXRpbmcuZm9yRWFjaChyYXRlID0+IHtcclxuICAgICAgICAgICAgY29uc3QgcmF0aW5nU3RhcnMgPSByYXRlLmNoaWxkcmVuO1xyXG5cclxuICAgICAgICAgICAgcmF0ZS5hZGRFdmVudExpc3RlbmVyKFwiY2xpY2tcIiwgKGUpID0+IHtcclxuICAgICAgICAgICAgICAgIGlmIChlLnRhcmdldC5jbGFzc0xpc3QuY29udGFpbnMoXCJqcy1yYXRpbmctc3RhclwiKSB8fCBlLnRhcmdldC5jbG9zZXN0KFwiLmpzLXJhdGluZy1zdGFyXCIpKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgbGV0IHRhcmdldCA9IGUudGFyZ2V0LmNsYXNzTGlzdC5jb250YWlucyhcImpzLXJhdGluZy1zdGFyXCIpID8gZS50YXJnZXQgOiBlLnRhcmdldC5jbG9zZXN0KFwiLmpzLXJhdGluZy1zdGFyXCIpO1xyXG4gICAgICAgICAgICAgICAgICAgIHJlbW92ZUNsYXNzKHJhdGluZ1N0YXJzLCBcImN1cnJlbnQtYWN0aXZlXCIpO1xyXG4gICAgICAgICAgICAgICAgICAgIHRhcmdldC5jbGFzc0xpc3QuYWRkKFwiYWN0aXZlXCIsIFwiY3VycmVudC1hY3RpdmVcIik7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIH0pO1xyXG4gICAgICAgICAgICByYXRlLmFkZEV2ZW50TGlzdGVuZXIoXCJtb3VzZW92ZXJcIiwgKGUpID0+IHtcclxuICAgICAgICAgICAgICAgIGlmIChlLnRhcmdldC5jbGFzc0xpc3QuY29udGFpbnMoXCJqcy1yYXRpbmctc3RhclwiKSB8fCBlLnRhcmdldC5jbG9zZXN0KFwiLmpzLXJhdGluZy1zdGFyXCIpKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgbGV0IHRhcmdldCA9IGUudGFyZ2V0LmNsYXNzTGlzdC5jb250YWlucyhcImpzLXJhdGluZy1zdGFyXCIpID8gZS50YXJnZXQgOiBlLnRhcmdldC5jbG9zZXN0KFwiLmpzLXJhdGluZy1zdGFyXCIpO1xyXG4gICAgICAgICAgICAgICAgICAgIHJlbW92ZUNsYXNzKHJhdGluZ1N0YXJzLCBcImFjdGl2ZVwiKTtcclxuICAgICAgICAgICAgICAgICAgICB0YXJnZXQuY2xhc3NMaXN0LmFkZChcImFjdGl2ZVwiKTtcclxuICAgICAgICAgICAgICAgICAgICBtb3VzZU92ZXJBY3RpdmVDbGFzcyhyYXRpbmdTdGFycyk7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIH0pO1xyXG4gICAgICAgICAgICByYXRlLmFkZEV2ZW50TGlzdGVuZXIoXCJtb3VzZW91dFwiLCAoKSA9PiB7XHJcbiAgICAgICAgICAgICAgICBhZGRDbGFzcyhyYXRpbmdTdGFycywgXCJhY3RpdmVcIik7XHJcbiAgICAgICAgICAgICAgICBtb3VzZU91dEFjdGl2ZUNsYXNzKHJhdGluZ1N0YXJzKTtcclxuICAgICAgICAgICAgfSk7XHJcblxyXG4gICAgICAgICAgICBmdW5jdGlvbiBhZGRDbGFzcyhhcnIpIHtcclxuICAgICAgICAgICAgICAgIGZvciAobGV0IGkgPSAwLCBpTGVuZyA9IGFyci5sZW5ndGg7IGkgPCBpTGVuZzsgaSsrKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgZm9yIChsZXQgaiA9IDE7IGogPCBhcmd1bWVudHMubGVuZ3RoOyBqKyspIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgcmF0aW5nU3RhcnNbaV0uY2xhc3NMaXN0LmFkZChhcmd1bWVudHNbal0pO1xyXG4gICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgZnVuY3Rpb24gcmVtb3ZlQ2xhc3MoYXJyKSB7XHJcbiAgICAgICAgICAgICAgICBmb3IgKGxldCBpID0gMCwgaUxlbmcgPSBhcnIubGVuZ3RoOyBpIDwgaUxlbmc7IGkrKykge1xyXG4gICAgICAgICAgICAgICAgICAgIGZvciAobGV0IGogPSAxOyBqIDwgYXJndW1lbnRzLmxlbmd0aDsgaisrKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHJhdGluZ1N0YXJzW2ldLmNsYXNzTGlzdC5yZW1vdmUoYXJndW1lbnRzW2pdKTtcclxuICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgIGZ1bmN0aW9uIG1vdXNlT3ZlckFjdGl2ZUNsYXNzKGFycikge1xyXG4gICAgICAgICAgICAgICAgZm9yIChsZXQgaSA9IDAsIGlMZW4gPSBhcnIubGVuZ3RoOyBpIDwgaUxlbjsgaSsrKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgaWYgKGFycltpXS5jbGFzc0xpc3QuY29udGFpbnMoXCJhY3RpdmVcIikpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgYnJlYWs7XHJcbiAgICAgICAgICAgICAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgYXJyW2ldLmNsYXNzTGlzdC5hZGQoXCJhY3RpdmVcIik7XHJcbiAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICBmdW5jdGlvbiBtb3VzZU91dEFjdGl2ZUNsYXNzKGFycikge1xyXG4gICAgICAgICAgICAgICAgZm9yIChsZXQgaSA9IGFyci5sZW5ndGggLSAxOyBpID49IDA7IGktLSkge1xyXG4gICAgICAgICAgICAgICAgICAgIGlmIChhcnJbaV0uY2xhc3NMaXN0LmNvbnRhaW5zKFwiY3VycmVudC1hY3RpdmVcIikpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgYnJlYWs7XHJcbiAgICAgICAgICAgICAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgYXJyW2ldLmNsYXNzTGlzdC5yZW1vdmUoXCJhY3RpdmVcIik7XHJcbiAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfSk7XHJcbiAgICB9XHJcblxyXG4gICAgY2hvb3NlUmF0aW5nKCk7XHJcblxyXG4gICAgZG9jdW1lbnQuYWRkRXZlbnRMaXN0ZW5lcihcImNsaWNrXCIsIGZ1bmN0aW9uIChlKSB7XHJcbiAgICAgICAgaWYgKGUudGFyZ2V0LmNsYXNzTGlzdC5jb250YWlucyhcImpzLW9wZW4tZHJvcGRvd25cIikgJiYgd2luZG93LnNjcmVlbi53aWR0aCA8PSA1NzYpIHtcclxuICAgICAgICAgICAgY29uc3QgY2FyZXREcm9wZG93biA9IGUudGFyZ2V0LmZpcnN0RWxlbWVudENoaWxkO1xyXG4gICAgICAgICAgICBjb25zdCBkcm9wZG93biA9IGUudGFyZ2V0Lm5leHRFbGVtZW50U2libGluZztcclxuICAgICAgICAgICAgaWYgKGRyb3Bkb3duLnN0eWxlLm1heEhlaWdodCkge1xyXG4gICAgICAgICAgICAgICAgZHJvcGRvd24uc3R5bGUubWF4SGVpZ2h0ID0gbnVsbDtcclxuICAgICAgICAgICAgICAgIGRyb3Bkb3duLnN0eWxlLm9wYWNpdHkgPSBudWxsO1xyXG4gICAgICAgICAgICAgICAgZS50YXJnZXQuY2xhc3NMaXN0LnJlbW92ZShcImRyb3Bkb3duLWFjdGl2ZVwiKTtcclxuICAgICAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgICAgIGRyb3Bkb3duLnN0eWxlLm1heEhlaWdodCA9IGRyb3Bkb3duLnNjcm9sbEhlaWdodCArIFwicHhcIjtcclxuICAgICAgICAgICAgICAgIGRyb3Bkb3duLnN0eWxlLm9wYWNpdHkgPSAxO1xyXG4gICAgICAgICAgICAgICAgZS50YXJnZXQuY2xhc3NMaXN0LmFkZChcImRyb3Bkb3duLWFjdGl2ZVwiKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuICAgIH0pO1xyXG5cclxuICAgIGNvbnN0IGJhc2ljU2Nyb2xsVG9wID0gZnVuY3Rpb24gKCkge1xyXG4gICAgICAgIGNvbnN0IGJ0blRvcCA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJy5qcy1idG4tZ28tdG9wJyk7XHJcbiAgICAgICAgY29uc3QgYnRuUmV2ZWFsID0gZnVuY3Rpb24gKCkge1xyXG4gICAgICAgICAgICBpZiAod2luZG93LnNjcm9sbFkgPj0gMzAwKSB7XHJcbiAgICAgICAgICAgICAgICBidG5Ub3AuY2xhc3NMaXN0LmFkZCgnaXMtdmlzaWJsZScpO1xyXG4gICAgICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICAgICAgYnRuVG9wLmNsYXNzTGlzdC5yZW1vdmUoJ2lzLXZpc2libGUnKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuICAgICAgICBjb25zdCBUb3BzY3JvbGxUbyA9IGZ1bmN0aW9uICgpIHtcclxuICAgICAgICAgICAgaWYgKHdpbmRvdy5zY3JvbGxZICE9IDApIHtcclxuICAgICAgICAgICAgICAgIHNldFRpbWVvdXQoZnVuY3Rpb24gKCkge1xyXG4gICAgICAgICAgICAgICAgICAgIHdpbmRvdy5zY3JvbGxUbygwLCB3aW5kb3cuc2Nyb2xsWSAtIDMwKTtcclxuICAgICAgICAgICAgICAgICAgICBUb3BzY3JvbGxUbygpO1xyXG4gICAgICAgICAgICAgICAgfSwgMTApO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG4gICAgICAgIHdpbmRvdy5hZGRFdmVudExpc3RlbmVyKCdzY3JvbGwnLCBidG5SZXZlYWwpO1xyXG4gICAgICAgIGJ0blRvcC5hZGRFdmVudExpc3RlbmVyKCdjbGljaycsIFRvcHNjcm9sbFRvKTtcclxuXHJcbiAgICB9O1xyXG4gICAgYmFzaWNTY3JvbGxUb3AoKTtcclxuXHJcbiAgICBjb25zdCBvcGVuTW9kYWwgPSAoYnRuLCBtb2RhbCkgPT4ge1xyXG4gICAgICAgIGlmIChkb2N1bWVudC5xdWVyeVNlbGVjdG9yKGJ0bikgPT0gbnVsbCkgcmV0dXJuIGZhbHNlO1xyXG5cclxuICAgICAgICBjb25zdCBtb2RhbEJ0biA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoYnRuKTtcclxuICAgICAgICBjb25zdCBtb2RhbENvbnRhaW5lciA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IobW9kYWwpO1xyXG5cclxuICAgICAgICBpZiAoXHJcbiAgICAgICAgICAgIG5hdmlnYXRvci51c2VyQWdlbnQubWF0Y2goL2lQaG9uZS9pKSB8fFxyXG4gICAgICAgICAgICBuYXZpZ2F0b3IudXNlckFnZW50Lm1hdGNoKC9pUG9kL2kpXHJcbiAgICAgICAgKSB7XHJcbiAgICAgICAgICAgIG1vZGFsQnRuLmFkZEV2ZW50TGlzdGVuZXIoXCJ0b3VjaHN0YXJ0XCIsIGZ1bmN0aW9uICgpIHtcclxuICAgICAgICAgICAgICAgIGRvY3VtZW50LmJvZHkuY2xhc3NMaXN0LmFkZChcIm1vZGFsLWFjdGl2ZVwiKTtcclxuICAgICAgICAgICAgICAgIG1vZGFsQ29udGFpbmVyLmNsYXNzTGlzdC5yZW1vdmUoXCJvdXRcIik7XHJcbiAgICAgICAgICAgICAgICBtb2RhbENvbnRhaW5lci5jbGFzc0xpc3QuYWRkKFwib3BlbmVkXCIpO1xyXG4gICAgICAgICAgICB9KTtcclxuICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICBtb2RhbEJ0bi5hZGRFdmVudExpc3RlbmVyKFwiY2xpY2tcIiwgZnVuY3Rpb24gKCkge1xyXG4gICAgICAgICAgICAgICAgZG9jdW1lbnQuYm9keS5jbGFzc0xpc3QuYWRkKFwibW9kYWwtYWN0aXZlXCIpO1xyXG4gICAgICAgICAgICAgICAgbW9kYWxDb250YWluZXIuY2xhc3NMaXN0LnJlbW92ZShcIm91dFwiKTtcclxuICAgICAgICAgICAgICAgIG1vZGFsQ29udGFpbmVyLmNsYXNzTGlzdC5hZGQoXCJvcGVuZWRcIik7XHJcbiAgICAgICAgICAgIH0pO1xyXG4gICAgICAgIH1cclxuXHJcblxyXG4gICAgICAgIGRvY3VtZW50LmFkZEV2ZW50TGlzdGVuZXIoXCJjbGlja1wiLCBmdW5jdGlvbiAoZSkge1xyXG4gICAgICAgICAgICBpZiAoXHJcbiAgICAgICAgICAgICAgICBlLnRhcmdldC5jbGFzc0xpc3QuY29udGFpbnMoXCJtb2RhbC1jb250YWluZXJcIikgfHxcclxuICAgICAgICAgICAgICAgIGUudGFyZ2V0LmNsYXNzTGlzdC5jb250YWlucyhcIm1vZGFsLWNsb3NlXCIpXHJcbiAgICAgICAgICAgICkge1xyXG4gICAgICAgICAgICAgICAgZG9jdW1lbnQuYm9keS5jbGFzc0xpc3QucmVtb3ZlKFwibW9kYWwtYWN0aXZlXCIpO1xyXG4gICAgICAgICAgICAgICAgbW9kYWxDb250YWluZXIuY2xhc3NMaXN0LnJlbW92ZShcIm9wZW5lZFwiKTtcclxuICAgICAgICAgICAgICAgIG1vZGFsQ29udGFpbmVyLmNsYXNzTGlzdC5hZGQoXCJvdXRcIik7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9KTtcclxuICAgICAgICBkb2N1bWVudC5hZGRFdmVudExpc3RlbmVyKFwia2V5ZG93blwiLCBmdW5jdGlvbiAoZSkge1xyXG4gICAgICAgICAgICBpZiAoZS5rZXlDb2RlID09IDI3KSB7XHJcbiAgICAgICAgICAgICAgICBkb2N1bWVudC5ib2R5LmNsYXNzTGlzdC5yZW1vdmUoXCJtb2RhbC1hY3RpdmVcIik7XHJcbiAgICAgICAgICAgICAgICBtb2RhbENvbnRhaW5lci5jbGFzc0xpc3QucmVtb3ZlKFwib3BlbmVkXCIpO1xyXG4gICAgICAgICAgICAgICAgbW9kYWxDb250YWluZXIuY2xhc3NMaXN0LmFkZChcIm91dFwiKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH0pO1xyXG4gICAgfTtcclxuXHJcbiAgICBvcGVuTW9kYWwoXCIuanMtcHJvZHVjdC1jb21wYXJlXCIsIFwiLmpzLW1vZGFsLXByb2R1Y3QtY29tcGFyZVwiKTtcclxuICAgIG9wZW5Nb2RhbChcIi5qcy1wcm9kdWN0LWNvbXBhcmUtbW9iaWxlXCIsIFwiLmpzLW1vZGFsLXByb2R1Y3QtY29tcGFyZVwiKTtcclxuICAgIG9wZW5Nb2RhbChcIi5qcy1hZGQtcmV2aWV3XCIsIFwiLmpzLW1vZGFsLWFkZC1yZXZpZXdcIik7XHJcbiAgICBvcGVuTW9kYWwoXCIuanMtYWRkLXF1ZXN0aW9uXCIsIFwiLmpzLW1vZGFsLWFkZC1xdWVzdGlvblwiKTtcclxuXHJcbiAgICBjb25zdCBzZWVNb3JlID0gKG51bWJlciwgZWxlbWVudHMsIGJ1dHRvbikgPT4ge1xyXG5cclxuICAgICAgICBpZiAoZG9jdW1lbnQucXVlcnlTZWxlY3RvcihidXR0b24pID09IG51bGwpIHtcclxuICAgICAgICAgICAgcmV0dXJuIGZhbHNlO1xyXG4gICAgICAgIH1cclxuICAgICAgICB3aW5kb3cuYWRkRXZlbnRMaXN0ZW5lcihcImxvYWRcIiwgKCkgPT4gc2hvd0hpZGVCbG9ja3MobnVtYmVyLCBlbGVtZW50cywgYnV0dG9uKSk7XHJcbiAgICAgICAgd2luZG93LmFkZEV2ZW50TGlzdGVuZXIoXCJyZXNpemVcIiwgKCkgPT4gc2hvd0hpZGVCbG9ja3MobnVtYmVyLCBlbGVtZW50cywgYnV0dG9uKSk7XHJcblxyXG4gICAgICAgIGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoYnV0dG9uKS5hZGRFdmVudExpc3RlbmVyKFwiY2xpY2tcIiwgZnVuY3Rpb24gKCkge1xyXG4gICAgICAgICAgICBpZiAodGhpcy50ZXh0Q29udGVudCA9PSBcIlNlZSBtb3JlXCIpIHtcclxuICAgICAgICAgICAgICAgIHRoaXMudGV4dENvbnRlbnQgPSBcIlNlZSBsZXNzXCI7XHJcbiAgICAgICAgICAgICAgICB0aGlzLmNsYXNzTGlzdC5hZGQoXCJhY3RpdmVcIik7XHJcbiAgICAgICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgICAgICB0aGlzLnRleHRDb250ZW50ID0gXCJTZWUgbW9yZVwiO1xyXG4gICAgICAgICAgICAgICAgdGhpcy5jbGFzc0xpc3QucmVtb3ZlKFwiYWN0aXZlXCIpO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3JBbGwoZWxlbWVudHMpLmZvckVhY2goKGVsZW0sIGluZGV4KSA9PiB7XHJcbiAgICAgICAgICAgICAgICBpZiAoZWxlbS5zdHlsZS5kaXNwbGF5ID09IFwibm9uZVwiKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgZWxlbS5zdHlsZS5kaXNwbGF5ID0gbnVsbDtcclxuICAgICAgICAgICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgICAgICAgICAgaWYgKGluZGV4ID4gbnVtYmVyKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGVsZW0uc3R5bGUuZGlzcGxheSA9ICdub25lJztcclxuICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIH0pO1xyXG4gICAgICAgIH0pO1xyXG5cclxuICAgICAgICBmdW5jdGlvbiBzaG93SGlkZUJsb2NrcyhudW1iZXIsIGVsZW1lbnRzLCBidXR0b24pIHtcclxuICAgICAgICAgICAgY29uc3QgZWxlbXMgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yQWxsKGVsZW1lbnRzKTtcclxuICAgICAgICAgICAgY29uc3QgYnRuU2hvd0hpZGUgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKGJ1dHRvbik7XHJcblxyXG4gICAgICAgICAgICBpZiAod2luZG93LnNjcmVlbi53aWR0aCA8PSA4MDAgJiYgZWxlbXMubGVuZ3RoID4gbnVtYmVyKSB7XHJcbiAgICAgICAgICAgICAgICBlbGVtcy5mb3JFYWNoKChlbGVtLCBpbmRleCkgPT4ge1xyXG4gICAgICAgICAgICAgICAgICAgIGlmIChpbmRleCA+IG51bWJlcikge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBlbGVtLnN0eWxlLmRpc3BsYXkgPSAnbm9uZSc7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGJ0blNob3dIaWRlLnN0eWxlLmRpc3BsYXkgPSBudWxsO1xyXG4gICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIH0pO1xyXG4gICAgICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICAgICAgZWxlbXMuZm9yRWFjaCgoZWxlbSwgaW5kZXgpID0+IHtcclxuICAgICAgICAgICAgICAgICAgICBlbGVtLnN0eWxlLmRpc3BsYXkgPSBudWxsO1xyXG4gICAgICAgICAgICAgICAgICAgIGJ0blNob3dIaWRlLnN0eWxlLmRpc3BsYXkgPSAnbm9uZSc7XHJcbiAgICAgICAgICAgICAgICB9KTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuICAgIH07XHJcblxyXG4gICAgc2VlTW9yZSgzLCAnLnByb2R1Y3QtY29tcGFyZS10b3BfX2l0ZW0nLCAnLmpzLXNlZS1tb3JlLXByb2R1Y3RzJyk7XHJcbiAgICBzZWVNb3JlKDEsICcuaGVscC1jZW50ZXJfX2l0ZW0nLCAnLmpzLXNlZS1tb3JlLWhlbHAnKTtcclxuXHJcbiAgICBjb25zdCBzaG93SXRlbXMgPSAobnVtYmVyRGVza3RvcCwgbnVtYmVyTW9iaWxlLCBpdGVtcywgYnV0dG9uKSA9PiB7XHJcbiAgICAgICAgaWYgKGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3JBbGwoaXRlbXMpLmxlbmd0aCA9PSAwKSByZXR1cm4gZmFsc2U7XHJcblxyXG4gICAgICAgIGNvbnN0IGJ0biA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoYnV0dG9uKTtcclxuXHJcbiAgICAgICAgd2luZG93LmFkZEV2ZW50TGlzdGVuZXIoXCJsb2FkXCIsIHNob3dIaWRlSXRlbXMpO1xyXG4gICAgICAgIHdpbmRvdy5hZGRFdmVudExpc3RlbmVyKFwicmVzaXplXCIsIHNob3dIaWRlSXRlbXMpO1xyXG5cclxuICAgICAgICBmdW5jdGlvbiBzaG93SGlkZUl0ZW1zKCkge1xyXG4gICAgICAgICAgICBjb25zdCBlbHMgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yQWxsKGl0ZW1zKTtcclxuICAgICAgICAgICAgY29uc3QgYnRuID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcihidXR0b24pO1xyXG4gICAgICAgICAgICBpZiAod2luZG93LnNjcmVlbi53aWR0aCA+IDU3Nykge1xyXG4gICAgICAgICAgICAgICAgaWYgKGVscy5sZW5ndGggPiBudW1iZXJEZXNrdG9wKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgYnRuLnN0eWxlLmRpc3BsYXkgPSBudWxsO1xyXG4gICAgICAgICAgICAgICAgICAgIGVscy5mb3JFYWNoKChlbCwgaSkgPT4ge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBpZiAoaSA+IG51bWJlckRlc2t0b3AgLSAxKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBlbC5zdHlsZS5kaXNwbGF5ID0gXCJub25lXCJcclxuICAgICAgICAgICAgICAgICAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGVsLnN0eWxlLmRpc3BsYXkgPSBudWxsO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICAgICAgICAgIGJ0bi5zdHlsZS5kaXNwbGF5ID0gXCJub25lXCI7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgICAgICBpZiAoZWxzLmxlbmd0aCA+IG51bWJlck1vYmlsZSkge1xyXG4gICAgICAgICAgICAgICAgICAgIGJ0bi5zdHlsZS5kaXNwbGF5ID0gbnVsbDtcclxuICAgICAgICAgICAgICAgICAgICBlbHMuZm9yRWFjaCgoZWwsIGkpID0+IHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgaWYgKGkgPiBudW1iZXJNb2JpbGUgLSAxKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBlbC5zdHlsZS5kaXNwbGF5ID0gXCJub25lXCJcclxuICAgICAgICAgICAgICAgICAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGVsLnN0eWxlLmRpc3BsYXkgPSBudWxsO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICAgICAgICAgIGJ0bi5zdHlsZS5kaXNwbGF5ID0gXCJub25lXCI7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIGJ0bi5hZGRFdmVudExpc3RlbmVyKFwiY2xpY2tcIiwgZnVuY3Rpb24gKCkge1xyXG4gICAgICAgICAgICBjb25zdCBlbGVtcyA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3JBbGwoaXRlbXMpO1xyXG4gICAgICAgICAgICBpZiAodGhpcy50ZXh0Q29udGVudCA9PSBcIlNlZSBtb3JlXCIpIHtcclxuICAgICAgICAgICAgICAgIHRoaXMudGV4dENvbnRlbnQgPSBcIlNlZSBsZXNzXCI7XHJcbiAgICAgICAgICAgICAgICB0aGlzLmNsYXNzTGlzdC5hZGQoXCJhY3RpdmVcIik7XHJcbiAgICAgICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgICAgICB0aGlzLnRleHRDb250ZW50ID0gXCJTZWUgbW9yZVwiO1xyXG4gICAgICAgICAgICAgICAgdGhpcy5jbGFzc0xpc3QucmVtb3ZlKFwiYWN0aXZlXCIpO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIGVsZW1zLmZvckVhY2goKGVsZW0sIGluZGV4KSA9PiB7XHJcbiAgICAgICAgICAgICAgICBpZiAoZWxlbS5zdHlsZS5kaXNwbGF5ID09IFwibm9uZVwiKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgZWxlbS5zdHlsZS5kaXNwbGF5ID0gbnVsbDtcclxuICAgICAgICAgICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgICAgICAgICAgaWYgKCh3aW5kb3cuc2NyZWVuLndpZHRoID4gNTc3ICYmIGluZGV4ID4gbnVtYmVyRGVza3RvcCAtIDEpIHx8ICh3aW5kb3cuc2NyZWVuLndpZHRoIDwgNTc3ICYmIGluZGV4ID4gbnVtYmVyTW9iaWxlIC0gMSkpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgZWxlbS5zdHlsZS5kaXNwbGF5ID0gJ25vbmUnO1xyXG4gICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgfSk7XHJcbiAgICB9XHJcblxyXG4gICAgc2hvd0l0ZW1zKDgsIDQsIFwiLmJyYW5kcy1saXN0X19pdGVtXCIsIFwiLmpzLXNlZS1tb3JlLWJyYW5kc1wiKTtcclxuICAgIHNob3dJdGVtcygzLCAyLCBcIi5zZW8tYmxvY2tcIiwgXCIuanMtc2VlLW1vcmUtc2VvXCIpO1xyXG4gICAgc2hvd0l0ZW1zKDMsIDIsIFwiLmpzLXJlbGF0ZWQtaXRlbVwiLCBcIi5qcy1zZWUtcG9zdHNcIik7XHJcblxyXG4gICAgY29uc3Qgc2hvd0Zvb3RlckxpbmtzID0gKCkgPT4ge1xyXG4gICAgICAgIGNvbnN0IGZvb3RlclRpdGxlID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvckFsbCgnLmZvb3Rlcl9fdGl0bGUnKTtcclxuICAgICAgICBjb25zdCBmb290ZXJMaW5rcyA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3JBbGwoJy5mb290ZXJfX2xpbmtzJyk7XHJcblxyXG4gICAgICAgIC8vIHdpbmRvdy5hZGRFdmVudExpc3RlbmVyKCdsb2FkJywgKCkgPT4gc2hvd0hpZGVMaW5rcyk7XHJcbiAgICAgICAgd2luZG93LmFkZEV2ZW50TGlzdGVuZXIoJ3Jlc2l6ZScsICgpID0+IHtcclxuICAgICAgICAgICAgaWYgKHdpbmRvdy5zY3JlZW4ud2lkdGggPD0gNTc2KSB7XHJcbiAgICAgICAgICAgICAgICBmb290ZXJMaW5rcy5mb3JFYWNoKGZvb3RlckxpbmsgPT4ge1xyXG4gICAgICAgICAgICAgICAgICAgIGZvb3Rlckxpbmsuc3R5bGUubWF4SGVpZ2h0ID0gMDtcclxuICAgICAgICAgICAgICAgIH0pO1xyXG4gICAgICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICAgICAgZm9vdGVyTGlua3MuZm9yRWFjaChmb290ZXJMaW5rID0+IHtcclxuICAgICAgICAgICAgICAgICAgICBmb290ZXJMaW5rLnN0eWxlLm1heEhlaWdodCA9IG51bGw7XHJcbiAgICAgICAgICAgICAgICB9KTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH0pO1xyXG5cclxuICAgICAgICBmb290ZXJUaXRsZS5mb3JFYWNoKHRpdGxlID0+IHtcclxuICAgICAgICAgICAgdGl0bGUuYWRkRXZlbnRMaXN0ZW5lcignY2xpY2snLCBmdW5jdGlvbiAoKSB7XHJcbiAgICAgICAgICAgICAgICBjb25zdCBmb290ZXJMaW5rcyA9IHRoaXMubmV4dEVsZW1lbnRTaWJsaW5nO1xyXG4gICAgICAgICAgICAgICAgaWYgKGdldENvbXB1dGVkU3R5bGUoZm9vdGVyTGlua3MpLm1heEhlaWdodCA9PSAnMHB4Jykge1xyXG4gICAgICAgICAgICAgICAgICAgIHRoaXMuY2xhc3NMaXN0LmFkZCgnYWN0aXZlJyk7XHJcbiAgICAgICAgICAgICAgICAgICAgZm9vdGVyTGlua3Muc3R5bGUubWF4SGVpZ2h0ID0gZm9vdGVyTGlua3Muc2Nyb2xsSGVpZ2h0ICsgXCJweFwiO1xyXG4gICAgICAgICAgICAgICAgICAgIGZvb3RlckxpbmtzLnN0eWxlLm9wYWNpdHkgPSAxO1xyXG4gICAgICAgICAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgICAgICAgICB0aGlzLmNsYXNzTGlzdC5yZW1vdmUoJ2FjdGl2ZScpO1xyXG4gICAgICAgICAgICAgICAgICAgIGZvb3RlckxpbmtzLnN0eWxlLm1heEhlaWdodCA9IG51bGw7XHJcbiAgICAgICAgICAgICAgICAgICAgZm9vdGVyTGlua3Muc3R5bGUub3BhY2l0eSA9IG51bGw7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIH0pXHJcbiAgICAgICAgfSk7XHJcbiAgICB9XHJcblxyXG4gICAgc2hvd0Zvb3RlckxpbmtzKCk7XHJcblxyXG4gICAgY29uc3Qgc2hvd1NpZGViYXJJdGVtcyA9ICgpID0+IHtcclxuICAgICAgICBpZiAoZG9jdW1lbnQucXVlcnlTZWxlY3RvckFsbChcIi5qcy1zaWRlYmFyLXNlZS1tb3JlXCIpLmxlbmd0aCA9PSAwKSByZXR1cm4gZmFsc2U7XHJcblxyXG4gICAgICAgIGNvbnN0IHNpZGViYXJTZWVNb3JlID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvckFsbChcIi5qcy1zaWRlYmFyLXNlZS1tb3JlXCIpO1xyXG5cclxuICAgICAgICBzaWRlYmFyU2VlTW9yZS5mb3JFYWNoKGVsID0+IHtcclxuICAgICAgICAgICAgY29uc3Qgc2lkZWJhckl0ZW1zID0gZWwucHJldmlvdXNFbGVtZW50U2libGluZy5jaGlsZHJlbjtcclxuICAgICAgICAgICAgaWYgKHNpZGViYXJJdGVtcy5sZW5ndGggPiAzKSB7XHJcbiAgICAgICAgICAgICAgICBmb3IgKGxldCBpID0gMCwgbGVuID0gc2lkZWJhckl0ZW1zLmxlbmd0aDsgaSA8IGxlbjsgaSsrKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgaWYgKGkgPiAyKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHNpZGViYXJJdGVtc1tpXS5zdHlsZS5kaXNwbGF5ID0gXCJub25lXCI7XHJcbiAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgZWwuYWRkRXZlbnRMaXN0ZW5lcihcImNsaWNrXCIsICgpID0+IHtcclxuICAgICAgICAgICAgICAgICAgICBmb3IgKGxldCBpID0gMCwgbGVuID0gc2lkZWJhckl0ZW1zLmxlbmd0aDsgaSA8IGxlbjsgaSsrKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGlmIChpID4gMikge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgaWYoc2lkZWJhckl0ZW1zW2ldLnN0eWxlLmRpc3BsYXkgPT0gXCJub25lXCIpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBzaWRlYmFySXRlbXNbaV0uc3R5bGUuZGlzcGxheSA9IG51bGw7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgZWwudGV4dENvbnRlbnQgPSBcIlNlZSBsZXNzXCI7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgZWwuY2xhc3NMaXN0LmFkZChcImFjdGl2ZVwiKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgc2lkZWJhckl0ZW1zW2ldLnN0eWxlLmRpc3BsYXkgPSBcIm5vbmVcIjtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBlbC50ZXh0Q29udGVudCA9IFwiU2VlIG1vcmVcIjtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBlbC5jbGFzc0xpc3QucmVtb3ZlKFwiYWN0aXZlXCIpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgICAgICBlbC5zdHlsZS5kaXNwbGF5ID0gXCJub25lXCI7XHJcbiAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgfSk7XHJcbiAgICB9XHJcblxyXG4gICAgc2hvd1NpZGViYXJJdGVtcygpO1xyXG5cclxuICAgIGNvbnN0IHNldFBlcmNlbnQgPSAoKSA9PiB7XHJcbiAgICAgICAgY29uc3QgY2lyY3VsYXJQcm9ncmVzcyA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3JBbGwoXCIuanMtY2lyY3VsYXItcHJvZ3Jlc3NcIik7XHJcblxyXG4gICAgICAgIGNpcmN1bGFyUHJvZ3Jlc3MuZm9yRWFjaChpdGVtID0+IHtcclxuICAgICAgICAgICAgY29uc3QgY2lyY2xlID0gaXRlbS5xdWVyeVNlbGVjdG9yKCcuY2lyY3VsYXItcHJvZ3Jlc3NfX3BlcmNlbnQnKTtcclxuICAgICAgICAgICAgY29uc3QgdGV4dCA9IGl0ZW0ucXVlcnlTZWxlY3RvcignLmNpcmN1bGFyLWluZm9fX251bWJlcicpO1xyXG4gICAgICAgICAgICBjb25zdCBkYXRhUGVyY2VudCA9IGl0ZW0uZ2V0QXR0cmlidXRlKCdkYXRhLXBlcmNlbnQnKTtcclxuICAgICAgICAgICAgY29uc3QgcGVyY2VudCA9ICgxMDAgLSBkYXRhUGVyY2VudCkgLyAxMDA7XHJcbiAgICAgICAgICAgIGNpcmNsZS5zdHlsZS5zdHJva2VEYXNob2Zmc2V0ID0gYGNhbGMoMiozMCozLjE0KiR7cGVyY2VudH0pYDtcclxuICAgICAgICAgICAgdGV4dC50ZXh0Q29udGVudCA9IGRhdGFQZXJjZW50O1xyXG4gICAgICAgIH0pO1xyXG4gICAgfVxyXG5cclxuICAgIHNldFBlcmNlbnQoKTtcclxuXHJcbiAgICBkb2N1bWVudC5hZGRFdmVudExpc3RlbmVyKFwiYmx1clwiLCBmdW5jdGlvbiAoZSkge1xyXG4gICAgICAgIGlmIChlLnRhcmdldC5jbGFzc0xpc3QuY29udGFpbnMoJ2NvbnRhY3QtZm9ybV9fZmllbGQnKSB8fCBlLnRhcmdldC5jbGFzc0xpc3QuY29udGFpbnMoJ2NvbnRhY3QtZm9ybV9fbWVzc2FnZScpKSB7XHJcbiAgICAgICAgICAgIGlmIChlLnRhcmdldC52YWx1ZS50cmltKCkgIT0gJycpIHtcclxuICAgICAgICAgICAgICAgIGUudGFyZ2V0Lm5leHRFbGVtZW50U2libGluZy5jbGFzc0xpc3QuYWRkKCdhY3RpdmUnKTtcclxuICAgICAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgICAgIGUudGFyZ2V0Lm5leHRFbGVtZW50U2libGluZy5jbGFzc0xpc3QucmVtb3ZlKCdhY3RpdmUnKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuICAgIH0sIHRydWUpO1xyXG5cclxuICAgIGNvbnN0IHByaWNlU2xpZGVyID0gKCkgPT4ge1xyXG4gICAgICAgIGNvbnN0IHJhbmdlSW5wdXRzID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvckFsbChcIi5wcmljZS1yYW5nZV9faW5wdXRcIiksXHJcbiAgICAgICAgICAgIHByaWNlSW5wdXRzID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvckFsbChcIi5wcmljZS1pbnB1dF9fZmllbGRcIiksXHJcbiAgICAgICAgICAgIHByb2dyZXNzID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcihcIi5wcmljZS1zbGlkZXJfX3Byb2dyZXNzXCIpO1xyXG5cclxuICAgICAgICBsZXQgcHJpY2VHYXAgPSA1MDA7XHJcblxyXG4gICAgICAgIHByaWNlSW5wdXRzLmZvckVhY2goKHByaWNlSW5wdXQpID0+IHtcclxuICAgICAgICAgICAgcHJpY2VJbnB1dC5hZGRFdmVudExpc3RlbmVyKFwiaW5wdXRcIiwgKGUpID0+IHtcclxuICAgICAgICAgICAgICAgIGxldCBtaW5WYWwgPSBwYXJzZUludChwcmljZUlucHV0c1swXS52YWx1ZSksXHJcbiAgICAgICAgICAgICAgICAgICAgbWF4VmFsID0gcGFyc2VJbnQocHJpY2VJbnB1dHNbMV0udmFsdWUpO1xyXG5cclxuICAgICAgICAgICAgICAgIGlmIChtYXhWYWwgLSBtaW5WYWwgPj0gcHJpY2VHYXAgJiYgbWF4VmFsIDw9IDUwMDAwKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgaWYgKGUudGFyZ2V0LmNsYXNzTGlzdC5jb250YWlucyhcInByaWNlLW1pblwiKSkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICByYW5nZUlucHV0c1swXS52YWx1ZSA9IG1pblZhbDtcclxuICAgICAgICAgICAgICAgICAgICAgICAgcHJvZ3Jlc3Muc3R5bGUubGVmdCA9IChtaW5WYWwgLyByYW5nZUlucHV0c1swXS5tYXgpICogMTAwICsgXCIlXCI7XHJcbiAgICAgICAgICAgICAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgcmFuZ2VJbnB1dHNbMV0udmFsdWUgPSBtYXhWYWw7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHByb2dyZXNzLnN0eWxlLnJpZ2h0ID0gMTAwIC0gKG1heFZhbCAvIHJhbmdlSW5wdXRzWzFdLm1heCkgKiAxMDAgKyBcIiVcIjtcclxuICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIH0pO1xyXG4gICAgICAgIH0pO1xyXG5cclxuICAgICAgICByYW5nZUlucHV0cy5mb3JFYWNoKChyYW5nZUlucHV0KSA9PiB7XHJcbiAgICAgICAgICAgIHJhbmdlSW5wdXQuYWRkRXZlbnRMaXN0ZW5lcihcImlucHV0XCIsIChlKSA9PiB7XHJcbiAgICAgICAgICAgICAgICBsZXQgbWluVmFsID0gcGFyc2VJbnQocmFuZ2VJbnB1dHNbMF0udmFsdWUpLFxyXG4gICAgICAgICAgICAgICAgICAgIG1heFZhbCA9IHBhcnNlSW50KHJhbmdlSW5wdXRzWzFdLnZhbHVlKTtcclxuXHJcbiAgICAgICAgICAgICAgICBpZiAobWF4VmFsIC0gbWluVmFsIDwgcHJpY2VHYXApIHtcclxuICAgICAgICAgICAgICAgICAgICBpZiAoZS50YXJnZXQuY2xhc3NMaXN0LmNvbnRhaW5zKFwicmFuZ2UtbWluXCIpKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHJhbmdlSW5wdXRzWzBdLnZhbHVlID0gbWF4VmFsIC0gcHJpY2VHYXA7XHJcbiAgICAgICAgICAgICAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgcmFuZ2VJbnB1dHNbMV0udmFsdWUgPSBtaW5WYWwgKyBwcmljZUdhcDtcclxuICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICAgICAgICAgIHByaWNlSW5wdXRzWzBdLnZhbHVlID0gbWluVmFsO1xyXG4gICAgICAgICAgICAgICAgICAgIHByaWNlSW5wdXRzWzFdLnZhbHVlID0gbWF4VmFsO1xyXG4gICAgICAgICAgICAgICAgICAgIHByb2dyZXNzLnN0eWxlLmxlZnQgPSAobWluVmFsIC8gcmFuZ2VJbnB1dHNbMF0ubWF4KSAqIDEwMCArIFwiJVwiO1xyXG4gICAgICAgICAgICAgICAgICAgIHByb2dyZXNzLnN0eWxlLnJpZ2h0ID0gMTAwIC0gKG1heFZhbCAvIHJhbmdlSW5wdXRzWzFdLm1heCkgKiAxMDAgKyBcIiVcIjtcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgfSk7XHJcblxyXG4gICAgICAgIGZ1bmN0aW9uIGFkZFNwYWNlcyh2YWx1ZSkge1xyXG4gICAgICAgICAgICB2YWx1ZSA9IHZhbHVlLnJlcGxhY2UoLyAvZywgJycpO1xyXG4gICAgICAgICAgICByZXR1cm4gdmFsdWUucmVwbGFjZSgvXFxCKD89KFxcZHszfSkrKD8hXFxkKSkvZywgXCIgXCIpO1xyXG4gICAgICAgIH1cclxuICAgIH07XHJcblxyXG4gICAgcHJpY2VTbGlkZXIoKTtcclxuXHJcbiAgICBjb25zdCB2aWV3QWxsID0gKCkgPT4ge1xyXG4gICAgICAgIGlmIChkb2N1bWVudC5xdWVyeVNlbGVjdG9yQWxsKFwiLmZpbHRlci12aWV3LWFsbFwiKS5sZW5ndGggPT0gMCkgcmV0dXJuIGZhbHNlO1xyXG4gICAgICAgIGNvbnN0IGZpbHRlckxpc3QgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yQWxsKFwiLmZpbHRlci1saXN0XCIpO1xyXG4gICAgICAgIGNvbnN0IHZpZXdBbGwgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yQWxsKFwiLmZpbHRlci12aWV3LWFsbFwiKTtcclxuXHJcbiAgICAgICAgZmlsdGVyTGlzdC5mb3JFYWNoKGxpc3QgPT4ge1xyXG4gICAgICAgICAgICBpZiAobGlzdC5jaGlsZHJlbi5sZW5ndGggPiA1KSB7XHJcbiAgICAgICAgICAgICAgICBjb25zdCBpdGVtcyA9IGxpc3QuY2hpbGRyZW47XHJcbiAgICAgICAgICAgICAgICBjb25zdCB2aWV3QWxsID0gbGlzdC5uZXh0RWxlbWVudFNpYmxpbmc7XHJcbiAgICAgICAgICAgICAgICBmb3IgKGxldCBpID0gMCwgbGVuID0gaXRlbXMubGVuZ3RoOyBpIDwgbGVuOyBpKyspIHtcclxuICAgICAgICAgICAgICAgICAgICBpZiAoaSA+PSA1KSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGl0ZW1zW2ldLnN0eWxlLmRpc3BsYXkgPSBcIm5vbmVcIjtcclxuICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICB2aWV3QWxsLnN0eWxlLmRpc3BsYXkgPSBcImJsb2NrXCI7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9KTtcclxuXHJcbiAgICAgICAgdmlld0FsbC5mb3JFYWNoKGVsID0+IHtcclxuICAgICAgICAgICAgZWwuYWRkRXZlbnRMaXN0ZW5lcihcImNsaWNrXCIsIGZ1bmN0aW9uICgpIHtcclxuICAgICAgICAgICAgICAgIGNvbnN0IGZpbHRlckl0ZW1zID0gdGhpcy5wcmV2aW91c0VsZW1lbnRTaWJsaW5nLmNoaWxkcmVuO1xyXG4gICAgICAgICAgICAgICAgY29uc3QgZmlsdGVyQ29udGVudCA9IHRoaXMuY2xvc2VzdChcIi5maWx0ZXItY29udGVudFwiKTtcclxuICAgICAgICAgICAgICAgIGZvciAobGV0IGkgPSAwLCBsZW4gPSBmaWx0ZXJJdGVtcy5sZW5ndGg7IGkgPCBsZW47IGkrKykge1xyXG4gICAgICAgICAgICAgICAgICAgIGlmIChpID49IDUpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgaWYgKGZpbHRlckl0ZW1zW2ldLnN0eWxlLmRpc3BsYXkpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGZpbHRlckl0ZW1zW2ldLnN0eWxlLmRpc3BsYXkgPSBudWxsO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy50ZXh0Q29udGVudCA9IFwiSGlkZVwiXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBmaWx0ZXJJdGVtc1tpXS5zdHlsZS5kaXNwbGF5ID0gXCJub25lXCI7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB0aGlzLnRleHRDb250ZW50ID0gXCJWaWV3IGFsbFwiXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICBmaWx0ZXJDb250ZW50LnN0eWxlLm1heEhlaWdodCA9IGZpbHRlckNvbnRlbnQuc2Nyb2xsSGVpZ2h0ICsgXCJweFwiO1xyXG4gICAgICAgICAgICB9KTtcclxuICAgICAgICB9KTtcclxuICAgIH1cclxuXHJcbiAgICB2aWV3QWxsKCk7XHJcblxyXG4gICAgY29uc3QgaW5wdXRWYWx1ZSA9ICgpID0+IHtcclxuICAgICAgICBjb25zdCBpbnB1dEZpZWxkID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcihcIi5wcm9kdWN0LWNvbXBhcmUtZm9ybV9fZmllbGRcIik7XHJcbiAgICAgICAgY29uc3QgYWRkVmFsdWVCdG5zID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvckFsbChcIi5qcy1jb21wYXJlXCIpO1xyXG4gICAgICAgIGFkZFZhbHVlQnRucy5mb3JFYWNoKGFkZFZhbHVlQnRuID0+IHtcclxuICAgICAgICAgICAgYWRkVmFsdWVCdG4uYWRkRXZlbnRMaXN0ZW5lcihcImNsaWNrXCIsIGZ1bmN0aW9uICgpIHtcclxuICAgICAgICAgICAgICAgIGNvbnN0IHZhbCA9IHRoaXMucHJldmlvdXNFbGVtZW50U2libGluZy50ZXh0Q29udGVudDtcclxuICAgICAgICAgICAgICAgIGlucHV0RmllbGQudmFsdWUgPSB2YWw7XHJcbiAgICAgICAgICAgIH0pO1xyXG4gICAgICAgIH0pO1xyXG4gICAgfVxyXG5cclxuICAgIGlucHV0VmFsdWUoKTtcclxuXHJcbiAgICAkKFwiLmpzLXByb2R1Y3Qtc2xpZGVyLXByZXZpZXdcIikuc2xpY2soe1xyXG4gICAgICAgIHNsaWRlc1RvU2hvdzogNCxcclxuICAgICAgICB2ZXJ0aWNhbDogdHJ1ZSxcclxuICAgICAgICB2ZXJ0aWNhbFN3aXBpbmc6IHRydWUsXHJcbiAgICAgICAgc2xpZGVzVG9TY3JvbGw6IDEsXHJcbiAgICAgICAgZm9jdXNPblNlbGVjdDogdHJ1ZSxcclxuICAgICAgICBwcmV2QXJyb3c6IFwiLnByb2R1Y3Qtc2xpZGVyLXByZXZpZXdfX2J0bi0tcHJldlwiLFxyXG4gICAgICAgIG5leHRBcnJvdzogXCIucHJvZHVjdC1zbGlkZXItcHJldmlld19fYnRuLS1uZXh0XCIsXHJcbiAgICAgICAgdmFyaWFibGVXaWR0aDogdHJ1ZSxcclxuICAgICAgICBhc05hdkZvcjogXCIucHJvZHVjdC1zbGlkZXItbWFpblwiXHJcbiAgICB9KTtcclxuICAgICQoXCIucHJvZHVjdC1zbGlkZXItbWFpblwiKS5zbGljayh7XHJcbiAgICAgICAgc2xpZGVzVG9TaG93OiAxLFxyXG4gICAgICAgIHNsaWRlc1RvU2Nyb2xsOiAxLFxyXG4gICAgICAgIGFycm93czogZmFsc2UsXHJcbiAgICAgICAgZmFkZTogdHJ1ZSxcclxuICAgICAgICBhc05hdkZvcjogXCIuanMtcHJvZHVjdC1zbGlkZXItcHJldmlld1wiXHJcbiAgICB9KTtcclxuICAgICQoXCIuanMtcHJvZHVjdC1jb21wYXJlLXNsaWRlclwiKS5zbGljayh7XHJcbiAgICAgICAgc2xpZGVzVG9TaG93OiAxLFxyXG4gICAgICAgIHNsaWRlc1RvU2Nyb2xsOiAxLFxyXG4gICAgICAgIHByZXZBcnJvdzogXCIucHJvZHVjdC1jb21wYXJlLXNsaWRlcl9fYnRuLS1wcmV2XCIsXHJcbiAgICAgICAgbmV4dEFycm93OiBcIi5wcm9kdWN0LWNvbXBhcmUtc2xpZGVyX19idG4tLW5leHRcIixcclxuICAgICAgICAvLyB2YXJpYWJsZVdpZHRoOiB0cnVlLFxyXG4gICAgfSk7XHJcbiAgICAkKFwiLmpzLXJlbGF0ZWQtcHJvZHVjdHMtc2xpZGVyXCIpLnNsaWNrKHtcclxuICAgICAgICBzbGlkZXNUb1Nob3c6IDMsXHJcbiAgICAgICAgc2xpZGVzVG9TY3JvbGw6IDEsXHJcbiAgICAgICAgcHJldkFycm93OiBcIi5qcy1yZWxhdGVkLXByZXZcIixcclxuICAgICAgICBuZXh0QXJyb3c6IFwiLmpzLXJlbGF0ZWQtbmV4dFwiLFxyXG4gICAgICAgIHJlc3BvbnNpdmU6IFtcclxuICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgYnJlYWtwb2ludDogNzY4LFxyXG4gICAgICAgICAgICAgICAgc2V0dGluZ3M6IHtcclxuICAgICAgICAgICAgICAgICAgICBzbGlkZXNUb1Nob3c6IDIsXHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIH0sXHJcbiAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICAgIGJyZWFrcG9pbnQ6IDU3NixcclxuICAgICAgICAgICAgICAgIHNldHRpbmdzOiB7XHJcbiAgICAgICAgICAgICAgICAgICAgc2xpZGVzVG9TaG93OiAxLFxyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB9LFxyXG4gICAgICAgIF1cclxuICAgIH0pO1xyXG4gICAgJChcIi5qcy1yZXNlbnRseS12aWV3ZWQtc2xpZGVyXCIpLnNsaWNrKHtcclxuICAgICAgICBzbGlkZXNUb1Nob3c6IDQsXHJcbiAgICAgICAgc2xpZGVzVG9TY3JvbGw6IDEsXHJcbiAgICAgICAgcHJldkFycm93OiBcIi5qcy1yZXNlbnRseS12aWV3ZWQtcHJldlwiLFxyXG4gICAgICAgIG5leHRBcnJvdzogXCIuanMtcmVzZW50bHktdmlld2VkLW5leHRcIixcclxuICAgICAgICByZXNwb25zaXZlOiBbXHJcbiAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICAgIGJyZWFrcG9pbnQ6IDk5MyxcclxuICAgICAgICAgICAgICAgIHNldHRpbmdzOiB7XHJcbiAgICAgICAgICAgICAgICAgICAgc2xpZGVzVG9TaG93OiAzLFxyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB9LFxyXG4gICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgICBicmVha3BvaW50OiA3NjksXHJcbiAgICAgICAgICAgICAgICBzZXR0aW5nczoge1xyXG4gICAgICAgICAgICAgICAgICAgIHNsaWRlc1RvU2hvdzogMixcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgfSxcclxuICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgYnJlYWtwb2ludDogNTc3LFxyXG4gICAgICAgICAgICAgICAgc2V0dGluZ3M6IHtcclxuICAgICAgICAgICAgICAgICAgICBzbGlkZXNUb1Nob3c6IDEsXHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIH0sXHJcbiAgICAgICAgXVxyXG4gICAgfSk7XHJcbiAgICAkKCdib2R5Jykub24oJ2tleXVwJywgJy5qcy1zZWFyY2gtbWF0Y2hlcycsIGZ1bmN0aW9uICgpIHtcclxuICAgICAgICBsZXQgc2VsZiA9ICQodGhpcyk7XHJcbiAgICAgICAgbGV0IGxpc3QgPSAkKCcuJyArIHNlbGYuZGF0YSgnbGlzdCcpKTtcclxuICAgICAgICAkLmFqYXgoe1xyXG4gICAgICAgICAgICB1cmw6IHNlbGYuZGF0YSgndXJsJykgKyAnP3E9JyArIHNlbGYudmFsKCksXHJcbiAgICAgICAgICAgIHR5cGU6ICdHRVQnLFxyXG4gICAgICAgICAgICBkYXRhVHlwZTogJ2pzb24nLFxyXG4gICAgICAgICAgICBzdWNjZXNzOiBmdW5jdGlvbiAocmVzcG9uc2UpIHtcclxuICAgICAgICAgICAgICAgIGxpc3QuZW1wdHkoKTtcclxuXHJcbiAgICAgICAgICAgICAgICBpZiAocmVzcG9uc2UuaXRlbXMubGVuZ3RoKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgJC5lYWNoKHJlc3BvbnNlLml0ZW1zLCBmdW5jdGlvbiAoaSwgaXRlbSkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBsaXN0LmFwcGVuZChgPGEgY2xhc3M9XCJzZWFyY2gtZm9ybS1tYXRjaGVzX19saW5rXCIgaHJlZj1cIiR7aXRlbS51cmx9XCI+JHtpdGVtLnRpdGxlfTwvYT5gKTtcclxuICAgICAgICAgICAgICAgICAgICB9KTtcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH0pO1xyXG4gICAgfSk7XHJcbn0pKCk7Il0sImZpbGUiOiJtYWluLmpzIn0=
