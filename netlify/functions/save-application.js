const { getStore } = require("@netlify/blobs");

exports.handler = async (event) => {
    if (event.httpMethod !== "POST") return { statusCode: 405, body: "Method Not Allowed" };

    try {
        const data = JSON.parse(event.body);
        const store = getStore("brp_database");
        
        let apps = (await store.get("apps", { type: "json" })) || [];
        apps.push(data);
        await store.setJSON("apps", apps);

        const webhookUrl = process.env.APPLICATION_WEBHOOK_URL;
        let discordStatus = "Webhook not configured.";
        
        if (webhookUrl) {
            const payload = {
                embeds: [{
                    title: "🌹 NEW RECRUITMENT APPLICATION",
                    color: 5763719,
                    fields: [
                        { name: "Applicant", value: data.name, inline: true },
                        { name: "Phone", value: data.phone, inline: true },
                        { name: "Role", value: data.role, inline: true },
                        { name: "Availability", value: data.availability, inline: true },
                        { name: "High-Risk OK?", value: data.highRisk, inline: true },
                        { name: "Experience", value: data.experience, inline: false },
                        { name: "Why Join", value: data.whyJoin, inline: false }
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

        return { statusCode: 200, body: JSON.stringify({ message: `Application secured. ${discordStatus}` }) };
    } catch (error) {
        return { statusCode: 500, body: JSON.stringify({ error: error.message }) };
    }
};