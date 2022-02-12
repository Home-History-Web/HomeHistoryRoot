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

            // fetchDataPromise = $.hh.data.getProperty({}).then(function (result) {
            //     objOptions.properties = result;
            // });

            objOptions.createPromise = $.when(markupPromise)
                .always(function () {
                    $.hh.hideProcessing();
                });
        },

        injectMarkup: function () {
            var objThis = this,
                objOptions = objThis.options;

            return $.get('/ui/propertyDetails.htm', function (markup) {
                objThis.element.append(markup);

                // Grab the hidden markup
                objOptions.$propOverview = $('#propOverview').removeAttr('id');
                objOptions.$propCalendar = $('#propCalendar').removeAttr('id');
                objOptions.$propRent = $('#propRent').removeAttr('id');
                objOptions.$propWorkOrders = $('#propWorkOrders').removeAttr('id');
                objOptions.$propReceipts = $('#propReceipts').removeAttr('id');
                objOptions.$propTenantPortal = $('#propTenantPortal').removeAttr('id');
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
            }).on('click', '.detail-calendar', function (evt) {
                // Load the Calendar
                objThis.loadCalendar();
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
                objThis.loadOverview();


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
                
                var elemOverview = objOptions.$propOverview.clone();

                elemOverview.find('.formatted-address').text(objOptions.property.formattedAddress);

                objThis.element
                .find('#divPropertyInfo').empty()
                .append(elemOverview);

            }
            catch (ex) {
                $.debug('error', 'Error in hh.propertyDetails.loadOverview', ex);
            }

        },

        loadCalendar: function() {
            var objThis = this,
                objOptions = objThis.options;

            try {
                $.debug('Started hh.propertyDetails.loadCalendar');
                
                var elemOverview = objOptions.$propCalendar.clone();

                objThis.element
                .find('#divPropertyInfo').empty()
                .append(elemOverview);
                                
                $('#divPropCalendar').kendoScheduler({
                    date: new Date("2022/01/01"),
                    startTime: new Date("2022/01/02 07:00 AM"),
                    height: 600,
                    views: [
                        { type: "day" },
                        { type: "workWeek" },
                        { type: "week" },
                        { type: "month" },
                        { type: "agenda", selected: true },
                        { type: "timeline", eventHeight: 50}
                    ],
                    timezone: "Etc/UTC",
                    dataSource: {
                        batch: true,
                        transport: {
                            read: function (e) {
                                e.success([
                                    {
                                       "TaskID":1,
                                       "OwnerID":1,
                                       "Title":"Fix Refrigerator",
                                       "Description":"",
                                       "StartTimezone":"Etc/UTC",
                                       "Start":"\/Date(1641160800000)\/",
                                       "End":"\/Date(1641160800000)\/",
                                       "EndTimezone":"Etc/UTC",
                                       "RecurrenceRule":null,
                                       "RecurrenceID":null,
                                       "RecurrenceException":null,
                                       "IsAllDay":true
                                    },
                                    {
                                       "TaskID":3,
                                       "OwnerID":3,
                                       "Title":"Fix Stove",
                                       "Description":"",
                                       "StartTimezone":"Etc/UTC",
                                       "Start":"2022-01-20T09:00:00",
                                       "End":"2022-01-20T10:00:00",
                                       "EndTimezone":"Etc/UTC",
                                       "RecurrenceRule":null,
                                       "RecurrenceID":null,
                                       "RecurrenceException":null,
                                       "IsAllDay":true
                                    }
                                ]);
                                // e.success(arryTasks);
                            },
                            update: {
                                url: "https://demos.telerik.com/kendo-ui/service/tasks/update",
                                dataType: "jsonp"
                            },
                            create: {
                                url: "https://demos.telerik.com/kendo-ui/service/tasks/create",
                                dataType: "jsonp"
                            },
                            destroy: {
                                url: "https://demos.telerik.com/kendo-ui/service/tasks/destroy",
                                dataType: "jsonp"
                            },
                            parameterMap: function(options, operation) {
                                if (operation !== "read" && options.models) {
                                    return {models: kendo.stringify(options.models)};
                                }
                            }
                        },
                        schema: {
                            model: {
                                id: "taskId",
                                fields: {
                                    taskId: { from: "TaskID", type: "number" },
                                    title: { from: "Title", defaultValue: "No title", validation: { required: true } },
                                    start: { type: "date", from: "Start" },
                                    end: { type: "date", from: "End" },
                                    // startTimezone: { from: "StartTimezone" },
                                    // endTimezone: { from: "EndTimezone" },
                                    description: { from: "Description" },
                                    recurrenceId: { from: "RecurrenceID" },
                                    recurrenceRule: { from: "RecurrenceRule" },
                                    // recurrenceException: { from: "RecurrenceException" },
                                    ownerId: { from: "OwnerID", defaultValue: 1 },
                                    isAllDay: { type: "boolean", from: "IsAllDay" }
                                }
                            }
                        },
                        filter: {
                            logic: "or",
                            filters: [
                                { field: "ownerId", operator: "eq", value: 1 },
                                { field: "ownerId", operator: "eq", value: 2 },
                                { field: "ownerId", operator: "eq", value: 3 }
                            ]
                        }
                    },
                    resources: [
                        {
                            field: "ownerId",
                            title: "Owner",
                            dataSource: [
                                { text: "Tim", value: 1, color: "#f8a398" },
                                { text: "Dave", value: 2, color: "#51a0ed" },
                                { text: "Landon", value: 3, color: "#56ca85" }
                            ]
                        }
                    ]
                });

            }
            catch (ex) {
                $.debug('error', 'Error in hh.propertyDetails.loadCalendar', ex);
            }

        },

        loadRent: function() {
            var objThis = this,
                objOptions = objThis.options;

            try {
                $.debug('Started hh.propertyDetails.loadRent');
                
                objThis.element
                .find('#divPropertyInfo').empty()
                .append(objOptions.$propRent);

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
                .find('#divPropertyInfo').empty()
                .append(objOptions.$propWorkOrders);

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
                .find('#divPropertyInfo').empty()
                .append(objOptions.$propReceipts);

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
                .find('#divPropertyInfo').empty()
                .append(objOptions.$propTenantPortal);

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