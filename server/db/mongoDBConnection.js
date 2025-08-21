import mongoose from "mongoose"

const mongoDBConnection = async () => {
 try {
  const dbConnection = await mongoose.connect(process.env.DB_URI); 
  console.log(`Connected To MongoDB DataBase: ${dbConnection.connection.host}`)
 } catch (error) {
  console.log(`Error Connecting To MongoDB: mongoDBConnection function: ${error.message}`)
  process.exit(1)
 }
}

export default mongoDBConnection

