import db from '../lib/database.js'
import { createHash } from 'crypto'
import fs from 'fs'
import fetch from 'node-fetch'

let Reg = /\|?(.*)([.|] *?)([0-9]*)$/i
let handler = async function (m, { conn, text, usedPrefix, command }) {
  let user = global.db.data.users[m.sender]
  let name2 = conn.getName(m.sender)
  if (user.registered === true) return m.reply(`🍭 Ya estás registrado.\n\n*¿Quiere volver a registrarse?*\n\nUse este comando para eliminar su registro.\n*${usedPrefix}unreg*`)
  if (!Reg.test(text)) return m.reply(`🌹 Formato incorrecto.\n\nUso del comamdo: *${usedPrefix + command} nombre.edad*\nEjemplo : *${usedPrefix + command} ${name2}.666*`)
  let [_, name, splitter, age] = text.match(Reg)
  if (!name) return m.reply('🚩 El nombre no puede estar vacío.')
  if (!age) return m.reply('🚩 La edad no puede estar vacía.')
  if (name.length >= 100) return m.reply('🚩 El nombre es demasiado largo.' )
  age = parseInt(age)
  if (age > 100) return m.reply('👴🏻 Wow el abuelo quiere jugar al bot.')
  if (age < 5) return m.reply('🚼  hay un abuelo bebé jsjsj. ')
  user.name = name.trim()
  user.age = age
  user.regTime = + new Date
  user.registered = true
  global.db.data.users[m.sender].money += 600
  global.db.data.users[m.sender].cookies += 15
  global.db.data.users[m.sender].exp += 245
  global.db.data.users[m.sender].joincount += 5
  let sn = createHash('md5').update(m.sender).digest('hex')
  await conn.reply(m.chat,  `✅️ *R E G I S T R O*

• ✨️ *Nombre:* ${name}
┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈
• 🐇 *Edad:* ${age} Años
┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈
👑 *Recompensas de la Bot:*
• 4 Diamantes 💎
• 20 Coins 💰
• 97 Experiencia 💸
• 2 Tokens 🪙
┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈`, m, {contextInfo: { externalAdReply :{ mediaUrl: null, mediaType: 1, description: null, title: '✅️  R E G I S T R O  ✅️',  body: '👑 Registro Completado', previewType: 0, thumbnail: imagen1, sourceUrl: canales}}})
let chtxt = `👤 *Usuario*: ${m.pushName || 'Anónimo'}\n🌎 *Pais:* ${global.userNationality}\n🗃 *Verificación:* ${user.name}\n🌸 *Edad:* ${user.age} años\n🐢 *Bot:* ${packname}`.trim()
await conn.sendMessage(global.channelid, { text: chtxt, contextInfo: {
externalAdReply: {
title: "【 🔔 Notificación General 🔔 】",
body: '🐢 Un usuario registrado',
thumbnailUrl: fotoperfil,
sourceUrl: redes,
mediaType: 1,
showAdAttribution: false,
renderLargerThumbnail: false
}}}, { quoted: null })
}
handler.help = ['reg']
handler.tags = ['rg']
handler.command = ['verify', 'verificar', 'reg', 'register', 'registrar'] 

export default handler