/* import similarity from 'similarity';
const refl = 0.72;
const handler = (m) => m;
handler.before = async function(m) {
  const id = m.chat;
  if (!m.quoted || !m.quoted.fromMe || !m.quoted.isBaileys || !/^ⷮ/i.test(m.quoted.text)) return !0;
  this.reflan = this.reflan ? this.reflan : {};
  if (!(id in this.reflan)) return m.reply('🚩 Ese reflan ya ha terminado!');
  if (m.quoted.id == this.reflan[id][0].id) {
    const json = JSON.parse(JSON.stringify(this.reflan[id][1]));
    if (m.text.toLowerCase() == json.response.toLowerCase().trim()) {
      global.db.data.users[m.sender].limit += this.reflan[id][2];
      m.reply(`🚩 *Reflan Correcto!*\n+${this.reflan[id][2]} Dulces`);
      clearTimeout(this.reflan[id][3]);
      delete this.reflan[id];
    } else if (similarity(m.text.toLowerCase(), json.response.toLowerCase().trim()) >= refl) m.reply(`Ups Casi! 🚩`);
    else m.reply('No es la respuesta!');
  }
  return !0;
};
handler.exp = 0;
export default handler; */