/*
    $('#divMainContent').calendar({});

    $(':hh-calendar').calendar('option')

    This widget will be used to display a table of properties
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
                    id: 1,
                    title: "AP Physics",
                    image: "https://demos.telerik.com/kendo-ui/content/web/scheduler/physics.png",
                    start: new Date("2020/10/5 8:00"),
                    end: new Date("2020/10/5 9:00"),
                    recurrenceRule: "FREQ=WEEKLY;COUNT=5;BYDAY=MO;WKST=SU",
                    attendee: 1
                },
                {
                    id: 2,
                    title: "History",
                    image: "https://demos.telerik.com/kendo-ui/content/web/scheduler/history.png",
                    start: new Date("2020/10/5 9:00"),
                    end: new Date("2020/10/5 10:00"),
                    recurrenceRule: "FREQ=WEEKLY;COUNT=9;BYDAY=MO,WE,TH,FR;WKST=SU",
                    attendee: 1
                },
                {
                    id: 3,
                    title: "Art",
                    image: "https://demos.telerik.com/kendo-ui/content/web/scheduler/art.png",
                    start: new Date("2020/10/5 9:00"),
                    end: new Date("2020/10/5 10:00"),
                    attendee: 2
                },
                {
                    id: 4,
                    title: "Spanish",
                    image: "https://demos.telerik.com/kendo-ui/content/web/scheduler/spanish.png",
                    start: new Date("2020/10/5 10:00"),
                    end: new Date("2020/10/5 11:00"),
                    recurrenceRule: "FREQ=WEEKLY;COUNT=10;BYDAY=MO,TH;WKST=SU",
                    attendee: 1
                },
                {
                    id: 5,
                    title: "Home Ec",
                    image: "https://demos.telerik.com/kendo-ui/content/web/scheduler/home-ec.png",
                    start: new Date("2020/10/5 10:00"),
                    end: new Date("2020/10/5 11:00"),
                    recurrenceRule: "FREQ=WEEKLY;COUNT=10;BYDAY=MO,TH;WKST=SU",
                    attendee: 2
                },
                {
                    id: 6,
                    title: "AP Math",
                    image: "https://demos.telerik.com/kendo-ui/content/web/scheduler/math.png",
                    start: new Date("2020/10/5 11:00"),
                    end: new Date("2020/10/5 12:00"),
                    recurrenceRule: "FREQ=WEEKLY;COUNT=10;BYDAY=MO,TH;WKST=SU",
                    attendee: 1
                },
                {
                    id: 7,
                    title: "AP Econ",
                    image: "https://demos.telerik.com/kendo-ui/content/web/scheduler/econ.png",
                    start: new Date("2020/10/5 11:00"),
                    end: new Date("2020/10/5 12:00"),
                    recurrenceRule: "FREQ=WEEKLY;COUNT=10;BYDAY=MO,TH;WKST=SU",
                    attendee: 2
                },
                {
                    id: 8,
                    title: "Photography Club Meeting",
                    image: "https://demos.telerik.com/kendo-ui/content/web/scheduler/photography.png",
                    start: new Date("2020/10/5 14:00"),
                    end: new Date("2020/10/5 15:30"),
                    recurrenceRule: "FREQ=WEEKLY;COUNT=5;BYDAY=MO;WKST=SU",
                    attendee: 2
                },
                {
                    id: 9,
                    title: "Tennis Practice",
                    image: "https://demos.telerik.com/kendo-ui/content/web/scheduler/tennis.png",
                    start: new Date("2020/10/5 15:30"),
                    end: new Date("2020/10/5 16:30"),
                    recurrenceRule: "FREQ=WEEKLY;COUNT=10;BYDAY=MO;WKST=SU",
                    attendee: 1
                },
                {
                    id: 10,
                    title: "French",
                    image: "https://demos.telerik.com/kendo-ui/content/web/scheduler/french.png",
                    start: new Date("2020/10/6 8:00"),
                    end: new Date("2020/10/6 9:00"),
                    recurrenceRule: "FREQ=WEEKLY;COUNT=5;BYDAY=TU;WKST=SU",
                    attendee: 2
                },
                {
                    id: 11,
                    title: "Gym",
                    image: "https://demos.telerik.com/kendo-ui/content/web/scheduler/gym.png",
                    start: new Date("2020/10/6 9:00"),
                    end: new Date("2020/10/6 10:00"),
                    recurrenceRule: "FREQ=WEEKLY;COUNT=10;BYDAY=TU;WKST=SU",
                    attendee: 1
                },
                {
                    id: 12,
                    title: "English",
                    image: "https://demos.telerik.com/kendo-ui/content/web/scheduler/english.png",
                    start: new Date("2020/10/6 9:00"),
                    end: new Date("2020/10/6 10:00"),
                    recurrenceRule: "FREQ=WEEKLY;COUNT=5;BYDAY=TU;WKST=SU",
                    attendee: 2
                },
                {
                    id: 13,
                    title: "English",
                    image: "https://demos.telerik.com/kendo-ui/content/web/scheduler/english.png",
                    start: new Date("2020/10/6 10:00"),
                    end: new Date("2020/10/6 11:00"),
                    recurrenceRule: "FREQ=WEEKLY;COUNT=12;BYDAY=TU,FR;WKST=SU",
                    attendee: 1
                },
                {
                    id: 14,
                    title: "History",
                    image: "https://demos.telerik.com/kendo-ui/content/web/scheduler/history.png",
                    start: new Date("2020/10/6 11:00"),
                    end: new Date("2020/10/6 12:00"),
                    recurrenceRule: "FREQ=WEEKLY;COUNT=5;BYDAY=TU;WKST=SU",
                    attendee: 1
                },
                {
                    id: 15,
                    title: "Gym",
                    image: "https://demos.telerik.com/kendo-ui/content/web/scheduler/gym.png",
                    start: new Date("2020/10/6 11:00"),
                    end: new Date("2020/10/6 12:00"),
                    recurrenceRule: "FREQ=WEEKLY;COUNT=5;BYDAY=TU;WKST=SU",
                    attendee: 2
                },
                {
                    id: 16,
                    title: "English",
                    image: "https://demos.telerik.com/kendo-ui/content/web/scheduler/english.png",
                    start: new Date("2020/10/6 8:00"),
                    end: new Date("2020/10/6 9:00"),
                    recurrenceRule: "FREQ=WEEKLY;COUNT=10;BYDAY=WE;WKST=SU",
                    attendee: 1
                },
                {
                    id: 17,
                    title: "School Choir Practice",
                    image: "https://demos.telerik.com/kendo-ui/content/web/scheduler/choir.png",
                    start: new Date("2020/10/6 14:30"),
                    end: new Date("2020/10/6 15:30"),
                    recurrenceRule: "FREQ=WEEKLY;COUNT=5;BYDAY=TU;WKST=SU",
                    attendee: 2
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
                                e.success(tasks);
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
                                { field: "ownerId", operator: "eq", value: 2 }
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