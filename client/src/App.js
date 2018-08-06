import React from 'react';
import { Route } from 'react-router-dom';
import AuthContainer from './auth/authContainer';
import FileHasher from './fileHasher/fileHasherContainer';
import { ensureLoggedIn } from './ensureLoggedIn/ensureLoggedInContainer';
import NavBar from './components/nav/navContainer.js';
import styles from './App.module.css'

const App = () => (
  <div>
    <header>
      <NavBar />
    </header>

    <main className="body">
      <div className={styles.container}>
        <div className={styles.card}>
          <Route exact path="/signup" component={AuthContainer} />
          <Route exact path="/login" component={AuthContainer} />
          <Route exact path="/" component={FileHasher} />
        </div>
      </div>
    </main>
  </div>
);

export default App;
