import React from "react";
import { ScrollMenu, VisibilityContext } from "react-horizontal-scrolling-menu";
import { CardComponent } from "./card";
import "./globalStyles.css";
import useDrag from "./useDrag";

type scrollVisibilityApiType = React.ContextType<typeof VisibilityContext>;

interface horizontalScroolType {
    data : Array<any>,
    onClickFunct: Function;
}

const  HorizontalScrool : React.FC<horizontalScroolType> = ({data, onClickFunct})  => {
  const { dragStart, dragStop, dragMove, dragging } = useDrag();
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
            {data.map(({ id, title,releaseDate }, index) => (
              <CardComponent
                index={index}
                title={title}
                releaseDate={releaseDate}
                itemId={id} // NOTE: itemId is required for track items
                key={id}
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


