# Test Case Procedures - Application Management (UI)

This document outlines the test procedures for Application Management validation via the User Interface (UI), replacing the direct API test steps.

| Test Case ID | Test Case Description | Test Case Procedure (UI) | Expected Results | Pre-conditions |
| :--- | :--- | :--- | :--- | :--- |
| **APP_001** | Query application page | 1. Log in as an **Applicant** or **Provider**.<br>2. Navigate to the **Applications** list page (`/applicant/applications` or `/provider/applications`).<br>3. Use the filter controls (e.g., Status, Date) to filter the list.<br>4. Scroll or use pagination controls to view subsequent pages. | The application list updates to show only records matching the filter. Pagination works correctly (next/prev pages load). | User is logged in. |
| **APP_002** | Get All Applications (Admin) | 1. Log in as **Admin** `(Backoffice)`.<br>2. Navigate to **Scholarship Applications** management page (`/applicationScholarship`).<br>3. Verify the list displays applications from all users/providers. | A comprehensive list of all applications in the system is displayed. | Admin is logged in to Backoffice. |
| **APP_003** | Get My Applications | 1. Log in as **Applicant** `(Edufront)`.<br>2. Navigate to **My Applications** (`/applicant/applications`).<br>3. Verify the list shows only applications submitted by the current user. | List displays applications belonging to the logged-in applicant only. | Applicant is logged in. |
| **APP_004** | Get Applications by Scholarship | 1. Log in as **Provider** `(Edufront)`.<br>2. Navigate to **Scholarship Management** or **Applications**.<br>3. Select a specific Scholarship to view its applications. | List displays only applications linked to the selected scholarship. | Provider is logged in. |
| **APP_005** | Get Application by ID | 1. Navigate to an **Application List** page.<br>2. Click on the **"View Details"** or **Eye icon** of a specific application.<br>3. Verify the URL contains the application ID (e.g., `/applications/{id}`). | The Application Detail page opens, showing correct data (Applicant info, Status, Attachments). | Application exists. |
| **APP_006** | Get Application by Code | 1. Use the **Global Search** or **Filter Bar** on the Application List page.<br>2. Enter a specific **Application Code** (e.g., `APP-2024-001`).<br>3. Press Enter/Search. | The specific application associated with that code is displayed. | Application Code exists. |
| **APP_007** | Create Application | 1. Log in as **Applicant**.<br>2. Browse for a Scholarship and click **"Apply Now"**.<br>3. Fill in the required form fields (JSON data mapped to inputs).<br>4. Upload required Media files (documents/images).<br>5. Click **"Submit"**. | System displays a success message. The new application appears in "My Applications" list. | Applicant logged in. Scholarship is active. |
| **APP_008** | Update Application | 1. Log in as **Owner** (Applicant) or **Provider** (if actionable).<br>2. Open an Application's details.<br>3. Click **"Edit"** or **Update Status**.<br>4. Modify fields and click **"Save"**. | System displays success message. Changes are reflected in the details view. | Owner logged in. |
| **APP_009** | Add Images to Application | 1. Open Application Details.<br>2. Navigate to the **"Attachments"** or **"Images"** section.<br>3. Click **"Upload Image"** and select a file.<br>4. Confirm upload. | Image appears in the gallery/list. Success message displayed. | Owner logged in. |
| **APP_010** | Delete Images from Application | 1. Open Application Details.<br>2. Navigate to the **"Attachments"** or **"Images"** section.<br>3. Select an image.<br>4. Click the **"Delete"** (Trash icon) button and confirm. | Image is removed from the gallery. Success message displayed. | Owner logged in. |
| **APP_011** | Delete Application | 1. Log in as **Owner** (or Admin).<br>2. Navigate to **Application List**.<br>3. Find the target application and click **"Delete"**.<br>4. Confirm the deletion in the popup modal. | Application is removed from the list. Success message displayed. | Owner logged in. |

# Test Case Procedures - Scholarship Application (Detailed Flows)

This section provides specific, detailed test cases for the Scholarship Application feature, covering specific interactions like "Import from Profile" and Provider Approval workflows.

| Test Case ID | Test Case Description | Test Case Procedure (UI) | Expected Results | Pre-conditions |
| :--- | :--- | :--- | :--- | :--- |
| **APPSCH_001** | Create Application (Import Profile) | 1. Log in as **Applicant**.<br>2. Navigate to a Scholarship Detail page and click **"Apply Now"**.<br>3. On the Application Form, click the **"Import from Profile"** button (Download icon).<br>4. Verify that fields (Education, Personal Info, etc.) are auto-populated from the user's profile.<br>5. Upload any additional required images/documents.<br>6. Click **"Submit"**. | Form fields populate correctly. Application is submitted successfully. User redirected to "My Applications". | Applicant has a filled profile. |
| **APPSCH_002** | Provider Review Application (Approve) | 1. Log in as **Provider**.<br>2. Navigate to **"Applications"** tab/menu.<br>3. Click "View" (Eye icon) on a **Pending** application.<br>4. Review all tabs (Personal, Education, Experience, Statement).<br>5. Enter a **Note** (optional).<br>6. Click **"Approve"**.<br>7. Confirm action if prompted. | Application status updates to **"Approved"**. Success toast appears. | Provider logged in. Pending application exists. |
| **APPSCH_003** | Provider Review Application (Reject) | 1. Log in as **Provider**.<br>2. Open details of a **Pending** application.<br>3. Enter a **Note** (Reason for rejection).<br>4. Click **"Reject"**.<br>5. Confirm action. | Application status updates to **"Rejected"**. Success toast appears. | Provider logged in. Pending application exists. |
| **APPSCH_004** | Provider Mark as Successful | 1. Log in as **Provider**.<br>2. Open details of an **Approved** application.<br>3. Click the **"Successful"** button.<br>4. Enter final remarks in Note.<br>5. Confirm action. | Application status updates to **"Successful"** (Final Awarded state). Success toast appears. | Application is in "Approved" state. |
| **APPSCH_005** | View Application Attachments (Provider) | 1. Log in as **Provider**.<br>2. Open Application Detail.<br>3. Scroll to **Attachments** section.<br>4. Click on an Image to expand/view.<br>5. Click on a PDF link to open in new tab. | Images display in full view or lightbox. PDFs open correctly in browser. | Application has attachments. |
| **APPSCH_006** | Admin Manage Applications | 1. Log in as **Admin** (Backoffice).<br>2. Navigate to **"Scholarship Applications"** menu.<br>3. Use the Filter dropdown to select a status (e.g., "PENDING").<br>4. Verify the list only shows applications with that status.<br>5. Click to view details of one application. | Table filters correctly. Admin can view full details similar to Provider view. | Admin logged in. |

# Test Case Procedures - Applicant Profile Management (UI)

This section outlines the test procedures for Applicant Profile Management validation via the User Interface (UI).

| Test Case ID | Test Case Description | Test Case Procedure (UI) | Expected Results | Pre-conditions |
| :--- | :--- | :--- | :--- | :--- |
| **PRO_001** | Create Applicant Profile | 1. Log in as a **New Applicant** (without a profile).<br>2. Navigate to **"My Profile"** or follow the onboarding prompt.<br>3. Fill in the required **Student Information** (Name, DOB, etc.).<br>4. Fill in **Preferences** and **Study Goals**.<br>5. Click **"Save"**. | System displays a success toast/message. User is redirected to their View Profile page showing the populated data. | New User logged in. |
| **PRO_002** | View Applicant Detail (Get Profile by ID) | 1. Log in as **Provider**.<br>2. Navigate to **"Applicants"** or **"Start Scouting"** list.<br>3. Locate a specific applicant card and click **"View Profile"** (or click the name). | The Applicant Detail dialog/page opens, displaying the correct information for that specific applicant ID. | Provider logged in. Applicants exist. |
| **PRO_003** | View All Profiles (Get All) | 1. Log in as **Provider** (or Admin).<br>2. Navigate to the **"Applicants"** listing page.<br>3. Scroll down to trigger lazy loading (if available) or use pagination. | A list of applicant profiles is displayed. The count matches the expected number of visible profiles. | Provider/Admin logged in. |
| **PRO_004** | Update Profile | 1. Log in as **Applicant**.<br>2. Navigate to **"My Profile"**.<br>3. Click the **"Update"** (or Edit) button to enter Edit Mode (`/applicant/profile/update`).<br>4. Modify one or more fields (e.g., Change "First Name" or add a "Skill").<br>5. Click **"Save"**. | System displays success toast. User is redirected to View Profile. The updated fields reflect the new values. | Applicant logged in. |
| **PRO_005** | View My Profile | 1. Log in as **Applicant**.<br>2. Click on the **User Avatar/Menu**.<br>3. Select **"My Profile"** (or navigate to `/applicant/profile`). | The Profile page loads with the user's personal information, education history, and skills. Data matches the database. | Applicant logged in. |

# Test Case Procedures - Provider Profile Management (UI)

This section outlines the test procedures for Provider Profile Management validation via the User Interface (UI).

| Test Case ID | Test Case Description | Test Case Procedure (UI) | Expected Results | Pre-conditions |
| :--- | :--- | :--- | :--- | :--- |
| **PPRO_001** | Create/Update Provider Profile | 1. Log in as **Provider**.<br>2. Navigate to **"My Profile"** or **"Organization Settings"**.<br>3. Fill in **Organization Info** (Name, Type, Website, etc.).<br>4. Add one or more **Contact Persons**.<br>5. Click **"Save"**. | System displays success toast. Profile data is persisted. | Provider logged in. |
| **PPRO_002** | Upload Provider Banner/Logo | 1. Navigate to **"My Profile"** (Edit Mode).<br>2. Click on the **Banner** or **Logo** placeholder/edit icon.<br>3. Select a valid image file.<br>4. Submit the form/profile update. | The new Banner/Logo is displayed on the profile page. | Provider logged in. |
| **PPRO_003** | View Provider Profile (Public) | 1. Log in as **Applicant**.<br>2. Navigate to a Scholarship Detail page provided by the target Provider.<br>3. Click on the **Provider Name** link.<br>4. Verify the Provider Profile page loads. | Provider details (Description, Website, Scholarships list) are displayed correctly. | Applicant logged in. Provider exists. |

# Test Case Procedures - Subscription Management (UI)

This section outlines the test procedures for Subscription Management validation via the User Interface (UI).

| Test Case ID | Test Case Description | Test Case Procedure (UI) | Expected Results | Pre-conditions |
| :--- | :--- | :--- | :--- | :--- |
| **SUB_001** | View Subscription Plans (Applicant) | 1. Log in as **Applicant** (or access public pricing page).<br>2. Navigate to **"Subscriptions"** or **"Pricing"** (`/subscriptions?type=APPLICANT`).<br>3. Verify the available plans (Basic, Standard, Premium) are titled and priced correctly. | List of plans is displayed dynamically. "Current Plan" is highlighted if logged in. | N/A |
| **SUB_002** | View Subscription Plans (Provider) | 1. Log in as **Provider**.<br>2. Navigate to **"Subscriptions"** (`/subscriptions?type=PROVIDER`).<br>3. Verify the Provider-specific plans are displayed. | Provider plans are shown. | Provider logged in. |
| **SUB_003** | Subscribe to a Plan | 1. Select a paid plan (e.g., "Premium").<br>2. Click **"Subscribe"** or **"Upgrade"**.<br>3. Complete the checkout/payment process (Mock or Sandbox).<br>4. Return to the app. | System displays "Payment Successful" or similar message. User's subscription status updates to the new tier. | User logged in. Payment Gateway accessible. |
| **SUB_004** | Cancel Subscription (Provider) | 1. Log in as **Provider**.<br>2. Navigate to **"Subscriptions"** or **"My Plan"**.<br>3. Locate the current active plan.<br>4. Click **"Cancel Subscription"**.<br>5. Confirm the action in the modal. | System displays success message. Subscription status updates to "Canceled" or "Expires on [Date]". | Provider has active subscription. |
| **SUB_005** | View Payment History | 1. Log in as **Provider**.<br>2. Navigate to **"Payment History"** or **"Billing"** section.<br>3. Verify the list of past transactions is displayed (Date, Amount, Status). | List of transactions matches the user's payment history. | Provider has made payments. |

# Test Case Procedures - Report System (UI)

This section outlines the test procedures for the Reporting System validation via the User Interface (UI).

| Test Case ID | Test Case Description | Test Case Procedure (UI) | Expected Results | Pre-conditions |
| :--- | :--- | :--- | :--- | :--- |
| **RPT_001** | Report a Scholarship | 1. Log in as **Applicant**.<br>2. Open a **Scholarship Detail** page.<br>3. Click the **"Report"** (Flag icon) button.<br>4. Select a **Category** (e.g., "Fraud", "Broken Link").<br>5. Enter a Title and Description.<br>6. Click **"Submit"**. | System displays success toast ("Report submitted successfully"). Dialog closes. | Applicant logged in. Scholarship exists. |
| **RPT_002** | Report a Provider | 1. Log in as **Applicant**.<br>2. Open a **Provider Profile** page.<br>3. Click the **"Report"** button.<br>4. Fill in the report details.<br>5. Click **"Submit"**. | Success toast appears. | Applicant logged in. Provider exists. |
| **RPT_003** | Report a System Issue | 1. Click a **"Feedback"** or **"Report Bug"** link in the footer/menu.<br>2. Select **"System Issue"** category.<br>3. Describe the bug.<br>4. Click **"Submit"**. | Success toast appears. | N/A (or User logged in). |
| **RPT_004** | Report an Applicant Profile | 1. Log in as **Provider**.<br>2. Open an **Applicant's Profile** (from Application list).<br>3. Click the **"Report"** button.<br>4. Select category and enter details.<br>5. Click **"Submit"**. | System displays success toast. | Provider logged in. Applicant exists. |
| **RPT_005** | Admin View Reports | 1. Log in as **Admin** (Backoffice).<br>2. Navigate to **"Report Management"**.<br>3. Verify the table lists all submitted reports (from RPT_001, 002, etc.). | Reports are listed with correct status (Unread/Open). | Admin logged in. Reports exist. |
| **RPT_006** | Admin Resolve Report | 1. Log in as **Admin**.<br>2. Open a specific Report detail.<br>3. Click **"Mark as Resolved"** or **"Ignore"**.<br>4. Confirm action. | Report status updates to "Resolved". | Admin logged in. |

# Test Case Procedures - Authentication & Authorization (UI)

This section outlines the test procedures for Authentication validation via the User Interface (UI).

| Test Case ID | Test Case Description | Test Case Procedure (UI) | Expected Results | Pre-conditions |
| :--- | :--- | :--- | :--- | :--- |
| **AUTH_001** | User Login | 1. Navigate to the **Login Page**.<br>2. Enter valid Email and Password.<br>3. Click **"Sign In"**. | User is redirected to the Dashboard/Home. Header shows user avatar/name. | User is registered. |
| **AUTH_002** | User Registration | 1. Navigate to the **Register Page**.<br>2. Fill in the Registration Form (Email, Password, Name).<br>3. Click **"Sign Up"**. | System sends verification email (if applicable) or logs user in immediately. Redirects to Onboarding or Home. | N/A |
| **AUTH_003** | Forgot Password | 1. Click **"Forgot Password?"** on Login page.<br>2. Enter registered email.<br>3. Click **"Send Reset Link"**. | System displays confirmation message ("Link sent"). | Email must exist in system. |
| **AUTH_004** | Logout | 1. Click on **User Menu/Avatar**.<br>2. Select **"Logout"**. | User session is cleared. Redirected to Landing/Login page. | User is logged in. |

# Test Case Procedures - Scholarship Management (Provider UI)

This section outlines the test procedures for Scholarship Management (Provider side) validation via the User Interface (UI).

| Test Case ID | Test Case Description | Test Case Procedure (UI) | Expected Results | Pre-conditions |
| :--- | :--- | :--- | :--- | :--- |
| **SCH_001** | Create New Scholarship | 1. Log in as **Provider**.<br>2. Navigate to **"Scholarships"** list (`/provider/scholarships`).<br>3. Click **"New Scholarship"** (Plus icon).<br>4. Fill in Scholarship Form (Title, Description, Criteria, etc.).<br>5. Upload required images.<br>6. Click **"Create"** or **"Publish"**. | System displays success message. New scholarship appears in the list. | Provider logged in. |
| **SCH_002** | View Scholarship List | 1. Log in as **Provider**.<br>2. Navigate to **"Scholarships"** list.<br>3. Verify the list displays created scholarships with status (Draft/Published) and stats. | Scholarships are listed correctly. | Provider logged in. |
| **SCH_003** | Delete Scholarship | 1. In the **Scholarships** list, locate a scholarship.<br>2. Click the **"Delete"** (Trash icon) button.<br>3. Confirm the deletion in the prompt. | System displays success toast ("Deleted successfully"). Scholarship is removed from the list. | Provider logged in. Scholarship exists. |

# Test Case Procedures - Notifications (UI)

This section outlines the test procedures for Notification System validation via the User Interface (UI).

| Test Case ID | Test Case Description | Test Case Procedure (UI) | Expected Results | Pre-conditions |
| :--- | :--- | :--- | :--- | :--- |
| **NOT_001** | Receive Real-time Notification | 1. Log in as **User A**.<br>2. Have **User B** (or System) trigger an event (e.g., Send Message, Update Application).<br>3. Observe the **Bell Icon** and Toast. | A Toast notification appears with title/content. Bell icon shows a badge (red dot or count). | User A logged in. WebSocket connected. |
| **NOT_002** | View Notification List | 1. Click the **Bell Icon** in the header.<br>2. Review the dropdown list. | List of recent notifications is displayed. Unread items are highlighted. | User logged in. |
| **NOT_003** | Mark Notification as Read | 1. Open the **Notification Dropdown**.<br>2. Click on an unread notification item. | User is redirected to the relevant page (e.g., Application Detail). The notification is marked as read in the list. | User logged in. Unread notification exists. |

# Test Case Procedures - AI & Intelligent Features (UI)

This section outlines the test procedures for validating Artificial Intelligence features, including Recommendations, Chatbot, and Generative Studio tools.

| Test Case ID | Test Case Description | Test Case Procedure (UI) | Expected Results | Pre-conditions |
| :--- | :--- | :--- | :--- | :--- |
| **AI_REC_001** | Scholarship Recommendations (Profile Based) | 1. Log in as **Applicant**.<br>2. Navigate to **"Recommended Scholarships"** (or Home).<br>3. Verify the list of recommended items. | System displays a list of scholarships matching the user's profile (Major, GPA, Country). "Match Score" (if available) is high (>70%). | Applicant has a complete profile. |
| **AI_REC_002** | Refresh Recommendations | 1. Update **Applicant Profile** (e.g., change "Preferred Country" or "Major").<br>2. Return to **"Recommended Scholarships"**.<br>3. Refresh the page or click **"Update Recommendations"**. | The list updates to reflect the new profile data (e.g., shows scholarships for the new Country). | Profile updated successfully. |
| **AI_CHAT_001** | AI Chatbot - Contextual Q&A | 1. Open the **AI Chat/Assistant** widget.<br>2. Ask a question about a specific scholarship (e.g., "What is the deadline for the FPT Scholarship?"). | AI responds with accurate information extracted from the scholarship details. Response is natural and relevant. | Scholarship data exists. |
| **AI_CHAT_002** | AI Chatbot - Conversation History | 1. Ask a follow-up question (e.g., "How do I apply for *it*?").<br>2. Verify the AI understands "*it*" refers to the previous scholarship. | AI maintains context and provides the correct application procedure for the previously mentioned scholarship. | Previous chat message exists. |
| **AI_GEN_001** | Generate Quiz from Topic | 1. Navigate to **Studio** > **Quiz Generator**.<br>2. Enter a topic (e.g., "Java Basics") and Select Difficulty ("Easy").<br>3. Click **"Generate"**. | System generates a quiz with relevant questions, correct answers, and distractors. | N/A |
| **AI_GEN_002** | Generate Mind Map | 1. Navigate to **Studio** > **Mind Map**.<br>2. Enter a central topic (e.g., "Software Engineering Career Path").<br>3. Click **"Generate"**. | A visual Mind Map is rendered with a central node and logical sub-branches. Nodes are clickable/interactive. | N/A |
| **AI_FB_001** | Flag Incorrect AI Response | 1. Hover over an AI-generated message or content.<br>2. Click the **"Flag"** or **"Dislike"** icon.<br>3. Select a reason (e.g., "Inaccurate").<br>4. Submit. | Feedback is recorded (Toast message "Thank you for feedback"). | AI content displayed. |



