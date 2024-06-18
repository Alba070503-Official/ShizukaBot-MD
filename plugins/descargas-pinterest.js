import Scraper from "@SumiFX/Scraper"
let handler = async (m, { conn, text, usedPrefix, command }) => {
if (!text) return m.reply('✧ Ingresa un texto para realizar la búsqueda.')
try {
let { dl_url } = await Scraper.pinterest(text)
await conn.sendFile(m.chat, dl_url, 'thumbnail.jpg', null, m)
} catch {
}}
handler.help = ['pinterest <texto>', 'pin']
handler.tags = ['search']
handler.command = ['pinterest', 'pin']
handler.registrado = true 
handler.diamantes = 1
export default handler
