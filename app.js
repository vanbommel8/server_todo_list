

const port = process.env.PORT || 3001 ;
var cors = require('cors')
var express = require('express');
var app = express();

var bodyParser = require('body-parser');
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));
app.use(cors())

var todo = require('./node_modules/todolist/index');
app.listen(port);

app.get('/', function(req, res) {
    res.json({message: 'Welcome to the fucking ToDo server!'})
});


//-------------------------------------POST-------------------------------------
//add a new element on the list
app.post('/addTodo', function(req, res) {

    todo.addToDo(req.body.name, req.body.description, req.body.assignedTo);
    res.status(201).json({"message": todo.showToDo()});

});

//-------------------------------------PUT-------------------------------------
//change todo status
app.put('/change', function(req,res) {
    todo.changeToDoState(req.body.id, req.body.completed);
    res.status(201).json({"status": todo.findToDoByState(req.body.completed)});
});

//-------------------------------------GET-------------------------------------
//show all todo filtered by user
app.get('/todo', function(req, res) {
    if (req.query.assignedTo != undefined) {
        return res.json(todo.findToDoByName(req.query.assignedTo))
    } else {
        res.json(todo.showToDo());
    }
});

//show all users
app.get('/users', function(req, res) {
    res.json(todo.showAllUsers());
});

//show by state
app.get('/state', function(req, res) {
    res.json(todo.findToDoByState(req.query.assignedTo));
});

//-------------------------------------DELETE-------------------------------------
//delete a todo
app.delete('/delete/:id', function(req, res) {
    id = parseInt(req.params.id);
    if (todo.deleteToDo(id)) {
        return res.status(200).json({message: "element with id: " + id + " deleted!"});
    }
    else {
        return res.status(404).json({message: "sorry, item already deleted!"});
    }
});