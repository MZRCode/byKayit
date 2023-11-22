const { ChatInputCommandInteraction, EmbedBuilder } = require('discord.js');
const mzrdb = require('croxydb');

module.exports = {
    subCommand: 'ayarla.yetkili',
    /**
     * @param {ChatInputCommandInteraction} interaction
     * @param {Client} client
     */
    async execute(interaction, client) {
    const { guild, options } = interaction;
    const yetkiliRol = options.getRole('rol');

    const mzrEmbed = new EmbedBuilder()
        .setTitle('Başaryla Ayarlandı!')
        .setDescription(`Yetkili rolü ${yetkiliRol} olarak ayarlandı!`)
        .setColor('Green')
        .setTimestamp()
        .setFooter({ text: `${guild.name}`, iconURL: guild.iconURL() })

    await interaction.reply({ embeds: [mzrEmbed], ephemeral: false });

    mzrdb.set(`mzryetkiliRol.${guild.id}`, yetkiliRol.id);
    },
};