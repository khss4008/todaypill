import apiInstance from './index';
const api = apiInstance();

const fetchAllSupplements = async () => {
  const result = await api.get(`/supplement/findAll`);
  // console.log(result.data);
  return result.data;
};
const fetchPopularSupplements = async () => {
  const result = await api.get(`/supplement/findLikeTop10`);
  // console.log(result.data);
  return result.data;
};
const fetchSupplementDetail = async (supplementId) => {
  const result = await api.get(`/supplement/${supplementId}`);
  const supplementDetail = {
    name: result.data.supplementName,
    brand: result.data.brand,
    image: result.data.image,
    ingredients: result.data.ingredients,
    bestTime: result.data.bestTime,
    requiredCount: result.data.requiredCount,
  };

  return supplementDetail;
};
const fetchRecommendation = async (supplementId, userId) => {
  const result = await api.get(`/supplement/${supplementId}/${userId}`);
  const recommendation = result.data;
  return recommendation;
};
const fetchSupplementByCategory = async (category: string) => {
  const result = await api.get(`/supplement/findAllByCategory/${category}`);
  return result.data;
};

export {
  fetchAllSupplements,
  fetchPopularSupplements,
  fetchSupplementDetail,
  fetchRecommendation,
  fetchSupplementByCategory,
};
