# Description

This is a practice of basic node functions.

Following the tutorial: https://www.youtube.com/watch?v=f2EqECiTBL8

# Content

1.  Loggin event using custome function with date-fns, uuid, and EventEmitter.

1.  Basic ExpressJS Routing: https://expressjs.com/en/guide/routing.html

    - Basic routing with regex
    - Route handlers chaining using next()
    - Difference btw routing(catch all) using app.get("/", ...) or app.all("\*", ...)
      - Both accept regex

1.  Middleware

    - Built-in middleware to handle content-type (urlencoded, json, ...etc.)
    - Custom middleware
      - logger: Logs the event(req)
      - errLogger: Logs error
    - Others: CORS
      - How to set corsOptions (white list)
