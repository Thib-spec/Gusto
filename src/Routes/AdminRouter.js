
import Test1 from '../Components/TestHistory'
import Test2 from '../Components/TestHistory2'
import {BrowserRouter as Router, Switch, Route, Link} from 'react-router-dom';

function AdminRouter() {
  


  return (
    <Router>
      <Switch>
        <Route exact path='/' component={Test1}/>
        <Route exact path='/testHistory' component={Test2}/>
      </Switch> 
    </Router>
    
      
  )
}
      


export default AdminRouter;
