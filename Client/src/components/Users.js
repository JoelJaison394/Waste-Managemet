import React from "react";
import axios from "axios";
import { useGlobalContext } from "../context/GlobalContext";
import { useNavigate } from "react-router-dom";
import ToCompleteCard from "./ToCompleteCard";

const Users= () => {
  const { user , completeCollection,incompleteCollection  } = useGlobalContext();
  console.log(incompleteCollection);
  console.log(completeCollection);
  const [materials, setMaterials] = React.useState("");
  const[recyclable,setRecyclable] = React.useState("")
  const[reuseable,setReuseable] = React.useState("")
  const[phonenumber,setPhonenumber] = React.useState("")
  const[address,setAddress] = React.useState("")
  const navigate = useNavigate();
  
  React.useEffect(() => {
    if (!user && navigate) {
      navigate("/");
    }
  }, [user, navigate]);


  let data={}

  const onSubmit = (e) => {
    data = {
      materials,
      recyclable,
      reuseable,
      phonenumber,
      address,
      }

      // getdata();
      e.preventDefault();
  
      axios.post("/api/user/collect",data).then((res) => {
        setMaterials("");
        setRecyclable("");
        setReuseable("");
        setPhonenumber("");
        setAddress("");
      });
    };
  



  return (
    <div className="User">
      <div className="hero__section">
        <div className="left__section">
          <div className="user_field">
            <form onSubmit={onSubmit}>
            <label>Enter the type of wastes</label>
            <input
                  type="text"
                  value={materials}
                  onChange={(e) => setMaterials(e.target.value)}
                />

              <label>Enter the recyclable material</label>
            <input
                  type="text"
                  value={recyclable}
                  onChange={(e) => setRecyclable(e.target.value)}
                />

            <label>Enter the reuseable  material</label>
            <input
                  type="text"
                  value={reuseable}
                  onChange={(e) => setReuseable(e.target.value)}
                />


            <label>Enter the PhoneNumber</label>
            <input
                  type="number"
                  value={phonenumber}
                  onChange={(e) => setPhonenumber(e.target.value)}
              />

            <label>Enter the address</label>
            <input
                  type="text"
                  value={address}
                  onChange={(e) =>setAddress(e.target.value)}
                />

              <button className="btn" type="submit">submit
              </button>

            </form>
          </div>
        </div>
        <div className="right__section">
          <div className="profile">
            <h2>{user.name}</h2>
            <h2>{user.email}</h2>
            <h2>{user.location}</h2>
          </div>
        </div>

      </div>

        <div className="toComplete">
                {/* <ToDoCard /> */}
                {incompleteCollection.map((incomplete, i) =>{
                  return <ToCompleteCard toComplete={incomplete} key={i}/>
 
                })}
                
        </div>
        
      
    </div>
  )
}

export default Users;