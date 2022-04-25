#Travel Experiences

1. Base de datos

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
– Query params: – location: filter by location – class: filter by class – orderByVotes: orden
– Return: info about the recommendations

– GET /recommendations/:idRecommendation
– Get the whole recommendation by id
– Path params: – idEntry: el id del artículo
– Retorna: información completa de un artículo

– POST /users/login
– User login
– Body:
– Retorna: un token (JWT – Json Web Token)

– POST /users
– Crear un usuario pendiente de activación
– Body: – email: correo electrónico – password: contraseña – name: nombre del usuario
– Retorna: mensaje que indica si el usuario se ha creado correctamente y que tiene que activarse

PRIVATE (authentication required)

– POST /recommendation
– Create a recommendation
– Body: – title: título del artículo – description: contenido del artículo
– Retorna: mensaje que indica si el artículo se ha creado correctamente y su URL

– POST /recommendation/:idRecommendation/vote
– Vote for a recommendation
– Body: – title: título del artículo – content: contenido del artículo
– Retorna: mensaje que indica si el artículo se ha creado correctamente y su URL

– POST /recommendation/:idRecommendation/comment
– Write a comment for a recommendation
– Body: – title: título del artículo – content: contenido del artículo
– Retorna: mensaje que indica si el artículo se ha creado correctamente y su URL

– DELETE /recommendation/:idRecommendation
