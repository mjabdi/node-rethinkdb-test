const r = require('rethinkdb');

//  const HOST = 'localhost';
const HOST = '172.29.238.6';


r.connect({
    host: HOST,
    port: 28015,
    db: 'test'
}, (err, conn) => {
    if (err) {
        console.log(`could not connect to the DB! : ${config.DBHost}:${config.DBPort}`);
        process.exit(1);
    }
    else {
        console.log(`connected to DB!`);
        r.dbCreate('test').run(conn, (result) => {

            r.db('test').tableCreate('tbl_test').run(conn , (result) =>
            {
                for (var i=0 ; i <= 1000000 ; i++)
                {
                    r.db('test').table('tbl_test').insert({
                       record : 'test' ,
                       timestamp : Date.now()                      
                    }).run(conn,{durability : 'soft' , noreply : true} , (err, result) => {})
                
                    if (i % 1000 === 0)
                    {
                        console.log(i);
                    }
                }
            } );
        });
    }
});
