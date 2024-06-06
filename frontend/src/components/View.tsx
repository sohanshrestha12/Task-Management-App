import { changeStatusColor } from "@/api/User";
import axios from "axios";
import { ChangeEvent, useEffect, useState } from "react";
import SwitchSelector from "react-switch-selector";
import { toast } from "sonner";
import Page from "./GridView/Page";
import KanbanBoard from "./Kanban/KanbanBoard";
import { useColor } from "./context/colorContext";

const View = () => {
  const {colors,changeStateColor}= useColor();
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

    const handleColorChange = async(e:ChangeEvent<HTMLInputElement>) => {
      try {
        const { name, value } = e.target;
        const res = await changeStatusColor(name,value);
        console.log(res);
        changeStateColor(name,value);
        console.log(`${name} changed to:`, value);
        
      } catch (error) {
        if(axios.isAxiosError(error)){
          if (error.response?.data?.message) {
            toast.error(error.response.data.message);
          } 
        }
        console.log(error);
      }
  };

  return (
    <div className="ml-[230px] flex justify-between w-[80vw]">
      <div className="w-[300px] h-[30px] col-start-3 col-span-6 mt-[100px] my-2">
        <SwitchSelector
          options={options}
          onChange={
            handleComponentChange as (selectedOptionValue: unknown) => void
          }
          initialSelectedIndex={options.findIndex(
            (option) => option.value == selectedComponent
          )} // Optional: Specify the initially selected index
        />
        {selectedComponent === "kanban" && <KanbanBoard colors={colors} />}
        {selectedComponent === "grid" && <Page colors={colors} />}
        {/* <Routes>
          <Route path="/kanban" element={<KanbanBoard/>} />
          <Route path="/grid" element={<Page/>} />
        </Routes> */}
      </div>
      <div className=" mt-[100px] flex w-[200px]">
        <div className="border rounded-full">
          <input
            className="border rounded-full"
            type="color"
            name="TODO"
            value={colors.TODO}
            onChange={handleColorChange}
          />
        </div>
        <input
          className="border rounded-full"
          type="color"
          name="INPROGRESS"
          value={colors.INPROGRESS}
          onChange={handleColorChange}
        />
        <input
          className="border rounded-full"
          type="color"
          name="TESTING"
          value={colors.TESTING}
          onChange={handleColorChange}
        />
        <input
          className="border rounded-full"
          type="color"
          name="COMPLETED"
          value={colors.COMPLETED}
          onChange={handleColorChange}
        />
      </div>
    </div>
  );
};

export default View;
