import { createArticle, getArticleDetail, updateArticle } from '@/apis/article';
import { getLabelAll } from '@/apis/label';
import Bytemd from '@/components/common/Bytemd';
import { PageContainer } from '@ant-design/pro-components';
import { useLocation } from '@umijs/max';
import {
  Button,
  Input,
  Modal,
  Select,
  SelectProps,
  Space,
  message,
} from 'antd';
import { useEffect, useState } from 'react';

const Edit = () => {
  const location = useLocation();
  // 内容前缀
  const contentPrefix = `---\n# 主题列表：default,arknights,awesome-green,channing-cyan,Chinese-red,condensed-night-purple,cyanosis,devui-blue,fancy,geek-black,github,greenwillow,healer-readable,hydrogen,juejin,jzman,keepnice,koi,lilsnake,minimalism,mk-cute,nico,orange,qklhk-chocolate,scrolls-light,serene-rose,simplicity-green,smartblue,v-green,vue-pro,vuepress,yu,z-blue\ntheme: 'smartblue'  # 更换此处的主题名称，可以预览主题\n---`;
  // 文章内容
  const [article, setArticle] = useState<string>(contentPrefix);
  // 文章标题
  const [title, setTitle] = useState<string>('');
  // 文章标签
  const [label, setLabel] = useState<number[]>([]);
  // 文章标签集合
  const [labelAll, setLabelAll] = useState<SelectProps['options']>([]);
  // 是否为暂存:0 or 发布:1
  const [status, setStatus] = useState<number>(0);
  // 是否显示弹窗
  const [modalShow, setModalShow] = useState<boolean>(false);
  // 获取并处理文章
  const _getArticleDetail = async (id: number) => {
    // 获取文章详情
    try {
      const res = await getArticleDetail(id);
      setArticle(res.data.content);
      setTitle(res.data.title);
      const labelIds = res.data.labels.map((item: Record<string, any>) => {
        return item.id;
      });
      setLabel(labelIds);
    } catch (error) {}
  };
  // 获取所有标签
  const _getLabelAll = async () => {
    const { data } = await getLabelAll();
    const labelAll = data.map((item: Record<string, any>) => {
      return {
        label: item.name,
        value: item.id,
      };
    });
    setLabelAll(labelAll);
  };
  // 选择标签
  const handleChange = (value: number[]) => {
    setLabel(value);
  };
  // 保存or新增文章
  const handleSave = async () => {
    const id = (location?.state as Record<string, any>)?.id;
    if (id) {
      await updateArticle({
        id,
        title,
        labels: label,
        content: article,
        status,
      });
    } else {
      // 新增文章
      await createArticle({
        title,
        labels: label,
        content: article,
        status,
      });
    }
    message.success('保存成功');
  };

  useEffect(() => {
    const id = (location?.state as Record<string, any>)?.id;
    if (id) {
      _getArticleDetail(id);
    }
    _getLabelAll();
  }, [location.pathname]);
  return (
    <>
      <PageContainer
        ghost
        extra={[
          <Button
            key="0"
            onClick={() => {
              setModalShow(true);
              setStatus(0);
            }}
          >
            暂存
          </Button>,
          <Button
            key="1"
            type="primary"
            onClick={() => {
              setModalShow(true);
              setStatus(1);
            }}
          >
            发布
          </Button>,
        ]}
      >
        <Bytemd value={article} setValue={setArticle} />
      </PageContainer>
      <Modal
        title="文章属性"
        open={modalShow}
        onOk={async () => {
          await handleSave();
          setModalShow(false);
        }}
        onCancel={() => setModalShow(false)}
      >
        <Space style={{ width: '100%' }} direction="vertical">
          <Input
            value={title}
            placeholder="请输入长度为6-20的标题"
            maxLength={20}
            onChange={(e) => {
              setTitle(e.target.value);
            }}
          />
          <Select
            mode="multiple"
            allowClear
            value={label}
            style={{ width: '100%' }}
            placeholder="文章标签"
            onChange={handleChange}
            options={labelAll}
          />
        </Space>
      </Modal>
    </>
  );
};

export default Edit;
