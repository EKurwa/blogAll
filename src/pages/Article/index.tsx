import { PageContainer } from '@ant-design/pro-components';
import { Outlet, useLocation } from '@umijs/max';
import { useEffect, useState } from 'react';
import Table from './components/Table.tsx';
const Article: React.FC = () => {
  const location = useLocation();
  const [show, setShow] = useState<boolean>(true);

  useEffect(() => {
    if (location.pathname !== '/article') {
      setShow(false);
    } else {
      setShow(true);
    }
  }, [location]);

  return (
    <>
      {show ? (
        <PageContainer ghost>
          <Table />
        </PageContainer>
      ) : (
        <Outlet />
      )}
    </>
  );
};

export default Article;
