//a config file using the dotenv packages
require("dotenv").config();
require("./config/database").connect();

const express = require("express");
//@for the authenication password checking initsall bcrypt or crypto.js
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const cookieParser = require("cookie-parser");

const User = require("./model/user");

//!step-5
//@for the token access and sending a sucessful messages
const auth = require("./middleware/auth");

//!initialization of the express
const app = express();

//! can be used for ....middleware... because the
//express js cant use the json file directly which we are going to catch in the schema flow
app.use(express.json());
app.use(cookieParser());

//@home route creation
app.get("/", (req, res) => {
    res.send("<h1>hello from ...niks... authenication system</h1>");
});

//@step-1
//! getting all information from schema
app.post("/register", async(req, res) => {
    //? const firstname = req.body.firstname may be this can be done but exceptionally aother thing or process may be done here
    const { firstname, lastname, email, password } = req.body;

    //@step:2
    //!checking all the mndatory fields or checking the validation
    if (!(email && password && firstname && lastname))
        res.status(400).send("All fields are required");
    //for checking all the mandatory fields are their or not using if else and the comparision oerators

    //@step-3
    //!create a app which check the user is aleadr exist or not
    const existingUser = await User.findOne({ email }); // PROMISE
    // fine one is the query that is called from the mongoose db for the query of the doucment
    //and passing the parameter which is aleady exixting in it .
    if (existingUser) res.status(401).send("user already exists");
    // id the user is already exist then   send a status of the request code

    //@step-4
    //!checking the password or encrypt the password
    //hash is the method from bcrypt
    const myEncpassword = await bcrypt.hash(password, 6);

    //creating a constructor  for user name and data updation
    const user = await User.create({
        firstname,
        lastname,
        email: email.toLowerCase(),
        password: myEncpassword,
    });

    //!token creation
    const token = jwt.sign({ user_id: user._id, email }, process.env.SECRET_KEY, {
        expiresIn: "2h",
    });
    user.token = token;
    //undefined means ther password not shown in the postman api agent but in the databvbas e system is was saved
    user.password = undefined;
    //!if we want to store or update the database then we can do
    res.status(201).json(user);
});

//#login route - req both email and password for the login process
app.post("/login", async(req, res) => {
    try {
        const { email, password } = req.body;

        //#if any one from this is missing here using if and compasrision operator
        if (!(email && password)) {
            res.status(400).send("Field is missing");
        }
        //#if the email id is aleady registered or not here
        const user = await User.findOne({ email });

        // if(!user){
        //   res.status(400).send("You are not registered in our app")
        // }

        if (user && (await bcrypt.compare(password, user.password))) {
            const token = jwt.sign({ user_id: user._id, email },
                process.env.SECRET_KEY, {
                    expiresIn: "2h",
                }
            );

            //#the token and the password both are indefined here means they can be shown on the database not in the api agent
            user.token = token;
            user.password = undefined;
            // res.status(200).json(user);

            // if you want to use cookies
            const options = {
                expires: new Date(Date.now() + 3 * 24 * 60 * 60 * 1000),
                httpOnly: true,
            };

            res.status(200).cookie("token", token, options).json({
                success: true,
                token,
                user,
            });
        }

        // res.sendStatus(400).send("email or password is incorrect");
    } catch (error) {
        console.log(error);
    }
});

app.get("/dashboard", auth, (req, res) => {
    res.send("Welcome to secret information");
});

//in place of the listen route we need to say module.exports
module.exports = app;
//but this is needed to call in the main file = index.js bca his is running by the node.js