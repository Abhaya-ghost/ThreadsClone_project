import { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import useShowToast from './useShowToast'

const useGetUserProfile = () => {
    const [user, setUser] = useState(null)
    const [loading, setLoading] = useState(true)
    const { username } = useParams()
    const showToast = useShowToast()
    const token = localStorage.getItem('jwt')
    
    useEffect(() => {
        const getUser = async () => {
            setLoading(true)
            try {
                const res = await fetch(`https://threads-backend-qa7c.onrender.com/api/users/profile/${username}`, {
                    headers: {
                        'Authorization': JSON.parse(token)
                    },
                })
                const data = await res.json()
                if (data.error) {
                    showToast('Error', data.error, 'error')
                    return
                }
                setUser(data)
            } catch (err) {
                showToast('Error', err, 'error')
            } finally {
                setLoading(false)
            }
        }

        getUser()
    }, [username, showToast, token])

    return {loading, user}
}

export default useGetUserProfile