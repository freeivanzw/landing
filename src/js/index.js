$(function () {
    var $black = $('.black');


    jQuery.fn.dropdown = function (options) {

        var settings = $.extend({
            arrow: '',
            prevent: true,
            onChange: ''
        }, options);

        return this.each(function () {
            var $this = $(this);

            if ($this.find('.selected').length > 0) {
                if ($(this).find('.overflow input').length > 0) {
                    $this.find('input:eq(0)')
                        .val($this.find('.selected').text())
                        .end()
                        .find('input').eq(1).val($this.find('.selected a').data('value'))
                        .end()
                        .find('.selected').closest('li');
                } else {
                    $this.find('span:eq(0)')
                        .html($this.find('.selected').text() + settings.arrow)
                        .end()
                        .find('input').val($this.find('.selected a').data('value'))
                        .end()
                        .find('.selected').closest('li');
                }
            }

            $this.on('click', '.overflow', function (e) {
                e.preventDefault();
                e.stopPropagation();

                if (!$(this).closest('.dropdown').hasClass('dropdown-open') || e.target.tagName === 'INPUT') {
                    $this.addClass('dropdown-open').find('ul:eq(0)').stop().slideDown(function () {
                        var h = parseInt($(this).outerHeight(true, true)),
                            top = parseInt($(this).offset()['top']) - parseInt($(document).scrollTop()),
                            wh = parseInt($(window).height());

                        if (top + h > wh) {
                            var dwh = wh - top - 10;

                            if (dwh < 200) {
                                dwh = 200;
                            }

                            $(this).css({
                                'max-height': dwh
                            });
                        } else {
                            $(this).css({
                                'max-height': 'auto'
                            });
                        }
                    });
                } else {
                    $this.removeClass('dropdown-open').find('ul:eq(0)').stop().slideUp();
                }
            });

            $this.on('keyup paste', '.overflow input', function () {
                var val = $.trim($(this).val()).toLowerCase();

                if (val === '') {
                    $this.find('.search_hidden').removeClass('search_hidden').removeClass('hidden');
                } else {
                    $this.find('li').map(function () {
                        if ($(this).find('a').text().toLowerCase().search(val) > -1) {
                            $(this).removeClass('search_hidden').removeClass('hidden');
                        } else {
                            $(this).addClass('search_hidden').addClass('hidden');
                        }
                    });
                }
            });

            $this.find('ul').eq(0).on('click', 'a', function (e) {
                e.preventDefault();

                if (!$(this).hasClass('disabled')) {
                    if (settings.prevent === false) {
                        window.location.href = $(this).attr('href');
                    } else {
                        $(this).closest('ul').find('.selected').removeClass('selected').show().end().end().closest('li').addClass('selected');

                        if ($(this).find('.overflow input').length > 0) {
                            $this.find('input:eq(0)').val($(this).text()).end().find('input:eq(1)').val($(this).data('value'));
                        } else {
                            $this.find('span:eq(0)').html($(this).text() + settings.arrow).end().find('input').val($(this).data('value'));
                        }

                        $this.removeClass('dropdown-open').find('ul:eq(0)').slideUp();
                        if ($.isFunction(settings.onChange)) settings.onChange($(this));
                    }
                }
            });
        });
    };

    function checkPositionHeader () {
        const headerHeight = $('.site_header').outerHeight();
        const fixedHeaderHeight = $('.top_header').outerHeight();

        if ( $(window).scrollTop() + fixedHeaderHeight > headerHeight) {
            $('.top_header').addClass('shadow');
        } else {
            $('.top_header').removeClass('shadow');
        }
    }

    checkPositionHeader();

    $(document).on('scroll', checkPositionHeader);

    $('.open-mob_menu').on('click', function (e) {
        e.preventDefault();

        if ($(this).hasClass('active')) {
            $(this).removeClass('active');
            $('body').removeClass('overflow');
            $('.mobile_menu').removeClass('active');
            $black.addClass('hidden');
        } else {
            $(this).addClass('active');
            $('body').addClass('overflow');
            $('.mobile_menu').addClass('active');
            $black.removeClass('hidden');
        }
    })

    $black.on('click', function () {
        $('body').removeClass('overflow');
        $('.open-mob_menu').removeClass('active');
        $('.mobile_menu').removeClass('active');
        $black.addClass('hidden');
    })

    $('.mob_catalog-gtn').on('click', function (e) {
        e.preventDefault();

        $('.top_catalog').toggleClass('active');
    })

    $('.mob-top_menu').on('click', 'a', function (e) {
        if ($(this).closest('li').hasClass('has_drop')) {
            e.preventDefault();

            $(this).closest('li').toggleClass('opened');
        }
    })

    $('.open-mob_phones').on('click', function (e) {
        e.preventDefault();

        if ($(this).hasClass('active')) {
            $(this).removeClass('active');
            $('body').removeClass('overflow');
            $('.reservation-popup').removeClass('active');
            $black.addClass('hidden');
        } else {
            $(this).addClass('active');
            $('body').addClass('overflow');
            $('.reservation-popup').addClass('active');
            $black.removeClass('hidden');
        }
    })

    $black.on('click', function () {
        $('.open-mob_phones').removeClass('active');
        $('body').removeClass('overflow');
        $('.reservation-popup').removeClass('active');
        $black.addClass('hidden');
    })

    $('.selected_lang').on('click', function (e) {
        e.preventDefault();

        $(this).closest('.toggle_lang-deck').toggleClass('active');
    })


    $('.catalog_2-3lvl').on('click', 'a', function (e) {
        if ($(window).width() >= 1024 ) {
            return e;
        }

        if ($(this).parent('li').hasClass('has_drop')) {
            e.preventDefault();

            $(this).parent('li').toggleClass('active')
        }
    })

    $('.last_news-slider').each(function () {
        if ($(this).find('.last_news-item').length > 1) {
            $(this).slick({
                dots: true,
                variableWidth: true,
                arrows: false,
                infinite: false,
                slidesToShow: 1,
                mobileFirst: true,
                responsive: [
                    {
                        breakpoint: 590,
                        settings: {
                            slidesToShow: 2,
                        }
                    },
                    {
                        breakpoint: 880,
                        settings: {
                            slidesToShow: 3,
                        }
                    },
                    {
                        breakpoint: 1023,
                        settings: "unslick"
                    },
                ]
            });
        }
    })

    $('.grid_slider-slick.one-row').each(function () {
        let slidesCount = $(this).find('.grid_slider-slide').length;

        let sliderSettings = {
            autoplay: true,
            autoplaySpeed: 3000,
            dots: true,
            variableWidth: true,
            arrows: false,
            infinite: true,
            slidesToShow: 1,
            mobileFirst: true,
            responsive: [
                {
                    breakpoint: 590,
                    settings: {
                        slidesToShow: 2,
                    }
                },
                {
                    breakpoint: 767,
                    settings: slidesCount <= 3 ? 'unslick' : {
                        slidesToShow: 3,
                        variableWidth: false,
                    }
                }
            ]
        }

        $(this).slick(sliderSettings)
    })

    $('.grid_slider-slick.two-rows').each(function () {
        let slidesCount = $(this).find('.grid_slider-slide').length;

        let sliderSettingsMob = {
            autoplay: true,
            autoplaySpeed: 3000,
            dots: true,
            variableWidth: true,
            arrows: false,
            infinite: true,
            slidesToShow: 1,
            mobileFirst: true,
            rows: 1,
            responsive: [
                {
                    breakpoint: 480,
                    settings: {
                        slidesToShow: 2,
                    }
                },
                {
                    breakpoint: 694,
                    settings: {
                        slidesToShow: 3,
                    }
                }
            ]
        }

        let sliderSettingsDesk = {
            autoplay: true,
            autoplaySpeed: 3000,
            rows: 2,
            dots: true,
            arrows: false,
            infinite: true,
            speed: 300,
            slidesToShow: 3,
            slidesToScroll: 2,
        }

        if ($(window).width() < 768) {
            $(this).slick(sliderSettingsMob);
        } else if ($(window).width() >= 768 && slidesCount > 6) {
            $(this).slick(sliderSettingsDesk);
        }

    })

    let lastPostScreen = $(window).scrollTop();
    $(window).on('scroll', function () {

        if (lastPostScreen > $(window).scrollTop() && $(window).scrollTop() > $(window).height()) {
            $('.up').addClass('active');
        } else {
            $('.up').removeClass('active');
        }

        lastPostScreen = $(window).scrollTop();
    })

    $('.up').on('click', function (e) {
        e.preventDefault();

        $("html, body").stop().animate({scrollTop:0}, 500, 'swing');
    })

    $('.big_slider').slick({
        dots: true,
        arrows: false,
        infinite: false,
        slidesToShow: 1,
        mobileFirst: true,
        asNavFor: $('.small_slider'),
        responsive: [
            {
                breakpoint: 767,
                settings: {
                    dots: false,
                    arrows: true,
                }
            }
        ]
    });


    $('.small_slider').slick({
        dots: false,
        variableWidth: true,
        arrows: true,
        infinite: false,
        slidesToShow: 1,
        mobileFirst: true,
        asNavFor: $('.big_slider'),
    })

    $('.small_slider').find('.small_slider-item').on('click', function (e) {
        e.preventDefault();

        let slidePost = $(this).data('slick-index');
        $('.big_slider').slick('slickGoTo', slidePost);
    })

    $('.tabs_list').on('click', 'a', function (e) {
        e.preventDefault();

        $('.tabs_list').find('a').removeClass('active');
        $(this).addClass('active');

        $('.tab_box').addClass('hidden');
        $('#' + $(this).data('tab')).removeClass('hidden');
    })

    $('.hotel_room-slider').slick({
        dots: false,
        variableWidth: true,
        arrows: false,
        infinite: false,
        slidesToShow: 2,
        mobileFirst: true,
        responsive: [
            {
                breakpoint: 500,
                settings: {
                    slidesToShow: 3,
                }
            },
            {
                breakpoint: 650,
                settings: {
                    slidesToShow: 4,
                }
            },
            {
                breakpoint: 810,
                settings: {
                    slidesToShow: 5,
                }
            },
            {
                breakpoint: 1024,
                settings: {
                    slidesToShow: 4,
                }
            },
            {
                breakpoint: 1184,
                settings: {
                    slidesToShow: 5,
                }
            }
        ]
    })

    $('.hotel_room').each(function () {

        if ($(this).find('.hotel_room-image').length > 6) {
            $(this).find('.hotel_room-top').addClass('has_swipe');
        }
    })

    $('.select_dropdown').dropdown();

})

