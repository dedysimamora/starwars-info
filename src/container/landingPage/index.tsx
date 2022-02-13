import React from "react";
import { Carousel } from "antd";

const Index = () => {
  const imageArr = new Array(5).fill(null)

  return (
    <Carousel autoplay>
      {imageArr.map((_, index: number) => (
        <div>
          <div
            style={{
              height: "94vh",
              backgroundPosition: "center",
              backgroundRepeat: "no-repeat",
              backgroundSize: "cover",
              backgroundImage: `url(${require(`../../assets/image/carousel/${index + 1}.jpg`)})`,
            }}
          />
        </div>
      ))}
    </Carousel>
  );
};

export default Index;
