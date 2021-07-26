module.exports = {
	name: 'changelogs',
	description: 'Changes the logs channel of your server!',
	async execute(message, args, client, Discord, welcomechannel, logschannel, welcomechnnl, logschnnl, modlogschannel, modlogschnnl, welcomechanneltoggle, modlogstoggle, logstoggle, righte, prefix, setting2, lockdownsettin) {
		if(!message.guild) return false;
		if(!message.mentions.channels.size) {
		newlogs = message.mentions.channels.first().id
		} else {
			newlogs = null
		}
		if(!message.member.hasPermission('MANAGE_GUILD')) {
			let noperms = new Discord.MessageEmbed()
			.setColor("RED")
			.setTitle(`${message.author.username}, you don't have the needed permission to execute this command!`)
			.setDescription(`${message.author.username}, you are missing the valid permission\n\`MANAGE_GUILD\`!\nIf you think that this is a mistake,\nPlease contact your server's owner!`)
			message.channel.send(noperms)
		} else 
		if(newlogs === null || newlogs === undefined || !newlogs) {
			let which = new Discord.MessageEmbed()
			.setColor('RED')
			.setTitle(`${message.author.username}, you are missing some needed arguements\nto execute this command!`)
			.setDescription(`${message.author.username}, you need to mention a channel to set the new logs channel!\nExample: For example we want a channel named\`#LOGS\` to be the new logs channel\n, do this \`${prefix}changelogs #LOGS\`\nSo, it's \`[PREFIX]changelogs [LOGS CHANNEL]\`!\n(Suggest them to be privated and be only shown to staff members though!)`)
			message.channel.send(which)
		} else 
		if(parseInt(newlogs) === parseInt(logschannel)) {
			let same = new Discord.MessageEmbed()
			.setColor("RED")
			.setTitle(`${message.author.username}, same channel?`)
			.setDescription(`<#${newlogs}> is the same as <#${logschannel}>!`)
			message.channel.send(same)
		} else {
			let ok = new Discord.MessageEmbed()
			.setColor('BLUE')
			.setTitle(`${message.author.username}, what a success!`)
			.setDescription(`Changed logs channel:\n<#${logschannel}> to <#${newlogs}>`)
			let currentDate = new Date();
      let cDay = currentDate.getDate()
      let cMonth = currentDate.getMonth() + 1
      let cYear = currentDate.getFullYear()
			let epicembed = new Discord.MessageEmbed()
			.setColor("BLUE")
			.setTitle(`${message.author.tag} changed the server's logs channel!`)
			.setDescription(`${message.author.tag} changed the server's logs channel at ${cMonth}/${cDay}/${cYear}!\n<#${logschannel}> to <#${newlogs}>`)
			message.channel.send(ok)
			try {
		  client.channels.cache.get(`${newlogs}`).send(epicembed)
			client.channels.cache.get(`${logschannel}`).send(epicembed)
			} catch (error) {
				console.log(error);
				message.channel.send(`Failed to send message to <#${newlogs}> or <#${logschannel}>, please enable permissions for the bot!`);
			}
			await db.set(`logschannel_${message.guild.id}`, newlogs);
		}
	}
}