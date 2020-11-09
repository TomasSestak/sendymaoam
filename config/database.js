module.exports = ({ env }) => ({
  defaultConnection: 'default',
  connections: {
    default: {
      connector: 'mongoose',
      settings: {
        uri: 'mongodb://sendy:Mamradavino7@cluster0-shard-00-00.nbs54.mongodb.net:27017,cluster0-shard-00-01.nbs54.mongodb.net:27017,cluster0-shard-00-02.nbs54.mongodb.net:27017/Cluster0?ssl=true&replicaSet=atlas-d9k7cr-shard-0&authSource=admin&retryWrites=true&w=majority'
      },
      options: {
        ssl: true
      }
    }
  }
});
