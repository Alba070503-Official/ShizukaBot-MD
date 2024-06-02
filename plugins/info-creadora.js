const handler = async (m, {conn, usedPrefix}) => {
  const doc = ['pdf', 'zip', 'vnd.openxmlformats-officedocument.presentationml.presentation', 'vnd.openxmlformats-officedocument.spreadsheetml.sheet', 'vnd.openxmlformats-officedocument.wordprocessingml.document'];
  const document = doc[Math.floor(Math.random() * doc.length)];
  const text = `*—◉ 𝙴𝙻 𝙽𝚄𝙼𝙴𝚁𝙾 𝙳𝙴 𝙼𝙸 𝙲𝚁𝙴𝙰𝙳𝙾𝚁 𝙴𝚂 wa.me/+59175655964*

*—◉ El Numero del oficial de Alba070503_2:  wa.me/+59169082575*

*—◉ El Número Official de ShizukaBot-MD: wa.me/+59165892573*`.trim();
  const buttonMessage= {
    'document': {url: `https://whatsapp.com/channel/0029VaAN15BJP21BYCJ3tH04`},
    'mimetype': `application/${document}`,
    'fileName': `Numeros Oficiales`,
    'fileLength': 99999999999999,
    'pageCount': 200,
    'contextInfo': {
      'forwardingScore': 200,
      'isForwarded': true,
      'externalAdReply': {
        'mediaUrl': 'https://whatsapp.com/channel/0029VaAN15BJP21BYCJ3tH04',
        'mediaType': 2,
        'previewType': 'pdf',
        'title': '⛩️ShizukaBot-MD⛩️⁩',
        'body': wm,
        'thumbnail': 'https://qu.ax/SjlN.png',
        'sourceUrl': 'https://whatsapp.com/channel/0029VaAN15BJP21BYCJ3tH04'}},
    'caption': text,
    'footer': wm,
    // 'buttons':[
    // {buttonId: `${usedPrefix}menu`, buttonText: {displayText: '𝙼𝙴𝙽𝚄'}, type: 1},
    // {buttonId: `${usedPrefix}donar`, buttonText: {displayText: '𝙳𝙾𝙽𝙰𝚁'}, type: 1}],
    'headerType': 6};
  conn.sendMessage(m.chat, buttonMessage, {quoted: m});
};
handler.help = ['owner', 'creator'];
handler.tags = ['info'];
handler.command = /^(owner|creator|creador|propietario)$/i;
export default handler;
