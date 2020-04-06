import React from 'react';
import {BrowserRouter as Router, Route, Switch} from 'react-router-dom';
import {Provider} from 'react-redux';
import jwt_decode from 'jwt-decode';
import setAuthToken from './redux/utils/setAuthToken';
import {setCurrentUser, logoutUser} from './redux/actions/authActions';
import {clearCurrentProfile} from './redux/actions/profileActions'
import './App.css';

import Navbar from './components/layout/Navbar';
import Footer from './components/layout/Footer';
import Landing from './components/layout/Landing';

// AUTH
import Login from './components/auth/Login';
import Register from './components/auth/Register';

// Dashboard
import Dashboard from './components/dashboard/Dashboard';
import CreateProfile from './components/create-profile/CreateProfile';
import EditProfile from './components/edit-profile/EditProfile';
import AddExperience from './components/add-credentials/AddExperience';
import AddEducation from './components/add-credentials/AddEducation';
import Profiles from './components/profiles/Profiles';
import Profile from './components/profile/Profile';
import Posts from './components/posts/Posts';
import Post from './components/post/Post';
import NotFound from './components/not-found/NotFound';

// store
import store from './redux/store'

// Priva teRoute
import PrivateRoute from './components/common/PrivateRoute'

// Check for token
if (localStorage.jwtToken) {
    // Set auth token header auth
    setAuthToken(localStorage.jwtToken);
    // Decode token and get user info and exp
    const decoded = jwt_decode(localStorage.jwtToken);
    // Set user and isAuthenticated
    store.dispatch(setCurrentUser(decoded));

    // Check for expired token
    const currentTime = Date.now() / 1000;
    if (decoded.exp < currentTime) {
        // Logout user
        store.dispatch(logoutUser());
        // Clear current profile
        store.dispatch(clearCurrentProfile());
        // TODO: Clear current Profile Redirect to login
        window.location.href = '/login';
    }
}

function App() {
    return (
        <Provider store={store}>
            <Router>
                <div className="App">
                    {/* <Navbar/>
                    <Route exact path="/" component={Landing}/>
                    <div className="container">
                        <Route exact path="/register" component={Register}/>
                        <Route exact path="/login" component={Login}/>
                        <Route exact path="/profiles" component={Profiles}/>
                        <Route exact path="/profile/:handle" component={Profile}/>
                        <Route exact path="/not-found" component={NotFound} />
                        <Switch>
                            <PrivateRoute exact path="/dashboard" component={Dashboard}/>
                            <PrivateRoute exact path="/create-profile" component={CreateProfile}/>
                            <PrivateRoute exact path="/edit-profile" component={EditProfile}/>
                            <PrivateRoute exact path="/add-experience" component={AddExperience}/>
                            <PrivateRoute exact path="/add-education" component={AddEducation}/>
                            <PrivateRoute exact path="/feed" component={Posts}/>
                            <PrivateRoute exact path="/post/:id" component={Post} />
                        </Switch>
                    </div>
                    <Footer/> */}

                    <Navbar/>
                    <Route exact path="/" component={Landing}/>
                    <div className="container main">
                        <Route exact path="/register" component={Register}/>
                        <Route exact path="/login" component={Login}/>
                        <Route exact path="/profiles" component={Profiles}/>
                        <Route exact path="/profile/:handle" component={Profile}/>
                        <Route exact path="/not-found" component={NotFound} />
                        <Switch>
                            <PrivateRoute exact path="/dashboard" component={Dashboard}/>
                            <PrivateRoute exact path="/create-profile" component={CreateProfile}/>
                            <PrivateRoute exact path="/edit-profile" component={EditProfile}/>
                            <PrivateRoute exact path="/add-experience" component={AddExperience}/>
                            <PrivateRoute exact path="/add-education" component={AddEducation}/>
                            <PrivateRoute exact path="/feed" component={Posts}/>
                            <PrivateRoute exact path="/post/:id" component={Post} />
                        </Switch>
                    </div>           
                    {/* <div className="main">Контент</div> */}
                    <Footer/>
                </div>
            </Router>
        </Provider>


      
    );
}

export default App;
