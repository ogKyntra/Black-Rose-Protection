exports.handler = async (event, context) => {
    if (event.httpMethod !== "POST") {
        return { statusCode: 405, body: "Method Not Allowed" };
    }

    try {
        const data = JSON.parse(event.body);
        const webhookUrl = process.env.DISCORD_APP_WEBHOOK;

        if (!webhookUrl) {
            return { statusCode: 500, body: JSON.stringify({ error: "Webhook not configured on server." }) };
        }

        const payload = {
            embeds: [{
                title: "🌹 NEW RECRUITMENT APPLICATION",
                color: 5763719, // Dark grey/purple profile tone
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
                footer: { text: "Black Rose Protection // Human Resources Intake" }
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
            body: JSON.stringify({ message: "Application processed and delivered to HR." })
        };
    } catch (error) {
        return {
            statusCode: 500,
            body: JSON.stringify({ error: error.message })
        };
    }
};