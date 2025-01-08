import * as React from 'react';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import Stack from '@mui/material/Stack';
import HomeRoundedIcon from '@mui/icons-material/HomeRounded';
import AnalyticsRoundedIcon from '@mui/icons-material/AnalyticsRounded';
import PeopleRoundedIcon from '@mui/icons-material/PeopleRounded';
import AssignmentRoundedIcon from '@mui/icons-material/AssignmentRounded';
import LogoutIcon from '@mui/icons-material/Logout';
import PublicIcon from '@mui/icons-material/Public';
import InfoRoundedIcon from '@mui/icons-material/InfoRounded';
import HelpRoundedIcon from '@mui/icons-material/HelpRounded';
import Link from 'next/link';

const mainListItems = [
  { text: 'Tienda', icon: <AnalyticsRoundedIcon />, path: "/store" },
  { text: 'Usuario', icon: <PeopleRoundedIcon />, path: "/user" },
  { text: 'Tipo de usuario', icon: <AssignmentRoundedIcon />, path: "/userType" },
];

const secondaryListItems = [
  { text: 'Área de cliente', icon: <PublicIcon /> },
];

export default function MenuContent() {
  const [selectedOption, setSelectedOption] = React.useState();

  return (
    <Stack sx={{ flexGrow: 1, p: 1, justifyContent: 'space-between' }}>
      <List dense>
        {mainListItems.map((item, index) => (
          <Link 
            href={item.path} 
            key={index} 
            style={{textDecoration: "none", color: "inherit"}}
            onClick={() => setSelectedOption(index)}>
            <ListItem disablePadding sx={{ display: 'block' }}>
                <ListItemButton selected={index === selectedOption}>
                  <ListItemIcon>{item.icon}</ListItemIcon>
                  <ListItemText primary={item.text} />
                </ListItemButton>
            </ListItem>
          </Link>
        ))}
      </List>

      <List dense>
        {secondaryListItems.map((item, index) => (
          <ListItem key={index} disablePadding sx={{ display: 'block' }}>
            <ListItemButton>
              <ListItemIcon>{item.icon}</ListItemIcon>
              <ListItemText primary={item.text} />
            </ListItemButton>
          </ListItem>
        ))}
      </List>
    </Stack>
  );
}
