# Simple Chat
This is a simple fullstack chat app running in local environment. It's a modified version of [@ksekwamote](https://github.com/ksekwamote)'s [simple_chat_app](https://github.com/ksekwamote/simple_chat_app). Changes I made were changing database from Firebase to MySQL and building my own site layout.


https://github.com/bgh304/ReactSimpleChat/assets/57593354/c952c184-3942-4a69-bc8f-67dd09c412a5


## Technologies used
- React
- Node.JS
- SQL
- Socket.io


## SQL setup
Create a database named **reactsimplechatdb**.

Rum following SQL create statements for the database:
```
CREATE TABLE messages (
  user varchar(255) NOT NULL,
  message text NOT NULL
);

CREATE TABLE users (
  user varchar(255) NOT NULL
);
```


## Authors
Antti Salonen [@bgh304](https://github.com/bgh304)
