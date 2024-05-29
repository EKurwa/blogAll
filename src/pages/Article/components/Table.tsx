import {
  SearchArticle,
  getArticleList,
  updateArticle,
  type Article,
} from '@/apis/article';
import { getLabelAll } from '@/apis/label';
import { PlusOutlined } from '@ant-design/icons';
import type { ActionType, ProColumns } from '@ant-design/pro-components';
import { ProTable } from '@ant-design/pro-components';
import { Button, SelectProps, Space, Tag } from 'antd';
import { useEffect, useRef, useState } from 'react';
import { history } from 'umi';

const valueEnum: string[] = ['Error', 'Warning', 'Success'];

export default () => {
  const actionRef = useRef<ActionType>();
  const [tableData, setTableData] = useState<Article[]>([]);
  // 文章标签集合
  const [labelAll, setLabelAll] = useState<SelectProps['options']>([]);

  const columns: ProColumns<Article>[] = [
    {
      disable: true,
      title: '文章标题',
      dataIndex: 'title',
      copyable: true,
      ellipsis: true,
      editable: false,
    },
    {
      disable: true,
      title: '文章状态',
      dataIndex: 'status',
      onFilter: true,
      ellipsis: true,
      valueType: 'select',
      valueEnum: {
        Success: {
          text: '已发布',
          status: 'Success',
        },
        Warning: {
          text: '已暂存',
          status: 'Warning',
        },
        Error: {
          text: '已锁定',
          status: 'Error',
        },
      },
    },
    {
      disable: true,
      title: '文章标签',
      dataIndex: 'labels',
      valueType: 'select',
      editable: false,
      fieldProps: {
        options: labelAll,
      },
      renderFormItem: (_, { defaultRender }) => {
        return defaultRender(_);
      },
      render: (_, record) => (
        <Space>
          {record.labels.map(({ id, name }) => (
            <Tag key={id}>{name}</Tag>
          ))}
        </Space>
      ),
    },
    {
      title: '创建时间',
      key: 'showTime',
      dataIndex: 'createTime',
      valueType: 'dateTime',
      editable: false,
      search: false,
    },
    {
      title: '修改时间',
      dataIndex: 'updateTime',
      valueType: 'dateTime',
      key: 'updateTime',
      editable: false,
      search: false,
    },
    {
      title: '操作',
      valueType: 'option',
      key: 'option',
      render: (text, record, _, action) => (
        <Space>
          <a
            key="satatus"
            onClick={() => {
              action?.startEditable?.(record.id);
            }}
          >
            状态
          </a>
          <a
            key="editable"
            onClick={() => {
              history.push(
                {
                  pathname: '/article/edit',
                },
                {
                  id: record.id,
                },
              );
            }}
          >
            编辑
          </a>
          <a
            key="view"
            onClick={() => {
              history.push(
                {
                  pathname: '/article/preview',
                },
                {
                  id: record.id,
                },
              );
            }}
          >
            预览
          </a>
        </Space>
      ),
    },
  ];
  // 编辑文章状态后报错操作
  const editOnSave = async (_, record: any) => {
    try {
      await updateArticle({
        id: record.id,
        status: Number(valueEnum.indexOf(record.status) - 1),
      });
      const newTableData = tableData.map((item) => {
        if (item.id === record.id) {
          item.status = record.status;
        }
        return item;
      });
      setTableData(newTableData);
    } catch (error) {}
  };
  // 用户获取文章数据后的格式化操作
  const setArticleList = async (from?: SearchArticle) => {
    const { data } = await getArticleList(from);
    const result = data.articles.map((article: Article) => {
      return {
        ...article,
        status: valueEnum[Number(article.status) + 1],
      };
    });
    setTableData(result);

    return {
      data: result,
      success: true,
      total: data.totalCount,
    };
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

  useEffect(() => {
    _getLabelAll();
  }, [location.pathname]);
  return (
    <ProTable<Article>
      columns={columns}
      dataSource={tableData}
      actionRef={actionRef}
      cardBordered
      request={async (params) => {
        const searchData: any = {};
        if (params.title) {
          searchData.keyword = params.title;
        }
        if (params.status) {
          searchData.status = Number(valueEnum.indexOf(params.status)) - 1;
        }
        if (params.labels) {
          searchData.labels = params.labels;
        }
        return await setArticleList({
          page: params.current,
          pageSize: params.pageSize,
          ...searchData,
        });
      }}
      editable={{
        type: 'multiple',
        actionRender: (row, config, defaultDom) => {
          return [defaultDom.save, defaultDom.cancel];
        },
        onSave: editOnSave,
      }}
      // columnsState={{
      //   persistenceKey: 'pro-table-singe-demos',
      //   persistenceType: 'localStorage',
      //   defaultValue: {
      //     option: { fixed: 'right', disable: true },
      //   },
      //   onChange(value) {
      //     console.log('value: ', value);
      //   },
      // }}
      rowKey="id"
      search={{
        labelWidth: 'auto',
      }}
      options={{
        setting: {
          listsHeight: 400,
        },
      }}
      pagination={{
        pageSize: 5,
      }}
      dateFormatter="string"
      toolBarRender={() => [
        <Button
          key="button"
          icon={<PlusOutlined />}
          onClick={() => {
            // actionRef.current?.reload();
            history.push('/article/edit');
          }}
          type="primary"
        >
          新建
        </Button>,
      ]}
    />
  );
};
