import React from 'react';
import { Link } from 'react-router-dom';
import { Typography, List, ListItem, ListItemText, makeStyles } from '@material-ui/core';

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
  },
}));

const AdminDashboard = () => {
  const classes = useStyles();

  return (
    <div className={classes.root}>
      <Typography variant="h4" className={classes.title}>
        Admin Dashboard
      </Typography>
      <List className={classes.list}>
        <ListItem button component={Link} to="/admin/maintain-aircrafts" className={classes.listItem}>
          <ListItemText primary="Maintain Aircrafts" className={classes.listItemText} />
        </ListItem>
        <ListItem button component={Link} to="/admin/maintain-flights" className={classes.listItem}>
          <ListItemText primary="Maintain Flights" className={classes.listItemText} />
        </ListItem>
        <ListItem button component={Link} to="/admin/maintain-crews" className={classes.listItem}>
          <ListItemText primary="Maintain Crews" className={classes.listItemText} />
        </ListItem>
      </List>
    </div>
  );
}

export default AdminDashboard;
