import apiInstance from "./index";
const api = apiInstance();

const getSpecificRoomChat = async (nutrient: string) => {
  const result = await api.get(`/getText/${nutrient}`);
  console.log(result.data, "this is result");
  return result.data;
};

export { getSpecificRoomChat };
