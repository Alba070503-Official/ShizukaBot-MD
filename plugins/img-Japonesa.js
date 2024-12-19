const fetch = require('node-fetch');

module.exports = {
    name: "corean",
    alias: ["korean", "coreannsfw"],
    category: "nsfw",
    desc: "Obtiene imágenes NSFW relacionadas con contenido coreano.",
    async exec(msg, sock) {
        const { from, isGroup, reply } = msg;

        try {
            // Reacción inicial para indicar que el bot está procesando
            await sock.sendMessage(from, { react: { text: '🕓', key: msg.key } });

            // Validación: Solo en grupos
            if (!isGroup) {
                return reply("Este comando solo está disponible en grupos.");
            }

            // Solicitar contenido de la API
            const res = await fetch('https://deliriussapi-oficial.vercel.app/nsfw/corean');
            if (!res.ok) throw new Error('Error al conectar con la API');

            const json = await res.json();
            if (!json.url) throw new Error('No se encontró contenido disponible');

            // Enviar contenido al grupo
            await sock.sendMessage(from, {
                image: { url: json.url },
                caption: "🔞 Aquí tienes tu contenido NSFW coreano.",
            }, { quoted: msg });

            // Reacción exitosa
            await sock.sendMessage(from, { react: { text: '✅', key: msg.key } });

        } catch (err) {
            console.error(err);

            // Reacción de error
            await sock.sendMessage(from, { react: { text: '✖️', key: msg.key } });
            reply("Hubo un problema al obtener el contenido. Inténtalo más tarde.");
        }
    }
};
