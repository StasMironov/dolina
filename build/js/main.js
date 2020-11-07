jQuery.fn.exists = function () {
    return $(this).length;
}

const projectFunc = {
    objAd: function (element, place) {
        if ($(element).exists()) {
            $(element).each(function (index) {
                let outEl = this;
                $(place).append(outEl);
                // $(this).remove();
            });
        }
    },

    objReturn: function (element, place) {
        if ($(element).exists()) {
            var t = '';
            t = $(element).html();
            return $(element);
        }
    }
}

let tempQuestion = projectFunc.objReturn(".offer__slider .btn");
let сteatedQuestion = false;

$(window).on('resize load', function () {
    if ($(this).width() <= 600) {
        projectFunc.objAd(".offer__slider .btn", "#offer__all");
        сteatedQuestion = false;
    }
});

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

truncateText('.set__content', 60);
truncateText('.offer__txt', 100);

gsap.set(
    $('.dish__box').find('.dish__image'),
    {
        scale: 0,
        opacity: 0
    }
);
gsap.set(
    $('.dish__box:first-child').find('.dish__image'),
    {
        scale: 1,
        opacity: 1
    }
);

gsap.set(
    $('.dish__article'),
    {
        y: -30,
        opacity: 0
    }
);

gsap.set(
    $('.dish__article')[0],
    {
        y: 0,
        opacity: 1
    }
);

gsap.set(
    $('.dish__text--word'),
    {
        y: -30,
        opacity: 0
    }
);

gsap.set(
    $('.dish__text--word')[0],
    {
        y: 0,
        opacity: 1
    }
);

gsap.set(
    $('.dish__price'),
    {
        x: -30,
        opacity: 0
    }
);

gsap.set(
    $('.dish__price')[0],
    {
        x: 0,
        opacity: 1
    }
);

gsap.set(
    $('.dish__box .btn--small'),
    {
        x: 30,
        opacity: 0
    }
);

gsap.set(
    $('.dish__box .btn--small')[0],
    {
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
    }

    catch (err) {
        console.log(err);
    }
}



if ($('.dish-slider').exists()) {
    let dishSlider = new Swiper('.dish-slider', {
        slidesPerView: 1,
        effect: 'fade',
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
                            $('.dish__image')[index],
                            {
                                scale: 0,
                                opacity: 0
                            }
                        );

                        gsap.set(
                            $('.dish__text--word')[index],
                            {
                                y: -30,
                                opacity: 0
                            }
                        );

                        gsap.set(
                            $('.dish__article')[index],
                            {
                                y: -30,
                                opacity: 0
                            }
                        );

                        gsap.set(
                            $('.dish__price')[index],
                            {
                                x: -30,
                                opacity: 0
                            }
                        );

                        gsap.set(
                            $('.dish__box .btn--small')[index],
                            {
                                x: 30,
                                opacity: 0
                            }
                        );
                    }
                    else {
                        let timeline = gsap.timeline();
                        timeline
                            .to(
                                $('.dish__image')[index],
                                {
                                    scale: 1,
                                    opacity: 1,
                                    duration: 1
                                }
                            )

                            .to(
                                $('.dish__article')[index],
                                {
                                    opacity: 1,
                                    y: 0,
                                    duration: 0.3
                                }
                            )

                            .to(
                                $('.dish__text--word')[index],
                                {
                                    opacity: 1,
                                    y: 0,
                                    duration: 0.3
                                }
                            )

                            .to(
                                $('.dish__price')[index],
                                {
                                    opacity: 1,
                                    x: 0,
                                    duration: 0.3
                                }
                            )
                            .to(
                                $('.dish__box .btn--small')[index],
                                {
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

let scene = document.getElementById('scene');
let parallaxBildboard = new Parallax(scene, {
    hoverOnly: true,
    relativeInput: true
});

$(window).on('resize load', function () {
    if ($(this).width() <= 1024) {
        parallaxBildboard.destroy();
    }
    else {
        let parallaxBildboard = new Parallax(scene, {
            hoverOnly: true,
            relativeInput: true
        });
    }
});


let scene_comment = document.getElementById('scene_comment');

let parallaxComment = new Parallax(scene_comment, {
    hoverOnly: true,
    relativeInput: true
});

//#scene_dish
let sceneDish = document.getElementById('scene_dish');
let parallaxDish = new Parallax(sceneDish, {
    hoverOnly: true,
    relativeInput: true
});

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

//.comment__slider

if ($('.comment__slider').exists()) {
    let commentSlider = new Swiper('.comment__slider', {
        slidesPerView: 2,
        spaceBetween: 40,
        // touchRatio: false,
        pagination: {
            el: '.comment__pagination',
            clickable: true,
        },
        speed: 400,
        navigation: {
            nextEl: '.comment__arrow.comment__arrow--next',
            prevEl: '.comment__arrow.comment__arrow--prev',
        }
    });
}

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
            myPlacemark = new ymaps.Placemark(myMap.getCenter(), {
                // hintContent: 'Собственный значок метки',
                // balloonContent: 'Это красивая метка'

            }, {
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
        myMap.behaviors.disable('drag');

        var position = myMap.getGlobalPixelCenter();
        myMap.setGlobalPixelCenter([position[0] + 200, position[1]]);
    }
}



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
                tabContent[i],
                {
                    autoAlpha: 1,
                    display: 'bloc',
                    xPercent: 0,
                },
                {
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
                tabContent[b],
                {
                    autoAlpha: 0,
                    display: 'none',
                    xPercent: +100,
                },
                {
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








