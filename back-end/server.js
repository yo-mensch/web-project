const express = require('express');
const cors = require('cors');
const bookmarkController = require('./controllers/bookmarkController');
const userController = require("./controllers/userController");

const app = express();

app.use(cors());
app.use('/bookmarks', bookmarkController);
app.use('/users', userController);

const PORT = process.env.PORT || 3003;
app.listen(PORT, () => console.log(`Server started on port ${PORT}`));
