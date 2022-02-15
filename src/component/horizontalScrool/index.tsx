import React from "react";
import { ScrollMenu, VisibilityContext } from "react-horizontal-scrolling-menu";
import { CardComponent } from "./card";
import {  Skeleton } from "antd";
import "./globalStyles.css";
import useDrag from "./useDrag";

type scrollVisibilityApiType = React.ContextType<typeof VisibilityContext>;

interface horizontalScroolType {
    data : Array<any>,
    onClickFunct: Function;
}

const  HorizontalScrool : React.FC<horizontalScroolType> = ({data, onClickFunct})  => {
  const { dragStart, dragStop, dragMove } = useDrag();

  const handleDrag = ({ scrollContainer }: scrollVisibilityApiType) => (
    ev: React.MouseEvent
  ) =>
    dragMove(ev, (posDiff) => {
      if (scrollContainer.current) {
        scrollContainer.current.scrollLeft += posDiff;
      }
    });


  return (
    <>
      <div className="example" >
        <div onMouseLeave={dragStop}>
          <ScrollMenu
            onWheel={onWheel}
            onMouseDown={() => dragStart}
            onMouseUp={() => dragStop}
            onMouseMove={handleDrag}
          >
            {
            
            data === null ?
            new Array(3).fill(null).map((e) => (
              <Skeleton.Avatar className="horizontal-card-skeleton" active={true} size={"large"} shape={"square"} />
            )) :
            
            data.map((e : any, index : number) => (
              <CardComponent
                index={index}
                data={e}
                key={index}
                onClick={onClickFunct}
              />
            ))}
          </ScrollMenu>
        </div>
      </div>
    </>
  );
}
export default HorizontalScrool;

function onWheel(apiObj: scrollVisibilityApiType, ev: React.WheelEvent): void {
  const isThouchpad = Math.abs(ev.deltaX) !== 0 || Math.abs(ev.deltaY) < 15;

  if (isThouchpad) {
    ev.stopPropagation();
    return;
  }

  if (ev.deltaY < 0) {
    apiObj.scrollNext();
  } else if (ev.deltaY > 0) {
    apiObj.scrollPrev();
  }
}


