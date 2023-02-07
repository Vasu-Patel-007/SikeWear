from selenium import webdriver
import time
from selenium.webdriver.common.keys import Keys
import pymongo

email = "hello@gmail.com"
role = "manufacturer"

webdriver_path = "chromedriver.exe"

driver = webdriver.Chrome(webdriver_path)

driver.get("http://localhost:3000/AdminPage")

user_email = driver.find_element_by_id("signinEmail")
user_email.send_keys(email)
user_email.send_keys(Keys.RETURN)

role_drop_down = driver.find_element_by_id("role")
role_drop_down.click()


manufacturer_role = driver.find_element_by_id("manufacturer")
manufacturer_role.click()

submite_data = driver.find_element_by_id("submite_data")
submite_data.click()


sign_out = driver.find_element_by_id("sign_out")
sign_out.click()

driver.close()

client = pymongo.MongoClient("mongodb+srv://admin:patel@sikewearcluster.r7rsoch.mongodb.net/?retryWrites=true&w=majority")
data = client.test.accounts

entry = data.find_one({"email":email})

try:
    if(entry["email"] == email and entry["role"] == role):
        print("Change role to manufacturer : pass")
except Exception as e:
    print("Fail")