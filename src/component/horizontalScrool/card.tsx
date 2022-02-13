import React from "react";
import { Card } from "antd";
import {mappingMoviePoster} from "../../utils/mappingImage"

import "./cardComponent.css"
export function CardComponent({
  itemId,
  onClick,
  releaseDate,
  title,
  index
}: {
  itemId: string;
  releaseDate:string;
  onClick: Function;
  title: string;
  index: number;
}) {
  const { Meta } = Card;

  return (
    // <div
    //   onClick={() => onClick()}
    //   role="button"
    //   style={{
    //     border: "1px solid",
    //     display: "inline-block",
    //     margin: "0 10px",
    //     width: "160px",
    //     userSelect: "none"
    //   }}
    //   tabIndex={0}
    //   className="card"
    // >
    //   <div>
    //     <div>{title}</div>
    //     <div style={{ backgroundColor: visible ? "transparent" : "gray" }}>
    //       visible: {JSON.stringify(visible)}
    //     </div>
    //     <div>selected: {JSON.stringify(!!selected)}</div>
    //   </div>
    //   <div
    //     style={{
    //       backgroundColor: selected ? "green" : "bisque",
    //       height: "200px"
    //     }}
    //   />
    // </div>
    <Card
      hoverable
      onClick={() => onClick(index)}
      className="card-component"
      style={{ width: 240, marginRight: "20px", borderRadius:'15px' }}
      cover={
        <img
          alt="example"
          src={mappingMoviePoster[title]}
        />
      }
    >
      <Meta title={title} description={releaseDate} />
    </Card>
  );
}
