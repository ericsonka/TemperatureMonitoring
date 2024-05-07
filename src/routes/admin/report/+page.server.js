
export async function load({  }) {
    let get_all_devices = await fetch('https://ap-south-1.aws.data.mongodb-api.com/app/application-0-jlfhwlx/endpoint/get_all_assigned_details')
    let result = await get_all_devices.json(); 
    // console.log(result);
    let devices = result.data ;
   
    console.log(devices); 
  
    return {
        devices 
    }
}  