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
    // const [coinsInfo, setCoinsInfo] = useState(null)


    // useEffect(() => {
    //     const getInfoCoins = async () => {
    //         const {data} = await axios.get("http://localhost:5000/testApi/infoCoins")

    //         setCoinsInfo(data)
    //     }

       
    //     getInfoCoins()
        

    // }, [])

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