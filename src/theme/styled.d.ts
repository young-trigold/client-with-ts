import 'styled-components';

declare module 'styled-components' {
  export interface DefaultTheme {
    primaryColor: string;
    hoverColor: string;
    activeColor: string;
    backgroundColor: string;
    foregroundColor: string;
    surfaceColor: string;
    textColor: string;
    successColor: string;
    warnColor: string;
    dangeColor: string;
    shadowColor: string;
    codeMask: string;
    lineColor: string;
    rectRadius: string;
    roundedRadius: string;
    transitionDuration: string;
  }
}
