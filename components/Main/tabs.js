import React from "react";
import Link from "next/link";
import { Tab, Tabs, AppBar, Grid } from "@material-ui/core";
import { BrandingWatermark, Home } from "@material-ui/icons";

export default function HomeTabs() {
  const categories = ["ಲೇಖನ", "ಕಥೆ", "ಕವಿತೆ"];
  const [value, setValue] = React.useState(-1);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  return (
    <div>
      <AppBar position="static" color="default" style={{margin:"1rem 0"}}>
        <Grid container>
          <Grid item >
          <Link href="/">
            <a>
              <Tab label="Home" icon={<Home/>} />
            </a>
          </Link>
          </Grid>
          <Grid item  >
          <Tabs
          value={value}
          onChange={handleChange}
          indicatorColor="primary"
          textColor="primary"
          variant="scrollable"
          scrollButtons="auto"
          aria-label="scrollable auto tabs example"
        >
          {categories.map((category) => (
            <Link href={`/${category}`} key={category}>
              <a>
                <Tab label={category} icon={<BrandingWatermark style={{ fontSize: 20 }}/>} />
              </a>
            </Link>
          ))}
        </Tabs>
        </Grid>
        </Grid>
      </AppBar>
    </div>
  );
}
