import { useState, useEffect } from "react";
import "./Create_Task.css";
import axios from 'axios'
import { useNavigate } from 'react-router-dom'
import { jwtDecode } from 'jwt-decode';

const Create_Task = () => {

  const Navigate = useNavigate();

  // State
  const [taskTitle, setTaskTitle] = useState('');
  const [endDate, setEndDate] = useState('');
  const [priority, setPriority] = useState('');
  const [category, setCategory] = useState('');
  const [taskDesc, setTaskDesc] = useState('');
  const [userID, setUserID] = useState('');

  //Functions
  const handleSubmit = async (e) => {
    e.preventDefault();
    // Validate the form fields (you may add more validation logic)
    if (!taskTitle || !endDate || !priority || !category) {
      console.error("Please fill in all required fields.");
      return;
    }
    const startdate = new Date().toISOString().substring(0, 10);
    const enddate = endDate.substring(0, 10);
    // Convert string dates to Date objects
    const startDateObj = new Date(startdate);
    const endDateObj = new Date(enddate);
    // Check if endDate is greater than startDate
    if (endDateObj < startDateObj) {
      console.error("End date must be greater than the start date.");
      return;
    }

    try {
      // Send the form data to the server
      await axios.post('http://localhost:3000/user/add', {
        UserId: userID,
        Title: taskTitle,
        EndDate: endDate,
        Priority: priority,
        Category: category,
        TaskDesc: taskDesc,
      }).then(() => {
        Navigate('/user')
      });
    } catch (error) {
      console.error("Error adding task:", error);
    }
  };

  useEffect(() => {
    // Get the token from localStorage
    const token = localStorage.getItem('token');
    if (token) {
      try {
        // Decode the token to get the user ID
        const decodedToken = jwtDecode(token);
        const userId = decodedToken.user.id;
        setUserID(userId);
      } catch (error) {
        console.error('Error decoding token:', error);
      }
    }
  }, []);

  return (
    <div className="Create-task-container">
      <form className="cont" onSubmit={handleSubmit}>
        <div className="title">
          <p>Create Your Task</p>
        </div>
        <div className="input-field">
          <label htmlFor="Task-Title">Task-Title</label>
          <br />
          <input type="text" id="Task-Title" placeholder="Task-Title" name="Title" value={taskTitle} onChange={(e) => setTaskTitle(e.target.value)} />
        </div>
        <div className="input-field">
          <label htmlFor="End-date">End-Date</label>
          <br />
          <input type="date" name="EndDate" id="End-date" placeholder="End-Date" value={endDate} onChange={(e) => setEndDate(e.target.value)} />
        </div>
        <div className="input-field">
          <label htmlFor="Priority">Priority</label>
          <br />
          <select type="text" name="Priority" id="Priority" defaultValue="Default" onChange={(e) => setPriority(e.target.value)}>
            <option value="Default" disabled>Choose Priority</option>
            <option value="Very Important">Very Important</option>
            <option value="Important">Important</option>
            <option value="Less Important">Less Important</option>
          </select>
        </div>
        <div className="input-field">
          <label htmlFor="Category">Category</label>
          <br />
          <select type="text" name="Category" id="Priority" defaultValue="Default" onChange={(e) => setCategory(e.target.value)}>
            <option value="Default" disabled>Choose Category</option>
            <option value="Daily Task">Daily Task</option>
            <option value="Weekly Task">Weekly Task</option>
            <option value="Monthly Task">Monthly Task</option>
          </select>
        </div>
        <div className="Text-Area">
          <label htmlFor="Task-desc">Priority level</label>
          <br />
          <textarea
            name="TaskDesc"
            id="Task-desc"
            cols="30"
            rows="10"
            placeholder="Write important notes"
            className="Task-desc"
            value={taskDesc}
            onChange={(e) => setTaskDesc(e.target.value)}
          ></textarea>
        </div>
        <div className="confirm-btn-cnt">
          <button className="confirm-btn" type="submit">Add to List</button>
        </div>
      </form>
    </div>
  );
};

export default Create_Task;