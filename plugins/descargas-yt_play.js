import fg from 'api-dylux'
import yts from 'yt-search'
import fetch from 'node-fetch' 

let handler = async (m, { conn, args, usedPrefix, text, command }) => {
    if (!text) return conn.reply(m.chat, `*🚩 Ingresa un título o enlace de un video o música de YouTube.*`, m)

    try {
        let vid;

        // Verificar si el texto ingresado es un enlace de YouTube
        if (text.match(/^(https?:\/\/)?(www\.)?(youtube\.com|youtu\.?be)\/.+$/gi)) {
            await m.react('🕓')
            vid = await yts({ videoId: text.split('v=')[1] || text.split('/')[3] }) // Obtén el video directamente
        } else {
            await m.react('🕓')
            let res = await yts(text)
            vid = res.videos[0] // Obtén el primer video de la búsqueda
        }

        if (!vid) return conn.reply(m.chat, `*☓ No se encontraron resultados para tu búsqueda.*`, m)

        const infoTexto = `乂  Y O U T U B E   M U S I C\n
        ✩ *Título ∙* ${vid.title}\n
        ✩ *Duración ∙* ${vid.timestamp}\n
        ✩ *Visitas ∙* ${vid.views}\n
        ✩ *Autor ∙* ${vid.author.name}\n
        ✩ *Publicado ∙* ${vid.ago}\n
        ✩ *Url ∙* ${'https://youtu.be/' + vid.videoId}\n`.trim()

        await conn.sendButton(m.chat, infoTexto, wm, vid.thumbnail, [
            ['Audio 📀', `${usedPrefix}mp3 ${text}`],
            ['Video 🎥', `${usedPrefix}mp4 ${text}`],
            ['AudioDoc 📀', `${usedPrefix}mp3doc ${text}`],
            ['VideoDoc 🎥', `${usedPrefix}mp4doc ${text}`]
        ], null, [['Canal', `https://whatsapp.com/channel/0029VaAN15BJP21BYCJ3tH04`]], m)

    } catch (error) {
        console.error(error)
        await conn.reply(m.chat, `*☓ Ocurrió un error inesperado.*`, m).then(_ => m.react('✖️'))
    }
}

handler.help = ["play"].map(v => v + " <formato> <búsqueda o enlace>")
handler.tags = ["downloader"]
handler.command = ['play', 'play2', 'mp3', 'mp4', 'mp3doc', 'mp4doc']
handler.register = true 
handler.star = 1

export default handler
