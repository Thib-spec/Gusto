
import Test1 from '../Components/TestHistory'
import Test2 from '../Components/TestHistory2'
import {BrowserRouter as Router, Switch, Route, Link} from 'react-router-dom';
import CategoriesPage from '../Pages/CategoriesPage';
import HomePage from '../Pages/HomePage';
import LoginPage from '../Pages/LoginPage';
import ProductsPage from '../Pages/ProductPage';
import TestData from '../Components/TestData';
import Header from '../Components/Header'


function AdminRouter() {
  


  return (
    <Router>

      <Header/>
      <Switch>
        <Route exact path='/' component={HomePage}/>

        <Route path='/Categories' component={CategoriesPage}/>
        <Route path='/Login' component={LoginPage}/>
        <Route path='/Products' component={ProductsPage}/>
        <Route path='/testHistory1' component={Test1}/>
        <Route path='/testHistory2' component={Test2}/>
        <Route path='/testData' component={TestData}/>



      </Switch> 
    </Router>
    
      
  )
}
      


export default AdminRouter;
