import React, {useState} from 'react'
import { Drawer } from 'antd';
import AddAssetForm from '../AddAssetForm';
import { useUI } from '../../context/ui-context';


const DrawerModal: React.FC = () => {
    const {isDrawerOpen, setDrawerOpen} = useUI()
    
    return (
        <>
            <Drawer
                width={600}
                title="Добавить монету"
                closable={{ 'aria-label': 'Close Button' }}
                onClose={() => setDrawerOpen()}
                open={isDrawerOpen}
                destroyOnClose
            >
                <AddAssetForm />
            </Drawer>
        </>
    );
}


export default DrawerModal