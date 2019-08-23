import React, { useState } from 'react';
import { Collapse, Button, Icon } from 'antd';

import CreateProgramDetailTable from './CreateProgramDetailTable';
import CreateProgramDetailForm from './CreateProgramDetailForm';
import { ProgramExercise } from './ProgramContext';

const { Panel } = Collapse;

type Props = {
    days: number;
    addExercise: (day: number, exercise: ProgramExercise) => void;
    exercises: {
        [day: number]: ProgramExercise[];
    };
}

const CreateProgramDetailCollapse = (props: Props) => {
    const [form, setForm] = useState(Array(props.days).fill(false));

    const showForm = (day: number) => {
        setForm(
            form.map((value: boolean, index: number) => index === day ? true : false)
        );
    }

    const handleFormSubmit = (exercise: ProgramExercise) => {
        let day = form.findIndex((value: boolean) => value === true);
        props.addExercise(day, exercise);
        setForm(form.map(() => false));
    }

    const handleFormCancel = () => {
        setForm(form.map(() => false));
    }

    const isVisible = form.some((value: boolean) => value === true);
    
    const addButton = (day: number) => {
        return (
            <Button
                type="default" 
                onClick={() => {showForm(day)}}
                size="small"
            >
                Add Exercise <Icon type="plus" />
            </Button>
        )
    }
    
    return (
        <>
            <Collapse defaultActiveKey={['1']}>
                {[...Array(props.days)].map((value: number, index: number) => {
                    let day = index + 1;
                    return (
                        <Panel 
                            header={'Day ' + day} 
                            key={'' + day} 
                            extra={addButton(day)}
                        >
                            <CreateProgramDetailTable exercises={props.exercises[day]} />
                        </Panel>
                    );
                })}
            </Collapse>
            <CreateProgramDetailForm visible={isVisible} onCancel={handleFormCancel} onSubmit={handleFormSubmit} />
        </>
    )
}

export default CreateProgramDetailCollapse;