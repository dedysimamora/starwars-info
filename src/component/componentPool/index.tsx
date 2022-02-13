import React from "react";
import { Row, Col, Avatar, Tooltip, Typography } from "antd";
import "./componentPool.css"

interface componentPoolProps {
    title : string,
    data : Array<any>
}

const Index : React.FC<componentPoolProps> = ({title, data}) => {
    const ColorList = ['#AAD7EC', '#81B1CE', '#151269', '#0F1056', '#113065','#0D0D0D', '#192036','#2C395D', '#B4491A', '#EAA890']; 
    const { Title, Paragraph, Text, Link } = Typography;
    const getInitial = (name : string) => {
        let splitName : Array<string> = name.split(" ")
        if(splitName.length == 1){
            splitName = name.split("-")
        }
        return `${splitName[0].charAt(0).toUpperCase()} ${splitName[1] !== undefined ? splitName[1].charAt(0).toUpperCase() : splitName[0].charAt(1).toUpperCase()}`
    }
  return (
    <div className="component-pool-container">
    <Title className="component-pool-title" level={4}>{title}</Title>
      <Row gutter={[8,8]}>
        {data.map((e, index) => (
            <Col >
          <Tooltip title={e.name} placement="top">
          <Avatar style={{ backgroundColor: ColorList[index%10], verticalAlign: 'middle' }} size="large" >
          {getInitial(e.name)}
        </Avatar>
          </Tooltip>
            </Col>
        ))}
      </Row>
    </div>
  );
};

export default Index;
