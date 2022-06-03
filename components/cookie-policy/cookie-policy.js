+(function($){
    "use strick";
  
    var CONSTANTS = { 
        COOKIE_POLICY_NAME: 'fst-cookie-policy',
        PREFIX: 'fst',
        COOKIES_ICON: '<svg xmlns="http://www.w3.org/2000/svg" id="Layer_1" enable-background="new 0 0 511.979 511.979" height="30" viewBox="0 0 511.979 511.979" width="30">\
                        <path d="m511.476 242.599c-.257-5.002-2.994-9.545-7.295-12.11-4.301-2.566-9.599-2.815-14.122-.667-12.264 5.827-25.42 8.781-39.104 8.781-50.353 0-91.318-40.995-91.318-91.386 0-12.611 2.521-24.826 7.494-36.307 2.443-5.642 1.197-12.202-3.144-16.555-4.342-4.354-10.899-5.617-16.547-3.187-7.114 3.06-14.676 4.611-22.473 4.611-31.427 0-56.995-25.589-56.995-57.042 0-6.414 1.07-12.736 3.179-18.788 1.594-4.573.882-9.634-1.911-13.589-2.792-3.956-7.323-6.32-12.166-6.349l-.27-.004c-.271-.003-.542-.007-.815-.007-68.337 0-132.584 26.629-180.905 74.981-48.318 48.349-74.928 112.633-74.928 181.008s26.61 132.659 74.928 181.008c48.321 48.353 112.568 74.981 180.905 74.981s132.584-26.629 180.905-74.981c48.318-48.349 74.928-112.633 74.928-181.008.001-4.416-.116-8.922-.346-13.39zm-95.802 173.192c-42.654 42.682-99.365 66.188-159.685 66.188s-117.031-23.506-159.685-66.188c-42.656-42.684-66.148-99.436-66.148-159.802s23.492-117.118 66.148-159.801c38.468-38.493 88.368-61.389 142.039-65.513-.248 2.674-.372 5.363-.372 8.063 0 47.995 39.026 87.042 86.995 87.042 2.211 0 4.411-.082 6.596-.245-1.281 7.104-1.926 14.344-1.926 21.682 0 66.933 54.423 121.386 121.318 121.386 10.495 0 20.76-1.311 30.705-3.912-2.146 57.1-25.385 110.474-65.985 151.1z"></path>\
                        <path d="m148.083 243.363c27.255 0 49.429-22.185 49.429-49.452s-22.174-49.451-49.429-49.451c-27.256 0-49.43 22.184-49.43 49.451s22.174 49.452 49.43 49.452zm0-68.903c10.713 0 19.429 8.726 19.429 19.451s-8.716 19.452-19.429 19.452-19.43-8.727-19.43-19.452 8.716-19.451 19.43-19.451z"></path>\
                        <path d="m157.722 287.95c-25.306 0-45.893 20.597-45.893 45.913s20.587 45.913 45.893 45.913 45.894-20.597 45.894-45.913-20.588-45.913-45.894-45.913zm0 61.826c-8.764 0-15.893-7.139-15.893-15.913s7.129-15.913 15.893-15.913 15.894 7.139 15.894 15.913-7.13 15.913-15.894 15.913z"></path>\
                        <path d="m365.166 296.002c-27.255 0-49.429 22.184-49.429 49.451s22.174 49.452 49.429 49.452c27.256 0 49.43-22.185 49.43-49.452s-22.174-49.451-49.43-49.451zm0 68.903c-10.713 0-19.429-8.727-19.429-19.452s8.716-19.451 19.429-19.451 19.43 8.726 19.43 19.451-8.717 19.452-19.43 19.452z"></path>\
                        <path d="m276.542 379.905c-8.137 0-14.734 6.601-14.734 14.743 0 8.143 6.597 14.744 14.734 14.744s14.734-6.601 14.734-14.744c0-8.142-6.597-14.743-14.734-14.743z"></path>\
                        <ellipse cx="188.616" cy="86.059" rx="14.734" ry="14.744"></ellipse>\
                        <ellipse cx="86.207" cy="288.206" rx="14.734" ry="14.744"></ellipse>\
                        <path d="m227.791 207.791c-8.137 0-14.734 6.601-14.734 14.744s6.597 14.743 14.734 14.743 14.734-6.601 14.734-14.743c0-8.143-6.596-14.744-14.734-14.744z"></path>\
                        <ellipse cx="316.003" cy="266.91" rx="14.734" ry="14.744"></ellipse>\
                </svg>',
    };
  
  
    var FstCookiesPolicy = /** @class */ (function(){
  
        var _this;
  
        /** 
         * Constructor function for initilize the plugin
         */
        function FstCookiesPolicy(options){
            
            _this = this;
            this.$cookieNotification;
  
            var defaultOptions = this.getDefaultConfig();
            this.settings = $.extend({}, defaultOptions, options);
            
            /* If already accepted then don't show */
            if(!this.getLocalStorage(CONSTANTS.COOKIE_POLICY_NAME)){
                this.appendTemplateToDom();
                this.show();
            }
        };
  
        /** 
         * Default configuration of FstCookiesPolicy
         * @returns {Object}
         */
        FstCookiesPolicy.prototype.getDefaultConfig = function(){
            return{
                fadeOutDuration: 500,
                acceptButtonCustomClass: '',
                declineButtonCustomClass: '',
                acceptButtonText: 'Allow',
                declineuttonText: 'Decline',
                CookiePolicyContentText: 'We use third-party cookies in order to personalize your site experience',
            }
        };
  
        /** 
         * Handle the Accept button click
         * @returns {void}
         */
        FstCookiesPolicy.prototype.handleAcceptButtonClick = function(e){
            e.preventDefault();
            _this.setLocalStorage(CONSTANTS.COOKIE_POLICY_NAME, 1);
            _this.remove();
        };
  
        /** 
         * Handle the Accept button click
         * @returns {void}
         */
        FstCookiesPolicy.prototype.handleDeclineButtonClick = function(e){
            e.preventDefault();
            _this.remove();
        };
  
        /** 
         * Add Cookie policy template to DOM
         * @returns {void} 
         */
        FstCookiesPolicy.prototype.appendTemplateToDom = function(){
            var $body = $('body');
            var template = this.getTemplate();
            $body.append(template);
        };
  
        /** 
         * Remove the cookie policy template from DOM
         * @returns {void} 
         */
        FstCookiesPolicy.prototype.remove = function(){
            _this.$cookieNotification.fadeOut(_this.settings.fadeOutDuration, function(){
                $(this).remove();
            });
        };
  
        /** 
         * Show the policy template
         * @returns {void} 
         */
        FstCookiesPolicy.prototype.show = function(){
            _this.$cookieNotification.fadeIn(_this.settings.fadeOutDuration);
        };
  
        /** 
         * Generate the Cookie policy template
         * @return {DOM} 
         */
        FstCookiesPolicy.prototype.getTemplate = function(){
            var $cookieNotification= $('<div class="'+CONSTANTS.PREFIX+'-cookie-notification" style="display:none;" />');
            var $icon = $(CONSTANTS.COOKIES_ICON);
            var $description = $('<div class="'+CONSTANTS.PREFIX+'-description"/>').text(this.settings.CookiePolicyContentText);
  
            var $buttonWrapper = $('<div class="'+CONSTANTS.PREFIX+'-buttons" />');
            var $btnAllow = $('<a href="#" class="'+CONSTANTS.PREFIX+'-btn-accept '+this.settings.acceptButtonCustomClass+'" />').text(this.settings.acceptButtonText);
            var $btnDecline = $('<a href="#" class="'+CONSTANTS.PREFIX+'-btn-decline '+this.settings.declineButtonCustomClass+'" />').text(this.settings.declineuttonText);
  
            /* Bind the events */
            $btnAllow.on('click', this.handleAcceptButtonClick);
            $btnDecline.on('click', this.handleDeclineButtonClick)
  
            $buttonWrapper.append($btnAllow).append($btnDecline);
            $cookieNotification.append($icon).append($description).append($buttonWrapper);
            this.$cookieNotification = $cookieNotification;
            return $cookieNotification;
        };
  
         /** 
         * Store value in Local storage
         * @param {String} name -Cookie name
         * @param {String} value -Value of cookie
         * @returns {void}
         */
        FstCookiesPolicy.prototype.setLocalStorage = function(name, value){
            localStorage.setItem(name, value);
        }
  
        /** 
         * Get value from Local storage
         * @param {String} name -Cookie name
         * @returns {void}
         */
        FstCookiesPolicy.prototype.getLocalStorage = function(name){
            return localStorage.getItem(name);
        }
  
        /** 
         * Remove value from Local storage
         * @param {String} name -Cookie name
         * @returns {void}
         */
        FstCookiesPolicy.prototype.removeLocalStorage = function(name){
            localStorage.removeItem(name);
        };
  
  
        return FstCookiesPolicy;
    }());
  
    window.FstCookiesPolicy = FstCookiesPolicy;
  
  })( jQuery )