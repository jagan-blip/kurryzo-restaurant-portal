import React, { useState, useEffect } from "react";

const Snackbar = ({ children, snack }) => {
  const [type, setType] = useState("success");
  const [duration, setDuration] = useState(4000);
  const [text, setText] = useState("");
};

export default Snackbar;
