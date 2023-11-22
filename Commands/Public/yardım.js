const { ChatInputCommandInteraction, SlashCommandBuilder, Client, EmbedBuilder } = require('discord.js');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('yardım')
        .setDescription('Yardım Menüsünü Gösterir'),
    /**
     * @param {Client} client
     * @param {ChatInputCommandInteraction} interaction 
     */
    execute(interaction, client) {
        const embed = new EmbedBuilder()
            .setAuthor({ name: 'Altyapının Sahibi: MZR Development', iconURL: client.user.displayAvatarURL(), url: 'https://discord.gg/ktVdQYrtXF' })
            .addFields(
                {
                    name: 'Yetkili Komutlarım',
                    value: `⚙ **/ayarla hg-bb**
Hoş geldin - görüşürüz kanalını kurarsınız.

⚙ **/ayarla kayıtlı**
Kayıtlı olarak verilecek rolü ayarlarsınız.

⚙ **/ayarla kayıtsız**
Kayıtsız olarak verilecek rolü ayarlarsınız.

⚙ **/ayarla log-kayıt**
Başvuru kayıt log kanalını ayarlarsınız.

⚙ **/ayarla yetkili**
Kayıt yapabilecek başvuru yetkilisini ayarlarsınız.

⚙ **/ayarlar**
Kayıt ayarlarını görüntülersiniz.

⚙ **/kayıt mesaj-gönder**
Kayıt Olma formunu gönderir.

⚙ **/kayıt sayı**
Bir yetkilinin ya da senin kaç kişiyi kaydettiğini görürsün.

⚙ **/isim-değiştir**
Üyenin ismini değiştirirsiniz.`,
                    inline: true
                },
                {
                    name: 'Kullanıcı Komutlarım',
                    value: `👤 **/say**
Sunucu verilerini görüntülersiniz.

👤 **/yardım**
Yardım menüsünü gösterir.

👤 **/ping**
Botun pingini gösterir.

👤 **/invite**
Botu davet edersiniz ve destek sunucusuna katılabilirsiniz.`,
                    inline: true
                },
            )
            .setColor('Blurple')
        interaction.reply({ embeds: [embed], ephemeral: true });

    }

}
