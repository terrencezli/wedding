$(function () {
    'use strict'


    $.get("/photo-gallery").done(function (result) {
        // load images
        var carouselLinks = []
        var linksContainer = $('#links')
        var imageURL
        var title
        // Add the demo images as links with thumbnails to the page:
        $.each(result.files, function (index, photo) {
            imageURL = '/images/photo-gallery/' + photo
            title = photo.split(".")[0].toUpperCase()
            $('<a/>')
                .append($('<img>').prop('src', imageURL))
                .prop('href', imageURL)
                .prop('title', title)
                .attr('data-gallery', '')
                .appendTo(linksContainer)
            carouselLinks.push({
                href: imageURL,
                title: title
            })
        })
        // Initialize the Gallery as image carousel:
        blueimp.Gallery(carouselLinks, {
            container: '#blueimp-image-carousel',
            carousel: true
        })
    })
})
