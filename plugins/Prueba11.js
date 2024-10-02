let handler = async (m, { conn, usedPrefix }) => {
    // Mensaje de texto
    const mensaje = `
    Gracias :D`;

    // Ruta de la imagen y el audio
    const imageUrl = 'https://qu.ax/abKS.jpg';  // Reemplaza con la URL de la imagen
    const audioUrl = 'https://qu.ax/lyds.mp3';  // Reemplaza con la URL del audio

    try {
        // Enviar mensaje de texto
        await conn.sendMessage(m.chat, { text: mensaje }, { quoted: m });

        // Enviar imagen con un texto corto
        await conn.sendMessage(m.chat, { 
            image: { url: imageUrl }, 
            caption: "No te imaginas lo feliz que me hace saber que has aceptado. Mi corazón está latiendo a mil por hora solo de pensar en todo lo que está por venir. Desde que te conocí, siempre he soñado con este momento, pero ahora que es real, supera cualquier cosa que hubiera imaginado.\n\nQuiero que sepas que valoro cada segundo a tu lado y que me siento increíblemente afortunado de poder compartir contigo algo tan bonito. No puedo esperar para construir juntos recuerdos inolvidables, llenos de risas, complicidad y cariño.\n\nGracias por darme esta oportunidad de estar más cerca de ti. Prometo que haré lo mejor para que cada día juntos sea especial, y que siempre tendrás en mí a alguien que te apoyará, te cuidará y te hará sonreír.\n\n¡Estoy emocionado por todo lo que está por venir! 💖" 
        }, { quoted: m });

        // Enviar audio
        await conn.sendMessage(m.chat, { 
            audio: { url: audioUrl }, 
            mimetype: 'audio/mpeg',
            ptt: true  // PTT significa que se enviará como una nota de voz
        }, { quoted: m });
    } catch (error) {
        console.error("Error en el plugin de cumpleaños:", error);
        await conn.reply(m.chat, `*☓ Ocurrió un error inesperado:*\n${error.message || error}`, m);
    }
};

// Configuración del comando
handler.help = ['felizcumple'];
handler.tags = ['fun'];
handler.command = ['si', 'Si'];  // Puedes usar varios comandos para el mismo plugin

export default handler;
