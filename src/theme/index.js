import {extendTheme} from '@chakra-ui/react';

export const myNewTheme = extendTheme({
  colors: {
    primary: {
      100: '#6B728E',
      200: '#50577A',
      300: '#474E68',
      400: '#404258',
    },
    secondery: {
      100: '#E6E5A3',
      200: '#A9AF7E',
      300: '#7D8F69',
      400: '#557153',
    },
    warning: {
      100: '#FD841F',
      200: '#E14D2A',
    },
  },
  textStyles: {
    h1: {
      fontSize: ['48px', '172px'],
      fontWeight: 'bold',
      letterSpacing: '10px',
    },
    hodifa: {
      fontSize: '100px',
    },
  },
  components: {
    Button: {
      sizes: {
        sm: {
          fontSize: 'md',
        },
      },
      variants: {
        base: {
          bg: 'warning.100',
          fontSize: 'md',
        },
        sm: {
          bg: 'primary.100',
          fontSize: 'lg',
        },
        md: {
          bg: 'primary.400',
          fontSize: 'xl',
        },
        lg: {
          bg: 'secondery.400',
          fontSize: 'xl',
        },
      },
      defaultProps: {
        size: 'lg', // default is md
        variant: 'sm', // default is solid
        colorScheme: 'green', // default is gray
      },
    },
    Text: {
      variants: {
        base: {
          color: 'warning.100',
          fontSize: 'md',
        },
        sm: {
          color: 'warning.100',
          fontSize: 'lg',
        },
        md: {
          color: 'primary.400',
          fontSize: 'xl',
        },
      },
    },
  },
  breakpoints: {
    sm: '320px',
    md: '768px',
    lg: '960px',
    xl: '1200px',
    '2xl': '1536px',
  },
});
