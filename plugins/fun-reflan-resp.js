import similarity from 'similarity';
const threshold = 0.72;
const handler = (m) => m;
handler.before = async function(m) {
  const id = m.chat;
  if (!m.quoted || !m.quoted.fromMe || !m.quoted.isBaileys || !/^ⷮ/i.test(m.quoted.text)) return !0;
  this.tekateki = this.tekateki ? this.tekateki : {};
  if (!(id in this.tekateki)) return m.reply('🚩 Ese reflan ya ha terminado!');
  if (m.quoted.id == this.tekateki[id][0].id) {
    const json = JSON.parse(JSON.stringify(this.tekateki[id][1]));
    if (m.text.toLowerCase() == json.response.toLowerCase().trim()) {
      global.db.data.users[m.sender].limit += this.tekateki[id][2];
      m.reply(`🚩 *Reflan Correcto!*\n+${this.tekateki[id][2]} Dulces`);
      clearTimeout(this.tekateki[id][3]);
      delete this.tekateki[id];
    } else if (similarity(m.text.toLowerCase(), json.response.toLowerCase().trim()) >= threshold) m.reply(`Ups Casi! 🚩`);
    else m.reply('No es la respuesta!');
  }
  return !0;
};
handler.exp = 0;
export default handler;