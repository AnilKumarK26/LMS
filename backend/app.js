const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const path = require('path');
const cors = require("cors");
const middleware = express.json()


const app = express();
const port = 3000;

app.use(cors())

mongoose.connect('mongodb://localhost:27017/bg')
    .then(() => {
        console.log('Connected to MongoDB');
    })

const Student = require("./models/studentSchema")
const Note = require("./models/noteSchema")

app.use(bodyParser.urlencoded({ extended: true }));

app.use(middleware)


app.post('/register', async (req, res) => {
    try {
      //console.log(req.body)

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

app.post('/login', async (req, res) => {
    try {
        //console.log(req.body)
      const student = await Student.findOne({ email: req.body.email });
        //console.log(student)
      if (!student || !(await bcrypt.compare(req.body.password, student.password))) {
        return res.status(401).json({ message: 'Invalid username or password.' });
      }

      const token = jwt.sign({ userId: student._id}, 'your-secret-key', { expiresIn: '1h' });
      res.status(200).json({ status:"ok",token });
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: 'Internal Server Error' });
    }
  });

app.post('/attempt', async (req, res) => {

    console.log(req.body)
   
    const { email,examName, marks, topics } = req.body;
   

    try {
        const student = await Student.findOne({ email: req.body.email });

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

app.post("/get-details",async(req,res) =>{
    const {email} = req.body
    const student = await Student.findOne({ email: req.body.email });
    res.status(200).json(student)
})


app.post('/notes', async (req, res) => {
  try {
    const { email, title, description } = req.body;

    const student = await Student.findOne({ email });
    if (!student) {
      return res.status(404).json({ error: 'Student not found' });
    }

    const { firstName } = student;

    const newNote = new Note({
      userFirstName: firstName,
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

app.get('/get/notes', async (req, res) => {
  try {
    const notes = await Note.find();
    res.json({ notes });
  } catch (error) {
    console.error('Error fetching notes:', error);
    res.status(500).json({ error: 'Failed to fetch notes' });
  }
});

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

app.listen(port, () => {
    console.log(`Server is running at http://localhost:${port}`);
  });