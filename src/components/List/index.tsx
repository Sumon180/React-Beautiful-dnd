import React from "react";
import {
  Droppable,
  DroppableProvided,
  DroppableStateSnapshot,
} from "react-beautiful-dnd";

type ListProps = {
  children?: React.ReactNode;
  title: string;
  section1Color: string,
  name: string;
};

const List = ({ children,section1Color, title, name }: ListProps) => {
  return (
    <div className="flex flex-col w-full h-[45rem]">
      <h2 className="text-2xl font-bold mb-2 mx-5">{title}</h2>
      <div className="h-full">
        <Droppable droppableId={name}>
          {(provided: DroppableProvided, snapshot: DroppableStateSnapshot) => (
            <div ref={provided.innerRef} className="h-full">
              <div className={`p-5 rounded-md min-h-max bg-rose-200 mx-2 gap-y-3 flex flex-col h-full ${section1Color}`}>
                {children}
                {provided.placeholder}
              </div>
            </div>
          )}
        </Droppable>
      </div>
    </div>
  );
};

export default List;
