const { ChatInputCommandInteraction, EmbedBuilder } = require('discord.js');
const mzrdb = require('croxydb');

module.exports = {
    subCommand: 'ayarla.log-kayıt',
    /**
     * @param {ChatInputCommandInteraction} interaction
     * @param {Client} client
     */
    async execute(interaction, client) {
    const { guild, options } = interaction;
    const yetkiliLog = options.getChannel('kanal');

    const mzrEmbed = new EmbedBuilder()
        .setTitle('Başaryla Ayarlandı!')
        .setDescription(`Gelen kayıt başvuruları artık ${yetkiliLog} kanalına gönderilecek!`)
        .setColor('Green')
        .setTimestamp()
        .setFooter({ text: `${guild.name}`, iconURL: guild.iconURL() })

    await interaction.reply({ embeds: [mzrEmbed], ephemeral: false });

    mzrdb.set(`mzrkayıtLog.${guild.id}`, yetkiliLog.id);
    },
};