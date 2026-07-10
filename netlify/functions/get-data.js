const { getStore } = require("@netlify/blobs");

exports.handler = async (event) => {
    try {
        const store = getStore("brp_database");
        const key = event.queryStringParameters.key;
        const data = await store.get(key, { type: "json" });
        
        return {
            statusCode: 200,
            body: JSON.stringify(data || null)
        };
    } catch (error) {
        return { statusCode: 500, body: JSON.stringify({ error: error.message }) };
    }
};