<!-- @format -->

# PPSR API

## _NAVIGATION_

### USER

[Register](#registerUser) ||
[Login](#loginUser) ||
[Update](#updateUser) ||
[Delete](#deleteUser)

[Get All](#getAllUsers) ||
[Get By ID](#getUserById) ||
[Confirm User](#confirmUser) ||
[Estimate Request](#estimateRequest) ||
[Recaptcha](#recaptcha)

### ENCLOSURE

[Register](#registerEnclosure) ||
[Update](#updateEnclosure) ||
[Delete](#deleteEnclosure)

[Get All](#getAllEnclosures) ||
[Get By ID](#getEnclosureById)

### ALTERNATIVE MATERIAL

[Register](#registerAltMaterial) ||
[Update](#updateAltMaterial) ||
[Delete](#deleteAltMaterial)

### GALLERY

[Register](#registerGallery) ||
[Update](#updateGallery) ||
[Delete](#deleteGallery)

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
    something
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
| imageURL | text | Yes      |                                                                               |

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
{
    something
}
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
{
    something
}
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
{
    something
}
```

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
    something
}
```
