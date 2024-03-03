import { Card, CardContent, Grid, Icon, Paper, Typography } from "@mui/material";
import MDBox from "components/MDBox";
import Footer from "examples/Footer";
import DashboardLayout from "examples/LayoutContainers/DashboardLayout";
import DashboardNavbar from "examples/Navbars/DashboardNavbar";
import _ from "lodash";
import React, { useEffect, useState } from "react";
// import { DragDropContext, Draggable, Droppable } from "react-beautiful-dnd";
import { GridContextProvider, GridDropZone, GridItem, move, swap } from "react-grid-dnd";
import "./styles.css";
import ExerciseForm from "./form";
import { getExercises } from "services/exercises";
import { useParams } from "react-router-dom";
import { setToast } from "context";
import { useMaterialUIController } from "context";
import Notification from "components/Notification";
import MDButton from "components/MDButton";

const exercises = [
  {
    id: 1,
    title: "Inclined Bench Press",
    description: "Upper body push and pull exercises",
    thumbnail: "/img/chest-1.png",
    draggable: true,
  },
  {
    id: 2,
    title: "Push ups",
    description: "Upper body push and pull exercises",
    thumbnail: "/img/chest-2.png",
    draggable: true,
  },
  {
    id: 3,
    title: "Clap Push ups",
    description: "Upper body push and pull exercises",
    thumbnail: "/img/chest-3.png",
    draggable: true,
  },
];

const selectedExercises = [
  {
    id: 4,
    title: "Dumbell Bench Flys",
    description: "Upper body push and pull exercises",
    thumbnail: "/img/chest-4.png",
    draggable: true,
  },
  {
    id: 5,
    title: "Bench Press",
    description: "Upper body push and pull exercises",
    thumbnail: "/img/chest-5.png",
    draggable: true,
  },
  {
    id: 6,
    title: "Dumbell Bench Press",
    description: "Upper body push and pull exercises",
    thumbnail: "/img/chest-6.png",
    draggable: true,
  },
  {
    id: 7,
    title: "Dumbell Flys",
    description: "Upper body push and pull exercises",
    thumbnail: "/img/chest-7.png",
    draggable: true,
  },
];

const NoExercises = ({ onOpen }) => (
  <Grid container spacing={3}>
    <Grid item xs={12} md={6} lg={3}>
      <Paper
        variant="outlined"
        className="rounded-xl w-full h-[280px] p-4 flex flex-col items-center justify-center gap-4"
      >
        <div className="flex flex-col items-center justify-center gap-4 border border-gray-300 rounded-lg p-8">
          <Typography>Add an exercise now!</Typography>
          <MDButton size="small" variant="gradient" color="primary" onClick={onOpen}>
            <Icon>add</Icon>&nbsp;Add New
          </MDButton>
        </div>
      </Paper>
    </Grid>
  </Grid>
);

const Exercises = () => {
  const [items, setItems] = useState({
    left: [],
    right: [],
  });
  const [, dispatch] = useMaterialUIController();
  const [openExerciseForm, setOpenExerciseForm] = useState(false);
  const [selectedExercise, setSelectedExercise] = useState({});
  const [loading, setLoading] = useState(false);
  const [noExercises, setNoExercises] = useState(false);
  const { workoutId } = useParams();

  useEffect(() => {
    getExercisesData();
  }, []);

  const getExercisesData = async (options = {}) => {
    setLoading(true);
    try {
      options.workoutId = workoutId;
      const response = await getExercises(options);
      setNoExercises(_.isEmpty(response.data));
      setItems((prev) => ({
        ...prev,
        right: response.data,
      }));
    } catch (error) {
      setToast(
        dispatch,
        <Notification
          open={true}
          type="error"
          title="Something went wrong!"
          content={error?.message}
        />
      );
    }
    setLoading(false);
  };

  const closeExerciseForm = () => {
    setOpenExerciseForm(false);
    setSelectedExercise({});
    getExercisesData();
  };

  const handleOpenExerciseForm = () => {
    setOpenExerciseForm(true);
  };

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
      <DashboardNavbar onAddNew={handleOpenExerciseForm} />
      {noExercises && <NoExercises onOpen={handleOpenExerciseForm} />}
      <ExerciseForm
        open={openExerciseForm}
        exercise={selectedExercise}
        onClose={closeExerciseForm}
      />

      <MDBox py={3}>
        <div className="flex items-center gap-4">
          {!noExercises && (
            <Typography variant="h4" className="w-[70%]">
              Selected Exercises
            </Typography>
          )}
          {!noExercises && (
            <Typography variant="h4" className="w-[30%]">
              Exercise List
            </Typography>
          )}
        </div>
        {!noExercises && (
          <GridContextProvider onChange={onChange}>
            <div className="flex gap-4 w-full py-4 h-[620px] overflow-y-auto">
              <GridDropZone
                className="border border-gray-300 rounded-lg bg-white w-[70%] p-4"
                id="left"
                boxesPerRow={3}
                rowHeight={220}
              >
                {items.left.map((item, index) => (
                  <GridItem key={item.id} className="grid justify-start w-auto">
                    <Paper variant="outlined" className="w-[200px] h-[200px] relative shadow-lg">
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
                    </Paper>
                  </GridItem>
                ))}
              </GridDropZone>
              <GridDropZone
                className="bg-white border border-gray-300 flex flex-col items-center p-4 rounded-lg w-[30%] relative"
                id="right"
                boxesPerRow={1}
                rowHeight={220}
                // style={{ overflowY: "auto", overflowX: "hidden" }}
              >
                {items.right.map((item) => (
                  <GridItem key={item.id} className="grid justify-center" style={{ width: "auto" }}>
                    <Paper variant="outlined" className="w-[200px] h-[200px] relative shadow-lg">
                      <div className="absolute z-50 right-0 left-0 top-0 bottom-0"></div>
                      <img src={item.thumbnail} />
                    </Paper>
                  </GridItem>
                ))}
              </GridDropZone>
            </div>
          </GridContextProvider>
        )}
      </MDBox>
      <Footer />
    </DashboardLayout>
  );
};

export default Exercises;
