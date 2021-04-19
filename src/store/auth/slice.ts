import AsyncStorage from '@react-native-community/async-storage';
import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit';

import { AUTH } from '@app/asyncStorageKeys';
import { signUpUrl, loginUrl } from '@app/shared';

interface State {
  token: string | null;
  userId: string | null;
}

interface AutoLoginPayload {
  token: string;
  userId: string;
}

interface AuthenticatePayload {
  email: string;
  password: string;
}

interface AuthResponse {
  idToken: string;
  expiresIn: string;
  localId: string;
}

interface RejectValue {
  errorMessage: string;
}

export interface AuthStoredData {
  token: string;
  userId: string;
  expirationDate: string;
}

type AuthenticateAction = 'signUp' | 'login';

enum ErrorTranslations {
  'EMAIL_NOT_FOUND' = 'Email could not be found',
  'INVALID_PASSWORD' = 'Password is not valid',
  'EMAIL_EXISTS' = 'Email already exists',
}

const initialState: State = {
  token: null,
  userId: null,
};

const authenticate = async (
  action: AuthenticateAction,
  payload: AuthenticatePayload
): Promise<AuthResponse> => {
  const url = action === 'login' ? loginUrl : signUpUrl;

  const res = await fetch(url, {
    method: 'POST',
    headers: { 'Content-type': 'application/json' },
    body: JSON.stringify({ ...payload, returnSecureToken: true }),
  });

  if (!res.ok) {
    const errorResData = await res.json();
    if (errorResData.error) {
      throw new Error(
        ErrorTranslations[errorResData.error.message as keyof typeof ErrorTranslations] ??
          'Unknown Error'
      );
    }
    throw new Error('Something went wrong!');
  }

  return await res.json();
};

const saveDataToStorage = (data: AuthResponse) => {
  const expirationDate = new Date(Date.now() + parseInt(data.expiresIn, 10) * 1000);
  AsyncStorage.setItem(
    AUTH,
    JSON.stringify({ token: data.idToken, userId: data.localId, expirationDate })
  );
};

export const signUp = createAsyncThunk<
  AuthResponse,
  AuthenticatePayload,
  { rejectValue: RejectValue }
>('auth/signUp', async (payload: AuthenticatePayload, { rejectWithValue }) => {
  const res = await authenticate('signUp', payload);
  return res;
});

export const login = createAsyncThunk<
  AuthResponse,
  AuthenticatePayload,
  { rejectValue: RejectValue }
>('auth/login', async (payload, { rejectWithValue }) => {
  const res = await authenticate('login', payload);
  return res;
});

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    autoLogin: (state, { payload }: PayloadAction<AutoLoginPayload>) => {
      state.token = payload.token;
      state.userId = payload.userId;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(signUp.fulfilled, (state, action) => {
        if (!action.payload) {
          return;
        }
        saveDataToStorage(action.payload);
        state.token = action.payload.idToken;
        state.userId = action.payload.localId;
      })
      .addCase(login.fulfilled, (state, action) => {
        if (!action.payload) {
          return;
        }
        saveDataToStorage(action.payload);
        state.token = action.payload.idToken;
        state.userId = action.payload.localId;
      });
  },
});

export const { autoLogin } = authSlice.actions;

export default authSlice.reducer;
