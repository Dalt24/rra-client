export function validatePassword(password) {
    const passwordRegex = /^(?=.*\d)(?=.*[!@#$%^&*])(?=.*[a-z])(?=.*[A-Z]).{8,}$/;
    return passwordRegex.test(password);
} // min 8 characters, 1 uppercase, 1 number, 1 special character

export function comparePassword(password1, password2)
{
    return (password1 === password2)
}
  
