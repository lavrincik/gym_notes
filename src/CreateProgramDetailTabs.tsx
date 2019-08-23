import React, { useContext, useState } from 'react';
import { Button, Icon, Tabs } from 'antd';

import CreateProgramDetailCollapse from './CreateProgramDetailCollapse';
import { ProgramContext, ProgramExercise, ProgramExercises } from './ProgramContext';

const { TabPane } = Tabs;

type Props = {
    name: string;
    weeks: number;
    days: number;
    onSave: () => void;
}

const CreateProgramDetailTabs = (props: Props) => {
    const [ , dispatchPrograms ] = useContext(ProgramContext);
    
    const [ exercises, setExercises ] = useState<ProgramExercises>({});

    const saveProgram = () => {
        dispatchPrograms({type: 'add', program: {
            name: props.name,
            weeks: props.weeks,
            days: props.days,
            exercises: exercises,
        }});
        
        setExercises({});
        props.onSave();
    }

    // TODO could be memoized?
    const handleAddExercise = (week: number) => {
        if (!exercises[week]) {
            setExercises({
                ...exercises,
                [week]: {},
            });
        }

        return (
            (day: number, exercise: ProgramExercise) => {
                let dayExercises = exercises[week][day] 
                    ? exercises[week][day].concat(exercise) 
                    : [exercise];

                setExercises({
                    ...exercises,
                    [week]: {
                        ...exercises[week],
                        [day]: dayExercises,
                    }
                });
            }
        );
    }

    const saveButton = (
        <Button
            type="primary" 
            onClick={saveProgram}
        >
            Save Program <Icon type="check" />
        </Button>
    );

    return (
        <Tabs tabBarExtraContent={saveButton} >
            {[...Array(props.weeks)].map((value: number, index: number) => {
                let week = index + 1;
                return (
                    <TabPane tab={"Week " + week} key={"" + week}>
                        <CreateProgramDetailCollapse days={props.days} addExercise={handleAddExercise(week)} exercises={exercises[week]}/>
                    </TabPane>
                );
            })}
        </Tabs>
    )
}

export default CreateProgramDetailTabs;