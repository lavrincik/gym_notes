import React, { useState, useContext } from 'react';
import { Modal, Form, InputNumber } from 'antd';
import { FormComponentProps } from 'antd/es/form';

import { ProgramExercise } from './ProgramContext';
import ToogleWeightRadio from './ToogleWeightRadio';
import { Exercise } from './ExercisesContext';
import ExerciseSelect from './ExerciseSelect';

interface Props extends FormComponentProps {
    visible: boolean;
    onCancel: () => void;
    onSubmit: (exercise: ProgramExercise) => void;
}

const CreateProgramDetailForm = Form.create<Props>()(
    (props: Props) => {
        const { visible, onCancel, onSubmit, form } = props;
        const { getFieldDecorator, getFieldValue } = form;

        const [weight, setWeight] = useState<{ usePercentage: boolean, value: number }>({
            usePercentage: true,
            value: 0,
        });

        const [exercise, setExercise] = useState<Exercise>();
  
        let okButton = typeof(getFieldValue('sets')) !== 'number' 
                        || typeof(getFieldValue('reps')) !== 'number' 
                        || typeof(weight.value) !== 'number'
                        || typeof(exercise) === 'undefined';
  
        const submit = () => {
            const sets  = getFieldValue('sets');
            const reps  = getFieldValue('reps');

            if (exercise) {
                onSubmit({
                    exercise: exercise,
                    weight: weight,
                    sets: sets,
                    reps: reps,
                });
            }
        }

        const handleExercise = (exercise: Exercise) => {
            setExercise(exercise);
        }

        const handleWeight = (weight: {
            usePercentage: boolean;
            value: number;
        }) => {
            setWeight(weight);
        }
  
        return (
            <Modal
                visible={visible}
                title="Add an exercise"
                okText="Submit"
                onCancel={onCancel}
                onOk={submit}
                okButtonProps={{disabled: okButton}}
                destroyOnClose
            >
                <Form layout="vertical" hideRequiredMark>
                    <Form.Item>
                        <ExerciseSelect setExercise={handleExercise} />
                    </Form.Item>
                    <Form.Item>
                        <ToogleWeightRadio setWeight={handleWeight}/>
                    </Form.Item>
                    <Form.Item label="Sets">
                        {getFieldDecorator('sets', {
                            rules: [{ required: true, message: "Please input the number of exercise's sets" }],
                        })(<InputNumber min={0}/>)}
                    </Form.Item>
                    <Form.Item label="Reps">
                        {getFieldDecorator('reps', {
                            rules: [{ required: true, message: "Please input the number of exercise's reps" }],
                        })(<InputNumber min={0}/>)}
                    </Form.Item>
                </Form>
            </Modal>
        );
    }
);

export default CreateProgramDetailForm;