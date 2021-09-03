const { MessageAttachment } = require('discord.js');
const { SlashCommandBuilder } = require('@discordjs/builders');
//const CanvasHelpers = require('../Helpers/CanvasHelpers')
const FindUser = require('../Helpers/MongoFindUser');
const Canvas = require('canvas');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('avatar')
        .setDescription('Shows your Clash of the Kings user profile.')
        .addUserOption(option => option.setName('target').setDescription('A user whose profile should be shown').setRequired(true)),
    async execute(interaction) {
        const user = await interaction.options.getUser('target');
        let dbUser;
        if (user) {
            dbUser = await FindUser.findUser(user.id);
        }
        else {
            dbUser = await FindUser.findUser(interaction.user.id);
        }
        const balance = dbUser.balance;
        const weapon = dbUser.weapon;
        const utility = dbUser.utility;
        const artifact = dbUser.artifact;

        const canvas = Canvas.createCanvas(250, 250);
        const context = canvas.getContext('2d');
        const background = await Canvas.loadImage('./assets/wallpaper.jpg');
        const avatar = await Canvas.loadImage(interaction.user.displayAvatarURL({ format: 'jpg' }));

        context.drawImage(background, 0, 0, canvas.width, canvas.height);
        context.drawImage(avatar, 225, 75, 50, 50);

        context.font = '28px sans-serif';
        context.fillStyle = '#ffffff';
        context.fillText('Profile', canvas.width / 2.5, canvas.height / 3.5);

        //context.font = applyText(canvas, "user.displayName");
        context.fillStyle = '#ffffff';
        context.fillText(interaction.member.displayName, canvas.width / 2.5, canvas.height / 1.8);

        const attatchment = new MessageAttachment(canvas.toBuffer(), 'profile.png');
        return interaction.reply({
            files: [attatchment]
        });
    },
};

applyText = (canvas, text) => {
    const context = canvas.getContext('2d');

    // Declare a base size of the font
    let fontSize = 70;

    do {
        // Assign the font to the context and decrement it so it can be measured again
        context.font = `${fontSize -= 10}px sans-serif`;
        // Compare pixel width of the text to the canvas minus the approximate avatar size
    } while (context.measureText(text).width > canvas.width - 300);

    // Return the result to use in the actual canvas
    return context.font;
};