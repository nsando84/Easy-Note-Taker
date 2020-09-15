const express = require('express')
let note = require("../db/db.json")
const fs = require('fs')
const { v4: uuidv4 } = require('uuid');
const { get } = require('http');

module.exports = app => {

    app.get('/api/notes', (req, res) => res.json(note));
    
    app.get('/api/notes/:id', (req, res) => {
        let noteId = req.params.id
        for (let i = 0; i < note.length; i++) {
            if (note[i].id === noteId) {
                return res.json(note[i])
            }
        }
        return res.json('ID was not found.')
    });  

    app.post('/api/notes', (req, res) => {
        if (req.body.title === 0 || req.body.text === 0) {
            res.send('please enter all fields.')
        } else {
            const newNote = {
                id: uuidv4(),
                title: req.body.title,
                text: req.body.text
            }
            note.unshift(newNote)
            let fixedData = JSON.stringify(note, null, 2)
            fs.writeFile('./db/db.json', fixedData, function(err){
                if (err) throw err
            })
            return res.json(newNote)
        }
    });

    app.put('/api/notes/:id', (req, res) => {
            let query  = req.params.id
            for (let i = 0; i < note.length; i++) {
                    if (note[i].id === query) {
                        let updateMe = note[i]
                        updateMe.title = req.body.title
                        updateMe.text = req.body.text
                        let fixedData = JSON.stringify(note, null, 2)
                        fs.writeFile('./db/db.json', fixedData, function(err){
                        if (err) throw err
                        
                        })
                        res.status(200).json({message: 'changed'})
                    } 
            } 
    });

    app.delete('/api/notes/:id', (req, res) => {
        let query  = req.params.id
        let deleteId = note.find(elem => elem.id === query)
        if (deleteId) {
            note = note.filter(elem => elem.id !== query)
            let fixedData = JSON.stringify(note, null, 2)
            fs.writeFile('./db/db.json', fixedData, function(err){
                if (err) throw err
            })
            res.status(200).json(deleteId)
        } else {
            console.log("dasdas" + deleteId)
            res.status(404).json({message: 'note does not exist'})
        }
    })
    
};




