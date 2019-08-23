import React, { useState, useContext } from 'react';
import { Icon, Button, Table, Row, Modal } from 'antd';
import { ColumnProps } from 'antd/es/table';

import ExerciseForm from './ExerciseForm';
import AddExerciseForm from './AddExerciseForm';
import { ExercisesContext, Exercise, ExerciseWithoutId } from './ExercisesContext';

class ExerciseTable extends Table<Exercise> { }

const Exercises = () => {

  const [exerciseDB, dispatchExercises] = useContext(ExercisesContext);
  
  const columns: ColumnProps<Exercise>[] = [
    {
      key: 'name',
      title: 'Exercise Name',
      dataIndex: 'name',
    },
    {
      key: 'weight',
      title: 'Weight',
      dataIndex: 'weight',
    },
    {
      title: '',
      key: 'edit',
      render: (record: Exercise) => (
        <Row type="flex" justify="space-around">
            <Icon type="edit" onClick={() => {showExerciseForm(record)}}/>
            <Icon type="close" onClick={() => {handleRemove(record.id)}}/>
        </Row>
      ),
    },
  ]

  const [addExerciseForm, setAddExerciseForm] = useState(false);
  const [exerciseForm, setExerciseForm] = useState({
    visible: false,
    id: 0,
    name: '',
    weight: 0,
  })

  const handleRemove = (id: number) => {
    const { confirm } = Modal;
    confirm({
      title: 'Do you Want to delete this exercise?',
      //content: 'Some descriptions',
      onOk() {
        dispatchExercises({type: 'remove', id: id});
      },
      onCancel() { },
    });
  };
  

  const handleEdit = (exercise: ExerciseWithoutId) => {
    dispatchExercises({type: 'edit',  exercise: {...exercise, id: exerciseForm.id}});
    setExerciseForm({
      visible: false,
      id: 0,
      name: '',
      weight: 0,
    })
  }

  const handleCancel = () => {
    setExerciseForm({
      visible: false,
      id: 0,
      name: '',
      weight: 0,
    })
  }

  const showExerciseForm = (exercise: Exercise) => {
    setExerciseForm({
      visible: true,
      id: exercise.id,
      name: exercise.name,
      weight: exercise.weight,
    });
  }

  const handleAdd = (exercise: ExerciseWithoutId) => {
    dispatchExercises({type: 'add', exercise});
    setAddExerciseForm(false);
  };

  const handleAddExerciseFormCancel = () => {
    setAddExerciseForm(false);
  }

  const showAddExerciseForm = () => {
    setAddExerciseForm(true);
  }

  return (
    <>
      <ExerciseTable columns={columns} dataSource={exerciseDB.exercises} pagination={false} />
      <Row type="flex" justify="end">
        <Button type="primary" 
                size="large" 
                onClick={showAddExerciseForm}
                style={{
                  margin: '20px',
                }}
        >
          Add Exercise<Icon type="plus" />
        </Button>
      </Row>
      <AddExerciseForm visible={addExerciseForm}
                        onCancel={handleAddExerciseFormCancel}
                        onSubmit={handleAdd}
      />
      <ExerciseForm visible={exerciseForm.visible} 
                    onCancel={handleCancel} 
                    onSubmit={handleEdit} 
                    exerciseName={exerciseForm.name} 
                    exerciseWeight={exerciseForm.weight}
      />
    </>
  );
}

export default Exercises;