var books = {
    'libro1': 'este libro es una cagada',
    'libro2': 'este linbro tambien es una cagada',
    'libro3': 'este libro es el peor',
}

function getBookByName(req, res) {
    if (!books[req.params.name]) {
        res.status(404).json("No existe " + req.params.name);
        res.end();
    } else {
        res.send(books[req.params.name]);

    }
}

function deleteBookByName(req, res) {
    console.log(req.params.name);
    delete books[req.params.name];
    res.sendStatus(200);
    // res.end("sarasa");
}

function createBook(req, res) {
    books[req.body.name] = req.body.description;
    console.log(books);
    //res.status(201).json(books[req.body.name]);
    // con books solo no refresca )? 
    res.status(201).json(req.body.name);
}

function getBooksWithLimit(req, res) {
    var nombres = Object.keys(books);
    if (req.query.limit >= 0) {
        res.json(nombres.slice(0, req.query.limit));
    } else {
        res.json(nombres);
    }
}

module.exports = { getBookByName, deleteBookByName, createBook, getBooksWithLimit };