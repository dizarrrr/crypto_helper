import React from 'react'
import { Layout } from 'antd';
// import axios from 'axios'

const contentStyle: React.CSSProperties = {
  textAlign: 'center',
  minHeight: 'calc(100vh - 60px)',
  color: '#fff',
  backgroundColor: '#001529',
  padding: "1rem",
};

const AppContent: React.FC = () => {
    

    return(
        <Layout.Content style={contentStyle}>
            {/* {coinsInfo.map(coin => {
                return (
                    <p>{coin.titleCoin}</p>
                )
            })} */}
        </Layout.Content>
    )
}

export default AppContent