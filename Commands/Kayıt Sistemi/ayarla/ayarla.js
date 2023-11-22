const { SlashCommandBuilder, PermissionFlagsBits, ChannelType } = require('discord.js');

module.exports = {
    data: new SlashCommandBuilder()
    .setName('ayarla')
    .setDescription('Ayarlama Sistemi')
    .setDefaultMemberPermissions(PermissionFlagsBits.ManageRoles)
    .setDMPermission(false)
    .addSubcommand((options) => options
        .setName('kayıtsız')
        .setDescription('Kayıtız Rolünü Ayarlarsınız')
        .addRoleOption(option => option
            .setName('rol')
            .setDescription('Sunucuya girenlere verilecek rol')
            .setRequired(true))
    )
    .addSubcommand((options) => options
    .setName('hg-bb')
    .setDescription('Hoşgeldin - Görüşürüz Kanalını Ayarlarsınız')
    .addChannelOption(option => option
        .setName('kanal')
        .setDescription('HG-BB kanalını etiketleyin')
        .addChannelTypes(ChannelType.GuildText)
        .setRequired(true))
    )
    .addSubcommand((options) => options
    .setName('log-kayıt')
    .setDescription('Kayıt Başvurularının Gönderileceği Kanal')
    .addChannelOption(option => option
        .setName('kanal')
        .setDescription('Başvurular hangi kanala gönderilcek?')
        .addChannelTypes(ChannelType.GuildText)
        .setRequired(true))
    )
    .addSubcommand((options) => options
    .setName('kayıtlı')
    .setDescription('Kayıt Edildikten Sonraki Rolü Ayarlarsınız')
    .addRoleOption(option => option
        .setName('rol')
        .setDescription('Kayıt Edildikten Sonraki Rolü Etiketleyin')
        .setRequired(true))
    )
    .addSubcommand((options) => options
    .setName('yetkili')
    .setDescription('Kayıt Sorumlusu Rolünü Ayarlarsınız')
    .addRoleOption(option => option
        .setName('rol')
        .setDescription('Kayıt Sorumlusu Rolünü Etiketleyin')
        .setRequired(true))
    )
};