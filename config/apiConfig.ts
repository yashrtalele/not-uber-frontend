const API_BASE_URL = process.env.EXPO_PUBLIC_API_URL;

const ApiEndpoints = {
  signin: `${API_BASE_URL}/user/signin`,
  signup: `${API_BASE_URL}/user/signup`,
  signout: `${API_BASE_URL}/user/signout`,
  getUser: `${API_BASE_URL}/user/getUserDetails`,
  checkIfUserExists: `${API_BASE_URL}/user/checkIfUserExists`,
  sendOTP: `${API_BASE_URL}/user/verify/sendOtp`,
  verifyOTP: `${API_BASE_URL}/user/verify/verifyOtp`,
};

export default ApiEndpoints;
