import React, { Component } from 'react'
import axios from 'axios'

const axiosReq = axios.create()
const AuthContext = React.createContext()

// configuration for axios
axiosReq.interceptors.request.use((config) => {
    const token = localStorage.getItem('token')
    config.headers.Authorization = `Bearer ${token}`
    return config
})

export class AuthContextProvider extends Component{
    constructor(){
        super()
        this.state = {
            users : [],
            user : localStorage.getItem('user') || "",
            token : localStorage.getItem('token') || "",
            isLoggedIn : localStorage.getItem('token')  === null ? false : true
        }
    }

    // login
    login = (credentials) => {
        return axiosReq.post('http://localhost:8000/api/auth/signin', credentials)
                    .then(response => {
                        const { token } = response.data

                        localStorage.setItem("token",token)
                        
                        this.setState({
                            token,
                            isLoggedIn: true
                        })

                        return console.log(response.data.token + " berhasil")
                        // window.location.href = "/profile";
                    })
    }

    // logout
    logout = () => {
        localStorage.removeItem('token')

        this.setState({
            isLoggedIn: false
        })

        return console.log('logout')
    }

    initUser = () => {
        return axiosReq.get('http://localhost:8000/api/profile')
                       .then(response => {
                           console.log(response)
                           this.setState({ user : response.data })
                       })
    }


    render(){
        return(
            <AuthContext.Provider value={{
                login: this.login,
                logout: this.logout,
                initUser: this.initUser,
                ...this.state
            }}>
                {this.props.children}
            </AuthContext.Provider>
        )
    }
}

// HOC

export const withAuth = (WrappedComponent) => {
    return class extends Component {
        render(){
            return(
                <AuthContext.Consumer>
                    {(context) => (
                        <WrappedComponent {...this.props} {...context} />
                    )}
                </AuthContext.Consumer>
            )
        }
    }
}