$.hh.data = {
    /**
     * 
       $.hh.data.getCounties({
            stateId: "ST08"
        }).then(function(properties) {
            debugger;
        });

     * @returns 
     */
    getCounties: function(options) {
        
        var defaults = {
            stateId: "ST08"
        };

        var objOptions = $.extend(defaults, options);

        return $.ajax({
            url: "https://api.gateway.attomdata.com/areaapi/v1.0.0/county/lookup?StateId=" + objOptions.stateId,
            dataType: "json", 
            headers: { 'apikey': $.hh.apiKey },
            success: function(result) {
                
            },
            error: function(result) {
                // notify the data source that the request failed

            }
        }).then(function(result) {
            return result;
        });

    },

    /**
       $.hh.data.getPropertiesForZip({
            postalCode: "81611",
            page: 1,
            pageSize: 1500
        }).then(function(properties) {
            debugger;
        });

     * @param {*} options 
     * @returns 
     */
    getPropertiesForZip: function(options){
        
        var defaults = {
            postalCode: "81611",
            page: 1,
            pageSize: 1500
        };

        var objOptions = $.extend(defaults, options);

        return $.ajax({
            url: "https://api.gateway.attomdata.com/propertyapi/v1.0.0/property/address?postalcode=" + objOptions.postalCode + "&page=" + objOptions.page + "&pagesize=" + objOptions.pageSize,
            dataType: "json", 
            headers: { 'apikey': $.hh.apiKey },
            success: function(result) {
                
            },
            error: function(result) {
                // notify the data source that the request failed

            }
        }).then(function(result) {
            let nonEmptyProperties = _.filter(
                result.property, function(prop) {
                   return !prop.address.line1 == '';
                }
            );

            return nonEmptyProperties;
        });
    },
    /**
     * 
       $.hh.data.getProperties({
            "emailAddress":"homeHistoryWeb@gmail.com"
        }).then(function(properties) {
            debugger;
        });

     * @param {*} options 
     * @returns 
     */
    getProperties: function(options){
        
        var defaults = {
            "emailAddress":"homeHistoryWeb@gmail.com"
        };

        var objOptions = $.extend(defaults, options);

        return $.ajax({
            type: "GET", 
            url: "https://localhost:7122/Mongo/Properties/" + objOptions.emailAddress,
            contentType: "application/json",
            dataType: "json", 
            // headers: { 'apikey': $.hh.apiKey },
            success: function(result) {
                $.hh.properties = result;
                
                return result;
            },
            error: function(result) {
                // notify the data source that the request failed
                return result;
            }
        }).then(function(result) {
            // done
            return result;
        });
    },
    /**
     * 
       $.hh.data.deleteProperty({
            id:""
        }).then(function(result) {
            debugger;
        });

     * @param {*} options 
     * @returns 
     */
    deleteProperty: function(options){
        
        var defaults = {
            "id":""
        };

        var objOptions = $.extend(defaults, options);

        return $.ajax({
            type: "GET", 
            url: "https://localhost:7122/Mongo/Property/Remove/" + objOptions.id,
            contentType: "application/json",
            dataType: "json", 
            // headers: { 'apikey': $.hh.apiKey },
            success: function(result) {
                return result;
            },
            error: function(result) {
                // notify the data source that the request failed
                return result;
            }
        }).then(function(result) {
            // done
            return result;
        });
    },
    /**
       $.hh.data.addProperty({
            "line1":"324 Inverness Dr S",
            "line2":"",
            "city":"Littleton",
            "state":"CO",
            "zip":"34534",
            "formattedAddress":"324 Inverness Dr S\nENGLEWOOD CO 80112-6158\nUNITED STATES"
        }).then(function(properties) {
            debugger;
        });

     * @param {*} options 
     * @returns 
     */
    addProperty: function(options){
        
        var defaults = {
            "line1":"",
            "line2":"",
            "city":"",
            "state":"",
            "zip":"",
            "formattedAddress":"",
            "emailAddress":"homeHistoryWeb@gmail.com"
        };

        var objOptions = $.extend(defaults, options);

        return $.ajax({
            type: "POST", 
            url: "https://localhost:7122/Mongo/Property/Add",
            contentType: "application/json",
            dataType: "json", 
            // headers: { 'apikey': $.hh.apiKey },
            data: JSON.stringify(objOptions),
            success: function(result) {
                return result;
            },
            error: function(result) {
                // notify the data source that the request failed
                return result;
            }
        }).then(function(result) {
            // done
            return result;
        });
    }
};