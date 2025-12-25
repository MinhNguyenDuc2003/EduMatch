# Unit Test Specification

This document defines the unit test cases for the system modules using a Decision Table format.

---

## 1. Identity - Register

| Function Code | UTC_ID_REG | Function Name | Register |
| :--- | :--- | :--- | :--- |
| **Created By** | Developer | **Executed By** | Automated |
| **Test requirement** | Register new users (Student/Institution) | **Total Test Cases** | 4 |

| Condition / Result | Item | UT_ID_01 | UT_ID_02 | UT_ID_03 | UT_ID_04 |
| :--- | :--- | :---: | :---: | :---: | :---: |
| **Condition** | **Precondition** | | | | |
| | DB Connected | O | O | O | O |
| | **Input** | | | | |
| | Valid StudentRegisterDTO | O | | | |
| | Email already in DB | | O | | |
| | Password < 6 chars | | | O | |
| | Valid InstRegisterDTO | | | | O |
| **Confirm** | **Return** | | | | |
| | 201 Created (User persisted) | O | | | |
| | 201 Created (Role=INSTITUTION) | | | | O |
| | **Exception** | | | | |
| | UserAlreadyExistsException | | O | | |
| | ValidationException | | | O | |
| **Result** | **Type** (N/A/B) | N | A | A | N |
| | **Passed/Failed** | P | P | P | P |
| | **Executed Date** | 12/24 | 12/24 | 12/24 | 12/24 |

---

## 2. Identity - Login

| Function Code | UTC_ID_LOG | Function Name | Login |
| :--- | :--- | :--- | :--- |
| **Created By** | Developer | **Executed By** | Automated |
| **Test requirement** | Authenticate users and issue tokens | **Total Test Cases** | 3 |

| Condition / Result | Item | UT_ID_05 | UT_ID_06 | UT_ID_07 |
| :--- | :--- | :---: | :---: | :---: |
| **Condition** | **Precondition** | | | |
| | DB Connected | O | O | O |
| | **Input** | | | |
| | Valid Creds (Email/Pass) | O | | |
| | Wrong Password | | O | |
| | Unregistered Email | | | O |
| **Confirm** | **Return** | | | |
| | AccessToken DTO | O | | |
| | **Exception** | | | |
| | InvalidCredentialsException | | O | |
| | UserNotFoundException | | | O |
| **Result** | **Type** (N/A/B) | N | A | A |
| | **Passed/Failed** | P | P | P |
| | **Executed Date** | 12/24 | 12/24 | 12/24 |

---

## 3. Profile - Create

| Function Code | UTC_PF_CRT | Function Name | Create Profile |
| :--- | :--- | :--- | :--- |
| **Created By** | Developer | **Executed By** | Automated |
| **Test requirement** | Create profile for new user | **Total Test Cases** | 1 |

| Condition / Result | Item | UT_PF_01 |
| :--- | :--- | :---: |
| **Condition** | **Precondition** | |
| | User Registered (No Profile) | O |
| | **Input** | |
| | Valid UserID, Name | O |
| **Confirm** | **Return** | |
| | Profile Created | O |
| **Result** | **Type** (N/A/B) | N |
| | **Passed/Failed** | P |
| | **Executed Date** | 12/24 |

---

## 4. Profile - Update

| Function Code | UTC_PF_UPD | Function Name | Update Profile |
| :--- | :--- | :--- | :--- |
| **Created By** | Developer | **Executed By** | Automated |
| **Test requirement** | Update existing profile info | **Total Test Cases** | 1 |

| Condition / Result | Item | UT_PF_02 |
| :--- | :--- | :---: |
| **Condition** | **Precondition** | |
| | Profile Exists | O |
| | **Input** | |
| | Valid Changes | O |
| **Confirm** | **Return** | |
| | Profile Updated | O |
| **Result** | **Type** (N/A/B) | N |
| | **Passed/Failed** | P |
| | **Executed Date** | 12/24 |

---

## 5. Profile - Get

| Function Code | UTC_PF_GET | Function Name | Get Profile |
| :--- | :--- | :--- | :--- |
| **Created By** | Developer | **Executed By** | Automated |
| **Test requirement** | Retrieve profile by ID | **Total Test Cases** | 2 |

| Condition / Result | Item | UT_PF_03 | UT_PF_04 |
| :--- | :--- | :---: | :---: |
| **Condition** | **Precondition** | | |
| | DB Connected | O | O |
| | **Input** | | |
| | Valid UserID | O | |
| | Unknown UserID | | O |
| **Confirm** | **Return** | | |
| | Return Profile Info | O | |
| | **Exception** | | |
| | ResourceNotFoundException | | O |
| **Result** | **Type** (N/A/B) | N | A |
| | **Passed/Failed** | P | P |
| | **Executed Date** | 12/24 | 12/24 |

---

## 6. Scholarship - Create

| Function Code | UTC_SC_CRT | Function Name | Create Scholarship |
| :--- | :--- | :--- | :--- |
| **Created By** | Developer | **Executed By** | Automated |
| **Test requirement** | Provider creates new scholarship | **Total Test Cases** | 3 |

| Condition / Result | Item | UT_SC_01 | UT_SC_02 | UT_SC_03 |
| :--- | :--- | :---: | :---: | :---: |
| **Condition** | **Precondition** | | | |
| | Provider Logged In | O | O | O |
| | **Input** | | | |
| | Valid DTO | O | | |
| | Date < Today | | O | |
| | Amount < 0 | | | O |
| **Confirm** | **Return** | | | |
| | 201 Created, ID returned | O | | |
| | **Exception** | | | |
| | DateValidationException | | O | |
| | ValidationException | | | O |
| **Result** | **Type** (N/A/B) | N | A | A |
| | **Passed/Failed** | P | P | P |
| | **Executed Date** | 12/24 | 12/24 | 12/24 |

---

## 7. Scholarship - Update

| Function Code | UTC_SC_UPD | Function Name | Update Scholarship |
| :--- | :--- | :--- | :--- |
| **Created By** | Developer | **Executed By** | Automated |
| **Test requirement** | Update scholarship details | **Total Test Cases** | 1 |

| Condition / Result | Item | UT_SC_04 |
| :--- | :--- | :---: |
| **Condition** | **Precondition** | |
| | Scholarship Exists | O |
| | **Input** | |
| | Valid Title | O |
| **Confirm** | **Return** | |
| | Updated in DB | O |
| **Result** | **Type** (N/A/B) | N |
| | **Passed/Failed** | P |
| | **Executed Date** | 12/24 |

---

## 8. Scholarship - Delete

| Function Code | UTC_SC_DEL | Function Name | Delete Scholarship |
| :--- | :--- | :--- | :--- |
| **Created By** | Developer | **Executed By** | Automated |
| **Test requirement** | Remove scholarship | **Total Test Cases** | 1 |

| Condition / Result | Item | UT_SC_05 |
| :--- | :--- | :---: |
| **Condition** | **Precondition** | |
| | Scholarship Exists | O |
| | **Input** | |
| | Valid ID | O |
| **Confirm** | **Return** | |
| | Soft/Hard Delete performed | O |
| **Result** | **Type** (N/A/B) | N |
| | **Passed/Failed** | P |
| | **Executed Date** | 12/24 |

---

## 9. Scholarship - Get

| Function Code | UTC_SC_GET | Function Name | Get Scholarship |
| :--- | :--- | :--- | :--- |
| **Created By** | Developer | **Executed By** | Automated |
| **Test requirement** | Retrieve scholarship details | **Total Test Cases** | 1 |

| Condition / Result | Item | UT_SC_06 |
| :--- | :--- | :---: |
| **Condition** | **Precondition** | |
| | Scholarship Exists | O |
| | **Input** | |
| | Valid ID | O |
| **Confirm** | **Return** | |
| | Return Scholarship Detail | O |
| **Result** | **Type** (N/A/B) | N |
| | **Passed/Failed** | P |
| | **Executed Date** | 12/24 |

---

## 10. Search

| Function Code | UTC_SR_ALL | Function Name | Search Index/Query |
| :--- | :--- | :--- | :--- |
| **Created By** | Developer | **Executed By** | Automated |
| **Test requirement** | Index docs and query ElasticSearch | **Total Test Cases** | 3 |

| Condition / Result | Item | UT_SR_01 | UT_SR_02 | UT_SR_03 |
| :--- | :--- | :---: | :---: | :---: |
| **Condition** | **Precondition** | | | |
| | ES Service Running | O | O | O |
| | **Input** | | | |
| | Valid Scholarship for Index | O | | |
| | Query="Merit" | | O | |
| | Query="Xyz123" | | | O |
| **Confirm** | **Return** | | | |
| | Document added to ES | O | | |
| | Return items with "Merit" | | O | |
| | Return Empty List | | | O |
| **Result** | **Type** (N/A/B) | N | N | B |
| | **Passed/Failed** | P | P | P |
| | **Executed Date** | 12/24 | 12/24 | 12/24 |

---

## 11. Subscription

| Function Code | UTC_PB_GET | Function Name | Get Plans |
| :--- | :--- | :--- | :--- |
| **Created By** | Developer | **Executed By** | Automated |
| **Test requirement** | Retrieve subscription plans | **Total Test Cases** | 1 |

| Condition / Result | Item | UT_PB_01 |
| :--- | :--- | :---: |
| **Condition** | **Precondition** | |
| | DB/Config Loaded | O |
| | **Input** | |
| | No Args | O |
| **Confirm** | **Return** | |
| | Return List of Plans | O |
| **Result** | **Type** (N/A/B) | N |
| | **Passed/Failed** | P |
| | **Executed Date** | 12/24 |

---

## 12. Payment

| Function Code | UTC_PY_PRO | Function Name | Process Payment |
| :--- | :--- | :--- | :--- |
| **Created By** | Developer | **Executed By** | Automated |
| **Test requirement** | Process transaction via Gateway | **Total Test Cases** | 1 |

| Condition / Result | Item | UT_PY_01 |
| :--- | :--- | :---: |
| **Condition** | **Precondition** | |
| | Gateway Available | O |
| | **Input** | |
| | Valid Card Token | O |
| **Confirm** | **Return** | |
| | Transaction Success | O |
| **Result** | **Type** (N/A/B) | N |
| | **Passed/Failed** | Unstable |
| | **Executed Date** | 12/24 |
