"use client";
import React, { useContext } from 'react'
import { GlobalContext } from '../context/GlobalContextProvider';
import Tasks from '../components/Tasks/Tasks';

function Completed() {

  const {completedTasks} = useContext(GlobalContext);

  return (
    <Tasks title='Completed tasks' tasks={completedTasks} />
  )
}

export default Completed