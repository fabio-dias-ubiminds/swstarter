# SWStarter

## Tech stack/Architecture

### Frontend

- TypeScript
- Next.js
- Tailwind CSS (layouts and responsiveness)
- Styled-components (component styling)
- Vitest and RTL

### Backend

- Typescript
- Express.js
- MongoDB (log storage)
- Redis (caching and queue)
- Winston (logging)
- Bull (queue)
- Vitest

## Running locally

run `docker-compose up` and reach:

- localhost:3000 for UI
- localhost:3001 for API
- localhost:8081 for mongoDB admin (login information: admin/admin123)
- localhost:8082 for Redis admin

## Testing

### After running the compose file:

- **UI**

  - navigate to `http://localhost:3000`, all UI features should be available there.

- **Stats endpoint**

  - Use the API endpoint `GET http://localhost:3001/api/stats?report=requestsHistogram` to check the latest histogram report which is auto generated at each 5 minutes
  - Use the API endpoint `GET http://localhost:3001/api/stats?report=externalRequestedLogsSummary` to check another report, this one is a manually triggered report, if you try it before requesting it at least once, it will not return data.

- **Send a new message to the jobs queue**
  - Push a new message to the queue using the `POST http://localhost:3001/api/queue/jobs` to push a new job request
  - you can use one of these body formats as example:
    `{"type":"externalRequestedLogsSummary", "payload": {"delay": 1000}} // this one allows you to push a job job with a delayed (time in ms) operation inside, to see the queue being processed`
    `{"type":"requestsHistogram", "payload": {}} // this one allows you to manually push an histogram report job anytime just like the scheduled operation does`

## API docs

- You can import the collection in the root folder and use on Insomnia
- You can use the API reference Below:

#### GET `/api/search`:

search either movies or people and return the matching results

**query:** `{ type: "movies" | "people", term: string }`

**Returns:** `{ id: number, label: string, type: "movies" | "people" }`

#### GET `/api/people/:id`:

get a person data by ID

**params:** `{ id: number }`

**Returns:** `{   id: number,  name: string,  birthYear: string,  gender: string,  eyeColor: string,  hairColor: string,  height: number,  mass: number,  movies: { id: string, title: string }[]}[]`

#### GET `/api/movies/:id`:

get a movie data by ID

**params:** `{ id: number }`

**Returns:** `{ id: number, title: string, openingCrawl: string, characters: { id: string, title: string }[]}[]`

#### GET `/api/stats`:

get the latest report of the specified type

**query:** `{ report: "requestsHistogram" | "externalRequestedLogsSummary" }`

**Returns:** `any`

#### POST `/api/queue`:

add a report generation job to the queue

**body:** `{ type: "requestsHistogram" | "externalRequestedLogsSummary" payload: any}`

**Returns:** `{ message: string, jobId: string, type: "externalRequestedLogsSummary" | "requestsHistogram", payload: any }`
