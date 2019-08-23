import React from 'react';
import { Table } from 'antd';

import { ProgramExercise } from './ProgramContext';
import { ColumnProps } from 'antd/lib/table';

type Props = {
    exercises: ProgramExercise[]
}

class ProgramTable extends Table<ProgramExercise> { }

const CreateProgramDetailTable = (props: Props) => {
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
                return (
                    record.weight.value + (record.weight.usePercentage ? '%' : '')
                )
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

    return(
        <ProgramTable columns={columns} dataSource={props.exercises} pagination={false} />
    )

}

export default CreateProgramDetailTable;