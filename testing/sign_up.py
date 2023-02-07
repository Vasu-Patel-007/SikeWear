# this python script opens a webpage and enters user credential for them to sign up.
# one they credentials are submitted, this python program runs mongoDB query to see if the user new user exist in the database.
# if user exist, pass the test case, if not fail the test case. 

from selenium import webdriver
import time
from selenium.webdriver.common.keys import Keys
import pymongo

firstName = "hello"
lastName = "jello"
email = "hello@gmail.com"
password = "1234567"

webdriver_path = "chromedriver.exe"

driver = webdriver.Chrome(webdriver_path)

driver.get("http://localhost:3000/account/newAccount")

first_name = driver.find_element_by_id("first")
first_name.send_keys(firstName)
first_name.send_keys(Keys.RETURN)

last_name = driver.find_element_by_id("last")
last_name.send_keys(lastName)
last_name.send_keys(Keys.RETURN)


user_email = driver.find_element_by_id("signinEmail")
user_email.send_keys(email)
user_email.send_keys(Keys.RETURN)

user_password = driver.find_element_by_id("signinPassword")
user_password.send_keys(password)
user_password.send_keys(Keys.RETURN)

submite_data = driver.find_element_by_id("submite_data")
submite_data.click()

driver.close()

client = pymongo.MongoClient("mongodb+srv://admin:patel@sikewearcluster.r7rsoch.mongodb.net/?retryWrites=true&w=majority")
data = client.test.accounts

entry = data.find_one({"email":"hello@gmail.com"})

try:
    if(entry["email"] == email and entry["password"] == password):
        print("sign_up : pass")
except Exception as e:
    print("Fail")