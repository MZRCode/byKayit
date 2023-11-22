const { ChatInputCommandInteraction, SlashCommandBuilder, EmbedBuilder, PermissionFlagsBits, Client } = require('discord.js');

module.exports = {
    data: new SlashCommandBuilder()
    .setName('isim-değiştir')
    .setDescription('Etiketlediğiniz kullanıcının ismini değiştirirsiniz.')
    .setDefaultMemberPermissions(PermissionFlagsBits.ManageNicknames)
    .setDMPermission(false)
    .addUserOption(option => option
        .setName('kullanıcı')
        .setDescription('İsmini değiştirceğiniz kullanıcıyı etiketleyin')
        .setRequired(true))
    .addStringOption(option => option
        .setName('yeni-isim')
        .setDescription('Kullanıcının yeni olacak ismini yazınız')
        .setRequired(true)),
    /**
     * @param {ChatInputCommandInteraction} interaction
     * @param {Client} client
     */
    async execute(interaction, client) {
        const { user, options } = interaction;

        const üye = options.getMember('kullanıcı');
        const isim = options.getString('yeni-isim');

        üye.setNickname(isim);

        const mzrEmbed = new EmbedBuilder()
        .setTitle('Başarıyla İsim Değiştirildi!')
        .setDescription(`- **${üye.user.username}** isimli üyenin nicki **${isim}** olarak değiştirildi!\n- **Eski ismi:** ${üye.displayName}\n- **Yeni ismi:** ${isim}`)
        .setColor('Green')
        .setTimestamp()
        .setFooter({ text: `${üye.user.username}`, iconURL: üye.displayAvatarURL() })

        await interaction.reply({ embeds: [mzrEmbed], ephemeral: false });
    },
};