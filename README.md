# Products API Documentation

## Overview
This API provides CRUD operations for managing products. It's constructed using Express and communicates with a MySQL database.

## Prerequisites
- **Node.js and npm**
- **Express.js**
- **moment** for date formatting
- **MySQL** server with the necessary Node.js driver

## Setup
1. **Install Dependencies**
    ```bash
    npm install express moment whatap mysql2
    ```

2. **Database Connection**
    - Ensure you modify the `dbConnect` module to connect to your database.

3. **Server Start**
    ```bash
    node [your server file name]
    ```
   Once you start the server, it should run on port 3000.

## API Endpoints
### 1. Get All Products
- **Method:** GET
- **Endpoint:** `/products`

### 2. Get Product by ID
- **Method:** GET
- **Endpoint:** `/products/:id`

### 3. Add New Product
- **Method:** POST
- **Endpoint:** `/products`
- **Payload:**
    ```json
    {
        "name": "Product Name",
        "price": 100,
        "description": "Product Description"
    }
    ```

### 4. Update Product by ID
- **Method:** PUT
- **Endpoint:** `/products/:id`
- **Payload:**
    ```json
    {
        "name": "Updated Product Name",
        "price": 150,
        "description": "Updated Product Description"
    }
    ```

### 5. Delete Product by ID
- **Method:** DELETE
- **Endpoint:** `/products/:id`

## Error Handling
In case of errors, the API will return a JSON response of the form:
```json
{
"success": false,
"message": "Descriptive error message."
}
```
Errors are also logged in the console for debugging.
