"use client";
import React, { useContext } from 'react'
import Tasks from '../components/Tasks/Tasks';
import { GlobalContext } from '../context/GlobalContextProvider';

function Incompleted() {

  const {incompleteTasks} = useContext(GlobalContext);

  return (
    <Tasks title='Incomplete tasks' tasks={incompleteTasks} />
  )
}

export default Incompleted