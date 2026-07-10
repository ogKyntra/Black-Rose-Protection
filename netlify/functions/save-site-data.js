const { getStore } = require("@netlify/blobs");

exports.handler = async (event) => {
    if (event.httpMethod !== "POST") return { statusCode: 405, body: "Method Not Allowed" };
    
    try {
        const { key = "siteData", data, passcode } = JSON.parse(event.body);
        
        // Basic RP security check
        const validPass = process.env.ADMIN_PASSCODE || "blackrose";
        if (passcode !== validPass) {
            return { statusCode: 403, body: JSON.stringify({ error: "Unauthorized terminal access." }) };
        }

        const store = getStore("brp_database");
        await store.setJSON(key, data);
        
        return { statusCode: 200, body: JSON.stringify({ message: "Global data synchronized successfully." }) };
    } catch (error) {
        return { statusCode: 500, body: JSON.stringify({ error: error.message }) };
    }
};