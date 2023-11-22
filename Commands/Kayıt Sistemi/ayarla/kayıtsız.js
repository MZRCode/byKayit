const { ChatInputCommandInteraction, EmbedBuilder } = require('discord.js');
const mzrdb = require('croxydb');

module.exports = {
    subCommand: 'ayarla.kayıtsız',
    /**
     * @param {ChatInputCommandInteraction} interaction
     * @param {Client} client
     */
    async execute(interaction, client) {
    const { guild, options } = interaction;
    const kayıtsızRol = options.getRole('rol');

    const mzrEmbed = new EmbedBuilder()
        .setTitle('Başaryla Ayarlandı!')
        .setDescription(`Kayıtsız rolü ${kayıtsızRol} olarak ayarlandı!`)
        .setColor('Green')
        .setTimestamp()
        .setFooter({ text: `${guild.name}`, iconURL: guild.iconURL() })

    await interaction.reply({ embeds: [mzrEmbed], ephemeral: false });

    mzrdb.set(`mzrkayıtsızRol.${guild.id}`, kayıtsızRol.id);
    },
};