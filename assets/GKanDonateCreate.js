const config = require("../config");

const { MessageEmbed } = require('discord.js');

const jointocreatemap = new Map();

module.exports = function(client) {
    client.on("voiceStateUpdate", (oldState, newState) => {
        let oldparentname = "unknown"
        let oldchannelname = "unknown"
        let oldchanelid = "unknown"
        if (oldState && oldState.channel && oldState.channel.parent && oldState.channel.parent.name) oldparentname = oldState.channel.parent.name
        if (oldState && oldState.channel && oldState.channel.name) oldchannelname = oldState.channel.name
        if (oldState && oldState.channelID) oldchanelid = oldState.channelID
        let newparentname = "unknown"
        let newchannelname = "unknown"
        let newchanelid = "unknown"
        if (newState && newState.channel && newState.channel.parent && newState.channel.parent.name) newparentname = newState.channel.parent.name
        if (newState && newState.channel && newState.channel.name) newchannelname = newState.channel.name
        if (newState && newState.channelID) newchanelid = newState.channelID
        if (oldState.channelID) {
            if (typeof oldState.channel.parent !== "undefined") oldChannelName = `${oldparentname}\n\t**${oldchannelname}**\n*${oldchanelid}*`
            else oldChannelName = `-\n\t**${oldparentname}**\n*${oldchanelid}*`
        }
        if (newState.channelID) {
            if (typeof newState.channel.parent !== "undefined") newChannelName = `${newparentname}\n\t**${newchannelname}**\n*${newchanelid}*`
            else newChannelName = `-\n\t**${newchannelname}**\n*${newchanelid}*`
        }
        if (!oldState.channelID && newState.channelID) {
            if (newState.channelID !== config.WFDCHANNEL) return;
            jointocreatechannel(newState);
        }
        if (oldState.channelID && !newState.channelID) {
            if (jointocreatemap.get(`tempvoicechannel_${oldState.guild.id}_${oldState.channelID}`)) {
                var vc = oldState.guild.channels.cache.get(jointocreatemap.get(`tempvoicechannel_${oldState.guild.id}_${oldState.channelID}`));
                if (vc.members.size < 1) {
                    jointocreatemap.delete(`tempvoicechannel_${oldState.guild.id}_${oldState.channelID}`);
                    console.log(" :: " + oldState.member.user.username + "#" + oldState.member.user.discriminator + " :: Donete Deleted Room")
                    return vc.delete();
                } else {}
            }
        }
        if (oldState.channelID && newState.channelID) {

            if (oldState.channelID !== newState.channelID) {
                if (newState.channelID === config.WFDCHANNEL)
                    jointocreatechannel(oldState);
                if (jointocreatemap.get(`tempvoicechannel_${oldState.guild.id}_${oldState.channelID}`)) {
                    var vc = oldState.guild.channels.cache.get(jointocreatemap.get(`tempvoicechannel_${oldState.guild.id}_${oldState.channelID}`));
                    if (vc.members.size < 1) {
                        jointocreatemap.delete(`tempvoicechannel_${oldState.guild.id}_${oldState.channelID}`);
                        console.log(" :: " + oldState.member.user.username + "#" + oldState.member.user.discriminator + " :: Donate Deleted Room")
                        return vc.delete();
                    } else {}
                }
            }
        }
    })
    async function jointocreatechannel(user) {
        //log it 
        const exampleEmbed = new MessageEmbed()
            .setColor(config.EMBEDCOLOR)
            .setDescription("Ένας 💸 <@&" + config.DONATEMANAGER + "> να εξυπηρετήσει τον/την " + user.member.user.username + "#" + user.member.user.discriminator + " στο Donate Room")
            .setTimestamp()

        //client.channels.cache.get(config.donatenot).send("Ένας <@&" + config.DONATEMANAGER + "> να εξυπηρετήσει τον/την " + user.member.user.username + "#" + user.member.user.discriminator + " στο Donate Room")
        client.channels.cache.get(config.donatenot).send(exampleEmbed)

        console.log(" 💸 " + user.member.user.username + "#" + user.member.user.discriminator + " :: Donate Created a Room")
        await user.guild.channels.create(`💸 Donate Room`, {
            type: 'voice',
            parent: config.WFDCATEGORY,
        }).then(async vc => {
            user.setChannel(vc);
            jointocreatemap.set(`tempvoicechannel_${vc.guild.id}_${vc.id}`, vc.id);
            //change the permissions of the channel
            await vc.overwritePermissions([{
                    id: user.id,
                    allow: ['MANAGE_CHANNELS'],
                },
                {
                    id: user.guild.id,
                    deny: ['VIEW_CHANNEL'],
                },
                {
                    id: config.DONATEMANAGER,
                    allow: ['VIEW_CHANNEL'],
                },
            ]);
        })
    }
}