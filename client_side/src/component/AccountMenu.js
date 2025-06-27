import * as React from 'react';
import Box from '@mui/material/Box';
import Avatar from '@mui/material/Avatar';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import ListItemIcon from '@mui/material/ListItemIcon';
import Divider from '@mui/material/Divider';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import Tooltip from '@mui/material/Tooltip';
import PersonAdd from '@mui/icons-material/PersonAdd';
import Settings from '@mui/icons-material/Settings';
import Logout from '@mui/icons-material/Logout';

import { ToastContainer, toast } from 'react-toastify';
import {userLogout} from "../featuers/auth/authActions";
import { useDispatch, useSelector } from 'react-redux'
import { useParams , useLocation, Outlet , Link , NavLink, useNavigate} from "react-router-dom";


export default function AccountMenu() {

      const dispatch = useDispatch()
      const navigate = useNavigate()
      
      const {user_info}  = useSelector((state) => state.auth)
      var [user_letter , setuser_letter] = React.useState(null)

    const error_notify = (msg) => toast.error(msg);
    const success_notify = (msg) => toast.info(msg);


      const [anchorEl, setAnchorEl] = React.useState(null);
      const open = Boolean(anchorEl);
      const handleClick = (event) => {
        setAnchorEl(event.currentTarget);
      };
      const handleClose = () => {
        setAnchorEl(null);
      };

      async function handleLogout(){
        try{
          await dispatch(userLogout()).unwrap();
          navigate("/auth/signin")
          success_notify("You have logged out succesfully!")
        }catch(error){
          error_notify("There is a problem in logging out")
        }
      }



  React.useEffect(()=>{
    setuser_letter(user_info?.username?.[0].toUpperCase())
  },[user_info])
  return (
    <>
      <Box sx={{ display: 'flex', alignItems: 'center', textAlign: 'center' , width:"24px" , height:"24px" , margin:"0" }}>
        <Tooltip title="Account settings">
          <IconButton
            onClick={handleClick}
            size="small"
            sx={{ width:"100%" , height:"100%" }}
            aria-controls={open ? 'account-menu' : undefined}
            aria-haspopup="true"
            aria-expanded={open ? 'true' : undefined}
          >
            <Avatar sx={{ width: 32, height: 32 }}>{user_letter}</Avatar>
          </IconButton>
        </Tooltip>
      </Box>
      <Menu
        anchorEl={anchorEl}
        id="account-menu"
        open={open}
        onClose={handleClose}
        onClick={handleClose}
        slotProps={{
          paper: {
            elevation: 0,
            sx: {
              overflow: 'visible',
              filter: 'drop-shadow(0px 2px 8px rgba(0,0,0,0.32))',
              mt: 1.5,
              '& .MuiAvatar-root': {
                width: 32,
                height: 32,
                ml: -0.5,
                mr: 1,
              },
              '&::before': {
                content: '""',
                display: 'block',
                position: 'absolute',
                top: 0,
                right: 14,
                width: 10,
                height: 10,
                bgcolor: 'background.paper',
                transform: 'translateY(-50%) rotate(45deg)',
                zIndex: 0,
              },
            },
          },
        }}
        transformOrigin={{ horizontal: 'right', vertical: 'top' }}
        anchorOrigin={{ horizontal: 'right', vertical: 'bottom' }}
      >
        <MenuItem onClick={handleLogout}>
          <ListItemIcon>
            <Logout fontSize="small" />
          </ListItemIcon>
          Logout
        </MenuItem>
      </Menu>
    </>
  );
}