import React, { useState } from "react";

export function useSnackbar() {
  const [isActive, setIsActive] = React.useState(false);
  const [message, setMessage] = React.useState();
  const [type, setType] = useState("");
  React.useEffect(() => {
    if (isActive === true) {
      setTimeout(() => {
        setIsActive(false);
        /*       setType(""); */
      }, 3000);
    }
  }, [isActive]);

  const openSnackBar = (msg = "Something went wrong...", stype) => {
    if (isActive) {
      return;
    }
    setMessage(msg);
    setIsActive(true);
    setType(stype);
  };

  return { isActive, message, openSnackBar, type };
}
