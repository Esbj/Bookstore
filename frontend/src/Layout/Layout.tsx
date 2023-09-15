import { Button } from '@mui/material'
import { Link } from 'react-router-dom'

export default function Layout() {
  return (
    <Button variant="outlined"><Link to="/products"> Books!</Link></Button>
  )
}
