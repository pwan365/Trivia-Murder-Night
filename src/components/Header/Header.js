
import React, { useState } from 'react';
import { Drawer, Grid, IconButton, Typography } from "@mui/material";
import MenuIcon from '@mui/icons-material/Menu';


const Header = () => {
  const [toggleSideMenu, setToggleSideMenu] = useState(false);

  const toggleMenu = () => {
    setToggleSideMenu(!toggleSideMenu);
  }

  return (
    <div>
      
      <Grid style={{display:'flex', justifyContent:'space-between', color:'white', paddingTop:'20px'}} >
        <Typography variant="h6" color="inherit" component="div">
          Icon
        </Typography>
        <IconButton onClick={toggleMenu} edge="start" color="inherit" aria-label="menu" sx={{ mr: 2 }}>
          <MenuIcon />
        </IconButton>
      </Grid>

      <Drawer
      anchor={"top"}
      open={toggleSideMenu}
      onClose={toggleMenu}
      >
        <Typography>
          Test text
        </Typography>

      </Drawer>
    </div>

    



    

  )
}
export default Header;
