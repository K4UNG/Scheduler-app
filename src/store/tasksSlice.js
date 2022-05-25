import { createSlice } from "@reduxjs/toolkit";

const tasksSlice = createSlice({
  name: "tasks",
  initialState: {
    schedules: {
      "new schedule": [],
    },
    mode: "Inspect",
    current: "new schedule",
    selected: null,
  },
  reducers: {
    replaceTasks(state, action) {
      return action.payload
    },
    addTask(state, action) {
      state.schedules[state.current].push(action.payload);
    },
    changeMode(state, action) {
      state.mode = action.payload;
    },
    changeSelected(state, action) {
      if (state.selected === action.payload) {
        state.selected = null;
      } else {
        state.selected = action.payload;
      }
    },
    addTime(state, action) {
      const { id, time } = action.payload;
      state.schedules[state.current].forEach((task) => {
        if (task.times.includes(time)) {
          task.times = task.times.filter((curr) => curr !== time);
        }
        if (task.id === id) {
          task.times.push(time);
        }
      });
    },
    removeTime(state, action) {
      const { id, time } = action.payload;
      const task = state.schedules[state.current].find(
        (item) => item.id === id
      );
      task.times = task.times.filter((tm) => tm !== time);
    },
    updateTask(state, action) {
      const { title, color, description, id } = action.payload;
      state.schedules[state.current] = state.schedules[state.current].map(
        (task) => {
          if (task.id === id) {
            return {
              id,
              title,
              color,
              description,
              times: task.times,
            };
          }
          return task;
        }
      );
    },
    removeTask(state, action) {
      if (state.selected === action.payload) {
        state.selected = null
      }
      state.schedules[state.current] = state.schedules[state.current].filter(
        (task) => {
          return task.id !== action.payload;
        }
      );
    },
    addSchedule(state, action) {
      state.schedules[action.payload] = [];
      state.current = action.payload;
      state.selected = null;
    },
    changeSchedule(state, action) {
      state.current = action.payload
    },
    removeSchedule(state, action) {
      delete state.schedules[action.payload]
      state.current = Object.keys(state.schedules)[0]
      state.selected = null
    }
  },
});

export const tasksActions = tasksSlice.actions;

export default tasksSlice.reducer;
