var couchbase = require('couchbase')

couchbase.connect(
  'couchbase://host.docker.internal',
  {
    username: 'dbuser',
    password: 'Password@123$'
  },
  (err, cluster) => {
    var bucket = cluster.bucket('test')
    var coll = bucket.defaultCollection()

    newdoc = {
      type: "hotel",
      id: 2,
      name: "Le Grande",
      city: "Paris, France"
    }

    coll.upsert('hotel_2', newdoc, (err, res) => {
      console.log("Hotel added")
      console.log(res)
    })
  }
) 