$(function(){
  function buildHTML(message){
    if (message.image_url) {
      var html =`   <div class=log__info>
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
      return html;
    } else{
      var html =`   <div class=log__info>
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
      return html
    }
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
});

