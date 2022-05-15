import React, { useContext, useState } from "react";
import { Snackbar } from "@mui/material";
import { SocketContext } from "../../context/socket";

const WarningBar = () => {
  const socket = useContext(SocketContext);

  const [message, setMessage] = useState("");
  const [open, setOpen] = useState(false);

  socket.on("errorMessage", (msg) => {
    setMessage(msg);
    setOpen(true);
  });

  return (
    <Snackbar
      open={open}
      autoHideDuration={6000}
      onClose={() => setOpen(!open)}
      message={message}
    />
  );
};

export default WarningBar;
