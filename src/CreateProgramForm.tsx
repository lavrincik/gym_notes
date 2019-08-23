import React, { useState } from 'react';
import { Divider } from 'antd';

import CreateProgramOutlineForm from './CreateProgramOutlineForm';
import CreateProgramDetailTabs from './CreateProgramDetailTabs';

const CreateProgramForm = () => {
    const [programOutline, setProgramOutline] = useState<{
        name: string | undefined
        days: number | undefined
        weeks: number | undefined
    }>({
        name: undefined,
        days: undefined,
        weeks: undefined
    })

    const handleSave = () => {
        setProgramOutline({
            name: undefined,
            days: undefined,
            weeks: undefined,
        })
    }

    return (
        <>
            <CreateProgramOutlineForm setProgramOutline={setProgramOutline}/>

            <Divider></Divider>

            {programOutline.name && programOutline.days && programOutline.weeks && 
                <CreateProgramDetailTabs 
                    name={programOutline.name}
                    days={programOutline.days} 
                    weeks={programOutline.weeks}
                    onSave={handleSave}
                />
            }
        </>
    );
}

export default CreateProgramForm;