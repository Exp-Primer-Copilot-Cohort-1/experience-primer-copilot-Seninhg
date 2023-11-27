//create web server
const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const port = 3000;
const fs = require('fs');

// Parse JSON bodies (as sent by API clients)
app.use(express.urlencoded({ extended: false }));
app.use(express.json());
app.use(bodyParser.json());

//get all comments
app.get('/api/comments', (req, res) => {
    fs.readFile('./data/comments.json', 'utf-8', (err, data) => {
        if (err) {
            return res.status(404).send({
                message: err.message
            });
        }
        const json = JSON.parse(data);
        res.send(json);
    });
});

//get comments by id
app.get('/api/comments/:id', (req, res) => {
    const id = req.params.id;
    fs.readFile('./data/comments.json', 'utf-8', (err, data) => {
        if (err) {
            return res.status(404).send({
                message: err.message
            });
        }
        const json = JSON.parse(data);
        const comment = json.find((comment) => comment.id === parseInt(id));
        if (comment) {
            res.send(comment);
        } else {
            res.status(404).send({
                message: `comment with id ${id} not found`
            });
        }
    });
});

//create a new comment
app.post('/api/comments', (req, res) => {
    const comment = req.body;
    fs.readFile('./data/comments.json', 'utf-8', (err, data) => {
        if (err) {
            return res.status(404).send({
                message: err.message
            });
        }
        const json = JSON.parse(data);
        json.push(comment);
        fs.writeFile('./data/comments.json', JSON.stringify(json), (err) => {
            if (err) {
                return res.status(404).send({
                    message: err.message
                });
            }
            res.send(comment);
        });
    });
});

//update comment by id
app.put('/api/comments/:id', (req, res) => {
    const id = req.params.id;
    const comment = req.body;
    fs.readFile('./data/comments.json', 'utf-8', (err, data) => {
        if (err) {
            return res.status(404).send({
                message: err.message
            });
        }
        const json = JSON.parse(data);
        const index = json.findIndex((comment) => comment.id === parseInt(id));
        if (index !== -1) {
            json[index] = comment;
            fs.writeFile('./data/comments.json', JSON.stringify(json), (err) => {
                if (err) {
                    return res.status(404).send({
                        message: err.message
                    });
                }
                res.send(comment);
            });
        } else {
            res.status(404).send({
                message: `comment with id ${id} not found`
            });
        }
    }
    );
}   
);

