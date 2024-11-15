import fetch from 'node-fetch';
import yts from 'yt-search';
import ytdl from 'ytdl-core';
import axios from 'axios';
import { youtubedl, youtubedlv2 } from '@bochilteam/scraper';

const LimitAud = 725 * 1024 * 1024; // 700MB
const LimitVid = 425 * 1024 * 1024; // 425MB

const handler = async (m, { conn, command, args, text, usedPrefix }) => {
  if (!text) {
    return conn.reply(
      m.chat,
      `*🤔 Que estás buscando? 🤔*\n*Ingrese el nombre de la canción o video*\n\n*Ejemplo:*\n#play emilia 420`,
      m
    );
  }

  const yt_play = await search(args.join(' '));
  if (!yt_play.length) return conn.reply(m.chat, "No se encontraron resultados.", m);

  const video = yt_play[0];
  const infoText = `📌 *Título*: ${video.title}\n📆 *Publicado*: ${video.ago}\n⌚ *Duración*: ${secondString(video.duration.seconds)}`;

  await conn.sendFile(m.chat, video.thumbnail, 'thumbnail.jpg', infoText, m);

  // Opciones para manejar los comandos "play" (audio) y "play2" (video)
  if (command === 'play' || command === 'musica') {
    await downloadAudio(conn, m, video, LimitAud);
  } else if (command === 'play2' || command === 'video') {
    await downloadVideo(conn, m, video, LimitVid);
  }
};

async function downloadAudio(conn, m, video, LimitAud) {
  try {
    const apiUrl = `https://deliriussapi-oficial.vercel.app/download/ytmp3?url=${encodeURIComponent(video.url)}`;
    const apiResponse = await fetch(apiUrl);
    const data = await apiResponse.json();

    if (!data.status) throw new Error("No se pudo descargar el audio");

    const downloadUrl = data.data.download.url;
    const fileSize = await getFileSize(downloadUrl);

    if (fileSize > LimitAud) {
      await conn.sendMessage(m.chat, { document: { url: downloadUrl }, mimetype: 'audio/mpeg', fileName: `${video.title}.mp3` }, { quoted: m });
    } else {
      await conn.sendMessage(m.chat, { audio: { url: downloadUrl }, mimetype: 'audio/mpeg' }, { quoted: m });
    }
  } catch (e1) {
    console.error("Error en la descarga del audio (método 1):", e1);
    await alternativeAudioDownload(conn, m, video);
  }
}

async function downloadVideo(conn, m, video, LimitVid) {
  try {
    const apiUrl = `https://deliriussapi-oficial.vercel.app/download/ytmp4?url=${encodeURIComponent(video.url)}`;
    const apiResponse = await fetch(apiUrl);
    const data = await apiResponse.json();

    if (!data.status) throw new Error("No se pudo descargar el video");

    const downloadUrl = data.data.download.url;
    const fileSize = await getFileSize(downloadUrl);

    if (fileSize > LimitVid) {
      await conn.sendMessage(m.chat, { document: { url: downloadUrl }, fileName: `${video.title}.mp4`, caption: `🔰 Aquí está tu video` }, { quoted: m });
    } else {
      await conn.sendMessage(m.chat, { video: { url: downloadUrl }, fileName: `${video.title}.mp4`, caption: `🔰 Aquí está tu video`, mimetype: 'video/mp4' }, { quoted: m });
    }
  } catch (e1) {
    console.error("Error en la descarga del video (método 1):", e1);
    await alternativeVideoDownload(conn, m, video);
  }
}

async function alternativeAudioDownload(conn, m, video) {
  try {
    const res = await fetch(`https://api.zenkey.my.id/api/download/ytmp3?apikey=zenkey&url=${video.url}`);
    const audioData = await res.json();

    if (audioData.status && audioData.result?.downloadUrl) {
      await conn.sendMessage(m.chat, { audio: { url: audioData.result.downloadUrl }, mimetype: 'audio/mpeg' }, { quoted: m });
    }
  } catch (e2) {
    console.error("Error en la descarga alternativa del audio:", e2);
    await m.react('❌');
  }
}

async function alternativeVideoDownload(conn, m, video) {
  try {
    const res = await fetch(`https://exonity.tech/api/ytdlp2-faster?apikey=adminsepuh&url=${video.url}`);
    const data = await res.json();

    if (data.result?.media?.mp4) {
      const fileSize = await getFileSize(data.result.media.mp4);
      if (fileSize > LimitVid) {
        await conn.sendMessage(m.chat, { document: { url: data.result.media.mp4 }, fileName: `${video.title}.mp4`, caption: `🔰 Aquí está tu video` }, { quoted: m });
      } else {
        await conn.sendMessage(m.chat, { video: { url: data.result.media.mp4 }, fileName: `${video.title}.mp4`, caption: `🔰 Aquí está tu video`, mimetype: 'video/mp4' }, { quoted: m });
      }
    }
  } catch (e2) {
    console.error("Error en la descarga alternativa del video:", e2);
    await m.react('❌');
  }
}

async function search(query, options = {}) {
  const search = await yts.search({ query, hl: 'es', gl: 'ES', ...options });
  return search.videos;
}

function MilesNumber(number) {
  return number.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".");
}

function secondString(seconds) {
  const h = Math.floor(seconds / 3600);
  const m = Math.floor((seconds % 3600) / 60);
  const s = seconds % 60;
  return `${h ? h + "h " : ""}${m ? m + "m " : ""}${s}s`;
}

async function getFileSize(url) {
  try {
    const response = await fetch(url, { method: 'HEAD' });
    return response.headers.get('content-length') ? parseInt(response.headers.get('content-length'), 10) : 0;
  } catch (error) {
    console.error("Error al obtener el tamaño del archivo", error);
    return 0;
  }
}

export default handler;
