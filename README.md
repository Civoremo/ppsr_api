<!-- @format -->

# PPSR API

## _NAVIGATION_

### USER

-[Register](#registerUser) || -[Login](#loginUser) || -[Update](#updateUser) || -[Delete](#deleteUser) || -[Confirm User](#confirmUser)

-[Get All](#getAllUsers) || -[Get Specific](#getUserSpecific)

### ENCLOSURE

-[Register](#registerEnclosure) || -[Update](#updateEnclosure) || -[Delete](#deleteEnclosure)

-[Get All](#getAllEnclosures) || -[Get By ID](#getEnclosureById)

### ALTERNATIVE MATERIAL

-[Register](#registerAltMaterial) || -[Update](#updateAltMaterial) || -[Delete](#deleteAltMaterial)

### GALLERY

-[Register](#registerGallery) || -[Delete](#deleteGallery)

[Get All](#getAllGallery)

---

---

## REGISTER

### -- User -- <a name='registerUser'></a>

_Method Url:_ `{URL}/users/register`

_HTTP method:_ **POST**

### Headers

| name         | type   | required | description              |
| ------------ | ------ | -------- | ------------------------ |
| Content-Type | String | Yes      | Must be application/json |

### Body

| name      | type   | required | description |
| --------- | ------ | -------- | ----------- |
| firstName | String | Yes      |             |
| lastName  | String | Yes      |             |
| email     | String | Yes      | unique      |
| password  | String | Yes      |             |

_example_

```
{
    firstName: "Gob",
    lastName: "Bluth",
    email: "gob@bluthcompany.com",
    password: "magicianAlliance$5"
}
```

_response_

```
{
    "confirmation": 1,
    "message": "Check your inbox for the confirmation key."
}
```

### --- Enclosure --- <a name='registerEnclosure'></a>

_Method Url:_ `{URL}/cages/post`

_HTTP method:_ **POST**

### Headers

| name          | type   | required | description                    |
| ------------- | ------ | -------- | ------------------------------ |
| Content-Type  | String | Yes      | Must be application/json       |
| Authorization | String | Yes      | Bearer JWT authorization token |

### Body

| name     | type | required | description                                                                   |
| -------- | ---- | -------- | ----------------------------------------------------------------------------- |
| cageType | enu  | Yes      | [Dome, Gable]                                                                 |
| cagePart | enu  | Yes      | [Door, Bottom, Side, Riser, Roof, Low Riser, High Riser, Low Roof, High Roof] |
| price    | int  | Yes      | no chars                                                                      |
| imageURL | text | No       |                                                                               |

_example_

```
{
    cageType: "Dome",
    cagePart: "Door",
    price: 250,
    imageURL: "https://someimage.ba"
}
```

_response_

```
1
```

### --- Alternative Material --- <a name='registerAltMaterial'></a>

_Method Url:_ `{URL}/:cageId/screen/post`

_HTTP method:_ **POST**

### Headers

| name          | type   | required | description                    |
| ------------- | ------ | -------- | ------------------------------ |
| Content-Type  | String | Yes      | Must be application/json       |
| Authorization | String | Yes      | Bearer JWT authorization token |

### Parameters

| name   | type | required | description |
| ------ | ---- | -------- | ----------- |
| cageId | Int  | Yes      | foreign key |

### Body

| name          | type | required | description                                                            |
| ------------- | ---- | -------- | ---------------------------------------------------------------------- |
| altScreenName | enu  | Yes      | [TuffScreen, Florida Glass, NoSeeUms Screen, Pet Screen, Solar Screen] |
| price         | int  | Yes      |                                                                        |

_example_

```
{
    altScreenName: "Solar Screen",
    price: 500,
}
```

_response_

```
1
```

### --- Gallery --- <a name='registerGallery'></a>

_Method Url:_ `{URL}/gallery/post`

_HTTP method:_ **POST**

### Headers

| name          | type   | required | description                    |
| ------------- | ------ | -------- | ------------------------------ |
| Content-Type  | String | Yes      | Must be application/json       |
| Authorization | String | Yes      | Bearer JWT authorization token |

### Body

| name     | type | required | description |
| -------- | ---- | -------- | ----------- |
| imageUrl | text | Yes      |             |

_example_

```
{
    imageURL: "https://somerandomimageonline.ba"
}
```

_response_

```
1
```

---

## LOGIN

### -- User -- <a name='loginUser'></a>

_Method Url:_ `{URL}/users/login`

_HTTP method:_ **POST**

### Headers

| name         | type   | required | description              |
| ------------ | ------ | -------- | ------------------------ |
| Content-Type | String | Yes      | Must be application/json |

### Body

| name          | type   | required | description           |
| ------------- | ------ | -------- | --------------------- |
| email         | String | Yes      |                       |
| password      | String | Yes      |                       |
| activationKey | Int    | Yes      | first time login only |

_example_

```
{
    email: "gob@bluthcompany.com",
    password: "magicianAlliance$5",
    activationKey: 5567
}
```

_response_

```
{
    "login": 1,
    "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyUm9sZSI6ImFkbWluaSIsImZpcnN0TmFtZSI6IlRhbmlhIiwibGFzdE5hbWUiOiJPIiwiZW1haWwiOiJ0YW5pYXRlc3RAdGVzdC5jb20iLCJpZCI6MjUsImlhdCI6MTYyNjk3MDY0MywiZXhwIjoxNjI2OTc0MjQzfQ.GM4efK1btfWtUu8Ziy7zMED7v6DnpWCzsVpjbd4iu-Y",
    "user": {
        "id": 25,
        "firstName": "Gob",
        "lastName": "Bluth",
        "userRole": "user",
        "email": "gob@bluthcompany.com",
        "password": "$2a$14$KiKC6JeHgj5/#2oVgT3PbmBeIh0nl1wuzBGYEqOCrCmKOktRlrvc5oK",
        "activeUser": true,
        "activationKey": 5567
    }
}
```

---

## CONFIRM USER <a name='confirmUser'></a>

### -- User --

_Method Url:_ `{URL}/users/confirmUser`

_HTTP method:_ **PUT**

### Headers

| name         | type   | required | description              |
| ------------ | ------ | -------- | ------------------------ |
| Content-Type | String | Yes      | Must be application/json |

### Body

| name          | type   | required | description |
| ------------- | ------ | -------- | ----------- |
| email         | String | Yes      |             |
| activationKey | Int    | Yes      |             |

_example_

```
{
    email: "gob@bluthcompany.com",
    activationKey: 5567
}
```

_response_

```
{
    "id": 1,
    "activeted": 1
}
```

---

## UPDATE

### -- User -- <a name='updateUser'></a>

_Method Url:_ `{URL}/users/update`

_HTTP method:_ **PUT**

### Headers

| name          | type   | required | description                    |
| ------------- | ------ | -------- | ------------------------------ |
| Content-Type  | String | Yes      | Must be application/json       |
| Authorization | String | Yes      | Bearer JWT authorization token |

### Body

| name      | type   | required | description |
| --------- | ------ | -------- | ----------- |
| firstName | String | No       |             |
| lastName  | String | No       |             |
| email     | String | No       | unique      |
| password  | String | No       |             |

_example_

```
{
    firstName: "Tobias"
}
```

_response_

```
{
    "id": 1,
    "updated": 1,
    "message": "Update successfull."
}
```

### -- Enclosure -- <a name='updateEnclosure'></a>

_Method Url:_ `{URL}/cages/:id/cage/update`

_HTTP method:_ **PUT**

### Headers

| name          | type   | required | description                    |
| ------------- | ------ | -------- | ------------------------------ |
| Content-Type  | String | Yes      | Must be application/json       |
| Authorization | String | Yes      | Bearer JWT authorization token |

### Parameters

| name   | type | required | description |
| ------ | ---- | -------- | ----------- |
| cageId | Int  | Yes      |             |

### Body

| name     | type | required | description                                                                   |
| -------- | ---- | -------- | ----------------------------------------------------------------------------- |
| cageType | enu  | No       | [Dome, Gable]                                                                 |
| cagePart | enu  | No       | [Door, Bottom, Side, Riser, Roof, Low Riser, High Riser, Low Roof, High Roof] |
| price    | int  | No       | no chars                                                                      |
| imageURL | text | No       |                                                                               |

_example_

```
{
    price: 200
}
```

_response_

```
1
```

### -- ALTERNATIVE MATERIAL -- <a name='updateAltMaterial'></a>

_Method Url:_ `{URL}/cages/screen/:screenId/update`

_HTTP method:_ **PUT**

### Headers

| name          | type   | required | description                    |
| ------------- | ------ | -------- | ------------------------------ |
| Content-Type  | String | Yes      | Must be application/json       |
| Authorization | String | Yes      | Bearer JWT authorization token |

### Parameters

| name     | type | required | description |
| -------- | ---- | -------- | ----------- |
| screenId | Int  | Yes      |             |

### Body

| name          | type | required | description                                                            |
| ------------- | ---- | -------- | ---------------------------------------------------------------------- |
| altScreenName | enu  | No       | [TuffScreen, Florida Glass, NoSeeUms Screen, Pet Screen, Solar Screen] |
| price         | int  | No       |                                                                        |

_example_

```
{
    altScreenName: "Solar Screen",
    price: 550,
}
```

_response_

```
1
```

---

## DELETE

### -- USER --- <a name='deleteUser'></a>

_Method Url:_ `{URL}/users/delete`

_HTTP method:_ **DELETE**

### Headers

| name          | type   | required | description                    |
| ------------- | ------ | -------- | ------------------------------ |
| Content-Type  | String | Yes      | Must be application/json       |
| Authorization | String | Yes      | Bearer JWT authorization token |

_response_

```
{
    "count": 1,
    "deleted": 1
}
```

### -- ENCLOSURE --- <a name='deleteEnclosure'></a>

_Method Url:_ `{URL}/cages/delete`

_HTTP method:_ **DELETE**

### Headers

| name          | type   | required | description                    |
| ------------- | ------ | -------- | ------------------------------ |
| Content-Type  | String | Yes      | Must be application/json       |
| Authorization | String | Yes      | Bearer JWT authorization token |

### Body

| name   | type | required | description |
| ------ | ---- | -------- | ----------- |
| cageId | int  | Yes      |             |

_example_

```
{
    cageId: 1
}
```

_response_

```
{
    "count": 1,
    "deleted": 1
}
```

### -- ALTERNATIVE MATERIAL --- <a name='deleteAltMaterial'></a>

_Method Url:_ `{URL}/cages/screen/:screenId/delete`

_HTTP method:_ **DELETE**

### Headers

| name          | type   | required | description                    |
| ------------- | ------ | -------- | ------------------------------ |
| Content-Type  | String | Yes      | Must be application/json       |
| Authorization | String | Yes      | Bearer JWT authorization token |

### Parameters

| name     | type | required | description |
| -------- | ---- | -------- | ----------- |
| screenId | Int  | Yes      |             |

_response_

```
{
    "count": 1,
    "deleted": 1
}
```

### -- GALLERY --- <a name='deleteGallery'></a>

_Method Url:_ `{URL}/gallery/delete`

_HTTP method:_ **DELETE**

### Headers

| name          | type   | required | description                    |
| ------------- | ------ | -------- | ------------------------------ |
| Content-Type  | String | Yes      | Must be application/json       |
| Authorization | String | Yes      | Bearer JWT authorization token |

### Body

| name    | type | required | description |
| ------- | ---- | -------- | ----------- |
| imageId | int  | Yes      |             |

_example_

```
{
    imageId: 1
}
```

_response_

```
{
    "count": 1,
    "deleted": 1
}
```

---

## GET

### -- User (All) -- <a name='getAllUsers'></a>

_Method Url:_ `{URL}/users/all`

_HTTP method:_ **GET**

### Headers

| name          | type   | required | description                            |
| ------------- | ------ | -------- | -------------------------------------- |
| Content-Type  | String | Yes      | Must be application/json               |
| Authorization | String | Yes      | Bearer JWT authorization token (admin) |

_response_

```
[
    {
        user info
    },
    {
        user info
    }
]
```

### -- User (Specific) -- <a name='getUserSpecific'></a>

_Method Url:_ `{URL}/users/user`

_HTTP method:_ **GET**

### Headers

| name          | type   | required | description                    |
| ------------- | ------ | -------- | ------------------------------ |
| Content-Type  | String | Yes      | Must be application/json       |
| Authorization | String | Yes      | Bearer JWT authorization token |

### Body

| name  | type | required | description      |
| ----- | ---- | -------- | ---------------- |
| email | int  | Yes      | (admin use only) |

_response_

```
{
    user info
}
```

### -- Enclosure (All) -- <a name='getAllEnclosures'></a>

_Method Url:_ `{URL}/cages/all`

_HTTP method:_ **GET**

### Headers

| name         | type   | required | description              |
| ------------ | ------ | -------- | ------------------------ |
| Content-Type | String | Yes      | Must be application/json |

_response_

```
[
    {
        "id": 1,
        "cageType": "Dome",
        "cagePart": "Door",
        "price": 40,
        "imageURL": "https://someimage.ba",
        "altScreenOptions": [
            {
            "id": 1,
            "altScreenName": "TuffScreen",
            "price": 60,
            "cageId": 1
            },
        ]
    },
    {
        "id": 2,
        "cageType": "Dome",
        "cagePart": "Bottom",
        "price": 45,
        "imageURL": "https://res.cloudinary.com/ppscreens/image/upload/v1625272035/ppsr_images/eayruylhls9jizwmo8dz.jpg",
        "altScreenOptions": [
            {
            "id": 8,
            "altScreenName": "Pet Screen",
            "price": 60,
            "cageId": 2
            }
        ]
    },
]
```

### -- Enclosure (ID) -- <a name='getEnclosureById'></a>

_Method Url:_ `{URL}/cages/:id`

_HTTP method:_ **GET**

### Headers

| name          | type   | required | description                    |
| ------------- | ------ | -------- | ------------------------------ |
| Content-Type  | String | Yes      | Must be application/json       |
| Authorization | String | Yes      | Bearer JWT authorization token |

### Parameters

| name | type | required | description |
| ---- | ---- | -------- | ----------- |
| id   | Int  | Yes      |             |

_response_

```
{
    "id": 2,
    "cageType": "Dome",
    "cagePart": "Door",
    "price": 250,
    "imageURL": "https://someimage.ba",
    "altScreenOptions": []
}
```

### -- GALLERY (All) -- <a name='getAllGallery'></a>

_Method Url:_ `{URL}/gallery/all`

_HTTP method:_ **GET**

### Headers

| name         | type   | required | description              |
| ------------ | ------ | -------- | ------------------------ |
| Content-Type | String | Yes      | Must be application/json |

_response_

```
[
    {"imageURL": "https://someimage1.bs"},
    {"imageURL": "https://someimage2.bs"},
    {"imageURL": "https://someimage3.bs"},
    {"imageURL": "https://someimage4.bs"},
    {"imageURL": "https://someimage5.bs"},
]
```
