import axios from "axios";

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
