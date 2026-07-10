const { getStore } = require("@netlify/blobs");

exports.handler = async (event) => {
    if (event.httpMethod !== "POST") return { statusCode: 405, body: "Method Not Allowed" };

    try {
        const { passcode } = JSON.parse(event.body);
        
        const validPass = process.env.ADMIN_PASSCODE || "blackrose";
        if (passcode !== validPass) {
            return { statusCode: 403, body: JSON.stringify({ error: "Unauthorized terminal access." }) };
        }

        const store = getStore("brp_database");
        const requests = (await store.get("requests", { type: "json" })) || [];
        const apps = (await store.get("apps", { type: "json" })) || [];

        return { statusCode: 200, body: JSON.stringify({ requests, apps }) };
    } catch (error) {
        return { statusCode: 500, body: JSON.stringify({ error: error.message }) };
    }
};