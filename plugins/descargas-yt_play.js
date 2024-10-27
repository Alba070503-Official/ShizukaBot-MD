import fetch from 'node-fetch';
import axios from 'axios';

const handler = async (m, { conn, command, text }) => {

    if (!text) throw `_*[ ⚠️ ] Por favor, ingresa el título o enlace de YouTube que deseas buscar.*_\n\n_Ejemplo:_\n.play Marshmello Moving On`;

    try { 
        // Buscar en YouTube usando la API de Delirius
        let { data } = await axios.get(`https://deliriussapi-oficial.vercel.app/search/yt?q=${encodeURIComponent(text)}&limit=1`);

        if (!data.data || data.data.length === 0) {
            throw `_*[ ⚠️ ] No se encontraron resultados para "${text}" en YouTube.*_`;
        }

        const video = data.data[0];
        const title = video.title;
        const url = video.url;
        const thumbnail = video.image;
        
        // Información del video
        const info = `🎶 *Título:* ${title}\n📅 *Publicado:* ${video.publish}\n⏳ *Duración:* ${video.duration}\n👤 *Autor:* ${video.author}\n🔗 *URL:* ${url}\n\n_*Procesando descarga...*_`;

        await conn.sendFile(m.chat, thumbnail, 'thumbnail.jpg', info, m);

        // Determinar el tipo de descarga según el comando
        const isMp3 = command === 'play';
        const apiUrl = isMp3 
            ? `https://deliriussapi-oficial.vercel.app/download/ytmp3?url=${encodeURIComponent(url)}` 
            : `https://deliriussapi-oficial.vercel.app/download/ytmp4?url=${encodeURIComponent(url)}`;

        const response = await fetch(apiUrl);
        const result = await response.json();

        if (result.data && result.data.url) {
            const downloadUrl = result.data.url;
            const filename = `${title || 'archivo'}.${isMp3 ? 'mp3' : 'mp4'}`;
            const messageType = isMp3 ? 'audio' : 'video';

            // Enviar el archivo de audio o video al usuario
            await conn.sendMessage(m.chat, {
                [messageType]: { url: downloadUrl },
                fileName: filename,
                mimetype: isMp3 ? 'audio/mpeg' : 'video/mp4',
                caption: `🎶 Aquí está tu archivo ${isMp3 ? 'MP3' : 'MP4'} de YouTube: ${title}`,
                quoted: m
            });
        } else {
            throw new Error('_*[ ❌ ] Ocurrió un error al descargar el archivo. Inténtalo nuevamente._');
        }

    } catch (e) {
        await conn.reply(m.chat, `❌ _*El comando #play está fallando. Por favor, repórtalo al creador del bot.*_`, m);
        console.log(`❌ Error en el comando #play:`, e);
    }
};

handler.help = ['play', 'playmp4'];
handler.tags = ['downloader'];
handler.command = ['play', 'playmp4'];
export default handler;
