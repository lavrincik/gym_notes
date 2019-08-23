import React, { useState } from 'react';
import { Form, InputNumber, Button, Divider, Statistic } from 'antd';
import { FormComponentProps } from 'antd/es/form';

interface Props extends FormComponentProps { }

const OneRMCalculator = Form.create<Props>()(
    (props: Props) => {
        const { getFieldDecorator, getFieldValue } = props.form;

        const [calculatedWeight, setCalculatedWeight] = useState(0);

        const calculate = () => {
            const weight    = getFieldValue('weight');
            const reps      = getFieldValue('reps');

            setCalculatedWeight(weight * ( 36 / (37 - reps)));
        }


        let buttonDisabled = typeof(getFieldValue('weight')) !== 'number' || typeof(getFieldValue('reps')) !== 'number';

        return (
            <>
                <Form layout="inline" hideRequiredMark>
                    <Form.Item label="Weight lifted">
                        {getFieldDecorator('weight', {
                        rules: [{ required: true, message: 'Please input the weight lifted' }]
                        })(<InputNumber min={0}/>)}
                    </Form.Item>
                    <Form.Item label="Reps Performed">
                        {getFieldDecorator('reps', {
                        rules: [{ required: true, message: 'Please input number of reps performed' }],
                    })(<InputNumber min={0}/>)}
                    </Form.Item>
                    <Form.Item>
                        <Button type="primary" onClick={calculate} disabled={buttonDisabled}>
                            Calculate
                        </Button>
                    </Form.Item>
                </Form>
                <Divider/>
                <Statistic title="Estimated one rep max" value={calculatedWeight} precision={2}/>
            </>
        )
    }
)

export default OneRMCalculator;