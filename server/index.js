
const express = require('express');
const app = express();
const mysql = require('mysql2');
const cors = require('cors');
const http = require('http');
const {Server} = require('socket.io');

app.use(cors());
app.use(express.json());

const server = http.createServer(app);

const io = new Server(server, {
  cors: {
    origin: "http://localhost:3000",
    methods: ('GET', 'POST'),
  },
})

/*
**SQL create statements for table creating:**
----------------------------------
CREATE TABLE messages (
  user varchar(255) NOT NULL,
  message text NOT NULL
);

CREATE TABLE users (
  user varchar(255) NOT NULL
);
----------------------------------
*/

const db = mysql.createConnection({
  // Set your MySQL login info
  user: 'root',
  host: 'localhost',
  password: '', // write your password here
  database: 'reactsimplechatdb'
})

// Socket.io-functionality for real-time chat messaging.
io.on('connection', (socket) => {
  console.log('We are connected');
  console.log(`User Connected: ${socket.id}`);

  socket.on("chat", chat => {
    io.emit('chat', chat);
  });

  socket.on('disconnect', () => {
    console.log('disconnected');
  });
})

/*
Below are backend functionalities for:
  - message sending
  - login
  - getting all messages
  - getting all users
*/
app.post('/send', (req, res) => {
  const user = req.body.user;
  const message = req.body.message;

  db.query('INSERT INTO messages (user, message) VALUES (?,?)', [user, message],
    (err, result) => {
      if (err) {
        console.log(err);
      } else {
        res.send("message sent.");
      }
    }
  );
})

app.post('/login', (req, res) => {
  const user = req.body.user;

  db.query('INSERT INTO users (user) VALUES (?)', [user],
    (err, result) => {
      if (err) {
        console.log(err);
      } else {
        res.send('user logged in.');
      }
    }
  );
})

app.get('/messages', (req, res) => {
  db.query('SELECT * FROM messages', (err, result) => {
    if (err) {
        console.log(err);
      } else {
        res.send(result);
    }
  });
})

app.get('/users', (req, res) => {
  db.query('SELECT * FROM users', (err, result) => {
    if (err) {
      console.log(err);
    } else {
      res.send(result);
  }
  });
})

server.listen(3001, () => {
    console.log("chat backend is running.");
})