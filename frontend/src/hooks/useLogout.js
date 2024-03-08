import { useSetRecoilState } from 'recoil'
import userAtom from '../atoms/userAtom'
import useShowToast from './useShowToast'

const useLogout = () => {
    const setUser = useSetRecoilState(userAtom)
    const showToast = useShowToast()

    const logout = async() => {
        try {
            localStorage.removeItem('user-info')
            localStorage.removeItem('jwt')
            setUser(null)
        } catch (err) {
            showToast('Error', err, 'error')
        }
    }

    return logout
}

export default useLogout