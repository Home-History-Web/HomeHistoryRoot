$.hh.data = {

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