import { DefaultTheme } from '@react-navigation/native';

const AppLightTheme = {
  ...DefaultTheme,
  dark: true,
  colors: {
    ...DefaultTheme.colors,
    text: '#000',
    card: '#FAFAFA',
    background: '#FFFFFF',
    tint: '#FAFAFA',
    lightText: '#656565',
    primaryAccent: '#C0EC4E',
    secondaryAccent: '#907EFF',
    buttonColor: '#030318',
  },
};

export default AppLightTheme;
