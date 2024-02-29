import { Card, CardContent, Grid, Icon, Paper, Typography } from "@mui/material";
import MDBox from "components/MDBox";
import Footer from "examples/Footer";
import DashboardLayout from "examples/LayoutContainers/DashboardLayout";
import DashboardNavbar from "examples/Navbars/DashboardNavbar";
import _ from "lodash";
import React, { useState } from "react";
// import { DragDropContext, Draggable, Droppable } from "react-beautiful-dnd";
import { GridContextProvider, GridDropZone, GridItem, move, swap } from "react-grid-dnd";
import "./styles.css";

const exercises = [
  {
    id: 1,
    title: "Inclined Bench Press",
    description: "Upper body push and pull exercises",
    thumbnail: "/img/chest-1.png",
    draggable: true
  },
  {
    id: 2,
    title: "Push ups",
    description: "Upper body push and pull exercises",
    thumbnail: "/img/chest-2.png",
    draggable: true
  },
  {
    id: 3,
    title: "Clap Push ups",
    description: "Upper body push and pull exercises",
    thumbnail: "/img/chest-3.png",
    draggable: true
  },
];

const selectedExercises = [
  {
    id: 4,
    title: "Dumbell Bench Flys",
    description: "Upper body push and pull exercises",
    thumbnail: "/img/chest-4.png",
    draggable: true
  },
  {
    id: 5,
    title: "Bench Press",
    description: "Upper body push and pull exercises",
    thumbnail: "/img/chest-5.png",
    draggable: true
  },
  {
    id: 6,
    title: "Dumbell Bench Press",
    description: "Upper body push and pull exercises",
    thumbnail: "/img/chest-6.png",
    draggable: true
  },
  {
    id: 7,
    title: "Dumbell Flys",
    description: "Upper body push and pull exercises",
    thumbnail: "/img/chest-7.png",
    draggable: true
  },
];

const Exercises = () => {
  const [items, setItems] = useState({
    left: [...selectedExercises],
    right: [...exercises],
  });

  const onChange = (sourceId, sourceIndex, targetIndex, targetId) => {
    if (targetId) {
      const result = move(items[sourceId], items[targetId], sourceIndex, targetIndex);
      return setItems({
        ...items,
        [sourceId]: result[0],
        [targetId]: result[1],
      });
    }

    const result = swap(items[sourceId], sourceIndex, targetIndex);
    return setItems({
      ...items,
      [sourceId]: result,
    });
  };

  return (
    <DashboardLayout>
      <DashboardNavbar />

      <MDBox py={3}>
        <GridContextProvider onChange={onChange}>
          <div className="flex gap-4 w-full h-[600px] overflow-auto py-4">
            <GridDropZone
              className="w-[70%]"
              id="left"
              boxesPerRow={3}
              rowHeight={220}
            >
              {items.left.map((item, index) => (
                <GridItem key={item.id} className="grid justify-start">
                  <Card className="w-[200px] h-[200px] relative">
                    <div className="absolute z-50 right-0 left-0 top-0 bottom-0"></div>

                    <div className="flex flex-col justify-between h-full">

                      <div className="text-sm flex items-center gap-2 p-2">
                        <b>{index + 1}.</b>
                        <b>{item.title}</b>
                      </div>

                      <div className="grid justify-center items-center pb-2">
                        <img src={item.thumbnail} className="h-[150px] w-fit" />
                      </div>
                    </div>
                  </Card>
                </GridItem>
              ))}
            </GridDropZone>
            <GridDropZone
              className="w-[30%]"
              id="right"
              boxesPerRow={1}
              rowHeight={220}
            // style={{ overflowY: "auto", overflowX: "hidden" }}
            >
              {items.right.map((item) => (
                <GridItem key={item.id} className="grid justify-end">
                  <Card className="w-[200px] h-[200px] relative">
                    <div className="absolute z-50 right-0 left-0 top-0 bottom-0"></div>
                    <img src={item.thumbnail} />
                  </Card>
                </GridItem>
              ))}
            </GridDropZone>
          </div>
        </GridContextProvider>
      </MDBox>
      <Footer />
    </DashboardLayout>
  );
};

export default Exercises;
