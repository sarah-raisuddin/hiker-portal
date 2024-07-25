import React, { useState } from "react";

// Documentation/Sources used:
// https://www.freecodecamp.org/news/build-accordion-menu-in-react-without-external-libraries/

function ToggleBlock({ blockLabel, blockContent }) {
    const [isActive, setIsActive] = useState(false);
    const  upCaret= '\u25BC';
    const downCaret = '\u25B2';
  
      return (
        <div className="toggle-block">
          <div className="toggle-block-container">
            <div className="toggle-block-label" onClick={() => setIsActive(!isActive)}>
              <div>
                {blockLabel}
              </div>
              <div>
                {isActive ?  downCaret : upCaret}
              </div>
            </div>
          {isActive && <div className="toggle-block-content">{blockContent}</div>}
        </div>
      </div>
    );
  }
  
  export default ToggleBlock;