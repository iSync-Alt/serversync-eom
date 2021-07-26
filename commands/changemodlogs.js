module.exports = {
	name: 'changemodlogs',
	description: 'Changes your mod logs!',
	async execute(message, args, client, Discord, welcomechannel, logschannel, welcomechnnl, logschnnl, modlogschannel, modlogschnnl, welcomechanneltoggle, modlogstoggle, logstoggle, righte, prefix, setting2, lockdownsettin) {
		if(!message.guild) return false;
		let newmodlogs = message.mentions.channels.first().id
		if(!message.member.hasPermission('MANAGE_GUILD')) {
			let noperms = new Discord.MessageEmbed()
			.setColor("RED")
			.setTitle(`${message.author.username}, you don't have the needed permission to execute this command!`)
			.setDescription(`${message.author.username}, you are missing the valid permission\n\`MANAGE_GUILD\`!\nIf you think that this is a mistake,\nPlease contact your server's owner!`)
			message.channel.send(noperms)
		} else 
		if(!newmodlogs) {
			let which = new Discord.MessageEmbed()
			.setColor('RED')
			.setTitle(`${message.author.username}, you are missing some needed arguements\nto execute this command!`)
			.setDescription(`${message.author.username}, you need to mention a channel to set the new mod logs channel!\nExample: For example we want a channel named\`#MODLOGS\` to be the new mod logs channel\n, do this \`${prefix}modchangelogs #MODLOGS\`\nSo, it's \`[PREFIX]changelogs [LOGS CHANNEL]\`!\n(Suggest them to be privated and be only shown to staff members though!)`)
			message.channel.send(which)
		} else 
		if(parseInt(newmodlogs) === parseInt(modlogschannel)) {
			let same = new Discord.MessageEmbed()
			.setColor("RED")
			.setTitle(`${message.author.username}, same channel?`)
			.setDescription(`<#${newmodlogs}> is the same as <#${modlogschannel}>!`)
			message.channel.send(same)
		} else {
			let ok = new Discord.MessageEmbed()
			.setColor('BLUE')
			.setTitle(`${message.author.username}, what a success!`)
			.setDescription(`Changed logs channel:\n<#${modlogschannel}> to <#${newmodlogs}>`)
			let currentDate = new Date();
      let cDay = currentDate.getDate()
      let cMonth = currentDate.getMonth() + 1
      let cYear = currentDate.getFullYear()
			let epicembed = new Discord.MessageEmbed()
			.setColor("BLUE")
			.setTitle(`${message.author.tag} changed the server's logs channel!`)
			.setDescription(`${message.author.tag} changed the server's logs channel at ${cMonth}/${cDay}/${cYear}!\n<#${modlogschannel}> to <#${newmodlogs}>`)
			message.channel.send(ok)
			try {
		  client.channels.cache.get(`${newmodlogs}`).send(epicembed)
			client.channels.cache.get(`${modlogschannel}`).send(epicembed)
			} catch (error) {
				console.log(error);
				message.channel.send(`Failed to send message to <#${newmodlogs}> or <#${modlogschannel}>, please enable permissions for the bot!`);
			}
			await db.set(`modlogschannel_${message.guild.id}`, newmodlogs);
		}
	}
}