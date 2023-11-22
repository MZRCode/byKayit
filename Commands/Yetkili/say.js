const { ChatInputCommandInteraction, SlashCommandBuilder, EmbedBuilder, PermissionFlagsBits, Client, ChannelType } = require('discord.js');
const mzrdb = require('croxydb');

module.exports = {
    data: new SlashCommandBuilder()
    .setName('say')
    .setDescription('Sunucudaki Sayı Verilerini Elde Edersiniz')
    .setDefaultMemberPermissions(PermissionFlagsBits.ManageNicknames)
    .setDMPermission(false),
    /**
     * @param {ChatInputCommandInteraction} interaction
     * @param {Client} client
     */
    async execute(interaction, client) {
        const { user, guild } = interaction;
        const üyecik = guild.members.cache;
        const kayıtlıRol = mzrdb.get(`mzrkayıtlıRol.${guild.id}`) || 0;
        const kayıtlıÜyeSayısı = guild.roles.cache.get(kayıtlıRol).members.size;
        const insan = üyecik.filter(üye => !üye.user.bot).size;
        const bot = üyecik.filter(bot => bot.user.bot).size;
        const kayıtsızÜyeSayısı = insan - kayıtlıÜyeSayısı;
        const boosySayısı = guild.premiumSubscriptionCount;

        const mzrEmbed = new EmbedBuilder()
        .setTitle('Sunucu Verileri')
        .setDescription(`- **Toplam Üye Sayısı:** ${guild.memberCount}\n- **Toplam Kayıtlı Üye Sayısı:** ${kayıtlıÜyeSayısı}\n- **Toplam Kayıtsız Üye Sayısı:** ${kayıtsızÜyeSayısı}\n- **Toplam Bot Sayısı:** ${bot}\n- **Boost Sayısı:** ${boosySayısı}`)
        .setThumbnail(guild.iconURL())
        .setColor('Green')
        .setTimestamp()
        .setFooter({ text: `${user.username} tarafından istendi.`, iconURL: user.displayAvatarURL() })

        await interaction.reply({ embeds: [mzrEmbed], ephemeral: false });
    },
};