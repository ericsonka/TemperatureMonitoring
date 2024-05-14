import { json } from '@sveltejs/kit'
export async function POST({ request }) {

    const data = await request.json(); 
    let response = await fetch('https://ap-south-1.aws.data.mongodb-api.com/app/application-0-jlfhwlx/endpoint/get_all_assigned_details')
    let result = await response.json()
    console.log(result)
    return json(result) 
}
