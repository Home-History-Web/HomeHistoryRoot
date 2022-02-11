/*
    $('#divMainContent').reports({});

    $(':hh-reports').reports('option')

    This widget will be used to display a table of properties
*/

(function ($) {
    $.widget("hh.reports", {

        /*
            TEMPLATE: Put any publicly settable options here. Be careful to avoid 
            putting reference types here, each widget will get the same copy 
        */
        options: {
            propertyId: '',
            property: {},
            /*
                When set to true, will not create browser historiy entries
            */
            skipPushState: false
        },


        _create: function () {
            var objThis = this,
                objOptions = objThis.options,
                markupPromise,
                fetchDataPromise;

            $.debug("Started hh.reports._create()");

            /*
                Declare and document important variables that the widget 
                relies on for its internal state. 
            */

            /*
                userSettings is what our render function will use. It contains the 
                current set of filtered settings that will be rendered when 
                renderSettings() is called 
            */
            objOptions.properties = [];

            $.hh.showProcessing({
                text: "Processing..."
            });

            markupPromise = objThis.injectMarkup().then(function () {
                objThis.bindEvents();
            });

            fetchDataPromise = $.hh.data.getProperty({}).then(function (result) {
                objOptions.properties = result;
            });

            objOptions.createPromise = $.when(markupPromise, fetchDataPromise)
                .always(function () {
                    $.hh.hideProcessing();
                });
        },

        injectMarkup: function () {
            var objThis = this,
                objOptions = objThis.options;

            return $.get('/ui/reports.htm', function (markup) {
                objThis.element.append(markup);
            });
        },

        /*
            Set up any event handlers and child widgets
        */
        bindEvents: function () {
            var objThis = this,
                objOptions = objThis.options;

            $.debug("Started hh.reports.bindEvents");

        },


        _init: function () {
            $.debug("Started hh.reports._init");

            var objThis = this,
                objOptions = objThis.options;

            objOptions.createPromise.done(function () {
                objThis.loadProperty();


                /* 
                Trigger an init event

                var initEvent = $.Event("Init Complete", {
                    source: 'reports'
                });                
                objThis.element.trigger(initEvent);
                */
            });
        },

        loadProperty: function() {
            var objThis = this,
                objOptions = objThis.options;

            try {
                $.debug('Started hh.reports.loadProperty');
                
                objThis.element
                .find('.hh-property-details');

            }
            catch (ex) {
                $.debug('error', 'Error in hh.reports.loadProperty', ex);
            }

        },

        destroy: function () {
            try {
                $.debug('Started hh.reports.destroy');

                this.element
                    .off()
                    .empty();

                this._super();
            }
            catch (ex) {
                $.debug('error', 'Error in hh.reports.destroy', ex);
            }
        }

    });

})(jQuery);