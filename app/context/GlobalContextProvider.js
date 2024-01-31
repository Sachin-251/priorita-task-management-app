"use client";

import { useEffect, useState } from "react";
import { createContext } from "react";
import themes from "./themes";
import { useContext } from "react";
import { useUser } from "@clerk/nextjs";
import axios from "axios";
import toast from "react-hot-toast";

export const GlobalContext = createContext();
export const GlobalUpdateContext = createContext();

export const GlobalContextProvider = ({children}) => {

    const { user } = useUser();
    const [selectedTheme, setSelectedTheme] = useState(0);
    const [isLoading, setIsLoading] = useState(false);
    const [modal, setModal] = useState(false);
    const [collapsed, setCollapsed] = useState(false);
    const [tasks, setTasks] = useState([]);
    const theme = themes[selectedTheme];
    
    const collapseMenu = () => {
        setCollapsed(!collapsed);
      };
    
    const openModal = () => {
        setModal(true);
    };

    const closeModal = () => {
        setModal(false);
    };
    
    const allTasks = async () => {
      setIsLoading(true);
        try {
          const res = await axios.get("/api/tasks");
          const sorted = res.data.sort((a, b) => {
            return (
              new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
            );
          });
    
          setTasks(sorted);
    
          setIsLoading(false);
        } catch (error) {
          console.log(error);
        }
      };

      const updateTask = async (task) => {
        try {
          const res = await axios.put(`/api/tasks`, task);
    
          toast.success("Task updated");
    
          allTasks();
        } catch (error) {
          console.log(error);
          toast.error("Something went wrong");
        }
      };

      const deleteTask = async (id) => {
        try {
          const res = await axios.delete(`/api/tasks/${id}`);
          toast.success("Task deleted");
    
          allTasks();
        } catch (error) {
          console.log(error);
          toast.error("Something went wrong");
        }
      };
    
      const completedTasks = tasks.filter((task) => task.isCompleted === true);
      const importantTasks = tasks.filter((task) => task.isImportant === true);
      const incompleteTasks = tasks.filter((task) => task.isCompleted === false);

      useEffect(() => {
        if(user) allTasks();
      }, [user])

    return (
        <GlobalContext.Provider value={{theme, collapsed, collapseMenu, modal, openModal, closeModal, tasks, allTasks, completedTasks, importantTasks, incompleteTasks, updateTask, deleteTask, isLoading}}>
            <GlobalUpdateContext.Provider value={{}}>
                {children}
            </GlobalUpdateContext.Provider>
        </GlobalContext.Provider>
    )
}

export const useGlobalState = () => useContext(GlobalContext);
export const useGlobalUpdate = () => useContext(GlobalUpdateContext);