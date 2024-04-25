// // api.js

// export const signupUser = async (MobileNo, AppName) => {
//   try {
//     const response = await fetch(`${BASE_URL}/signup`, {
//       method: 'POST',
//       headers: {
//         'Content-Type': 'application/json',
//       },
//       body: JSON.stringify({ MobileNo, AppName }),
//     });
//     const data = await response.json();
//     return data;
//   } catch (error) {
//     console.error('Error in signupUser:', error);
//     throw error;
//   }
  
// };

// export const verifyOTP = async (MobileNo, AppName, OTP, Password) => {
//   try {
//     const response = await fetch(`${BASE_URL}/verifyotp`, {
//       method: 'POST',
//       headers: {
//         'Content-Type': 'application/json',
//       },
//       body: JSON.stringify({ MobileNo, AppName, OTP, Password }),
//     });
//     const data = await response.json();
//     return data;
//   } catch (error) {
//     console.error('Error in verifyOTP:', error);
//     throw error;
//   }
// };
