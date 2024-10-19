import fg from 'api-dylux';
import axios from 'axios';
import cheerio from 'cheerio';
import { tiktok } from "@xct007/frieren-scraper";
import { generateWAMessageFromContent } from '@whiskeysockets/baileys';
import { tiktokdl } from '@bochilteam/scraper';
const { ttdl } = require('ruhend-scraper');

let handler = async (m, { conn, text, args, usedPrefix, command }) => {
  if (!text) throw `*✘error✘*\n\n_Usa el comando correctamente_\n\n_Ejemplo: ${usedPrefix + command} https://vm.tiktok.com/example/_`;
  if (!/(?:https:?\/{2})?(?:w{3}|vm|vt|t)?\.?tiktok.com\/([^\s&]+)/gi.test(text)) throw `*✘error✘* _Usa el comando correctamente_\n\n_Ejemplo: ${usedPrefix + command} https://vm.tiktok.com/example/_`;

  let mensajeEspera = `_🍁 @${m.sender.split`@`[0]} ᩭ✎ Enviando video, espere un momento..._`;
  await conn.sendMessage(m.chat, { text: mensajeEspera, mentions: [m.sender] }, { quoted: m });

  // Intento 1: Usar frieren-scraper
  try {
    const dataF = await tiktok.v1(args[0]);
    let mensajeExito = `_🍁 ᩭ✎ Tiktok sin marca de agua descargado con éxito By @Alba070503_`;
    await conn.sendMessage(m.chat, { video: { url: dataF.play }, caption: mensajeExito }, { quoted: m });
    return;
  } catch (e1) {
    console.log('Error en frieren-scraper:', e1);
  }

  // Intento 2: Usar tiktokdlF (Tikdown)
  try {
    const tTiktok = await tiktokdlF(args[0]);
    let mensajeExito = `_🍁 ᩭ✎ Tiktok sin marca de agua descargado con éxito By @Alba070503_`;
    await conn.sendMessage(m.chat, { video: { url: tTiktok.video }, caption: mensajeExito }, { quoted: m });
    return;
  } catch (e2) {
    console.log('Error en Tikdown:', e2);
  }

  // Intento 3: Usar api-dylux
  try {
    let p = await fg.tiktok(args[0]);
    let mensajeExito = `_🍁 ᩭ✎ Tiktok sin marca de agua descargado con éxito By @Alba070503_`;
    await conn.sendMessage(m.chat, { video: { url: p.nowm }, caption: mensajeExito }, { quoted: m });
    return;
  } catch (e3) {
    console.log('Error en api-dylux:', e3);
  }

  // Intento 4: Usar bochilteam scraper
  try {
    const { author: { nickname }, video } = await tiktokdl(args[0]);
    const url = video.no_watermark2 || video.no_watermark || video.no_watermark_raw;
    let mensajeExito = `_🍁 ᩭ✎ Tiktok sin marca de agua descargado con éxito By @Alba070503_`;
    await conn.sendMessage(m.chat, { video: { url: url }, caption: mensajeExito }, { quoted: m });
    return;
  } catch (e4) {
    console.log('Error en bochilteam scraper:', e4);
  }

  // Intento 5: Usar ruhend-scraper
  try {
    let data = await ttdl(args[0]);
    let mensajeExito = `_🍁 ᩭ✎ Tiktok sin marca de agua descargado con éxito By @Alba070503_`;
    await conn.sendMessage(m.chat, { video: { url: data.video }, caption: mensajeExito }, { quoted: m });
    console.log(data); // Para ver los detalles de los datos obtenidos
  } catch (e5) {
    console.log('Error en ruhend-scraper:', e5);
    throw `_✘error✘ _Vuelve a intentarlo_`;
  }
};

handler.command = /^(tiktok|ttdl|tiktokdl|tiktoknowm|tt|ttnowm|tiktokaudio)$/i;
export default handler;

// Función para descargar usando Tikdown
async function tiktokdlF(url) {
  if (!/tiktok/.test(url)) return 'Enlace incorrecto';
  
  try {
    const getToken = await axios.get("https://tikdown.org/id");
    const $ = cheerio.load(getToken.data);
    const token = $("#download-form > input[type=hidden]:nth-child(2)").attr("value");
    const params = { url: url, _token: token };
    const { data } = await axios.post("https://tikdown.org/getAjax?", new URLSearchParams(params), {
      headers: {
        "content-type": "application/x-www-form-urlencoded; charset=UTF-8",
        "user-agent": "Mozilla/5.0"
      }
    });
    
    const getData = cheerio.load(data.html);
    if (data.status) {
      return {
        status: true,
        video: getData("div.download-links > div:nth-child(1) > a").attr("href"),
        audio: getData("div.download-links > div:nth-child(2) > a").attr("href"),
      };
    } else {
      throw new Error('No se pudo obtener el video');
    }
  } catch (error) {
    console.error('Error en Tikdown:', error);
    throw 'Error al descargar desde Tikdown';
  }
}
