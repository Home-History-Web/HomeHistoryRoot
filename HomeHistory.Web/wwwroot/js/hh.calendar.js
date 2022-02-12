/*
    $('#divMainContent').calendar({});

    $(':hh-calendar').calendar('option')

    This widget will be used to display a calendar
*/

(function ($) {
    $.widget("hh.calendar", {

        /*
            TEMPLATE: Put any publicly settable options here. Be careful to avoid 
            putting reference types here, each widget will get the same copy 
        */
        options: {
            schedulerTasks: [
                {
                   "TaskID":1,
                   "OwnerID":1,
                   "Title":"Fix Refrigerator",
                   "Description":"",
                   "StartTimezone":null,
                   "Start":"\/Date(1641160800000)\/",
                   "End":"\/Date(1641160800000)\/",
                   "EndTimezone":null,
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
                   "StartTimezone":null,
                   "Start":"2022-01-20T09:00:00",
                   "End":"2022-01-20T10:00:00",
                   "EndTimezone":null,
                   "RecurrenceRule":null,
                   "RecurrenceID":null,
                   "RecurrenceException":null,
                   "IsAllDay":true
                },
                {
                   "TaskID":2,
                   "OwnerID":2,
                   "Title":"General Maintenance",
                   "Description":"",
                   "StartTimezone":null,
                   "Start":"\/Date(1370284200000)\/",
                   "End":"\/Date(1370289600000)\/",
                   "EndTimezone":null,
                   "RecurrenceRule":"FREQ=WEEKLY;BYDAY=MO,WE,FR",
                   "RecurrenceID":null,
                   "RecurrenceException":null,
                   "IsAllDay":false
                }
            ],

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

            $.debug("Started hh.calendar._create()");

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

            // fetchDataPromise = $.hh.data.getProperties({}).then(function (result) {
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

            return $.get('/ui/calendar.htm', function (markup) {
                objThis.element.append(markup);
            });
        },

        /*
            Set up any event handlers and child widgets
        */
        bindEvents: function () {
            var objThis = this,
                objOptions = objThis.options;

            $.debug("Started hh.calendar.bindEvents");

        },


        _init: function () {
            $.debug("Started hh.calendar._init");

            var objThis = this,
                objOptions = objThis.options;

            objOptions.createPromise.done(function () {
                objThis.loadCalendar();


                /* 
                Trigger an init event

                var initEvent = $.Event("Init Complete", {
                    source: 'calendar'
                });                
                objThis.element.trigger(initEvent);
                */
            });
        },

        loadCalendar: function () {
            var objThis = this,
                objOptions = objThis.options;

            try {
                $.debug('Started hh.calendar.loadCalendar');

                var objCalendar = objThis.element.find('#hhCalendar');

                $('#hhCalendar').kendoScheduler({
                    date: new Date("2022/1/1"),
                    startTime: new Date("2022/1/2 07:00 AM"),
                    height: 600,
                    views: [
                        "day",
                        { type: "workWeek" },
                        "week",
                        { type: "month", selected: true },
                        "agenda",
                        { type: "timeline", eventHeight: 50}
                    ],
                    timezone: "Etc/UTC",
                    dataSource: {
                        batch: true,
                        transport: {
                            read: function (e) {
                                // e.success(tasks);
                                e.success(objOptions.schedulerTasks);
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
                                    startTimezone: { from: "StartTimezone" },
                                    endTimezone: { from: "EndTimezone" },
                                    description: { from: "Description" },
                                    recurrenceId: { from: "RecurrenceID" },
                                    recurrenceRule: { from: "RecurrenceRule" },
                                    recurrenceException: { from: "RecurrenceException" },
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
                $.debug('error', 'Error in hh.calendar.loadCalendar', ex);
            }

        },

        deleteEvent: function (options) {

            var defaults = {},
                objThis = this,
                objOptions = $.extend(defaults, options);

            try {
                $.debug('Started hh.calendar.deleteEvent');

                
            }
            catch (ex) {
                $.debug('error', 'Error in hh.calendar.deleteEvent', ex);
            }
        },

        destroy: function () {
            try {
                $.debug('Started hh.calendar.destroy');

                this.element
                    .off()
                    .empty();

                this._super();
            }
            catch (ex) {
                $.debug('error', 'Error in hh.calendar.destroy', ex);
            }
        }

    });

})(jQuery);