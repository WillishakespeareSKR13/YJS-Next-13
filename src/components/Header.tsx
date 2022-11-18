import {
  AtomIcon,
  AtomInput,
  AtomText,
  AtomWrapper,
  ChangeBrightness,
  ChangeTransparency,
  colorIcon,
  css,
  IsBackDark,
  useTheme,
  wrapperBlur
} from '@stacklycore/ui'
import { useEffect, useState } from 'react'
import ToggleTheme from './ToggleTheme'

const Header = () => {
  const { theme } = useTheme()
  const [isOffset, setIsOffset] = useState(false)

  useEffect(() => {
    const onScroll = () => {
      setIsOffset(window.pageYOffset > 0)
    }
    window.removeEventListener('scroll', onScroll)
    window.addEventListener('scroll', onScroll, { passive: true })
    onScroll()
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  return (
    <AtomWrapper
      as="nav"
      css={() => css`
        position: sticky;
        top: 0;
        left: 0;
        width: 100%;
        height: max-content;
        background-color: transparent;
        z-index: 9999;
      `}
    >
      <AtomWrapper
        css={() => css`
          display: flex;
          justify-content: center;
          align-items: center;
          padding: 10px 90px;
          height: 40px;
          margin-top: ${isOffset ? '-40px' : '0px'};
          transition: margin-top 0.3s ease-in-out;
          background-color: ${theme?.header?.properties?.background ?? '#fff'};
          border-bottom: 1px solid ${ChangeBrightness(theme?.header?.properties?.background, 20)};
          box-shadow: 0px 0px 10px 0px rgba(0, 0, 0, 0.1);
          z-index: 2;
        `}
      >
        <AtomText>Lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam 😎</AtomText>
      </AtomWrapper>
      <AtomWrapper
        css={() => css`
          flex-direction: row;
          padding: 10px 90px;
          justify-content: space-between;
          align-items: center;
          height: 80px;
          background-color: transparent;
          box-shadow: 0px 0px 10px 0px rgba(0, 0, 0, 0);

          ${isOffset &&
          css`
            ${wrapperBlur(
              ChangeTransparency(theme?.header?.properties?.blur ?? '#000000', 10) ??
                ChangeTransparency('#fff', 10)
            )}
            box-shadow: 0px 0px 10px 0px rgba(0, 0, 0, 0.1);
            border-bottom: 1px solid ${ChangeBrightness(theme?.header?.properties?.background, 20)};
          `}
          transition: background-color 0.3s ease-in-out;
        `}
      >
        <AtomIcon
          css={() => css`
            width: 150px;
            ${colorIcon(
              ChangeBrightness(IsBackDark(theme?.header?.properties?.background ?? '#fff'), 50)
            )}
          `}
          icon="https://storage.googleapis.com/cdn-bucket-ixulabs-platform/STCO-0001/logo.svg"
        />
        <AtomInput
          input={{
            placeholder: 'Search'
          }}
        />
        <ToggleTheme />
      </AtomWrapper>
    </AtomWrapper>
  )
}

export default Header
