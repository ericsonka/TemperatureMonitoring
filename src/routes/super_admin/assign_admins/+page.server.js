

export async function load({ }) {
    let get_all_devices = await fetch('https://ap-south-1.aws.data.mongodb-api.com/app/application-0-jlfhwlx/endpoint/get_all_devices')
    let result = await get_all_devices.json();
    // console.log(result);
    let devices = result;
    
    console.log(devices);

    let get_all_admins = await fetch('https://ap-south-1.aws.data.mongodb-api.com/app/application-0-jlfhwlx/endpoint/get_all_admins')
    let admin = await get_all_admins.json();
    // console.log(result);
    let admins = admin;
    console.log(admins);


    let get_all_assigned_admins = await fetch('https://ap-south-1.aws.data.mongodb-api.com/app/application-0-jlfhwlx/endpoint/get_all_assigned_details')
    let assigned = await get_all_assigned_admins.json();
    let assigned_details = assigned.data;
    // console.log(result);
console.log(assigned);
 

    
     



    return {
        devices, admins, assigned
    }
}  