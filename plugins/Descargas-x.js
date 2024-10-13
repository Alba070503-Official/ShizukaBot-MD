import axios from 'axios';
import fg from 'api-dylux';

let handler = async (m, { conn, args, usedPrefix, command }) => {
    if (!args || !args[0]) 
        return conn.reply(m.chat, '🚩 Ingresa un enlace del vídeo de X (Twitter) junto al comando.\n\n`Ejemplo:`\n' + `> *${usedPrefix + command}* https://x.com/godmitzu/status/1818617471579934928`, m, rcanal);

    if (!args[0].match(/x\.com|twitter\.com/gi)) 
        return conn.reply(m.chat, `Verifica que el link sea de X (Twitter)`, m, rcanal).then(_ => m.react('✖️'));

    await m.react('🕓');

    try {
        // Llamada a la API para descargar el video
        const response = await axios.get(`https://deliriusapi-official.vercel.app/download/twitterv2?url=${encodeURIComponent(args[0])}`);

        // Verificamos si la respuesta de la API es correcta
        if (response.data && response.data.video) {
            let txt = '`乂  T W I T T E R  -  D O W N L O A D`\n\n';
            txt += `	✩  *Publicado por* : No disponible\n`;
            txt += `	✩  *Vistas* : No disponible\n`;
            txt += `	✩  *Likes* : No disponible\n`;
            txt += `	✩  *Comentarios* : No disponible\n`;
            txt += `	✩  *Compartidos* : No disponible\n\n`;
            txt += `> 🚩 *Descargado desde la API de Twitter*`;

            // Enviar el video descargado de la API
            await conn.sendFile(m.chat, response.data.video, 'twitter.mp4', txt, m, null, rcanal);
            await m.react('✅');
        } else {
            throw 'No se pudo obtener el video.';
        }

    } catch (error) {
        console.error(error);
        await m.react('✖️');
        conn.reply(m.chat, 'Hubo un error al descargar el video. Intenta de nuevo más tarde.', m, rcanal);
    }
};

handler.help = ['twitter *<url tt>*', 'x *<url tt>*'];
handler.tags = ['downloader'];
handler.command = /^(twitter|tw|x)$/i;
handler.register = true;

export default handler;
