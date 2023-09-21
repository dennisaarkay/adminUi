import React,{useState,useEffect} from "react";
import axios from "axios";
import SearchBar from "./SearchBar";
import UserTable from "./UserTable";
import Pagination from "./Pagination";
import 'bootstrap/dist/css/bootstrap.css';
import "./Dashboard.css"



const Dashboard=()=>{
    const user_api = 'https://geektrust.s3-ap-southeast-1.amazonaws.com/adminui-problem/members.json';

    const [users, setUsers]=useState([]);
    const [loading,setLoading]=useState(true);
    const [search,setSearch] = useState('');
    const [currentPage,setCurrentPage]= useState(1);
    const usersPerPage = 10;
    const lastIndex = currentPage * usersPerPage;
    const firstIndex = lastIndex - usersPerPage;
    const [selectedId,setSelectedId] = useState([]);
    const [editUserId, setEditUserId] = useState(null);
    const [editUserDetails, setEditUserDetails] = useState({});
    const [deleteAllSelected, setDeleteAllSelected] = useState(false); 


    const fetchData = async()=>{
        try{
            setLoading(true);
            let response = await axios.get(user_api);
            setUsers(response.data);
            setLoading(false);
            return response.data;
        } catch(e){
            console.error("No data found");
        }
    };

    useEffect(()=>{
        fetchData();
    },[]);

    const handleSearchInput=(event)=>{
        const query = event.target.value;
        setSearch(query);
        setCurrentPage(1);

    };

    const filteredUsers = users.filter(
        (user)=> 
        user.name.toLowerCase().includes(search.toLowerCase())|| 
        user.email.toLowerCase().includes(search.toLowerCase())||
        user.role.toLowerCase().includes(search.toLowerCase())
    );

    const rowsToShow = filteredUsers.slice(firstIndex,lastIndex);
    const pages = Math.ceil(filteredUsers.length/usersPerPage);
    const numbers = [...Array(pages+1).keys()].slice(1);

    const prevPage = () => {
        if(currentPage !==1){
            setCurrentPage(currentPage-1);
        }
    }; 

    const nextPage = () => {
        if(currentPage!==pages){
            setCurrentPage(currentPage+1);
        }
    };

    const changePage = (pageNumber)=>{
        setCurrentPage(pageNumber);
    };

    const firstPage = () =>{
        setCurrentPage(1);
    };

    const lastpage=()=>{
        setCurrentPage(pages);
    };

    const handleDeleteUser = (userId) => {
        const updatedUsers = users.filter((user)=> user.id !== userId);
        setUsers(updatedUsers);
        setSelectedId(selectedId.filter((id)=> id !== userId));
    };

    const handleToggleSelect = (userId)=>{
        if(selectedId.includes(userId)){
            setSelectedId(selectedId.filter((id) => id !==userId));
        } else {
            setSelectedId([...selectedId,userId]);
        }
    };

    const handleSelectAll = () => {
        if(selectedId.length === rowsToShow.length){
            setSelectedId([]);
        } else {
            setSelectedId(rowsToShow.map((user)=>user.id));
        }
    };

    const handleChange = (field,value) => {
        setEditUserDetails((prevDetails)=>({
            ...prevDetails,
            [field]:value,
        }));
    };

    const openEditForm = (userId) => {
        setEditUserId(userId);
        const userToEdit = users.find((user)=> user.id === userId);
        setEditUserDetails({...userToEdit});
    };

    const closeEditForm = () => {
        setEditUserId(null);
        setEditUserDetails({});
    };

    const saveEditedId = (userId) => {
        const updatedUsers = users.map((user) =>
        user.id === userId ? {...user, ...editUserDetails}:user);
        setUsers(updatedUsers);
        setEditUserId(null);
        setEditUserDetails({});
    };

    const deleteSelectedId = () => {
        const updatedUsers = users.filter((user)=> !selectedId.includes(user.id));
        setUsers(updatedUsers);
        setSelectedId([]);
        setDeleteAllSelected(false);
    };

    return(
        <div>
            <SearchBar search={search} handleSearchInput={handleSearchInput} />
            <table className="table">
                <thead>
                    <tr>
                        <th>
                            <input
                            type="checkbox"
                            checked={selectedId.length === rowsToShow.length}
                            onChange={handleSelectAll}/>
                        </th>
                        <th>Name</th>
                        <th>Email</th>
                        <th>Role</th>
                        <th>Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {rowsToShow.map((user)=>(
                        <UserTable
                        key={user.id}
                        user={user}
                        editUserId={editUserId}
                        editUserDetails={editUserDetails}
                        selectedId={selectedId}
                        handleToggleSelect={handleToggleSelect}
                        openEditForm={openEditForm}
                        handleDeleteUser={handleDeleteUser}
                        saveEditedId={saveEditedId}
                        closeEditFrom={closeEditForm}
                        handleChange={handleChange}/>
                    ))}
                </tbody>
            </table>
            <Pagination
            currentPage={currentPage}
            pages={pages}
            firstPage={firstPage}
            prevPage={prevPage}
            changePage={changePage}
            nextPage={nextPage}
            lastPage={lastpage}/>
            <button onClick={deleteSelectedId} className="delete-selected">Delete Selected</button>
        </div>
    );

}

export default Dashboard;