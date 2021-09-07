const { SlashCommandBuilder } = require('@discordjs/builders');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('ping')
        .setDescription('Replies with Pong!'),
    async execute(interaction) {
        const start = performance.now();
        await interaction.reply('Pong!');
        let timeDiff = performance.now() - start;
        let milliseconds = Math.round(timeDiff);
        console.log("[Ping]: " + milliseconds + " ms");
    },
};