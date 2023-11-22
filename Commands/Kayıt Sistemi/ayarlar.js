const { ChatInputCommandInteraction, SlashCommandBuilder, Client, PermissionFlagsBits, EmbedBuilder } = require('discord.js');
const mzrdb = require('croxydb');

module.exports = {
    data: new SlashCommandBuilder()
    .setName('ayarlar')
    .setDescription('Ayarlarını Gösterir')
    .setDefaultMemberPermissions(PermissionFlagsBits.Administrator),
    /**
     * 
     * @param {ChatInputCommandInteraction} interaction 
     * @param {Client} client 
     */
    async execute(interaction, client) {
        const { guild, user } = interaction;

        const kayıtsızRolu = mzrdb.get(`mzrkayıtsızRol.${guild.id}`);
        const hgbbKanalı = mzrdb.get(`mzrhgbbLog.${guild.id}`);
        const kayıtLogu = mzrdb.get(`mzrkayıtLog.${guild.id}`);

        const mzrEmbed = new EmbedBuilder()
            .setAuthor({ name: guild.name, iconURL: guild.iconURL() || 'https://cdn.discordapp.com/emojis/1119027206908284948.gif' })
            .setTitle('Sunucu Ayarları')
            .setColor('Green')
            .setFooter({ text: user.username, iconURL: user.displayAvatarURL() })
            .setTimestamp();

        const kayıtsızRol = guild.roles.cache.get(kayıtsızRolu);
        if (kayıtsızRolu) {
            mzrEmbed.addFields({ name: '👤 Kayıtsız Rolü', value: kayıtsızRol.toString() + '(<:acik:1156338263733313597>)', inline: true });
        } else {
            mzrEmbed.addFields({ name: '👤 Kayıtsız Rolü', value: 'Kapalı (<:kapali:1156339446820638852>)', inline: true });
        };

        const hgbbKanal = guild.channels.cache.get(hgbbKanalı);
        if (hgbbKanalı) {
            mzrEmbed.addFields({ name: '🗨 HG-BB Kanalı', value: hgbbKanal.toString() + '(<:acik:1156338263733313597>)', inline: true });
        } else {
            mzrEmbed.addFields({ name: '🗨 HG-BB Kanalı', value: 'Kapalı (<:kapali:1156339446820638852>)', inline: true });
        };

        const kayıtLog = guild.channels.cache.get(hgbbKanalı);
        if (kayıtLogu) {
            mzrEmbed.addFields({ name: '🗨 Kayıt Log Kanalı', value: kayıtLog.toString() + '(<:acik:1156338263733313597>)', inline: true });
        } else {
            mzrEmbed.addFields({ name: '🗨 Kayıt Log Kanalı', value: 'Kapalı (<:kapali:1156339446820638852>)', inline: true });
        };

        await interaction.reply({ embeds: [mzrEmbed], ephemeral: false });
    },
};