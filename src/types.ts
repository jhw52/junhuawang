/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

export interface ResumeData {
  basics: {
    name: string;
    label: string;
    image: string;
    email: string;
    phone: string;
    summary: string;
    location: string;
  };
  education: Array<{
    institution: string;
    area: string;
    studyType: string;
    startDate: string;
    endDate: string;
    score: string;
    courses: string[];
  }>;
  experience: Array<{
    company: string;
    position: string;
    startDate: string;
    endDate: string;
    summary: string;
    highlights: string[];
  }>;
  projects: Array<{
    name: string;
    position: string;
    startDate: string;
    endDate: string;
    summary: string;
    highlights: string[];
    keywords: string[];
  }>;
  skills: Array<{
    name: string;
    level: string;
    keywords: string[];
  }>;
  awards: Array<{
    title: string;
    date: string;
    awarder?: string;
    summary: string;
    image?: string;
  }>;
}
