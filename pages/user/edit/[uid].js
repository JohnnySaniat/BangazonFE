import { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import { getUserDetails } from '../../../api/userData';
import UpdateUserForm from '../../../components/forms/UpdateUserForm';

function EditUser() {
  const [editUser, setEditUser] = useState({});
  const router = useRouter();
  const { uid } = router.query;

  useEffect(() => {
    if (uid) {
      getUserDetails(uid)
        .then((userData) => {
          setEditUser(userData);
        })
        .catch((error) => {
          console.error('Error fetching user details:', error);
        });
    }
  }, [uid]);

  return <UpdateUserForm obj={editUser} />;
}

export default EditUser;
