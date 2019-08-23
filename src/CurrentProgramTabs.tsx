import React from 'react';
import { Tabs } from 'antd';

import { Program } from './ProgramContext';
import CurrentProgramCollapse from './CurrentProgramCollapse';

const { TabPane } = Tabs;

type Props = {
    program: Program;
}

const CurrentProgramTabs = (props: Props) => {
    return (
        <Tabs >
            {[...Array(props.program.weeks)].map((value: number, index: number) => {
                let week = index + 1;
                return (
                    <TabPane tab={"Week " + week} key={"" + week}>
                        <CurrentProgramCollapse days={props.program.days} exercises={props.program.exercises[week]} />
                    </TabPane>
                );
            })}
        </Tabs>
    );
}

export default CurrentProgramTabs;