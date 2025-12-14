# EduMatch User Guide

## Table of Contents
- [System Overview](#system-overview)
- [Getting Started](#getting-started)
- [User Roles & Permissions](#user-roles--permissions)
- [Student Portal (EduFront)](#student-portal-edufront)
- [Admin Dashboard (Backoffice)](#admin-dashboard-backoffice)
- [API Documentation](#api-documentation)
- [Common Operations](#common-operations)
- [Mobile Application](#mobile-application)
- [Support & Troubleshooting](#support--troubleshooting)

---

## System Overview

### What is EduMatch?

EduMatch is a comprehensive scholarship management platform that connects students with scholarship opportunities using AI-powered matching technology. The platform consists of:

- **Student Portal (EduFront)**: Where students search for scholarships, submit applications, and track their progress
- **Admin Dashboard (Backoffice)**: Where administrators manage scholarships, review applications, and generate reports
- **AI Matching Engine**: Intelligent system that matches students with relevant scholarships based on their profiles
- **Notification System**: Automated email notifications for application updates and recommendations

### Key Features

#### For Students
- 🎓 **Profile Management**: Create and maintain detailed academic and personal profiles
- 🔍 **Smart Search**: Find scholarships using advanced filters and AI recommendations
- 📝 **Application Tracking**: Submit and monitor scholarship applications
- 📧 **Notifications**: Receive email updates on application status and new opportunities
- 💳 **Subscription Plans**: Access premium features with subscription tiers
- 📱 **Mobile App**: Access EduMatch on-the-go with the mobile application

#### For Administrators
- 📊 **Dashboard Analytics**: View comprehensive statistics and insights
- 🏫 **Scholarship Management**: Create, edit, and manage scholarship listings
- 👥 **User Management**: Manage student and organization accounts
- 📄 **Application Review**: Review and process scholarship applications
- 📈 **Reporting**: Generate detailed reports on applications and scholarships
- 💰 **Payment Processing**: Handle subscription payments and transactions
- 🔔 **Notification Management**: Configure and send email notifications

### System Architecture

```
┌─────────────────────────────────────────────────────────┐
│                    User Interfaces                       │
├──────────────┬──────────────┬──────────────┬────────────┤
│  Web Portal  │  Admin Panel │  Mobile App  │  API Docs  │
│  (EduFront)  │ (Backoffice) │   (React)    │ (Swagger)  │
└──────────────┴──────────────┴──────────────┴────────────┘
                         │
┌────────────────────────┴────────────────────────┐
│              API Gateway & Security              │
│         (NGINX + Keycloak Authentication)        │
└────────────────────────┬────────────────────────┘
                         │
┌────────────────────────┴────────────────────────┐
│              Microservices Layer                 │
├──────────────┬──────────────┬──────────────────┤
│  Customer    │  Profile     │  Scholarship     │
│  Search      │  Media       │  Notification    │
│  Payment     │  Report      │  AI Match        │
└──────────────┴──────────────┴──────────────────┘
                         │
┌────────────────────────┴────────────────────────┐
│              Data & Infrastructure               │
├──────────────┬──────────────┬──────────────────┤
│  PostgreSQL  │  Redis       │  Elasticsearch   │
│  Kafka       │  AWS S3      │  Email Service   │
└──────────────┴──────────────┴──────────────────┘
```

---

## Getting Started

### Accessing the Platform

#### Production URLs
- **Student Portal**: https://edumatch.space/edufront
- **Admin Dashboard**: https://edumatch.space/backoffice
- **API Documentation**: https://api.edumatch.space/swagger-ui
- **Identity Management**: https://api.edumatch.space/identity

#### Local Development URLs
- **Student Portal**: http://localhost/edufront
- **Admin Dashboard**: http://localhost/backoffice
- **API Documentation**: http://localhost/swagger-ui
- **Keycloak Admin**: http://localhost:8080 (dev mode)

### First-Time Login

#### For Students

1. **Navigate to EduFront**: Open your browser and go to the student portal
2. **Create Account**: Click "Sign Up" and fill in your details
3. **Verify Email**: Check your email for verification link
4. **Complete Profile**: Fill in your academic and personal information
5. **Browse Scholarships**: Start exploring available opportunities

#### For Administrators

1. **Navigate to Backoffice**: Open the admin dashboard URL
2. **Login with Credentials**: Use your administrator credentials
3. **Access Dashboard**: View the main analytics dashboard
4. **Configure Settings**: Set up your organization preferences

### User Registration

#### Student Registration Process

```
Step 1: Basic Information
├─ Email address
├─ Password (min 8 characters)
├─ Full name
└─ Phone number

Step 2: Email Verification
├─ Check email inbox
├─ Click verification link
└─ Confirm account

Step 3: Profile Completion
├─ Academic information
│  ├─ Current education level
│  ├─ Institution name
│  ├─ GPA/grades
│  └─ Field of study
├─ Personal information
│  ├─ Date of birth
│  ├─ Nationality
│  ├─ Address
│  └─ Demographics
└─ Additional information
   ├─ Achievements
   ├─ Extracurricular activities
   └─ Financial information
```

---

## User Roles & Permissions

### Role Hierarchy

| Role | Access Level | Capabilities |
|------|-------------|--------------|
| **Super Admin** | Full System | All administrative functions, system configuration |
| **Organization Admin** | Organization | Manage scholarships, review applications, view reports |
| **Reviewer** | Limited Admin | Review applications, provide feedback |
| **Student** | User | Create profile, search scholarships, submit applications |
| **Guest** | Public | Browse public scholarships (read-only) |

### Permission Matrix

| Feature | Super Admin | Org Admin | Reviewer | Student | Guest |
|---------|------------|-----------|----------|---------|-------|
| View Scholarships | ✅ | ✅ | ✅ | ✅ | ✅ |
| Create Scholarship | ✅ | ✅ | ❌ | ❌ | ❌ |
| Edit Scholarship | ✅ | ✅ | ❌ | ❌ | ❌ |
| Delete Scholarship | ✅ | ✅ | ❌ | ❌ | ❌ |
| Submit Application | ❌ | ❌ | ❌ | ✅ | ❌ |
| Review Application | ✅ | ✅ | ✅ | ❌ | ❌ |
| Manage Users | ✅ | ✅ | ❌ | ❌ | ❌ |
| View Reports | ✅ | ✅ | ✅ | ❌ | ❌ |
| System Settings | ✅ | ❌ | ❌ | ❌ | ❌ |
| AI Matching | ✅ | ✅ | ❌ | ✅ | ❌ |
| Payment Processing | ✅ | ✅ | ❌ | ✅ | ❌ |

---

## Student Portal (EduFront)

### Dashboard

The student dashboard provides:
- **Profile Completion Status**: Track your profile progress
- **Application Status**: View all your submitted applications
- **Recommended Scholarships**: AI-powered scholarship recommendations
- **Saved Scholarships**: Bookmarked opportunities
- **Notifications**: Recent updates and messages

### Profile Management

#### Creating Your Profile

1. **Personal Information**
   - Full name, email, phone
   - Date of birth, nationality
   - Current address

2. **Academic Information**
   - Education level (High School, Undergraduate, Graduate, etc.)
   - Institution name and location
   - GPA or equivalent grades
   - Major/Field of study
   - Expected graduation date

3. **Financial Information**
   - Family income range
   - Financial need level
   - Current funding sources

4. **Achievements & Activities**
   - Academic awards
   - Extracurricular activities
   - Volunteer work
   - Leadership positions
   - Publications or research

5. **Documents**
   - Upload transcripts
   - Upload recommendation letters
   - Upload personal statement
   - Upload CV/Resume

### Scholarship Search

#### Search Methods

**1. Basic Search**
```
Search by:
├─ Keywords (e.g., "engineering", "women in STEM")
├─ Scholarship name
├─ Organization name
└─ Location
```

**2. Advanced Filters**
```
Filter by:
├─ Education Level
├─ Field of Study
├─ Award Amount
├─ Deadline
├─ Eligibility Criteria
│  ├─ GPA requirement
│  ├─ Nationality
│  ├─ Gender
│  └─ Age range
└─ Application Requirements
```

**3. AI-Powered Recommendations**
- Based on your profile
- Personalized match score (0-100%)
- Ranked by relevance
- Updated daily

#### Viewing Scholarship Details

Each scholarship listing shows:
- **Basic Information**: Name, organization, amount, deadline
- **Description**: Full scholarship details and objectives
- **Eligibility Criteria**: Who can apply
- **Required Documents**: What you need to submit
- **Application Process**: Step-by-step instructions
- **Match Score**: How well you fit (AI-calculated)
- **Similar Scholarships**: Related opportunities

### Application Process

#### Step-by-Step Application

```
1. Review Scholarship
   └─ Read all requirements carefully

2. Check Eligibility
   └─ Ensure you meet all criteria

3. Prepare Documents
   ├─ Transcripts
   ├─ Recommendation letters
   ├─ Personal statement
   └─ Additional materials

4. Fill Application Form
   ├─ Personal information (auto-filled from profile)
   ├─ Academic information
   ├─ Essay questions
   └─ Additional questions

5. Upload Documents
   └─ Attach all required files

6. Review & Submit
   ├─ Double-check all information
   ├─ Preview application
   └─ Submit before deadline

7. Track Status
   └─ Monitor in "My Applications"
```

#### Application Statuses

| Status | Description | Next Steps |
|--------|-------------|------------|
| **Draft** | Application started but not submitted | Complete and submit |
| **Submitted** | Application received by organization | Wait for review |
| **Under Review** | Being evaluated by reviewers | No action needed |
| **Additional Info Required** | More documents/info needed | Upload requested items |
| **Shortlisted** | Moved to final round | Prepare for interview |
| **Approved** | Application accepted | Follow award instructions |
| **Rejected** | Application not successful | Apply to other scholarships |
| **Withdrawn** | You cancelled the application | - |

### Notifications

Students receive email notifications for:
- ✉️ New scholarship recommendations
- ✉️ Application status updates
- ✉️ Upcoming deadlines
- ✉️ Document requests
- ✉️ Award announcements
- ✉️ System updates

### Subscription Plans

#### Free Plan
- Basic profile
- Limited search results
- Standard recommendations
- Up to 5 applications per month

#### Premium Plan
- Enhanced profile features
- Unlimited search
- Advanced AI matching
- Unlimited applications
- Priority support
- Early access to new scholarships

#### Payment Methods
- Credit/Debit cards (via Stripe)
- PayPal
- Bank transfer (for annual plans)

---

## Admin Dashboard (Backoffice)

### Dashboard Overview

The admin dashboard displays:
- **Key Metrics**
  - Total scholarships
  - Active applications
  - Total students
  - Revenue statistics
- **Recent Activity**
  - New applications
  - Recent registrations
  - Pending reviews
- **Charts & Analytics**
  - Application trends
  - Scholarship popularity
  - User growth
  - Revenue over time

### Scholarship Management

#### Creating a Scholarship

1. **Basic Information**
   ```
   ├─ Scholarship name
   ├─ Organization name
   ├─ Award amount
   ├─ Number of awards
   ├─ Application deadline
   └─ Award announcement date
   ```

2. **Description & Details**
   ```
   ├─ Full description
   ├─ Objectives
   ├─ Benefits
   └─ Terms and conditions
   ```

3. **Eligibility Criteria**
   ```
   ├─ Education level
   ├─ Field of study
   ├─ Minimum GPA
   ├─ Nationality requirements
   ├─ Age range
   ├─ Gender (if applicable)
   └─ Other criteria
   ```

4. **Application Requirements**
   ```
   ├─ Required documents
   │  ├─ Transcripts
   │  ├─ Recommendation letters
   │  ├─ Personal statement
   │  └─ Additional documents
   ├─ Essay questions
   └─ Additional forms
   ```

5. **Review Settings**
   ```
   ├─ Assign reviewers
   ├─ Review criteria
   ├─ Scoring rubric
   └─ Selection process
   ```

#### Managing Scholarships

**Actions Available:**
- ✏️ Edit scholarship details
- 👁️ View applications
- 📊 View statistics
- 🔄 Duplicate scholarship
- 📅 Extend deadline
- ⏸️ Pause applications
- 🗑️ Archive/Delete

### Application Review

#### Review Workflow

```
1. View Applications List
   ├─ Filter by status
   ├─ Sort by date/score
   └─ Search by student name

2. Open Application
   ├─ View student profile
   ├─ Review submitted documents
   ├─ Check eligibility
   └─ Read essays/responses

3. Evaluate Application
   ├─ Score based on criteria
   ├─ Add reviewer notes
   ├─ Flag for discussion
   └─ Request additional info

4. Make Decision
   ├─ Approve
   ├─ Reject
   ├─ Shortlist
   └─ Request more information

5. Notify Student
   └─ Automated email sent
```

#### Reviewer Tools

- **Scoring System**: Rate applications on multiple criteria
- **Comparison View**: Compare multiple applications side-by-side
- **Collaboration**: Add comments for other reviewers
- **Bulk Actions**: Process multiple applications at once
- **Export**: Download applications for offline review

### User Management

#### Managing Students

**View Student Information:**
- Profile details
- Application history
- Subscription status
- Activity log
- Documents uploaded

**Actions:**
- Edit profile
- Reset password
- Suspend account
- Delete account
- Send notification
- View analytics

#### Managing Administrators

**Create Admin Account:**
1. Add email and basic info
2. Assign role (Org Admin, Reviewer)
3. Set permissions
4. Send invitation email

**Manage Permissions:**
- Scholarship management
- Application review
- User management
- Report access
- System settings

### Reports & Analytics

#### Available Reports

**1. Application Reports**
- Applications by status
- Applications by scholarship
- Application trends over time
- Conversion rates
- Average processing time

**2. Scholarship Reports**
- Most popular scholarships
- Application rates
- Award distribution
- Budget utilization
- Deadline compliance

**3. User Reports**
- User registration trends
- Active users
- User demographics
- Subscription analytics
- Engagement metrics

**4. Financial Reports**
- Revenue by subscription tier
- Payment transactions
- Refunds and chargebacks
- Revenue forecasting
- Budget vs actual

#### Exporting Reports

Reports can be exported in:
- 📊 Excel (.xlsx)
- 📄 PDF
- 📋 CSV
- 📈 JSON (for API integration)

### Notification Management

#### Email Templates

Customize email templates for:
- Welcome emails
- Application confirmation
- Status updates
- Document requests
- Award notifications
- Deadline reminders
- Subscription confirmations

#### Notification Settings

Configure:
- Email frequency
- Notification triggers
- Template variables
- Sender information
- Reply-to addresses
- CC/BCC recipients

---

## API Documentation

### Accessing Swagger UI

**URL**: http://localhost/swagger-ui (or https://api.edumatch.space/swagger-ui)

### Available API Services

| Service | Endpoint | Description |
|---------|----------|-------------|
| **Customer** | `/customer/v3/api-docs` | User account and authentication |
| **Profile** | `/profile/v3/api-docs` | Student profile operations |
| **Scholarship** | `/scholarship/v3/api-docs` | Scholarship CRUD operations |
| **Search** | `/search/v3/api-docs` | Search and filtering |
| **Media** | `/media/v3/api-docs` | File upload/download |
| **Notification** | `/notification/v3/api-docs` | Email notifications |
| **Subscription** | `/subscription/v3/api-docs` | Subscription management |
| **Report** | `/report/v3/api-docs` | Report generation |
| **Payment** | `/payment/v3/api-docs` | Payment processing |

### Authentication

All API endpoints require authentication using OAuth 2.0 / OpenID Connect via Keycloak.

#### Getting an Access Token

```bash
curl -X POST 'https://api.edumatch.space/identity/realms/Yas/protocol/openid-connect/token' \
  -H 'Content-Type: application/x-www-form-urlencoded' \
  -d 'grant_type=password' \
  -d 'client_id=your-client-id' \
  -d 'username=your-username' \
  -d 'password=your-password'
```

#### Using the Token

```bash
curl -X GET 'https://api.edumatch.space/scholarship/api/scholarships' \
  -H 'Authorization: Bearer YOUR_ACCESS_TOKEN'
```

### Common API Operations

#### Search Scholarships

```bash
GET /scholarship/api/scholarships?keyword=engineering&page=0&size=10
```

#### Get Student Profile

```bash
GET /profile/api/profiles/{studentId}
```

#### Submit Application

```bash
POST /scholarship/api/applications
Content-Type: application/json

{
  "scholarshipId": "123",
  "studentId": "456",
  "documents": [...],
  "responses": {...}
}
```

#### Upload Document

```bash
POST /media/api/upload
Content-Type: multipart/form-data

file: [binary data]
```

---

## Common Operations

### For Students

#### How to Find Relevant Scholarships

1. **Complete Your Profile**: Ensure 100% profile completion for best matches
2. **Use AI Recommendations**: Check the "Recommended for You" section
3. **Set Up Alerts**: Enable notifications for new matching scholarships
4. **Use Filters**: Narrow down by deadline, amount, field of study
5. **Save Favorites**: Bookmark scholarships to apply later

#### How to Increase Match Scores

- ✅ Complete all profile sections
- ✅ Add detailed academic achievements
- ✅ Upload supporting documents
- ✅ Keep information up-to-date
- ✅ Add extracurricular activities
- ✅ Include volunteer work and leadership

#### How to Track Application Status

1. Go to "My Applications" in the dashboard
2. View status for each application
3. Click on application for detailed timeline
4. Check email for status updates
5. Upload additional documents if requested

### For Administrators

#### How to Bulk Import Scholarships

```bash
# Prepare CSV file with scholarship data
# Use the provided template

# Upload via Backoffice
1. Navigate to Scholarships > Import
2. Select CSV file
3. Map columns to fields
4. Validate data
5. Confirm import
```

#### How to Generate Monthly Reports

1. Navigate to Reports section
2. Select report type (Applications, Revenue, etc.)
3. Set date range (e.g., last month)
4. Apply filters if needed
5. Click "Generate Report"
6. Export in desired format

#### How to Manage Application Deadlines

1. Go to Scholarship Management
2. Filter by upcoming deadlines
3. Select scholarship
4. Click "Extend Deadline" if needed
5. Set new deadline date
6. System automatically notifies applicants

---

## Mobile Application

### EduFront Mobile (React Native)

#### Features

- 📱 Full profile management
- 🔍 Scholarship search on-the-go
- 📝 Submit applications from mobile
- 🔔 Push notifications
- 📄 Document scanning and upload
- 💬 In-app messaging
- 🌐 Offline mode for saved scholarships

#### Installation

**Android**:
- Download from Google Play Store
- Or install APK from releases

**iOS**:
- Download from Apple App Store
- Requires iOS 13.0 or later

#### Mobile-Specific Features

- **Camera Integration**: Scan documents directly
- **Biometric Login**: Fingerprint/Face ID
- **Push Notifications**: Real-time updates
- **Offline Access**: View saved scholarships without internet
- **Quick Apply**: Simplified application process

---

## Support & Troubleshooting

### Common Issues

#### Cannot Login

**Problem**: Login fails with error message

**Solutions**:
1. Verify email and password are correct
2. Check if account is verified (check email)
3. Try "Forgot Password" to reset
4. Clear browser cache and cookies
5. Try a different browser
6. Contact support if issue persists

#### Profile Not Saving

**Problem**: Changes to profile are not saved

**Solutions**:
1. Ensure all required fields are filled
2. Check file size limits for uploads (max 5MB)
3. Verify internet connection
4. Try refreshing the page
5. Use a different browser
6. Contact support with error details

#### Application Submission Failed

**Problem**: Cannot submit application

**Solutions**:
1. Check all required fields are completed
2. Verify all required documents are uploaded
3. Ensure deadline has not passed
4. Check file formats (PDF, DOC, DOCX only)
5. Try submitting again after a few minutes
6. Contact support if deadline is approaching

#### Not Receiving Emails

**Problem**: No notification emails received

**Solutions**:
1. Check spam/junk folder
2. Verify email address in profile
3. Add noreply@edumatch.space to contacts
4. Check notification settings in profile
5. Contact support to verify email delivery

### Getting Help

#### Support Channels

**Email Support**: support@edumatch.space
- Response time: 24-48 hours
- Include: User ID, issue description, screenshots

**Live Chat**: Available in dashboard
- Hours: Monday-Friday, 9 AM - 5 PM (GMT+7)
- For urgent issues

**Help Center**: https://help.edumatch.space
- FAQs
- Video tutorials
- User guides
- Known issues

**Community Forum**: https://community.edumatch.space
- Ask questions
- Share tips
- Connect with other users

#### Reporting Bugs

When reporting bugs, please include:
1. Description of the issue
2. Steps to reproduce
3. Expected vs actual behavior
4. Screenshots or screen recordings
5. Browser/device information
6. User ID or email

#### Feature Requests

Submit feature requests via:
- Email: feedback@edumatch.space
- Community forum
- In-app feedback form

---

## Appendix

### Glossary

- **AI Matching**: Automated system that matches students with scholarships based on profile similarity
- **Application Status**: Current state of a scholarship application
- **Match Score**: Percentage indicating how well a student fits scholarship criteria
- **Microservices**: Independent services that make up the EduMatch platform
- **Profile Completion**: Percentage of profile fields filled out
- **Subscription Tier**: Level of access (Free, Premium, etc.)

### Keyboard Shortcuts

| Action | Shortcut |
|--------|----------|
| Search | `Ctrl + K` |
| New Application | `Ctrl + N` |
| Save Draft | `Ctrl + S` |
| Submit | `Ctrl + Enter` |
| Go to Dashboard | `Alt + D` |
| Go to Profile | `Alt + P` |
| Logout | `Alt + L` |

### System Requirements

**Supported Browsers**:
- Chrome 90+
- Firefox 88+
- Safari 14+
- Edge 90+

**Mobile Requirements**:
- Android 8.0+
- iOS 13.0+

---

**Last Updated**: December 2025  
**Version**: 1.0.0  
**For Support**: support@edumatch.space
