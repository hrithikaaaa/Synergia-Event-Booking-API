const express = require('express');
const app = express();

app.use(express.json());

let events = [];

// Create event
app.post('/event', (req, res) => {
  const event = req.body;
  events.push(event);
  res.status(201).json({ message: 'Event added successfully', event });
});

// Read all events
app.get('/event', (req, res) => {
  res.json(events);
});

// Update event (by name, for example)
app.put('/event', (req, res) => {
  const { name, newDetails } = req.body;
  const event = events.find(e => e.name === name);

  if (event) {
    Object.assign(event, newDetails);
    res.json({ message: 'Event updated', event });
  } else {
    res.status(404).json({ message: 'Event not found' });
  }
});

// Delete event
app.delete('/event', (req, res) => {
  const { name } = req.body;
  events = events.filter(e => e.name !== name);
  res.json({ message: 'Event deleted', events });
});

// Resume route
app.get('/resume', (req, res) => {
  const resume = {
    name: "Hrithika",
    age: 20,
    education: "B.E. in Computer Science"
  };
  res.json(resume);
});

// Login route
app.get('/login', (req, res) => {
  const email = req.query.emailId;
  const password = req.query.password;

  console.log(email);
  console.log(password);

  res.sendStatus(200);
});

// Start server
app.listen(3000, () => {
  console.log('Server is running on port 3000');
});
