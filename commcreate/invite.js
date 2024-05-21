/*
 * Copyright (c) 2022-2022 GKan Official Discord Base>
 */
const Discord = require('discord.js');

module.exports.run = async(client, message, args) => {
    if (message.author.bot) return;

    let embed = new Discord.MessageEmbed()
        .setTitle("Invite Acropoli Roleplay")
        .setColor(10038562)
        .addField("Invite", `https://discord.gg/wS7sYCkZ3M`, true)
        .setTimestamp()
        .setFooter(`2022 Crystal RolePlay`);
    await message.channel.send(embed);
};

module.exports.help = {
    name: "invite"
};