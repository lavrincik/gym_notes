import React from 'react';
import { Typography } from 'antd';
import Title from 'antd/lib/typography/Title';
import Paragraph from 'antd/lib/typography/Paragraph';

type Props = {

}

const Home = (props: Props) => {
    return (
        <Typography>
            <Title>Home</Title>
            <Paragraph>
                First add some exercises. Then create the program using those exercises. 
                Choose one of your created programs in Current program.
            </Paragraph>
        </Typography>
    );
}

export default Home;