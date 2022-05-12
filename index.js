const Discord = require('discord.js')
const client = new Discord.Client({intents : 32767 }) 
const {Database}  = require("quickmongo");
const db = new Database(`mongodb+srv://Adham:yZkCtO2Zt8t7PF8d@offarat-database.mwqdl.mongodb.net/offarat?retryWrites=true&w=majority`);
const wait = (time) => new Promise(resolve => setTimeout(() => resolve(true), time))
const prefix = '#';
const DiscordModal = require('discord-modal')
const { REST } = require('@discordjs/rest');
const { Routes } = require('discord-api-types/v9');
DiscordModal(client)
const { Player, QueryType, QueueRepeatMode } = require("discord-player");
const player = new Player(client);
function createid(length) {
    var result           = '';
    var characters       = '0123456789';
    var charactersLength = characters.length;
    for ( var i = 0; i < length; i++ ) {
      result += characters.charAt(Math.floor(Math.random() * 
 charactersLength));
   }
   return result;
}
client.on('ready' , async () => {

    await db.connect().then(
        console.log(`Connected To DataBase`)
    )

    const permissions = [
        {
            id: '602758334520623125',
            type: 'USER',
            permission: true,
        },
    ];

    
    // db.delete(`user_602758334520623125.staffid` , 000)
     console.table(await db.all())
    console.log(`${client.user.username} Online`)
    client.user.setActivity(`your Offers` , {type : "WATCHING"})
    client.user.setStatus('idle')
    // await client.application.commands.set([]);

    const commands = [{
        name :"set-config",
        description:"changes your server configs",
        options : [{
                name : "choose",
                description : "What Exactly?",
                type : 3,
                choices: [
                    {
                        "name": "Server Config",
                        "value": "server"
                    },
                    {
                        "name": "Offers Config",
                        "value": "offers"
                    }
                    
                ],
                required : true
                }]
    },
    {
        name :"show-config",
        description:"shows your server configs",
    },{
        name : "eval",
        description : "Evals a Certain Code",
        options : [{
        name : "code",
        description : "First Argument",
        type : "3",
        required : true,
}]
},
{
    name :"update",
    description:"shows the bots latest update",
}
]
    
const rest = new REST({ version: '9' }).setToken(`OTYzNzY4OTI1OTQ0OTQyNjMz.G5hSB1.4x7QxvJh14J3C6tuSoHGgFDv9grE_SpHw-v0Us`);

(async () => {
	try {
		console.log('Started refreshing application (/) commands.');

        await rest.put(
            Routes.applicationCommands(client.user.id),
            { body: commands },
        );

		console.log('Successfully reloaded application (/) commands.');
	} catch (error) {
		console.error(error);
	}
})();

})

client.on('messageCreate' , async (message) => {
    let data = await db.get(`config_${message.guildId}`)
   if (!data) return;
 if (message.content.startsWith(prefix + 'help')){



        let embed = new Discord.MessageEmbed()
        .setColor('RANDOM')
        .setDescription(`<:Check:949722090238541904> __**Setup Commands**__\n\`/set-config\`\n\`/show-config\`\n\n<:884877255459889203:891906828638756914> **__Admin Commands__**\n\`${prefix}fb\`\n\`${prefix}blacklist\`\n\`${prefix}unblackist\`\n\`${prefix}tag\`\n\`${prefix}fb\`\n\n<:dotfill:949721316553015366> __**General Commands**__\n\`${prefix}avatar\`\n\`${prefix}banner\`\n\`${prefix}come\`\n\`${prefix}ping\`\n\n__**Music Commands**__\n\`${prefix}play\`\n\n__**System Commands**__\n+UnderWork`)
        .setThumbnail(message.guild.iconURL({dynamic:true}))
        .setAuthor({name : `${client.user.username} Help Menu`})
        message.reply({embeds : [embed]})
    }
})

client.on(`interactionCreate`,(interaction)=>{
    if(interaction.isCommand()){
     if(interaction.commandName == "set-config"){
        if (!interaction.member.permissions.has("ADMINSTRATOR")) return interaction.reply(`You Don't Have Permission.`)
        const choice = interaction.options.getString('choose')
        if (choice === 'server'){
        const textinput = new DiscordModal.TextInput()
        .setCustomId("server_config")
        .setTitle("Server-Config")
        .addComponents(
          new DiscordModal.TextInputField()
          .setLabel("Offers Role ID")
          .setStyle("short")
          .setCustomId("role_id")
          .setRequired(true),//Its default value is false,
          new DiscordModal.TextInputField()
          .setLabel("Line URl")
          .setStyle("short")
          .setMin(0)
          .setMax(4000)
          .setCustomId("line_url"),
          new DiscordModal.TextInputField()
          .setLabel("Suggestion Room ID")
          .setStyle("short")
          .setMin(0)
          .setMax(21)
          .setCustomId("sug_id"),
          new DiscordModal.TextInputField()
          .setLabel("Feedback Room ID")
          .setStyle("short")
          .setMin(0)
          .setMax(21)
          .setCustomId("feedback_id"),
          new DiscordModal.TextInputField()
          .setLabel("Transfer Room ID")
          .setStyle("short")
          .setMin(0)
          .setMax(21)
          .setCustomId("transfer_id"),
          )

          
          client.TextInputs.open(interaction, textinput)   
        } else if (choice === 'offers'){
            const textinput = new DiscordModal.TextInput()
            .setCustomId("offers_config")
            .setTitle("Offers-Config")
            .addComponents(
                new DiscordModal.TextInputField()
                .setLabel("Ticket Category")
                .setStyle("short")
                .setMin(0)
                .setMax(21)
                .setCustomId("category_id"),
                new DiscordModal.TextInputField()
                .setLabel("Tax Channel ID")
                .setStyle("short")
                .setMin(0)
                .setMax(21)
                .setCustomId("tax_id"),
                new DiscordModal.TextInputField()
                .setLabel("Tag")
                .setStyle("short")
                .setMin(0)
                .setMax(21)
                .setCustomId("tag_id"),
                new DiscordModal.TextInputField()
                .setLabel("Team Post Room ID")
                .setStyle("short")
                .setMin(0)
                .setMax(21)
                .setCustomId("post_id"),
                new DiscordModal.TextInputField()
                .setLabel("Offer Post Room ID")
                .setStyle("short")
                .setMin(0)
                .setMax(21)
                .setCustomId("offer_post_id"),

              )
    
              
              client.TextInputs.open(interaction, textinput)   
            }
     }
    }
    })

    
 client.on("interactionTextInput",async(interaction)=>{
    if(interaction.customId == 'server_config'){
       await db.set(`config_${interaction.guild.id}` , {
            discount_role: `${interaction.fields[0].value}`,
            line_url :`${interaction.fields[1].value}`,
            sug_id :`${interaction.fields[2].value}`,
            feedback_id :`${interaction.fields[3].value}`,
            transfer_id :`${interaction.fields[4].value}`,
            time : `${Date.now().toString().slice(0 , 10)}`,

        })
        interaction.reply(`<:884877216511557686:891907035858341898> **Applying Changes Please Wait.**`).then(
        interaction.channel.send(`<:power_red_circle:894173022192300062> Changes Uploaded!`)
        )
    } else     if(interaction.customId == 'offers_config'){
        let data = await db.get(`config_${interaction.guild.id}`)
        data["category_id"] = interaction.fields[0].value
        data["tax_id"] = interaction.fields[1].value
        data["tag_id"] = interaction.fields[2].value
        data["post_id"] =interaction.fields[3].value
        data["offer_post_id"] =interaction.fields[4].value

        await db.set(`config_${interaction.guild.id}` , data)


         interaction.reply(`<:884877216511557686:891907035858341898> **Applying Changes Please Wait.**`).then(
         interaction.channel.send(`<:power_red_circle:894173022192300062> Changes Uploaded!`)
         )
     }
})

client.on('messageCreate' , async (message) => {
    if (message.content === prefix + 'ping'){
        message.reply(`**${client.user.username}'s Ping \`${client.ws.ping}ms\`**`)
    }
})

client.on('messageCreate' , async (message) => {
    if (message.content === `<@${client.user.id}>`){
        message.reply(`**${client.user.username}'s Server Prefix is \`${prefix}\`**`)
    }
})

client.on('messageCreate' , async (message) => {
    let feedback_id = await db.get(`config_${message.guildId}.feedback_id`)
    let line_url = await db.get(`config_${message.guildId}.line_url`)

    if (message.channel.id === feedback_id){
        if (message.author.bot) return;
        let embed = new Discord.MessageEmbed()
        .setAuthor({name : `Thanks For Your Feedback` , iconURL : `${message.author.avatarURL({dynamic:true})}`})
        .setImage(line_url)
        .setColor('RANDOM')
        message.reply({embeds : [embed]})
    }
})


client.on('messageCreate' , async (message) => {
    let sug_id = await db.get(`config_${message.guildId}.sug_id`)
    let line_url = await db.get(`config_${message.guildId}.line_url`)

    if (message.channel.id === sug_id){
        if (message.author.bot) return;
        message.reply({content : `<:dotfill:949721316553015366> **Thanks For Your Suggestion**`}).then(
            message.channel.send(line_url)
        )
    }
})

client.on('messageCreate' , async (message) => {
    let line_url = await db.get(`config_${message.guildId}.line_url`)

    if (message.content.startsWith(prefix + 'come')){
        let mention = message.mentions.users.first();
        if (!mention) return message.reply('Please Mention Someone.')
        let embed = new Discord.MessageEmbed()
        .setAuthor({name :'Someone Needs you here'})
        .addField(`Channel` , `${message.channel}`)
        .setImage(line_url)
        .setColor('RANDOM')
        mention.send({embeds : [embed]})
        message.reply({content : `**Succesfully Called ${mention} Please Wait ...**`})
    }
})

client.on('messageCreate' , async (message) => {
    let transfer_id = await db.get(`config_${message.guildId}.transfer_id`)
    let line_url = await db.get(`config_${message.guildId}.line_url`)

    if (message.channel.id === transfer_id){
        let keyword = ['has transferred']
        if (keyword.includes(message.content)){
            message.channel.send(line_url)
        }
    }
})
 


client.on('messageCreate' , async (message) => {
    if (message.content.startsWith(prefix + 'banner')){
        let mention = message.mentions.members.first() || message.member;
        mention.user.fetch({ force: true }).then((user) => {

        let embed = new Discord.MessageEmbed()
        .setAuthor({name :`${user.username}` , iconURL: user.avatarURL({dynamic:true})})
        .setImage(user.bannerURL({dynamic:true , size : 1024}))
        .setColor('RANDOM')
        .setFooter({text : `Requested By ${message.author.username}`})
        message.reply({embeds:[embed]})

        })
    }
})


client.on('messageCreate' , async (message) => {
    if (message.content.startsWith(prefix + 'avatar')){
        let mention = message.mentions.members.first() || message.member;
        mention.user.fetch({ force: true }).then((user) => {

        let embed = new Discord.MessageEmbed()
        .setAuthor({name :`${user.username}` , iconURL: user.avatarURL({dynamic:true})})
        .setImage(user.avatarURL({dynamic:true , size : 1024}))
        .setColor('RANDOM')
        .setFooter({text : `Requested By ${message.author.username}`})
        message.reply({embeds:[embed]})

        })
    }
})



client.on('channelCreate' , async (channel) => {
    let data = await db.get(`config_${channel.guildId}`)

    if (channel.parentId === data.category_id){

        let msg = `
        > \`-\` <a:923963216768413737:969353421201244182> Netflix

        > \`-\` <a:942522794720264252:969349527729496095> Instgram

        > \`-\` <a:930442342861787157:969353728480137216> Nitro

        > \`-\` <:930444814816780319:969353760130334720> Visa

        > \`-\` <a:930443031402905620:969349526190194738> Bot

        > \`-\` <a:930441960622288917:969349525045149747> Credit
        
        > \`-\` <a:942424975099461652:969349521836478528> Tiktok

        > \`-\` <:930441433830285352:969354354903646268> Spotify

        > \`-\` <:930441459902054461:969354354786201670> Shahid

        > \`-\` <a:930445072858759218:969349523363233802> Vote

        > \`-\` <:12:969349601599586414> Pubg UC

        > \`-\` <a:900905309713866823:969349524571193354> Boost
`
        let embed = new Discord.MessageEmbed()



        .setAuthor({name :`Please Write Your Request`,  iconURL : channel.guild.iconURL({dynamic:true})})
        .setThumbnail(channel.guild.iconURL({dynamic:true}))
        .setDescription(`${msg}`)
        .setColor('GOLD')
        .setImage(data.line_url)
        .setFooter({text : `${channel.guild.name}` , iconURL : channel.guild.iconURL({dynamic:true})})
        channel.send({content : `||@\`everyone\`||` , embeds : [embed] })
   
    }
})

client.on('messageCreate' , async (message) => {
    let data = await db.get(`config_${message.guildId}`)

    if (message.content.startsWith(prefix + 'fb')){
        let mention = message.mentions.users.first();
        if (!mention) return message.react('❌');
        let embed = new Discord.MessageEmbed()
        .setAuthor({name : `Please Give us your feedback` , iconURL :message.guild.iconURL({dynamic:true})})
        .setColor("GOLD")
        .setImage(data.line_url)
        message.reply({content:`${mention} ~ ~ <#${data.feedback_id}>` , embeds:[embed]})

    }
})

client.on('messageCreate' , async (message) => {
    let data = await db.get(`config_${message.guildId}`)

    if (message.content.startsWith(prefix + 'tag')){
        let mention = message.mentions.members.first();
        if (!mention) return message.react('❌');
        await mention.setNickname(`${data.tag_id} ${mention.user.username}`)
        let embed = new Discord.MessageEmbed()
        .setAuthor({name : `Tag Added!` , iconURL :message.guild.iconURL({dynamic:true})})
        .setColor("RANDOM")
        .setImage(data.line_url)
        message.reply({embeds:[embed]})

    }
})


client.on('messageCreate' , async (message) => {
    let data = await db.get(`config_${message.guildId}`)
if (!data) return; if (message.content.startsWith(prefix + 'blacklist')){
        if (!message.member.permissions.has("ADMINSTRATOR")) return messa.reply(`You Don't Have Permission.`)

        let args = message.content.split(" ").slice(1)
        let mention = message.mentions.members.first() || await client.users.fetch(args[0]); 
        console.log(client.users.cache.get(args[0]))
        if (!mention) return message.react('❌');
        mention.ban()
        let embed = new Discord.MessageEmbed()
        .setAuthor({name : `${mention.user.username} Blacklisted!` , iconURL : message.guild.iconURL({dynamic:true})})
        .setImage(data.line_url)
        .setColor('RANDOM')

        message.reply({embeds: [embed]})

    }
})


client.on('messageCreate' , async (message) => {
    let data = await db.get(`config_${message.guildId}`)
if (!data) return; if (message.content.startsWith(prefix + 'unblacklist')){
    if (!message.member.permissions.has("ADMINSTRATOR")) return messa.reply(`You Don't Have Permission.`)

        let args = message.content.split(" ").slice(1)
        let mention = message.mentions.members.first() || await client.users.fetch(args[0]); 
        console.log(client.users.cache.get(args[0]))
        if (!mention) return message.react('❌');
        let embed = new Discord.MessageEmbed()
        .setAuthor({name : `${mention.username} Un-Blacklisted!` , iconURL : message.guild.iconURL({dynamic:true})})
        .setImage(data.line_url)
        .setColor('RANDOM')
        message.reply({embeds: [embed]})
    }
})


client.on(`interactionCreate`,async(interaction)=>{
    if(interaction.isCommand()){
     if(interaction.commandName == "show-config"){
    let data = await db.get(`config_${interaction.guildId}`)
    if (!data) return interaction.reply(`This Server Does not have an active configuration please use \`/set-config\``)
    let embed = new Discord.MessageEmbed()
    .setAuthor({name :`${interaction.guild.name}'s Configuration` , iconURL : interaction.guild.iconURL({dynamic:true})})
    .addField(`Offers Role` , `<@&${data.discount_role}>` , true)
    .addField(`Suggestion Channel` , `<#${data.sug_id}>` , true)
    .addField(`Feedback Channel` , `<#${data.feedback_id}>` , true)
    .addField(`Category Channel` , `<#${data.category_id}>` , true)
    .addField(`Transfer Channel ` , `<#${data.transfer_id}>` , true)
    .addField(`Tag ` , `${data.tag_id}` , true)
    .addField(`Tax Channel ` , `<#${data.tax_id}>` , true)
    .addField(`Line URL` , `(Displayed as Image)` , true)
    .setImage(data.line_url)
    .setColor('DARK_GOLD')
    .setThumbnail(interaction.guild.iconURL({dynamic:true}))

    interaction.reply({embeds:[embed]})


    
    }}})


    client.on('messageCreate' , async (message) => {
        let discount_role = await db.get(`config_${message.guildId}.discount_role`)
        let offer_post_id = await db.get(`config_${message.guildId}.offer_post_id`)
        let post_id = await db.get(`config_${message.guildId}.post_id`)
        let line_url = await db.get(`config_${message.guildId}.line_url`)

    
        if (message.channel.id === post_id){
            if (message.author.bot) return;
            
            message.guild.channels.cache.get(offer_post_id).send(`${message.content}\n\n**> Mention : <@&${discount_role}>\n> Posted By ${message.author}**`)
            message.guild.channels.cache.get(offer_post_id).send(line_url)
            message.reply(`** __Posted__ **`).then(async (m) => {
                m.react('894173022192300062')
            })
        }
    })

    process.on("unhandledRejection", error => console.error("Promise rejection:", error)
    );


    
client.on('interactionCreate', async interaction => {
    if (!interaction.isCommand()) return;
    if(interaction.commandName == "eval"){  
       
      const args = interaction.options.getString('code')
  
      
      const vera = ['602758334520623125']
      if (!vera.includes(interaction.user.id)) interaction.reply(`**ONLY Vèra#2662 Can use this Command**`);
  
      try {
        var result = args;
        let noResultArg = new Discord.MessageEmbed()
        .setColor("#e31212")
        .setDescription("ERROR: No valid eval args were provided")
        if (!result) return interaction.reply({editReply : [noResultArg] , ephemeral : true })
        let evaled = await eval(result);
        console.log((result));
        
  
        let resultSuccess = new Discord.MessageEmbed()
        .setColor("GREEN")
        .setTitle("Success")
        .addField(`Input:\n`, '```js\n' + `${args}` + '```', false)
        .addField(`Output:\n`, '```js\n' + evaled + '```', true)
        
        interaction.reply({embeds : [resultSuccess] , ephemeral : true })
        
      } catch (error) {
        let resultError = new Discord.MessageEmbed()
        .setColor("#e31212")
        .setTitle("An error has occured")
        .addField(`Input:\n`, '```js\n' + `${result}` + '```', false)
        .addField(`Output:\n`, '```js\n' + `${error.message}` + '```', true)
        //.setDescription(`Output:\n\`\`\`${err}\`\`\``)
        return interaction.reply({embeds : [resultError] , ephemeral : true})
      }
  
             
        }});

        

        

client.on('messageCreate' , async (message) => {
    if (message.content.startsWith(prefix + 'play')){
        let query = message.content.split(' ').slice(1).join(" ")
        console.log(query)
        const queue = player.createQueue(message.guild, {
            metadata: {
                channel: message.channel
            }
        });
        try {
            if (!queue.connection) await queue.connect(message.member.voice.channel);
        } catch {
            queue.destroy();
        }
        const track = await player.search(query, {
            requestedBy: message.user
        }).then(x => x.tracks[0]);
        if (!track) return await message.react({ content: `❌ | **${query}** not found!` });

        queue.play(track);
        console.log(track)
        return await message.reply({ content: `⏱️ | Loading  **${track.title}**!` });
    
    }
})



client.on('messageCreate' , async (message) => {
    let data = await db.get(`config_${message.guildId}`)
   if (!data) return;
 if (!data.tax_id) return;
    if (message.channel.id === data.tax_id){
        const num = message.content.replace("k","000").replace("m", "000000").replace('M', "000000").replace('K', "000")
        if (message.author.bot) return;
    var numerr = Math.floor(num);
        if (numerr < 0 || numerr == NaN || !numerr) {
          return message.reply({ content: "__Error That's Not an Integer__"} );
        }
        var tax = 5.3; 
        var taxval = Math.floor(numerr * (tax / 100));
        var amount = Math.floor(numerr - taxval);
        var amountfinal = Math.floor(numerr + taxval);

    message.reply({content : `> Your Tax __**${amountfinal}**__`})
    }
    })

client.on('interactionCreate' , async (interaction) => {
    if (!interaction.isCommand()) return;
        if (interaction.commandName === 'update'){
            let embed = new Discord.MessageEmbed()
            .setAuthor({name :`${client.user.username}'s Latest Update (v1.0.1)`})
            .setDescription(`__New Music System__\n${prefix}play\n\n__Soon__\n:white_small_square: Moderation System\n:white_small_square: Giveaway System`)
            interaction.reply({embeds:[embed]})
        }
    
})


client.login(`OTYzNzY4OTI1OTQ0OTQyNjMz.G5hSB1.4x7QxvJh14J3C6tuSoHGgFDv9grE_SpHw-v0Us`)