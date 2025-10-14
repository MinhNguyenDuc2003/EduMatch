import type { ProfileApiResponse, ApplicantProfile } from './types';

/**
 * Profile API Service
 * Contains all API calls related to user profile
 */

const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || 'http://159.89.200.244';

/**
 * Fetch user profile data
 */
export async function fetchProfile(token?: string): Promise<ProfileApiResponse> {
  try {
    const headers: HeadersInit = {
      'Content-Type': 'application/json',
    };

    if (token) {
      headers['Authorization'] = `Bearer ${token}`;
    }

    const response = await fetch(`${API_BASE_URL}/api/profile`, {
      method: 'GET',
      headers,
      credentials: 'include',
    });

    if (!response.ok) {
      throw new Error(`Failed to fetch profile: ${response.statusText}`);
    }

    return await response.json();
  } catch (error) {
    console.error('Error fetching profile:', error);
    throw error;
  }
}

/**
 * Update applicant profile
 */
export async function updateApplicantProfile(
  profileId: number,
  data: Partial<ApplicantProfile>,
  token?: string
): Promise<ApplicantProfile> {
  try {
    const headers: HeadersInit = {
      'Content-Type': 'application/json',
    };

    if (token) {
      headers['Authorization'] = `Bearer ${token}`;
    }

    const response = await fetch(`${API_BASE_URL}/api/applicant-profile/${profileId}`, {
      method: 'PUT',
      headers,
      credentials: 'include',
      body: JSON.stringify(data),
    });

    if (!response.ok) {
      throw new Error(`Failed to update profile: ${response.statusText}`);
    }

    return await response.json();
  } catch (error) {
    console.error('Error updating profile:', error);
    throw error;
  }
}

/**
 * Update customer account settings
 */
export async function updateCustomerAccount(
  customerId: string,
  data: { email?: string; firstName?: string; lastName?: string },
  token?: string
): Promise<void> {
  try {
    const headers: HeadersInit = {
      'Content-Type': 'application/json',
    };

    if (token) {
      headers['Authorization'] = `Bearer ${token}`;
    }

    const response = await fetch(`${API_BASE_URL}/api/customer/${customerId}`, {
      method: 'PUT',
      headers,
      credentials: 'include',
      body: JSON.stringify(data),
    });

    if (!response.ok) {
      throw new Error(`Failed to update account: ${response.statusText}`);
    }
  } catch (error) {
    console.error('Error updating account:', error);
    throw error;
  }
}

/**
 * Upload profile avatar
 */
export async function uploadAvatar(file: File, token?: string): Promise<{ url: string }> {
  try {
    const formData = new FormData();
    formData.append('avatar', file);

    const headers: HeadersInit = {};

    if (token) {
      headers['Authorization'] = `Bearer ${token}`;
    }

    const response = await fetch(`${API_BASE_URL}/api/profile/avatar`, {
      method: 'POST',
      headers,
      credentials: 'include',
      body: formData,
    });

    if (!response.ok) {
      throw new Error(`Failed to upload avatar: ${response.statusText}`);
    }

    return await response.json();
  } catch (error) {
    console.error('Error uploading avatar:', error);
    throw error;
  }
}

/**
 * Add education history
 */
export async function addEducationHistory(
  applicantId: number,
  data: Partial<any>,
  token?: string
): Promise<void> {
  try {
    const headers: HeadersInit = {
      'Content-Type': 'application/json',
    };

    if (token) {
      headers['Authorization'] = `Bearer ${token}`;
    }

    const response = await fetch(`${API_BASE_URL}/api/education-history`, {
      method: 'POST',
      headers,
      credentials: 'include',
      body: JSON.stringify({ ...data, applicantId }),
    });

    if (!response.ok) {
      throw new Error(`Failed to add education: ${response.statusText}`);
    }
  } catch (error) {
    console.error('Error adding education:', error);
    throw error;
  }
}

/**
 * Add skill
 */
export async function addSkill(
  applicantId: number,
  data: { skillName: string; proficiencyLevel?: string; yearsExperience?: number },
  token?: string
): Promise<void> {
  try {
    const headers: HeadersInit = {
      'Content-Type': 'application/json',
    };

    if (token) {
      headers['Authorization'] = `Bearer ${token}`;
    }

    const response = await fetch(`${API_BASE_URL}/api/skills`, {
      method: 'POST',
      headers,
      credentials: 'include',
      body: JSON.stringify({ ...data, applicantId }),
    });

    if (!response.ok) {
      throw new Error(`Failed to add skill: ${response.statusText}`);
    }
  } catch (error) {
    console.error('Error adding skill:', error);
    throw error;
  }
}
