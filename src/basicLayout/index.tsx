import React, { useEffect, useState } from "react";
import { Layout, Menu, Row, Col } from "antd";
import starWarsLogo from "../assets/logo/starWarsLogo.png";
import LandingPage from "../container/landingPage";
import SectionPage from "../container/sectionPage";
import ModalDetails from "../component/modalDetails"
import { useQuery } from '@apollo/client';
import { Element, Link } from "react-scroll";
import {modalStateReactive} from "../apollo/reactive-variable/modal-data"
import {GET_MODAL_DATA} from "../apollo/query/client-query"
import {
  GET_MOVIES,
  GET_PEOPLE,
  GET_PLANETS,
} from "../apollo/query/server-query";
import "./basicLayout.css";
const Index = () => {
  const { Header, Content, Footer } = Layout;
  const {data : {modal : modalData}, loading, error} = useQuery(GET_MODAL_DATA)
  const [activeMenu, setActiveMenu] = useState<string | null>(null);
  const menuSection = [
    {
      menuName: "FILMS",
      query: GET_MOVIES,
      dataPath: "allFilms.films",
      connections: [
        "characterConnection.characters",
        "starshipConnection.starships",
      ],
    },
    {
      menuName: "PEOPLE",
      dataPath: "allPeople.people",
      query: GET_PEOPLE,
      connections: [
        "starshipConnection.starships",
        "vehicleConnection.vehicles",
      ],
    },
    {
      menuName: "PLANET",
      query: GET_PLANETS,
      dataPath: "allPlanets.planets",
      connections: ["residentConnection.residents"],
    },
  ];

  const handleMenuActive = (e: string) => {
    setActiveMenu(e);
  };

  useEffect(() => {
    console.log("modalStateReactive >>>", modalData)
    console.log("modalStateReactive >>>", modalStateReactive())
  }, [])
  

 
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
              <Menu theme="dark" mode="horizontal" selectedKeys={[`${activeMenu}`]}>
                <Menu.Item key={"FILMS"}>
                  <Link
                    onSetActive={handleMenuActive}
                    to="FILMS"
                    spy={true}
                    smooth={true}
                    duration={800}
                  >
                    {'Film'}
                  </Link>
                </Menu.Item>
                <Menu.Item key={"PEOPLE"}>
                  <Link
                    onSetActive={handleMenuActive}
                    to="PEOPLE"
                    spy={true}
                    smooth={true}
                    duration={800}
                  >
                    {'People'}
                  </Link>
                </Menu.Item>
                <Menu.Item key={"PLANET"}>
                  <Link
                    onSetActive={handleMenuActive}
                    to="PLANET"
                    spy={true}
                    smooth={true}
                    duration={800}
                  >
                    {'Planet'}
                  </Link>
                </Menu.Item>
              </Menu>
            </Col>
          </Row>
        </Header>
        <Content>
          <>
            <LandingPage />
            {menuSection.map((e, index) => (
              <Element name={e.menuName} className={"element-section"}>
                <SectionPage sectionPageData={e} activeMenu={activeMenu} />
              </Element>
            ))}
          </>
        </Content>
        <Footer style={{ textAlign: "center" }}>
          Ant Design ©2018 Created by Ant UED
        </Footer>
      </Layout>
      <ModalDetails visible={modalData.dataDetailsId} dataDetailsId={modalData.dataDetailsId} />
    </>
  );
};

export default Index;
