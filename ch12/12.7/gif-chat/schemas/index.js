const mongoose = require('mongoose');

const { NODE_ENV } = process.env;
const MONGO_URL = `mongodb+srv://test:sparta@cluster0.hd7sx.mongodb.net/myFirstDatabase?retryWrites=true&w=majority`;
console.log(MONGO_URL);
const connect = () => {
  if (NODE_ENV !== 'production') {
    mongoose.set('debug', true);
  }
  mongoose.connect(MONGO_URL, {
    dbName: 'gifchat',
    useNewUrlParser: true,
    useCreateIndex: true,
  }, (error) => {
    if (error) {
      console.log('몽고디비 연결 에러', error);
    } else {
      console.log('몽고디비 연결 성공');
    }
  });
};

mongoose.connection.on('error', (error) => {
  console.error('몽고디비 연결 에러', error);
});
mongoose.connection.on('disconnected', () => {
  console.error('몽고디비 연결이 끊겼습니다. 연결을 재시도합니다.');
  connect();
});

module.exports = connect;
