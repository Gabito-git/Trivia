const dbConnection = require('./db/config');
const Trivia = require('./models/trivias');
const User = require('./models/users');
const trivias = require('./data/trivias');

dbConnection();

const importData = async () => {
    try {
      await Trivia.deleteMany()
      await Trivia.insertMany(trivias)
  
      console.log('Data Imported!')
      process.exit()
    } catch (error) {
      console.error(`${error}`)
      process.exit(1)
    }
  }
  
  const destroyData = async () => {
    try {
      await Trivia.deleteMany();
      await User.deleteMany();
  
      console.log('Data Destroyed!')
      process.exit()
    } catch (error) {
      console.error(`${error}`)
      process.exit(1)
    }
  }
  
  if (process.argv[2] === '-d') {
    destroyData()
  } else {
    importData()
  }