import { ChangeEvent, useEffect, useState } from "react";
import SwitchSelector from "react-switch-selector";
import Page from "./GridView/Page";
import KanbanBoard from "./Kanban/KanbanBoard";
import { changeStatusColor } from "@/api/User";
import axios from "axios";
import { toast } from "sonner";
import { useAuth } from "./Auth/ProtectedRoutes";

const View = () => {
  const {user} = useAuth();
  const [selectedComponent, setSelectedComponent] = useState(() => {
    const storedPage = localStorage.getItem("page");
    return storedPage ? storedPage : "kanban";
  });
   const [colors, setColors] = useState({
     TODO: "#000000",
     INPROGRESS: "#000000",
     TESTING: "#000000",
     COMPLETED: "#000000",
   });
   useEffect(()=>{
    setColors({
      TODO: user?.todoColor ?? "#000000",
      INPROGRESS: user?.inProgressColor ?? "#000000",
      TESTING: user?.testingColor ?? "#000000",
      COMPLETED: user?.completedColor ?? "#000000",
    });
    console.log("colors from the state",colors);
   },[user]);
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
        setColors((prevColors) => ({
          ...prevColors,
          [name]: value,
        }));
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
        <input
          type="color"
          name="TODO"
          value={colors.TODO}
          onChange={handleColorChange}
        />
        <input
          type="color"
          name="INPROGRESS"
          value={colors.INPROGRESS}
          onChange={handleColorChange}
        />
        <input
          type="color"
          name="TESTING"
          value={colors.TESTING}
          onChange={handleColorChange}
        />
        <input
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
