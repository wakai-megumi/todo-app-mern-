
const Errormiddleware = (err, req, res, next) => {
    const statuscode = err.statusCode || 500;
    const message = err.message || "Server Error";
    return res.status(statuscode).json({ message, success: false })
}
export default Errormiddleware
