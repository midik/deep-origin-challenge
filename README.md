## URL Shortener

This project is a full-stack application, created as a solution for a test assignment. It is built with NestJS, NextJS/React, and PostgreSQL.

It allows users to create shortened versions of links to make them easier to share and remember. For example, a long URL like `https://some.place.example.com/foo/bar/biz` can be shortened to `https://short.ly/abc123`.

## Running the project

### Docker mode
This stack can be run using Docker Compose:
```bash
docker compose up -d
```
This will spin up all required containers, including the API and the frontend. You can access the frontend at http://localhost:3001.

### Development mode

#### Prerequisites
By default, backend expects PostgreSQL serving by the following URL: `postgresql://deep:deep@localhost:5432/deep`. This can be changed in the `/.env` file.

As an option, PostgresSQL can be spin up using Docker:
```bash
docker run --name postgres-dev -e POSTGRES_PASSWORD=deep -e POSTGRES_USER=deep -e POSTGRES_DB=deep -p 5432:5432 -d postgres
```

#### Backend
```bash
npm install

# This will create the database schema and seed the database with some data
npm run migrate:deploy && npm run seed

npm run start:dev
```
This will start the API on http://localhost:3000

#### Frontend
```bash
cd ui
npm install
npm run dev
```
This will start the frontend on http://localhost:3001


## Technical requirements

### Must have
:white_check_mark: Build a web page with a form for entering a URL

:white_check_mark: When the form is submitted, return a shortened version of the URL

:white_check_mark: Save a record of the shortened URL to a database

:white_check_mark: Ensure the slug of the URL (abc123 in the screenshot above) is unique

:white_check_mark: When the shortened URL is accessed, redirect to the stored URL

:information_source: (1) If an invalid slug is accessed, display a 404 Not Found page

###  Required Tech
:white_check_mark: React w/ typescript for the front end

:white_check_mark: Node.JS w/ typescript for the backend

:white_check_mark: Docker

### Extra Credit
:information_source: (2) Add support for accounts so people can view the URLs they created

:white_check_mark: Validate the URL provided is an actual URL

:white_check_mark: Make it easy to copy the shortened URL to the clipboard

:white_check_mark: Allow users to modify the slug of their URL

:white_check_mark: Track visits to the shortened URL

:white_check_mark: Add rate-limiting to prevent bad-actors from spamming the service

:white_check_mark: Update API to follow a known spec (such as json:api)

#### Notes
:information_source: (1) Despite trying different approaches, my lack of experience with NextJS and the time constraints led me to deprioritize this feature.

:information_source: (2) User accounts and URL-to-user relationships are implemented on the backend side, but the frontend currently uses a hardcoded mock user.

I'm open to discussing the implementation of these features and any other improvements.

## Run tests
I have added basic end-to-end tests in test/url.e2e-spec.ts. Unit tests are provided as they came with the example project.  

```bash
# unit tests
npm run test

# e2e tests
$ npm run test:e2e
```

## Documentation
Once the project is running, you can access the Swagger documentation on http://localhost:3000/api
