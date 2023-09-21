import React from "react";

const UserTable = ({
    user,
    editUserId,
    editUserDetails,
    selectedId,
    handleToggleSelect,
    openEditForm,
    handleDeleteUser,
    saveEditedId,
    closeEditForm,
    handleChange,
})=>{
    

    return (
        <tr key={user.id}>
            <td>
                            <input
                            type='checkbox'
                            checked={selectedId.includes(user.id)}
                            onChange={()=>handleToggleSelect(user.id)}/>
                        </td>
                        <td>{editUserId===user.id ? (
                            <input
                            value={editUserDetails.name!== undefined ? editUserDetails.name:user.name}
                            onChange={(e)=> handleChange('name',e.target.value)}
                            />
                        ):(user.name)}</td>
                        <td>{editUserId===user.id ? (
                            <input
                            value={editUserDetails.email!== undefined ? editUserDetails.email:user.email}
                            onChange={(e)=> handleChange('email',e.target.value)}/>
                        ):(user.email)}</td>
                        <td>{editUserId===user.id ? (
                            <input
                            value={editUserDetails.role!== undefined ? editUserDetails.role:user.role}
                            onChange={(e)=> handleChange('role',e.target.value)}/>
                        ):(user.role)}</td>
                        <td>
                            {editUserId===user.id ?(
                                <>
                                <button onClick={()=>saveEditedId(user.id)}>Save</button>
                                <button onClick={closeEditForm}>Cancel</button>
                                </>
                            ):(
                                <>
                                <button onClick={()=> openEditForm(user.id)}>Edit</button>

                                <button onClick={()=> handleDeleteUser(user.id)}>Delete</button>
                                </>
                            )}
                        </td>
        </tr>
    );
};

export default UserTable;