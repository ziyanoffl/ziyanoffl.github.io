/**
 * ===================================================================
 * main js
 *
 * -------------------------------------------------------------------
 */

// Custom
// // Get the div element by its class name
// var div = document.getElementsByClassName("right-slide")[0];

// // Set the initial position of the div to be off-screen to the right
// div.style.right = "-100%";

// // Add an event listener to the window object for scroll events
// window.addEventListener("scroll", function() {
//   // Get the current scroll position of the window
//   var scrollPos = window.pageYOffset || document.documentElement.scrollTop;

//   // Set a threshold value for triggering the animation
//   var threshold = 100;

//   // Check if the scroll position is greater than or equal to the threshold
//   if (scrollPos >= threshold) {
//     // Animate the div to slide in from the right side
//     div.style.transition = "right 1s ease-in-out";
//     div.style.right = "0%";
//   }
// });

// // Get the div element by its class name
// var div_left = document.getElementsByClassName("left-slide")[0];

// // Set the initial position of the div to be off-screen to the right
// div_left.style.left = "-100%";

// // Add an event listener to the window object for scroll events
// window.addEventListener("scroll", function() {
//   // Get the current scroll position of the window
//   var scrollPos = window.pageYOffset || document.documentElement.scrollTop;

//   // Set a threshold value for triggering the animation
//   var threshold = 100;

//   // Check if the scroll position is greater than or equal to the threshold
//   if (scrollPos >= threshold) {
//     // Animate the div to slide in from the right side
//     div_left.style.transition = "left 1s ease-in-out";
//     div_left.style.left = "0%";
//   }
// });

// select all the elements with the class "slide-in-right"
const slideInRightElements = document.querySelectorAll(".slide-in-right");

// create a new intersection observer
const slideInRightObserver = new IntersectionObserver(function (entries, slideInRightObserver) {
    // loop through the entries
    entries.forEach(entry => {
        // check if the entry is intersecting
        if (entry.isIntersecting) {
            // add the class "active" to the entry target
            entry.target.classList.remove("inactive");
        } else {
            // if the element is not intersecting (out of view), add the "inactive" class
            entry.target.classList.add("inactive");
        }
    });
});

// loop through the slide in right elements and observe each element
slideInRightElements.forEach(element => {
    slideInRightObserver.observe(element);
});


(function ($) {

    "use strict";

    /*---------------------------------------------------- */
    /* Preloader
    ------------------------------------------------------ */
    $(window).load(function () {

        // will first fade out the loading animation
        $("#loader").fadeOut("slow", function () {

            // will fade out the whole DIV that covers the website.
            $("#preloader").delay(300).fadeOut("slow");

        });

    })


    /*---------------------------------------------------- */
    /* FitText Settings
    ------------------------------------------------------ */
    setTimeout(function () {

        $('#intro h1').fitText(1, {minFontSize: '42px', maxFontSize: '84px'});

    }, 100);


    /*---------------------------------------------------- */
    /* FitVids
    ------------------------------------------------------ */
    $(".fluid-video-wrapper").fitVids();


    /*---------------------------------------------------- */
    /* Owl Carousel
    ------------------------------------------------------ */
    $("#owl-slider").owlCarousel({
        navigation: false,
        pagination: true,
        itemsCustom: [
            [0, 1],
            [700, 2],
            [960, 3]
        ],
        navigationText: false
    });


    /*----------------------------------------------------- */
    /* Alert Boxes
      ------------------------------------------------------- */
    $('.alert-box').on('click', '.close', function () {
        $(this).parent().fadeOut(500);
    });


    /*----------------------------------------------------- */
    /* Stat Counter
      ------------------------------------------------------- */
    var statSection = $("#stats"),
        stats = $(".stat-count");

    statSection.waypoint({

        handler: function (direction) {

            if (direction === "down") {

                stats.each(function () {
                    var $this = $(this);

                    $({Counter: 0}).animate({Counter: $this.text()}, {
                        duration: 4000,
                        easing: 'swing',
                        step: function (curValue) {
                            $this.text(Math.ceil(curValue));
                        }
                    });
                });

            }

            // trigger once only
            this.destroy();

        },

        offset: "90%"

    });


    /*---------------------------------------------------- */
    /*	Masonry
    ------------------------------------------------------ */
    var containerProjects = $('#folio-wrapper');

    containerProjects.imagesLoaded(function () {

        containerProjects.masonry({
            itemSelector: '.folio-item',
            resize: true
        });

    });


    /*----------------------------------------------------*/
    /*	Modal Popup
    ------------------------------------------------------*/
    $('.item-wrap a').magnificPopup({

        type: 'inline',
        fixedContentPos: false,
        removalDelay: 300,
        showCloseBtn: false,
        mainClass: 'mfp-fade'

    });

    $(document).on('click', '.popup-modal-dismiss', function (e) {
        e.preventDefault();
        $.magnificPopup.close();
    });


    /*-----------------------------------------------------*/
    /* Navigation Menu
 ------------------------------------------------------ */
    var toggleButton = $('.menu-toggle'),
        nav = $('.main-navigation');

    // toggle button
    toggleButton.on('click', function (e) {

        e.preventDefault();
        toggleButton.toggleClass('is-clicked');
        nav.slideToggle();

    });

    // nav items
    nav.find('li a').on("click", function () {

        // update the toggle button
        toggleButton.toggleClass('is-clicked');
        // fadeout the navigation panel
        nav.fadeOut();

    });


    /*---------------------------------------------------- */
    /* Highlight the current section in the navigation bar
    ------------------------------------------------------ */
    var sections = $("section"),
        navigation_links = $("#main-nav-wrap li a");

    sections.waypoint({

        handler: function (direction) {

            var active_section;

            active_section = $('section#' + this.element.id);

            if (direction === "up") active_section = active_section.prev();

            var active_link = $('#main-nav-wrap a[href="#' + active_section.attr("id") + '"]');

            navigation_links.parent().removeClass("current");
            active_link.parent().addClass("current");

        },

        offset: '25%'
    });


    /*---------------------------------------------------- */
    /* Smooth Scrolling
    ------------------------------------------------------ */
    $('.smoothscroll').on('click', function (e) {

        e.preventDefault();

        var target = this.hash,
            $target = $(target);

        $('html, body').stop().animate({
            'scrollTop': $target.offset().top
        }, 800, 'swing', function () {
            window.location.hash = target;
        });

    });


    /*---------------------------------------------------- */
    /*  Placeholder Plugin Settings
    ------------------------------------------------------ */
    $('input, textarea, select').placeholder()


    /*---------------------------------------------------- */
    /*	contact form
    ------------------------------------------------------ */

    /* local validation */
    $('#contactForm').validate({

        /* submit via ajax */
        submitHandler: function (form) {

            var sLoader = $('#submit-loader');

            $.ajax({

                type: "POST",
                url: "inc/sendEmail.php",
                data: $(form).serialize(),
                beforeSend: function () {

                    sLoader.fadeIn();

                },
                success: function (msg) {

                    // Message was sent
                    if (msg == 'OK') {
                        sLoader.fadeOut();
                        $('#message-warning').hide();
                        $('#contactForm').fadeOut();
                        $('#message-success').fadeIn();
                    }
                    // There was an error
                    else {
                        sLoader.fadeOut();
                        $('#message-warning').html(msg);
                        $('#message-warning').fadeIn();
                    }

                },
                error: function () {

                    sLoader.fadeOut();
                    $('#message-warning').html("Something went wrong. Please try again.");
                    $('#message-warning').fadeIn();

                }

            });
        }

    });


    /*----------------------------------------------------- */
    /* Back to top
 ------------------------------------------------------- */
    var pxShow = 300; // height on which the button will show
    var fadeInTime = 400; // how slow/fast you want the button to show
    var fadeOutTime = 400; // how slow/fast you want the button to hide
    var scrollSpeed = 300; // how slow/fast you want the button to scroll to top. can be a value, 'slow', 'normal' or 'fast'

    // Show or hide the sticky footer button
    jQuery(window).scroll(function () {

        if (!($("#header-search").hasClass('is-visible'))) {

            if (jQuery(window).scrollTop() >= pxShow) {
                jQuery("#go-top").fadeIn(fadeInTime);
            } else {
                jQuery("#go-top").fadeOut(fadeOutTime);
            }

        }

    });

})(jQuery);