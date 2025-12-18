import { globalError, ClientError } from "shokhijakhon-error-handler";
import jwtService from "../lib/jwt.service.js";
import { UserModel } from "../models/index.js";

const tokenGuard = async (req, res, next) => {
    try {
        const accessToken = req?.headers["authorization"]?.split(" ")[1];
        if (!accessToken) throw new ClientError('Unauthorized', 401);

        const decoded = jwtService.parseAccessToken(accessToken); 
        console.log(decoded)
        const checkUser = await UserModel.findByPk(decoded.user_id);

        if (!checkUser) throw new ClientError('Invalid token', 401);

        req.user = decoded; 
        console.log(accessToken)
        return next(); 
    } catch (err) {
        if (err.name == 'TokenExpiredError') {
            return res.status(401).json({
                code: 'TOKEN_EXPIRED',
                message: 'Access token expired'
            });
        }
        return globalError(err, res); 
    }
};

export default tokenGuard;
