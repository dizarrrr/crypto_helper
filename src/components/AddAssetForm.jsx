import { useCallback, useContext, useMemo, useState } from 'react'
import { Select, Space, Typography, Flex, Divider, Form, Button, Input, notification} from 'antd'
import CryptoContext, { useCrypto } from '../context/crypto-context'
import { percentDifference } from '../utils'


const AddAssetForm = () => {
    const { crypto } = useCrypto()
    const [coin, setCoin] = useState(null)
    const {setAssets, assets} = useContext(CryptoContext)
    const [api, contextHolder] = notification.useNotification();

    const [form] = Form.useForm(); // Создаем экземпляр формы
    const amount = Form.useWatch('amountCoin', form); // Следим за количеством
    const price = Form.useWatch('purchaseUnitPrice', form); // Следим за ценой

    const showNotify = useCallback((type, message) => {
        api[type]({
            message: type === 'error' ? 'Ошибка' : 'Успех',
            description: message,
            placement: 'bottomLeft',
        });
    }, [api])

    const optionSelect = useMemo(() => crypto.map(coin => ({
        label: coin.name,
        value: coin.id,
        icon: coin.icon,
    })), [crypto])

    
    const handleSelect = (selectedCoinId) => {
        if (assets.find(asset => asset.id === selectedCoinId)) {
            showNotify('error', 'Вы не можете добавить эту монету, она уже есть у вас в портфеле');
            return;
        }
        setCoin(crypto.find(c => c.id === selectedCoinId)); 
    }

    const onFinish = (values) => {
        const amount = Number(values.amountCoin);
        const buyPrice = Number(values.purchaseUnitPrice);

        const newAsset = {
            grow: buyPrice < coin.price,
            growPercent: percentDifference(buyPrice, coin.price),
            totalAmount: amount * coin.price,
            totalProfit: amount * coin.price - amount * buyPrice,
            id: coin.id,
            amount: amount,
            price: coin.price,
            date: new Date(),
        }

        setAssets(prev => [...prev, newAsset])
        showNotify('success', 'Вы успешно добавили монету в портфель');
    };
    

    return (
        <>
            {/* contextHolder должен быть доступен всегда */}
            {contextHolder}

            {!coin ? (
                <>
                    <Typography.Title level={5} style={{ margin: "0px 0px 20px 0px" }}>
                        Какую монету желаете добавить?
                    </Typography.Title>
                    <Select
                        style={{ width: '100%' }}
                        placeholder="Выберите монету"
                        onSelect={handleSelect}
                        options={optionSelect}
                        optionRender={(option) => (
                            <Space>
                                <img style={{ width: 20 }} src={option.data.icon} alt={option.data.label} />
                                {option.data.label}
                            </Space>
                        )}
                    />
                </>
            ) : (
                <>
                    <Flex align='center'>
                        <img src={coin.icon} alt={coin.name} style={{ width: 40, marginRight: 10 }} />
                        <Typography.Title level={2} style={{ margin: 0 }}>
                            {coin.name}
                        </Typography.Title>
                    </Flex>
                    <Divider />
                    <Form
                        form={form}
                        name="addAsset"
                        layout="vertical" // В antd лучше использовать встроенные лейауты
                        onFinish={onFinish}
                        autoComplete="off"
                    >
                        <Form.Item
                            label="Количество монет"
                            name="amountCoin"
                            rules={[
                                { required: true, message: 'Введите количество' },
                                { 
                                    validator: (_, value) => 
                                        value > 0 ? Promise.resolve() : Promise.reject(new Error('Количество должно быть больше 0')) 
                                }
                            ]}
                        >
                            <Input type="number" step="any" placeholder='0.99' />
                        </Form.Item>

                        <Form.Item
                            label="Цена покупки (за 1 шт)"
                            name="purchaseUnitPrice"
                            rules={[
                                { required: true, message: 'Введите цену' },
                                { 
                                    validator: (_, value) => 
                                        value >= 0 ? Promise.resolve() : Promise.reject(new Error('Цена не может быть отрицательной')) 
                                }
                            ]}
                        >
                            <Input type="number" step="any" placeholder='0.99' />
                        </Form.Item>

                        {amount && price && (
                            <div style={{ marginBottom: 15 }}>
                                <Typography.Text type="secondary">Итоговая стоимость на момент вашей покупки: </Typography.Text>
                                <Typography.Text strong>
                                    {(amount * price).toLocaleString()} $
                                </Typography.Text>
                            </div>
                        )}

                        <Form.Item>
                            <Button type="primary" htmlType="submit" block>
                                Добавить монету
                            </Button>
                        </Form.Item>
                    </Form>
                </>
            )}
        </>
    )
}

export default AddAssetForm