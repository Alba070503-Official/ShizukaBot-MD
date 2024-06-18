import fetch from 'node-fetch';
const handler = async (m, {conn, usedPrefix, command}) => {
  const res = await fetch('https://api.waifu.pics/sfw/waifu');
  if (!res.ok) return await res.text();
  const json = await res.json();
  if (!json.url) await m.reply('✧ Ocurrió un error inesperado');
//conn.sendFile(m.chat, json.url, 'error.jpg', `❀ 😻`, m);
conn.sendButton(m.chat, `❀ *IMAGEN DE PICS*`, '> *Nota ⪼* No genere Spam con los botones o será Baneado.', json.url, [['🔄 SIGUIENTE', `${usedPrefix + command}`]], m)
};
handler.help = ['waifu'];
handler.tags = ['anime'];
handler.command = ['waifu'];
handler.registrado = true;
handler.group = true;
export default handler;
