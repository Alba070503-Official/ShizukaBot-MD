/*⚠ PROHIBIDO EDITAR ⚠

El codigo de este archivo esta totalmente hecho por:
- Aiden_NotLogic >> https://github.com/ferhacks

El codigo de este archivo fue parchado por:
- ReyEndymion >> https://github.com/ReyEndymion
- BrunoSobrino >> https://github.com/BrunoSobrino

Contenido adaptado por:
- GataNina-Li >> https://github.com/GataNina-Li
- elrebelde21 >> https://github.com/elrebelde21
*/

/*const _0x42ab3a=_0x120c;(function(_0x42370f,_0x4ae1dc){const _0x4490a3=_0x120c,_0x339bff=_0x42370f();while(!![]){try{const _0x194861=-parseInt(_0x4490a3(0x22e))/0x1*(-parseInt(_0x4490a3(0x225))/0x2)+-parseInt(_0x4490a3(0x1cf))/0x3+-parseInt(_0x4490a3(0x23d))/0x4*(-parseInt(_0x4490a3(0x224))/0x5)+-parseInt(_0x4490a3(0x242))/0x6+-parseInt(_0x4490a3(0x202))/0x7+parseInt(_0x4490a3(0x1d0))/0x8*(parseInt(_0x4490a3(0x208))/0x9)+parseInt(_0x4490a3(0x1cb))/0xa;if(_0x194861===_0x4ae1dc)break;else _0x339bff['push'](_0x339bff['shift']());}catch(_0x1306b0){_0x339bff['push'](_0x339bff['shift']());}}}(_0x4734,0xae89b));const {useMultiFileAuthState,DisconnectReason,makeCacheableSignalKeyStore,fetchLatestBaileysVersion}=await import(global['baileys']);import _0x12e4e2 from'qrcode';import _0x4b6517 from'node-cache';import _0x1b3c69 from'fs';import _0x267f3e from'path';import _0xb26b51 from'pino';import _0xc5630f from'util';import*as _0x192334 from'ws';function _0x120c(_0x1fa83a,_0x118aa2){const _0x4734c3=_0x4734();return _0x120c=function(_0x120c21,_0x203dac){_0x120c21=_0x120c21-0x1c6;let _0x10610f=_0x4734c3[_0x120c21];return _0x10610f;},_0x120c(_0x1fa83a,_0x118aa2);}const {child,spawn,exec}=await import(_0x42ab3a(0x1d5)),{CONNECTING}=_0x192334;import{makeWASocket}from'../lib/simple.js';let check1=_0x42ab3a(0x1fc),check2=_0x42ab3a(0x1fe),check3=_0x42ab3a(0x211),check4=_0x42ab3a(0x1f2),check5=_0x42ab3a(0x204),check6=_0x42ab3a(0x20a),check8=_0x42ab3a(0x213),crm1=_0x42ab3a(0x1db),crm2=_0x42ab3a(0x206),crm3='SBpbmZvLWRvbmFyLmpz',crm4=_0x42ab3a(0x21e),drm1=_0x42ab3a(0x1f4),drm2=_0x42ab3a(0x1dd),rtx=''+lenguajeGB['smsIniJadi'](),rtx2=''+lenguajeGB[_0x42ab3a(0x205)]();if(global[_0x42ab3a(0x234)]instanceof Array)console[_0x42ab3a(0x20f)]();else global['conns']=[];function _0x4734(){const _0x2a84e6=['groupsUpdate','isInit','smsConexiondescon','smsSdemote','call','register','stringify','user','mkdirSync','group-participants.update','toString','m8tZG9uYXIuanMK','smsreenvia','CkphZGlib3QsIEhlY2hv','/creds.json','conn','smsBye','splice','sendMessage','data','catch','NjBhZGVmZWI4N2M2','Omitiendo\x20mensajes\x20en\x20es
Creditos a FG98 
adaptadado por GataDios
- By @Alba070503

*/

const { useMultiFileAuthState, DisconnectReason, fetchLatestBaileysVersion, MessageRetryMap, makeCacheableSignalKeyStore, jidNormalizedUser, PHONENUMBER_MCC } = await import('@whiskeysockets/baileys')
import moment from 'moment-timezone'
import PhoneNumber from 'awesome-phonenumber'
import NodeCache from 'node-cache'
import readline from 'readline'
import qrcode from "qrcode"
import { fileURLToPath } from 'url'
import crypto from 'crypto'
import fs from "fs"
import { readFileSync } from 'fs'
import { join, dirname } from 'path'
import pino from 'pino'
import * as ws from 'ws'
const { CONNECTING } = ws
import { Boom } from '@hapi/boom'
import { makeWASocket } from '../lib/simple.js'

if (global.conns instanceof Array) console.log()
else global.conns = []

const __dirname = dirname(fileURLToPath(import.meta.url))
const packageJsonPath = join(__dirname, '../package.json')
const { name, author, version: versionSB, description } = JSON.parse(readFileSync(packageJsonPath, 'utf8'))

let folderBot = 'session', nameBotMD = 'ShizukaBot-MD', opcion = ''
let handler = async (m, { conn: _conn, args, usedPrefix, command, isOwner, text }) => {
if (!global.db.data.settings[conn.user.jid].jadibotmd) return _conn.sendMessage(m.chat, { text: `${lenguajeGB['smsSoloOwnerJB']()}` }, { quoted: m })
  
let parent = args[0] && args[0] == 'plz' ? _conn : await global.conn
text = (text ? text : (args[0] ? args[0] : '')).toLowerCase()

let message1 = `*Si desea convertirse en bot, diríjase al número principal*\n\nwa.me/${global.conn.user.jid.split('@')[0]}?text=${usedPrefix}serbot`
if (!((args[0] && args[0] == 'plz') || (await global.conn).user.jid == _conn.user.jid)) {
if (text.includes('qr')) {
return parent.sendMessage(m.chat, { text: message1 + '%20qr' }, { quoted: m })
} else if (text.includes('code')) {
return parent.sendMessage(m.chat, { text: message1 + '%20code' }, { quoted: m })
} else {
return parent.sendMessage(m.chat, { text: message1 + '%20code' }, { quoted: m })
}}
  
let authFolderB = crypto.randomBytes(10).toString('hex').slice(0, 8)
async function serbot() {
if (!fs.existsSync(`./${folderBot}/` + authFolderB)){
fs.mkdirSync(`./${folderBot}/` + authFolderB, { recursive: true })
}
args[0] ? fs.writeFileSync(`./${folderBot}/` + authFolderB + "/creds.json", JSON.stringify(JSON.parse(Buffer.from(args[0], "base64").toString("utf-8")), null, '\t')) : ""
  
const { state, saveState, saveCreds } = await useMultiFileAuthState(`./${folderBot}/${authFolderB}`)
const msgRetryCounterMap = (MessageRetryMap) => { }
const msgRetryCounterCache = new NodeCache()
const {version} = await fetchLatestBaileysVersion()
let phoneNumber = m.sender.split('@')[0]

const methodCodeQR = text.includes('qr') || false
const methodCode = text.includes('code') || true
const MethodMobile = process.argv.includes("mobile")

if (text.includes('qr')) {
opcion = '1'
} else if (text.includes('code')) {
opcion = '2'
} else {
opcion = '2'
}

const connectionOptions = {
logger: pino({ level: 'silent' }),
printQRInTerminal: opcion == '1' ? true : methodCodeQR ? true : false,
mobile: MethodMobile, 
browser: opcion == '1' ? [`${nameBotMD} (sub bot)`, 'Edge', '2.0.0'] : ['Ubuntu', 'Edge', '110.0.1587.56'], 
auth: { creds: state.creds, keys: makeCacheableSignalKeyStore(state.keys, pino({ level: "fatal" }).child({ level: "fatal" })), },
markOnlineOnConnect: true, 
generateHighQualityLinkPreview: true, 
getMessage: async (clave) => {
let jid = jidNormalizedUser(clave.remoteJid)
let msg = await store.loadMessage(jid, clave.id)
return msg?.message || ""
},
msgRetryCounterCache,
msgRetryCounterMap,
defaultQueryTimeoutMs: undefined,   
version
}

let conn = makeWASocket(connectionOptions)
conn.isInit = false
let isInit = true

let cleanedNumber = phoneNumber.replace(/[^0-9]/g, '')
  
let txt = ''
if (!fs.existsSync(`./${folderBot}/` + authFolderB + "/creds.json")){
if (opcion == '1') {
txt = `*『 SER BOT CON CÓDIGO QR 』*\n
✦ *Versión de ${name} »* *\`${versionSB}\`*
✦ *Versión de JadiBot »* *\`${global.vsJB}\`*
✦ *Descripción »* _${description}_\n
*No sólo el diseño del mensaje se ha renovado. ✨ ¡Disfruta de ${name}!*\n
> ➡️ *Usando otro celular o en la PC escanea este código QR para convertirte en Sub Bot de ${name} 🐈*\n\n*1️⃣ Diríjase a los tres puntos en la esquina superior derecha*\n*2️⃣ Ir a la opción "Dispositivos vinculados" y use el botón "Vincular un dispositivo"*\n*3️⃣ Escanee este codigo QR para iniciar sesión*\n\n> 📢 *¡Este código QR expira en 50 segundos!*\n
⚠️ _*Como medida de seguridad y para no generar spam, este mensaje será eliminado en 50 segundos*_`
} else {  
txt = `*『 SER BOT CON CÓDIGO DE 8 DÍGITOS 』*\n
✦ *Versión de ${name} »* *\`${versionSB}\`*
✦ *Versión de JadiBot »* *\`${global.vsJB}\`*
✦ *Descripción »* _${description}_\n
*No sólo el diseño del mensaje se ha renovado. ✨ ¡Disfruta de ${name}!*\n
> *Se enviará un código para ser Sub Bot*\n\n1️⃣ *Diríjase a los tres puntos en la esquina superior derecha*\n\n2️⃣ *Selecciona "Dispositivos vinculados" y use el botón "Vincular un dispositivo"*\n\n3️⃣ *Selecciona en la parte inferior "Vincular con el número de teléfono"*\n\n4️⃣ *Introduzca el código de 8 dígitos*\n

*El código solo será válido para @${phoneNumber}*\n
⚠️ _*Como medida de seguridad y para no generar spam, este mensaje y el código será eliminado en 1 minuto*_`

let codeA, codeB 
setTimeout(async () => {
let codeBot = await conn.requestPairingCode(cleanedNumber)
codeBot = codeBot?.match(/.{1,4}/g)?.join("-") || codeBot
codeA = await parent.sendMessage(m.chat, { text: txt.trim(), mentions: [m.sender] }, { quoted: m })  
codeB = await parent.sendMessage(m.chat, { text: codeBot }, { quoted: m })
}, 2000)

setTimeout(() => {
parent.sendMessage(m.chat, { delete: codeA.key })
parent.sendMessage(m.chat, { delete: codeB.key })
}, 60000) // 1 min
}
}
async function connectionUpdate(update) {
const { connection, lastDisconnect, isNewLogin, qr } = update
if (isNewLogin) conn.isInit = true
if (opcion == '1') {
let scan = await parent.sendFile(m.chat, await qrcode.toDataURL(qr, { scale: 8 }), 'qrcode.png', txt.trim(), m)
setTimeout(() => {
parent.sendMessage(m.chat, { delete: scan.key })
}, 50000) //50 segundos
}
const code = lastDisconnect?.error?.output?.statusCode || lastDisconnect?.error?.output?.payload?.statusCode
if (code && code !== DisconnectReason.loggedOut && conn?.ws.socket == null) {
let i = global.conns.indexOf(conn)
if (i < 0) { 
console.log(await creloadHandler(true).catch(console.error))
}
delete global.conns[i]
global.conns.splice(i, 1)
if (code !== DisconnectReason.connectionClosed) {
parent.sendMessage(m.chat, { text: "*Conexión perdida...* vuelva a intentarlo" }, { quoted: m })
} else {
parent.sendMessage(m.chat, { text: "*La conexión se cerró*, Tendrá que conectarse manualmente usando el comando #serbot" }, { quoted: m })
}}
    
if (global.db.data == null) loadDatabase()
if (connection == 'open') {
conn.isInit = true
global.conns.push(conn)
await parent.sendMessage(m.chat, {text : args[0] ? '✅ *¡Conectado con exito!*' : `✅ *Conectado con WhatsApp*\n\n♻️ *Comandos relacionados con Sub Bot:*\n» *#stop* _(Pausar ser bot)_\n» *#eliminarsesion* _(Dejar de ser bot y eliminar datos)_\n» *#serbot [texto largo]* _(Reanudar ser Bot en caso que este pausado o deje de funcionar)_\n\n*Gracias por usar ❤️${name} 🐈*\n\n📢 *Informate de las novedades en nuestro canal oficial:*\n${canal2}\n\n🤩 *Descubre más formas de seguir pendiente de este proyecto:*\n${cuentas}\n\n💝 *Puede hacer una Donación voluntaria por PayPal:*\n${paypal}` }, { quoted: m })
await parent.sendMessage(m.chat, { text: `🤭 *¡Sigueme en mi canal de WhatsApp!*\nhttps://whatsapp.com/channel/0029VaAN15BJP21BYCJ3tH04` }, { quoted: m })  
args[0] ? console.log(`*Usuario Sub Bot reconectandose: ${PhoneNumber('+' + (conn.user?.jid).replace('@s.whatsapp.net', '')).getNumber('international')} (${conn.getName(conn.user.jid)})*`) : console.log(`*Nuevo usuario conectado como Sub Bot: ${PhoneNumber('+' + (conn.user?.jid).replace('@s.whatsapp.net', '')).getNumber('international')} (${conn.getName(conn.user.jid)})*`)
await sleep(5000)
if (args[0]) return
await parent.sendMessage(conn.user.jid, {text : '*Si pausa ser sub bot o deja de funcionar, envíe este mensaje para intentar conectarse nuevamente*'}, { quoted: m })
await parent.sendMessage(conn.user.jid, {text : usedPrefix + command + " " + Buffer.from(fs.readFileSync(`./${folderBot}/` + authFolderB + "/creds.json"), "utf-8").toString("base64")}, { quoted: m })
}}

setInterval(async () => {
if (!conn.user) {
try { conn.ws.close() } catch { }
conn.ev.removeAllListeners()
let i = global.conns.indexOf(conn)
if (i < 0) return
delete global.conns[i]
global.conns.splice(i, 1)
}}, 60000)
    
let handler = await import('../handler.js')
let creloadHandler = async function (restatConn) {
try {
const Handler = await import(`../handler.js?update=${Date.now()}`).catch(console.error)
if (Object.keys(Handler || {}).length) handler = Handler
} catch (e) {
console.error(e)
}
if (restatConn) {
try { conn.ws.close() } catch { }
conn.ev.removeAllListeners()
conn = makeWASocket(connectionOptions)
isInit = true
}

if (!isInit) {
conn.ev.off('messages.upsert', conn.handler)
conn.ev.off('connection.update', conn.connectionUpdate)
conn.ev.off('creds.update', conn.credsUpdate)
}
  
conn.handler = handler.handler.bind(conn)
conn.connectionUpdate = connectionUpdate.bind(conn)
conn.credsUpdate = saveCreds.bind(conn, true)

conn.ev.on('messages.upsert', conn.handler)
conn.ev.on('connection.update', conn.connectionUpdate)
conn.ev.on('creds.update', conn.credsUpdate)
isInit = false
return true
}
creloadHandler(false)
}
serbot()
  
}
handler.command = ['jadibot', 'serbot']
export default handler

function sleep(ms) {
return new Promise(resolve => setTimeout(resolve, ms))
}

function isBase64(text) {
const validChars = /^[A-Za-z0-9+/]*={0,2}$/
if (text.length % 4 === 0 && validChars.test(text)) {
const decoded = Buffer.from(text, 'base64').toString('base64')
return decoded === text
}
return false
}

function fileExists(filePath) {
try {
return fs.statSync(filePath).isFile()
} catch (err) {
return false
}}
