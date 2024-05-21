/*
 * Copyright (c) 2022-2022 GKan Official Discord Base>
 */
const Discord = require('discord.js');

module.exports.run = async (client, message, args) => {
    if (message.author.bot) return;

    let embed = new Discord.MessageEmbed()
        .setTitle("``Acropolis RolePlay Restart`` : ** SOON **  ")
        .setColor(3447003)
        .setTimestamp()
        .setFooter(`2022 Acropolis RolePlay Restart Hours`);
    await message.channel.send(embed);
};

module.exports.help = {
    name: "restart"
};