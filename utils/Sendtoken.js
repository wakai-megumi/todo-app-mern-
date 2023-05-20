import jwt from 'jsonwebtoken'

const SendToken = (user, statusCode = 200, res, message) => {



    try {
        const token = jwt.sign({ _id: user._id }, process.env.JWT_SECRET_KEY, {
            expiresIn: "15m"

        })

        if (!token) return res.status(403).json({
            success: false,
            message: "problem with creating token"

        })

        return res.status(200).cookie("accesstoken", token, {
            httpOnly: true,
            maxAge: 15 * 60 * 1000,
            sameSite: process.env.NODE_ENV === "development" ? "lax" : "none",
            secure: false
        }).json({
            success: true,
            age: 15 * 60 * 1000,
            message: message,
        })



    }
    catch (error) {
        console.log(error) //for helping in debugging
        return res.status(500).json({
            success: true,
            message: "something went wrong",
            error: err
        })
    }


}
export default SendToken