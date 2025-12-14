import AsyncStorage from "@react-native-async-storage/async-storage";
import {
  makeRedirectUri,
  useAuthRequest,
  useAutoDiscovery,
} from "expo-auth-session";
import { useRouter } from "expo-router";
import React, { createContext, useEffect, useMemo, useReducer } from "react";

interface IAuthState {
  isSignedIn: boolean;
  accessToken: string | null;
  idToken: string | null;
  userInfo: any;
}

const initialState: IAuthState = {
  isSignedIn: false,
  accessToken: null,
  idToken: null,
  userInfo: null,
};

const AuthContext = createContext({
  state: initialState,
  signIn: () => {},
  signOut: () => {},
});

const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const discovery = useAutoDiscovery(process.env.EXPO_PUBLIC_KEYCLOAK_URL!);
  const redirectUri = makeRedirectUri({
    scheme: "edufrontmobile",
    path: "home",
  });
  const router = useRouter();

  console.log("[AuthProvider] Redirect URI:", redirectUri);
  console.log(
    "[AuthProvider] Discovery URL:",
    process.env.EXPO_PUBLIC_KEYCLOAK_URL
  );

  useEffect(() => {
    console.log("[AuthProvider] Discovery ready:", !!discovery);
  }, [discovery]);

  const [request, response, promptAsync] = useAuthRequest(
    {
      clientId: process.env.EXPO_PUBLIC_KEYCLOAK_CLIENT_ID!,
      redirectUri: redirectUri,
      scopes: ["openid", "profile", "email", "roles"],
    },
    discovery
  );

  const [authState, dispatch] = useReducer((previousState, action) => {
    switch (action.type) {
      case "SIGN_IN":
        return {
          ...previousState,
          isSignedIn: true,
          accessToken: action.payload.access_token,
          idToken: action.payload.id_token,
        };
      case "USER_INFO":
        return {
          ...previousState,
          userInfo: {
            /* TODO */
          },
        };
      case "SIGN_OUT":
        return initialState;
      default:
        return previousState;
    }
  }, initialState);

  useEffect(() => {
    const getToken = async ({
      code,
      codeVerifier,
      redirectUri,
    }: {
      code: string;
      codeVerifier: string;
      redirectUri: string;
    }) => {
      try {
        const formData = {
          grant_type: "authorization_code",
          client_id: process.env.EXPO_PUBLIC_KEYCLOAK_CLIENT_ID,
          code: code,
          code_verifier: codeVerifier,
          redirect_uri: redirectUri,
        };
        const formBody = [];
        for (const property in formData) {
          var encodedKey = encodeURIComponent(property);
          var encodedValue = encodeURIComponent(
            formData[property as keyof typeof formData] ?? ""
          );
          formBody.push(encodedKey + "=" + encodedValue);
        }

        const response = await fetch(
          `${process.env.EXPO_PUBLIC_KEYCLOAK_URL}/protocol/openid-connect/token`,
          {
            method: "POST",
            headers: {
              Accept: "application/json",
              "Content-Type": "application/x-www-form-urlencoded",
            },
            body: formBody.join("&"),
          }
        );
        if (response.ok) {
          const payload = await response.json();
          AsyncStorage.setItem("accessToken", payload.access_token);
          AsyncStorage.setItem("idToken", payload.id_token);
          dispatch({ type: "SIGN_IN", payload });
          router.push("/(tabs)/home");
        }
      } catch (e) {
        console.warn(e);
      }
    };
    if (response?.type === "success") {
      const { code } = response.params;
      getToken({
        code,
        codeVerifier: request?.codeVerifier!,
        redirectUri,
      });
    } else if (response?.type === "error") {
      console.warn("Authentication error: ", response.error);
    }
  }, [dispatch, redirectUri, request?.codeVerifier, response]);

  const authContext = useMemo(
    () => ({
      state: authState,
      signIn: () => {
        // Check if request is loaded before prompting
        if (request) {
          promptAsync();
        } else {
          console.warn(
            "[AuthProvider] Auth request is not ready yet. Discovery:",
            !!discovery
          );
        }
      },
      signOut: async () => {
        try {
          const idToken = authState.idToken;
          console.log(idToken);

          await fetch(
            `${process.env.EXPO_PUBLIC_KEYCLOAK_URL}/protocol/openid-connect/logout?id_token_hint=${idToken}`
          );
          AsyncStorage.removeItem("accessToken");
          AsyncStorage.removeItem("idToken");
          dispatch({ type: "SIGN_OUT" });
          router.push("/");
        } catch (e) {
          console.warn(e);
        }
      },
    }),
    [authState, request, promptAsync]
  );

  return (
    <AuthContext.Provider value={authContext}>{children}</AuthContext.Provider>
  );
};

export { AuthContext, AuthProvider };
