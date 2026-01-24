import React, { useEffect, useState } from 'react'
import { Layout, Select, Space, Button, Modal, Drawer } from 'antd';
import { useCrypto } from '../../context/crypto-context';
import CoinInfoModal from '../CoinInfoModal';
import AddAssetForm from '../AddAssetForm';

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
    const [coin, setCoin] = useState(null)
    const [modal, setModal] = useState(false)
    const [drawer, setDrawer] = useState(true)
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
        setCoin(crypto.find(c => c.id === val))
        setOpenSelect((prev) => !prev)
        setModal((prev) => !prev)
    }


    return(
        <Layout.Header style={headerStyle}>
            <Select
                style={{ width: 350 }}
                value="Нажмите '/' чтобы выбрать монету"
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
            <Button onClick={() => setDrawer(prev => !prev)} type="primary">Добавить актив</Button>

            <Modal
                closable={{ 'aria-label': 'Custom Close Button' }}
                open={modal}
                footer={null}
                onCancel={() => setModal(false)}
            >
                <CoinInfoModal coin={coin}/>
            </Modal>

            <Drawer
                width={600}
                title="Добавить монету"
                closable={{ 'aria-label': 'Close Button' }}
                onClose={() => setDrawer((prev) => !prev)}
                open={drawer}
                destroyOnClose
            >
                <AddAssetForm />
            </Drawer>
        </Layout.Header>
    )
}

export default AppHeader