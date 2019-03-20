const Login = require('../models/login');

module.exports = {

    index: async (req, res) => {
        return res.render('page/login');
    },

    login: async (req, res) => {
        let {
            username,
            password
        } = req.body;

        let loginData = await Login.findOne({
            username: username
        });

        if (loginData) {
            let chackPass = await loginData.isValidPassword(password);
            if (chackPass) {
                req.session.login_user = loginData;
                res.flash('<span uk-icon="icon: happy"></span> ยินดีต้อนรับคุณ ' + loginData.username, 'success');
                return res.redirect('/manageuser');
            } else {
                res.flash('<span uk-icon="icon: warning"></span> รหัสผ่านไม่ถูกต้อง!!', 'danger');
                return res.redirect('/');
            }
        }

        res.flash('<span uk-icon="icon: warning"></span> ชื่อผู้ใช้ไม่ถูกต้อง!!', 'danger');
        res.redirect('/');


    },

    logOut: async (req, res) => {
        req.session.login_user = undefined;

        res.flash('<span uk-icon="icon: check"></span> ออกจากระบบสำเร็จ', 'success');
        res.redirect('/');
    },

    check: async (req, res) => {

    },

    addUser: async (req, res) => {
        let login = new Login({
            username: req.body.username,
            password: req.body.password,
            status: 0
        });
        login.save();
        return res.json(login);
    }

}