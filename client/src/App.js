import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import Home from './components/views/Home';
import LoginPage from './components/views/LoginPage';
import RegisterPage from './components/views/RegisterPage';
import NavBar from './components/views/NavBar';
import MyPage from './components/views/MyPage';
import RankingPage from './components/views/RankingPage';
import Auth from './hoc/auth';

function App() {
  return (
    <Router>
      <div>
        <NavBar />
        <div style={{ padding: '0 5vw', height: '100%' }}>
          <Switch >
            <Route exact path="/" component={Auth(Home, null)} />
            <Route path="/ranking" component={Auth(RankingPage, null)} />
            <Route path="/my" component={Auth(MyPage, true)} />
            <Route path="/login" component={Auth(LoginPage, false)} />
            <Route path="/register" component={Auth(RegisterPage, false)} />
          </Switch>
        </div>
      </div>
    </Router>
  );
}

export default App;
