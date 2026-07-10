const { connectLambda, getStore } = require("@netlify/blobs");

exports.handler = async (event) => {
    try {
        connectLambda(event);
        const store = getStore("brp_database");
        const data = await store.get("siteData", { type: "json" });
        
        // Returns null if the database is empty, telling the frontend to use defaults
        return {
            statusCode: 200,
            body: JSON.stringify(data || null)
        };
    } catch (error) {
        return { statusCode: 500, body: JSON.stringify({ error: error.message }) };
    }
};