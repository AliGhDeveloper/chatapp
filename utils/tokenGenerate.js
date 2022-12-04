import jwt from 'jsonwebtoken';

export const accessToken = async (user) => {
    
    const accesstoken = jwt.sign({ id: user.id }, process.env.ACCESS_TOKEN_SECRET);
    

    return accesstoken
};

export const refreshToken = async (user) => {
    const refreshtoken = jwt.sign({ id: user.id }, process.env.REFRESH_TOKEN_SECRET);
   
    return refreshtoken
}

export const validRefToken = async (token) => {
    const verify = jwt.verify(token, process.env.REFRESH_TOKEN_SECRET);

    return verify
}

export const validAcToken = async (token) => {
    const verify = jwt.verify(token, process.env.ACCESS_TOKEN_SECRET);

    return verify
}