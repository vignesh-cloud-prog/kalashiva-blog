import React from 'react'
import { Typography, Link } from '@mui/material';

export default function CopyRight() {
  return (
    
          <Typography variant="body2" color="text.secondary" align="center">
            {'Copyright © '}
            <Link color="inherit" href="https://kaalashiva.vercel.app/">
              Kaalashiva Blog
            </Link>{' '}
            {new Date().getFullYear()}
            {'.'}
          </Typography>
        );
     
}
