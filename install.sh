# log in to google cloud (if you haven't done so already)
gcloud auth login

gcloud iam service-accounts create dialogflow-cli

# give the created service account admin rights on dialogflow. Replace [project-name] with your dialogflow project.
gcloud projects add-iam-policy-binding [project-name] --member serviceAccount:dialogflow-cli@[project-name].iam.gserviceaccount.com --role roles/dialogflow.admin

# export a service account key to json
gcloud iam service-accounts keys create --iam-account dialogflow-cli@[project-name].iam.gserviceaccount.com credentials.json

npm install --save-dev dialogflow-cli

# export the dialogflow settings to the dialogflow-agent folder
npx dialogflow-cli --credentials credentials.json export dialogflow-agent/
