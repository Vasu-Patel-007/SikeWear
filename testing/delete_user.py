from selenium import webdriver
import time
from selenium.webdriver.common.keys import Keys
import pymongo


email = "hello@gmail.com"

# webdriver_path = "chromedriver.exe"

# driver = webdriver.Chrome(webdriver_path)

# driver.get("http://localhost:3000/account/newAccount")

# user_email = driver.find_element_by_id("signinEmail")
# user_email.send_keys("hello@gmail.com")
# user_email.send_keys(Keys.RETURN)

# user_password = driver.find_element_by_id("signinPassword")
# user_password.send_keys("1234567")
# user_password.send_keys(Keys.RETURN)

# submite_data = driver.find_element_by_id("submite_data")
# submite_data.click()

# driver.close()

client = pymongo.MongoClient("mongodb+srv://admin:patel@sikewearcluster.r7rsoch.mongodb.net/?retryWrites=true&w=majority")
data = client.test.accounts

data.delete_one({"email":email})
entry = data.find_one({"email":email})
try:
    if( not entry):
        print("Delete User : pass")
except Exception as e:
    print("Fail")