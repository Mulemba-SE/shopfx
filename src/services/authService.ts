export interface LoginPayload {
  emailOrPhone: string;
  password: string;
}

export interface SignupPayload {
  storeName: string;
  fullName: string;
  email: string;
  phone: string;
  password: string;
}

export interface AuthResult {
  success: boolean;
  message: string;
}

function delay(ms: number): Promise<void> {
  return new Promise((resolve) => setTimeout(() => resolve(), ms));
}

export async function loginUser(payload: LoginPayload): Promise<AuthResult> {
  console.log('[mock] loginUser called with:', payload);
  await delay(1200);

  if (!payload.emailOrPhone || !payload.password) {
    return { success: false, message: 'Email/phone and password are required.' };
  }

  return { success: true, message: 'Login successful (mock).' };
}

export async function signupUser(payload: SignupPayload): Promise<AuthResult> {
  console.log('[mock] signupUser called with:', payload);
  await delay(1200);

  if (!payload.email || !payload.password || !payload.storeName) {
    return { success: false, message: 'Store name, email, and password are required.' };
  }

  return { success: true, message: 'Account created (mock).' };
}