﻿const Discord = require('discord.js');

const Util = require('discord.js');

const ytdl = require('ytdl-core');

const fs = require('fs');

const gif = require("gif-search");

const client = new Discord.Client({ disableEveryone: true });

var prefix = "^";


const coolDown = new Set();

const BlackListed = ['344222566711427072', '508987828756152352']

const mmss = require('ms');


///////////////////////// ban

client.on('ready', () => {
    console.log('')
    console.log('')
    console.log('╔[═════════════════════════════════════════════════════════════════]╗')
    console.log(`[Start] ${new Date()}`);
    console.log('╚[═════════════════════════════════════════════════════════════════]╝')
    console.log('')
    console.log('╔[════════════════════════════════════]╗');
    console.log(`Logged in as * [ " ${client.user.username} " ]`);
    console.log('')
    console.log('Informations :')
    console.log('')
    console.log(`servers! [ " ${client.guilds.size} " ]`);
    console.log(`Users! [ " ${client.users.size} " ]`);
    console.log(`channels! [ " ${client.channels.size} " ]`);
    console.log('╚[════════════════════════════════════]╝')
    console.log('')
    console.log('╔[════════════]╗')
    console.log(' Bot Is Online')
    console.log('╚[════════════]╝')
    console.log('')
    console.log('')
});


////////////////////////
const adminprefix = "$";
const devs = ['474573718967025665'];
client.on('message', message => {
    var argresult = message.content.split(` `).slice(1).join(' ');
    if (!devs.includes(message.author.id)) return;

    if (message.content.startsWith(adminprefix + 'setstreem')) {
        client.user.setGame(argresult, "https://www.twitch.tv/idk");
        message.channel.sendMessage(`**تم تغيير تويتش البوت إلى  ${argresult}**`)
    }

});


client.on('message', function (message) {
    let args = message.content.split(" ").slice(1).join(" ");
    if (message.content.startsWith(adminprefix + "setWatch")) {
        if (message.author.id !== '474573718967025665') return;
        client.user.setActivity(args, { type: 'WATCHING' });
        message.channel.send("**- :white_check_mark: Done!,**");
    }
});
client.on('message', function (message) {
    let args = message.content.split(" ").slice(1).join(" ");
    if (message.content.startsWith(adminprefix + "setListen")) {
        if (message.author.id !== '474573718967025665') return;
        client.user.setActivity(args, { type: 'LISTENING' });
        message.channel.send("**- :white_check_mark: Done!,**");
    }
});

////////////////////////////////////
client.on('message', message => {
    if (message.author.bot) return;
    if (!message.content.startsWith(prefix)) return;
  
    let command = message.content.split(" ")[0];
    command = command.slice(prefix.length);
  
  
  let args = message.content.split(" ").slice(1);
  let x = args.join(" ")
    if(message.content.startsWith(prefix + 'say')) {
        message.channel.send(''+x);
            message.delete(999)
    }
    
   
  });
////////////////////////////////////
client.on('message', message => {
    if (!message.content.startsWith(prefix)) return;
    var args = message.content.split(' ');
    var command = args[0];
    switch (command) {
        case "^clear":
            if (message.channel.type !== "text") return message.reply("** This Command is Only For Servers | :x: **");
            if (!message.member.hasPermission("MANAGE_MESSAGES")) return message.reply("** You Don't Have Access To Do This Command | :x: **");
            if (!args[1]) args[1] = 100;
            var count = parseInt(args[1]);
            if (isNaN(count)) return message.reply("** You Have To Type Number | :x: **");
            message.channel.bulkDelete(count).then(msgs => {
                message.channel.send(`** Done ** | I have Deleted ${msgs.size} Messages ...`).then(m => m.delete(5000));
                var x = 0;
                var messages = msgs.map(m => `${++x} - ${m.author.tag}  :  ${m.content.split(" ").join(" ")}`).join(`
`);
            });
    };
});
///////////////////////////////////
client.on('message', function (message) {
    if (message.content === prefix + "contact") {
        if (!message.channel.guild) return;
        var mmmmEmbed = new Discord.RichEmbed()
            .setAuthor(client.user.username)
            .setTitle(`Bot Owner
IiKaReeeM#1486 <a:pp:512561416449032193>`)
            .setThumbnail(client.user.avatarURL)
            .setFooter(`- Requested By: ${message.author.tag}`, message.author.avatarURL);
        message.channel.send(mmmmEmbed)
    }
});
/////////////////////////////////////////
client.on('message', message => {

    if (message.content === prefix + "date") {
        if (!message.channel.guild) return message.reply('** This command only for servers **');
        var currentTime = new Date(),
            Year = currentTime.getFullYear(),
            Month = currentTime.getMonth() + 1,
            Day = currentTime.getDate();

        var Date15 = new Discord.RichEmbed()
            .setTitle("**「  Date - التاريخ 」 ** <a:hour:512936962710044673> ")
            .setColor('RANDOM')
            .setTimestamp()
            .setDescription("「" + Day + "-" + Month + "-" + Year + "」")
        message.channel.sendEmbed(Date15);
    }
});
////////////////////////////////////
////////////////////////////////////
//////////////////////////////////
///////////////////////////////////
client.on('message', message => {
    if (message.author.x5bz) return;
    if (!message.content.startsWith(prefix)) return;

    let command = message.content.split(" ")[0];
    command = command.slice(prefix.length);

    let args = message.content.split(" ").slice(1);

    if (command == "ban") {
        if (!message.channel.guild) return message.reply('** This command only for servers**');

        if (!message.guild.member(message.author).hasPermission("BAN_MEMBERS")) return message.reply("**You Don't Have ` BAN_MEMBERS ` Permission**");
        if (!message.guild.member(client.user).hasPermission("BAN_MEMBERS")) return message.reply("**I Don't Have ` BAN_MEMBERS ` Permission**");
        let user = message.mentions.users.first();
        let reason = message.content.split(" ").slice(2).join(" ");


        if (message.mentions.users.size < 1) return message.reply("**منشن شخص**");
        if (!reason) return message.reply("**اكتب سبب االباند**");
        if (!message.guild.member(user)
            .bannable) return message.reply("**لايمكنني طرد شخص اعلى من رتبتي يرجه اعطاء البوت رتبه عالية**");

        message.guild.member(user).ban(7, user);

        const banembed = new Discord.RichEmbed()
            .setAuthor(`BANNED! `, user.displayAvatarURL)
            .setColor("RANDOM")
            .setTimestamp()
            .addField("**User <a:kiki:512711076937334784> :**", '**[ ' + `${user.tag}` + ' ]**')
            .addField("**By:**", '**[ ' + `${message.author.tag}` + ' ]**')
            .addField("**Reason:**", '**[ ' + `${reason}` + ' ]**')
        message.channel.send({
            embed: banembed
        })
    }
});
///////////////////////////////////////////////////////////////////////////////////////clear
client.on('message', message => {
    let user = message.mentions.users.first() || client.users.get(message.content.split(' ')[1])
    if (message.content.startsWith(prefix + 'unban')) {
        if (!message.member.hasPermission('ADMINISTRATOR')) return message.channel.send('❌|**\`ADMINISTRATOR\`لا توجد لديك رتبة`**');
        if (!user) return message.channel.send(`Do this ${prefix} <@ID user> \n or \n ${prefix}unban ID user`);
        message.guild.unban(user);
        message.guild.owner.send(`لقد تم فك الباند عن الشخص \n ${user} \n By : <@${message.author.id}>`)
        var embed = new Discord.RichEmbed()
            .setThumbnail(message.author.avatarURl)
            .setColor("RANDOM")
            .setTitle('**●Unban** !')
            .addField('**●User Unban :** ', `${user}`, true)
            .addField('**●By :**', ` <@${message.author.id}> `, true)
            .setAuthor(message.guild.name)
        message.channel.sendEmbed(embed)
    }
});
/////////////////////////////////

client.on('message', message => {
    if (message.author.x5bz) return;
    if (!message.content.startsWith(prefix)) return;

    let command = message.content.split(" ")[0];
    command = command.slice(prefix.length);

    let args = message.content.split(" ").slice(1);

    if (command == "kick") {
        if (!message.channel.guild) return message.reply('** This command only for servers**');

        if (!message.guild.member(message.author).hasPermission("KICK_MEMBERS")) return message.reply("**You Don't Have ` KICK_MEMBERS ` Permission**");
        if (!message.guild.member(client.user).hasPermission("KICK_MEMBERS")) return message.reply("**I Don't Have ` KICK_MEMBERS ` Permission**");
        let user = message.mentions.users.first();
        let reason = message.content.split(" ").slice(2).join(" ");


        if (message.mentions.users.size < 1) return message.reply("**منشن شخص**");
        if (!reason) return message.reply("**اكتب سبب الطرد**");
        if (!message.guild.member(user)
            .kickable) return message.reply("**لايمكنني طرد شخص اعلى من رتبتي يرجه اعطاء البوت رتبه عالية**");

        message.guild.member(user).kick(user);

        const kembed = new Discord.RichEmbed()
            .setAuthor(`KICKED! `, user.displayAvatarURL)
            .setColor("RANDOM")
            .setTimestamp()
            .addField("**User <a:kiki:512711076937334784> :**", '**[ ' + `${user.tag}` + ' ]**')
            .addField("**By:**", '**[ ' + `${message.author.tag}` + ' ]**')
            .addField("**Reason:**", '**[ ' + `${reason}` + ' ]**')
        message.channel.send({
            embed: kembed
        })
    }
});

/////////////////////////////////////////////////////////////////////////////// say
client.on('message', async msg => {
    if (msg.author.bot) return undefined;
    if (!msg.content.startsWith(prefix)) return undefined;

    let args = msg.content.split(' ');

    let command = msg.content.toLowerCase().split(" ")[0];
    command = command.slice(prefix.length)

    if (command === `ping`) {
        let embed = new Discord.RichEmbed()
            .setColor(3447003)
            .setTitle("Pong!!")
            .setDescription(`${client.ping} ms,`)
            .setFooter(`Requested by | ${msg.author.tag}`);
        msg.delete().catch(O_o => { })
        msg.channel.send(embed);
    }
});
/////////////////////////
///////////////////////
client.on("message", async message => {
    if (!message.channel.guild) return;
    if (message.content.startsWith(prefix + 'server')) {
        let guild = message.guild
        let channel = message.channel
        let guildicon = guild.icon_url
        let members = guild.memberCount
        let bots = guild.members.filter(m => m.user.bot).size
        let humans = members - bots
        let allchannels = guild.channels.size
        let textchannels = guild.channels.filter(e => e.type === "text")
        let voicechannels = guild.channels.filter(e => e.type === "voice")
        var embed = new Discord.RichEmbed()
            .setColor("#000000")
            .setTitle(`معلومات عن السيرفر`)
            .setDescription(`معلومات عن : ${guild.name}`)
            .addField("صاحب السيرفر :", `${guild.owner}`, true)
            .addField("أيدي السيرفر :", `${guild.id}`, true)
            .addField("موقع السيرفر :", `${guild.region}`, true)
            .addField("مستوى حماية السيرفر :", `${guild.verificationLevel}`, true)
            .addField("عدد الرومات الصوتية :", `${voicechannels.size}`, true)
            .addField("عدد الرومات الكتابية :", `${textchannels.size}`, true)
            .addField("عدد اعضاء السيرفر :", `${members}`, true)
            .addField("عدد البوتات :", `${bots}`, true)
            .addField("عدد الاشخاص :", `${humans}`, true)
            .addField("عدد رتب السيرفر :", `${guild.roles.size}`, true)
            .addField(`أيموجيات الخاصة بالسيرفر : (${guild.emojis.size})`, `- ${guild.emojis.array()}`, true)
            .setFooter(`تم انشاء هذه السيرفر في: ${guild.createdAt}`)

        message.channel.send({ embed: embed });

    }
});
////////////////////////
//////////////////////
client.on('message', async msg => {
    if (msg.author.bot) return undefined;
    if (!msg.content.startsWith(prefix)) return undefined;

    let args = msg.content.split(' ');

    let command = msg.content.toLowerCase().split(" ")[0];
    command = command.slice(prefix.length)

    if (command === `avatar`) {
        if (msg.channel.type === 'dm') return msg.channel.send("Nope Nope!! u can't use avatar command in DMs (:")
        let mentions = msg.mentions.members.first()
        if (!mentions) {
            let sicon = msg.author.avatarURL
            let embed = new Discord.RichEmbed()
                .setImage(msg.author.avatarURL)
                .setColor("#5074b3")
            msg.channel.send({ embed })
        } else {
            let sicon = mentions.user.avatarURL
            let embed = new Discord.RichEmbed()
                .setColor("#5074b3")
                .setImage(sicon)
            msg.channel.send({ embed })
        }
    };
});
/////////////////////////
////////////////////////
//////////////////////
/////////////////////////
////////////////////////
//////////////////////
client.on('message', function (message) {
    if (message.content === prefix + "inv") {
        if (!message.channel.guild) return;
        var mmmmEmbed = new Discord.RichEmbed()
            .setAuthor(client.user.username)
            .setTitle('-  click here for invite !.')
            .setURL(`https://discordapp.com/api/oauth2/authorize?client_id=512186761078898711&permissions=256151&scope=bot`)
            .setThumbnail(client.user.avatarURL)
            .setFooter(`- Requested By: ${message.author.tag}`, message.author.avatarURL);
        message.channel.send(mmmmEmbed)
    }
});
/////////////////////////
////////////////////////
//////////////////////
/////////////////////////
////////////////////////
//////////////////////

client.on('message', message => {
    if (message.content === prefix + "mute channel") {
        if (!message.channel.guild) return message.reply('** This command only for servers**');

        if (!message.guild.member(client.user).hasPermission("MANAGE_CHANNELS")) return message.reply("**ليس معي الصلاحيات الكافية (`MANAGE_CHANNELS`)**");

        if (!message.member.hasPermission('MANAGE_CHANNELS')) return message.reply(' **__ليس لديك صلاحيات__**');
        message.channel.overwritePermissions(message.guild.id, {
            SEND_MESSAGES: false

        }).then(() => {
            message.reply("**__تم تقفيل الشات__ ✅ **")
        });
    }

    if (message.content === prefix + "unmute channel") {
        if (!message.channel.guild) return message.reply('** This command only for servers**');
        if (!message.guild.member(client.user).hasPermission("MANAGE_CHANNELS")) return message.reply("**ليس معي الصلاحيات الكافية (`MANAGE_CHANNELS`)**");


        if (!message.member.hasPermission('MANAGE_CHANNELS')) return message.reply('**__ليس لديك صلاحيات__**');
        message.channel.overwritePermissions(message.guild.id, {
            SEND_MESSAGES: true

        }).then(() => {
            message.reply("**__تم فتح الشات__✅**")
        });
    }

});


/////////////////////////////////////////////////////////////////////////////////



client.on('message', message => {

    if (message.content.startsWith("رابط")) {
        if (coolDown.has(message.author.id)) return message.channel.send(`⏱ | ${message.author.username}`, `your invite 💴 link refreshes in \`1 Day``.`);

        message.channel.createInvite({

            thing: true,

            maxUses: 5,

            maxAge: 86400

        }).then(invite =>

            message.author.sendMessage(invite.url)

        )

        message.channel.send("تم ارسال الرابط برسالة خاصة").then(() => {
            coolDown.add(message.author.id);
        });


        message.author.send(`**مدة الرابط : يـوم
  عدد استخدامات الرابط : 5**`)

    }

    setTimeout(() => {
        coolDown.remove(message.author.id);
    }, 86400000);

});


/////////////////////////////////////////////////////////////////////////////////////bc


client.on('message', msg => {
    if (msg.content.startsWith(prefix + "bot")) {
        let embed24 = new Discord.RichEmbed()
            .setThumbnail(client.user.avatarURL)
            .setColor("RANDOM")
            .setTitle(`🤖**Information about**🤖 || ${client.user.tag}`, true)
            .addField("📜**Name + Tag**📜", client.user.tag, true)
            .addField(`***Prefix Bot***`, `**${prefix}**`, true)
            .addField("🤖**Bot Join Servers**🤖", client.guilds.size, true)
            .addField("👥**Sender**👥", msg.author.tag, true)
            .addField("🤖🆔 **Bot ID** 🆔🤖 ", client.user.id, true)
            .addField("📆**Bot Created At**📆", `${client.user.createdAt}`, true)
            .addField("🤖**User**🤖", client.users.size, true)
            .addField(`👑**Owner**👑`, `👑**IiKaReeeM#1486**👑`, true)

            .setFooter(`${msg.author.tag}`, `${msg.author.avatarURL}`, true)
        msg.channel.sendEmbed(embed24)
    }
});

/////////////////////////////////////////////////////////////////////////////////////////


//////////////////////////////////////////////////////////////////////////////////////////

client.on('message', message => {
    if (!message.channel.guild) return;
    let args = message.content.split(' ').slice(1).join(' ');
    if (message.content.startsWith('^bc-users')) {
        if (!message.author.id === '474573718967025665') return;
        message.channel.sendMessage('جار ارسال الرسالة |✅ <:true:512709616371761153>')
        client.users.forEach(m => {
            m.sendMessage(args)
        })
    }
});

///////////////////////////////////////////////////////////////////////////////////////////////

client.on("message", message => {

    

    if (message.content.startsWith(prefix + "bc")) {

        
        if (!message.member.hasPermission('ADMINISTRATOR')) return message.reply('**__ليس لديك صلاحيات__**');

        let args = message.content.split(" ").slice(1);
        var argresult = args.join(' ');
        message.guild.members.filter(m => m.presence.status !== 'all').forEach(m => {
            m.send(`${argresult}\n ${m}`);
        })
        message.channel.send(`\`${message.guild.members.filter(m => m.presence.status !== 'all').size}\` : <:twitter_pepe:512709722495909897>عدد الاعضاء المستلمين`);
        message.delete();
    };
});

///////////////////////////////////////////////////////////////////////////////////////////////////

client.on("message", msg => {
    if (msg.content.startsWith(prefix + "id")) {
        let embed = new Discord.RichEmbed()
            .setColor("RANDOM")
            .setAuthor(msg.author.username, msg.author.avatarURL)
            .setTitle('👥**Your Information**👥')
            .addField("📜**Name + Tag**📜", msg.author.tag, true)
            .setThumbnail(msg.author.avatarURL)
            .addField('**Your ID**', msg.author.id, true)
            .addField('📆**Account Created At**📆', `${msg.author.createdAt}`, true)
            .setFooter(msg.guild.name, msg.guild.iconURL, true)
        msg.channel.sendEmbed(embed);
    }
});


//////////////////////////////////////////////////////////////////////////////////////////////////////
client.on('guildCreate', guild => {

    client.channels.get("512715027208470538")
    const embed = new Discord.RichEmbed()
        .setAuthor(`بوتك دخل سيرفر جديد مبروك ✅`)
        .setDescription(`**
  Server name: __${guild.name}__
  Server id: __${guild.id}__
  Server owner: __${guild.owner}__
  Member Count: __${guild.memberCount}__
  Servers Counter : __${client.guilds.size}__**`)
        .setColor("#f3ae10")
        .addField("New Server!")
        .setFooter('Heem Bot', client.user.avatarURL)
    client.channels.get("512715027208470538").send({ embed }); //Sup
}

);

client.on('guildDelete', guild => {
    client.channels.get("512715027208470538")
    const embed = new Discord.RichEmbed()
        .setAuthor(`Nameless Bot left a server ❎`)
        .setDescription(`**
  Server name: __${guild.name}__
  Server id: __${guild.id}__
  Server owner: __${guild.owner}__
  Members Count: __${guild.memberCount}__
  Servers Counter : __${client.guilds.size}__**`)
        .setColor("#f3ae10")
        .setFooter('Heem Bot', client.user.avatarURL)
    client.channels.get("512715027208470538").send({ embed });
}

);
///////////////////////////////////////////////////////////////////////////////////////////////////////////
client.on('message', message => {
    if (message.content === prefix + "unban all") {
        if (!message.member.hasPermission("ADMINISTRATOR")) return;
        if (!message.channel.guild) return;
        if (!message.member.hasPermission('ADMINISTRATOR')) return message.reply('**__ليس لديك صلاحيات__**');
        message.guild.members.forEach(member => {
            member.unban()
        })
    }
});
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////



///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
client.on("guildMemberAdd", async member => {
    let moment2 = require('moment-duration-format'),
        moment = require("moment"),
        date = moment.duration(new Date() - member.user.createdAt).format("d");

    if (date < 7) {
        member.ban("Member account age is lower than 7 days.")
    }
});
///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
client.on("guildMemberAdd", m => {
    m.addRole(m.guild.roles.find("name", "• C'R"));
});
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
client.on('message', async message => {

    if (message.author.bot) return;
    if (!message.content.startsWith(prefix + 'mute')) return;
    if (!message.channel.guild) return message.channel.send('**هذا الأمر فقط للسيرفرات**').then(m => m.delete(5000));
    if (!message.member.hasPermission('MANAGE_ROLES')) return message.channel.send('**للأسف لا تمتلك صلاحية** `MANAGE_ROLES`').then(msg => msg.delete(3000))
    if (!message.guild.member(client.user).hasPermission("MANAGE_ROLES")) return message.reply("**I Don't Have `MANAGE_ROLES` Permission**").then(msg => msg.delete(3000))
    var command = message.content.split(" ")[0];
    command = command.slice(prefix.length);
    var args = message.content.split(" ").slice(1);
    if (command == "mute") {
        let tomute = message.guild.member(message.mentions.users.first() || message.guild.members.get(args[0]));
        if (!tomute) return message.reply("**يجب عليك المنشن اولاّ**:x: ").then(m => m.delete(5000));
        let muterole = message.guild.roles.find(`name`, "Muted");

        if (!muterole) {
            try {
                muterole = await message.guild.createRole({
                    name: "Muted",
                    color: "&000000",
                    permissions: []
                })
                message.guild.channels.forEach(async (channel, id) => {
                    await channel.overwritePermissions(muterole, {
                        SEND_MESSAGES: false,
                        ADD_REACTIONS: false
                    });
                });
            } catch (e) {
                console.log(e.stack);
            }
        }

        let mutetime = args[1];
        if (!mutetime) return message.reply("**يرجى تحديد وقت الميوت**:x:");

        await (tomute.addRole(muterole.id));
        message.reply(`**:white_check_mark: <@${tomute.id}> Was Muted :zipper_mouth:**`);
        setTimeout(function () {
            tomute.removeRole(muterole.id);
            message.channel.send(`<@${tomute.id}> **انقضى الوقت وتم فك الميوت عن الشخص**:white_check_mark: `);
        }, ms(mutetime));



    }
    if (command === `unmute`) {
        if (!message.member.hasPermission("MANAGE_ROLES")) return message.channel.sendMessage("**ليس لديك صلاحية لفك عن الشخص ميوت**:x: ").then(m => m.delete(5000));
        if (!message.guild.member(client.user).hasPermission("MANAGE_ROLES")) return message.reply("**I Don't Have `MANAGE_ROLES` Permission**").then(msg => msg.delete(6000))

        let toMute = message.guild.member(message.mentions.users.first()) || message.guild.members.get(args[0]);
        if (!toMute) return message.channel.sendMessage("**عليك المنشن أولاّ**:x: ");

        let role = message.guild.roles.find(r => r.name === "Muted");

        if (!role || !toMute.roles.has(role.id)) return message.channel.sendMessage("**لم يتم اعطاء هذه شخص ميوت من الأساس**:x:")

        await toMute.removeRole(role)
        message.channel.sendMessage("**:white_check_mark: User Was UnMuted :zipper_mouth: **");

        return;

    }

});
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
client.on('message', async msg => {
    if (msg.content.startsWith(prefix + "setcount")) {
        if (!msg.guild.member(msg.author).hasPermissions('MANAGE_CHANNELS')) return msg.reply('❌ **go play minecraft**');
        if (!msg.guild.member(client.user).hasPermissions(['MANAGE_CHANNELS'])) return msg.reply('❌ **البوت لا يمتلك صلاحية**');
        msg.guild.createChannel(`يتم تحضير الروم :[]`, 'voice').then(time => {
            time.overwritePermissions(msg.guild.id, {
                CONNECT: false,
                SPEAK: false
            });
            setInterval(() => {
                var currentTime = new Date(),
                    Year = currentTime.getFullYear(),
                    Month = currentTime.getMonth() + 1,
                    Dat = currentTime.getDate()
                time.setName(`Members : ◤ → ${msg.guild.members.size} ← ◢`);
            }, 1000);
        });
    }
});





//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
client.on('message',  (message) => {
    if(message.content.startsWith('^slap')) {
let user = message.mentions.users.first();
if (!user) {

return message.emit('commandUsage', message, this.help);
}
let slaps = [
'https://i.giphy.com/media/3XlEk2RxPS1m8/giphy.gif',
'https://i.giphy.com/media/mEtSQlxqBtWWA/giphy.gif',
'https://i.giphy.com/media/j3iGKfXRKlLqw/giphy.gif',
'https://i.giphy.com/media/2M2RtPm8T2kOQ/giphy.gif',
'https://i.giphy.com/media/l3YSimA8CV1k41b1u/giphy.gif',
'https://media.giphy.com/media/PgqHnJPeZHxv2/giphy.gif',
'https://cdn.vox-cdn.com/uploads/chorus_asset/file/3403052/2015-02-12_11_57_29.0.gif',
'http://static.koimoi.com/wp-content/new-galleries/2014/07/zor-ka-jhatka-zor-se-best-slapping-scenes-from-bollywood-11.gif'
];

message.channel.send({
embed: {
  description: `${message.author.username} صكك كف ولا عمركك ما ذقته ${user.username}!`,
  image: {
    url: slaps[Math.floor(Math.random() * slaps.length)]
  }
}
}).catch(e => {
client.log.error(e);
})
    }  
});
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
client.on('message' , message => {
    if(message.author.bot) return;
    if(message.content.startsWith(prefix + "xo")) {
   let array_of_mentions = message.mentions.users.array();
    let symbols = [':o:', ':heavy_multiplication_x:']
    var grid_message;
   
    if (array_of_mentions.length == 1 || array_of_mentions.length == 2) {
      let random1 = Math.floor(Math.random() * (1 - 0 + 1)) + 0;
      let random2 = Math.abs(random1 - 1);
      if (array_of_mentions.length == 1) {
        random1 = 0;
        random2 = 0;
      }
      var player1_id = message.author.id
      let player2_id = array_of_mentions[random2].id;
      var turn_id = player1_id;
      var symbol = symbols[0];
      let initial_message = `اللعبة بين اللاعبين التاليين <@${player1_id}> and <@${player2_id}>!`;
      if (player1_id == player2_id) {
        initial_message += '\n_(لقد خسرت, العب مع نفسك :joy:)_'
      }
      message.channel.send(`Xo ${initial_message}`)
      .then(console.log("Successful tictactoe introduction"))
      .catch(console.error);
      message.channel.send(':one::two::three:' + '\n' +
                           ':four::five::six:' + '\n' +
                           ':seven::eight::nine:')
      .then((new_message) => {
        grid_message = new_message;
      })
      .then(console.log("Successful tictactoe game initialization"))
      .catch(console.error);
      message.channel.send('Loading... Please wait for the :ok: reaction.')
      .then(async (new_message) => {
        await new_message.react('1⃣');
        await new_message.react('2⃣');
        await new_message.react('3⃣');
        await new_message.react('4⃣');
        await new_message.react('5⃣');
        await new_message.react('6⃣');
        await new_message.react('7⃣');
        await new_message.react('8⃣');
        await new_message.react('9⃣');
        await new_message.react('🆗');
        await new_message.edit(`It\'s <@${turn_id}>\'s اشتغل! الرمز هو ${symbol}`)
        .then((new_new_message) => {
          require('./xo.js')(client, message, new_new_message, player1_id, player2_id, turn_id, symbol, symbols, grid_message);
        })
        .then(console.log("Successful tictactoe listeprefix initialization"))
        .catch(console.error);
      })
      .then(console.log("Successful tictactoe react initialization"))
      .catch(console.error);
    }
    else {
      message.channel.send(`جرب ^xo @uesr`)
      .then(console.log("Successful error reply"))
      .catch(console.error);
    }
  }
   });  
  
///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
let conf = JSON.parse(fs.readFileSync('./autorole.json' , 'utf8'));

client.on('ready', () => {
    console.log(`Logged in as ${client.user.tag}!`);
  });
  
  client.on('message', message => {
    if(message.author.bot) return;
   
  
    let command = message.content.split(" ")[0].slice(prefix.length);
    let args = message.content.split(" ").slice(1);
    if(!message.content.toLowerCase().startsWith(prefix)) return;
  
    if(command == 'autorole') { // Starts here...
      let embed = new Discord.RichEmbed()
      .setColor("RANDOM")
      .setTimestamp()
      .setTitle(`AutoRole`, message.author.displayAvatarURL);
  
      if(!conf[message.guild.id]) {
        conf[message.guild.id] = {
          role: "None"
        }
      }
      fs.writeFile("./autorole.json", JSON.stringify(conf), (err) => {
        if(err) throw err;
      });
      let role = conf[message.guild.id].role;
      let dRole = message.guild.roles.find(r => r.id == role);
      if(!dRole) dRole = "None";
      if(!args.join(" ")) {
        embed.addField(`Current Value`, `**${dRole}**`)
        embed.addField(`Help?`, `**${prefix}autorole <role | none>**\nTo set new role: **${prefix}autorole @Role**`)
        return message.channel.send(embed);
      }
  
      if(message.mentions.roles.first()) {
        let dRole = message.guild.roles.find(role => role.id == message.mentions.roles.first().id);
        if(!dRole) return message.channel.send(`That role doesn't exists.`);
  
        conf[message.guild.id] = {
          role: `${dRole.id}`
        }
        fs.writeFile("./autorole.json", JSON.stringify(conf), (err) => {
          if (err) throw err;
        });
        embed.setDescription(`**Role Updated**\nAutorole has been set to <@&${dRole.id}>`)
        message.channel.send(embed);
      }
      if(args[0] == 'none' || args[0] == 'remove') {
        if(!conf[message.guild.id]) return message.channel.send(`There's no autorole setup to remove.`);
        conf[message.guild.id] = {
          role: `None`
        }
        fs.writeFile("./autorole.json", JSON.stringify(conf), (err) => {
          if (err) throw err;
        });
  
        embed.setDescription(`**Role Updated**\nAutorole has been removed.`)
        message.channel.send(embed);
      }
    } // Ends here..
  });
  
  client.on("guildMemberAdd", async member => {
    let role = conf[member.guild.id].role;
    if(!role || isNaN(role) || role == undefined) return;
    let dRole = member.guild.roles.find(r => r.id == role);
    if(!dRole || dRole == null) return;
    member.addRole(dRole.id);
  });
  

//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
const log = JSON.parse(fs.readFileSync('./log.json' , 'utf8'));

client.on('message', message => {
    let room = message.content.split(" ").slice(1);
    let findroom = message.guild.channels.find('name', `${room}`)
    if(message.content.startsWith(prefix + "setLog")) {
        if(!message.channel.guild) return message.reply('**الامر للسيرفرات فقط !**');
        if(!message.member.hasPermission('MANAGE_GUILD')) return message.channel.send('**عذرا . انت لا تمتلك الصلاحيات الكافية** `MANAGE_GUILD`' );
if(!room) return message.channel.send('الرجاء كتابة اسم روم اللوق')
if(!findroom) return message.channel.send('الرجاء كتابة اسم روم اللوق')
let embed = new Discord.RichEmbed()
.setTitle('**Done The Log Code Has Been Setup**')
.addField('Channel:', `${room}`)
.addField('Requested By:', `${message.author}`)
.setThumbnail(message.author.avatarURL)
.setFooter(`${client.user.username}`)
message.channel.sendEmbed(embed)
log[message.guild.id] = {
channel: room,
onoff: 'On'
}
fs.writeFile("./log.json", JSON.stringify(log), (err) => {
if (err) console.error(err)
})
    }})
         
client.on('message', message => {
  
    if(message.content.startsWith(prefix + "toggleLog")) {
        if(!message.channel.guild) return message.reply('**الامر للسيرفرات فقط**');
        if(!message.member.hasPermission('MANAGE_GUILD')) return message.channel.send('**عذرا . لا تمتلك الصلاحيات الكافية** `MANAGE_GUILD`' );
        if(!log[message.guild.id]) log[message.guild.id] = {
          onoff: 'Off'
        }
          if(log[message.guild.id].onoff === 'Off') return [message.channel.send(`**The log Is __𝐎𝐍__ !**`), log[message.guild.id].onoff = 'On']
          if(log[message.guild.id].onoff === 'On') return [message.channel.send(`**The log Is __𝐎𝐅𝐅__ !**`), log[message.guild.id].onoff = 'Off']
          fs.writeFile("./log.json", JSON.stringify(log), (err) => {
            if (err) console.error(err)
            .catch(err => {
              console.error(err);
          });
            });
          }
          
        })


client.on('messageDelete', message => {

	if(message.author.bot) return;
	if(message.channel.type === 'dm') return;
	if(!message.guild.member(client.user).hasPermission('EMBED_LINKS')) return;
	if(!message.guild.member(client.user).hasPermission('MANAGE_MESSAGES')) return;
				        if(!log[message.guild.id]) log[message.guild.id] = {
          onoff: 'Off'
        }
    if(log[message.guild.id].onoff === 'Off') return;
	var logChannel = message.guild.channels.find(c => c.name === `${log[message.guild.id].channel}`);
	if(!logChannel) return;

	let messageDelete = new Discord.RichEmbed()
	.setTitle('**[MESSAGE DELETE]**')
	.setColor('RED')
	.setThumbnail(message.author.avatarURL)
	.setDescription(`**\n**:wastebasket: Successfully \`\`DELETE\`\` **MESSAGE** In ${message.channel}\n\n**Channel:** \`\`${message.channel.name}\`\` (ID: ${message.channel.id})\n**Message ID:** ${message.id}\n**Sent By:** <@${message.author.id}> (ID: ${message.author.id})\n**Message:**\n\`\`\`${message}\`\`\``)
	.setTimestamp()
	.setFooter(message.guild.name, message.guild.iconURL)

	logChannel.send(messageDelete);
});
client.on('messageUpdate', (oldMessage, newMessage) => {

	if(oldMessage.author.bot) return;
	if(!oldMessage.channel.type === 'dm') return;
	if(!oldMessage.guild.member(client.user).hasPermission('EMBED_LINKS')) return;
	if(!oldMessage.guild.member(client.user).hasPermission('MANAGE_MESSAGES')) return;
				        if(!log[oldMessage.guild.id]) log[oldMessage.guild.id] = {
          onoff: 'Off'
        }
    if(log[oldMessage.guild.id].onoff === 'Off') return;
	var logChannel = oldMessage.guild.channels.find(c => c.name === `${log[oldMessage.guild.id].channel}`);
	if(!logChannel) return;

	if(oldMessage.content.startsWith('https://')) return;

	let messageUpdate = new Discord.RichEmbed()
	.setTitle('**[MESSAGE EDIT]**')
	.setThumbnail(oldMessage.author.avatarURL)
	.setColor('BLUE')
	.setDescription(`**\n**:wrench: Successfully \`\`EDIT\`\` **MESSAGE** In ${oldMessage.channel}\n\n**Channel:** \`\`${oldMessage.channel.name}\`\` (ID: ${oldMessage.channel.id})\n**Message ID:** ${oldMessage.id}\n**Sent By:** <@${oldMessage.author.id}> (ID: ${oldMessage.author.id})\n\n**Old Message:**\`\`\`${oldMessage}\`\`\`\n**New Message:**\`\`\`${newMessage}\`\`\``)
	.setTimestamp()
	.setFooter(oldMessage.guild.name, oldMessage.guild.iconURL)

	logChannel.send(messageUpdate);
});


client.on('roleCreate', role => {

	if(!role.guild.member(client.user).hasPermission('EMBED_LINKS')) return;
	if(!role.guild.member(client.user).hasPermission('VIEW_AUDIT_LOG')) return;
	        if(!log[role.guild.id]) log[role.guild.id] = {
          onoff: 'Off'
        }
    if(log[role.guild.id].onoff === 'Off') return;
	var logChannel = role.guild.channels.find(c => c.name === `${log[role.guild.id].channel}`);
	if(!logChannel) return;

	role.guild.fetchAuditLogs().then(logs => {
		var userID = logs.entries.first().executor.id;
		var userAvatar = logs.entries.first().executor.avatarURL;

		let roleCreate = new Discord.RichEmbed()
		.setTitle('**[ROLE CREATE]**')
		.setThumbnail(userAvatar)
		.setDescription(`**\n**:white_check_mark: Successfully \`\`CREATE\`\` Role.\n\n**Role Name:** \`\`${role.name}\`\` (ID: ${role.id})\n**By:** <@${userID}> (ID: ${userID})`)
		.setColor('GREEN')
		.setTimestamp()
		.setFooter(role.guild.name, role.guild.iconURL)

		logChannel.send(roleCreate);
	})
});
client.on('roleDelete', role => {

	if(!role.guild.member(client.user).hasPermission('EMBED_LINKS')) return;
	if(!role.guild.member(client.user).hasPermission('VIEW_AUDIT_LOG')) return;
	        if(!log[role.guild.id]) log[role.guild.id] = {
          onoff: 'Off'
        }
    if(log[role.guild.id].onoff === 'Off') return;
	var logChannel = role.guild.channels.find(c => c.name === `${log[role.guild.id].channel}`);
	if(!logChannel) return;

	role.guild.fetchAuditLogs().then(logs => {
		var userID = logs.entries.first().executor.id;
		var userAvatar = logs.entries.first().executor.avatarURL;

		let roleDelete = new Discord.RichEmbed()
		.setTitle('**[ROLE DELETE]**')
		.setThumbnail(userAvatar)
		.setDescription(`**\n**:white_check_mark: Successfully \`\`DELETE\`\` Role.\n\n**Role Name:** \`\`${role.name}\`\` (ID: ${role.id})\n**By:** <@${userID}> (ID: ${userID})`)
		.setColor('RED')
		.setTimestamp()
		.setFooter(role.guild.name, role.guild.iconURL)

		logChannel.send(roleDelete);
	})
});
client.on('roleUpdate', (oldRole, newRole) => {

	if(!oldRole.guild.member(client.user).hasPermission('EMBED_LINKS')) return;
	if(!oldRole.guild.member(client.user).hasPermission('VIEW_AUDIT_LOG')) return;
	        if(!log[oldRole.guild.id]) log[oldRole.guild.id] = {
          onoff: 'Off'
	        }
    if(log[oldRole.guild.id].onoff === 'Off') return;
	var logChannel = oldRole.guild.channels.find(c => c.name === `${log[oldRole.guild.id].channel}`);
	if(!logChannel) return;

	oldRole.guild.fetchAuditLogs().then(logs => {
		var userID = logs.entries.first().executor.id;
		var userAvatar = logs.entries.first().executor.avatarURL;

		if(oldRole.name !== newRole.name) {
            if(log[oldRole.guild.id].onoff === 'Off') return;
			let roleUpdateName = new Discord.RichEmbed()
			.setTitle('**[ROLE NAME UPDATE]**')
			.setThumbnail(userAvatar)
			.setColor('BLUE')
			.setDescription(`**\n**:white_check_mark: Successfully \`\`EDITED\`\` Role Name.\n\n**Old Name:** \`\`${oldRole.name}\`\`\n**New Name:** \`\`${newRole.name}\`\`\n**Role ID:** ${oldRole.id}\n**By:** <@${userID}> (ID: ${userID})`)
			.setTimestamp()
			.setFooter(oldRole.guild.name, oldRole.guild.iconURL)

			logChannel.send(roleUpdateName);
		}
		if(oldRole.hexColor !== newRole.hexColor) {
			if(oldRole.hexColor === '#000000') {
				var oldColor = '`Default`';
			}else {
				var oldColor = oldRole.hexColor;
			}
			if(newRole.hexColor === '#000000') {
				var newColor = '`Default`';
			}else {
				var newColor = newRole.hexColor;
            }
            if(log[oldRole.guild.id].onoff === 'Off') return;
			let roleUpdateColor = new Discord.RichEmbed()
			.setTitle('**[ROLE COLOR UPDATE]**')
			.setThumbnail(userAvatar)
			.setColor('BLUE')
			.setDescription(`**\n**:white_check_mark: Successfully \`\`EDITED\`\` **${oldRole.name}** Role Color.\n\n**Old Color:** ${oldColor}\n**New Color:** ${newColor}\n**Role ID:** ${oldRole.id}\n**By:** <@${userID}> (ID: ${userID})`)
			.setTimestamp()
			.setFooter(oldRole.guild.name, oldRole.guild.iconURL)

			logChannel.send(roleUpdateColor);
		}
	})
});


client.on('channelCreate', channel => {

	if(!channel.guild) return;
	if(!channel.guild.member(client.user).hasPermission('EMBED_LINKS')) return;
	if(!channel.guild.member(client.user).hasPermission('VIEW_AUDIT_LOG')) return;
	        if(!log[channel.guild.id]) log[channel.guild.id] = {
          onoff: 'Off'
        }
    if(log[channel.guild.id].onoff === 'Off') return;
	var logChannel = channel.guild.channels.find(c => c.name === `${log[channel.guild.id].channel}`);
	if(!logChannel) return;

	if(channel.type === 'text') {
		var roomType = 'Text';
	}else
	if(channel.type === 'voice') {
		var roomType = 'Voice';
	}else
	if(channel.type === 'category') {
		var roomType = 'Category';
	}

	channel.guild.fetchAuditLogs().then(logs => {
		var userID = logs.entries.first().executor.id;
		var userAvatar = logs.entries.first().executor.avatarURL;

		let channelCreate = new Discord.RichEmbed()
		.setTitle('**[CHANNEL CREATE]**')
		.setThumbnail(userAvatar)
		.setDescription(`**\n**:white_check_mark: Successfully \`\`CREATE\`\` **${roomType}** channel.\n\n**Channel Name:** \`\`${channel.name}\`\` (ID: ${channel.id})\n**By:** <@${userID}> (ID: ${userID})`)
		.setColor('GREEN')
		.setTimestamp()
		.setFooter(channel.guild.name, channel.guild.iconURL)

		logChannel.send(channelCreate);
	})
});
client.on('channelDelete', channel => {
	if(!channel.guild) return;
	if(!channel.guild.member(client.user).hasPermission('EMBED_LINKS')) return;
	if(!channel.guild.member(client.user).hasPermission('VIEW_AUDIT_LOG')) return;
	        if(!log[channel.guild.id]) log[channel.guild.id] = {
          onoff: 'Off'
        }
    if(log[channel.guild.id].onoff === 'Off') return;
	var logChannel = channel.guild.channels.find(c => c.name === `${log[channel.guild.id].channel}`);
	if(!logChannel) return;

	if(channel.type === 'text') {
		var roomType = 'Text';
	}else
	if(channel.type === 'voice') {
		var roomType = 'Voice';
	}else
	if(channel.type === 'category') {
		var roomType = 'Category';
	}

	channel.guild.fetchAuditLogs().then(logs => {
		var userID = logs.entries.first().executor.id;
		var userAvatar = logs.entries.first().executor.avatarURL;

		let channelDelete = new Discord.RichEmbed()
		.setTitle('**[CHANNEL DELETE]**')
		.setThumbnail(userAvatar)
		.setDescription(`**\n**:white_check_mark: Successfully \`\`DELETE\`\` **${roomType}** channel.\n\n**Channel Name:** \`\`${channel.name}\`\` (ID: ${channel.id})\n**By:** <@${userID}> (ID: ${userID})`)
		.setColor('RED')
		.setTimestamp()
		.setFooter(channel.guild.name, channel.guild.iconURL)

		logChannel.send(channelDelete);
	})
});
client.on('channelUpdate', (oldChannel, newChannel) => {
	if(!oldChannel.guild) return;
	        if(!log[oldChannel.guild.id]) log[oldChannel.guild.id] = {
          onoff: 'Off'
        }
    if(log[oldChannel.guild.id].onoff === 'Off') return;
	var logChannel = oldChannel.guild.channels.find(c => c.name === `${log[oldChannel.guild.id].channel}`);
	if(!logChannel) return;

	if(oldChannel.type === 'text') {
		var channelType = 'Text';
	}else
	if(oldChannel.type === 'voice') {
		var channelType = 'Voice';
	}else
	if(oldChannel.type === 'category') {
		var channelType = 'Category';
	}

	oldChannel.guild.fetchAuditLogs().then(logs => {
		var userID = logs.entries.first().executor.id;
		var userAvatar = logs.entries.first().executor.avatarURL;

		if(oldChannel.name !== newChannel.name) {
			let newName = new Discord.RichEmbed()
			.setTitle('**[CHANNEL EDIT]**')
			.setThumbnail(userAvatar)
			.setColor('BLUE')
			.setDescription(`**\n**:wrench: Successfully Edited **${channelType}** Channel Name\n\n**Old Name:** \`\`${oldChannel.name}\`\`\n**New Name:** \`\`${newChannel.name}\`\`\n**Channel ID:** ${oldChannel.id}\n**By:** <@${userID}> (ID: ${userID})`)
			.setTimestamp()
			.setFooter(oldChannel.guild.name, oldChannel.guild.iconURL)

			logChannel.send(newName);
		}
		if(oldChannel.topic !== newChannel.topic) {
            if(log[oldChannel.guild.id].onoff === 'Off') return;
			let newTopic = new Discord.RichEmbed()
			.setTitle('**[CHANNEL EDIT]**')
			.setThumbnail(userAvatar)
			.setColor('BLUE')
			.setDescription(`**\n**:wrench: Successfully Edited **${channelType}** Channel Topic\n\n**Old Topic:**\n\`\`\`${oldChannel.topic || 'NULL'}\`\`\`\n**New Topic:**\n\`\`\`${newChannel.topic || 'NULL'}\`\`\`\n**Channel:** ${oldChannel} (ID: ${oldChannel.id})\n**By:** <@${userID}> (ID: ${userID})`)
			.setTimestamp()
			.setFooter(oldChannel.guild.name, oldChannel.guild.iconURL)

			logChannel.send(newTopic);
		}
	})
});


client.on('guildBanAdd', (guild, user) => {

	if(!guild.member(client.user).hasPermission('EMBED_LINKS')) return;
	if(!guild.member(client.user).hasPermission('VIEW_AUDIT_LOG')) return;
	        if(!log[guild.guild.id]) log[guild.guild.id] = {
          onoff: 'Off'
        }
    if(log[guild.guild.id].onoff === 'Off') return;
	var logChannel = guild.channels.find(c => c.name === `${log[guild.guild.id].channel}`);
	if(!logChannel) return;

	guild.fetchAuditLogs().then(logs => {
		var userID = logs.entries.first().executor.id;
		var userAvatar = logs.entries.first().executor.avatarURL;

		if(userID === client.user.id) return;

		let banInfo = new Discord.RichEmbed()
		.setTitle('**[BANNED]**')
		.setThumbnail(userAvatar)
		.setColor('DARK_RED')
		.setDescription(`**\n**:airplane: Successfully \`\`BANNED\`\` **${user.username}** From the server!\n\n**User:** <@${user.id}> (ID: ${user.id})\n**By:** <@${userID}> (ID: ${userID})`)
		.setTimestamp()
		.setFooter(guild.name, guild.iconURL)

		logChannel.send(banInfo);
	})
});
client.on('guildBanRemove', (guild, user) => {
	if(!guild.member(client.user).hasPermission('EMBED_LINKS')) return;
	if(!guild.member(client.user).hasPermission('VIEW_AUDIT_LOG')) return;
	        if(!log[guild.guild.id]) log[guild.guild.id] = {
          onoff: 'Off'
        }
    if(log[guild.guild.id].onoff === 'Off') return;
	var logChannel = guild.channels.find(c => c.name === `${log[guild.guild.id].channel}`);
	if(!logChannel) return;

	guild.fetchAuditLogs().then(logs => {
		var userID = logs.entries.first().executor.id;
		var userAvatar = logs.entries.first().executor.avatarURL;

		if(userID === client.user.id) return;

		let unBanInfo = new Discord.RichEmbed()
		.setTitle('**[UNBANNED]**')
		.setThumbnail(userAvatar)
		.setColor('GREEN')
		.setDescription(`**\n**:unlock: Successfully \`\`UNBANNED\`\` **${user.username}** From the server\n\n**User:** <@${user.id}> (ID: ${user.id})\n**By:** <@${userID}> (ID: ${userID})`)
		.setTimestamp()
		.setFooter(guild.name, guild.iconURL)

		logChannel.send(unBanInfo);
	})
});
client.on('guildUpdate', (oldGuild, newGuild) => {

	if(!oldGuild.member(client.user).hasPermission('EMBED_LINKS')) return;
	if(!oldGuild.member(client.user).hasPermission('VIEW_AUDIT_LOG')) return;
		        if(!log[oldGuild.guild.id]) log[oldGuild.guild.id] = {
          onoff: 'Off'
        }
    if(log[oldGuild.guild.id].onoff === 'Off') return;
	var logChannel = oldGuild.channels.find(c => c.name === `${log[oldGuild.guild.id].channel}`);
	if(!logChannel) return;

	oldGuild.fetchAuditLogs().then(logs => {
		var userID = logs.entries.first().executor.id;
		var userAvatar = logs.entries.first().executor.avatarURL;

		if(oldGuild.name !== newGuild.name) {
			let guildName = new Discord.RichEmbed()
			.setTitle('**[CHANGE GUILD NAME]**')
			.setThumbnail(userAvatar)
			.setColor('BLUE')
			.setDescription(`**\n**:white_check_mark: Successfully \`\`EDITED\`\` The guild name.\n\n**Old Name:** \`\`${oldGuild.name}\`\`\n**New Name:** \`\`${newGuild.name}\`\`\n**By:** <@${userID}> (ID: ${userID})`)
			.setTimestamp()
			.setFooter(newGuild.name, oldGuild.iconURL)

			logChannel.send(guildName)
		}
		if(oldGuild.region !== newGuild.region) {
            if(log[newGuild.regon.guild.id].onoff === 'Off') return;
			let guildRegion = new Discord.RichEmbed()
			.setTitle('**[CHANGE GUILD REGION]**')
			.setThumbnail(userAvatar)
			.setColor('BLUE')
			.setDescription(`**\n**:white_check_mark: Successfully \`\`EDITED\`\` The guild region.\n\n**Old Region:** ${oldGuild.region}\n**New Region:** ${newGuild.region}\n**By:** <@${userID}> (ID: ${userID})`)
			.setTimestamp()
			.setFooter(oldGuild.name, oldGuild.iconURL)

			logChannel.send(guildRegion);
		}
		if(oldGuild.verificationLevel !== newGuild.verificationLevel) {
			if(oldGuild.verificationLevel === 0) {
				var oldVerLvl = 'Very Easy';
			}else
			if(oldGuild.verificationLevel === 1) {
				var oldVerLvl = 'Easy';
			}else
			if(oldGuild.verificationLevel === 2) {
				var oldVerLvl = 'Medium';
			}else
			if(oldGuild.verificationLevel === 3) {
				var oldVerLvl = 'Hard';
			}else
			if(oldGuild.verificationLevel === 4) {
				var oldVerLvl = 'Very Hard';
			}

			if(newGuild.verificationLevel === 0) {
				var newVerLvl = 'Very Easy';
			}else
			if(newGuild.verificationLevel === 1) {
				var newVerLvl = 'Easy';
			}else
			if(newGuild.verificationLevel === 2) {
				var newVerLvl = 'Medium';
			}else
			if(newGuild.verificationLevel === 3) {
				var newVerLvl = 'Hard';
			}else
			if(newGuild.verificationLevel === 4) {
				var newVerLvl = 'Very Hard';
			}
            if(log[newGuild.region.guild.id].onoff === 'Off') return;
			let verLog = new Discord.RichEmbed()
			.setTitle('**[GUILD VERIFICATION LEVEL CHANGE]**')
			.setThumbnail(userAvatar)
			.setColor('BLUE')
			.setDescription(`**\n**:white_check_mark: Successfully \`\`EDITED\`\` Guild Verification level.\n\n**Old Verification Level:** ${oldVerLvl}\n**New Verification Level:** ${newVerLvl}\n**By:** <@${userID}> (ID: ${userID})`)
			.setTimestamp()
			.setFooter(oldGuild.name, oldGuild.iconURL)

			logChannel.send(verLog);
		}
	})
});
client.on('guildMemberUpdate', (oldMember, newMember) => {
	if(!oldMember.guild) return;
		        if(!log[oldMember.guild.id]) log[oldMember.guild.id] = {
          onoff: 'Off'
        }
    if(log[oldMember.guild.id].onoff === 'Off') return;
	var logChannel = oldMember.guild.channels.find(c => c.name === `${log[oldMember, newMember.guild.id].channel}`);
	if(!logChannel) return;

	oldMember.guild.fetchAuditLogs().then(logs => {
		var userID = logs.entries.first().executor.id;
		var userAvatar = logs.entries.first().executor.avatarURL;
		var userTag = logs.entries.first().executor.tag;

		if(oldMember.nickname !== newMember.nickname) {
			if(oldMember.nickname === null) {
				var oldNM = '`اسمه الاصلي`';
			}else {
				var oldNM = oldMember.nickname;
			}
			if(newMember.nickname === null) {
				var newNM = '`اسمه الاصلي`';
			}else {
				var newNM = newMember.nickname;
			}

			let updateNickname = new Discord.RichEmbed()
			.setTitle('**[UPDATE MEMBER NICKNAME]**')
			.setThumbnail(userAvatar)
			.setColor('BLUE')
			.setDescription(`**\n**:spy: Successfully \`\`CHANGE\`\` Member Nickname.\n\n**User:** ${oldMember} (ID: ${oldMember.id})\n**Old Nickname:** ${oldNM}\n**New Nickname:** ${newNM}\n**By:** <@${userID}> (ID: ${userID})`)
			.setTimestamp()
			.setFooter(oldMember.guild.name, oldMember.guild.iconURL)

			logChannel.send(updateNickname);
		}
		if(oldMember.roles.size < newMember.roles.size) {
			let role = newMember.roles.filter(r => !oldMember.roles.has(r.id)).first();
					        if(!log[oldMember.guild.id]) log[oldMember.guild.id] = {
          onoff: 'Off'
        }
            if(log[oldMember.guild.id].onoff === 'Off') return;
			let roleAdded = new Discord.RichEmbed()
			.setTitle('**[ADDED ROLE TO MEMBER]**')
			.setThumbnail(oldMember.guild.iconURL)
			.setColor('GREEN')
			.setDescription(`**\n**:white_check_mark: Successfully \`\`ADDED\`\` Role to **${oldMember.user.username}**\n\n**User:** <@${oldMember.id}> (ID: ${oldMember.user.id})\n**Role:** \`\`${role.name}\`\` (ID: ${role.id})\n**By:** <@${userID}> (ID: ${userID})`)
			.setTimestamp()
			.setFooter(userTag, userAvatar)

			logChannel.send(roleAdded);
		}
		if(oldMember.roles.size > newMember.roles.size) {
			let role = oldMember.roles.filter(r => !newMember.roles.has(r.id)).first();
					        if(!log[oldMember.guild.id]) log[oldMember.guild.id] = {
          onoff: 'Off'
        }
            if(log[oldMember, newMember.guild.id].onoff === 'Off') return;
			let roleRemoved = new Discord.RichEmbed()
			.setTitle('**[REMOVED ROLE FROM MEMBER]**')
			.setThumbnail(oldMember.guild.iconURL)
			.setColor('RED')
			.setDescription(`**\n**:negative_squared_cross_mark: Successfully \`\`REMOVED\`\` Role from **${oldMember.user.username}**\n\n**User:** <@${oldMember.user.id}> (ID: ${oldMember.id})\n**Role:** \`\`${role.name}\`\` (ID: ${role.id})\n**By:** <@${userID}> (ID: ${userID})`)
			.setTimestamp()
			.setFooter(userTag, userAvatar)

			logChannel.send(roleRemoved);
		}
	})
	if(oldMember.guild.owner.id !== newMember.guild.owner.id) {
	  		        if(!log[oldMember.guild.id]) log[oldMember.guild.id] = {
          onoff: 'Off'
        }
        if(log[oldMember, newMember.guild.id].onoff === 'Off') return;
        let newOwner = new Discord.RichEmbed()
		.setTitle('**[UPDATE GUILD OWNER]**')
		.setThumbnail(oldMember.guild.iconURL)
		.setColor('GREEN')
		.setDescription(`**\n**:white_check_mark: Successfully \`\`TRANSFER\`\` The Owner Ship.\n\n**Old Owner:** <@${oldMember.user.id}> (ID: ${oldMember.user.id})\n**New Owner:** <@${newMember.user.id}> (ID: ${newMember.user.id})`)
		.setTimestamp()
		.setFooter(oldMember.guild.name, oldMember.guild.iconURL)

		logChannel.send(newOwner);
	}
});


client.on('voiceStateUpdate', (voiceOld, voiceNew) => {

	if(!voiceOld.guild.member(client.user).hasPermission('EMBED_LINKS')) return;
	if(!voiceOld.guild.member(client.user).hasPermission('VIEW_AUDIT_LOG')) return;
			        if(!log[voiceOld.guild.id]) log[voiceOld.guild.id] = {
          onoff: 'Off'
        }
    if(log[voiceOld, voiceOld.guild.id].onoff === 'Off') return;
	var logChannel = voiceOld.guild.channels.find(c => c.name === `${log[voiceOld, voiceNew.guild.id].channel}`);
	if(!logChannel) return;

	voiceOld.guild.fetchAuditLogs().then(logs => {
		var userID = logs.entries.first().executor.id;
		var userTag = logs.entries.first().executor.tag;
		var userAvatar = logs.entries.first().executor.avatarURL;

		if(voiceOld.serverMute === false && voiceNew.serverMute === true) {
			let serverMutev = new Discord.RichEmbed()
			.setTitle('**[VOICE MUTE]**')
			.setThumbnail('https://images-ext-1.discordapp.net/external/pWQaw076OHwVIFZyeFoLXvweo0T_fDz6U5C9RBlw_fQ/https/cdn.pg.sa/UosmjqDNgS.png')
			.setColor('RED')
			.setDescription(`**User:** ${voiceOld} (ID: ${voiceOld.id})\n**By:** <@${userID}> (ID: ${userID})\n**Channel:** \`\`${voiceOld.voiceChannel.name}\`\` (ID: ${voiceOld.voiceChannel.id})`)
			.setTimestamp()
			.setFooter(userTag, userAvatar)

			logChannel.send(serverMutev);
		}
		if(voiceOld.serverMute === true && voiceNew.serverMute === false) {
		  			        if(!log[voiceOld.guild.id]) log[voiceOld.guild.id] = {
          onoff: 'Off'
        }
            if(log[voiceOld, voiceOld.guild.id].onoff === 'Off') return;
			let serverUnmutev = new Discord.RichEmbed()
			.setTitle('**[VOICE UNMUTE]**')
			.setThumbnail('https://images-ext-1.discordapp.net/external/u2JNOTOc1IVJGEb1uCKRdQHXIj5-r8aHa3tSap6SjqM/https/cdn.pg.sa/Iy4t8H4T7n.png')
			.setColor('GREEN')
			.setDescription(`**User:** ${voiceOld} (ID: ${voiceOld.id})\n**By:** <@${userID}> (ID: ${userID})\n**Channel:** \`\`${voiceOld.voiceChannel.name}\`\` (ID: ${voiceOld.voiceChannel.id})`)
			.setTimestamp()
			.setFooter(userTag, userAvatar)

			logChannel.send(serverUnmutev);
		}
		if(voiceOld.serverDeaf === false && voiceNew.serverDeaf === true) {
		  			        if(!log[voiceOld.guild.id]) log[voiceOld.guild.id] = {
          onoff: 'Off'
        }
            if(log[voiceOld, voiceOld.guild.id].onoff === 'Off') return;
			let serverDeafv = new Discord.RichEmbed()
			.setTitle('**[VOICE DEAF]**')
			.setThumbnail('https://images-ext-1.discordapp.net/external/7ENt2ldbD-3L3wRoDBhKHb9FfImkjFxYR6DbLYRjhjA/https/cdn.pg.sa/auWd5b95AV.png')
			.setColor('RED')
			.setDescription(`**User:** ${voiceOld} (ID: ${voiceOld.id})\n**By:** <@${userID}> (ID: ${userID})\n**Channel:** \`\`${voiceOld.voiceChannel.name}\`\` (ID: ${voiceOld.voiceChannel.id})`)
			.setTimestamp()
			.setFooter(userTag, userAvatar)

			logChannel.send(serverDeafv);
		}
		if(voiceOld.serverDeaf === true && voiceNew.serverDeaf === false) {
		  			        if(!log[voiceOld.guild.id]) log[voiceOld.guild.id] = {
          onoff: 'Off'
        }
            if(log[voiceOld, voiceOld.guild.id].onoff === 'Off') return;
			let serverUndeafv = new Discord.RichEmbed()
			.setTitle('**[VOICE UNDEAF]**')
			.setThumbnail('https://images-ext-2.discordapp.net/external/s_abcfAlNdxl3uYVXnA2evSKBTpU6Ou3oimkejx3fiQ/https/cdn.pg.sa/i7fC8qnbRF.png')
			.setColor('GREEN')
			.setDescription(`**User:** ${voiceOld} (ID: ${voiceOld.id})\n**By:** <@${userID}> (ID: ${userID})\n**Channel:** \`\`${voiceOld.voiceChannel.name}\`\` (ID: ${voiceOld.voiceChannel.id})`)
			.setTimestamp()
			.setFooter(userTag, userAvatar)

			logChannel.send(serverUndeafv);
		}
	})
	
	if(voiceOld.voiceChannelID !== voiceNew.voiceChannelID && voiceNew.voiceChannel && voiceOld.voiceChannel != null) {
	  			        if(!log[voiceOld.guild.id]) log[voiceOld.guild.id] = {
          onoff: 'Off'
        }
        if(log[voiceOld, voiceOld.guild.id].onoff === 'Off') return;
		let voiceLeave = new Discord.RichEmbed()
		.setTitle('**[CHANGED VOICE ROOM]**')
		.setColor('GREEN')
		.setThumbnail(voiceOld.user.avatarURL)
		.setDescription(`**\n**:repeat: Successfully \`\`CHANGED\`\` The Voice Channel.\n\n**From:** \`\`${voiceOld.voiceChannel.name}\`\` (ID: ${voiceOld.voiceChannelID})\n**To:** \`\`${voiceNew.voiceChannel.name}\`\` (ID: ${voiceNew.voiceChannelID})\n**User:** ${voiceOld} (ID: ${voiceOld.id})`)
		.setTimestamp()
		.setFooter(voiceOld.user.tag, voiceOld.user.avatarURL)

		logChannel.send(voiceLeave);
	}
});
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
client.on('message', message => { 
        if (message.content.startsWith(prefix + 'emojilist')) {
    
            const List = message.guild.emojis.map(e => e.toString()).join(" ");
    
            const EmojiList = new Discord.RichEmbed()
                .setTitle('➠ Emojis') 
                .setAuthor(message.guild.name, message.guild.iconURL) 
                .setColor('RANDOM') 
                .setDescription(List) 
                .setFooter(message.guild.name) 
            message.channel.send(EmojiList) 
        }
    });
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////autorole
client.on('message', async message =>{
  
    if (message.author.omar) return;
    if (!message.content.startsWith(prefix + 'mute')) return;
    if(!message.channel.guild) return message.channel.send('**هذا الأمر فقط للسيرفرات**').then(m => m.delete(5000));
    if(!message.member.hasPermission('MANAGE_ROLES')) return      message.channel.send('**عذرا انت لا تمتلك الصلاحيات الكافية** `MANAGE_ROLES`' ).then(msg => msg.delete(60))
    if(!message.guild.member(client.user).hasPermission("MANAGE_ROLES")) return message.reply("**I Don't Have `MANAGE_ROLES` Permission**").then(msg => msg.delete(60))
    var command = message.content.split(" ")[0];
    command = command.slice(prefix.length);
    var args = message.content.split(" ").slice(1);
        if(command == "mute") {
        let tomute = message.guild.member(message.mentions.users.first() || message.guild.members.get(args[0]));
        if(!tomute) return message.reply("**يجب عليك المنشن اولاّ**:x: ") .then(m => m.delete(5000));
        let muterole = message.guild.roles.find(`name`, "Muted");
        
        if(!muterole){
          try{
            muterole = await message.guild.createRole({
              name: "Muted",
              color: "&000000",
              permissions:[]
            })
            message.guild.channels.forEach(async (channel, id) => {
              await channel.overwritePermissions(muterole, {
                SEND_MESSAGES: false,
                ADD_REACTIONS: false
              });
            });
          }catch(e){
            console.log(e.stack);
          }
        }
        
        let mutetime = args[1];
        if(!mutetime) return message.reply("**يرجى تحديد وقت الميوت**:x:");
      
        await(tomute.addRole(muterole.id));
        message.reply(`**:white_check_mark: <@${tomute.id}> Was Muted :zipper_mouth:**`);
    setTimeout(function(){
          tomute.removeRole(muterole.id);
          message.channel.send(`<@${tomute.id}> **انقضى الوقت وتم فك الميوت عن الشخص**:white_check_mark: `);
        }, ms(mutetime));
      
      
    
      }
   
      if(command === `unmute`) {
      if(!message.member.hasPermission("MANAGE_ROLES")) return message.channel.sendMessage("**ليس لديك صلاحية لفك عن الشخص ميوت**:x: ").then(m => m.delete(5000));
    if(!message.guild.member(client.user).hasPermission("MANAGE_ROLES")) return message.reply("**I Don't Have `MANAGE_ROLES` Permission**").then(msg => msg.delete(6000))
    
      let toMute = message.guild.member(message.mentions.users.first()) || message.guild.members.get(args[0]);
      if(!toMute) return message.channel.sendMessage("**عليك المنشن أولاّ**:x: ");
    
      let role = message.guild.roles.find (r => r.name === "Muted");
      
      if(!role || !toMute.roles.has(role.id)) return message.channel.sendMessage("**لم يتم اعطاء هذه شخص ميوت من الأساس**:x:")
    
      await toMute.removeRole(role)
      message.channel.sendMessage("**:white_check_mark: User Was UnMuted :zipper_mouth: **");
    
      return;
    
      }
    
    });
          
////////////////////////////////////////////////////////////////////////////////////////////////
client.on('message', message=> {
    if (message.author.bot) return;
    if (message.isMentioned(client.user))
    {
    message.reply("type ^help");
    }
});
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////


      


/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
client.on('message' , message => {
    if(message.content.startsWith(prefix + `restart`)){
    if(message.author.id !== "474573718967025665") return message.reply(`k5a ma ymdek`);
    client.destroy();
    message.channel.send(`:white_check_mark: Restarted By <@${message.author.id}>`);
    }
    });
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
client.on('message' , message => {
    let command = message.content.split(" ")
    [0].slice(prefix.length);
    
    if(command == "bug") {
        let args = message.content.split(" ").slice(1);

        if(!args.join(" ")) return message.reply(`${prefix}bug <الخطأ>`);
    let channel = client.guilds.get("513416808062124063").channels.find(c => c.id == "515951807537610763");
    let embed = new Discord.RichEmbed()
    .setAuthor(message.author.username, message.author.displayAvatarURL)
    .setTitle(`new bugs`)
    .setFooter(message.author.id)
    .setDescription(args.join(" "));
    channel.send(embed)
      message.delete()
      message.channel.send(`تم ارسال الخطأ لصاحب البوت .. سوف يتم الاصلاح في اسرع وقت`);
    
  }
});
///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////




client.on("message", message => {
    if (message.content === "^help") {
        message.channel.send('**تم ارسال رسالة في الخاص** <:twitter_pepe:512709722495909897> ');
        const embed = new Discord.RichEmbed()
            .setColor("RANDOM")
            .setDescription(`
      ===================== اوامر عامة ===================== 
*${prefix}avatar / يظهر صورة بروفايلك*
*${prefix}avatar <@name> / يظهر صورة بروفايل الاسم المحدد*
*${prefix}date / لمعرفة التاريخ الحالي*
*${prefix}contact / للتواصل مع صاحب البوت البوت*
*${prefix}inv / لدعوة البوت لسيرفرك 
*${prefix}server / معلومات عن السيرفر*
*${prefix}bot / معلومات عن البوت*
*${prefix}ping / لمعرفة سرعة استجابة البوت*
*${prefix}bug <type bug here> / لكتابة اخطاء البوت ليتم تصليحها
**اكتب "رابط" لأرسال لك رابط السيرفر بالخاص**  
=========================================================
وقريباً المزيد من الاوامر
=========================================================

===================== اوامر الالعاب ===================== 
*${prefix}slap @user / لاعطاء خويك كف ما شافه بحياته*
*${prefix}fkk,points /   لعبة فكك , نقاطك*


      ===================== اوامر الميوزك ===================== 
soon...<a:pepe:512709670054526986> <a:dance:512761910714957854> <a:pepe1:512762416157818890>

      ===================== الاوامر الادارية ===================== 
*${prefix}ban @user/ لاعطاء باند لشخص معين*
*${prefix}uban [userID]/ لفك الحظر*
*${prefix}kick @user / لطرد شخص معين من السيرفر*
*${prefix}clear / لمسح الشات*
*${prefix}mute channel / لأغلاق الروم*
*${prefix}unmute channel / لفتح الروم*
*${prefix}bc <word> / لأرسال رسالة لجميع أعضاء السيرفر*
*${prefix}mute / لاعطاء ميوت لشخص معين*
*${prefix}unmute / لفك الميوت عن شخص معين*
*${prefix}setLog <channel name> / لتعيين روم اللوق*
=========================================================
وقريباً المزيد من الاوامر
=========================================================

`)

        message.author.sendEmbed(embed)

    }
});




client.login(process.env.BOT_TOKEN);



