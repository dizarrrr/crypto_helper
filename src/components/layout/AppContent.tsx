import React from 'react'
import { Layout } from 'antd';
import Chart from '../charts/chart';

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
            <Chart/>
        </Layout.Content>
    )
}

export default AppContent