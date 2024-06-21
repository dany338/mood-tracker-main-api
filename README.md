<p align="center">
  <a href="http://nestjs.com/" target="blank"><img src="https://nestjs.com/img/logo-small.svg" width="200" alt="Nest Logo" /></a>
</p>


# Mood Tracker Main API

1. Clone the project
2. ```npm install```
3. Clone the ```.env.template``` file and rename it to ```.env```
4. Change the environment variables
5. Start the database
```
docker-compose up -d
```

6. Levantar: ```npm start:dev```

7. Ejecutar SEED
```
http://localhost:3001/api/seed
```

8. swagger documentation
```
http://localhost:3001/api
```

9. login - http://localhost:3001/api/auth/login POST
```json
{
    "email": "test3@google.com",
    "password": "Abc123"
}
```

10. create mood tracker - http://localhost:3001/api/mood-trackers POST
```json
{
    "type": "excited"
}

Auth Type
  Token: .........
```

11. Get All Mood trackers - http://localhost:3001/api/mood-trackers?orderField=created_at&order=DESC&limit=30&offset=0 GET
```json
[
    {
        "id": "bb66bae8-2aa6-44cd-94c3-d0224f2cece8",
        "user_id": "cd533345-f1f3-48c9-a62e-7dc2da50c8f0",
        "type": "sad",
        "created_at": "2024-06-21T08:19:09.380Z",
        "user": {
            "id": "cd533345-f1f3-48c9-a62e-7dc2da50c8f0",
            "email": "test3@google.com",
            "fullName": "Test Three"
        }
    },
    .
    .
    .
]
```

# Production notes:
