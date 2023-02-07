import pymongo

shoename = "sucks"


client = pymongo.MongoClient("mongodb+srv://admin:patel@sikewearcluster.r7rsoch.mongodb.net/?retryWrites=true&w=majority")
data = client.test.shoes

data.delete_one({"shoeName":"sucks"})
entry = data.find_one({"shoeName":shoename})
try:
    if( not entry):
        print("Delete Product : pass")
except Exception as e:
    print("Fail")