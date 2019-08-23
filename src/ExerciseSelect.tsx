import React, { useContext } from 'react';
import { Select } from 'antd';

import { ExercisesContext, Exercise } from './ExercisesContext';

const { Option } = Select;

type Props = {
    setExercise: (exercise: Exercise) => void;
}

const ExerciseSelect = (props: Props) => {
    const [ exerciseDB ] = useContext(ExercisesContext);

    const onChange = (value: number) => {
        let ex = exerciseDB.exercises.find((exercise: Exercise) => exercise.id === value);
        if (ex) {
            props.setExercise(ex);
        }
    }
    
    return (
        <Select
            showSearch
            style={{ width: 200 }}
            placeholder="Select an exercise"
            onChange={onChange}
            optionFilterProp="children"
            filterOption={true}
        >
            {exerciseDB.exercises.map((exercise: Exercise) => {
                return <Option key={exercise.id} value={exercise.id}>{exercise.name}</Option>
            })}
        </Select>
    );
}

export default ExerciseSelect;