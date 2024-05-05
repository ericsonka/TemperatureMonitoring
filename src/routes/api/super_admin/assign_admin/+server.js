

import { json } from "@sveltejs/kit";
import shortid from 'shortid';
shortid.characters(
    "0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ$@"
);


export async function POST({ request }) {
    // console.log(request);
    const unique_id = shortid.generate();
    let incoming_json_data = await request.json();
    console.log(incoming_json_data);
    let assing_admin = incoming_json_data.assigned_profile_id = `ASG_${unique_id}`;
    let currentDate = new Date().toUTCString();
    let date = incoming_json_data.date = currentDate;
        // console.log(date); 
    let data
    try{
    let result = await fetch('https://ap-south-1.aws.data.mongodb-api.com/app/application-0-jlfhwlx/endpoint/insert_assigned_admins_by_super_admin', {
        method: 'POST',
        body: JSON.stringify(incoming_json_data),
        headers: {
            'Content-Type': 'application/json'
        }
    }); 
    data = await result.json()  
    console.log(data)
}catch(e){
    console.log(e);
}
    // return json({ message: "Device inserted successfully" } 

  
    return json({message:'New Admin is added successfully', status: 200, data: data});

}