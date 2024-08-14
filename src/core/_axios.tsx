// // import axios, { AxiosResponse, AxiosError } from "axios";

// // // Define a type for the user info.
// // type UserInfo = {
// //   token: string;
// // };

// // const axiosInstance = axios.create({
// //   baseURL: "http://127.0.0.1:3000",
// //   timeout: 6000,
// //   headers: {
// //     "Content-Type": "application/json",
// //     accept: "application/json",
// //   },
// // });

// // axiosInstance.interceptors.request.use(
// //   function (config) {
// //     const pathname = window.location.pathname;
// //     if (pathname !== "/login" && pathname !== "/404") {
// //       const userInfoString = localStorage.getItem("userInfo");
// //       if (userInfoString) {
// //         const userInfo: UserInfo = JSON.parse(userInfoString);
// //         if (userInfo.token) {
// //           config.headers!["Authorization"] = "Bearer " + userInfo.token;
// //         } else {
// //           window.location.replace("/login");
// //         }
// //       } else {
// //         window.location.replace("/login");
// //       }
// //     }
// //     return config;
// //   },
// //   function (error: AxiosError) {
// //     return Promise.reject(error);
// //   }
// // );

// // axiosInstance.interceptors.response.use(
// //   function (response: AxiosResponse) {
// //     return response;
// //   },
// //   async function (error: AxiosError) {
// //     const pathname = window.location.pathname;
// //     if (
// //       pathname !== "/login" &&
// //       pathname !== "/404" &&
// //       error?.response?.status === 401
// //     ) {
// //       localStorage.removeItem("userInfo");
// //       window.location.replace("/login");
// //     }
// //     return Promise.reject(error);
// //   }
// // );

// // export default axiosInstance;

// import axios, { AxiosResponse, AxiosError } from "axios";

// // Define a type for the user info.
// type UserInfo = {
//   token: string;
// };

// const axiosInstance = axios.create({
//   baseURL: "http://127.0.0.1:3000",
//   timeout: 6000,
//   headers: {
//     "Content-Type": "application/json",
//     accept: "application/json",
//   },
// });

// axiosInstance.interceptors.request
//   .use
//   // function (config) {
//   //   const pathname = window.location.pathname;
//   //   if (pathname !== "/login" && pathname !== "/404") {
//   //     const userInfoString = localStorage.getItem("userInfo");
//   //     if (userInfoString) {
//   //       const userInfo: UserInfo = JSON.parse(userInfoString);
//   //       if (userInfo.token) {
//   //         config.headers!["Authorization"] = "Bearer " + userInfo.token;
//   //       } else {
//   //         window.location.replace("/login");
//   //       }
//   //     } else {
//   //       window.location.replace("/login");
//   //     }
//   //   }
//   //   return config;
//   // },
//   // function (error: AxiosError) {
//   //   return Promise.reject(error);
//   // }
//   ();

// axiosInstance.interceptors.response.use(
//   function (response: AxiosResponse) {
//     return response;
//   },
//   async function (error: AxiosError) {
//     const pathname = window.location.pathname;
//     if (
//       pathname !== "/login" &&
//       pathname !== "/404" &&
//       error?.response?.status === 401
//     ) {
//       localStorage.removeItem("userInfo");
//       window.location.replace("/login");
//     }
//     return Promise.reject(error);
//   }
// );

// export default axiosInstance;

import axios, { AxiosResponse, AxiosError } from "axios";

// Define a type for the user info.
type UserInfo = {
  token: string;
};

const axiosInstance = axios.create({
  baseURL: "http://127.0.0.1:3000",
  timeout: 6000,
  headers: {
    "Content-Type": "application/json",
    accept: "application/json",
  },
});

axiosInstance.interceptors.request.use(
  function (config) {
    const pathname = window.location.pathname;
    if (pathname !== "/login" && pathname !== "/404") {
      const userInfoString = localStorage.getItem("userInfo");
      if (userInfoString) {
        const userInfo: UserInfo = JSON.parse(userInfoString);
        if (userInfo.token) {
          config.headers!["Authorization"] = "Bearer " + userInfo.token;
          console.log(userInfo.token);
        } else {
          window.location.replace("/login");
        }
      } else {
        window.location.replace("/login");
      }
    }
    return config;
  },
  function (error: AxiosError) {
    return Promise.reject(error);
  }
);

axiosInstance.interceptors.response.use(
  function (response: AxiosResponse) {
    return response;
  },
  async function (error: AxiosError) {
    const pathname = window.location.pathname;
    if (
      pathname !== "/login" &&
      pathname !== "/404" &&
      error?.response?.status === 401
    ) {
      localStorage.removeItem("userInfo");
      window.location.replace("/login");
    }
    return Promise.reject(error);
  }
);

export default axiosInstance;
