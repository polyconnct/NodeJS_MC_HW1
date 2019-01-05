[NodeJS Master Class](https://pirple.thinkific.com/courses/the-nodejs-master-class)
---
#### Homework Assignment #1, #6

A simple "Hello World" API:

* A RESTful JSON API that listens on a port `8000`.
* When someone `POST`s anything other than an empty string to the route `/hello`,
it returns the following message in `JSON` format:

```
{
    "message": "Thanks for your valuable payload"
}
```

The implementation follows the assigned task as explicitly as possible,
returning the `JSON`-formatted greeting **only** if all of the conditions are met:
* `POST`
* contains payload
* to the route `/hello`.

Requests to the `/hello` but those not `POST` or lacking the payload are returned with the response
 `204 No Content`.

Added multi-core support using ```cluster``` module as per Homework #6 Assignment.
