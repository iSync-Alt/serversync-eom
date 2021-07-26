module.exports = {
	name: 'config',
	description: 'Sends the configuration command for your server!',
	async execute(message, args, client, Discord, welcomechannel, logschannel, welcomechnnl, logschnnl, modlogschannel, modlogschnnl, welcomechanneltoggle, modlogstoggle, logstoggle, righte, prefix, setting2, lockdownsettin) {
		if(!message.guild) return false;
		message.channel.send(`${setting2} Configuration settings for ${message.guild.name}\n \n${righte} Prefix: \`${prefix}\`!\nTo change it \`${prefix}changeprefix [PREFIX]\`\n${righte} LogsChannel: ${logschnnl}\nTo change it \`${prefix}changelogs [LOGS CHANNEL (MENTIONS)]\`\n${righte}WelcomeChannel: ${welcomechnnl}\nTo change it \`${prefix}changewelcome [WELCOMECHANNEL (MENTIONS)]\`\n${righte} ModLogsChannel: ${modlogschnnl}\nTo change it \`${prefix}changemodlogs [MODLOGSCHANNEL (MENTIONS)]\`\n${righte}Locked: \`${lockdownsettin}\`\nTo change it \`${prefix}lockdown [TRUE/FALSE]\`\n${righte} Enabled welcomechannel: \`${welcomechanneltoggle}\`\nTo change it \`${prefix}togglewelcome  <false/true>\`\n${righte} Enable ModlogsChannel: \`${modlogstoggle}\`\nTo change it \`${prefix}togglemod <false/true>\`\n${righte} Enable LogsChannel: \`${logstoggle}\`\nTo change it \`${prefix}togglelogs <false/true>\``)
	}
}