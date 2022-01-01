//%this getform file is in inside the views file to run the view engine test here

const express = require("express");
//@initialization for the express package installed

//!for uploading images and videos to yhe clodinary
const cloudinary = require("cloudinary").v2;
const app = express();

//$for the cloudinary configuration needs an api key nacuse the cloud has to know wheather the owner is youor not
cloudinary.config({
    //cloudname from the cloudinary
    //may be cloudname: process.env.CLOUD_NAME,
    cloudname: "dosco-mojitos",
    api_key: "221127388615728",
    api_secret: "PjsffydHSzQ0iFkyuiYAcJhagDo",
});

//$ for uploading an image or anyfile here reuire to acess the express.fileupload package and initialize it
const fileupload = require("express-fileupload");

//#this is also called as the midlleware but not the real middleware called the view engine middleware
app.set("view engine", "ejs"); //setting up the ejs

//$ use of middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true })); //% to avoid from the getting the data we need to add keyword extended : true;

//$needs a midele ware for the fileupload needs to include this
app.use(
    fileupload({
        useTempFiles: true,
        tempFiledir: "/tmp",
    })
);

//#handling the get request at the POSTMAN agent
app.get("/myget", (req, res) => {
    console.log(req.body);

    res.send(req.query);
});

//$  route for posting my images or file
app.get("/mypost", (req, res) => {
    console.log(req.body);
    //! to see the informtaion of it needs to enable this
    console.log(req.files);
    //# let someone needs to ulpoad some file to the cloudinry here so let n=]make a file that need to upload it
    let file = req.files.sampleone; //@samplefile name

    result = cloudinry.uploader.upload(file, {
        folder: "users", //name of the cloudinry FILE WHEREE WE WANT TO PUT OUR IMAGES AND VIDEOS HERE
    });
    CONSOLE.LOG(result);

    //# instead if query the request we can use the details the object of form then run this
    details = {
        firstname: req.body.firstname,
        lastname: req.body.lastname,
    };
    res.send(details);
});

//@to run the getform.js file in the app
app.get("/gotform", (req, res) => {
    res.render("getform");
});

app.get("/postform", (req, res) => {
    res.render("postform");
});

app.listen(4000, () => console.log("hey your server is running sucessfully"));
//@checking the server is in running or not