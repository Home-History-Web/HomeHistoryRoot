/*
    $('#divMainContent').propertyTable({});

    $(':hh-propertyTable').propertyTable('option')

    This widget will be used to display a table of properties
*/

(function ($) {
    $.widget("hh.propertyTable", {

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

            $.debug("Started hh.propertyTable._create()");

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

            fetchDataPromise = $.hh.data.getProperties({}).then(function (result) {
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

            return $.get('/ui/propertyTable.htm', function (markup) {
                objThis.element.append(markup);
            });
        },

        /*
            Set up any event handlers and child widgets
        */
        bindEvents: function () {
            var objThis = this,
                objOptions = objThis.options;

            $.debug("Started hh.propertyTable.bindEvents");

            objThis.element.on('click', '.btn-add-property', function (evt) {
                // Load the property lookup widget
                objThis.destroy();

                $('#divMainContent').propertyLookup();
                // $('#addyLookup').show();
            });

        },


        _init: function () {
            $.debug("Started hh.propertyTable._init");

            var objThis = this,
                objOptions = objThis.options;

            objOptions.createPromise.done(function () {
                objThis.loadProperties();


                /* 
                Trigger an init event

                var initEvent = $.Event("Init Complete", {
                    source: 'propertyTable'
                });                
                objThis.element.trigger(initEvent);
                */
            });
        },

        loadProperties: function() {
            var objThis = this,
                objOptions = objThis.options;

            try {
                $.debug('Started hh.propertyTable.loadProperties');

                var sharedDataSource = new kendo.data.DataSource({  
                    data: objOptions.properties
                });
                
                objThis.element
                .find('.hh-property-grid')
                .kendoGrid({
                    dataSource: sharedDataSource,
                    height: 400,
                    editable: false,
                    pageable: true,
                    sortable: true,
                    navigatable: true,
                    resizable: true,
                    reorderable: false,
                    groupable: false,
                    filterable: true,
                    dataBound: $.noop(),
                    toolbar: ["excel", "pdf", "search"],
                    columns: [
                        { field: "formattedAddress", title: "Address" },
                        { command: { text: "Delete",
                                    click: function(e) {
                                        // prevent page scroll position change
                                        e.preventDefault();
                                        // e.target is the DOM element representing the button
                                        var tr = $(e.target).closest("tr"); // get the current table row (tr)
                                        // get the data bound to the current table row
                                        var data = this.dataItem(tr);
                                        var id = data.id;
                                        
                                        objThis.deleteProperty({
                                            id: data.id,
                                            property: data
                                        });

                                        objThis.element
                                            .find('.hh-property-grid')
                                            .data("kendoGrid")
                                            .removeRow(tr);


                                    } 
                        }, title: "Actions", width: "180px" }
                    ]
                });

            }
            catch (ex) {
                $.debug('error', 'Error in hh.propertyTable.loadProperties', ex);
            }

        },

        deleteProperty: function(options) {   
    
            var defaults = {},
                objThis = this,
                objOptions = $.extend(defaults, options);

            try {
                $.debug('Started hh.propertyTable.deleteProperty');
                
                $.hh.data.deleteProperty({
                    id: objOptions.id
                }).then(function(result) {
                    new PNotify({
                        title: 'Success',
                        text: 'Property Removed',
                        type: 'notice',
                        delay: 2000
                    });
                });
            }
            catch (ex) {
                $.debug('error', 'Error in hh.propertyTable.deleteProperty', ex);
            }
        },

        destroy: function () {
            try {
                $.debug('Started hh.propertyTable.destroy');

                this.element
                    .off()
                    .empty();

                this._super();
            }
            catch (ex) {
                $.debug('error', 'Error in hh.propertyTable.destroy', ex);
            }
        }

    });

})(jQuery);