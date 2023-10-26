'use client';
import { getCurrentUser } from '@/api/auth';
import { clearCookies, getAccessTokenFromCookie, isValidToken, setSession } from '@/lib/jwt';
import { useQuery } from '@tanstack/react-query';
import { ReactNode, createContext, useEffect, useReducer } from 'react';
import axios from '@/lib/axios';
import { AxiosResponse } from 'axios';
enum Types {
  Initial = 'INITIALIZE',
  Login = 'LOGIN',
  Logout = 'LOGOUT',
  SIGN_UP = 'SIGN_UP',
}

export type JWTContextType = {
  isAuthenticated: boolean;
  isInitialized: boolean;
  user: AuthUser;
  // method: 'jwt';
  login: (payload: { email: string; password: string }) => Promise<AxiosResponse<any, any>>;
  signUp: (payload: { email: string; password: string }) => Promise<AxiosResponse<any, any>>;
  logout: () => Promise<void>;
};

export type AuthUser = null | Record<string, any>;

export type AuthState = {
  isAuthenticated: boolean;
  isInitialized: boolean;
  user: AuthUser;
};

type JWTAuthPayload = {
  [Types.Initial]: {
    isAuthenticated: boolean;
    user: AuthUser;
  };
  [Types.Login]: {
    user: AuthUser;
  };
  [Types.Logout]: undefined;
  [Types.SIGN_UP]: {
    user: AuthUser;
  };
};

export type JWTActions = ActionMap<JWTAuthPayload>[keyof ActionMap<JWTAuthPayload>];

export type ActionMap<M extends { [index: string]: any }> = {
  [Key in keyof M]: M[Key] extends undefined
    ? {
        type: Key;
      }
    : {
        type: Key;
        payload: M[Key];
      };
};

const initialState: AuthState = {
  isAuthenticated: false,
  isInitialized: false,
  user: null,
};

const JWTReducer = (state: AuthState, action: JWTActions) => {
  switch (action.type) {
    case 'INITIALIZE':
      return {
        isAuthenticated: action.payload.isAuthenticated,
        isInitialized: true,
        user: action.payload.user,
      };
    case 'LOGIN':
      return {
        ...state,
        isAuthenticated: true,
        user: action.payload.user,
      };
    case 'LOGOUT':
      return {
        ...state,
        isAuthenticated: false,
        user: null,
      };

    case 'SIGN_UP':
      return {
        ...state,
        isAuthenticated: true,
        user: action.payload.user,
      };

    default:
      return state;
  }
};
const AuthContext = createContext<JWTContextType | null>(null);

type AuthProviderProps = {
  children: ReactNode;
};

function AuthProvider({ children }: AuthProviderProps) {
  const [state, dispatch] = useReducer(JWTReducer, initialState);

  const { data, isFetched, refetch } = useQuery({
    queryKey: ['getCurrentUser'],
    queryFn: async () => {
      const result = await getCurrentUser();
      return result;
    },
    enabled: false,
  });

  const login = async (payload: { email: string; password: string }) => {
    const result = await axios.post('/api/auth/login', payload);
    // console.log('🚀 ~ file: AuthContext.tsx:119 ~ login ~ result:', result);
    const accessToken = getAccessTokenFromCookie() as string;
    setSession(accessToken);
    dispatch({
      type: Types.Login,
      payload: {
        user: result.data.user,
      },
    });
    return result;
  };
  const signUp = async (payload: { email: string; password: string }) => {
    const result = await axios.post('/api/auth/register', payload);
    // console.log('🚀 ~ file: auth.ts:14 ~ result:', result);

    dispatch({
      type: Types.SIGN_UP,
      payload: {
        user: result.data.user,
      },
    });
    return result;
  };

  const logout = async () => {
    clearCookies();
    setSession(null);
    dispatch({ type: Types.Logout });
  };

  useEffect(() => {
    const initialize = async () => {
      try {
        console.log('auth context useEffect');
        const accessToken = getAccessTokenFromCookie();

        if (accessToken && isValidToken(accessToken)) {
          setSession(accessToken);
          const result = await refetch();

          const { user } = result.data;
          console.log('🚀 ~ file: AuthContext.tsx:152 ~ initialize ~ user:', user);
          dispatch({
            type: Types.Initial,
            payload: {
              isAuthenticated: true,
              user,
            },
          });
        } else {
          dispatch({
            type: Types.Initial,
            payload: {
              isAuthenticated: false,
              user: null,
            },
          });
        }
      } catch (err) {
        console.error(err);
        dispatch({
          type: Types.Initial,
          payload: {
            isAuthenticated: false,
            user: null,
          },
        });
      }
    };

    initialize();
  }, [data, refetch]);
  return <AuthContext.Provider value={{ ...state, login, signUp, logout }}>{children}</AuthContext.Provider>;
}

export { AuthContext, AuthProvider };
