package com.minh.constants;

public final class EndPoint {

    public static class SEARCH {
        public static final String SCHOLARSHIPS = "/scholarships";
    }

    public static class NOTIFICATION {
        public static final String USER_NOTIFICATIONS = "/users";
        public static final String NOTIFICATION_TEMPLATES = "/templates";
        public static final String NOTIFICATION_CONNECTS = "/connects";
    }

    public static class MEDIA {
        public static final String MEDIA = "/medias";
    }

    public static class PROFILES {
        public static final String PROFILES = "/profiles";
        public static final String APPLICANTS = "/applicants";
        public static final String PROVIDERS = "/providers";
        public static final String FOLLOWERS = "/followers";
        public static final String PROVIDER_NEW = "/provider-new";
    }

    public static class LOCATION {
        public static final String COUNTRY = "/backoffice/countries";
        public static final String STATE_OR_PROVINCE = "/storefront/state-or-provinces";
        public static final String COUNTRIES_STOREFRONT_URL = "/storefront/countries";
        public static final String STATE_OR_PROVINCES_STOREFRONT_URL = "/storefront/state-or-provinces";
    }

    public static class SCHOLARSHIP {
        public static final String SCHOLARSHIPS = "/scholarships";
        public static final String APPLICATIONS = "/applications";
        public static final String APPLICATION_REVIEW = "/applications/review";
        public static final String APPLICATION_SCHOLARSHIP = "/applications-scholarship";
    }

    public static class SUBSCRIPTION {
        public static final String SUBSCRIPTIONS = "/subscription";
        public static final String PLANS = "/subscription/subscription/plans";
        public static final String PAYMENTS = "/subscription/payments";
    }
}
