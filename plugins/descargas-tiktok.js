import { ttdl } from 'ruhend-scraper';

const handler = async (m, { text, conn, args }) => {
  if (!args[0]) {
    return conn.reply(m.chat, 'Por favor, ingresa un enlace de TikTok', m);
  }

  let data;
  try {
    data = await ttdl(args[0]);
  } catch (error) {
    return conn.reply(m.chat, 'Error al obtener datos. Verifica el enlace.', m);
  }

  const { title, author, username, published, like, comment, share, views, bookmark, video, cover, music, profilePicture } = data;

  try {
    await conn.sendMessage(
      m.chat,
      {
        video: { url: video },
        caption: `*Título:* ${title}\n*Autor:* ${author}\n*Usuario:* ${username}\n*Publicado en:* ${published}\n*Likes:* ${like}\n*Comentarios:* ${comment}\n*Compartidos:* ${share}\n*Vistas:* ${views}`,
        fileName: 'tiktok.mp4',
        mimetype: 'video/mp4'
      },
      { quoted: m }
    );
  } catch (error) {
    return conn.reply(m.chat, 'Error al enviar el video.', m);
  }
};

handler.command = /^(tiktok|ttdl)$/i;

export default handler;
