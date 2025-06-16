import requests



auth_endpoint = "http://localhost:8000/cart/cartItem/add/"
token = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ0b2tlbl90eXBlIjoiYWNjZXNzIiwiZXhwIjoxNzQ5OTk2ODU5LCJpYXQiOjE3NDk5MTA0NTksImp0aSI6IjQ3YzQyMTkzMDY0ZDQ2NWU5NWViNWJmN2JjMDQ5YzlhIiwidXNlcl9pZCI6MjR9.j6ndqwHqB0uz5iHJvLwuNitKJjBpkLGM5aUEicQCeYM"
headers={
    'Authorization':f'Bearer {token}'
}
body = {
    # get the cart from the token
    'product':'2',
    'quantity':'3',
}
get_response = requests.post(auth_endpoint , headers=headers , json= body) 
print(get_response.text)

