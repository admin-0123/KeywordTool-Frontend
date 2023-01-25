$(document).ready(function(e) {
    $("input[type=text]").focus();
    $(document).keypress(function(e) {
        if (event.which == 13 || event.keyCode == 13) {
            var keyword = $(".keyword").val();
            var domain = $(".url").val();
            var name = $(".name").val();
            var email = $(".email").val();
            var phone = $(".phone").val();
            var current_step = parseInt($(".active .btn-next").data("step"));
            if(current_step){
                var next_step = current_step + 1;
                var input_entry = $(".active input[type=text]").val();
                if (input_entry) {
                    $(".required").hide();
                    $("input[type=text]").removeClass("error");
                    if (input_entry.length >= 3) {
                        $(".steps-list li").each(function () {
                            var list_data = $(this).data("step");
                            if (current_step == list_data) {
                                $(this).addClass("completed");
                                if (current_step === 2) {
                                    if (validateUrl()) {
                                        $(this).addClass("completed");
                                    }
                                }
                                if (current_step === 3) {
                                    if (validateEmail()) {
                                        $(this).addClass("completed");
                                    }
                                }
                                $(this).addClass("completed");
                            }
                        });
                        if (current_step === 2) {
                            if (validateUrl(input_entry)) {
                                $(".step-" + current_step).removeClass("active");
                                $(".step-" + current_step).hide();
                                $(".step-" + next_step).removeClass("fadeInRight animated").addClass("fadeInRight animated active").show();
                                $(".step-" + next_step).find("input[type=text]").focus();
                            } else {
                                $(".btn-next").closest(".step").find(".required").text("invalid URL").show();
                                $(".btn-next").closest(".step").find("input[type=text]").addClass("error");
                                $(".btn-next").closest(".step").find("input[type=text]").focus();
                            }
                        } else if (current_step === 4) {
                            if (validateEmail(input_entry)) {
                                $(".step-" + current_step).removeClass("active");
                                $(".step-" + current_step).hide();
                                $(".step-" + next_step).removeClass("fadeInRight animated").addClass("fadeInRight animated active").show();
                                $.ajax({
                                    type: "POST",
                                    url: "mail.php",
                                    data: {
                                        send_email:1,
                                        keyword: keyword,
                                        domain: domain,
                                        name: name,
                                        email: email,
                                        phone: phone
                                    },
                                    success:function(res){
                                        $(".amount .amount-inner").text(res);
                                    }
                                })
                            } else {
                                $(".btn-next").closest(".step").find(".required").eq(0).text("invalid email").show();
                                $(".btn-next").closest(".step").find(".required").eq(1).text("invalid phone").show();
                                $(".btn-next").closest(".step").find("input[type=text]").addClass("error");
                                $(".btn-next").closest(".step").find("input[type=text]").focus();
                            }
                        } else {
                            $(".step-" + current_step).removeClass("active");
                            $(".step-" + current_step).hide();
                            $(".step-" + next_step).removeClass("fadeInRight animated").addClass("fadeInRight animated active").show();
                            $(".step-" + next_step).find("input[type=text]").focus();
                        }
                    } else {
                        $(".btn-next").closest(".step").find(".required").text("min 3 character").show();
                        $(".btn-next").closest(".step").find("input[type=text]").addClass("error");
                        $(".btn-next").closest(".step").find("input[type=text]").focus();
                    }
                } else {
                    $(".btn-next").closest(".step").find(".required").text("Required").show();
                    $(".btn-next").closest(".step").find("input[type=text]").addClass("error");
                    $(".btn-next").closest(".step").find("input[type=text]").focus();
                }
                return false;
            } else {
                return false;
            }
        }
        return true;
    });
});
function validateEmail(email) {
    var re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(email);
}
function validatePhone(phone) {
    var re = /^\s*(?:\+?(\d{1,3}))?[-. (]*(\d{3})[-. )]*(\d{3})[-. ]*(\d{4})(?: *x(\d+))?\s*$/;
    return re.test(phone);
}

function validateUrl(url) {
    var re = /(http(s)?:\/\/.)?(www\.)?[-a-zA-Z0-9@:%._\+~#=]{2,256}\.[a-z]{2,6}\b([-a-zA-Z0-9@:%_\+.~#?&//=]*)/g;
    return re.test(url);
}
