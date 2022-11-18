import { useState } from "react";
import {
  AtomButton,
  AtomInput,
  AtomLoader,
  AtomText,
  AtomWrapper,
  css,
  useTheme,
} from "@stacklycore/ui";
import Header from "../components/Header";
import WrapperComponent from "../components/WrapperComponent";

const ContainerCSS = css`
  min-height: 100vh;
  flex-direction: column;
  justify-content: flex-start;
  align-items: flex-start;
  flex-wrap: wrap;
`;

const PageIndex = () => {
  const { key, toggle } = useTheme();
  const [pressToLoad, setPressToLoad] = useState(false);
  const PressToLoadClick = () => {
    setPressToLoad(true);
    const timer = setTimeout(() => {
      setPressToLoad(false);
      clearTimeout(timer);
    }, 2000);
  };

  const [fullscreen, setFullscreen] = useState(false);

  return (
    <AtomWrapper as="main" css={() => ContainerCSS}>
      <Header />
      <AtomWrapper
        css={() => css`
          gap: 30px;
          padding: 10px 90px;
        `}
      >
        <AtomText
          css={() => css`
            font-size: 32px;
          `}
        >
          StacklyUI
        </AtomText>
        <WrapperComponent title={`Component Theme: Active(${key})`} dot>
          <AtomButton
            astype={key === "dark" ? "flat" : "outline"}
            onClick={() => toggle("dark")}
          >
            Dark
          </AtomButton>
          <AtomButton
            astype={key === "light" ? "flat" : "outline"}
            onClick={() => toggle("light")}
          >
            Light
          </AtomButton>
        </WrapperComponent>

        <WrapperComponent title="Component Button" type="main" dot>
          <WrapperComponent title="Flatten">
            <AtomButton astheme="primary" />
            <AtomButton astheme="secondary" />
            <AtomButton astheme="accent" />
            <AtomButton astheme="color2" />
            <AtomButton astheme="color3" />
          </WrapperComponent>
          <WrapperComponent title="Outline">
            <AtomButton astype="outline" astheme="primary" />
            <AtomButton astype="outline" astheme="secondary" />
            <AtomButton astype="outline" astheme="accent" />
            <AtomButton astype="outline" astheme="color2" />
            <AtomButton astype="outline" astheme="color3" />
          </WrapperComponent>
          <WrapperComponent title="Disabled">
            <AtomButton disabled astheme="primary" />
            <AtomButton disabled astheme="secondary" />
            <AtomButton disabled astheme="accent" />
            <AtomButton disabled astheme="color2" />
            <AtomButton disabled astheme="color3" />
          </WrapperComponent>
          <WrapperComponent title="Loading">
            <AtomButton loading astheme="primary" />
            <AtomButton loading astheme="secondary" />
            <AtomButton loading astheme="accent" />
            <AtomButton loading astheme="color2" />
            <AtomButton loading astheme="color3" />
            <AtomButton astype="outline" loading astheme="primary" />
            <AtomButton astype="outline" loading astheme="secondary" />
            <AtomButton astype="outline" loading astheme="accent" />
            <AtomButton astype="outline" loading astheme="color2" />
            <AtomButton astype="outline" loading astheme="color3" />
          </WrapperComponent>
          <WrapperComponent title="Press To Load">
            <AtomButton
              loading={pressToLoad}
              astheme="primary"
              onClick={PressToLoadClick}
            >
              Press To Load
            </AtomButton>

            <AtomButton
              astype="outline"
              loading={pressToLoad}
              astheme="primary"
              onClick={PressToLoadClick}
            >
              Press To Load
            </AtomButton>
          </WrapperComponent>
        </WrapperComponent>
        <WrapperComponent title="Component Loader" type="main" dot>
          <WrapperComponent title="Medium: (Auto)">
            <AtomLoader loading astheme="primary" />
            <AtomLoader loading astheme="secondary" />
            <AtomLoader loading astheme="accent" />
            <AtomLoader loading astheme="color2" />
            <AtomLoader loading astheme="color3" />
          </WrapperComponent>
          <WrapperComponent title="Small">
            <AtomLoader astype="small" loading astheme="primary" />
            <AtomLoader astype="small" loading astheme="secondary" />
            <AtomLoader astype="small" loading astheme="accent" />
            <AtomLoader astype="small" loading astheme="color2" />
            <AtomLoader astype="small" loading astheme="color3" />
          </WrapperComponent>
          <WrapperComponent title="Button">
            <AtomLoader astype="button" loading astheme="primary" />
            <AtomLoader astype="button" loading astheme="secondary" />
            <AtomLoader astype="button" loading astheme="accent" />
            <AtomLoader astype="button" loading astheme="color2" />
            <AtomLoader astype="button" loading astheme="color3" />
          </WrapperComponent>
          <WrapperComponent title="Fullscreen">
            <AtomButton onClick={() => setFullscreen(!fullscreen)}>
              Open Fullscreen Loader
            </AtomButton>
            <AtomLoader
              onClick={() => setFullscreen(!fullscreen)}
              astype="fullscreen"
              loading={fullscreen}
            />
          </WrapperComponent>
        </WrapperComponent>
        <WrapperComponent title="Component Input" type="main" dot>
          <WrapperComponent title="Text">
            <AtomInput
              labeltext="Label Input Example"
              input={{
                placeholder: "Placeholder Input Example",
              }}
            />
            <AtomInput
              astheme="secondary"
              labeltext="Label Input Example"
              input={{
                placeholder: "Placeholder Input Example",
              }}
            />
          </WrapperComponent>
          <WrapperComponent title="Select">
            <AtomInput
              type="select"
              labeltext="Label Input Example"
              // options={OPTIONS}
              input={{
                placeholder: "Placeholder Input Example",
              }}
            />
            <AtomInput
              type="select"
              astheme="secondary"
              labeltext="Label Input Example"
              // options={OPTIONS}
              input={{
                placeholder: "Placeholder Input Example",
              }}
            />
          </WrapperComponent>
        </WrapperComponent>
      </AtomWrapper>
    </AtomWrapper>
  );
};

export default PageIndex;
