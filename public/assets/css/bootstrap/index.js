import {app} from '../../../../src/app/modules/app.module.js';
import multer from 'multer';
import {Book} from '../../../../src/app/models/book.model.js';
var storage = multer.diskStorage({
    destination : (req , file , cb) => {
        cb(null , 'uploads');
    },
    filename : (req , file , cb) => {
        cb(null, file.fieldname + '-' + Date.now());
    }
});

var upload = multer({storage : storage})

 
app.get('/add-book', (req, res) => {
    Book.find({}, (err, items) => {
        if (err) {
            console.log(err);
            res.status(500).send('An error occurred', err);
        }
        else {
            res.render('/add-book', { items: items });
        }
    });
});


app.post('/add-book', upload.single('img'), (req, res, next) => {

	var obj = {
		title: req.body.title,
        desc: req.body.desc,
        year : req.body.year,
		img: {
			data: fs.readFileSync(path.join(__dirname + '/uploads/' + req.file.filename)),
			contentType: 'image/png'
		}
	}
	Book.create(obj, (err, item) => {
		if (err) {
			console.log(err);
		}
		else {
			item.save();
			res.redirect('/add-book');
		}
	});
});


