let handler = async (m, { conn, args }) => {
    if (args.length === 0) {
        return conn.reply(m.chat, 'Por favor, proporciona un enlace de canal de WhatsApp.', m);
    }

    // Obtenemos el enlace del canal de WhatsApp
    let link = args[0];

    // Verificamos que sea un enlace de canal de WhatsApp válido
    if (!link.includes('whatsapp.com/')) {
        return conn.reply(m.chat, 'El enlace proporcionado no es válido. Asegúrate de que sea un enlace de canal de WhatsApp.', m);
    }

    try {
        // Extraemos la ID del canal del enlace
        let idCanal = link.split('/').pop();

        // Formateamos la ID en el formato deseado
        let formattedId = `${idCanal}@newsletter`;
        
        // Enviamos la ID del canal como respuesta
        conn.reply(m.chat, `La ID del canal es: ${formattedId}`, m);
    } catch (e) {
        // En caso de error
        conn.reply(m.chat, 'Hubo un error al intentar extraer la ID del canal. Asegúrate de que el enlace sea correcto.', m);
    }
};

handler.command = ['idcanal'];
export default handler;
