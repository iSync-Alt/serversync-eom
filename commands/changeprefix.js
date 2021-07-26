module.exports = {
	name: 'changeprefix',
	description: 'Change your server\'s prefix!',
	async execute(message, args, client, Discord, welcomechannel, logschannel, welcomechnnl, logschnnl, modlogschannel, modlogschnnl, welcomechanneltoggle, modlogstoggle, logstoggle, righte, prefix, setting2, lockdownsettin) {
		if(!message.guild) return false;
		let newprefix = args.join(' ')
		if(!message.member.hasPermission('MANAGE_SERVER')) {
			message.channel.send(`${message.author.username}, you don't have the permission to do that!\n\n${message.author.username}, you don't have the permission \`/MANAGE_SERVER/\`!\nIf your think that this is a mistake, please contact your server owner!`)
		} else
		if(!newprefix) {
			message.channel.send(`${stope} ${message.author.username}, your missing the some needed \narguments!\n\n${message.author.username}, you'll need some arguments\nto execute this command!\nExample:\nTo change prefix to for example \`!\` you must execute the command below!\n\`${prefix}changeprefix !\`\nSo, in simple terms it's [PREFIX]changeprefix [NEW PREFIX]`)
		} else
		if(newprefix.length > 5) {
			message.channel.send(`${message.author.username}, your prefix is too long!\n\nFor this bot, we have some restrictions on how long\ncan your bot prefix can be!\nAnd, ${newprefix} is too long!\n*AKA: \`${newprefix.length}\` > \`5\`!`)
		} else
		if(newprefix === prefix) {
			message.channel.send(`${message.author.username}, those prefix/es are the same . .  .\n\n${message.author.username}, \`${newprefix}\` is the same as \`${prefix}\`!`)
		} else {
const filter = (m) => {
	if(message.author.bot) return;
	if(m.content.includes('y') || m.content.includes('n')) return true;
}
message.channel.send('⚠ Are you sure about to change the prefix?\n(y/n) answer in 13 seconds.').then(() => {
	message.channel.awaitMessages(filter, { max: 1, time: 13000, errors: ['time'] })
		.then(collected => {
			message.channel.send(`${message.author.username}, what a success!\n${message.author.username}, sucessfully changed prefix \`${prefix}\` to \`${newprefix}\`!`)
			.then(db.set(`prefix_${message.guild.id}`, newprefix))
		})
		.catch(collected => {
			message.channel.send('👍 Operation canceled.');
		});
});
 }
	}
}