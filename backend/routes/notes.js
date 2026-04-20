const express = require("express");
const router = express.Router();
const auth = require("../middleware/auth");
const Note = require("../models/Note");

router.get("/", auth, async (req, res) => {
    try {
        let query = { user: req.user.id };

        if (req.query.search) {
            query.title = { $regex: req.query.search, $options: "i" };
        }

        const notes = await Note.find(query).sort({ createdAt: -1 });
        res.json(notes);
    } catch (err) {
        console.error(err.message);
        res.status(500).send("Server Error");
    }
});

router.post("/", auth, async (req, res) => {
    try {
        const { title, description } = req.body;

        const newNote = new Note({
            title,
            description,
            user: req.user.id,
        });

        const note = await newNote.save();
        res.json(note);
    } catch (err) {
        console.error(err.message);
        res.status(500).send("Server Error");
    }
});

router.put("/:id", auth, async (req, res) => {
    try {
        const { title, description } = req.body;

        const noteFields = {};
        if (title) noteFields.title = title;
        if (description) noteFields.description = description;

        let note = await Note.findById(req.params.id);
        if (!note) return res.status(404).json({ message: "Note not found" });

        if (note.user.toString() !== req.user.id) {
            return res.status(401).json({ message: "Not authorized" });
        }

        note = await Note.findByIdAndUpdate(
            req.params.id,
            { $set: noteFields },
            { new: true },
        );

        res.json(note);
    } catch (err) {
        console.error(err.message);
        res.status(500).send("Server Error");
    }
});

router.delete("/:id", auth, async (req, res) => {
    try {
        let note = await Note.findById(req.params.id);

        if (!note) return res.status(404).json({ message: "Note not found" });

        if (note.user.toString() !== req.user.id) {
            return res.status(401).json({ message: "Not authorized" });
        }

        await Note.findByIdAndDelete(req.params.id);
        res.json({ message: "Note removed" });
    } catch (err) {
        console.error(err.message);
        res.status(500).send("Server Error");
    }
});

module.exports = router;
