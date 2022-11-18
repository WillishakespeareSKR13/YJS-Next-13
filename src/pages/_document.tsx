import { themes } from "@stacklycore/ui";
import { Head, Html, Main, NextScript } from "next/document";

const Document = () => (
  <Html>
    <Head>
      <script
        dangerouslySetInnerHTML={{
          __html: `
      (function() {
        const themes = {${Object.entries(themes)
          ?.map(
            ([key, value]) =>
              `${key}: '${value?.general?.properties?.backgroundflash}'`
          )
          ?.join(",")}};
        function getInitialColorMode() {
          const persistedColorPreference = window.localStorage.getItem('theme');
          const hasPersistedPreference = typeof persistedColorPreference === 'string';
          if (hasPersistedPreference) {
            return persistedColorPreference;
          }
          const mql = window.matchMedia('(prefers-color-scheme: dark)');
          const hasMediaQueryPreference = typeof mql.matches === 'boolean';
          if (hasMediaQueryPreference) {
            return mql.matches ? 'dark' : 'light';
          }
          return 'light';
        }
        const colorMode = getInitialColorMode();
        const root = document.documentElement;
        root.style.setProperty('background-color', themes?.[colorMode] ?? themes.light);
        window.localStorage.setItem('theme', colorMode);
      })();
    `,
        }}
      />
    </Head>
    <body>
      <Main />
      <NextScript />
    </body>
  </Html>
);

export default Document;
