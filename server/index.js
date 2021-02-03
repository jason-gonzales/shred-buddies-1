
require('dotenv/config');
const express = require('express');

const db = require('./database');
const ClientError = require('./client-error');
const staticMiddleware = require('./static-middleware');
const sessionMiddleware = require('./session-middleware');

const app = express();

app.use(staticMiddleware);
app.use(sessionMiddleware);

app.use(express.json());

app.get('/api/health-check', (req, res, next) => {
  db.query('select \'successfully connected\' as "message"')
    .then(result => res.json(result.rows[0]))
    .catch(err => next(err));
});

app.get('/api/resort', (req, res, next) => {
  const sql = `
    select *
    from resort
    `;
  db.query(sql)
    .then(result => res.status(200).json(result.rows))
    .catch(err => next(err));
});

app.get('/api/resort/:resortId', (req, res, next) => {
  const resortId = parseInt(req.params.resortId, 10);
  const select = `
        select *
        from "resort"
        where "resortId" = $1
  `;
  db.query(select, [resortId])
    .then(result => {
      if (!result.rows[0]) {
        next(new ClientError(`cannot find eventId of ${resortId}`, 404));
      } else {
        res.status(200).json(result.rows[0]);
      }
    });
});

app.get('/api/profile', (req, res, next) => {
  const select = `
        select *
        from profile
  `;
  db.query(select)
    .then(result => res.status(200).json(result.rows))
    .catch(err => next(err));
});

app.get('/api/profile/:profileId', (req, res, next) => {
  const profileId = parseInt(req.params.profileId, 10);
  const select = `
        select *
        from "profile"
        where "profileId" = $1
  `;
  db.query(select, [profileId])
    .then(result => {
      if (!result.rows[0]) {
        next(new ClientError(`cannot find eventId of ${profileId}`, 404));
      } else {
        res.status(200).json(result.rows[0]);
      }
    });
});

app.post('/api/profile', (req, res, next) => {
  if (!req.body.name && !req.body.email && !req.body.skill && !req.body.imgUrl && !req.body.description) throw new ClientError(' Name , email, skill, imgUrl,description must be fill out', 400);
  const insert = `
        insert into "profile"("name", "email","skill", "imgUrl", "description")
        values ($1,$2,$3,$4,$5)
        returning *
 `;
  const values = [req.body.name, req.body.email, req.body.skill, req.body.imgUrl, req.body.description];
  db.query(insert, values)
    .then(result => res.status(200).json(result.rows[0]))
    .catch(err => next(err));
});

app.get('/api/event', (req, res, next) => {
  const select = `
          select *
          from event
  `;
  db.query(select)
    .then(result => res.status(200).json(result.rows))
    .catch(err => next(err));
});

app.get('/api/event/:eventId', (req, res, next) => {
  const eventId = parseInt(req.params.eventId, 10);
  const select = `
        select *
        from "event"
        where "eventId" = $1
  `;
  db.query(select, [eventId])
    .then(result => {
      if (!result.rows[0]) {
        next(new ClientError(`cannot find eventId of ${eventId}`, 404));
      } else {
        res.status(200).json(result.rows[0]);
      }
    });
});

// app.get('/api/events', (req, res, next) => {
//   const sql = `
//  select "e"."eventId",
//   "r"."imgUrl" as "resortImage"
//     from "event" as "e"
//     join "resort" as "r" using ("resortId")

//     `;
//   db.query(sql)
//     .then(result => {
//       return res.status(200).json(result.rows[0]);
//     });

// });
app.get('/api/events', (req, res, next) => {
  const sql = `
  select "e"."eventId",
    "r"."imgUrl" as "resortImage",
    "r"."name"as "resortName",

    "e"."description" as "eventDescription",
    "e"."startDate" as "start",
    "e"."endDate" as "end"
    from "event" as "e"
    join "resort" as "r" using ("resortId")


    `;
  db.query(sql)
    .then(result => res.status(200).json(result.rows))
    .catch(err => console.error(err));

});

app.post('/api/event', (req, res, next) => {
  if (!req.body.resortId && !req.body.startDate && !req.body.endDate && !req.body.profileId && !req.body.description) throw new ClientError(' resortId , startDate, endDate, profileId, description must be fill out', 400);
  const insert = `
        insert into "event"("resortId", "startDate","endDate", "profileId", "description")
        values ($1,$2,$3,$4,$5)
        returning "eventId"
 `;
  const values = [req.body.resortId, req.body.startDate, req.body.endDate, req.body.profileId, req.body.description];
  db.query(insert, values)
    .then(result => result.rows[0])
    .then(result => {
      const select = `
        select "e"."eventId",
                "e"."startDate",
                "e"."endDate",
                "e"."description",
                "p"."name" as "profileName",
                "p"."imgUrl"as "profileImg",
                "r"."name" as "resortName",
                "r"."imgUrl" as "resortImg"
                from "event" as "e"
                join "profile" as "p" using("profileId")
                join "resort" as "r" using("resortId")
                where "e"."eventId" = $1
      `;
      db.query(select, [result.eventId])
        .then(result => {
          res.status(201).json(result.rows);
        });
    })
    .catch(err => {
      console.error(err);
      next(err);
    });
});

app.delete('/api/event/:eventId', (req, res) => {
  const eventId = parseInt(req.params.eventId, 10);
  if (!Number.isInteger(eventId) || eventId <= 0) {
    res.status(400).json({
      error: `${eventId} is an invalid eventId`
    });

  }
  const sql = `
  delete from "event"
where "eventId"= $1
returning *
`;
  const values = [eventId];

  db.query(sql, values)
    .then(result => {
      const event = result.rows[0];
      if (!event) {
        res.status(404).json({
          error: 'The event cant be found'
        });
      } else {
        res.status(204).json(event);
      }

    })
    .catch(err => {
      console.error(err);
      res.status(500).json({
        error: 'An unexpected error occurred'
      });
    });
});

app.use('/api', (req, res, next) => {
  next(new ClientError(`cannot ${req.method} ${req.originalUrl}`, 404));
});

app.use((err, req, res, next) => {
  if (err instanceof ClientError) {
    res.status(err.status).json({ error: err.message });
  } else {
    console.error(err);
    res.status(500).json({
      error: 'an unexpected error occurred'
    });
  }
});

app.listen(process.env.PORT, () => {
  // eslint-disable-next-line no-console
  console.log('Listening on port', process.env.PORT);
});
