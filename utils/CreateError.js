
export const CreateError = (statusCode, message) => {
    const error = new Error() // create a new error object
    error.message = message //setting the error message
    error.statusCode = statusCode //setting the error status code


    return error
}
