import { createSlice } from "@reduxjs/toolkit";
import { courses, enrollments } from "../Database";
import { v4 as uuidv4 } from "uuid";

const getInitialEnrollments = () => {
  if (typeof window !== "undefined") {
    const storedEnrollments = sessionStorage.getItem("enrollments");
    return storedEnrollments ? JSON.parse(storedEnrollments) : enrollments;
  }
  return enrollments;
};

const initialState = {
  courses: courses,
  enrollments: getInitialEnrollments(),
};

const coursesSlice = createSlice({
  name: "courses",
  initialState,
  reducers: {
    setCourses: (state, action) => {
      state.courses = action.payload;
    },
    addCourse: (state, { payload: course }) => {
      const newCourse: any = {
        _id: course._id || uuidv4(),
        name: course.name,
        number: course.number,
        startDate: course.startDate,
        endDate: course.endDate,
        department: course.department,
        credits: course.credits,
        description: course.description,
        image: course.image,
      };
      state.courses = [...state.courses, newCourse] as any;
    },
    deleteCourse: (state, { payload: courseId }) => {
      state.courses = state.courses.filter((c: any) => c._id !== courseId);
    },
    updateCourse: (state, { payload: course }) => {
      state.courses = state.courses.map((c: any) =>
        c._id === course._id ? course : c
      ) as any;
    },
    editCourse: (state, { payload: courseId }) => {
      state.courses = state.courses.map((c: any) =>
        c._id === courseId ? { ...c, editing: true } : c
      ) as any;
    },
    enroll: (state, { payload: { user, course } }) => {
      const newEnrollment = {
        _id: uuidv4(),
        user: user._id,
        course: course._id,
      };
      state.enrollments = [...state.enrollments, newEnrollment];
      if (typeof window !== "undefined") {
        sessionStorage.setItem("enrollments", JSON.stringify(state.enrollments));
      }
    },
    unenroll: (state, { payload: { user, course } }) => {
      state.enrollments = state.enrollments.filter(
        (e: { user: any; course: any }) =>
          !(e.course === course._id && e.user === user._id)
      );
      if (typeof window !== "undefined") {
        sessionStorage.setItem("enrollments", JSON.stringify(state.enrollments));
      }
    },
  },
});

export const {
  addCourse,
  deleteCourse,
  updateCourse,
  editCourse,
  enroll,
  unenroll,
  setCourses,
} = coursesSlice.actions;
export default coursesSlice.reducer;