import { ContextNormalize } from "@stacklycore/ui";
import type { AppProps } from "next/app";

const MyApp = ({ Component, pageProps, router }: AppProps) => {
  return (
    <ContextNormalize layout={{ pathname: router.pathname }}>
      <Component {...pageProps} key={router.pathname} />
    </ContextNormalize>
  );
};

export default MyApp;
