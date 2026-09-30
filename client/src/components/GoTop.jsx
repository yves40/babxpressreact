
import { useState, useEffect } from 'react';

/*
  GoTop.jsx
  This component displays a "Go to Top" button when the user scrolls down the page.
  When clicked, it scrolls the page back to the top smoothly, using a provided scrollUp function passed as a prop.
*/
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
          <img className='svg-white32' src="svg/arrow-up-left-box-outline.svg" alt="" />
        </button>
      </div>
    </>
  )
}

export default GoTop