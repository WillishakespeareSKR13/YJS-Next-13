import { css } from "@emotion/react";
import {
  AtomButton,
  AtomIcon,
  ChangeBrightness,
  colorIcon,
  IsBackDark,
  useTheme,
} from "@stacklycore/ui";

const ICONS = {
  light:
    "https://storage.googleapis.com/cdn-bucket-ixulabs-platform/STCO-0001/icons/light.svg",
  dark: "https://storage.googleapis.com/cdn-bucket-ixulabs-platform/STCO-0001/icons/dark.svg",
};

const ToggleTheme = () => {
  const { key, theme, toggle } = useTheme();
  return (
    <AtomButton
      onClick={() => toggle()}
      css={() => css`
        top: 30px;
        right: 30px;
        width: max-content;
        padding: 0px 20px;
        border-radius: 30px;
        box-shadow: 0 0 10px rgba(0, 0, 0, 0.048);
        border: 1px solid ${theme?.general?.properties?.tooltip};
        background-color: ${key === "light"
          ? theme?.general?.color?.primary
          : theme?.general?.properties?.tooltip};
        :hover {
          background-color: ${key === "light"
            ? ChangeBrightness(theme?.general?.color?.primary, -10)
            : ChangeBrightness(theme?.general?.properties?.tooltip, -10)};
          border: 1px solid ${theme?.general?.properties?.tooltip};
        }
      `}
    >
      <AtomIcon
        css={() => css`
          width: 18px;
          height: 18px;
          ${colorIcon(
            IsBackDark(
              key === "light"
                ? theme?.general?.color?.primary
                : theme?.general?.properties?.tooltip
            )
          )}
        `}
        icon={ICONS[key] ?? ICONS.light}
      />
    </AtomButton>
  );
};

export default ToggleTheme;
