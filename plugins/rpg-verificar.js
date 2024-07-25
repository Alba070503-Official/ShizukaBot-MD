import { createHash } from 'crypto'
let Reg = /\|?(.*)([.|] *?)([0-9]*)$/i
let handler = async function (m, { conn, text, usedPrefix, command }) {
let user = db.data.users[m.sender]
let totalreg = Object.keys(global.db.data.users).length
let rtotalreg = Object.values(global.db.data.users).filter(user => user.registered == true).length
  let name2 = conn.getName(m.sender)
  if (user.registered === true) throw `*✅️ Ya estas en mi base de Datos.*`
  if (!Reg.test(text)) throw `*Uso Del Comando:*\n- ${usedPrefix + command} nombre.edad\n🗣 *Ejemplo:*\n- ${usedPrefix + command} ${name2}.16`
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
global.db.data.users[m.sender].money += 20
global.db.data.users[m.sender].limit += 4
global.db.data.users[m.sender].exp += 97
global.db.data.users[m.sender].joincount += 2
  let sn = createHash('md5').update(m.sender).digest('hex')
  await conn.reply(m.chat,  `✅️ *R E G I S T R O*

• ✨️ *Nombre:* ${name}
┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈
• 🐇 *Edad:* ${age} Años
┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈
👑 *Recompensas de la Bot:*
• 4 Diamantes 💎
• 20 ShizuCoins 💰
• 97 Experiencia 💸
• 2 Tokens 🪙
┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈
Usuarios Registrados: ${rtotalreg}`, m, {contextInfo: { externalAdReply :{ mediaUrl: null, mediaType: 1, description: null, title: '✅️  R E G I S T R O  ✅️',  body: '👑 Registro Completado', previewType: 0, thumbnail:  'https://telegra.ph/file/4ff38ffd07a9efefc41b1.jpg', sourceUrl:  'https://whatsapp.com/channel/0029VaAN15BJP21BYCJ3tH04'}}})
await m.reply(`${sn}`)}
handler.help = ['daftar', 'register'].map(v => v + ' <nama>.<umur>')
handler.tags = ['xp']
handler.command = /^(verify|verificar|registrar|reg(ister)?)$/i
export default handler
