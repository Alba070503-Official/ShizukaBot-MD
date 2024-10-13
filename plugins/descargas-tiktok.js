import axios from 'axios';
import { generateWAMessageFromContent } from '@whiskeysockets/baileys';

let handler = async (m, { conn, text, args, usedPrefix, command }) => { 
    if (!text) throw `*✘error✘*\n\n_. ᩭ✎Use el comandó correctamente_\n\n_Ejemplo : ${usedPrefix + command} https://vm.tiktok.com/kandndbwldnig/🍁_`;
    if (!/(?:https:?\/{2})?(?:w{3}|vm|vt|t)?\.?tiktok.com\/([^\s&]+)/gi.test(text)) throw `*✘error✘* _. ᩭ✎Use el comandó correctamente_\n\n_Ejemplo : ${usedPrefix + command} https://vm.tiktok.com/nandlwmso/🍁_`;
    
    let texto = `_🍁 @${m.sender.split`@`[0]} ᩭ✎Enviando Video, espere un momento...._`;

    try {
        // Mensaje temporal mientras se descarga el video
        conn.sendMessage(m.chat, { text: texto, mentions: [m.sender] }, { quoted: m });

        // Llamada a la API que proporcionaste para descargar el video
        const response = await axios.get(`https://deliriusapi-official.vercel.app/download/tiktok?url=${encodeURIComponent(args[0])}`);

        // Verificamos si la respuesta contiene el video sin marca de agua
        if (response.data && response.data.video) {
            let desc1 = `_🍁 ᩭ✎Tiktok sin marca de agua descargado con éxito By @Alba070503_`;
            
            // Enviamos el video sin marca de agua
            await conn.sendMessage(m.chat, { video: { url: response.data.video }, caption: desc1 }, { quoted: m });
        } else {
            throw 'No se pudo obtener el video sin marca de agua.';
        }
    } catch (e) {
        throw `_✘error✘ _Vuelve a intentarlo_`;
    }
};

handler.command = /^(tiktok|ttdl|tiktokdl|tiktoknowm|tt|ttnowm|tiktokaudio)$/i;
export default handler;
