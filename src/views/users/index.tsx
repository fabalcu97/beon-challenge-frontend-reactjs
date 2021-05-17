import {
  Divider,
  Grid,
  IconButton,
  InputBase,
  Menu,
  MenuItem,
} from '@material-ui/core';
import { GridFilterListIcon, GridSearchIcon } from '@material-ui/data-grid';
import { useEffect, useState } from 'react';
import InfiniteScroll from 'react-infinite-scroll-component';
import { useInfiniteQuery } from 'react-query';

import { UserCard } from '../../components/UserCard';
import { USERS_PAGINATION_KEY } from '../../constants';
import { User } from '../../interfaces';
import { useStyles } from './styles';

const pageSize = localStorage.getItem(USERS_PAGINATION_KEY) ?? 25;
const LOAD_LIMIT = 250;
const fetchUrl = (pageSize: string | number) =>
  `https://fakerapi.it/api/v1/custom?_quantity=${pageSize}&name=name&company_name=company_name&email=email&phone=phone&id=uuid`;
const getUsers = async () => {
  const response = await fetch(fetchUrl(pageSize));
  if (!response.ok) {
    throw new Error('There was an error, please try again.');
  }
  return response.json();
};

type Order = 'ASC' | 'DESC';

export function Users() {
  const [anchorEl, setAnchorEl] = useState<any>(null);
  const [filteredUsers, setFilteredUsers] = useState<User[]>([]);
  const [users, setUsers] = useState<User[]>([]);
  const [sortingOrder, setSortingOrder] = useState<Order>('ASC');
  const [searchText, setSearchText] = useState('');
  const { data, error, isLoading, refetch, fetchNextPage, isFetchingNextPage } =
    useInfiniteQuery('getUsers', getUsers, {
      getNextPageParam: (lastPage, allPages) =>
        allPages ? allPages.length + 1 : 0,
    });
  const classes = useStyles();

  useEffect(() => {
    if (data) {
      const tempUsers = data.pages.flatMap((d) => d.data);
      if (sortingOrder === 'ASC') {
        setUsers(
          tempUsers.sort((a: User, b: User) => a.name.localeCompare(b.name)),
        );
      }
      if (sortingOrder === 'DESC') {
        setUsers(
          tempUsers.sort((a: User, b: User) => b.name.localeCompare(a.name)),
        );
      }
    }
  }, [data, sortingOrder]);

  useEffect(() => {
    if (searchText) {
      setFilteredUsers(
        users.filter(
          (u) => u.name.match(searchText) || u.email.match(searchText),
        ),
      );
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [searchText]);

  useEffect(() => {
    if (error) {
      console.error({ error });
      // Trigger some snack bar
    }
  }, [error]);

  const openFilterMenu = (event: any) => {
    if (event.currentTarget) {
      setAnchorEl(event.currentTarget);
    }
  };
  const closeFilterMenu = (order: Order) => {
    setAnchorEl(null);
    setSortingOrder(order);
  };

  return (
    <div className={classes.dataContainer}>
      <Grid
        container
        direction='row'
        justify='flex-end'
        className={classes.toolbar}>
        <Grid item className={classes.toolBarItem}>
          <IconButton onClick={openFilterMenu}>
            <GridFilterListIcon />
          </IconButton>
          <Menu
            anchorEl={anchorEl}
            keepMounted
            open={Boolean(anchorEl)}
            onClose={closeFilterMenu}>
            <MenuItem onClick={() => closeFilterMenu('ASC')}>
              Name (ASC)
            </MenuItem>
            <MenuItem onClick={() => closeFilterMenu('DESC')}>
              Name (DESC)
            </MenuItem>
          </Menu>
        </Grid>
        <Grid item className={classes.toolBarItem}>
          <div className={classes.searchIcon}>
            <GridSearchIcon />
          </div>
          <InputBase
            placeholder='Search by name or email'
            classes={{
              root: classes.inputRoot,
              input: classes.inputInput,
            }}
            onChange={(ev) => setSearchText(ev.target.value)}
            inputProps={{ 'aria-label': 'search' }}
          />
        </Grid>
      </Grid>
      <InfiniteScroll
        dataLength={users.length}
        next={fetchNextPage}
        hasMore={users.length < LOAD_LIMIT}
        loader={isLoading || (isFetchingNextPage && <h4>Loading...</h4>)}
        endMessage={
          <p style={{ textAlign: 'center' }}>
            <b>Yay! You have seen it all</b>
          </p>
        }
        refreshFunction={refetch}
        pullDownToRefresh
        pullDownToRefreshThreshold={50}
        pullDownToRefreshContent={
          <h3 style={{ textAlign: 'center' }}>&#8595; Pull down to refresh</h3>
        }
        releaseToRefreshContent={
          <h3 style={{ textAlign: 'center' }}>&#8593; Release to refresh</h3>
        }>
        <div className={classes.notFound}>
          {searchText && filteredUsers.length === 0 && <p>No users found</p>}
        </div>
        {filteredUsers.map((u) => (
          <UserCard key={u.id} user={u} />
        ))}
        <Divider />
        {users.map((u) => (
          <UserCard key={u.id} user={u} />
        ))}
      </InfiniteScroll>
    </div>
  );
}
