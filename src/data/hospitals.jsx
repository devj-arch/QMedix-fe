import { useEffect, useState } from "react";
import api from "../services/apiWrapper";
export const useHospitals=()=>{
const [hospitalMap,setHospitalMap]=useState({});
const fetch = async () => {
  try {
	const res=await api("get","hospital/all");
     console.log(res.data);
    const map={};
    res.data.hospitals.forEach(h=>{
        map[h.id]=h;
    });
    setHospitalMap(map);
   
  } catch (error) {
	console.error("Hospital fetching error:",error);
  }
};
 useEffect(()=>{
  fetch();
 },[])
const getHospital=(id)=>{
    return hospitalMap[id];
}
return {hospitalMap,getHospital};
 }


