import { DefaultTheme } from 'styled-components';

export interface Themes {
  [key: string]: DefaultTheme;
}

const themes: Themes = {
  light: {
    primaryColor: '#1890ff',
    hoverColor: '#40a9ff',
    activeColor: '#096dd9',
    backgroundColor: '#f3f3f3',
    foregroundColor: '#fcfbfb',
    surfaceColor: '#f1f0f0',
    textColor: '#222222',
    successColor: '#52c41a',
    warnColor: '#faad14',
    dangeColor: '#ff4d4f',
    shadowColor: 'rgb(0 0 0 / 0.3)',
    codeMask: '#bae7ff',
    lineColor: '#dddddd',
    transitionDuration: '0.3s',
    borderColor: '#434343',
  },
  dark: {
    primaryColor: '#177ddc',
    hoverColor: '#095cb5',
    activeColor: '#3c9be8',
    backgroundColor: '#121212',
    foregroundColor: '#212121',
    surfaceColor: '#383838',
    textColor: '#dddddd',
    successColor: '#73d13d',
    warnColor: '#ffec3d',
    dangeColor: '#fa541c',
    shadowColor: 'rgb(0 0 0/0.7)',
    codeMask: '#1890ff',
    lineColor: '#444444',
    transitionDuration: '0.3s',
    borderColor: '#434343',
  },
};

export default themes;
