let WAMessageStubType = (await import(global.baileys)).default
import { readdirSync, unlinkSync, existsSync, promises as fs, rmSync } from 'fs';
import path from 'path';
import '../plugins/_content.js'

let handler = m => m
handler.before = async function (m, { conn, participants, groupMetadata}) {

if (!m.messageStubType || !m.isGroup) return
let usuario = `@${m.sender.split`@`[0]}`
let chat = global.db.data.chats[m.chat]
let users = participants.map(u => conn.decodeJid(u.id))
const groupAdmins = participants.filter(p => p.admin)
const listAdmin = groupAdmins.map((v, i) => `*» ${i + 1}. @${v.id.split('@')[0]}*`).join('\n')
/*if (chat.detect && m.messageStubType == 2) {
const chatId = m.isGroup ? m.chat : m.sender;
const uniqid = chatId.split('@')[0];
const sessionPath = './GataBotSession/';
const files = await fs.readdir(sessionPath);
let filesDeleted = 0;
for (const file of files) {
if (file.includes(uniqid)) {
await fs.unlink(path.join(sessionPath, file));
filesDeleted++;
console.log(`⚠️ Eliminacion session (PreKey) que provocan el undefined el chat`)}}}*/
if (chat.detect && m.messageStubType == 21) {
await this.sendMessage(m.chat, { text: lenguajeGB['smsAvisoAG']() + mid.smsAutodetec1(usuario, m), mentions: [m.sender], mentions: [...groupAdmins.map(v => v.id)] }, { quoted: fkontak })   
} else if (chat.detect && m.messageStubType == 22) {
await this.sendMessage(m.chat, { text: lenguajeGB['smsAvisoIIG']() + mid.smsAutodetec2(usuario, groupMetadata), mentions: [m.sender] }, { quoted: fkontak })  
} else if (chat.detect && m.messageStubType == 23) {
await this.sendMessage(m.chat, { text: lenguajeGB['smsAvisoIIG']() + mid.smsAutodetec5(groupMetadata, usuario), mentions: [m.sender] }, { quoted: fkontak }) 
} else if (chat.detect && m.messageStubType == 24) {
await this.sendMessage(m.chat, { text: lenguajeGB['smsAvisoIIG']() + mid.smsAutodetec3(usuario, m), mentions: [m.sender] }, { quoted: fkontak }) 
} else if (chat.detect && m.messageStubType == 25) {
await this.sendMessage(m.chat, { text: lenguajeGB['smsAvisoIIG']() + mid.smsAutodetec4(usuario, m, groupMetadata), mentions: [m.sender] }, { quoted: fkontak })
} else if (chat.detect && m.messageStubType == 26) {
await this.sendMessage(m.chat, { text: lenguajeGB['smsAvisoIIG']() + mid.smsAutodetec6(m), mentions: [m.sender] }, { quoted: fkontak })
} else if (chat.detect && m.messageStubType == 29) {
let txt1 = `🌸 *Nuevo admin*\n\n`
txt1 += `Nombre: @${m.messageStubParameters[0].split`@`[0]}\n`
txt1 += `Le otorgó admin: @${m.sender.split`@`[0]}`
await conn.sendMessage(m.chat, {text: txt1, mentions: [...txt1.matchAll(/@([0-9]{5,16}|0)/g)].map((v) => v[1] + '@s.whatsapp.net'), contextInfo: { mentionedJid: [...txt1.matchAll(/@([0-9]{5,16}|0)/g)].map((v) => v[1] + '@s.whatsapp.net'), "externalAdReply": {"showAdAttribution": true, "containsAutoReply": true, "renderLargerThumbnail": true, "title": global.packname, "body": `*ੈ✩‧₊˚ 『SpaceNight Team』 *ੈ✩‧₊˚`, "containsAutoReply": true, "mediaType": 1, "thumbnail": img, "mediaUrl": `https://whatsapp.com/channel/0029VaAN15BJP21BYCJ3tH04`, "sourceUrl": `https://whatsapp.com/channel/0029VaAN15BJP21BYCJ3tH04`}}})
} else if (chat.detect && m.messageStubType == 30) {
let txt2 = `🌸 *Un admin menos*\n\n`
txt2 += `Nombre: @${m.messageStubParameters[0].split`@`[0]}\n`
txt2 += `Le quitó admin: @${m.sender.split`@`[0]}`
await conn.sendMessage(m.chat, {text: txt2, mentions: [...txt2.matchAll(/@([0-9]{5,16}|0)/g)].map((v) => v[1] + '@s.whatsapp.net'), contextInfo: { mentionedJid: [...txt2.matchAll(/@([0-9]{5,16}|0)/g)].map((v) => v[1] + '@s.whatsapp.net'), "externalAdReply": {"showAdAttribution": true, "containsAutoReply": true, "renderLargerThumbnail": true, "title": global.packname, "body": `*ੈ✩‧₊˚ 『SpaceNight Team』 *ੈ✩‧₊˚ `, "containsAutoReply": true, "mediaType": 1, "thumbnail": img, "mediaUrl": `https://whatsapp.com/channel/0029VaAN15BJP21BYCJ3tH04`, "sourceUrl": `https://whatsapp.com/channel/0029VaAN15BJP21BYCJ3tH04`}}})                                                                                                                                                                                                                                                         
} else if (chat.detect && m.messageStubType == 72) {
await this.sendMessage(m.chat, { text: lenguajeGB['smsAvisoIIG']() + mid.smsAutodetec9(usuario, m), mentions: [m.sender] }, { quoted: fkontak })
} else if (chat.detect && m.messageStubType == 123) {
await this.sendMessage(m.chat, { text: lenguajeGB['smsAvisoIIG']() + mid.smsAutodetec10(usuario, m), mentions: [m.sender] }, { quoted: fkontak })
} else {
//console.log({messageStubType: m.messageStubType,
//messageStubParameters: m.messageStubParameters,
//type: WAMessageStubType[m.messageStubType], 
//})
}}
export default handler
