import { ThemeParams, ColorVariable } from '../types/telegram';

// CSS 변수 이름 생성
const createCssVariableName = (name: ColorVariable) => `--tg-${name}`;

// 테마 색상을 CSS 변수로 설정
export const setThemeParams = (params: ThemeParams) => {
  if (typeof document === 'undefined') return;

  const root = document.documentElement;
  const themeParams = {
    'bg-color': params.bg_color,
    'text-color': params.text_color,
    'hint-color': params.hint_color,
    'link-color': params.link_color,
    'button-color': params.button_color,
    'button-text-color': params.button_text_color,
    'secondary-bg-color': params.secondary_bg_color,
  };

  Object.entries(themeParams).forEach(([key, value]) => {
    root.style.setProperty(
      createCssVariableName(key as ColorVariable),
      value
    );
  });
};

// CSS 변수 사용을 위한 유틸리티 함수
export const tgVar = (name: ColorVariable) => `var(${createCssVariableName(name)})`;

// 테마 모드 확인 (라이트/다크)
export const isDarkTheme = () => {
  if (typeof window === 'undefined' || !window.Telegram?.WebApp) return false;
  return window.Telegram.WebApp.colorScheme === 'dark';
}; 