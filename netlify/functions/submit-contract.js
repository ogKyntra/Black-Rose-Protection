exports.handler = async (event, context) => {
    // Only allow POST requests
    if (event.httpMethod !== "POST") {
        return { statusCode: 405, body: "Method Not Allowed" };
    }

    try {
        const data = JSON.parse(event.body);
        const webhookUrl = process.env.DISCORD_CONTRACT_WEBHOOK;

        if (!webhookUrl) {
            return { statusCode: 500, body: JSON.stringify({ error: "Webhook not configured on server." }) };
        }

        // Construct the professional Discord embed payload
        const payload = {
            embeds: [{
                title: "🚨 NEW PROTECTION CONTRACT REQUEST",
                color: 15548997, // Crimson red
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
                footer: { text: "Black Rose Protection // Automated Terminal Uplink" }
            }]
        };

        // Forward safely from backend to Discord using native fetch
        const response = await fetch(webhookUrl, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(payload)
        });

        if (!response.ok) {
            throw new Error(`Discord API responded with status ${response.status}`);
        }

        return {
            statusCode: 200,
            body: JSON.stringify({ message: "Contract successfully transmitted to HQ." })
        };
    } catch (error) {
        return {
            statusCode: 500,
            body: JSON.stringify({ error: error.message })
        };
    }
};