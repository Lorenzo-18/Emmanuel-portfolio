(function(html) {

    "use strict";

    html.className = html.className.replace(/\bno-js\b/g, '') + ' js ';

    // 🔥 Global speed boost
    anime.speed = 0.5;

   /* Animations
    * -------------------------------------------------- */
    const tl = anime.timeline({
        easing: 'easeOutQuad',
        duration: 280,
        autoplay: false
    })
    .add({
        targets: '#loader',
        opacity: 0,
        duration: 250,
        begin() {
            window.scrollTo(0, 0);
        }
    })
    .add({
        targets: '#preloader',
        opacity: 0,
        duration: 200,
        complete() {
            const p = document.querySelector("#preloader");
            p.style.visibility = "hidden";
            p.style.display = "none";
        }
    })
    .add({
        targets: '.s-header',
        translateY: [-60, 0],
        opacity: [0, 1]
    }, '-=150')
    .add({
        targets: ['.s-intro .text-pretitle', '.s-intro .text-huge-title'],
        translateX: [60, 0],
        opacity: [0, 1],
        delay: anime.stagger(120)
    })
    .add({
        targets: '.circles span',
        opacity: [.1, .3],
        delay: anime.stagger(30, { direction: 'reverse' })
    })
    .add({
        targets: '.intro-social li',
        translateX: [-30, 0],
        opacity: [0, 1],
        delay: anime.stagger(40, { direction: 'reverse' })
    })
    .add({
        targets: '.intro-scrolldown',
        translateY: [60, 0],
        opacity: [0, 1]
    }, '-=400');

   /* Preloader
    * -------------------------------------------------- */
    const ssPreloader = function() {

        const preloader = document.querySelector('#preloader');
        if (!preloader) return;

        document.addEventListener('DOMContentLoaded', function() {
            html.classList.remove('ss-preload');
            html.classList.add('ss-loaded');

            document.querySelectorAll('.ss-animated').forEach(el => {
                el.classList.remove('ss-animated');
            });

            tl.play();
        });

    };

   /* Mobile Menu
    * -------------------------------------------------- */
    const ssMobileMenu = function() {

        const toggleButton = document.querySelector('.mobile-menu-toggle');
        const mainNavWrap = document.querySelector('.main-nav-wrap');
        const siteBody = document.body;

        if (!(toggleButton && mainNavWrap)) return;

        toggleButton.addEventListener('click', e => {
            e.preventDefault();
            toggleButton.classList.toggle('is-clicked');
            siteBody.classList.toggle('menu-is-open');
        });

        mainNavWrap.querySelectorAll('.main-nav a').forEach(link => {
            link.addEventListener("click", () => {
                if (window.matchMedia('(max-width: 800px)').matches) {
                    toggleButton.classList.remove('is-clicked');
                    siteBody.classList.remove('menu-is-open');
                }
            });
        });

        window.addEventListener('resize', () => {
            if (window.matchMedia('(min-width: 801px)').matches) {
                siteBody.classList.remove('menu-is-open');
                toggleButton.classList.remove('is-clicked');
            }
        });

    };

   /* Scroll Spy
    * -------------------------------------------------- */
    const ssScrollSpy = function() {

        const sections = document.querySelectorAll(".target-section");

        window.addEventListener("scroll", () => {

            let scrollY = window.pageYOffset;

            sections.forEach(section => {
                const top = section.offsetTop - 60;
                const bottom = top + section.offsetHeight;
                const id = section.getAttribute("id");
                const link = document.querySelector(`.main-nav a[href*="${id}"]`);

                if (!link) return;

                if (scrollY > top && scrollY <= bottom) {
                    link.parentNode.classList.add("current");
                } else {
                    link.parentNode.classList.remove("current");
                }
            });

        });

    };

   /* Viewport Animations (FASTER)
    * -------------------------------------------------- */
    const ssViewAnimate = function() {

        const blocks = document.querySelectorAll("[data-animate-block]");

        window.addEventListener("scroll", () => {

            let scrollY = window.pageYOffset;
            let viewportHeight = window.innerHeight;

            blocks.forEach(block => {

                const triggerTop = block.offsetTop - viewportHeight * 0.75;
                const inView = scrollY > triggerTop;

                if (inView && !block.classList.contains("ss-animated")) {
                    anime({
                        targets: block.querySelectorAll("[data-animate-el]"),
                        opacity: [0, 1],
                        translateY: [40, 0],
                        delay: anime.stagger(80),
                        duration: 400,
                        easing: 'easeOutQuad',
                        begin() {
                            block.classList.add("ss-animated");
                        }
                    });
                }

            });

        });

    };

   /* Swiper
    * -------------------------------------------------- */
    const ssSwiper = function() {
        new Swiper('.swiper-container', {
            slidesPerView: 1,
            pagination: {
                el: '.swiper-pagination',
                clickable: true
            },
            breakpoints: {
                401: { slidesPerView: 1, spaceBetween: 20 },
                801: { slidesPerView: 2, spaceBetween: 32 },
                1201:{ slidesPerView: 2, spaceBetween: 80 }
            }
        });
    };

   /* Lightbox
    * ------------------------------------------------------ */
    const ssLightbox = function() {

        const folioLinks = document.querySelectorAll('.folio-list__item-link');
        const modals = [];

        folioLinks.forEach(function(link) {
            let modalbox = link.getAttribute('href');
            let instance = basicLightbox.create(
                document.querySelector(modalbox),
                {
                    onShow: function(instance) {
                        //detect Escape key press
                        document.addEventListener("keydown", function(event) {
                            event = event || window.event;
                            if (event.keyCode === 27) {
                                instance.close();
                            }
                        });
                    }
                }
            )
            modals.push(instance);
        });

        folioLinks.forEach(function(link, index) {
            link.addEventListener("click", function(event) {
                event.preventDefault();
                modals[index].show();
            });
        });

    };  // end ssLightbox

   /* Alert boxes
    * ------------------------------------------------------ */
    const ssAlertBoxes = function() {

        const boxes = document.querySelectorAll('.alert-box');
  
        boxes.forEach(function(box){

            box.addEventListener('click', function(event) {
                if (event.target.matches(".alert-box__close")) {
                    event.stopPropagation();
                    event.target.parentElement.classList.add("hideit");

                    setTimeout(function(){
                        box.style.display = "none";
                    }, 500)
                }    
            });

        })

    }; // end ssAlertBoxes

   /* Smoothscroll
    * ------------------------------------------------------ */
    const ssMoveTo = function(){

        const easeFunctions = {
            easeInQuad: function (t, b, c, d) {
                t /= d;
                return c * t * t + b;
            },
            easeOutQuad: function (t, b, c, d) {
                t /= d;
                return -c * t* (t - 2) + b;
            },
            easeInOutQuad: function (t, b, c, d) {
                t /= d/2;
                if (t < 1) return c/2*t*t + b;
                t--;
                return -c/2 * (t*(t-2) - 1) + b;
            },
            easeInOutCubic: function (t, b, c, d) {
                t /= d/2;
                if (t < 1) return c/2*t*t*t + b;
                t -= 2;
                return c/2*(t*t*t + 2) + b;
            }
        }

        const triggers = document.querySelectorAll('.smoothscroll');
        
        const moveTo = new MoveTo({
            tolerance: 0,
            duration: 1200,
            easing: 'easeInOutCubic',
            container: window
        }, easeFunctions);

        triggers.forEach(function(trigger) {
            moveTo.registerTrigger(trigger);
        });

    }; // end ssMoveTo

   /* Init
    * -------------------------------------------------- */
    (function ssInit() {
        ssPreloader();
        ssMobileMenu();
        ssScrollSpy();
        ssViewAnimate();
        ssSwiper();
        ssLightbox();
        ssAlertBoxes();
        ssMoveTo();
    })();

})(document.documentElement);