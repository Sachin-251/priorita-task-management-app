"use client";
import React, { useContext } from 'react'
import { GlobalContext } from '../context/GlobalContextProvider';
import Tasks from '../components/Tasks/Tasks';

function Important() {

const {importantTasks} = useContext(GlobalContext);

  return (
    <Tasks title='Important Tasks' tasks={importantTasks} />
  )
}

export default Important