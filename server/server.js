const express = require('express');
const path = require('path');
const session = require('express-session');
const routes = require('./routes');
const initiateSession = require("./middleware/initiateSession");

const app = express(); 

app.use(session({
    resave: true,
    saveUninitialized: true,
    secret: "MySecretVeryVerySecreyKey"
}));

app.get("/", initiateSession, (req, res) => { 
    res.sendFile(path.resolve(__dirname, "../app/index.html"));
});

app.use("/api", routes);

app.use("/static", express.static(path.resolve(__dirname, "../app/static/")));

app.post("/checkout", (req, res) => {
    console.log("/checkout POST");
    res.redirect("/");
}); 

app.listen(4600, () => {
    console.log("Server is running on port 4600");
});
