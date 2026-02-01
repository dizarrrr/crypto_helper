import React, { useEffect, useState } from 'react'
import { Layout, Select, Space, Button, Modal, Drawer } from 'antd';
import { useCrypto } from '../../context/crypto-context';
import CoinInfoModal from '../CoinInfoModal';
import AddAssetForm from '../AddAssetForm';
import { type ICryptoCoin } from '../../types/crypto';
import type { DefaultOptionType } from 'antd/es/select';


const headerStyle: React.CSSProperties = {
    width: '100%',
    textAlign: 'center',
    height: 60,
    padding: '1rem',
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
};

const AppHeader: React.FC = () => {
    const [openSelect, setOpenSelect] = useState<boolean>(false)
    const [coin, setCoin] = useState<ICryptoCoin | null>(null)
    const [modal, setModal] = useState<boolean>(false)
    const [drawer, setDrawer] = useState<boolean>(true)
    const { crypto } = useCrypto()

    useEffect(() => {
        const keypress = (e: KeyboardEvent) => {
            if (e.key === '/') {
                if (e.target instanceof HTMLInputElement || e.target instanceof HTMLTextAreaElement) {
                    return
                }
                e.preventDefault()
                setOpenSelect((prev) => !prev) 
            }
        }

        document.addEventListener('keydown', keypress)

        return () => document.removeEventListener('keydown', keypress)
    }, [])

    const handlerSelect = (val: string) => {
        const selectedCoin = crypto.find(c => c.id === val) 
        setCoin(selectedCoin || null)
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
                optionRender={(option: DefaultOptionType) => (
                    <Space>
                        <img style={{width: 20}} src={option.data?.icon} alt={option.data?.label}/> {option.data?.label}
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