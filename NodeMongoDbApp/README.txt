#Learning - Express and PUG view engine

#create mongo container
sudo docker pull mongo
sudo mkdir -p /Users/<username>/workspaces/mongodata
sudo docker run -it -v /Users/<username>/workspaces/mongodata:/data/db --name mongodb -p 27017:27017 -d mongo

#enter mongo shell and create test data
sudo docker exec -it mongodb bash
use test
db.createCollection("Cats")
db.Cats.insert({"cat_id" : "1","cat_name" : "kitty1"})
db.Cats.insert({"cat_id" : "2","cat_name" : "kitty2"})
exit

#build docker for this express app
sudo docker exec -it mongodb bash
docker build . -t saratb/express-node-mongo-app
docker run -p 49160:3000 -d saratb/express-node-mongo-app 

#Http://localhost:49160/cats