import axios from 'axios';
import ApiEndpoints from '@/config/apiConfig';

const sendOTP = async (phoneNumber: string): Promise<any> => {
  try {
    // const response = await axios.post(ApiEndpoints.sendOTP, {
    //   phoneNumber,
    // });
    const response = {
      status: 200,
    };

    const { status } = response;
    const trimPhoneNumber = phoneNumber.replace('+91', '');
    console.log(trimPhoneNumber);

    if (status === 200) {
      const checkUserResponse = await axios.post(
        ApiEndpoints.checkIfUserExists,
        {
          phoneNumber: trimPhoneNumber,
        },
      );

      return {
        status,
        data: checkUserResponse.data,
      };
    }

    return {
      status,
      found: false,
    };
  } catch (error) {
    if ((error as any).response) {
      console.error('Server error:', (error as any).response.data);
      return { status: 500, found: false, error: (error as any).response.data };
    }

    if ((error as any).request) {
      console.error('Network error:', (error as any).request);
      alert('Network error. Please check your connection');
      return { status: 500, found: false, error: 'Network error' };
    }

    console.error('Unexpected error:', (error as any).message);
    alert((error as any).message);
    return { status: 500, found: false, error: (error as any).message };
  }
};

const verifyOTP = async (phoneNumber: string, code: string): Promise<any> => {
  try {
    // const response = await axios.post(ApiEndpoints.verifyOTP, {
    //   phoneNumber,
    //   code,
    // });
    // return response.data;
    console.log(ApiEndpoints.verifyOTP);
    return true;
  } catch (error) {
    return error;
  }
};

export { sendOTP, verifyOTP };
