import themePlugin from '@/bytemd/plugin-theme';
import breaks from '@bytemd/plugin-breaks';
import frontmatter from '@bytemd/plugin-frontmatter'; // 解析前题
import gemoji from '@bytemd/plugin-gemoji';
import gfm from '@bytemd/plugin-gfm'; // 支持GFM
import highlight from '@bytemd/plugin-highlight'; // 代码高亮
import mediumZoom from '@bytemd/plugin-medium-zoom'; // 缩放图片
import { Editor } from '@bytemd/react';
import { request } from '@umijs/max';
import React from 'react';

import 'bytemd/dist/index.min.css'; // bytemd基础样式必须引入！！！
import zhHans from 'bytemd/lib/locales/zh_Hans.json'; // 中文插件

interface EditorProps {
  value: string;
  setValue: any;
}
const plugins = [
  gfm(), // GFM
  highlight(), // 代码高亮
  frontmatter(), // 解析前题
  mediumZoom(), // 图片缩放
  gemoji(), // Gemoji短代码
  breaks(),
  themePlugin(),
];
const Bytemd: React.FC<EditorProps> = (props) => {
  return (
    <>
      <Editor
        locale={zhHans}
        plugins={plugins}
        value={props.value}
        onChange={(v) => props.setValue(v)}
        uploadImages={async (files: any) => {
          let fromData = new FormData();
          fromData.append('uploadImg', files[0]);
          const { data } = await request('/file', {
            method: 'post',
            data: fromData,
          });

          return [
            {
              title: files.map((i) => i.name),
              url: `http://127.0.0.1:8080/${data[0]['filename']}`,
            },
          ];
        }}
      />
    </>
  );
};
export default Bytemd;
