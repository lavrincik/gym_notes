import React from 'react';
import { Table } from 'antd';

import { ProgramExercise } from './ProgramContext';
import { ColumnProps } from 'antd/lib/table';

type Props = {
    exercises: ProgramExercise[]
}

class ProgramTable extends Table<ProgramExercise> { }

const CurrentProgramTable = (props: Props) => {
    const columns: ColumnProps<ProgramExercise>[] = [
        {
            key: 'exercise',
            title: 'Exercise',
            dataIndex: 'exercise.name',
        },
        {
            key: 'weight',
            title: 'Weight',
            render: (record: ProgramExercise) => {
                if (record.weight.usePercentage) {
                    return (record.exercise.weight * record.weight.value);
                } 
                return record.weight.value;
            }
        },
        {
            key: 'sets',
            title: 'Sets',
            dataIndex: 'sets',
        },
        {
            key: 'reps',
            title: 'Reps',
            dataIndex: 'reps',
        },
    ]

    return (
        <ProgramTable columns={columns} dataSource={props.exercises} pagination={false} />
    );
}

export default CurrentProgramTable;