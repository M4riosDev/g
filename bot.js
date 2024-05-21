//--------For Load Base
const Discord = require("discord.js");
const gkan = new Discord.Client({
    partials: ['CHANNEL', 'MESSAGE', 'REACTION', 'USER'],
    intents: 32767,
    ws: { properties: { $browser: "Discord iOS" } }
})
const fs = require("fs");
const Enmap = require("enmap");
const config = require("./config.json");
gkan.config = config;
gkan.commands = new Enmap();
const ms = require('ms')
const { Collection } = require('discord.js');
const voiceCollection = new Collection();
const moment = require('moment');
const prefix = "!"
const djs = require('djs-fun-v12')
const disbut = require('discord-buttons');
disbut(gkan);
const { MessageMenuOption, MessageMenu, MessageActionRow, MessageButton } = require('discord-buttons');
const db = require('quick.db')
const axios = require('axios')
const Invites = new Discord.Collection();

gkan.on('shardError', error => {
    console.error('A websocket connection encountered an error:', error);
});
process.on('unhandledRejection', error => {
    console.error('Unhandled promise rejection:', error);
});
 

//Gamo thn v12 by GKan



//status

gkan.once('ready', () => {
    gkan.user.setPresence({
        status: 'Power By GKan#8537',
        activity: {
            name: (config.setactivity),
            type: 'STREAMING',
            url: 'https://www.twitch.tv/GKan#8537'
        }
    });
})

//-------For Support System
const GKanDonateCreate = require("./assets/GKanDonateCreate");
gkan.once('ready', () => {
    GKanDonateCreate(gkan);
});

const GKanSupportCreate = require("./assets/GKanSupportCreate");
gkan.once('ready', () => {
    GKanSupportCreate(gkan);
});


//-------For Other Scripts
console.log("_______________GKan Official Base Loading ____________________________________");

fs.readdir("./assets/", async(err, files) => {
    files.forEach((file) => {
        let cmdName = file.split(".")[0];
        console.log(`Loaded assets '${cmdName}'`);
    });
    console.log("_______________GKan Official Base Loading SUPPORT______________________________");
});


//------For Events Files and Status
console.log("_______________GKan Official Base Loading Events-Status_______________________");

fs.readdir("./Status/", (err, files) => {
    if (err) return console.error;
    files.forEach((file) => {
        if (!file.endsWith(".js")) return;
        const evt = require(`./Status/${file}`);
        let evtName = file.split(".")[0];
        console.log(`Loaded Status '${evtName}'`);
        gkan.on(evtName, evt.bind(null, gkan));
    });
    console.log("_______________GKan Official Base Loading Commands____________________________");
});

//-----For Commands Loading
fs.readdir("./commcreate/", async(err, files) => {
    files.forEach((file) => {
        if (!file.endsWith(".js")) return;
        let props = require(`./commcreate/${file}`);
        let cmdName = file.split(".")[0];
        console.log(`Loaded Command '${cmdName}'`);
        gkan.commands.set(cmdName, props);
    });
    console.log("_______________GKan Official Base Loading Finish______________________________");
});
// clear command


gkan.on('message', async message => {
    if (message.content.indexOf(prefix) !== 0) return;
    const args = message.content.slice(prefix.length).trim().split(/ +/g);
    const command = args.shift().toLowerCase();

    if (command === 'clear') {
        const number = args.join(" ")
        if (!number) return message.delete().catch(() => {});
        if (!message.member.hasPermission('MANAGE_MESSAGES'))
           return message.channel.send("**Δεν έχεις Permissions να κάνεις ``Clear Message``**");
        if (number) {
             message.channel.bulkDelete(number).catch(() => { message.delete().catch(() => {}); });
          }
    }
    
  
   //uptime

    if (command === 'tim') {
        let days = Math.floor(gkan.uptime / 86400000);
        let hours = Math.floor(gkan.uptime / 3600000) % 24;
        let minutes = Math.floor(gkan.uptime / 60000) % 60;
        let seconds = Math.floor(gkan.uptime / 1000) % 60;

        let uptimeE = new Discord.MessageEmbed()
            .setColor("RED")
            .setDescription(`**Uptime: \`${days}μ:${hours}ω:${minutes}λ:${seconds}δ\`**`)
            .setFooter(`Requested by: ${message.author.username}`, message.author.displayAvatarURL())
        message.channel.send(uptimeE)
        return;
    }

    //apps
    if (message.content === '!apps') {
        const embed = new Discord.MessageEmbed()
            
            .setTitle(`\`\`\`\ Αίτηση για εργασια.\`\`\` `)
            .setDescription('Οπως Εκαβ , Ελας και Staff')
            .setThumbnail("https://cdn.discordapp.com/attachments/976846119822819358/1014931311753969695/dragon-logo-62F627B731-seeklogo.com.png");
            

        const staff = new MessageButton()
            .setLabel('💼STAFF')
            .setStyle('url')
            .setDisabled(false)
            .setURL(config.applications.Staff);

        const police = new MessageButton()
        
            .setLabel('👮‍♂️ΕΛ.ΑΣ')
            .setStyle('url')
            .setDisabled(false)
            .setURL(config.applications.Astynomia);

        const ekab = new MessageButton()     
            .setLabel('👨‍⚕️Ε.Κ.Α.Β ')
            .setStyle('url')
            .setDisabled(false)
            .setURL(config.applications.Ekab);

        const p = new MessageButton()     
            .setLabel('🚉Πυροσβεστικό Σώμα')
            .setStyle('url')
            .setDisabled(false)
            .setURL(config.applications.p);

     
        const yes = new MessageActionRow().addComponents([police, ekab, staff, p ]);
        message.channel.send(embed);
        message.channel.send({ components: [yes] });
    }
    if (message.content === '!apps') {
 
        const eyp = new MessageButton()
            .setLabel('🔐ΕΥΠ')
            .setStyle('url')
            .setDisabled(false)
            .setURL(config.applications.eyp);

        const dyk = new MessageButton()
            .setLabel('✅Δικαιοσύνη')
            .setStyle('url')
            .setDisabled(false)
            .setURL(config.applications.dyk);

        const lyme = new MessageButton()     
            .setLabel('♟️Λιμενικό')
            .setStyle('url')
            .setDisabled(false)
            .setURL(config.applications.lyme);

        const dhm = new MessageButton()
            .setLabel('📢Δημαρχείο')
            .setStyle('url')
            .setDisabled(false)
            .setURL(config.applications.dhm);

        const da = new MessageButton()
            .setLabel('👮‍♂️Δημοτική Αστυνομία')
            .setStyle('url')
            .setDisabled(false)
            .setURL(config.applications.da);

       
            

     
        const yes = new MessageActionRow().addComponents([eyp, dyk, lyme, dhm, da ]);
        //message.channel.send(embed);
        message.channel.send({ components: [yes] });
    }

    //Notes Ac Gkaq
    // const eyp = new MessageButton()
        //     .setLabel('🔐ΕΥΠ')
        //     .setStyle('url')
        //     .setDisabled(false)
        //     .setURL(config.applications.eyp);

        // const dyk = new MessageButton()
        //     .setLabel('✅Δικαιοσύνη')
        //     .setStyle('url')
        //     .setDisabled(false)
        //     .setURL(config.applications.dyk);

        // const lyme = new MessageButton()     
        //     .setLabel('♟️Λιμενικό')
        //     .setStyle('url')
        //     .setDisabled(false)
        //     .setURL(config.applications.lyme);

        // const dhm = new MessageButton()
        //     .setLabel('📢Δημαρχείο')
        //     .setStyle('url')
        //     .setDisabled(false)
        //     .setURL(config.applications.dhm);

        // const da = new MessageButton()
        //     .setLabel('👮‍♂️Δημοτική Αστυνομία')
        //     .setStyle('url')
        //     .setDisabled(false)
        //     .setURL(config.applications.da);

        // const p = new MessageButton()     
        //     .setLabel('🚉Πυροσβεστικό Σώμα')
        //     .setStyle('url')
        //     .setDisabled(false)
        //     .setURL(config.applications.p);

        //eyp, dyk, lyme, dhm, da, p 

    if(command == 'say'){
        if(!message.member.hasPermission("ADMINISTRATOR")) return;
        message.delete().catch(() => {});
        const afsd = args.join(" ")
        if(!afsd) return;
        if(afsd){
          const embed = new Discord.MessageEmbed()
          .setDescription(afsd)
          .setColor("BLACK")
          message.channel.send(embed)
        }
    }
})


gkan.on('guildMemberAdd', async(member, message) => {
    if (!member.guild.me.hasPermission("ADMINISTRATOR")) return;
    if (member.user.bot) return;

    ////ALTS ACCOUNTS
    if (Date.now() - member.user.createdAt < 1000 * 60 * 60 * 24 * 1) {
        // Log Channel
        let channel = gkan.channels.cache.get(config.logs.alts);

        //Embed for log channel
        const embed = new Discord.MessageEmbed()
            .setColor('RED')
            .setAuthor('\u200b', gkan.user.displayAvatarURL())
            .setDescription(`♾️ **Alt**
        Χρήστης: ${member.user}
        Δημιουργήθηκε: ${moment(member.user.createdAt).format("MMM Do YYYY").toLocaleString()} @ **${moment(member.user.createdAt).format('hh:mm a')}**
        *Μαλλον Ειναι Alt User Check This Profile*`)
            .setFooter(`Αναγνωριστικό χρήστη: ${member.id}`)
            .setTimestamp();

        // Sends embed & kick msg with reactions
        if (channel) {
            channel.send(embed)
            msg = await channel.send('Θες να των κανεις Kick')
            msg.react('⛔').then(() => msg.react('📋'))

            // Checking for reactionss
            msg.awaitReactions((reaction, user) => (reaction.emoji.name == '⛔' || reaction.emoji.name == '📋') && (user.id !== gkan.user.id), { max: 1, time: 1, errors: ['time'] })
                .then(collected => {
                    const reaction = collected.first();
                    if (reaction.emoji.name === '⛔') {
                        member.kick()
                        return msg.edit('User kicked!')
                    } else if (reaction.emoji.name === '📋') {
                        return msg.edit('Ο user δεν θα γινει αυτοματα kick')
                    }
                })
                .catch(collected => {
                    channel.send('Αν το δεν κανεις κατι σε 10 λεπτα θα των κανω αυτοματα Kick.')
                })
                .catch(error => {
                    console.log(error)
                });
        }

    }

    var fake = (Date.now() - member.createdAt) / (1000 * 60 * 60 * 24 * 1) <= 3 ? true : false;




    member.guild.fetchInvites().then(gInvites => {
            const gi = (Invites.get(member.guild.id) || new Discord.Collection()).clone()
            var invite = gInvites.find(_i => gi.has(_i.code) && gi.get(_i.code).uses < _i.uses) || gi.find(_i => !gInvites.has(_i.code));
            Invites.set(member.guild.id, gInvites);


            if (!invite) {
                const channel = member.guild.channels.cache.get(config.logs.join)
                if (channel) {
                    const join = new Discord.MessageEmbed()
                        .setAuthor(member.user.username, member.user.displayAvatarURL(), "https://discord.com/users/" + member.user.id)
                        .setDescription(` \`\`\` Join \`\`\` \n**Register**: \`${moment(member.user.createdAt).format("MMM Do YYYY").toLocaleString()}\`\n**Join:** \`${moment(member.user.joinedAt).format("MMM Do YYYY").toLocaleString()}\`\n**Mention:** <@!${member.user.id}>\n**Από τον/ην:** `)
                        .setColor("BLACK")
                        .setTimestamp()
                    channel.send(embed).catch(() => {
                        message.channel.send(Discord.MessageEmbed()
                            .setTitle("`" + member.guild.name + "`")
                            .setDescription("**Δεν μπορώ να αναγνωρίσω πώς μπήκε ο " + member + "**")
                            .setColor("BLACK")
                            .setTimestamp()
                        );
                    });
                    return;
                }
                if (!channel) return;
            }
            if (invite.inviter) {
                db.set(`invites_${member.guild.id}.${member.id}.inviter`, invite.inviter.id);
                if (fake) {
                    total = db.add(`invites_${member.guild.id}.${invite.inviter.id}.total`, 1);
                    _fake = db.add(`invites_${member.guild.id}.${invite.inviter.id}.fake`, 1);
                } else {
                    total = db.add(`invites_${member.guild.id}.${invite.inviter.id}.total`, 1);
                    regular = db.add(`invites_${member.guild.id}.${invite.inviter.id}.regular`, 1);
                }

                const channel = member.guild.channels.cache.get(config.logs.join)
                if (channel) {
                    const embed = new Discord.MessageEmbed()
                        .setAuthor(member.user.username, member.user.displayAvatarURL(), "https://discord.com/users/" + member.user.id)
                        .setDescription(` \`\`\` Join \`\`\` \n**Register**: \`${moment(member.user.createdAt).format("MMM Do YYYY").toLocaleString()}\`\n**Join:** \`${moment(member.user.joinedAt).format("MMM Do YYYY").toLocaleString()}\`\n**Mention:** <@!${member.user.id}>\n**Από τον/ην:** <@!${invite.inviter.id}>`)
                        .setColor("BLACK")
                        .setTimestamp()
                    channel.send(embed).catch(() => {
                        message.channel.send(Discord.MessageEmbed()
                            .setTitle("`" + member.guild.name + "`")
                            .setDescription("**Δεν μπορώ να αναγνωρίσω πώς μπήκε ο " + member + "**")
                            .setColor("BLACK")
                            .setTimestamp()
                        );
                    });
                }
            db.set(`invites_${member.guild.id}.${member.id}.isfake`, fake);
 
         }
       }
      )
   })
gkan.on("guildMemberRemove", async(member) => {
        if (!member.guild.me.hasPermission("ADMINISTRATOR")) return;



        var total = 0,
            regular = 0,
            fakecount = 0,
            data = db.get(`invites_${member.guild.id}.${member.id}`);
        if (!data) {
            const embed = new Discord.MessageEmbed()
                .setAuthor(member.user.username, member.user.displayAvatarURL(), "https://discord.com/users/" + member.user.id)
                .setDescription(` \`\`\` Leave \`\`\` \n**Register**: \`${moment(member.user.createdAt).format("MMM Do YYYY").toLocaleString()}\`\n**Mention:** <@!${member.user.id}>\n**Join:** \`${moment(member.user.joinedAt).format("MMM Do YYYY").toLocaleString()}\``)
                .setColor("BLACK")
                .setTimestamp()
            gkan.channels.cache.get(config.logs.leave).send(embed);
            return;
        }

        if (data.isfake && data.inviter) {
            fakecount = db.subtract(`invites_${member.guild.id}.${data.inviter}.fake`, 1);
            total = db.subtract(`invites_${member.guild.id}.${data.inviter}.total`, 1);
        } else if (data.inviter) {
            regular = db.subtract(`invites_${member.guild.id}.${data.inviter}.regular`, 1);
            total = db.subtract(`invites_${member.guild.id}.${data.inviter}.total`, 1);
        }
        if (data.inviter) bonus = db.get(`invites_${member.guild.id}.${data.inviter}.bonus`) || 0;


        db.add(`invites_${member.guild.id}.${data.inviter}.leave`, 1);


        const channel = member.guild.channels.cache.get(config.logs.leave)
        if (channel) {
            const embed = new Discord.MessageEmbed()
                .setAuthor(member.user.username, member.user.displayAvatarURL(), "https://discord.com/users/" + member.user.id)
                .setDescription(` \`\`\` Leave \`\`\` \n**Register**: \`${moment(member.user.createdAt).format("MMM Do YYYY").toLocaleString()}\`\n**Mention:** <@!${member.user.id}>\n**Join:** \`${moment(member.user.joinedAt).format("MMM Do YYYY").toLocaleString()}\``)
                .setColor("BLACK")
                .setTimestamp()
            channel.send(embed);
        }
    })
    

//lock unlock channels
gkan.on('message', async message => {
    if (message.content.indexOf(prefix) !== 0) return;

    const args = message.content.slice(prefix.length).trim().split(/ +/g);
    const command = args.shift().toLowerCase();
    if (command == 'lock') {
        if (!message.member.hasPermission("MANAGE_CHANNELS")) return;
        const channel = message.mentions.channels.first() || message.guild.channels.cache.get(args.join(" ")) || message.guild.channels.cache.find(e => e.name === args.join(" ")) || message.channel
        message.delete().catch(() => {});

        if (channel.permissionsFor(message.guild.id).has('SEND_MESSAGES') === false) {
            const lockchannelError2 = new Discord.MessageEmbed()
                .setColor("RED")
                .setAuthor(gkan.user.username, gkan.user.displayAvatarURL(), `https://discord.com/users/${gkan.user.id}/`)
                .setDescription("**Το κανάλι έχει ήδη κλειδωθεί από την ομάδα διαχείρισης**")

            return message.channel.send(lockchannelError2)
        }
        channel.updateOverwrite(message.guild.id, { SEND_MESSAGES: false })

        const embed = new Discord.MessageEmbed()
            .setColor("GREEN")
            .setAuthor(gkan.user.username, gkan.user.displayAvatarURL(), `https://discord.com/users/${gkan.user.id}/`)
            .setDescription("**Το κανάλι κλειδώθηκε από την ομάδα διαχείρισης**")
        channel.send(embed)
    }
    if (command == 'unlock') {
        if (!message.member.hasPermission("MANAGE_CHANNELS")) return;
        const channel = message.mentions.channels.first() || message.guild.channels.cache.get(args.join(" ")) || message.guild.channels.cache.find(e => e.name === args.join(" ")) || message.channel
        message.delete().catch(() => {});

        if (channel.permissionsFor(message.guild.id).has('SEND_MESSAGES') === true) {
            const lockchannelError2 = new Discord.MessageEmbed()
                .setColor("RED")
                .setAuthor(gkan.user.username, gkan.user.displayAvatarURL(), `https://discord.com/users/${gkan.user.id}/`)
                .setDescription("**Το κανάλι έχει ήδη ξεκλειδωθεί από την ομάδα διαχείρισης**")

            return message.channel.send(lockchannelError2)
        }
        channel.updateOverwrite(message.guild.id, { SEND_MESSAGES: true })

        const embed = new Discord.MessageEmbed()
            .setColor("GREEN")
            .setAuthor(gkan.user.username, gkan.user.displayAvatarURL(), `https://discord.com/users/${gkan.user.id}/`)
            .setDescription("**Το κανάλι ξεκλειδώθηκε από την ομάδα διαχείρισης**")
        channel.send(embed)
    }
})


//----welcome 
gkan.on('guildMemberAdd', member => {
    member.send(`Καλος ήρθες ${member} στον Dragon Roleplay! Μπορεις να δεις καναλια οπως : Spoils Announcement Rules και αλλα πολλα. Καλο Roleplay https://discord.gg/FndgaD2hFY `)
});





//----------suggestions

gkan.on('message', async message => {
    if (message.content.indexOf(prefix) == 0) return;

    const args = message.content.slice(prefix.length).trim().split(/ +/g);
    const command = args.shift().toLowerCase();

    if (message.channel.id === config.reports['suggestions']) {
        if (message.author.bot) return;
        message.delete().catch(() => {});
        const embed = new Discord.MessageEmbed()
            .setTimestamp()
            .setFooter("Suggestions")
            .setDescription(message.content)
            .addFields({ name: "\u200B", value: "**Mention:** <@!" + message.author.id + ">" })
            .setColor("GREEN")
            .setAuthor(message.author.tag, message.author.displayAvatarURL(), `https://discord.com/users/${message.author.id}`)
        gkan.channels.cache.get(config.reports['suggestions']).send(embed)
        gkan.on('message', async(message) => {
            if (message.channel.id === config.reports['suggestions']) {
                message.react('✅')
                message.react('❎');
            }
        })
    }
}, )

gkan.on('message', async message => {
    if (message.content.indexOf(prefix) == 0) return;

    const args = message.content.slice(prefix.length).trim().split(/ +/g);
    const command = args.shift().toLowerCase();

    if (message.channel.id === config.rules['polls']) {
        if (message.author.bot) return;
        message.delete().catch(() => {});
        const embed = new Discord.MessageEmbed()
            .setTimestamp()
            .setFooter("New Poll")
            .setDescription(message.content)
            .setColor("BLUE   ")
        gkan.channels.cache.get(config.rules['polls']).send(embed)
        gkan.on('message', async(message) => {
            if (message.channel.id === config.rules['polls']) {
                message.react('✅')
                message.react('❎');
            }
        })
    }
}, )


//job offers
gkan.on('message', async message => {
    if (message.content.indexOf(prefix) == 0) return;

    const args = message.content.slice(prefix.length).trim().split(/ +/g);
    const command = args.shift().toLowerCase();

    if (message.channel.id === config.rules['job']) {
        if (message.author.bot) return;
        message.delete().catch(() => {});
        const embed = new Discord.MessageEmbed()
            .setTimestamp()
            .setFooter("Job Offer")
            .setDescription(message.content)
            .setColor("RED")
        gkan.channels.cache.get(config.rules['job']).send(embed)

    }
})

//news paper
gkan.on('message', async message => {
    if (message.content.indexOf(prefix) == 0) return;

    const args = message.content.slice(prefix.length).trim().split(/ +/g);
    const command = args.shift().toLowerCase();

    if (message.channel.id === config.rules['news']) {
        if (message.author.bot) return;
        message.delete().catch(() => {});
        const embed = new Discord.MessageEmbed()
            .setTimestamp()
            .setFooter("News Paper")
            .setDescription(message.content)
            .setColor("BLACK")
        gkan.channels.cache.get(config.rules['news']).send(embed)

    }
})

//Donate packs
gkan.on('message', async message => {
        if (message.content.indexOf(prefix) == 0) return;

        const args = message.content.slice(prefix.length).trim().split(/ +/g);
        const command = args.shift().toLowerCase();

        if (message.channel.id === config.donate['packs']) {
            if (message.author.bot) return;
            message.delete().catch(() => {});
            const embed = new Discord.MessageEmbed()
                .setTimestamp()
                .setTitle("Donate Packs")
                .setFooter("Donate Packs")
                .setDescription(message.content)
                .setColor("GREEN")
            gkan.channels.cache.get(config.donate['packs']).send(embed)

        }
    })
    //donate jobs
gkan.on('message', async message => {
    if (message.content.indexOf(prefix) == 0) return;

    const args = message.content.slice(prefix.length).trim().split(/ +/g);
    const command = args.shift().toLowerCase();

    if (message.channel.id === config.donate['job']) {
        if (message.author.bot) return;
        message.delete().catch(() => {});
        const embed = new Discord.MessageEmbed()
            .setTimestamp()
            .setTitle("Donate Jobs")
            .setFooter("Donate Jobs")
            .setDescription(message.content)
            .setColor("GREEN")
        gkan.channels.cache.get(config.donate['job']).send(embed)

    }
})


//---------------Rules

//General
gkan.on('message', async message => {
    if (message.content.indexOf(prefix) == 0) return;

    const args = message.content.slice(prefix.length).trim().split(/ +/g);
    const command = args.shift().toLowerCase();

    if (message.channel.id === config.rules['general']) {
        if (message.author.bot) return;
        message.delete().catch(() => {});
        const embed = new Discord.MessageEmbed()
            .setTimestamp()
            .setTitle("General Rules")
            .setFooter("General Rules")
            .setDescription(message.content)
            .setColor("BLACK")
        gkan.channels.cache.get(config.rules['general']).send(embed)

    }


//criminal
    if (message.channel.id === config.rules['rob']) {
        if (message.author.bot) return;
        message.delete().catch(() => {});
        const embed = new Discord.MessageEmbed()
            .setTimestamp()
            .setTitle("Robbery Rules")
            .setFooter("Robbery Rules")
            .setDescription(message.content)
            .setColor("BLACK")
        gkan.channels.cache.get(config.rules['rob']).send(embed)

    }


//robbery 

    if (message.channel.id === config.rules['criminal']) {
        if (message.author.bot) return;
        message.delete().catch(() => {});
        const embed = new Discord.MessageEmbed()
            .setTimestamp()
            .setTitle("Crimimal Rules")
            .setFooter("Crimimal Rules")
            .setDescription(message.content)
            .setColor("BLACK")
        gkan.channels.cache.get(config.rules['criminal']).send(embed)

    }

//police


    if (message.channel.id === config.rules['police']) {
        if (message.author.bot) return;
        message.delete().catch(() => {});
        const embed = new Discord.MessageEmbed()
            .setTimestamp()
            .setTitle("Police Rules")
            .setFooter("Police Rules")
            .setDescription(message.content)
            .setColor("BLACK")
        gkan.channels.cache.get(config.rules['police']).send(embed)

    }


//ekab
  if (message.channel.id === config.rules['ekab']) {
        if (message.author.bot) return;
        message.delete().catch(() => {});
        const embed = new Discord.MessageEmbed()
            .setTimestamp()
            .setTitle("Ambulance Rules")
            .setFooter("Ambulance Rules")
            .setDescription(message.content)
            .setColor("RED")
        gkan.channels.cache.get(config.rules['ekab']).send(embed)

    }


//zones

    if (message.channel.id === config.rules['zones']) {
        if (message.author.bot) return;
        message.delete().catch(() => {});
        const embed = new Discord.MessageEmbed()
            .setTimestamp()
            .setTitle("Zone Rules")
            .setFooter("Zone Rules")
            .setDescription(message.content)
            .setColor("GREEN")
        gkan.channels.cache.get(config.rules['zones']).send(embed)

    }


//announce
    if (message.channel.id === config.reports['ann']) {
        if (message.author.bot) return;
        message.delete().catch(() => {});
        const embed = new Discord.MessageEmbed()
            .setTimestamp()
            .setTitle("New Announce")
            .setFooter("Announce")
            .setDescription(message.content)
            .setColor("GREEN")
        gkan.channels.cache.get(config.reports['ann']).send(embed)

    }


//streamers


    if (message.channel.id === config.rules['streamer']) {
        if (message.author.bot) return;
        message.delete().catch(() => {});
        const embed = new Discord.MessageEmbed()
            .setTimestamp()
            .setTitle("Streamer Rules")
            .setFooter("Streamer Rules")
            .setDescription(message.content)
            .setColor("BLUE")
        gkan.channels.cache.get(config.rules['streamer']).send(embed)

    }
})



//bug system 

gkan.on('message', async message => {
    if (message.content.indexOf(prefix) == 0) return;

    const args = message.content.slice(prefix.length).trim().split(/ +/g);
    const command = args.shift().toLowerCase();

    if (message.channel.id === config.reports.bug) {
        if (message.author.bot) return;
        message.delete().catch(() => {});
        message.channel.send(`**Το bug σου παραχωρήθηκε στους ανωτέρους <@!${message.author.id}>**`).then(e => e.delete({ timeout: 10000 }).catch(() => {}))
        const embed = new Discord.MessageEmbed()
            .setDescription(message.content)
            .addFields({ name: "\u200B", value: "**Mention:** <@!" + message.author.id + ">\n**Κανάλι:** <#" + message.channel.id + ">" })
            .setColor("RED")
            .setAuthor(message.author.tag, message.author.displayAvatarURL(), `https://discord.com/users/${message.author.id}`)
        gkan.channels.cache.get(config.reports['buglogs']).send(embed)
    }


//ban apeal

    if (message.channel.id === config.reports['banapp']) {
        if (message.author.bot) return;
        message.delete().catch(() => {});
        message.channel.send(`**Το Ban Appeal σου παραχωρήθηκε στους ανωτέρους <@!${message.author.id}>**`).then(e => e.delete({ timeout: 10000 }).catch(() => {}))
        const embed = new Discord.MessageEmbed()
            .setDescription(message.content)
            .addFields({ name: "\u200B", value: "**Mention:** <@!" + message.author.id + ">\n**Κανάλι:** <#" + message.channel.id + ">" })
            .setColor("RED")
            .setAuthor(message.author.tag, message.author.displayAvatarURL(), `https://discord.com/users/${message.author.id}`)
        gkan.channels.cache.get(config.reports['banapplog']).send(embed)
    }


//staff report 


    if (message.channel.id === config.reports['staffrep']) {
        if (message.author.bot) return;
        message.delete().catch(() => {});
        message.channel.send(`**Το Staff Report σου παραχωρήθηκε στους ανωτέρους <@!${message.author.id}>**`).then(e => e.delete({ timeout: 10000 }).catch(() => {}))
        const embed = new Discord.MessageEmbed()
            .setDescription(message.content)
            .addFields({ name: "\u200B", value: "**Mention:** <@!" + message.author.id + ">\n**Κανάλι:** <#" + message.channel.id + ">" })
            .setColor("RED")
            .setAuthor(message.author.tag, message.author.displayAvatarURL(), `https://discord.com/users/${message.author.id}`)
        gkan.channels.cache.get(config.reports['staffreplog']).send(embed)
    }


//civilian report


    if (message.channel.id === config.reports['civrep']) {
        if (message.author.bot) return;
        message.delete().catch(() => {});
        message.channel.send(`**Το Civilian Report σου παραχωρήθηκε στους ανωτέρους <@!${message.author.id}>**`).then(e => e.delete({ timeout: 10000 }).catch(() => {}))
        const embed = new Discord.MessageEmbed()
            .setDescription(message.content)
            .addFields({ name: "\u200B", value: "**Mention:** <@!" + message.author.id + ">\n**Κανάλι:** <#" + message.channel.id + ">" })
            .setColor("RED")
            .setAuthor(message.author.tag, message.author.displayAvatarURL(), `https://discord.com/users/${message.author.id}`)
        gkan.channels.cache.get(config.reports['civreplog']).send(embed)
    }
})


//verify

gkan.on('message', async(message) => {
    const embed = new Discord.MessageEmbed()
        .setAuthor("Dragon Roleplay", "https://cdn.discordapp.com/attachments/976846119822819358/1014931311753969695/dragon-logo-62F627B731-seeklogo.com.png")
        .setTitle("Dragon Verify System")
        .setDescription('**Παρακαλώ πατήστε το κουμπί verify για να πάρετε το role Civilian**')
        .setColor("#2F3136")
    const verify = new MessageButton()
        .setID('verify')
        .setStyle('gray')
        .setLabel("verify")
        .setEmoji('995965921686458388')
    if (message.member.permissions.has("ADMINISTRATOR")) {
        if (message.content === '!verid') {
            message.channel.send(embed, verify)
        }
    }
    })
    gkan.on('clickButton', async(button) => {
          if (button.id == 'verify') {
              const role = button.guild.roles.cache.get(config.verify.verifyrole)
            const role2 = button.guild.roles.cache.get(config.verify.unverify)
              const member = button.clicker.member
            await member.roles.add(role)
            await member.roles.remove(role2)
            member.send(`Ευχαριστούμε που εκανες verify ${member}. Dragon RolePlay™️ `)
            button.reply.send('Κοιτα τα μηνύματα σου.', true)
        }
})



//inv comm

gkan.on('message', async message => {
    if (message.content.indexOf(prefix) !== 0) return;
    const args = message.content.slice(prefix.length).trim().split(/ +/g);
    const command = args.shift().toLowerCase();

    if (command === 'inv' || command === 'invites') {
        var victim = message.mentions.users.first() || gkan.users.cache.get(args[0]) || message.author;
        var data = db.get(`invites_${message.guild.id}.${victim.id}`) || { total: 0, fake: 0, inviter: null, regular: 0, leave: 0 };
        var embed = new Discord.MessageEmbed()
            .setAuthor(victim.tag, victim.displayAvatarURL(), "https://discord.com/users/" + victim.id)
            .setDescription(`**Βρέθηκαν \`${(data.total || 0)}\` προσκλήσεις για τον <@!${victim.id}>**`)
            .setColor("BLACK");
         message.channel.send(embed);
       }

    if(command === 'leaderboard' || command === 'lb'){

  
        var data = db.get(`invites_${message.guild.id}`) || {};
      
      
      
      const guilds = Object.keys(data).map(_data => {
        return {
            Id: _data,
            Value: (data[_data].total || 0)
        };
      }).sort((x, y) => y.Value - x.Value);
      
      const generateEmbed = start => {
        const current = guilds.slice(start, start + 10)
      
        const tes = start + 10
        const embed = new Discord.MessageEmbed()
          .setFooter(`${Math.floor(tes / 10)}/${Math.floor(guilds.length / 10)}`)
          .setColor("BLACK")
          .setAuthor(message.guild.name , message.guild.iconURL())
          db.set(`leaderboardtset_${message.guild.id}`, start)
          let content = "";
      
        current.forEach(g => {
      
          const i = db.add(`leaderboardtset_${message.guild.id}`, 1)
           content += `\`${i}.\` <@!${g.Id}>  \`${g.Value}\`\n`
      }
      )
      embed.setDescription(content)
        return embed
      }
      
      const author = message.author
      
      message.channel.send(generateEmbed(0)).then(message => {
        if (guilds.length <= 10) return;
        message.react("➡️")
          
          const collector = message.createReactionCollector(
          (reaction, user) => ["⬅️", "➡️"].includes(reaction.emoji.id) && user.id === author.id,
          {time: 600000}
        )
      
       let currentIndex = db.get(`leaderboardtset_${message.guild.id}`)
        collector.on('collect', reaction => {
          message.reactions.removeAll().then(async () => {
            if(currentIndex < 10) return message.edit(generateEmbed(currentIndex));
            reaction.emoji.id === "➡️" ? currentIndex -= 10 : currentIndex += 10
            message.edit(generateEmbed(currentIndex - 10))
            if(currentIndex > 10) await message.react("➡️")
            db.set(`leaderboardtset_${message.guild.id}`, currentIndex - 10)
            if (currentIndex < guilds.length) message.react("➡️")
        }
       )}
     )}
   )}
}) 



gkan.on("ready", () => {
    setInterval(() => {
        gkan.guilds.cache.get(config.ServerCount["GUILD-ID"]).channels.cache.get(config.ServerCount.MEMBERS).setName(`👥Members: ${gkan.guilds.cache.get(config.ServerCount["GUILD-ID"]).memberCount}`)
        gkan.guilds.cache.get(config.ServerCount["GUILD-ID"]).channels.cache.get(config.ServerCount.BOOSTS).setName(`💥Boosts: ${gkan.guilds.cache.get(config.ServerCount["GUILD-ID"]).premiumSubscriptionCount}`)
    }, 6 * 3600000);
    //LIVE STATUS
})





//------------Activity Leadboard

////// Duty System \\\\\\
gkan.on("message", async message => {
    if (message.channel.type === "dm") return console.log(message.content + "\n" + message.author.username)
    if (!message.guild) return;
    if (!message.content.startsWith(prefix) || message.author.bot) return;
    const args = message.content.slice(prefix.length).trim().split(/ +/);
    const command = args.shift().toLowerCase();
    if (command === 'gkanact') {
        const embe = new Discord.MessageEmbed({
            "author": {
                "name": "Dragon Roleplay",
                "icon_url": "https://cdn.discordapp.com/attachments/976846119822819358/1014931311753969695/dragon-logo-62F627B731-seeklogo.com.png"
            },
            "thumbnail": {
                "url": "https://cdn.discordapp.com/attachments/976846119822819358/1014931311753969695/dragon-logo-62F627B731-seeklogo.com.png"
            },
            "description": "**🟢 Εντός υπηρεσίας\n\n 🔴 Εκτός υπηρεσιας\n\n 📋 Για να δείτε ποιος έχει τις περισσότερες ώρες**",
            "color": "#2F3136",
        })

        const online = new MessageButton()
            .setEmoji("983837368807227442")
            .setStyle("gray")
            .setID("online")
        const offline = new MessageButton()
            .setEmoji("983837365476945920")
            .setStyle("gray")
            .setID("offline")
        const lb = new MessageButton()
            .setEmoji('📋')
            .setID('LEADERBOARD')
            .setStyle('gray')

        const buttons = new MessageActionRow()
            .addComponent(online)
            .addComponent(offline)
            .addComponent(lb)

        message.channel.send({ embed: embe, component: buttons })


    }
})

gkan.on('clickButton', async(button, message) => {
    const ticketChannel = button.message.channel

    if (button.id === `ticket_reopen_${ticketChannel.id}`) {
        const chanel = db.get(button.message.channel.id)
        if (!chanel) return button.reply.defer().catch(() => {}), button.message.channel.delete().catch(() => {});
        button.reply.defer();
        await ticketChannel.updateOverwrite(gkan.users.cache.get(chanel).id, { VIEW_CHANNEL: true })
        button.message.channel.send(new Discord.MessageEmbed({
            "color": "#ffb600",
            "description": "Ticket Opened by <@" + button.clicker.user.id + ">"
        }))
        const logs = button.message.guild.channels.cache.get(config.act.logs)
        if (logs) {
            logs.send(new Discord.MessageEmbed({
                "author": {
                    "name": gkan.users.cache.get(chanel).tag,
                    "url": "https://discord.com/users/" + gkan.users.cache.get(chanel).id,
                    "icon_url": gkan.users.cache.get(chanel).displayAvatarURL()
                },
                "color": "#ffb600",
                "description": "**Κανάλι: `" + button.message.channel.name + "` • `" + button.message.channel.id + "`\nMention: <@" + gkan.users.cache.get(chanel).id + ">\nΑπό τον/ην: <@" + button.clicker.user.id + ">**"
            }))
            await button.message.channel.setName(`${button.message.channel.name.slice(0, 2)}ticket-${button.message.channel.name.split('-')[1]}`) //to username tou ticket
        }

        button.message.delete().catch(() => {});
    }
    if (button.id === `ticket_delete_${ticketChannel.id}`) {
        button.message.channel.delete().catch(() => {});
    }
    if (button.id === 'online') {
        const role = button.guild.roles.cache.get(config.act.onduty)
        const member = button.clicker.member
        await member.roles.add(role)
        const status = db.get(`time_${button.guild.id}_${button.clicker.user.id}`)
        if (status) return button.reply.send({
            embed: new Discord.MessageEmbed({
                "description": "**🟢 Η κατάσταση σου είναι ήδη ενεργή 🟢**",
                "color": "#ffb600",
                "author": {
                    "name": button.clicker.user.username,
                    "url": "https://discord.com/users/" + button.clicker.user.id,
                    "icon_url": button.clicker.user.displayAvatarURL()
                }
            }),
            ephemeral: true
        })
        if (!status) {
            button.reply.send({
                embed: new Discord.MessageEmbed({
                    "description": "**🟢 Η κατάσταση σου είναι ενεργή 🟢**",
                    "color": "#ffb600",
                    "author": {
                        "name": button.clicker.user.username,
                        "url": "https://discord.com/users/" + button.clicker.user.id,
                        "icon_url": button.clicker.user.displayAvatarURL()
                    }
                }),
                ephemeral: true
            })

            db.set(`time_${button.guild.id}_${button.clicker.user.id}`, new Date().getTime())
        }
    }
    if (button.id === 'offline') {
        const role = button.guild.roles.cache.get(config.act.onduty)
        const member = button.clicker.member
        await member.roles.remove(role)
        const status = db.get(`time_${button.guild.id}_${button.clicker.user.id}`)
        if (!status) return button.reply.send({
            embed: new Discord.MessageEmbed({
                "description": "**🔴 Η κατάσταση σου είναι ήδη ανενεργή 🔴**",
                "color": "#ffb600",
                "author": {
                    "name": button.clicker.user.username,
                    "url": "https://discord.com/users/" + button.clicker.user.id,
                    "icon_url": button.clicker.user.displayAvatarURL()
                }
            }),
            ephemeral: true
        })
        if (status) {
            const fasdf = new MessageButton()
                .setID(`LEADERBOARD`)
                .setEmoji("⚡")
                .setStyle("blurple");
            button.reply.send({
                embed: new Discord.MessageEmbed({
                    "description": "**🔴 Η κατάσταση σου είναι ανενεργή 🔴**",
                    "color": "#ffb600",
                    "author": {
                        "name": button.clicker.user.username,
                        "url": "https://discord.com/users/" + button.clicker.user.id,
                        "icon_url": button.clicker.user.displayAvatarURL()
                    },
                }),
                ephemeral: true
            })

            const df = new Date().getTime() - status;

            let hours = Math.floor(df / 3600000) % 24;
            let minutes = Math.floor(df / 60000) % 60;
            let seconds = Math.floor(df / 1000) % 60;
            if (hours) hours = `${hours} ώρες`;
            if (minutes) minutes = `${minutes} λεπτά:`;
            if (seconds) seconds = `${seconds} δέφτερα`;
            if (!hours) hours = "";
            if (!minutes) minutes = "";
            if (!seconds) seconds = "";
            button.guild.channels.cache.get(config.act.logs).send({ embed: new Discord.MessageEmbed().setAuthor(button.clicker.user.username, button.clicker.user.displayAvatarURL(), `https://discord.com/users/${button.clicker.user.id}`).setColor("#2F3136").setDescription(`**${gkan.users.cache.get(button.clicker.user.id)} έχει \`${hours}${minutes}${seconds}\` στο activity**`) })
            db.add(`hours_${button.guild.id}_${button.clicker.user.id}`, df)
            db.delete(`time_${button.guild.id}_${button.clicker.user.id}`)

        }
    }
    if (button.id === 'LEADERBOARD') {
        let arena = db.all().filter(data => data.ID.startsWith(`hours_${button.guild.id}`)).sort((a, b) => b.data - a.data)
        if (!arena) message.delete().catch(() => {});;
        if (arena !== null) {

            let content = "";

            for (let i = 0; i < arena.length; i++) {
                let user = gkan.users.cache.get(arena[i].ID.split('_')[2])
                let hours = Math.floor(arena[i].data / 3600000) % 24;
                let minutes = Math.floor(arena[i].data / 60000) % 60;
                let seconds = Math.floor(arena[i].data / 1000) % 60;
                if (hours) hours = `${hours}ω:`;
                if (minutes) minutes = `${minutes}λ:`;
                if (seconds) seconds = `${seconds}δ`;
                if (!hours) hours = ``;
                if (!minutes) minutes = ``;
                if (!seconds) seconds = ``;

                content += `**\`${i + 1}\`. ${user} έχει \`${hours}${minutes}${seconds}\`**\n`
            }


            const embed = new Discord.MessageEmbed()
                .setAuthor(`Activity Leadboard`, `https://cdn.discordapp.com/attachments/976846119822819358/1014931311753969695/dragon-logo-62F627B731-seeklogo.com.png`)
                .setDescription(content)



            .setColor("#ffb600")

            button.reply.send({ embed: embed, ephemeral: true })
        }
    }
})




//----------------------tickets--------------------
gkan.on('message', async message => {
        if (message.content.indexOf(prefix) !== 0) return;

        const args = message.content.slice(prefix.length).trim().split(/ +/g);
        const command = args.shift().toLowerCase();

        if (message.content.startsWith("!tvk")) {

            const embed = new Discord.MessageEmbed()
                .setAuthor(message.guild.name, message.guild.iconURL({ dynamic: true }))
                .setThumbnail(message.guild.iconURL({ dynamic: true }))
                .setDescription('**```Για την καλύτερη εξυπηρέτησή σας, επιλέξτε το είδος του Ticket με βάση το πρόβλημα που έχετε```**')
                .setColor('#2ecc70')
            const Option1 = new MessageMenuOption()
                .setLabel("Support")
                .setDescription("Ζητήστε βοήθεια.")
                .setEmoji('📢')
                .setValue('support')

            const Option2 = new MessageMenuOption()
                .setLabel("Buy")
                .setDescription('Donate.')
                .setEmoji('💸')
                .setValue('buy')

            const Option3 = new MessageMenuOption()
                .setLabel("Ban Appeal")
                .setDescription('Αίτημα για Ban Appeal.')
                .setEmoji('🔞')
                .setValue('irewards')

            const Option4 = new MessageMenuOption()
                .setLabel("Staff Report")
                .setDescription('Αίτημα για Staff Report.')
                .setEmoji('🔍')
                .setValue('partner')

            const Option5 = new MessageMenuOption()
                .setLabel("Other")
                .setDescription('Άλλο.')
                .setEmoji('❓')
                .setValue('other')


            const selection = new MessageMenu()
                .setID('Selection')
                .setMaxValues(1)
                .setMaxValues(1)
                .setPlaceholder('Επέλεξε το θέμα του ticket')
                .addOption(Option1)
                .addOption(Option2)
                .addOption(Option3)
                .addOption(Option4)
                .addOption(Option5)

            message.channel.send(embed, selection)

        }
    })
    //setup ticket 
gkan.on('clickMenu', async(menu, message) => {

    if (menu.values[0] === 'support') {
        await menu.reply.defer()
        menu.message.channel.messages.fetch(config.ticket['message id']).then(msg => {
            const embed = new Discord.MessageEmbed()
                .setAuthor(menu.message.guild.name, menu.message.guild.iconURL({ dynamic: true }))
                .setThumbnail(menu.message.guild.iconURL({ dynamic: true }))
                .setDescription('**```Για την καλύτερη εξυπηρέτησή σας, επιλέξτε το είδος του Ticket με βάση το πρόβλημα που έχετε```**')
                .setColor('#2ecc70')
            const Option1 = new MessageMenuOption()
                .setLabel("Support")
                .setDescription("Ζητήστε βοήθεια.")
                .setEmoji('📢')
                .setValue('support')

            const Option2 = new MessageMenuOption()
                .setLabel("Buy")
                .setDescription('Donate.')
                .setEmoji('💸')
                .setValue('buy')

            const Option3 = new MessageMenuOption()
                .setLabel("Ban Appeal")
                .setDescription('Αίτημα για Ban Appeal.')
                .setEmoji('🔞')
                .setValue('irewards')

            const Option4 = new MessageMenuOption()
                .setLabel("Staff Report")
                .setDescription('Αίτημα για Staff Report.')
                .setEmoji('🔍')
                .setValue('staffrep')

            const Option5 = new MessageMenuOption()
                .setLabel("Other")
                .setDescription('Άλλο.')
                .setEmoji('❓')
                .setValue('other')


            const selection = new MessageMenu()
                .setID('Selection')
                .setMaxValues(1)
                .setMaxValues(1)
                .setPlaceholder('Επέλεξε το θέμα του ticket')
                .addOption(Option1)
                .addOption(Option2)
                .addOption(Option3)
                .addOption(Option4)
                .addOption(Option5)

            msg.edit(embed, selection).then(() => {
                console.log('Το Ticket άλλαξε')
            })
        })


        const alreadyticket = new Discord.MessageEmbed()
            .setAuthor(menu.guild.name, menu.guild.iconURL({ dynamic: true }))
            .setDescription('```Έχεις ήδη ένα ticket ανοιχτό περίμενε μέχρι να σε εξυπηρετήσουν!```')
            .setColor('#2ecc70')

        const ch = menu.message.guild.channels.cache.find(ch => ch.name === `📢ticket-${menu.clicker.user.username.toLowerCase().replace(/ +/g,'-').replace(/!/g, '')}`)
        if (ch) return menu.clicker.user.send(alreadyticket).then(menu.message.guild.channels.cache.find(ch => ch.id === config.ticket.logs).send(new Discord.MessageEmbed()
            .setDescription(`**Ο <@${menu.clicker.user.id}> προσπάθησε να ανοίξει ένα δεύτερο \`📢 Support\` ticket.**`)
            .setTimestamp()
            .setColor('#2ecc70'))).catch(channel => {
            console.log(channel.message)
        })



        const data = await db.get(`tickets_${menu.message.guild.id}`)
        if (data == null) await db.set(`tickets_${menu.message.guild.id}`, { TicketNumber: 1 })
        const supportchannel = await menu.guild.channels.create(`📢ticket-${'0'.repeat(4 - data.TicketNumber.toString().length)}${data.TicketNumber}`, {

            type: "text",
            parent: menu.message.channel.parentID,


            permissionOverwrites: [{
                id: menu.clicker.id,
                allow: ['SEND_MESSAGES', 'VIEW_CHANNEL']
            }, {
                id: gkan.user.id,
                allow: ['SEND_MESSAGES', 'VIEW_CHANNEL']
            }, {
                id: config.ticket.SRid,
                allow: ['SEND_MESSAGES', "VIEW_CHANNEL"]
            }, {
                id: config.ticket.ERid,
                deny: ['SEND_MESSAGES', 'VIEW_CHANNEL']
            }, ],

        })


        const logs = menu.message.guild.channels.cache.get(config.ticket.logs)
        if (logs) {
            const embed = new Discord.MessageEmbed({
                "author": {
                    "name": menu.clicker.user.tag,
                    "url": "https://discord.com/users/" + menu.clicker.user.id + "",
                    "icon_url": menu.clicker.user.displayAvatarURL()
                },
                "color": 3775833,
                "description": "**Κανάλι: [`" + supportchannel.name + "`](https://canary.discord.com/channels/" + menu.message.guild.id + "/" + supportchannel.id + ") • `" + supportchannel.id + "`\nMention: <@" + menu.clicker.user.id + ">**"
            })
            logs.send(embed)
        }
        await db.set(`${supportchannel.id}`, menu.clicker.user.id)
        await db.set(`tickets_${menu.message.guild.id}`, { TicketNumber: data.TicketNumber + 1 })

        const mhnyma = new Discord.MessageEmbed()

        .setDescription(` Γεία σας <@${menu.clicker.user.id}> ,\n\n**Παρακαλω περιμενετε το staff team θα σας εξυπηρετησει συντομα!!Αν θελετε να κλεισετε το ticket αντιδραστε με 🔒**`)
            .setColor('#2ecc70')
        const close1 = new MessageButton()
            .setStyle("green")
            .setLabel('🔒')
            .setID("close")
        const buttonarray = [close1]
        supportchannel.send({ embed: mhnyma, buttons: buttonarray })

    }
    if (menu.values[0] === 'buy') {
        await menu.reply.defer()
        menu.message.channel.messages.fetch(config.ticket['message id']).then(msg => {

            const embed = new Discord.MessageEmbed()
                .setAuthor(menu.message.guild.name, menu.message.guild.iconURL({ dynamic: true }))
                .setThumbnail(menu.message.guild.iconURL({ dynamic: true }))
                .setDescription('**```Για την καλύτερη εξυπηρέτησή σας, επιλέξτε το είδος του Ticket με βάση το πρόβλημα που έχετε```**')
                .setColor('#2ecc70')
            const Option1 = new MessageMenuOption()
                .setLabel("Support")
                .setDescription("Ζητήστε βοήθεια.")
                .setEmoji('📢')
                .setValue('support')

            const Option2 = new MessageMenuOption()
                .setLabel("Buy")
                .setDescription('Donate.')
                .setEmoji('💸')
                .setValue('buy')

            const Option3 = new MessageMenuOption()
                .setLabel("Ban Appeal")
                .setDescription('Αίτημα για Ban Appeal.')
                .setEmoji('🔞')
                .setValue('irewards')

            const Option4 = new MessageMenuOption()
                .setLabel("Staff Report")
                .setDescription('Αίτημα για Staff Report.')
                .setEmoji('🔍')
                .setValue('staffrep')

            const Option5 = new MessageMenuOption()
                .setLabel("Other")
                .setDescription('Άλλο.')
                .setEmoji('❓')
                .setValue('other')


            const selection = new MessageMenu()
                .setID('Selection')
                .setMaxValues(1)
                .setMaxValues(1)
                .setPlaceholder('Επέλεξε το θέμα του ticket')
                .addOption(Option1)
                .addOption(Option2)
                .addOption(Option3)
                .addOption(Option4)
                .addOption(Option5)

            msg.edit(embed, selection).then(() => {
                console.log('Το Ticket άλλαξε')
            })
        })


        const alreadyticket = new Discord.MessageEmbed()
            .setAuthor(menu.guild.name, menu.guild.iconURL({ dynamic: true }))
            .setDescription('```Έχεις ήδη ένα ticket ανοιχτό περίμενε μέχρι να σε εξυπηρετήσουν!```')
            .setColor('#2ecc70')

        const ch = menu.message.guild.channels.cache.find(ch => ch.name === `💸ticket-${menu.clicker.user.username.toLowerCase().replace(/ +/g,'-').replace(/!/g, '')}`)
        if (ch) return menu.clicker.user.send(alreadyticket).then(menu.message.guild.channels.cache.find(ch => ch.id === config.ticket.logs).send(new Discord.MessageEmbed()
            .setDescription(`**Ο <@${menu.clicker.user.id}> προσπάθησε να ανοίξει ένα δεύτερο \`💸 Buy\` ticket.**`)
            .setTimestamp()
            .setColor('#2ecc70'))).catch(channel => {
            console.log(channel.message)
        })



        const data = await db.get(`tickets_${menu.message.guild.id}`)
        if (data == null) await db.set(`tickets_${menu.message.guild.id}`, { TicketNumber: 1 })
        const supportchannel = await menu.guild.channels.create(`💸ticket-${'0'.repeat(4 - data.TicketNumber.toString().length)}${data.TicketNumber}`, {

            type: "text",
            parent: menu.message.channel.parentID,

            permissionOverwrites: [{
                id: menu.clicker.id,
                allow: ['SEND_MESSAGES', 'VIEW_CHANNEL']
            }, {
                id: gkan.user.id,
                allow: ['SEND_MESSAGES', 'VIEW_CHANNEL']
            }, {
                id: config.ticket.SRid,
                allow: ['SEND_MESSAGES', "VIEW_CHANNEL"]
            }, {
                id: config.ticket.ERid,
                deny: ['SEND_MESSAGES', 'VIEW_CHANNEL']
            }, ],
        })

        const logs = menu.message.guild.channels.cache.get(config.ticket.logs)
        if (logs) {
            const embed = new Discord.MessageEmbed({
                "author": {
                    "name": menu.clicker.user.tag,
                    "url": "https://discord.com/users/" + menu.clicker.user.id + "",
                    "icon_url": menu.clicker.user.displayAvatarURL()
                },
                "color": 3775833,
                "description": "**Κανάλι: [`" + supportchannel.name + "`](https://canary.discord.com/channels/" + menu.message.guild.id + "/" + supportchannel.id + ") • `" + supportchannel.id + "`\nMention: <@" + menu.clicker.user.id + ">**"
            })
            logs.send(embed)
        }
        await db.set(`${supportchannel.id}`, menu.clicker.user.id)
        await db.set(`tickets_${menu.message.guild.id}`, { TicketNumber: data.TicketNumber + 1 })

        const mhnyma = new Discord.MessageEmbed()

        .setDescription(` Γεία σας <@${menu.clicker.user.id}> ,\n\n**Παρακαλω περιμενετε το staff team θα σας εξυπηρετησει συντομα!!Αν θελετε να κλεισετε το ticket αντιδραστε με 🔒**`)
            .setColor('#2ecc70')
        const close1 = new MessageButton()
            .setStyle("green")
            .setLabel('🔒')
            .setID("close")
        const buttonarray = [close1]
        supportchannel.send({ embed: mhnyma, buttons: buttonarray })


    }
    if (menu.values[0] === 'irewards') {
        await menu.reply.defer()
        menu.message.channel.messages.fetch(config.ticket['message id']).then(msg => {
            const embed = new Discord.MessageEmbed()
                .setAuthor(menu.message.guild.name, menu.message.guild.iconURL({ dynamic: true }))
                .setThumbnail(menu.message.guild.iconURL({ dynamic: true }))
                .setDescription('**```Για την καλύτερη εξυπηρέτησή σας, επιλέξτε το είδος του Ticket με βάση το πρόβλημα που έχετε```**')
                .setColor('#2ecc70')
            const Option1 = new MessageMenuOption()
                .setLabel("Support")
                .setDescription("Ζητήστε βοήθεια.")
                .setEmoji('📢')
                .setValue('support')

            const Option2 = new MessageMenuOption()
                .setLabel("Buy")
                .setDescription('Donate.')
                .setEmoji('💸')
                .setValue('buy')

            const Option3 = new MessageMenuOption()
                .setLabel("Ban Appeal")
                .setDescription('Αίτημα για Ban Appeal.')
                .setEmoji('🔞')
                .setValue('irewards')

            const Option4 = new MessageMenuOption()
                .setLabel("Staff Report")
                .setDescription('Αίτημα για Staff Report.')
                .setEmoji('🔍')
                .setValue('staffrep')

            const Option5 = new MessageMenuOption()
                .setLabel("Other")
                .setDescription('Άλλο.')
                .setEmoji('❓')
                .setValue('other')


            const selection = new MessageMenu()
                .setID('Selection')
                .setMaxValues(1)
                .setMaxValues(1)
                .setPlaceholder('Επέλεξε το θέμα του ticket')
                .addOption(Option1)
                .addOption(Option2)
                .addOption(Option3)
                .addOption(Option4)
                .addOption(Option5)
            msg.edit(embed, selection).then(() => {
                console.log('Το Ticket άλλαξε')
            })
        })
        const alreadyticket = new Discord.MessageEmbed()
            .setAuthor(menu.guild.name, menu.guild.iconURL({ dynamic: true }))
            .setDescription('```Έχεις ήδη ένα ticket ανοιχτό περίμενε μέχρι να σε εξυπηρετήσουν!```')
            .setColor('#2ecc70')

        const ch = menu.message.guild.channels.cache.find(ch => ch.name === `🔞ticket-${menu.clicker.user.username.toLowerCase().replace(/ +/g,'-').replace(/!/g, '')}`)
        if (ch) return menu.clicker.user.send(alreadyticket).then(menu.message.guild.channels.cache.find(ch => ch.id === config.ticket.logs).send(new Discord.MessageEmbed()
            .setDescription(`**Ο <@${menu.clicker.user.id}> προσπάθησε να ανοίξει ένα δεύτερο \`🔞 Ban Appeal\` ticket.**`)
            .setTimestamp()
            .setColor('#2ecc70'))).catch(channel => {
            console.log(channel.message)
        })
        const data = await db.get(`tickets_${menu.message.guild.id}`)
        if (data == null) await db.set(`tickets_${menu.message.guild.id}`, { TicketNumber: 1 })
        const buychannel = await menu.guild.channels.create(`🔞ticket-${'0'.repeat(4 - data.TicketNumber.toString().length)}${data.TicketNumber}`, {

            type: "text",
            parent: menu.message.channel.parentID,

            permissionOverwrites: [{
                id: menu.clicker.id,
                allow: ['SEND_MESSAGES', 'VIEW_CHANNEL']
            }, {
                id: gkan.user.id,
                allow: ['SEND_MESSAGES', 'VIEW_CHANNEL']
            }, {
                id: config.ticket.SRid,
                allow: ['SEND_MESSAGES', "VIEW_CHANNEL"]
            }, {
                id: config.ticket.ERid,
                deny: ['SEND_MESSAGES', 'VIEW_CHANNEL']
            }, ],
        })
        const logs = menu.message.guild.channels.cache.get(config.ticket.logs)
        if (logs) {
            const embed = new Discord.MessageEmbed({
                "author": {
                    "name": menu.clicker.user.tag,
                    "url": "https://discord.com/users/" + menu.clicker.user.id + "",
                    "icon_url": menu.clicker.user.displayAvatarURL()
                },
                "color": 3775833,
                "description": "**Κανάλι: [`" + buychannel.name + "`](https://canary.discord.com/channels/" + menu.message.guild.id + "/" + buychannel.id + ") • `" + buychannel.id + "`\nMention: <@" + menu.clicker.user.id + ">**"
            })
            logs.send(embed)
        }
        await db.set(`${buychannel.id}`, menu.clicker.user.id)
        await db.set(`tickets_${menu.message.guild.id}`, { TicketNumber: data.TicketNumber + 1 })


        const mhnyma = new Discord.MessageEmbed()

        .setDescription(` Γεία σας <@${menu.clicker.user.id}> ,\n\n**Παρακαλω περιμενετε το staff team θα σας εξυπηρετησει συντομα!!Αν θελετε να κλεισετε το ticket αντιδραστε με 🔒**`)
            .setColor('#2ecc70')
        const close1 = new MessageButton()
            .setStyle("green")
            .setLabel('🔒')
            .setID("close")
        const buttonarray = [close1]
        buychannel.send({ embed: mhnyma, buttons: buttonarray })
    }
    if (menu.values[0] === 'staffrep') {
        await menu.reply.defer()
        menu.message.channel.messages.fetch(config.ticket['message id']).then(msg => {
            const embed = new Discord.MessageEmbed()
                .setAuthor(menu.message.guild.name, menu.message.guild.iconURL({ dynamic: true }))
                .setThumbnail(menu.message.guild.iconURL({ dynamic: true }))
                .setDescription('**```Για την καλύτερη εξυπηρέτησή σας, επιλέξτε το είδος του Ticket με βάση το πρόβλημα που έχετε```**')
                .setColor('#2ecc70')
            const Option1 = new MessageMenuOption()
                .setLabel("Support")
                .setDescription("Ζητήστε βοήθεια.")
                .setEmoji('📢')
                .setValue('support')

            const Option2 = new MessageMenuOption()
                .setLabel("Buy")
                .setDescription('Donate.')
                .setEmoji('💸')
                .setValue('buy')

            const Option3 = new MessageMenuOption()
                .setLabel("Ban Appeal")
                .setDescription('Αίτημα για Ban Appeal.')
                .setEmoji('🔞')
                .setValue('irewards')

            const Option4 = new MessageMenuOption()
                .setLabel("Staff Report")
                .setDescription('Αίτημα για Staff Report.')
                .setEmoji('🔍')
                .setValue('staffrep')

            const Option5 = new MessageMenuOption()
                .setLabel("Other")
                .setDescription('Άλλο.')
                .setEmoji('❓')
                .setValue('other')


            const selection = new MessageMenu()
                .setID('Selection')
                .setMaxValues(1)
                .setMaxValues(1)
                .setPlaceholder('Επέλεξε το θέμα του ticket')
                .addOption(Option1)
                .addOption(Option2)
                .addOption(Option3)
                .addOption(Option4)
                .addOption(Option5)
            msg.edit(embed, selection).then(() => {
                console.log('Το Ticket άλλαξε')
            })
        })
        const alreadyticket = new Discord.MessageEmbed()
            .setAuthor(menu.clicker.user.username, menu.clicker.user.displayAvatarURL())
            .setDescription('```Έχεις ήδη ένα ticket ανοιχτό περίμενε μέχρι να σε εξυπηρετήσουν!```')
            .setColor('#2ecc70')

        const ch = menu.message.guild.channels.cache.find(ch => ch.name === `🔍ticket-${menu.clicker.user.username.toLowerCase().replace(/ +/g,'-').replace(/!/g, '')}`)
        if (ch) return menu.clicker.user.send(alreadyticket).then(menu.message.guild.channels.cache.find(ch => ch.id === config.ticket.logs).send(new Discord.MessageEmbed()
            .setDescription(`**Ο <@${menu.clicker.user.id}> προσπάθησε να ανοίξει ένα δεύτερο \`🔍 Staff Report\` ticket.**`)
            .setTimestamp()
            .setColor('#2ecc70'))).catch(channel => {
            console.log(channel.message)
        })
        const data = await db.get(`tickets_${menu.message.guild.id}`)
        if (data == null) await db.set(`tickets_${menu.message.guild.id}`, { TicketNumber: 1 })
        const partnerchannel = await menu.guild.channels.create(`🔍ticket-${'0'.repeat(4 - data.TicketNumber.toString().length)}${data.TicketNumber}`, {

            type: "text",
            parent: menu.message.channel.parentID,

            permissionOverwrites: [{
                id: menu.clicker.id,
                allow: ['SEND_MESSAGES', 'VIEW_CHANNEL']
            }, {
                id: gkan.user.id,
                allow: ['SEND_MESSAGES', 'VIEW_CHANNEL']
            }, {
                id: config.ticket.SRid,
                allow: ['SEND_MESSAGES', "VIEW_CHANNEL"]
            }, {
                id: config.ticket.ERid,
                deny: ['SEND_MESSAGES', 'VIEW_CHANNEL']
            }, ],
        })
        const logs = menu.message.guild.channels.cache.get(config.ticket.logs)
        if (logs) {
            const embed = new Discord.MessageEmbed({
                "author": {
                    "name": menu.clicker.user.tag,
                    "url": "https://discord.com/users/" + menu.clicker.user.id + "",
                    "icon_url": menu.clicker.user.displayAvatarURL()
                },
                "color": 3775833,
                "description": "**Κανάλι: [`" + partnerchannel.name + "`](https://canary.discord.com/channels/" + menu.message.guild.id + "/" + partnerchannel.id + ") • `" + partnerchannel.id + "`\nMention: <@" + menu.clicker.user.id + ">**"
            })
            logs.send(embed)
        }
        await db.set(`${partnerchannel.id}`, menu.clicker.user.id)
        await db.set(`tickets_${menu.message.guild.id}`, { TicketNumber: data.TicketNumber + 1 })

        const mhnyma = new Discord.MessageEmbed()

        .setDescription(` Γεία σας <@${menu.clicker.user.id}> ,\n\n**Παρακαλω περιμενετε το staff team θα σας εξυπηρετησει συντομα!!Αν θελετε να κλεισετε το ticket αντιδραστε με 🔒**`)
            .setColor('#2ecc70')
        const close1 = new MessageButton()
            .setStyle("green")
            .setLabel('🔒')
            .setID("close")
        const buttonarray = [close1]
        partnerchannel.send({ embed: mhnyma, buttons: buttonarray })

    }
    if (menu.values[0] === 'brewards') {
        await menu.reply.defer()
        menu.message.channel.messages.fetch(config.ticket['message id']).then(msg => {
            const embed = new Discord.MessageEmbed()
                .setAuthor(menu.message.guild.name, menu.message.guild.iconURL({ dynamic: true }))
                .setThumbnail(menu.message.guild.iconURL({ dynamic: true }))
                .setDescription('**```Για την καλύτερη εξυπηρέτησή σας, επιλέξτε το είδος του Ticket με βάση το πρόβλημα που έχετε```**')
                .setColor('#2ecc70')
            const Option1 = new MessageMenuOption()
                .setLabel("Support")
                .setDescription("Ζητήστε βοήθεια.")
                .setEmoji('📢')
                .setValue('support')

            const Option2 = new MessageMenuOption()
                .setLabel("Buy")
                .setDescription('Donate.')
                .setEmoji('💸')
                .setValue('buy')

            const Option3 = new MessageMenuOption()
                .setLabel("Ban Appeal")
                .setDescription('Αίτημα για Ban Appeal.')
                .setEmoji('🔞')
                .setValue('irewards')

            const Option4 = new MessageMenuOption()
                .setLabel("Staff Report")
                .setDescription('Αίτημα για Staff Report.')
                .setEmoji('🔍')
                .setValue('staffrep')

            const Option5 = new MessageMenuOption()
                .setLabel("Other")
                .setDescription('Άλλο.')
                .setEmoji('❓')
                .setValue('other')


            const selection = new MessageMenu()
                .setID('Selection')
                .setMaxValues(1)
                .setMaxValues(1)
                .setPlaceholder('Επέλεξε το θέμα του ticket')
                .addOption(Option1)
                .addOption(Option2)
                .addOption(Option3)
                .addOption(Option4)
                .addOption(Option5)
            msg.edit(embed, selection).then(() => {
                console.log('Το Ticket άλλαξε')
            })
        })
        const alreadyticket = new Discord.MessageEmbed()
            .setAuthor(menu.clicker.user.username, menu.clicker.user.displayAvatarURL())
            .setDescription('```Έχεις ήδη ένα ticket ανοιχτό περίμενε μέχρι να σε εξυπηρετήσουν!```')
            .setColor('#2ecc70')

        const ch = menu.message.guild.channels.cache.find(ch => ch.name === `💷ticket-${menu.clicker.user.username.toLowerCase().replace(/ +/g,'-').replace(/!/g, '')}`)
        if (ch) return menu.clicker.user.send(alreadyticket).then(menu.message.guild.channels.cache.find(ch => ch.id === config.ticket.logs).send(new Discord.MessageEmbed()
            .setDescription(`**Ο <@${menu.clicker.user.id}> προσπάθησε να ανοίξει ένα δεύτερο \`💷 Boost Rewards\` ticket.**`)
            .setTimestamp()
            .setColor('#2ecc70'))).catch(channel => {
            console.log(channel.message)
        })
        const data = await db.get(`tickets_${menu.message.guild.id}`)
        const partnerchannel = await menu.guild.channels.create(`💷ticket-${'0'.repeat(4 - data.TicketNumber.toString().length)}${data.TicketNumber}`, {

            type: "text",
            parent: menu.message.channel.parentID,

            permissionOverwrites: [{
                id: menu.clicker.id,
                allow: ['SEND_MESSAGES', 'VIEW_CHANNEL']
            }, {
                id: gkan.user.id,
                allow: ['SEND_MESSAGES', 'VIEW_CHANNEL']
            }, {
                id: gkan.ticket.SRid,
                allow: ['SEND_MESSAGES', "VIEW_CHANNEL"]
            }, {
                id: gkan.ticket.ERid,
                deny: ['SEND_MESSAGES', 'VIEW_CHANNEL']
            }, ],
        })
        const logs = menu.message.guild.channels.cache.get(config.ticket.logs)
        if (logs) {
            const embed = new Discord.MessageEmbed({
                "author": {
                    "name": menu.clicker.user.tag,
                    "url": "https://discord.com/users/" + menu.clicker.user.id + "",
                    "icon_url": menu.clicker.user.displayAvatarURL()
                },
                "color": 3775833,
                "description": "**Κανάλι: [`" + partnerchannel.name + "`](https://canary.discord.com/channels/" + menu.message.guild.id + "/" + partnerchannel.id + ") • `" + partnerchannel.id + "`\nMention: <@" + menu.clicker.user.id + ">**"
            })
            logs.send(embed)
        }
        await db.set(`${partnerchannel.id}`, menu.clicker.user.id)
        await db.set(`tickets_${menu.message.guild.id}`, { TicketNumber: data.TicketNumber + 1 })

        const mhnyma = new Discord.MessageEmbed()

        .setDescription(` Γεία σας <@${menu.clicker.user.id}> ,\n\n**Παρακαλω περιμενετε το staff team θα σας εξυπηρετησει συντομα!!Αν θελετε να κλεισετε το ticket αντιδραστε με 🔒**`)
            .setColor('#2ecc70')
        const close1 = new MessageButton()
            .setStyle("green")
            .setLabel('🔒')
            .setID("close")
        const buttonarray = [close1]
        partnerchannel.send({ embed: mhnyma, buttons: buttonarray })
    }
    if (menu.values[0] === 'other') {
        await menu.reply.defer()
        menu.message.channel.messages.fetch(config.ticket['message id']).then(msg => {
            const embed = new Discord.MessageEmbed()
                .setAuthor(menu.message.guild.name, menu.message.guild.iconURL({ dynamic: true }))
                .setThumbnail(menu.message.guild.iconURL({ dynamic: true }))
                .setDescription('**```Για την καλύτερη εξυπηρέτησή σας, επιλέξτε το είδος του Ticket με βάση το πρόβλημα που έχετε```**')
                .setColor('#2ecc70')
            const Option1 = new MessageMenuOption()
                .setLabel("Support")
                .setDescription("Ζητήστε βοήθεια.")
                .setEmoji('📢')
                .setValue('support')

            const Option2 = new MessageMenuOption()
                .setLabel("Buy")
                .setDescription('Donate.')
                .setEmoji('💸')
                .setValue('buy')

            const Option3 = new MessageMenuOption()
                .setLabel("Ban Appeal")
                .setDescription('Αίτημα για Ban Appeal.')
                .setEmoji('🔞')
                .setValue('irewards')

            const Option4 = new MessageMenuOption()
                .setLabel("Staff Report")
                .setDescription('Αίτημα για Staff Report.')
                .setEmoji('🔍')
                .setValue('staffrep')

            const Option5 = new MessageMenuOption()
                .setLabel("Other")
                .setDescription('Άλλο.')
                .setEmoji('❓')
                .setValue('other')


            const selection = new MessageMenu()
                .setID('Selection')
                .setMaxValues(1)
                .setMaxValues(1)
                .setPlaceholder('Επέλεξε το θέμα του ticket')
                .addOption(Option1)
                .addOption(Option2)
                .addOption(Option3)
                .addOption(Option4)
                .addOption(Option5)
            msg.edit(embed, selection).then(() => {
                console.log('Το Ticket άλλαξε')
            })
        })
        const alreadyticket = new Discord.MessageEmbed()
            .setAuthor(menu.clicker.user.username, menu.clicker.user.displayAvatarURL())
            .setDescription('```Έχεις ήδη ένα ticket ανοιχτό περίμενε μέχρι να σε εξυπηρετήσουν!```')
            .setColor('#2ecc70')

        const ch = menu.message.guild.channels.cache.find(ch => ch.name === `❓ticket-${menu.clicker.user.username.toLowerCase().replace(/ +/g,'-').replace(/!/g, '')}`)
        if (ch) return menu.clicker.user.send(alreadyticket).then(menu.message.guild.channels.cache.find(ch => ch.id === config.ticket.logs).send(new Discord.MessageEmbed()
            .setDescription(`**Ο <@${menu.clicker.user.id}> προσπάθησε να ανοίξει ένα δεύτερο \`❓ Other\` ticket.**`)
            .setTimestamp()
            .setColor('#2ecc70'))).catch(channel => {
            console.log(channel.message)
        })
        const data = await db.get(`tickets_${menu.message.guild.id}`)
        if (data == null) await db.set(`tickets_${menu.message.guild.id}`, { TicketNumber: 1 })
        const partnerchannel = await menu.guild.channels.create(`❓ticket-${'0'.repeat(4 - data.TicketNumber.toString().length)}${data.TicketNumber}`, {

            type: "text",
            parent: menu.message.channel.parentID,

            permissionOverwrites: [{
                id: menu.clicker.id,
                allow: ['SEND_MESSAGES', 'VIEW_CHANNEL']
            }, {
                id: gkan.user.id,
                allow: ['SEND_MESSAGES', 'VIEW_CHANNEL']
            }, {
                id: config.ticket.SRid,
                allow: ['SEND_MESSAGES', "VIEW_CHANNEL"]
            }, {
                id: config.ticket.ERid,
                deny: ['SEND_MESSAGES', 'VIEW_CHANNEL']
            }, ],
        })
        const logs = menu.message.guild.channels.cache.get(config.ticket.logs)
        if (logs) {
            const embed = new Discord.MessageEmbed({
                "author": {
                    "name": menu.clicker.user.tag,
                    "url": "https://discord.com/users/" + menu.clicker.user.id + "",
                    "icon_url": menu.clicker.user.displayAvatarURL()
                },
                "color": 3775833,
                "description": "**Κανάλι: [`" + partnerchannel.name + "`](https://canary.discord.com/channels/" + menu.message.guild.id + "/" + partnerchannel.id + ") • `" + partnerchannel.id + "`\nMention: <@" + menu.clicker.user.id + ">**"
            })
            logs.send(embed)
        }
        await db.set(`${partnerchannel.id}`, menu.clicker.user.id)
        await db.set(`tickets_${menu.message.guild.id}`, { TicketNumber: data.TicketNumber + 1 })

        const mhnyma = new Discord.MessageEmbed()

        .setDescription(` Γεία σας <@${menu.clicker.user.id}> ,\n\n**Παρακαλω περιμενετε το staff team θα σας εξυπηρετησει συντομα!!Αν θελετε να κλεισετε το ticket αντιδραστε με 🔒**`)
            .setColor('#2ecc70')
        const close1 = new MessageButton()
            .setStyle("green")
            .setLabel('🔒')
            .setID("close")
        const buttonarray = [close1]
        partnerchannel.send({ embed: mhnyma, buttons: buttonarray })
    }

})
gkan.on('clickButton', async(button) => {
    const ticketChannel = button.message.channel

    if (button.id === 'close') {
        const chanel = db.get(button.message.channel.id)
        if (!chanel) return button.reply.defer().catch(() => {});
        let usersd = await button.message.channel.permissionOverwrites.get(gkan.users.cache.get(chanel).id);
        let deleteButton = new MessageButton()
            .setLabel("Delete")
            .setID(`ticket_delete_${ticketChannel.id}`)
            .setEmoji("⛔")
            .setStyle("gray")
        if (!usersd) return button.reply.send(`\`${button.message.channel.name}\` is already closed`, { component: deleteButton, ephemeral: true })

        const dfa = button.clicker.user
        let buttonMember = button.clicker.member;

        let e = await button.message.channel.send("Είστε βέβαιοι ότι θέλετε να κλείσετε αυτό το ticket;", { component: new MessageActionRow().addComponent(new MessageButton().setLabel("Ναι").setStyle("red").setID("delete")).addComponent(new MessageButton().setLabel("Οχι").setStyle("grey").setID("cancel")) });
        let filter = (button) => buttonMember.user.id == button.clicker.user.id
        let collector = e.createButtonCollector(filter, { max: 1, time: 60000, errors: ["time"] })
        button.reply.defer().catch(() => {});

        collector.on("collect", async button => {
            if (button.id == `delete`) {
                e.delete().catch(() => {});

                let closedEmbed = new Discord.MessageEmbed({
                    "color": 3026739,
                    "description": "```Επιλογή!```"
                })

                let deleteButton = new MessageButton()
                    .setLabel("Κλείσε")
                    .setID(`ticket_delete_${ticketChannel.id}`)
                    .setEmoji("⛔")
                    .setStyle("gray")



                button.message.channel.send({
                    embed: new Discord.MessageEmbed({
                        "color": 16514607,
                        "description": "Το ticket έκλεισε ο/η <@" + button.clicker.user.id + ">"
                    })
                })
                button.message.channel.send("", {
                    embed: closedEmbed,
                    components: new MessageActionRow()
                        .addComponent(deleteButton)
                })
                const logs = button.message.guild.channels.cache.get(config.ticket.logs)
                if (logs) {
                    logs.send(new Discord.MessageEmbed({
                        "author": {
                            "name": gkan.users.cache.get(chanel).tag,
                            "url": "https://discord.com/users/" + gkan.users.cache.get(chanel).id,
                            "icon_url": gkan.users.cache.get(chanel).displayAvatarURL()
                        },
                        "color": 15483204,
                        "description": "**Κανάλι: `" + button.message.channel.name + "` • `" + button.message.channel.id + "`\nMention: <@" + gkan.users.cache.get(chanel).id + ">\nΑπό τον/ην: <@" + button.clicker.user.id + ">**"
                    }))
                    await button.message.channel.setName(`${button.message.channel.name.slice(0, 2)}closed-${button.message.channel.name.split('-')[1]}`) //to username tou ticket
                    button.reply.defer();



                    usersd.delete().catch(() => {});

                }
            } else {
                e.delete().catch(() => {});
            }
        })



    }
    if (button.id === `ticket_reopen_${ticketChannel.id}`) {
        const chanel = db.get(button.message.channel.id)
        if (!chanel) return button.reply.defer().catch(() => {}), button.message.channel.delete().catch(() => {});
        button.reply.defer();
        await ticketChannel.updateOverwrite(gkan.users.cache.get(chanel).id, { VIEW_CHANNEL: true })
        button.message.channel.send(new Discord.MessageEmbed({
            "color": 2015834,
            "description": "Το ticket άνοιξε από <@" + button.clicker.user.id + ">"
        }))
        const logs = button.message.guild.channels.cache.get(config.ticket.logs)
        if (logs) {
            logs.send(new Discord.MessageEmbed({
                "author": {
                    "name": gkan.users.cache.get(chanel).tag,
                    "url": "https://discord.com/users/" + gkan.users.cache.get(chanel).id,
                    "icon_url": gkan.users.cache.get(chanel).displayAvatarURL()
                },
                "color": 16514607,
                "description": "**Κανάλι: `" + button.message.channel.name + "` • `" + button.message.channel.id + "`\nMention: <@" + gkan.users.cache.get(chanel).id + ">\nΑπό τον/ην: <@" + button.clicker.user.id + ">**"
            }))
            await button.message.channel.setName(`${button.message.channel.name.slice(0, 2)}ticket-${button.message.channel.name.split('-')[1]}`) //to username tou ticket
        }

        button.message.delete().catch(() => {});
    }
    if (button.id === `ticket_delete_${ticketChannel.id}`) {
        button.message.channel.delete().catch(() => {});
    }

})
async function createAPIMessage(interaction, content) {
    const apiMessage = await Discord.APIMessage.create(gkan.channels.resolve(interaction.channel_id), content)
        .resolveData()
        .resolveFiles();

    return {...apiMessage.data, files: apiMessage.files };
}





//------Member Count 
gkan.on("ready", function() {
    if (config.ServerCount.MEMBERS) {
        const member = gkan.guilds.cache.get(config.ServerCount["GUILD-ID"]).channels.cache.get(config.ServerCount.MEMBERS)
        if (member) {
            setInterval(() => {
                member.setName(`👥Members: ${gkan.guilds.cache.get(config.ServerCount["GUILD-ID"]).members.cache.size}`)
            }, 5000);
        }
    }
    if (config.ServerCount.BOOSTS) {
        const boost = gkan.guilds.cache.get(config.ServerCount["GUILD-ID"]).channels.cache.get(config.ServerCount.BOOSTS)
        if (boost) {
            setInterval(() => {
                boost.setName(`💥Boosts: ${gkan.guilds.cache.get(config.ServerCount["GUILD-ID"]).premiumSubscriptionCount}`)
            }, 5000);
        }
    }
})




//invite link
gkan.on("ready", function() {
    gkan.generateInvite(['ADMINISTRATOR', 'MANAGE_GUILD', 'MENTION_EVERYONE'])
        .then(link => {
            console.log(`${link}`);
            inviteLink = link;
        });
});












//--Logs---------------------------------------------------

//------Chanell Logs

gkan.on('channelCreate', async channel => {
    if (!channel.guild) return false;

    const AuditLogFetch = await channel.guild.fetchAuditLogs({limit: 1, type: "CHANNEL_CREATE"});
    if (!AuditLogFetch.entries.first()) return console.error(`No entries found.`);
    const Entry = AuditLogFetch.entries.first();

    const embed = new Discord.MessageEmbed()
    .setDescription(` \`\`\` Channel CREATE Logs \`\`\` \n ** Channel : \n ${channel.name} \n \n Created By : \n <@${Entry.executor.id}> **`)
    .setColor("36393F")
    .setTimestamp()
    channel.guild.channels.cache.get(config.logs['channel']).send(embed)
})
gkan.on('channelDelete', async channel => {
    if (!channel.guild) return false;

    const AuditLogFetch = await channel.guild.fetchAuditLogs({limit: 1, type: "CHANNEL_DELETE"});
    if (!AuditLogFetch.entries.first()) return console.error(`No entries found.`);
    const Entry = AuditLogFetch.entries.first();

    const embed = new Discord.MessageEmbed()
    .setDescription(` \`\`\` Channel Delete Logs \`\`\` \n ** Channel : \n ${channel.name} \n \n Delete By : \n <@${Entry.executor.id}> **`)
    .setColor("36393F")
    .setTimestamp()
    channel.guild.channels.cache.get(config.logs['channel']).send(embed)
})

//----------Voice LOGS-------------------------------
gkan.on('voiceStateUpdate', (oldMember, newMember) => {
    let newUserChannel = newMember.channelID;
    let oldUserChannel = oldMember.channelID;


    try {
        if (newUserChannel) {
            const voicelogs = newMember.guild.channels.cache.get(config.logs['voice']) //channel id
            const voiceeee = new Discord.MessageEmbed({
                "author": {
                    "name": newMember.member.user.tag,
                    "url": "https://discord.com/users/" + newMember.member.user.id,
                    "icon_url": newMember.member.user.displayAvatarURL()
                },
                "color": 4371328,
                "description": "**Κανάλι: <#" + newUserChannel + "> • " + newMember.channel.name + "\nMention: <@" + newMember.member.user.id + ">**"
            })
            voicelogs.send(voiceeee)
        } else {
            if (oldUserChannel) {
                const voicelogs = oldMember.guild.channels.cache.get(config.logs['voice']) //channel id
                const voiceeee = new Discord.MessageEmbed({
                    "author": {
                        "name": newMember.member.user.tag,
                        "url": "https://discord.com/users/" + newMember.member.user.id,
                        "icon_url": newMember.member.user.displayAvatarURL()
                    },
                    "color": 15681608,
                    "description": "**Κανάλι: <#" + oldUserChannel + "> • `" + oldMember.channel.name + "`\nMention: <@" + oldMember.member.user.id + ">**"
                })
                voicelogs.send(voiceeee)
            }
        }
    } catch {
        e => console.log(e.message)
    }
})


//----Message Logs-----------------------------

gkan.on('messageDelete', async(message) => {
    const { channel, author, content } = message
    const newEmbed = new Discord.MessageEmbed()
        .setTitle("Message Deleted")
        .setColor("#ff0000")
        .setDescription(`**Message Deleted**\n**Author:** ${author}\n**Channel:** ${channel}\n**Content:** ${content}`)
        .setTimestamp()
        .setFooter(`${gkan.user.username}`, gkan.user.avatarURL())
    gkan.channels.cache.get
    const targetChannel = gkan.channels.cache.get(config.logs['messages']) //channel id
    targetChannel.send(newEmbed);
})

gkan.on("messageUpdate", async(oldMessage, newMessage) => {
    try {
        if (newMessage.author.bot) return
        let channel = oldMessage.guild.channels.cache.get(config.logs['messages']) //channel id
        const url = oldMessage.url
        const embed = new Discord.MessageEmbed()
            .setTitle(`Edited Message Logs`)
            .setColor('#993366')
            .setTimestamp()
            .setURL(url)
            .addField(`Παλιο μυνημα`, `*${oldMessage.content}*`, false)
            .addField(`Τελικο μυνημα`, `*${newMessage.content}*`, false)
            .addField(`Το μυνημα ειναι του`, `**<@${oldMessage.author.id}>**`, true)
            .addField(`Καναλι που ηταν το μυνημα`, `**<#${oldMessage.channel.id}>**`, true)
        channel.send(embed)
    } catch {

    }
})



//-----Meber Log---------------------------

gkan.on('guildMemberUpdate', (oldMember, newMember) => {
    if (!oldMember.nickname && newMember.nickname) {
        const membernewnicklog = new Discord.MessageEmbed()
            .setAuthor(`${newMember.user.tag}`, `${newMember.user.displayAvatarURL({ format: "png", dynamic: true })}`)
            .setDescription(`**${newMember} nickname added**`)
            .setFooter(`${newMember.user.username}'s ID: ${newMember.id}`)
            .setTimestamp()
            .setColor('#ffff00')
            .addField("New nickname", newMember.nickname)
        gkan.channels.cache.get(config.logs.member).send(membernewnicklog); //----channels
        return;
    }
    if (oldMember.nickname && !newMember.nickname) {
        const memberremovenicklog = new Discord.MessageEmbed()
            .setAuthor(`${oldMember.user.tag}`, `${oldMember.user.displayAvatarURL({ format: "png", dynamic: true })}`)
            .setDescription(`**${oldMember} nickname removed**`)
            .setFooter(`${oldMember.user.username}'s ID: ${oldMember.id}`)
            .setTimestamp()
            .setColor('#f04747')
            .addField("Old nickname", oldMember.nickname)
        gkan.channels.cache.get(config.logs.member).send(memberremovenicklog); //----channels
        return;
    }
    if (oldMember.nickname && newMember.nickname) {
        const memberchangednicklog = new Discord.MessageEmbed()
            .setAuthor(`${newMember.user.tag}`, `${newMember.user.displayAvatarURL({ format: "png", dynamic: true })}`)
            .setDescription(`**${newMember} nickname changed**`)
            .setFooter(`${newMember.user.username}'s ID: ${newMember.id}`)
            .setTimestamp()
            .setColor('#ff4500')
            .addField("Before", oldMember.nickname)
            .addField("After", newMember.nickname);
        gkan.channels.cache.get(config.logs.member).send(memberchangednicklog); //----channels
        return;
    }
});


//----Role Logs--------------------
gkan.on("roleCreate", async(role) => {
    const fetchedLogs = await role.guild.fetchAuditLogs({
        limit: 1,
        type: 'ROLE_CREATE',
    });

    const fasdfa = fetchedLogs.entries.first();
    let { executor, target, reason } = fasdfa;
    if (executor === null) executor = "\u200B";
    if (target === null) target = "\u200B";
    if (reason === null) reason = "\u200B";

    const embed = new Discord.MessageEmbed()
        .setColor("#2ECC71")
        .setAuthor(executor.username, executor.displayAvatarURL(), `https://discord.com/users/${executor.id}`)
        .setDescription("A new role was created!")
        .addFields({ name: "User", value: executor.username }, { name: "Role Name", value: target.name }, { name: "Role ID", value: target.id }, { name: "reason", value: reason })
        // .setFooter(`Role ID: ${id}`)
        .setTimestamp();

    gkan.channels.cache.get(config.logs['rolecreate']).send(embed);
});
gkan.on("roleDelete", async(role) => {

    const fetchedLogs = await role.guild.fetchAuditLogs({
        limit: 1,
        type: 'ROLE_DELETE',
    });

    const fasdfa = await fetchedLogs.entries.first();
    let { executor, target, reason, a } = fasdfa;
    if (executor === null) executor = "\u200B";
    if (target === null || target === undefined) target = "\u200B";
    if (reason === null) reason = "\u200B";

    const embed = new Discord.MessageEmbed()
        .setColor("RED")
        .setAuthor(executor.username, executor.displayAvatarURL(), `https://discord.com/users/${executor.id}`)
        .setDescription("A new role was Deleted!")
        .addFields({ name: "User", value: executor.username }, { name: "Role Name", value: role.name }, { name: "Role ID", value: role.id }, { name: "reason", value: reason })
        // .setFooter(`Role ID: ${id}`)
        .setTimestamp();

    gkan.channels.cache.get(config.logs['rolecreate']).send(embed);

});

// add role
gkan.on('guildMemberUpdate', (oldMember, newMember) => {
    let txtChannel = gkan.channels.cache.get(config.logs['userrole']); //my own text channel, you may want to specify your own
    let oldRoleIDs = [];
    oldMember.roles.cache.each(role => {
        oldRoleIDs.push(role.id);
    });
    let newRoleIDs = [];
    newMember.roles.cache.each(role => {
        newRoleIDs.push(role.id);
    });
    //check if the newRoleIDs had one more role, which means it added a new role
    if (newRoleIDs.length > oldRoleIDs.length) {
        function filterOutOld(id) {
            for (var i = 0; i < oldRoleIDs.length; i++) {
                if (id === oldRoleIDs[i]) {
                    return false;
                }
            }
            return true;
        }
        let onlyRole = newRoleIDs.filter(filterOutOld);

        let IDNum = onlyRole[0];
        //fetch the link of the icon name
        //NOTE: only works if the user has their own icon, else it'll return null if user has standard discord icon
        let icon = newMember.user.avatarURL();

        const newRoleAdded = new Discord.MessageEmbed()
            .setTitle('Role added')
            .setAuthor(`${newMember.user.tag}`, `${icon}`)
            .setDescription(`<@&${IDNum}>`)
            .setFooter(`ID: ${IDNum}`)
            .setTimestamp()
            .setColor("#2ECC71")
    }
})

//------remove role

gkan.on('guildMemberUpdate', async(oldMember, newMember) => {
    if (newMember.roles.cache.size > oldMember.roles.cache.size) {
        let entry = await oldMember.guild.fetchAuditLogs({ type: 'MEMBER_ROLE_UPDATE ' }).then(audit => audit.entries.first());
        let logUser = entry.executor.id;
        let fad = oldMember.guild.members.cache.get(entry.executor.id) || newMember.guild.members.cache.get(entry.executor.id);


        const roleRemovedEmbed = new Discord.MessageEmbed()
            .setColor("#2ECC71")
            .setAuthor(oldMember.user.tag, oldMember.user.displayAvatarURL(), `https://discord.com/users/${oldMember.user.id}`)

        newMember.roles.cache.forEach(role => {
            if (!oldMember.roles.cache.has(role.id)) {
                roleRemovedEmbed.setDescription(`**Mention:** <@!${oldMember.user.id}>
            **Ρόλος:** ${role}
            **Από τον/ην:** <@!${logUser}>`)

            }
        });

        const discordlogs = newMember.guild.channels.cache.get(config.logs['userrole']);
        discordlogs.send(roleRemovedEmbed)
    }
    if (oldMember.roles.cache.size > newMember.roles.cache.size) {
        let entry = await newMember.guild.fetchAuditLogs({ type: 'MEMBER_ROLE_UPDATE ' }).then(audit => audit.entries.first());
        let logUser = entry.executor.id;
        let fad = oldMember.guild.members.cache.get(entry.executor.id) || newMember.guild.members.cache.get(entry.executor.id);


        const roleRemovedEmbed = new Discord.MessageEmbed()
            .setColor("RED")
            .setAuthor(newMember.user.tag, newMember.user.displayAvatarURL(), `https://discord.com/users/${newMember.user.id}`)

        oldMember.roles.cache.forEach(role => {


            if (!newMember.roles.cache.has(role.id)) {

                roleRemovedEmbed.setDescription(`**Mention:** <@!${oldMember.user.id}>
            **Ρόλος:** ${role}
            **Από τον/ην:** <@!${logUser}>`)

            }
        });

        const discordlogs = oldMember.guild.channels.cache.get(config.logs['userrole']);

        discordlogs.send(roleRemovedEmbed)
    }
});



//--------------Bans logs -----------

//ban
gkan.on('guildBanAdd', async(guild, user) => {
    const fetchedLogs = await guild.fetchAuditLogs({
        limit: 1,
        type: 'MEMBER_BAN_ADD',
    });

    const banLog = fetchedLogs.entries.first();

    if (!banLog) return console.log(`${user.tag} was banned from ${guild.name} but no audit log could be found.`);

    const { executor, target, reason } = banLog;

    if (!reason) {
        if (target.id === user.id) {
            const embed = new Discord.MessageEmbed();
            embed.setDescription(`**${user} banned\n\nΑπό τον/ην: ${executor}\nΛόγος: **`)
            embed.setColor("#000000")
            embed.setThumbnail(user.displayAvatarURL())
            gkan.channels.cache.get(config.logs.ban).send(embed)
        } else {
            const embed = new Discord.MessageEmbed();
            embed.setDescription(`**${user} banned\n\nΑπό τον/ην: \nΛόγος: **`)
            embed.setColor("#000000")
            embed.setThumbnail(user.displayAvatarURL())
            gkan.channels.cache.get(config.logs.ban).send(embed)
        }
    }
    if (reason) {
        if (target.id === user.id) {
            const embed = new Discord.MessageEmbed();
            embed.setDescription(`**${user} banned\n\nΑπό τον/ην: ${executor}\nΛόγος: ${reason}**`)
            embed.setColor("#000000")
            embed.setThumbnail(user.displayAvatarURL())
            gkan.channels.cache.get(config.logs.ban).send(embed)
        } else {
            const embed = new Discord.MessageEmbed();
            embed.setDescription(`**${user} banned\n\nΑπό τον/ην: \nΛόγος: ${reason}**`)
            embed.setColor("#000000")
            embed.setThumbnail(user.displayAvatarURL())
            gkan.channels.cache.get(config.logs.ban).send(embed)
        }
    }

});

//------Unban
gkan.on("guildBanRemove", async(guild, user) => {
    const fetchedLogs = await guild.fetchAuditLogs({
        limit: 1,
        type: 'MEMBER_BAN_REMOVE',
    });

    const banLog = await fetchedLogs.entries.first();

    if (!banLog) return console.log(`${user.tag} was unbanned from ${guild.name} but no audit log could be found.`);

    const { executor, target, reason } = banLog;

    if (!reason) {
        if (target.id === user.id) {
            const embed = new Discord.MessageEmbed();
            embed.setDescription(`**${user} unbanned\n\nΑπό τον/ην: ${executor}\nΛόγος: **`)
            embed.setColor("#000000")
            embed.setThumbnail(user.displayAvatarURL())
            gkan.channels.cache.get(config.logs.unban).send(embed)
        } else {
            const embed = new Discord.MessageEmbed();
            embed.setDescription(`**${user} unbanned\n\nΑπό τον/ην: \nΛόγος: **`)
            embed.setColor("#000000")
            embed.setThumbnail(user.displayAvatarURL())
            gkan.channels.cache.get(config.logs.unban).send(embed)
        }
    }
    if (reason) {
        if (target.id === user.id) {
            const embed = new Discord.MessageEmbed();
            embed.setDescription(`**${user} unbanned\n\nΑπό τον/ην: ${executor}\nΛόγος: ${reason}**`)
            embed.setColor("#000000")
            embed.setThumbnail(user.displayAvatarURL())
            gkan.channels.cache.get(config.logs.unban).send(embed)
        } else {
            const embed = new Discord.MessageEmbed();
            embed.setDescription(`**${user} unbanned\n\nΑπό τον/ην: \nΛόγος: ${reason}**`)
            embed.setColor("#000000")
            embed.setThumbnail(user.displayAvatarURL())
            gkan.channels.cache.get(config.logs.unban).send(embed)
        }
    }
})



//----------------Anti Link------------------------------------


gkan.on("message", async message => {
    if (message.content.includes("discord.gg") || message.content.includes("discord.com/invite") || message.content.includes("discord.io") || message.content.includes(".gg") || message.content.includes(".io")) {
        if (message.member.hasPermission("ADMINISTRATOR")) return;
        message.delete().catch(() => {});
        const embed = new Discord.MessageEmbed()
            .setAuthor(message.member.user.username, message.member.user.displayAvatarURL())
            .setTitle("**Anti Links System**")
            .addFields({ name: "**User ID**", value: "```" + message.member.user.id + "```", inline: true }, { name: "**User Name**", value: "```" + message.member.user.username + "```", inline: true }, { name: "**User Tag**", value: "<@" + message.member.user.id + ">", inline: true }, { name: "**Link**", value: "" + message.content + "", inline: true })
            .setColor("#ffb600")
        const logs = message.guild.channels.cache.get(config.logs.antilink).send(embed)
    }
})

//--------Auto Role------------------------------------------

gkan.on('guildmemberadd', async(member, message) => {
    if (!member.guild.me.hasPermission("ADMINISTRATOR")) return;
    if (member.user.bot) return;
    member.roles.add(member.guild.roles.cache.get(config.CIVILIANROLE));
})


gkan.once('ready', () => {
    console.log(`Logged in as ${gkan.user.tag}!`);
});


//connect token
gkan.login(config.token || process.env.TOKEN);
