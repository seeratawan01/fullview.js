/*!
 * fullPage 1.0.1
 * https://github.com/seeratawan01/fullview.js
 *
 * @license GPLv3 for open source use only
 *
 * Copyright (C) 2020 https://github.com/seeratawan01/fullview.js/blob/master/LICENSE
 */
; (function ($, window, document, undefined) {

    var fullView = 'fullViewJS';

    // Create the plugin constructor
    function FullView(views, options) {
        this._defaults = $.fn.fullView.defaults;

        this.options = $.extend({}, this._defaults, options);

        this.views = views.children();
        this._name = fullView;

        this.init();
    }

    // Avoid FullView.prototype conflicts
    $.extend(FullView.prototype, {

        // Initialization logic
        init: function () {

            this.buildCache();
            this.Utilites();
            this.settingUp();
            this.bindEvents();
        },

        // Remove plugin instance completely
        destroy: function () {
            this.unbindEvents();
            this.$views.removeData();
        },

        // Cache DOM nodes for performance
        buildCache: function () {

            this.$window = $(window);
            this.$document = $(document);
            this.$htmlBody = $("html, body");

            this.$views = $(this.views);
            this.$currentView;
            this.$isScrolling;
            this.offsets = [];
            this.$dotsElement = null;
            this.ts;
        },

        Utilites: function () {
            this.createDots = function createDots() {
                var $dots = $("#fv-dots");
                if ($dots.length) {
                    $dots.remove();
                }
                var div = $("<div>").attr("id", "fv-dots").append('<ul>');
                this.$views.each(function (i) {
                    div.find('ul').append('<li><a data-scroll="' + i + '" href="#" class=""><span></span></a></li>')
                });
                if (this.options.dotsPosition !== 'right') {
                    div.css({
                        left: '4%'
                    });
                }

                $('body').append(div);

                return div.find('a');
            };

            this.changeActiveStatus = function changeActiveStatus($view) {
                this.$views.removeClass('active').eq($view).addClass('active');
                if (this.options.dots) {
                    this.$dotsElement.removeClass('active').eq($view).addClass('active')
                }
            }

            this.scrollTo = function scrollTo($view) {

                var plugin = this;

                this.$htmlBody.stop(true).animate(
                    {
                        scrollTop: this.offsets[$view]
                    }, {
                    easing: this.options.easing === 'swing' ? 'swing' : 'linear',
                    duration: 350
                }).promise().then(function () {
                    plugin.changeActiveStatus($view);
                    if (plugin.$isScrolling === true) {
                        setTimeout(function () {
                            plugin.$isScrolling = false;
                        }, 800);
                    }
                    plugin.callback();
                });


            }

            this.scrollByWheel = function scrollByWheel(event) {

                // Check if Already scrolling
                if (!$(':animated').length && !this.$isScrolling) {
                    this.$isScrolling = true;
                    if (event.originalEvent.wheelDelta > 0 || event.originalEvent.detail < 0) {
                        // scroll up
                        this.scrollUp();
                    }
                    else {
                        // scroll down
                        this.scrollDown();
                    }
                }
            }

            this.scrollDown = function scrollDown() {
                if (this.$currentView < this.$views.length - 1) {
                    this.$currentView++;
                    this.scrollTo(this.$currentView);
                }
                else if (this.$currentView === this.$views.length - 1) {
                    this.$isScrolling = false;
                }
                return this;
            }

            this.scrollUp = function scrollUp() {

                if (this.$currentView > 0) {
                    this.$currentView--;
                    this.scrollTo(this.$currentView);
                } else if (this.$currentView === 0) {
                    this.$isScrolling = false;
                }
                return this;
            }
        },

        settingUp: function () {
            var vh = this.$window.height();
            var vw = this.$window.width();

            // Setting Viewport
            this.$views.css({
                height: vh,
                width: vw
            });
            this.$currentView = 0;
            this.$isScrolling = false;
            this.$views.removeClass('active');

            // Stick to the top 
            document.body.scrollTop = 0;
            document.documentElement.scrollTop = 0;

            // Calculating Offsets
            this.offsets.splice(0, this.offsets.length)
            this.$views.each(function (i) {
                var viewOffset = this.$views.eq(i).offset().top;
                this.offsets.push(viewOffset);
            }.bind(this));


            if (this.options.dots) {
                // Creating Dots
                this.$dotsElement = this.createDots();
            }

            // Setting Initail Active Status
            this.changeActiveStatus(this.$currentView);

        },

        // Bind events that trigger methods
        bindEvents: function () {
            var plugin = this;

            // On Window Resize
            plugin.$window.on('resize' + '.' + plugin._name, plugin.settingUp.bind(plugin));

            // On Dot Click
            plugin.$dotsElement !== null ?
                plugin.$dotsElement.on('click' + '.' + plugin._name, function (e) {
                    e.preventDefault();
                    if (!$(':animated').length) {
                        plugin.$currentView = $(this).attr("data-scroll");
                        plugin.scrollTo(plugin.$currentView);
                        // console.log(plugin.$currentView)
                    }
                }) : "";

            // On MouseScroll
            plugin.$window.on('DOMMouseScroll mousewheel' + '.' + plugin._name, function (e) {
                plugin.scrollByWheel(e);
            });

            // On Keyboard Press
            plugin.$document.on('keydown' + '.' + plugin._name, function (e) {
                // Check if Already scrolling
                if (!$(':animated').length && !plugin.$isScrolling) {
                    var code = (e.keyCode ? e.keyCode : e.which);
                    switch (code) {
                        case 40: // Down key
                            plugin.scrollDown();
                            break;
                        case 32: // Space Bar
                            plugin.scrollDown();
                            break;
                        case 38: // Up key
                            plugin.scrollUp();
                            break;
                        case 33: // Page up key
                            plugin.scrollUp();
                            break;
                        case 34: // Page down key
                            plugin.scrollDown();
                            break;
                    }
                }
            });

            // On Touch Devices
            plugin.$document.bind('touchstart' + '.' + plugin._name, function (e) {
                plugin.ts = e.originalEvent.touches[0].clientY;
            });

            plugin.$document.bind('touchend' + '.' + plugin._name, function (e) {
                var te = e.originalEvent.changedTouches[0].clientY;
                if (plugin.ts > te) {
                    plugin.scrollDown();
                } else {
                    plugin.scrollUp();
                }
            });

        },

        // Unbind events that trigger methods
        unbindEvents: function () {
            this.$window.off('.' + this._name);
            this.$document.off('.' + this._name);
        },


        callback: function () {
            // Cache onViewChange option
            var onViewChange = this.options.onViewChange;

            if (typeof onViewChange === 'function') {
                onViewChange(this.$views.eq(this.$currentView));
            }
        }

    });

    $.fn.fullView = function (options) {

        if (!$.data(this, "plugin_" + fullView)) {
            $.data(this, "plugin_" + fullView, new FullView(this, options));
        }

        return this;
    };

    $.fn.fullView.defaults = {
        dots: true,
        dotsPosition: 'right',
        easing: 'swing',

        onViewChange: null
    };

})(jQuery, window, document);