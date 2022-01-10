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
    }
};