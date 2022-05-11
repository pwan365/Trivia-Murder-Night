import { Button, Container } from "@mui/material";
import React from "react";

const HomePara = () => {
  return (
    <Container>
      <div className="container">
        <h1 className="title">Ducks</h1>
        <Button
          variant="contained"
          elevation={10}
          style={{ background: "hotpink", width: "300px", height: "50px" }}
        >
          PLAY!
        </Button>
      </div>
    </Container>
  );
};

export default HomePara;
