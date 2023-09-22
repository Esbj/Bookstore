import { Link } from 'react-router-dom';
import Home from './Home/Home'

export default function Layout() {
  return (
    <>
      <Link to="/admin">Admin Page</Link>
      <br/>
      <Link to="/shipping">Shipping</Link>
      <Home />
    </>

  )
}
