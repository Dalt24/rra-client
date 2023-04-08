export function validatePassword(password) {
    const passwordRegex = /^(?=.*\d)(?=.*[!@#$%^&*])(?=.*[a-z])(?=.*[A-Z]).{8,}$/;
    return passwordRegex.test(password);
}

export function comparePassword(password1, password2)
{
    if (password1 === password2) return true;
    return false;
}
  
