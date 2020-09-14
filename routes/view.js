const express = require('express')
const router = express.Router()
const note = require("../db/db")
const fs = require('fs')


router.get('/', (req, res) => res.json(note))

router.post('/', (req, res) => {
    
    if (req.body.length == 0 || req.text.length == 0) return res.write("please enter all fields.")


    const newNote = {
        title: req.body.title,
        text: req.body.text
    }
    
    note.push(newNote)
    let fixedData = JSON.stringify(note, null, 2)
    fs.writeFile('./db/db.json', fixedData, function(err){
        if (err) throw err
    })
    res.json(newNote)
})





module.exports = router