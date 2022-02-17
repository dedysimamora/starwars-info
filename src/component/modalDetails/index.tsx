import React, { useEffect, useState } from "react";
import { Modal, Row, Col, Typography, List, Card, Spin, Result } from "antd";
import { LoadingOutlined } from "@ant-design/icons";
import { useLazyQuery } from "@apollo/client";
import {
  GET_PERSON,
  GET_PLANET,
  GET_STAR_SHIP,
  GET_VEHICLE,
} from "../../apollo/query/server-query";
import { GET_DETAIL_VAR } from "../../apollo/variable/server-variable";
import { modalReactiveAction } from "../../apollo/reactive-variable/modal-data";
import { omit } from "lodash";
import "./modalDetails.css";

interface modalDetailsProps {
  visible: boolean;
  dataDetailsId: any;
}

const Index: React.FC<modalDetailsProps> = ({ visible, dataDetailsId }) => {
  const [detailsData, setDetailsData] = useState<any>(null);
  const { Title, Text } = Typography;
  const [
    getDataPerson,
    { loading: loadingPerson, data: dataPerson, error: errorPerson },
  ] = useLazyQuery(GET_PERSON);
  const [
    getDataPlanet,
    { loading: loadingPlanet, data: dataPlanet, error: errorPlanet },
  ] = useLazyQuery(GET_PLANET);
  const [
    getDataStarShip,
    { loading: loadingStarShip, data: dataStarShip, error: errorStarShip },
  ] = useLazyQuery(GET_STAR_SHIP);
  const [
    getDataPVehicle,
    { loading: loadingPVehivle, data: dataVehicle, error: errorPVehivle },
  ] = useLazyQuery(GET_VEHICLE);

  const closeFunction = async () => {
    await setDetailsData(null);
    await modalReactiveAction.turnOnModal(false, null);
  };

  const antIcon = <LoadingOutlined style={{ fontSize: 24 }} spin />;

  useEffect(() => {
    if (dataDetailsId) {
      switch (dataDetailsId.__typename) {
        case "Person":
          getDataPerson({ variables: GET_DETAIL_VAR(dataDetailsId.id) });
          break;
        case "Planet":
          getDataPlanet({ variables: GET_DETAIL_VAR(dataDetailsId.id) });
          break;
        case "Starship":
          getDataStarShip({ variables: GET_DETAIL_VAR(dataDetailsId.id) });

          break;
        case "Vehicle":
          getDataPVehicle({ variables: GET_DETAIL_VAR(dataDetailsId.id) });
          break;
        default:
          break;
      }
    }
  }, [dataDetailsId]);

  useEffect(() => {
    if (dataPerson) {
      setDetailsData(dataPerson.person);
    }
  }, [dataPerson]);

  useEffect(() => {
    if (dataVehicle) {
      setDetailsData(dataVehicle.vehicle);
    }
  }, [dataVehicle]);

  useEffect(() => {
    if (dataPlanet) {
      setDetailsData(dataPlanet.planet);
    }
  }, [dataPlanet]);

  useEffect(() => {
    if (dataStarShip) {
      setDetailsData(dataStarShip.starship);
    }
  }, [dataStarShip]);

  const transformTitle = (text: string) => {
    let spitCamelCase = text.replace(/([a-z0-9])([A-Z])/g, "$1 $2");
    return spitCamelCase.charAt(0).toUpperCase() + spitCamelCase.slice(1);
  };

  return (
    <Modal
      key={dataDetailsId?.id ? dataDetailsId.id : "default-modal-id"}
      visible={visible}
      onCancel={closeFunction}
      footer={false}
    >
      {detailsData === null ||
      loadingPerson ||
      loadingPlanet ||
      loadingStarShip ||
      loadingPVehivle ? (
        <Row>
          <Col
            span={24}
            style={{
              minHeight: "300px",
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <Spin indicator={antIcon} />
          </Col>
        </Row>
      ) : errorPerson || errorPlanet || errorStarShip || errorPVehivle ? (
        <Row>
          <Col
            span={24}
            style={{
              minHeight: "300px",
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <Result status="500" subTitle="Sorry, something went wrong." />
          </Col>
        </Row>
      ) : (
        <>
          <Row>
            <Col span={24} className={"modal-detail-title-container"}>
              <Title className={"modal-detail-title"} level={2}>
                {detailsData?.name}
              </Title>
              <Text className={"modal-detail-deesc"}>
                {detailsData?.__typename}
              </Text>
            </Col>
          </Row>
          <Row style={{ marginTop: "20px" }}>
            <List
              style={{ width: "100%" }}
              grid={{ column: 2 }}
              dataSource={Object.entries(
                omit(detailsData, ["__typename", "name"])
              )}
              renderItem={(item: any, index) => {
                if (Array.isArray(item[1])) {
                  item[1] = item[1].join();
                }
                if (item[1]?.constructor.name === "Object") {
                  item[1] = item[1].name;
                }
                return (
                  <List.Item>
                    <Card
                      title={transformTitle(item[0])}
                      className={"modal-details-card"}
                    >
                      <p>{item[1]}</p>
                    </Card>
                  </List.Item>
                );
              }}
            />
          </Row>
        </>
      )}
    </Modal>
  );
};

export default Index;
