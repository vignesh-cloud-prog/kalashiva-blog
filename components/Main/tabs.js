// React
import React from "react";

// Next
import Link from "next/link";
import { useRouter } from "next/router";

// Material ui
import { Tab, Tabs, AppBar, Grid } from "@material-ui/core";
import { BrandingWatermark, Home } from "@material-ui/icons";

export default function HomeTabs() {
  const router = useRouter();
  const categories = [
    "ಲೇಖನ",
    "ಕಥೆ",
    "ಕವಿತೆ",
    "ಅಧ್ಯಾತ್ಮ",
    "ಸುದ್ದಿ",
    "ಕ್ರೀಡೆ",
    "ತಂತ್ರಜ್ಞಾನ",
    "ಸಿನೆಮಾ",
  ];
  const { category } = router.query;
  const [value, setValue] = React.useState(categories.indexOf(category));

  const handleChange = (event, newValue) => {
    router.push(categories[newValue]);
    setValue(newValue);
  };

  return (
    <div>
      <AppBar position="static" color="default" style={{ display: "flex",marginTop:"1rem" }}>
        <Grid container>
          <Grid item container  xs={3} md={1} justifyContent="center" alignItems="center">
            <Link href="/">
              <a>
                <Tab
                  label="Home"
                  icon={<Home />}
                  style={{ color: "#1a237e"}}
                />
              </a>
            </Link>
          </Grid>
          <Grid item xs={9} md={11}>
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
                // <Link href={`/${category}`} key={category}>
                //   <a>
                <Tab
                  key={category}
                  label={category}
                  icon={
                    <BrandingWatermark
                      style={{ fontSize: 20 }}
                      value={category}
                    />
                  }
                />
                //  </a>
                // </Link>
              ))}
            </Tabs>
          </Grid>
        </Grid>
      </AppBar>
    </div>
  );
}
