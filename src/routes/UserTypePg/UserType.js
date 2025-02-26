const UserType = () => {

    const handleUserType = (userType) =>{
        sessionStorage.setItem("UserType", userType);
    }


    return (
        <div>
            <button onClick={()=>{handleUserType('Commuter')}}>Commuter</button>
            <button onClick={()=>{handleUserType('Carpool Owner')}}>CarPool Owner</button>
        </div>
    )
};

export default UserType;
