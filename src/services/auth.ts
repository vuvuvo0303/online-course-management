import { fetchStudents, fetchInstructors, fetchAdmins } from './get';
import { Student, Instructor, Admin } from '../models';

export async function login(email: string, password: string): Promise<{ user: Student | Instructor } | { status: string } | null> {
  try {
    const [students, instructors] = await Promise.all([
      fetchStudents(),
      fetchInstructors(),
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

    return null;
  } catch (error) {
    console.error('Error logging in:', error);
    return null;
  }
}

export async function loginAdmin(email: string, password: string): Promise<{ user: Admin } | { status: string } | null> {
  try {
    const admins = await fetchAdmins();
    const admin = admins.find(admin => admin.email === email && admin.password === password);
    if (admin) {
      return { user: admin };
    }
    return null;
  } catch (error) {
    console.error('Error logging in as admin:', error);
    return null;
  }
}
