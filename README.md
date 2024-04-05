# FOSS Front Row
A lightweight event ticketing platform, self-hostable, built using the MERN stack.

[VIDEO DEMONSTRATION](https://www.youtube.com/watch?v=rvq_WHKXlh8)

[LIVE WEBSITE](https://foss-front-row.marcobuontempo.com/)

**NOTE: due to using a free hosting solution to showcase the project, the backend server may take a while to respond to the first request**

## Contents
- [Usage](#usage)
- [Setup](#setup)
- [Design](#design)
- [Contributing](#contributing)
- [Issues and Limitations](#issues-and-limitations)
- [License](#license)

## Usage
- A live demo deployment can be found here: [FOSS Front Row](https://foss-front-row.marcobuontempo.com/) 
- To self-host or locally deploy, please refer to the [setup](#setup) instructions below.
- Once deployed, you can view all backend endpoints by accessing the Swagger UI Docs at the `/api-docs` endpoint.


## Setup

### 1. Database (MongoDB)
1. Use the docker-compose.yaml (deploys a mongo replica set) for a local DB, or otherwise use a cloud solution (such as [Mongo Atlas](https://www.mongodb.com/atlas/database)).

    **Note:** *must use either a MongoDB Replica or Cluster set, to enable Mongo transactions. Regular standalone instances are not supported.*

### 2. Backend
1. Create a `.env` file in the `/backend` folder:
    ```.env
    PORT=<custom_port>
    FRONTEND_URL=<frontend_url_for_cors_access>
    MONGODB_URI=mongodb://<host>:<port>/<collection_name>
    JWT_SECRET_KEY=<custom_jwt_signing_key>
    ```
1. `cd backend`
1. `npm run build`
1. `npm run start`

### 3. Frontend
1. Create a `.env` file in the `/frontend` folder:
    ```.env
    VITE_BACKEND_URL=<backend_base_url>
    ```
1. `cd frontend`
1. `npm run build`
1. `npm run start`


## Design
- ### *QR Codes*
  - Using the frontend, each ticket's data can be generated into a QR Code.
  - Each ticket's data requires a UID, which is generated from the backend.
  - Generated tickets can be saved offline into a file, and even printed.
  - To check-in to an event, the event owner can scan the QR Code of a patron's ticket. Invalid or consumed tickets will not be able to check-in. This allows for a streamlined process, and stops duplication of tickets.
- ### *JWT Auth*
  - JSON Web Tokens are used for authentication and authorisation.
  - Default expiry is 7 days.
  - The JWT is stored in a HTTP-only cookie, adding security against XSS attacks, resistent to tampering, and improving ease-of-use.
- ### *Admin and User Roles*
  - Separate roles have been implemented: 'admin' and 'user'.
  - Admin has all of the same generic privileges as regular Users, with additional abilities.
  - Additional privileges are generally just the ability to fetch *all* information for a collection (e.g. `/users`, which exposes the data of all users to admin, and is ***not*** accessible by other regular users).
- ### *Ticket UID and Hashing*
  - Each ticket will have an associated UID, generated by the backend using data inaccessible to frontend users.
  - UID's are hashed, to prevent decoding of ticket data, preventing the generation of counterfeit tickets.
- ### Redux Global State
  - Frontend leverages Redux, to simplify global states (such as 'cart').
  - Redux state is persisted using localStorage.
- ### ACID Compliance
  - Transactions have been implemented into the system, allowing for ACID compliance, as necessary for a ticketing system that relies on real-time information.
  - This allows the prevention of certain race conditions, and ensures a ticket can only be a single-use.


## Contributing
- Contributions are not expected, but feel free if you want to raise issues or submit a pull request.
- The main priorities for any future updates, if necessary, would be:
  - Bug Fixes
  - Unit Tests
  - Feature additions and/or improvements
- If you have already locally deployed, you can use `./run-dev.sh` in the terminal to automatically start the local database, backend, and frontend simultaneously.


## Issues and Limitations
- As a proof-of-concept application, time and costs were considered, which resulted in some limitations.
- MongoDB's ACID compliancy is as not rigorous as other RDBS, but should still suffice for this use case.
- Swagger Docs may have discrepencies and lack certain details.
- Admin accounts can currently only be assigned using direct access to the MongoDB Collection, and manually changing a user's role from 'user' to 'admin'.
- Some unused endpoints are exposed, which may lead to unintended consequences. Most notably, updating a ticket at `/events/{eventid}/tickets/{ticketid}` may cause side-effects if the ticket is already reserved by a user. These endpoints have not been implemented with actions on the frontend.
- Refresh tokens and JWT blacklists are not implemented. That is, once a JWT is issued, it is valid until it expires. Logout functionality works by overriding the current token with an expired one (since HTTP-only tokens are not modifiable with Javascript, and therefore cannot be cleared, and only overridden).
- Each ticket can be assigned a price, although at this stage, this feature has not been implemented; Currently, all tickets are generated with the default price of 0.


## License
[Apache License 2.0](LICENSE)
