import axios from "axios";
import mongoose from "mongoose";
import sports from "../model/league";

export const sportsList = [
  { name: "Football", id: 1 },
  { name: "Cricket", id: 66 },
  { name: "Basketball", id: 3 },
  { name: "Tennis", id: 4 },
  { name: "Volleyball", id: 6 },
  { name: "Baseball", id: 5 },
  { name: "Boxing", id: 9 },
  { name: "American Football", id: 13 },
  { name: "Handball", id: 8 },
  { name: "Rugby League", id: 7 },
  { name: "Table Tennis", id: 10 },
  { name: "Badminton", id: 16 },
  { name: "Ice Hockey", id: 2 },
  { name: "Snooker", id: 30 },
];

const performRequest = async (route: string) => {
  const response = await axios.get(route, {
    headers: {
      "Cache-Control": "cache",
      Expires: "6000",
    },
  });

  return response;
};

export default performRequest;

// async function saveSportsList() {
//   // Check if the Sports collection already exists
//   const collections = await mongoose.connection.db.listCollections().toArray();
//   const sportsCollection = collections.find(
//     (collection) => collection.name === "sports"
//   );

//   if (!sportsCollection) {
//     await sports.insertMany(sportsList);
//     console.log("Sports list saved to the database");
//   } else {
//     console.log("Sports list already exists in the database");
//   }
// }
