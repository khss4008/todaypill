import apiInstance from "./index";
const api = apiInstance();

const fetchLikeUsers = async (supplementId: number) => {
  const result = await api.get(`/user/supplementlike/${supplementId}`);
  // console.log("영양제 좋아한 사람", result.data);
  return result.data;
};

const fetchMyPicks = async (userId: number) => {
  const result = await api.get(`/user/userLike/${userId}`);
  // console.warn("나의 찜", result.data);
  return result.data;
};

const like = async (userId: number, supplementId: number) => {
  const data = {
    supplementId,
    userId,
  };
  await api.post("/user/insertlike", JSON.stringify(data));
};

// export const like = async (
//   pjtId: number,
//   userId: number,
//   success = defaultSuccess,
//   fail = defaultFail
// ) => {
//   const data = {
//     projectId: pjtId,
//     userId,
//   };
//   await api
//     .post(`/funding/detail/insertLike`, JSON.stringify(data))
//     .then(success)
//     .catch(fail);
// };

const dislike = async (userId: number, supplementId: number) => {
  await api.delete(`/user/deletelike/${userId}/${supplementId}`);
};
// const dislike = async (userId: number, supplementId: number) => {
//   const data = {
//     supplementId,
//     userId,
//       };
//   await api.delete("/user/deletelike", JSON.stringify(data));
// };

export { fetchLikeUsers, like, dislike, fetchMyPicks };
