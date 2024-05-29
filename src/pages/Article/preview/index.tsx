import { getArticleDetail } from '@/apis/article';
import themePlugin from '@/bytemd/plugin-theme';
import breaks from '@bytemd/plugin-breaks';
import frontmatter from '@bytemd/plugin-frontmatter'; // 解析前题
import gemoji from '@bytemd/plugin-gemoji';
import gfm from '@bytemd/plugin-gfm';
import highlight from '@bytemd/plugin-highlight'; // 代码高亮
import mediumZoom from '@bytemd/plugin-medium-zoom'; // 缩放图片
import { Viewer } from '@bytemd/react';
import { useLocation } from '@umijs/max';
import { Col, Row } from 'antd';
import 'bytemd/dist/index.css';
import zhHans from 'bytemd/locales/zh_Hans.json';
import { useEffect, useState } from 'react';

const plugins = [
  gfm(), // GFM
  highlight(), // 代码高亮
  frontmatter(), // 解析前题
  mediumZoom(), // 图片缩放
  gemoji(), // Gemoji短代码
  breaks(),
  themePlugin(),
];

export default function ArticlePreview() {
  const location = useLocation();

  const [preContent, setPreContent] = useState<string>('');

  /**
   * @description 设置预览内容
   */
  const _setArticleContent = async (id: number) => {
    const res = await getArticleDetail(id);
    setPreContent(res.data.content);
  };

  useEffect(() => {
    const id = (location?.state as Record<string, any>)?.id;
    if (id) {
      _setArticleContent(id);
    }
  }, []);

  return (
    <div id="main">
      <Row align="top" justify="center">
        <Col xs={24} sm={23} md={20} lg={20} xl={20}>
          <Viewer value={preContent} plugins={plugins} locale={zhHans} />
        </Col>
      </Row>
    </div>
  );
}
