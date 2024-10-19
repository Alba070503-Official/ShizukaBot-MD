const { ttdl } = require('ruhend-scraper');
exports.default = {
   names: ['Downloader'],
   tags: ['tiktok', 'titit'],
   command: ['tt', 'tiktok', 'ttdl', 'titit', 'ttnowm'],
   start: async (m, {
      conn,
      text,
      prefix,
      command
   }) => {
      if (!text) return m.reply(`Masukan Tiktok contoh\n${prefix+command}` + ' https://vt.tiktok.com/ZSYfBvx5d/')
      let { title, author, username, published, like, comment, share, views, bookmark, video, cover: picture, music, profilePicture } = await ttdl(text);  
      conn.adReply(m.chat, loading, cover, m)
      let caption = `${star} 𝐓𝐈𝐊𝐓𝐎𝐊 ${star} \n`
      caption += `${setting.botName}\n`
      caption += `⭔ Author: ${author}\n`
      caption += `⭔ Username: ${username}\n`
      caption += `⭔ Description : ${title}\n`
      caption += `⭔ Published: ${published}\n`
      caption += `⭔ Like: ${like}\n`
      caption += `⭔ Comment: ${comment}\n`
      caption += `⭔ Views: ${views}\n`
      caption += `⭔ Bookmark: ${bookmark}`
      conn.adReply(m.chat, author, picture, m).then(() => {
         conn.sendFile(m.chat, video, {
            caption: caption,
            quoted: m
         })
      })
   },
   limit: 2
}
