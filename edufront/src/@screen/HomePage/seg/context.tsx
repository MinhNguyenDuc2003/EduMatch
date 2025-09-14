'use client';

import apiClientService from '@/common/services/ApiClientService';
import { formSchema, IForm } from '@/lib/schemas';
import { GenCtx } from '@/provider/GeneralContext';
import { sStore } from '@/stores';
import { onSetLoading } from '@/utils/eventBus';
import { zodResolver } from '@hookform/resolvers/zod';
import { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';

const ListScholarshipOpportunities = [
  {
    OpportunityId: 1,
    ProviderId: 1,
    Title: 'Global Leaders Scholarship',
    ShortDescription: 'Scholarship for future global leaders.',
    Description:
      'This scholarship is designed for students who demonstrate outstanding leadership potential and academic excellence.',
    Country: 'United States',
    FieldOfStudy: 'Business Administration',
    FundingAmount: 15000.0,
    Deadline: '2025-12-31',
    MinGPA: 3.5,
    RequiredSkills: 'Leadership, Communication, Problem-solving',
    EligibilityCriteria:
      'Open to undergraduate students with leadership experience and a minimum GPA of 3.5.',
    Status: 'Open',
    CreatedAt: '2025-09-13T08:00:00Z',
    UpdatedAt: '2025-09-13T08:00:00Z',
  },
  {
    OpportunityId: 2,
    ProviderId: 2,
    Title: 'STEM Excellence Award',
    ShortDescription: 'Funding support for top STEM students.',
    Description:
      'The STEM Excellence Award supports students in Science, Technology, Engineering, and Mathematics disciplines.',
    Country: 'United Kingdom',
    FieldOfStudy: 'Engineering, Computer Science',
    FundingAmount: 12000.0,
    Deadline: '2025-10-15',
    MinGPA: 3.2,
    RequiredSkills: 'Analytical thinking, Research, Teamwork',
    EligibilityCriteria:
      'Available to both undergraduate and graduate students pursuing STEM fields with GPA 3.2 or higher.',
    Status: 'Open',
    CreatedAt: '2025-09-13T08:00:00Z',
    UpdatedAt: '2025-09-13T08:00:00Z',
  },
  {
    OpportunityId: 3,
    ProviderId: 3,
    Title: 'International Arts Fellowship',
    ShortDescription: 'A fellowship for talented international artists.',
    Description:
      'Supports international students in fine arts, performing arts, and design with mentorship and funding.',
    Country: 'Canada',
    FieldOfStudy: 'Fine Arts, Performing Arts, Design',
    FundingAmount: 8000.0,
    Deadline: '2025-11-20',
    MinGPA: 2.8,
    RequiredSkills: 'Creativity, Portfolio presentation, Artistic skills',
    EligibilityCriteria: 'Open to international students applying for arts-related programs.',
    Status: 'Open',
    CreatedAt: '2025-09-13T08:00:00Z',
    UpdatedAt: '2025-09-13T08:00:00Z',
  },
  {
    OpportunityId: 4,
    ProviderId: 4,
    Title: 'Medical Research Grant',
    ShortDescription: 'Grant for outstanding medical researchers.',
    Description:
      'Provides funding for students and young researchers focusing on innovative healthcare solutions.',
    Country: 'Germany',
    FieldOfStudy: 'Medicine, Biomedical Science',
    FundingAmount: 20000.0,
    Deadline: '2026-01-05',
    MinGPA: 3.7,
    RequiredSkills: 'Research, Laboratory skills, Critical analysis',
    EligibilityCriteria:
      'Graduate students or postgraduates with strong academic background in medicine or biomedical sciences.',
    Status: 'Open',
    CreatedAt: '2025-09-13T08:00:00Z',
    UpdatedAt: '2025-09-13T08:00:00Z',
  },
  {
    OpportunityId: 5,
    ProviderId: 5,
    Title: 'Sustainable Development Scholarship',
    ShortDescription: 'Scholarship for students passionate about sustainability.',
    Description:
      'Aims to support students researching renewable energy, environmental policy, and sustainable practices.',
    Country: 'Australia',
    FieldOfStudy: 'Environmental Science, Sustainability',
    FundingAmount: 10000.0,
    Deadline: '2025-09-30',
    MinGPA: 3.0,
    RequiredSkills: 'Research, Environmental awareness, Project management',
    EligibilityCriteria:
      'Students enrolled in sustainability or environmental-related programs worldwide.',
    Status: 'Open',
    CreatedAt: '2025-09-13T08:00:00Z',
    UpdatedAt: '2025-09-13T08:00:00Z',
  },
];

export default GenCtx({
  useLogic() {
    const ss = sStore();

    const methods = useForm<IForm>({
      reValidateMode: 'onSubmit',
      mode: 'onChange',
      resolver: zodResolver(formSchema),
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
      async onPushDataToN8n(item : IListScholarshipOpportunities) {
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
