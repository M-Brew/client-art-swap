import React, { useEffect, useState } from "react";

import Card from "react-bootstrap/Card";
import Table from "react-bootstrap/Table";
import Spinner from "react-bootstrap/Spinner";

import { UsersService } from "services/users.service";

const usersService = new UsersService();

export const Users = () => {
    const [users, setUsers] = useState<IGuest[]>([]);
    const [loading, setLoading] = useState(true);

    const getUsers = async () => {
        setLoading(true);
        try {
            const response = await usersService.getUsers();
            if (response?.status === 200) {
                const data: IGuest[] = response?.data;
                setUsers(data);
            }
        } catch (e) {
            console.log(e);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        getUsers();
    }, []);

    if (loading) {
        return (
            <div className="d-flex justify-content-center my-4">
                <Spinner animation="border" variant="secondary" />
            </div>
        );
    }

    return (
        <div>
            <h3 className="mb-4">Users</h3>
            <Card>
                <Card.Header>All Users</Card.Header>
                <Card.Body>
                    <Table hover responsive>
                        <thead>
                            <tr>
                                <th>Name</th>
                                <th>Email</th>
                                <th>Date Joined</th>
                            </tr>
                        </thead>
                        <tbody>
                            {users.map((user, idx) => (
                                <tr key={idx}>
                                    <td>{`${user.firstName} ${user.lastName}`}</td>
                                    <td>{user.email}</td>
                                    <td>
                                        {new Date(
                                            user.createdAt
                                        ).toLocaleDateString("us-EN", {
                                            day: "2-digit",
                                            month: "long",
                                            year: "numeric",
                                        })}
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </Table>
                </Card.Body>
            </Card>
        </div>
    );
};
