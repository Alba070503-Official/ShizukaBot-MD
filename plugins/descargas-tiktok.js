import axios from 'axios'
const { generateWAMessageFromContent } = (await import("@whiskeysockets/baileys")).default

let handler = async (message, { conn, text, usedPrefix, command }) => {
    // Validación del enlace de TikTok
    if (!text) return conn.reply(message.chat, '🍟 *Por favor, proporciona un enlace de TikTok.*', message)

    let url = text.trim()
    if (!url.match(/tiktok\.com\/\w+/)) return conn.reply(message.chat, '⚠️ *El enlace proporcionado no parece ser válido de TikTok.*', message)

    try {
        await message.react('⏳')  // Muestra que el proceso está en marcha

        // Llamada a la API para obtener los datos del video de TikTok
        let { data } = await axios.get(`https://apis-starlights-team.koyeb.app/starlight/tiktok2?url=${url}`)
        if (!data || !data.videoUrl) throw new Error('❌ *No se pudo descargar el video. Verifica el enlace o la API.*')

        // Preparar el mensaje de video
        const videoMessage = await generateWAMessageFromContent(message.chat, {
            videoMessage: {
                url: data.videoUrl,
                caption: 'Aquí tienes tu video de TikTok 🎥',
                mimetype: 'video/mp4'
            }
        }, { quoted: message })

        // Enviar el video al chat
        await conn.relayMessage(message.chat, videoMessage.message, { messageId: videoMessage.key.id })
        await message.react('✅')  // Muestra que el proceso fue exitoso
    } catch (error) {
        console.error(error)
        await conn.reply(message.chat, '❌ *Hubo un error al descargar el video de TikTok. Intenta nuevamente.*', message)
    }
}

handler.help = ['tiktok <enlace>']
handler.tags = ['downloader']
handler.command = /^(tiktok|tiktokdl|ttdl)$/i

export default handler
