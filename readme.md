#Travel Experiences

1. Database structure

User

– id
– username\*
– password\*
– email\*
– role\*
– creation date
– registration code

Recommendation

– id\*
– title\*
– class\*
– location\*
– abstract\*
– content\*
– photo\*
– creation date

Vote

– id
– score\*
– recommendation id\*
– user id\*
– creation date

Comment

– id
– content
– recommendation id\*
– user id\*
– creation date

Requirements

2. Endpoints

PUBLIC (authentication not required)

– GET /recommendations
– Get a list of recommendations filtered and ordered by the following query params
– Query params: – location: filter by location – class: filter by class – orderByVotes: order by average rating
– Return: a list of recommendations following the query params

– GET /recommendations/:idRecommendation
– Get the whole recommendation by id
– Path params: – idEntry: el id del artículo
– Return: the whole recommendation identified with the path param

– POST /users/login
– User login
– Body: – username, –password
– Return: JWT for the authenticated user

– POST /users
– Create new user
– Body: – email – password – username – role
– Return: confirmation user registered

PRIVATE (authentication required)

– POST /recommendations
– Create a recommendation
– Body:– title – class – location – abstract – content – photo
– Return: url and confirmation

– POST /recommendations/:idRecommendation/vote
– Vote for a recommendation
– Query params: – rating
– Return: confirmation of the vote

– POST /recommendations/:idRecommendation/comment
– Write a comment for a recommendation
– Body: – content
– Return: url and confirmation

– DELETE /recommendations/:idRecommendation
