require("./settings")
const store = makeInMemoryStore({ "logger": pino({ "level": "silent" }).child({ "level": "silent" })})
const nodeCache = new NodeCache()
const useCODE = true
const useQR = !useCODE

const client = {}

const jadibot = async (x, nx, from) => {
  const { state, saveCreds } = await useMultiFileAuthState(`./jadibts/${nx.sender.split("@")[0]}`)
  try {
    async function startJadibot() {
      const { version, isLatest } = await fetchLatestBaileysVersion()
      client[from] = require("./x").makeWASocket({
        version,
        keepAliveInternalMs: 30000,
        printQRInTerminal: useQR && !useCODE,
        generateHighQualityLinkPreview: true,
        msgRetryCounterCache: nodeCache,
        markOnlineOnConnect: true,
        defaultQueryTimeoutMs: undefined,
        logger: pino({ level: "fatal" }),
        auth: state,
        browser: ["Ubuntu", "Chrome", "20.0.04"]
      })
      store.bind(client[from].ev)
      
      if (useCODE && !client[from].user && !client[from].authState.creds.registered) {
        setTimeout(async () => {
          code = await client[from].requestPairingCode(nx.sender.split("@")[0])
          code = code?.match(/.{1,4}/g)?.join("-") || code
          x.sendMessage(from, { video: tutorvid, caption: `Kode Pairing @${nx.sender.split("@")[0]} Adalah : ${code}\n\n*TUTORIAL MASUKIN CODE CEK VIDEO DI ATAS, KALAU MAU STOP KETIK .stopjadibot*`, mentions: [nx.sender] }, { quoted: nx })
        }, 3000)
      }
      
      client[from].ev.on("connection.update", async up => {
        const { lastDisconnect, connection } = up
        const reason = new Boom(lastDisconnect?.error)?.output.statusCode
        if (connection == "open") {
          console.log("Terhubung ( " + client[from].user?.["id"]["split"](":")[0] + " )")
        }
        if (connection === "close") {
          if (reason === DisconnectReason.restartRequired) {
            console.log("Restart Required, Restarting...")
            return startJadibot()
          } else if (reason === DisconnectReason.timedOut) {
            console.log(color("Connection TimedOut, Reconnecting..."))
            return startJadibot()
          } else {
            return x.sendMessage(from, { text: "Anda sudah tidak lagi menjadi bot." })
          }
        }
      })
      
      client[from].ev.process(async (events) => {
        if (events['messages.upsert']) {
          const upsert = events['messages.upsert']
          for (let msg of upsert.messages) {
            if (!msg.message) {
              return
            }
            if (msg.key.remoteJid === 'status@broadcast') {
              if (msg.message?.protocolMessage) return
              console.log(`Lihat Status ${msg.pushName} ${msg.key.participant.split('@')[0]}`)
              await client[from].readMessages([msg.key])
              await delay(1000)
              return await client[from].readMessages([msg.key])
            }
            const nx = smsg(client[from], msg)
            require("./case")(client[from], nx, store)
          }
        }
      })
      
      client[from].ev.on('group-participants.update', async (anu) => {
        try {
          var isWelcome = welcome.includes(anu.id)
        } catch {
          var isWelcome = false
        }
        if (isWelcome) {
          console.log(anu)
          const metadata = await client[from].groupMetadata(anu.id)
          const participants = anu.participants
          for (let num of participants) {
            try {
              ppuser = await client[from].profilePictureUrl(num, 'image')
            } catch {
              ppuser = 'https://telegra.ph/file/e323980848471ce8e2150.png'
            }
            if (anu.action == 'add') {
              const txtwel = `Welcome Sis @${num.split("@")[0]}, I hope you feel at home and always healthy`
              await client[from].sendMessage(anu.id, { image: { url: ppuser }, caption: txtwel, contextInfo: { forwardingScore: 9999999, isForwarded: true, mentionedJid: [num] }})
            } else if (anu.action == 'remove') {
              const txtlea = `Goodbye sis @${num.split("@")[0]}, don't forget your friends here, I hope you are always healthy`
              await client[from].sendMessage(anu.id, { image: { url: ppuser }, caption: txtlea, contextInfo: { forwardingScore: 9999999, isForwarded: true, mentionedJid: [num] }})
            }
          }
        }
      })
      
      client[from].ev.on('creds.update', saveCreds)
    }
    return startJadibot()
  } catch (e) {
    console.log(e)
  }
}

async function stopjadibot(x, from) {
  if (!Object.keys(client).includes(from)) {
    return x.sendMessage(from, { text: "Anda tidak ada di list jadi bot." })
  }
  try {
    client[from].end("Stop")
  } catch {}
  delete client[from]
  rimraf.sync(`./jadibts/${from.split("@")[0]}`)
}

async function listjadibot(x, nx) {
  let from = nx.key.remoteJid
  let mentions = []
  let text = "List Jadi Bot :\n"
  for (let jadibot of Object.values(client)) {
    mentions.push(jadibot.user.jid)
    text += ` × @${jadibot.user.jid.split("@")[0]}\n`
  }
  return x.sendMessage(from, { text: text.trim(), mentions, })
}

module.exports = { jadibot, stopjadibot, listjadibot }
