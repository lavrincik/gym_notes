import React, { useState } from 'react';
import { Radio, InputNumber, Row } from 'antd';
import { RadioChangeEvent } from 'antd/lib/radio';

type Props = {
    setWeight: (weight: {
        usePercentage: boolean;
        value: number;
    }) => void;
}

const ToogleWeightRadio = (props: Props) => {
    const [usePercentage, setUsePercentage] = useState(true);

    const toogleWeight = (e: RadioChangeEvent) => {
        setUsePercentage(e.target.value === 'Percentage');
    }

    const handleInputChange = (value: number | undefined) => {
        if (value) {
            props.setWeight({
                usePercentage: usePercentage,
                value: value
            });
        }
    }

    return (
        <>
            <Row type="flex" justify="start" style={{
                paddingBottom: '8px',
            }}>
                <span>Weight </span>
            </Row>

            <Row type="flex" justify="start">
                {usePercentage ? 
                    <InputNumber
                        key='0'
                        defaultValue={0}
                        min={0}
                        max={100}
                        formatter={value => `${value}%`}
                        parser={value => value ? value.replace('%', '') : ''}
                        onChange={handleInputChange}
                    /> :
                    <InputNumber
                        key='1'
                        defaultValue={0}
                        min={0}
                        onChange={handleInputChange}
                    />
                }
            </Row>

            <Radio.Group defaultValue={'Percentage'} onChange={toogleWeight} style={{
                marginTop: '8px',
            }}>
                <Radio.Button value='Percentage' >
                    Use % of exercise 1 rep max
                </Radio.Button>
                <Radio.Button value='Number' >
                    Type in your own weight
                </Radio.Button>
            </Radio.Group>
        </>
    );
}

export default ToogleWeightRadio