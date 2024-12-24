import { DarkTheme } from '@react-navigation/native';

const AppDarkTheme = {
  ...DarkTheme,
  dark: false,
  colors: {
    ...DarkTheme.colors,
    text: '#FFFFFF',
    background: '#151718',
    card: '#252525',
    tint: '#3A3A3A',
    lightText: '#E5E5E5',
    separatorColor: '#353535',
    primaryAccent: '#C0EC4E',
    secondaryAccent: '#907EFF',
    buttonColor: '#FFFFFF',
    secondaryButtonColor: '#000',
    secondaryTextColor: '#FFFFFF',
    secondaryLightText: '#E5E5E5',
    secondaryTint: '#A5A5A5',
    cardBackgroundNoText: 'transparent',
    focusedContainer: '#353535',
  },
};

export default AppDarkTheme;
