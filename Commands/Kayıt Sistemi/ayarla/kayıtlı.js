const { ChatInputCommandInteraction, EmbedBuilder } = require('discord.js');
const mzrdb = require('croxydb');

module.exports = {
    subCommand: 'ayarla.kayıtlı',
    /**
     * @param {ChatInputCommandInteraction} interaction
     * @param {Client} client
     */
    async execute(interaction, client) {
    const { guild, options } = interaction;
    const kayıtlıRol = options.getRole('rol');

    const mzrEmbed = new EmbedBuilder()
        .setTitle('Başaryla Ayarlandı!')
        .setDescription(`Kayıtlı rolü ${kayıtlıRol} olarak ayarlandı!`)
        .setColor('Green')
        .setTimestamp()
        .setFooter({ text: `${guild.name}`, iconURL: guild.iconURL() })

    await interaction.reply({ embeds: [mzrEmbed], ephemeral: false });

    mzrdb.set(`mzrkayıtlıRol.${guild.id}`, kayıtlıRol.id);
    },
};