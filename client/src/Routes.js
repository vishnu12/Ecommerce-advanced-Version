import React from 'react'
import {BrowserRouter as Router,Switch,Route} from 'react-router-dom'
import Signup from './user/Signup'
import Signin from './user/Signin'
import Home from './core/Home'
import UserDashboard from './user/UserDashboard'
import PrivateRoute from './auth/PrivateRoute'
import AdminDashboard from './user/AdminDashboard'
import AdminRoute from './auth/AdminRoute'
import AddCategory from './admin/AddCategory'
import AddProduct from './admin/AddProduct'
import Shop from './core/Shop'
import Product from './core/Product'
import Cart from './core/Cart'
import Orders from './admin/Orders'
import Profile from './user/Profile'
import ManageProducts from './admin/ManageProducts'
import UpdateProduct from './admin/UpdateProduct'

const Routes = () => {
  return (
    <Router>
      <Switch>
          <Route exact path='/' component={Home} />
          <Route exact path='/product/:productId' component={Product} />
          <Route exact path='/shop' component={Shop}/>
          <Route exact path='/signin' component={Signin} />
          <Route exact path='/signup' component={Signup} />
          <Route exact path='/cart' component={Cart} />
          <PrivateRoute path='/user/dashboard' exact component={UserDashboard}/>
          <PrivateRoute path='/profile/:userId' exact component={Profile}/>
          <PrivateRoute path='/admin/products' exact component={ManageProducts}/>
          <AdminRoute path='/admin/dashboard' component={AdminDashboard}/>
          <AdminRoute path='/create/category' component={AddCategory}/>
          <AdminRoute path='/create/product' component={AddProduct}/>
          <AdminRoute path='/admin/product/update/:productId' component={UpdateProduct}/>
          <AdminRoute path='/admin/orders' component={Orders}/>
      </Switch>
    </Router>
  )
}

export default Routes
