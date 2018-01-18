module.exports = function(app){
    taskControllers= require('../controllers/controllers');
var books = {
    'libro1': 'este libro es una cagada',
    'libro2': 'este linbro tambien es una cagada',
    'libro3': 'este libro es el peor',
}
    app.get('/favicon.ico', (req, res) => {
        res.status(201);
    });
    
    app.route('/books/:name')
        .get(taskControllers.getBookByName)
        .delete(taskControllers.deleteBookByName);
    
    app.route('/books')
        .post(taskControllers.createBook)
        .get(taskControllers.getBooksWithLimit);
    
    app.get('/', (req, res) => {
        res.send(req.sarasa);
    });
}