from selenium import webdriver
import time
from selenium.webdriver.common.keys import Keys
import pymongo

email = "hello@gmail.com"
brandname = "bike"
shoename = "sucks"
shoesize = "14 15 16"
shoeimage = "none"
shoeprice = "149.99"
shoequantity = "50"
shoecolor = "gray"

webdriver_path = "chromedriver.exe"

driver = webdriver.Chrome(webdriver_path)

driver.get("http://localhost:3000/ManufacturerPage")

provider_email = driver.find_element_by_name("email")
provider_email.send_keys(email)
provider_email.send_keys(Keys.RETURN)

brand_name = driver.find_element_by_name("brand_name")
brand_name.send_keys(brandname)
brand_name.send_keys(Keys.RETURN)

shoe_name = driver.find_element_by_name("shoe_name")
shoe_name.send_keys(shoename)
shoe_name.send_keys(Keys.RETURN)

shoe_size = driver.find_element_by_name("shoe_size")
shoe_size.send_keys(shoesize)
shoe_size.send_keys(Keys.RETURN)

shoe_image = driver.find_element_by_name("shoe_image")
shoe_image.send_keys(shoeimage)
shoe_image.send_keys(Keys.RETURN)

shoe_price = driver.find_element_by_name("shoe_price")
shoe_price.send_keys(shoeprice)
shoe_price.send_keys(Keys.RETURN)

shoe_quantity = driver.find_element_by_name("shoe_quantity")
shoe_quantity.send_keys(shoequantity)
shoe_quantity.send_keys(Keys.RETURN)

shoe_color = driver.find_element_by_name("shoe_color")
shoe_color.send_keys(shoecolor)
shoe_color.send_keys(Keys.RETURN)

submite_data = driver.find_element_by_name("submite")
submite_data.click()

driver.close()

client = pymongo.MongoClient("mongodb+srv://@sikewearcluster.r7rsoch.mongodb.net/?retryWrites=true&w=majority")
data = client.test.shoes

entry = data.find_one({"shoeName":shoename})

try:
    if entry["shoeName"] == shoename:
        print("Add Product : pass")
except Exception as e:
    print("Fail")