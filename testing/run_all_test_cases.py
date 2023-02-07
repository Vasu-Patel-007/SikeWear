import os
test_cases = ["sign_up.py","log_in.py","reset_password.py","change_role_to_manufacturer.py","manufacturer.py","delete_user.py","delete_product.py"]

path = "../testing/"

for each_test_case in test_cases:
    test_case_file = open(each_test_case,'r')
    temp = test_case_file.read()
    exec(compile(temp,each_test_case,'exec'))
