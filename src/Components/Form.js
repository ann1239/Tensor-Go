import React, { useEffect, useState } from "react";
import {
  TextField,
  Button,
  MenuItem,
  Select,
  InputLabel,
  FormControl,
  Typography,
  ToggleButton,
  ToggleButtonGroup,
} from "@mui/material";
import axios from "axios";
import HeadsetMicIcon from "@mui/icons-material/HeadsetMic";
import ChatContainer from "./ChatContainer";
import "./Form.css";

const Form = () => {
  const [selectedOption, setSelectedOption] = useState("");
  const [seletedText, setSeletedText] = useState("");
  const [toggleValue, setToggleValue] = useState("form");
  const [messages, setMessages] = useState([]);

  const handleChange = (event) => {
    setSelectedOption(event.target.value);
  };

  const handleTextChange = (event) => {
    setSeletedText(event.target.value);
  };

  const handleClick = () => {
    alert("The values are " + selectedOption + " " + seletedText);
    postData();
    setSelectedOption("");
    setSeletedText("");
  };

  const handleToggle = (event, newValue) => {
    setToggleValue(newValue);
  };

  const postData = async () => {
    const url = "http://localhost:8000/api/receive-post"; // Replace with your backend URL
    const data = {
      category: selectedOption,
      comments: seletedText,
    };

    try {
      const response = await axios.post(url, data);
      console.log("Response from server:", response.data);
    } catch (error) {
      console.error("Error sending POST request:", error);
    }
  };

  const getChatData = async () => {
    const url = "http://localhost:8000/api/receive-chat"; // Replace with your backend URL

    try {
      const response = await axios.get(url);
      const conversations = response?.data?.data?.conversations;
      if (conversations) {
        const extractedMessages = conversations.map((conversation) =>
          conversation.source.body.replace(/<\/?p>/g, "")
        );
        extractedMessages.push("Waiting for the response from the intercom");
        setMessages(extractedMessages);
      }
    } catch (error) {
      console.error("Error fetching chat data:", error);
    }
  };

  useEffect(() => {
    getChatData();
  }, []); // Run once on component mount

  return (
    <div
      className={`form-container ${
        toggleValue === "request" ? "expanded" : ""
      }`}
    >
      <div className="toggle-container">
        <ToggleButtonGroup
          value={toggleValue}
          exclusive
          onChange={handleToggle}
          aria-label="toggle button group"
        >
          <ToggleButton value="form" aria-label="form toggle">
            Customer Form
          </ToggleButton>
          <ToggleButton value="request" aria-label="details toggle">
            View Requests
          </ToggleButton>
        </ToggleButtonGroup>
      </div>

      {toggleValue === "form" && (
        <div>
          <div className="icon-container">
            <HeadsetMicIcon fontSize="large" />
          </div>
          <Typography variant="h5" className="form-text">
            Customer Form
          </Typography>

          <FormControl
            variant="outlined"
            className="dropdown-container"
            style={{ width: "100%", marginTop: "20px" }}
          >
            <InputLabel id="demo-simple-select-outlined-label">
              Select Option
            </InputLabel>
            <Select
              labelId="demo-simple-select-outlined-label"
              id="demo-simple-select-outlined"
              value={selectedOption}
              onChange={handleChange}
              label="Select Option"
            >
              <MenuItem value="General Queries">General Queries</MenuItem>
              <MenuItem value="Product Features Queries">
                Product Features Queries
              </MenuItem>
              <MenuItem value="Product Pricing Queries">
                Product Pricing Queries
              </MenuItem>
              <MenuItem value="Product Feature Implementation Requests">
                Product Feature Implementation Requests
              </MenuItem>
            </Select>
          </FormControl>

          <TextField
            id="outlined-basic"
            label="Comments"
            variant="outlined"
            style={{ width: "100%", marginTop: "20px" }}
            value={seletedText}
            onChange={handleTextChange}
            multiline
          />

          <Button
            variant="contained"
            style={{ width: "50%", marginTop: "20px" }}
            onClick={handleClick}
          >
            Submit
          </Button>
        </div>
      )}

      {toggleValue === "request" && (
        <div className="details-container">
          <ChatContainer messages={messages} />
        </div>
      )}
    </div>
  );
};

export default Form;
