import React from 'react';
import { Collapse } from 'antd';
import CreateProgramDetailTable from './CreateProgramDetailTable';
import CreateProgramDetailForm from './CreateProgramDetailForm';
import { ProgramExercise } from './ProgramContext';
import CurrentProgramTable from './CurrentProgramTable';

const { Panel } = Collapse;

type Props = {
    days: number;
    exercises: {
        [day: number]: ProgramExercise[];
    };
}

const CurrentProgramCollapse = (props: Props) => {
    return (
        <>
            <Collapse>
                {[...Array(props.days)].map((value: number, index: number) => {
                    let day = index + 1;
                    return (
                        <Panel 
                            header={'Day ' + day} 
                            key={'' + day} 
                        >
                            <CurrentProgramTable exercises={props.exercises[day]} />
                        </Panel>
                    );
                })}
            </Collapse>
        </>
    )
}

export default CurrentProgramCollapse;