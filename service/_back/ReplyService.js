/**
 * Created by cheese on 2017. 1. 24..
 */

const
	mysql_dbc = require('../../commons/db_conn')(),
	connection = mysql_dbc.init(),
	QUERY = require('../../database/query'),
	Reply = {};

/**
 * 댓글 CURD,
 * 답글 CURD,
 * @type {{}}
 */



Reply.write = (reply_info, callback) => {
	connection.query(QUERY.Reply.Write, reply_info, (err, result) => {
		if (!err) {
			callback(null, {success: true, msg: '댓글을 입력했습니다.'});
		} else {
			callback(err, {success: false, msg: '디사 시도해주세요'});
		}
	});
};

Reply.modify = (reply_info, callback) => {
	connection.query(QUERY.Reply.Modify, [reply_info.comment, reply_info.id], (err, result) => {
		if (!err) {
			callback(null, {success: true, msg: '댓글을 수정했습니다.'});
		} else {
			callback(err, {success: false, msg: '디사 시도해주세요'});
		}
	});
};

Reply.remove = (id, callback) => {
	connection.query(QUERY.Reply.Remove, id, (err, result) => {
		if (!err) {
			callback(null, {success: true, msg: '댓글을 삭제했습니다.'});
		} else {
			callback(err, {success: false, msg: '디사 시도해주세요'});
		}
	});
};

module.exports = Reply;
