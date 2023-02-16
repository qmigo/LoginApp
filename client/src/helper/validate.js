import toast from 'react-hot-toast'

export function usernameValidate(values)
{   
    let error = {}
    if(!values.username)
    error.username = toast.error('Username field is empty')
    else if(values.username.includes(" "))
    error.username = toast.error("Username can't have space")

    return error
}

export function confirmPasswordValidate(values)
{
    let error = {}
    if(!values.password)
    error.password = toast.error('Password field empty')
    else if (!values.confirm_pwd)
    error.password = toast.error('Confirm Password field empty')
    else if(values.password !== values.confirm_pwd)
    error.passwordNotMatch = toast.error("Password and Confirm Password not match")
    
    return error
}

export function accountValidate(values)
{
    let error = {}
    if(!values.username)
    error.username = toast.error('Please enter a username')
    else if (!values.email)
    error.email = toast.error('Please enter an email')
    else if(!values.password)
    error.password = toast.error('Please enter a password')

    return error
}

export function passwordValidate(values)
{   
    let error = {}
    if(!values.password)
    error.username = toast.error('Password field is empty')
    else if(values.password.length<=4)
    error.username = toast.error("Password size must be greater than 4")

    return error
}
