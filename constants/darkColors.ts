import { DarkTheme } from '@react-navigation/native';

const AppDarkTheme = {
  ...DarkTheme,
  dark: false,
  colors: {
    ...DarkTheme.colors,
    text: '#FFFFFF',
    background: '#151718',
    card: '#FAFAFA',
    tint: '#FAFAFA',
    lightText: '#656565',
    primaryAccent: '#C0EC4E',
    secondaryAccent: '#907EFF',
    buttonColor: '#FFFFFF',
  },
};

export default AppDarkTheme;
