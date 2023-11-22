const { GuildMember, EmbedBuilder } = require("discord.js");
const mzr = require('mzrdjs');
const mzrdb = require('croxydb');

module.exports = {
    name: "guildMemberRemove",
    /**
     * 
     * @param {GuildMember} member 
     */
    async execute(member, client) {
        const log = mzrdb.get(`mzrLogKanal.${member.guild.id}`);
        const logKanal = member.guild.channels.cache.get(log);
        if (!logKanal) return;

        const hesapOluşturulma = mzr.timestamp(member.user.createdTimestamp);

        const Embed = new EmbedBuilder()
            .setAuthor({ name: `${member.user.username}`, iconURL: member.displayAvatarURL(), url: `https://discord.com/users/${member.id}` })
            .setThumbnail(member.user.displayAvatarURL())
            .setDescription(`- **${member}** sunucudan ayrıldı, onunla birlikte artk **${member.guild.memberCount}** kişi kaldık.\n- Kullanıcı Adı: **${member.user.username}**\n- Kullanıcı ID: **${member.user.id}**\n- Hesap Oluşturulma Tarihi: <t:${hesapOluşturulma}:R>`)
            .setColor('Red')
            .setTimestamp()
            .setFooter({ text: 'Sunucudan Ayrıldı', iconURL: member.guild.iconURL() })

        logKanal.send({ embeds: [Embed] }).catch(() => { });
    },
};