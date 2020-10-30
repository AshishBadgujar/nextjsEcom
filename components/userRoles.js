import Axios from 'axios'
import { parseCookies } from 'nookies'
import React, { useEffect, useState } from 'react'
import baseUrl from '../helpers/baseUrl'

function UserRoles() {
    const { token } = parseCookies()
    const [users, setUsers] = useState([])
    useEffect(() => {
        fetchUser()
    }, [])
    const fetchUser = async () => {
        const res = await Axios.get(`${baseUrl}/api/users`, {
            headers: {
                "Authorization": token
            }
        })
        const res2 = res.data
        console.log(res2)
        setUsers(res2)
    }
    const handleRole = async (_id, role) => {
        const res = await Axios.put(`${baseUrl}/api/users`, {
            headers: {
                "Authorization": token
            },
            data: {
                _id,
                role
            }
        })
        const res2 = res.data
        console.log(res2)
        const updatedUsers = users.map(user => {
            if ((user.role != res2.role) && user.email == res2.email) {
                return res2
            } else {
                return user
            }
        })
        setUsers(updatedUsers)
    }
    return (
        <div style={{ paddingTop: '40px', paddingBottom: '30px' }}>
            <h4>User Roles !</h4>
            <table>
                <thead>
                    <tr>
                        <th>Name</th>
                        <th>Email</th>
                        <th>Role</th>
                    </tr>
                </thead>

                <tbody>
                    {users.map(item => {
                        return (
                            <tr key={item._id}>
                                <td>{item.name}</td>
                                <td>{item.email}</td>
                                <td onClick={() => handleRole(item._id, item.role)}>{item.role}</td>
                            </tr>
                        )
                    })}
                </tbody>
            </table>
        </div>
    )
}

export default UserRoles
