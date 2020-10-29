jQuery.fn.exists = function () {
    return $(this).length;
}

const projectFunc = {
    // ObjAd: function () {
    // }
}

let scene = document.getElementById('scene');
let parallaxBildboard = new Parallax(scene, {
    hoverOnly: true,
    relativeInput: true
});

let scene_comment = document.getElementById('scene_comment');

let parallaxComment = new Parallax(scene_comment, {
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

console.log(tabsContent);

for (let i = 0; i < tabsInfo.length; i++) {
    tabsInfo[i].onclick = function () {
        for (let j = 0; j < tabsContent.length; j++) {
            if (j == i) {
                console.log('Tabs');
            }
        }
    }
}







