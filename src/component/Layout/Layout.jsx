import React from 'react'
import './Layout.css'
import { Link } from 'react-router-dom'
const Layout = (props) => {
  return (
    <div>
      <nav>
        <ul>
          <Link to="/home">Home</Link>
          <Link to="/contact">Contact</Link>
        </ul>
      </nav>
      <div>{props.children}</div>
    </div>
  )
}
export default Layout