/*
    $('#divMainContent').propertyDetails({});

    $(':hh-propertyDetails').propertyDetails('option')

    This widget will be used to display property details
*/

(function ($) {
    $.widget("hh.propertyDetails", {

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

            $.debug("Started hh.propertyDetails._create()");

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

            return $.get('/ui/propertyDetails.htm', function (markup) {
                objThis.element.append(markup);
            });
        },

        /*
            Set up any event handlers and child widgets
        */
        bindEvents: function () {
            var objThis = this,
                objOptions = objThis.options;

            $.debug("Started hh.propertyDetails.bindEvents");
            
            objThis.element.on('click', '.detail-overview', function (evt) {
                // Load the Overview
                objThis.loadOverview();
            }).on('click', '.detail-schedule', function (evt) {
                // Load the Schedule
                objThis.loadSchedule();
            }).on('click', '.detail-rent', function (evt) {
                // Load the Rent
                objThis.loadRent();
            }).on('click', '.detail-work-orders', function (evt) {
                // Load the Overview
                objThis.loadWorkOrders();
            }).on('click', '.detail-receipts', function (evt) {
                // Load the Overview
                objThis.loadReceipts();
            }).on('click', '.detail-tenant-portal', function (evt) {
                // Load the Overview
                objThis.loadTenantPortal();
            });
        },


        _init: function () {
            $.debug("Started hh.propertyDetails._init");

            var objThis = this,
                objOptions = objThis.options;

            objOptions.createPromise.done(function () {
                objThis.loadProperty();


                /* 
                Trigger an init event

                var initEvent = $.Event("Init Complete", {
                    source: 'propertyDetails'
                });                
                objThis.element.trigger(initEvent);
                */
            });
        },

        loadOverview: function() {
            var objThis = this,
                objOptions = objThis.options;

            try {
                $.debug('Started hh.propertyDetails.loadOverview');
                
                objThis.element
                .find('#divPropertyInfo').text("Overview");

            }
            catch (ex) {
                $.debug('error', 'Error in hh.propertyDetails.loadOverview', ex);
            }

        },

        loadSchedule: function() {
            var objThis = this,
                objOptions = objThis.options;

            try {
                $.debug('Started hh.propertyDetails.loadSchedule');
                
                objThis.element
                .find('#divPropertyInfo').text("Schedule");

            }
            catch (ex) {
                $.debug('error', 'Error in hh.propertyDetails.loadSchedule', ex);
            }

        },

        loadRent: function() {
            var objThis = this,
                objOptions = objThis.options;

            try {
                $.debug('Started hh.propertyDetails.loadRent');
                
                objThis.element
                .find('#divPropertyInfo').text("Rent");

            }
            catch (ex) {
                $.debug('error', 'Error in hh.propertyDetails.loadRent', ex);
            }

        },

        loadWorkOrders: function() {
            var objThis = this,
                objOptions = objThis.options;

            try {
                $.debug('Started hh.propertyDetails.loadWorkOrders');
                
                objThis.element
                .find('#divPropertyInfo').text("Work Orders");

            }
            catch (ex) {
                $.debug('error', 'Error in hh.propertyDetails.loadWorkOrders', ex);
            }

        },

        loadReceipts: function() {
            var objThis = this,
                objOptions = objThis.options;

            try {
                $.debug('Started hh.propertyDetails.loadReceipts');
                
                objThis.element
                .find('#divPropertyInfo').text("Receipts");

            }
            catch (ex) {
                $.debug('error', 'Error in hh.propertyDetails.loadReceipts', ex);
            }

        },

        loadTenantPortal: function() {
            var objThis = this,
                objOptions = objThis.options;

            try {
                $.debug('Started hh.propertyDetails.loadTenantPortal');
                
                objThis.element
                .find('#divPropertyInfo').text("Tenant Portal");

            }
            catch (ex) {
                $.debug('error', 'Error in hh.propertyDetails.loadTenantPortal', ex);
            }

        },

        destroy: function () {
            try {
                $.debug('Started hh.propertyDetails.destroy');

                this.element
                    .off()
                    .empty();

                this._super();
            }
            catch (ex) {
                $.debug('error', 'Error in hh.propertyDetails.destroy', ex);
            }
        }

    });

})(jQuery);