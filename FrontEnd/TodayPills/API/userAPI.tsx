import apiInstance from './index';
const api = apiInstance();
const HealthScreeningCheck = async (
  birthday: string,
  email: string,
  phoneNumber: string,
  userName: string
) => {
  console.log(birthday, email, phoneNumber, userName);
  return await api.post('/user/healthcheckdata', {
    birthday: birthday,
    email: email,
    phoneNumber,
    userName,
  });
};
const updateUsername = async (userId: number, name: string) => {
  await api.put('/user/user/updateName', {
    userId,
    name,
  });
};
const getUserInfoByEmail = async (email: string) => {
  const result = await api.get(`/user/user/${email}`);
  const userInfo = {
    age: result.data.age,
    gender: result.data.gender,
    name: result.data.name,
    userId: result.data.userId,
    recommendNutrients: [
      result.data.recommendOne,
      result.data.recommendTwo,
      result.data.recommendThree,
    ],
  };
  return userInfo;
};

const kakaoLogout = async (ACCESS_TOKEN: string) => {
  // api.defaults.headers.common["Authorization"] = ACCESS_TOKEN;
  await api
    .post(
      'https://kapi.kakao.com/v1/user/logout',
      {},
      {
        headers: { Authorization: `Bearer ${ACCESS_TOKEN}` },
      }
    )
    .then((res) => console.log(res));
};

const changeGender = async (email: string, gender: string) => {
  await api.patch(`/user/user/patchgender/${email}/${gender}`);
};
const afterBasicSurvey = async (data) => {
  console.warn(data);
  await api.put('/user/user/firstSurvey', data);
};
const afterScreeningCheck = async (data) => {
  // console.log("zzzasdasz", data.preferred_brand);
  await api.post('/user/healthcheckdata/detailcheck', {
    brand: data.preferred_brand,
    pillSize: data.is_ok_big_pill,
    userId: Number(data.userId),
  });
};
const afterSecondSurvey = async (data) => {
  const res = await api.post('/user/user/secondSurvey', {
    additionalEfficacy: data.additionalEfficacy,
    category: data.category,
    email: data.email,
    formula: data.formula,
    lowerPriceLimit: data.lowerPriceLimit,
    upperPriceLimit: data.upperPriceLimit,
    sustainedRelease: data.sustainedRelease,
  });
  return res;
};
const findCommonQuestion = async (userId) => {
  const result = await api.get(`/user/findCommonQuestion/${userId}`);
  return result.data;
};
export {
  HealthScreeningCheck,
  getUserInfoByEmail,
  kakaoLogout,
  updateUsername,
  changeGender,
  afterBasicSurvey,
  afterScreeningCheck,
  afterSecondSurvey,
  findCommonQuestion,
};
