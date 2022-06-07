export interface Theme {
  primaryColor: string;
  secondColor: string;
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
}

export interface Themes {
  [key: string]: Theme;
}

const themes: Themes = {
  light: {
    primaryColor: '#40a9ff',
    secondColor: '#096dd9',
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
  },
  dark: {
    primaryColor: '#002766',
    secondColor: '#096dd9',
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
  },
};

export default themes;
