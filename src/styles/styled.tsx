import { createTheme } from '@mui/material/styles';
const theme = createTheme();

const styles = {
  //table page styles
  tableStyles: {
    table: {
      minWidth: 650,
    },
    tablecell: {
      justifyContent: 'center',
      alignItems: 'center',
      textAlign: 'center', // Add textAlign: "center" to center the text in the cells
      height: '4.5rem',
    },
    //Fixing the alignment of the TablePagination component by overwriting the original css of the component in the MUI styles
    tablePagination: {
      '.MuiTablePagination-displayedRows': {
        marginTop: '1em',
        marginBottom: '1em',
      },
      '.MuiTablePagination-selectLabel ': {
        marginTop: '1em',
        marginBottom: '1em',
      },
    },
  },

  //navbar page styles
  navbarStyles: {
    appBar: {
      backgroundColor: '#333',
    },
    title: {
      flexGrow: 1,
    },
    buttonIcons: {
      '&:hover': {
        transform: 'scale(1.1)',
      },
    },
    animatedMenuItem: {
      '&:hover': {
        backgroundColor: '#f5f5f5',
        '& .MuiListItemIcon-root': {
          color: '#2196F3',
        },
      },
    },
    listItemText: {
      '& .MuiTypography-root': {
        fontSize: '0.9rem',
      },
    },
  },

  //menu page styles
  menuStyles: {
    button: {
      padding: theme.spacing(1),
      color: '#333',
    },
    menu: {
      marginTop: 6,
    },
  },

  //dialog page styles
  dialogStyles: {
    form: {
      display: 'flex',
      flexDirection: 'column',
      marginTop: theme.spacing(2),
      gap: '16px',
    },
    formcontrol: {
      marginTop: theme.spacing(2),
    },
    button: {
      color: '#fff',
      backgroundColor: '#333',
      '&:hover': {
        backgroundColor: '#555', // Custom hover color
      },
    },
    title: {
      backgroundColor: '#333',
      color: '#fff',
      marginBottom: theme.spacing(2),
    },
  },

  //CreateDeviceDialog styles
  createDeviceDialogStyles: {
    title: {
      backgroundColor: '#333',
      color: '#fff',
      padding: '0.2rem 1rem',
      marginBottom: '1rem',
    },
    headerTitle: {
      padding: '1rem 0',
    },
    dialogContent: {
      marginTop: '1rem',
    },
  },

  //assignCustomersDropDown styles
  assignCustomersDropDownStyles: {
    button: {
      color: '#fff',
      backgroundColor: '#333',
      '&:hover': {
        backgroundColor: '#555',
      },
    },
    input: {},
    title: {
      display: 'flex',
      justifyContent: 'space-between',
      alignItems: 'center',
      fontSize: '1rem',
      backgroundColor: '#333',
      color: '#fff',
    },
    closeIcon: {
      color: '#fff',
    },
    dialog: {
      width: '%100',
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
    },
  },

  //Main page styles
  mainStyles: {
    main: {
      height: '100%',
      overflowY: 'auto',
      backgroundColor: '#A9A9A9',
      padding: '12px' /* add padding to main */,
    },
    container: {
      padding: '20px',
      maxWidth: '2000px',
      margin: '0 auto',
      backgroundColor: 'white',
      // width:
      //   "calc(100% - 5px)" /* set the width of container to 100% minus twice the padding of main */,
      height: '100%',
      overflow: 'auto',
    },
  },

  //layout styles
  layoutStyles: {
    root: {
      display: 'flex',
      height: '100vh',
    },
    content: {
      padding: theme.spacing(3),
      display: 'flex',
      flexDirection: 'column',
      width: '100%',
      // padding: '0',
    },
  },

  //404 styles
  page404Styles: {
    container: {
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
    },
    icon: {
      width: theme.spacing(12),
      height: theme.spacing(12),
      marginTop: theme.spacing(8),
      color: '#333',
    },
    title: {
      fontSize: theme.typography.h1.fontSize,
      fontWeight: theme.typography.fontWeightBold,
      color: theme.palette.text.primary,
      marginTop: theme.spacing(4),
      marginBottom: theme.spacing(2),
    },
    message: {
      fontSize: theme.typography.body1.fontSize,
      color: theme.palette.text.secondary,
      textAlign: 'center',
    },
    link: {
      color: theme.palette.primary.main,
      textDecoration: 'none',
      '&:hover': {
        textDecoration: 'underline',
      },
    },
  },

  //AssignedCustomersToMember page Style
  AssignedCustomersToMemberStyles: {
    root: {
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'space-between',
      marginBottom: theme.spacing(2),
    },
    title: {
      marginRight: theme.spacing(2),
      fontWeight: 'bold',
    },
    headerbox: {
      display: 'flex',
      flexDirection: 'row',
      alignItems: 'center',
    },
    tablebutton: {
      color: '#333',
    },
    checkbox: {
      '& .MuiSvgIcon-root': {
        fill: '#333',
      },
    },
    iconbutton: {
      marginRight: theme.spacing(1),
      color: '#333',
    },
  },

  //Index.js in the users folder styles
  usersIndexStyles: {
    root: {
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'space-between',
      marginBottom: theme.spacing(2),
    },
    title: {
      marginRight: theme.spacing(2),
      fontWeight: 'bold',
    },
    headerbox: {
      display: 'flex',
      flexDirection: 'row',
      alignItems: 'center',
    },
    checkbox: {
      '& .MuiSvgIcon-root': {
        fill: '#333',
      },
    },
    iconbutton: {
      color: '#333',
    },
    loadingContainer: {
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      marginTop: '10rem',
    },
    circularProgress: {
      width: '50px !important',
      height: '50px !important',
      color: '#333',
      display: 'block',
      border: '5px solid rgba(0, 0, 0, 0.1)',
      borderRadius: '50%',
    },
  },

  //Login page styles
  loginStyles: {
    container: {
      display: 'flex',
      height: '100vh',
      minWidth: '-webkit-fill-available',
      padding: '0',
      margin: '0',
    },
    mainContainer: {
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'stretch',
      justifyContent: 'center',
      backgroundColor: 'rgba(255, 255, 255, 0.05)',
      padding: '20px',
      minWidth: '100vw',
    },
    leftContainer: {
      flex: '1',
      display: 'flex',
      flexDirection: 'column',
      justifyContent: 'center',
      alignItems: 'center',
      backgroundColor: '#333',
      padding: '20px',
      background: 'linear-gradient(135deg, #333 0%, #000 100%)', // Gradient background for #333
    },
    rightContainer: {
      flex: '1',
      display: 'flex',
      flexDirection: 'column',
      justifyContent: 'center',
      alignItems: 'center',
      padding: '20px',
    },
    formContainer: {
      backgroundColor: 'rgba(255, 255, 255, 0.9)',
      padding: '20px',
      borderRadius: '8px',
      width: '100%',
      maxWidth: '400px',
    },
    title: {
      marginBottom: '20px',
      color: '#333',
    },
    textField: {
      marginBottom: '16px',
      width: '100%',
    },
    buttonRow: {
      display: 'flex',
      justifyContent: 'space-between',
      marginTop: '16px',
    },
    button: {
      width: '100%',
      background: 'linear-gradient(315deg, #333 0%, #f5f0f0 100%)',
      color: '#fff',
      marginRight: '0.938rem',
    },
    signUpButton: {
      width: '100%',
      background: 'linear-gradient(315deg, #0d0c0c 0%, #dbdbdb 100%)',
      color: '#fff',
    },
    footerText: {
      marginTop: '8px',
      display: 'block',
      color: '#333',
      textDecoration: 'none',
    },
  },

  //PermissionsDialog
  PermissionsDialogStyles: {
    checkbox: {
      color: '#333',
    },
    ItemsContainer: {
      marginTop: '0.5rem',
      display: 'flex',
      flexDirection: 'column',
    },
    Items: {
      display: 'flex',
      alignItems: 'center',
    },
  },

  //Signup Page styles
  signupPageStyles: {
    form: {
      width: '100%',
    },
    submitButton: {
      color: '#fff',
      margin: theme.spacing(3, 0, 2),
      backgroundColor: '#333',
      '&:hover': {
        backgroundColor: '#555', // Custom hover color
      },
    },
    iconEnd: {
      display: 'flex',
      alignItems: 'center',
      marginRight: '8px',
    },
    avatar: {
      marginTop: '5rem',
      marginBottom: '0.3rem',
      backgroundColor: '#333',
    },
    paper: {
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
    },
    arrowDropDownIcon: {
      marginRight: '0.625rem',
      fontSize: 'xx-large',
    },
  },
  //home page styles (for now it is empty)
};

export default styles;
