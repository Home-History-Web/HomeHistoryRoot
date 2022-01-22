/*
    $('#divMainContent').propertyLookup({});

    $(':hh-propertyLookup').propertyLookup('option')

    This widget will be used to lookup an address
*/

(function ($) {
    $.widget("hh.propertyLookup", {

        /*
            Put any publicly settable options here. Be careful to avoid 
            putting reference types here, each widget will get the same copy 
        */
        options: {
            line1: '',

            /*
                When set to true, will not create browser historiy entries
            */
            skipPushState: false
        },


        _create: function () {
            var objThis = this,
                objOptions = objThis.options,
                markupPromise;

            $.debug("Started hh.propertyLookup._create()");

            /*
                Declare and document important variables that the widget 
                relies on for its internal state. 
            */

            $.hh.showProcessing({
                text: "Processing..."
            });

            markupPromise = objThis.injectMarkup().then(function () {
                objThis.bindEvents();
            });

            objOptions.createPromise = $.when(markupPromise)
                .always(function () {
                    $.hh.hideProcessing();
                });
        },

        injectMarkup: function () {
            var objThis = this,
                objOptions = objThis.options;

            return $.get('/ui/propertyLookup.htm', function (markup) {
                objThis.element.append(markup);

            });

        },

        /*
            Set up any event handlers and child widgets
        */
        bindEvents: function () {
            var objThis = this,
                objOptions = objThis.options;

            $.debug("Started hh.propertyLookup.bindEvents");

            objThis.element.on('click', '.btn-add-property', function (evt) {
                $.hh.data.addProperty({
                    "line1":$('#line1').val(),
                    "line2":$('#line2').val(),
                    "city":$('#city').val(),
                    "state":$('#state').val(),
                    "zip":$('#zip').val(),
                    "formattedAddress":$('#formattedAddress').html().replace(/<br\s*[\/]?>/gi, "\n")
                }).then(function(property) {
                    // Load the property table widget
                    objThis.destroy();
                    
                    $('#divMainContent').propertyTable();
                });  
            });       

            objThis.element.on('click', '.btn-cancel', function (evt) {
                objThis.destroy();

                $('#divMainContent').propertyTable();
            });
        },


        _init: function () {
            $.debug("Started hh.propertyLookup._init");

            var objThis = this,
                objOptions = objThis.options;

            objOptions.createPromise.done(function () {
                
            });
        },

        destroy: function () {
            try {
                $.debug('Started hh.propertyLookup.destroy');

                this.element
                    .find('#line1').off().empty().end()
                    .find('#line2').off().empty().end()
                    .find('#city').off().empty().end()
                    .find('#state').off().empty().end()
                    .find('#zip').off().empty().end()
                    .find('#formattedAddress').off().empty().end();

                this.element
                    .off()
                    .empty();

                this._super();
            }
            catch (ex) {
                $.debug('error', 'Error in hh.propertyLookup.destroy', ex);
            }
        }

    });

})(jQuery);