"use client";
import React from 'react'
import Tasks from '../components/Tasks/Tasks';
import { useGlobalState } from '../context/GlobalContextProvider';

function page() {

  const {incompleteTasks} = useGlobalState();

  return (
    <Tasks title='Incomplete tasks' tasks={incompleteTasks} />
  )
}

export default page