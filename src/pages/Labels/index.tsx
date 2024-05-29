import { addLabel, getLabelAll, setLabelName } from '@/apis/label';
import {
  ModalForm,
  PageContainer,
  ProFormText,
  ProList,
} from '@ant-design/pro-components';
import { Button, Tag, message } from 'antd';
import { useCallback, useEffect, useState } from 'react';

export default () => {
  const [labels, setLabels] = useState([]);
  const [open, setOpen] = useState(false);
  const [selectId, setSelectId] = useState<number>(-1);
  const fetchData = useCallback(async () => {
    const originData = await getLabelAll();

    const data = originData.data.map((label) => ({
      title: String(label.name).toUpperCase(),
      subTitle: <Tag color="#5BD8A6">标签库</Tag>,
      actions: [
        <Button
          key="edit"
          type="link"
          onClick={() => {
            setOpen(true);
            setSelectId(Number(label.id));
          }}
        >
          修改
        </Button>,
      ],
      avatar:
        'https://gw.alipayobjects.com/zos/antfincdn/UCSiy1j6jx/xingzhuang.svg',
      content: (
        <div
          style={{
            flex: 1,
          }}
        >
          <div>
            文章数： <Tag color="#5BD8A6">{label.articles}</Tag>
          </div>
        </div>
      ),
    }));
    setLabels(data);
  }, []);

  useEffect(() => {
    fetchData();
  }, [fetchData]);

  return (
    <PageContainer
      ghost
      extra={
        <>
          <Button
            type="primary"
            onClick={() => {
              setOpen(true);
            }}
          >
            新增
          </Button>
        </>
      }
    >
      <ProList<any>
        pagination={{
          defaultPageSize: 9,
          showSizeChanger: false,
        }}
        showActions="hover"
        grid={{ gutter: 16, column: 3 }}
        metas={{
          title: {},
          subTitle: {},
          type: {},
          avatar: {},
          content: {},
          actions: {
            cardActionProps: 'extra',
          },
        }}
        dataSource={labels}
      />
      <ModalForm
        title={`${selectId === -1 ? '新增' : '修改'}标签名称`}
        open={open}
        onOpenChange={setOpen}
        onFinish={async (values) => {
          if (selectId === -1) {
            await addLabel({
              name: values.name,
            });
          }
          await setLabelName({
            id: selectId,
            name: values.name,
          });
          message.success(`${selectId === -1 ? '新增' : '修改'}成功`);
          await fetchData();
          setSelectId(-1);
          return true;
        }}
      >
        <ProFormText
          width="md"
          name="name"
          label="标签名称"
          tooltip="最长为 10 位"
          placeholder="请输入标签名"
        />
      </ModalForm>
    </PageContainer>
  );
};
