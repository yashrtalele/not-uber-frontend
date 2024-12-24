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
    lightText: '#353535',
    separatorColor: '#eaeaea',
    primaryAccent: '#C0EC4E',
    secondaryAccent: '#907EFF',
    buttonColor: '#030318',
    secondaryButtonColor: '#030318',
    secondaryTextColor: '#FFFFFF',
    secondaryLightText: '#555555',
    secondaryTint: '#c7c7c7',
    cardBackgroundNoText: '#FAFAFA',
    focusedContainer: '#FFF',
  },
};

export default AppLightTheme;
