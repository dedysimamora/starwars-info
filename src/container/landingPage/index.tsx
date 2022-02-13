import React from "react";
import { Carousel } from "antd";
import "./landingPage.css"
const Index = () => {
  const imageArr = new Array(5).fill(null)

  return (
    <div className="carousel-container">

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
      </div>
  );
};

export default Index;
