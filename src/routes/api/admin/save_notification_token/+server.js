import { json } from '@sveltejs/kit'
export async function POST({ request }) {

    const data = await request.json();
    console.log('save_notification_token', data);
    let response = await fetch('https://ap-south-1.aws.data.mongodb-api.com/app/application-0-jlfhwlx/endpoint/save_notification_token', {
        method: "POST",
        body: JSON.stringify(data),
        headers: {
            "Content-Type": "application/json",
        },
        
    })
    let result  = await response.json();
    return json({data:result}) 
}
