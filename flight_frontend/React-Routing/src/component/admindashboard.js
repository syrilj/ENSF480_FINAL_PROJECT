import React, {useState} from 'react';
import { Link } from 'react-router-dom';
import {
  Typography,
  List,
  ListItem,
  ListItemText,
  makeStyles,
  MenuItem,
} from '@material-ui/core';

const useStyles = makeStyles((theme) => ({
  root: {
    background: `linear-gradient(to bottom, ${theme.palette.primary.dark}, ${theme.palette.primary.light})`,
    minHeight: '100vh',
    padding: theme.spacing(4),
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    color: theme.palette.common.white,
    boxShadow: '0 4px 8px rgba(0, 0, 0, 0.3)',
    borderRadius: theme.spacing(2),
  },
  title: {
    marginBottom: theme.spacing(4),
    fontWeight: 'bold',
    fontSize: '2rem',
  },
  listItem: {
    background: theme.palette.secondary.main,
    marginBottom: theme.spacing(3),
    borderRadius: theme.spacing(1),
    transition: 'background 0.3s ease-in-out',
    '&:hover': {
      background: theme.palette.primary.dark,
    },
  },
  listItemText: {
    color: theme.palette.common.white,
    fontWeight: 'bold',
  },    dropdownItem: {
    color: theme.palette.common.white,
  },
  dropdown: {
    position: 'absolute',
    top: '100%',
    left: 0,
    zIndex: 1,
    backgroundColor: theme.palette.primary.dark, // Set your dark color
    padding: theme.spacing(1),
    borderRadius: theme.spacing(1),
  },
}));

const AdminDashboard = () => {
  const classes = useStyles();
  const [menuAnchor, setMenuAnchor] = useState(null);

  const handleMenuOpen = (event) => {
    setMenuAnchor(event.currentTarget);
  };

  const handleMenuClose = () => {
    setMenuAnchor(null);
  };

  const isMenuOpen = Boolean(menuAnchor);

  return (
      <div className={classes.root}>
        <Typography variant="h4" className={classes.title}>
          Admin Dashboard
        </Typography>
        <List className={classes.list}>
          <ListItem
              button
              onClick={handleMenuOpen}
              className={classes.listItem}
          >
            <ListItemText primary="Maintain Flights" className={classes.listItemText} />
          </ListItem>
          {isMenuOpen && (
              <div className={classes.dropdown}>
                <MenuItem
                    component={Link}
                    to="/addflight"
                    onClick={handleMenuClose}
                    className={classes.dropdownItem}
                >
                  Add Flight
                </MenuItem>
                <MenuItem
                    component={Link}
                    to="/editflight"
                    onClick={handleMenuClose}
                    className={classes.dropdownItem}
                >
                  Edit Flight
                </MenuItem>
                <MenuItem
                    component={Link}
                    to="/deleteflight"
                    onClick={handleMenuClose}
                    className={classes.dropdownItem}
                >
                  Delete Flight
                </MenuItem>
                <MenuItem
                    component={Link}
                    to="/managepromo"
                    onClick={handleMenuClose}
                    className={classes.dropdownItem}
                >
                </MenuItem>
              </div>
          )}
          {!isMenuOpen && (
              <>
                {/* Render other buttons when the menu is not open */}
                <ListItem
                    button
                    component={Link}
                    to="/maintaincrews"
                    className={classes.listItem}
                >
                  <ListItemText primary="Maintain Crews" className={classes.listItemText} />
                </ListItem>
                {/* Add other buttons as needed */}
              </>
          )}
        </List>
      </div>
  );
}

export default AdminDashboard;
