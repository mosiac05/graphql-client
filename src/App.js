import { ApolloProvider } from '@apollo/client';
import './App.css';
import PendingActivitiesListWithData from './components/PendingActivitiesListWithData';
import client from './graphql';

function App() {
  return (
    <ApolloProvider client={client}>
      <div className="App">
        <PendingActivitiesListWithData />
      </div>
    </ApolloProvider>
  );
}

export default App;
