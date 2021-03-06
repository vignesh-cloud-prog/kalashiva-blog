import { Container } from "@material-ui/core";
import React from "react";
import Slider from "../Blog/slider";
import HomeTabs from "../Main/tabs";

export default function Main(props) {
  
 const  {featuredBlogs} = props
  return (
    <Container>
      <Slider featuredBlogs={featuredBlogs} />
      <HomeTabs />
      {props.children}
    </Container>
  );
}
