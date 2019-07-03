import React, { useRef } from "react";
import useCollapse from "./useCollapse";

function Accordian(props: any) {
  const elemRef = useRef(null);
  const [collapsed, setCollapsed] = useCollapse(true, elemRef, {
    timing: 0.5
  });

  function handleClick() {
    setCollapsed(!collapsed);
  }

  return (
    <div className="accordian-container" style={props.style}>
      <div className="accordian-header">
        <button className="toggle-button" onClick={handleClick}>
          Toggle
        </button>
      </div>
      <div className="accordian-body" ref={elemRef}>
        {elemRef.current !== null ? (
          <>
            <p>
              Sed ut perspiciatis unde omnis iste natus error sit voluptatem
              accusantium doloremque laudantium, totam rem aperiam, eaque ipsa
              quae ab illo inventore veritatis et quasi architecto beatae vitae
              dicta sunt explicabo. Nemo enim ipsam voluptatem quia voluptas sit
              aspernatur aut odit aut fugit, sed quia consequuntur magni dolores
              eos qui ratione voluptatem sequi nesciunt. Neque porro quisquam
              est, qui?
            </p>
          </>
        ) : null}
      </div>
    </div>
  );
}

export default Accordian;
