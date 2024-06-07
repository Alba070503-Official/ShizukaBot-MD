import fetch from 'node-fetch';
const handler = async (m, {conn, usedPrefix, usedPrefix: _p, __dirname, text, isPrems}) => {
  if (usedPrefix == 'a' || usedPrefix == 'A') return;
  try {
    const pp = imagen4;
    // let vn = './media/menu.mp3'
    const img = './Menu2.jpg';
    const d = new Date(new Date + 3600000);
    const locale = 'es';
    const week = d.toLocaleDateString(locale, {weekday: 'long'});
    const date = d.toLocaleDateString(locale, {day: 'numeric', month: 'long', year: 'numeric'});
    const _uptime = process.uptime() * 1000;
    const uptime = clockString(_uptime);
    const user = global.db.data.users[m.sender];
    const {money, joincount} = global.db.data.users[m.sender];
    const {exp, limit, level, role} = global.db.data.users[m.sender];
    const rtotalreg = Object.values(global.db.data.users).filter((user) => user.registered == true).length;
    const rtotal = Object.entries(global.db.data.users).length || '0'
    const more = String.fromCharCode(8206);
    const readMore = more.repeat(850);
    const taguser = '@' + m.sender.split('@s.whatsapp.net')[0];
    const doc = ['pdf', 'zip', 'vnd.openxmlformats-officedocument.presentationml.presentation', 'vnd.openxmlformats-officedocument.spreadsheetml.sheet', 'vnd.openxmlformats-officedocument.wordprocessingml.document'];
    const document = doc[Math.floor(Math.random() * doc.length)];
    const { key } = await conn.sendMessage(m.chat, {text: `${wait}`}, {quoted: m})
await conn.sendMessage(m.chat, {text: `Bienvenido al menu esperame un rato que cargue:-)`, edit: key})
  await conn.sendMessage(m.chat, {text: ` Sigueme en YouTube : https://youtube.com/@AlbaO7O503
     `, edit: key})
await conn.sendMessage(m.chat, {text: ` Sigueme en Github : https://github.com/Alba070503
     `, edit: key})                                               
    const str = `╭═══〘 ✯✯✯✯✯✯✯✯✯ 〙══╮
║    ◉— *⛩️ NaiBot-MD ⛩️* —◉
║≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡║
║🥀 *𝗛ola, ${taguser} Bienvenido al menu*
║≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡║
║🥀 *Owner:* *Alba070503*
║🥀 *Numero:* wa.me/59177601773
║🥀 *Bot ofc:* wa.me/59165082575
║🥀 *Bot ofc 2:* wa.me/59165892573
║🥀 *YouTube:* Alba070503
║🥀 *Fecha:* ${date}
║🥀 *Tiempo activo:* ${uptime}
║🥀 *Versión Actual:* *1.4*
╰═══╡✯✯✯✯✯✯✯✯✯╞═══╯'
> ShizukaBot-MD`.trim();
    if (m.isGroup) {
      // await conn.sendFile(m.chat, vn, 'menu.mp3', null, m, true, { type: 'audioMessage', ptt: true})
      const fkontak2 = {'key': {'participants': '0@s.whatsapp.net', 'remoteJid': 'status@broadcast', 'fromMe': false, 'id': 'Halo'}, 'message': {'contactMessage': {'vcard': `BEGIN:VCARD\nVERSION:3.0\nN:Sy;Bot;;;\nFN:y\nitem1.TEL;waid=${m.sender.split('@')[0]}:${m.sender.split('@')[0]}\nitem1.X-ABLabel:Ponsel\nEND:VCARD`}}, 'participant': '0@s.whatsapp.net'};
      conn.sendMessage(m.chat, {image: pp, caption: str.trim(), mentions: [...str.matchAll(/@([0-9]{5,16}|0)/g)].map((v) => v[1] + '@s.whatsapp.net')}, {quoted: m});
    } else {
      // await conn.sendFile(m.chat, vn, 'menu.mp3', null, m, true, { type: 'audioMessage', ptt: true})
      const fkontak2 = {'key': {'participants': '0@s.whatsapp.net', 'remoteJid': 'status@broadcast', 'fromMe': false, 'id': 'Halo'}, 'message': {'contactMessage': {'vcard': `BEGIN:VCARD\nVERSION:3.0\nN:Sy;Bot;;;\nFN:y\nitem1.TEL;waid=${m.sender.split('@')[0]}:${m.sender.split('@')[0]}\nitem1.X-ABLabel:Ponsel\nEND:VCARD`}}, 'participant': '0@s.whatsapp.net'};
      conn.sendMessage(m.chat, {image: pp, caption: str.trim(), mentions: [...str.matchAll(/@([0-9]{5,16}|0)/g)].map((v) => v[1] + '@s.whatsapp.net')}, {quoted: fkontak2});
    }
  } catch {
    conn.reply(m.chat, '*[❗𝐈𝐍𝐅𝐎❗] 𝙴𝙻 𝙼𝙴𝙽𝚄 𝚃𝙸𝙴𝙽𝙴 𝚄𝙽 𝙴𝚁𝚁𝙾𝚁 𝚈 𝙽𝙾 𝙵𝚄𝙴 𝙿𝙾𝚂𝙸𝙱𝙻𝙴 𝙴𝙽𝚅𝙸𝙰𝚁𝙻𝙾, 𝚁𝙴𝙿𝙾𝚁𝚃𝙴𝙻𝙾 𝙰𝙻 𝙿𝚁𝙾𝙿𝙸𝙴𝚃𝙰𝚁𝙸𝙾 𝙳𝙴𝙻 𝙱𝙾𝚃*', m);
  }
};

    m.react('💻')
   
    conn.sendMessage(m.chat, { video: { url: [pp, pp2, pp3, pp4].getRandom() }, gifPlayback: true, caption: text.trim(), mentions: [m.sender] }, { quoted: m })
let listSections = []    
listSections.push({
title: '',
rows: [{ header: "Menu Completo", title: "", id: `.allmenu`, description: `Para ver todos los comandos\n` }, { header: "SudBot", title: "", id: `.serbot --code`, description: `Para volverte sudbot 🤖\n` },
{ header: "Velocidad", title: "", id: `.ping`, description: `Ver velocidad del bot\n` },
{ header: "Play", title: "", id: `.play`, description: `Para descargar musica 🎧\n` },
{ header: "creador", title: "", id: `.owner`, description: `comunicate con mi creador ⚙️` }
]})


await conn.sendList(m.chat, '👋🏻 Hola¡! Bienvenido A Mi Sub Menú\n\n*Creador:* Alba070503\n*Versión:* 1.0.0\n\n💮 si hay algún error puedes contactarme, usa el comando: #owner\n\nGracias¡! 🔴', null, `Selecione la opción correcta (⁠・⁠∀⁠・⁠)`, listSections,
 { mentions: [m.sender]}, {quoted: m})
   } catch (e) {
        conn.reply(m.chat, '❎ Lo sentimos, el menú tiene un error.', m)
    throw e
  }
}

handler.help = ['menu']
handler.tags = ['main']
handler.command = ['menu', 'ayuda', 'comandos'] 
handler.register = true 
export default handler


const more = String.fromCharCode(8206)
const readMore = more.repeat(4001)

function clockString(ms) {
  let h = isNaN(ms) ? '--' : Math.floor(ms / 3600000)
  let m = isNaN(ms) ? '--' : Math.floor(ms / 60000) % 60
  let s = isNaN(ms) ? '--' : Math.floor(ms / 1000) % 60
  return [h, m, s].map(v => v.toString().padStart(2, 0)).join(':')
      }
