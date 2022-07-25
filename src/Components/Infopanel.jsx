import React, { useEffect, useState } from "react";
import { styled } from "@mui/material/styles";
import Box from "@mui/material/Box";
import Paper from "@mui/material/Paper";
import Grid from "@mui/material/Grid";

const Item = styled(Paper)(({ theme }) => ({
  backgroundColor: theme.palette.mode === "dark" ? "#1A2027" : "#fff",
  ...theme.typography.body2,
  padding: theme.spacing(1),
  textAlign: "center",
  color: theme.palette.text.secondary,

  margin: "0 auto",
  marginTop: 50,
}));

export default function Infopanel() {
  const [Global, setGlobal] = useState({});
  useEffect(() => {
    async function getData() {
      const response = await fetch(
        "https://api.covidtracking.com/v1/us/current.json"
      );
      let data = await response.json();
      delete data[0].date;
      // console.log(data);
      setGlobal(data[0]);
    }
    getData();
  }, []);
  return (
    <Box sx={{ maxWidth: 1000, marginLeft: 20 }}>
      <Grid container spacing={2}>
        {Object.keys(Global).map((key, ind )=> {
          return (
            <Grid item xs={12} md={4} key={ind}>
              <Item><h3>{key.toUpperCase()}</h3>
              <h3>{Global[key]}</h3>
              </Item>
            </Grid>
          );
        })}
      </Grid>
    </Box>
  );
}
