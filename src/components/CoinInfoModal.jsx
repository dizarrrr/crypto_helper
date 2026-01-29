import React, { useContext } from 'react'
import {Divider, Flex, Space, Tag, Typography} from 'antd'
import CryptoContext from '../context/crypto-context'


const CoinInfoModal = ({coin}) => {
    


    return (
        <>
            <Flex align='center'>
                <img 
                    src={coin.icon} 
                    alt={coin.name} 
                    style={{width: 40, marginRight: 10}} 
                />
                <Typography.Title level={2} style={{margin: 0}}>
                    ({coin.symbol})
                    {coin.name}
                </Typography.Title>
            </Flex>
            <Divider />
            <Typography.Paragraph>
                <Typography.Title level={4} style={{margin: "0px 0px 0px 0px"}}>Информация по изменениям</Typography.Title><br/>
                <Flex justify='space-between'>
                    <Space>
                        <Typography.Text>За час: </Typography.Text>
                        <Tag style={{border: `1px solid ${coin.priceChange1h > 0 ? 'green' : 'red'}`}} color={coin.priceChange1h > 0 ? 'green' : 'red'}>
                            {coin.priceChange1h}%
                        </Tag>
                    </Space>
                    <Space>
                        <Typography.Text>За день: </Typography.Text>
                        <Tag style={{border: `1px solid ${coin.priceChange1d > 0 ? 'green' : 'red'}`}} color={coin.priceChange1d > 0 ? 'green' : 'red'}>
                            {coin.priceChange1d}%
                        </Tag>
                    </Space>
                    <Space>
                        <Typography.Text>За неделю: </Typography.Text>
                        <Tag style={{border: `1px solid ${coin.priceChange1w > 0 ? 'green' : 'red'}`}} color={coin.priceChange1w > 0 ? 'green' : 'red'}>
                            {coin.priceChange1w}%
                        </Tag>
                    </Space>
                </Flex>
            </Typography.Paragraph>
            <Typography.Paragraph>
                <Typography.Text>Цена: </Typography.Text>
                {coin.price.toFixed(2)}$
            </Typography.Paragraph>
            <Typography.Paragraph>
                <Typography.Text>Цена в BTC: </Typography.Text>
                {coin.priceBtc}
            </Typography.Paragraph>
            <Typography.Paragraph>
                <Typography.Text>Рыночная цена: </Typography.Text>
                {coin.marketCap}
            </Typography.Paragraph>
            <Typography.Paragraph>
                <Typography.Text>Адрес для заключения контракта: </Typography.Text>
                {coin.contractAddress === undefined ? "Отсутствует" : coin.contractAddress}
            </Typography.Paragraph>
        </>
        
    )
}

export default CoinInfoModal