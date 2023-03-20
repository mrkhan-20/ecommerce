const { Client } = require("pg");

const client = new Client({
  user: "postgres",
  host: "localhost",
  database: "test",
  password: "123",
  port: 5432,
});

const connectDb = async () => {
  try {
    await client.connect();
    console.log("Connected to the database!");
  } catch (error) {
    console.log(error);
  }
};

const getClient = () => {
  return client;
};

module.exports = {
  connectDb,
  getClient,
};