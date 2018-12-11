1. New User Registration

POST -> http://localhost:3030/users

body:
Ex: {
	"username": "shiv123",
	"email": "shiv@gmail.com",
	"password": "shiv123"
}

2. User Login

POST -> http://localhost:3030/authentication

body:
{
	"strategy": "local",
	"email": "shiv@gmail.com",
	"password": "shiv"
}

will give you a token

3. User profile information display and editing

Display: GET -> http://localhost:3030/users

Editing: PATCH -> http://localhost:3030/users with auth token in the header

{
	"username": "shiv123",
	"email": "shiv@gmail.com",
	"password": "shiv123"
}

4. Forgot password functionality

GET: http://localhost:3030/users/?email=kevin@gmail.com - with email for the users

5. post items

Post: http://localhost:3030/postitems with auth token and select time from availble auction slots ( see below for get that auction time slots)

body:
{
	"product_name": "audi Car",
	"current_price": "30000",
	"date": "12/13/2018",
	"start_time": "12:00",
	"end_time": "1:00",
	"description": "mazda",
	"url": "/uploads"
}

6. delete the user’s own posted items

DELETE -> http://localhost:3030/postitems/id -> with auth token and Product id you can delete that postitems

7. bid for items

PATCH -> http://localhost:3030/postitems/id -> with auth token and Product id you can bid for that item

body:
{
	"top_bidder": "shiv",
	"current_price": "35000"
}

8. View the auction schedule

GET -> http://localhost:3030/auctions -- no authentication

9. Search for items that are available for bidding during a date range.

GET -> http://localhost:3030/postitems -- will display all items without authentication

Page listing the summary of all the bids for an item

GET -> http://localhost:3030/bids -- will display all the bids done

10. Admin Login/ logout -- Specify the auction schedule/hours for a particular day

POST .> http://localhost:3030/auctions with auth token in header

body:
{
	"date": "12/13/2018",
	"start_time": "12:00",
	"end_time": "1:00"
}
