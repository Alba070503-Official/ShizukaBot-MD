import axios from 'axios';

const { proto, generateWAMessageFromContent } = (await import('@whiskeysockets/baileys')).default;

async function downloadTikTokVideo(url) {
  try {
    const response = await axios.post('https://tikdown.xyz/api/download', {
      url: url
    }, {
      headers: {
        'Content-Type': 'application/json',
        'User-Agent': 'Mozilla/5.0 (Linux; Android 10; K) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/129.0.0.0 Mobile Safari/537.36',
        'Referer': 'https://tikdown.xyz/'
      }
    });

    if (response.data && response.data.status === 'success') {
      return response.data;
    } else {
      throw new Error('No se pudo descargar el video. Intenta de nuevo.');
    }
  } catch (error) {
    console.error('Error fetching TikTok video:', error);
    throw error;
  }
}

let handler = async (message, { conn, text }) => {
  if (!text) return conn.reply(message.chat, '❗ *Proporcione un enlace válido de TikTok.*', message);

  try {
    const videoData = await downloadTikTokVideo(text); // Pasa la URL que el usuario proporcionó
    
    // Si el video se descargó con éxito
    const videoUrl = videoData.data[0].nowm; // URL sin marca de agua (o puedes usar 'wm' para la versión con marca)
    
    // Enviar el video al usuario
    const messageContent = await generateWAMessageFromContent(message.chat, {
      videoMessage: {
        url: videoUrl,
        caption: '🎬 Aquí está tu video de TikTok descargado.'
      }
    }, { quoted: message });
    
    await conn.relayMessage(message.chat, messageContent.message, { messageId: messageContent.key.id });

  } catch (error) {
    // Si hubo un error, notificar al usuario
    await conn.reply(message.chat, '❌ *Hubo un error al descargar el video de TikTok. Intenta nuevamente.*', message);
  }
};

handler.help = ['tiktokdl <url>'];
handler.tags = ['downloader'];
handler.command = /^tiktokdl$/i;

export default handler;
