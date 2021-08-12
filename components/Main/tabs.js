import React from "react";
import Link from "next/link";
import { Tab, Tabs, AppBar } from "@material-ui/core";

export default function HomeTabs() {
  const categories = ["ಲೇಖನ", "ಕಥೆ", "ಕವಿತೆ"];
  const [value, setValue] = React.useState(0);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  return (
    <div>
      <AppBar position="static" color="default" style={{margin:"1rem 0"}}>
        <Tabs
          value={value}
          onChange={handleChange}
          indicatorColor="primary"
          textColor="primary"
          variant="scrollable"
          scrollButtons="auto"
          aria-label="scrollable auto tabs example"
        >
          <Link href="/">
            <a>
              <Tab label="Home" />
            </a>
          </Link>

          {categories.map((category) => (
            <Link href={`/${category}`} key={category}>
              <a>
                <Tab label={category} />
              </a>
            </Link>
          ))}
        </Tabs>
      </AppBar>
    </div>
  );
}
