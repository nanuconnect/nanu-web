import { BrowserRouter, Switch, Route } from 'react-router-dom'
import './App.css';
import Home from './pages/Home';
import UserDetails from './pages/UserDetails'

function App () {
  return (
    <>
      <BrowserRouter>
        <Switch>
          {/* <Route exact path='/' component={Home} /> */}
          <Route exact path='/:username' component={UserDetails} />
        </Switch>
      </BrowserRouter>
    </>
  )
}

export default App;
