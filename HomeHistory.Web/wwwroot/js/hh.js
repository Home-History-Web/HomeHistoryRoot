/*
    * hh  1.0
    * Copyright (c) 2021 TD Software
    * Date: 2022-01-01
    */

/*
    Ensure a console.log can be called in a consistent manner
*/
if (window.console && console.log && !console.log.apply) {
    // IE9 - console.log doesn't inherit from function.prototype
    //    http://stackoverflow.com/questions/5538972
    if (Function.prototype.bind && window.console && typeof console.log == "object") {
        [
            "log", "info", "warn", "error", "assert", "dir", "clear", "profile", "profileEnd"
        ].forEach(function (method) {
            console[method] = this.bind(console[method], console);
        }, Function.prototype.call);
    }
}
if (!window.console) {
    // IE9 and below - 'console' object doesn't exist until the dev tools are opened.
    window.console = {
        log: $.noop,
        info: $.noop,
        error: $.noop,
        warn: $.noop
    };
}

window.ENABLE_DEBUGGING = document.location.hostname === 'localhost' || /ENABLE_DEBUGGING/.test(location.search) || /^dev\./i.test(document.location.hostname);

(function ($) {
    'use strict';
    $.hh = {
        apiKey: '2b1e86b638620bf2404521e6e9e1b19e',     // The ATTOM api key
        isClientSideDebugging: function () {
            return window.ENABLE_DEBUGGING;
        },

        appInit: function (skipLogin) {
            $.debug('$.hh.appInit()');

            var deferred = $.Deferred();

            deferred.then(() => {
                $.hh.isAppInited = true;
                $.debug('$.hh.appInit() Done');

            });

            if ($.hh.isAppInited) {
                $.debug('$.hh.appInit() is initted');
                deferred.resolve();
            } else {
                $.hh.auth.restoreSavedAuthToken();

                $.when(
                    $.hh.dal.settings.fetchSystemSettings(),
                    $.hh.loadWidgetList()
                ).done(function () {
                    if (skipLogin) {
                        deferred.resolve();
                    } else {
                        $.hh.dal.user.getUserInfo().always(deferred.resolve);
                    }
                }).fail(function (result) {
                    $.debug('$.hh.appInit() rejected', result);
                    deferred.reject(result);
                });
            }

            return deferred.promise();
        }
    }; // end JQuery.hh namespace
})(jQuery);