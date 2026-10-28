// Database-free mode uses in-memory arrays. No database connection is needed.
async function connectDB() { console.log("Database-free mode: using temporary in-memory storage"); }
module.exports = connectDB;
