var cardHeight = 0;
var nameInput = $('input[name="name"]');
var lNameInput = $('input[name="l_name"]');
var emailInput = $('input[name="email"]');
var localNameInput = localStorage.getItem('name');
var localLNameInput = localStorage.getItem('lName');
var localEmailInput = localStorage.getItem('email');
var productPrice = $('#price-value').text();
var totalPrice = productPrice;
var saleValue = $('#sale-value').text();
var productCount = 4;
var payerEmail = '';
var payerName = '';
var payerLName = '';

$(document).ready(function () {

  $('.js-number-card').on('input', function () {
    if (this.value.length >= this.maxLength) {
      this.value = this.value.slice(0, this.maxLength);
    }
  });


  $('.js-number-cvv').on('input', function () {
    if (this.value.length >= this.maxLength) {
      this.value = this.value.slice(0, this.maxLength);
    }
  });


  $('.js-number-card').blur(function () {
    if (this.value.length < this.maxLength) {
      this.value = this.value.slice(0, this.maxLength);
      $(this).closest('.input-container').addClass('__error');
      setTimeout(function () {
        $('.js-number-card').closest('.input-container').removeClass('__error');
      }, 2000);
    }
  });


  $('.js-number-cvv').blur(function () {
    if (this.value.length < this.maxLength) {
      this.value = this.value.slice(0, this.maxLength);
      $(this).closest('.input-container').addClass('__error');
      setTimeout(function () {
        $('.js-number-cvv').closest('.input-container').removeClass('__error');
      }, 2000);
    }
  });

  $('[data-fancybox]').fancybox({
    buttons: [
      "zoom",
      "slideShow",
      "fullScreen",
      "thumbs",
      "close"
    ],
    transitionEffect: "slide",
    animationEffect: "zoom"
  });

  //buttons gradient theme//
  $('.__gradient-theme').mousemove(function (e) {
    var bg = $(this).attr("data-bg-color"),
      radial_gradient = $(this).attr("data-radial-gradient-color"),
      size = $(this).attr("data-size"),
      offset = $(this).offset(),
      X = e.pageX - offset.left,
      Y = e.pageY - offset.top;
    $(this).css(
      "background",
      "radial-gradient(circle at " +
      X +
      "px " +
      Y +
      "px, " +
      radial_gradient +
      ", " +
      bg +
      " " +
      size +
      ")"
    );
  });

  //toggle main menu
  $('.toggle-menu').on('click', function () {

    var btn = $(this);

    if (btn.hasClass('active')) {

      closeNavMenu();

    } else {

      openNavMenu();

    }

  });

  //close main menu
  $('.close-menu').on('click', function () {

    closeNavMenu();

  });

  //scroll down
  $('.follow-icon').on('click', function () {

    $('html, body').stop().animate({
      scrollTop: $('.testimonials-section').offset().top
    }, 600);

  });

  //detect successfully submit form
  // $('.newsletter-section form').on('submit', function (event) {
  //
  //     event.preventDefault();
  //
  //     if(!checkEmptyFields($(this))) {
  //
  //         $(this).closest('.newsletter-section').addClass('successfully');
  //         clearInputsValue();
  //
  //     }
  //
  // });
  // $('.assessment-from-wrap form, .subscribe-wrap form').on('submit', function (event) {
  //
  //     event.preventDefault();
  //
  //     if(!checkEmptyFields($(this))) {
  //
  //         $.fancybox.open({
  //             src  : '#thank-subscribing'
  //         });
  //         clearInputsValue();
  //
  //     }
  //
  // });
  // $('.__individual-theme form').on('submit', function (event) {
  //
  //     event.preventDefault();
  //
  //     if(!checkEmptyFields($(this))) {
  //
  //         $.fancybox.open({
  //             src  : '#thank-individual'
  //         });
  //         clearInputsValue();
  //         clearFormDataOnLocalStorage();
  //
  //     }
  //
  // });
  // $('.__corporate-theme form').on('submit', function (event) {
  //
  //     event.preventDefault();
  //
  //     if(!checkEmptyFields($(this))) {
  //
  //         $.fancybox.open({
  //             src  : '#thank-corporate'
  //         });
  //         clearInputsValue();
  //         clearFormDataOnLocalStorage();
  //
  //     }
  //
  // });

  $('.subscribing-form').on('submit', function (event) {

    event.preventDefault();

    var form = $(this);
    var btn = form.find('.btn-link');
    var formData = $(this).serialize();
    var locationUrl = window.location.origin;

    if (!checkEmptyFields(form)) {

      $.getJSON(locationUrl + '/wp-content/themes/genius/assets/mc-end-point.php', formData, function (data) {

        btn.addClass('__load-theme');

        if (data.status === 'subscribed') {
          $('.subscribing-form input').val('');
          $.fancybox.open({
            src: '#thank-subscribing'
          });
          btn.removeClass('__load-theme');
        } else {
          form.find('.input-container').append('<span class="input-message">' + data.detail + '</span>').addClass('__error');
          btn.removeClass('__load-theme');

          setTimeout(function () {

            form.find('.input-container').find('.input-message').remove();
            form.find('.input-container').removeClass('__error');
            $('.subscribing-form input').val('');

          }, 5000);
        }
      });

    }

  });

    $('#for-seminar-form').on('submit', function (event) {

        event.preventDefault();

        var form = $(this);
        var btn = form.find('.btn-link');
        var subscribeCheck = $('#connectedCheck');
        var formData = $(this).serialize();
        var locationUrl = window.location.origin;

        if(!checkEmptyFields(form) && form.attr('id') === 'for-seminar-form' && subscribeCheck.prop('checked') === true) {

            $.getJSON(locationUrl + '/wp-content/themes/genius/assets/seminar-end-point.php', formData, function (data) {

                btn.addClass('__load-theme');

                if (data.status === 'subscribed') {
                    $('#for-seminar-form input').val('');
                    $.fancybox.open({
                        src: '#thank-subscribing'
                    });
                    btn.removeClass('__load-theme');
                } else {
                    form.find('.input-container').append('<span class="input-message">' + data.detail + '</span>').addClass('__error');
                    btn.removeClass('__load-theme');

                    setTimeout(function () {

                        form.find('.input-container').find('.input-message').remove();
                        form.find('.input-container').removeClass('__error');

                    }, 5000);
                }
            });

            $.getJSON(locationUrl + '/wp-content/themes/genius/assets/mc-end-point.php', formData, function (data) {});

        } else {

            $.getJSON(locationUrl + '/wp-content/themes/genius/assets/seminar-end-point.php', formData, function (data) {

                btn.addClass('__load-theme');

                if (data.status === 'subscribed') {
                    $('#for-seminar-form input').val('');
                    $.fancybox.open({
                        src: '#thank-subscribing'
                    });
                    btn.removeClass('__load-theme');
                } else {
                    form.find('.input-container').append('<span class="input-message">' + data.detail + '</span>').addClass('__error');
                    btn.removeClass('__load-theme');

                    setTimeout(function () {

                        form.find('.input-container').find('.input-message').remove();
                        form.find('.input-container').removeClass('__error');

                    }, 5000);
                }
            });

        }

    });

  //close thank wrap
  $(document).on('click', '.close-thank-btn', function () {

    $('.newsletter-section.successfully').removeClass('successfully');
    $.fancybox.close();

  });

  // SET NAME INPUT DATA //
  $(nameInput).on('keyup', function () {
    setDataToLocalStorage('name', nameInput.val());
  });
  // SET EMAIL INPUT DATA //
  $(emailInput).on('keyup', function () {
    setDataToLocalStorage('email', emailInput.val());
  });
  $(lNameInput).on('keyup', function () {
     setDataToLocalStorage('lName', lNameInput.val());
  });

  // TOGGLE DELIVERY FORM //
  $(document).on('change', '#deliveryShip', function () {

      var input = $(this);
      var formDelivery = $('#delivery-form');

      if(input.prop('checked') === true) {

          formDelivery.slideDown();

      } else {

          formDelivery.slideUp();

      }

  });

  // CHANGE COUNT //
    //plus minus changing
    $(document).on('click', '.btn-count-control', function (e) {
        e.preventDefault();
        var countWrap = $(this).closest('.count-control-wrap');
        var countInput = countWrap.find('input');
        var step = parseInt(countInput.attr('data-step'));
        var maxValue = parseInt(countInput.attr('data-max'));
        var minValue = parseInt(countInput.attr('data-min'));
        var currentValue = parseInt(countInput.val());
        if($(this).hasClass('__plus')) {
            addValue(countWrap, step, maxValue, minValue, currentValue, countInput);
        } else {
            subtractValue(countWrap, step, maxValue, minValue, currentValue, countInput);
        }

        changeProductPrice();

    });

    // SUBMIT COUPONE //
    $('#get-coupone-form').on('submit', function (e) {
        e.preventDefault();
        var form = $(this);
        var coupone_code = $('[name="coupon"]').val();

        var data = {
            'action': 'get_coupones',
            'coupone_code': coupone_code,
        };

        if (!checkEmptyFields(form)) {

            $.ajax({
                url: person_save_entry_params.ajaxurl,
                data: data,
                type: 'POST',
                beforeSend: function () {
                    $('.save').val('Saving...');
                },
                success: function (data) {
                    if (parseInt(data) !== 0) {
                        saleValue = data;

                        productPrice = Math.round(productPrice - ((productPrice * saleValue) / 100));

                        $('#sale-value').html(saleValue);
                        $('#price-value').html(productPrice);
                        $('.sale-value').css('opacity', 1);

                        changeProductPrice();
                        $('#get-coupone-form .btn-link, #get-coupone-form .input-container').addClass('disabled');

                    } else {

                        var messageText = $('#get-coupone-form .input-message').text();
                        $('#get-coupone-form .input-container').addClass('__error');
                        $('#get-coupone-form .input-message').html('Your entered coupon is not relevant');

                        setTimeout(function () {

                            $('#get-coupone-form .input-container').removeClass('__error');
                            $('#get-coupone-form .input-message').html(messageText);

                        }, 3000);

                    }

                }
            });

        }

    });

   // SET PAYER NAME TO LOCALSTORAGE //
    $('input[name="payer-name"]').on('keyup', function () {

        payerName = $(this).val();
        savePayerDataToLocalhost();

        var form = $(this).closest('.billing-detail-wrap');

        if(!checkEmptyFields(form)) {

            $('.order-form').removeClass('disabled');

        } else {

            $('.order-form').addClass('disabled');

        }

    });

    // SET PAYER LAST NAME TO LOCALSTORAGE //
    $('input[name="payer-lname"]').on('keyup', function () {

        payerLName = $(this).val();
        savePayerDataToLocalhost();

        var form = $(this).closest('.billing-detail-wrap');

        if(!checkEmptyFields(form)) {

            $('.order-form').removeClass('disabled');

        } else {

            $('.order-form').addClass('disabled');

        }

    });

    // SET PAYER EMAIL TO LOCALSTORAGE //
    $('input[name="payer-email"]').on('keyup', function () {

        payerEmail = $(this).val();
        savePayerDataToLocalhost();

        var form = $(this).closest('.billing-detail-wrap');

        if(!checkEmptyFields(form)) {

            $('.order-form').removeClass('disabled');

        } else {

            $('.order-form').addClass('disabled');

        }

    });

    if($('#success-page')[0] && localStorage.getItem('payer')) {

        appendPayerDataToPage();

    } else if($('#success-page')[0] && !localStorage.getItem('payer')) {

        window.location.href = '/';

    }

    // START PRINT SUCCESS MESSAGE //
    $(document).on('click', '.message-action-btn.__print', function () {

        window.print();

    });

    // EXPORT HTML TO PDF //
    $(document).on('click', '.message-action-btn.__pdf', function () {

        var doc = new jsPDF();

        doc.setProperties({
            title: "Genius-Blueprint-Assessment-instruction"
        });

        var elementHTML = $('#success-page').html();
        var specialElementHandlers = {
            '#elementH': function (element, renderer) {
                return true;
            }
        };

        doc.fromHTML(elementHTML, 20, 20, {
            'width': 170,
            'elementHandlers': specialElementHandlers
        });

        doc.output('dataurlnewwindow');
        // doc.save('Genius-Blueprint-Assessment-instruction.pdf');

    });

    $('#test-json').on('click', function(e) {

      e.preventDefault();

      console.log(createPayerData('test', 'test', 'test'));

      // $.ajax({
      //   type: 'POST',
      //   headers: {
      //     'Access-Control-Allow-Origin': '*',
      //     'Access-Control-Allow-Headers': '*',
      //     'CODE': '2sd32eHS45S',
      //     'AUTH_KEY': 'W]Nd0t:Q-6JUy+!jJ$5Tlhuw+EUk.tYQz1F-&W9X?78kz%ZA&N;a(Ly7n-,9k*?B',
      //     'Content-Type':'application/json'
      //   },
      //   url: 'https://geniusblueprintassessment.com/api/tickets',
      //   crossDomain: true,
      //   dataType: 'json',
      //   data: createPayerData('test', 'test', 'test'),
      //   success: function (response) {

      //       console.log(response);
      //       console.log('submited');

      //   }
      // });

    });

});

$(window).on('load', function () {

  $('.__show-on-load').removeClass('__hidden');

  //replace images attribute
  $('img[data-src]').each(function () {
    $(this).attr('src', $(this).attr('data-src')).removeAttr('data-src');
  });

  $('#price-value-total').html(totalPrice);

  initTestimonialsCarousel();
  initFolderAboutCarousel();
  checkLocalStorage();
  setStepsNumbers();
  replaceTestimonialsText();
  setTestimonialsContentHeight();
  setTestimonialsRowContentHeight();
  $('.order-form input[name="amount"]').val(totalPrice);

  if(!localStorage.getItem('payer') && $('#checkout-page')[0]) {

      savePayerDataToLocalhost();

  } else {

      return false

  }

});

$(window).resize(function () {

  if ($('.about-detail-list')[0] && !$('.about-detail-list.slick-slider')[0]) {

    initFolderAboutCarousel();

  }

  if ($('.testimonials-section .__carousel-theme')[0] && !$('.testimonials-section .__carousel-theme.slick-slider')[0]) {

    initTestimonialsCarousel();

  }

});

$(window).on('scroll', function () {

    var vScroll = $(this).scrollTop();

    bannerParallax(vScroll);

});

function openNavMenu() {

  $('.nav, .close-menu').fadeIn();

  $('.menu-item').each(function (i) {

    setTimeout(function () {

      $('.menu-item').eq(i).addClass('__is-showing');

    }, 100 * (i + 1));

  });

}

function closeNavMenu() {

  $('.nav, .close-menu').fadeOut();
  $('.menu-item').removeClass('__is-showing');

}

function setTestimonialsContentHeight() {

  $('.testimonials-section .testimonials-content').each(function () {

    var card = $(this);

    if (card.outerHeight() > cardHeight) {

      cardHeight = card.outerHeight();

    }

  });

  $('.testimonials-section .testimonials-content').css({
    'height': cardHeight
  });

  cardHeight = 0;

}

function initFolderAboutCarousel() {

  $('.about-detail-list').slick({
    dots: false,
    arrows: false,
    infinite: false,
    speed: 400,
    cssEase: 'cubic-bezier(0.6, 0.1, 0.15, 1)',
    slidesToShow: 1,
    slidesToScroll: 1,
    mobileFirst: true,
    variableWidth: true,
    responsive: [{
        breakpoint: 380,
        settings: {
          slidesToShow: 2
        }
      },
      {
        breakpoint: 576,
        settings: {
          slidesToShow: 3
        }
      },
      {
        breakpoint: 767,
        settings: 'unslick'
      }
    ]
  });

}

function initTestimonialsCarousel() {

  $('.__carousel-theme').slick({
    dots: false,
    arrows: false,
    infinite: false,
    speed: 400,
    cssEase: 'cubic-bezier(0.6, 0.1, 0.15, 1)',
    slidesToShow: 1,
    slidesToScroll: 1,
    mobileFirst: true,
    centerMode: true,
    variableWidth: true,
    responsive: [{
      breakpoint: 767,
      settings: 'unslick'
    }]
  });
  $('.__carousel-theme').slick('slickGoTo', 1);

}

function setTestimonialsRowContentHeight() {

  if ($(window).width() >= 768) {

    $('.testimonials-open-section .col-sm-4:nth-child(3n + 2)').each(function () {

      var cardCol = $(this),
        content = cardCol.find('.testimonials-content'),
        contentHeight = content.outerHeight(),
        contentPrev = cardCol.prev().find('.testimonials-content'),
        contentNext = cardCol.next().find('.testimonials-content');

      cardHeight = contentHeight;

      if (contentPrev.outerHeight() > cardHeight) {

        cardHeight = contentPrev.outerHeight();

      } else {

        null

      }

      if (contentNext.outerHeight() > cardHeight) {

        cardHeight = contentNext.outerHeight();

      } else {

        null

      }

      content.css('height', cardHeight);
      contentPrev.css('height', cardHeight);
      contentNext.css('height', cardHeight);

      cardHeight = 0;

    });

  }

}

function checkLocalStorage() {

  if (!localNameInput || !localEmailInput || !localLNameInput || localNameInput === 'undefined' || localEmailInput === 'undefined' || localLNameInput === '') {

    localStorage.setItem('name', '');
    localStorage.setItem('email', '');
    localStorage.setItem('lName', '');

  } else {

    nameInput.val(localNameInput);
    emailInput.val(localEmailInput);
    lNameInput.val(localLNameInput);

  }

}

function setDataToLocalStorage(name, data) {

  localStorage.setItem(name, data);

}

function clearFormDataOnLocalStorage() {

  localStorage.setItem('name', '');
  localStorage.setItem('lName', '');
  localStorage.setItem('email', '');

}

function clearInputsValue() {

  $('input, textarea').val('');

}

function checkEmptyFields(form) {

  var empty = true;

  form.find('input').each(function () {

    var input = $(this),
      inputVal = input.val();

    if (inputVal === '') {

      input.closest('.input-container').addClass('__error');
      empty = true;
      setTimeout(function () {

        input.closest('.input-container').removeClass('__error');

      }, 2000);

    } else {

      empty = false;

    }

  });

  return empty;

}

function setStepsNumbers() {

  $('.steps-wrap h3').each(function (i) {

    i += 1;

    $(this).attr('data-num', i);

  });

}

function replaceTestimonialsText() {

  $('.testimonial-content-text').each(function (i) {

    i += 1;

    var item = $(this),
      text = item.html(),
      itemParent = item.closest('.testimonial-item'),
      itemModal = itemParent.parent().find('.modal');

    itemModal.attr('id', i);

    if (text.length > 270) {

      var newText = text.substr(0, 270);

      var finalText = newText.substr(0, 270 - (setLastWord(newText).length)) + '...' + '<a href="#' + i + '" data-fancybox data-touch="false">Read more</a>';

    }

    item.html(finalText);

  });

}

function setLastWord(text) {

  var n = text.split(' ');

  return n[n.length - 1];

}

function showIndividualModal() {

  $.fancybox.open({
    src: '#thank-individual'
  });

}

function showCorporateModal() {

  $.fancybox.open({
    src: '#thank-corporate'
  });

}

function bannerParallax(vScroll) {

    $('.banner-section .bg').css({
       'background-position': 'center top '+ (vScroll / 14) +'px'
    });

}

function addValue(countWrap, step, maxValue, minValue, currentValue, countInput) {
    if(currentValue === maxValue) {
        countWrap.addClass('disable-add');
    } else {
        currentValue += step;
        countWrap.removeClass('disable-add').addClass('enable-subtract');
    }
    countInput.val(currentValue);
}

function subtractValue(countWrap, step, maxValue, minValue, currentValue, countInput) {
    if(currentValue === minValue) {
        countWrap.removeClass('enable-subtract');
    } else {
        currentValue -= step;
        countWrap.removeClass('disable-add')
    }
    countInput.val(currentValue);
}

function changeProductPrice() {

    productCount = $('#product-count').val();

    var total = parseInt(productPrice) * parseInt(productCount);

    totalPrice = Math.round(total);

    $('#price-value-total').html(totalPrice);
    $('.order-form input[name="amount"]').val(totalPrice);
    savePayerDataToLocalhost();

}

function generateUniqueKey(count) {

    var i;
    var keys = [];

    for(i = 0; i < count; i++) {

        keys.push(Math.random().toString(36).substr(2, 3) + (Date.now() + i).toString().slice(-5));

    }

    return keys

}

function createPayerData(email, name, lname) {

    var payer = {};

    payer.email = email;
    payer.name = name;
    payer.lname = lname;
    payer.keys = generateUniqueKey(productCount);

    return payer;

}

function savePayerDataToLocalhost() {

    var serializedState = JSON.stringify(createPayerData(payerEmail, payerName, payerLName));

    localStorage.setItem('payer', serializedState);

}

function getPayerDataFromLocalstorage() {

    try {

        var serializedState = localStorage.getItem('payer');

        if(serializedState === null) {

            return undefined;

        }

        return JSON.parse(serializedState);

    } catch (err) {

        console.error('Error on get state from localStorage');
        return undefined;

    }

}

function removePayerData() {

    localStorage.removeItem('payer');

}

function appendPayerDataToPage() {

    var payer = getPayerDataFromLocalstorage();

    $('#payer-name').html(payer.name);
    $('#payer-lname').html(payer.lname);

    payer.keys.forEach(function (key, i) {

        var j = i + 1;

        j < 10 ? j = '0'+j : j;

        $('.payer-codes').append('<p><span>'+ j +'.</span> <span class="code-value">'+ key +'</span></p>');


    });

    removePayerData();

    // SEND EMAIL FOR PAYER //
    // $.ajax({
    //     url: window.location.origin + '/wp-content/themes/genius/assets/sendEmailTemplate.php',
    //     // url: 'http://studiopresto.com/development/genius/wp-content/themes/genius/assets/sendEmailTemplate.php',
    //     type: 'POST',
    //     data: payer,
    //     success: function (response) {
    //
    //         console.log(response);
    //
    //         if(response == 1){
    //
    //             $('.success-send-title').fadeIn();
    //             removePayerData();
    //
    //         } else {
    //
    //             return false
    //
    //         }
    //
    //     }
    // });

}

if($('#ppl_box')[0]) {

    paypal.Buttons({
        createOrder: function(data, actions) {
            // Set up the transaction
            return actions.order.create({
                purchase_units: [{
                    amount: {
                        currency_code: 'USD',
                        value: totalPrice
                        // value: '1.00'
                    }
                }]
            });
        },
        onApprove: function(data, actions) {
            return actions.order.capture().then(function(details) {

                payerEmail = details.payer.email_address;
                payerName = details.payer.name.given_name;
                payerLName = details.payer.name.surname;

                savePayerDataToLocalhost();
                var payer = getPayerDataFromLocalstorage();

                $.ajax({
                    url: window.location.origin + '/wp-content/themes/genius/assets/sendEmailTemplate.php',
                    // url: 'http://studiopresto.com/development/genius/wp-content/themes/genius/assets/sendEmailTemplate.php',
                    type: 'POST',
                    data: payer,
                    success: function (response) {

                        console.log(response);

                        if(response == 1){

                            // window.location.href = '/development/genius/successfully'
                            window.location.href = '/successfully'

                        } else {

                            return false

                        }

                    }
                });

            });
        }
    }).render('#ppl_box');

}