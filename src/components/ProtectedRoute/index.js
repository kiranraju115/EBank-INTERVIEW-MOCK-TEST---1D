import {Route, Redirect} from 'react-router-dom'
import Cookies from 'js-cookie'

const ProtectedRoute = props => {
  const jwtToken = Cookies.get('jwt_token')
  console.log(jwtToken)
  if (jwtToken === undefined) {
    console.log('ProtectedRoute')
    return <Redirect to="/ebank/login" />
  }
  return <Route {...props} />
}

export default ProtectedRoute
