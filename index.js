const Discord = require('discord.js')
const client = new Discord.Client({intents : 32767 }) 
    const prefix = "d!";
const {Database}  = require("quickmongo");
const db = new Database(`mongodb+srv://Velvet:cZQk4SVbG9utLM5h@cluster0.vx3jf.mongodb.net/dev-center?retryWrites=true&w=majority`);


client.login('')