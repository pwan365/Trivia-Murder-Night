import React, { useState } from "react";
import {
  AppBar,
  Box,
  Button,
  Divider,
  Drawer,
  Grid,
  Hidden,
  IconButton,
  List,
  ListItem,
  ListItemText,
  Toolbar,
  Typography,
} from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";
import DuckIcon from "../../resources/duck.png";
import { ArrowForward } from "@mui/icons-material";
import { Link, useLocation } from "react-router-dom";

let headerButtons = [
  {
    title: "Home",
    path: "/",
  },
  {
    title: "Tutorial",
    path: "/tutorial",
  },
];

const Header = () => {
  const location = useLocation();
  const [toggleSideMenu, setToggleSideMenu] = useState(false);

  const toggleMenu = () => {
    setToggleSideMenu(!toggleSideMenu);
  };

  if (location.pathname !== "/" && location.pathname !== "/tutorial")
    return null;
  return (
    <div>
      <AppBar
        style={{
          position: "absolute",
          left: "0",
          top: "0",
          background: "#252425",
          color: "white",
        }}
        elevation={0}
      >
        <Toolbar
          style={{
            display: "flex",
            justifyContent: "space-between",
          }}
        >
          <IconButton>
            <img style={{ width: "40px" }} src={DuckIcon} alt="logo" />
          </IconButton>

          <Hidden mdDown>
            <Grid>
              {headerButtons.map((item) => {
                return (
                  <Link
                    to={item.path}
                    style={{ textDecoration: "none" }}
                    key={item.title}
                  >
                    <Button key={item.title} style={{ marginRight: "20px" }}>
                      <Typography style={{ color: "white" }}>
                        {item.title}
                      </Typography>
                    </Button>
                  </Link>
                );
              })}
            </Grid>
          </Hidden>

          <Hidden mdUp>
            <IconButton onClick={toggleMenu} color="inherit">
              <MenuIcon />
            </IconButton>
          </Hidden>
        </Toolbar>
      </AppBar>

      <Drawer
        anchor={"right"}
        open={toggleSideMenu}
        onClose={toggleMenu}
        variant="persistent"
      >
        <Box
          role="presentation"
          style={{ width: "140px" }}
          onClick={toggleMenu}
        >
          <List>
            <ListItem button>
              <ArrowForward />
            </ListItem>
            <Divider />
            {headerButtons.map((item) => (
              <Link
                to={item.path}
                style={{ textDecoration: "none", color: "black" }}
                key={item.path}
              >
                <ListItem button>
                  <ListItemText primary={item.title} />
                </ListItem>
              </Link>
            ))}
          </List>
        </Box>
      </Drawer>
    </div>
  );
};
export default Header;

<Toolbar></Toolbar>;
