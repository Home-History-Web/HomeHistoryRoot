$.hh.models = {

    simpleProperty: {
        fields: {
            address_line1: { type: "string", from: "address.line1" },
            address_line2: { type: "string", from: "address.line2" }
        },
        columns: [{
            field: "address_line1",
            title: "Line 1"
        },{
            field: "address_line2",
            title: "Line 2"
        }]
    }
    
};