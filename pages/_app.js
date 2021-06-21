import 'antd/dist/antd.css'
import MyLayout from '../components/Layout'
import zhCN from 'antd/lib/locale/zh_CN';
import { ConfigProvider } from 'antd';
import { Provider } from 'react-redux'
import { useStore } from '../store'

function MyApp({ Component, pageProps }) {
  const store = useStore(pageProps.initialReduxState)

  return (
    <Provider store={store}>
      <ConfigProvider locale={zhCN}>
        <MyLayout>
          <Component {...pageProps} />
        </MyLayout>
      </ConfigProvider>
    </Provider>
  )
}

export default MyApp
