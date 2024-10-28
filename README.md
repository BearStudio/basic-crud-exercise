# Basic CRUD exercise

## Install project

Require NodeJS 20+

```
pnpm install
pnpm db:push
```

## Run the API

```
pnpm dev:api
```

API available at http://localhost:4000/api/v1

## API documentation

### Get all projects

```
GET /api/v1/projects

QUERY
{
  page:     Number?
  pageSize: Number?
}

RESPONSE
{
  data: {
    id          String
    createdAt   DateTime
    updatedAt   DateTime
    name        String
    description String?
  }[]
  total:    Number
  page:     Number
  pageSize: Number
}
```

### Create a project

```
POST /api/v1/projects

BODY
{
  name        String
  description String?
}

RESPONSE
{
  data: {
    id          String
    createdAt   DateTime
    updatedAt   DateTime
    name        String
    description String?
  }
}
```

### Get a project by id

```
GET /api/v1/projects/:id

RESPONSE
{
  data: {
    id          String
    createdAt   DateTime
    updatedAt   DateTime
    name        String
    description String?
  }
}
```

### Update a project by id

```
PUT /api/v1/projects/:id

BODY
{
  "name": String,
  "description": String?,
}

RESPONSE
{
  data: {
    id          String
    createdAt   DateTime
    updatedAt   DateTime
    name        String
    description String?
  }
}
```

### Delete a project by id

```
DELETE /api/v1/projects/:id

RESPONSE
{
  data: {
    id          String
    createdAt   DateTime
    updatedAt   DateTime
    name        String
    description String?
  }
}
```

## Exercise

Create a UI for the following tasks

- Display the list of all projects
- Create a project with name and description
- Update a project name and description

Bonus tasks

- Delete a project
- Display a project
