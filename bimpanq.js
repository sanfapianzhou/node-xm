/*
 * @Descripttion: 
 * @version: 
 * @Author: sanfa233
 * @Date: 2019-12-28 13:12:57
 * @LastEditors  : sanfa233
 * @LastEditTime : 2020-01-02 11:06:13
 */
const express = require("express");
const http = require("http");
const cheerio = require("cheerio");
const fs = require("fs");
const iconv = require('iconv-lite');
var url= "http://news.xauat.edu.cn/jdyw/index.html";
var homeDesc = {},
		homeArticle = {},
    homeQuestion = {},
    i=1;
    //ahtml;

  // function fetchPage(x) {     //封装了一层函数
  //   startRequest(x);
  // }
  // function startRequest(x) {
  setTimeout((url) => {
    paqu(url)
  }, 5*1000);
  function paqu (){
    http.get(url,function(response){
    var  ahtml ='';
        response.on("data",function(chunk){
          ahtml += iconv.decode(chunk,'GBK')//转码
        });
        response.on("end",function(){
          $ = cheerio.load(ahtml);
          // var  NewsList = $("#webNewsList").text();
          //  var titlenews ='./wz/' + $("#webNewsList li:nth-child(2) em").text();
          // fs.writeFile(titlenews+i+ '.txt',NewsList,(err)=>{
          //   if(err){
          //     console.log('wz保存失败'+ $("#webNewsList li:nth-child(2) title").text());
          //   } else {
          //     console.log('wz保存成功');
          //   }
          // })Auth__slogan
          console.log(cheerio.load(ahtml).html())
        //  $(".Modelo ModeloTag DefaultNode__label-name span").each(function(k, v) {
        //    var sz= $(v).text();
        //      console.log(sz)
        //    //lbwy.push(href);
            
        //    })
        })
      // i= i+1;
      //   var str = "http://news.xauat.edu.cn/jdyw/index_"+i+".html";
      //   if (i <= 8) {
      //     fetchPage(str);
      //  }
   
  }).on("error",function(err){
    console.log(err)
  });
  // }
  // fetchPage(url);

  }


