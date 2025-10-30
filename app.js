const express = require('express');
const fs = require('fs');
const app = express();

app.use(express.json());

const FILE_PATH = 'bookings.json';


let bookings = [];
let id = 1;

if (fs.existsSync(FILE_PATH)) {
  const data = fs.readFileSync(FILE_PATH);
  bookings = JSON.parse(data);
  if (bookings.length > 0) {
  const maxId = Math.max(...bookings.map(b => b.id));
  id = maxId + 1;
}

}


function saveBookings() {
  fs.writeFileSync(FILE_PATH, JSON.stringify(bookings, null, 2));
}



app.get('/api/bookings', (req, res) => {
  res.status(200).json({
    message: "All bookings retrieved successfully!",
    bookings
  });
});



app.post('/api/bookings', (req, res) => {
  const booking = {
    id: id++,
    name: req.body.name,
    email: req.body.email,
    event: req.body.event,
    date: req.body.date
  };
  bookings.push(booking);
  saveBookings();
  res.send('Booking added successfully');
});


app.get('/api/bookings/:id', (req, res) => {
  const bookingId = parseInt(req.params.id);
  const booking = bookings.find(b => b.id === bookingId);
  if (booking) res.send(booking);
  else res.send('Booking not found');
});


app.put('/api/bookings/:id', (req, res) => {
  const bookingId = parseInt(req.params.id);
  const booking = bookings.find(b => b.id === bookingId);
  if (booking) {
    booking.name = req.body.name;
    booking.email = req.body.email;
    booking.event = req.body.event;
    booking.date = req.body.date;
    saveBookings();
    res.send('Booking updated successfully');
  } else {
    res.send('Booking not found');
  }
});


app.delete('/api/bookings/:id', (req, res) => {
  const bookingId = parseInt(req.params.id);
  const index = bookings.findIndex(b => b.id === bookingId);
  if (index !== -1) {
    bookings.splice(index, 1);
    saveBookings();
    res.send('Booking deleted successfully');
  } else {
    res.send('Booking not found');
  }
});

app.listen(3000, () => {
  console.log('Synergia Booking API running on port 3000');
});
