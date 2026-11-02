import { media } from '@/lib/media';

export const ME = {
  id: 'mook',
  fullName: 'ธัญชนก พิศาล',
  displayName: 'ธัญชนก พิศาล (มุก)',
  nick: 'มุก',
  englishName: 'Thanchanok Pisarn (Mook)',
  email: 'thanchanok@terrabit.co.th',
  position: 'Creative Designer',
  /** One of ROLES (backend design): Super Admin, Content Admin, HR, Approver, Employee. */
  role: 'Content Admin',
  /** Department key from DEPTS (data/departments.js); decides which department-only courses show. */
  dept: 'cac-graphic',
  photo: media('84c91e2c6d.jpg'),
  banner: media('2bca0935ef.jpg'),
  /** Shift table for shift teams (IT, call centre); null for office hours. Mock: the real file comes from HR. */
  shift: { file: media('shift-2569-10.xlsx'), name: 'shift-schedule-2026-10.xlsx' },
};

/** Roles that see the admin console link in the profile menu. */
export const ADMIN_ROLES = ['Super Admin', 'Content Admin', 'HR'];

export const LOGO_SRC = media('4983c1d9be.png');
export const TERBY_SRC = media('35e44550b0.webp');
