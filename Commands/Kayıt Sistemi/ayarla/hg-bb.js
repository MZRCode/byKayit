const { ChatInputCommandInteraction, EmbedBuilder } = require('discord.js');
const mzrdb = require('croxydb');

module.exports = {
    subCommand: 'ayarla.hg-bb',
    /**
     * @param {ChatInputCommandInteraction} interaction
     */
    async execute(interaction) {
    const { guild, options } = interaction;
    const logKanal = options.getChannel('kanal');

    const mzrEmbed = new EmbedBuilder()
        .setTitle('Başaryla Ayarlandı!')
        .setDescription(`Log kanalı ${logKanal} olarak ayarlandı!`)
        .setColor('Green')
        .setTimestamp()
        .setFooter({ text: `${guild.name}`, iconURL: guild.iconURL() })

    await interaction.reply({ embeds: [mzrEmbed], ephemeral: false });

    mzrdb.set(`mzrhgbbLog.${guild.id}`, logKanal.id);
    },
};