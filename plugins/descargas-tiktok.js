import axios from 'axios';

let handler = async (m, { conn, args, usedPrefix, command }) => {
    if (!args || !args[0]) 
        return conn.reply(m.chat, '🚩 Ingresa un enlace del vídeo de TikTok junto al comando.\n\n`Ejemplo:`\n' + `> *${usedPrefix + command}* https://vm.tiktok.com/ZMrFCX5jf/`, m, rcanal);

    if (!args[0].match(/tiktok/gi)) 
        return conn.reply(m.chat, `Verifica que el link sea de TikTok`, m, rcanal).then(_ => m.react('✖️'));

    await m.react('🕓');

    try {
        // Llamada a la API para descargar el video
        const response = await axios.get(`https://deliriusapi-official.vercel.app/download/tiktok?url=${encodeURIComponent(args[0])}`);

        // Verificamos si la respuesta de la API es correcta
        if (response.data && response.data.video) {
            let txt = '`乂  T I K T O K  -  D O W N L O A D`\n\n';
            txt += `	✩  *Título* : No disponible\n`;
            txt += `	✩  *Autor* : No disponible\n`;
            txt += `	✩  *Duración* : No disponible\n`;
            txt += `	✩  *Vistas* : No disponible\n`;
            txt += `	✩  *Likes* : No disponible\n`;
            txt += `	✩  *Comentarios* : No disponible\n`;
            txt += `	✩  *Compartidos* : No disponible\n`;
            txt += `	✩  *Publicado* : No disponible\n`;
            txt += `	✩  *Descargas* : No disponible\n\n`;
            txt += `> 🚩 *Descargado desde la API de TikTok*`;

            // Enviar el video descargado de la API
            await conn.sendFile(m.chat, response.data.video, 'tiktok.mp4', txt, m, null, rcanal);
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

handler.help = ['tiktok *<url tt>*'];
handler.tags = ['downloader'];
handler.command = /^(tiktok|ttdl|tiktokdl|tiktoknowm)$/i;
handler.register = true;

export default handler;
