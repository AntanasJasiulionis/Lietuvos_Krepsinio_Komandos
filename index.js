import express from "express";
import axios from "axios";

const app = express();
const port = 8000;
const API_URL = "https://lithuanianbasketballteamsapi-production.up.railway.app"
let teamData;
let playerData;
let userInput;
let errorMessage;

app.use(express.urlencoded({extended: true}));
app.use(express.static("public"));

app.get("/", async (req, res) => {
    try {
        const teamsData = await axios.get(API_URL + "/all");
        res.render("index.ejs", {allTeams: teamsData.data, team: teamData, player: playerData, search: userInput, error: errorMessage});
    } catch (error) {
        res.send(error);
    }
});

app.get("/team/:id", async (req, res) => {
    playerData = null;
    userInput = null;
    errorMessage = null;
    try {
        teamData = await axios.get(API_URL + `/team/${req.params.id}`);
        teamData = teamData.data;
        res.redirect("/");
    } catch (error) {
        teamData = null;
        errorMessage = "TOKIOS KOMANDOS NĖRA."
        res.status(404).redirect("/");
    }
});

app.post("/person", async (req, res) => {
    //Received user input and make it as string
    if(req.body.name && !req.body.lastname){
        userInput = req.body.name;
    } else if (req.body.name && req.body.lastname) {
        userInput = req.body.name + " " + req.body.lastname;
    } else if (!req.body.name && req.body.lastname) {
        userInput = req.body.lastname;
    }
    if(req.body.position && req.body.position !== "none") {
        userInput = req.body.position;
    }
    teamData = null;
    const config = { params: req.body };
    try {
        //Only get data when user inputed
        if(req.body.position && req.body.position !== "none" || req.body.name || req.body.lastname){
            errorMessage = null;
            playerData = await axios.get(API_URL + "/search", config);
            playerData = playerData.data;
        } else if(req.body.position === "none") {
            //Otherwise delete data, and show error
            userInput = null;
            playerData = null;
            errorMessage = "PASIRINKITE POZICIJĄ.";
        } else if(!req.body.name || !req.body.lastname){
            userInput = null;
            playerData = null;
            errorMessage = "ĮVESKITE VARDĄ ARBA PAVARDĘ.";
        }
        res.redirect("/");
    } catch (error) {
        playerData = null;
        errorMessage = "TOKIO ŽMOGAUS NĖRA. PATIKRINKITE AR GERAI ĮVESTA.";
        res.status(404).redirect("/");
    }
});

app.listen(port, () => {
    console.log(`Webapp is running on port ${port}`);
});