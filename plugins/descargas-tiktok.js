import axios from 'axios';
import { generateWAMessageFromContent } from '@whiskeysockets/baileys';

let handler = async (m, { conn, text, args, usedPrefix, command }) => { 
    if (!text) throw `*✘error✘*\n\n_. ᩭ✎Use el comandó correctamente_\n\n_Ejemplo : ${usedPrefix + command} https://vm.tiktok.com/kandndbwldnig/🍁_`;
    if (!/(?:https:?\/{2})?(?:w{3}|vm|vt|t)?\.?tiktok.com\/([^\s&]+)/gi.test(text)) throw `*✘error✘* _. ᩭ✎Use el comandó correctamente_\n\n_Ejemplo : ${usedPrefix + command} https://vm.tiktok.com/nandlwmso/🍁_`;

    let texto = `_🍁 @${m.sender.split`@`[0]} ᩭ✎Enviando Video, espere un momento...._`;

    try {
        // Mensaje temporal mientras se procesa
        conn.sendMessage(m.chat, { text: texto, mentions: [m.sender] }, { quoted: m });

        // Llamada a la API
        const response = await axios.get(`https://deliriusapi-official.vercel.app/download/tiktok?url=${encodeURIComponent(args[0])}`);

        // Log para revisar la respuesta de la API
        console.log("Respuesta de la API: ", response.data);

        // Verificamos si la API devuelve un video
        if (response.data && response.data.video) {
            let desc1 = `_🍁 ᩭ✎Tiktok sin marca de agua descargado con éxito By @Alba070503_`;

            // Enviamos el video
            await conn.sendMessage(m.chat, { video: { url: response.data.video }, caption: desc1 }, { quoted: m });
        } else {
            throw 'No se pudo obtener el video sin marca de agua. Verifica el enlace o intenta nuevamente más tarde.';
        }

    } catch (e) {
        // Mostrar el error en la consola para depurar
        console.error("Error en la descarga del video: ", e);
        
        // Enviar mensaje de error al usuario
        conn.sendMessage(m.chat, { text: `_✘error✘ Ocurrió un error: ${e.message || e}` }, { quoted: m });
    }
};

handler.command = /^(tiktok|ttdl|tiktokdl|tiktoknowm|tt|ttnowm|tiktokaudio)$/i;
export default handler;
