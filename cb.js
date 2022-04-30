const myArgs = process.argv.slice(2);
var protocol="couchbase://"; 
if(myArgs.length>1 && myArgs[1]=='s'){
    protocol='couchbases://';
}
const clusterConnStr = protocol+myArgs[0];
console.log(clusterConnStr);
const cloudRootCertificate = 'root.pem';
const username = 'dbuser';
const password = 'Password@123$';
const bucketName = 'test';
async function go() {
    try {
        const cluster = await couchbase.connect(clusterConnStr, {
            username: username,
            password: password,
            security: {
                trustStorePath: cloudRootCertificate
            }
        });
        const bucket = cluster.bucket(bucketName);
        const collection = bucket.defaultCollection();
        // Create and store a document
        await collection.upsert('user:king_arthur', {
            name: 'Arthur',
            email: 'kingarthur@couchbase.com',
            interests: ['Holy Grail', 'African Swallows']
        });
        let getResult = await collection.get('user:king_arthur');
        console.log('got: ', getResult);
    }
    catch (e) {
        console.log(e);
    }
}
go();