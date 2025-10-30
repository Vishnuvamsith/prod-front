// In AuthContext.js - Make sure this is uncommented
const login = async (email, password) => {
  try {
    const response = await fetch('http://localhost:8083/auth/login', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ email, password }),
    });
    
    const data = await response.json();
    
    if (data.token) {
      localStorage.setItem('token', data.token);
      setToken(data.token);
      return { success: true };
    }
    return { success: false, error: 'Login failed' };
  } catch (error) {
    return { success: false, error: error.message };
  }
};