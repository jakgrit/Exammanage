const Building = require('../models/building');
const Room = require('../models/room');
module.exports = {
    
    index: async(req, res) =>{
        let buildings = await Building.find();
        res.render('page/roommanage',{
            buildings:buildings
        });
    },
    add:async(req, res)=>{
        let {name,row,col,building_id} = req.body;
        let building = await Building.findById(building_id);

        let room =  new Room({
            name:name,
            row:row,
            col:col,
            building:building._id
        })
        await room.save();
        res.flash('<span uk-icon="icon: check"></span> เพิ่มห้องสำเร็จ','success');
        res.redirect('/room');
    }
}