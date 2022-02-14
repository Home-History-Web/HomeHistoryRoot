/*
    $('#divMainContent').contacts({});

    $(':hh-contacts').contacts('option')

    This widget will be used to display a table of contacts
*/

(function ($) {
    $.widget("hh.contacts", {

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

            $.debug("Started hh.contacts._create()");

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

            // fetchDataPromise = $.hh.data.getContacts({}).then(function (result) {
            //     objOptions.contacts = result;
            // });

            objOptions.createPromise = $.when(markupPromise)
                .always(function () {
                    $.hh.hideProcessing();
                });
        },

        injectMarkup: function () {
            var objThis = this,
                objOptions = objThis.options;

            return $.get('/ui/contacts.htm', function (markup) {
                objThis.element.append(markup);
            });
        },

        /*
            Set up any event handlers and child widgets
        */
        bindEvents: function () {
            var objThis = this,
                objOptions = objThis.options;

            $.debug("Started hh.contacts.bindEvents");

            objThis.element.on('click', '.btn-add-contact', function (evt) {
                // Add a contact

            });

        },


        _init: function () {
            $.debug("Started hh.contacts._init");

            var objThis = this,
                objOptions = objThis.options;

            objOptions.createPromise.done(function () {
                objThis.loadContacts();

                /* 
                Trigger an init event

                var initEvent = $.Event("Init Complete", {
                    source: 'contacts'
                });                
                objThis.element.trigger(initEvent);
                */
            });
        },

        loadContacts: function () {
            var objThis = this,
                objOptions = objThis.options;

            try {
                $.debug('Started hh.contacts.loadContacts');

                var $objGrid = objThis.element.find('.hh-contact-grid');

                $objGrid.kendoGrid({
                    columns: [
                      { field: "firstName" },
                      { field: "lastName" },
                      { field: "address" },
                      { field: "homePhone" },
                      { field: "mobilePhone" },
                      { field: "emailAddress" }
                    ],
                    dataSource: {
                      data: [
                        { id: 1, firstName: "Jane", lastName: "Doe", address: "", homePhone: "000-000-0000", mobilePhone: "000-000-0000", emailAddress: "jane@doe.com" },
                        { id: 2, firstName: "John", lastName: "Doe", address: "", homePhone: "000-000-0000", mobilePhone: "000-000-0000", emailAddress: "john@doe.com" }
                      ],
                      schema: {
                        model: { id: "id" }
                      }
                    },
                    editable: true,
                    toolbar: ["save"]
                  });

                var grid = $objGrid.data("kendoGrid");

                grid.addRow();

                grid.bind("saveChanges", objThis.saveContact);
                  
            }
            catch (ex) {
                $.debug('error', 'Error in hh.contacts.loadContacts', ex);
            }

        },

        saveContact: function (e) {

            var defaults = {},
                objThis = this,
                objOptions = $.extend(defaults, options);

            try {
                $.debug('Started hh.contacts.saveContact');

                debugger;

                $.hh.data.saveContact({
                    id: objOptions.id
                }).then(function (result) {
                    new PNotify({
                        title: 'Success',
                        text: 'Contact Saved',
                        type: 'notice',
                        delay: 2000
                    });
                });
            }
            catch (ex) {
                $.debug('error', 'Error in hh.contacts.saveContact', ex);
            }
        },

        deleteContact: function (options) {

            var defaults = {},
                objThis = this,
                objOptions = $.extend(defaults, options);

            try {
                $.debug('Started hh.contacts.deleteContact');

                $.hh.data.deleteContact({
                    id: objOptions.id
                }).then(function (result) {
                    new PNotify({
                        title: 'Success',
                        text: 'Contact Removed',
                        type: 'notice',
                        delay: 2000
                    });
                });
            }
            catch (ex) {
                $.debug('error', 'Error in hh.contacts.deleteContact', ex);
            }
        },

        destroy: function () {
            try {
                $.debug('Started hh.contacts.destroy');

                this.element
                    .off()
                    .empty();

                this._super();
            }
            catch (ex) {
                $.debug('error', 'Error in hh.contacts.destroy', ex);
            }
        }

    });

})(jQuery);