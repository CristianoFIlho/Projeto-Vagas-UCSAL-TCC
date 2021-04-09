var widthWindow = $(window).width(),
    body = $('body'),
    $toastlast = null,
    $toast = '';
var scripts = {
    Init: function() {
        console.log('Start');
        body.remove('loading');
        scripts.OwlCarrousel();
        scripts.Form();
        scripts.Fancybox();
        scripts.iCheck();
        $(document).on('click', '.input-checkbox , .input-radio', function(event) {
            event.preventDefault();
            _obj = $(this);
            _obj.find('ins').trigger('click');
        });
        $(document).on('click', '[data-toggle="print"]', function(event) {
            event.preventDefault();
            window.print();
        });
        body.removeClass('loading');

        $(document).on('click','.top-page',function(event){
            event.preventDefault();
            $("html, body").animate({
                scrollTop: 0
            }, "slow");
        });

        $(window).scroll(function () {
            if ($(window).scrollTop() >= 200) {
                $('#header').addClass('header-fixed animated slideInDown');
                $('body').addClass('header-fixed');
                $('.top-page').addClass('active');
            } else {
                $('#header').removeClass('header-fixed animated slideInDown');
                $('body').removeClass('header-fixed');                
                $('.top-page').removeClass('active');
            }
        });

        $(".btn-contact").click(function(e) { 
            // Prevent a page reload when a link is pressed
          e.preventDefault(); 
            // Call the scroll function
          goToByScroll('contact');           
      });

      

        new WOW().init();
    },
    OwlCarrousel: function() {
        // add animate.css class(es) to the elements to be animated
        function setAnimation ( _elem, _InOut ) {
            // Store all animationend event name in a string.
            // cf animate.css documentation
            var animationEndEvent = 'webkitAnimationEnd mozAnimationEnd MSAnimationEnd oanimationend animationend';

            _elem.each ( function () {
            var $elem = $(this);
            var $animationType = 'animated ' + $elem.data( 'animation-' + _InOut );

            $elem.addClass($animationType).one(animationEndEvent, function () {
                $elem.removeClass($animationType); // remove animate.css Class at the end of the animations
            });
            });
        }
        if (!jQuery().owlCarousel) {
            console.log('OwlCarrousel not defined');
            return;
        } else {
            if ($("[data-carousel='owlCarousel']").length > 0) {
                carousels = $("[data-carousel='owlCarousel']");
                carousels.each(function(index, el) {
                    if ($(this).attr('data-navigation'))
                        navigation = $(this).attr('data-navigation');
                    else
                        navigation = false;
                    if ($(this).attr('data-pagination'))
                        pagination = $(this).attr('data-pagination');
                    else
                        pagination = false;
                    if ($(this).attr('data-singleItem'))
                        singleItem = $(this).attr('data-singleItem');
                    else
                        singleItem = false;
                    if ($(this).attr('data-autoPlay'))
                        autoPlay = $(this).attr('data-autoPlay');
                    else
                        autoPlay = false;
                    if ($(this).attr('data-num-slider'))
                        items = $(this).attr('data-num-slider');
                    else
                        items = 1;

                    if(singleItem){
                        $(this).owlCarousel({
                            nav: navigation,
                            center: false,
                            loop: true,
                            autoplay: autoPlay,
                            autoplayTimeout: 8000,
                            autoplaySpeed: 6000,
                            dots: pagination,
                            margin: 0,
                            responsive: {
                                // breakpoint from 0 up
                                0: {
                                    items: 1,
                                    singleItem: true
                                },
                                480: {
                                    items: 1,
                                    singleItem: true
                                },
                                768: {
                                    items: 1,
                                    singleItem: true
                                },
                                960: {
                                    items: 1,
                                    singleItem: true
                                }
                            },
                            navText: ['<i class="fa fa-angle-left" aria-hidden="true"></i>', '<i class="fa fa-angle-right" aria-hidden="true"></i>']

                        });
                    }else{
                        $(this).owlCarousel({
                            nav: navigation,
                            center: false,
                            loop: false,
                            autoplay: autoPlay,
                            dots: pagination,
                            margin: 10,
                            responsive: {
                                // breakpoint from 0 up
                                0: {
                                    items: 1,
                                    singleItem: true
                                },
                                480: {
                                    items: 2
                                },
                                768: {
                                    items: 3
                                },
                                960: {
                                    items: items
                                }
                            },
                            navText: ['<i class="fa fa-angle-left" aria-hidden="true"></i>', '<i class="fa fa-angle-right" aria-hidden="true"></i>']

                        });
                    }

                    // Fired before current slide change
                    $(this).on('change.owl.carousel', function(event) {
                        var $currentItem = $('.owl-item', $(this)).eq(event.item.index);
                        var $elemsToanim = $currentItem.find("[data-animation-out]");
                        setAnimation ($elemsToanim, 'out');
                    });

                    // Fired after current slide has been changed
                    $(this).on('changed.owl.carousel', function(event) {

                        var $currentItem = $('.owl-item', $(this)).eq(event.item.index);
                        var $elemsToanim = $currentItem.find("[data-animation-in]");
                        setAnimation ($elemsToanim, 'in');
                    })
                    
                });

                
            }
        }
    },
    Fancybox: function() {
        if (!jQuery().fancybox) {
            console.log('Fancybox not defined');
            return;
        }
        $(".fancybox").fancybox({
            'autoScale': true,
            'transitionIn': 'elastic',
            'transitionOut': 'elastic',
            'maxWidth': '60%',
            'speedIn': 500,
            'speedOut': 300,
            'autoDimensions': true,
            'centerOnScroll': true // as MattBall already said, remove the comma
        });

        $(document).on('click', '[data-close-modal="true"]', function(event) {
            event.preventDefault();
            $.fancybox.close(true)
        })
    },
    mCustomScrollBar: function() {
        if (!jQuery().mCustomScrollbar) {
            console.log('mCustomScrollbar not defined');
            return;
        }
        if ($("[data-scroll='mCustomScrollbar']").length > 0) {
            customScroll = $("[data-scroll='mCustomScrollbar']");
            customScroll.each(function(index, el) {
                if ($(this).attr('data-theme'))
                    theme = $(this).attr('data-theme');
                else
                    theme = 'ligth';
            })

            $("[data-scroll='mCustomScrollbar']").mCustomScrollbar({
                theme: theme,
                autoHideScrollbar: true,
                callbacks: {
                    whileScrolling: function() {
                        if (this.mcs.draggerTop > 10) {
                            $('#header').addClass('is-sticky');
                        } else {
                            $('#header').removeClass('is-sticky');
                        }
                    },
                }
            });
        }
    },
    Notification: function() {
        if (!jQuery().toastr) {
            return;
        }
        toastr.options = {
            "closeButton": true,
            "debug": false,
            "positionClass": "toast-top-right",
            "showDuration": "1000",
            "hideDuration": "1000",
            "timeOut": "5000000",
            "extendedTimeOut": "1000",
            "showEasing": "swing",
            "hideEasing": "linear",
            "showMethod": "fadeIn",
            "hideMethod": "fadeOut",
            "onclick": null
        }
    },
    Parallax: function() {
        if (jQuery().stellar) {
            $(".parallax").stellar({
                horizontalScrolling: false,
                verticalOffset: 180
            });
        } else {
            console.log('Parallax not defined');
        }
    },
    StickMenu: function() {
        if (!jQuery().sticky) {
            return;
        }
        $("#header").sticky();
    },
    iCheck: function() {
        if (!jQuery().iCheck) {
            return;
        }
        $('input').iCheck({
            checkboxClass: 'icheckbox_flat-blue',
            radioClass: 'iradio_flat-blue',
            labelHover: false
        });

    },
    Form: function() {
        $(document).on('submit', '[data-form="contact"]', function(event) {
            event.preventDefault();
            _obj = $(this);
            _data = _obj.serialize();
            _objBtn = _obj.find('input[type="submit"]');
            _objBtn.addClass('disabled');


            $.ajax({
                url: ajaxForm.ajax_url,
                type: 'POST',
                dataType: 'JSON',
                data: _data,
                beforeSend: function() {
                    notificationInfo('Enviando', 'Estamos enviando o seu e-mail!');
                },
                success: function(data, status) {
                    // resposta
                    $_resposta = data;
                    // verifica se existe
                    if ($_resposta) {
                        var _cod, _message;
                        // quebrando os resultados
                        // obtendo o cod
                        _cod = $_resposta.cod;
                        _message = $_resposta.message;

                        if (_cod == 1) {
                            notificationSuccess('Enviado', 'O seu e-mail foi enviado com sucesso!');
                        } else if (_cod == 2) {
                            notificationError('Erro', _message);
                        } else if (_cod == 3) {
                            notificationError('Erro', _message);
                        } else {
                            notificationError('Erro', _message);
                        }
                        $('[data-form="contact"]')[0].reset();
                        _objBtn.removeClass('disabled');
                    } else {
                        alert('Não foi possível realizar enviar o seu contato, favor enviar um e-mail para contato@atonengenharia.com.br');
                    }

                },
                error: function(error) {
                    alert('Error!');
                    _objBtn.removeClass('disabled');
                }
            })
        });
    }
}

$(window).on('load', function() {
    scripts.Init();
    // $('body .page').scroll(navSlide);
});


function notificationSuccess(title, msg, link, text) {
    getLastToast();

    if (link) {
        $(link + ' .modal-body').html(text);
        modalNotification(link);
    }

    if (title && msg) {
        $toast = toastr.success(msg, title);
    } else if (title) {
        $toast = toastr.success('Success', title);
    } else if (msg) {
        $toast = toastr.success(msg, 'Data updated');
    } else {
        $toast = toastr.success('Success', 'Data updated');
    }

    $toastlast = $toast;
    return false;
}

function notificationError(title, msg, link, text) {

    getLastToast();

    if (link) {
        $(link + ' .modal-body').html(text);
        modalNotification(link);
    }

    if (title && msg) {
        $toast = toastr.error(msg, title);
    } else if (title) {
        $toast = toastr.error('Try again', title);
    } else if (msg) {
        $toast = toastr.error(msg, 'Data not updated');
    } else {
        $toast = toastr.error('Try again', 'Data not updated');
    }

    $toastlast = $toast;
    return false;
}

function notificationInfo(title, msg, link, text) {
    getLastToast();

    if (link) {
        $(link + ' .modal-body').html(text);
        modalNotification(link);
    }

    $toast = toastr.info(msg, title);


    $toastlast = $toast;
    return false;
}

function notificationAlert(title, msg, link, text) {
    getLastToast();

    if (link) {
        $(link + ' .modal-body').html(text); 
        modalNotification(link);
    }

    $toast = toastr.warning(msg, title);


    $toastlast = $toast;
    return false;
}

function getLastToast() {
    if ($toastlast) {
        toastr.clear($toastlast);
    }
    toastr.options.onclick = null;
}

function modalNotification(Link) {
    toastr.options.onclick = function() {
        $(Link).modal()
    };
}

function goToByScroll(id){
    // Remove "link" from the ID
  id = id.replace("link", "");
    // Scroll
  $('html,body').animate({
      scrollTop: $("#"+id).offset().top},
      'slow');
}
