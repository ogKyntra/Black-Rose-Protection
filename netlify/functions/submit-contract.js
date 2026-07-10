const { getStore } = require("@netlify/blobs");

exports.handler = async (event) => {
    if (event.httpMethod !== "POST") return { statusCode: 405, body: "Method Not Allowed" };

    try {
        const data = JSON.parse(event.body);

        // 1. Save internally to Netlify Cloud Database
        const store = getStore("brp_database");
        let requests = await store.get("requests", { type: "json" });
        if (!requests) requests = [];
        requests.push(data);
        await store.setJSON("requests", requests);

        // 2. Dispatch to Discord
        const webhookUrl = process.env.DISCORD_CONTRACT_WEBHOOK;
        if (webhookUrl) {
            const payload = {
                embeds: [{
                    title: "🚨 NEW PROTECTION CONTRACT REQUEST",
                    color: 15548997,
                    fields: [
                        { name: "Client Name", value: data.name, inline: true },
                        { name: "Phone", value: data.phone, inline: true },
                        { name: "Business/Org", value: data.business || "None", inline: true },
                        { name: "Service", value: data.service, inline: true },
                        { name: "Date & Time", value: `${data.date} @ ${data.time}`, inline: true },
                        { name: "Duration", value: `${data.duration} Hours`, inline: true },
                        { name: "Location", value: data.location, inline: false },
                        { name: "Risk Level", value: `**${data.risk.toUpperCase()}**`, inline: true },
                        { name: "Vehicle Support", value: data.vehicle, inline: true },
                        { name: "Est. Total Cost", value: `\`${data.totalCost}\``, inline: true },
                        { name: "Extra Intel / Details", value: data.details || "None Provided" },
                        { name: "Preferred Contact", value: data.contactPref }
                    ],
                    timestamp: new Date().toISOString(),
                    footer: { text: `BRP Terminal ID: ${data.id}` }
                }]
            };

            await fetch(webhookUrl, { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(payload) });
        }

        return { statusCode: 200, body: JSON.stringify({ message: "Contract processed and secured in cloud." }) };
    } catch (error) {
        return { statusCode: 500, body: JSON.stringify({ error: error.message }) };
    }
};