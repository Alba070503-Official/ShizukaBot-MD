import db from '../lib/database.js'
import { createHash } from 'crypto'
import fs from 'fs'
import fetch from 'node-fetch'

let Reg = /\|?(.*)([.|] *?)([0-9]*)$/i
let handler = async function (m, { conn, text, usedPrefix, command }) {
  let user = global.db.data.users[m.sender]
  let name2 = conn.getName(m.sender)
   let bio = 0, fechaBio
// let who2 = m.isGroup ? _.get(m, "mentionedJid[0]", m.quoted?.sender || m.sender) : m.sender
  let sinDefinir = '😿 Es privada'
  let biografia = await conn.fetchStatus(m.sender).catch(() => null)
  if (!biografia || !biografia[0] || biografia[0].status === null) {
   bio = sinDefinir
   fechaBio = "Fecha no disponible"
} else {
bio = biografia[0].status || sinDefinir
fechaBio = biografia[0].setAt ? new Date(biografia[0].setAt).toLocaleDateString("es-ES", { day: "2-digit", month: "2-digit", year: "numeric", }) : "Fecha no disponible"
}
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
  user.descripcion = bio 
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
let chtxt = `
👤 *Usuario* » ${m.pushName || 'Anónimo'}
🌎 *Pais* » ${mundo}
🗃 *Verificación* » ${user.name}
🌺 *Edad* » ${user.age} años
👀 *Descripción* » ${user.descripcion} 
⏳ *Modificación de descripción* » ${fechaBio}
🍄 *Bot* » 𝙈𝙤𝙢𝙤𝘼𝙮𝙖𝙨𝙚𝘽𝙤𝙩-𝙈𝘿 ✨️🍁
📆 *Fecha* » ${moment.tz('America/Bogota').format('DD/MM/YY')}
☁️ *Número de registro* »
⤷ ${sn}
`.trim()
await conn.sendMessage(global.channelid, { text: chtxt, contextInfo: {
externalAdReply: {
title: "【 🍁 𝐍𝐎𝐓𝐈𝐅𝐈𝐂𝐀𝐂𝐈𝐎́𝐍 🍁 】",
body: '🥳 ¡Un usuario nuevo en mi base de datos!',
thumbnailUrl: perfil,
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