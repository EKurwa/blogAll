import { useCallback, useEffect, useState } from "react";
import { getArticleList } from "../../apis/article";
import { Card, Col, Row, Tag } from "antd";
import moment from "moment";
import { useNavigate } from "react-router-dom";

const Root = () => {
  const [data, setData] = useState([]);
  const navigate = useNavigate();
  const getList = useCallback(async () => {
    const res = await getArticleList({
      page: 1,
      pageSize: 10,
    });
    setData(res.data.articles);
  }, []);

  useEffect(() => {
    getList();
  }, []);

  const handleClick = (item: any) => {
    navigate(`/article/${item.id}`);
  };

  return (
    <>
      <Row justify="center" gutter={[16, 28]}>
        <Col xs={24} sm={22} md={18} lg={14} xl={18}>
          <h2>个人成长记录</h2>
        </Col>
        {data.map((item: any) => {
          return (
            <Col
              xs={24}
              sm={22}
              md={18}
              lg={14}
              xl={18}
              key={item.id}
              style={{ cursor: "pointer" }}
            >
              <Card
                style={{ width: "100%", padding: "10px" }}
                hoverable
                onClick={() => handleClick(item)}
              >
                <div style={{ marginTop: "10px" }}>{item.title}</div>
                <p style={{ marginTop: "10px" }}>
                  {item.labels.map((label: any) => {
                    return (
                      <Tag color="orange" key={label.id}>
                        {label.name}
                      </Tag>
                    );
                  })}
                </p>
                <div style={{ marginTop: "10px" }}>
                  {moment(item.updateTime).format("YYYY-MM-DD HH:mm:ss")}
                </div>
              </Card>
            </Col>
          );
        })}
      </Row>
    </>
  );
};

export default Root;
