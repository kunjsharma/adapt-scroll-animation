/*
 * adapt-scroll-animation
 * License - 
 * Maintainers - Kunj B Sharma <kunjsharma@askillt.com>
 */
define(function (require) {
    var ComponentView = require('coreViews/componentView');
    var Adapt = require('coreJS/adapt');
    var Handlebars = require('handlebars');
    var ScrollAnimation = ComponentView.extend({
        events: {
            'focus .mcq-item input':'onItemFocus',
            'inview': 'onInview',
        },
        vars: {
            canvasH: 0,
            canvasW: 0,
            screenH: 0,
            screenW: 0,
            objStartX: 0,
            objStartY: 0,
            objEndX: 0,
            objEndY: 0,
            scrollX: 0,
            scrollY: 0
        },
        preRender: function () {
            this.listenTo(Adapt, {
                'device:resize': this.resizeControl
            });
        },
        postRender: function () {
            this.setReadyStatus();
            if (this.model.get('_animation') == false) {
                this.$(".scroll-animation-item-frame").css({
                    "opacity": 1
                });
                this.setCompletionStatus();
                return;
            }
            var _oScoLevel0 = this, _nDelay = Number(this.model.get('_delay')), _bIsIE8 = $('html').hasClass('ie8') || $('html').hasClass('ie7');
            this.$(".scroll-animation-widget").bind('inview', function (event, visible) {
                if (visible == true) {
                    if (_bIsIE8) {
                        _oScoLevel0.$(".scroll-animation-item-frame img").css({
                            "opacity": "1",
                            "position": "absolute"
                        });
                        _oScoLevel0.setCompletionStatus();
                        return;
                    } else {
                        var _eItem = $(this).find('.scroll-animation-item');
                        //var _eItem = $('.scroll-animation-item');
                        var slideCount = _eItem.length;
                        _eItem.each(function (index) {
                            var _oScoLevel1 = this;
                            $(this).children(".scroll-animation-item-text").delay(_nDelay * index).animate({
                                opacity: 1
                            }, 500, function () {
                                $(_oScoLevel1).children(".scroll-animation-item-frame").delay(50).animate({
                                    opacity: 1
                                }, 500, function () {
                                    if (index == (slideCount - 1)) {
                                        _oScoLevel0.setCompletionStatus();
                                    }
                                });
                            });
                        });
                    }
                }
            });
        },
        onInview: function(event, visible, visiblePartX, visiblePartY, percentFromTop, percentFromLeft) {
            if (!visible) return;
            console.log('percentFromTop ', percentFromTop);
            //console.log('percentFromLeft ', percentFromLeft);
        
            if(percentFromTop>0) {
                //this.$('.scroll-animation-item').eq(6).css('top', (percentFromTop*2) + '%');
                //this.$('.scroll-animation-item').eq(6).animate({top: (percentFromTop*2) + '%'}, 100, function() {
                    //callback
                //});
                //this.$('.scroll-animation-item').eq(6).css('left', (percentFromTop*2) + '%');
                //this.$('.scroll-animation-item').eq(6).animate({left: (percentFromTop*2) + '%'}, 100, function() {
                    //callback
                //});

                //Bottom to top
                this.$('.scroll-animation-item').eq(6).animate({left: (percentFromTop*2) + '%', top: (percentFromTop*2) + '%'}, 100, function() {
                    //callback
                });
                //Rotate
                //this.$('.scroll-animation-item img').eq(6).css({'transform' : 'rotate('+ percentFromTop*6 +'deg)'});
            }
            
            
        },
        resizeControl: function() {
            this.vars.canvasW = this.$('.component-inner').innerWidth();
            this.vars.canvasH = this.$('.component-inner').innerHeight();
            this.vars.screenW = $(document).height();
            this.vars.screenH = $(document).width();
            console.log('canvasH' + this.vars.canvasH);
            console.log('canvasW' + this.vars.canvasW);
        }
    });
    Adapt.register("scroll-animation", ScrollAnimation);
});
