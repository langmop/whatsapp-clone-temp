var socket = io.connect("http://localhost:4000");

function isValidEmailAddress(emailAddress) {
  var pattern =
    /^([a-z\d!#$%&'*+\-\/=?^_`{|}~\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]+(\.[a-z\d!#$%&'*+\-\/=?^_`{|}~\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]+)*|"((([ \t]*\r\n)?[ \t]+)?([\x01-\x08\x0b\x0c\x0e-\x1f\x7f\x21\x23-\x5b\x5d-\x7e\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]|\\[\x01-\x09\x0b\x0c\x0d-\x7f\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]))*(([ \t]*\r\n)?[ \t]+)?")@(([a-z\d\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]|[a-z\d\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF][a-z\d\-._~\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]*[a-z\d\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])\.)+([a-z\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]|[a-z\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF][a-z\d\-._~\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]*[a-z\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])\.?$/i;
  return pattern.test(emailAddress);
}

var email;
$("#button-email").on("click", function () {
  if ($(".email").val() == "") {
    alert("enter the email");
  } else {
    email = $(".email").val();

    if (!isValidEmailAddress(email)) {
      alert("enter the valid email");
    } else {
      $(".email").prop("disabled", true);
      $(".otp").prop("disabled", false);
      $("#button-email").css("display", "none");
      $("#button-otp").css("display", "block");

      socket.emit("verify", {
        handle: email,
      });
    }
  }
});
var otp;
$("#button-otp").click(function () {
  if (otp === $(".otp").val()) {
    otp = "";
    alert("otp verified");
    $(".otp").prop("disabled", true);
    $(".main1").css("display", "none");
    $(".personal").css("display", "initial");
  } else {
    console.log(otp);
    alert("otp not verified");
  }
});

socket.on("verify", function (data) {
  otp = data.otp;
});

var image_src;
var loadFile = function (event) {
  var image = document.getElementById("output");
  console.log(event.target.files[0]);
  image.src = URL.createObjectURL(event.target.files[0]);
  image_src = URL.createObjectURL(event.target.files[0]);
};

$(".name-button").click(function () {
  $.post(
    "/api/user",
    {
      username: email,
      name: $("#name").val(),
      image_src: image_src,
    },
    function (data, success) {
      console.log(success);
      if (success) {
        location.href = "http://localhost:4000/api/user";
      }
    }
  );
});
