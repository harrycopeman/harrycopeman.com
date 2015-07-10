/*jslint browser: true */
/*global $ */

(function () {
    'use strict';

    var invisibleClassName = 'invisible',
        scrollWait = 10;

    function isInvisible(el) {
        var wh = $(window).height(),
            wt = $(window).scrollTop(),
            eh = $(el).height(),
            et = $(el).offset().top;
        return ((wh + wt) <= et || wt >= (et + eh));
    }

    function checkVisibleAll(elements) {
        elements.each(function () {
            $(this)[(isInvisible(this) ? 'add' : 'remove') + 'Class'](invisibleClassName);
        });
    }

    $.fn.visible = function () {
        var elements = this,
            scrollTimer = null;

        // Don't check too often
        function scrolled() {
            clearTimeout(scrollTimer);
            scrollTimer = setTimeout(function () {
                checkVisibleAll(elements);
            }, scrollWait);
        }

        // Onload
        checkVisibleAll(elements);

        $(window).bind("scroll resize", scrolled);
        return this;
    };
}());

$('.location:odd').visible();
$('.location:even').visible();

