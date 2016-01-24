var pg = require('pg'), // PostgreSQL
    moment = require('moment');

info = {
  benchpress: [
    { date: '2016-01-23', log: [{ weight: '120', reps: '8' }, { weight: '25', reps: '2' }]},
    { date: '2016-01-24', log: [{ weight: '420', reps: '9' }, { weight: '425', reps: '1' }]}
  ]
};

info_string = JSON.stringify(info);

// pg.connect(process.env.DATABASE_URL, function(err, client, done) {
//   client.query("INSERT INTO exercise_info VALUES ('10208230319658648', '" + info_string + "');", function(err, result) {
//     done();
//     if (err)
//      { console.error(err); }
//     else
//      { console.log(result); }
//   });
// });

pg.connect(process.env.DATABASE_URL, function(err, client, done) {
  client.query("SELECT * from exercise_info where id='10208230319658648';", function(err, result) {
    done();
    if (err)
     { console.error(err); }
    else
     { info = JSON.parse(result.rows[0].info);
        check = moment(info.benchpress[0].date);
        console.log(check);}
  });
});
