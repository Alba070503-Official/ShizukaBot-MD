let handler = async (m, { conn, usedPrefix, text, args, command }) => {
  let totalusr = Object.keys(global.db.data.users).length;
  let _uptime = process.uptime() * 1000;
  let uptime = clockString(_uptime);
  let username = conn.getName(m.sender);
  let locale = 'es';
  let d = new Date(new Date + 3600000);
  let time = d.toLocaleTimeString(locale, {
    hour: 'numeric',
    minute: 'numeric',
    second: 'numeric'
  });

  await conn.reply(m.chat, '⏱ _Cargando Menu_', m);
  m.react("✨");

  let sbot = conn.user.jid == global.conn.user.jid ? "" : `Sᴏʏ Sᴜʙʙᴏᴛ Dᴇ:  Wa.me/${global.conn.user.jid.split`@`[0]}`;

  global.fcontact = {
    key: {
      fromMe: false,
      participant: `0@s.whatsapp.net`,
      remoteJid: "status@broadcast",
    },
    message: {
      contactMessage: {
        vcard: `BEGIN:VCARD\nVERSION:3.0\nN:;a,;;;\nFN:${username}\nitem1.TEL;waid=${m.sender.split("@")[0]}:${m.sender.split("@")[0]}\nitem1.X-ABLabel:Ponsel\nEND:VCARD`,
      },
    },
  };

  let menu2 = `
*╭─╮︹︹︹⊹︹︹︹⊹︹︹︹⊹*
*┆  ${username}*
*╰─ ⊹꒦꒷꒦꒷꒦꒷꒦꒷꒦꒷꒦꒷꒦꒷꒦꒷꒦⊹*

╭─╮︹︹︹⊹︹︹︹⊹︹︹︹⊹─╮
┆   *🌹 ɪɴғᴏ  ᴅᴇ ʟᴀ ʙᴏᴛ 🍒*
┝╾─────────────────╯
┆⏱ *𝘓𝘭𝘦𝘷𝘰 𝘈𝘤𝘵𝘪𝘷o: ${uptime}*
┆Este menu esta en fase prueba 
╰ׄ┄ׅׄ─ׅׄ┄ׅׄ─ׂׅ┄ׅׄ─ׂׅ┄ׅׄ─ׅׄ┄ׅׄ─ׂׅ┄ׅׄ─ׂׅ┄ׅׄ─ׅׄ─ׂׅ┄ׅׄ─ׂ╯`;

  let listSections = [{
    title: '',
    rows: [
      { title: "Menu Completo", rowId: `${usedPrefix}menu`, description: "Para ver todos los comandos" },
      { title: "SerBot", rowId: `${usedPrefix}serbot --code`, description: "Para volverte subbot 🤖" },
      { title: "Velocidad", rowId: `${usedPrefix}ping`, description: "Ver velocidad del bot" },
      { title: "Play", rowId: `${usedPrefix}play`, description: "Para descargar música 🎧" },
      { title: "Creador", rowId: `${usedPrefix}owner`, description: "Comunícate con mi creador ⚙️" }
    ]
  }];

  let img = "https://i.ibb.co/wstbFdW/file.jpg"; // Ejemplo de una de las imágenes
  let greeting = getGreeting();

  await conn.sendList(m.chat, greeting, menu2, `Click Aquí`, [img], listSections);
};

handler.command = ["menu"];
export default handler;

function clockString(ms) {
  const h = Math.floor(ms / 3600000);
  const m = Math.floor(ms / 60000) % 60;
  const s = Math.floor(ms / 1000) % 60;
  return [h, m, s].map((v) => v.toString().padStart(2, 0)).join(":");
}

function getGreeting() {
  let hour = new Date().getHours();
  switch (true) {
    case (hour >= 0 && hour < 6):
      return 'Bᴜᴇɴᴀs Nᴏᴄʜᴇs 🌙';
    case (hour >= 6 && hour < 12):
      return 'Bᴜᴇɴᴏs Dɪᴀs 🌅';
    case (hour >= 12 && hour < 18):
      return 'Bᴜᴇɴᴀs Tᴀʀᴅᴇs 🌇';
    default:
      return 'Bᴜᴇɴᴀs Nᴏᴄʜᴇs 🌙';
  }
}
