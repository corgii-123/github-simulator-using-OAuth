import { Layout, Input, Avatar } from 'antd';
import { GithubOutlined } from '@ant-design/icons'
import { useState } from 'react';
import client from '../OAuth.js'
import qs from 'qs'

const { Header, Footer, Content } = Layout;
const { Search } = Input
const clientParams = qs.stringify({
  client_id: client.client_id,
  redirect_uri: client.redirect_uri,
  scope: client.scope
})

export default function MyLayout({ children }) {
  const [search, setSearch] = useState('')

  const handleSearch = () => {

  }
  const handleLogin = (e) => {
    e.preventDefault()
    window.location.href = `https://github.com/login/oauth/authorize?${clientParams}`
  }

  return (
    <>
      <Layout style={{height: '100vh'}}>
        <Header>
          <div className="header-inner">
            <div className="header-left">
              <div className="header-logo">
                <GithubOutlined style={{color: '#fff', fontSize: '40px', margin: '0 20px'}} />
              </div>
              <div className="header-search">
                <Search
                  placeholder="搜索仓库"
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                  onSearch={handleSearch}
                />
              </div>
            </div>
            <div className="header-right">
              <div
                onClick={handleLogin}
                style={{cursor: 'pointer'}}
              >
                <Avatar size={40}>USER</Avatar>
              </div>
            </div>
          </div>
        </Header>
        <Content>{ children }</Content>
        <Footer style={{ textAlign: 'center' }}>Designed by @Corgii-123</Footer>
      </Layout>
      <style jsx>{`
        .header-inner {
          display: flex;
          justify-content: space-between;
        }
        .header-left {
          display: flex;
          justify-content: flex-start;
        }
        .header-logo,
        .header-search {
          display: flex;
          align-items: center;
        }
      `}</style>
    </>
  )
}