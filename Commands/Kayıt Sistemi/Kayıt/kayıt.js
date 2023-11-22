const { SlashCommandBuilder, PermissionFlagsBits, ChannelType } = require('discord.js');

module.exports = {
    data: new SlashCommandBuilder()
    .setName('kayıt')
    .setDescription('Kayıt Sistemi')
    .setDefaultMemberPermissions(PermissionFlagsBits.ViewAuditLog)
    .setDMPermission(false)
    .addSubcommand((options) => options
        .setName('sayı')
        .setDescription('Etiiketlediğiniz yetkilinin ne kadar kayıt yaptığını görürsünüz.')
        .addUserOption(option => option
            .setName('yetkili')
            .setDescription('Bakcağınız yetkiliyi etiketleyin')
            .setRequired(false))
    )
    .addSubcommand((options) => options
        .setName('mesaj-gönder')
        .setDescription('Etiiketlediğiniz kanala sabit olan bir Kayıt Olma butonu gönderir.')
        .addChannelOption(option => option
            .setName('kanal')
            .addChannelTypes(ChannelType.GuildText)
            .setDescription('Butonun gönderileceği kanalı etiketleyin')
            .setRequired(false))
    )
};