import React, {Fragment, JSX, useEffect, useState} from "react";
import Form from "../components/Form.tsx";
import axios from "axios";
import {v4 as uuidv4} from "uuid";
import Item from "../components/Item.tsx";
interface Idata {
   id: string,
   todo: string,
   date: string
}
export default function TodoPage(): JSX.Element {
   const [todo, setTodo] = useState<string>("");
   const [data, setData] = useState<Idata[] | null>(null);
   const [isLoading, setIsLoading] = useState<boolean>(false);
   const submitForm = async (e: React.SyntheticEvent | any): Promise<void | boolean> => {
      e.preventDefault();
      if(e.target.children[0].value === ""
         || e.target.children[0].value === null
         || e.target.children[0].value === undefined
      ) {
         return false;
      }
      const date: Date = new Date();
      const y: string = date.getFullYear().toString();
      let m: string = date.getMonth().toString();
      let d: string = date.getDay().toString();
      if(+m < 10 || +d < 10) {
         m = m.padStart(2, "0");
         d = d.padStart(2, "0");
      }
      try {
         const res = await axios.post("http://localhost:8080/todos", {
            id: uuidv4(),
            todo,
            date: `${y}:${m}:${d}`
         });
         if(res) {
            console.log("added successfully");
         }
      } catch (err) {
         console.error(err);
      }
   }
   const change = (e: React.ChangeEvent<HTMLInputElement>): void => {
      setTodo(e.target.value);
   }
   const getAllTodo = async (): Promise<void> => {
      try {
         setIsLoading(true);
         const res = await axios.get("http://localhost:8080/todos");
         if(res)
            setData(res.data);
      } catch (err) {
         console.error(err);
      } finally {
         setIsLoading(false);
      }
   }
   const deleteTodo = async (id: string): Promise<void> => {
      try {
         const res = await axios.delete(`http://localhost:8080/todos/${id}`);
         if(res)
            console.log("deleted successfully");
      } catch (err) {
         console.error(err);
      }
   }
   const truncate = (str: string, len: number): string => {
      return str.length > len ? str.slice(0, len) + "..." : str;
   }
   useEffect(() => {
      getAllTodo();
   },[]);
   return (
      <Fragment>
         <div className="w-full h-screen flex justify-center">
            <div className="md:w-[450px] w-[400px]">
               <Form
                  change={change}
                  todo={todo}
                  submitForm={submitForm}
               />
               <div className="mt-2 h-[calc(100vh-80px)] overflow-y-auto">
                  {isLoading
                     ? <p className={"text-center text-red-500 capitalize font-bold"}>loading...</p>
                     : data?.map((items) => (
                     <Item
                        key={items.id}
                        date={items.date}
                        todo={items.todo}
                        id={items.id}
                        truncate={truncate}
                        deleteTodo={deleteTodo}
                     />
                  ))}
               </div>
            </div>
         </div>
      </Fragment>
   )
}
