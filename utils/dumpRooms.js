var mongo = require('mongodb').MongoClient

var rooms = [{
	name:'Entrepreneurship',
	capacity:'10-15',
	tv:true,
	phone:true
}, {
	name:'Creativity',
	capacity:'6-8',
	tv:true,
	phone:true
}, {
	name:'Agility',
	capacity:'6-8',
	tv:true,
	phone:true
}, {
	name:'Inclusive',
	capacity:'10-12',
	tv:true,
	phone:true
}, {
	name:'Culture',
	capacity:'2-4',
	tv:false,
	phone:false
}, {
	name:'Intgrity',
	capacity:'4-6',
	tv:false,
	phone:false
}, {	
	name:'Joy',
	capacity:'8-10',
	tv:true,
	phone:false
}]


mongo.connect('mongodb://localhost:27017/meeting-room',function(err,db) {
	if(err) {
		console.log(err)
	}
	else {
		db.collection('rooms').insert(rooms,function(err) {
			if(err) {
				console.log(err)
			}
			else {
				console.log('Successfully dumped room data')
			}
		})
	}
})