import React from 'react';

import {BrowserRouter as Router, Switch, Route, Link} from 'react-router-dom';
import AdminRouter from './Routes/AdminRouter';

function App() {
  
  console.log(process.env)

  return (
    <div>
      <AdminRouter/>
    </div>
  )
}
      


export default App;
