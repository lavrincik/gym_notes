import React from 'react';
import { Form, Input, InputNumber, Button } from 'antd';
import { FormComponentProps } from 'antd/es/form';

interface Props extends FormComponentProps { 
    setProgramOutline: (programOutline: {
        name: string | undefined
        days: number | undefined
        weeks: number | undefined}) => void;
}

const CreateProgramOutlineForm = Form.create<Props>()(
    (props: Props) => {
        const { getFieldDecorator, getFieldValue } = props.form;

        let buttonDisabled = getFieldValue('name') === '' || typeof(getFieldValue('days')) !== 'number' || typeof(getFieldValue('weeks')) !== 'number';

        const handleClick = () => {
            const name = getFieldValue('name');
            const days = getFieldValue('days');
            const weeks = getFieldValue('weeks');

            props.setProgramOutline({
                name: name,
                days: days,
                weeks: weeks,
            });
        }

        return (
            <Form layout="inline" hideRequiredMark>

                <Form.Item label="Program name" >
                    {getFieldDecorator('name', {
                    rules: [{ required: true, message: 'Please input the name of program' }]
                    })(<Input style={{
                        width: 350,
                    }} />)}
                </Form.Item>

                <Form.Item label="Number of program's days in week">
                    {getFieldDecorator('days', {
                    rules: [{ required: true, message: "Please input the number of program's days in week" }]
                    })( <InputNumber min={1} max={7} precision={0}/>)}
                </Form.Item>

                <Form.Item label="Number of program's weeks">
                    {getFieldDecorator('weeks', {
                    rules: [{ required: true, message: "Please input number of program's weeks" }],
                })(<InputNumber min={1} precision={0}/>)}
                </Form.Item>

                <Form.Item>
                    <Button type="primary" onClick={handleClick} disabled={buttonDisabled}>
                        Create program's form
                    </Button>
                </Form.Item>

            </Form>
        );
    }
);

export default CreateProgramOutlineForm;