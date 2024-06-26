import { fetchStudents, fetchInstructors, fetchAdmins } from './get';
import { Student, Instructor, Admin } from '../models';

export async function login(email: string, password: string): Promise<{ user: Student | Instructor | Admin } | { status: string } | null> {
  try {
    const [students, instructors, admins] = await Promise.all([
      fetchStudents(),
      fetchInstructors(),
      fetchAdmins()
    ]);

    const student = students.find(student => student.email === email && student.password === password);
    if (student) {
      if (!student.status) {
        return { status: "Account is disabled" };
      }
      return { user: student };
    }

    const instructor = instructors.find(instructor => instructor.email === email && instructor.password === password);
    if (instructor) {
      if (!instructor.status) {
        return { status: "Account is disabled" };
      }
      return { user: instructor };
    }

    const admin = admins.find(admin => admin.email === email && admin.password === password);
    if (admin) {
      return { user: admin };
    }

    return null;
  } catch (error) {
    console.error('Error logging in:', error);
    return null;
  }
}
