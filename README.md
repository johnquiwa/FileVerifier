# FileVerifier
### FileVerifier is a fullstack javascript application (React, Node/Express, Postgres) that ties a specific hash of a file to a specific user.

## User Flow Example
* A university employee with the email of `employee@university.edu` uploads `transcript-student-a.png` for `Student A`. This file is converted to a buffer and then hashed using `sha_256`. The hash is saved with the university's userId in the postgres db. The original file can then be given to `Student A` to send to prospective employers.
* If `Employer B` receives `transcript-student-a.png`, the employer can verify the authenticity of the file by uploading it to the verify service and sending a POST `/files/verify` with the hash and the university's confirmation email (`employee@university.edu`).
* The server then checks to see if the university ever sent that specific hash corresponding to `transcript-student-a.png`.
* Any alteration to `transcript-student-a.png` results in a completely different hash, so `Employer B` can rest assured that `Student A` has sent a valid transcript.

## To Run Server
* Have postgres running and create a db called `verifier`
* `npm install`
* `cd server`
* `node src/app`

## To Run Client
* `cd client`
* `npm install`
* `npm start`

## Next Steps
* We can utilize the Ethereum blockchain to store a mapping of these hashes to users to prevent a single point of failure

## TODOS
* Implement unit tests
