const { Client, GatewayIntentBits, Partials, Collection, EmbedBuilder, codeBlock, TextInputBuilder, TextInputStyle, ModalBuilder, ActionRowBuilder, ActionRow, ButtonBuilder, ButtonStyle, PermissionFlagsBits } = require('discord.js');
const mzrdb = require('croxydb');
const mzrdjs = require('mzrdjs');

const client = new Client({
  intents: [
    GatewayIntentBits.Guilds,
    GatewayIntentBits.GuildEmojisAndStickers,
    GatewayIntentBits.GuildIntegrations,
    GatewayIntentBits.GuildInvites,
    GatewayIntentBits.GuildMembers,
    GatewayIntentBits.GuildMessageReactions,
    GatewayIntentBits.GuildMessageTyping,
    GatewayIntentBits.GuildMessages,
    GatewayIntentBits.GuildPresences,
    GatewayIntentBits.GuildScheduledEvents,
    GatewayIntentBits.GuildVoiceStates,
    GatewayIntentBits.GuildWebhooks,
    GatewayIntentBits.DirectMessages,
    GatewayIntentBits.DirectMessageTyping,
    GatewayIntentBits.DirectMessageReactions,
    GatewayIntentBits.MessageContent
  ],
  partials: [
    Partials.User,
    Partials.Message,
    Partials.GuildMember,
    Partials.ThreadMember
  ],
});

client.config = require('./config.json');
client.commands = new Collection();
client.subCommands = new Collection();
client.events = new Collection();

const kayıtModal = new ModalBuilder()
  .setCustomId('mzrkayıtform')
  .setTitle('Aşağıdaki Formu Doldurunuz')
const mzrkayıt1 = new TextInputBuilder()
  .setCustomId('mzrkayıt_isminizne')
  .setLabel('İsminiz Nedir?')
  .setStyle(TextInputStyle.Short)
  .setMinLength(2)
  .setMaxLength(20)
  .setPlaceholder('Kaan')
  .setRequired(true)
const mzrkayıt2 = new TextInputBuilder()
  .setCustomId('mzryasiniz_kac')
  .setLabel('Yaşınız Kaç?')
  .setStyle(TextInputStyle.Short)
  .setMinLength(2)
  .setMaxLength(2)
  .setPlaceholder('16')
  .setRequired(true)

const mzrrow1 = new ActionRowBuilder().addComponents(mzrkayıt1);
const mzrrow2 = new ActionRowBuilder().addComponents(mzrkayıt2);
kayıtModal.addComponents(mzrrow1, mzrrow2);

client.on('interactionCreate', async (interaction) => {
  const { user, customId, message, guild, member, fields } = interaction;

  if (customId === 'mzrkayitol') {
    const kayıtlımı = mzrdb.get(`mzrkayıtGöndermiş.${guild.id}.${user.id}`);
    const yetkili = mzrdb.get(`mzryetkiliRol.${guild.id}`);

    if (kayıtlımı) return interaction.reply({ content: 'Mevcut bir kayıt isteğin var, isteğinin onaylanmasını bekle!', ephemeral: true });
    if (member.roles.cache.has(yetkili) || member.permissions.has(PermissionFlagsBits.Administrator)) return interaction.reply({ content: `Zaten yetkilisiniz, kayıt olamazsınzı!`, ephemeral: true });

    await interaction.showModal(kayıtModal);
  };

  if (customId === 'mzrkayıtform') {
    mzrdb.set(`mzrkayıtGöndermiş.${user.id}`, true);
    const logKanal = mzrdb.get(`mzrkayıtLog.${guild.id}`);
    const log = client.channels.cache.get(logKanal);

    const isimÇıktı = fields.getTextInputValue('mzrkayıt_isminizne')
    const isim = isimÇıktı.charAt(0).toUpperCase() + isimÇıktı.slice(1);
    const yas = fields.getTextInputValue('mzryasiniz_kac');
    mzrdb.set(`mzrkullanıcıAdı.${user.id}`, `${isim} ${yas}`);

    if (isNaN(yas)) {
      return interaction.reply({ content: 'Yaşın bir sayı olmalıdır! Benimi kandırmaya çalışıyon?', ephemeral: true })
    };

    if (yas) {
      if (yas < 13) {
        return interaction.reply({ content: 'En az **13** yaşında olman gerekiyor, **13** yaşın altı discord kurallarına aykırı!', ephemeral: true })
      };

      if (yas >= 50) {
        return interaction.reply({ content: '**50** Yaşının üstünde olupda discordmu kullanıyorsun gerçekten? Dışarı çık, nefes al, spor yap.', ephemeral: true })
      };
    };

    if (!isNaN(isim)) {
      return interaction.reply({ content: 'İsmin harflerden oluşmalıdır, rakamlardan değil! Benimi kandırmaya çalışıyon?', ephemeral: true })
    };

    const mzrButton = new ActionRowBuilder().addComponents(
      new ButtonBuilder()
        .setLabel('Kaydet')
        .setCustomId('mzrkayıtkaydet')
        .setEmoji('<:yes:1140945399323045928>')
        .setStyle(ButtonStyle.Success))

      .addComponents(
        new ButtonBuilder()
          .setLabel('Reddet')
          .setCustomId('mzrkayıtreddet')
          .setEmoji('<:no:1140945401357287515>')
          .setStyle(ButtonStyle.Danger))

      .addComponents(
        new ButtonBuilder()
          .setLabel('Banla')
          .setCustomId('mzrbanla')
          .setEmoji('<:bans:1157018539102838935>')
          .setStyle(ButtonStyle.Secondary))

      .addComponents(
        new ButtonBuilder()
          .setLabel('Kickle')
          .setCustomId('mzrkickle')
          .setEmoji('<:leave:1152004114713169940>')
          .setStyle(ButtonStyle.Secondary))

    const mzrEmbed = new EmbedBuilder()
      .setTitle('Yeni bir kayıt başvurusu geldi!')
      .setDescription(`${user} isimli üye, adının **${isim}** olduğunu ve yaşının **${yas}** olduğunu söyledi.`)
      .setColor('Blurple')
      .setTimestamp()
      .setFooter({ text: `${user.id}`, iconURL: user.displayAvatarURL() })

    await interaction.reply({ content: 'Kayıt başvurun başarıyla gönderildi!', ephemeral: true })
    await log.send({ embeds: [mzrEmbed], components: [mzrButton] })
  };

  if (customId === 'mzrkayıtkaydet') {
    const yetkili = mzrdb.get(`mzryetkiliRol.${guild.id}`);

    if (!member.roles.cache.has(yetkili)) return interaction.reply({ content: `Bu butonu sadece <@&${yetkili}> rolünde olan kayıt sorumluları kullanabilir.`, ephemeral: true });

    const id = message.embeds[0].footer.text;
    const açıklama = message.embeds[0].description;
    const üye = guild.members.cache.get(id);
    const kayıtlı = mzrdb.get(`mzrkayıtlıRol.${guild.id}`);
    const kayıtsız = mzrdb.get(`mzrkayıtsızRol.${guild.id}`);
    const isim = mzrdb.get(`mzrkullanıcıAdı.${id}`);

    const mzrButton = new ActionRowBuilder().addComponents(
      new ButtonBuilder()
        .setLabel('Kaydet')
        .setCustomId('mzrkayıtkaydet')
        .setDisabled(true)
        .setEmoji('<:yes:1140945399323045928>')
        .setStyle(ButtonStyle.Success))

      .addComponents(
        new ButtonBuilder()
          .setLabel('Reddet')
          .setDisabled(true)
          .setCustomId('mzrkayıtreddet')
          .setEmoji('<:no:1140945401357287515>')
          .setStyle(ButtonStyle.Danger))

      .addComponents(
        new ButtonBuilder()
          .setLabel('Banla')
          .setDisabled(true)
          .setCustomId('mzrbanla')
          .setEmoji('<:bans:1157018539102838935>')
          .setStyle(ButtonStyle.Secondary))

      .addComponents(
        new ButtonBuilder()
          .setLabel('Kickle')
          .setDisabled(true)
          .setCustomId('mzrkickle')
          .setEmoji('<:leave:1152004114713169940>')
          .setStyle(ButtonStyle.Secondary))

    const mzrEmbed = new EmbedBuilder()
      .setTitle('Kaydola İsteği Kabul Edildi!')
      .setDescription(açıklama)
      .setColor('Green')
      .setTimestamp()
      .setFooter({ text: `${üye.user.username}`, iconURL: üye.displayAvatarURL() })

    mzrdb.delete(`mzrkayıtGöndermiş.${guild.id}.${id}`);
    mzrdb.delete(`mzrkullanıcıAdı.${id}`);
    mzrdb.add(`mzryetkiliKayıt.${user.id}`, 1);
    await interaction.update({ embeds: [mzrEmbed], components: [mzrButton] });
    await üye.setNickname(isim).catch(() => { return interaction.channel.send({ content: 'Rolümü üst rollere koymalısın!' }) });
    await üye.send({ content: `**${guild.name}** sunucusuna katılıp kayıt olduğun için teşekkürler! <:kalps:1133329352193495190>` }).catch(() => { return interaction.channel.send({ content: `**${üye.user.username}** isimli üyenin DM'leri kapalı!` }) });
    await üye.roles.add(kayıtlı);
    await üye.roles.remove(kayıtsız);
  };

  if (customId === 'mzrkayıtreddet') {
    const yetkili = mzrdb.get(`mzryetkiliRol.${guild.id}`);

    if (!member.roles.cache.has(yetkili)) return interaction.reply({ content: `Bu butonu sadece <@&${yetkili}> rolünde olan kayıt sorumluları kullanabilir.`, ephemeral: true });

    const id = message.embeds[0].footer.text;
    const açıklama = message.embeds[0].description;
    const üye = guild.members.cache.get(id);

    const mzrButton = new ActionRowBuilder().addComponents(
      new ButtonBuilder()
        .setLabel('Kaydet')
        .setCustomId('mzrkayıtkaydet')
        .setDisabled(true)
        .setEmoji('<:yes:1140945399323045928>')
        .setStyle(ButtonStyle.Success))

      .addComponents(
        new ButtonBuilder()
          .setLabel('Reddet')
          .setDisabled(true)
          .setCustomId('mzrkayıtreddet')
          .setEmoji('<:no:1140945401357287515>')
          .setStyle(ButtonStyle.Danger))

      .addComponents(
        new ButtonBuilder()
          .setLabel('Banla')
          .setCustomId('mzrbanla')
          .setEmoji('<:bans:1157018539102838935>')
          .setStyle(ButtonStyle.Secondary))

      .addComponents(
        new ButtonBuilder()
          .setLabel('Kickle')
          .setCustomId('mzrkickle')
          .setEmoji('<:leave:1152004114713169940>')
          .setStyle(ButtonStyle.Secondary))

    const mzrEmbed = new EmbedBuilder()
      .setTitle('Kaydolma İsteği Reddedildi!')
      .setDescription(açıklama)
      .setColor('Red')
      .setTimestamp()
      .setFooter({ text: `${üye.user.id}`, iconURL: üye.displayAvatarURL() })

    mzrdb.delete(`mzrkayıtGöndermiş.${guild.id}.${id}`);
    await interaction.update({ embeds: [mzrEmbed], components: [mzrButton] });
    await üye.send({ content: `**${guild.name}** sunucusunda attığın **Kaydolma** isteği, yetkili tarafından reddedildi! 😢` }).catch(() => { return interaction.channel.send({ content: `**${üye.user.username}** isimli üyenin DM'leri kapalı!` }) });
  };

  if (customId === 'mzrbanla') {
    if (!member.permissions.has(PermissionFlagsBits.BanMembers)) return interaction.reply({ content: `Bu butonu sadece **Üyeleri Banla** yetkisine sahip olan yetkililer kullanabilir.`, ephemeral: true });

    const id = message.embeds[0].footer.text;
    const üye = guild.members.cache.get(id);

    üye.ban({ reason: 'Kayıt Sisteminde Banla Butonuna Tıklandı!' });

    const mzrButton = new ActionRowBuilder().addComponents(
      new ButtonBuilder()
        .setLabel('Kaydet')
        .setCustomId('mzrkayıtkaydet')
        .setDisabled(true)
        .setEmoji('<:yes:1140945399323045928>')
        .setStyle(ButtonStyle.Success))

      .addComponents(
        new ButtonBuilder()
          .setLabel('Reddet')
          .setDisabled(true)
          .setCustomId('mzrkayıtreddet')
          .setEmoji('<:no:1140945401357287515>')
          .setStyle(ButtonStyle.Danger))

      .addComponents(
        new ButtonBuilder()
          .setLabel('Banla')
          .setDisabled(true)
          .setCustomId('mzrbanla')
          .setEmoji('<:bans:1157018539102838935>')
          .setStyle(ButtonStyle.Secondary))

      .addComponents(
        new ButtonBuilder()
          .setLabel('Kickle')
          .setDisabled(true)
          .setCustomId('mzrkickle')
          .setEmoji('<:leave:1152004114713169940>')
          .setStyle(ButtonStyle.Secondary))

    mzrdb.delete(`mzrkayıtGöndermiş.${guild.id}.${id}`);
    await interaction.update({ components: [mzrButton] });
  };

  if (customId === 'mzrkickle') {
    if (!member.permissions.has(PermissionFlagsBits.KickMembers)) return interaction.reply({ content: `Bu butonu sadece **Üyeleri At** yetkisine sahip olan yetkililer kullanabilir.`, ephemeral: true });
    const id = message.embeds[0].footer.text;
    const üye = guild.members.cache.get(id);

    üye.kick({ reason: 'Kayıt Sisteminde Kickle Butonuna Tıklandı!' });

    const mzrButton = new ActionRowBuilder().addComponents(
      new ButtonBuilder()
        .setLabel('Kaydet')
        .setCustomId('mzrkayıtkaydet')
        .setDisabled(true)
        .setEmoji('<:yes:1140945399323045928>')
        .setStyle(ButtonStyle.Success))

      .addComponents(
        new ButtonBuilder()
          .setLabel('Reddet')
          .setDisabled(true)
          .setCustomId('mzrkayıtreddet')
          .setEmoji('<:no:1140945401357287515>')
          .setStyle(ButtonStyle.Danger))

      .addComponents(
        new ButtonBuilder()
          .setLabel('Banla')
          .setDisabled(true)
          .setCustomId('mzrbanla')
          .setEmoji('<:bans:1157018539102838935>')
          .setStyle(ButtonStyle.Secondary))

      .addComponents(
        new ButtonBuilder()
          .setLabel('Kickle')
          .setDisabled(true)
          .setCustomId('mzrkickle')
          .setEmoji('<:leave:1152004114713169940>')
          .setStyle(ButtonStyle.Secondary))

    mzrdb.delete(`mzrkayıtGöndermiş.${guild.id}.${id}`);
    await interaction.update({ components: [mzrButton] });
  };
});

client.login(client.config.token);






















































// YouTube: @MZRDev tarafından yapılmıştır. Satılması, paylaşılması tamamen yasaktır!
