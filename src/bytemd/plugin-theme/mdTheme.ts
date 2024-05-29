import { BytemdViewerContext } from 'bytemd';

export const icons = {
  theme:
    '<svg width="24" height="24" viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg"><rect width="48" height="48" fill="white" fill-opacity="0.01"></rect><path d="M6 44L6 25H12V17H36V25H42V44H6Z" fill="none" stroke="#333" stroke-width="4" stroke-linejoin="round"></path><path d="M17 17V8L31 4V17" stroke="#333" stroke-width="4" stroke-linecap="round" stroke-linejoin="round"></path></svg>',
  code_theme:
    '<svg width="24" height="24" viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg"><rect width="48" height="48" fill="white" fill-opacity="0.01"></rect><path d="M6 44L6 25H12V17H36V25H42V44H6Z" fill="none" stroke="#333" stroke-width="4" stroke-linejoin="round"></path><path d="M17 17V8L31 4V17" stroke="#333" stroke-width="4" stroke-linecap="round" stroke-linejoin="round"></path></svg>',
};
export const mdThemes = [
  'default',
  'arknights',
  'awesome-green',
  'channing-cyan',
  'Chinese-red',
  'condensed-night-purple',
  'cyanosis',
  'devui-blue',
  'fancy',
  'geek-black',
  'github',
  'greenwillow',
  'healer-readable',
  'hydrogen',
  'juejin',
  'jzman',
  'keepnice',
  'koi',
  'lilsnake',
  'minimalism',
  'mk-cute',
  'nico',
  'orange',
  'qklhk-chocolate',
  'scrolls-light',
  'serene-rose',
  'simplicity-green',
  'smartblue',
  'v-green',
  'vue-pro',
  'vuepress',
  'yu',
  'z-blue',
];
function loadCSS(url: string, id: string) {
  const xhr = new XMLHttpRequest();
  xhr.open('GET', url, true);
  xhr.onreadystatechange = function () {
    if (xhr.readyState === 4 && xhr.status === 200) {
      const cssText = xhr.responseText;
      const styleTag = document.createElement('style');
      styleTag.setAttribute('id', `${id}`);
      styleTag.setAttribute('type', 'text/css');
      styleTag.innerHTML = cssText;
      document.head.appendChild(styleTag);
    }
  };
  xhr.send();
}

const Theme_url = '/editorTheme/';
export let theme = '';
export let codeTheme = '';
export const changeTheme = (themename: string) => {
  const mdTheme = document.head.querySelector('style#MD_THEME');
  if (mdTheme) {
    document.head.removeChild(mdTheme);
  }
  if (themename === 'default') {
    theme = '';
    return;
  }
  loadCSS(`${Theme_url}${themename}.min.css`, 'MD_THEME');
  theme = themename;
};

export const getThemeName = (ctx: BytemdViewerContext) => {
  const themeName = ctx.file.frontmatter?.theme;
  if (themeName) {
    changeTheme(themeName);
  }
};
