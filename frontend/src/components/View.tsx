import { useState } from "react";
import SwitchSelector from "react-switch-selector";
import Page from "./GridView/Page";
import KanbanBoard from "./KanbanBoard";

const View = () => {
  const [selectedComponent, setSelectedComponent] = useState("kanban");

  const options = [
    { label: "Kanban", value: "kanban" },
    { label: "Grid", value: "grid" },
  ];

  const handleComponentChange = (newValue: string) => {
    setSelectedComponent(newValue);
  };

  return (
    <div className="w-[300px] h-[30px]">
      <SwitchSelector
        options={options}
        onChange={
          handleComponentChange as (selectedOptionValue: unknown) => void
        }
        initialSelectedIndex={0} // Optional: Specify the initially selected index
      />
      {selectedComponent === "kanban" && <KanbanBoard />}
      {selectedComponent === "grid" && <Page />}
    </div>
  );
};

export default View;
