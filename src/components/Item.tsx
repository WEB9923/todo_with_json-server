import {Fragment, JSX} from "react";
import {BsTrash} from "react-icons/bs";
import {HiOutlinePencilSquare} from "react-icons/hi2";
import {AnimatePresence, motion} from "framer-motion";
export default function Item({ todo, id, date, truncate, deleteTodo }:
   {
      todo: string,
      id: string,
      date: string,
      truncate: (str: string, len: number) => string,
      deleteTodo: (id: string) => void
   }
): JSX.Element {
   return (
      <Fragment>
         <AnimatePresence>
            <motion.div
               initial={{
                  scale: 0
               }} animate={{
                  scale: 1
               }} transition={{
                  duration: 0.2,
                  type: "spring",
                  stiffness: 70
               }} exit={{
                  scale: 0
               }}
               className="w-full min-h-[40px] py-1 max-h-16 rounded-md bg-emerald-100 flex items-center gap-2 px-2 my-1"
            >
               <div className="flex-1 flex flex-col">
                  <p className={"text-emerald-500 font-medium"}>
                     {truncate(todo, 45)}
                  </p>
                  <time className={"text-[11px] text-emerald-600"}>{date}</time>
               </div>
               <div className="flex items-center gap-2">
                  <button className={"text-purple-500"}>
                     <HiOutlinePencilSquare size={22}/>
                  </button>
                  <button
                     className={"text-red-500"}
                     onClick={() => {deleteTodo(id)}}
                  >
                     <BsTrash size={22}/>
                  </button>
               </div>
            </motion.div>
         </AnimatePresence>
      </Fragment>
   )
}
