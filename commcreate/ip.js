/*
 * Copyright (c) 2022-2022 GKan Official Discord Base>
 */
const Discord = require('discord.js');

module.exports.run = async (client, message, args) => {
    if (message.author.bot) return;

    let embed = new Discord.MessageEmbed()
        .setTitle("IP ")
        .setColor(10038562)
        .addField("IP: ", "Soon!!!",  true)
        .setTimestamp()
        .setFooter(`2022 GKan`);
    await message.channel.send(embed);
};

module.exports.help = {
    name: "ip"
};