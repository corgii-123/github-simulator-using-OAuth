import useSWR from 'swr'
import { useDispatch } from 'react-redux'
import { initUserInfo } from '../../store/actions'

const fetcher = (...args) => fetch(...args).then((res) => res.json())

export const useUserInfo = () => {
  const { data, error } = useSWR("/api/userInfo", fetcher)
  const dispatch = useDispatch()

  dispatch(initUserInfo(data ? data : {}))

  return {
    data,
    error
  }
}