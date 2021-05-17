import { useEffect } from 'react';
import { QueryClient, QueryClientProvider } from 'react-query';
import { USERS_PAGINATION_KEY } from './constants';

import { Router } from './Router';

const queryClient = new QueryClient();

function App() {
  useEffect(() => {
    if (!localStorage.getItem(USERS_PAGINATION_KEY)) {
      localStorage.setItem(USERS_PAGINATION_KEY, '25');
    }
  }, []);

  return (
    <QueryClientProvider client={queryClient}>
      <Router />
    </QueryClientProvider>
  );
}

export default App;
