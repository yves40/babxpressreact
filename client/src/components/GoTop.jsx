
import { useState, useEffect } from 'react';

function GoTop(props) {

  const [scrollPosition, setScrollPosition] = useState(0);    // Track scroll position for GoTop button
  const [showGoTop, setshowGoTop] = useState("goTopHidden");


    // -------------------------------------------------------------------------------------------------
  // TOP BUTTON DISPLAY HANDLER
  const handleVisibleButton = () => {
      const position = window.pageYOffset;
      setScrollPosition(position);
      
      if (scrollPosition > 50) {
        setshowGoTop("goTopVisible");
      } else if (scrollPosition < 50) {
        setshowGoTop("goTopHidden");
      }
      console.log(`Button status: ${showGoTop}`);
      return showGoTop;
    };

    useEffect(() => {
      window.addEventListener("scroll", handleVisibleButton);  
      return () =>  window.removeEventListener("scroll", handleVisibleButton);  // Do not forget to shoot the listener when the component is unmounted  
    });

  return (
    <>
      <div className={showGoTop} onClick={props.scrollUp}>
        <button >
          <img className='svg-white32' src="svg/arrow-back.svg" alt="" />
        </button>
      </div>
    </>
  )
}

export default GoTop