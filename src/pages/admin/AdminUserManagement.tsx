import React, { useState, useEffect } from 'react';
import { useDispatch } from 'react-redux';

import { IGetAllUsersResponse, UserDTO } from '../../interfaces/admin';
import Pagination from '../../components/admin/Pagination';
import { AppDispatch } from '../../redux/store';
import { getAllUsers } from '../../redux/action/adminActions';

const AdminUserManagement: React.FC = () => {
  const dispatch = useDispatch<AppDispatch>();
  const [users, setUsers] = useState<UserDTO[]>([]);
  const [loading, setLoading] = useState(false);
  const [totalPages, setTotalPages] = useState(0);
  const [currentPage, setCurrentPage] = useState(1);
  const pageSize = 10;

  useEffect(() => {
    fetchUsers(currentPage, pageSize);
  }, [currentPage, pageSize]);

  const fetchUsers = async (page: number, size: number) => {
    setLoading(true);
    try {
        const response = await dispatch(getAllUsers({ page, size })).unwrap();
        console.log(response); 
        const data: IGetAllUsersResponse = response;

       
        if (data?.data?.users) {
            setUsers(data.data.users);
            setTotalPages(data.data.totalPages);
        } else {
            console.error('Users data is not available:', data);
            setUsers([]); 
        }
    } catch (error) {
        console.error('Failed to fetch users:', error);
    } finally {
        setLoading(false);
    }
};


  const handlePageChange = (page: number) => {
    setCurrentPage(page);
  };

  const handleStatusToggle = (id: string) => {
    setUsers((prevUsers) =>
      prevUsers.map((user) =>
        user.username === id
          ? { ...user, status: user.status === 'blocked' ? 'unblocked' : 'blocked' }
          : user
      )
    );
  };

  return (
    <div className="overflow-x-auto">
        {loading ? (
            <div>Loading...</div>
        ) : (
            <>
                {users.length === 0 ? (
                    <div>No users found.</div>
                ) : (
                    <table className="table table-xs">
                        <thead>
                            <tr>
                                <th>#</th>
                                <th>Username</th>
                                <th>Email</th>
                                <th>Role</th>
                                <th>Verification Status</th>
                                <th>Status</th>
                                <th>Profile Image</th>
                                <th>Action</th>
                            </tr>
                        </thead>
                        <tbody>
                            {users.map((user, index) => (
                                <tr key={index}>
                                    <th>{index + 1}</th>
                                    <td>{user.username}</td>
                                    <td>{user.email}</td>
                                    <td>{user.role}</td>
                                    <td>{user.verificationStatus}</td>
                                    <td>{user.status}</td>
                                    <td>
                                        <img src={user.pro_img} alt={user.username} width="50" />
                                    </td>
                                    <td>
                                        <button
                                            className="btn btn-primary"
                                            onClick={() => handleStatusToggle(user.username)}
                                        >
                                            {user.status === 'blocked' ? 'Unblock' : 'Block'}
                                        </button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                )}
                <Pagination
                    currentPage={currentPage}
                    totalPages={totalPages}
                    onPageChange={handlePageChange}
                />
            </>
        )}
    </div>
);

};

export default AdminUserManagement;
