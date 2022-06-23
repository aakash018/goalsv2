import "../styles/globals.css";
import type { AppProps } from "next/app";

import { createClient, Provider } from "urql";
import { getToken } from "../utils/localTokenOP";

const client = createClient({
  url: "http://localhost:5000/graphql",
  requestPolicy: "cache-and-network",

  fetchOptions: () => {
    let token = "";

    if (getToken()) {
      token = getToken() as string;
    }

    return {
      headers: { authorization: token ? `Bearer ${token}` : "" },
      credentials: "include",
    };
  },
});

const MyApp: React.FC<AppProps> = ({ Component, pageProps }: AppProps) => {
  return (
    <Provider value={client}>
      <Component {...pageProps} />
    </Provider>
  );
};

export default MyApp;
