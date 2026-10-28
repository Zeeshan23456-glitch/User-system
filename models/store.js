// In-memory storage: all records are lost when the server stops/restarts.
const { randomUUID } = require("crypto");
const users = [];
const categories = [];
const courses = [];
const id = () => randomUUID();
const timestamps = () => ({ createdAt: new Date().toISOString(), updatedAt: new Date().toISOString() });
module.exports = { users, categories, courses, id, timestamps };
