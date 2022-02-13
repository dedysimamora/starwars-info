import React, { useState, useEffect } from "react";
import { Row, Col, Image, Typography, List, Card } from "antd";
import HorizontalScrool from "../../component/horizontalScrool";
import getMoviesData from "../../utils/localMovies";
import { mappingMoviePoster } from "../../utils/mappingImage";
import ComponentPool from "../../component/componentPool";
import "./sectionPage.css";

interface dataSectionProps {
  menuName: string,
  endpoint: string,
}

interface SectionPageProps {
      data :dataSectionProps
}

const Index : React.FC<SectionPageProps> = ({data}) => {
  const { Title, Paragraph, Text, Link } = Typography;
  const [arrData, setArrData] = useState(getMoviesData);
  const [activeIndex, setActiveIndex] = useState(0);
  return (
    <div className="section-page-container">
      <Row>
        <Col xs={24} sm={4}>
          <div style={{width:'100%', display:'flex', justifyContent:'center', alignItems:'center'}}>

          <Image
            preview={false}
            className={'section-page-image-preview'}
            src={
              mappingMoviePoster[arrData.data.allFilms.films[activeIndex].title]
            }
            />
            </div>
        </Col>
        <Col xs={24} sm={{span: 15, offset: 1}}>
          <Typography>
            <Title className="section-title">{data.menuName}</Title>
            <Title className="section-sub-title" level={2}>
              {arrData.data.allFilms.films[activeIndex].title}
            </Title>
            <Paragraph className="section-description">
              {arrData.data.allFilms.films[activeIndex].openingCrawl}
            </Paragraph>
          </Typography>
          <Row gutter={[8,16]}>
            <Col xs={24} sm={12}>
              <ComponentPool
                title={"Character"}
                data={
                  arrData.data.allFilms.films[activeIndex].characterConnection
                    .characters
                }
              />
            </Col>
            <Col xs={24} sm={{span:11, offset: 1}}>
              <ComponentPool
                title={"Star Ship"}
                data={
                  arrData.data.allFilms.films[activeIndex].starshipConnection
                    .starships
                }
              />
            </Col>
          </Row>
        </Col>
      </Row>
      <Row style={{ marginTop: "20px", padding: "20px" }}>
        <Col span={24}>
          <HorizontalScrool
            data={arrData.data.allFilms.films}
            onClickFunct={(index: number) => setActiveIndex(index)}
          />
        </Col>
      </Row>
    </div>
  );
};

export default Index;
