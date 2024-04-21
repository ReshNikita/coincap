import axios from "axios";

type assets = {
  id: string;
  name: string;
  maxSupply: string;
  priceUsd: string;
  rank: string;
  supply: string;
  symbol: string;
};

export const getAssets = async (): Promise<assets[] | undefined> => {
  try {
    const { data } = await axios.get("https://api.coincap.io/v2/assets");
    console.log(data.data);

    return data;
  } catch (error) {
    console.error(error);
  }
};
