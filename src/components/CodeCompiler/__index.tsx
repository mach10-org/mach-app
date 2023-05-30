import React from 'react';
import GlotAPI from 'glot-api';
import { editor } from 'monaco-editor';

const token = 'f2c16827-22c0-4cdf-8bec-5b3ee5c4eb37'; // If you are logged in you will find your token here:  https://glot.io/account/token
const glot = new GlotAPI(token);

const Button = () => {
  return <button>children</button>;
};

export default Button;
