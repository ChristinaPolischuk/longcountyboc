;
(function () {
    cropText();
    hideBlock();

    let readMore = document.querySelectorAll('.js-read-more');

    readMore.forEach(el => {
        el.addEventListener('click', () => {
            let elText = el.innerText;
            let hiddenText = el.previousElementSibling;

            el.innerText = elText == 'read more >' ? 'hide' : 'read more >';
            hiddenText.classList.toggle('show');
        });
    });

    function cropText() {
        let max = 180;
        let text = document.querySelectorAll('.js-read-more-text');
        text.forEach(el => {
            let str = el.innerText.trim();
            if (str.length > max) {
                let subStr = str.substring(0, max);
                let hiddenStr = str.substring(max, str.length);
                el.innerText = subStr;
                el.innerHTML += `<span class="hidden-text js-hidden-text">${hiddenStr}</span>`;
                el.innerHTML += '<span class="read-more js-read-more">read more ></span>';
            }
        });
    }

    let showReview = document.querySelectorAll('.js-show-review');

    showReview.forEach(el => {
        el.addEventListener('click', () => {
            let elText = el.innerText;
            let hiddenText = el.previousElementSibling;
            let images = el.nextElementSibling;

            el.innerText = elText == 'read more >' ? '< hide' : 'read more >';
            hiddenText.classList.toggle('show');
            images.classList.toggle("show");
        });
    });

    function hideBlock() {
        let max = 128;
        let productReview = document.querySelectorAll('.js-hide-review');
        productReview.forEach(el => {
            let productText = el.querySelector(".page-text");
            let str = productText.innerText.trim();
            let images = el.querySelector('.product-review__images');
            if (str.length > max) {
                let subStr = str.substring(0, max);
                let hiddenStr = str.substring(max, str.length);
                productText.innerText = subStr;

                let hiddenText = document.createElement('span');
                hiddenText.classList.add('hidden-text', 'page-text', 'js-hidden-text');
                hiddenText.textContent = hiddenStr;

                productText.after(hiddenText);

            }

            let readMore = document.createElement('span');
            readMore.classList.add('read-more', 'js-show-review');
            readMore.textContent = 'read more >';

            images.before(readMore);
        });
    }

    const accordion = () => {
        document.addEventListener('click', e => {
            if (e.target.classList.contains('js-accordion') || e.target.closest('.js-accordion')) {
                const accordion = e.target.classList.contains('js-accordion') ? e.target : e.target.closest('.js-accordion');
                const accordionContent = accordion.nextElementSibling;
                if (accordionContent.style.maxHeight || getComputedStyle(accordionContent).maxHeight == "max-content") {
                    accordion.parentElement.classList.remove("active");
                    accordionContent.style.maxHeight = null;
                } else {
                    accordion.parentElement.classList.add("active");
                    accordionContent.style.maxHeight = accordionContent.scrollHeight + "px";
                }
            }
        });
    }
    accordion();

    const sidebarLinks = document.querySelectorAll(".sidebar-menu__link");

    sidebarLinks.forEach(elem => elem.addEventListener("click", navbarLinkClick));

    function navbarLinkClick(event) {
        smoothScroll(event);
    }

    function smoothScroll(event) {
        event.preventDefault();
        const targetId = event.currentTarget.getAttribute("href");
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

        window.addEventListener('optimizedResize', () => {
            toggleFixed('.products-sticky');
        });


        toggleFixed('.products-sticky');

        throttle("resize", "optimizedResize");

    }

    if (document.querySelector('.sticky-block') !== null) {
        let stickyBlockCoords = document.querySelector('.sticky-block').getBoundingClientRect().bottom + window.pageYOffset;

        window.addEventListener("scroll", function () {
            trackScroll('.sticky-block');
        });

        function trackScroll(elements) {
            let stickyBlocks = document.querySelectorAll(elements);
            stickyBlocks.forEach(el => {
                if (el.classList.contains('show') && window.pageYOffset < stickyBlockCoords) {
                    el.classList.remove('show');
                } else if (window.pageYOffset > stickyBlockCoords) {
                    el.classList.add('show');
                }
            });
        }
    }

    function throttle(type, name, obj) {
        obj = obj || window;
        var running = false;
        var func = function () {
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
    };

    function toggleFixed(el) {
        let element = document.querySelector(el);
        let fixedWidth = window.screen.width > 1024 ? element.parentElement.clientWidth - 285 : element.parentElement.clientWidth;
        element.style.width = fixedWidth + 'px';

    }

    const showHideSidebarFilters = () => {
        if (document.querySelectorAll(".filter").length == 0) return false;

        window.addEventListener("load", showHideFilters);
        window.addEventListener("resize", showHideFilters);

        function showHideFilters() {
            const sidebarFilters = document.querySelectorAll(".filter");

            if (window.screen.width <= 1024) {
                sidebarFilters.forEach(filter => {
                    filter.classList.remove("active");
                });
            } else {
                sidebarFilters.forEach(filter => {
                    filter.classList.add("active");
                });
            }
        }
    }

    showHideSidebarFilters();

    const showMobileMenu = () => {
        // hamburger open/close animation
        if (document.querySelector("#hamburger") == null) return false;
        const trigger = document.querySelector("#hamburger");
        const mobileNav = document.querySelector("#mobile-nav");
        let isClosed = true;

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
    }

    showMobileMenu();

    const openSearchForm = () => {
        // search form open/close animation
        if (document.querySelector(".search-form__btn") == null) return false;
        const searchBtn = document.querySelector(".search-form__btn");
        searchBtn.addEventListener("click", function () {
            this.classList.toggle("close");
            this.parentElement.classList.toggle("inclicked");
            this.previousElementSibling.value = "";
        });
        const productReviewStars = document.querySelectorAll(".js-product-review-rating");
        productReviewStars.forEach(function (el) {
            const dataRating = el.getAttribute("data-rating");
            const stars = el.children;
            for (let i = 0; i < dataRating; i++) {
                stars[i].classList.add("active");
            }
        });
    }

    openSearchForm();

    const chooseRating = () => {
        if (document.querySelectorAll(".js-rating").length < 0) return false;

        const rating = document.querySelectorAll(".js-rating");

        rating.forEach(rate => {
            const ratingStars = rate.children;

            rate.addEventListener("click", (e) => {
                if (e.target.classList.contains("js-rating-star") || e.target.closest(".js-rating-star")) {
                    let target = e.target.classList.contains("js-rating-star") ? e.target : e.target.closest(".js-rating-star");
                    removeClass(ratingStars, "current-active");
                    target.classList.add("active", "current-active");
                }
            });
            rate.addEventListener("mouseover", (e) => {
                if (e.target.classList.contains("js-rating-star") || e.target.closest(".js-rating-star")) {
                    let target = e.target.classList.contains("js-rating-star") ? e.target : e.target.closest(".js-rating-star");
                    removeClass(ratingStars, "active");
                    target.classList.add("active");
                    mouseOverActiveClass(ratingStars);
                }
            });
            rate.addEventListener("mouseout", () => {
                addClass(ratingStars, "active");
                mouseOutActiveClass(ratingStars);
            });

            function addClass(arr) {
                for (let i = 0, iLeng = arr.length; i < iLeng; i++) {
                    for (let j = 1; j < arguments.length; j++) {
                        ratingStars[i].classList.add(arguments[j]);
                    }
                }
            }

            function removeClass(arr) {
                for (let i = 0, iLeng = arr.length; i < iLeng; i++) {
                    for (let j = 1; j < arguments.length; j++) {
                        ratingStars[i].classList.remove(arguments[j]);
                    }
                }
            }

            function mouseOverActiveClass(arr) {
                for (let i = 0, iLen = arr.length; i < iLen; i++) {
                    if (arr[i].classList.contains("active")) {
                        break;
                    } else {
                        arr[i].classList.add("active");
                    }
                }
            }

            function mouseOutActiveClass(arr) {
                for (let i = arr.length - 1; i >= 0; i--) {
                    if (arr[i].classList.contains("current-active")) {
                        break;
                    } else {
                        arr[i].classList.remove("active");
                    }
                }
            }
        });
    }

    chooseRating();

    document.addEventListener("click", function (e) {
        if (e.target.classList.contains("js-open-dropdown") && window.screen.width <= 576) {
            const caretDropdown = e.target.firstElementChild;
            const dropdown = e.target.nextElementSibling;
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

    const basicScrollTop = function () {
        if (document.querySelector('.js-btn-go-top') == null) return false;
        const btnTop = document.querySelector('.js-btn-go-top');
        const btnReveal = function () {
            if (window.scrollY >= 300) {
                btnTop.classList.add('is-visible');
            } else {
                btnTop.classList.remove('is-visible');
            }
        }
        const TopscrollTo = function () {
            if (window.scrollY != 0) {
                setTimeout(function () {
                    window.scrollTo(0, window.scrollY - 30);
                    TopscrollTo();
                }, 10);
            }
        }
        window.addEventListener('scroll', btnReveal);
        btnTop.addEventListener('click', TopscrollTo);

    };
    basicScrollTop();

    const openModal = (btn, modal) => {
        if (document.querySelector(btn) == null) return false;

        const modalBtn = document.querySelector(btn);
        const modalContainer = document.querySelector(modal);

        if (
            navigator.userAgent.match(/iPhone/i) ||
            navigator.userAgent.match(/iPod/i)
        ) {
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
            if (
                e.target.classList.contains("modal-container") ||
                e.target.classList.contains("modal-close")
            ) {
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

    const seeMore = (number, elements, button) => {

        if (document.querySelector(button) == null) {
            return false;
        }
        window.addEventListener("load", () => showHideBlocks(number, elements, button));
        window.addEventListener("resize", () => showHideBlocks(number, elements, button));

        document.querySelector(button).addEventListener("click", function () {
            if (this.textContent == "See more") {
                this.textContent = "See less";
                this.classList.add("active");
            } else {
                this.textContent = "See more";
                this.classList.remove("active");
            }
            document.querySelectorAll(elements).forEach((elem, index) => {
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
            const elems = document.querySelectorAll(elements);
            const btnShowHide = document.querySelector(button);

            if (window.screen.width <= 800 && elems.length > number) {
                elems.forEach((elem, index) => {
                    if (index > number) {
                        elem.style.display = 'none';
                        btnShowHide.style.display = null;
                    }
                });
            } else {
                elems.forEach((elem, index) => {
                    elem.style.display = null;
                    btnShowHide.style.display = 'none';
                });
            }
        }
    };

    seeMore(3, '.product-compare-top__item', '.js-see-more-products');
    seeMore(1, '.help-center__item', '.js-see-more-help');

    const showItems = (numberDesktop, numberMobile, items, button) => {
        if (document.querySelectorAll(items).length == 0) return false;

        const btn = document.querySelector(button);

        window.addEventListener("load", showHideItems);
        window.addEventListener("resize", showHideItems);

        function showHideItems() {
            const els = document.querySelectorAll(items);
            const btn = document.querySelector(button);
            if (window.screen.width > 577) {
                if (els.length > numberDesktop) {
                    btn.style.display = null;
                    els.forEach((el, i) => {
                        if (i > numberDesktop - 1) {
                            el.style.display = "none"
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
                    els.forEach((el, i) => {
                        if (i > numberMobile - 1) {
                            el.style.display = "none"
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
            const elems = document.querySelectorAll(items);
            if (this.textContent == "See more") {
                this.textContent = "See less";
                this.classList.add("active");
            } else {
                this.textContent = "See more";
                this.classList.remove("active");
            }
            elems.forEach((elem, index) => {
                if (elem.style.display == "none") {
                    elem.style.display = null;
                } else {
                    if ((window.screen.width > 577 && index > numberDesktop - 1) || (window.screen.width < 577 && index > numberMobile - 1)) {
                        elem.style.display = 'none';
                    }
                }
            });
        });
    }

    showItems(8, 4, ".brands-list__item", ".js-see-more-brands");
    showItems(3, 2, ".seo-block", ".js-see-more-seo");
    showItems(3, 2, ".js-related-item", ".js-see-posts");

    const showFooterLinks = () => {
        const footerTitle = document.querySelectorAll('.footer__title');
        const footerLinks = document.querySelectorAll('.footer__links');

        // window.addEventListener('load', () => showHideLinks);
        window.addEventListener('resize', () => {
            if (window.screen.width <= 576) {
                footerLinks.forEach(footerLink => {
                    footerLink.style.maxHeight = 0;
                });
            } else {
                footerLinks.forEach(footerLink => {
                    footerLink.style.maxHeight = null;
                });
            }
        });

        footerTitle.forEach(title => {
            title.addEventListener('click', function () {
                const footerLinks = this.nextElementSibling;
                if (getComputedStyle(footerLinks).maxHeight == '0px') {
                    this.classList.add('active');
                    footerLinks.style.maxHeight = footerLinks.scrollHeight + "px";
                    footerLinks.style.opacity = 1;
                } else {
                    this.classList.remove('active');
                    footerLinks.style.maxHeight = null;
                    footerLinks.style.opacity = null;
                }
            })
        });
    }

    showFooterLinks();

    const showSidebarItems = () => {
        if (document.querySelectorAll(".js-sidebar-see-more").length == 0) return false;

        const sidebarSeeMore = document.querySelectorAll(".js-sidebar-see-more");

        sidebarSeeMore.forEach(el => {
            const sidebarItems = el.previousElementSibling.children;
            if (sidebarItems.length > 3) {
                for (let i = 0, len = sidebarItems.length; i < len; i++) {
                    if (i > 2) {
                        sidebarItems[i].style.display = "none";
                    }
                }
                el.addEventListener("click", () => {
                    for (let i = 0, len = sidebarItems.length; i < len; i++) {
                        if (i > 2) {
                            if (sidebarItems[i].style.display == "none") {
                                sidebarItems[i].style.display = null;
                                el.textContent = "See less";
                                el.classList.add("active");
                            } else {
                                sidebarItems[i].style.display = "none";
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
    }

    showSidebarItems();

    const setPercent = () => {
        const circularProgress = document.querySelectorAll(".js-circular-progress");

        circularProgress.forEach(item => {
            const circle = item.querySelector('.circular-progress__percent');
            const text = item.querySelector('.circular-info__number');
            const dataPercent = item.getAttribute('data-percent');
            const percent = (100 - dataPercent) / 100;
            circle.style.strokeDashoffset = `calc(2*30*3.14*${percent})`;
            text.textContent = dataPercent;
        });
    }

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

    const priceSlider = () => {
        const rangeInputs = document.querySelectorAll(".price-range__input"),
            priceInputs = document.querySelectorAll(".price-input__field"),
            progress = document.querySelector(".price-slider__progress");

        let priceGap = 500;

        priceInputs.forEach((priceInput) => {
            priceInput.addEventListener("input", (e) => {
                let minVal = parseInt(priceInputs[0].value),
                    maxVal = parseInt(priceInputs[1].value);

                if (maxVal - minVal >= priceGap && maxVal <= 50000) {
                    if (e.target.classList.contains("price-min")) {
                        rangeInputs[0].value = minVal;
                        progress.style.left = (minVal / rangeInputs[0].max) * 100 + "%";
                    } else {
                        rangeInputs[1].value = maxVal;
                        progress.style.right = 100 - (maxVal / rangeInputs[1].max) * 100 + "%";
                    }
                }
            });
        });

        rangeInputs.forEach((rangeInput) => {
            rangeInput.addEventListener("input", (e) => {
                let minVal = parseInt(rangeInputs[0].value),
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
                    progress.style.left = (minVal / rangeInputs[0].max) * 100 + "%";
                    progress.style.right = 100 - (maxVal / rangeInputs[1].max) * 100 + "%";
                }
            });
        });

        function addSpaces(value) {
            value = value.replace(/ /g, '');
            return value.replace(/\B(?=(\d{3})+(?!\d))/g, " ");
        }
    };

    priceSlider();

    const viewAll = () => {
        if (document.querySelectorAll(".filter-view-all").length == 0) return false;
        const filterList = document.querySelectorAll(".filter-list");
        const viewAll = document.querySelectorAll(".filter-view-all");

        filterList.forEach(list => {
            if (list.children.length > 5) {
                const items = list.children;
                const viewAll = list.nextElementSibling;
                for (let i = 0, len = items.length; i < len; i++) {
                    if (i >= 5) {
                        items[i].style.display = "none";
                    }
                }
                viewAll.style.display = "block";
            }
        });

        viewAll.forEach(el => {
            el.addEventListener("click", function () {
                const filterItems = this.previousElementSibling.children;
                const filterContent = this.closest(".filter-content");
                for (let i = 0, len = filterItems.length; i < len; i++) {
                    if (i >= 5) {
                        if (filterItems[i].style.display) {
                            filterItems[i].style.display = null;
                            this.textContent = "Hide"
                        } else {
                            filterItems[i].style.display = "none";
                            this.textContent = "View all"
                        }
                    }
                }
                filterContent.style.maxHeight = filterContent.scrollHeight + "px";
            });
        });
    }

    viewAll();

    const inputValue = () => {
        const inputField = document.querySelector(".product-compare-form__field");
        const addValueBtns = document.querySelectorAll(".js-compare");
        addValueBtns.forEach(addValueBtn => {
            addValueBtn.addEventListener("click", function () {
                const val = this.previousElementSibling.textContent;
                inputField.value = val;
            });
        });
    }

    inputValue();

    (function () {
        'use strict';

        var Greedy = function Greedy(options) {
            this.element = document.querySelector(options.element);
            this.counter = options.counter || false;
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
            return this['_' + name + '_'] || Object.defineProperty(
                this, '_' + name + '_', {value: this[name].bind(this)}
            )['_' + name + '_'];
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

            if (this.counter) {
                this.toggleButton.classList.add('counter');
            } else {
                this.toggleButton.classList.add('no-counter');
            }
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

            if (this.counter) {
                this.toggleButton.setAttribute('data-count', this.hiddenLinks.children.length);
                if (!this.hiddenLinks.children.length) {
                    this.toggleButton.classList.remove('visible');
                }
            }
        };

        Greedy.prototype.toggleHiddenLinks = function () {
            this.hiddenLinks.classList.toggle('links-invisible');
            this.toggleButton.classList.toggle('links-displayed');
        };
    })();

    // Initialise menu
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
        nextArrow: ".product-compare-slider__btn--next",
        // variableWidth: true,
    });
    $(".js-related-products-slider").slick({
        slidesToShow: 3,
        slidesToScroll: 1,
        prevArrow: ".js-related-prev",
        nextArrow: ".js-related-next",
        responsive: [
            {
                breakpoint: 768,
                settings: {
                    slidesToShow: 2,
                }
            },
            {
                breakpoint: 576,
                settings: {
                    slidesToShow: 1,
                }
            },
        ]
    });
    $(".js-resently-viewed-slider").slick({
        slidesToShow: 4,
        slidesToScroll: 1,
        prevArrow: ".js-resently-viewed-prev",
        nextArrow: ".js-resently-viewed-next",
        responsive: [
            {
                breakpoint: 993,
                settings: {
                    slidesToShow: 3,
                }
            },
            {
                breakpoint: 769,
                settings: {
                    slidesToShow: 2,
                }
            },
            {
                breakpoint: 577,
                settings: {
                    slidesToShow: 1,
                }
            },
        ]
    });
    $('body').on('keyup', '.js-search-matches', function () {
        let self = $(this);
        let list = $('.' + self.data('list'));
        $.ajax({
            url: self.data('url') + '?q=' + self.val(),
            type: 'GET',
            dataType: 'json',
            success: function (response) {
                list.empty();

                if (response.items.length) {
                    $.each(response.items, function (i, item) {
                        list.append(`<a class="search-form-matches__link" href="${item.url}">${item.title}</a>`);
                    });
                }
            }
        });
    });
})();