import React from 'react';

import ExerciseForm from './ExerciseForm';
import { ExerciseWithoutId } from './ExercisesContext';

type Props = {
    visible: boolean;
    onCancel: () => void;
    onSubmit: (exercise: ExerciseWithoutId) => void;
}

const AddExerciseForm = (props: Props) => {
    return (
        <ExerciseForm visible={props.visible} onCancel={props.onCancel} onSubmit={props.onSubmit} exerciseName={""} exerciseWeight={0}/>
    );
}

export default AddExerciseForm;