# API Patterns

## REST Standard

GET /equipamentos
POST /equipamentos
PATCH /equipamentos/:id

## Response Pattern

{
  "success": true,
  "data": {},
  "message": ""
}

## Error Pattern

{
  "success": false,
  "error": {
    "code": "EQUIPMENT_NOT_FOUND",
    "message": ""
  }
}