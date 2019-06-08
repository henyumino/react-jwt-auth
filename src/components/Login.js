import React, {Component} from 'react'
import { withAuth } from '../context/AuthContext'
import { Redirect } from 'react-router-dom'

class Login extends Component{
    state = {
        username: "",
        password : ""
    }

    handleChange = (e) => {
        const { name, value } = e.target
        this.setState({
            [name] : value
        })
    }

    handleSubmit = (e) => {
        e.preventDefault()

        this.props.login(this.state)
    }

    render(){

        if(this.props.isLoggedIn)
            return <Redirect push to='/profile' />

        return(
            <div>
                <form onSubmit={this.handleSubmit}>
                    <input onChange={this.handleChange}
                           value={this.state.username} 
                           type="text" placeholder="username"
                           name="username"
                    />
                    <input onChange={this.handleChange}
                           value={this.state.password} 
                           type="password" placeholder="password"
                           name="password"
                    />
                    <input type="submit" value="login" />
                </form>
            </div>
        )
    }
}

export default withAuth(Login)