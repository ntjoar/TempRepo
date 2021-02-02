import React, {Component} from 'react';
import {
  BrowserRouter as Router,
  Route,
  Switch
} from 'react-router-dom';

// import withContext from './Context' // for later

// Components Import
import Header from './components/Header/Header';
import Footer from './components/Footer/Footer';
import HomePage from './components/Home/Home';
import SignIn from './components/Signin/SignIn';
import SignUp from './components/Signup/SignUp';
import Chat from './components/Chat/Chat';
import Contact from './components/Contact/Contact';
import EditProfile from './components/EditProfile/EditProfile';
import EditBook from './components/EditBook/EditBook';
import FindISBN from './components/FindISBN/ISBN';
import MyUploads from './components/MyUploads/MyUploads';
import Privacy from './components/Privacy/Privacy';
import Profile from './components/Profile/Profile';
import Search from './components/Search/Search';
import Terms from './components/Terms/Terms';
import UploadItem from './components/UploadItem/UploadItem';
import NotFound from './components/NotFound';

export default class App extends Component {

  render() {
    return(
      <Router>
        <Header />
        <Switch>
          <Route exact path = "/" component={HomePage} />
          <Route path = "/signup" component={SignUp} />
          <Route path = "/signin" component={SignIn} />
          <Route path = "/chat" component={Chat} />
          <Route path = "/contact" component={Contact} />
          <Route path = "/editBook" component={EditBook} />
          <Route path = "/editProfile" component={EditProfile} />
          <Route path = "/findISBN" component={FindISBN} />
          <Route path = "/myUploads" component={MyUploads} />
          <Route path = "/privacy" component={Privacy} />
          <Route path = "/profile" component={Profile} />
          <Route path = "/search" component={Search} />
          <Route path = "/terms" component={Terms} />
          <Route path = "/upload" component={UploadItem} />
          <Route component={NotFound} />
        </Switch>
        <Footer />
      </Router>
    )}
}
