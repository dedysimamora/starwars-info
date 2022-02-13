import React from "react";
import { Layout, Menu, Row, Col } from "antd";
import starWarsLogo from "../assets/logo/starWarsLogo.png";
import LandingPage from "../container/landingPage";
import SectionPage from "../container/sectionPage";
import { Element, scroller } from "react-scroll";
import "./basicLayout.css";
const Index = () => {
  const { Header, Content, Footer } = Layout;
  const menuSection = [
    {
      menuName: "FILMS",
      endpoint: "blabla",
    },
    {
      menuName: "PEOPLE",
      endpoint: "blabla",
    },
    {
      menuName: "PLANET",
      endpoint: "blabla",
    },
    {
      menuName: "VEHICLE",
      endpoint: "blabla",
    },
    {
        menuName: "VEHICLE",
        endpoint: "blabla",
      },
  ];
  const scroolFunction = (componentName: string): void => {
    scroller.scrollTo(componentName, {
      duration: 800,
      delay: 0,
      smooth: "easeInOutQuart",
    });
  };
  return (
    <>
      <Layout className="layout">
        <Header>
          <Row>
            <Col xs={6} md={2}>
              <div className="logo">
                <img src={starWarsLogo} alt="logo" />
              </div>
            </Col>
            <Col xs={18}>
              <Menu theme="dark" mode="horizontal">
                <Menu.Item
                  key={"1"}
                  onClick={() => scroolFunction("FILMS")}
                >{`Film`}</Menu.Item>
                <Menu.Item
                  key={"2"}
                  onClick={() => scroolFunction("PEOPLE")}
                >{`People`}</Menu.Item>
                <Menu.Item
                  key={"3"}
                  onClick={() => scroolFunction("PLANET")}
                >{`Planet`}</Menu.Item>
                <Menu.Item
                  key={"4"}
                  onClick={() => scroolFunction("STAR SHIP")}
                >{`Star Ship`}</Menu.Item>
                <Menu.Item
                  key={"5"}
                  onClick={() => scroolFunction("VEHICLE")}
                >{`Vehicle`}</Menu.Item>
              </Menu>
            </Col>
          </Row>
        </Header>
        <Content>
          <>
            <LandingPage />
            {menuSection.map((e, index) => (
              <Element name={e.menuName} className={"element-section"}>
                <SectionPage data={e} />
              </Element>
            ))}
          </>
        </Content>
        <Footer style={{ textAlign: "center" }}>
          Ant Design ©2018 Created by Ant UED
        </Footer>
      </Layout>
    </>
  );
};

export default Index;
