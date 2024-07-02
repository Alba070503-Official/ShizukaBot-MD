import fs from 'fs';
const timeout = 60000;
const poin = 2;
const handler = async (m, {conn, usedPrefix}) => {
  conn.reflan = conn.reflan ? conn.reflan : {};
  const id = m.chat;
 // if (id in conn.reflan) {
  //  conn.reply(m.chat, 'Todavía hay reflan sin responder en este chat', conn.reflan[id][0]);
    throw false;
  }
  const reflan = JSON.parse(fs.readFileSync(`./src/game/reflan.json`));
  const json = reflan[Math.floor(Math.random() * reflan.length)];
  const _clue = json.response;
  const clue = _clue.replace(/[A-Za-z]/g, '_');
  const caption = `
ⷮ🚩 *Completa el reflan*
🐢 *${json.question}*

✨️ *Tienes:* ${(timeout / 1000).toFixed(2)} De Segundos
🍬 Cofre: ${poin} Dulces`.trim();
  conn.reflan[id] = [
    await conn.reply(m.chat, caption, m), json,
    poin,
    setTimeout(async () => {
      if (conn.reflan[id]) await conn.reply(m.chat, `🚩 Se acabó el tiempo!\n*Respuesta:* ${json.response}`, conn.reflan[id][0]);
      delete conn.reflan[id];
    }, timeout)];
};
handler.help = ['reflan'];
handler.tags = ['fun'];
handler.command = /^(reflan|Reflan)$/i;
export default handler;