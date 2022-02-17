import React from "react";
import { Row, Col, Avatar, Tooltip, Typography, Skeleton } from "antd";
import { getInitialName } from "../../utils/getInitialName";
import { modalReactiveAction } from "../../apollo/reactive-variable/modal-data";
import "./componentPool.css";

interface componentPoolProps {
  title: string;
  data: Array<any>;
}

const Index: React.FC<componentPoolProps> = ({ title, data }) => {
  const ColorList = [
    "#AAD7EC",
    "#81B1CE",
    "#151269",
    "#0F1056",
    "#113065",
    "#0D0D0D",
    "#192036",
    "#2C395D",
    "#B4491A",
    "#EAA890",
  ];

  const { Title } = Typography;

  const onClickFunction = async (index: number) => {
    modalReactiveAction.turnOnModal(true, data[index]);
  };

  return (
    <div>
      {title === undefined ? (
        <Skeleton.Button
          className="component-pool-title-skeleton"
          active={true}
          size={"small"}
          shape={"square"}
        />
      ) : (
        <Title className="component-pool-title" level={4}>
          {title}
        </Title>
      )}

      <div className="component-pool-container">
        <Row gutter={[8, 8]}>
          {data !== undefined &&
            data.map((e, index) => (
              <Col onClick={() => onClickFunction(index)}>
                <Tooltip title={e.name} placement="top">
                  <Avatar
                    style={{
                      backgroundColor: ColorList[index % 10],
                      verticalAlign: "middle",
                    }}
                    size="large"
                  >
                    {getInitialName(e.name)}
                  </Avatar>
                </Tooltip>
              </Col>
            ))}
        </Row>
      </div>
    </div>
  );
};

export default Index;
