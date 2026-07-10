const { connectLambda, getStore } = require("@netlify/blobs");

exports.handler = async (event) => {
    if (event.httpMethod !== "POST") return { statusCode: 405, body: "Method Not Allowed" };

    try {
        const data = JSON.parse(event.body);
        connectLambda(event);
        const store = getStore("brp_database");
        
        // Append to Blobs
        let requests = (await store.get("requests", { type: "json" })) || [];
        requests.push(data);
        await store.setJSON("requests", requests);

        // Discord Webhook Handling
        const webhookUrl = process.env.CONTRACT_WEBHOOK_URL;
        let discordStatus = "Webhook not configured.";
        
        if (webhookUrl) {
            const payload = {
                embeds: [{
                    title: "🚨 NEW PROTECTION CONTRACT REQUEST",
                    color: 15548997,
                    fields: [
                        { name: "Client", value: data.name, inline: true },
                        { name: "Phone", value: data.phone, inline: true },
                        { name: "Service", value: data.service, inline: true },
                        { name: "Date & Time", value: `${data.date} @ ${data.time}`, inline: true },
                        { name: "Duration", value: `${data.duration} Hrs`, inline: true },
                        { name: "Location", value: data.location, inline: true },
                        { name: "Risk Level", value: data.risk, inline: true },
                        { name: "Est. Cost", value: `\`${data.totalCost}\``, inline: true },
                        { name: "Extra Intel", value: data.details || "None", inline: false }
                    ],
                    timestamp: new Date().toISOString(),
                    footer: { text: `BRP Terminal ID: ${data.id}` }
                }]
            };

            try {
                await fetch(webhookUrl, {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify(payload)
                });
                discordStatus = "Dispatched to Discord.";
            } catch (err) {
                discordStatus = "Discord dispatch failed.";
            }
        }

        return { statusCode: 200, body: JSON.stringify({ message: `Contract secured. ${discordStatus}` }) };
    } catch (error) {
        return { statusCode: 500, body: JSON.stringify({ error: error.message }) };
    }
};