import Scraper from '@SumiFX/Scraper'
import fetch from 'node-fetch'

let handler = async (m, { conn, args, usedPrefix, command }) => {
    if (!args[0]) {
        m.reply(`🍭 Ingresa un enlace del vídeo de TikTok junto al comando.\n\nEjemplo:\n${usedPrefix + command} https://vm.tiktok.com/ZMMCYHnxf/`);
        return;
    }

    try {
        // Primer intento: Usando @SumiFX/Scraper
        let { title, published, quality, likes, commentCount, shareCount, views, dl_url } = await Scraper.tiktokdl(args[0]);
        
        let txt = `╭─⬣「 *TikTok Download* 」⬣\n`
                + `│  ≡◦ *🍭 Título* : ${title}\n`
                + `│  ≡◦ *📅 Publicado* : ${published}\n`
                + `│  ≡◦ *🪴 Calidad* : ${quality}\n`
                + `│  ≡◦ *👍 Likes* : ${likes}\n`
                + `│  ≡◦ *🗣 Comentarios* : ${commentCount}\n`
                + `│  ≡◦ *💫 Share* : ${shareCount}\n`
                + `│  ≡◦ *📹 Visitas* : ${views}\n`
                + `╰─⬣`;

        await conn.sendMessage(m.chat, { video: { url: dl_url }, caption: txt }, { quoted: m });
    } catch (error) {
        console.log('Error en el primer intento, intentando con la segunda API:', error.message);

        try {
            // Segundo intento: API de Starlights Team
            const apiResponse = await fetch(`https://api-starlights-team.koyeb.app/api/tiktok?url=${args[0]}`);
            const data = await apiResponse.json();

            if (data.status) {
                const { author, view, comment, play, share, download, duration, title, video } = data.data;
                let txt = `╭─⬣「 *TikTok Download* 」⬣\n`
                        + `│  ≡◦ *🍭 Título* : ${title}\n`
                        + `│  ≡◦ *📚 Autor* : ${author.nickname}\n`
                        + `│  ≡◦ *🕜 Duración* : ${duration} Segundos\n`
                        + `│  ≡◦ *🌵 Descargas* : ${download}\n`
                        + `│  ≡◦ *🗣 Comentarios* : ${comment}\n`
                        + `│  ≡◦ *💫 Share* : ${share}\n`
                        + `│  ≡◦ *🐢 Visitas* : ${play}\n`
                        + `╰─⬣`;

                await conn.sendMessage(m.chat, { video: { url: video }, caption: txt }, { quoted: m });
            }
        } catch (error) {
            console.log('Error en el segundo intento, intentando con la tercera API:', error.message);

            try {
                // Tercer intento: API de Delirius
                const apiResponse2 = await fetch(`https://delirius-api-oficial.vercel.app/api/tiktok?url=${args[0]}`);
                const data2 = await apiResponse2.json();

                if (data2.status) {
                    const { author, repro, like, share, comment, download, duration, title, meta, published } = data2.data;
                    const publishedDate = formatDate(published);
                    const fileSize = convertBytesToMB(meta.media[0].size_org);

                    let txt = `╭─⬣「 *TikTok Download* 」⬣\n`
                            + `│  ≡◦ *🍭 Título* : ${title}\n`
                            + `│  ≡◦ *🐢 Autor* : ${author.nickname}\n`
                            + `│  ≡◦ *🕜 Duración* : ${duration} Segundos\n`
                            + `│  ≡◦ *📹 Reproducciones* : ${repro}\n`
                            + `│  ≡◦ *👍 Likes* : ${like}\n`
                            + `│  ≡◦ *🗣 Comentarios* : ${comment}\n`
                            + `│  ≡◦ *📦 Descargas* : ${download}\n`
                            + `│  ≡◦ *💫 Share* : ${share}\n`
                            + `│  ≡◦ *📅 Publicado* : ${publishedDate}\n`
                            + `│  ≡◦ *🌵 Tamaño* : ${fileSize}\n`
                            + `╰─⬣`;

                    await conn.sendMessage(m.chat, { video: { url: meta.media[0].org }, caption: txt }, { quoted: m });
                }
            } catch (finalError) {
                console.log('Todas las APIs fallaron:', finalError.message);
                m.reply('Lo siento, no pude descargar el video de TikTok. Inténtalo nuevamente más tarde.');
            }
        }
    }
};

handler.help = ['tiktok <url tt>'];
handler.tags = ['downloader'];
handler.command = ['tiktok', 'ttdl', 'tiktokdl', 'tiktoknowm'];
handler.register = true;

export default handler;

// Función para convertir bytes a MB
function convertBytesToMB(bytes) {
    return (bytes / (1024 * 1024)).toFixed(2) + ' MB';
}

// Función para formatear la fecha
function formatDate(unixTimestamp) {
    const date = new Date(unixTimestamp * 1000);
    return `${date.getDate()}/${date.getMonth() + 1}/${date.getFullYear()} ${date.getHours()}:${date.getMinutes()}:${date.getSeconds()}`;
}
