import { useUserInfo } from '../utils/api/frontendApi'

export default function Home() {

  const { data, error } = useUserInfo()

  if (error || (data && data.errorMessage)) {
    return (
      <div>
        { data.errorMessage }
      </div>
    )
  }

  return (
    <div>
      { JSON.stringify(data) }
    </div>
  )
}

