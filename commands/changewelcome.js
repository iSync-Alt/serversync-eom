module.exports = {
	name: 'changewelcome',
	description: 'Changes the welcome channel of the server!',
	async execute(message, args, client, Discord, welcomechannel, logschannel, welcomechnnl, logschnnl, modlogschannel, modlogschnnl, welcomechanneltoggle, modlogstoggle, logstoggle, righte, prefix, setting2, lockdownsettin) {
		if(!message.guild) return;
			const newWelcome = message.mentions.channels.first().id
			if(!message.member.hasPermission('MANAGE_GUILD')) {
				message.channel.send(`${stope} You don't have the permission \`/MANAGE_GUILD/\`!\nIf you think that this is a mistake, please contact your server's owner!`)
			} else
			if(!newWelcome) {
				message.channel.send(`${stope} You didn't provided the correct arguements to execute this command!\nFor example, to make a channel named '#welcome' to be the new channel, do this\n\`${prefix}changewelcome #welcome\`\nUsage: \`${prefix}changewelcome [CHANNEL MENTIONS]\`!`)
			} else
			if(newWelcome === welcomechannel) {
				message.channel.send(`${stope} both <#${newWelcome}> and, <#${welcomechannel}> are the same!`)
			} else {
				try {
					message.channel.send(`${righte} Done!\n\nChanged welcome channel, \n\n${welcomechannel} to, ${newWelcome}!\n${stope} Errors\nNone!`)
					await db.set(`welcomechannel_${message.guild.id}`, newWelcome)
					try {
						client.channels.cache.get(`${newWelcome}`).send('TEST')
						await message.delete()
					} catch (error) {
						message.channel.send(`Couldn't send messages in <#${newWelcome}>!\nPlease change that for me, to send messages there!`);
						console.log(error);
					}
					try {
						client.channels.cache.get(`${logschannel}`).send(`${righte} Updated welcome channel!\n${welcomechnnl} to, <#${newWlecome}>`)
					} catch (error) {
						console.log(error)
					}
				} catch (error) {
					console.log(error);
				}
			}
	}
}