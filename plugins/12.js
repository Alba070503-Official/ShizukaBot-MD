let handler = async (m, { conn, usedPrefix }) => {
    // Mensaje de texto
    const mensaje = `
    Ah ok muchas Gracias igual :-(`;

    // Ruta de la imagen y el audio
    const imageUrl = 'https://qu.ax/eFBg.jpg';  // Reemplaza con la URL de la imagen
    const audioUrl = 'https://qu.ax/Pgxz.mp3';  // Reemplaza con la URL del audio

    try {
        // Enviar mensaje de texto
        await conn.sendMessage(m.chat, { text: mensaje }, { quoted: m });

        // Enviar imagen con un texto corto
        await conn.sendMessage(m.chat, { 
            image: { url: imageUrl }, 
            caption: "Primero que todo, quiero agradecerte por ser honesta conmigo. Aunque las cosas no resultaron como esperaba, quiero que sepas que respeto completamente tu decisión y valoro muchísimo tu sinceridad.\n\nLo más importante para mí es que podamos seguir siendo amigos. Aprecio la persona increíble que eres, y tenerte en mi vida de cualquier forma sigue siendo algo muy especial para mí. La amistad que hemos construido es algo que realmente valoro, y estaré aquí siempre que lo necesites.\n\nGracias de nuevo por ser tan clara, y por permitir que nuestra amistad continúe. 😊" 
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
handler.command = ['no', 'No'];  // Puedes usar varios comandos para el mismo plugin

export default handler;
