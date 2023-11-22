const { ChatInputCommandInteraction, EmbedBuilder } = require('discord.js');
const mzrdb = require('croxydb');

module.exports = {
    subCommand: 'kayıt.sayı',
    /**
     * @param {ChatInputCommandInteraction} interaction
     * @param {Client} client
     */
    async execute(interaction, client) {
    const { options, member } = interaction;
    const yetkili = options.getMember('yetkili') || member;

    const kayıtMiktar = mzrdb.get(`mzryetkiliKayıt.${yetkili.id}`) || 0;

    const mzrEmbed = new EmbedBuilder()
        .setTitle('Kayıt Miktarı')
        .setDescription(`${yetkili} isimli yetkilinin toplam **${kayıtMiktar}** kaydetme işlemi bulunuyor.`)
        .setColor('Blurple')
        .setTimestamp()
        .setFooter({ text: `${yetkili.user.username}`, iconURL: yetkili.displayAvatarURL() })

    await interaction.reply({ embeds: [mzrEmbed], ephemeral: false });
    },
};