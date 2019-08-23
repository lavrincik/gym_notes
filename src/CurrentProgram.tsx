import React, { useState } from 'react';
import { Divider } from 'antd';

import ProgramSelect from './ProgramSelect';
import { Program } from './ProgramContext';
import CurrentProgramTabs from './CurrentProgramTabs';

const CurrentProgram = () => {
    const [ program, setProgram ] = useState<Program>();

    return (
        <>
            <ProgramSelect setProgram={setProgram} />
            <Divider />
            { program && <CurrentProgramTabs program={program} /> }
        </>
    );
}

export default CurrentProgram;