import fs from 'fs'
import fetch from 'node-fetch'
import { xpRange } from '../lib/levelling.js'
const { levelling } = '../lib/levelling.js'
import PhoneNumber from 'awesome-phonenumber'
import { promises } from 'fs'
import { join } from 'path'
let handler = async (m, { conn, usedPrefix, usedPrefix: _p, __dirname, text, command }) => {
try {	
//let vn = './media/menu.mp3'
let _package = JSON.parse(await promises.readFile(join(__dirname, '../package.json')).catch(_ => ({}))) || {}
let { exp, limit, level, role } = global.db.data.users[m.sender]
let { min, xp, max } = xpRange(level, global.multiplier)
let name = await conn.getName(m.sender)
let d = new Date(new Date + 3600000)
let locale = 'es'
let weton = ['Pahing', 'Pon', 'Wage', 'Kliwon', 'Legi'][Math.floor(d / 84600000) % 5]
let week = d.toLocaleDateString(locale, { weekday: 'long' })
let date = d.toLocaleDateString(locale, {
day: 'numeric',
month: 'long',
year: 'numeric'
})
let dateIslamic = Intl.DateTimeFormat(locale + '-TN-u-ca-islamic', {
day: 'numeric',
month: 'long',
year: 'numeric'
}).format(d)
let time = d.toLocaleTimeString(locale, {
hour: 'numeric',
minute: 'numeric',
second: 'numeric'
})
let _uptime = process.uptime() * 1000
let _muptime
if (process.send) {
process.send('uptime')
_muptime = await new Promise(resolve => {
process.once('message', resolve)
setTimeout(resolve, 1000)
}) * 1000
}
let { money, joincount } = global.db.data.users[m.sender]
let user = global.db.data.users[m.sender]
let muptime = clockString(_muptime)
let uptime = clockString(_uptime)
let totalreg = Object.keys(global.db.data.users).length
let rtotalreg = Object.values(global.db.data.users).filter(user => user.registered == true).length
let replace = {
'%': '%',
p: _p, uptime, muptime,
me: conn.getName(conn.user.jid),
npmname: _package.name,
npmdesc: _package.description,
version: _package.version,
exp: exp - min,
maxexp: xp,
totalexp: exp,
xp4levelup: max - exp,
github: _package.homepage ? _package.homepage.url || _package.homepage : '[unknown github url]',
level, limit, name, weton, week, date, dateIslamic, time, totalreg, rtotalreg, role,
readmore: readMore
}
text = text.replace(new RegExp(`%(${Object.keys(replace).sort((a, b) => b.length - a.length).join`|`})`, 'g'), (_, name) => '' + replace[name])
//let user = global.db.data.users[m.sender]
//user.registered = false
let who = m.mentionedJid && m.mentionedJid[0] ? m.mentionedJid[0] : m.fromMe ? conn.user.jid : m.sender
let mentionedJid = [who]
let username = conn.getName(who)
let taguser = '@' + m.sender.split("@s.whatsapp.net")[0]
//let enlace = { contextInfo: { externalAdReply: {title: wm, body: 'support group' , sourceUrl: nna, thumbnail: await(await fetch(img)).buffer() }}}
  let pp = './Menu.png'
//let pp = gataVidMenu.getRandom()
await conn.sendMessage(m.chat, {
        text: `*Hey @${m.sender.split`@`[0]} estamos enviando el menu*

NamiBot-MD.`,
        contextInfo: { 
          mentionedJid: [m.sender],
        }
      }, { quoted: m })
  
let fkontak = { "key": { "participants":"0@s.whatsapp.net", "remoteJid": "status@broadcast", "fromMe": false, "id": "Halo" }, "message": { "contactMessage": { "vcard": `BEGIN:VCARD\nVERSION:3.0\nN:Sy;Bot;;;\nFN:y\nitem1.TEL;waid=${m.sender.split('@')[0]}:${m.sender.split('@')[0]}\nitem1.X-ABLabel:Ponsel\nEND:VCARD` }}, "participant": "0@s.whatsapp.net" }

let menu = `⌜ *${wm}* ⌟  

╭─╮︹︹⊹︹︹⊹︹︹⊹︹︹╭─╮
    ⚘݄𖠵⃕⁖𖥔͢𝙼𝚎𝚗𝚞 𝙾𝚏𝚏𝚒𝚌𝚒𝚊𝚕 ꪶ͢𝑩𝒐𝒕⋆᭄͙̈
╚▭࣪▬ִ▭࣪▬ִ▭࣪▬ִ▭࣪▬ִ▭࣪▬ִ▭࣪▬▭╝

╭ׅׄ̇─ׅ̻ׄ╮۪̇߭︹ׅ̟ׄ̇︹ׅ۪ׄ̇߭︹ׅ̟ׄ̇⊹۪̇߭︹ׅ̟ׄ̇︹ׅ۪ׄ̇߭︹ׅ̟ׄ̇⊹۪̇߭︹ׅ̟ׄ̇︹ׅ۪ׄ̇߭︹ׅ̟ׄ̇⊹
├̟̇  *I N F O*
├ׁ̟̇❍✎ 𝐔𝐬𝐮𝐚𝐫𝐢𝐨 : ${taguser}
├ׁ̟̇❍✎ 𝐂𝐫𝐞𝐚𝐝𝐨𝐫: 𝙰𝚕𝚋𝚊𝟶𝟽𝟶𝟻𝟶𝟹
├ׁ̟̇❍✎𝐍𝐮𝐦𝐞𝐫𝐨 𝐝𝐞𝐥 𝐂𝐫𝐞𝐚𝐝𝐨𝐫: wa.me/+59177601773
├ׁ̟̇❍✎𝐃𝐚𝐭𝐞: ${date}
├ׁ̟̇❍✎𝐕𝐞𝐫𝐬𝐢𝐨𝐧 𝐃𝐞  𝙽𝚊𝚖𝚒𝙱𝚘𝚝-𝙼𝙳: 2.0
*໋̇ꥇ╰ׁ̻─ׅׄ ⊹ٜ꒦۪߭ׄ꒷ٜ߭ׄ꒦۪߭ׄ꒷ٜ߭ׄ꒦۪߭ׄ꒷ٜ߭ׄ꒦۪߭ׄ꒷ٜ߭ׄ꒦۪߭ׄ꒷ٜ߭ׄ꒦۪߭ׄ꒷ٜ߭ׄ꒦۪ׄ߭꒷ٜ߭ׄ꒦۪ׄ߭꒷ٜׄ߭꒦*

╭ׅׄ̇─ׅ̻ׄ╮۪̇߭︹ׅ̟ׄ̇︹ׅ۪ׄ̇߭︹ׅ̟ׄ̇⊹۪̇߭︹ׅ̟ׄ̇︹ׅ۪ׄ̇߭︹ׅ̟ׄ̇⊹۪̇߭︹ׅ̟ׄ̇︹ׅ۪ׄ̇߭︹ׅ̟ׄ̇⊹
├̟̇  *U S U A R I O*
├ׁ̟̇❍✎ 𝐍𝐈𝐕𝐄𝐋: ${level}
├ׁ̟̇❍✎ 𝐄𝐗𝐏𝐄𝐑𝐈𝐄𝐍𝐂𝐈𝐀: ${exp}
├ׁ̟̇❍✎𝐑𝐀𝐍𝐆𝐎: ${role}
├ׁ̟̇❍✎ 𝐃𝐈𝐀𝐌𝐀𝐍𝐓𝐄𝐒: ${limit}
├ׁ̟̇❍✎ 𝐂𝐎𝐈𝐍𝐒: ${money}
├ׁ̟̇❍✎𝐓𝐎𝐊𝐄𝐍𝐒: ${joincount}
*໋̇ꥇ╰ׁ̻─ׅׄ ⊹ٜ꒦۪߭ׄ꒷ٜ߭ׄ꒦۪߭ׄ꒷ٜ߭ׄ꒦۪߭ׄ꒷ٜ߭ׄ꒦۪߭ׄ꒷ٜ߭ׄ꒦۪߭ׄ꒷ٜ߭ׄ꒦۪߭ׄ꒷ٜ߭ׄ꒦۪ׄ߭꒷ٜ߭ׄ꒦۪ׄ߭꒷ٜׄ߭꒦*

╭ׅׄ̇─ׅ̻ׄ╮۪̇߭︹ׅ̟ׄ̇︹ׅ۪ׄ̇߭︹ׅ̟ׄ̇⊹۪̇߭︹ׅ̟ׄ̇︹ׅ۪ׄ̇߭︹ׅ̟ׄ̇⊹۪̇߭︹ׅ̟ׄ̇︹ׅ۪ׄ̇߭︹ׅ̟ׄ̇⊹
├ׁ̟̇  「 Sᴏʟᴜᴄɪᴏɴ ᴀ ᴇʀʀᴏʀᴇs 」
├━─━─━─≪≪✠≫≫─━─━─━╯
┣➤ Mensajes en espera
├ׁ̟̇❍✎  #fixmsgespera
┣➤ Mensajes en espera (owner)
├ׁ̟̇❍✎  #dsowner
*໋̇ꥇ╰ׁ̻─ׅׄ ⊹ٜ꒦۪߭ׄ꒷ٜ߭ׄ꒦۪߭ׄ꒷ٜ߭ׄ꒦۪߭ׄ꒷ٜ߭ׄ꒦۪߭ׄ꒷ٜ߭ׄ꒦۪߭ׄ꒷ٜ߭ׄ꒦۪߭ׄ꒷ٜ߭ׄ꒦۪ׄ߭꒷ٜ߭ׄ꒦۪ׄ߭꒷ٜׄ߭꒦*

╭ׅׄ̇─ׅ̻ׄ╮۪̇߭︹ׅ̟ׄ̇︹ׅ۪ׄ̇߭︹ׅ̟ׄ̇⊹۪̇߭︹ׅ̟ׄ̇︹ׅ۪ׄ̇߭︹ׅ̟ׄ̇⊹۪̇߭︹ׅ̟ׄ̇︹ׅ۪ׄ̇߭︹ׅ̟ׄ̇⊹
├ׁ̟̇  「 Iɴғᴏ ʙᴏᴛ 」
├━─━─━─≪≪✠≫≫─━─━─━╯
├ׁ̟̇❍✎  #cuentas
├ׁ̟̇❍✎  #saludo
├ׁ̟̇❍✎  #velocidad
├ׁ̟̇❍✎  #metodo
├ׁ̟̇❍✎  #totalf
├ׁ̟̇❍✎  #instalarbot
├ׁ̟̇❍✎  #terminosycondiciones
├ׁ̟̇❍✎  #grupos
├ׁ̟̇❍✎  #estado
├ׁ̟̇❍✎  #aprender
├ׁ̟̇❍✎  #infobot
├ׁ̟̇❍✎  #speedtest
├ׁ̟̇❍✎  #donar
├ׁ̟̇❍✎  #owner
├ׁ̟̇❍✎  #contactos
├ׁ̟̇❍✎  #database
├ׁ̟̇❍✎  #colaboradores
├ׁ̟̇❍✎  #script
├ׁ̟̇❍✎  Bot (𝑢𝑠𝑜 𝑠𝑖𝑛 𝑝𝑟𝑒𝑓𝑖𝑗𝑜)
*໋̇ꥇ╰ׁ̻─ׅׄ ⊹ٜ꒦۪߭ׄ꒷ٜ߭ׄ꒦۪߭ׄ꒷ٜ߭ׄ꒦۪߭ׄ꒷ٜ߭ׄ꒦۪߭ׄ꒷ٜ߭ׄ꒦۪߭ׄ꒷ٜ߭ׄ꒦۪߭ׄ꒷ٜ߭ׄ꒦۪ׄ߭꒷ٜ߭ׄ꒦۪ׄ߭꒷ٜׄ߭꒦*

╭ׅׄ̇─ׅ̻ׄ╮۪̇߭︹ׅ̟ׄ̇︹ׅ۪ׄ̇߭︹ׅ̟ׄ̇⊹۪̇߭︹ׅ̟ׄ̇︹ׅ۪ׄ̇߭︹ׅ̟ׄ̇⊹۪̇߭︹ׅ̟ׄ̇︹ׅ۪ׄ̇߭︹ׅ̟ׄ̇⊹
├ׁ̟̇「 Uɴᴇ ᴀ 𝙽𝚊𝚖𝚒𝙱𝚘𝚝-𝙼𝙳 ᴀ ᴛᴜ ɢʀᴜᴘᴏ 」
├━─━─━─≪≪✠≫≫─━─━─━╯
├ׁ̟̇❍✎  #join *<enlace / link / url>*
╰•°• ✾ •°••°• ✾ •°••°• ✾ •°•°••°• ✾ •°•

╭ׅׄ̇─ׅ̻ׄ╮۪̇߭︹ׅ̟ׄ̇︹ׅ۪ׄ̇߭︹ׅ̟ׄ̇⊹۪̇߭︹ׅ̟ׄ̇︹ׅ۪ׄ̇߭︹ׅ̟ׄ̇⊹۪̇߭︹ׅ̟ׄ̇︹ׅ۪ׄ̇߭︹ׅ̟ׄ̇⊹
├ׁ̟̇  「 Sᴇʀ ʙᴏᴛ Jᴀᴅɪʙᴏᴛ 」
├━─━─━─≪≪✠≫≫─━─━─━╯
├ׁ̟̇❍✎  #botclone
├ׁ̟̇❍✎  #deletebot
├ׁ̟̇❍✎  #token
├ׁ̟̇❍✎  #stop
├ׁ̟̇❍✎  #bots
*໋̇ꥇ╰ׁ̻─ׅׄ ⊹ٜ꒦۪߭ׄ꒷ٜ߭ׄ꒦۪߭ׄ꒷ٜ߭ׄ꒦۪߭ׄ꒷ٜ߭ׄ꒦۪߭ׄ꒷ٜ߭ׄ꒦۪߭ׄ꒷ٜ߭ׄ꒦۪߭ׄ꒷ٜ߭ׄ꒦۪ׄ߭꒷ٜ߭ׄ꒦۪ׄ߭꒷ٜׄ߭꒦*

╭ׅׄ̇─ׅ̻ׄ╮۪̇߭︹ׅ̟ׄ̇︹ׅ۪ׄ̇߭︹ׅ̟ׄ̇⊹۪̇߭︹ׅ̟ׄ̇︹ׅ۪ׄ̇߭︹ׅ̟ׄ̇⊹۪̇߭︹ׅ̟ׄ̇︹ׅ۪ׄ̇߭︹ׅ̟ׄ̇⊹
├ׁ̟̇  「 Hᴇʀʀᴀᴍɪᴇɴᴛᴀs 」
├━─━─━─≪≪✠≫≫─━─━─━╯
├ׁ̟̇❍✎  #enable restrict
├ׁ̟̇❍✎  #disable restrict
├ׁ̟̇❍✎  #enable autoread
├ׁ̟̇❍✎  #disable autoread
├ׁ̟̇❍✎  #enable antispam
├ׁ̟̇❍✎  #disable antispam
├ׁ̟̇❍✎  #enable anticall
├ׁ̟̇❍✎  #disable anticall
├ׁ̟̇❍✎  #enable modoia
├ׁ̟̇❍✎  #disable modoia
├ׁ̟̇❍✎  #enable audios_bot
├ׁ̟̇❍✎  #disable audios_bot
├ׁ̟̇❍✎  #enable antiprivado
├ׁ̟̇❍✎  #disable antiprivado
*໋̇ꥇ╰ׁ̻─ׅׄ ⊹ٜ꒦۪߭ׄ꒷ٜ߭ׄ꒦۪߭ׄ꒷ٜ߭ׄ꒦۪߭ׄ꒷ٜ߭ׄ꒦۪߭ׄ꒷ٜ߭ׄ꒦۪߭ׄ꒷ٜ߭ׄ꒦۪߭ׄ꒷ٜ߭ׄ꒦۪ׄ߭꒷ٜ߭ׄ꒦۪ׄ߭꒷ٜׄ߭꒦*

╭ׅׄ̇─ׅ̻ׄ╮۪̇߭︹ׅ̟ׄ̇︹ׅ۪ׄ̇߭︹ׅ̟ׄ̇⊹۪̇߭︹ׅ̟ׄ̇︹ׅ۪ׄ̇߭︹ׅ̟ׄ̇⊹۪̇߭︹ׅ̟ׄ̇︹ׅ۪ׄ̇߭︹ׅ̟ׄ̇⊹
├ׁ̟̇  「 Jᴜᴇɢᴏs 」
├━─━─━─≪≪✠≫≫─━─━─━╯
┃🔥  #menujuegos
*໋̇ꥇ╰ׁ̻─ׅׄ ⊹ٜ꒦۪߭ׄ꒷ٜ߭ׄ꒦۪߭ׄ꒷ٜ߭ׄ꒦۪߭ׄ꒷ٜ߭ׄ꒦۪߭ׄ꒷ٜ߭ׄ꒦۪߭ׄ꒷ٜ߭ׄ꒦۪߭ׄ꒷ٜ߭ׄ꒦۪ׄ߭꒷ٜ߭ׄ꒦۪ׄ߭꒷ٜׄ߭꒦*

╭ׅׄ̇─ׅ̻ׄ╮۪̇߭︹ׅ̟ׄ̇︹ׅ۪ׄ̇߭︹ׅ̟ׄ̇⊹۪̇߭︹ׅ̟ׄ̇︹ׅ۪ׄ̇߭︹ׅ̟ׄ̇⊹۪̇߭︹ׅ̟ׄ̇︹ׅ۪ׄ̇߭︹ׅ̟ׄ̇⊹
├ׁ̟̇ 「 Aᴄᴛɪᴠᴀʀ ᴏ ᴅᴇsᴀᴄᴛɪᴠᴀʀ 」
├━─━─━─≪≪✠≫≫─━─━─━╯
├ׁ̟̇❍✎  #enable *welcome*
├ׁ̟̇❍✎  #disable *welcome*
├ׁ̟̇❍✎  #enable *modohorny*
├ׁ̟̇❍✎  #disable *modohorny*
├ׁ̟̇❍✎  #enable *antilink*
├ׁ̟̇❍✎  #disable *antilink*
├ׁ̟̇❍✎  #enable *antilink2*
├ׁ̟̇❍✎  #disable *antilink2*
├ׁ̟̇❍✎  #enable *juegos*
├ׁ̟̇❍✎  #disable *juegos*
├ׁ̟̇❍✎  #enable *detect*
├ׁ̟̇❍✎  #disable *detect*
├ׁ̟̇❍✎  #enable *audios*
├ׁ̟̇❍✎  #disable *audios*
├ׁ̟̇❍✎  #enable *autosticker*
├ׁ̟̇❍✎  #disable *autosticker*
├ׁ̟̇❍✎  #enable *antiviewonce*
├ׁ̟̇❍✎  #disable *antiviewonce*
├ׁ̟̇❍✎  #enable *antitoxic*
├ׁ̟̇❍✎  #disable *antitoxic*
├ׁ̟̇❍✎  #enable *antitraba*
├ׁ̟̇❍✎  #disable *antitraba*
├ׁ̟̇❍✎  #enable *antiarabes*
├ׁ̟̇❍✎  #disable *antiarabes*
├ׁ̟̇❍✎  #enable *modoadmin*
├ׁ̟̇❍✎  #disable *modoadmin*
├ׁ̟̇❍✎  #enable *antidelete*
├ׁ̟̇❍✎  #disable *antidelete*
*໋̇ꥇ╰ׁ̻─ׅׄ ⊹ٜ꒦۪߭ׄ꒷ٜ߭ׄ꒦۪߭ׄ꒷ٜ߭ׄ꒦۪߭ׄ꒷ٜ߭ׄ꒦۪߭ׄ꒷ٜ߭ׄ꒦۪߭ׄ꒷ٜ߭ׄ꒦۪߭ׄ꒷ٜ߭ׄ꒦۪ׄ߭꒷ٜ߭ׄ꒦۪ׄ߭꒷ٜׄ߭꒦*

╭ׅׄ̇─ׅ̻ׄ╮۪̇߭︹ׅ̟ׄ̇︹ׅ۪ׄ̇߭︹ׅ̟ׄ̇⊹۪̇߭︹ׅ̟ׄ̇︹ׅ۪ׄ̇߭︹ׅ̟ׄ̇⊹۪̇߭︹ׅ̟ׄ̇︹ׅ۪ׄ̇߭︹ׅ̟ׄ̇⊹
├ׁ̟̇  「 Rᴇᴘᴏʀᴛᴀʀ ᴇʀʀᴏʀᴇs 」
├━─━─━─≪≪✠≫≫─━─━─━╯
┃🌹  #reporte *<texto>*
*໋̇ꥇ╰ׁ̻─ׅׄ ⊹ٜ꒦۪߭ׄ꒷ٜ߭ׄ꒦۪߭ׄ꒷ٜ߭ׄ꒦۪߭ׄ꒷ٜ߭ׄ꒦۪߭ׄ꒷ٜ߭ׄ꒦۪߭ׄ꒷ٜ߭ׄ꒦۪߭ׄ꒷ٜ߭ׄ꒦۪ׄ߭꒷ٜ߭ׄ꒦۪ׄ߭꒷ٜׄ߭꒦*

╭ׅׄ̇─ׅ̻ׄ╮۪̇߭︹ׅ̟ׄ̇︹ׅ۪ׄ̇߭︹ׅ̟ׄ̇⊹۪̇߭︹ׅ̟ׄ̇︹ׅ۪ׄ̇߭︹ׅ̟ׄ̇⊹۪̇߭︹ׅ̟ׄ̇︹ׅ۪ׄ̇߭︹ׅ̟ׄ̇⊹
├ׁ̟̇  「 Dᴇsᴄᴀʀɢᴀs 」
├━─━─━─≪≪✠≫≫─━─━─━╯
├ׁ̟̇❍✎  #instagram *<enlace / link / url>*
├ׁ̟̇❍✎  #mediafire *<enlace / link / url>*
├ׁ̟̇❍✎  #gitclone *<enlace / link / url>*
├ׁ̟̇❍✎  #gdrive *<enlace / link / url>*
├ׁ̟̇❍✎  #tiktok *<enlace / link / url>*
├ׁ̟̇❍✎  #tiktokimg *<enlace / link / url>*
├ׁ̟̇❍✎  #xnxxdl *<enlace / link / url>*
├ׁ̟̇❍✎  #xvideosdl *<enlace / link / url>*
├ׁ̟̇❍✎  #twitter *<enlace / link / url>*
├ׁ̟̇❍✎  #fb *<enlace / link / url>*
├ׁ̟̇❍✎  #ytshort *<enlace / link / url>*
├ׁ̟̇❍✎  #ytmp3 *<enlace / link / url>*
├ׁ̟̇❍✎  #ytmp4 *<enlace / link / url>*
├ׁ̟̇❍✎  #ytmp3doc *<enlace / link / url>*
├ׁ̟̇❍✎  #ytmp4doc *<enlace / link / url>*
├ׁ̟̇❍✎  #videodoc *<enlace / link / url>*
├ׁ̟̇❍✎  #dapk2 *<enlace / link / url>*
├ׁ̟̇❍✎  #stickerpack *<enlace / link / url>*
├ׁ̟̇❍✎  #play *<texto>*
├ׁ̟̇❍✎  #play2 *<texto>*
├ׁ̟̇❍✎  #play.1 *<texto>*
├ׁ̟̇❍✎  #play.2 *<texto>*
├ׁ̟̇❍✎  #playdoc *<texto>*
├ׁ̟̇❍✎  #playdoc2 *<texto>*
├ׁ̟̇❍✎  #playlist *<texto>*
├ׁ̟̇❍✎  #spotify *<texto>*
├ׁ̟̇❍✎  #ringtone *<texto>*
├ׁ̟̇❍✎  #soundcloud *<texto>*
├ׁ̟̇❍✎  #imagen *<texto>*
├ׁ̟̇❍✎  #pinterest *<texto>*
├ׁ̟̇❍✎  #wallpaper *<texto>*
├ׁ̟̇❍✎  #pptiktok *<nombre de usuario>*
├ׁ̟̇❍✎  #igstalk *<nombre de usuario>*
├ׁ̟̇❍✎  #igstory *<nombre de usuario>*
├ׁ̟̇❍✎  #tiktokstalk *<username>*
*໋̇ꥇ╰ׁ̻─ׅׄ ⊹ٜ꒦۪߭ׄ꒷ٜ߭ׄ꒦۪߭ׄ꒷ٜ߭ׄ꒦۪߭ׄ꒷ٜ߭ׄ꒦۪߭ׄ꒷ٜ߭ׄ꒦۪߭ׄ꒷ٜ߭ׄ꒦۪߭ׄ꒷ٜ߭ׄ꒦۪ׄ߭꒷ٜ߭ׄ꒦۪ׄ߭꒷ٜׄ߭꒦*

╭ׅׄ̇─ׅ̻ׄ╮۪̇߭︹ׅ̟ׄ̇︹ׅ۪ׄ̇߭︹ׅ̟ׄ̇⊹۪̇߭︹ׅ̟ׄ̇︹ׅ۪ׄ̇߭︹ׅ̟ׄ̇⊹۪̇߭︹ׅ̟ׄ̇︹ׅ۪ׄ̇߭︹ׅ̟ׄ̇⊹
├ׁ̟̇  「 Bᴜsᴄᴀᴅᴏʀᴇs 」
├━─━─━─≪≪✠≫≫─━─━─━╯
├ׁ̟̇❍✎  #githubsearch *<texto>*
├ׁ̟̇❍✎  #modapk *<texto>*
├ׁ̟̇❍✎  #stickersearch *<texto>*
├ׁ̟̇❍✎  #stickersearch2 *<texto>*
├ׁ̟̇❍✎  #xnxxsearch *<texto>*
├ׁ̟̇❍✎  #animeinfo *<texto>*
├ׁ̟̇❍✎  #google *<texto>*
├ׁ̟̇❍✎  #letra *<texto>*
├ׁ̟̇❍✎  #wikipedia *<texto>*
├ׁ̟̇❍✎  #ytsearch *<texto>*
├ׁ̟̇❍✎  #playstore *<texto>*
*໋̇ꥇ╰ׁ̻─ׅׄ ⊹ٜ꒦۪߭ׄ꒷ٜ߭ׄ꒦۪߭ׄ꒷ٜ߭ׄ꒦۪߭ׄ꒷ٜ߭ׄ꒦۪߭ׄ꒷ٜ߭ׄ꒦۪߭ׄ꒷ٜ߭ׄ꒦۪߭ׄ꒷ٜ߭ׄ꒦۪ׄ߭꒷ٜ߭ׄ꒦۪ׄ߭꒷ٜׄ߭꒦*

╭ׅׄ̇─ׅ̻ׄ╮۪̇߭︹ׅ̟ׄ̇︹ׅ۪ׄ̇߭︹ׅ̟ׄ̇⊹۪̇߭︹ׅ̟ׄ̇︹ׅ۪ׄ̇߭︹ׅ̟ׄ̇⊹۪̇߭︹ׅ̟ׄ̇︹ׅ۪ׄ̇߭︹ׅ̟ׄ̇⊹
├ׁ̟̇  「 Gʀᴜᴘᴏs 」
├━─━─━─≪≪✠≫≫─━─━─━╯
├ׁ̟̇❍✎️  #salir *<admins>*
├ׁ̟̇❍✎️  #add *<numero>*
├ׁ̟̇❍✎️  #kick *<@tag>*
├ׁ̟̇❍✎️  #kick2 *<@tag>*
├ׁ̟̇❍✎️  #mute *<@tag>*
├ׁ̟̇❍✎️  #unmute *<@tag>*
├ׁ̟̇❍✎️  #listanum *<texto>*
├ׁ̟̇❍✎️  #kicknum *<texto>*
├ׁ̟̇❍✎️  #grupo *<abrir / cerrar>*
├ׁ̟̇❍✎️  #grouptime *<opcion> <tiempo>*
├ׁ̟̇❍✎️  #promote *<@tag>*
├ׁ̟̇❍✎️  #demote *<@tag>*
├ׁ̟̇❍✎️  admins *<texto>* (𝑢𝑠𝑜 𝑠𝑖𝑛 𝑝𝑟𝑒𝑓𝑖𝑗𝑜)
├ׁ̟̇❍✎️  #demote *<@tag>*
├ׁ̟̇❍✎️  #infogroup
├ׁ̟̇❍✎️  #resetlink
├ׁ̟̇❍✎️  #link
├ׁ̟̇❍✎️  #setname *<texto>*
├ׁ̟̇❍✎️  #setdesc *<texto>*
├ׁ̟̇❍✎️  #invocar *<texto>*
├ׁ̟̇❍✎️  #setwelcome *<texto>*
├ׁ̟̇❍✎️  #setbye *<texto>*
├ׁ̟̇❍✎️  #hidetag *<texto>*
├ׁ̟̇❍✎️  #hidetag *<audio>*
├ׁ̟̇❍✎️  #hidetag *<video>*
├ׁ̟̇❍✎️  #hidetag *<imagen>*
├ׁ̟̇❍✎️  #warn *<@tag>*
├ׁ̟̇❍✎️  #unwarn *<@tag>*
├ׁ̟̇❍✎️  #listwarn
├ׁ̟̇❍✎️  #fantasmas
├ׁ̟̇❍✎️  #destraba
├ׁ̟̇❍✎️  #setpp *<imagen>*
*໋̇ꥇ╰ׁ̻─ׅׄ ⊹ٜ꒦۪߭ׄ꒷ٜ߭ׄ꒦۪߭ׄ꒷ٜ߭ׄ꒦۪߭ׄ꒷ٜ߭ׄ꒦۪߭ׄ꒷ٜ߭ׄ꒦۪߭ׄ꒷ٜ߭ׄ꒦۪߭ׄ꒷ٜ߭ׄ꒦۪ׄ߭꒷ٜ߭ׄ꒦۪ׄ߭꒷ٜׄ߭꒦*

╭ׅׄ̇─ׅ̻ׄ╮۪̇߭︹ׅ̟ׄ̇︹ׅ۪ׄ̇߭︹ׅ̟ׄ̇⊹۪̇߭︹ׅ̟ׄ̇︹ׅ۪ׄ̇߭︹ׅ̟ׄ̇⊹۪̇߭︹ׅ̟ׄ̇︹ׅ۪ׄ̇߭︹ׅ̟ׄ̇⊹
├ׁ̟̇  「 Cᴏɴᴠᴇʀᴛɪᴅᴏʀᴇs 」
├━─━─━─≪≪✠≫≫─━─━─━╯
├ׁ̟̇❍✎  #toanime *<imagen>*
├ׁ̟̇❍✎  #togifaud *<video>*
├ׁ̟̇❍✎  #toimg *<sticker>*
├ׁ̟̇❍✎  #tomp3 *<video>*
├ׁ̟̇❍✎  #tomp3 *<nota de voz>*
├ׁ̟̇❍✎  #toptt *<video / audio>*
├ׁ̟̇❍✎  #tovideo *<sticker>*
├ׁ̟̇❍✎  #tourl *<video / imagen / audio>*
├ׁ̟̇❍✎  #tts *<idioma> <texto>*
├ׁ̟̇❍✎  #tts *<efecto> <texto>*
*໋̇ꥇ╰ׁ̻─ׅׄ ⊹ٜ꒦۪߭ׄ꒷ٜ߭ׄ꒦۪߭ׄ꒷ٜ߭ׄ꒦۪߭ׄ꒷ٜ߭ׄ꒦۪߭ׄ꒷ٜ߭ׄ꒦۪߭ׄ꒷ٜ߭ׄ꒦۪߭ׄ꒷ٜ߭ׄ꒦۪ׄ߭꒷ٜ߭ׄ꒦۪ׄ߭꒷ٜׄ߭꒦*

╭ׅׄ̇─ׅ̻ׄ╮۪̇߭︹ׅ̟ׄ̇︹ׅ۪ׄ̇߭︹ׅ̟ׄ̇⊹۪̇߭︹ׅ̟ׄ̇︹ׅ۪ׄ̇߭︹ׅ̟ׄ̇⊹۪̇߭︹ׅ̟ׄ̇︹ׅ۪ׄ̇߭︹ׅ̟ׄ̇⊹
├ׁ̟̇  「 Eғᴇᴄᴛᴏs ʏ ʟᴏɢᴏs 」
├━─━─━─≪≪✠≫≫─━─━─━╯
├ׁ̟̇❍✎  #logos *<efecto> <texto>*
├ׁ̟̇❍✎  #logochristmas *<texto>*
├ׁ̟̇❍✎  #logocorazon *<texto>*
├ׁ̟̇❍✎  #ytcomment *<texto>*
├ׁ̟̇❍✎  #hornycard *<@tag>*
├ׁ̟̇❍✎  #simpcard *<@tag>*
├ׁ̟̇❍✎  #lolice *<@tag>*
├ׁ̟̇❍✎  #itssostupid
├ׁ̟̇❍✎  #pixelar
├ׁ̟̇❍✎  #blur
*໋̇ꥇ╰ׁ̻─ׅׄ ⊹ٜ꒦۪߭ׄ꒷ٜ߭ׄ꒦۪߭ׄ꒷ٜ߭ׄ꒦۪߭ׄ꒷ٜ߭ׄ꒦۪߭ׄ꒷ٜ߭ׄ꒦۪߭ׄ꒷ٜ߭ׄ꒦۪߭ׄ꒷ٜ߭ׄ꒦۪ׄ߭꒷ٜ߭ׄ꒦۪ׄ߭꒷ٜׄ߭꒦*

╭ׅׄ̇─ׅ̻ׄ╮۪̇߭︹ׅ̟ׄ̇︹ׅ۪ׄ̇߭︹ׅ̟ׄ̇⊹۪̇߭︹ׅ̟ׄ̇︹ׅ۪ׄ̇߭︹ׅ̟ׄ̇⊹۪̇߭︹ׅ̟ׄ̇︹ׅ۪ׄ̇߭︹ׅ̟ׄ̇⊹
├ׁ̟̇  「 Fʀᴀsᴇs ʏ ᴛᴇxᴛᴏs 」
├━─━─━─≪≪✠≫≫─━─━─━╯
├ׁ̟̇❍✎️   #piropo
├ׁ̟̇❍✎️   #consejo
├ׁ̟̇❍✎️   #fraseromantica
├ׁ̟̇❍✎️   #historiaromantica
*໋̇ꥇ╰ׁ̻─ׅׄ ⊹ٜ꒦۪߭ׄ꒷ٜ߭ׄ꒦۪߭ׄ꒷ٜ߭ׄ꒦۪߭ׄ꒷ٜ߭ׄ꒦۪߭ׄ꒷ٜ߭ׄ꒦۪߭ׄ꒷ٜ߭ׄ꒦۪߭ׄ꒷ٜ߭ׄ꒦۪ׄ߭꒷ٜ߭ׄ꒦۪ׄ߭꒷ٜׄ߭꒦*

╭ׅׄ̇─ׅ̻ׄ╮۪̇߭︹ׅ̟ׄ̇︹ׅ۪ׄ̇߭︹ׅ̟ׄ̇⊹۪̇߭︹ׅ̟ׄ̇︹ׅ۪ׄ̇߭︹ׅ̟ׄ̇⊹۪̇߭︹ׅ̟ׄ̇︹ׅ۪ׄ̇߭︹ׅ̟ׄ̇⊹
├ׁ̟̇  「 Aɴɪᴍᴇs 」
├━─━─━─≪≪✠≫≫─━─━─━╯
┃🍨  #menuanimes
*໋̇ꥇ╰ׁ̻─ׅׄ ⊹ٜ꒦۪߭ׄ꒷ٜ߭ׄ꒦۪߭ׄ꒷ٜ߭ׄ꒦۪߭ׄ꒷ٜ߭ׄ꒦۪߭ׄ꒷ٜ߭ׄ꒦۪߭ׄ꒷ٜ߭ׄ꒦۪߭ׄ꒷ٜ߭ׄ꒦۪ׄ߭꒷ٜ߭ׄ꒦۪ׄ߭꒷ٜׄ߭꒦*

╭ׅׄ̇─ׅ̻ׄ╮۪̇߭︹ׅ̟ׄ̇︹ׅ۪ׄ̇߭︹ׅ̟ׄ̇⊹۪̇߭︹ׅ̟ׄ̇︹ׅ۪ׄ̇߭︹ׅ̟ׄ̇⊹۪̇߭︹ׅ̟ׄ̇︹ׅ۪ׄ̇߭︹ׅ̟ׄ̇⊹
├ׁ̟̇  「 Rᴀɴᴅᴏᴍ 」
├━─━─━─≪≪✠≫≫─━─━─━╯
├ׁ̟̇❍✎  #kpop *<blackpink / exo / bts>*
├ׁ̟̇❍✎  #cristianoronaldo
├ׁ̟̇❍✎  #messi
├ׁ̟̇❍✎  #cat
├ׁ̟̇❍✎  #dog
├ׁ̟̇❍✎  #meme
├ׁ̟̇❍✎  #itzy
├ׁ̟̇❍✎  #blackpink
├ׁ̟̇❍✎  #navidad
├ׁ̟̇❍✎  #wpmontaña
├ׁ̟̇❍✎  #pubg
├ׁ̟̇❍✎  #wpgaming
├ׁ̟̇❍✎  #wpaesthetic
├ׁ̟̇❍✎  #wpaesthetic2
├ׁ̟̇❍✎  #wprandom
├ׁ̟̇❍✎  #wallhp
├ׁ̟̇❍✎  #wpvehiculo
├ׁ̟̇❍✎  #wpmoto
├ׁ̟̇❍✎  #coffee
├ׁ̟̇❍✎  #pentol
├ׁ̟̇❍✎  #caricatura
├ׁ̟̇❍✎  #ciberespacio
├ׁ̟̇❍✎  #technology
├ׁ̟̇❍✎  #doraemon
├ׁ̟̇❍✎  #hacker
├ׁ̟̇❍✎  #planeta
├ׁ̟̇❍✎  #randomprofile
*໋̇ꥇ╰ׁ̻─ׅׄ ⊹ٜ꒦۪߭ׄ꒷ٜ߭ׄ꒦۪߭ׄ꒷ٜ߭ׄ꒦۪߭ׄ꒷ٜ߭ׄ꒦۪߭ׄ꒷ٜ߭ׄ꒦۪߭ׄ꒷ٜ߭ׄ꒦۪߭ׄ꒷ٜ߭ׄ꒦۪ׄ߭꒷ٜ߭ׄ꒦۪ׄ߭꒷ٜׄ߭꒦*

╭ׅׄ̇─ׅ̻ׄ╮۪̇߭︹ׅ̟ׄ̇︹ׅ۪ׄ̇߭︹ׅ̟ׄ̇⊹۪̇߭︹ׅ̟ׄ̇︹ׅ۪ׄ̇߭︹ׅ̟ׄ̇⊹۪̇߭︹ׅ̟ׄ̇︹ׅ۪ׄ̇߭︹ׅ̟ׄ̇⊹
├ׁ̟̇  「 Cᴏᴍᴀɴᴅᴏs +𝟷𝟾 」
├━─━─━─≪≪✠≫≫─━─━─━╯
┃🔥  #hornymenu
*໋̇ꥇ╰ׁ̻─ׅׄ ⊹ٜ꒦۪߭ׄ꒷ٜ߭ׄ꒦۪߭ׄ꒷ٜ߭ׄ꒦۪߭ׄ꒷ٜ߭ׄ꒦۪߭ׄ꒷ٜ߭ׄ꒦۪߭ׄ꒷ٜ߭ׄ꒦۪߭ׄ꒷ٜ߭ׄ꒦۪ׄ߭꒷ٜ߭ׄ꒦۪ׄ߭꒷ٜׄ߭꒦*

╭ׅׄ̇─ׅ̻ׄ╮۪̇߭︹ׅ̟ׄ̇︹ׅ۪ׄ̇߭︹ׅ̟ׄ̇⊹۪̇߭︹ׅ̟ׄ̇︹ׅ۪ׄ̇߭︹ׅ̟ׄ̇⊹۪̇߭︹ׅ̟ׄ̇︹ׅ۪ׄ̇߭︹ׅ̟ׄ̇⊹
├ׁ̟̇  「 Aᴜᴅɪᴏs ᴇғᴇᴄᴛᴏs 」
├━─━─━─≪≪✠≫≫─━─━─━╯
┃𝘙𝘦𝘴𝘱𝘰𝘯𝘥𝘦 𝘈 𝘜𝘯𝘢 𝘕𝘰𝘵𝘢 𝘋𝘦 𝘈𝘶𝘥𝘪𝘰
├ׁ̟̇❍✎  #bass
├ׁ̟̇❍✎  #blown
├ׁ̟̇❍✎  #deep
├ׁ̟̇❍✎  #earrape
├ׁ̟̇❍✎  #fast
├ׁ̟̇❍✎  #fat
├ׁ̟̇❍✎  #nightcore
├ׁ̟̇❍✎  #reverse
├ׁ̟̇❍✎  #robot
├ׁ̟̇❍✎  #slow
├ׁ̟̇❍✎  #smooth
├ׁ̟̇❍✎  #tupai
*໋̇ꥇ╰ׁ̻─ׅׄ ⊹ٜ꒦۪߭ׄ꒷ٜ߭ׄ꒦۪߭ׄ꒷ٜ߭ׄ꒦۪߭ׄ꒷ٜ߭ׄ꒦۪߭ׄ꒷ٜ߭ׄ꒦۪߭ׄ꒷ٜ߭ׄ꒦۪߭ׄ꒷ٜ߭ׄ꒦۪ׄ߭꒷ٜ߭ׄ꒦۪ׄ߭꒷ٜׄ߭꒦*

╭ׅׄ̇─ׅ̻ׄ╮۪̇߭︹ׅ̟ׄ̇︹ׅ۪ׄ̇߭︹ׅ̟ׄ̇⊹۪̇߭︹ׅ̟ׄ̇︹ׅ۪ׄ̇߭︹ׅ̟ׄ̇⊹۪̇߭︹ׅ̟ׄ̇︹ׅ۪ׄ̇߭︹ׅ̟ׄ̇⊹
├ׁ̟̇  「 Cʜᴀᴛ ᴀɴᴏɴɪᴍᴏ 」
├━─━─━─≪≪✠≫≫─━─━─━╯
├ׁ̟̇❍✎  #start
├ׁ̟̇❍✎  #next
├ׁ̟̇❍✎  #leave
*໋̇ꥇ╰ׁ̻─ׅׄ ⊹ٜ꒦۪߭ׄ꒷ٜ߭ׄ꒦۪߭ׄ꒷ٜ߭ׄ꒦۪߭ׄ꒷ٜ߭ׄ꒦۪߭ׄ꒷ٜ߭ׄ꒦۪߭ׄ꒷ٜ߭ׄ꒦۪߭ׄ꒷ٜ߭ׄ꒦۪ׄ߭꒷ٜ߭ׄ꒦۪ׄ߭꒷ٜׄ߭꒦*

╭ׅׄ̇─ׅ̻ׄ╮۪̇߭︹ׅ̟ׄ̇︹ׅ۪ׄ̇߭︹ׅ̟ׄ̇⊹۪̇߭︹ׅ̟ׄ̇︹ׅ۪ׄ̇߭︹ׅ̟ׄ̇⊹۪̇߭︹ׅ̟ׄ̇︹ׅ۪ׄ̇߭︹ׅ̟ׄ̇⊹
├ׁ̟̇    「 Aᴜᴅɪᴏs 」
├━─━─━─≪≪✠≫≫─━─━─━╯
┃📒  #menuaudios
*໋̇ꥇ╰ׁ̻─ׅׄ ⊹ٜ꒦۪߭ׄ꒷ٜ߭ׄ꒦۪߭ׄ꒷ٜ߭ׄ꒦۪߭ׄ꒷ٜ߭ׄ꒦۪߭ׄ꒷ٜ߭ׄ꒦۪߭ׄ꒷ٜ߭ׄ꒦۪߭ׄ꒷ٜ߭ׄ꒦۪ׄ߭꒷ٜ߭ׄ꒦۪ׄ߭꒷ٜׄ߭꒦*

╭ׅׄ̇─ׅ̻ׄ╮۪̇߭︹ׅ̟ׄ̇︹ׅ۪ׄ̇߭︹ׅ̟ׄ̇⊹۪̇߭︹ׅ̟ׄ̇︹ׅ۪ׄ̇߭︹ׅ̟ׄ̇⊹۪̇߭︹ׅ̟ׄ̇︹ׅ۪ׄ̇߭︹ׅ̟ׄ̇⊹
├ׁ̟̇  「 Hᴇʀʀᴀᴍɪᴇɴᴛᴀs 」
├━─━─━─≪≪✠≫≫─━─━─━╯
├ׁ̟̇❍✎  #inspect *<link wa_gc>*
├ׁ̟̇❍✎  #chatgpt *<texto>*
├ׁ̟̇❍✎  #delchatgpt
├ׁ̟̇❍✎  #gptvoz *<texto>*
├ׁ̟̇❍✎  #dall-e *<texto>*
├ׁ̟̇❍✎  #spamwa *<numero|texto|cantidad>*
├ׁ̟̇❍✎  #tamaño *<cantidad> <imagen / video>*
├ׁ̟̇❍✎  #readviewonce *<imagen / video>*
├ׁ̟̇❍✎  #clima *<país> <ciudad>*
├ׁ̟̇❍✎  #encuesta *<texto1|texto2...>*
├ׁ̟̇❍✎  #afk *<motivo>*
├ׁ̟̇❍✎  #ocr *<responde a imagen>*
├ׁ̟̇❍✎  #hd *<responde a imagen>*
├ׁ̟̇❍✎  #acortar *<enlace / link / url>*
├ׁ̟̇❍✎  #calc *<operacion math>*
├ׁ̟̇❍✎  #del *<mensaje>*
├ׁ̟̇❍✎  #whatmusic *<audio>*
├ׁ̟̇❍✎  #readqr *<imagen (QR)>*
├ׁ̟̇❍✎  #qrcode *<texto>*
├ׁ̟̇❍✎  #readmore *<texto1| texto2>*
├ׁ̟̇❍✎  #styletext *<texto>*
├ׁ̟̇❍✎  #traducir *<texto>*
├ׁ̟̇❍✎  #nowa *<numero>*
├ׁ̟̇❍✎  #covid *<pais>*
├ׁ̟̇❍✎  #horario
├ׁ̟̇❍✎  #dropmail
*໋̇ꥇ╰ׁ̻─ׅׄ ⊹ٜ꒦۪߭ׄ꒷ٜ߭ׄ꒦۪߭ׄ꒷ٜ߭ׄ꒦۪߭ׄ꒷ٜ߭ׄ꒦۪߭ׄ꒷ٜ߭ׄ꒦۪߭ׄ꒷ٜ߭ׄ꒦۪߭ׄ꒷ٜ߭ׄ꒦۪ׄ߭꒷ٜ߭ׄ꒦۪ׄ߭꒷ٜׄ߭꒦*

╭ׅׄ̇─ׅ̻ׄ╮۪̇߭︹ׅ̟ׄ̇︹ׅ۪ׄ̇߭︹ׅ̟ׄ̇⊹۪̇߭︹ׅ̟ׄ̇︹ׅ۪ׄ̇߭︹ׅ̟ׄ̇⊹۪̇߭︹ׅ̟ׄ̇︹ׅ۪ׄ̇߭︹ׅ̟ׄ̇⊹
├ׁ̟̇       「 R ᴘ ɢ 」
├━─━─━─≪≪✠≫≫─━─━─━╯
├ׁ̟̇❍✎️  #adventure
├ׁ̟̇❍✎️  #cazar
├ׁ̟̇❍✎️  #cofre
├ׁ̟̇❍✎️  #balance
├ׁ̟̇❍✎️  #claim
├ׁ̟̇❍✎  #heal
├ׁ̟̇❍✎️  #lb
├ׁ̟̇❍✎️  #levelup
├ׁ̟̇❍✎️  #myns
├ׁ̟̇❍✎️  #perfil
├ׁ̟̇❍✎️  #work
├ׁ̟̇❍✎️  #minar
├ׁ̟̇❍✎️  #minar2
├ׁ̟̇❍✎️  #buy
├ׁ̟̇❍✎️  #buyall
├ׁ̟̇❍✎️  #verificar
├ׁ̟̇❍✎️  #robar *<cantidad> <@tag>*
├ׁ̟̇❍✎️  #transfer *<tipo> <cantidad> <@tag>*
├ׁ̟̇❍✎️  #unreg *<numero de serie>*
*໋̇ꥇ╰ׁ̻─ׅׄ ⊹ٜ꒦۪߭ׄ꒷ٜ߭ׄ꒦۪߭ׄ꒷ٜ߭ׄ꒦۪߭ׄ꒷ٜ߭ׄ꒦۪߭ׄ꒷ٜ߭ׄ꒦۪߭ׄ꒷ٜ߭ׄ꒦۪߭ׄ꒷ٜ߭ׄ꒦۪ׄ߭꒷ٜ߭ׄ꒦۪ׄ߭꒷ٜׄ߭꒦*

╭ׅׄ̇─ׅ̻ׄ╮۪̇߭︹ׅ̟ׄ̇︹ׅ۪ׄ̇߭︹ׅ̟ׄ̇⊹۪̇߭︹ׅ̟ׄ̇︹ׅ۪ׄ̇߭︹ׅ̟ׄ̇⊹۪̇߭︹ׅ̟ׄ̇︹ׅ۪ׄ̇߭︹ׅ̟ׄ̇⊹
├ׁ̟̇      「 Sᴛɪᴄᴋᴇʀ 」
├━─━─━─≪≪✠≫≫─━─━─━╯
├ׁ̟̇❍✎  #sticker *<responder a imagen o video>*
├ׁ̟̇❍✎  #sticker *<enlace / link / url>*
├ׁ̟̇❍✎  #sticker2 *<responder a imagen o video>*_
├ׁ̟̇❍✎  #sticker2 *<enlace / link / url>*
├ׁ̟̇❍✎  #s *<responder a imagen o video>*
├ׁ̟̇❍✎  #s *<enlace / link / url>*
├ׁ̟̇❍✎  #emojimix *<emoji 1>&<emoji 2>*
├ׁ̟̇❍✎  #scircle *<imagen>*
├ׁ̟̇❍✎  #sremovebg *<imagen>*
├ׁ̟̇❍✎  #semoji *<tipo> <emoji>*
├ׁ̟̇❍✎  #qc *<texto>*
├ׁ̟̇❍✎  #attp *<texto>*
├ׁ̟̇❍✎  #attp2 *<texto>*
├ׁ̟̇❍✎  #attp3 *<texto>*
├ׁ̟̇❍✎  #ttp *<texto>*
├ׁ̟̇❍✎  #ttp2 *<texto>*
├ׁ̟̇❍✎  #ttp3 *<texto>*
├ׁ̟̇❍✎  #ttp4 *<texto>*
├ׁ̟̇❍✎  #ttp5 *<texto>*
├ׁ̟̇❍✎  #pat *<@tag>*
├ׁ̟̇❍✎  #slap *<@tag>*
├ׁ̟̇❍✎  #kiss *<@tag>*
├ׁ̟̇❍✎  #dado
├ׁ̟̇❍✎  #wm *<packname> <author>*
├ׁ̟̇❍✎  #stickermarker *<efecto> <imagen>*
├ׁ̟̇❍✎  #stickerfilter *<efecto> <imagen>*
*໋̇ꥇ╰ׁ̻─ׅׄ ⊹ٜ꒦۪߭ׄ꒷ٜ߭ׄ꒦۪߭ׄ꒷ٜ߭ׄ꒦۪߭ׄ꒷ٜ߭ׄ꒦۪߭ׄ꒷ٜ߭ׄ꒦۪߭ׄ꒷ٜ߭ׄ꒦۪߭ׄ꒷ٜ߭ׄ꒦۪ׄ߭꒷ٜ߭ׄ꒦۪ׄ߭꒷ٜׄ߭꒦*
╭ׅׄ̇─ׅ̻ׄ╮۪̇߭︹ׅ̟ׄ̇︹ׅ۪ׄ̇߭︹ׅ̟ׄ̇⊹۪̇߭︹ׅ̟ׄ̇︹ׅ۪ׄ̇߭︹ׅ̟ׄ̇⊹۪̇߭︹ׅ̟ׄ̇︹ׅ۪ׄ̇߭︹ׅ̟ׄ̇⊹
├ׁ̟̇       「 Oᴡɴᴇʀ 」
├━─━─━─≪≪✠≫≫─━─━─━╯
├ׁ̟̇❍✎ #menuowner
*໋̇ꥇ╰ׁ̻─ׅׄ ⊹ٜ꒦۪߭ׄ꒷ٜ߭ׄ꒦۪߭ׄ꒷ٜ߭ׄ꒦۪߭ׄ꒷ٜ߭ׄ꒦۪߭ׄ꒷ٜ߭ׄ꒦۪߭ׄ꒷ٜ߭ׄ꒦۪߭ׄ꒷ٜ߭ׄ꒦۪ׄ߭꒷ٜ߭ׄ꒦۪ׄ߭꒷ٜׄ߭꒦*

ShizukaBot-MD|| Alba070503`.trim()
//conn.sendFile(m.chat, pp, 'lp.jpg', menu, m, false, { contextInfo: { mentionedJid }})
let img = await (await fetch('https://i.postimg.cc/Y0mKLkP0/Picsart-24-05-27-11-24-49-743.png')).buffer()  
await conn.sendMessage(m.chat, {
text: menu,
contextInfo: { 
mentionedJid: [m.sender],
forwardingScore: 9, 
externalAdReply: {
title: '❑— ShizukaBot-MD —❑\nWʜᴀᴛꜱᴀᴘᴘ Bᴏᴛ - Mᴜʟᴛɪ Dᴇᴠɪᴄᴇ',
//body: 'Wʜᴀᴛꜱᴀᴘᴘ Bᴏᴛ - Mᴜʟᴛɪ Dᴇᴠɪᴄᴇ',
thumbnail: img,
sourceUrl: 'https://whatsapp.com/channel/0029VaAN15BJP21BYCJ3tH04',
mediaType: 1,
renderLargerThumbnail: true
}}}, { quoted: m})
await m.react('🤖')	
} catch (e) {
//await conn.sendButton(m.chat, `\n${wm}`, lenguajeGB['smsMalError3']() + '#report ' + usedPrefix + command, null, [[lenguajeGB.smsMensError1(), `#reporte ${lenguajeGB['smsMensError2']()} *${usedPrefix + command}*`]], m)
console.log(`❗❗ Comuniquese con el creador${usedPrefix + command} ❗❗`)
console.log(e)	
}}
handler.help = ['menu', 'help', '?']
handler.tags = ['main']
handler.command = /^(menu|allmemu|herramientas|menú|comandos|allm\?)$/i
handler.register = true
handler.exp = 50
handler.fail = null
export default handler

const more = String.fromCharCode(8206)
const readMore = more.repeat(4001)
function clockString(ms) {
let h = isNaN(ms) ? '--' : Math.floor(ms / 3600000)
let m = isNaN(ms) ? '--' : Math.floor(ms / 60000) % 60
let s = isNaN(ms) ? '--' : Math.floor(ms / 1000) % 60
return [h, m, s].map(v => v.toString().padStart(2, 0)).join(':')}
