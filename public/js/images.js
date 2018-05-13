$(function () {
    'use strict';


    $.get("/photo-gallery").done(function (result) {
        // load images
        var linksContainer = $('#links');
        var imageURL;
        var title;
        // Add the demo images as links with thumbnails to the page:
        $.each(result.files, function (index, photo) {
            imageURL = '/images/photo-gallery/' + photo;
            title = photo.split(".")[0].toUpperCase();
            $('<a/>')
                .append($('<img>').prop('src', imageURL))
                .prop('href', imageURL)
                .attr('data-gallery', '')
                .appendTo(linksContainer);
        });

        // document.getElementById('links').onclick = function (event) {
        //     event = event || window.event;
        //     var target = event.target || event.srcElement,
        //         link = target.src ? target.parentNode : target,
        //         options = {index: link, event: event},
        //         links = this.getElementsByTagName('a');
        //     blueimp.Gallery(links, options);
        // };
    });
});
