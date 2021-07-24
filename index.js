const express = require('express')
const app = express()
const Database = require('@replit/database')
const db = new Database()
const ms = require('pretty-ms')
const { registerFont } = require('canvas')
const Canvas = require('canvas')
registerFont('./NotoSans-Regular.ttf', { family: 'noto-sans' });
app.get('/', (req, res) => {
	res.send('fbc')
	console.log('fbc')
})
app.listen(3000, () => {
	console.log('Project is ready!')
})
let Discord = require('discord.js')
let client = new Discord.Client()
client.on('inviteCreate', async (invite) => {
	const lockdown = await db.get(`lockdown_${invite.guild.id}`)
	const logschannel = await db.get(`logschannel_${invite.guild.id}`)
	if(logschannel === null) logschannel = 'NONE';
	if(lockdown === 'true' && lockdown !== null) {
		try {
			invite.delete('The server is in **LOCKDOWN MODE**!')
		 try {
			client.channels.cache.get(`${logschannel}`).send(`Invite was deleted! beacause **LOCKDOWN MODE** in enabled!\nCode: ${invite.code}\nChannel: ${invite.channel}\nCreatedTimestamp: ${invite.createdTimestamp}\nInviter: ${invite.user}`);
		} catch (error) {
			console.log(error)
		}
	} catch (error) {
		console.log(error);
	}
	}
})
const applyText = (canvas, text) => {
	const context = canvas.getContext('2d');
	let fontSize = 70;

	do {
		context.font = `${fontSize -= 10}px noto-sans`;
	} while (context.measureText(text).width > canvas.width - 300);

	return context.font;
};

client.on('guildMemberAdd', async (member) => {
	const lockdown = await db.get(`lockdown_${member.guild.id}`)
	const logschannel = await db.get(`logschannel_${member.guild.id}`)
	if(logschannel === null) logschannel = 'NONE'
	if(lockdown === 'true' && lockdown !== null) {
		try {
		member.kick('The server is in **LOCKDOWN MODE**!')
		try {
			client.channels.cache.get(`${logschannel}`).send(`${member} has been kicked!\nReason: \`THE SERVER IS IN LOCKDOWN MODE!\``)
		} catch (error) {
			console.log(error);
			try {
				client.channels.cache.get(`${logschannel}`).send(`An error has occured while kicking ${member}!`)
			} catch {
				console.log(error);
			}
		}
	} catch (error) {
		console.log(error);
	}
	} else
	if(lockdown === 'false' || lockdown === null && welcomechannel !== null) {
		const chnnl = await db.get(`welcomechannel_${member.guild.id}`)
		const channel = member.guild.channels.cache.get(`${chnnl}`)
		try {
		const canvas = Canvas.createCanvas(700, 250);
	const context = canvas.getContext('2d');
	const background = await Canvas.loadImage('./wallpaper.jpg');
	context.drawImage(background, 0, 0, canvas.width, canvas.height);
	context.strokeStyle = '#74037b';
	context.strokeRect(0, 0, canvas.width, canvas.height);
	context.font = '28px noto-sans';
	context.fillStyle = '#ffffff';
	context.fillText('Welcome to the server,', canvas.width / 2.5, canvas.height / 3.5);
	context.font = applyText(canvas, `${member.displayName}!`);
	context.fillStyle = '#ffffff';
	context.fillText(`${member.displayName}!`, canvas.width / 2.5, canvas.height / 1.8);
	context.beginPath();
	context.arc(125, 125, 100, 0, Math.PI * 2, true);
	context.closePath();
	context.clip();
	const avatar = await Canvas.loadImage(member.user.displayAvatarURL({ format: 'jpg' }));
	context.drawImage(avatar, 25, 25, 200, 200);
	const attachment = new Discord.MessageAttachment(canvas.toBuffer(), 'welcome-image.png');
	channel.send(`Welcome to the server, ${member}!`, attachment);
		} catch (error) {
			console.log(error);
		}
	}
})
client.on('message', async message => {
	let prefix = await db.get(`prefix_${message.guild.id}`)
	if(prefix === null) prefix = 's'
	let logschannel = await db.get(`logschannel_${message.guild.id}`)
	if(logschannel === null) logschannel = 'NONE'
	let lockdownsettin = await db.get(`lockdown_${message.guild.id}`)
	if(lockdownsettin === null) lockdownsettin = 'false'
	if(logschannel === null) {
		logschnnl = 'NONE'
	} else {
		logschnnl = `<#${logschannel}>`
	}
	const welcomechannel = await db.get(`welcomechannel_${message.guild.id}`)
	if(welcomechannel === null) {
		welcomechnnl = 'NONE'
	} else {
		welcomechnnl = `<#${welcomechannel}>` 
	}
	const righte = '<:RightArrow:867713631844433922>'
	const lefte = '<:LeftArrow:867714563881697310>'
	const stope = '<:STOP:867715684079632404>'
	const setting2 = '<:gears:867722775502651432>'
	if(!message.content.startsWith(prefix) || message.author.bot) return false;
	if (!message.channel.permissionsFor(client.user).has('SEND_MESSAGES')) return;
	const botPerms = ['MANAGE_MESSAGES', 'KICK_MEMBERS', 'BAN_MEMBERS', 'MANAGE_ROLES', 'MANAGE_CHANNELS', 'MANAGE_SERVER', 'ADMINISTRATOR',];
	if (!message.guild.me.permissions.has(botPerms)) {
		return message.reply(`I need the permissions ${botPerms.join(', ')} for this applicaton to work properly`);
	}
	const args = message.content.slice(prefix.length).trim().split(/ +/);
	const command = args.shift().toLowerCase()
	if(command === 'config' || command === 'setting' || command === 'settings') {
		if(!message.guild) return false;
		message.channel.send(`${setting2} Configuration settings for ${message.guild.name}\n \n${righte} Prefix: \`${prefix}\`!\nTo change it \`${prefix}changeprefix [PREFIX]\`\n${righte} LogsChannel: ${logschnnl}\nTo change it \`${prefix}changelogs [LOGS CHANNEL (MENTIONS)]\`\n${righte}WelcomeChannel: ${welcomechnnl}\nTo change it \`${prefix}changewelcome [WELCOMECHANNEL (MENTIONS)]\`\n${righte}Locked: \`${lockdownsettin}\`\nTo change it \`${prefix}lockdown [TRUE/FALSE]\``)
	}
	if(command === 'changeprefix') {
		if(!message.guild) return false;
		let newprefix = args.join(' ')
		if(!message.member.hasPermission('MANAGE_SERVER')) {
			message.channel.send(`${message.author.username}, you don't have the permission to do that!\n\n${message.author.username}, you don't have the permission \`/MANAGE_SERVER/\`!\nIf your think that this is a mistake, please contact your server owner!`)
		} else
		if(!newprefix) {
			message.channel.send(`${message.author.username}, your missing the some needed \narguments!\n\n${message.author.username}, you'll need some arguments\nto execute this command!\nExample:\nTo change prefix to for example \`!\` you must execute the command below!\n\`${prefix}changeprefix !\`\nSo, in simple terms it's [PREFIX]changeprefix [NEW PREFIX]`)
		} else
		if(newprefix.length > 5) {
			message.channel.send(`${message.author.username}, your prefix is too long!\n\nFor this bot, we have some restrictions on how long\ncan your bot prefix can be!\nAnd, ${newprefix} is too long!\n*AKA: \`${newprefix.length}\` > \`5\`!`)
		} else
		if(newprefix === prefix) {
			message.channel.send(`${message.author.username}, those prefix/es are the same . .  .\n\n${message.author.username}, \`${newprefix}\` is the same as \`${prefix}\`!`)
		} else {
const filter = (m) => {
	if(message.author.bot) return;
	if(m.content.includes('y')) return true;
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
	if(command === 'changelogs') {
		if(!message.guild) return false;
		let newlogs = message.mentions.channels.first().id
		if(!message.member.hasPermission('MANAGE_SERVER')) {
			let noperms = new Discord.MessageEmbed()
			.setColor("RED")
			.setTitle(`${message.author.username}, you don't have the needed permission to execute this command!`)
			.setDescription(`${message.author.username}, you are missing the valid permission\n\`MANAGE_SERVER\`!\nIf you think that this is a mistake,\nPlease contact your server's owner!`)
			message.channel.send(noperms)
		} else 
		if(!newlogs) {
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
	if(command === 'invite') {
		if(!message.guild) return false
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
	if(command === 'lockdown') {
		if(!message.guild) return false;
		let lockdownsetting = await db.get(`lockdown_${message.guild.id}`);
		if(!message.member.hasPermission("MANAGE_SERVER")) return message.channel.send(`${stope} You don't have the needed permission to use this command! \n\`/MANAGE_SERVER/\`!\nIf you think that this is a mistake, please contact your server's owner!`);
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
		if(command === 'changewelcome') {
			if(!message.guild) return;
			const newWelcome = message.mentions.channels.first().id
			if(!message.member.hasPermission('MANAGE_SERVER')) {
				message.channel.send(`${stope} You don't have the permission \`/MANAGE_SERVER/\`!\nIf you think that this is a mistake, please contact your server's owner!`)
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
		if(command === 'changemessage') {
			const messag = args[0]
			if(!message.memeber.hasPermission('MANAGE_SERVER')) {
				try {
				message.channel.send(`${stope} You don't have the permission \`/MANAGE_SERVER/\`\nIf you think that this is a mistake, please conatct your server's owner!`)
				} catch (error) {
					console.log(error);
				}
			} else
			if(!messag) {
				try {
					message.channel.send(`${stope} You didn't provide any arguemnets, that is needed to execute this command!\nFor example if you want it to say \`Welcome to the server, [MEMBER]!\`\n\`${prefix}changemessage Welcome to the server\`\nArguements \`${prefix}changemessage [MESSAGE] (WITHOUT THE MEMBER)\`!`)
				} catch (error) {
					console.log(error);
				}
			} else
			if(welcomemessage === messag) {
				try {
					message.channel.send(`${stope} aren't they the same?\n\`${welcomemessage}\` and, \`${messag}\`!`)
				} catch (error) {
					console.log(error);
				}
			} else {
				try {
				message.channel.send(`${righte} successfully updated welcome message!\n\`${welcomemessage}\` to, \`${messag}\`!`)
				await db.set(`welcomemessage_${message.guild.id}`, messag)
				try {
					client.channels.cache.get(`${logschannel}`).send(`${righte} Updated welcome message\n\`${wlecommessage}\` to, ${messag}!`)
				} catch (error) {
					console.log(error)
				}
			} catch (error) {
				console.log(error);
			}
		}
		}
		if(command === 'heartbeat') {
			try {
				client.channels.cache.get(`${logschannel}`).send('TEST')
				.then((sentMessage) => {
					setTimeout(() => sentMessage.delete(), 10000)
				})
				message.channel.send(`No errors!`)
			} catch (error) {
				console.log(error);
				message.channel.send(`I can't send messages to ${logschnnl}, please enable my permission to sent messages there!`);
			}
			try {
				client.channels.cache.get(`${welcomechannel}`).send('TEST')
				.then((sentMessage) => {
					setTimeout(() => sentMessage.delete(), 10000)
				})
				message.channel.send(`No errors!`)
			} catch (error) {
				console.log(error);
				message.channel.send(`I can't sent messages to ${welcomechnnl}, please enable my permission to send messages there!`);
			}
		}
})
client.login(process.env.token)