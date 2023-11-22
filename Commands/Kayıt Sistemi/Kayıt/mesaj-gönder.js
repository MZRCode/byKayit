const { ChatInputCommandInteraction, EmbedBuilder, ActionRowBuilder, ButtonBuilder, ButtonStyle } = require('discord.js');
const mzrdb = require('croxydb');

module.exports = {
    subCommand: 'kayıt.mesaj-gönder',
    /**
     * @param {ChatInputCommandInteraction} interaction
     * @param {Client} client
     */
    async execute(interaction, client) {
    const { options, channel, user, guild } = interaction;
    const kanal = options.getChannel('kanal') || channel;

    const mzrButton = new ActionRowBuilder().addComponents(
        new ButtonBuilder()
        .setLabel('Kayıt Ol')
        .setEmoji('🧾')
        .setCustomId('mzrkayitol')
        .setStyle(ButtonStyle.Success))

    const mzrEmbed = new EmbedBuilder()
        .setTitle('Kayıt Sistemi 👤')
        .setDescription(`Kayıt isteği göndermek için aşağıdaki **Kayıt Ol** butonuna tıklayarak göndere bilirsiniz.`)
        .setThumbnail(guild.iconURL())
        .setColor('Green')
        .setTimestamp()
        .setFooter({ text: `${user.username}`, iconURL: user.displayAvatarURL() })

    await kanal.send({ embeds: [mzrEmbed], components: [mzrButton], ephemeral: false });
    await interaction.reply({ content: 'Mesaj başarıyla gönderildi!', ephemeral: true })
    mzrdb.set(`mzrkayıtKanalı.${guild.id}`, kanal.id);
    },
};