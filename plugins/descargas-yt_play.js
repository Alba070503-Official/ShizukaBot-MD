import yts from 'yt-search'
import fs from 'fs'
import os from 'os'
import axios from 'axios'

const handler = async (m, { conn, command, text, usedPrefix }) => {
  if (!text) throw `Use example ${usedPrefix}${command} Joji - Ew`;

  const search = await yts(text);
  const vid = search.videos[0];
  if (!vid) throw m.reply('Data no encontrada, intenta con otro titulo');

  const { title, thumbnail, timestamp, views, ago, url } = vid;

await conn.sendMessage(m.chat, { react: { text: '🕒', key: m.key }})
//  await conn.sendMessage(m.chat, { image: { url: thumbnail }, caption: wait }, { quoted: m });

  try {
    const response = await axios.get(`https://api.ryzendesu.vip/api/downloader/ytmp3?url=${encodeURIComponent(url)}`);
    const downloadUrl = response.data.url;

    if (!downloadUrl) throw new Error('Audio URL not found');

    const tmpDir = os.tmpdir();
    const filePath = `${tmpDir}/${title}.mp3`;

    const audioResponse = await axios({
      method: 'get',
      url: downloadUrl,
      responseType: 'stream',
    });

    const writableStream = fs.createWriteStream(filePath);
    audioResponse.data.pipe(writableStream);

    writableStream.on('finish', async () => {
      await conn.sendMessage(m.chat, {
        audio: {
          url: filePath
        },
        mimetype: 'audio/mpeg',
        fileName: `${title}.mp3`,
        caption: `Titilo: ${title}\nPublicado: ${ago}`,
        contextInfo: {
          externalAdReply: {
            showAdAttribution: true,
            mediaType: 2,
            mediaUrl: url,
            title: title,
            body: 'Audio Download',
            sourceUrl: url,
            thumbnail: await (await conn.getFile(thumbnail)).data,
          },
        },
      }, { quoted: m });
await conn.sendMessage(m.chat, { react: { text: '✅', key: m.key }})

      fs.unlink(filePath, (err) => {
        if (err) {
          console.error(`Failed to delete audio file: ${err}`);
        } else {
          console.log(`Deleted audio file: ${filePath}`);
        }
      });
    });

    writableStream.on('error', (err) => {
      console.error(`Failed to write audio file: ${err}`);
      m.reply('Failed to download audio');
    });
  } catch (error) {
    console.error('Error:', error.message);
    throw `Error: ${error.message}. Please check the URL and try again.`;
  }
};

handler.help = ['play'].map((v) => v + ' *<consulta>*');
handler.tags = ['downloader'];
handler.command = /^(play)$/i;

handler.register = true
handler.disable = false

export default handler
