import toast from "react-hot-toast";
import { authenticate } from "./helper";

//validate login page username
export const usernameValidate = async(values) => {
    const errors = usernameVerify({}, values);

    if(values.username){
        //check user exist or not
        const {status} = await authenticate(values.username);

        if(status !== 200){
            errors.exist = toast.error("User does not exist");
        }
    }

    return errors;
};

//validate password page
export const passwordValidate = async(values) => {
    const errors = passwordVerify({}, values);

    return errors;
};

//validate reset password
export const resetPasswordValidate = async(values) => {
    const errors = passwordVerify({}, values);

    if(values.password !== values.confirm_pwd){
        errors.exist = toast.error("Password not match...")
    };

    return errors;
};

//validate register form 
export const registerValidate = async(values) => {
    const errors = usernameVerify({}, values);
    passwordVerify(errors, values);
    emailVerify(errors, values);

    return errors;
};

//validate register form 
export const profileValidate = async(values) => {
    const errors = emailVerify({}, values);

    return errors;
};

/*****************************************************************************/


//validate password
const passwordVerify = (error = {}, values) => {
    const specialChars = /[`!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?~]/;

    if(!values.password){
      error.password = toast.error("Password Required")
    }else if(values.password.includes(" ")){
      error.password = toast.error('Invalid Password')
    }else if (values.password.length < 5){
        error.password = toast.error('Password must be more than 5 characters')
    }else if(!specialChars.test(values.password)){
        error.password = toast.error("Password must have a special character")
    }
  
    return error;
};

//validate username
const usernameVerify = (error = {}, values) => {
  if(!values.username){
    error.username = toast.error("Username Required")
  }else if(values.username.includes(" ")){
    error.username = toast.error('Invalid Username')
  };

  return error;
}

//validate email
const emailVerify = (error = {}, values) => {
    if(!values.email){
        error.email = toast.error("Email Required");
    }else if(values.email.includes(" ")){
        error.email = toast("Wrong Email");
    }else if(!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(values.email)){
        error.email = toast.error("Invalid Email address")
    }

    return error;
;}