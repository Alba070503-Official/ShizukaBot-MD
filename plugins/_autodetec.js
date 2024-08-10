let WAMessageStubType = (await import(global.baileys)).default
import { readdirSync, unlinkSync, existsSync, promises as fs, rmSync } from 'fs';
import path from 'path';
import '../plugins/_content.js'

let handler = m => m
handler.before = async function (m, { conn, participants, groupMetadata }) {

    if (!m.messageStubType || !m.isGroup) return

    let usuario = `@${m.sender.split`@`[0]}`
    let chat = global.db.data.chats[m.chat]
    let users = participants.map(u => conn.decodeJid(u.id))
    const groupAdmins = participants.filter(p => p.admin)
    const listAdmin = groupAdmins.map((v, i) => `*» ${i + 1}. @${v.id.split('@')[0]}*`).join('\n')

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
        let mentioned1 = m.messageStubParameters[0].split('@')[0];
        let sender1 = m.sender.split('@')[0];
        let txt1 = `🌸 *Nuevo admin*\n\n`;
        txt1 += `Nombre: @${mentioned1}\n`;
        txt1 += `Le otorgó admin: @${sender1}`;
        
        await conn.sendMessage(m.chat, {
    text: txt1,
    mentions: [`${mentioned1}@s.whatsapp.net`, `${sender1}@s.whatsapp.net`],
    contextInfo: {
        mentionedJid: [`${mentioned1}@s.whatsapp.net`, `${sender1}@s.whatsapp.net`],
        externalAdReply: {
            showAdAttribution: true,
            containsAutoReply: true,
            renderLargerThumbnail: true,
            title: `ShizukaBot-MD Powered SpaceNigth Team `,
            body: `*ੈ✩‧₊˚ 『SpaceNight Team』 *ੈ✩‧₊˚`,
            mediaType: 1,
            thumbnail: `https://telegra.ph/file/2828af24b9bd004bad80c.jpg`,
            mediaUrl: `https://whatsapp.com/channel/0029VaAN15BJP21BYCJ3tH04`,
            sourceUrl: `https://whatsapp.com/channel/0029VaAN15BJP21BYCJ3tH04`
        }
    }
});
    } else if (chat.detect && m.messageStubType == 30) {
        let mentioned2 = m.messageStubParameters[0].split('@')[0];
        let sender2 = m.sender.split('@')[0];
        let txt2 = `🌸 *Un admin menos*\n\n`;
        txt2 += `Nombre: @${mentioned2}\n`;
        txt2 += `Le quitó admin: @${sender2}`;
        
        await conn.sendMessage(m.chat, {
    text: txt2,
    mentions: [`${mentioned2}@s.whatsapp.net`, `${sender2}@s.whatsapp.net`],
    contextInfo: {
        mentionedJid: [`${mentioned2}@s.whatsapp.net`, `${sender2}@s.whatsapp.net`],
        "externalAdReply": {
            "showAdAttribution": true,
            "containsAutoReply": true,
            "renderLargerThumbnail": true,
            "title": `ShizukaBot-MD Powered SpaceNigth Team `,
            "body": `*ੈ✩‧₊˚ 『SpaceNight Team』 *ੈ✩‧₊˚`,
            "containsAutoReply": true,
            "mediaType": 1,
            "thumbnail": `https://telegra.ph/file/2828af24b9bd004bad80c.jpg`,
            "mediaUrl": `https://whatsapp.com/channel/0029VaAN15BJP21BYCJ3tH04`,
            "sourceUrl": `https://whatsapp.com/channel/0029VaAN15BJP21BYCJ3tH04`
        }
    }
});
    } else if (chat.detect && m.messageStubType == 72) {
        await this.sendMessage(m.chat, { text: lenguajeGB['smsAvisoIIG']() + mid.smsAutodetec9(usuario, m), mentions: [m.sender] }, { quoted: fkontak })
    } else if (chat.detect && m.messageStubType == 123) {
        await this.sendMessage(m.chat, { text: lenguajeGB['smsAvisoIIG']() + mid.smsAutodetec10(usuario, m), mentions: [m.sender] }, { quoted: fkontak })
    } else {
        //console.log({
        //    messageStubType: m.messageStubType,
        //    messageStubParameters: m.messageStubParameters,
        //    type: WAMessageStubType[m.messageStubType], 
        //})
    }
}

export default handler
