import React, { useEffect, useState } from "react";
import axios from "axios";
import Member from "../Member/Member";

const URL = "http://localhost:5000/Members"; 

const fetchHandler = async () => {
  return await axios.get(URL).then((res) => res.data);
};

function DisplayMembership() {
  const [members, setMembers] = useState([]);

  useEffect(() => {
    fetchHandler().then((data) => setMembers(data.members)); 
  }, []);

  return (
    <div className="membership-container">
      {members.length > 0 ? (
        members.map((user, i) => (
          <Member key={i} user={user} />
        ))
      ) : (
        <p>No Members Found</p>
      )}
    </div>
  );
}

export default DisplayMembership;
