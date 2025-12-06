# API Conventions

This document defines the API standards and conventions for the EduMatch platform to ensure consistency, maintainability, and ease of integration across all microservices.

## Table of Contents

- [RESTful Principles](#restful-principles)
- [HTTP Methods](#http-methods)
- [HTTP Status Codes](#http-status-codes)
- [Error Response Format](#error-response-format)
- [Request/Response Guidelines](#requestresponse-guidelines)
- [Pagination, Filtering & Sorting](#pagination-filtering--sorting)
- [Versioning](#versioning)
- [Authentication & Authorization](#authentication--authorization)

---

## RESTful Principles

EduMatch APIs follow REST (Representational State Transfer) architectural style:

1. **Resource-Based**: URLs represent resources (nouns), not actions
2. **HTTP Methods**: Use standard HTTP methods for CRUD operations
3. **Stateless**: Each request contains all information needed
4. **JSON Format**: All requests and responses use JSON
5. **Consistent Naming**: Use plural nouns for collections

### Resource Naming Conventions

✅ **Good Examples:**
```
GET    /api/v1/scholarships
GET    /api/v1/scholarships/{id}
POST   /api/v1/scholarships
GET    /api/v1/students/{studentId}/applications
```

❌ **Bad Examples:**
```
GET    /api/v1/getScholarships          # Don't use verbs
GET    /api/v1/scholarship/{id}          # Use plural nouns
POST   /api/v1/createScholarship         # Don't use verbs
GET    /api/v1/student-applications      # Use nested resources
```

---

## HTTP Methods

| Method | Usage | Idempotent | Safe |
|--------|-------|------------|------|
| **GET** | Retrieve resource(s) | ✅ Yes | ✅ Yes |
| **POST** | Create new resource | ❌ No | ❌ No |
| **PUT** | Replace entire resource | ✅ Yes | ❌ No |
| **PATCH** | Partial update resource | ❌ No | ❌ No |
| **DELETE** | Remove resource | ✅ Yes | ❌ No |

### GET - Retrieve Resources

**List all scholarships:**
```http
GET /api/v1/scholarships HTTP/1.1
```

**Response (200 OK):**
```json
{
  "content": [
    {
      "id": "sch-123",
      "name": "Merit Scholarship 2025",
      "amount": 5000.00,
      "deadline": "2025-12-31"
    }
  ],
  "page": 0,
  "size": 20,
  "totalElements": 150,
  "totalPages": 8
}
```

**Get single scholarship:**
```http
GET /api/v1/scholarships/sch-123 HTTP/1.1
```

**Response (200 OK):**
```json
{
  "id": "sch-123",
  "name": "Merit Scholarship 2025",
  "amount": 5000.00,
  "deadline": "2025-12-31",
  "eligibilityCriteria": {
    "minGpa": 3.5,
    "maxAge": 25
  }
}
```

### POST - Create Resource

**Create new scholarship:**
```http
POST /api/v1/scholarships HTTP/1.1
Content-Type: application/json

{
  "name": "STEM Excellence Award",
  "amount": 10000.00,
  "deadline": "2025-06-30",
  "eligibilityCriteria": {
    "minGpa": 3.8,
    "majors": ["Computer Science", "Engineering"]
  }
}
```

**Response (201 Created):**
```json
{
  "id": "sch-456",
  "name": "STEM Excellence Award",
  "amount": 10000.00,
  "deadline": "2025-06-30",
  "createdAt": "2025-12-05T20:43:56+07:00"
}
```

### PUT - Replace Resource

**Update entire scholarship:**
```http
PUT /api/v1/scholarships/sch-123 HTTP/1.1
Content-Type: application/json

{
  "name": "Merit Scholarship 2025 - Updated",
  "amount": 6000.00,
  "deadline": "2025-12-31",
  "eligibilityCriteria": {
    "minGpa": 3.5,
    "maxAge": 25
  }
}
```

**Response (200 OK):**
```json
{
  "id": "sch-123",
  "name": "Merit Scholarship 2025 - Updated",
  "amount": 6000.00,
  "updatedAt": "2025-12-05T20:43:56+07:00"
}
```

### PATCH - Partial Update

**Update scholarship amount only:**
```http
PATCH /api/v1/scholarships/sch-123 HTTP/1.1
Content-Type: application/json

{
  "amount": 7000.00
}
```

**Response (200 OK):**
```json
{
  "id": "sch-123",
  "name": "Merit Scholarship 2025",
  "amount": 7000.00,
  "updatedAt": "2025-12-05T20:43:56+07:00"
}
```

### DELETE - Remove Resource

**Delete scholarship:**
```http
DELETE /api/v1/scholarships/sch-123 HTTP/1.1
```

**Response (204 No Content):**
```
(empty body)
```

---

## HTTP Status Codes

### Success Codes (2xx)

| Code | Status | Usage | Example |
|------|--------|-------|---------|
| **200** | OK | Successful GET, PUT, PATCH | Retrieved scholarship details |
| **201** | Created | Successful POST | Created new scholarship |
| **204** | No Content | Successful DELETE | Deleted scholarship |

### Client Error Codes (4xx)

| Code | Status | Usage | Example |
|------|--------|-------|---------|
| **400** | Bad Request | Invalid request data | Missing required field |
| **401** | Unauthorized | Authentication required/failed | Invalid or missing token |
| **403** | Forbidden | Insufficient permissions | User cannot delete scholarship |
| **404** | Not Found | Resource doesn't exist | Scholarship ID not found |
| **409** | Conflict | Resource conflict | Duplicate scholarship name |
| **422** | Unprocessable Entity | Validation failed | GPA out of valid range |
| **429** | Too Many Requests | Rate limit exceeded | Too many API calls |

### Server Error Codes (5xx)

| Code | Status | Usage | Example |
|------|--------|-------|---------|
| **500** | Internal Server Error | Unexpected server error | Database connection failed |
| **502** | Bad Gateway | Upstream service error | Payment service unavailable |
| **503** | Service Unavailable | Service temporarily down | Maintenance mode |
| **504** | Gateway Timeout | Upstream timeout | External API timeout |

---

## Error Response Format

All error responses **MUST** follow this standardized format:

### Standard Error Response

```json
{
  "timestamp": "2025-12-05T20:43:56+07:00",
  "status": 400,
  "error": "Bad Request",
  "message": "Validation failed for scholarship application",
  "path": "/api/v1/scholarships/apply",
  "errors": [
    {
      "field": "gpa",
      "message": "GPA must be between 0.0 and 4.0",
      "rejectedValue": "5.0"
    },
    {
      "field": "email",
      "message": "Invalid email format",
      "rejectedValue": "invalid-email"
    }
  ]
}
```

### Field Descriptions

| Field | Type | Required | Description |
|-------|------|----------|-------------|
| `timestamp` | string | ✅ Yes | ISO 8601 timestamp when error occurred |
| `status` | integer | ✅ Yes | HTTP status code |
| `error` | string | ✅ Yes | HTTP status text |
| `message` | string | ✅ Yes | Human-readable error description |
| `path` | string | ✅ Yes | Request path that caused error |
| `errors` | array | ❌ No | Field-level validation errors |

### Validation Error Details

Each validation error in the `errors` array contains:

```json
{
  "field": "fieldName",
  "message": "Error description",
  "rejectedValue": "actual value provided"
}
```

### Error Response Examples

**404 Not Found:**
```json
{
  "timestamp": "2025-12-05T20:43:56+07:00",
  "status": 404,
  "error": "Not Found",
  "message": "Scholarship not found with ID: sch-999",
  "path": "/api/v1/scholarships/sch-999"
}
```

**401 Unauthorized:**
```json
{
  "timestamp": "2025-12-05T20:43:56+07:00",
  "status": 401,
  "error": "Unauthorized",
  "message": "Invalid or expired authentication token",
  "path": "/api/v1/scholarships"
}
```

**403 Forbidden:**
```json
{
  "timestamp": "2025-12-05T20:43:56+07:00",
  "status": 403,
  "error": "Forbidden",
  "message": "Insufficient permissions to delete scholarship",
  "path": "/api/v1/scholarships/sch-123"
}
```

**500 Internal Server Error:**
```json
{
  "timestamp": "2025-12-05T20:43:56+07:00",
  "status": 500,
  "error": "Internal Server Error",
  "message": "An unexpected error occurred. Please contact support.",
  "path": "/api/v1/scholarships"
}
```

> [!IMPORTANT]
> **Never expose sensitive information** in error messages (e.g., stack traces, database details, internal paths). Log detailed errors server-side only.

---

## Request/Response Guidelines

### Content Type

- **Request**: `Content-Type: application/json`
- **Response**: `Content-Type: application/json`

### Property Naming

Use **camelCase** for all JSON properties:

✅ **Correct:**
```json
{
  "firstName": "John",
  "lastName": "Doe",
  "dateOfBirth": "2000-01-15",
  "gpaScore": 3.85
}
```

❌ **Incorrect:**
```json
{
  "first_name": "John",
  "LastName": "Doe",
  "date-of-birth": "2000-01-15"
}
```

### Date and Time Format

Use **ISO 8601** format:

- **Date**: `YYYY-MM-DD` (e.g., `2025-12-05`)
- **DateTime**: `YYYY-MM-DDTHH:mm:ss±HH:mm` (e.g., `2025-12-05T20:43:56+07:00`)
- **Time**: `HH:mm:ss` (e.g., `14:30:00`)

### Boolean Values

Use `true` or `false` (lowercase):

```json
{
  "isActive": true,
  "isEligible": false
}
```

### Null Values

Include fields with `null` values when the field exists but has no value:

```json
{
  "id": "sch-123",
  "description": null,
  "amount": 5000.00
}
```

### Arrays

Empty arrays should be `[]`, not `null`:

```json
{
  "scholarships": [],
  "applications": []
}
```

---

## Pagination, Filtering & Sorting

### Pagination

Use query parameters for pagination:

```http
GET /api/v1/scholarships?page=0&size=20 HTTP/1.1
```

**Parameters:**
- `page`: Page number (0-indexed, default: 0)
- `size`: Items per page (default: 20, max: 100)

**Response:**
```json
{
  "content": [...],
  "page": 0,
  "size": 20,
  "totalElements": 150,
  "totalPages": 8,
  "first": true,
  "last": false
}
```

### Filtering

Use query parameters for filtering:

```http
GET /api/v1/scholarships?status=active&minAmount=5000 HTTP/1.1
```

**Common filters:**
- `status`: Filter by status (e.g., `active`, `expired`)
- `minAmount`, `maxAmount`: Range filtering
- `search`: Full-text search
- `category`: Filter by category

### Sorting

Use `sort` query parameter:

```http
GET /api/v1/scholarships?sort=amount,desc&sort=deadline,asc HTTP/1.1
```

**Format**: `sort=field,direction`
- **field**: Property name to sort by
- **direction**: `asc` (ascending) or `desc` (descending)

---

## Versioning

### URL Path Versioning

Include API version in the URL path:

```
/api/v1/scholarships
/api/v2/scholarships
```

### Version Strategy

- **v1**: Current stable version
- **v2**: New version with breaking changes
- **Deprecation**: Announce 6 months before removing old version
- **Support**: Maintain previous version for 12 months minimum

### Breaking vs Non-Breaking Changes

**Breaking Changes** (require new version):
- Removing fields from response
- Changing field types
- Renaming fields
- Changing URL structure
- Changing authentication method

**Non-Breaking Changes** (same version):
- Adding new optional fields
- Adding new endpoints
- Adding new query parameters
- Deprecating fields (with notice)

---

## Authentication & Authorization

### Authentication

EduMatch uses **OAuth 2.0** with **Keycloak** for authentication.

**Authorization Header:**
```http
GET /api/v1/scholarships HTTP/1.1
Authorization: Bearer eyJhbGciOiJSUzI1NiIsInR5cCI6IkpXVCJ9...
```

### Authorization

Role-based access control (RBAC):

| Role | Permissions |
|------|-------------|
| **STUDENT** | View scholarships, submit applications |
| **ADMIN** | Full access to all resources |
| **REVIEWER** | Review applications, update status |
| **ORGANIZATION** | Manage own scholarships |

### Security Headers

Include security headers in all responses:

```http
X-Content-Type-Options: nosniff
X-Frame-Options: DENY
X-XSS-Protection: 1; mode=block
Strict-Transport-Security: max-age=31536000; includeSubDomains
```

---

## Best Practices

### 1. Use Appropriate HTTP Methods

Match HTTP methods to operations:
- **GET**: Read-only, no side effects
- **POST**: Create new resources
- **PUT**: Replace entire resource
- **PATCH**: Partial updates
- **DELETE**: Remove resources

### 2. Return Appropriate Status Codes

Always return the most specific status code:
- **201** for successful creation (not 200)
- **204** for successful deletion (not 200)
- **404** when resource not found (not 400)

### 3. Provide Meaningful Error Messages

Error messages should:
- Be clear and actionable
- Not expose sensitive information
- Include field-level details for validation errors

### 4. Design for Idempotency

GET, PUT, DELETE should be idempotent:
- Multiple identical requests = same result
- Safe to retry without side effects

### 5. Use HATEOAS (Optional)

Include links to related resources:

```json
{
  "id": "sch-123",
  "name": "Merit Scholarship",
  "_links": {
    "self": "/api/v1/scholarships/sch-123",
    "applications": "/api/v1/scholarships/sch-123/applications",
    "organization": "/api/v1/organizations/org-456"
  }
}
```

---

## Resources

- [REST API Tutorial](https://restfulapi.net/)
- [HTTP Status Codes](https://httpstatuses.com/)
- [OAuth 2.0 Specification](https://oauth.net/2/)
- [ISO 8601 Date Format](https://en.wikipedia.org/wiki/ISO_8601)

---

**Last Updated**: 2025-12-05  
**Version**: 1.0
