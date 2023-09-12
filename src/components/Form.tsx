import {FaPlus} from "react-icons/fa";
import React, {JSX} from "react";
import {motion} from "framer-motion";
interface Iform {
   todo: string,
   submitForm: (e: React.SyntheticEvent) => void,
   change: (e: React.ChangeEvent<HTMLInputElement>) => void
}
export default function Form({ todo, submitForm, change }: Iform): JSX.Element {
   return (
      <form
         onSubmit={submitForm}
         className={"mt-2 w-full h-12 flex items-center gap-1"}
      >
         <input
            type="text"
            placeholder={"enter new todo.."}
            value={todo}
            onChange={(e) => change(e)}
            className={"rounded-md border-2 border-transparent outline-none bg-emerald-100 text-emerald-500 px-2 focus:border-emerald-500 transition duration-200 flex-1 h-full"}
         />
         <motion.button
            initial={{
               scale: 1
            }} whileTap={{
               scale: 0.9
            }} transition={{
               duration: 0.1,
               type: "spring",
               stiffness: 350
            }}
            className={"bg-emerald-500 rounded-md md:flex-[.2] flex-[.3] text-blue-100 h-full flex items-center justify-center"}
         >
            <FaPlus size={22}/>
         </motion.button>
      </form>
   )
}
