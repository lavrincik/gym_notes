import React from 'react';

import { Modal, Form, Input, InputNumber } from 'antd';
import { FormComponentProps } from 'antd/es/form';

import { ExerciseWithoutId } from './ExercisesContext';

interface Props extends FormComponentProps {
  visible: boolean;
  onCancel: () => void;
  onSubmit: (exercise: ExerciseWithoutId) => void;
  exerciseName: string;
  exerciseWeight: number;
}

const ExerciseForm = Form.create<Props>()(
  (props: Props) => {
    const { visible, onCancel, onSubmit, form } = props;
    const { getFieldDecorator, getFieldValue } = form;

    let okButton = getFieldValue('name') === '' || typeof(getFieldValue('weight')) !== 'number';

    const submit = () => {
      const name    = getFieldValue('name');
      const weight  = getFieldValue('weight');
      onSubmit({
        name: name, 
        weight: weight
      });
    }

    return (
      <Modal
          visible={visible}
          title="Create a new exercise"
          okText="Submit"
          onCancel={onCancel}
          onOk={submit}
          okButtonProps={{disabled: okButton}}
          destroyOnClose
        >
          <Form layout="vertical" hideRequiredMark>
            <Form.Item label="Exercise name">
              {getFieldDecorator('name', {
                rules: [{ required: true, message: 'Please input the name of exercise' }],
                initialValue: props.exerciseName,
              })(<Input />)}
            </Form.Item>
            <Form.Item label="Weight">
              {getFieldDecorator('weight', {
                rules: [{ required: true, message: 'Please input the name of exercise' }],
                initialValue: props.exerciseWeight,
              })(<InputNumber min={0}/>)}
            </Form.Item>
          </Form>
        </Modal>
    )
  }
);

export default ExerciseForm;