import React from "react";
import { Card, Typography } from "antd";
import { mappingMoviePoster } from "../../utils/mappingImage";
import { getInitialName } from "../../utils/getInitialName";

import "./cardComponent.css";
export function CardComponent({
  onClick,
  data,
  index,
}: {
  data: any;
  onClick: Function;
  index: number;
}) {
  const { Meta } = Card;
  const { Title } = Typography;
  return (
    <Card
      hoverable
      onClick={() => onClick(index)}
      className={data.__typename === "Film" ? "card-component" : "card-component-text"}
      style={{ width: 240, marginRight: "20px", borderRadius: "15px" }}
      cover={
        data.__typename === "Film" && (
          <img alt="example" src={mappingMoviePoster[data.title]} />
        )
      }
    >
      {data.__typename !== "Film" && (
        <Title level={1} className="section-image-initial-card-title">
          {getInitialName(data.name)}
        </Title>
      )}
      <Meta
        title={data.__typename === "Film" ? data.title : data.name}
        description={data.__typename === "Film" ? data.releaseDate : null}
      />
    </Card>
  );
}
