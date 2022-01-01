const express = require("express");
const app = express();

const swaggerUi = require("swagger-ui-express");
const YAML = require("yamljs");
const swaggerDocument = YAML.load("./swagger.yaml");

app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerDocument));

const PORT = process.env.PORT || 4000;
var format = require("date-format");

//thi sis called as the swagger documentation for the api
/**
 * @openapi
 * /:
 *   get:
 *     description: Welcome to swagger-jsdoc!
 *     responses:
 *       200:
 *         description: Returns a mysterious string.
 */
app.get("/", (req, res) => {
    res.send("Hello World!");
});

app.get("/", (req, res) => {
    res.status(200).send("hello this i my port and i am here");
});

app.get("/api/v1/instagram/", (req, res) => {
    const instaMyProfile = {
        username: "subhrajieetpandey",
        followers: 20110,
        following: 747,
        date: format.asString(),
        //this date situation is gives us the number random at the object field
    };
    res.status(200).json(instaMyProfile);
});

app.get("/api/v1/facebook/", (req, res) => {
    const facebookMyProfile = {
        username: "subhrajieetpandey",
        followers: 20110,
        following: 747,
        date: Date.now(),
    };
    res.status(200).json(facebookMyProfile);
});

app.get("/api/v1/linkedin/", (req, res) => {
    const linkedinMyProfile = {
        username: "subhrajieetpandey",
        followers: 20110,
        following: 747,
        date: Date.now(),
    };
    res.status(200).json(linkedinMyProfile);
});

app.get("/api/v1/twitter/", (req, res) => {
    const twitterMyProfile = {
        username: "subhrajieetpandey",
        followers: 20110,
        following: 747,
        date: Date.now(),
    };
    res.status(200).json(twitterMyProfile);
});

//putting at the end of the apps and put before the listen app becasuse the the code was readinf the prograame the the programme is forst running form the top to bottom
app.get("/api/v4/:token", (req, res) => {
    console.log(req.params.token);
    res.status(200).json({ param: req.params.token });
});

app.listen(PORT, () => {
    console.log(`server is running using port ${PORT}`);
});