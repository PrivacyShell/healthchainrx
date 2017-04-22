import React from 'react'
import NavBar from '../components/nav/NavBar'

const navdata = [{"title": "Home", "href": "/"},
  {"title": "Doctor", "href": "/doctor"},
  {"title": "Pharmacy", "href": "/pharma"}]

class App extends React.Component {

    render() {
      return (
        <div>
          <NavBar navData={navdata}/>
          <hr/>
          {this.props.children}
        </div>
      )
    }
}

export default App
