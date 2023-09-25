import React from 'react'
import { Link } from 'react-router-dom'
import logo from "../assets/books-logo.svg"
export default function Logo() {
  return (
    <Link to="/"><img style={{ width: "125px", padding: "3rem" }} src={logo} alt="home" /></Link>
  )
}
