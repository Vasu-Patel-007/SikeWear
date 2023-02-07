from selenium import webdriver
import time
from selenium.webdriver.common.keys import Keys
import pymongo

email = "hello@gmail.com"
newpassword = "12345678"

webdriver_path = "chromedriver.exe"

driver = webdriver.Chrome(webdriver_path)

driver.get("http://localhost:3000/account/resetPassword")

user_email = driver.find_element_by_id("signinEmail")
user_email.send_keys(email)
user_email.send_keys(Keys.RETURN)

user_password = driver.find_element_by_id("changePassword")
user_password.send_keys(newpassword)
user_password.send_keys(Keys.RETURN)

submite_data = driver.find_element_by_id("reset")
submite_data.click()

driver.close()

client = pymongo.MongoClient("mongodb+srv://admin:patel@sikewearcluster.r7rsoch.mongodb.net/?retryWrites=true&w=majority")
data = client.test.accounts

entry = data.find_one({"email":"hello@gmail.com"})
try:
    if(entry["email"] == email and entry["password"] == newpassword):
        print("Reset Password : pass")
except Exception as e:
    print("Fail")