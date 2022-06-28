import { getToken, setToken } from "./localTokenOP";

interface Responde {
  ok: boolean;
  authToken: string;
}

export const refreshAuthToken = async (abortController: AbortController) => {
  const token = getToken();

  if (!token) throw "No token found!! Try to relogin";

  const response = await fetch("http://localhost:5000/refresh_token", {
    method: "POST",
    credentials: "include",
    signal: abortController.signal,
  });

  const data: Responde = await response.json();

  if (data.ok) {
    return data.authToken;
  }

  //   fetch("http://localhost:5000/refresh_token", {
  //     method: "POST",
  //     credentials: "include",
  //     signal: abortController.signal,
  //   })
  //     .then((response) => response.json())
  //     .then((data: Responde) => {
  //       if (data.ok) {
  //         setToken(data.authToken);
  //       }
  //     });
};
