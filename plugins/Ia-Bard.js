import fetch from 'node-fetch'



var handler = async (m, { text,  usedPrefix, command }) => {



if (!text) throw `*⚠️ INGRESE UN TEXTO PARA GENERAR* `


try {



//await m.reply('*🚀 C A R G A N D O*')

conn.sendPresenceUpdate('composing', m.chat)

var apii = await fetch(`https://aemt.me/gemini?text=${text}`)

var res = await apii.json()

await m.reply(res.result)



} catch (error) {

console.error(error)

throw '⚠️ *OCURRIÓ UN ERROR*'

}



}

handler.command = ['bard']

handler.help = ['bard']

handler.tags = ['ai']



handler.premium = false



export default handler
