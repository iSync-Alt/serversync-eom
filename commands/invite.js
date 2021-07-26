module.exports = {
	name: 'invite',
	description: 'Sends a invitation link for your server!',
	async execute(message, args, client, Discord, welcomechannel, logschannel, welcomechnnl, logschnnl, modlogschannel, modlogschnnl, welcomechanneltoggle, modlogstoggle, logstoggle, righte, prefix, setting2, lockdownsettin) {
		if(!message.guild) return false;
		try {
			if(lockdownsettin === 'false' && lockdownsettin !== null) {
				if(!message.member.hasPermission('CREATE_INSTANT_INVITE')) {
				message.channel.send(`You don't have the permission\n\`/CREATE_INSTANT_INVITE/\`!`)
				} else {
		let invite = await message.channel.createInvite({
  maxAge: 0,
  maxUses: 0
}).catch(console.error);
message.channel.send(`${invite}`)
try {
	client.channels.cache.get(`${logschannel}`).send(`sent invite link of this server (Message sender - ${message.author.tag} ID: ${message.author.id}) in <#${message.channel.id}>\n${invite}`)
} catch (error) {
	console.log(error);
	message.channel.send(`Please contact your server's owner to enable me to send messages in\n${logschnnl}\nOr make a new logs channel!`);
	}
				}
	} else {
		message.channel.send('🔒 Lockdown settings is enabled for this server!')
	}
} catch (error) {
	console.log(error)
}
	}
}