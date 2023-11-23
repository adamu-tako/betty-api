import axios from "axios";

const apiKey = "906356a0ca5ae15d3b2b5654e9c95400";

const sportKey = "soccer_spain_la_liga";

const regions = "uk";

const markets = "h2h";

const oddsFormat = "decimal";

const dateFormat = "iso";

export const getAllActiveSports = async () => {
  const response = await axios.get("https://api.the-odds-api.com/v4/sports", {
    params: {
      apiKey,
    },
  });
  return response.data;
};

export const getLiveAndUpcomingEvents = async () => {
  const response = await axios.get(
    `https://api.the-odds-api.com/v4/sports/${sportKey}/odds`,
    {
      params: {
        apiKey,
        regions,
        markets,
        oddsFormat,
        dateFormat,
      },
    }
  );
  console.log("Remaining requests", response.headers["x-requests-remaining"]);
  console.log("Used requests", response.headers["x-requests-used"]);
  return response.data;
  // .catch((error) => {
  //   console.log("Error status", error.response.status);
  //   console.log(error.response.data);
  // });
};
