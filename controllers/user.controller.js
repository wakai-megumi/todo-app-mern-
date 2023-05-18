import User from "../models/user.model.js"
import bcrypt from "bcrypt";
import SendToken from "../utils/Sendtoken.js";


///////////////////////////////////////
export const getAllUsers = async (req, res, next) => {
    try {
        //have such functionality only admin can access all user info  --------to be done later
        const Users = await User.find();
        console.log(Users)
        res.status(200).json({
            success: true,
            Users

        })

    } catch (err) {
        console.log(err)
    }
}

/////////////////////////////////////////////////////////////
//////////////////////////////////////////

export const register = async (req, res) => {
    try {
        const { username, email, password } = req.body;
        const user = await User.findOne({ email });
        if (user) {
            return res.status(404).json({
                success: false,
                message: "User already exists"
            });
        }
        const hashedPassword = await bcrypt.hash(password, 10);
        const newUser = await User.create({ username, email, password: hashedPassword });
        SendToken(newUser, 200, res, "user registered successfully");
    }
    catch (error) {
        console.error(error);
        return res.status(500).json({
            success: false,
            message: "Something went wrong"
        });
    }
}

/////////////////////////////
///////////////////////////////////////////////////////////
/////////////////////////////

export const login = async (req, res, next) => {
    try {
        const { email, password } = req.body;

        if (!email || !password) return res.status(404).json({
            success: false,
            message: 'please provide missing fields(email || password)'
        })
        const user = await User.findOne({ email }).select("+password");

        if (!user) {
            return res.status(404).json({
                success: false,
                message: 'invalid email or password, signup with correct credetntials'
            })
        }

        const isMatched = await bcrypt.compareSync(password, user.password)
        if (!isMatched) {
            return res.status(404).json({
                success: false,
                message: 'invalid email or password'
            })
        }
        SendToken(user, 200, res, `welcome back, ${user.username}`);

    } catch (err) {
        console.log(err)
        return res.status(400).send(err)
    }

}

//////////////////////////////
//////////////////////////////////////
//////////////////////////////////////
//////////////////////////////

export const getMyDetail = async (req, res, next) => {

    try {
        const { id } = req.params;

        if (typeof id !== 'string') {
            return res.status(400).json({ success: false, message: "id must be a string" });
        }

        //check this id is valid or not 

        if (!id) {
            return res.status(400).json({ success: false, message: "please provide id" });
        }
        if (id !== req.userId) {
            return res
                .status(400)
                .json({ success: false, message: "you are not authorized to access this account details" });
        }
        const user = await User.findById(id);
        if (user) {
            return res.status(200).json({ success: true, user });
        } else {
            return res.status(400).json({ success: false, message: "user not found" });
        }
    } catch (err) {
        console.log(err);
        res.status(400).json({
            success: false,
            message: "something went wrong",
            error: err,
        });
    }

}

//////////////////////////////////////
////////////////////////////////////////////
////////////////////////////////////////////
////////////////////////////////////  

export const logout = async (req, res, next) => {
    try {

        return res.status(200).cookie("accesstoken", "", {
            httpOnly: true,
            expires: new Date(Date.now() + 10000),
            sameSite: process.env.NODE_ENV === 'delvelopment' ? 'lax' : "none",
            secure: process.env.NODE_ENV === 'delvelopment' ? false : true

        }).json({
            success: true,
            message: "logged out successfully"
        })



    } catch (err) {
        console.log(err)
        return res.status(400).send(err)
    }

}
