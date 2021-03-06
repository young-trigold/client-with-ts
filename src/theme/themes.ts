import { DefaultTheme } from 'styled-components';

export interface Themes {
  [key: string]: DefaultTheme;
}

const themes: Themes = {
  light: {
    primaryColor: '#1890ff',
    hoverColor: '#40a9ff',
    activeColor: '#096dd9',
    backgroundColor: '#f4f5f5',
    foregroundColor: '#ffffff',
    surfaceColor: '#f2f2f2',
    textColor: '#1c1e21',
    successColor: '#52c41a',
    warnColor: '#faad14',
    dangeColor: '#ff4d4f',
    shadowColor: 'rgb(0 0 0 / 0.1)',
    borderColor: '#dadde1',
  },
  dark: {
    primaryColor: '#67d6ed',
    hoverColor: '#95e2f2',
    activeColor: '#19b5d5',
    backgroundColor: '#1b1b1d',
    foregroundColor: '#242526',
    surfaceColor: '#2f3031',
    textColor: '#e3e3e3',
    successColor: '#73d13d',
    warnColor: '#ffec3d',
    dangeColor: '#fa541c',
    shadowColor: 'rgb(0 0 0/0.4)',
    borderColor: '#606770',
  },
};

export default themes;
