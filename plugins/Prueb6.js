import { prepareWAMessageMedia, generateWAMessageFromContent } from '@whiskeysockets/baileys';
import axios from 'axios';

// Carga la imagen desde la URL
const loadImage = async (url) => {
    const response = await axios.get(url, { responseType: 'arraybuffer' });
    return Buffer.from(response.data, 'binary');
};

const handler = async (m, { conn, text, usedPrefix: prefix }) => {
    const imageUrl = 'https://telegra.ph/file/8648870907494d8806af2.jpg'; // URL de la imagen
    const imageBuffer = await loadImage(imageUrl);

    const messageMedia = await prepareWAMessageMedia({ image: imageBuffer }, { upload: conn.waUploadToServer });

    // Asegurarse de que global.commands está definido
    if (!global.commands) {
        global.commands = new Map(); // o la estructura correcta que estés utilizando
    }

    // Construir el contenido del menú
    let menuContent = `╭────《 *ts sk* 》─────⊷\n│ ╭──────────────◆\n│ │ usuario: ${await conn.getName(m.sender)}\n│ │ creador: Skid\n│ │ Comandos: ${global.commands.size}\n│ ╰──────────────◆\n╰───────────────⊷\n╭────❏ *MENÚ* ❏\n`;

    global.commands.forEach((cmd, name) => {
        menuContent += `\n│ ${prefix}${name} - ${cmd.description}`;
    });

    menuContent += `\n╰━━━━━━━━━━━━━──⊷\n\nBuenas noches 🌙`;

    const menuMessage = {
        body: { text: menuContent.trim() },
        footer: { text: 'Agradecimiento a la comunidad de "WSApp • Developers"\nhttps://chat.whatsapp.com/FaQunmlp9BmDRk6lEEc9FJ\nAgradecimiento especial a Carlos (PT) por los códigos de interactiveMessage (botones)\nhttps://github.com/darlyn1234\nAdaptación de imagen en tipo lista, código y funcionamiento por BrunoSobrino\nhttps://github.com/BrunoSobrino'.trim() },
        header: {
            title: 'MENÚ',
            hasMediaAttachment: true,
            imageMessage: messageMedia.imageMessage,
        }
    };

    let msg = generateWAMessageFromContent(m.chat, {
        viewOnceMessage: {
            message: {
                interactiveMessage: menuMessage,
            },
        },
    }, { userJid: conn.user.jid, quoted: m });

    await conn.relayMessage(m.chat, msg.message, { messageId: msg.key.id });
};

handler.help = ['menu'];
handler.tags = ['general'];
handler.command = /^(menu8)$/i;

export default handler;
