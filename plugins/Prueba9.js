import cheerio from 'cheerio';
import axios from 'axios';
const handler = async (m, {conn, text, __dirname, usedPrefix, command}) => {
if (m.sender === conn.user.jid) return;
  if (!db.data.chats[m.chat].modohorny && m.isGroup) return m.reply(`✧ Los comandos *NSFW* están desactivados en este grupo.\n> *${usedPrefix}toggle modohorny* para activarlos si eres Administrador.`);
  if (!text) return m.reply(`✧ Ingrese un texto para realizar la búsqueda, Ejemplo:\n> *${usedPrefix + command} Overflow*`);
  const searchResults = await searchHentai(text);
  let teks = searchResults.result.map((v, i) => `❀ *Título ⪼* ${v.title}
◈ *Vistas ⪼* ${v.views}
◈ *Link ⪼* ${v.url}`).join('\n\n');
  let randomThumbnail;
  if (searchResults.result.length > 0) {
    const randomIndex = Math.floor(Math.random() * searchResults.result.length);
    randomThumbnail = searchResults.result[randomIndex].thumbnail;
  } else {
    randomThumbnail = 'https://pictures.hentai-foundry.com/e/Error-Dot/577798/Error-Dot-577798-Zero_Two.png';
    teks = 'Sin resultados...';
  }
  conn.sendFile(m.chat, randomThumbnail, 'error.jpg', teks, m);
};
handler.help = ['hentaisearch <texto>', 'searchhentai <texto>'];
handler.command = ['hentaisearch', 'searchhentai'];
handler.tags = ['nsfw'];
handler.registrado = true;
export default handler;
async function searchHentai(search) {
  return new Promise((resolve, reject) => {
    axios.get('https://hentai.tv/?s=' + search).then(async ({data}) => {
      const $ = cheerio.load(data);
      const result = {};
      const res = [];
      result.coder = 'rem-comp';
      result.result = res;
      result.warning = 'It is strictly forbidden to reupload this code, copyright © 2022 by rem-comp';
      $('div.flex > div.crsl-slde').each(function(a, b) {
        const _thumbnail = $(b).find('img').attr('src');
        const _title = $(b).find('a').text().trim();
        const _views = $(b).find('p').text().trim();
        const _url = $(b).find('a').attr('href');
        const hasil = {thumbnail: _thumbnail, title: _title, views: _views, url: _url};
        res.push(hasil);
      });
      resolve(result);
    }).catch((err) => {
      console.log(err);
    });
  });
}
