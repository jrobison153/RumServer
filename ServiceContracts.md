# Service Contracts

## Cars

### Makes

**Description:** Retrieve collection of automobile makes for a given production year

**URL:** /car/makes

**Method:**: GET

**Query Parameters:** year

**Success HTTP Status Code:** 200

**Request Example:** /car/makes?year=1987

**Response Payload Example:**
 
```

{
    makes: ["Audi", "BMW", "Ford"]
}

```

### Models

**Description:** Retrieve collection of automobile models for a given production year and make

**URL:** /car/models

**Method:**: GET

**Query Parameters:** year, make

**Success HTTP Status Code:** 200

**Request Example:** /car/models?year=1987&make=Ford

**Response Payload Example:**
 
```

{
    makes: ["F150", "Focus", "Mustang"]
}

```

### Packages

**Description:** Retrieve collection of automobile packages for a given production year, make, model

**URL:** /car/packages

**Method:**: GET

**Query Parameters:** year, make, model

**Success HTTP Status Code:** 200

**Request Example:** /car/models?year=1987&make=Ford&model=Mustang

**Response Payload Example:**
 
```

{
    makes: ["F150", "Focus", "Mustang"]
}

```


### Years

**Description:** Retrieve collection of automobile years

**URL:** /car/years

**Method:**: GET

**Query Parameters:** None

**Success HTTP Status Code:** 200

**Request Example:** /car/years

**Response Payload Example:**
 
```

{
    years: ["2015", "2014, "2013"]
}

```

## Rate

### Carriers

**Description:** Retrieve insurance carrier information. This is a mock service to support the PoC. This service
takes as parameters the carrier identifier and a 'wait' time in milliseconds. The wait time is there to instruct the service to
pause before returning the identified carrier information, which also includes auto premium. The purpose of the 
wait is to allow the client to simulate parallel async calls to multiple carriers in which the results are returned
in an unknown order. The client should display results as they are returned giving the user the perception of
performance. 

**URL:** /carriers

**Method:**: GET

**Query Parameters:** carrierId, waitPeriod

**Success HTTP Status Code:** 200

**Request Example:** /carriers?carrierId=geico&waitPeriod=9000

**Response Payload Example:**
 
TBD

## Quote

### Save

**Description:** Save quote data

**URL:** /quote 

**Method:**: POST

**Query Parameters:** None

**Success HTTP Status Code:** 200

**Failure HTTP Status Code:** 500

**Request Example:** /quote

**Request Payload Example**:
Payload must be a json object. The only requirement is that the object have a field named quoteId at the root level and
the value of this field must be a unique identifier for the quote.

```javascript
{
    quoteId: "3989ASDDFS8seDDD",
    whatever....
}

```

**Response Payload Example:**
 
NA

### Get

**Description:** Get quote data for quote/session id

**URL:** /quote

**Method:**: GET

**Query Parameters:** quoteId

**Success HTTP Status Code:** 200

**Failure HTTP Status Code:** 500

**Request Example:** /quote?quoteId=ADD334399SSS

**Response Payload Example:**
 
JSON object that was previously persisted for quoteId

```javascript

{
    quoteId: "ADD334399SSS",
    whatever
}

```