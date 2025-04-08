// Telegram WebApp 테마 파라미터 타입
export interface ThemeParams {
  bg_color: string;
  text_color: string;
  hint_color: string;
  link_color: string;
  button_color: string;
  button_text_color: string;
  secondary_bg_color: string;
}

// 색상 변수 이름 타입
export type ColorVariable = 
  | 'bg-color'
  | 'text-color'
  | 'hint-color'
  | 'link-color'
  | 'button-color'
  | 'button-text-color'
  | 'secondary-bg-color'; 