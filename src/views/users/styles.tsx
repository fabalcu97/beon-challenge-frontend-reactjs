import { makeStyles } from '@material-ui/core';

export const useStyles = makeStyles((theme) => ({
  dataContainer: {
    width: '100%',
    height: '100%',
  },
  toolbar: { paddingRight: 20 },
  toolBarItem: {
    width: 'auto',
    position: 'relative',
    borderRadius: theme.shape.borderRadius,
  },
  searchIcon: {
    height: '100%',
    position: 'absolute',
    pointerEvents: 'none',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
  inputRoot: {
    height: '100%',
    width: '100%',
  },
  inputInput: {
    minWidth: 200,
    paddingLeft: `calc(1em + ${theme.spacing(1)}px)`,
    paddingRight: `calc(1em + ${theme.spacing(1)}px)`,
    height: '100%',
    width: '100%',
    padding: 0,
  },
  notFound: {
    paddingLeft: 15,
  },
}));
