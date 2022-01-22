(function ($) {

    // Extend the hh class/namespace
    $.extend($, {
        /** Define a method for logging to the console */
        logToConsole: function (msg) {
            // Is a console defined?

            if (window.console && console.log) {
                var isChrome = navigator.userAgent.indexOf("Chrome") !== -1;
                if (isChrome) {
                    try {
                        var stack = new Error().stack;
                        var callingFile = stack.split("\n")[2];
                        var url = callingFile.split("(")[1];
                        url = url.substring(0, url.length - 1);
                        var urlparts = url.split("/");
                        var file = urlparts[urlparts.length - 1];
                        //var line = stack.split("\n")[2].split(":")[5];
                        //var append = file + ":" + line;
                        console.log(msg, url);
                    } catch (ex) {
                        console.log(msg);
                    }
                } else {
                    console.log(msg);
                }

            }
        },
        
        /*
         This function is used to validate a string representing an email address
         It will return a boolean
         */
        isEmail: function (email) {
            var regex = /^[a-zA-Z0-9.!#$%&'*+\/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)*$/;
            return regex.test(email);
        },
        isInArray: function (value, array) {
            return -1 != jQuery.inArray(value, array);
        },
        debug: function () {
            var updatedArguments,
                remainingArguments,
                logType = (arguments[0] || '').toLowerCase(),
                messageCSS = {
                    error: 'color: #FF4136;',
                    info: 'color: #0074D9;',
                    warn: 'color: #FF851B;'
                },
                strMessage = '',
                messageType,
                css;

            if (logType === 'error') {
                new PNotify({
                    title: 'Oops!',
                    text: 'Something went wrong, please try again.',
                    type: 'warning',
                    delay: 2000
                });
                var myException;
                try {
                    //have to throw to get the stack trace so we know what when where how we got an error
                    throw new Error('$.debug() error - ');
                } catch (ex) {
                    myException = ex;
                }

                var errormsg = '$.debug() error - ';
                
                if (arguments.length > 1 && typeof (arguments[1]) === "string") {
                    errormsg = errormsg + arguments[1];
                }

                //##################################
                // Log App Insights Exception
                //##################################

                // 1 = Critical; 2 = Warning
                myException.severityLevel = 1;

                if (arguments.length > 2 && typeof (arguments[2]) === "object" && arguments[2].name) {
                    myException.name = arguments[2].name;
                }

                if (arguments.length > 2 && typeof (arguments[2]) === "object" && arguments[2].message) {
                    myException.message = arguments[2].message;
                }

                if (arguments.length > 2 && typeof (arguments[2]) === "object" && arguments[2].properties) {
                    myException.properties = arguments[2].properties;
                }

                //##################################
                // END Log App Insights Exception
                //##################################
            }

            if (!$.hh.isClientSideDebugging()) {
                return;
            }

            if (!console || !console.log) {
                // IE < 10 doesn't have a console unless the dev tools are open, because that makes sense
                return;
            }

            if (navigator.vendor !== 'Google Inc.') {
                console.log.apply(console, arguments);
                return;
            }

            // clone arguments array because it's immutable
            remainingArguments = Array.prototype.slice.call(arguments, 0);

            // try {
            //     // Pull out line 3 of the stack trace, will contain the function that called this one.
            //     var calledFrom = new Error().stack.split('\n')[2];
            //     // Replace everything but the fileName + line number
            //     remainingArguments.push(calledFrom.substring(calledFrom.indexOf('(')));
            // } catch (e) { }

            if (!messageCSS[logType]) {
                // No CSS defined for log type
                console.log.apply(console, remainingArguments);
                return;
            }

            messageType = remainingArguments.shift();
            css = messageCSS[messageType];

            if (typeof remainingArguments[0] === 'string') {
                strMessage = remainingArguments.shift();
            }

            console.log.apply(console, ['%c' + messageType + '%c ' + strMessage, css, 'color: inherit;'].concat(remainingArguments));
        },


        /*
            Converts a javascript object into a query string with the values URI encoded.
            Will not correctly handle values that are objects or arrays:

            Example: 

            input:
                {
                    a: 1234,
                    b: "example"
                }

            output: 
                '?a=1234&b=example'

        */
        getQueryStringForObject: function (obj) {
            var parms = _(obj)
                .map(function (value, key) {
                    if (/(string|number|boolean)/.test(typeof value)) {
                        return '' + key + '=' + encodeURIComponent(value);
                    }
                    return '';
                })
                .compact()
                .value();

            return '?' + parms.join('&');
        },


        /*
            Returns an object containing the variables present in the query string.     
        
            options = {        
                // URI Decode value portion of query string variables
                decodeParams: false,
        
                // Lowercase query string variable names
                lcaseParamNames: false                    
            }
        */
        getQueryStringParms: function (options) {
            var queryString = location.search.split('&'),
                params = {},
                defaults = {
                    decodeParms: true,
                    lcaseParamNames: false
                };

            var objOptions = $.extend(defaults, options);

            _.forEach(queryString, function (string) {
                var parts = string.split('='),
                    paramName = parts[0].replace(/^\?/gi, ''),
                    value = parts[1];

                if (objOptions.lcaseParamNames) {
                    paramName = paramName.toLowerCase();
                }

                if (objOptions.decodeParms) {
                    try {
                        value = decodeURIComponent(value);
                    } catch (e) {
                        console.error(e)
                        // Do Nothing
                    }
                }

                if (value === 'true') {
                    value = 1;
                }
                if (value === 'false') {
                    value = 0;
                }
                if (/^(null|undefined)$/i.test(value)) {
                    return;
                }


                if (params[paramName]) {
                    // Duplicate names in query string, store as array.            
                    if (Array.isArray(params[paramName])) {
                        params[paramName].push(value);
                    } else {
                        var prevValue = params[paramName];
                        params[paramName] = [prevValue, value];
                    }
                } else {
                    params[paramName] = value;
                }

            });

            return params;
        }
    });

    /**
     * Will return a boolean based on the variable passed in
     */
    $.isNumber = function (n) {
        // $.logToConsole('In isNumber');
        return !isNaN(parseFloat(n)) && isFinite(n);
    };

    $.escapeHTML = function (str) {
        var div = document.createElement('div');
        div.appendChild(document.createTextNode(str));
        return div.innerHTML;
    };

    $.fn.extend({
        makeIdsUnique: function (suffix) {
            return this.each(function () {
                return $(this).find('*[id]')
                    .each(function (index, element) {
                        var $this = $(this),
                            thisID = $this.prop('id');

                        $this.prop('id', thisID + suffix);
                        $this.addClass('thisID');
                    })
                    .end()
                    .find('*[for]')
                    .each(function (index, element) {
                        var $this = $(this);
                        $this.prop('for', $this.prop('for') + suffix);

                    })
                    .end();
            });
        }
    });

    $.fn.extend({
        destroyWidget: function () {
            var matchCTMWidget = /^hh/,
                objThis = this,
                widgets = objThis.data() || {};

            $.each(widgets, function (key, value) {
                if (!matchCTMWidget.test(key)) {
                    return;
                }

                if (typeof widgets[key].destroy === 'function') {
                    widgets[key].destroy();
                }
            });
            return this;
        }
    });

    // Lodash - v4 make the .forEach call chainable
    _.mixin({
        forEach: function (o, i, c) {
            _.each(o, i, c);
            return o;
        }



    });
    /**
    * Deep diff between two object, using lodash
    * @param  {Object} object Object compared
    * @param  {Object} base   Object to compare with
    * @return {Object}        Return a new object who represent the diff

    Copied from: https://gist.github.com/Yimiprod/7ee176597fef230d1451

    Example
        _.dataDelta({"a":"a", "b":"2"}, {"a":"a", "b":"3"}) 
 
        // {b: "2"}
*/
    _.dataDelta = function difference (object, base) {
        function changes (object, base) {
            return _.transform(object, function (result, value, key) {
                if (!_.isEqual(value, base[key])) {
                    result[key] = (_.isObject(value) && _.isObject(base[key])) ? changes(value, base[key]) : value;
                }
            });
        }
        return changes(object, base);
    };

    /*
        We have replaced PNotify with toastr. This will create a "fake" PNotify 
        object that will translate the call to toastr instead, saving us from 
        updating everwhere in the code we're creating a PNotify notification.
    */         
    window.PNotify = function PNotify(options) {
        var objOptions = {
                type: 'success',
                text: 'Success!',
                position: 'toast-top-right',
                delay: 5000
            },
            matches;        

        /*
            If title indicates what type of alert to show, and type is not supplied, use title
        */
        if (!options.type && !!options.title) {
            matches = options.title.toLowerCase().match(/(success|warning|error|notice|info)/);
            if(matches){
                options.type = matches[0];
            }
        }
        
        /*
            toastr does not have a 'notice' type, convert to 'info'
        */
        if(/notice/i.test(options.type)){
            options.type = 'info';
        }


        $.extend(objOptions, options);

        toastr.options = {
            "closeButton": false,
            "debug": false,
            "newestOnTop": false,
            "progressBar": true,
            "positionClass": objOptions.position,
            "preventDuplicates": false,
            "onclick": null,
            "showDuration": "300",
            "hideDuration": "1000",
            "timeOut": objOptions.delay,
            "extendedTimeOut": "1000",
            "showEasing": "swing",
            "hideEasing": "linear",
            "showMethod": "fadeIn",
            "hideMethod": "fadeOut"
        };

        toastr[objOptions.type](objOptions.text, objOptions.title);
    };

})(jQuery);