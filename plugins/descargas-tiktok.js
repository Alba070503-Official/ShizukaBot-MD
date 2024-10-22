import fetch from 'node-fetch'

var handler = async (m, { conn, args, usedPrefix, command }) => {
  if (!args[0]) throw `Por favor, ingresa el enlace de TikTok.\n\nEjemplo: ${usedPrefix + command} https://vm.tiktok.com/ZMhFrtYNM/`
  
  let url = args[0]
  try {
    // Llama a la API con el enlace de TikTok proporcionado
    let res = await fetch(`https://apis-starlights-team.koyeb.app/starlight/tiktok2?url=${url}`)
    if (!res.ok) throw 'Error al descargar el video de TikTok'

    let json = await res.json()
    if (!json.videoUrl) throw 'No se encontró un video en el enlace proporcionado.'

    // Enviar el video
    await conn.sendFile(m.chat, json.videoUrl, 'tiktok.mp4', 'Aquí tienes tu video de TikTok', m)
  } catch (e) {
    throw 'Hubo un error al procesar el enlace de TikTok.'
  }
}

handler.help = ['tiktok <link>']
handler.tags = ['downloader']
handler.command = /^(tiktok|tiktokdl)$/i

export default handler
