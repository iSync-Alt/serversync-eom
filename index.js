const express = require('express')
const app = express()
const Database = require('@replit/database')
const db = new Database()
const ms = require('pretty-ms')
const { registerFont } = require('canvas')
const Canvas = require('canvas')
const fs = require('fs')
registerFont('./NotoSans-Regular.ttf', { family: 'noto-sans' });
app.get('/', (req, res) => {
	res.send('fbc')
	console.log('fbc')
})
app.listen(3000, () => {
	console.log('Project is ready!')
})
let Discord = require('discord.js')
let client = new Discord.Client();
client.commands = new Discord.Collection();
const commandFiles = fs.readdirSync('./commands').filter(file => file.endsWith('.js'))
for(const file of commandFiles) {
	const command = require(`./commands/${file}`);
	client.commands.set(command.name, command);
}
require('discord-buttons')(client);
client.on('ready', () => {
	console.log(`Logged in as ${client.user.tag}!`)
})
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
	const welcomechannel = await db.get(`welcomechannel_${member.guild.id}`)
	const logstoggle = await db.get(`logschanneltoggle_${message.guild.id}`)
	const modlogstoggle = await db.get(`modlogschanneltoggle_${message.guild.id}`)
	const welcomechanneltoggle = await db.get(`welcomechanneltoggle_${message.guild.id}`)
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
	if(lockdown === 'false' || lockdown === null && welcomechannel !== null && !welcomechanneltoggle === 'false' || welcomechanneltoggle !== null) {
		const chnnl = await db.get(`welcomechannel_${member.guild.id}`)
		const channel = member.guild.channels.cache.get(`${chnnl}`)
		try {
		const canvas = Canvas.createCanvas(700, 250);
	const context = canvas.getContext('2d');
	const background = await Canvas.loadImage(member.guild.iconURL({dynamic: true, format: 'png', size: 1024}));
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
});
client.on('message', async message => {
	const logstoggle = await db.get(`logschanneltoggle_${message.guild.id}`)
	const modlogstoggle = await db.get(`modlogschanneltoggle_${message.guild.id}`)
	const welcomechanneltoggle = await db.get(`welcomechanneltoggle_${message.guild.id}`)
	let prefix = await db.get(`prefix_${message.guild.id}`)
	if(prefix === null) prefix = 's'
		logschannel = await db.get(`logschannel_${message.guild.id}`)
	let lockdownsettin = await db.get(`lockdown_${message.guild.id}`)
	if(lockdownsettin === null) lockdownsettin = 'false'
	if(logschannel === null || logstoggle === 'false' && logstoggle !== null) {
		logschnnl = 'NONE'
	} else {
		logschnnl = `<#${logschannel}>`
	}
	welcomechannel = await db.get(`welcomechannel_${message.guild.id}`)
	if(welcomechannel === null || welcomechanneltoggle === 'false' && welcomechanneltoggle !== null) {
		welcomechnnl = 'NONE'
	} else {
		welcomechnnl = `<#${welcomechannel}>` 
	}
	modlogschannel = await db.get(`modlogschannel_${message.guild.id}`)
	if(modlogschannel === null || modlogstoggle === 'false' && modlogstoggle !== null) {
		modlogschnnl = 'NONE'
	} else {
		modlogschnnl = `<#${modlogschannel}>`
		}
	const disbut = require("discord-buttons");
	const righte = '<:info:868785761212842006>'
	const lefte = '<:info2:868786359391879238>'
	const stope = '<:deny:868798150217961513>'
	const setting2 = '<:Settings:868789026751135784>'
	if(!message.content.startsWith(prefix) || message.author.bot) return false;
	if (!message.channel.permissionsFor(client.user).has('SEND_MESSAGES')) return;
	const botPerms = ['KICK_MEMBERS', 'BAN_MEMBERS', 'ADMINISTRATOR', 'MANAGE_CHANNELS', 'MANAGE_GUILD', 'MANAGE_MESSAGES', 'MANAGE_ROLES', 'MANAGE_WEBHOOKS', 'MANAGE_EMOJIS', 'VIEW_CHANNEL', 'SEND_MESSAGES', 'CONNECT', 'READ_MESSAGE_HISTORY'];
	if (!message.guild.me.permissions.has(botPerms)) {
		return message.reply(`I need the permissions ${botPerms.join(', ')} for this applicaton to work properly`);
	}
	const args = message.content.slice(prefix.length).trim().split(/ +/g);
	const command = args.shift().toLowerCase()
	if(command.length === 0) return;
	if(!client.commands.has(command)) return;
	try {
		client.commands.get(command).execute(message, args, client, Discord, welcomechannel, logschannel, welcomechnnl, logschnnl, modlogschannel, modlogschnnl, welcomechanneltoggle, modlogstoggle, logstoggle, righte, prefix, setting2, lockdownsettin);
	} catch (error) {
		console.log(error);
		message.reply('There was a error while executing this command!')
	}
		if(command === 'changemessage') {
			const messag = args[0]
			if(!message.memeber.hasPermission('MANAGE_GUILD')) {
				try {
				message.channel.send(`${stope} You don't have the permission \`/MANAGE_GUILD/\`\nIf you think that this is a mistake, please conatct your server's owner!`)
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
			if(!message.member.hasPermission("MANAGE_GUILD")) {
				message.channel.send(`You don't have the needed permission to use that command!\n\`/MANAGE_GUILD/\``)
			} else {
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
			try {
				client.channels.cache.get(`${modlogschannel}`).send('TEST')
				.then((sentMessage) => {
					setTimeout(() => sentMessage.delete(), 10000)
				})
				message.channel.send(`No errors!`)
			} catch (error) {
				console.log(error);
				message.channel.send(`I can't send messages to ${modlogschnnl}, please enable my permission to send message messages there!`);
			}
			}
		}
		if(command === 'uptime') {
			const time = ms(client.uptime)
			message.channel.send(`Current uptime:\n${righte}Up?: ${client.uptime > 0}\n${righte} Length: ${time}`)
		}
		if(command === 'botinvite' || command === 'invitebot') {
			client.generateInvite({
				permissions: ['KICK_MEMBERS', 'BAN_MEMBERS', 'ADMINISTRATOR', 'MANAGE_CHANNELS', 'MANAGE_GUILD', 'MANAGE_MESSAGES', 'MANAGE_ROLES', 'MANAGE_WEBHOOKS', 'MANAGE_EMOJIS', 'VIEW_CHANNEL', 'SEND_MESSAGES', 'CONNECT', 'READ_MESSAGE_HISTORY']
			}).then(invite => {
				let button = new disbut.MessageButton()
				.setStyle('url')
				.setURL(`${invite}`)
        .setLabel("Bot invite link!")
				.setEmoji('✅')
				message.channel.send('Here\'s the bot\'s link!', button)
			})
		}
})
client.login(process.env.token)