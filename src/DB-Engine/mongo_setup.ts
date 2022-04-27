import mongoose, { Connection } from 'mongoose';

type ConnectDB = {
  DBisConnected: Boolean
  wasVerification: Boolean
}

/*
* Description - Handles the initial connection to my mongoDB Atlas Cluster.
* Arguments: DBisConnected (Whether or not the connection has been made already or not)
* Other: will not connect to database if already connected
*/
async function connectDB(values: ConnectDB): Promise<Boolean> {
  if (values.DBisConnected == false)
  {
    try {
        await mongoose.connect(process.env.MONGO_URI as string);
        if (values.wasVerification == true) {
          console.log('get-gas-api-cluster required Reconnect (Reconnected)')
        } else {
          console.log('get-gas-api-cluster (Initially Connected)')
        }
        return (true);
      } catch (error: any) {
        console.error(`get-gest-api-cluster (Could Not Connect) - ${error} - Location: /src/DB-Engine/mongo_setup in connectDB() function`);
        return (false);
      }
  }
  return (true);
}

export { connectDB };
