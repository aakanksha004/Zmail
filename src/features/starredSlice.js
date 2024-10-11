// starredSlice.js
import { createSlice } from '@reduxjs/toolkit';

const starredSlice = createSlice({
  name: 'starred',
  initialState: {
    starredEmails: [], // Initialize with an empty array
  },
  reducers: {
    addStarredEmail: (state, action) => {
      // Check if email already exists in the starredEmails
      const exists = state.starredEmails.find(email => email.email === action.payload.email);
      if (!exists) {
        state.starredEmails.push(action.payload); // Add email to starred list
      }
    },
    removeStarredEmail: (state, action) => {
      // Remove email from starredEmails by filtering it out
      state.starredEmails = state.starredEmails.filter(email => email.email !== action.payload.email);
    },
  },
});

// Export actions
export const { addStarredEmail, removeStarredEmail } = starredSlice.actions;

// Selector to get starred emails
export const selectStarredEmails = (state) => state.starred.starredEmails;

export default starredSlice.reducer;

