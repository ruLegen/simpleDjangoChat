/**
 * Created by root on 29.11.16.
 */
var lastID = 1;
var messageText="";
var sender = "";
var messages;
function sendMessage() {
     messageText = $('#message').val();
        $('#message').val('');
        $('#message').focus();
        sender = $('#sender').val();
        $.ajax({
            method: "POST",
            url: "/chat/addmessage",
            data: {"msg": messageText, "sender": sender}
        }).done(function (data, data2, data4, data3) {
            console.log(data);
            $("#message").val("");

        }).fail(function (data) {
        });
}
function getRandomLocation() {
    var min = new Object();
    var max = new Object();
    var randomPosition = new Object();
     min.x = 0;
     min.y = 0;

     max.x = $('#message-field').width()-50;
     max.y = $('#message-field').height() -50;

    randomPosition.x = Math.floor(Math.random() * (max.x - min.x + 1)) + min.x;
    randomPosition.y = Math.floor(Math.random() * (max.y - min.y + 1)) + min.y;
    return randomPosition;
}
function createMessagePost(x,y,sender,message) {

    var messageDOMElement = document.createElement("div");
    var senderDOMElement = document.createElement("div");
    var textDOMElement = document.createElement("div");
    messageDOMElement.className = "message";
    senderDOMElement.className="header";
    textDOMElement.className="text";
    senderDOMElement.innerText=sender;
    textDOMElement.innerText=message;
    $(messageDOMElement).prepend(textDOMElement);
    $(messageDOMElement).prepend(senderDOMElement);
    $(messageDOMElement).css({left:x,top:y});
    $(messageDOMElement).hide();
    $('#message-field').prepend(messageDOMElement)
    $(messageDOMElement).slideDown(900);

    setTimeout(function () {
        $(messageDOMElement).fadeOut(2500);
       setTimeout(function () {
            $(messageDOMElement).remove();
       },3500);
    },2500);
}
function getMessages() {
    $.ajax({
        method: "POST",
        url: "/chat/getmessage",
            data: {"lastID":lastID}
        }).done(function (data) {
        var messages = data;
        messages.forEach(function (element) {
            var randomPosition = getRandomLocation();
            createMessagePost(randomPosition.x,randomPosition.y,element.fields.sender,element.fields.messageText);

        });

            getLastID();
        });
}
function getLastID(fisrtTime) {
    $.ajax({
            method: "GET",
            url: "/chat/getlastid"
        }).done(function (data, data2, data4, data3) {

            if(fisrtTime)
                lastID = parseInt(data)-1;
            else
                lastID = parseInt(data);
        })
}

function DDOS() {
    messageText = $('#message').val();
        $('#message').val('');
        $('#message').focus();
        sender = $('#sender').val();
        $.ajax({
            method: "POST",
            url: "/chat/addmessage",
            data: {"msg": messageText, "sender": sender}
        });
}
$('document').ready(function () {
    getLastID(true);


    $("#btn").click(function () {
    sendMessage();
    });

    $("#message").keydown(function (e) {

        if (e.ctrlKey && e.keyCode == 13) {
            $("#message").val($("#message").val()+"\n");
            return;
        }
        if (e.keyCode == 13) {
            var r = $("#message").val();
            $("#message").val(r.substring(0));
            sendMessage();
            return;
        }
    });
   setTimeout(function recurs(){
        getMessages();
        setTimeout(recurs,3000);
    },3000);
});
