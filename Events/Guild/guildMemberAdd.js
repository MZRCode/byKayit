const { GuildMember, EmbedBuilder } = require("discord.js");
const mzrdb = require('croxydb');
const mzr = require('mzrdjs');

module.exports = {
    name: "guildMemberAdd",
    once: false,
    /**
     * @param {GuildMember} member 
     */
    async execute(member, client) {
        let verilcekRol = mzrdb.get(`mzrkayıtsızRol.${member.guild.id}`);

        if (verilcekRol) {
            await member.roles.add(verilcekRol).catch(() => { verilcekRol = "**Rolümü daha üste koymazsan rol veremem!**" });
        };

        const log = mzrdb.get(`mzrhgbbLog.${member.guild.id}`);
        const kayıt = mzrdb.get(`mzrkayıtKanalı.${member.guild.id}`);
        const logKanal = member.guild.channels.cache.get(log);
        const kayıtKanal = member.guild.channels.cache.get(kayıt);
        if (!log) return;
        if (!kayıt) return;

        const oluşturulmaTarihi = mzr.timestamp(member.user.createdTimestamp);

        if (verilcekRol) {
            verilcekRol = `<@&${verilcekRol}>`;
        } else {
            verilcekRol = '**Rol Kaydedilmemiş!**'
        };

        const mzrEmbed = new EmbedBuilder()
            .setAuthor({ name: `${member.user.username}`, iconURL: member.displayAvatarURL(), url: `https://discord.com/users/${member.id}` })
            .setThumbnail(member.user.displayAvatarURL())
            .setDescription(`- **${member}** sunucuya giriş yaptı, onunla birlikte artk **${member.guild.memberCount}** kişi olduk.\n- Verilen Rol: ${verilcekRol}\n- Hesap Oluşturulma Tarihi: <t:${oluşturulmaTarihi}:R>`)
            .setColor('Green')
            .setTimestamp()
            .setFooter({ text: 'Sunucuya Katıldı', iconURL: member.guild.iconURL() })

        await logKanal.send({ embeds: [mzrEmbed] });
        const mzrKayıt = await kayıtKanal.send({ content: `${member}` });

        setTimeout(async () => {
            await mzrKayıt.delete();
        }, 1000);
    },
};