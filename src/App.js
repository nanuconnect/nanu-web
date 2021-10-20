import { BrowserRouter, Switch, Route } from 'react-router-dom'
import './App.css';
import UserDetails from './pages/UserDetails'

function App () {
  return (
    <>
      <BrowserRouter>
        <Switch>
          <Route exact path='/:username' component={UserDetails} />
        </Switch>
      </BrowserRouter>
    </>
  )
}

export default App;
