const express = require('express');
const app = express();

app.use(express.json());

let events = [];


app.post('/events', (request, response) => {
  const newEvent = {
    title: request.body.title,
    desc: request.body.desc,
    capacity: request.body.capacity,
    date: Date.parse(request.body.date)
  };

  
  events.push(newEvent);
  console.log('New event added:', newEvent);
  response.status(201).json({
    message: 'Event added successfully!',
    event: newEvent
  });
});


app.get('/events', (request, response) => {
  response.json(events);
});
app.put('/updating',
    (request, response) => {
        let updateEvent = request.body.updateEvent; 
        let eventIdx = events.findIndex((event) => event.title == updateEvent.title);

        if (eventIdx === -1) {
            return response.status(404).send("Event not found");
        }

        events[eventIdx] = updateEvent;
        response.send(events);
    }
);

app.delete('/events/:title', (request, response) => {
  const eventTitle = request.params.title; 
  const eventIdx = events.findIndex(event => event.title === eventTitle);
  if (eventIdx === -1) {
    return response.status(404).send('Event not found');
  }
  const deletedEvent = events.splice(eventIdx, 1);
  response.status(200).json({
    message: 'Event deleted successfully!',
    deleted: deletedEvent
  });
});
app.listen(3000, () => {
  console.log('i have started');
});
