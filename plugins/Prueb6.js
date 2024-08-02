import fs from 'fs';
import path from 'path';

let handler = async (m, { conn, usedPrefix }) => {
    let totalusr = Object.keys(global.db.data.users).length;
    let _uptime = process.uptime() * 1000;
    let uptime = clockString(_uptime);
    let username = conn.getName(m.sender);
    let locale = 'es';
    let d = new Date(new Date() + 3600000);
    let time = d.toLocaleTimeString(locale, {
        hour: 'numeric',
        minute: 'numeric',
        second: 'numeric'
    });

    await conn.reply(m.chat, '⏱ _Cargando Menú_', m);
    m.react("✨");

    let sbot = conn.user.jid == global.conn.user.jid
        ? ""
        : `Soy Subbot de:  Wa.me/${global.conn.user.jid.split`@`[0]}`;

    const fkontak2 = {
        'key': {
            'participants': '0@s.whatsapp.net',
            'remoteJid': 'status@broadcast',
            'fromMe': false,
            'id': 'Halo'
        },
        'message': {
            'contactMessage': {
                'vcard': `BEGIN:VCARD\nVERSION:3.0\nN:Sy;Bot;;;\nFN:y\nitem1.TEL;waid=${m.sender.split('@')[0]}:${m.sender.split('@')[0]}\nitem1.X-ABLabel:Ponsel\nEND:VCARD`
            }
        },
        'participant': '0@s.whatsapp.net'
    };

    let menuMessage = `
┏━━━⟪ ⏤͟͟͞͞𝙼𝙴𝙽𝚄 ⏤͟͟͞͞⟫━━━┓
┃
┃ Bienvenido al Sub Menú
┃ @${m.sender.split('@')[0]}
┃
┃ Usa --help para ver el estado de un comando
┃
┗━━━━━━━━━━━━━━━━━━┛
    `;

    let listSections = [{
        title: `AVISO: LA BOT TODAVÍA ESTÁ EN BETA`,
        rows: [
            {
                title: "Menú Completo",
                description: `Para ver todos los comandos`,
                rowId: `${usedPrefix}allmenu`
            },
            {
                title: "Placeholder",
                description: `Este es un placeholder`,
                rowId: `${usedPrefix}test`
            }
        ]
    }];

    let img = "https://telegra.ph/file/fe2647343e68d7a257778.jpg"; // Link de imagen para la portada del menú

    await conn.sendMessage(m.chat, {
        image: { url: img },
        caption: menuMessage,
        mentions: [m.sender]
    }, { quoted: fkontak2 });

    await conn.sendList(m.chat, menuMessage, "Elija una opción", "Pulse aquí", listSections, { quoted: fkontak2 });
};

handler.help = ['menu7'];
handler.tags = ['main'];
handler.command = ['menu7'];

export default handler;

function clockString(ms) {
    const h = Math.floor(ms / 3600000);
    const m = Math.floor(ms / 60000) % 60;
    const s = Math.floor(ms / 1000) % 60;
    return [h, m, s].map(v => v.toString().padStart(2, 0)).join(":");
}

var ase = new Date();
var hour = ase.getHours();
var greeting;
switch (hour) {
    case 0: greeting = 'Buenas Noches 🌙'; break;
    case 1: greeting = 'Buenas Noches 💤'; break;
    case 2: greeting = 'Buenas Noches 🦉'; break;
    case 3: greeting = 'Buenos Días ✨'; break;
    case 4: greeting = 'Buenos Días 💫'; break;
    case 5: greeting = 'Buenos Días 🌅'; break;
    case 6: greeting = 'Buenos Días 🌄'; break;
    case 7: greeting = 'Buenos Días 🌅'; break;
    case 8: greeting = 'Buenos Días 💫'; break;
    case 9: greeting = 'Buenos Días ✨'; break;
    case 10: greeting = 'Buenos Días 🌞'; break;
    case 11: greeting = 'Buenos Días 🌨'; break;
    case 12: greeting = 'Buenos Días ❄'; break;
    case 13: greeting = 'Buenos Días 🌤'; break;
    case 14: greeting = 'Buenas Tardes 🌇'; break;
    case 15: greeting = 'Buenas Tardes 🥀'; break;
    case 16: greeting = 'Buenas Tardes 🌹'; break;
    case 17: greeting = 'Buenas Tardes 🌆'; break;
    case 18: greeting = 'Buenas Noches 🌙'; break;
    case 19: greeting = 'Buenas Noches 🌃'; break;
    case 20: greeting = 'Buenas Noches 🌌'; break;
    case 21: greeting = 'Buenas Noches 🌃'; break;
    case 22: greeting = 'Buenas Noches 🌙'; break;
    case 23: greeting = 'Buenas Noches 🌃'; break;
}
