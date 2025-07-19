require('dotenv').config(); // Load environment variables

const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const cors = require('cors');

const app = express();
const port = process.env.PORT || 3000;

// Middleware
app.use(cors());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.json());

// MongoDB Connection
mongoose.connect(process.env.MONGODB_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true
}).then(() => {
    console.log('✅ Connected to MongoDB Atlas');
}).catch((err) => {
    console.error('❌ MongoDB connection error:', err);
});

// Models
const Student = require("./models/studentSchema");
const Note = require("./models/noteSchema");

// POST /register
app.post('/register', async (req, res) => {
    try {
        const hashedPassword = await bcrypt.hash(req.body.password, 10);
        const newStudent = new Student({
            email: req.body.email,
            firstName: req.body.firstName,
            lastName: req.body.lastName,
            password: hashedPassword,
        });
        await newStudent.save();
        res.status(200).json({ message: 'Student registration successful.' });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Internal Server Error' });
    }
});

// POST /login
app.post('/login', async (req, res) => {
    try {
        const student = await Student.findOne({ email: req.body.email });
        if (!student || !(await bcrypt.compare(req.body.password, student.password))) {
            return res.status(401).json({ message: 'Invalid username or password.' });
        }

        const token = jwt.sign(
            { userId: student._id },
            process.env.JWT_SECRET,
            { expiresIn: '1h' }
        );
        res.status(200).json({ status: "ok", token });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Internal Server Error' });
    }
});

// POST /attempt
app.post('/attempt', async (req, res) => {
    const { email, examName, marks, topics } = req.body;

    try {
        const student = await Student.findOne({ email });

        if (!student) {
            return res.status(404).json({ message: 'Student not found' });
        }

        const previousAttemptIndex = student.progress.findIndex(attempt => attempt.examName === examName);

        if (previousAttemptIndex !== -1) {
            student.progress[previousAttemptIndex].attempts.push({ marks, topics });
        } else {
            student.progress.push({ examName, attempts: [{ marks, topics }] });
        }

        await student.save();

        res.status(200).json({ message: 'Exam attempt saved successfully' });
    } catch (error) {
        console.error('Error:', error.message);
        res.status(500).json({ message: 'Internal server error' });
    }
});

// POST /get-details
app.post("/get-details", async (req, res) => {
    try {
        const student = await Student.findOne({ email: req.body.email });
        res.status(200).json(student);
    } catch (err) {
        res.status(500).json({ message: 'Error fetching student' });
    }
});

// POST /notes
app.post('/notes', async (req, res) => {
    try {
        const { email, title, description } = req.body;
        const student = await Student.findOne({ email });

        if (!student) {
            return res.status(404).json({ error: 'Student not found' });
        }

        const newNote = new Note({
            userFirstName: student.firstName,
            userEmail: email,
            title,
            description,
            createdAt: new Date(),
            updatedAt: new Date()
        });

        await newNote.save();
        res.status(201).json({ message: 'Note created successfully', note: newNote });
    } catch (error) {
        console.error('Error creating note:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
});

// GET /get/notes
app.get('/get/notes', async (req, res) => {
    try {
        const notes = await Note.find();
        res.json({ notes });
    } catch (error) {
        console.error('Error fetching notes:', error);
        res.status(500).json({ error: 'Failed to fetch notes' });
    }
});

// GET /notes/:id
app.get('/notes/:id', async (req, res) => {
    try {
        const note = await Note.findById(req.params.id);
        if (!note) {
            return res.status(404).json({ error: 'Note not found' });
        }
        res.json({ note });
    } catch (error) {
        console.error('Error fetching note:', error);
        res.status(500).json({ error: 'Failed to fetch note' });
    }
});

// Server Listen
app.listen(port, () => {
    console.log(`🚀 Server running at http://localhost:${port}`);
});
