import { useMemo, useState } from 'react'
import { Select, Space, Typography, Flex, Divider } from 'antd'
import { useCrypto } from '../context/crypto-context'


const AddAssetForm = () => {
    const { crypto } = useCrypto()
    const [coin, setCoin] = useState(null)


    const optionSelect = useMemo(() => crypto.map(coin => ({
        label: coin.name,
        value: coin.id,
        icon: coin.icon,
    })), [crypto])
    

    const handleSelect = (value) => {
        setCoin(crypto.find(c => c.id === value))
    }

    if (!coin) 
    {
        return (
            <Select
                style={{width: '100%'}}
                placeholder="Выберите монету"
                onSelect={handleSelect}
                options={optionSelect}
                optionRender={(option) => (
                    <Space>
                        <img style={{width: 20}} src={option.data.icon} alt={option.data.label}/> 
                        {option.data.label}
                    </Space>
                )}
            />
        )
    } 
    
    return (
        <form>
            <Flex align='center'>
                <img 
                    src={coin.icon} 
                    alt={coin.name} 
                    style={{width: 40, marginRight: 10}} 
                />
                <Typography.Title level={2} style={{margin: 0}}>
                    {coin.name}
                </Typography.Title>
            </Flex>
            <Divider />
        </form>
    )


    
}

export default AddAssetForm