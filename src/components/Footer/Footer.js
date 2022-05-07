import { Grid, Icon, Typography } from '@mui/material';
import React from 'react';

import InstagramIcon from '@mui/icons-material/Instagram';
import FacebookIcon from '@mui/icons-material/Facebook';

const Footer = () => {
  return (
    <Grid style={{height:'200px', width:'100%', background: 'black', display:'flex', flexDirection:'column', justifyContent:'center', alignItems:'center'}}>
      <Grid>
        <Typography color={"white"} style={{marginBottom:'16px'}}>
          Follow Us For Daily Updates!
        </Typography>
      </Grid>
      <Grid style={{display:'flex', justifyContent:'center', alignItems:'center'}}>
        <InstagramIcon fontSize="large" sx={{ color: 'white', marginRight: '30px'}}/>
        <FacebookIcon fontSize="large" sx={{ color: 'white' }}/>
      </Grid>
    </Grid>
  )

}



export default Footer;