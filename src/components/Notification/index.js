import MDSnackbar from "components/MDSnackbar";
import React, { useEffect, useState } from "react";

const Notification = (props) => {
  const { open = false, type = "success", title = "", content = "", dateTime = null } = props;
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    if (open) {
      setIsOpen(true);
      setTimeout(() => {
        setIsOpen(false);
      }, 3000);
    }
  }, [open]);

  let icon;

  switch (type) {
    case "success": {
      icon = "check";
      break;
    }
    case "info": {
      icon = "notifications";
      break;
    }
    case "warning": {
      icon = "warning";
      break;
    }
    case "error": {
      icon = "warning";
      break;
    }
    default: {
      icon = null;
      break;
    }
  }
  return (
    <MDSnackbar
      color={type}
      icon={icon}
      title={title}
      content={content}
      dateTime={dateTime}
      open={isOpen}
      bgWhite
    />
  );
};

export default Notification;
