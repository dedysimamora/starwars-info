import React, { useState, useEffect } from "react";
import { Row, Col, Image, Typography, Skeleton, Card } from "antd";
import HorizontalScrool from "../../component/horizontalScrool";
import { mappingMoviePoster } from "../../utils/mappingImage";
import ComponentPool from "../../component/componentPool";
import { scroller } from "react-scroll";
import { useLazyQuery } from "@apollo/client";
import {getInitialName} from "../../utils/getInitialName"
import { get } from "lodash";
import "./sectionPage.css";

interface dataSectionProps {
  menuName: string;
  query: any;
  connections: Array<string>;
  dataPath: string;
}

interface SectionPageProps {
  sectionPageData: dataSectionProps;
  activeMenu: string | null
}

const Index: React.FC<SectionPageProps> = ({ sectionPageData, activeMenu }) => {
  // eslint-disable-next-line
  const { Title, Paragraph} = Typography;
  const [arrData, setArrData] = useState<any>(null);
  const [activeIndex, setActiveIndex] = useState(0);
  const [getData, { loading, data, error }] = useLazyQuery(
    sectionPageData.query
  );

  const scroolFunction = (componentName: string): void => {
    scroller.scrollTo(componentName, {
      duration: 800,
      delay: 0,
      smooth: "easeInOutQuart",
    });
  };

  const getDataFunction = (variable?: any | null): void => {
    getData();
  };

  useEffect(() => {
    if (data) {
      let filterData = get(data, `${sectionPageData.dataPath}`);
      setArrData(filterData);
    }
  }, [data]);

  useEffect(() => {
    if(arrData == null && activeMenu === sectionPageData.menuName){
      getDataFunction();
    }
  }, [activeMenu]);

  return (
    <div className="section-page-container">
      <Row>
        <Col xs={24} sm={4}>
          <div
            className={"section-page-image-preview-container"}
            style={{
              width: "100%",
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              flexDirection: "column",
            }}
          >
            {arrData === null || loading ? (
              <Skeleton.Avatar
                className="section-title-skeleton hide-on-dekstop"
                active={true}
                size={"large"}
                shape={"square"}
              />
            ) : (
              <Title level={2} className="section-title hide-on-dekstop">
                {sectionPageData.menuName}
              </Title>
            )}

            {arrData === null || loading ? (
              <Skeleton.Avatar
                className="section-avatar-skeleton"
                active={true}
                size={"large"}
                shape={"square"}
              />
            ) : sectionPageData.menuName === "FILMS" ? (
              <Image
                preview={false}
                className={"section-page-image-preview"}
                src={mappingMoviePoster[arrData[activeIndex].title]}
              />
            ) : (
              <Card className="section-image-initial-card">
                <Title level={1} className="section-image-initial-card-title">
                 { getInitialName(arrData[activeIndex].name)}
                </Title>
              </Card>
            )}
          </div>
        </Col>
        <Col xs={24} sm={{ span: 15, offset: 1 }}>
          <Typography>
            {arrData === null || loading ? (
              <Skeleton.Avatar
                className="section-title-skeleton"
                active={true}
                size={"large"}
                shape={"square"}
              />
            ) : (
              <Title className="section-title hide-on-mobile">
                {sectionPageData.menuName}
              </Title>
            )}

            {arrData === null || loading ? (
              <Skeleton.Avatar
                className="section-title-skeleton"
                active={true}
                size={"large"}
                shape={"square"}
              />
            ) : (
              <Title className="section-sub-title" level={2}>
                {sectionPageData.menuName === "FILMS" ? arrData[activeIndex].title : arrData[activeIndex].name}
              </Title>
            )}

            {arrData === null || loading ? (
              <Skeleton className="section-title" paragraph={{ rows: 4 }} />
            ) : (
              <Paragraph className="section-description">
                {arrData[activeIndex].openingCrawl}
              </Paragraph>
            )}
          </Typography>
          <Row gutter={[8, 16]}>
            {
            arrData !== null &&
            sectionPageData.connections.map((e) => (
              <Col xs={24} sm={12}>
                <ComponentPool
                  title={e.split(".")[1]}
                  data={get(arrData[activeIndex], `${e}`)}
                />
              </Col>
            ))}
          </Row>
        </Col>
      </Row>
      <Row style={{ marginTop: "10px", padding: "20px" }}>
        <Col span={24}>
          <HorizontalScrool
            data={arrData}
            onClickFunct={(index: number) => {
              setActiveIndex(index);
              scroolFunction(sectionPageData.menuName);
            }}
          />
        </Col>
      </Row>
    </div>
  );
};

export default Index;
