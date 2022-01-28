;
(function () {
    cropText();

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
        let max = 200;
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

    const accordions = document.querySelectorAll(".accordion__item");

    const openAccordion = accordion => {
        const content = accordion.querySelector(".accordion__body");
        accordion.classList.add("active");
        content.style.maxHeight = content.scrollHeight + "px";
    };

    const closeAccordion = accordion => {
        const content = accordion.querySelector(".accordion__body");
        accordion.classList.remove("active");
        content.style.maxHeight = null;
    };

    accordions.forEach(accordion => {
        const intro = accordion.querySelector(".accordion__header");
        const content = accordion.querySelector(".accordion__body");

        intro.onclick = () => {
            if (content.style.maxHeight) {
                closeAccordion(accordion);
            } else {
                // accordions.forEach((accordion) => closeAccordion(accordion));
                openAccordion(accordion);
            }
        };
    });

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


        // var parentwidth = $(".parent").width();
        // $(".child").toggleClass("fixed").width(parentwidth);
    }

    // hamburger open/close animation
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

    // search form open/close animation
    const searchBtn = document.querySelector(".search-form__btn");
    searchBtn.addEventListener("click", function () {
        this.classList.toggle("close");
        this.previousElementSibling.classList.toggle("inclicked");
        this.previousElementSibling.value = "";
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
                breakpoint: 992,
                settings: {
                    slidesToShow: 3,
                }
            },
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
    $(".product-table__row").eq(2).addClass("current");
})();