const iconMenu = document.querySelector('.header__icon')
const menuBody = document.querySelector('.header__menu')
const phone = document.querySelector('.phone-mobile')
if (iconMenu) {
  iconMenu.addEventListener('click', function (e) {
    document.body.classList.toggle('_lock')
    phone.classList.toggle('_hidden')
    iconMenu.classList.toggle('_active')
    menuBody.classList.toggle('_active')
  })
};

const menuLinks = document.querySelectorAll('.scroll[data-goto]')
if (menuLinks.length > 0) {
  menuLinks.forEach((el) => {
    el.addEventListener('click', onMenuLinkClick)
  })

  function onMenuLinkClick(e) {
    const menuLink = e.target
    if (menuLink.dataset.goto && document.querySelector(menuLink.dataset.goto)) {
      const gotoBlock = document.querySelector(menuLink.dataset.goto)
      const gotoBlockValue =
        gotoBlock.getBoundingClientRect().top

      if (iconMenu.classList.contains('_active')) {
        document.body.classList.remove('_lock')
        phone.classList.remove('_hidden')
        iconMenu.classList.remove('_active')
        menuBody.classList.remove('_active')
      }

      window.scrollTo({
        top: gotoBlockValue,
        duration: 2000,
        behavior: 'smooth',
      })
      e.preventDefault()
    }
  }
}

var swiper = new Swiper(".swiper-container", {
  slidesPerView: "auto",
  freeMode: true,
  slideToClickedSlide: true,
  spaceBetween: 40,
  scrollbar: {
    el: ".swiper-scrollbar",
    draggable: true,
    dragSize: 260
  },
  mousewheel: true,
  navigation: {
    nextEl: ".swiper__arrow--next",
    prevEl: ".swiper__arrow--prev"
  },
  breakpoints: {
    // when window width is >= 320px
    320: {
      spaceBetween: 20,
      scrollbar: {
        dragSize: 140
      }
    },
    // when window width is >= 712px
    712: {
      spaceBetween: 40,
      scrollbar: {
        dragSize: 260
      }
    }
  }
});

// inputmask
const form = document.querySelector('.form');
const telSelector = form.querySelector('input[type="tel"]');
const inputMask = new Inputmask('+7 (999) 999-99-99');
inputMask.mask(telSelector);

// validate forms
const validation = new JustValidate('.form', {
  errorLabelStyle: {
    color: 'white'
  },
});


validation
  .addField('.input-name', [
    {
      rule: 'minLength',
      value: 3,
      errorMessage: 'Введите корректное имя',
    },
    {
      rule: 'maxLength',
      value: 30,
      errorMessage: 'Введите корректное имя',
    },
    {
      rule: 'required',
      value: true,
      errorMessage: 'Введите имя!',
    }
  ])
  .addField('.input-mail', [
    {
      rule: 'required',
      value: true,
      errorMessage: 'Email обязателен',
    },
    {
      rule: 'email',
      value: true,
      errorMessage: 'Введите корректный Email',
    },
  ])
  .addField('.input-tel', [
    {
      rule: 'required',
      value: true,
      errorMessage: 'Телефон обязателен',
    },
    {
      rule: 'function',
      validator: function () {
        const phone = telSelector.inputmask.unmaskedvalue();
        return phone.length === 10;
      },
      errorMessage: 'Введите корректный телефон',
    },

  ]).onSuccess((event) => {
    console.log('Validation passes and form submitted', event);

    let formData = new FormData(event.target);

    console.log(...formData);

    let xhr = new XMLHttpRequest();

    xhr.onreadystatechange = function () {
      if (xhr.readyState === 4) {
        if (xhr.status === 200) {
          console.log('Отправлено');
        }
      }
    }

    xhr.open('POST', 'mail.php', true);
    xhr.send(formData);

    event.target.reset();
  });

