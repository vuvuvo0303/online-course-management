// services/auth.ts
import { fetchStudents, fetchInstructors, fetchAdmins } from './get';
import { Student, Instructor, Admin } from '../models/User';

export async function login(email: string, password: string): Promise<{ user: Student | Instructor | Admin, role: string } | null> {
  try {
    const [students, instructors, admins] = await Promise.all([
      fetchStudents(),
      fetchInstructors(),
      fetchAdmins()
    ]);

    const student = students.find(student => student.email === email && student.password === password);
    if (student) {
      return { user: student, role: 'Student' };
    }

    const instructor = instructors.find(instructor => instructor.email === email && instructor.password === password);
    if (instructor) {
      return { user: instructor, role: 'Instructor' };
    }

    const admin = admins.find(admin => admin.email === email && admin.password === password);
    if (admin) {
      return { user: admin, role: 'Admin' };
    }

    return null;
  } catch (error) {
    console.error('Error logging in:', error);
    return null;
  }
}
