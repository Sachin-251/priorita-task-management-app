"use client";
import React from 'react'
import { useGlobalState } from '../context/GlobalContextProvider';
import Tasks from '../components/Tasks/Tasks';

function page() {

const {importantTasks} = useGlobalState();

  return (
    <Tasks title='Important Tasks' tasks={importantTasks} />
  )
}

export default page