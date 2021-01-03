/* 
 * @description It has all the methods got clevertap communication
 * @author Kasa Sathish<kasa.sathish@edureka.co>
 */
var clevertap = {event:[], profile:[], account:[], onUserLogin:[], notifications:[], privacy:[]};
// replace with the CLEVERTAP_ACCOUNT_ID with the actual ACCOUNT ID value from your Dashboard -> Settings page
clevertap.account.push({"id": clevertap_AccountId});
clevertap.privacy.push({optOut: false}); //set the flag to true, if the user of the device opts out of sharing their data
clevertap.privacy.push({useIP: false}); //set the flag to true, if the user agrees to share their IP data
(function () {
    var wzrk = document.createElement('script');
    wzrk.type = 'text/javascript';
    wzrk.async = true;
    wzrk.src = ('https:' == document.location.protocol ? 
    'https://d2r1yp2w7bby2u.cloudfront.net' : 'http://static.clevertap.com') + '/js/a.js';
    var s = document.getElementsByTagName('script')[0];
    s.parentNode.insertBefore(wzrk, s);
})();
 
function trackEvent(eventName, metaData) {
    if (typeof metaData == 'undefined') {
        return clevertap.event.push(eventName);
    } else {
        return clevertap.event.push(eventName, metaData);
    }
} 

function pushProperties(properties) {
    if (typeof properties !== 'undefined') {
        return clevertap.profile.push({
            Site: properties
        });
    }
    return false;
}