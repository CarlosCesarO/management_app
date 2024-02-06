import React from "react";

export default function Task({ task }) {
  return (
    <div className="fake-container p-5 border border-border mb-2 rounded-lg bg-background">
      {task.content}
    </div>
  );
}
