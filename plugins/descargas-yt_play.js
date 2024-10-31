import fetch from 'node-fetch';
import axios from 'axios';

const handler = async (m, {conn, command, args, text, usedPrefix}) => {

    if (!text) throw `_*[ âš ï¸ ] Agrega lo que quieres buscar*_\n\n_Ejemplo:_\n.play Marshmello Moving On`;

    try { 
        
        let { data } = await axios.get(`https://deliriussapi-oficial.vercel.app/search/spotify?q=${encodeURIComponent(text)}&limit=10`);

        if (!data.data || data.data.length === 0) {
            throw `_*[ âš ï¸ ] No se encontraron resultados para "${text}" en Youtube.*_`;
        }

        const img = data.data[0].image;
        const url = data.data[0].url;
        const info = `â§ ð™ð™„ð™ð™ð™‡ð™Š
Â» ${data.data[0].title}
ï¹˜ï¹˜ï¹˜ï¹˜ï¹˜ï¹˜ï¹˜ï¹˜ï¹˜ï¹˜ï¹˜ï¹˜
â§ ð™‹ð™ð˜½ð™‡ð™„ð˜¾ð˜¼ð˜¿ð™Š
Â» ${data.data[0].publish}
ï¹˜ï¹˜ï¹˜ï¹˜ï¹˜ï¹˜ï¹˜ï¹˜ï¹˜ï¹˜ï¹˜ï¹˜
â§ ð——ð—¨ð—¥ð—”ð—–ð—œð—¢ð—¡
Â» ${data.data[0].duration}
ï¹˜ï¹˜ï¹˜ï¹˜ï¹˜ï¹˜ï¹˜ï¹˜ï¹˜ï¹˜ï¹˜ï¹˜
â§  ð™‹ð™Šð™‹ð™ð™‡ð˜¼ð™ð™„ð˜¿ð˜¼ð˜¿
Â» ${data.data[0].popularity}
ï¹˜ï¹˜ï¹˜ï¹˜ï¹˜ï¹˜ï¹˜ï¹˜ï¹˜ï¹˜ï¹˜ï¹˜
â§  ð˜¼ð™ð™ð™„ð™Žð™ð˜¼
Â» ${data.data[0].artist}
ï¹˜ï¹˜ï¹˜ï¹˜ï¹˜ï¹˜ï¹˜ï¹˜ï¹˜ï¹˜ï¹˜ï¹˜
â§ ð™ð™ð™‡
Â» ${url}

_*ðŸŽ¶ Enviando mÃºsica...*_`.trim();

        await conn.sendFile(m.chat, img, 'imagen.jpg', info, m);

        //ï¼¼ï¼ï¼¼ï¼ï¼¼ï¼ï¼¼ï¼ï¼¼ï¼ DESCARGAR ï¼¼ï¼ï¼¼ï¼ï¼¼ï¼ï¼¼ï¼ï¼¼ï¼
    
        const apiUrl = `https://deliriussapi-oficial.vercel.app/download/spotifydl?url=${encodeURIComponent(url)}`;
        const response = await fetch(apiUrl);
        const result = await response.json();
        
        if (result.data.url) {
            const downloadUrl = result.data.url;
            const filename = `${result.data.title || 'audio'}.mp3`;
            await conn.sendMessage(m.chat, { audio: { url: downloadUrl }, fileName: filename, mimetype: 'audio/mpeg', caption: `â•­â”â°  *YouTube*  â±â”â¬£\n${filename}\nâ•°â”â° *Play* â±â”â¬£`, quoted: m });
        } else {
            throw new Error('_*[ âŒ ] OcurriÃ³ un error al descargar el archivo mp3_');
        }

    } catch (e) {

        await conn.reply(m.chat, `âŒ _*El comando #play estÃ¡ fallando, repÃ³rtalo al creador del bot*_`, m);

        console.log(`âŒ El comando #play estÃ¡ fallando`);
        console.log(e);
    }
};

handler.help = ['play'] 
handler.tags = ['downloader']
handler.command = ['play'];
export default handler;
