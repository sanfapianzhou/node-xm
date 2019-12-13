var request = require('request');
const http = require("http");
const fs = require("fs");
const mysql = require('mysql')
var db = mysql.createConnection({ //配置参数，然后添加你的数据库里面的表
  host: '39.105.97.191',
  user: 'root',
  password: 'chai1234',
  port: '3306',
  database: 'sucksonblog'
})
db.connect(function (err) {
  if (err) console.log('连接失败');
  else {
    console.log('连接成功');
  }
});
var data = {
  area: 72,
  afficheType: 22,
  IsToday: '',
  title: '',
  proID: '',
  _search: false,
  nd: '',
  rows: 1,
  page: 1,
  sidx: 'PublishStartTime',
  sord: 'desc'
}
request.post('http://www.hzctc.cn/SecondPage/GetNotice', {
    form: data
  },
  function (error, response, body) {
    data.rows = JSON.parse(response.body).records;
    request.post('http://www.hzctc.cn/SecondPage/GetNotice', {
      form: data
    }, function (error, response, body) {
      if (!error && response.statusCode == 200) {
        for (var i = 0, al = JSON.parse(response.body).rows.length; i < al; i++) {
    
          var newssdq = JSON.parse(response.body).rows[i].CodeName,
            newxmbh = JSON.parse(response.body).rows[i].TenderNo,
            newbxmc = JSON.parse(response.body).rows[i].TenderName,
            newshji = JSON.parse(response.body).rows[i].PublishStartTime + ' ———— ' + JSON.parse(response.body).rows[i].PublishEndTime;
            newurl = 'http://www.hzctc.cn/AfficheShow/Home?AfficheID=' + JSON.parse(response.body).rows[i].ID +'&IsInner=0&ModuleID=22';
          
              var addSql = 'INSERT  INTO gcwj (ssdq,xmbh,bxmc,shji,url)VALUES(?,?,?,?,?)';
              var addSqlParams = [ newssdq, newxmbh, newbxmc, newshji,newurl];
              db.query(addSql, addSqlParams, function (err, result) {
                if (result) {
                // console.log(result)
                } else {
                  console.log('插入失败');
                }
              });
        }
      }
    }
    );
  });