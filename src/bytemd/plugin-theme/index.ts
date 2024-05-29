import { BytemdPlugin } from 'bytemd';
import { changeTheme, getThemeName, icons, mdThemes } from './mdTheme';
export default function themePlugin() {
  return {
    actions: [
      {
        title: '主题',
        icon: icons.theme, // 16x16 SVG icon
        handler: {
          type: 'dropdown',
          actions: mdThemes.map((theme) => ({
            title: theme,
            icon: '',
            cheatsheet: '',
            handler: {
              type: 'action',
              click: () => {
                changeTheme(theme);
              },
            },
          })),
        },
      },
    ],
    viewerEffect: getThemeName,
  } as BytemdPlugin;
}
