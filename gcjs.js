const http = require("http");
const fs = require("fs");
const mysql = require('mysql')

var npro = [351,925,926,927,355,356,357,928,359,360,929,361],
naff = [22,23,465,25,28],
    // nnd = [1576227170848,1576227973368,1576228289364,1576228306120,1576228326648,1576228371752,1576228390348,1576228413905,1576228437545,1576228455951,1576228469410,1576228486357],
     nmch =['建设工程','施工项目','监理项目','材料设备项目','园林绿化项目','勘察设计','物业项目','代建项目','交通项目','林水项目','代理比选项目','其他项目'];
      ngglx =['招标公告','答疑文件','答疑公告','中标前公示','中标公告']//'开标结果公示',
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
 for(var j=0;j<naff.length;j++){

for(var k=0;k<npro.length;k++){
  var request = require('request');

var data = {
  area: 72,
  afficheType: 22,
  IsToday: '',
  title: '',
  proID: '',
  number: '',
  _search: false,
  nd: '',
  rows: 1,
  page: 1,
  sidx: 'PublishStartTime',
  sord: 'desc'
}
   data.afficheType =naff[j];
   data.proID =npro[k];
  //  data.nd = nnd;
   var nnmch =nmch[k],
     nngglx = ngglx[j];
   pach(request,data,nnmch,nngglx);
  
}
}
  kbjg(); 
}
});


function pach(request,data,nnmch,nngglx){
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
             nmlb =nnmch,
              gglx =nngglx;
            newxmbh = JSON.parse(response.body).rows[i].TenderNo,
            newbxmc = JSON.parse(response.body).rows[i].TenderName,
            newshji = JSON.parse(response.body).rows[i].PublishStartTime + ' ———— ' + JSON.parse(response.body).rows[i].PublishEndTime;
            newurl = 'http://www.hzctc.cn/AfficheShow/Home?AfficheID=' + JSON.parse(response.body).rows[i].ID +'&IsInner=0&ModuleID='+data.afficheType;
              var addSql = 'INSERT  INTO gcwj (ssdq,xmbh,bxmc,shji,url,xmlb,gglx)VALUES(?,?,?,?,?,?,?)';
              var addSqlParams = [ newssdq, newxmbh, newbxmc, newshji,newurl,nmlb,gglx];
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
  console.log(13)
}

function  kbjg(){
  for(var k=0;k<npro.length;k++){
    var request = require('request');
  var data = {
    area: 72,
    afficheType: 486,
    IsToday: '',
    title: '',
    proID: '',
    number: '',
    _search: false,
    nd: '',
    rows: 1,
    page: 1,
    sidx: 'PublishStartTime',
    sord: 'desc'
  }
     data.proID =npro[k];
    //  data.nd = nnd;
     var nnmch =nmch[k];
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
             nmlb =nnmch,
              gglx =nngglx;
            newxmbh = JSON.parse(response.body).rows[i].TenderNo,
            newbxmc = JSON.parse(response.body).rows[i].TenderName,
            newshji = JSON.parse(response.body).rows[i].PublishStartTime;
            newurl = 'http://www.hzctc.cn/AfficheShow/Home?AfficheID=' + JSON.parse(response.body).rows[i].ID +'&IsInner=0&ModuleID='+data.afficheType;
              var addSql = 'INSERT  INTO gcwj (ssdq,xmbh,bxmc,shji,url,xmlb,gglx)VALUES(?,?,?,?,?,?,?)';
              var addSqlParams = [ newssdq, newxmbh, newbxmc, newshji,newurl,nmlb,'开标结果公示'];
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
}
}