import React, { useContext } from 'react';
import { Select } from 'antd';

import { ProgramContext, Program } from './ProgramContext';

const { Option } = Select;

type Props = {
    setProgram: (program: Program) => void;
}

const ProgramSelect = (props: Props) => {
    const [ programs ] = useContext(ProgramContext);

    const onChange = (value: number) => {
        let program = programs.programs.find((program: Program) => program.id === value );
        if (program) {
            props.setProgram(program);
        }
    }
    
    return (
        <Select
            showSearch
            style={{ width: 200 }}
            placeholder="Select a program"
            onChange={onChange}
            optionFilterProp="children"
            filterOption={true}
        >
            {programs.programs.map((program: Program) => {
                return <Option key={program.id} value={program.id}>{program.name}</Option>
            })}
        </Select>
    );
}

export default ProgramSelect;