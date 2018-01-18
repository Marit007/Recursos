$(function () {

    function agregarLibros(books) {
        console.log(books);
        list = [];
        for (var i in books) {
            console.log(books[i]);
            var content = `<a href=# data-block="${books[i]}">${books[i]}</a>`;
            list.push($('<li>', { html: content }));
        }
        $('.books').append(list);
    }

    $.get('books', agregarLibros);

    $('.books').on('click', 'a[data-block]', function (e) {
        let libro = e.target.attributes['data-block'].value;
        $(libro).parents('li').remove();
        $.ajax({
            type: "DELETE", url: `/books/${libro}`
        }).done(function(res) {
            console.log(res);
            $(e.target).parents('li').remove();
        });

    });
    $('form').on('submit', function (event) {
        event.preventDefault();
        var form = $(this);
        var blockData = form.serialize();
        $.ajax({
            type: "POST",
            url: "/books",
            data: blockData,
        }).done(function (books) {
            var content = `<a href=# data-block="${books}">${books}</a>`;
            $('.books').append($('<li>', { html: content }));
            form.trigger("reset");
        });
    });
}) // se ejecuta solo 

