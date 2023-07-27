import Card from "../Card/index";
import List from "../List/index";
import {
  DragDropContext,
  Draggable,
  DraggableProvided,
  DraggableStateSnapshot,
} from "react-beautiful-dnd";
import { useState } from "react";

const Incorporate = () => {
  const itemsNormal = {
    available: [
      {
        id: 1,
        uuid: "52f9df20-9393-4c4d-b72c-7bfa4398a4477",
        title: "What is Lorem Ipsum?",
        subtitle: "Lorem Ipsum is simply dummy",
        cardColor: "bg-rose-300",
        updatedAt: "6 days ago",
      },
      {
        id: 2,
        uuid: "52f9df20-9393-4c4d-b72c-7bfa4398a448",
        title: "Why do we use it?",
        subtitle: "The point of using at its layout",
        cardColor: "bg-rose-300",
        updatedAt: "2 days ago",
      },
      {
        id: 3,
        uuid: "52f9df20-9393-4c4d-b72c-7bfa4398a449",
        title: "Where does it come from?",
        subtitle: "Contrary to popular belief, Lorem Ipsum is not simply",
        cardColor: "bg-rose-300",
        updatedAt: "3 days ago",
      },
    ],

    assigned: [
      {
        id: 5,
        uuid: "52f9df20-9393-4c4d-b72c-7bfa4398a450",
        title: "Where can I get some?",
        subtitle: "There are many variations",
        cardColor: "bg-yellow-300",
        updatedAt: "6 days ago",
      },
      {
        id: 6,
        uuid: "52f9df20-9393-4c4d-b72c-7bfa4398a451",
        title: "Morbi sagittis tellus a efficitur",
        subtitle: "Etiam mollis eros eget mi.",
        cardColor: "bg-yellow-300",
        updatedAt: "2 days ago",
      },
    ],
    tested: [
      {
        id: 7,
        uuid: "52f9df20-9393-4c4d-b72c-7bfa4398a460",
        title: "Where can I get some?",
        subtitle: "There are many variations",
        cardColor: "bg-green-300",
        updatedAt: "6 days ago",
      },
      {
        id: 8,
        uuid: "52f9df20-9393-4c4d-b72c-7bfa4398a461",
        title: "Morbi sagittis tellus a efficitur",
        subtitle: "Etiam mollis eros eget mi.",
        cardColor: "bg-green-300",
        updatedAt: "2 days ago",
      },
      {
        id: 9,
        uuid: "52f9df20-9393-4c4d-b72c-7bfa4398a471",
        title: "Morbi sagittis tellus a efficitur",
        subtitle: "Etiam mollis eros eget mi.",
        cardColor: "bg-green-300",
        updatedAt: "2 days ago",
      },
    ],
  };

  const [items, setItems] = useState(itemsNormal);

  const removeFromList = (list: any, index: any) => {
    const result = Array.from(list);
    const [removed] = result.splice(index, 1);
    return [removed, result];
  };

  const addToList = (list: any, index: any, element: any) => {
    const result = Array.from(list);
    result.splice(index, 0, element);
    return result;
  };

  const onDragEnd = (result: any) => {
    if (!result.destination) {
      console.log(result);
      return;
    }
    const listCopy: any = { ...items };
    const sourceList = listCopy[result.source.droppableId];
    const [removedElement, newSourceList] = removeFromList(
      sourceList,
      result.source.index
    );
    listCopy[result.source.droppableId] = newSourceList;

    const destinationList = listCopy[result.destination.droppableId];
    listCopy[result.destination.droppableId] = addToList(
      destinationList,
      result.destination.index,
      removedElement
    );
    setItems(listCopy);
  };

  const section1Color = "bg-rose-500";
  const section2Color = "bg-yellow-500";
  const section3Color = "bg-green-500";

  return (
    <>
      <DragDropContext onDragEnd={onDragEnd}>
        <div className="grid grid-cols-2 w-full p-12">
          <div className="">
            <List
              title="Section-1"
              sectionColor={section1Color}
              name="available"
            >
              {items.available.map((item, index) => (
                <Draggable
                  key={item.id}
                  draggableId={item.id + ""}
                  index={index}
                >
                  {(
                    provided: DraggableProvided | any,
                    snapshot: DraggableStateSnapshot
                  ) => (
                    <div>
                      <div
                        ref={provided.innerRef}
                        {...provided.draggableProps}
                        {...provided.dragHandleProps}
                      >
                        <Card data={item} />
                      </div>
                    </div>
                  )}
                </Draggable>
              ))}
            </List>
          </div>
          <div className="">
            <List
              title="Section-2"
              sectionColor={section2Color}
              name="assigned"
            >
              {items.assigned.map((item, index) => (
                <Draggable
                  draggableId={item.uuid + ""}
                  index={index}
                  key={item.id}
                >
                  {(provided, snapshot) => (
                    <div
                      ref={provided.innerRef}
                      {...provided.draggableProps}
                      {...provided.dragHandleProps}
                    >
                      <Card data={item} />
                    </div>
                  )}
                </Draggable>
              ))}
            </List>
          </div>
          <div className="col-span-2">
            <List title="Section-3" sectionColor={section3Color} name="tested">
              {items.tested.map((item, index) => (
                <Draggable
                  draggableId={item.uuid + ""}
                  index={index}
                  key={item.id}
                >
                  {(provided, snapshot) => (
                    <div
                      ref={provided.innerRef}
                      {...provided.draggableProps}
                      {...provided.dragHandleProps}
                    >
                      <Card data={item} />
                    </div>
                  )}
                </Draggable>
              ))}
            </List>
          </div>
        </div>
      </DragDropContext>
    </>
  );
};

export default Incorporate;
