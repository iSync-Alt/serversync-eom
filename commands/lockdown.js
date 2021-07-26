module.exports = {
	name: 'lockdown',
	description: 'Toggles lockdpon mode of your server!',
	async execute(message, args, client, Discord, welcomechannel, logschannel, welcomechnnl, logschnnl, modlogschannel, modlogschnnl, welcomechanneltoggle, modlogstoggle, logstoggle, righte, prefix, setting2, lockdownsettin) {
		if(!message.guild) return false;
		let lockdownsetting = await db.get(`lockdown_${message.guild.id}`);
		if(!message.member.hasPermission("MANAGE_GUILD")) return message.channel.send(`${stope} You don't have the needed permission to use this command! \n\`/MANAGE_GUILD/\`!\nIf you think that this is a mistake, please contact your server's owner!`);
		let setting = args.join(' ')
		if((!setting || setting === 'true') && (lockdownsetting === null || lockdownsetting === 'false')) {
		try {
		var invites = await client.guilds.cache.get(`${message.guild.id}`).fetchInvites();
		var amountdeleted = 0
		invites.forEach(invites => {
			 invites.delete()
			amountdeleted = amountdeleted + 1;
		})
		} catch (error) {
			message.channel.send(`${stope} Please enable my permissions!`);
		}
		message.channel.send(`✅ Deleted all server's invites!\n${stope} Deleted ${amountdeleted} invites! 👍\nThe server is on **LOCKDOWN** mode!\nto lift it, \`[PREFIX]lockdown [false]\` to lift the lockdown! 🗝`)
		await db.set(`lockdown_${message.guild.id}`, 'true')
		try {
		client.channels.cache.get(`${logschannel}`).send(`Enabled lockdown mode! 🔒\nto lift it use \`${prefix}lockdown false\`!`)
		} catch (error) {
			console.log(error)
			message.channel.send(`${stope} Please enable my permission!`);
		}
		} else
		if(setting === 'false' && lockdownsetting === 'true' && lockdownsetting !== null) {
			try {
				message.channel.send(`Lockdown lifted! 🔓\nNow people are able to join the server! 👍\n${stope} Errors\nNone!`)
				await db.set(`lockdown_${message.guild.id}`, 'false')

			} catch (error) {
				message.channel.send(`${stope} Please create a LOGS CHANNEL to send the logs!\n${stope}	Please enable my permissions!`)
			}
		}
}
}