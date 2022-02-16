$(document).ready(function() {
    $.hh.emailAddress = $.cookie('email').toLowerCase();
    $.hh.accessToken = $.cookie('accessToken');

    $('#divMainContent').propertyTable({});

    $('#logout').on('click', function() {
        document.location.href = "https://www.google.com/accounts/Logout?continue=https://appengine.google.com/_ah/logout?continue=https://localhost:7122/";
    });

    $(".list-group-item").click(function() {
        $(".list-group-item").removeClass('active');

        $(this).addClass('active');

        var objText = $(this).find('span').text();

        if ($('#divMainContent').is(':hh-propertyTable')) {
            $('#divMainContent').propertyTable('destroy');
        } else if ($('#divMainContent').is(':hh-propertyLookup')) {
            $('#divMainContent').propertyLookup('destroy');
        } else if ($('#divMainContent').is(':hh-propertyDetails')) {
            $('#divMainContent').propertyDetails('destroy');
        } else if ($('#divMainContent').is(':hh-calendar')) {
            $('#divMainContent').calendar('destroy');
        } else if ($('#divMainContent').is(':hh-reports')) {
            $('#divMainContent').reports('destroy');
        } else if ($('#divMainContent').is(':hh-contacts')) {
            $('#divMainContent').contacts('destroy');
        }

        switch (objText.toLowerCase()) {
            case "main dashboard":
            case "my properties":
                $('#divMainContent').propertyTable();

                break;
            case "reports":
                $('#divMainContent').reports();

                break;
            case "calendar":
                $('#divMainContent').calendar();

                break;
            case "contacts":
                $('#divMainContent').contacts();

                break;
            case "work orders":
                // $('#divMainContent').workOrders();

                break;
            default:
                break;
        }
    });


    $(function() {
        var availableTags = [
            "ActionScript",
            "AppleScript",
            "Asp",
            "BASIC",
            "C",
            "C++",
            "Clojure",
            "COBOL",
            "ColdFusion",
            "Erlang",
            "Fortran",
            "Groovy",
            "Haskell",
            "Java",
            "JavaScript",
            "Lisp",
            "Perl",
            "PHP",
            "Python",
            "Ruby",
            "Scala",
            "Scheme"
        ];

        $("#txtPropSearch").autocomplete({
            source: availableTags
        });
    });




});