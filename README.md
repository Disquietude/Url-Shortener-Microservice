# URL Shortener Microservice

Microservice that takes a URL submitted through a POST request and returns a shortened URL.

## API Endpoints:

### POST /api/shorturl/new

Submits a URL (as form data with `Content-Type: application/x-www-form-urlencoded`) to be shortened.

### GET /api/shorturl/:short_url

Redirects to the original URL that corresponds to the shortened URL.

Route Parameters:
  * short_url: Integer that was assigned to the original URL when it was submitted. 