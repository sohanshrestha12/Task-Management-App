import { useEffect, useState } from "react";
import SwitchSelector from "react-switch-selector";
import Page from "./GridView/Page";
import KanbanBoard from "./KanbanBoard";
import { TaskProvider } from "./context/taskContext";

const View = () => {
  const [selectedComponent, setSelectedComponent] = useState(() => {
    const storedPage = localStorage.getItem("page");
    return storedPage ? storedPage : "kanban";
  });

  useEffect(() => {
    localStorage.setItem("page", selectedComponent);
  }, [selectedComponent]);

  const options = [
    { label: "Kanban", value: "kanban" },
    { label: "Grid", value: "grid" },
  ];

  const handleComponentChange = (newValue: string) => {
    setSelectedComponent(newValue);
  };

  return (
    <TaskProvider>
      <div className="w-[300px] h-[30px]">
        <SwitchSelector
          options={options}
          onChange={
            handleComponentChange as (selectedOptionValue: unknown) => void
          }
          initialSelectedIndex={options.findIndex(
            (option) => option.value == selectedComponent
          )} // Optional: Specify the initially selected index
        />
        {selectedComponent === "kanban" && <KanbanBoard />}
        {selectedComponent === "grid" && <Page />}
      </div>
    </TaskProvider>
  );
};

export default View;
