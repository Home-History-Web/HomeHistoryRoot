$(document).ready(function(){
    $.hh.emailAddress = $.cookie('email').toLowerCase();
    $.hh.accessToken = $.cookie('accessToken');

    $('#divMainContent').propertyTable({});  

    $('#logout').on('click', function() {
        document.location.href = "https://www.google.com/accounts/Logout?continue=https://appengine.google.com/_ah/logout?continue=https://localhost:7122/";
    });

    $(".list-group-item").click(function(){
        $(".list-group-item").removeClass('active');
        
        $(this).addClass('active');

        var objText = $(this).find('span').text();

        if($('#divMainContent').is(':hh-propertyTable')){
            $('#divMainContent').propertyTable('destroy');
        } else if($('#divMainContent').is(':hh-propertyLookup')){
            $('#divMainContent').propertyLookup('destroy');
        }

        switch (objText.toLowerCase()) {
            case "main dashboard":
                $('#divMainContent').propertyTable();

                break;
            case "reports":
                $('#divMainContent').propertyLookup();

                break;
            default:
                break;
        }
    });   

});