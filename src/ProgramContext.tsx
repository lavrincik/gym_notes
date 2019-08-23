import React, { useReducer, Reducer, ReactNode } from "react";

import { Exercise } from "./ExercisesContext";

export type ProgramExercise = {
    exercise: Exercise;
    weight: {
      usePercentage: boolean;
      value: number;
    }
    sets: number;
    reps: number;
}

export type ProgramExercises = {
  [week: number]: {
    [day: number]: ProgramExercise[];
  }
}

export type Program = {
    id: number;
    name: string;
    days: number;
    weeks: number;
    exercises: ProgramExercises;
}

export type ProgramWithoutId = {
    name: string;
    days: number;
    weeks: number;
    exercises: ProgramExercises;
}

type ProgramState = {
    id: number;
    programs: Program[];
}

type ProgramAction = 
  | { type: 'remove', id: number }
  | { type: 'add', program: ProgramWithoutId}

export const ProgramContext = React.createContext<[ProgramState, React.Dispatch<ProgramAction>]>([{id : 0, programs: []}, () => {}]);

const programReducer = (state: ProgramState, action: ProgramAction) => {
    switch(action.type) {
        case 'remove':
          return {
            ...state,
            programs: state.programs.filter(e => e.id !== action.id)
          };
        case 'add':
          let newId = state.id + 1;
          return {
            ...state,
            id: newId,
            programs: state.programs.concat({
              id: newId,
              ...action.program
            })
          };
        default: 
          throw new Error();
    }
}

type Props = {
    children: ReactNode;
}

export const ProgramContextProvider = (props: Props) => {
    const [programs, dispatchPrograms] = useReducer<Reducer<ProgramState, ProgramAction>>(programReducer,{
        id: 0,
        programs: []
    }); 

    return (
        <ProgramContext.Provider value={[programs, dispatchPrograms]}>
            {props.children}
        </ProgramContext.Provider>
    );
}