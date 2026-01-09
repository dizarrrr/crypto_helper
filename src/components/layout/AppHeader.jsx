import React, { useEffect, useState } from 'react'
import { Layout, Select, Space, Button } from 'antd';
import { useCrypto } from '../../context/crypto-context';

const headerStyle = {
    width: '100%',
    textAlign: 'center',
    height: 60,
    padding: '1rem',
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
};

const AppHeader = () => {
    const [openSelect, setOpenSelect] = useState(false)
    const { crypto } = useCrypto()

    useEffect(() => {
        const keypress = (event) => {
            if (event.key === '/') {
                setOpenSelect((prev) => !prev) 
            }
        }

        document.addEventListener('keypress', keypress)

        return () => document.removeEventListener('keypress', keypress)
    }, [])

    const handlerSelect = (val) => {
        setOpenSelect((prev) => !prev)
    }

    return(
        <Layout.Header style={headerStyle}>
            <Select
                style={{ width: 250 }}
                value="press / to open"
                onSelect={handlerSelect}
                onClick={() => setOpenSelect((prev) => !prev)}
                open={openSelect}
                options={crypto.map(coin => ({
                    label: coin.name,
                    value: coin.id,
                    icon: coin.icon,
                }))}
                optionRender={(option) => (
                    <Space>
                        <img style={{width: 20}} src={option.data.icon} alt={option.data.label}/> {option.data.label}
                    </Space>
                )}
            />
            <Button type="primary">Добавить актив</Button>
        </Layout.Header>
    )
}

export default AppHeader