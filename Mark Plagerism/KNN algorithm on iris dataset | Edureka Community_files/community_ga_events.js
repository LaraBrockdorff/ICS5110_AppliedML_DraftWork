function gaEventBlog(refCategory, refAction, refLabel) {
    if (typeof ga == 'function')
        ga('send', 'event', refCategory, refAction, refLabel, 0);
}
//GA for question submitted successfully
function gaForQuestionSubmition() {
     var category = 'Community_Ask_A_Question';
     var refLabel = "Page-Name: Question Submitted; Timestamp: " + (Date()) + ";";
     gaEventBlog(category, 'Clicked_On_Ask_A_Question_Submit_Question', refLabel);
}

$(document).ready(function () {
    //Clicked On Hot Filter
    $('body').on('click', '.ga-nav-sub-hot .qa-nav-sub-link', function () {
        var pagetype = 'Community_List_Page';
        var eventPage = $('.ga-nav-sub-hot').data('page');
        var refLabel = "Page-Name: "+ eventPage +"; Timestamp: " + (Date()) + ";";
        gaEventBlog(pagetype, 'Clicked_On_Hot_Filter', refLabel);
    });
    
    //Clicked On Latest Filter
    $('body').on('click', '.ga-nav-sub-recent .qa-nav-sub-link', function () {
        var pagetype = 'Community_List_Page';
        var eventPage = $('.ga-nav-sub-hot').data('page');
        var refLabel = "Page-Name: "+ eventPage +"; Timestamp: " + (Date()) + ";";
        gaEventBlog(pagetype, 'Clicked_On_Latest_Filter', refLabel);
    });
    
    //Clicked On Most Votes Filter
    $('body').on('click', '.ga-nav-sub-votes .qa-nav-sub-link', function () {
        var pagetype = 'Community_List_Page';
        var eventPage = $('.ga-nav-sub-hot').data('page');
        var refLabel = "Page-Name: "+ eventPage +"; Timestamp: " + (Date()) + ";";
        gaEventBlog(pagetype, 'Clicked_On_Most_Votes_Filter', refLabel);
    });
    
    //Clicked On Most Answers Filter
    $('body').on('click', '.ga-nav-sub-answers .qa-nav-sub-link', function () {
        var pagetype = 'Community_List_Page';
        var eventPage = $('.ga-nav-sub-hot').data('page');
        var refLabel = "Page-Name: "+ eventPage +"; Timestamp: " + (Date()) + ";";
        gaEventBlog(pagetype, 'Clicked_On_Most_Answers_Filter', refLabel);
    });
    
    //Clicked On Most Views Filter
    $('body').on('click', '.ga-nav-sub-views .qa-nav-sub-link', function () {
        var pagetype = 'Community_List_Page';
        var eventPage = $('.ga-nav-sub-hot').data('page');
        var refLabel = "Page-Name: "+ eventPage +"; Timestamp: " + (Date()) + ";";
        gaEventBlog(pagetype, 'Clicked_On_Most_Views_Filter', refLabel);
    });
    
    //Clicked On Read More Option
    $('body').on('click', '.ga-read-more-click', function () {
        var pagetype = 'Community_List_Page';
        var eventPage = $(this).data('page');
        var refLabel = "Page-Name: "+ eventPage +"; Timestamp: " + (Date()) + ";";
        gaEventBlog(pagetype, 'Clicked_On_Read_More_Option', refLabel);
    });
    
    //Clicked On User Name
    $('body').on('click', '.ga-user-link .ga-click-user-link', function () {
        var pagetype = 'Community_List_Page';
        var eventPage = $('.ga-user-link').data('page');
        var refLabel = "Page-Name: "+ eventPage +"; Timestamp: " + (Date()) + ";";
        gaEventBlog(pagetype, 'Clicked_On_User_Name', refLabel);
    });
    
    //Clicked On All Categories
    $('body').on('click', '.ga-nav-cat-all .qa-nav-cat-link', function () {
        var pagetype = 'Community_All_Categories_Widget';
        var eventPage = $('.ga-nav-cat-all').data('page');
        var catName = $(this).data('original-title');
        var refLabel = "Page-Name: "+ eventPage +"; Category-name: "+ catName +"; Timestamp: " + (Date()) + ";";
        gaEventBlog(pagetype, 'Clicked_On_All_Categories', refLabel);
    });
    
    //Clicked On Individual Categories
    $('body').on('click', '.ga-nav-cat-categories-widget .qa-nav-cat-link', function () {
        var pagetype = 'Community_All_Categories_Widget';
        var eventPage = $('.ga-nav-cat-categories-widget').data('page');
        var catName = $(this).data('original-title');
        var refLabel = "Page-Name: "+ eventPage +"; Category-name: "+ catName +"; Timestamp: " + (Date()) + ";";
        gaEventBlog(pagetype, 'Clicked_On_Individual_Categories', refLabel);
    });
    
    
    
    //Clicked On Question Heading Related Widget
    $('body').on('click', '.ga-heading-click-question', function () {
        var pagetype = 'Clicked_On_Related_Questions';
        var eventCategory = $(this).data('category');
        var refLabel = "Category-Name: "+ eventCategory +"; Timestamp: " + (Date()) + ";";
        gaEventBlog(pagetype, 'Clicked_On_Question_Heading', refLabel);
    });
    
    //Clicked On Read More Related Widget
    $('body').on('click', '.ga-read-more-click-question', function () {
        var pagetype = 'Clicked_On_Related_Questions';
        var eventCategory = $(this).data('category');
        var refLabel = "Category-Name: "+ eventCategory +"; Timestamp: " + (Date()) + ";";
        gaEventBlog(pagetype, 'Clicked_On_Read_More', refLabel);
    });
    
    //Clicked On Category Name Related Widget
    $('body').on('click', '.ga-link .ga-cat-link', function () {
        var pagetype = 'Clicked_On_Related_Questions';
        var eventCategory = $('.ga-link').data('category');
        var refLabel = "Category-Name: "+ eventCategory +"; Timestamp: " + (Date()) + ";";
        gaEventBlog(pagetype, 'Clicked_On_Category_Name', refLabel);
    });
    
    //Clicked On User Name Related Widget
    $('body').on('click', '.ga-link .ga-click-user-link', function () {
        var pagetype = 'Clicked_On_Related_Questions';
        var eventCategory = $('.ga-link').data('category');
        var refLabel = "Category-Name: "+ eventCategory +"; Timestamp: " + (Date()) + ";";
        gaEventBlog(pagetype, 'Clicked_On_User_Name', refLabel);
    });
    
    //Clicked On User Name Related Widget
    $('body').on('click', '.ga-tags .ga-tag-link', function () {
        var pagetype = 'Clicked_On_Related_Questions';
        var eventCategory = $('.ga-tags').data('category');
        var refLabel = "Category-Name: "+ eventCategory +"; Timestamp: " + (Date()) + ";";
        gaEventBlog(pagetype, 'Clicked_On_Tags', refLabel);
    });
    
    //Clicked On Recent Questions Widget
    $('body').on('click', '.ga-recent-widget', function () {
        var pagetype = 'Community_Recent_Questions_Widget';
        var eventPage = $(this).data('page');
        var eventCategory = $(this).data('category');
        var refLabel = "Page-Name: "+ eventPage +"; Category-Name: "+ eventCategory +"; Timestamp: " + (Date()) + ";";
        gaEventBlog(pagetype, 'Clicked_On_Recent_Questions', refLabel);
    });
    
    //Clicked On Ask A Question Header
    $('body').on('click', '.ga-ask-question', function () {
        var pagetype = 'Community_Ask_A_Question';
        var eventPage = $(this).data('page');
        var refLabel = "Page-Name: "+ eventPage +"; Timestamp: " + (Date()) + ";";
        gaEventBlog(pagetype, 'Clicked_On_Ask_A_Question_Header', refLabel);
    });

    //Clicked On Popular Tags Widget
    $('body').on('click', '.ga-tags-click', function () {
        var pagetype = 'Community_Popular_Tags_Widget';
        var eventPage = $('.ga-tags-click').data('page');
        var refLabel = "Page-Name: "+ eventPage +"; Timestamp: " + (Date()) + ";";
        gaEventBlog(pagetype, 'Clicked_On_Popular_Tags', refLabel);
    });
    
    //Clicked On Signup Header
    $('body').on('click', '.ga-signup-header-click', function () {
        var pagetype = 'Community_Signup';
        var eventPage = $(this).data('page');
        var refLabel = "Page-Name: "+ eventPage +"; Timestamp: " + (Date()) + ";";
        gaEventBlog(pagetype, 'Clicked_On_Signup_Header', refLabel);
    });
    
    //Clicked On Signup Gmail Signup
    $('body').on('click', '.ga-signup-google-click', function () {
        var pagetype = 'Community_Signup';
        var eventPage = $(this).data('page');
        var refLabel = "Page-Name: "+ eventPage +"; Timestamp: " + (Date()) + ";";
        gaEventBlog(pagetype, 'Clicked_On_Signup_Gmail_Signup', refLabel);
    });
    
    //Clicked On Signup Facebook Signup
    $('body').on('click', '.ga-signup-facebook-click', function () {
        var pagetype = 'Community_Signup';
        var eventPage = $(this).data('page');
        var refLabel = "Page-Name: "+ eventPage +"; Timestamp: " + (Date()) + ";";
        gaEventBlog(pagetype, 'Clicked_On_Signup_Facebook_Signup', refLabel);
    });    
    
//    //Clicked On Signup Popup Submit ------ event is present in social-signup.js file
//    //Clicked On Signup Popup Login ------ event is present in social-signup.js file
    
    //Clicked On Login Header
    $('body').on('click', '.ga-login-header-click', function () {
        var pagetype = 'Community_Login';
        var eventPage = $(this).data('page');
        var refLabel = "Page-Name: "+ eventPage +"; Timestamp: " + (Date()) + ";";
        gaEventBlog(pagetype, 'Clicked_On_Login_Header', refLabel);
    });
    
    //Clicked On Login Gmail Login
    $('body').on('click', '.ga-login-google-click', function () {
        var pagetype = 'Community_Login';
        var eventPage = $(this).data('page');
        var refLabel = "Page-Name: "+ eventPage +"; Timestamp: " + (Date()) + ";";
        gaEventBlog(pagetype, 'Clicked_On_Login_Gmail_Login', refLabel);
    });
    
    //Clicked On Login Facebook Login
    $('body').on('click', '.ga-login-facebook-click', function () {
        var pagetype = 'Community_Login';
        var eventPage = $(this).data('page');
        var refLabel = "Page-Name: "+ eventPage +"; Timestamp: " + (Date()) + ";";
        gaEventBlog(pagetype, 'Clicked_On_Login_Facebook_Login', refLabel);
    });

//    //Clicked On Login Popup Login ------ event is present in social-signup.js file
//    //Clicked On Login Popup Signup ------ event is present in social-signup.js file

    //Clicked On Login Banner Footer
    $('body').on('click', '.ga-banner-login-click', function () {
        var pagetype = 'Community_Login';
        var eventPage = $(this).data('page');
        var refLabel = "Page-Name: "+ eventPage +"; Timestamp: " + (Date()) + ";";
        gaEventBlog(pagetype, 'Clicked_On_Login_Banner', refLabel);
    });
    
    //Clicked On Login Banner Gmail Login
    $('body').on('click', '.ga-banner-login-google-click', function () {
        var pagetype = 'Community_Login';
        var eventPage = $(this).data('page');
        var refLabel = "Page-Name: "+ eventPage +"; Timestamp: " + (Date()) + ";";
        gaEventBlog(pagetype, 'Clicked_On_Login_Banner_Gmail_Login', refLabel);
    });
    
    //Clicked On Login Banner Facebook Login
    $('body').on('click', '.ga-banner-login-facebook-click', function () {
        var pagetype = 'Community_Login';
        var eventPage = $(this).data('page');
        var refLabel = "Page-Name: "+ eventPage +"; Timestamp: " + (Date()) + ";";
        gaEventBlog(pagetype, 'Clicked_On_Login_Banner_Facebook_Login', refLabel);
    });
});