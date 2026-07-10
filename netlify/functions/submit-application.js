const { getStore } = require("@netlify/blobs");

exports.handler = async (event) => {
    if (event.httpMethod !== "POST") return { statusCode: 405, body: "Method Not Allowed" };

    try {
        const data = JSON.parse(event.body);

        // 1. Save internally to Netlify Cloud Database
        const store = getStore("brp_database");
        let apps = await store.get("apps", { type: "json" });
        if (!apps) apps = [];
        apps.push(data);
        await store.setJSON("apps", apps);

        // 2. Dispatch to Discord
        const webhookUrl = process.env.DISCORD_APP_WEBHOOK;
        if (webhookUrl) {
            const payload = {
                embeds: [{
                    title: "🌹 NEW RECRUITMENT APPLICATION",
                    color: 5763719,
                    fields: [
                        { name: "Applicant Name", value: data.name, inline: true },
                        { name: "Phone", value: data.phone, inline: true },
                        { name: "Preferred Role", value: data.role, inline: true },
                        { name: "Availability", value: data.availability, inline: true },
                        { name: "High-Risk Comfort?", value: data.highRisk, inline: true },
                        { name: "Strengths", value: data.strengths, inline: false },
                        { name: "Weaknesses", value: data.weaknesses, inline: false },
                        { name: "Previous Experience", value: data.experience },
                        { name: "Reason for Joining", value: data.whyJoin }
                    ],
                    timestamp: new Date().toISOString(),
                    footer: { text: `BRP Terminal ID: ${data.id}` }
                }]
            };

            await fetch(webhookUrl, { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(payload) });
        }

        return { statusCode: 200, body: JSON.stringify({ message: "Application secured in cloud network." }) };
    } catch (error) {
        return { statusCode: 500, body: JSON.stringify({ error: error.message }) };
    }
};