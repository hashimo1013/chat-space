$(function(){
  function buildHTML(message){
    if (message.image_url) {
      var html =`   <div class=log__info data-message-id=${message.id}>
                      <div class="log__info__user">
                      <span class="log__info__user__name">
                        ${message.name}
                      </span>
                      <span class="log__info__user__time">
                        ${message.created_at}
                      </span>
                      </div>
                      <div class="log__info__message">
                      ${message.text}
                      <image src =${message.image_url}>
                      </div>
                    <div> `
                  
    } else{
      var html =`   <div class=log__info data-message-id=${message.id}>
                      <div class=log__info__user>
                        <span class=log__info__user__name>
                          ${message.name}
                        </span>
                        <span class=log__info__user__time>
                          ${message.created_at}
                        </span>
                      </div>
                      <div class=log__info__message>
                        ${message.text}
                      </div>
                    <div> `
    }               
    return html;
    
  }
  $('#new_message').on ('submit', function(e){
    e.preventDefault(); 
    var url = $(this).attr('action');
    var formdata = new FormData(this)
    $.ajax({
      url: url,
      type: 'POST',
      data: formdata,
      dataType: 'json',
      processData: false,
      contentType: false
    })
    .done(function(date){
      var html = buildHTML(date);
      $(".log").append(html);
      $('.log').animate({ scrollTop: $('.log')[0].scrollHeight});
      $('form')[0].reset();
      $(".form__btn").prop('disabled', false)
    })
    .fail(function(){
      alert("非同期しっぱい");
    })
  })
  var reloadMessages = function() {
     last_message_id = $('.log__info:last').data("message-id");
    $.ajax({
      url: "api/messages",
      type: 'get',
      dataType: 'json',
      data: {id: last_message_id}
    })
    .done(function(messages) {
      if (messages.length !== 0) {
      var insertHTML = '';
      $.each(messages,function(i, message){
        insertHTML = buildHTML(message)
        $('.log').append(insertHTML);
      });
      $('.log').animate({ scrollTop: $('.log')[0].scrollHeight});
      $("#new_message")[0].reset();
      $(".form__submit").prop("disabled", false);
      }
    })
    .fail(function() {
      alert("自動更新しっぱい");
    });
  };
  if (document.location.href.match(/\/groups\/\d+\/messages/)) {
    setInterval(reloadMessages, 7000);
    $('.log').animate({ scrollTop: $('.log')[0].scrollHeight});
  }
});


