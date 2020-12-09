jQuery.fn.exists = function () {
  return $(this).length;
};

gsap.registerPlugin(ScrollTrigger);
let timeline = gsap.timeline();
let timelineNav = new TimelineMax();
let status = 0;
const projectFunc = {
  objAd: function (element, place) {
    if ($(element).exists()) {
      $(element).each(function (index) {
        let outEl = this;
        $(place).append(outEl);
      });
    }
  },
  showNav: function () {
    if ($('.header__menu--tablet').exists()) {
      timelineNav.to('.header__menu--tablet', {
        x: 0,
        autoAlpha: 1
      }).fromTo('.header__item', {
        autoAlpha: 0,
        y: -20
      }, {
        y: 0,
        autoAlpha: 1,
        stagger: 0.3,
        ease: "power1.out"
      });
    }
  },
  removeNotice: function (parent, element) {
    setTimeout(function () {
      gsap.to(element, {
        autoAlpha: 0,
        height: 0,
        duration: 1,
        onComplete: function () {
          parent.removeChild(element);
        }
      });
    }, 1000);
  },
  showNotice: function () {
    let parentEl = document.querySelector('.notice__container');
    let element = document.createElement('div');
    let numBloc = document.createElement('div');
    let textBloc = document.createElement('div');
    setTimeout(function () {
      element.classList.add('notice__bloc');
      numBloc.classList.add('notice__qty');
      textBloc.classList.add('notice__text');
      numBloc.textContent = '+1';
      textBloc.textContent = "Комбо-набор 3";
      element.appendChild(numBloc);
      element.appendChild(textBloc);
      parentEl.appendChild(element);
      timeline.to(element, {
        y: 0,
        autoAlpha: 1,
        duration: 1
      });
    });
    setTimeout(function () {
      timeline.to(element, {
        autoAlpha: 0,
        duration: 1,
        y: -35,
        onComplete: projectFunc.removeNotice(parentEl, element)
      });
    }, 2000);
  },
  addCart: function () {
    projectFunc.showNotice();
    console.log('Товар добавлен!');
  },
  removeCart: function () {
    console.log('Товар удалён!');
  },
  hideNav: function () {
    if ($('.header__menu--tablet').exists()) {
      gsap.set('.header__item', {
        autoAlpha: 0
      });
      gsap.to('.header__menu--tablet', {
        x: 100,
        autoAlpha: 0,
        duration: 0.8,
        ease: 'power2.out'
      });
      timelineNav.clear();
    }
  },
  objReturn: function (element, place) {
    if ($(element).exists()) {
      var t = '';
      t = $(element).html();
      return $(element);
    }
  },
  showCard: function (parent, element) {
    let card = $(parent).find('.popup-card');
    let popupEl = '';
    $(card).each(function (popup) {
      if (popup == element) {
        popupEl = $(this);
      }
    });
    timeline.fromTo('.overlay-card', {
      autoAlpha: 0
    }, {
      autoAlpha: 1,
      duration: 0.3,
      ease: 'power2.out'
    }, '+=0.3').to(popupEl, {
      scale: 1,
      autoAlpha: 1,
      duration: 0.8,
      ease: 'power2.out'
    });
  },
  hideCard: function () {
    timeline.clear();
    gsap.to('.popup-card', {
      autoAlpha: 0,
      duration: 0.2,
      ease: 'power2.out'
    });
    gsap.to('.overlay-card', {
      autoAlpha: 0,
      delay: 0.2
    });
  },
  hideBasket: function () {
    timeline.clear();
    gsap.set(['.popup-basket .btn', '.popup-basket__icon', '.popup-basket__title', '.popup-basket__item', '.popup-basket__text', '.popup-basket__sum', '.popup-basket__hide'], {
      autoAlpha: 0
    });
    gsap.set(['.popup-basket__icon', '.popup-basket__title'], {
      scale: 0
    });
    gsap.set('.popup-basket__item', {
      autoAlpha: 0,
      y: -20
    });
    gsap.set('.popup-basket__text', {
      autoAlpha: 0,
      xPercent: -20
    });
    gsap.set('.popup-basket__sum', {
      autoAlpha: 0,
      xPercent: 20
    });
    gsap.set('.popup-basket__hide', {
      autoAlpha: 0
    });
    gsap.to('.popup-basket', {
      xPercent: 120,
      duration: 0.5,
      ease: "power2.out"
    });
    gsap.to('.overlay-basket', {
      autoAlpha: 0
    });
    $('html').removeClass('locked');
    document.body.style.overflow = 'auto'; // parallaxBildboard.enable();
  },
  showBasket: function () {
    timeline.fromTo('.overlay-basket', {
      autoAlpha: 0
    }, {
      autoAlpha: 1,
      duration: 0.3,
      ease: 'power2.out'
    }, '+=0.3').fromTo('.popup-basket', {
      xPercent: 120,
      autoAlpha: 1
    }, {
      xPercent: 0,
      duration: 0.6,
      ease: "power2.out"
    }).to('.popup-basket__hide', {
      autoAlpha: 1
    }).to(['.popup-basket__icon', '.popup-basket__title'], {
      scale: 1,
      ease: "power2.out",
      stagger: 0.4,
      autoAlpha: 1
    }).to('.popup-basket__item', {
      autoAlpha: 1,
      y: 0,
      stagger: 0.3,
      // duration: 0.3,
      ease: "power2.out"
    }).to(['.popup-basket__sum', '.popup-basket__text'], {
      autoAlpha: 1,
      xPercent: 0
    }).to('.popup-basket .btn', {
      autoAlpha: 1,
      duration: 0.3
    });
    $('html').addClass('locked');
    document.body.style.overflow = 'hidden';
  }
};
$(document).ready(function () {
  if ($('.advice__slider').exists()) {
    try {
      let adviceSlider = new Swiper('.advice__slider', {
        slidesPerView: 3,
        spaceBetween: 40,
        // touchRatio: false,
        pagination: {
          el: '.advice__slider .pagination',
          clickable: true
        },
        speed: 400,
        navigation: {
          nextEl: '.advice__slider .arr--next',
          prevEl: '.advice__slider .arr--prev'
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

  function showMenu(element, heightEl) {
    gsap.to(element, {
      autoAlpha: 1,
      height: heightEl + 20,
      ease: "power1.out",
      duration: 0.5
    });
    gsap.to('.menu__btn i', {
      scaleY: -1,
      duration: 0.5
    });
  }

  function hideMenu(element) {
    const timeline = gsap.timeline();
    gsap.to(element, {
      autoAlpha: 0,
      height: 0,
      ease: "power1.out",
      duration: 0.5
    });
    gsap.to('.menu__btn i', {
      scaleX: 1,
      scaleY: 1,
      ease: "power1.out",
      duration: 0.5
    });
  }

  function setHeight(elem) {
    if ($(elem).exists()) {
      if ($(elem).hasClass('menu__item')) {
        try {
          let heightSet = 0;
          $(elem).each(function () {
            heightSet += $(this).outerHeight();
          });

          if ($(this).width() > 600 && $(this).width() <= 900) {
            heightSet = heightSet / 2;
          } else if ($(this).width() <= 600) {
            heightSet = heightSet - 20;
          } else {
            heightSet = heightSet - 20;
          }

          return heightSet;
        } catch (err) {
          console.log(err);
        }
      } else if ($(elem).hasClass('header__in')) {
        try {
          let heightSet = 0;
          $(elem).each(function () {
            heightSet += $(this).outerHeight();
          });
          return heightSet;
        } catch (err) {
          console.log(err);
        }
      }
    }
  }

  if ($('#gallery').exists()) {
    $('#gallery').lightGallery();
  }

  if ($('.header__item').exists()) {
    $('.header__item').each(function () {
      $(this).hover(function () {
        $(this).css({
          'color': '#FF9F1C',
          'transition': '1s ease'
        });
      }, function () {
        $(this).css("color", "#2F2C2C");
      });
    });
  }

  if ($('.burger').exists()) {
    $('.burger').on('click', function () {
      $(this).toggleClass('burger--active');

      if ($('.burger').hasClass('burger--active')) {
        projectFunc.showNav();
      } else {
        projectFunc.hideNav();
        hideMenu('.header__list');
        $('.js-list').removeClass('mf-show');
      }
    });
  }

  if ($('.js-list').exists()) {
    $('.js-list').on('click', function () {
      $(this).toggleClass('mf-show');

      if ($(this).hasClass('mf-show')) {
        let heightEl = setHeight('.header__in');
        showMenu('.header__list', heightEl - 20);
      } else {
        hideMenu('.header__list');
      }
    });
  }

  if ($('.gallery__grid').exists()) {
    let parallaxT = new TimelineMax({
      scrollTrigger: {
        trigger: '#gallery',
        start: 'top-=40%',
        end: 'bottom-=20% center',
        scrub: true
      }
    });
    gsap.set('.gallery__item', {
      x: -30,
      autoAlpha: 0
    });
    parallaxT.to('.gallery__item', {
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
        delay: 5000
      },
      pagination: {
        el: '.swiper-pagination',
        type: 'progressbar'
      },
      navigation: {
        nextEl: '.swiper-button-next',
        prevEl: '.swiper-button-prev'
      },
      breakpoints: {
        320: {
          slidesPerView: 3,
          spaceBetween: 15
        },
        501: {
          slidesPerView: 3.4,
          spaceBetween: 15
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
        let target = event.target; //  let dataItem = $(this).children('.popup-card').data("item");
        // let inputEl = $(this).children('.popup-card').find('input');
        //console.log($(inputEl).val());
        // dataItem.val = $(inputEl).val();
        // window.storage.addItem(temp, dataItem);

        if (!target.classList.contains('btn') && !target.classList.contains('quantity')) {
          // projectFunc.showCard(parent, index);
          projectFunc.showCard('.set__items', index);
        }
      });
    });
  }

  if ($('.menu__btn').exists()) {
    try {
      $('.menu__btn').on('click', function () {
        $(this).toggleClass('mf-show');

        if ($(this).hasClass('mf-show')) {
          let heightEl = setHeight('.menu__item');
          showMenu('.menu__cover', heightEl);
        } else {
          hideMenu('.menu__cover');
        }
      });
    } catch (err) {
      console.log(err);
    }
  }

  if ($('.menu').exists()) {
    $(window).on('resize load', function () {
      let heightEl = setHeight('.menu__item');
      showMenu('.menu__cover', heightEl);
    });
  }

  if ($('.js-basket').exists()) {
    try {
      const basketBtn = document.querySelector('.js-basket');
      projectFunc.hideBasket();
      basketBtn.addEventListener('mouseenter', function () {
        if (!status) {
          if ($('.header__inner').hasClass('mf-scroll')) {
            $('.header__inner').addClass('locked');
          }

          if ($('.overlay-basket').exists()) {
            projectFunc.showBasket();
            status = 1;
          }
        }
      });
    } catch (err) {
      console.log(err);
    }
  }

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
    timeline.fromTo('.overlay-basket', {
      autoAlpha: 0
    }, {
      autoAlpha: 1,
      duration: 0.3,
      ease: 'power2.out'
    }, '+=0.3').fromTo('.popup-basket', {
      xPercent: 120,
      autoAlpha: 1
    }, {
      xPercent: 0,
      duration: 0.6,
      ease: "power2.out"
    }).to('.popup-basket__hide', {
      autoAlpha: 1
    }).to(['.popup-basket__icon', '.popup-basket__title'], {
      scale: 1,
      ease: "power2.out",
      stagger: 0.4,
      autoAlpha: 1
    }).to('.popup-basket__item', {
      autoAlpha: 1,
      y: 0,
      stagger: 0.3,
      // duration: 0.3,
      ease: "power2.out"
    }).to(['.popup-basket__sum', '.popup-basket__text'], {
      autoAlpha: 1,
      xPercent: 0
    }).to('.popup-basket .btn', {
      autoAlpha: 1,
      duration: 0.3
    });
    $('html').addClass('locked');
    document.body.style.overflow = 'hidden';
  }

  if ($('.overlay-basket').exists()) {
    try {
      $('.overlay-basket').click(function (e) {
        if (e.target.className.indexOf('overlay-basket') != -1) {
          projectFunc.hideBasket();
          $('html').css('overflow', 'auto');
          status = 0;
        }
      });
    } catch (error) {
      console.log(error);
    }
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
      status = 0;
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

  if ($('.popup-basket__items').exists()) {
    $('.popup-basket__items').mCustomScrollbar({
      theme: 'minimal-dark'
    });
  }

  var getScrollbarWidth = function () {
    let div,
        width = getScrollbarWidth.width;

    if (width === undefined) {
      div = document.createElement('div');
      div.innerHTML = '<div style="width:50px;height:50px;position:absolute;left:-50px;top:-50px;overflow:auto;"><div style="width:1px;height:100px;"></div></div>';
      div = div.firstChild;
      document.body.appendChild(div);
      width = getScrollbarWidth.width = div.offsetWidth - div.clientWidth;
      document.body.removeChild(div);
    }

    return width;
  };

  $(window).on('resize load', function () {
    let locked = document.querySelector('html');
    locked.style.setProperty('--wScroll', getScrollbarWidth() + 'px');
  }); //===========Truncate text=============

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
  } //truncateText('.set__content', 60);


  truncateText('.offer__txt', 100);
  $(window).on('resize load', function () {
    if ($(this).width() <= 600) {
      truncateText('.set__content', 50);
    } else {
      truncateText('.set__content', 300);
    }
  });

  if ($('.offer__slider').exists()) {
    try {
      const breakpoint = window.matchMedia('(min-width:601px)');
      let mySwiper;

      const breakpointChecker = function () {
        // if larger viewport and multi-row layout needed
        if (breakpoint.matches === true) {
          // clean up old instances and inline styles when available
          if (mySwiper !== undefined) mySwiper.destroy(true, true); // or/and do nothing

          return; // else if a small viewport and single column layout needed
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
            clickable: true
          },
          speed: 400
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
    gsap.set($('.dish__box').find('.dish__image'), {
      scale: 0,
      opacity: 0
    });
    gsap.set($('.dish__box:first-child').find('.dish__image'), {
      scale: 1,
      opacity: 1
    });
    gsap.set([$('.dish__article'), $('.dish__weight')], {
      y: -30,
      opacity: 0
    });
    gsap.set([$('.dish__article')[0], $('.dish__weight')[0]], {
      y: 0,
      opacity: 1
    });
    gsap.set($('.dish__text--word'), {
      y: -30,
      opacity: 0
    });
    gsap.set($('.dish__text--word')[0], {
      y: 0,
      opacity: 1
    });
    gsap.set($('.dish__price'), {
      x: -30,
      opacity: 0
    });
    gsap.set($('.dish__price')[0], {
      x: 0,
      opacity: 1
    });
    gsap.set($('.dish__box .btn--small'), {
      x: 30,
      opacity: 0
    });
    gsap.set($('.dish__box .btn--small')[0], {
      x: 0,
      opacity: 1
    });
    let dishSlider = new Swiper('.dish-slider', {
      slidesPerView: 1,
      effect: 'fade',
      // loop: true,
      fadeEffect: {
        crossFade: true
      },
      speed: 400,
      navigation: {
        nextEl: '.dish .arr--next',
        prevEl: '.dish .arr--prev'
      },
      pagination: {
        el: '.dish__pagination',
        clickable: true
      },
      on: {
        slideChangeTransitionEnd: function () {
          let timeline = gsap.timeline(); // console.log($('.dish__image')[this.activeIndex]);

          let actIndex = this.activeIndex;
          $('.dish__box').each(function (index) {
            if (index != actIndex) {
              gsap.set($('.dish__image')[index], {
                scale: 0,
                opacity: 0
              });
              gsap.set($('.dish__text--word')[index], {
                y: -30,
                opacity: 0
              });
              gsap.set([$('.dish__article')[index], $('.dish__weight')[index]], {
                y: -30,
                opacity: 0
              });
              gsap.set($('.dish__price')[index], {
                x: -30,
                opacity: 0
              });
              gsap.set($('.dish__info .btn--small')[index], {
                x: 30,
                opacity: 0
              });
            } else {
              let timeline = gsap.timeline();
              timeline.to($('.dish__image')[index], {
                scale: 1,
                opacity: 1,
                duration: 1
              }).to($('.dish__article')[index], {
                opacity: 1,
                y: 0,
                duration: 0.3
              }).to($('.dish__weight')[index], {
                opacity: 1,
                y: 0,
                duration: 0.3
              }, '=0').to($('.dish__text--word')[index], {
                opacity: 1,
                y: 0,
                duration: 0.3
              }).to($('.dish__price')[index], {
                opacity: 1,
                x: 0,
                duration: 0.3
              }).to($('.dish__info .btn--small')[index], {
                x: 0,
                opacity: 1,
                duration: 0.3
              }, '-=0.6');
            }
          });
        }
      }
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
        clickable: true
      }
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
  } //.advice__slider


  if ($('.comment__slider').exists()) {
    let commentSlider = new Swiper('.comment__slider', {
      slidesPerView: 2,
      spaceBetween: 40,
      loop: true,
      // touchRatio: false,
      pagination: {
        el: '.comment .pagination',
        clickable: true
      },
      speed: 400,
      navigation: {
        nextEl: '.comment .arr--next',
        prevEl: '.comment .arr--prev'
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
        myMap.behaviors.disable('scrollZoom'); //myMap.behaviors.disable('drag');

        var position = myMap.getGlobalPixelCenter();
        myMap.setGlobalPixelCenter([position[0] + 400, position[1]]);

        if ($(this).width() > 880 && $(this).width() <= 1024) {
          myMap.setGlobalPixelCenter([position[0] + 300, position[1]]);
          myMap.container.fitToViewport();
        } else if ($(this).width() > 768 && $(this).width() <= 880) {
          myMap.setGlobalPixelCenter([position[0] + 200, position[1] - 200]);
          myMap.container.fitToViewport();
        } else if ($(this).width() > 600 && $(this).width() <= 768) {
          myMap.setGlobalPixelCenter([position[0] + 200, position[1] - 200]);
          myMap.container.fitToViewport();
        } else if ($(this).width() > 500 && $(this).width() <= 600) {
          myMap.setGlobalPixelCenter([position[0] + 230, position[1] - 200]);
          myMap.container.fitToViewport();
        } else if ($(this).width() > 400 && $(this).width() <= 500) {
          myMap.setGlobalPixelCenter([position[0] + 290, position[1] - 250]);
          myMap.container.fitToViewport();
        } else if ($(this).width() > 319 && $(this).width() <= 400) {
          myMap.setGlobalPixelCenter([position[0] + 380, position[1] - 250]);
          myMap.container.fitToViewport();
        } // else if ($(this).width() <= 600) {
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
          display: 'none'
        });
      }
    }

    function hideTabContent(a) {
      for (let i = a; i < tabContent.length; i++) {
        tabContent[i].classList.remove('show');
        tabContent[i].classList.add('hide');
        tab[i].classList.remove('tab__info--active');

        if ($(window).width() >= 881) {
          timeline.fromTo(tabContent[i], {
            autoAlpha: 1,
            display: 'bloc',
            xPercent: 0
          }, {
            autoAlpha: 0,
            display: 'none',
            ease: 'power2.out',
            xPercent: +100
          });
        } else {
          timeline.fromTo(tabContent[i], {
            autoAlpha: 1,
            display: 'bloc'
          }, {
            autoAlpha: 0,
            display: 'none',
            ease: 'power2.out'
          });
        }
      }
    }

    hideTabContent(1);

    function showTabContent(b) {
      if (tabContent[b].classList.contains('hide')) {
        tabContent[b].classList.remove('hide');
        tabContent[b].classList.add('show');
        tab[b].classList.add('tab__info--active');

        if ($(window).width() >= 881) {
          console.log('201');
          timeline.fromTo(tabContent[b], {
            autoAlpha: 0,
            display: 'none',
            xPercent: +100
          }, {
            autoAlpha: 1,
            display: 'block',
            xPercent: 0,
            duration: 1,
            ease: "back"
          });
        } else {
          timeline.fromTo(tabContent[b], {
            autoAlpha: 0,
            display: 'none'
          }, {
            autoAlpha: 1,
            display: 'block',
            duration: 1,
            ease: "back"
          });
        }
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

  if ($('.about-service__item').exists()) {
    $('.about-service__item').each(function () {
      $(this).on('click', function () {
        var el = $(this);
        var dest = el.attr('href'); // получаем направление

        if (dest !== undefined && dest !== '') {
          // проверяем существование
          $('html').animate({
            scrollTop: $(dest).offset().top // прокручиваем страницу к требуемому элементу

          }, 500 // скорость прокрутки
          );
        }

        return false;
      });
    });
  }

  if ($('.header__link').exists()) {
    $('.header__link').each(function () {
      $(this).on('click', function () {
        let el = $(this);
        let dest = el.attr('href');

        if (dest !== undefined && dest !== '') {
          $('html').animate({
            scrollTop: $(dest).offset().top
          }, 1000);
        }

        return false;
      });
    });
  }

  if ($('.about-service__item').exists()) {
    try {
      $('.about-service__item').each(function () {
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
        });
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
    });
  }

  if ($('.js-bcg-parallax').exists()) {
    try {
      var parallaxTL = new TimelineMax({
        scrollTrigger: {
          trigger: '.js-bcg-parallax',
          start: 'top bottom',
          end: 'bottom-=130%',
          scrub: true
        }
      });
      parallaxTL.set('.js-bcg', {
        y: '-220'
      }).set('.js-content-wrapper', {
        autoAlpha: 0
      }).set('.about-advantage__item', {
        autoAlpha: 0,
        x: '-30'
      }).to('.js-bcg', 35, {
        y: 0
      }).to('.js-content-wrapper', 8, {
        autoAlpha: 1
      }).to('.about-advantage__item', 8, {
        x: 0,
        autoAlpha: 1,
        stagger: 5
      }); // .from('.js-content-wrapper', {
      //     delay: 15,
      //     autoAlpha: 0,
      // })

      ; // .from(
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

  if ($('.popup-card').exists()) {
    //
    $('.popup-card').on('click', function (event) {
      event.stopPropagation();
    });
  }

  function showCalcBtn(element, btnHide) {
    gsap.to(element, {
      autoAlpha: 0,
      duration: 0.2,
      display: 'none'
    });
    gsap.to(btnHide, {
      autoAlpha: 1,
      duration: 0.2,
      display: 'flex',
      delay: 0.2
    });
  }

  function hideCalcBtn(element, btnHide) {
    gsap.to(btnHide, {
      autoAlpha: 0,
      duration: 0.2,
      display: 'none'
    });
    gsap.to(element, {
      autoAlpha: 1,
      duration: 0.2,
      display: 'block',
      delay: 0.2
    });
  }

  function createSource(elem) {
    //возвращает родительский элемент с кнопкой сётчика
    let parent = '';
    let popupCard = '';
    parent = elem.parent();

    while (!$(parent).children('.popup-card').length) {
      parent = $(parent).parent();
    }

    popupCard = $(parent).children('.popup-card').find('.btn-special'); //  console.log(parent);

    return parent;
  }

  if ($('.js-calc').exists()) {
    let qBtn = '';
    $('.js-calc').each(function (index, element) {
      $(this).on('click', function () {
        let inputEl = $(this).next().find('input');
        let parentBtn = createSource($(this));
        let calcBtn = $(this).next();
        let temp = index / 2;
        let dataItem = $(parentBtn).children('.popup-card').data("item");
        dataItem.val = $(inputEl).val();
        window.storage.addItem(temp, dataItem);

        if (+$(inputEl).val() == 0) {
          // qtyVal = +$(inputEl).val() + 1;
          // $(inputEl).val(qtyVal);
          // $(inputEl).attr('value', qtyVal);
          plusCalc(calcBtn, temp);
        }

        projectFunc.addCart();
        qBtn = $(this).next();
        showCalcBtn($(this), qBtn);

        if ($(this).parent().hasClass("btn-special")) {
          parentBtn = createSource($(this));
          jsBtn = $(parentBtn).find('.js-calc');
          qtyBtn = $(parentBtn).find('.quantity');
          showCalcBtn(jsBtn, qtyBtn); //Отображаем счётчик в popup
        }
      });
    });
  }

  if ($('.quantity').exists()) {
    $('.quantity').each(function (index) {
      let btnPlus = $(this).find('.plus');
      let btnMinus = $(this).find('.minus');
      let calcBtn = $(this);
      $(this).on('click', function (event) {
        event.stopPropagation();
      });
      $(btnPlus).on('click', function () {
        plusCalc(calcBtn, index / 2);
      });
      $(btnMinus).on('click', function () {
        minusCalc(calcBtn, index / 2);
      });
    });
  } // function bindVal(element) { //.quantity
  //     if ($(element).parent().hasClass("btn-special")) {
  //         let parentBtn = createSource($(element));
  //         let qtyBtn = $(parentBtn).find('.quantity');
  //         if ($(parentBtn).find('input').length > 0) {
  //             let temp = $(parentBtn).find('input');
  //             let trigger = 0;
  //             for (let i = 0; i < temp.length; i++) {
  //                 $(temp[i]).val($(element).find('input').val());
  //                 $(temp[i]).attr('value', $(element).find('input').val());
  //                 if (temp[i].value == 0) {
  //                     trigger = 1;
  //                 } else {
  //                     trigger = 0;
  //                 }
  //             }
  //             if (trigger) {
  //                 if ($(parentBtn).find('.js-calc').exists()) {
  //                     let calcBtn = $(parentBtn).find('.js-calc');
  //                     for (let i = 0; i < calcBtn.length; i++) {
  //                         hideCalcBtn(calcBtn[i], qtyBtn[i]);
  //                     }
  //                 }
  //             }
  //         }
  //     }
  // }


  function minusCalc(element, index) {
    let btnBasic = $(element).siblings('.js-calc');
    let inputEl = $(element).find('input');
    let minVal = inputEl.data('min');
    let inputVal = +$(inputEl).val();
    let qtyVal = +inputEl.data('min');
    projectFunc.removeCart();

    if (inputVal >= minVal) {
      qtyVal = inputVal - 1;
      $(inputEl).val(qtyVal);
      $(inputEl).attr('value', qtyVal);
      window.storage.updateItem(index, $(inputEl).val()); //  bindVal(element);
    }
  }

  function plusCalc(element, index) {
    let inputEl = $(element).find('input');
    let maxVal = inputEl.data('max');
    let inputVal = +$(inputEl).val();
    let qtyVal = +inputEl.data('min');
    console.log(index);

    if (inputVal < maxVal) {
      qtyVal = inputVal + 1;
      $(inputEl).val(qtyVal);
      $(inputEl).attr('value', qtyVal);
      window.storage.updateItem(index, $(inputEl).val());
      projectFunc.addCart(); //    bindVal(element);
    }
  } // if ($('.dish__article').exists()) {
  //     $('.dish__article').each(function (index) {
  //         $(this).on('click', function (event) {
  //             // let parent = createSource($(this));
  //             // console.log(parent);
  //             projectFunc.showCard('.dish__box', index);
  //         });
  //     })
  // }

});

(function () {
  let stateChanged = new Event('StateChanged');
  let state = {};
  window.storage = new class {
    addItem(id, data) {
      let setItem = {};
      setItem['val'] = data.val;
      state[id] = setItem;
      window.dispatchEvent(stateChanged);
    }

    updateItem(id, data) {
      state[id].val = data; //console.log(state);

      window.dispatchEvent(stateChanged);
    }

    showItem() {
      window.dispatchEvent(stateChanged);
    }

    get items() {
      return state;
    }

  }();
})();