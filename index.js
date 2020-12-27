const express = require('express')
const app = express()
require('dotenv').config()
const db = require('./db/index')
const Todos = require('./model/todos')
const TodosFieldNames = require('./model/todos').fieldNames
const path = require('path');


app.set('json spaces', 3)
const bodyParser = require("body-parser");
app.use(bodyParser.urlencoded({
    extended: true
}));
app.use(express.static(path.join(__dirname, './frontend/build')));
app.use(bodyParser.json());


app.get('/api', async (req, res) => {
const fieldNames = Object.keys(TodosFieldNames)
try {
    const todos = await Todos.find({})
        .exec();
    res.json({
        todos
    });
} catch (err) {
    console.error(err.message);
}
})

app.get('/api/todos/:id', async (req, res) => {
    Todos.findById(req.params.id).then((todo) => {
        if (todo) {
            res.json(todo)
        } else {
            res.sendStatus(404);
        }
    }).catch(err => {
        if (err) {
            throw err;
        }
    })
});
app.put('/api/todos/:_id', async (req, res) => {
    console.log(req.params._id)
    Todos.findByIdAndUpdate(req.params._id,req.body,{new: true}).then((todo) => {
        res.json({
            result: "Updated"
        })
    }).catch(err => {
        if (err) {
            throw err;
        }
    })
  })
app.delete('/api/todos/:_id', (req, res) => {
    Todos.findByIdAndDelete(req.params._id).then((todo) => {
        res.json({
            result: "Deleted"
        })
    }).catch(err => {
        if (err) {
            throw err;
        }
    })
  })

app.post('/api/addTodo', async (req, res) => {
        const ntodos = new Todos({
            todo: req.body.todo,
            isCompleted: req.body.isCompleted
        })
        ntodos.save((err) => {
            if (err) {
                return res.json({
                    err
                })
            }
            res.json({
                result: "Added"
            })
            console.log('Added')
        })
})
app.listen(process.env.PORT || 3000, function () {
    console.log("Express server listening on port %d in %s mode", this.address().port, app.settings.env);
});