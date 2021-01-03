function attachSignin(element) {
//    console.log(element.id);
    auth2.attachClickHandler(element, {}, function (googleUser) {
        onSignIn(googleUser);
    }, function (error) {
        console.log(JSON.stringify(error, undefined, 2));
        console.log("cancelled by user");
        $('#ajax-loader').hide();
    });
}
function loginViaGoogle(){
    var el = document.getElementById('google_login_btn');
  if (el.fireEvent) {
    el.fireEvent('on' + 'click');
  } else {
    var evObj = document.createEvent('Events');
    evObj.initEvent('click', true, false);
    el.dispatchEvent(evObj);
  }
}
function onSignIn(googleUser) {
    if (typeof loggedInUser == "undefined" && typeof googleUser != 'undefined') {

        $('#ajax-loader').show();
        if (typeof googleUser.getAuthResponse == 'function') {

            // The ID token you need to pass to your backend:
            var id_token = googleUser.getAuthResponse().id_token;
            $.ajax({
                url: '/socialauth/signin/google?utm_source=community&utm_campaign=community_signup&utm_medium=community_signup',
                data: 'idtoken=' + id_token,
                type: 'POST',
                dataType: 'json',
                error: function (e) {
                    $('#ajax-loader').hide();
                },
                success: function (data) {
                    $('#ajax-loader').hide();
                    if (data.status == "success") {
                        $('#myModal').modal('hide');
                        localStorage.setItem("lastButtonClicked", 'googleSignup');//coz need to track user email and id. based on this we are sending this event after page load...
//                        console.log(data);
                        window.location.reload();
                    }
                }
            });
        }
    }
}

function do_login_update(reload, socialshare = false) {
    if(socialshare == 'Facebook') {
        localStorage.setItem("lastButtonClicked", 'facebookSignup');
    }
    if (typeof reload != 'undefined' && reload) {
        location.reload();
    }
}

function loginViaFacebook() {
    var newwindow;
    var screenX = typeof window.screenX != 'undefined' ? window.screenX : window.screenLeft,
            screenY = typeof window.screenY != 'undefined' ? window.screenY : window.screenTop,
            outerWidth = typeof window.outerWidth != 'undefined' ? window.outerWidth : document.body.clientWidth,
            outerHeight = typeof window.outerHeight != 'undefined' ? window.outerHeight : (document.body.clientHeight - 22),
            width = 500,
            height = 500,
            left = parseInt(screenX + ((outerWidth - width) / 2), 10),
            top = parseInt(screenY + ((outerHeight - height) / 2.5), 10),
            features = (
                    'width=' + width +
                    ',height=' + height +
                    ',left=' + left +
                    ',top=' + top
                    );
    newwindow = window.open('/social_login/facebook?display=popup', 'Login_by_facebook', features);

    if (window.focus) {
        newwindow.focus();
    }
    return false;
}

//Login function for clevertap

function loginProcess() {
    $('#myModal').modal('show');
    $("#google_login_btn span ").html('Log In with Gmail');
    $("#facebook_login_btn span ").html('Log In with Facebook');
    $('.modal-title-signup').css("display", "none");
    $('.modal-title-login').css("display", "block");
    $('#signupForm').css("display", "none");
    $('#signinForm').css("display", "block");
    $('#resetcode').css("display", "none");
    $('#verify-password').css("display", "none");
    $('.google-btn').addClass("ga-login-google-click");
    $('.google-btn').removeClass("ga-signup-google-click");
    $('.facebook-btn').addClass("ga-login-facebook-click");
    $('.facebook-btn').removeClass("ga-signup-facebook-click");
}

//Signup function for clevertap

function signupProcess() {
    $('#myModal').modal('show');
    $("#google_login_btn span").html('Sign up with Gmail');
    $("#facebook_login_btn span").html('Sign up with Facebook');
    $('.modal-title-login').css("display", "none");
    $('.modal-title-signup').css("display", "block");
    $('#signupForm').css("display", "block");
    $('#signinForm').css("display", "none");
    $('#resetcode').css("display", "none");
    $('#verify-password').css("display", "none");
    $('.google-btn').addClass("ga-signup-google-click");
    $('.google-btn').removeClass("ga-login-google-click");
    $('.facebook-btn').addClass("ga-signup-facebook-click");
    $('.facebook-btn').removeClass("ga-login-facebook-click");
}
$(document).ready(function ()
{
    if (typeof enableGoogleSignIn == 'function') {
        enableGoogleSignIn();
    }
    $("#myModal").on("hidden.bs.modal", function () {
        $(':input', this).val('');
    });
    $('#openLogin_tab').on('click', function () {
        $("#google_login_btn span ").html('Log In with Gmail');
        $("#facebook_login_btn span ").html('Log In with Facebook');
        $('.modal-title-signup').css("display", "none");
        $('.modal-title-login').css("display", "block"); 
        $('#signupForm').css("display", "none");
        $('#signinForm').css("display", "block");
        $('#signinForm').bootstrapValidator('resetForm', true);
        $('.google-btn').addClass("ga-login-google-click");
        $('.google-btn').removeClass("ga-signup-google-click");
        $('.facebook-btn').addClass("ga-login-facebook-click");
        $('.facebook-btn').removeClass("ga-signup-facebook-click");
        var pagetype = 'Community_Signup';
        var eventPage = $('.ga-signup-login-click').data('page');
        var refLabel = "Page-Name: "+ eventPage +"; Timestamp: " + (Date()) + ";";
        gaEventBlog(pagetype, 'Clicked_On_Signup_Popup_Login', refLabel);
    });
    $('#signUp_tab').on('click', function () {
        $("#google_login_btn span").html('Sign up with Gmail');
        $("#facebook_login_btn span").html('Sign up with Facebook');
        $('.modal-title-login').css("display", "none");
        $('.modal-title-signup').css("display", "block");
        $('#signupForm').css("display", "block");
        $('#signinForm').css("display", "none");
        $('#signupForm').bootstrapValidator('resetForm', true);
        $('.google-btn').addClass("ga-signup-google-click");
        $('.google-btn').removeClass("ga-login-google-click");
        $('.facebook-btn').addClass("ga-signup-facebook-click");
        $('.facebook-btn').removeClass("ga-login-facebook-click");
        var pagetype = 'Community_Login';
        var eventPage = $('.ga-login-signup-click').data('page');
        var refLabel = "Page-Name: "+ eventPage +"; Timestamp: " + (Date()) + ";";
        gaEventBlog(pagetype, 'Clicked_On_Login_Popup_Signup', refLabel);
    });
    $('.signup_from_reset').on('click', function () {
        $("#google_login_btn span").html('Sign up with Gmail');
        $("#facebook_login_btn span").html('Sign up with Facebook');
        $('.modal-title-login').css("display", "none");
        $('.modal-title-signup').css("display", "block");
        $('#signupForm').css("display", "block");
        $('#signupForm').bootstrapValidator('resetForm', true);
        $('#resetcode').css("display", "none");
        $('#verify-password').css("display", "none");
    });
//    $('.forgetpass').on('click', function () {
//        $('#signinForm').css("display", "none");
//        $('#resetcode').css("display", "block");
//    });
    $('.signUp_popup').on('click', function ()
    {
        $('#myModal').modal('show');
        $("#google_login_btn span").html('Sign up with Gmail');
        $("#facebook_login_btn span").html('Sign up with Facebook');
        $('.modal-title-login').css("display", "none");
        $('.modal-title-signup').css("display", "block");
        $('#signupForm').css("display", "block");
        $('#signinForm').css("display", "none");
        $('#resetcode').css("display", "none");
        $('#verify-password').css("display", "none");
        $('.google-btn').addClass("ga-signup-google-click");
        $('.google-btn').removeClass("ga-login-google-click");
        $('.facebook-btn').addClass("ga-signup-facebook-click");
        $('.facebook-btn').removeClass("ga-login-facebook-click");
    });
    $('.signIn_popup').on('click', function ()
    {
        $('#myModal').modal('show');
         $("#google_login_btn span ").html('Log In with Gmail');
        $("#facebook_login_btn span ").html('Log In with Facebook');
        $('.modal-title-signup').css("display", "none");
        $('.modal-title-login').css("display", "block");      
        $('#signupForm').css("display", "none");
        $('#signinForm').css("display", "block");
        $('#resetcode').css("display", "none");
        $('#verify-password').css("display", "none");
        $('.google-btn').addClass("ga-login-google-click");
        $('.google-btn').removeClass("ga-signup-google-click");
        $('.facebook-btn').addClass("ga-login-facebook-click");
        $('.facebook-btn').removeClass("ga-signup-facebook-click");
    });

    $('#signupForm').on('click', 'button[type=submit]', function (e) {
        var pagetype = 'Community_Signup';
        var eventPage = $('.ga-signup-submit').data('page');
        var refLabel = "Page-Name: "+ eventPage +"; Timestamp: " + (Date()) + ";";
        gaEventBlog(pagetype, 'Clicked_On_Signup_Popup', refLabel);
        e.preventDefault();
        var validatorCheck = $(this).closest("form").data('bootstrapValidator');
        validatorCheck.validate();
        return false;
    });
    $('#signinForm').on('click', 'button[type=submit]', function (e) {
        var pagetype = 'Community_Login';
        var eventPage = $('.ga-login-submit').data('page');
        var refLabel = "Page-Name: "+ eventPage +"; Timestamp: " + (Date()) + ";";
        gaEventBlog(pagetype, 'Clicked_On_Login_Popup', refLabel);
        e.preventDefault();
        var validatorCheck = $(this).closest("form").data('bootstrapValidator');
        validatorCheck.validate();
        return false;
    });
    if (typeof $('#signupForm').bootstrapValidator !== 'undefined') {
        $('#signupForm').bootstrapValidator({
            err: {
                container: function ($field, validator) {
                    if (validator.isValid()) {
                        $('.has-feedback').removeClass("has-error");
                    } else {
                        $('.has-feedback').addClass("has-error");
                    }
                }
            },
            feedbackIcons: {
                validating: 'glyphicon glyphicon-refresh'
            },
            fields: {
                'data[User][name]': {
                    trigger: 'blur',
                    validators: {
                        notEmpty: {
                            message: 'Name is required.'
                        },
                        regexp: {
                            regexp: '^[a-zA-Z][a-zA-Z\\s]+$',
                            message: 'Name is required.'
                        }
                    }
                },
                'data[User][email]': {
                    trigger: 'blur',
                    validators: {
                        notEmpty: {
                            message: 'Email is required'
                        },
                        regexp: {
                            regexp: '^[^@\\s]+@([^@\\s]+\\.)+[^@\\s]{2,4}$',
                            message: 'Please enter a valid email address '
                        }
                    }
                },
                'data[User][password]': {
                    trigger: 'blur',
                    validators: {
                        notEmpty: {
                            message: 'Password is required'
                        },
                        stringLength: {
                            min: 8,
                            message: 'Password should be atleast 8 characters'
                        }
                    }
                }
            }
        }).on('success.form.bv', function (e) {
            // Prevent form submission
            e.preventDefault();
            var $form = $(e.target),
                    validator = $form.data('bootstrapValidator'),
                    submitButton = validator.getSubmitButton();
            if (validator.isValid()) {
                $("#signup_error_message").css("display", "none");
                $('#ajax-loader').show();
                $.ajax({
                    url: '/users/signup?utm_source=community&utm_campaign=community_signup&utm_medium=community_signup',
                    data: $('#signupForm').serialize(),
                    type: 'POST',
                    dataType: 'json',
                    error: function (e) {
                        $('#ajax-loader').hide();
                    },
                    success: function (data) {
                        $('#ajax-loader').hide();
                        if (data.status == "success" || data.status == "my-courses" || data.status == "lead") {
                            CleverTapSignup($('#signupForm').serializeArray(), data.userId);
                            location.reload();
                        } else {
                            $('#ajax-loader').hide();
                            $("#signup_error_message").html('<i class="fa fa-exclamation-triangle"></i> ' + data.msg);
                            $("#signup_error_message").css("display", "block");
                        }
                    }

                });
            }

            return false;
            // Do whatever you want here ...
        }).on('error.field.bv', function (e, data) {
            $('.defdisablesignup').prop('disabled', false).removeClass('disabled');
        }).on('success.field.bv', function (e, data) {
            $('.has-success').removeClass('highlighterror').removeClass('has-error');
            if (data.fv.getInvalidFields().length > 0) {    // There is invalid field
                $('.defdisablesignup').prop('disabled', false).removeClass('disabled');
            }
        });
    }



    if (typeof $('#signinForm').bootstrapValidator !== 'undefined') {
        $('#signinForm').bootstrapValidator({
            err: {
                container: function ($field, validator) {
                    if (validator.isValid()) {
                        $('.has-feedback').removeClass("has-error");
                    } else {
                        $('.has-feedback').addClass("has-error");
                    }
                }
            },
            feedbackIcons: {
                validating: 'glyphicon glyphicon-refresh'
            },
            fields: {
                'data[User][email]': {
                    trigger: 'blur',
                    validators: {
                        notEmpty: {
                            message: 'Email is required'
                        },
                        regexp: {
                            regexp: '^[^@\\s]+@([^@\\s]+\\.)+[^@\\s]{2,4}$',
                            message: ' Please enter a valid email address'
                        }
                    }
                },
                'data[User][password]': {
                    trigger: 'blur',
                    validators: {
                        notEmpty: {
                            message: 'Password is required'
                        },
                        stringLength: {
                            min: 8,
                            message: 'Password should be atleast 8 characters'
                        }
                    }
                }
            }
        }).on('success.form.bv', function (e) {
            // Prevent form submission
            e.preventDefault();
            var $form = $(e.target),
                    validator = $form.data('bootstrapValidator'),
                    submitButton = validator.getSubmitButton();
            if (validator.isValid()) {
                $("#signin_error_message").css("display", "none");
                $('#ajax-loader').show();
                $('.defdisablesignin').removeClass('disabled');
                $.ajax({
                    url: '/users/signin',
                    data: $('#signinForm').serialize(),
                    type: 'POST',
                    dataType: 'json',
                    error: function () {
                        $('#ajax-loader').hide();
                    },
                    success: function (data) {
                        $('.defdisablesignin').removeClass('disabled');
                        if (data.status == "success" || data.status == "my-courses" || data.status == "lead") {
                            location.reload();
                        } else {
                            $('#ajax-loader').hide();
                            if ((typeof data.redirect_url !== 'undefined') && (data.redirect_url == "/verify-account")){
                                processOfCreatingPassword();
                            } else {
                                $("#signin_error_message").html('<i class="fa fa-exclamation-triangle"></i> ' + data.msg);
                                $("#signin_error_message").css("display", "block");
                            }
                        }
                    }
                });
            }
            return false;
            // Do whatever you want here ...
        }).on('error.field.bv', function (e, data) {
            $('.defdisablesignin').prop('disabled', false).removeClass('disabled');
        }).on('success.field.bv', function (e, data) {
            $('.has-success').removeClass('highlighterror').removeClass('has-error');
            if (data.fv.getInvalidFields().length > 0) {    // There is invalid field
                $('.defdisablesignin').prop('disabled', false).removeClass('disabled');
            }

        });

    }

    var flag_reset = true;
    $("#Forgotnew , #resendcode").on('click', function (e) {
        $('#otpfield, #verificationfield, #pwd2').val("");
        var email = $('#inputName').val();
        if (isEmail(email)) {
            $('#signinForm').css("display", "none");
            $('#resetcode').css("display", "block");
            $('#ajax-loader').show();
            e.preventDefault();
            $.ajax({
                url: '/users/process_forgot_password',
                data: $('#signinForm').serialize(),
                type: 'POST',
                dataType: "json",
                error: function () {
                    $('#ajax-loader').hide();
                },
                success: function (data) {
                    $('#ajax-loader').hide();
                    if (data.status == "success") {
                        $(".verifycheck").show();
                        $('#otpfield').removeClass('highlighterror');
                        $('#pwd2').removeClass('highlighterror');
                        $("#prefilledemail, #emailfield").val(data.email);
                        $("#messages").addClass("greenalertnew");
                        $("#messages").removeClass("redalertnew");
                        $("#messages").html('<i class="fa fa-check-circle"></i> ' + data.msg);
                        if (flag_reset == true) {
                            flag_reset = false;
                            resetpass();
                        }
                    } else {
                        $("#signin_error_message").css("display", "block");
                        $("#signin_error_message").html('<i class="fa fa-exclamation-triangle"></i> ' + data.msg);
                    }
                }

            });
        } else {
            $("#signin_error_message").css("display", "block");
            $("#signin_error_message").html('<i class="fa fa-exclamation-triangle"></i> ' + "Please enter your email id to reset password");
        }
    });


    function isEmail(email) {

        var regex = /^([a-zA-Z0-9_.+-])+\@(([a-zA-Z0-9-])+\.)+([a-zA-Z0-9]{2,4})+$/;
        return regex.test(email);
    }

    function resetpass() {
        $("#passresetbutton").on('click', function (e) {
            e.preventDefault();
            new_pass = $.trim($('#pwd2').val());
            if ((new_pass != '' && new_pass.toString().length >= 8) && ($('#otpfield').val() != '' || $("#verificationfield").val() != '')) {
                $('#ajax-loader').show();
                e.preventDefault();
                $.ajax({
                    url: '/lms_users/recover_password',
                    data: $('#resetcode').serialize(),
                    type: 'POST',
                    dataType: "json",
                    error: function () {
                        $('#ajax-loader').hide();
                    },
                    success: function (data) {
                        $('#ajax-loader').hide();
                        if (data.status == "success") {
                            $('#resetcode').css("display", "none");
                            $('#verify-password').css("display", "none");
                            $('#signinForm').css("display", "block");
                            $('#signinForm').bootstrapValidator('resetForm', true);
                            $("#signin_error_message").css("display", "block");
                            $("#signin_error_message").removeClass("redalertnew");
                            $("#signin_error_message").addClass("greenalertnew");
                            $("#signin_error_message").html('<i class="fa fa-check-circle"></i> ' + data.msg);
                            $('#inputName,#signupname,#pwd3,signupemail,#emailfield').val("");
                        } else {
                            $('#otpfield').addClass('highlighterror');
                            $('#pwd2').removeClass('highlighterror');
                            $("#messages").removeClass("greenalertnew");
                            $("#messages").addClass("redalertnew");
                            $('#messages').html('<i class="fa fa-exclamation-triangle"></i> ' + data.msg);
                        }
                    }
                });
            } else {
                $("#messages").removeClass("greenalertnew");
                $("#messages").addClass("redalertnew");
                if ($('#otpfield').val() == '' && new_pass.toString().length > 8) {
                    $('#otpfield').addClass('highlighterror');
                    $('#pwd2').removeClass('highlighterror');
                    $('#otpfield').focus();
                    $('#messages').html('<i class="fa fa-exclamation-triangle"></i> ' + "Please enter the OTP.");
                } else if (new_pass.toString().length < 8 && $('#otpfield').val() != '') {
                    $('#otpfield').removeClass('highlighterror');
                    $('#pwd2').addClass('highlighterror');
                    $('#pwd2').focus();
                    $('#messages').html('<i class="fa fa-exclamation-triangle"></i> ' + "Please enter 8 digit password.");
                } else {
                    $('#otpfield, #pwd2').addClass('highlighterror');
                    if ($("#verificationfield").val() != '') {
                        $('#pwd2').focus();
                        $('#messages').html('<i class="fa fa-exclamation-triangle"></i> ' + "Please enter 8 digit password.");
                    } else {
                        $('#otpfield').focus();
                        $('#messages').html('<i class="fa fa-exclamation-triangle"></i> ' + "Please enter a valid input.");
                    }
                }
                return false;
            }
        });
    }

    $('#logout_community').on('click', function () {
        $('#ajax-loader').show();
        $.ajax({
            url: '/signout',
            type: 'GET',
            dataType: 'json',
            error: function () {
                $('#ajax-loader').hide();
                location.reload();
            },
            success: function (data) {
                location.reload();
            }
        });
    });


    $('#facebook_login_btn, #facebook_login_btn_banner').on('click', function () {
        loginViaFacebook();
    });
    $('#google_login_btn_banner').on('click', function () {
        loginViaGoogle();
    });
//    $('#google_login_btn').on('click', function () {
//            $('#ajax-loader').show();
//        onSignIn();
//    });
    $('#logout_community_responsive').on('click', function () {
            $('#ajax-loader').show();
        $.ajax({
                url: '/signout',
                type: 'GET',
                dataType: 'json',
                error: function () {
                    $('#ajax-loader').hide();
                    location.reload();
                },
                success: function (data) {
                    location.reload();
                }
        });
    });
   
    setTimeout(function () {
        if ($('.newsletter_section').hasClass('slideup')) {
            $('.newsletter_section').addClass('slidedown');
            $('.newsletter_section').removeClass('slideup');
        } else {
            $('.newsletter_section').removeClass('slidedown');
            $('.newsletter_section').addClass('slideup');
        }
    }, 3000);
    
    $('.close-subscribe-section').click(function () {
        $('.newsletter_section').removeClass('slideup');
        $('.newsletter_section').addClass('slidedown');
    });
    
    var subHideCookie = readCookie('subscribehide');
    if(emptyCheck(subHideCookie)){
        createCookie('subscribehide', "1", 2);
    } else if(subHideCookie == "1") {
        createCookie('subscribehide', "2", 2);
    } else if(subHideCookie == "2") {
        createCookie('subscribehide', "Hide", 2);
    }

    $('.close-subscribe-section').click(function () {
        createCookie('subscribehide', "Hide", 2);
    });
    if((subHideCookie == "Hide") || (subHideCookie == "2")) {
        $('.newsletter_section').hide();
    }

});

function processOfCreatingPassword() {
    var email = $('#inputName').val();
    $('#otp-field, #verification-field, #new-password').val("");
    $('#signinForm').css("display", "none");
    $('#verify-password').css("display", "block");
    $('#prefilled-email').val(email);
    $("#msg").addClass("greenalertnew");
    $("#msg").removeClass("redalertnew");
    $("#msg").html('<i class="fa fa-check-circle"></i> Change the password for security reasons. <br><i class="fa fa-check-circle"></i> Verification code is sent to ' + email + '.');
}

$(document).on('click', '#pass-reset-button', function (e) {
    e.preventDefault();
    var n_pass = $.trim($('#new-password').val());
    if (n_pass != '' && n_pass.toString().length >= 8 && $('#otp-field').val() != '') {
        $('#ajax-loader').show();
        e.preventDefault();
        var data = {
            password: n_pass,
            email: $('#prefilled-email').val(),
            otpCode: $('#otp-field').val(),
            externalSource: true
        };
        $.ajax({
            url: '/verify-account',
            data: data,
            type: 'POST',
            dataType: "json",
            error: function () {
                $('#ajax-loader').hide();
            },
            success: function (data) {
                $('#ajax-loader').hide();
                if (data.status == "success") {
                    $('#resetcode').css("display", "none");
                    $('#verify-password').css("display", "none");
                    $('#signinForm').css("display", "block");
                    $('#signinForm').bootstrapValidator('resetForm', true);
                    $("#signin_error_message").css("display", "block");
                    $("#signin_error_message").removeClass("redalertnew");
                    $("#signin_error_message").addClass("greenalertnew");
                    $("#signin_error_message").html('<i class="fa fa-check-circle"></i> ' + data.message);
                    $('#inputName,#signupname,#pwd3,#signupemail,#emailfield').val("");
                } else {
                    $('#otp-field').addClass('highlighterror');
                    $('#new-password').removeClass('highlighterror');
                    $("#msg").removeClass("greenalertnew");
                    $("#msg").addClass("redalertnew");
                    $('#msg').html('<i class="fa fa-exclamation-triangle"></i> ' + data.message);
                }
            }
        });
    } else {
        $("#msg").removeClass("greenalertnew");
        $("#msg").addClass("redalertnew");
        if ($('#otp-field').val() == '' && n_pass.toString().length > 8) {
            $('#otp-field').addClass('highlighterror');
            $('#new-password').removeClass('highlighterror');
            $('#otp-field').focus();
            $('#msg').html('<i class="fa fa-exclamation-triangle"></i> ' + "Please enter the Verification Code.");
        } else if (n_pass.toString().length < 8 && $('#otp-field').val() != '') {
            $('#otp-field').removeClass('highlighterror');
            $('#new-password').addClass('highlighterror');
            $('#new-password').focus();
            $('#msg').html('<i class="fa fa-exclamation-triangle"></i> ' + "Please enter 8 digit password.");
        } else {
            $('#otp-field, #new-password').addClass('highlighterror');
            if ($("#verification-field").val() != '') {
                $('#new-password').focus();
                $('#msg').html('<i class="fa fa-exclamation-triangle"></i> ' + "Please enter 8 digit password.");
            } else {
                $('#otp-field').focus();
                $('#msg').html('<i class="fa fa-exclamation-triangle"></i> ' + "Please enter a valid input.");
            }
        }
        return false;
    }
});