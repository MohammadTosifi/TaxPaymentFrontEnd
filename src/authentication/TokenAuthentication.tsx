import jwtDecode from 'jwt-decode';

interface DecodedToken {
  exp: number;
}

const checkToken = async (token: string | null): Promise<boolean> => {
  if (!token) {
    return false;
  }

  try {
    const decoded: DecodedToken = jwtDecode(token);

    const currentTime: number = Date.now() / 1000; // divide by 1000 to convert to seconds
    if (decoded.exp < currentTime) {
      return false; // token has expired
    }

    return true; // return decoded user info if token is still valid
  } catch (err) {
    console.error(err); // handle any errors
    return false;
  }
};

export default checkToken;
