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
type nameObjectAttr = {
  competition: string;
  country?: string;
  division?: string;
  more?: string;
};

export const processLeagueName = (inputString: string) => {
  const stringArray = inputString.split(".");

  const cleanArray = stringArray
    .map((segment) => segment.trim().replace(/\.$/, ""))
    .filter(Boolean);
  const nameObject: nameObjectAttr = {
    competition: "",
  };
  if (cleanArray.length === 1) {
    nameObject.competition = cleanArray[0];
  } else if (cleanArray.length === 2) {
    nameObject.competition = cleanArray[1];
    nameObject.country = cleanArray[0];
  } else if (cleanArray.length > 2) {
    nameObject.country = cleanArray[0];
    nameObject.competition = isNaN(parseInt(cleanArray[1]))
      ? cleanArray[1]
      : cleanArray[2];
    nameObject.division = !isNaN(parseInt(cleanArray[1]))
      ? cleanArray[1]
      : cleanArray[2];
    nameObject.more = cleanArray[3];
  }
  return nameObject;
};

export const processLeagueData = (arr: any[]) => {
  return arr.map((item: { id: number; name: string; icon: string }) => {
    return {
      id: item.id || 0,
      name: processLeagueName(item.name),
      icon: item.icon,
    };
  });
};
