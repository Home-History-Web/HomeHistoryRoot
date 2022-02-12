/*
    $('#divMainContent').reports({});

    $(':hh-reports').reports('option')

    This widget will be used to display various reports

    https://docs.telerik.com/kendo-ui/controls/charts/chart-types/overview
*/

(function ($) {
    $.widget("hh.reports", {

        /*
            TEMPLATE: Put any publicly settable options here. Be careful to avoid 
            putting reference types here, each widget will get the same copy 
        */
        options: {
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

            objOptions.createPromise = $.when(markupPromise)
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

            objThis.element.on('click', '.chart-bar', function (evt) {
                objThis.loadBar();
            }).on('click', '.chart-pie', function (evt) {
                objThis.loadPie();
            }).on('click', '.chart-line', function (evt) {
                objThis.loadLine();
            }).on('click', '.chart-area', function (evt) {
                objThis.loadArea();
            }).on('click', '.chart-gantt', function (evt) {
                objThis.loadGantt();
            }).on('click', '.chart-scatter', function (evt) {
                objThis.loadScatter();
            });

        },


        _init: function () {
            $.debug("Started hh.reports._init");

            var objThis = this,
                objOptions = objThis.options;

            objOptions.createPromise.done(function () {
                objThis.loadBar();

                /* 
                Trigger an init event

                var initEvent = $.Event("Init Complete", {
                    source: 'reports'
                });                
                objThis.element.trigger(initEvent);
                */
            });
        },

        loadBar: function () {
            var objThis = this,
                objOptions = objThis.options;

            try {
                $.debug('Started hh.reports.loadBar');

                objThis.element.find('#divReport').empty();

                objThis.element.find('#divReport').kendoChart({
                    title: {
                        text: "Gross domestic product growth /GDP annual %/"
                    },
                    legend: {
                        position: "top"
                    },
                    seriesDefaults: {
                        type: "column"
                    },
                    series: [{
                        name: "United States",
                        data: [3.907, 7.943, 7.848, 9.284, 9.263, 9.801, 3.890, 8.238, 9.552, 6.855]
                    }, {
                        name: "England",
                        data: [4.743, 7.295, 7.175, 6.376, 8.153, 8.535, 5.247, -7.832, 4.3, 4.3]
                    }, {
                        name: "Germany",
                        data: [0.010, -0.375, 1.161, 0.684, 3.7, 3.269, 1.083, -5.127, 3.690, 2.995]
                    }, {
                        name: "World",
                        data: [1.988, 2.733, 3.994, 3.464, 4.001, 3.939, 1.333, -2.245, 4.339, 2.727]
                    }],
                    valueAxis: {
                        labels: {
                            format: "{0}%"
                        },
                        line: {
                            visible: false
                        },
                        axisCrossingValue: 0
                    },
                    categoryAxis: {
                        categories: [2002, 2003, 2004, 2005, 2006, 2007, 2008, 2009, 2010, 2011],
                        line: {
                            visible: false
                        },
                        labels: {
                            padding: { top: 135 }
                        }
                    },
                    tooltip: {
                        visible: true,
                        format: "{0}%",
                        template: "#= series.name #: #= value #"
                    }
                });

            }
            catch (ex) {
                $.debug('error', 'Error in hh.reports.loadBar', ex);
            }

        },

        loadArea: function () {
            var objThis = this,
                objOptions = objThis.options;

            try {
                $.debug('Started hh.reports.loadArea');

                objThis.element.find('#divReport').empty();

                objThis.element.find('#divReport').kendoChart({
                    title: {
                        text: "Internet Users"
                    },
                    legend: {
                        position: "bottom"
                    },
                    seriesDefaults: {
                        type: "area"
                    },
                    series: [{
                        name: "World",
                        data: [15.7, 16.7, 20, 23.5, 26.6]
                    }, {
                        name: "United States",
                        data: [67.96, 68.93, 75, 74, 78]
                    }],
                    valueAxis: {
                        labels: {
                            format: "{0}%"
                        }
                    },
                    categoryAxis: {
                        categories: [2005, 2006, 2007, 2008, 2009]
                    }
                });

            }
            catch (ex) {
                $.debug('error', 'Error in hh.reports.loadArea', ex);
            }

        },

        loadPie: function () {
            var objThis = this,
                objOptions = objThis.options;

            try {
                $.debug('Started hh.reports.loadPie');

                objThis.element.find('#divReport').empty();

                objThis.element.find('#divReport').kendoChart({
                    title: {
                        position: "bottom",
                        text: "Share of Internet Population Growth, 2007 - 2012"
                    },
                    legend: {
                        visible: false
                    },
                    chartArea: {
                        background: ""
                    },
                    seriesDefaults: {
                        labels: {
                            visible: true,
                            background: "transparent",
                            template: "#= category #: \n #= value#%"
                        }
                    },
                    series: [{
                        type: "pie",
                        startAngle: 150,
                        data: [{
                            category: "Asia",
                            value: 53.8,
                            color: "#9de219"
                        }, {
                            category: "Europe",
                            value: 16.1,
                            color: "#90cc38"
                        }, {
                            category: "Latin America",
                            value: 11.3,
                            color: "#068c35"
                        }, {
                            category: "Africa",
                            value: 9.6,
                            color: "#006634"
                        }, {
                            category: "Middle East",
                            value: 5.2,
                            color: "#004d38"
                        }, {
                            category: "North America",
                            value: 3.6,
                            color: "#033939"
                        }]
                    }],
                    tooltip: {
                        visible: true,
                        format: "{0}%"
                    }
                });

            }
            catch (ex) {
                $.debug('error', 'Error in hh.reports.loadPie', ex);
            }

        },

        loadLine: function () {
            var objThis = this,
                objOptions = objThis.options;

            try {
                $.debug('Started hh.reports.loadLine');

                objThis.element.find('#divReport').empty();

                objThis.element.find('#divReport').kendoChart({
                    title: {
                        text: "Gross domestic product growth \n /GDP annual %/"
                    },
                    legend: {
                        position: "bottom"
                    },
                    chartArea: {
                        background: ""
                    },
                    seriesDefaults: {
                        type: "line",
                        style: "smooth"
                    },
                    series: [{
                        name: "India",
                        data: [3.907, 7.943, 7.848, 9.284, 9.263, 9.801, 3.890, 8.238, 9.552, 6.855]
                    }, {
                        name: "World",
                        data: [1.988, 2.733, 3.994, 3.464, 4.001, 3.939, 1.333, -2.245, 4.339, 2.727]
                    }, {
                        name: "Russian Federation",
                        data: [4.743, 7.295, 7.175, 6.376, 8.153, 8.535, 5.247, -7.832, 4.3, 4.3]
                    }, {
                        name: "Haiti",
                        data: [-0.253, 0.362, -3.519, 1.799, 2.252, 3.343, 0.843, 2.877, -5.416, 5.590]
                    }],
                    valueAxis: {
                        labels: {
                            format: "{0}%"
                        },
                        line: {
                            visible: false
                        },
                        axisCrossingValue: -10
                    },
                    categoryAxis: {
                        categories: [2002, 2003, 2004, 2005, 2006, 2007, 2008, 2009, 2010, 2011],
                        majorGridLines: {
                            visible: false
                        },
                        labels: {
                            rotation: "auto"
                        }
                    },
                    tooltip: {
                        visible: true,
                        format: "{0}%",
                        template: "#= series.name #: #= value #"
                    }
                });

            }
            catch (ex) {
                $.debug('error', 'Error in hh.reports.loadLine', ex);
            }

        },

        loadScatter: function () {
            var objThis = this,
                objOptions = objThis.options;

            try {
                $.debug('Started hh.reports.loadScatter');

                objThis.element.find('#divReport').empty();

                objThis.element.find('#divReport').kendoChart({
                    title: {
                        text: "Charge current vs. charge time"
                    },
                    legend: {
                        visible: true
                    },
                    seriesDefaults: {
                        type: "scatterLine"
                    },
                    series: [{
                        name: "0.8C",
                        data: [[10, 10], [15, 20], [20, 25], [32, 40], [43, 50], [55, 60], [60, 70], [70, 80], [90, 100]]
                    }, {
                        name: "1.6C",
                        data: [[10, 40], [17, 50], [18, 70], [35, 90], [47, 95], [60, 100]]
                    }, {
                        name: "3.1C",
                        data: [[10, 70], [13, 90], [25, 100]]
                    }],
                    xAxis: {
                        max: 90,
                        labels: {
                            format: "{0}m"
                        },
                        title: {
                            text: "Time"
                        }
                    },
                    yAxis: {
                        max: 100,
                        labels: {
                            format: "{0}%"
                        },
                        title: {
                            text: "Charge"
                        }
                    }
                });

            }
            catch (ex) {
                $.debug('error', 'Error in hh.reports.loadScatter', ex);
            }

        },

        loadGantt: function () {
            var objThis = this,
                objOptions = objThis.options;

            try {
                $.debug('Started hh.reports.loadGantt');

                objThis.element.find('#divReport').empty();

                objOptions.serviceRoot = "https://demos.telerik.com/kendo-ui/service";

                var tasksDataSource = new kendo.data.GanttDataSource({
                    transport: {
                        read: {
                            url: objOptions.serviceRoot + "/GanttTasks",
                            dataType: "jsonp"
                        },
                        update: {
                            url: objOptions.serviceRoot + "/GanttTasks/Update",
                            dataType: "jsonp",
                            timeout: 5000
                        },
                        destroy: {
                            url: objOptions.serviceRoot + "/GanttTasks/Destroy",
                            dataType: "jsonp",
                            timeout: 5000
                        },
                        create: {
                            url: objOptions.serviceRoot + "/GanttTasks/Create",
                            dataType: "jsonp",
                            timeout: 5000
                        },
                        parameterMap: function (options, operation) {
                            if (operation !== "read") {
                                return { models: kendo.stringify(options.models || [options]) };
                            }
                        }
                    },
                    schema: {
                        model: {
                            id: "id",
                            fields: {
                                id: { from: "ID", type: "number" },
                                orderId: { from: "OrderID", type: "number", validation: { required: true } },
                                parentId: { from: "ParentID", type: "number", defaultValue: null, nullable: true, validation: { required: true } },
                                start: { from: "Start", type: "date" },
                                end: { from: "End", type: "date" },
                                title: { from: "Title", defaultValue: "", type: "string" },
                                percentComplete: { from: "PercentComplete", type: "number" },
                                summary: { from: "Summary", type: "boolean" },
                                expanded: { from: "Expanded", type: "boolean", defaultValue: true }
                            }
                        }
                    },
                    error: function (ev) {
                        ev.sender.cancelChanges();
                        kendo.alert("Task was not Created, Updated or Destroyed properly!</br></br>" +
                            "If you are using this service for local demo or in dojo consider <a href='https://github.com/telerik/kendo-ui-demos-service/tree/master/demos-and-odata-v3'>downloading and running the service locally</a>.</br>" +
                            "And make sure to set the <a href='https://github.com/telerik/kendo-ui-demos-service/blob/master/demos-and-odata-v3/KendoCRUDService/Models/Gantt/GanttTaskRepository.cs#L12'>UpdateDatabase</a> flag to true.");
                    }
                });

                var dependenciesDataSource = new kendo.data.GanttDependencyDataSource({
                    transport: {
                        read: {
                            url: objOptions.serviceRoot + "/GanttDependencies",
                            dataType: "jsonp"
                        },
                        update: {
                            url: objOptions.serviceRoot + "/GanttDependencies/Update",
                            dataType: "jsonp"
                        },
                        destroy: {
                            url: objOptions.serviceRoot + "/GanttDependencies/Destroy",
                            dataType: "jsonp"
                        },
                        create: {
                            url: objOptions.serviceRoot + "/GanttDependencies/Create",
                            dataType: "jsonp"
                        },
                        parameterMap: function (options, operation) {
                            if (operation !== "read") {
                                return { models: kendo.stringify(options.models || [options]) };
                            }
                        }
                    },
                    schema: {
                        model: {
                            id: "id",
                            fields: {
                                id: { from: "ID", type: "number" },
                                predecessorId: { from: "PredecessorID", type: "number" },
                                successorId: { from: "SuccessorID", type: "number" },
                                type: { from: "Type", type: "number" }
                            }
                        }
                    }
                });

                objThis.element.find('#divReport').kendoGantt({
                    dataSource: tasksDataSource,
                    dependencies: dependenciesDataSource,
                    resources: {
                        field: "resources",
                        dataColorField: "Color",
                        dataTextField: "Name",
                        dataSource: {
                            transport: {
                                read: {
                                    url: objOptions.serviceRoot + "/GanttResources",
                                    dataType: "jsonp"
                                }
                            },
                            schema: {
                                model: {
                                    id: "id",
                                    fields: {
                                        id: { from: "ID", type: "number" }
                                    }
                                }
                            }
                        }
                    },
                    assignments: {
                        dataTaskIdField: "TaskID",
                        dataResourceIdField: "ResourceID",
                        dataValueField: "Units",
                        dataSource: {
                            transport: {
                                read: {
                                    url: objOptions.serviceRoot + "/GanttResourceAssignments",
                                    dataType: "jsonp"
                                },
                                update: {
                                    url: objOptions.serviceRoot + "/GanttResourceAssignments/Update",
                                    dataType: "jsonp"
                                },
                                destroy: {
                                    url: objOptions.serviceRoot + "/GanttResourceAssignments/Destroy",
                                    dataType: "jsonp"
                                },
                                create: {
                                    url: objOptions. serviceRoot + "/GanttResourceAssignments/Create",
                                    dataType: "jsonp"
                                },
                                parameterMap: function (options, operation) {
                                    if (operation !== "read") {
                                        return { models: kendo.stringify(options.models || [options]) };
                                    }
                                }
                            },
                            schema: {
                                model: {
                                    id: "ID",
                                    fields: {
                                        ID: { type: "number" },
                                        ResourceID: { type: "number" },
                                        Units: { type: "number" },
                                        TaskID: { type: "number" }
                                    }
                                }
                            }
                        }
                    },
                    views: [
                        "day",
                        { type: "week", selected: true },
                        "month"
                    ],
                    columns: [
                        { field: "title", title: "Task", editable: true, width: 255 },
                        { field: "start", title: "Actual Start Date", format: "{0:M/d/yyyy}", editable: true, width: 130 },
                        { field: "end", title: "Actual End Date", format: "{0:M/d/yyyy}", editable: true, width: 130 },
                        { field: "percentComplete", title: "% Complete", type: "number", editable: true, width: 100 }
                    ],
                    toolbar: ["append", "pdf"],
                    height: 700,
                    listWidth: "50%",
                    showWorkHours: false,
                    showWorkDays: false,
                    snap: false
                }).data("kendoGantt");

                $(document).bind("kendo:skinChange", function () {
                    gantt.refresh();
                });

            }
            catch (ex) {
                $.debug('error', 'Error in hh.reports.loadGantt', ex);
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