const express = require('express');
const router = express.Router();
const fetchuser = require('../middleware/fetchuser');
const Note = require('../models/Note');
const { body, validationResult } = require('express-validator');


// Route 1: Get all the notes using: GET "/api/auth/getuser". Login required
router.get('/fetchallnotes', fetchuser, async (req, res) => {
    const notes = await Note.find({ user: req.user.id });

    res.json(notes);
})

// Route 1: Add a new note using: POST "/api/auth/addnote". Login required
router.post('/addnote', fetchuser, [
    body('title', 'Enter a valid title').isLength({ min: 3 }),
    body('description', 'Description must be at least 5 characters').isLength({ min: 5 })
], async (req, res) => {
    try {
        const { title, description, tag } = req.body;

        // if there are errors, return bad request and the errors
        const errors = validationResult(req);
        if (!errors.isEmpty) {
            return res.status(400).json({ errors: errors.array() });
        }

        const notes = new Note({
            title, description, tag, user: req.user.id
        });

        const savedNote = await notes.save();

        res.json(savedNote);
    } catch (error) {
        console.error(error.message);
        res.status(500).send('Internal Server Error Occured');
    }

})

// Route 3: Update an existing note using: PUT "/api/auth/updatenote". Login required
router.put('/updatenote/:id',
    fetchuser,
    async (req, res) => {
        try {
            const { title, description, tag } = req.body;
            // create a newNote object
            const newNote = {};
            if (title) { newNote.title = title };
            if (description) { newNote.description = description };
            if (tag) { newNote.tag = tag };

            // find the note to be updated and update it
            let note = await Note.findById(req.params.id);

            // checking whether the note which user wants to access exists or not
            if (!note) { return res.status(404).send('Not Found') }

            // verifying user
            if (note.user.toString() !== req.user.id) {
                return res.status(401).send('Not Allowed');
            }

            // updating note
            note = await Note.findByIdAndUpdate(req.params.id, { $set: newNote }, { new: true });

            res.json({ note });

        } catch (error) {
            console.error(error.message);
            res.status(500).send('Internal Server Error Occured');
        }
    })


// Route 4: Delete an existing note using: PUT "/api/auth/updatenote". Login required
router.delete('/deletenote/:id',
    fetchuser,
    async (req, res) => {
        try {
            // create a newNote object
            const newNote = {};

            // find the note to be deleted and delete it
            let note = await Note.findById(req.params.id);

            // checking whether the note which user wants to access exists or not
            if (!note) { return res.status(404).send('Not Found') }

            // verifying user
            if (note.user.toString() !== req.user.id) {
                return res.status(401).send('Not Allowed');
            }

            // delete note
            note = await Note.findByIdAndDelete(req.params.id);

            res.json({ 'Success': 'Note has been deleted', note: note });

        } catch (error) {
            console.error(error.message);
            res.status(500).send('Internal Server Error Occured');
        }
    })




module.exports = router;