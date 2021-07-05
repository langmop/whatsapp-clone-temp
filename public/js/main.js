var socket = io.connect("https://whatsapp-clone-temp.herokuapp.com", {
  transports: ["websocket", "polling", "flashsocket"],
});
var today = new Date();
var time = today.getHours() + ":" + today.getMinutes();
var add_contact;

$(".add-contact").click(async function () {
  add_contact = await prompt("enter the contact you want to add");

  if (add_contact == $("#email").val()) {
    alert("no contact of this name found");
  } else {
    $.post(
      "/api/user/add",
      {
        contact: add_contact,
      },
      function (data, status) {
        if (data.notFound) {
          alert("no contact of this name found");
        } else if (data.alreadyAdded != null && data.alreadyAdded == true) {
          // pass
          console.log("iam here", data);
        } else {
          $(".chat-main-contacts").append(
            '<tr class="contact">"</div><td><img src="/images/pic1.png" alt="" class="profile-image rounded-circle" /></td></input><td id = "contact-name">' +
              data.name +
              '<input hidden class="contact-username" value="' +
              data.username +
              '"><br /><small>random text</small></td><td><small>' +
              data.activeAt +
              '</small></td></tr>"'
          );
        }
      }
    );
  }
});

$(document).ready(function () {
  $(".main-input-media").hide();
  $.post(
    "/api/user/show",
    {
      username: $("#email").val(),
    },
    function (data, result) {
      for (x in data) {
        console.log(data[x], "here");
        $(".chat-main-contacts").append(
          '<tr class="contact">"</div><td><img src="/images/pic1.png" alt="" class="profile-image rounded-circle" /></td></input><td id = "contact-name">' +
            data[x].name +
            '<input hidden class="contact-username" value="' +
            data[x].username +
            '"><br /><small>random text</small></td><td><small>' +
            data[x].activeAt +
            '</small></td></tr>"'
        );
      }
    }
  );

  socket.emit("acknowledge", {
    username: $("#email").val(),
  });
});

socket.on("acknowledge", function (data) {
  console.log(data, "this is working");
});

var latest;

$(".chat-main-contacts").on("click", ".contact", function () {
  $(".main-input-media").show();
  $(".chat-main-chat").text("");
  console.log("yes clicked");
  latest = $(this).find(".contact-username").val();
  // latest = $("this").find("#contact-username").val();
  console.log(latest + "hel0", "opp");
  $(".chat-header2").text(latest);
  $.post(
    "/api/user/showChat",
    {
      sender: $("#email").val(),
      receiver: latest,
    },
    function (data, status) {
      console.log(data);
      for (x in data) {
        if (data[x].sender == $("#email").val()) {
          $(".chat-main-chat").append(
            '<tr><td><p class=" bg-success p-2 mt-2 mr-5 shadow-sm text-white float-right rounded">' +
              data[x].chat +
              '</p></td><td><p class="p-1 m-2 shadow-sm">' +
              data[x].sendTime +
              "</p></td></tr>"
          );
        } else {
          $(".chat-main-chat").append(
            '<tr><td><p class=" bg-primary p-2 mt-2 mr-5 shadow-sm text-white float-left rounded">' +
              data[x].chat +
              '</p></td><td><p class="p-1 m-2 shadow-sm">' +
              data[x].sendTime +
              "</p></td></tr>"
          );
        }
      }
    }
  );
});

$(".send-div-button").click(function () {
  console.log(latest);
  socket.emit("chat", {
    sender: $("#email").val(),
    receiver: latest,
    chat: $("#send-div-input").val(),
    time: time,
  });
  $("#send-div-input").val("");
});

socket.on("chat", function (data) {
  console.log(data.sender, latest);
  if (socket.id == data.sender_session_id) {
    if (latest == data.receiver) {
      $(".chat-main-chat").append(
        '<tr><td><p class=" bg-success p-2 mt-2 mr-5 shadow-sm text-white float-right rounded">' +
          data.chat +
          '</p></td><td><p class="p-1 m-2 shadow-sm">' +
          time +
          "</p></td></tr>"
      );
    }
  } else {
    if (latest == data.sender) {
      $(".chat-main-chat").append(
        '<tr><td><p class=" bg-primary p-2 mt-2 mr-5 shadow-sm text-white float-left rounded">' +
          data.chat +
          '</p></td><td><p class="p-1 m-2 shadow-sm">' +
          time +
          "</p></td></tr>"
      );
    }
  }
  console.log(data);
});
