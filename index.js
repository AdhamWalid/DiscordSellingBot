const Discord = require('discord.js')
const client = new Discord.Client({intents : 32767 }) 
    const prefix = "d!";
const {Database}  = require("quickmongo");
const db = new Database(`mongodb+srv://Velvet:cZQk4SVbG9utLM5h@cluster0.vx3jf.mongodb.net/dev-center?retryWrites=true&w=majority`);
const wait = (time) => new Promise(resolve => setTimeout(() => resolve(true), time))


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
    db.delete(`user_602758334520623125.staffid` , 000)
    console.table(await db.all())
    console.log(`${client.user.username} Online`)
})

client.on('messageCreate' , async (message) => {
    if (message.content.startsWith(prefix + 'registration-panel')){
        if (!message.author.id === '602758334520623125') return;
        let embed = new Discord.MessageEmbed()
        .setAuthor({name : `Developers Center Regestration` , iconURL : message.guild.iconURL({dynamic : true})})
        .setColor('BLURPLE')
        .addField('How To Register?' , `Click The Button!`,true)

        let row = new Discord.MessageActionRow()
        .addComponents(new Discord.MessageButton()
        .setCustomId('registration_btn')
        .setLabel(`Register`)
        .setStyle('PRIMARY')
        )
        
        message.channel.send({embeds : [embed] , components: [row]})
    }
})
client.on('interactionCreate' , async (interaction) => {
    if (interaction.isButton()){
        if (interaction.customId === 'registration_btn'){
            let info = db.get(`user_${interaction.user.id}.staffid`)
            let code = createid(3)
            await db.set(`user_${interaction.user.id}` , {
                staff : true,
                staffid :code
            })

            if (db.get(`user_${interaction.user.id}.staffid`) === null) return interaction.reply({content:`You already registerd before.` , ephemeral:true})
            
            console.log(await db.get(`user_${interaction.user.id}.staffid`))
            let embed  = new Discord.MessageEmbed()
            .setAuthor({name :`Registration Complete`})
            .setColor('BLURPLE')
            .addField('Staff ID' , `${await db.get(`user_${interaction.user.id}.staffid`)}` , true)
            .addField('User' , `${interaction.user.username}` , true)
            .addField('Registration Time' , `<t:${Date.now().toString().slice(0 , 10)}:F>` , true)
            interaction.member.setNickname(`${await db.get(`user_${interaction.user.id}.staffid`)} | ${interaction.user.username}`)
            const role = await interaction.guild.roles.cache.get("966060521977696327")// ايدي رول 
            let throle = interaction.guild.roles.cache.get('966060521977696327');
              interaction.guild.members.cache.get(interaction.user.id).roles.add(throle)
              client.channels.cache.get('966108394492669972').send({embeds : [embed]})
            interaction.user.send({embeds : [embed]})
            interaction.reply({content : 'Registration Complete. (Please Check your Dm)' , ephemeral : true})
        }
    }
})




client.login('OTMwMTAwNDg3MTcxMjQwMDE3.Ydw9lA.scyMNO7dmB6m0LFL_qykHD-8wkY')