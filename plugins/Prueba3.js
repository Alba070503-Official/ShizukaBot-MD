import fs from 'fs';

let handler = async (m, { conn, usedPrefix, text, args, command }) => {
    let uniqueUsers = new Map();
    let users = [...uniqueUsers.values()];
    let totalUsers = users.length;
    let totalusr = Object.keys(global.db.data.users).length;
    let rtotal = Object.entries(global.db.data.users).length || '0';
    let _uptime = process.uptime() * 1000;
    let uptime = clockString(_uptime);
    let username = conn.getName(m.sender);
    let name = conn.getName(m.sender);
    let locale = 'es';
    let d = new Date(new Date() + 3600000);
    let time = d.toLocaleTimeString(locale, {
        hour: 'numeric',
        minute: 'numeric',
        second: 'numeric',
    });

    let totalreg = Object.keys(global.db.data.users).length;
    let rtotalreg = Object.values(global.db.data.users).filter(user => user.registered == true).length;

    m.react("🐢");

    let txt =  ` ʜᴏʟᴀ ${name} 🐢 \n`;
    txt+= ' .͜°˖ `ᴄʀᴇᴀᴅᴏʀ ::`' + ` DevDiego\n`;
    txt+= ' .͜°˖ `ʙᴏᴛ ::`' + ` YaemoriBot-MD\n`;
    txt+= ' .͜°˖ `ꜰᴇᴄʜᴀ ::`' + ` ${moment.tz('America/Bogota').format('DD/MM/YY')}\n`;
    txt+= ' .͜°˖ `ᴘʀᴇꜰɪᴊᴏ ::`' + ` 「 ${usedPrefix} 」\n`;
    txt+= ' .͜°˖ `ᴜꜱᴜᴀʀɪᴏꜱ ::`' + ` ${rtotal}\n`;
    txt+= ' .͜°˖ `ᴀᴄᴛɪᴠᴏ ::`' + ` ${uptime}\n`;

    const buttons = [
        { buttonId: `#allmenu`, buttonText: { displayText: 'Menú Completo' }, type: 1 },
        { buttonId: `#hornymenu`, buttonText: { displayText: 'Menú +18' }, type: 1 },
        { buttonId: `#sc`, buttonText: { displayText: 'GitHub del Bot' }, type: 1 },
        { buttonId: `#speed`, buttonText: { displayText: 'Velocidad del Bot' }, type: 1 },
        { buttonId: `#serbot`, buttonText: { displayText: 'Ser SubBot por QR' }, type: 1 },
        { buttonId: `#bots`, buttonText: { displayText: 'SubBots Activos' }, type: 1 },
    ];

    let buttonMessage = {
        contentText: txt,
        footerText: 'Selecciona una opción del menú',
        buttons: buttons,
        headerType: 1
    };

    await conn.sendMessage(m.chat, buttonMessage, { quoted: m });
};

handler.tags = ['main'];
handler.help = ['menu'];
handler.command = ["menu", "help", "menú"];

export default handler;

function clockString(ms) {
  const h = Math.floor(ms / 3600000);
  const m = Math.floor(ms / 60000) % 60;
  const s = Math.floor(ms / 1000) % 60;
  return [h, m, s].map(v => v.toString().padStart(2, 0)).join(":");
}
