const BASE_URL = 'http://localhost:8000/api/auth';

// Registrar usuario (signup)
export const signup = async (email, password) => {
  try {
    const response = await fetch(`${BASE_URL}/signup`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email, password }),
    });
    // if (!response.ok) throw new Error('Failed to signup');
    if (!response.ok) throw new Error(JSON.stringify(response.message));
    return await response.json();
  } catch (error) {
    console.error('Error during signup:', error);
    throw error;
  }
};

// Iniciar sesión (signin)
export const signin = async (email, password) => {
  try {
    const response = await fetch(`${BASE_URL}/signin`, {
      method: 'POST',
      credentials: 'include', // Incluir cookies en la solicitud
      headers: { 'Content-Type': 'application/json',  },
      body: JSON.stringify({ email, password }),
    });
    if (!response.ok) throw new Error('Failed to signin');
    return await response.json();
  } catch (error) {
    console.error('Error during signin:', error);
    throw error;
  }
};

// Cerrar sesión (signout)
export const signout = async () => {
  try {
    const response = await fetch(`${BASE_URL}/signout`, {
      method: 'POST',
      credentials: 'include', // Incluir cookies en la solicitud
    });
    if (!response.ok) console.log(JSON.stringify(response));
    return await response.json();
  } catch (error) {
    console.error('Error during signout:', error);
    throw error;
  }
};

// Enviar código de verificación
export const sendVerificationCode = async (email) => {
  try {
    const response = await fetch(`${BASE_URL}/send-verification-code`, {
      method: 'PATCH',
      headers: { 'Content-Type': 'application/json'},
      body: JSON.stringify({ email }),
    });
    if (!response.ok) throw new Error(response);
    // if (!response.ok) throw new Error('Failed to send verification code');
      return await response.json();
  } catch (error) {
    console.error('Error sending verification code:', error);
    // console.error('Error sending verification code:', error);
    throw error;
  }
};

// Verificar código de verificación
export const verifyVerificationCode = async (email, providedCode) => {
  try {
    const response = await fetch(`${BASE_URL}/verify-verification-code`, {
      method: 'PATCH',
      headers: { 'Content-Type': 'application/json'},
      body: JSON.stringify({ email, providedCode }),
    });
    if (!response.ok) throw new Error('Failed to verify code');
    return await response.json();
  } catch (error) {
    console.error('Error verifying code:', error);
    throw error;
  }
};

// Cambiar contraseña
export const changePassword = async (oldPassword, newPassword) => {
  try {
    const response = await fetch(`${BASE_URL}/change-password`, {
      method: 'PATCH',
      credentials: "include",
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ oldPassword, newPassword }),
    });
    const data = await response.json();
    if (!response.ok) throw new Error(data.message || 'Failed to change password');
    return data;
  } catch (error) {
    console.error('Error changing password:', error);
    throw error;
  }
};

// Enviar código de recuperación de contraseña
export const sendForgotPasswordCode = async (email) => {
  try {
    const response = await fetch(`${BASE_URL}/send-forgot-password-code`, {
      method: 'PATCH',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email }),
    });
    if (!response.ok) throw new Error('Failed to send forgot password code');
    return await response.json();
  } catch (error) {
    console.error('Error sending forgot password code:', error);
    throw error;
  }
};

// Verificar código de recuperación y cambiar contraseña
export const verifyForgotPasswordCode = async (email, providedCode, newPassword) => {
  try {
    const response = await fetch(`${BASE_URL}/verify-forgot-password-code`, {
      method: 'PATCH',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email, providedCode, newPassword }),
    });
    if (!response.ok) throw new Error(response.message);
    return await response.json();
  } catch (error) {
    console.error('Error verifying forgot password code:', error);
    throw error;
  }
};