import { Box, Divider, Drawer, List, Toolbar, Typography } from "@mui/material";
import { useSelector } from "react-redux";
import { SideBarItem } from "./";

export const SideBar = ({ drawerWidth }) => {


    const { displayName } = useSelector(state => state.auth); //se obtiene el displayName del state de auth  
    const { notes } = useSelector(state => state.journal); //se obtiene las notas del state de journal


  return (

    <Box
        component='nav'
        sx={{ width: { sm: drawerWidth }, flexShrink: { sm: 0 } }}
    >
        <Drawer
            variant='permanent'
            open
            sx={{ 
                display: { xs: 'block' },
                '& .MuiDrawer-paper': { boxSizing: 'border-box', width: drawerWidth }
            }}
        >
            <Toolbar>
              <Typography variant='h6' noWrap component='div'>
                { displayName }  
              </Typography>

            </Toolbar>
            <Divider />
            <List>
                {
                    notes.map( note => ( 
                        <SideBarItem key={ note.id } { ...note } /> //se renderiza el componente SideBarItem con las notas
                    ))
                }
            </List>
        </Drawer>
    </Box>
  )
}
