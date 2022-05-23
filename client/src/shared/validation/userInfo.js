export function validateEmail(value) {
    let error;
    if (!value) {
      error = 'Email is required';
    } else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(value)) {
      error = 'Invalid email address';
    }
    return error;
};

export function validatePassword(value) {
  let error;
  if (!value) {
    error = 'Password is required';
  } else if (value.length < 3) {
    error = 'Password is too short';
  } else if (value.length > 32) {
    error = 'Password is too long';
  }
  return error;
};

export function validateLogin(value) {
    let error;
    if (!value) {
      error = 'Login is required';
    } else if (value.length < 4) {
      error = 'Login is too short';
    } else if (value.length > 20) {
      error = 'Login is too long';
    }
    return error;
};

export function validateRole(value) {
    let error;
    if (!value) {
      error = 'Role is required';
    } 
    return error;
};