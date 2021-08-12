import React from "react";
import Slider from "../Blog/slider";
import HomeTabs from "../Main/tabs";

export default function Main(props) {
<<<<<<< HEAD
    
=======
    console.log(props);
>>>>>>> 9b9be2ed83286c9bf263454ec9ac45a0c0314a4f
 const  {featuredBlogs} = props
  return (
    <div>
      <Slider featuredBlogs={featuredBlogs} />
      <HomeTabs />
      {props.children}
    </div>
  );
}
