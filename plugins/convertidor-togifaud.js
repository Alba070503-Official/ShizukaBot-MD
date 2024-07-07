let handler = async (m, { conn, usedPrefix, command }) => {
if (!m.quoted) return conn.reply(m.chat, `🤍 Responde a un *Video.*`, m)
const q = m.quoted || m
let mime = (q.msg || q).mimetype || ''
if (!/(mp4)/.test(mime)) return conn.reply(m.chat, `🤍 Responde a un *Video.*`, m)
await m.react("⏱️")
let media = await q.download()
let listo = '💭 *Aquí Tienes* 💥'
conn.sendMessage(m.chat, { video: media, gifPlayback: true, caption: listo }, { quoted: m })
await m.react("✅️")
}
handler.help = ['togifaud']
handler.tags = ['transformador']
handler.command = ['togifaud']
export default handler