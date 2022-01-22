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
        emailAddress: '',
        accessToken: '',
        properties: [],
        apiKey: '2e860cf042da5b0105d53b4fbe445709',     // The ATTOM api key
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
        },
        

        /*
            Shows a modal pop up with a spinner

            options = {
                // The label at the top of the pop up
                title: '',

                // The content in the center of the pop up
                text: '',

                // Controls the visibility of the progress bar
                showProgress: false,

                // A number between 0 and 100, the progress bar will appear this % filled
                // values less than zero produce an indeterminate progress bar that is constantly processing
                progressValue: 20
            }
         */
            showProcessing: function (options) {
                const objThis = this;
    
                try {
                    $.debug("Started hh.showProcessing()");    
    
                    var defaults = {
                        text: "Processing... Please Wait",
                        target: document.body
                    },
                        objOptions = $.extend(defaults, options);
    
                    //customize the default "Loading..." text
                    kendo.ui.progress.messages = {
                        loading: objOptions.text
                    };
                       
                    $.hh.isProcessing = true;
    
                    var element = $(objOptions.target);

                    kendo.ui.progress(element, true);
                }
                catch (ex) {
                    $.debug('error', 'Exception caught in hh.showProcessing', ex);
                }
            },

        /*
            Shows a modal pop up with a spinner

            options = {
                // The label at the top of the pop up
                title: '',

                // The content in the center of the pop up
                text: '',

                // Controls the visibility of the progress bar
                showProgress: false,

                // A number between 0 and 100, the progress bar will appear this % filled
                // values less than zero produce an indeterminate progress bar that is constantly processing
                progressValue: 20
            }
         */
            hideProcessing: function (options) {
                const objThis = this;
    
                try {
                    $.debug("Started hh.hideProcessing()");    
    
                    var defaults = {
                        target: document.body
                    },
                        objOptions = $.extend(defaults, options);
            
                    var element = $(objOptions.target);

                    kendo.ui.progress(element, false);
                }
                catch (ex) {
                    $.debug('error', 'Exception caught in hh.hideProcessing', ex);
                }
            }
    }; // end JQuery.hh namespace
})(jQuery);