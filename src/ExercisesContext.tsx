import React, { useReducer, Reducer, ReactNode } from 'react';

export type Exercise = {
    id: number;
    name: string;
    weight:number;
} 

export type ExerciseWithoutId = {
    name: string;
    weight: number;
}

type ExerciseState = {
    id: number;
    exercises: Exercise[];
}
  
type ExerciseAction = 
  | { type: 'remove', id: number }
  | { type: 'add', exercise: ExerciseWithoutId}
  | { type: 'edit', exercise: Exercise}

const exerciseReducer = (state: ExerciseState, action: ExerciseAction) => {
  switch(action.type) {
    case 'remove':
      return {
        ...state,
        exercises: state.exercises.filter(e => e.id !== action.id)
      };
    case 'add':
      let newId = state.id + 1;
      return {
        ...state,
        id: newId,
        exercises: state.exercises.concat({
          id: newId,
          ...action.exercise
        })
      };
    case 'edit':
      return {
        ...state,
        exercises: state.exercises.map((exercise, index, array) => {
          if (exercise.id === action.exercise.id) {
            return action.exercise;
          }
          return exercise;
        })
      };
    default: 
      throw new Error();
  }
}

export const ExercisesContext = React.createContext<[ExerciseState, React.Dispatch<ExerciseAction>]>([{id : 0, exercises: []}, () => {}]);

type Props = {
    children: ReactNode
}

export const ExercisesContextProvider = (props: Props) => {
    const [exercisesDB, dispatchExercises] = useReducer<Reducer<ExerciseState, ExerciseAction>>(exerciseReducer, {
        id: 2,
        exercises: [
          {
            id: 0,
            name: 'Bench Press',
            weight: 90,
          },
          {
            id: 1,
            name: 'Squat',
            weight: 110,
          },
          {
            id: 2,
            name: 'Deadlift',
            weight: 150,
          },
        ], 
    });

    return (
        <ExercisesContext.Provider value={[exercisesDB, dispatchExercises]}>
            {props.children}
        </ExercisesContext.Provider>
    );
} 