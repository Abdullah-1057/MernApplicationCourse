import { response } from "express";
import { API } from "../../backend";

export const CreateOrder = (userId,token,orderData,) =>
{
    return fetch(`${API}/order/create/${userId}`,{
        method : "POST",
        headers:{
            Accept: "application/json",
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
        },
        body:JSON.stringify({order:orderData}).then(response=>
            {
                return Response.JSON()
            }
            ).catch(error=>console.log(error))
    })
}