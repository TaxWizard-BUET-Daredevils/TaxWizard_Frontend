## API Documentation

- Base url: tax-wizard.com

### Authentication

| API Endpoint | HTTP Method | Request Body | Response Code | Response Body | Remarks |
| --- | --- | --- | --- | --- | --- |
| /login | POST | { "nid": "string", "password": "string" } | 200 | - | Login token will be sent |
| /logout | GET | - | 200 | - | - |
| /signup | POST | {"nid": "string", "firstname" : "string", "lastname": "string", "password": "string", "gender": "string", "age": "int", "location": "string"} | 201 | - | - |


### User API

| API Endpoint | HTTP Method | Request Body | Response Code | Response Body | Remarks |
| --- | --- | --- | --- | --- | --- |
| /income | POST | { "income": "double", "year": "int", "location": "string" } | 201 | - | Provides the current income as the input to the calculator |
| /tax | GET | - | 200 | { "tax": "double" } | Calculates the tax and shows in UI |
| /report | GET | - | 200 | { "tax_id": "int", "year": "int", "location": "string", "income": "double", "tax": "double" } | Generates a table with all the details |