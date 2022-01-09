$.hh.data = {

    getPropertiesForZip: function(options){
        
        var defaults = {
            postalCode: "80126",
            page: 1,
            pageSize: 15000
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
            return result.property;
        });
    }
};