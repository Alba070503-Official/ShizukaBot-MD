import { prepareWAMessageMedia, proto } from '@whiskeysockets/baileys';
import axios from 'axios';

// Función para cargar la imagen desde una URL
const loadImage = async (url) => {
    const response = await axios.get(url, { responseType: 'arraybuffer' });
    return Buffer.from(response.data, 'binary');
};

const handler = async (m, { conn, text }) => {
    try {
        const imageUrl = 'https://telegra.ph/file/8648870907494d8806af2.jpg'; // URL de la imagen
        const imageBuffer = await loadImage(imageUrl);

        const messageMedia = await prepareWAMessageMedia({ image: imageBuffer }, { upload: conn.waUploadToServer });

        let listSections = [];
        listSections.push({
            title: '',
            rows: [
                { header: "Menu Completo", title: "", id: `.menu`, description: `Para ver todos los comandos\n` },
                { header: "SudBot", title: "", id: `.serbot --code`, description: `Para volverte sudbot 🤖\n` },
                { header: "Velocidad", title: "", id: `.ping`, description: `Ver velocidad del bot\n` },
                { header: "Play", title: "", id: `.play`, description: `Para descargar música 🎧\n` },
                { header: "Creador", title: "", id: `.owner`, description: `Comunícate con mi creador ⚙️` }
            ]
        });

        const listMessage = {
            text: '👋🏻 Hola¡! Bienvenido A Mi Sub Menú\n\n*Creador:* Alba070503\n*Versión:* 1.0.0\n\n💮 si hay algún error puedes contactarme, usa el comando: #owner\n\nGracias¡! 🔴',
            footer: `Selecione la opción correcta (⁠・⁠∀⁠・⁠)`,
            title: null,
            buttonText: 'Menú',
            sections: listSections,
            mentions: [m.sender],
            quoted: m,
            image: messageMedia.imageMessage
        };

        await conn.sendMessage(m.chat, listMessage, { quoted: m });

    } catch (e) {
        conn.reply(m.chat, '❎ Lo sentimos, el menú tiene un error.', m);
        throw e;
    }
};

handler.help = ['menu'];
handler.tags = ['main'];
handler.command = ['menu8', 'help', 'menú'];
handler.register = true;

export default handler;

const more = String.fromCharCode(8206);
const readMore = more.repeat(4001);

