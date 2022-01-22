/*
    $('#divMainContent').widgetTemplate({});

    $(':hh-widgetTemplate').widgetTemplate('option')

    TEMPLATE: Here's a short explanation about what this widget does
*/

(function ($) {
    $.widget("hh.widgetTemplate", {

        /*
            TEMPLATE: Put any publicly settable options here. Be careful to avoid 
            putting reference types here, each widget will get the same copy 
        */
        options: {
            propertyId: '',

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

            $.debug("Started hh.widgetTemplate._create()");

            /*
                TEMPLATE - Declare and document important variables that the widget 
                relies on for its internal state. 
            */

            /*
                userSettings is what our render function will use. It contains the 
                current set of filtered settings that will be rendered when 
                renderSettings() is called 
            */
            objOptions.userSettings = [];

            /*
                The full set of settings that will be used to filter when the search or 
                filter critera changes.
            */
            objOptions.allUserSettings = [];



            $.hh.showProcessing({
                text: "Processing..."
            });

            markupPromise = objThis.injectMarkup().then(function () {
                objThis.bindEvents();
            });

            fetchDataPromise = $.hh.dal.postResource({
                resource: "UserSettings"
            }).then(function (result) {
                objOptions.allUserSettings = result.data;
            });

            objOptions.createPromise = $.when(markupPromise, fetchDataPromise)
                .always(function () {
                    $.hh.hideProcessing();
                });
        },

        injectMarkup: function () {
            var objThis = this,
                objOptions = objThis.options;

            return $.get('/ui/widgetTemplate.htm', function (markup) {
                objThis.element.append(markup);

                // This element is used to present a panel / group of settings
                objOptions.$settingGroupPanel = $('#settingGroupPanel').removeAttr('id');

            });

        },

        /*
            Set up any event handlers and child widgets
        */
        bindEvents: function () {
            var objThis = this,
                objOptions = objThis.options;

            $.debug("Started hh.widgetTemplate.bindEvents");

            objThis.element
                .find('.search-text')
                .on('keyup', function () {
                    objThis.searchChanged();
                })
                .end()
                .find('.action-button')
                .on('click', function () {
                    objThis.navigateToChildWidget($(this));
                });

            objThis.element
                .find('.some-example')
                .datepicker()
                .end()
                .find('#widgetTemplateInfoIcon')
                .infoTooltip({
                    $content: $('.info-icon-content'),
                    title: 'Widget Template'
                })
                .end()

            objThis.element.on('click', '.some-row', function (evt) {
            
            });

        },


        _init: function () {
            $.debug("Started hh.widgetTemplate._init");

            var objThis = this,
                objOptions = objThis.options;

            objOptions.createPromise.done(function () {
                objThis.searchChanged();


                /* 
                TEMPLATE - Trigger an init event

                var initEvent = $.Event("Init Complete", {
                    source: 'widgetTemplate'
                });                
                objThis.element.trigger(initEvent);
                */
            });
        },

        destroy: function () {
            try {
                $.debug('Started hh.widgetTemplate.destroy');

                this.element
                    .off()
                    .empty();

                this._super();
            }
            catch (ex) {
                $.debug('error', 'Error in hh.widgetTemplate.destroy', ex);
            }
        }

    });

})(jQuery);