import { CardContent, Grid, Icon, Paper, Typography } from "@mui/material";
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
  },
  {
    id: 2,
    title: "Push ups",
    description: "Upper body push and pull exercises",
    thumbnail: "/img/chest-2.png",
  },
  {
    id: 3,
    title: "Clap Push ups",
    description: "Upper body push and pull exercises",
    thumbnail: "/img/chest-3.png",
  },
];

const selectedExercises = [
  {
    id: 4,
    title: "Dumbell Bench Flys",
    description: "Upper body push and pull exercises",
    thumbnail: "/img/chest-4.png",
  },
  {
    id: 5,
    title: "Bench Press",
    description: "Upper body push and pull exercises",
    thumbnail: "/img/chest-5.png",
  },
  {
    id: 6,
    title: "Dumbell Bench Press",
    description: "Upper body push and pull exercises",
    thumbnail: "/img/chest-6.png",
  },
  {
    id: 7,
    title: "Dumbell Flys",
    description: "Upper body push and pull exercises",
    thumbnail: "/img/chest-7.png",
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
          <div className="container canvas grid grid-cols-6 gap-4">
            <GridDropZone
              className="dropzone left col-span-5"
              id="left"
              boxesPerRow={3}
              rowHeight={200}
            >
              {items.left.map((item) => (
                <GridItem key={item.id} className="grid justify-center">
                  <div className="grid-item">
                    <div className="grid-item-content relative">
                      <div className="absolute z-50 right-0 left-0 top-0 bottom-0"></div>
                      <img src={item.thumbnail} />
                    </div>
                  </div>
                </GridItem>
              ))}
            </GridDropZone>
            <GridDropZone
              className="dropzone right col-span-1"
              id="right"
              boxesPerRow={1}
              rowHeight={180}
              // style={{ overflowY: "auto", overflowX: "hidden" }}
            >
              {items.right.map((item) => (
                <GridItem key={item.id} className="grid justify-center">
                  <div className="grid-item">
                    <div className="grid-item-content relative">
                      <div className="absolute z-50 right-0 left-0 top-0 bottom-0"></div>
                      <img src={item.thumbnail} />
                    </div>
                  </div>
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
