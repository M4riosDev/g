/*
 * Copyright (c) 2022-2022 GKan Official Discord Base>
 */
const Discord = require('discord.js');

module.exports.run = async (client, message, args) => {
    if (message.author.bot) return;

    let embed = new Discord.MessageEmbed()
        .setTitle("Help ")
        .setColor(2123412)
        .addField("User Commands", `
        !rr
        !ip
        !invite
        !help `, true)
        .setTimestamp()
        .setFooter(`© 2022 Acropolis Roleplay`);
    await message.channel.send(embed);
};

module.exports.help = {
    name: "help"
};