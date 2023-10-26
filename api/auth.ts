import axios from '@/lib/axios';

export const logout = async () => {
  const result = await axios.get('/api/auth/logout');
  return result;
};

export const googleLoginSuccess = async () => {
  const result = await axios.get('/api/auth/google/success');
  console.log('🚀 ~ file: auth.ts:24 ~ loginWithGoogle ~ result:', result);
  return result;
};
export const getCurrentUser = async () => {
  const result = await axios.get('/api/users/current-user');
  return result.data;
};
