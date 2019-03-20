const ExcelReader = require('node-excel-stream').ExcelReader;
const Building = require('../models/building');

module.exports = {

    index: async (req, res) => {
        res.render('page/buildingmanage');
    },

    addBuilding: async (req, res) => {
        console.log(req.body);
        req.busboy.on('file', function (fieldname, file, filename, encoding, mimetype) {
            let buildingFile = file;
            if (fieldname == "building") {
                let reader = new ExcelReader(buildingFile, {
                    sheets: [{
                        name: 'Sheet1',
                        rows: {
                            headerRow: 1,
                            allowedHeaders: [{
                                name: 'building_id',
                                key: 'building_id'
                            }, {
                                name: 'buiding_name',
                                key: 'buiding_name'
                            }]
                        }
                    }]
                })

                reader.eachRow(async (rowData, rowNum, sheetSchema) => {
                    console.log(rowData);
                    let building = new Building(rowData);

                    await building.save();
                })
                    .then(() => {
                        console.log('done parsing : ' + fieldname);
                    });
            }
        })
        res.flash('<span uk-icon="icon: check"></span> อัพโหลดไฟล์สำเร็จ','success');
        res.redirect('/building');
    }
}