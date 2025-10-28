'use client';

import apiClientService from '@/common/services/ApiClientService';
import { schemas } from '@/lib/schemas';
import { GenCtx } from '@/provider/GeneralContext';
import { sStore } from '@/stores';
import { onSetLoading } from '@/utils/eventBus';
import { zodResolver } from '@hookform/resolvers/zod';
import { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';

const ListScholarshipOpportunities = [
  {
    Id: 1,
    Provider_id: 1,
    Title: 'Global Leaders Scholarship',
    Slug: 'global-leaders-scholarship',
    Short_description: 'Scholarship for future global leaders.',
    Description:
      'This scholarship is designed for students who demonstrate outstanding leadership potential and academic excellence.',
    Requirements:
      'Open to undergraduate students with leadership experience and a minimum GPA of 3.5.',
    Benefits: 'Full tuition coverage, mentorship program, networking opportunities',
    Fields: 'Business Administration, International Relations, Public Policy',
    Country: 'United States',
    University: 'Harvard University',
    Study_level: 'Bachelor',
    Scholarship_type: 'Full',
    Funding_amount: 15000.0,
    Start_date: '2025-09-01',
    End_date: '2025-12-31',
    Available_slots: 10,
    Language_requirement: 'IELTS 7.0 or TOEFL 100',
    Gpa_requirement: 3.5,
  },
  {
    Id: 2,
    Provider_id: 2,
    Title: 'STEM Excellence Award',
    Slug: 'stem-excellence-award',
    Short_description: 'Funding support for top STEM students.',
    Description:
      'The STEM Excellence Award supports students in Science, Technology, Engineering, and Mathematics disciplines.',
    Requirements:
      'Available to both undergraduate and graduate students pursuing STEM fields with GPA 3.2 or higher.',
    Benefits: 'Research funding, lab access, conference attendance',
    Fields: 'Engineering, Computer Science, Mathematics, Physics',
    Country: 'United Kingdom',
    University: 'University of Cambridge',
    Study_level: 'Master',
    Scholarship_type: 'Partial',
    Funding_amount: 12000.0,
    Start_date: '2025-08-15',
    End_date: '2025-10-15',
    Available_slots: 15,
    Language_requirement: 'IELTS 6.5 or TOEFL 90',
    Gpa_requirement: 3.2,
  },
  {
    Id: 3,
    Provider_id: 3,
    Title: 'International Arts Fellowship',
    Slug: 'international-arts-fellowship',
    Short_description: 'A fellowship for talented international artists.',
    Description:
      'Supports international students in fine arts, performing arts, and design with mentorship and funding.',
    Requirements: 'Open to international students applying for arts-related programs.',
    Benefits: 'Studio space, exhibition opportunities, artist mentorship',
    Fields: 'Fine Arts, Performing Arts, Design, Creative Writing',
    Country: 'Canada',
    University: 'University of Toronto',
    Study_level: 'Bachelor',
    Scholarship_type: 'Partial',
    Funding_amount: 8000.0,
    Start_date: '2025-09-01',
    End_date: '2025-11-20',
    Available_slots: 8,
    Language_requirement: 'IELTS 6.0 or TOEFL 80',
    Gpa_requirement: 2.8,
  },
  {
    Id: 4,
    Provider_id: 4,
    Title: 'Medical Research Grant',
    Slug: 'medical-research-grant',
    Short_description: 'Grant for outstanding medical researchers.',
    Description:
      'Provides funding for students and young researchers focusing on innovative healthcare solutions.',
    Requirements:
      'Graduate students or postgraduates with strong academic background in medicine or biomedical sciences.',
    Benefits: 'Research equipment, publication support, clinical rotations',
    Fields: 'Medicine, Biomedical Science, Public Health',
    Country: 'Germany',
    University: 'Heidelberg University',
    Study_level: 'PhD',
    Scholarship_type: 'Full',
    Funding_amount: 20000.0,
    Start_date: '2025-10-01',
    End_date: '2026-01-05',
    Available_slots: 5,
    Language_requirement: 'IELTS 7.5 or TOEFL 110',
    Gpa_requirement: 3.7,
  },
  {
    Id: 5,
    Provider_id: 5,
    Title: 'Sustainable Development Scholarship',
    Slug: 'sustainable-development-scholarship',
    Short_description: 'Scholarship for students passionate about sustainability.',
    Description:
      'Aims to support students researching renewable energy, environmental policy, and sustainable practices.',
    Requirements:
      'Students enrolled in sustainability or environmental-related programs worldwide.',
    Benefits: 'Field research funding, sustainability conference attendance',
    Fields: 'Environmental Science, Sustainability, Renewable Energy',
    Country: 'Australia',
    University: 'University of Melbourne',
    Study_level: 'Master',
    Scholarship_type: 'Partial',
    Funding_amount: 10000.0,
    Start_date: '2025-08-01',
    End_date: '2025-09-30',
    Available_slots: 12,
    Language_requirement: 'IELTS 6.5 or TOEFL 90',
    Gpa_requirement: 3.0,
  },
];
export type IUserForm = {
  Fields: {
    User: {
      name: string;
      age: number;
      gmail: string;
      description?: string;
    };
  };
  Filters: object;
};

export default GenCtx({
  useLogic() {
    const ss = sStore();
    const methods = useForm<IUserForm>({
      reValidateMode: 'onSubmit',
      mode: 'onChange',
      resolver: zodResolver(schemas.User),
      defaultValues: {
        Fields: {
          User: {
            name: '',
            age: 0,
            gmail: '',
            description: '',
          },
        },
        Filters: {},
      },
    });

    const loading = useState(false);

    const meds = {
      async onPushDataToN8n(item: IListScholarshipOpportunities) {
        onSetLoading(true);
        const res = await fetch('/cv/CV_test.pdf');
        const blob = await res.blob();
        try {
          const formData = new FormData();
          formData.append('cv', blob, 'CV_DoMinhHieu.pdf');
          formData.append('name', 'Nguyen Van A');
          formData.append('email', 'test@example.com');
          formData.append('skill', 'cooking, dancing, singing');
          formData.append('description', 'testttt');
          formData.append('scholarship', JSON.stringify(item));

          const data = await apiClientService.post(
            //Test xác nhận
            'https://justindo.app.n8n.cloud/webhook-test/8c87db94-10db-4f9d-939b-d079bacb16c1',
            //Production
            // 'https://justindo.app.n8n.cloud/webhook/e6fe88d9-a50c-496d-ab2c-2097038d4e7c',
            //Test meeting
            // 'https://justindo.app.n8n.cloud/webhook-test/e6fe88d9-a50c-496d-ab2c-2097038d4e7c',
            //Production
            // 'https://justindo.app.n8n.cloud/webhook/8c87db94-10db-4f9d-939b-d079bacb16c1',
            formData
          );

          // return ss.setJointData({ ListTest: data });
        } catch (error) {
          console.error({ error });
        } finally {
          onSetLoading(false);
        }
      },
    };
    useEffect(() => {
      ss.setJointData({ ListScholarshipOpportunities });
    }, []);

    return {
      ss,

      meds,
      methods,
    };
  },
});
