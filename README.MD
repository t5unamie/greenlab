#Greenhouse Lab

## Introduction

 This repo contains all code related to the Greenhouse Lab. the greenhouse lab is an automated greenhouse that contains a Aqaponics system.

 The goal is to automate a self managed automated aqaponics system that can fit into a standard cargo container which can feed a large number of people.

 The system should be able to do the following.

### Roadmap

#### Starting Point

The below image shows the basic setup.

![Greenhouse Lab](https://github.com/t5unamie/greenlab/tree/master/Z-Assets/images/greenlab_network diagram.jpg "Greenhouse Lab")

1. Greenhouse Labs
	The Greenhouse is in my garden. Several sensors attached to arduino's (Marked as IOT devices) are connected to a raspberry pi. On the raspberry pi, which runs linux, fluentd is installed and setup to parse the sensors data to Google Pubsub service.
2. Messagebus
	Google PubSub Service will be a message buffer to handel large amounts of data being parsed to it from different devices.
3. Microservices
	On GCP, a Google Kubernetes cluster has been setup. On the cluster, a fluentd container runs to pull data off of Google PubSub and parse it into Elasticsearch. Access to that Data is managed by an app that sits infront of elasticsearch. there is also a security app that manages who can access what data. All apps are created in nodejs.
4. Frontend
	Angularjs front end is loaded onto Google Cloud Storage. The front end will allow the users view the sensor data and other things if they are contributing to the project throught Patreon.
5. External intergrations - Patreon
	The security micro service will call Patreons API to confirm what level of contribution the user has made.

	Current thinking is to simply load GCP bill data throught to a chart showing how much it costs to host all of these things. Anything left over after paying for base cost will be used to buy hardware to expand or increase the efficiency of the Greenhouse Lab.

	Food produced by the Greenhouse will eventaully used to feed the homless to test how consistent we can get the system to provide food regularly. numbers will be used to work out how much food can be produced on the same space provided by a cargo container can feed all year around. Request the homeless participating to go throught medical tests to confirm nutrients and health are maintained from the food produced from the greenhouse.

#### End Goal

 The Greenhouse Lab is part of a larger project and focuses purly on food production.
 The system should be able to do the following:

1. Self progate and produce food with no human intervention.
2. Perform ML from the data collected to increase the yeild produced by the crop.
3. Feed as many people all year round and keep trying to increase that number. (produce fish and vegtables)
