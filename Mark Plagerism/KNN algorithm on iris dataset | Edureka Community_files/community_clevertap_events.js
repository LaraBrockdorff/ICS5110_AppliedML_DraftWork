/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
var track_source = 'Website';
var track_pageUrl = window.location.href;
var width = $(window).width();
var track_platform = 'Desktop';
if (width > 767) {
    track_platform = 'Desktop';
} else if (width > 480) {
    track_platform = 'Tablet';
} else {
    track_platform = 'Mobile';
}
var lastPageUrl = localStorage.getItem('lastpageurl') == null ? "None" : localStorage.getItem('lastpageurl');
var lastPage = localStorage.getItem('lastpage') == null ? "None" : localStorage.getItem('lastpage');
var browserVersion = navigator.appVersion;
var userId = null;
var userEmail = null;
var isLoggedIn = false;

// event name constants
var EVENT_PAGE_VIEWED = 'Community Viewed';
var EVENT_POST_QUESTION = 'Community_Posted_Question';
var EVENT_POST_ANSWER = 'Community_Posted_Answer';
var EVENT_POST_COMMENT = 'Community_Posted_Comment';
var EVENT_SIGNUP = 'Community_SignUp';
var EVENT_GAVE_UPVOTE = 'Community_Gave_Upvote';
var EVENT_GAVE_DOWNVOTE = 'Community_Gave_Downvote';

function getBaseMetadata() {
    var metadata = {
        CommunityTitle:clevertap_site_Title,
        Pagename:'Community',
        PageURL:track_pageUrl,
        Source:track_source,
        Platform:track_platform,
    };
    return metadata;
}

function cleanData(data) {
    for (var key in data) {
        if (emptyCheck(data[key])) {
            delete data[key];
        }
    }
    return data;
}

function emptyCheck(e) {
    switch (e) {
        case "":
        case null:
        case typeof this == "undefined":
            return true;
        default:
            if (!e) {
                return true;
            }
            return false;
    }
}

function triggerEvent(eventName, partialData) {
    var finalData = $.extend({}, partialData, getBaseMetadata());
    var cleanedData = cleanData(finalData);
    trackEvent(eventName, cleanedData);
}

function eventButtonClicked(element) {
    buttonName = $(element).data('buttonName'); // data-button-name
    buttonLocation = $(element).data('buttonLocation'); // data-button-location
    triggerEvent(EVENT_BUTTON_CLICKED, {
       buttonId: buttonName + ";" + buttonLocation
    });
}

$(window).on('load', function() {
    var prepareData = getUserBaseData();
    triggerEvent(EVENT_PAGE_VIEWED, prepareData);
    generateEvent();
});

function CleverTapSignup(signupData, userId) {
    var dataObj =[] ;
    $(signupData).each(function(i, field){
        dataObj[field.name] = (field.value) ? field.value : null;
    });
    var prepareData = {
        CustomerId : userId,
        emailId : dataObj['data[User][email]'],
        mobile : dataObj['data[User][mobile]'],
        name : dataObj['data[User][name]'],
        ButtonId :'(Community)-(SignUp)-(Header)'  
    };
    triggerEvent(EVENT_SIGNUP, prepareData);
}

function pushingProfileDataClTap(signupData, returndata) {
    var dataObj =[] ;
    var profileData = {};
    $(signupData).each(function(i, field){
        dataObj[field.name] = (field.value) ? field.value : null;
    });
    var userId = returndata.userId;
    var email = dataObj['data[User][email]'];
    var phone = dataObj['data[User][mobile]'];
    var name = dataObj['data[User][name]'];
    var country_code = getCookie("edu_user_country_code");
    if (emptyCheck(country_code)) {
        country_code = $("#mobile_country_code").val();
        country_code = emptyCheck(country_code) ? "+91" : country_code;
    }
    if (!emptyCheck(userId)) {
        profileData['Identity'] = userId;
    }
    if (!emptyCheck(email)) {
        profileData['Email'] = email;
    }
    if (!emptyCheck(phone)) {
        profileData['Phone'] = country_code + phone;
    }
    if (!emptyCheck(name)) {
        profileData['Name'] = name;
    }

    pushProperties(cleanData(profileData));
}

 $(document).on('click', '.ga-ask-question-submit', function () {
    localStorage.setItem("lastButtonClicked", 'postQuestion');
 });

 $(document).on('click', '.qa-vote-first-button', function () {
     if(!emptyCheck(clevertap_user_id)) {
         triggerEvent(EVENT_GAVE_UPVOTE, getUserBaseData());
     }
 });

 $(document).on('click', '.qa-vote-second-button', function () {
    if(!emptyCheck(clevertap_user_id)) {
        triggerEvent(EVENT_GAVE_DOWNVOTE, getUserBaseData());
    }
 });

function generateEvent() {
    //some events are happening after pageload , for tracking those this is the code....
    var lastButtonclicked = localStorage.getItem("lastButtonClicked");
    var isErrorOccured = $('.qa-form-tall-error').is(':visible')  ? true : false;
    if (!isErrorOccured && lastButtonclicked !== null) {
        var userBaseData = getUserBaseData();
        var eventName = '';
        if(lastButtonclicked == 'googleSignup' || lastButtonclicked == 'facebookSignup') {
            var socialShare = lastButtonclicked == 'googleSignup' ? 'Google' : 'Facebook';
            eventName = EVENT_SIGNUP;
            userBaseData['ButtonId'] = '(Community)-(Signup)-('+socialShare+')';
        } else if (lastButtonclicked == 'postQuestion') {
            eventName = EVENT_POST_QUESTION;
            gaForQuestionSubmition();
        }
        triggerEvent(eventName, userBaseData);
        localStorage.removeItem("lastButtonClicked");
    }
}

function generateCleverTapEvent(eventName) {
    if(eventName == 'postQuestion') {
        gaForQuestionSubmition();
    }
    var userBaseData = getUserBaseData();
    triggerEvent(eventName, userBaseData);
    localStorage.removeItem("lastButtonClicked");
}

function getUserBaseData() {
    return {
        CustomerId:clevertap_user_id,
        CustomerEmail:clevertap_user_email,
    };
}