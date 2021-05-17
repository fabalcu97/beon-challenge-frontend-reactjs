import { Card, CardContent } from '@material-ui/core';
import { useHistory } from 'react-router';

import { User } from '../../interfaces';

interface UserCardProps {
  user: User;
}

export function UserCard(props: UserCardProps) {
  const { user } = props;
  const { push } = useHistory();

  return (
    <Card key={user.id} onClick={() => push(`/user/${user.id}`)}>
      <CardContent>
        <p>Name: {user.name}</p>
        <p>Email: {user.email}</p>
        <p>Phone: {user.phone}</p>
        <p>Former company: {user.company_name}</p>
      </CardContent>
    </Card>
  );
}
