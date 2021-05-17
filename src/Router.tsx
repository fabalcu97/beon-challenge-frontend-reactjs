import { AppBar, Toolbar, Typography } from '@material-ui/core';
import { BrowserRouter, Switch, Route, NavLink } from 'react-router-dom';

import { User, Users } from './views';
import { useStyles } from './styles';

export function Router() {
  const classes = useStyles();

  return (
    <BrowserRouter>
      <AppBar position='sticky'>
        <Toolbar>
          <Typography variant='h6' className={classes.title}>
            <NavLink
              color='white'
              to='/users'
              activeClassName={classes.activeLink}
              className={classes.link}>
              Users
            </NavLink>
          </Typography>
        </Toolbar>
      </AppBar>
      <Switch>
        <Route path='/users'>
          <Users />
        </Route>
        <Route path='/user/:id'>
          <User />
        </Route>
      </Switch>
    </BrowserRouter>
  );
}
