import React, { useState } from 'react';
import './App.css';
import { Route, Link } from "react-router-dom";
import { Layout, Menu } from 'antd';

import Home from './Home';
import ExerciseTable from './ExerciseTable';
import OneRMCalculator from './OneRMCalculator';
import { ExercisesContextProvider } from './ExercisesContext';
import CreateProgramForm from './CreateProgramForm';
import { ProgramContextProvider } from './ProgramContext';
import CurrentProgram from './CurrentProgram';

const { Header, Content, Footer, Sider } = Layout;

type Theme = "light" | "dark" 

const App = () => {
  const [theme, setTheme] = useState<Theme>( "light" );

  return (
    <div className="App">
      <Layout >
        {/*<Header style={{ background: '#fff', padding: 0 }} />*/}
        <Content >
          <Layout style={{ padding: '24px 0', background: '#fff' }}>
            <Sider
              width={200} 
              style={{ background: '#fff' }}
            >
              <Menu 
                theme={theme} 
                mode="inline"
                style={{ height: '100%' }}
              >
                <Menu.Item key="1">
                  <Link to="/">Home</Link>
                </Menu.Item>

                <Menu.Item key="2">
                  <Link to="/exercises/">Exercise weights</Link>
                </Menu.Item>

                <Menu.Item key="3">
                  <Link to="/create-program/">Create new program</Link>
                </Menu.Item>

                <Menu.Item key="4">
                  <Link to="/current-program/">Current program</Link>
                </Menu.Item>

                <Menu.Item key="5">
                  <Link to="/OneRM-calculator/">One rep max calculator</Link>
                </Menu.Item>
              </Menu>
            </Sider>

            <Content style={{ padding: '0 24px', minHeight: 280 }}>
              <ExercisesContextProvider>
                <ProgramContextProvider>

                  <Route exact path="/" component={Home} />
                  <Route path="/exercises/" render={props => <ExerciseTable />} />
                  <Route path="/create-program/" render={props => <CreateProgramForm />} />
                  <Route path="/current-program/" render={props => <CurrentProgram /> } />
                  <Route path="/OneRM-calculator/" render={props => <OneRMCalculator/>} />

                </ProgramContextProvider>
              </ExercisesContextProvider>
            </Content>
          </Layout>
        </Content>

        <Footer style={{ textAlign: 'center', background: '#fff' }}></Footer>
      </Layout>
    </div>
  );
}

export default App;
