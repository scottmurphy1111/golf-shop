import React from 'react'
import {Segment} from 'semantic-ui-react'

const Footer = () => {
  const year = new Date().getFullYear()

  return (
    <Segment>
      <div className="container">
        Copyright &copy; {year} Maple Chase Golf &amp; Country Club
      </div>
    </Segment>
  )
}

export default Footer
