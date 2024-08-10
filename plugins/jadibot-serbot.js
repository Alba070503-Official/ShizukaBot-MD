const {
    useMultiFileAuthState,
    DisconnectReason,
    fetchLatestBaileysVersion, 
    MessageRetryMap,
    makeCacheableSignalKeyStore, 
    jidNormalizedUser,
    PHONENUMBER_MCC
} = await import('@whiskeysockets/baileys');

import NodeCache from 'node-cache';
import readline from 'readline';
import crypto from 'crypto';
import fs from "fs";
import pino from 'pino';
import * as ws from 'ws';
const { CONNECTING } = ws;
import { makeWASocket } from '../lib/simple.js';

if (global.conns instanceof Array) console.log();
else global.conns = [];

let handler = async (m, { conn: _conn, args, usedPrefix, command, isOwner }) => {

  async function serbot() {
    let authFolderB = crypto.randomBytes(10).toString('hex').slice(0, 8);

    if (!fs.existsSync("./serbot/"+ authFolderB)){
        fs.mkdirSync("./serbot/"+ authFolderB, { recursive: true });
    }
    args[0] ? fs.writeFileSync("./serbot/" + authFolderB + "/creds.json", JSON.stringify(JSON.parse(Buffer.from(args[0], "base64").toString("utf-8")), null, '\t')) : "";

    const { state, saveCreds } = await useMultiFileAuthState(`./serbot/${authFolderB}`);
    const { version } = await fetchLatestBaileysVersion();
    const msgRetryCounterCache = new NodeCache();

    const connectionOptions = {
        logger: pino({ level: 'silent' }),
        printQRInTerminal: false,
        auth: {
            creds: state.creds,
            keys: makeCacheableSignalKeyStore(state.keys, pino({ level: "fatal" }).child({ level: "fatal" })),
        },
        version,
        msgRetryCounterCache,
    };

    let conn = makeWASocket(connectionOptions);

    conn.isInit = false;
    let isInit = true;

    async function connectionUpdate(update) {
        const { connection, lastDisconnect, isNewLogin } = update;
        const code = lastDisconnect?.error?.output?.statusCode || lastDisconnect?.error?.output?.payload?.statusCode;
        if (code && code !== DisconnectReason.loggedOut && conn?.ws.socket == null) {
            let i = global.conns.indexOf(conn);
            if (i < 0) return console.log(await creloadHandler(true).catch(console.error));
            delete global.conns[i];
            global.conns.splice(i, 1);
        }
        
        if (connection == 'open') {
            conn.isInit = true;
            global.conns.push(conn);
            await m.reply(args[0] ? 'Conectado con éxito' : 'Conectado exitosamente con WhatsApp\n\n*Nota:* Esto es temporal\nSi el Bot principal se reinicia o se desactiva, todos los sub bots también lo harán\n\nEl número del bot puede cambiar, guarda este enlace:\n*-* https://whatsapp.com/channel/0029VaAN15BJP21BYCJ3tH04');
            await sleep(5000);
            if (args[0]) return;

            await conn.sendMessage(conn.user.jid, {
                text: `${usedPrefix + command} ${Buffer.from(fs.readFileSync("./serbot/" + authFolderB + "/creds.json"), "utf-8").toString("base64")}`,
                quoted: m
            });
        }
    }

    setInterval(async () => {
        if (!conn.user) {
            try { conn.ws.close(); } catch { }
            conn.ev.removeAllListeners();
            let i = global.conns.indexOf(conn);
            if (i < 0) return;
            delete global.conns[i];
            global.conns.splice(i, 1);
        }
    }, 60000);

    let handler = await import('../handler.js');
    let creloadHandler = async function (restatConn) {
        try {
            const Handler = await import(`../handler.js?update=${Date.now()}`).catch(console.error);
            if (Object.keys(Handler || {}).length) handler = Handler;
        } catch (e) {
            console.error(e);
        }
        if (restatConn) {
            try { conn.ws.close(); } catch { }
            conn.ev.removeAllListeners();
            conn = makeWASocket(connectionOptions);
            isInit = true;
        }

        if (!isInit) {
            conn.ev.off('messages.upsert', conn.handler);
            conn.ev.off('connection.update', conn.connectionUpdate);
            conn.ev.off('creds.update', conn.credsUpdate);
        }

        conn.handler = handler.handler.bind(conn);
        conn.connectionUpdate = connectionUpdate.bind(conn);
        conn.credsUpdate = saveCreds.bind(conn, true);

        conn.ev.on('messages.upsert', conn.handler);
        conn.ev.on('connection.update', conn.connectionUpdate);
        conn.ev.on('creds.update', conn.credsUpdate);
        isInit = false;
        return true;
    };
    creloadHandler(false);
  }
  serbot();
}
handler.help = ['code'];
handler.tags = ['serbot'];
handler.command = ['code', 'codebot'];
handler.rowner = false;

export default handler;

function sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}
