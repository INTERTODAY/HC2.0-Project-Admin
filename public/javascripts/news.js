/**
 * Created by cheese on 2017. 2. 6..
 */
'use strict';
requirejs(
  [
    'common'
    ,'jquery'
  ],
  function (Common, $) {
    
    const
      submit_news_upload = $('#submit_news_upload'),
      form_news_upload = $('#form_news_upload'),
      btn_news_active = $('.btn_news_active'),
      btn_news_delete = $('.btn_news_delete');
  
  
    submit_news_upload.on('click', function () {
      Common.AjaxFormSubmit(form_news_upload, (err, result) => {
        if (!err) {
          alert(result.msg);
          location.reload();
        } else {
          if(result){
	          // console.log(result);
	          alert(result.msg);
          }else{
            alert('Something went wrong. please try again.');
          }
        }
      });
    });
    btn_news_delete.on('click', function () {
      const data = {
        id: $(this).attr('data-news-id')
    };
      
      Common.AjaxSubmit('news', data, 'DELETE', (err, result) => {
        if (!err) {
          alert(result.msg);
          location.reload();
        } else {
          alert(result.msg);
        }
      })
    });
  
    btn_news_active.on('click', function () {
      const data = {
        id: $(this).attr('data-news-id'),
        active : $(this).attr('data-active')
      };
      
      Common.AjaxSubmit('news', data, 'PUT', (err, result)=>{
        if (!err) {
          alert(result.msg);
          location.reload();
        } else {
          alert(result.msg);
        }
      });
    })
  });