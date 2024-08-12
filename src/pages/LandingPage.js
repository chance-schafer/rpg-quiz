import React from 'react';
import { Link } from 'react-router-dom';

const Landing = () => (
  <div>
    <h1>Welcome to the RPG Character Quiz!</h1>
    <p>Find out what kind of RPG character you would be.</p>
    <Link to="/quiz">
      <button>Start Quiz</button>
    </Link>
  </div>
);

export default Landing;

