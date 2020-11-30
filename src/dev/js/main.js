jQuery.fn.exists = function () {
    return $(this).length;
}

gsap.registerPlugin(ScrollTrigger);

let timeline = gsap.timeline();

const projectFunc = {
    objAd: function (element, place) {
        if ($(element).exists()) {
            $(element).each(function (index) {
                let outEl = this;
                $(place).append(outEl);
            });
        }
    },

    objReturn: function (element, place) {
        if ($(element).exists()) {
            var t = '';
            t = $(element).html();
            return $(element);
        }
    },

    showCard: function (element) {
        let popupEl = '';
        $('.popup-card').each(function (popup) {
            if (popup == element) {
                popupEl = $(this);
            }
        });
        timeline
            .fromTo(
                '.overlay-card', {
                autoAlpha: 0
            }, {
                autoAlpha: 1,
                duration: 0.3,
                ease: 'power2.out'
            },
                '+=0.3'
            )
            .to(
                popupEl, {
                scale: 1,
                duration: 0.8,
                ease: 'power2.out'
            }
            )
    },

    hideCard: function () {
        timeline.clear();
        gsap.to(
            '.popup-card', {
            scale: 0,
            duration: 0.8,
            ease: 'power2.out'
        }
        );
        gsap.to(
            '.overlay-card', {
            autoAlpha: 0,
            delay: 0.5
        }
        );
    },

    hideBasket: function () {
        timeline.clear();
        gsap.set(
            ['.popup-basket .btn', '.popup-basket__icon', '.popup-basket__title', '.popup-basket__item', '.popup-basket__text', '.popup-basket__sum', '.popup-basket__hide'], {
            autoAlpha: 0,
        }
        );

        gsap.set(
            ['.popup-basket__icon', '.popup-basket__title'], {
            scale: 0
        }
        );

        gsap.set(
            '.popup-basket__item', {
            autoAlpha: 0,
            y: -20
        }
        );

        gsap.set(
            '.popup-basket__text', {
            autoAlpha: 0,
            xPercent: -20
        }
        );

        gsap.set(
            '.popup-basket__sum', {
            autoAlpha: 0,
            xPercent: 20
        }
        );

        gsap.set(
            '.popup-basket__hide', {
            autoAlpha: 0,
        }
        )

        gsap.to(
            '.popup-basket', {
            xPercent: 120,
            duration: 0.5,
            ease: "power2.out"
        }
        );
        gsap.to(
            '.overlay-basket', {
            autoAlpha: 0
        }
        );

        $('html').removeClass('locked');
        document.body.style.overflow = 'auto';
        // parallaxBildboard.enable();
    },

    showBasket: function () {
        timeline
            .fromTo(
                '.overlay-basket', {
                autoAlpha: 0
            }, {
                autoAlpha: 1,
                duration: 0.3,
                ease: 'power2.out'
            },
                '+=0.3'
            )

            .fromTo(
                '.popup-basket', {
                xPercent: 120,
                autoAlpha: 1,
            }, {
                xPercent: 0,
                duration: 0.6,
                ease: "power2.out"
            }
            )
            .to(
                '.popup-basket__hide', {
                autoAlpha: 1,
            }
            )
            .to(
                ['.popup-basket__icon', '.popup-basket__title'], {
                scale: 1,
                ease: "power2.out",
                stagger: 0.4,
                autoAlpha: 1
            }
            )
            .to(
                '.popup-basket__item', {
                autoAlpha: 1,
                y: 0,
                stagger: 0.3,
                // duration: 0.3,
                ease: "power2.out",
            }
            )
            .to(
                ['.popup-basket__sum', '.popup-basket__text'], {
                autoAlpha: 1,
                xPercent: 0
            }
            )
            .to(
                '.popup-basket .btn', {
                autoAlpha: 1,
                duration: 0.3
            }
            );
        $('html').addClass('locked');
        document.body.style.overflow = 'hidden';
    }


}
$(document).ready(function () {
    function showMenu(heightEl) {
        gsap.to(
            '.menu__cover', {
            autoAlpha: 1,
            height: heightEl + 20,
            ease: "power1.out",
            duration: 0.5
        }
        );


        gsap.to(
            '.menu__btn i', {
            scaleY: -1,
            duration: 0.5
        }
        );
    }

    function hideMenu() {
        const timeline = gsap.timeline();

        gsap.to(
            '.menu__cover', {
            autoAlpha: 0,
            height: 0,
            ease: "power1.out",
            duration: 0.5
        }
        );

        gsap.to(
            '.menu__btn i', {
            scaleX: 1,
            scaleY: 1,
            ease: "power1.out",
            duration: 0.5
        }
        );
    }

    function setHeight(elem) {
        if ($(elem).exists()) {
            try {
                console.log(1);
                let heightSet = 0;
                $(elem).each(function () {
                    heightSet += $(this).outerHeight();
                });

                if ($(this).width() > 900) {
                    heightSet = heightSet - 20;
                } else {
                    heightSet = heightSet / 2;
                }

                return heightSet;
            } catch (err) {
                console.log(err);
            }
        }
    }

    if ($('#gallery').exists()) {
        $('#gallery').lightGallery();
    }


    if ($('.gallery__grid').exists()) {
        let parallaxT = new TimelineMax({
            scrollTrigger: {
                trigger: '#gallery',
                start: 'top-=20%',
                end: 'bottom-=20% center',
                scrub: true,
            }
        });

        gsap.set(
            '.gallery__item',
            {
                x: -30,
                autoAlpha: 0
            }
        );

        parallaxT
            .to('.gallery__item',
                {
                    autoAlpha: 1,
                    x: 0,
                    stagger: 1
                });
    }



    if ($('.about-slider').exists()) {
        let swiperAbout = new Swiper('.about-slider', {
            slidesPerView: 2,
            spaceBetween: 30,
            loop: true,
            speed: 500,
            autoplay: {
                delay: 5000,
            },
            pagination: {
                el: '.swiper-pagination',
                type: 'progressbar',
            },
            navigation: {
                nextEl: '.swiper-button-next',
                prevEl: '.swiper-button-prev',
            },
            breakpoints: {
                320: {
                    slidesPerView: 2.2,
                    spaceBetween: 15
                },
                501: {
                    slidesPerView: 3.4,
                    spaceBetween: 30
                },
                841: {
                    slidesPerView: 1.2,
                    spaceBetween: 30
                },
                1025: {
                    slidesPerView: 2,
                    spaceBetween: 30
                },
                1280: {
                    slidesPerView: 2,
                    spaceBetween: 30
                }
            }
        });
    }

    if ($('.popup-card__close').exists()) {
        $('.popup-card__close').on('click', function (event) {
            event.stopPropagation();
            projectFunc.hideCard();
        });
    }

    if ($('.set__item').exists()) {
        $('.set__item').each(function (index) {
            $(this).on('click', function (event) {
                let target = event.target;

                if (!target.classList.contains('btn')) {
                    projectFunc.showCard(index);
                }
            })
        })
    }

    if ($('.menu__btn').exists()) {
        try {
            $('.menu__btn').on('click', function () {
                $(this).toggleClass('mf-show');
                if ($(this).hasClass('mf-show')) {
                    let heightEl = setHeight('.menu__item');
                    showMenu(heightEl);
                } else {
                    hideMenu();
                }
            });


        } catch (err) {
            console.log(err);
        }
    }

    if ($('.menu').exists()) {
        $(window).on('resize load', function () {
            if ($(this).width() > 900) {
                let heightEl = setHeight('.menu__item');
                console.log(heightEl);
                showMenu(heightEl);
            } else {
                hideMenu();
            }
        });
    }

    if ($('.js-basket').exists()) {
        try {

            const basketBtn = document.querySelector('.js-basket');
            projectFunc.hideBasket();

            basketBtn.addEventListener('mouseenter', function () {

                if ($('.header__inner').hasClass('mf-scroll')) {
                    $('.header__inner').addClass('locked');
                }

                if ($('.overlay-basket').exists()) {
                    projectFunc.showBasket();
                }
            });
        } catch (err) {
            console.log(err);
        }
    }

    //#scene_about

    if ($('#scene_about').exists()) {
        try {
            let scene = document.getElementById('scene_about');
            let parallaxBildboard = new Parallax(scene, {
                hoverOnly: true,
                relativeInput: true
            });
        } catch (err) {
            console.log(err);
        }
    }

    if ($('#scene_contacts').exists()) {
        try {
            let scene = document.getElementById('scene_contacts');
            let parallaxBildboard = new Parallax(scene, {
                hoverOnly: true,
                relativeInput: true
            });
        } catch (err) {
            console.log(err);
        }
    }

    if ($('#scene').exists()) {
        try {
            let scene = document.getElementById('scene');
            let parallaxBildboard = new Parallax(scene, {
                hoverOnly: true,
                relativeInput: true
            });


            $(window).on('resize load', function () {
                if ($(this).width() <= 1024) {
                    parallaxBildboard.destroy();
                } else {
                    let parallaxBildboard = new Parallax(scene, {
                        hoverOnly: true,
                        relativeInput: true
                    });
                }
            });
        } catch (err) {
            console.log(err);
        }
    }


    if ($('.offer__slider .btn').exists()) {
        let tempQuestion = projectFunc.objReturn(".offer__slider .btn");

        $(window).on('resize load', function () {
            if ($(this).width() <= 600) {
                projectFunc.objAd(".offer__slider .btn", "#offer__all");
            }
        });
    }

    if ($('.about__left .btn').exists()) {
        let tempBtn = projectFunc.objReturn(".about__left .btn");

        $(window).on('resize load', function () {
            if ($(this).width() <= 840) {
                projectFunc.objAd(".about__left .btn", ".about__include");
            } else {
                projectFunc.objAd(tempBtn, " .about__basic");
            }
        });
    }

    function showBasket() {
        let timeline = gsap.timeline();
        timeline
            .fromTo(
                '.overlay-basket', {
                autoAlpha: 0
            }, {
                autoAlpha: 1,
                duration: 0.3,
                ease: 'power2.out'
            },
                '+=0.3'
            )

            .fromTo(
                '.popup-basket', {
                xPercent: 120,
                autoAlpha: 1,
            }, {
                xPercent: 0,
                duration: 0.6,
                ease: "power2.out"
            }
            )
            .to(
                '.popup-basket__hide', {
                autoAlpha: 1,
            }
            )
            .to(
                ['.popup-basket__icon', '.popup-basket__title'], {
                scale: 1,
                ease: "power2.out",
                stagger: 0.4,
                autoAlpha: 1
            }
            )
            .to(
                '.popup-basket__item', {
                autoAlpha: 1,
                y: 0,
                stagger: 0.3,
                // duration: 0.3,
                ease: "power2.out",
            }
            )
            .to(
                ['.popup-basket__sum', '.popup-basket__text'], {
                autoAlpha: 1,
                xPercent: 0
            }
            )
            .to(
                '.popup-basket .btn', {
                autoAlpha: 1,
                duration: 0.3
            }
            );
        $('html').addClass('locked');
        document.body.style.overflow = 'hidden';
    }

    // function hideBasket() {
    //     gsap.set(
    //         ['.popup-basket .btn', '.popup-basket__icon', '.popup-basket__title', '.popup-basket__item', '.popup-basket__text', '.popup-basket__sum', '.popup-basket__hide'], {
    //             autoAlpha: 0
    //         }
    //     );

    //     gsap.set(
    //         ['.popup-basket__icon', '.popup-basket__title'], {
    //             scale: 0
    //         }
    //     );

    //     gsap.set(
    //         '.popup-basket__item', {
    //             autoAlpha: 0,
    //             y: -20
    //         }
    //     );

    //     gsap.set(
    //         '.popup-basket__text', {
    //             autoAlpha: 0,
    //             xPercent: -20
    //         }
    //     );

    //     gsap.set(
    //         '.popup-basket__sum', {
    //             autoAlpha: 0,
    //             xPercent: 20
    //         }
    //     );

    //     gsap.set(
    //         '.popup-basket__hide', {
    //             autoAlpha: 0,
    //         }
    //     )

    //     gsap.to(
    //         '.popup-basket', {
    //             xPercent: 120,
    //             duration: 0.5,
    //             ease: "power2.out"
    //         }
    //     );
    //     gsap.to(
    //         '.overlay-basket', {
    //             autoAlpha: 0
    //         }
    //     );

    //     $('html').removeClass('locked');
    //     document.body.style.overflow = 'auto';
    //     parallaxBildboard.enable();
    // }

    if ($('.overlay-basket').exists()) {
        $('.overlay-basket').click(function (e) {
            if (e.target.className.indexOf('overlay-basket') != -1) {
                projectFunc.hideBasket();
                $('html').css('overflow', 'auto');
            }
        });
    }

    if ($('.overlay-card').exists()) {
        $('.overlay-card').click(function (e) {
            if (e.target.className.indexOf('overlay-card') != -1) {
                projectFunc.hideCard();
                $('html').css('overflow', 'auto');
            }
        });
    }


    if ($('.popup-basket__hide').exists()) {
        $('.popup-basket__hide').on('click', function () {
            projectFunc.hideBasket();
        });
    }

    if ($('.header__inner').exists) {
        try {
            let $window = $(window),
                $target = $(".header__inner"),
                $h = $target.offset().top;
            $window.on('scroll', function () {
                let scrollTop = window.pageYOffset || document.documentElement.scrollTop;
                if (scrollTop > $h) {
                    $target.addClass("mf-scroll");
                    return;
                } else {
                    $target.removeClass("mf-scroll");
                    $target.removeClass('locked');
                }
                return;
            });
        } catch (err) {
            console.log(err);
        }
    }

    $(window).on('resize load', function () {
        if ($(this).width() <= 1235) {
            if ($('.category__cover').exists()) {
                $('.category__cover').mCustomScrollbar({
                    theme: 'minimal-dark',
                    axis: "x"
                });
            }
        }
    });


    //===========Truncate text=============

    function truncateText(bloc, qty) {
        if (bloc.length > 0) {
            let txtBloc = document.querySelectorAll(bloc);
            for (let i = 0; i < txtBloc.length; i++) {
                trc(txtBloc[i], qty);
            }
        }
    }

    function trc(txt, qty) {
        let text = txt.textContent;
        var sliced = text.slice(0, qty);
        if (sliced.length < text.length) {
            sliced += '...';
        }

        txt.textContent = sliced;
    }

    //truncateText('.set__content', 60);
    truncateText('.offer__txt', 100);


    $(window).on('resize load', function () {
        if ($(this).width() <= 600) {
            truncateText('.set__content', 50);
        } else {
            truncateText('.set__content', 300);
        }
    });

    gsap.set(
        $('.dish__box').find('.dish__image'), {
        scale: 0,
        opacity: 0
    }
    );
    gsap.set(
        $('.dish__box:first-child').find('.dish__image'), {
        scale: 1,
        opacity: 1
    }
    );

    gsap.set(
        $('.dish__article'), {
        y: -30,
        opacity: 0
    }
    );

    gsap.set(
        $('.dish__article')[0], {
        y: 0,
        opacity: 1
    }
    );

    gsap.set(
        $('.dish__text--word'), {
        y: -30,
        opacity: 0
    }
    );

    gsap.set(
        $('.dish__text--word')[0], {
        y: 0,
        opacity: 1
    }
    );

    gsap.set(
        $('.dish__price'), {
        x: -30,
        opacity: 0
    }
    );

    gsap.set(
        $('.dish__price')[0], {
        x: 0,
        opacity: 1
    }
    );

    gsap.set(
        $('.dish__box .btn--small'), {
        x: 30,
        opacity: 0
    }
    );

    gsap.set(
        $('.dish__box .btn--small')[0], {
        x: 0,
        opacity: 1
    }
    );

    if ($('.offer__slider').exists()) {
        try {

            const breakpoint = window.matchMedia('(min-width:601px)');

            let mySwiper;

            const breakpointChecker = function () {

                // if larger viewport and multi-row layout needed
                if (breakpoint.matches === true) {

                    // clean up old instances and inline styles when available
                    if (mySwiper !== undefined) mySwiper.destroy(true, true);

                    // or/and do nothing
                    return;

                    // else if a small viewport and single column layout needed
                } else if (breakpoint.matches === false) {

                    // fire small viewport version of swiper
                    return enableSwiper();

                }

            };

            const enableSwiper = function () {

                mySwiper = new Swiper('.offer__slider', {
                    slidesPerView: 1,
                    spaceBetween: 10,
                    pagination: {
                        el: '.offer__pagination',
                        clickable: true,
                    },
                    speed: 400,
                });

            };

            $(window).on('resize load', function () {
                breakpoint.addListener(breakpointChecker);
                breakpointChecker();
            });
        } catch (err) {
            console.log(err);
        }
    }



    if ($('.dish-slider').exists()) {
        let dishSlider = new Swiper('.dish-slider', {
            slidesPerView: 1,
            effect: 'fade',
            loop: true,
            fadeEffect: {
                crossFade: true
            },
            speed: 400,
            navigation: {
                nextEl: '.dish .arr--next',
                prevEl: '.dish .arr--prev',
            },
            pagination: {
                el: '.dish__pagination',
                clickable: true,
            },
            on: {
                slideChangeTransitionEnd: function () {
                    let timeline = gsap.timeline();

                    // console.log($('.dish__image')[this.activeIndex]);
                    let actIndex = this.activeIndex;
                    $('.dish__box').each(function (index) {
                        if (index != actIndex) {
                            gsap.set(
                                $('.dish__image')[index], {
                                scale: 0,
                                opacity: 0
                            }
                            );

                            gsap.set(
                                $('.dish__text--word')[index], {
                                y: -30,
                                opacity: 0
                            }
                            );

                            gsap.set(
                                $('.dish__article')[index], {
                                y: -30,
                                opacity: 0
                            }
                            );

                            gsap.set(
                                $('.dish__price')[index], {
                                x: -30,
                                opacity: 0
                            }
                            );

                            gsap.set(
                                $('.dish__box .btn--small')[index], {
                                x: 30,
                                opacity: 0
                            }
                            );
                        } else {
                            let timeline = gsap.timeline();
                            timeline
                                .to(
                                    $('.dish__image')[index], {
                                    scale: 1,
                                    opacity: 1,
                                    duration: 1
                                }
                                )

                                .to(
                                    $('.dish__article')[index], {
                                    opacity: 1,
                                    y: 0,
                                    duration: 0.3
                                }
                                )

                                .to(
                                    $('.dish__text--word')[index], {
                                    opacity: 1,
                                    y: 0,
                                    duration: 0.3
                                }
                                )

                                .to(
                                    $('.dish__price')[index], {
                                    opacity: 1,
                                    x: 0,
                                    duration: 0.3
                                }
                                )
                                .to(
                                    $('.dish__box .btn--small')[index], {
                                    x: 0,
                                    opacity: 1,
                                    duration: 0.3
                                },
                                    '-=0.6'
                                );
                        }
                    });
                },
            },
        });
    }





    if ($('#scene_comment').exists()) {
        let scene_comment = document.getElementById('scene_comment');

        let parallaxComment = new Parallax(scene_comment, {
            hoverOnly: true,
            relativeInput: true
        });
    }


    if ($('#scene_dish').exists()) {
        let sceneDish = document.getElementById('scene_dish');
        let parallaxDish = new Parallax(sceneDish, {
            hoverOnly: true,
            relativeInput: true
        });
    }

    if ($('.bildboard__slider').exists()) {
        let bildboardContent = new Swiper('.bildboard__slider', {
            slidesPerView: 1,
            spaceBetween: 10,
            effect: 'fade',
            fadeEffect: {
                crossFade: true
            },
            pagination: {
                el: '.bildboard__pagination',
                clickable: true,
            },
        });

        let bildboardBg = new Swiper('.bildboard__bg', {
            slidesPerView: 1,
            spaceBetween: 10,
            effect: 'fade',
            fadeEffect: {
                crossFade: true
            }
        });

        bildboardContent.controller.control = bildboardBg;
        bildboardBg.controller.control = bildboardContent;
    }

    //.advice__slider


    if ($('.advice__slider').exists()) {
        try {
            let adviceSlider = new Swiper('.advice__slider', {
                slidesPerView: 3,
                spaceBetween: 40,
                // touchRatio: false,
                pagination: {
                    el: '.advice__slider .pagination',
                    clickable: true,
                },
                speed: 400,
                navigation: {
                    nextEl: '.advice__slider .arr--next',
                    prevEl: '.advice__slider .arr--prev',
                },
                // autoHeight: true,
                breakpoints: {
                    320: {
                        slidesPerView: 1,
                        spaceBetween: 20
                    },
                    601: {
                        slidesPerView: 2,
                        spaceBetween: 20
                    },
                    769: {
                        slidesPerView: 3,
                        spaceBetween: 20
                    },
                    1025: {
                        slidesPerView: 3,
                        spaceBetween: 40
                    },
                    1280: {
                        slidesPerView: 3,
                        spaceBetween: 40
                    }
                }

            });

            $(window).on('resize load', function () {
                if ($(this).width() <= 600) {
                    truncateText('.advice__content', 60);
                } else {
                    truncateText('.advice__content', 200);
                }
            });
        } catch (err) {
            console.log(err);
        }
    }

    if ($('.comment__slider').exists()) {
        let commentSlider = new Swiper('.comment__slider', {
            slidesPerView: 2,
            spaceBetween: 40,
            loop: true,
            // touchRatio: false,
            pagination: {
                el: '.comment .pagination',
                clickable: true,
            },
            speed: 400,
            navigation: {
                nextEl: '.comment .arr--next',
                prevEl: '.comment .arr--prev',
            },
            autoHeight: true,
            breakpoints: {
                320: {
                    slidesPerView: 1,
                    spaceBetween: 20
                },
                769: {
                    slidesPerView: 2,
                    spaceBetween: 20
                },
                1280: {
                    slidesPerView: 2,
                    spaceBetween: 40
                }
            }
        });
    }


    $(window).on('load', function () {
        if ($('#map').exists()) {
            ymaps.ready(init);

            function init() {

                // Создание карты.
                var myMap = new ymaps.Map("map", {
                    // Координаты центра карты.
                    // Порядок по умолчанию: «широта, долгота».
                    center: [57.098137, 65.613029],
                    zoom: 17,
                    controls: []
                }),
                    myPlacemark = new ymaps.Placemark(myMap.getCenter(), {}, {
                        // Необходимо указать данный тип макета.
                        iconLayout: 'default#image',
                        // Своё изображение иконки метки.
                        iconImageHref: '/img/icon/marker.png',
                        // Размеры метки.
                        iconImageSize: [90, 90],
                        // Смещение левого верхнего угла иконки относительно
                        // её "ножки" (точки привязки).
                        iconImageOffset: [-5, -38],
                        openBalloonOnClick: false,
                        hasHint: false,
                        hasBalloon: false,
                        cursor: 'INHERIT'

                    });


                myMap.geoObjects.add(myPlacemark);
                myMap.behaviors.disable('scrollZoom');
                //myMap.behaviors.disable('drag');

                var position = myMap.getGlobalPixelCenter();
                myMap.setGlobalPixelCenter([position[0] + 400, position[1]]);

                if (($(this).width() > 880 && $(this).width() <= 1024)) {
                    myMap.setGlobalPixelCenter([position[0] + 300, position[1]]);
                    myMap.container.fitToViewport();
                } else if ($(this).width() > 768 && $(this).width() <= 880) {
                    myMap.setGlobalPixelCenter([position[0] + 200, position[1]]);
                    myMap.container.fitToViewport();
                } else if ($(this).width() > 600 && $(this).width() <= 768) {
                    myMap.setGlobalPixelCenter([position[0] + 100, position[1]]);
                    myMap.container.fitToViewport();
                } else if ($(this).width() > 500 && $(this).width() <= 600) {
                    myMap.setGlobalPixelCenter([position[0] + 230, position[1]]);
                    myMap.container.fitToViewport();
                } else if ($(this).width() > 400 && $(this).width() <= 500) {
                    myMap.setGlobalPixelCenter([position[0] + 290, position[1] - 140]);
                    myMap.container.fitToViewport();
                } else if ($(this).width() > 319 && $(this).width() <= 400) {
                    myMap.setGlobalPixelCenter([position[0] + 380, position[1] - 140]);
                    myMap.container.fitToViewport();
                }
                // else if ($(this).width() <= 600) {
                //     myMap.setGlobalPixelCenter([position[0] + 270, position[1]]);
                //     myMap.container.fitToViewport();
                // }
                // else if ($(this).width() <= 600) {
                //     myMap.setGlobalPixelCenter([position[0] + 270, position[1]]);
                //     myMap.container.fitToViewport();
                // }
                // else if ($(this).width() == 500) {
                //     alert(1);
                //     myMap.setGlobalPixelCenter([position[0] + 270, position[1]] + 200);
                //     myMap.container.fitToViewport();
                // }
                // else {
                //     myMap.setGlobalPixelCenter([position[0] + 400, position[1]]);
                //     myMap.container.fitToViewport();
                // }
            }
        }
    });




    if ($('.tab__info').exists()) {
        let tabsInfo = document.querySelectorAll('.tab__info');
        let tabsContent = document.querySelectorAll('.tab__content');

        const timeline = gsap.timeline();

        let tab = document.querySelectorAll('.tab__info'),
            info = document.querySelector('.tab__header'),
            tabContent = document.querySelectorAll('.tab__content');

        tab[0].classList.add('tab__info--active');

        for (let i = 0; i < tabContent.length; i++) {
            if (i != 0) {
                gsap.set(tabContent[i], {
                    autoAlpha: 0,
                    display: 'none',
                });
            }
        }

        function hideTabContent(a) {
            for (let i = a; i < tabContent.length; i++) {
                tabContent[i].classList.remove('show');
                tabContent[i].classList.add('hide');
                tab[i].classList.remove('tab__info--active');

                timeline
                    .fromTo(
                        tabContent[i], {
                        autoAlpha: 1,
                        display: 'bloc',
                        xPercent: 0,
                    }, {
                        autoAlpha: 0,
                        display: 'none',
                        ease: 'power2.out',
                        xPercent: +100,
                    }
                    )
            }
        }

        hideTabContent(1);

        function showTabContent(b) {
            if (tabContent[b].classList.contains('hide')) {
                tabContent[b].classList.remove('hide');
                tabContent[b].classList.add('show');
                tab[b].classList.add('tab__info--active');
                timeline
                    .fromTo(
                        tabContent[b], {
                        autoAlpha: 0,
                        display: 'none',
                        xPercent: +100,
                    }, {
                        autoAlpha: 1,
                        display: 'block',
                        xPercent: 0,
                        duration: 1,
                        ease: "back"
                    }
                    )
            }
        }

        info.addEventListener('click', function (event) {

            let target = event.target;
            if (target && target.classList.contains('tab__info')) {
                for (let i = 0; i < tab.length; i++) {
                    tab[i].classList.remove('tab__info--active');
                    if (target == tab[i]) {
                        hideTabContent(0);
                        showTabContent(i);
                        break;
                    }
                }
            }
        });
    }


    if ($('.js-tab-btn').extend()) {
        $('.js-tab-btn').on('click', function () {
            $('.tab__case').toggleClass('tab__case--active');
        });
    }

    if ($('.about-service__link').exists()) {
        $('.about-service__link').each(function () {
            $(this).on('click', function () {
                var el = $(this);
                var dest = el.attr('href'); // получаем направление
                if (dest !== undefined && dest !== '') { // проверяем существование
                    $('html').animate({
                        scrollTop: $(dest).offset().top // прокручиваем страницу к требуемому элементу
                    }, 500 // скорость прокрутки
                    );
                }
                return false;
            });
        });
    }

    if ($('.about-service__link').exists()) {
        try {
            $('.about-service__link').each(function () {
                $(this).on('click', function () {
                    const dataLink = $(this).data('val');

                    if ($('.tab__item input').exists()) {
                        const textBtn = document.querySelector('.tab__text');
                        $('.tab__item input').each(function () {
                            const dataLabel = $(this).data('val');
                            if (dataLabel == dataLink) {
                                let tab = document.querySelectorAll('.tab__info');
                                hideTabContent(0);
                                showTabContent(1);
                                $(this).attr("checked", "checked");
                                textBtn.textContent = $(this).siblings('label')[0].textContent;
                            } else {
                                $(this).removeAttr("checked", "checked");
                            }
                        });
                    }
                })
            });
        } catch (err) {
            console.log(err);
        }
    }

    if ($('.tab__item label').exists()) {
        const lablEl = document.querySelectorAll('.tab__item label');
        const textBtn = document.querySelector('.tab__text');

        lablEl.forEach(function (element) {
            element.addEventListener('click', function () {
                textBtn.textContent = this.textContent;
                $('.tab__case').toggleClass('tab__case--active');
            });
        })
    }

    if ($('.js-bcg-parallax').exists()) {
        try {
            var parallaxTL = new TimelineMax({
                scrollTrigger: {
                    trigger: '.js-bcg-parallax',
                    start: 'top bottom',
                    end: 'bottom-=130%',
                    scrub: true,
                    markers: true
                }
            });

            parallaxTL
                .set('.js-bcg', {
                    y: '-220',
                })
                .set('.js-content-wrapper', {
                    autoAlpha: 0,
                })
                .set('.about-advantage__item', {
                    autoAlpha: 0,
                    x: '-30'
                })
                .to('.js-bcg', 35, {
                    y: 0
                })
                .to('.js-content-wrapper', 8, {
                    autoAlpha: 1,
                })
                .to('.about-advantage__item', 8, {
                    x: 0,
                    autoAlpha: 1,
                    stagger: 5,
                });
            // .from('.js-content-wrapper', {
            //     delay: 15,
            //     autoAlpha: 0,
            // })
            ;
            // .from(
            //         '.about-advantage__item', {
            //         // duration: 10,
            //         autoAlpha: 0,
            //         // stagger: 5,
            //         x: '-30'
            //     }
            //     );
        } catch (err) {
            console.log(err);
        }
    }

});