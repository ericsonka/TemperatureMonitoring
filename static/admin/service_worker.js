// urlB64ToUint8Array is a magic function that will encode the base64 public key
// to Array buffer which is needed by the subscription option
const urlB64ToUint8Array = base64String => {
  const padding = "=".repeat((4 - (base64String.length % 4)) % 4);
  const base64 = (base64String + padding)
    .replace(/\-/g, "+")
    .replace(/_/g, "/");
  const rawData = atob(base64);
  const outputArray = new Uint8Array(rawData.length);
  for (let i = 0; i < rawData.length; ++i) {
    outputArray[i] = rawData.charCodeAt(i);
  }
  return outputArray;
};

const saveSubscription = async (subscription, logged_in_admin_id) => {
  const SERVER_URL = "/api/admin/save_notification_token";

  let objToSave = JSON.parse(JSON.stringify(subscription));
  objToSave.logged_in_admin_id = logged_in_admin_id;

  console.log("save sub", subscription);

  const response = await fetch(SERVER_URL, {
    method: "post",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify(objToSave)
  });
  return response.json();
};

self.addEventListener('message', async function(event){
  let data = JSON.parse(event.data);

  console.log("SW Received do_subscribe:");
  console.log(data);

  self.logged_in_admin_id = data.logged_in_admin_id;

  try {
    const applicationServerKey = urlB64ToUint8Array(
        "BHl8A_08s2P-MZL7HR2jq2jdcW3pCFYXpAzL4ShycHjfEGVokuj94Hua_tTHfv9RY6o1f7NycK0BydbtFAg71dM"
    );
    const options = { applicationServerKey, userVisibleOnly: true };
    const subscription = await self.registration.pushManager.subscribe(options);
    const response = await saveSubscription(subscription, data.logged_in_admin_id);
    console.log('push registered', response);
  } catch (err) {
    console.log("Error", err);
  }

});


self.addEventListener("install", async () => {
  // This will be called only once when the service worker is installed for first time.
  console.log('sw installed');

});

self.addEventListener("push", function(event) {
  if (event.data) {
    console.log("Push event!! ", event.data.text());
  } else {
    console.log("Push event but no data");
  }
  let data = JSON.parse(event.data.text());

  showLocalNotification(data.title, data.description);
});


const showLocalNotification = (title, body) => {
  const options = {
    body
  };
  self.registration.showNotification(title, options);
}
