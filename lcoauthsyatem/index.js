const app = require("./app"); //call the app created in the app.js

//call the port using the .env file
const { PORT } = process.env;
app.listen(4000, () => console.log("ohhh!!!!!!..your server is running"));