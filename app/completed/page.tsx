"use client";
import React from 'react'
import { useGlobalState } from '../context/GlobalContextProvider';
import Tasks from '../components/Tasks/Tasks';

function page() {

  const {completedTasks} = useGlobalState();

  return (
    <Tasks title='Completed tasks' tasks={completedTasks} />
  )
}

export default page