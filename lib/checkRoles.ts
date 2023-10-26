type Roles = 'ADMIN' | 'USER' | 'ORGANIZER';
export function checkRoles(roles: [{ role_id: string; role: { title: string } }]): Roles[] {
  const role = roles?.map((item) => item.role.title);
  // console.log('🚀 ~ file: checkRoles.ts:4 ~ checkRoles ~ role:', role);
  return role as Roles[];
}
