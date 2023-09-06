import { Global } from '@mantine/core';
import bold from '../src/fonts/Poppins-BoldItalic.ttf';
import heavy from '../src/fonts/Poppins-SemiBold.ttf';
import regular from '../src/fonts/Poppins-Regular.ttf';
import medium from '../src/fonts/Poppins-Medium.ttf'


export default function CustomFonts() {
    return (
      <Global
        styles={[
  
          {
            '@font-face': {
              fontFamily: 'Poppins',
              src: `url('${heavy}') format("woff2")`,
              fontWeight: 700,
              fontStyle: 'normal',
            },
          },
          
          {
            '@font-face': {
              fontFamily: 'Poppins',
              src: `url('${regular}') format("woff2")`,
              fontWeight: 100,
              fontStyle: 'normal',
            },
          },
          
         
          {
            '@font-face': {
              fontFamily: 'Poppins',
              src: `url('${regular}') format("woff2")`,
              fontWeight: 100,
              fontStyle: 'normal',
            },
          },
          
        ]}
      ></Global>
    );
  }