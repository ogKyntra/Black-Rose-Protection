const { connectLambda, getStore } = require("@netlify/blobs");
const config = require("./config");

exports.handler = async (event) => {
    if (event.httpMethod !== "POST") return { statusCode: 405, body: "Method Not Allowed" };
    
    try {
        const { key = "siteData", data, passcode } = JSON.parse(event.body);
        
        // Basic RP security check
        if (passcode !== config.ADMIN_PASSCODE) {
            return { statusCode: 403, body: JSON.stringify({ error: "Unauthorized terminal access." }) };
        }

        connectLambda(event);
        const store = getStore("brp_database");
        await store.setJSON(key, data);
        
        return { statusCode: 200, body: JSON.stringify({ message: "Global data synchronized successfully." }) };
    } catch (error) {
        return { statusCode: 500, body: JSON.stringify({ error: error.message }) };
    }
};