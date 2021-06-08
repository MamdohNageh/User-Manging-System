const { MongoClient } = require('mongodb');

module.exports = async () => {
  const client = new MongoClient('mongodb://localhost:27017/node-quickstart', {
    useNewUrlParser: true,
    useUnifiedTopology: true
  });
  
  await client.connect();

  const db = client.db('node-quickstart');

  return {
    usersCollection: db.collection('users')
  };
};
