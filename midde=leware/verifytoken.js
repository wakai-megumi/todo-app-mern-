import jwt from "jsonwebtoken";
const VerifyToken = (req, res, next) => {
    const token = req.cookies.accesstoken;
    if (!token) {
        return res.status(401).json({
            success: false,
            message: "please login first"
        })
    }
    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET_KEY)

        req.userId = decoded._id;
        next();
    }
    catch (err) {
        console.log(err)
        return res.status(500).json({
            success: false,
            message: "Something went wrong with token",
        });
    }
}

export default VerifyToken;