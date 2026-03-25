import React, {useState, useMemo} from "react";
import { PieChart, Pie, Cell, Tooltip, Legend, ResponsiveContainer} from 'recharts';
import { useCrypto } from "../../context/crypto-context";


interface IDataChart {
    name: string;
    value: number;
}

const COLORS: string[] = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042'];

const Chart: React.FC = () => {
    const { assets } = useCrypto();

    const dataChart = useMemo(() => {
        return assets.map((item) => ({
            name: item.id, 
            value: item.amount
        }));
    }, [assets]);

    return (
       <ResponsiveContainer width="100%" height={400}>
            <PieChart>
                <Pie
                    data={dataChart}
                    animationBegin={0}
                    animationDuration={800} // Делаем чуть медленнее
                    nameKey="name"
                    dataKey="value"
                    cx="50%"
                    cy="50%"
                    // --- КРАСОТА И ВИДИМОСТЬ ---
                    innerRadius={100}      // Делаем бублик
                    outerRadius={140}      
                    paddingAngle={5}       // Зазоры между кусками
                    cornerRadius={8}       // Закругленные края
                    minAngle={15}          // МИНИМАЛЬНЫЙ УГОЛ (чтобы мелкие куски были видны)
                    // ---------------------------
                    stroke="none"          // Убираем стандартную обводку
                    label={({ name }) => name}
                    labelLine={{ stroke: 'rgba(255, 255, 255, 0.3)', strokeWidth: 1 }}
                >
                    {dataChart.map((entry, index) => (
                        <Cell 
                            key={`cell-${index}`} 
                            fill={COLORS[index % COLORS.length]}
                            style={{ outline: 'none' }} // Убираем рамку при фокусе
                        />
                    ))}
                </Pie>
                <Tooltip 
                    contentStyle={{ backgroundColor: '#1a1a1a', borderRadius: '8px', border: 'none' }}
                    itemStyle={{ color: '#fff' }}
                />
                <Legend iconType="circle" />
            </PieChart>
       </ResponsiveContainer>
    );
}

export default Chart;