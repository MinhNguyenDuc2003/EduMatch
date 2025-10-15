package com.minh.constants;

public final class EndPoint {

    public static class NOTIFICATION {
        public static final String USER_NOTIFICATIONS = "/user-notifications";
        public static final String NOTIFICATION_TEMPLATES = "/notification-templates";
    }

    public static class MEDIA {
        public static final String MEDIA = "/medias";
    }

    public static class PROFILES {
        public static final String PROFILES = "/profiles";
        public static final String APPLICANTS = "/applicants";
        public static final String PROVIDERS = "/providers";
        public static final String FOLLOWERS = "/followers";
    }

    public static class LOCATION {
        public static final String COUNTRY = "/backoffice/countries";
        public static final String STATE_OR_PROVINCE = "/storefront/state-or-provinces";
        public static final String COUNTRIES_STOREFRONT_URL = "/storefront/countries";
        public static final String STATE_OR_PROVINCES_STOREFRONT_URL = "/storefront/state-or-provinces";
    }

    public static class SCHOLARSHIP {
        public static final String SCHOLARSHIPS = "/scholarships";
    }

}
