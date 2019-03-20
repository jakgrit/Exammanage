const mongoose = require('mongoose');
const Schema = mongoose.Schema;
var bcrypt = require('bcryptjs');

const loginSchema = new Schema({
	username: {
		type: String,
		required: true,
		unique: true,
		lowercase: true
	},
	password: {
		type: String,
		required: true
	},
	status: {
		type: Number,
		required: true
	}
}, {
	timestamps: {
		createdAt: 'create_at',
		updatedAt: 'update_at'
	}
});

loginSchema.pre('save', async function (next) {
	try {
		const salt = await bcrypt.genSalt(10);
		const passwordHash = await bcrypt.hash(this.password, salt);
		this.password = passwordHash;
		next();
	} catch (error) {
		next(error);
	}
});

loginSchema.methods.isValidPassword = async function (newPassword) {
	try {
		return await bcrypt.compare(newPassword, this.password);
	} catch (error) {
		throw new Error(error);
	}
}

const Login = mongoose.model('login', loginSchema, 'login');

module.exports = Login;