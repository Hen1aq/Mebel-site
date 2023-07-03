$(function () {
    
    $('.header__btn').on('click', function () {
        $('.rightside-menu').removeClass('rightside-menu--close');
    });
    $('.rightside-menu__close').on('click', function () {
        $('.rightside-menu').addClass('rightside-menu--close');
    });


    $('.header__btn-menu').on('click', function () {
      $('.menu').toggleClass('menu--open')
  });

  if($(window).width() < 651){
    $('.works-path__item--measuring').appendTo($('.works-path__items-box'));
  }

    $('.top__slider').slick({
        dots: true,
        arrows: false,
        fade: true,
        autoplay: true,
        autoplaySpeed: 5000,
    });

    $('.contact-slider').slick({
      slidesToShow: 10,
      slidesToScroll: 10,
      dots: true,
      arrows: false,
      responsive: [
        {
          breakpoint: 1700,
          settings: {
            slidesToShow: 8,
            slidesToScroll: 8,
          }
        },
        {
          breakpoint: 1511,
          settings: {
            slidesToShow: 6,
            slidesToScroll: 6,
          }
        },
        {
          breakpoint: 1200,
          settings: {
            slidesToShow: 4,
            slidesToScroll: 4,
          }
        },
        {
          breakpoint: 841,
          settings: {
            slidesToShow: 3,
            slidesToScroll: 3,
          }
        },
        {
          breakpoint: 551,
          settings: {
            slidesToShow: 2,
            slidesToScroll: 2,
          }
        },
        {
          breakpoint: 378,
          settings: {
            slidesToShow: 1,
            slidesToScroll: 1,
          }
        },
      ]
  });

  $('.article-slider__box').slick({
    prevArrow: '<button type="button" class="article-slider__arrow article-slider__arrowleft"><img src="images/arrow-slider-left.svg" alt=""></button>',
    nextArrow: '<button type="button" class="article-slider__arrow article-slider__arrowright"><img src="images/arrow-slider-right.svg" alt=""></button>',
    
});


    var mixer = mixitup('.gallery__inner', {
        load: {
            filter: '.living'
        }
    });

})


async function pageUpdate(event) {
  
  // Если функция вызвана без аргументов:
  
  if (typeof event == 'undefined') {
    
    // Устанавливаем обработчики
    // на все ссылки на странице:
    
    $('body a[href]').click(pageUpdate);
    
  }
  
  // Если функция вызвана
  // в результате клика
  // по ссылке:
  
  else {
    
    // Берём адрес с нажатой ссылки
    // и записываем в переменную link:
    
    var link = event.target.href;
    
    // Если ссылка ведет на наш сайт:
    
    if (new URL(link)['host'] == location.host) {
      
      // Предотвращаем переход:
      
      event.preventDefault();
      
      // Блокируем страницу, чтобы
      // больше нельзя было кликать:
      $('body').css('pointer-events', 'none');
      
      // Активируем анимацию исчезновения (полупрозрачности):
      
      var hide = $('body').animate({ opacity: 0.2 }, 500).promise();
      
      var ajax = $.ajax(link); // Запускаем загрузку новой страницы
      
      await hide; // Ждем окончания анимации исчезновения
      
      // Вставляем данные на страницу беря их с ново-скачанной страницы:
      
      var doc = new DOMParser().parseFromString((await ajax), 'text/html');
      var html = $('body', doc).html();
      $('body').html(html);
      
      // Скролим в самый вверх:
      $('body, html').animate({scrollTop: 0}, 0);
      
      // Меняем адрес в адресной строке:
      history.pushState(null, null, link);
      
      // Заново ставим
      // обработчики:
      
      pageUpdate();
      
      // Активируем анимацию
      // постепенного появления:
      
      await $('body').animate({ opacity: 1 }, 500).promise();
      
      // Снимаем блокировку с документа:
      
      $('body').css('pointer-events', '');
      
    }
    
  }
  
}

pageUpdate();


  
