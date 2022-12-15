import React from "react";
import axios from "axios";
import { useGlobalContext } from "../context/GlobalContext";

const ToCompleteCard = ({ toComplete }) => {
  console.log(toComplete)
  const input = React.useRef(null);
  const { user , completeCollection,incompleteCollection  } = useGlobalContext();
    const [materials, setMaterials] = React.useState(toComplete.materials);
    console.log(materials)
    const[recyclable,setRecyclable] = React.useState(toComplete.recyclable)
    const[reuseable,setReuseable] = React.useState(toComplete.reuseable)
    const[phonenumber,setPhonenumber] = React.useState(toComplete.phonenumber)
    const[address,setAddress] = React.useState(toComplete.address)





//   const markAsComplete = (e) => {
//     e.preventDefault();

//     axios.put(`/api/ToComplete/${toDo._id}/complete`).then((res) => {
//       toDoComplete(res.data);
//     });
//   };

//   const markAsIncomplete = (e) => {
//     e.preventDefault();

//     axios.put(`/api/ToCompletes/${ToComplete._id}/incomplete`).then((res) => {
//       toDoIncomplete(res.data);
//     });
//   };

//   const deleteToComplete = (e) => {
//     e.preventDefault();

//     if (window.confirm("Are you sure you want to delete this ?")) {
//       axios.delete(`/api/ToComplete/${ToComplete._id}`).then(() => {
//         removeToDo(toDo);
//       });
//     }
//   };



  return (
    <div className="todo--complete">
      {/* <input
        type="text"
        ref={input}
        value={materials}
      /> */}
      <h2>{materials}</h2>
      <h2>{recyclable}</h2>
      <h2>{reuseable}</h2>
      <h2>{phonenumber}</h2>
      <h2>{address}</h2>
      <div className="todo__controls">
          <>
            {/* <button onClick={deleteToDo}>Delete</button> */}
            <button >Delete</button>
          </>
      </div>
    </div>
  );
};

export default ToCompleteCard;