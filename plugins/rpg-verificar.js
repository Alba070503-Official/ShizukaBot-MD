import { createHash } from 'crypto'
let Reg = /\|?(.*)([.|] *?)([0-9]*)$/i
let handler = async function (m, { conn, text, usedPrefix, command }) {
let user = db.data.users[m.sender]
let totalreg = Object.keys(global.db.data.users).length
let rtotalreg = Object.values(global.db.data.users).filter(user => user.registered == true).length
  let name2 = conn.getName(m.sender)
  if (user.registered === true) throw `Ya eatas registrado pdj 😎`
  if (!Reg.test(text)) throw `𝐔𝐬𝐨 𝐃𝐞𝐥 𝐂𝐨𝐦𝐚𝐧𝐝𝐨: ${usedPrefix + command} nombre.edad\n💻 Nota: ${usedPrefix + command} ${name2}.16`
  let [_, name, splitter, age] = text.match(Reg)
  if (!name) throw '🚩 El nombre no puede estar vacio'
  if (!age) throw '🚩 La edad en necesaria'
  if (name.length >= 30) throw '💫 El nombre es muy largo' 
  age = parseInt(age)
  if (age > 100) throw '😊 Un abuelo quiere ser la bot'
  if (age < 5) throw '✏️ la bebé juega con WhatsApp'
  user.name = name.trim()
  user.age = age
  user.regTime = + new Date
  user.registered = true
global.db.data.users[m.sender].money += 900
global.db.data.users[m.sender].limit += 50
global.db.data.users[m.sender].exp += 500
global.db.data.users[m.sender].joincount += 20
  let sn = createHash('md5').update(m.sender).digest('hex')
  await conn.reply(m.chat,  ` 乂  R E G I S T R O  乂

• Usuario: ${name}
┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈
• Edas: ${age} 𝖠𝗇̃𝗈𝗌
┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈
🚩 *Recompensas Por El Registro:*
• 50 Diamantes 💎
• 900 Coins 💰
• 500 Experiencia 💸
• 20 Tokens 🪙
┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈`.trim()
let img = await (await fetch('https://telegra.ph/file/b7edf2026656718c1f0f7.jpg')).buffer()  
await conn.sendMessage(m.chat, {
text: menu,
contextInfo: { 
mentionedJid: [m.sender],
forwardingScore: 9, 
externalAdReply: {
title: 'Registro Completo By ShizukaBot-MD',
//body: 'Wʜᴀᴛꜱᴀᴘᴘ Bᴏᴛ - Mᴜʟᴛɪ Dᴇᴠɪᴄᴇ',
thumbnail: img,
sourceUrl: 'https://whatsapp.com/channel/0029VaAN15BJP21BYCJ3tH04',
mediaType: 1,
renderLargerThumbnail: true
}}}, { quoted: m})
await m.react('🤖')	await m.reply(`${sn}`)}
handler.help = ['daftar', 'register'].map(v => v + ' <nama>.<umur>')
handler.tags = ['xp']
handler.command = /^(verify|verificar|registrar|reg(ister)?)$/i
export default handler
