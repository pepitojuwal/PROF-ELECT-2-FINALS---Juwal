const express = require('express');
const bodyParser = require('body-parser');

const app = express();
const port = 3000;

app.use(bodyParser.json());

let students = [];


app.post('/students', (req, res) => {
    const { id, name, age, course } = req.body;
    if (!id || !name || !age || !course) {
        return res.status(400).send('All fields are required!');
    }
    const student = { id, name, age, course };
    students.push(student);
    res.status(201).send(student);
});


app.put('/students/:id', (req, res) => {
    const { id } = req.params;
    const { name, age, course } = req.body;
    const student = students.find(s => s.id === id);
    if (!student) {
        return res.status(404).send('Student is not found!');
    }
    if (name) student.name = name;
    if (age) student.age = age;
    if (course) student.course = course;
    res.send(student);
});


app.delete('/students/:id', (req, res) => {
    const { id } = req.params;
    const index = students.findIndex(s => s.id === id);
    if (index === -1) {
        return res.status(404).send('Student is not found!');
    }
    students.splice(index, 1);
    res.status(204).send();
});

app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
});