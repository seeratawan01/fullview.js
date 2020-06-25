/*!
 * fullView 1.0.8
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
        this.mainView = $(views);
        this.views = $(views).children();

        this._name = fullView;

        this.currentView = 0;
        this.isScrolling = false;
        this.offsets = [];
        this.$dotsElement = null;
        this.$navbar = null;
        this.$anchors = {};
        this.lastY = null;
        this.lastX = null;

        this.init();
    }

    // Avoid FullView.prototype conflicts
    $.extend(FullView.prototype, {

        // Initialization logic
        init: function () {

            this.buildCache();
            this.utilites();
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

            if (this.options.navbar !== undefined && typeof this.options.navbar === 'string') {

                if ($(this.options.navbar).length) {
                    this.$navbar = $(this.options.navbar)
                }
            }

        },

        utilites: function () {
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
                if (this.$anchors.length) {
                    this.$anchors.removeClass('active').filter('[data-scroll="' + $view + '"]').addClass('active')
                }
            }

            this.scrollTo = function scrollTo($view) {

                var plugin = this;

                this.$htmlBody.stop(true).animate(
                    {
                        scrollTop: this.offsets[$view].offset
                    }, {
                    easing: this.options.easing === 'swing' ? 'swing' : 'linear',
                    duration: 350
                }).promise().then(function () {
                    plugin.changeActiveStatus($view);
                    if (plugin.isScrolling === true) {
                        setTimeout(function () {
                            plugin.isScrolling = false;
                        }, 800);
                    }
                    plugin.callback();
                });
            }

            this.scrollByWheel = function scrollByWheel(event) {

                // Check if Already scrolling
                if (!$(':animated').length && !this.isScrolling) {
                    this.isScrolling = true;
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
                if (this.currentView < this.$views.length - 1) {
                    this.currentView++;
                    this.scrollTo(this.currentView);
                }
                else if (this.currentView === this.$views.length - 1) {
                    this.isScrolling = false;
                    if (this.options.backToTop) {
                        this.isScrolling = true;
                        this.currentView = 0;
                        this.scrollTo(this.currentView);
                    }
                }
                return this;
            }

            this.scrollUp = function scrollUp() {

                if (this.currentView > 0) {
                    this.currentView--;
                    this.scrollTo(this.currentView);
                } else if (this.currentView === 0) {
                    this.isScrolling = false;
                }
                return this;
            }
        },

        settingUp: function () {
            var vh = this.$window.height();
            // var vw = this.$window.width();

            // Setting Viewport
            this.$views.css({
                height: vh,
                // width: vw
            });
            this.currentView = 0;
            this.isScrolling = false;
            document.body.scrollTop = 0;
            document.documentElement.scrollTop = 0;


            // Calculating Offsets
            this.offsets.splice(0, this.offsets.length)
            this.$views.each(function (i) {
                var anchor = this.$views.eq(i).attr('id');
                var viewOffset = this.$views.eq(i).offset().top;

                this.offsets.push({
                    position: i,
                    anchor: anchor,
                    offset: viewOffset
                })

            }.bind(this));


            // Setting Menu
            if (this.$navbar !== null) {
                var $menu = this.$navbar;
                var seletedAnchor = this.offsets.filter(function (obj) {
                    if (obj.anchor !== undefined) {
                        var $menuitem = $menu.find('a[href="#' + obj.anchor + '"]')
                        if ($menuitem.length) {
                            $menuitem.attr("data-scroll", obj.position)
                        }
                        return true;
                    }
                    return false; // skip
                }).map(function (obj) { return ("#" + obj.anchor); });

                var queryString = "a[href='" + seletedAnchor.join("'], a[href='") + "']";

                // Collecting All Nav Items
                this.$anchors = this.$navbar.find(queryString)

            }

            if (this.options.dots) {
                // Creating Dots
                this.$dotsElement = this.createDots();
            }

            // Check if any view active
            var $actview = this.$views.filter('[class="active"]');

            // this.$views.removeClass('active');
            if ($actview.length) {
                var offset = $actview.eq(0).offset().top;

                var activeData = this.offsets.filter(function (obj) {
                    return obj.offset === offset;
                })

                this.currentView = activeData[0].position;

                document.body.scrollTop = offset;
                document.documentElement.scrollTop = offset;
            }

            // Setting Initail Active Status
            this.changeActiveStatus(this.currentView);

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
                        plugin.currentView = $(this).attr("data-scroll");
                        plugin.scrollTo(plugin.currentView);
                    }
                }) : "";

            // On nav anchor click
            plugin.$anchors !== undefined && plugin.$anchors.length > 0 ?
                plugin.$anchors.on('click' + '.' + plugin._name, function (e) {
                    e.preventDefault();

                    if (!$(':animated').length) {
                        plugin.currentView = $(this).attr("data-scroll");
                        plugin.scrollTo(plugin.currentView);
                    }

                }) : ""

            // On MouseScroll
            plugin.$window.on('DOMMouseScroll mousewheel' + '.' + plugin._name, function (e) {
                plugin.scrollByWheel(e);
            });

            // On Keyboard Press
            plugin.options.keyboardScrolling ?
                plugin.$document.on('keydown' + '.' + plugin._name, function (e) {
                    // Check if Already scrolling
                    if (!$(':animated').length && !plugin.isScrolling) {
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
                }) : ""

            // On Touch Devices
            plugin.$views.on('touchstart' + '.' + plugin._name, function (e) {
                plugin.lastY = e.originalEvent.touches[0].clientY;
                plugin.lastX = e.originalEvent.touches[0].clientX;
            });

            plugin.$views.on('touchend' + '.' + plugin._name, function (e) {
                var currentY = e.originalEvent.changedTouches[0].clientY;
                var currentX = e.originalEvent.changedTouches[0].clientX;

                // if (e.target !== e.currentTarget) return;

                if (currentX < plugin.lastX) {
                    // Left
                    // console.log("left")
                } else if (currentX > plugin.lastX) {
                    // Right
                    // console.log("right")
                }

                if (plugin.lastY > currentY + 5) {
                    plugin.scrollDown();
                } else if (plugin.lastY < currentY - 5) {
                    plugin.scrollUp();
                }
            });

        },

        // Unbind events that trigger methods
        unbindEvents: function () {
            this.$window.off('.' + this._name);
            this.$document.off('.' + this._name);
            this.$views.off('.' + this._name);
        },

        callback: function () {
            // Cache onViewChange option
            var onViewChange = this.options.onViewChange;

            if (typeof onViewChange === 'function') {
                onViewChange(this.$views.eq(this.currentView));
            }
        }

    });

    $.fn.fullView = function (options) {

        if (options === undefined || typeof options === 'object') {
            return this.each(function () {
                if (!$.data(this, "plugin_" + fullView)) {
                    $.data(this, "plugin_" + fullView, new FullView(this, options));
                }
            })
        }

        return this;
    };

    $.fn.fullView.defaults = {
        //Navigation
        navbar: undefined,
        dots: true,
        dotsPosition: 'right',
        //Scrolling
        easing: 'linear',
        backToTop: false,
        // Accessibility
        keyboardScrolling: true,

        // Callback
        onViewChange: null
    };

})(jQuery, window, document);