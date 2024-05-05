
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
    let new_device_id = incoming_json_data.new_device.new_device_profile_id = `DRV_${unique_id}`;
    let blck_id = incoming_json_data.new_device.block_id = `BLK_${unique_id}`;
    let room_id = incoming_json_data.new_device.room_id = `RM_${unique_id}`;
    let currentDate = new Date().toUTCString();
    let date = incoming_json_data.new_device.date = currentDate;

    let data
    let min = 1;
    let max = 100;
    let randomNumber = null;
    randomNumber = Math.floor(Math.random() * (max - min + 1)) + min;
    console.log(randomNumber);
    let sensor_value = incoming_json_data.new_device.sensor_value = randomNumber;
    try{
    let result = await fetch('https://ap-south-1.aws.data.mongodb-api.com/app/application-0-jlfhwlx/endpoint/insert_devices', {
        method: 'POST',
        body: JSON.stringify(incoming_json_data.new_device),
        headers: {
            'Content-Type': 'application/json'
        }
    });
    data = await result.json() 
    console.log(data)
}catch(e){
    console.log(e);
}
    // return json({ message: "Device inserted successfully" });

    let data_1;

    let result_1 = await fetch('https://ap-south-1.aws.data.mongodb-api.com/app/application-0-jlfhwlx/endpoint/device_sensor_history', {
        method: 'POST',
        body: JSON.stringify({
            unique_id_device: new_device_id,
            currentDate: date,
            sensor_value: sensor_value
        }),
        headers: {
            'Content-Type': 'application/json'
        }
    });
    data_1 = await result_1.json()


    return json({ status: 200, data_1: data_1 });

}