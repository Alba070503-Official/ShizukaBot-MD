import axios from 'axios'
const { generateWAMessageFromContent } = (await import("@whiskeysockets/baileys")).default

let handler = async (message, { conn, text }) => {
    if (!text) return conn.reply(message.chat, '🍟 *Por favor, proporciona un enlace de TikTok.*', message)

    let url = text.trim()
    if (!url.match(/(tiktok\.com)/)) return conn.reply(message.chat, '⚠️ *El enlace proporcionado no parece ser válido de TikTok.*', message)

    try {
        await message.react('⏳')  // Indicador de carga

        // Llamada a la API de Dorratz para obtener los datos del video
        let response = await axios.get(`https://api.dorratz.com/v2/tiktok-dl?url=${url}`)
        let data = response.data

        // Verificar que la respuesta contiene el video
        if (!data || !data.video) {
            throw new Error('No se pudo obtener el video. Verifica el enlace o la API.')
        }

        // Preparar y enviar el video
        const videoMessage = await generateWAMessageFromContent(message.chat, {
            videoMessage: {
                url: data.video,
                caption: '🎥 Aquí está tu video de TikTok',
                mimetype: 'video/mp4'
            }
        }, { quoted: message })

        await conn.relayMessage(message.chat, videoMessage.message, { messageId: videoMessage.key.id })
        await message.react('✅')  // Proceso exitoso
    } catch (error) {
        console.error(error)  // Registro de error en la consola
        await conn.reply(message.chat, `❌ *Hubo un error al descargar el video de TikTok: ${error.message}.*`, message)
    }
}

handler.help = ['tiktok <enlace>']
handler.tags = ['downloader']
handler.command = /^(tiktok|tiktokdl|ttdl)$/i

export default handler
